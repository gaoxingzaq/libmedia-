/*
 * libmedia AVPlayer
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 * 
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 * 
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

import { AVCodecID, AVMediaType } from 'avutil/codec'
import IOPipeline, { IOType } from 'avpipeline/IOPipeline'
import DemuxPipeline from 'avpipeline/DemuxPipeline'
import VideoDecodePipeline from 'avpipeline/VideoDecodePipeline'
import AudioDecodePipeline from 'avpipeline/AudioDecodePipeline'
import { Thread, closeThread, createThreadFromClass } from 'cheap/thread/thread'
import Emitter, { EmitterOptions } from 'common/event/Emitter'
import generateUUID from 'common/function/generateUUID'
import * as is from 'common/util/is'
import * as object from 'common/util/object'
import compile, { WebAssemblyResource } from 'cheap/webassembly/compiler'
import { unrefAVFrame } from 'avutil/util/avframe'
import { unrefAVPacket } from 'avutil/util/avpacket'
import AudioRenderPipeline from 'avpipeline/AudioRenderPipeline'
import VideoRenderPipeline from 'avpipeline/VideoRenderPipeline'
import { AVSeekFlags } from 'avformat/avformat'
import * as urlUtils from 'common/util/url'
import * as cheapConfig from 'cheap/config'
import { AVSampleFormat } from 'avutil/audiosamplefmt'
import registerProcessor from 'avrender/pcm/audioWorklet/base/registerProcessor'
import AudioSourceWorkletNode from 'avrender/pcm/AudioSourceWorkletNode'
import { Memory } from 'cheap/heap'
import { RenderMode } from 'avrender/image/ImageRender'
import Controller, { ControllerObserver } from './Controller'
import * as eventType from './eventType'
import supportOffscreenCanvas from './function/supportOffscreenCanvas'
import * as logger from 'common/util/logger'
import support from 'common/util/support'
import AudioSourceBufferNode from 'avrender/pcm/AudioSourceBufferNode'
import restrain from 'common/function/restrain'
import browser from 'common/util/browser'
import { avQ2D, avRescaleQ } from 'avutil/util/rational'
import { AV_MILLI_TIME_BASE_Q, NOPTS_VALUE_BIGINT } from 'avutil/constant'
import Stats from 'avpipeline/struct/stats'
import { memset, mapUint8Array, mapSafeUint8Array } from 'cheap/std/memory'
import createMessageChannel from './function/createMessageChannel'
import getVideoCodec from 'avcodec/function/getVideoCodec'
import getVideoMimeType from 'avrender/track/function/getVideoMimeType'
import getAudioMimeType from 'avrender/track/function/getAudioMimeType'
import MSEPipeline from './mse/MSEPipeline'
import { getHardwarePreference } from 'avcodec/function/getHardwarePreference'
import Sleep from 'common/timer/Sleep'
import StatsController from './StatsController'
import * as mutex from 'cheap/thread/mutex'
import * as bigint from 'common/util/bigint'
import getMediaSource from './function/getMediaSource'
import JitterBufferController from './JitterBufferController'
import getAudioCodec from 'avcodec/function/getAudioCodec'
import { IOFlags } from 'common/io/flags'
import { Ext2Format, Ext2IOLoader, mediaType2AVMediaType } from 'avutil/stringEnum'
import { AVDisposition, AVStreamInterface } from 'avformat/AVStream'
import { AVFormatContextInterface } from 'avformat/AVFormatContext'
import dump, { dumpCodecName, dumpKey } from 'avformat/dump'
import * as array from 'common/util/array'
import isHdr from 'avutil/function/isHdr'
import hasAlphaChannel from 'avutil/function/hasAlphaChannel'
import SubtitleRender from './subtitle/SubtitleRender'
import { Data, Fn } from 'common/types/type'
import { playerEventChanged, playerEventChanging, playerEventError, playerEventNoParam, playerEventTime } from './type'
import compileResource from 'avutil/function/compileResource'
import os from 'common/util/os'
import IPCPort, { REQUEST, RpcMessage } from 'common/network/IPCPort'
import * as errorType from 'avutil/error'
import FetchIOLoader from 'avnetwork/ioLoader/FetchIOLoader'
import FileIOLoader from 'avnetwork/ioLoader/FileIOLoader'
import CustomIOLoader from 'avnetwork/ioLoader/CustomIOLoader'
import HlsIOLoader from 'avnetwork/ioLoader/HlsIOLoader'
import DashIOLoader from 'avnetwork/ioLoader/DashIOLoader'
import { AVPlayerGlobalData } from './struct'
import { serializeAVCodecParameters } from 'avutil/util/serialize'
import IODemuxPipelineProxy from './worker/IODemuxPipelineProxy'
import AudioPipelineProxy from './worker/AudioPipelineProxy'
import VideoPipelineProxy from './worker/VideoPipelineProxy'
import MSEPipelineProxy from './worker/MSEPipelineProxy'

const ObjectFitMap = {
  [RenderMode.FILL]: 'cover',
  [RenderMode.FIT]: 'contain'
}

export interface ExternalSubtitle {
  /**
   * 字幕源，支持 url 和 文件
   */
  source: string | File
  /**
   * 字幕语言
   */
  lang?: string
  /**
   * 字幕标题
   */
  title?: string
}

interface ExternalSubtitleTask extends ExternalSubtitle {
  taskId: string
  streamId: int32
  ioloader2DemuxerChannel: MessageChannel
}

export interface AVPlayerOptions {
  /**
   * dom 挂载元素
   */
  container: HTMLDivElement
  /**
   * 获取 wasm 回调
   * 
   * @param type 
   * @param codecId 
   * @param mediaType 
   * @returns 
   */
  getWasm: (type: 'decoder' | 'resampler' | 'stretchpitcher', codecId?: AVCodecID, mediaType?: AVMediaType) => string | ArrayBuffer | WebAssemblyResource
  /**
   * 是否是直播
   */
  isLive?: boolean
  /**
   * 自定义检查是否使用 mse 模式
   */
  checkUseMES?: (streams: AVStreamInterface[]) => boolean
  /**
   * 是否启用硬件加速
   */
  enableHardware?: boolean
  /**
   * 是否启用 WebGPU 渲染
   */
  enableWebGPU?: boolean
  /**
   * 是否启用 worker
   */
  enableWorker?: boolean
  /**
   * 是否循环播放
   */
  loop?: boolean
  /**
   * 是否开启低延时模式（直播）开始之后会根据网络情况自动调整 buffer，尽量在不卡顿的情况下降低延时
   */
  lowLatency?: boolean
  /**
   * jitter buffer 最大值 lowLatency 模式下影响最高延时（秒）
   */
  jitterBufferMax?: float
  /**
   * jitter buffer 最小值 lowLatency 模式下影响最低延时（秒）
   */
  jitterBufferMin?: float
  /**
   * 预加载 buffer 时长（秒）
   */
  preLoadTime?: int32
  /** *
   * 自定义查找播放流回调
   */
  findBestStream?: (streams: AVStreamInterface[], mediaType: AVMediaType) => AVStreamInterface
}

export const AVPlayerSupportedCodecs = [
  AVCodecID.AV_CODEC_ID_H264,
  AVCodecID.AV_CODEC_ID_HEVC,
  AVCodecID.AV_CODEC_ID_MPEG4,
  AVCodecID.AV_CODEC_ID_VVC,
  AVCodecID.AV_CODEC_ID_AV1,
  AVCodecID.AV_CODEC_ID_VP8,
  AVCodecID.AV_CODEC_ID_VP9,
  AVCodecID.AV_CODEC_ID_THEORA,

  AVCodecID.AV_CODEC_ID_AAC,
  AVCodecID.AV_CODEC_ID_MP3,
  AVCodecID.AV_CODEC_ID_OPUS,
  AVCodecID.AV_CODEC_ID_FLAC,
  AVCodecID.AV_CODEC_ID_SPEEX,
  AVCodecID.AV_CODEC_ID_VORBIS,
  AVCodecID.AV_CODEC_ID_AC3,
  AVCodecID.AV_CODEC_ID_EAC3,
  AVCodecID.AV_CODEC_ID_DTS,

  AVCodecID.AV_CODEC_ID_WEBVTT,
  AVCodecID.AV_CODEC_ID_SUBRIP,
  AVCodecID.AV_CODEC_ID_ASS,
  AVCodecID.AV_CODEC_ID_SSA,
  AVCodecID.AV_CODEC_ID_TTML,
  AVCodecID.AV_CODEC_ID_MOV_TEXT,
  AVCodecID.AV_CODEC_ID_TEXT
]

const defaultAVPlayerOptions: Partial<AVPlayerOptions> = {
  enableHardware: true,
  enableWebGPU: true,
  enableWorker: true,
  loop: false,
  jitterBufferMax: 10,
  jitterBufferMin: 4,
  lowLatency: false,
  preLoadTime: 4
}

export const enum AVPlayerStatus {
  STOPPED,
  DESTROYING,
  DESTROYED,
  LOADING,
  LOADED,
  PLAYING,
  PLAYED,
  PAUSED,
  SEEKING,
  CHANGING
}

export const enum AVPlayerProgress {
  OPEN_FILE,
  ANALYZE_FILE,
  LOAD_AUDIO_DECODER,
  LOAD_VIDEO_DECODER
}

export default class AVPlayer extends Emitter implements ControllerObserver {

  static Util = {
    compile,
    browser,
    os
  }

  static IOLoader = {
    CustomIOLoader,
    FetchIOLoader,
    FileIOLoader,
    HlsIOLoader,
    DashIOLoader
  }

  static level: number = logger.INFO

  static DemuxThreadReady: Promise<void>
  static AudioThreadReady: Promise<void>
  static VideoThreadReady: Promise<void>
  static MSEThreadReady: Promise<void>

  static IODemuxProxy: IODemuxPipelineProxy
  static AudioPipelineProxy: AudioPipelineProxy
  static MSEPipelineProxy: MSEPipelineProxy

  // 下面的线程所有 AVPlayer 实例共享
  static IOThread: Thread<IOPipeline>
  static DemuxerThread: Thread<DemuxPipeline>
  static AudioDecoderThread: Thread<AudioDecodePipeline>
  static AudioRenderThread: Thread<AudioRenderPipeline>
  static VideoRenderThread: Thread<VideoRenderPipeline>
  static MSEThread: Thread<MSEPipeline>

  static audioContext: AudioContext
  static Resource: Map<string, WebAssemblyResource | ArrayBuffer> = new Map()

  // 解码线程每个 player 独占一个
  // TODO 若需要同时播放大量视频，可以考虑实现一个 VideoDecoderThreadPool
  // 来根据各个视频规格做线程解码任务调度，降低系统线程切换开销，这里就不实现了
  private VideoDecoderThread: Thread<VideoDecodePipeline>
  private VideoRenderThread: Thread<VideoRenderPipeline>
  private VideoPipelineProxy: VideoPipelineProxy

  // AVPlayer 各个线程间共享的数据
  private GlobalData: AVPlayerGlobalData

  private taskId: string
  private subTaskId: string
  private subtitleTaskId: string
  private ext: string
  private source: string | File | CustomIOLoader
  private ioIPCPort: IPCPort
  private options: AVPlayerOptions

  private ioloader2DemuxerChannel: MessageChannel
  private demuxer2VideoDecoderChannel: MessageChannel
  private demuxer2AudioDecoderChannel: MessageChannel
  private videoDecoder2VideoRenderChannel: MessageChannel
  private audioDecoder2AudioRenderChannel: MessageChannel
  private audioRender2AudioWorkletChannel: MessageChannel

  private audioSourceNode: AudioSourceWorkletNode | AudioSourceBufferNode
  private gainNode: GainNode

  private formatContext: AVFormatContextInterface
  private canvas: HTMLCanvasElement
  private updateCanvas: HTMLCanvasElement
  private video: HTMLVideoElement
  private audio: HTMLAudioElement
  private controller: Controller

  private volume: double
  private playRate: double
  private renderMode: RenderMode
  private renderRotate: double
  private flipHorizontal: boolean
  private flipVertical: boolean

  private useMSE: boolean
  private audioEnded: boolean
  private videoEnded: boolean
  private status: AVPlayerStatus
  private lastStatus: AVPlayerStatus

  private statsController: StatsController
  private jitterBufferController: JitterBufferController

  private selectedVideoStream: AVStreamInterface
  private selectedAudioStream: AVStreamInterface
  private selectedSubtitleStream: AVStreamInterface
  private lastSelectedInnerSubtitleStreamIndex: int32

  private subtitleRender: SubtitleRender

  private externalSubtitleTasks: ExternalSubtitleTask[]

  constructor(options: AVPlayerOptions) {
    super(true)
    this.options = object.extend({}, defaultAVPlayerOptions, options)
    this.taskId = generateUUID()
    this.status = AVPlayerStatus.STOPPED

    this.volume = 1
    this.playRate = 1
    this.renderMode = RenderMode.FIT
    this.renderRotate = 0
    this.flipHorizontal = false
    this.flipVertical = false

    this.GlobalData = make(AVPlayerGlobalData)

    this.statsController = new StatsController(
      addressof(this.GlobalData.stats),
      !(cheapConfig.USE_THREADS || !support.worker || !this.options.enableWorker),
      this
    )
    this.externalSubtitleTasks = []
    this.lastSelectedInnerSubtitleStreamIndex = -1

    mutex.init(addressof(this.GlobalData.avpacketListMutex))
    mutex.init(addressof(this.GlobalData.avframeListMutex))

    logger.info(`create player, taskId: ${this.taskId}`)
  }

  /**
   * 当前播放时间戳（毫秒）
   */
  get currentTime(): int64 {
    if (this.useMSE) {
      return static_cast<int64>((((this.video || this.audio)?.currentTime || 0) * 1000) as double)
    }
    if (this.selectedAudioStream) {
      return this.GlobalData.stats.audioCurrentTime
    }
    else if (this.selectedVideoStream) {
      return this.GlobalData.stats.videoCurrentTime
    }
    return 0n
  }

  private isCodecIdSupported(codecId: AVCodecID) {
    if (codecId > AVCodecID.AV_CODEC_ID_FIRST_AUDIO && codecId <= AVCodecID.AV_CODEC_ID_PCM_SGA) {
      return true
    }
    return array.has(AVPlayerSupportedCodecs, codecId)
  }

  private findBestStream(streams: AVStreamInterface[], mediaType: AVMediaType) {
    if (this.options.findBestStream) {
      return this.options.findBestStream(streams, mediaType)
    }
    const ss = streams.filter((stream) => {
      return stream.codecpar.codecType === mediaType
    })
    if (ss.length) {
      if (ss.length === 1) {
        return ss[0]
      }
      const defaultStream = ss.find((stream) => !!(stream.disposition & AVDisposition.DEFAULT))
      if (defaultStream && this.isCodecIdSupported(defaultStream.codecpar.codecId)) {
        return defaultStream
      }
      return ss.find((stream) => this.isCodecIdSupported(stream.codecpar.codecId)) || ss[0]
    }
  }

  private async checkUseMSE() {
    if (defined(ENABLE_MSE)) {
      if (!support.mse) {
        return false
      }

      // 不支持 wasm
      if (!support.wasmBaseSupported) {
        return true
      }

      const videoStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_VIDEO)
      const audioStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_AUDIO)

      // 检查音视频在 MediaSource 里面是否支持，不支持的只能使用 wasm 软解了
      if (videoStream && !getMediaSource().isTypeSupported(getVideoMimeType(videoStream.codecpar))) {
        logger.warn(`can not support mse for codec: ${getVideoMimeType(videoStream.codecpar)}, taskId: ${this.taskId}`)
        return false
      }
      if (audioStream && !getMediaSource().isTypeSupported(getAudioMimeType(audioStream.codecpar))) {
        logger.warn(`can not support mse for codec: ${getAudioMimeType(audioStream.codecpar)}, taskId: ${this.taskId}`)
        return false
      }

      if (this.options.checkUseMES) {
        return this.options.checkUseMES(this.formatContext.streams)
      }

      if (videoStream) {
        // 目前 canvas 还不能渲染 hdr 视频，hdr 先使用 mse 播放
        // TODO 未来 canvas 支持 hdr 渲染之后去掉
        if (isHdr(videoStream.codecpar)) {
          logger.info('use mse because of hdr')
          return true
        }
        // 1080p 以上使用 mse
        if (videoStream.codecpar.width * videoStream.codecpar.height > 1920 * 1080) {
          // 不支持 webcodec
          if (!support.videoDecoder) {
            return true
          }

          let extradata = null
          if (videoStream.codecpar.extradata !== nullptr) {
            extradata = mapUint8Array(videoStream.codecpar.extradata, videoStream.codecpar.extradataSize)
          }
          // 检查视频格式是否支持硬解，不支持使用 mse
          const isWebcodecSupport = await VideoDecoder.isConfigSupported({
            codec: getVideoCodec(videoStream.codecpar),
            codedWidth: videoStream.codecpar.width,
            codedHeight: videoStream.codecpar.height,
            description: extradata,
            hardwareAcceleration: getHardwarePreference(true)
          })

          if (!isWebcodecSupport.supported) {
            return true
          }
        }
        else if (videoStream.codecpar.width * videoStream.codecpar.height === 1920 * 1080) {
          // safari 1080p@30fps 无法在 worker 中解码
          if (browser.safari && !browser.checkVersion(browser.version, '16.1', true) && avQ2D(videoStream.codecpar.framerate) > 30) {
            return true
          }
        }
      }
    }
    else {
      logger.warn('player built without enable mse')
    }
    return false
  }

  private createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.id = 'avplayer-canvas-' + generateUUID()
    canvas.className = 'avplayer-canvas'
    canvas.width = this.options.container.offsetWidth * devicePixelRatio
    canvas.height = this.options.container.offsetHeight * devicePixelRatio
    canvas.style.cssText = `
      width: 100%;
      height: 100%;
    `
    canvas.ondragstart = () => false

    Object.defineProperty(canvas, 'currentTime', {
      enumerable: true,
      configurable: false,
      get: () => {
        return Number(this.currentTime) / 1000
      },
      set: (time: number) => {
        this.seek(static_cast<int64>(Math.floor(time * 1000)))
      }
    })

    return canvas
  }

  private createVideo() {
    if (this.video) {
      this.options.container.removeChild(this.video)
    }
    const video = document.createElement('video')
    video.autoplay = true
    video.className = 'avplayer-video'
    video.style.cssText = `
      width: 100%;
      height: 100%;
    `
    this.options.container.appendChild(video)
    this.video = video
  }

  private createAudio() {
    if (this.audio) {
      this.options.container.removeChild(this.audio)
    }
    const audio = document.createElement('audio')
    audio.autoplay = true
    audio.className = 'avplayer-audio'
    this.options.container.appendChild(audio)
    this.audio = audio
  }

  private handleTimeupdate(element: HTMLAudioElement | HTMLVideoElement) {
    let lastNotifyTime = 0
    element.ontimeupdate = () => {
      const time = element.currentTime
      if (Math.abs(time - lastNotifyTime) >= 1) {
        if (this.status === AVPlayerStatus.PLAYED) {
          this.fire(eventType.TIME, [this.currentTime])
          AVPlayer.MSEThread.setCurrentTime(this.taskId, time)
        }
        lastNotifyTime = time
      }
    }
    element.onended = () => {
      this.audioEnded = true
      this.videoEnded = true
      this.handleEnded()
    }
    element.onwaiting = () => {
      if (this.audio === element) {
        this.GlobalData.stats.audioStutter++
      }
      else {
        this.GlobalData.stats.audioStutter++
        this.GlobalData.stats.videoStutter++
      }
    }
    element.oncanplay = () => {
      if (this.status === AVPlayerStatus.PLAYED) {
        element.play()
      }
    }
  }

  private async handleEnded() {
    if (this.audioEnded && this.videoEnded) {

      logger.info(`player ended, taskId: ${this.taskId}`)

      if (this.options.loop && !this.options.isLive) {

        logger.info(`loop play, taskId: ${this.taskId}`)

        if (defined(ENABLE_PROTOCOL_HLS) && this.isHls()) {
          await AVPlayer.DemuxerThread.seek(this.taskId, 0n, AVSeekFlags.TIMESTAMP)
        }
        else if (defined(ENABLE_PROTOCOL_DASH) && this.isDash()) {
          await AVPlayer.DemuxerThread.seek(this.taskId, 0n, AVSeekFlags.TIMESTAMP)
          if (defined(ENABLE_PROTOCOL_DASH) && this.subTaskId) {
            await AVPlayer.DemuxerThread.seek(this.subTaskId, 0n, AVSeekFlags.TIMESTAMP)
          }
          if ((defined(ENABLE_PROTOCOL_DASH) || defined(ENABLE_PROTOCOL_HLS)) && this.subtitleTaskId) {
            await AVPlayer.DemuxerThread.seek(this.subtitleTaskId, 0n, AVSeekFlags.TIMESTAMP)
          }
        }
        else {
          await AVPlayer.DemuxerThread.seek(this.taskId, 0n, AVSeekFlags.FRAME)
        }

        for (let i = 0; i < this.externalSubtitleTasks.length; i++) {
          await AVPlayer.DemuxerThread.seek(this.externalSubtitleTasks[0].taskId, 0n, AVSeekFlags.FRAME)
        }

        this.fire(eventType.TIME, [0n])

        if (defined(ENABLE_MSE) && this.useMSE) {
          if ((this.video || this.audio)?.src) {
            URL.revokeObjectURL((this.video || this.audio).src)
          }
          await AVPlayer.MSEThread.restart(this.taskId)
          const mediaSource = await AVPlayer.MSEThread.getMediaSource(this.taskId)
          if (mediaSource) {
            if (support.workerMSE && mediaSource instanceof MediaSourceHandle) {
              (this.video || this.audio).srcObject = mediaSource
            }
            else {
              (this.video || this.audio).src = URL.createObjectURL(mediaSource)
            }
            if (this.video) {
              this.video.currentTime = 0
              this.video.playbackRate = this.playRate
            }
            else if (this.audio) {
              this.audio.currentTime = 0
              this.audio.playbackRate = this.playRate
            }
            await Promise.all([
              this.video?.play(),
              this.audio?.play()
            ])
          }
        }
        else {
          if (this.audioDecoder2AudioRenderChannel) {
            await AVPlayer.AudioDecoderThread.resetTask(this.taskId)
            await AVPlayer.AudioRenderThread.restart(this.taskId)
          }

          if (this.audioSourceNode) {
            await this.audioSourceNode.request('restart')
            if (AVPlayer.audioContext.state === 'suspended') {
              await AVPlayer.AudioRenderThread.fakePlay(this.taskId)
            }
            this.audioEnded = false
          }

          if (this.videoDecoder2VideoRenderChannel) {
            await this.VideoDecoderThread.resetTask(this.taskId)
            await this.VideoRenderThread.restart(this.taskId)
            this.videoEnded = false
          }
        }

        if (this.subtitleRender) {
          this.subtitleRender.reset()
          this.subtitleRender.start()
        }
      }
      else {

        if ((this.video || this.audio)?.src) {
          URL.revokeObjectURL((this.video || this.audio).src)
        }

        if (this.video) {
          this.options.container.removeChild(this.video)
          this.video = null
        }
        if (this.audio) {
          this.options.container.removeChild(this.audio)
          this.audio = null
        }
        if (this.canvas) {
          this.options.container.removeChild(this.canvas)
          this.canvas = null
        }

        await this.stop()

        this.fire(eventType.ENDED)
      }
    }
  }

  /**
   * 当前播放的源是否是 hls
   * 
   * @returns 
   */
  public isHls() {
    return this.ext === 'm3u8' || this.ext === 'm3u'
  }

  /**
   * 当前播放的源是否是 dash
   * 
   * @returns 
   */
  public isDash() {
    return this.ext === 'mpd'
  }

  private async getResource(type: 'decoder' | 'resampler' | 'stretchpitcher', codecId?: AVCodecID, mediaType?: AVMediaType) {
    const key = codecId != null ? `${type}-${codecId}` : type

    if (AVPlayer.Resource.has(key)) {
      return AVPlayer.Resource.get(key)
    }

    const wasmUrl = this.options.getWasm(type, codecId, mediaType)

    if (wasmUrl) {
      let resource: WebAssemblyResource | ArrayBuffer
      // safari 16 以下不支持将 WebAssembly.Module 传递到 worker 中
      if (browser.safari && !browser.checkVersion(browser.version, '16.1', true) && (is.string(wasmUrl) || is.arrayBuffer(wasmUrl))) {
        if (is.string(wasmUrl)) {
          const params: Data = {
            method: 'GET',
            headers: {},
            mode: 'cors',
            cache: 'default',
            referrerPolicy: 'no-referrer-when-downgrade'
          }
          const response = await fetch(wasmUrl, params)
          resource = await response.arrayBuffer()
        }
        else {
          resource = wasmUrl
        }
      }
      else {
        resource = await compileResource(wasmUrl, mediaType === AVMediaType.AVMEDIA_TYPE_VIDEO)
      }

      AVPlayer.Resource.set(key, resource)

      return resource
    }
  }

  private createSubtitleRender(subtitleStream: AVStreamInterface, taskId: string) {
    this.subtitleRender = new SubtitleRender({
      dom: this.canvas || this.video || this.options.container,
      getCurrentTime: () => {
        return this.currentTime
      },
      avpacketList: addressof(this.GlobalData.avpacketList),
      avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
      codecpar: subtitleStream.codecpar,
      container: this.options.container,
      videoWidth: this.selectedVideoStream?.codecpar.width ?? 0,
      videoHeight: this.selectedVideoStream?.codecpar.height ?? 0
    })

    this.subtitleRender.setDemuxTask(taskId)

    this.selectedSubtitleStream = subtitleStream

    if (taskId === this.taskId) {
      this.lastSelectedInnerSubtitleStreamIndex = subtitleStream.index
    }

    AVPlayer.DemuxerThread.connectStreamTask.transfer(this.subtitleRender.getDemuxerPort(taskId))
      .invoke(taskId, subtitleStream.index, this.subtitleRender.getDemuxerPort(taskId))
  }

  /**
   * 加载外挂字幕
   * 
   * @param externalSubtitle 
   * @returns 
   */
  public async loadExternalSubtitle(externalSubtitle: ExternalSubtitle) {

    if (this.status === AVPlayerStatus.DESTROYING || this.status === AVPlayerStatus.DESTROYED) {
      logger.fatal('player has already destroyed')
    }

    if (!externalSubtitle.source) {
      logger.fatal('external subtitle must has source')
    }

    if (this.externalSubtitleTasks.some((task) => task.source === externalSubtitle.source)) {
      logger.warn('external subtitle has already loaded')
      return
    }

    const taskId = generateUUID()

    const ioloader2DemuxerChannel = createMessageChannel(this.options.enableWorker)

    const externalSubtitleTask: ExternalSubtitleTask = object.extend({
      taskId,
      streamId: -1,
      ioloader2DemuxerChannel
    }, externalSubtitle)

    let ext = ''
    let ret = 0

    if (is.string(externalSubtitle.source)) {
      ext = urlUtils.parse(externalSubtitle.source).file.split('.').pop()
      ret = await AVPlayer.IOThread.registerTask
        .transfer(ioloader2DemuxerChannel.port1)
        .invoke({
          type: IOType.Fetch,
          info: {
            url: externalSubtitle.source
          },
          range: {
            from: -1,
            to: -1
          },
          taskId: taskId,
          options: {
            isLive: this.options.isLive
          },
          rightPort: ioloader2DemuxerChannel.port1,
          stats: addressof(this.GlobalData.stats)
        })
    }
    else {
      ext = externalSubtitle.source.name.split('.').pop()
      ret = await AVPlayer.IOThread.registerTask
        .transfer(ioloader2DemuxerChannel.port1)
        .invoke({
          type: IOType.File,
          info: {
            file: externalSubtitle.source
          },
          range: {
            from: -1,
            to: -1
          },
          taskId: taskId,
          options: {
            isLive: this.options.isLive
          },
          rightPort: ioloader2DemuxerChannel.port1,
          stats: addressof(this.GlobalData.stats)
        })
    }

    if (ret < 0) {
      logger.fatal(`register io task failed, ret: ${ret}, taskId: ${this.taskId}`)
    }

    await AVPlayer.DemuxerThread.registerTask.transfer(ioloader2DemuxerChannel.port2)
      .invoke({
        taskId: taskId,
        leftPort: ioloader2DemuxerChannel.port2,
        format: Ext2Format[ext],
        stats: nullptr,
        isLive: false,
        flags: 0,
        avpacketList: addressof(this.GlobalData.avpacketList),
        avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
      })

    ret = await AVPlayer.DemuxerThread.openStream(taskId)
    if (ret < 0) {
      logger.fatal(`open external subtitle failed, ret: ${ret}, taskId: ${taskId}`)
    }
    let formatContext = await AVPlayer.DemuxerThread.analyzeStreams(taskId)
    if (is.number(formatContext) || !formatContext.streams.length) {
      logger.fatal(`analyze stream failed, ret: ${formatContext}`)
    }

    const stream = formatContext.streams[0]

    this.formatContext.streams.push(stream)

    externalSubtitleTask.streamId = stream.id

    if (externalSubtitle.lang) {
      stream.metadata['language'] = externalSubtitle.lang
    }
    if (externalSubtitle.title) {
      stream.metadata['title'] = externalSubtitle.title
    }

    const handleStatus = this.status === AVPlayerStatus.PAUSED
      || this.status === AVPlayerStatus.PLAYED
      || this.status === AVPlayerStatus.SEEKING
      || this.status === AVPlayerStatus.CHANGING

    if (handleStatus) {
      await AVPlayer.DemuxerThread.seek(taskId, this.currentTime, AVSeekFlags.FRAME)
    }

    if (handleStatus && !this.subtitleRender) {
      this.createSubtitleRender(stream, taskId)
      this.subtitleRender.start()
    }
    else if (this.subtitleRender) {
      await AVPlayer.DemuxerThread.connectStreamTask.transfer(this.subtitleRender.getDemuxerPort(taskId))
        .invoke(taskId, stream.index, this.subtitleRender.getDemuxerPort(taskId))
    }

    await AVPlayer.DemuxerThread.startDemux(taskId, false, 10)
    this.externalSubtitleTasks.push(externalSubtitleTask)

    this.fire(eventType.STREAM_UPDATE)

    return 0
  }

  /**
   * 加载媒体源，分析流信息
   * 
   * @param source 媒体源，支持 url 和 文件
   * @param externalSubtitles 外挂字幕源
   */
  public async load(source: string | File | CustomIOLoader, externalSubtitles: ExternalSubtitle[] = []) {

    logger.info(`call load, taskId: ${this.taskId}`)

    this.status = AVPlayerStatus.LOADING
    this.fire(eventType.LOADING)

    this.controller = new Controller(this, this.options.enableWorker)
    this.ioloader2DemuxerChannel = createMessageChannel(this.options.enableWorker)

    memset(addressof(this.GlobalData.stats), 0, sizeof(Stats))
    this.externalSubtitleTasks.length = 0

    await AVPlayer.startDemuxPipeline(this.options.enableWorker)

    let ret = 0
    if (is.string(source)) {
      this.ext = urlUtils.parse(source).file.split('.').pop()
      // 注册一个 url io 任务
      ret = await AVPlayer.IOThread.registerTask
        .transfer(this.ioloader2DemuxerChannel.port1)
        .invoke({
          type: Ext2IOLoader[this.ext] ?? IOType.Fetch,
          info: {
            url: source
          },
          range: {
            from: -1,
            to: -1
          },
          taskId: this.taskId,
          options: {
            isLive: this.options.isLive
          },
          rightPort: this.ioloader2DemuxerChannel.port1,
          stats: addressof(this.GlobalData.stats)
        })
    }
    else if (source instanceof File) {
      this.options.isLive = false
      this.ext = source.name.split('.').pop()
      // 注册一个文件 io 任务
      ret = await AVPlayer.IOThread.registerTask
        .transfer(this.ioloader2DemuxerChannel.port1)
        .invoke({
          type: IOType.File,
          info: {
            file: source
          },
          range: {
            from: -1,
            to: -1
          },
          taskId: this.taskId,
          options: {
            isLive: false
          },
          rightPort: this.ioloader2DemuxerChannel.port1,
          stats: addressof(this.GlobalData.stats)
        })
    }
    else if (source instanceof CustomIOLoader) {
      this.ext = source.ext
      this.ioIPCPort = new IPCPort(this.ioloader2DemuxerChannel.port1)
      this.ioIPCPort.on(REQUEST, async (request: RpcMessage) => {
        switch (request.method) {
          case 'open': {
            try {
              const ret = await source.open()
              if (ret < 0) {
                logger.error(`custom loader open error, ${ret}, taskId: ${this.taskId}`)
                this.ioIPCPort.reply(request, null, ret)
                break
              }
              this.ioIPCPort.reply(request, ret)
            }
            catch (error) {
              logger.error(`loader open error, ${error}, taskId: ${this.taskId}`)
              this.ioIPCPort.reply(request, null, error)
            }
            break
          }
          case 'read': {
            const pointer = request.params.pointer
            const length = request.params.length
            const ioloaderOptions = request.params.ioloaderOptions

            const buffer = AVPlayer.IODemuxProxy ? new Uint8Array(length) : mapSafeUint8Array(pointer, length)

            try {
              const len = await source.read(buffer, ioloaderOptions)
              this.GlobalData.stats.bufferReceiveBytes += static_cast<int64>(len)
              this.ioIPCPort.reply(request, AVPlayer.IODemuxProxy ? buffer : len, null, AVPlayer.IODemuxProxy ? [buffer.buffer] : null)
            }
            catch (error) {
              logger.error(`loader read error, ${error}, taskId: ${this.taskId}`)
              this.ioIPCPort.reply(request, errorType.DATA_INVALID)
            }

            break
          }

          case 'seek': {
            const pos = request.params.pos
            const ioloaderOptions = request.params.ioloaderOptions

            assert(pos >= 0)

            try {
              const ret = await source.seek(pos, ioloaderOptions)
              if (ret < 0) {
                logger.error(`custom loader seek error, ${ret}, taskId: ${this.taskId}`)
                this.ioIPCPort.reply(request, null, ret)
                break
              }
              this.ioIPCPort.reply(request, ret)
            }
            catch (error) {
              logger.error(`loader seek error, ${error}, taskId: ${this.taskId}`)
              this.ioIPCPort.reply(request, null, error)
            }
            break
          }

          case 'size': {
            this.ioIPCPort.reply(request, await source.size())
            break
          }
        }
      })
    }
    else {
      logger.fatal('invalid source')
    }

    if (ret < 0) {
      logger.fatal(`register io task failed, ret: ${ret}, taskId: ${this.taskId}`)
    }

    if (defined(ENABLE_PROTOCOL_DASH) && this.isDash()) {
      await AVPlayer.IOThread.open(this.taskId)
      const hasAudio = await AVPlayer.IOThread.hasAudio(this.taskId)
      const hasVideo = await AVPlayer.IOThread.hasVideo(this.taskId)
      if (hasAudio && hasVideo) {
        // dash 因为音视频各自独立，因此这里注册两个解封装任务
        this.subTaskId = generateUUID()
        await AVPlayer.DemuxerThread.registerTask
          .transfer(this.ioloader2DemuxerChannel.port2, this.controller.getDemuxerControlPort())
          .invoke({
            taskId: this.taskId,
            leftPort: this.ioloader2DemuxerChannel.port2,
            controlPort: this.controller.getDemuxerControlPort(),
            format: Ext2Format[this.ext],
            stats: addressof(this.GlobalData.stats),
            isLive: this.options.isLive,
            flags: IOFlags.SLICE,
            ioloaderOptions: {
              mediaType: 'audio'
            },
            avpacketList: addressof(this.GlobalData.avpacketList),
            avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
          })
        await AVPlayer.DemuxerThread.registerTask({
          taskId: this.subTaskId,
          mainTaskId: this.taskId,
          flags: IOFlags.SLICE,
          format: Ext2Format[this.ext],
          stats: addressof(this.GlobalData.stats),
          isLive: this.options.isLive,
          ioloaderOptions: {
            mediaType: 'video'
          },
          avpacketList: addressof(this.GlobalData.avpacketList),
          avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
        })
      }
      else {
        // dash 只有一个媒体类型
        await AVPlayer.DemuxerThread.registerTask
          .transfer(this.ioloader2DemuxerChannel.port2, this.controller.getDemuxerControlPort())
          .invoke({
            taskId: this.taskId,
            leftPort: this.ioloader2DemuxerChannel.port2,
            controlPort: this.controller.getDemuxerControlPort(),
            format: Ext2Format[this.ext],
            stats: addressof(this.GlobalData.stats),
            isLive: this.options.isLive,
            flags: IOFlags.SLICE,
            ioloaderOptions: {
              mediaType: hasAudio ? 'audio' : 'video'
            },
            avpacketList: addressof(this.GlobalData.avpacketList),
            avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
          })
      }
    }
    else {
      await AVPlayer.DemuxerThread.registerTask
        .transfer(this.ioloader2DemuxerChannel.port2, this.controller.getDemuxerControlPort())
        .invoke({
          taskId: this.taskId,
          leftPort: this.ioloader2DemuxerChannel.port2,
          controlPort: this.controller.getDemuxerControlPort(),
          format: Ext2Format[this.ext],
          stats: addressof(this.GlobalData.stats),
          isLive: this.options.isLive,
          flags: this.isHls() ? IOFlags.SLICE : 0,
          avpacketList: addressof(this.GlobalData.avpacketList),
          avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
        })
    }

    if (defined(ENABLE_PROTOCOL_DASH) && this.isDash() || defined(ENABLE_PROTOCOL_HLS) && this.isHls()) {
      const hasSubtitle = await AVPlayer.IOThread.hasSubtitle(this.taskId)
      if (hasSubtitle) {
        // dash 和 hls 的字幕
        this.subtitleTaskId = generateUUID()
        await AVPlayer.DemuxerThread.registerTask({
          taskId: this.subtitleTaskId,
          mainTaskId: this.taskId,
          flags: IOFlags.SLICE,
          format: Ext2Format[this.ext],
          stats: addressof(this.GlobalData.stats),
          isLive: this.options.isLive,
          ioloaderOptions: {
            mediaType: 'subtitle'
          },
          avpacketList: addressof(this.GlobalData.avpacketList),
          avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
        })
      }
    }

    this.fire(eventType.PROGRESS, [AVPlayerProgress.OPEN_FILE])

    ret = await AVPlayer.DemuxerThread.openStream(this.taskId)
    if (ret < 0) {
      logger.fatal(`open stream failed, ret: ${ret}, taskId: ${this.taskId}`)
    }

    this.fire(eventType.PROGRESS, [AVPlayerProgress.ANALYZE_FILE, this.ext])

    let formatContext = await AVPlayer.DemuxerThread.analyzeStreams(this.taskId)
    if (is.number(formatContext) || !formatContext.streams.length) {
      logger.fatal(`analyze stream failed, ret: ${formatContext}`)
    }

    if (defined(ENABLE_PROTOCOL_DASH) && this.subTaskId) {
      ret = await AVPlayer.DemuxerThread.openStream(this.subTaskId)
      if (ret < 0) {
        logger.fatal(`open stream failed, ret: ${ret}, taskId: ${this.subTaskId}`)
      }
      const subFormatContext = await AVPlayer.DemuxerThread.analyzeStreams(this.subTaskId)
      if (is.number(subFormatContext) || !subFormatContext.streams.length) {
        logger.fatal(`analyze stream failed, ret: ${subFormatContext}`)
      }
      formatContext.streams = formatContext.streams.concat(subFormatContext.streams)
    }

    if ((defined(ENABLE_PROTOCOL_DASH) || defined(ENABLE_PROTOCOL_HLS)) && this.subtitleTaskId) {
      ret = await AVPlayer.DemuxerThread.openStream(this.subtitleTaskId)
      if (ret < 0) {
        logger.fatal(`open subtitle stream failed, ret: ${ret}, taskId: ${this.subtitleTaskId}`)
      }
      const subFormatContext = await AVPlayer.DemuxerThread.analyzeStreams(this.subtitleTaskId)
      if (is.number(subFormatContext) || !subFormatContext.streams.length) {
        logger.fatal(`analyze subtitle stream failed, ret: ${subFormatContext}`)
      }
      formatContext.streams = formatContext.streams.concat(subFormatContext.streams)
    }

    this.formatContext = formatContext
    this.source = source

    for (let i = 0; i < externalSubtitles.length; i++) {
      await this.loadExternalSubtitle(externalSubtitles[i])
    }

    formatContext.streams.forEach((stream) => {
      if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO) {
        this.GlobalData.stats.audiocodec = getAudioCodec(stream.codecpar)
      }
      else if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO) {
        this.GlobalData.stats.videocodec = getVideoCodec(stream.codecpar)
      }
    })

    logger.info('\n' + dump([formatContext], [{
      from: is.string(source) ? source : source.name,
      tag: 'Input'
    }]))

    if (defined(ENABLE_PROTOCOL_DASH) || defined(ENABLE_PROTOCOL_HLS)) {
      // m3u8 和 dash 的 duration 来自于协议本身
      if (this.isHls() || this.isDash()) {
        const duration: double = (await AVPlayer.IOThread.getDuration(this.taskId)) * 1000
        if (duration > 0) {
          for (let i = 0; i < this.formatContext.streams.length; i++) {
            this.formatContext.streams[i].duration = avRescaleQ(
              static_cast<int64>(duration),
              AV_MILLI_TIME_BASE_Q,
              this.formatContext.streams[i].timeBase
            )
          }
        }
      }
    }

    if (this.options.isLive && this.options.lowLatency) {
      const min = Math.max(
        this.source instanceof CustomIOLoader
          ? this.source.minBuffer
          : await AVPlayer.IOThread.getMinBuffer(this.taskId),
        this.options.jitterBufferMin
      )
      let max = this.options.jitterBufferMax
      if (max <= min) {
        max = min + ((this.isHls() || this.isDash()) ? min : 1)
      }
      this.jitterBufferController = new JitterBufferController({
        stats: addressof(this.GlobalData.stats),
        jitterBuffer: addressof(this.GlobalData.stats.jitterBuffer),
        lowLatencyStart: !(this.isHls() || this.isDash()),
        useMse: this.useMSE,
        max,
        min,
        observer: {
          onCroppingBuffer: (max) => {
            logger.debug(`cropping buffer by jitter buffer, max: ${max}, taskId: ${this.taskId}`)
            AVPlayer.DemuxerThread?.croppingAVPacketQueue(this.taskId, static_cast<int64>(max))
          },
          onSetPlayRate: (rate) => {
            logger.debug(`set play rate by jitter buffer, rate: ${rate}, taskId: ${this.taskId}`)
            if (defined(ENABLE_MSE) && this.useMSE) {
              AVPlayer.MSEThread.setPlayRate(this.taskId, rate)
              if (this.video) {
                this.video.playbackRate = rate
              }
              else if (this.audio) {
                this.audio.playbackRate = rate
              }
            }
            else {
              if (this.audioDecoder2AudioRenderChannel) {
                AVPlayer.AudioRenderThread.setPlayTempo(this.taskId, rate)
              }
              if (this.videoDecoder2VideoRenderChannel) {
                this.VideoRenderThread.setPlayRate(this.taskId, rate)
              }
            }
          }
        }
      })
    }

    this.status = AVPlayerStatus.LOADED

    this.fire(eventType.LOADED)
  }

  /**
   * 播放
   * 
   * @param options 
   * @returns 
   */
  public async play(options: {
    /**
     * 是否播放音频
     */
    audio?: boolean
    /**
     * 是否播放视频
     */
    video?: boolean
    /**
     * 是否播放字幕
     */
    subtitle?: boolean
  } = {
    audio: true,
    video: true,
    subtitle: true
  }) {

    logger.info(`call play, options: ${JSON.stringify(options)}, status: ${this.status} taskId: ${this.taskId}`)

    if (this.status === AVPlayerStatus.PLAYED) {
      return
    }

    if (!options.audio && !options.video) {
      logger.warn(`video and audio must play one, ignore options, we will try to play video and audio, taskId: ${this.taskId}`)
      options.audio = true
      options.video = true
    }

    const promises = []

    if (this.status === AVPlayerStatus.PAUSED) {

      // 逐帧播放之后视频与音频相差可能过大，这里同步一下
      if (this.selectedAudioStream && this.selectedVideoStream && (this.GlobalData.stats.videoCurrentTime - this.GlobalData.stats.audioCurrentTime > 400n)) {
        await AVPlayer.AudioRenderThread.syncSeekTime(this.taskId, this.GlobalData.stats.videoCurrentTime)
      }

      if (defined(ENABLE_MSE) && this.useMSE) {
        promises.push(AVPlayer.MSEThread.unpause(this.taskId))
        if (this.audio) {
          this.audio.play()
        }
        else if (this.video) {
          this.video.play()
        }
      }
      else {
        if (this.audioSourceNode) {
          promises.push(this.audioSourceNode.request('unpause'))
          promises.push(AVPlayer.AudioRenderThread.unpause(this.taskId))
        }
        if (this.videoDecoder2VideoRenderChannel) {
          promises.push(this.VideoRenderThread.unpause(this.taskId))
        }
      }
      return Promise.all(promises).then(() => {
        this.status = AVPlayerStatus.PLAYED
        this.fire(eventType.PLAYED)
        if (this.jitterBufferController) {
          this.jitterBufferController.start()
        }
        if (this.subtitleRender) {
          this.subtitleRender.start()
        }
      })
    }

    this.status = AVPlayerStatus.PLAYING
    this.fire(eventType.PLAYING)

    this.useMSE = await this.checkUseMSE()

    this.audioEnded = true
    this.videoEnded = true

    if (defined(ENABLE_MSE) && this.useMSE) {
      await AVPlayer.startMSEPipeline(this.options.enableWorker)

      AVPlayer.MSEThread.setPlayRate(this.taskId, this.playRate)

      const videoStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_VIDEO)
      const audioStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_AUDIO)

      let hasVideo = false

      // 注册一个 mse 处理任务
      await AVPlayer.MSEThread.registerTask.transfer(this.controller.getMuxerControlPort())
        .invoke({
          taskId: this.taskId,
          stats: addressof(this.GlobalData.stats),
          controlPort: this.controller.getMuxerControlPort(),
          isLive: this.options.isLive,
          avpacketList: addressof(this.GlobalData.avpacketList),
          avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
          enableJitterBuffer: !!this.jitterBufferController
        })

      if (videoStream && options.video) {
        this.fire(eventType.PROGRESS, [AVPlayerProgress.LOAD_VIDEO_DECODER, videoStream])
        hasVideo = true
        this.selectedVideoStream = videoStream
        this.videoEnded = false
        this.demuxer2VideoDecoderChannel = createMessageChannel(this.options.enableWorker)
        await AVPlayer.DemuxerThread.connectStreamTask
          .transfer(this.demuxer2VideoDecoderChannel.port1)
          .invoke(this.subTaskId || this.taskId, videoStream.index, this.demuxer2VideoDecoderChannel.port1)
        await AVPlayer.MSEThread.addStream.transfer(this.demuxer2VideoDecoderChannel.port2)
          .invoke(
            this.taskId,
            videoStream.index,
            serializeAVCodecParameters(videoStream.codecpar),
            videoStream.timeBase,
            videoStream.startTime,
            this.demuxer2VideoDecoderChannel.port2
          )
      }
      if (audioStream && options.audio) {
        this.fire(eventType.PROGRESS, [AVPlayerProgress.LOAD_AUDIO_DECODER, audioStream])
        this.selectedAudioStream = audioStream
        this.audioEnded = false
        this.demuxer2AudioDecoderChannel = createMessageChannel(this.options.enableWorker)
        await AVPlayer.DemuxerThread.connectStreamTask
          .transfer(this.demuxer2AudioDecoderChannel.port1)
          .invoke(this.taskId, audioStream.index, this.demuxer2AudioDecoderChannel.port1)
        await AVPlayer.MSEThread.addStream.transfer(this.demuxer2AudioDecoderChannel.port2)
          .invoke(
            this.taskId,
            audioStream.index,
            serializeAVCodecParameters(audioStream.codecpar),
            audioStream.timeBase,
            audioStream.startTime,
            this.demuxer2AudioDecoderChannel.port2
          )
      }

      if (hasVideo) {
        this.createVideo()
      }
      else {
        this.createAudio()
      }

      const mediaSource = await AVPlayer.MSEThread.getMediaSource(this.taskId)

      if (mediaSource) {
        if (support.workerMSE && mediaSource instanceof MediaSourceHandle) {
          (this.video || this.audio).srcObject = mediaSource
        }
        else {
          (this.video || this.audio).src = URL.createObjectURL(mediaSource)
        }
        this.handleTimeupdate(this.video || this.audio)
      }
    }
    else {

      let audioStartTime: int64 = 0n
      let videoStartTime: int64 = 0n

      const videoStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_VIDEO)
      const audioStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_AUDIO)

      if (videoStream && options.video) {
        this.fire(eventType.PROGRESS, [AVPlayerProgress.LOAD_VIDEO_DECODER, videoStream])
        this.selectedVideoStream = videoStream

        await AVPlayer.startVideoRenderPipeline(this.options.enableWorker)
        await this.createVideoDecoderThread(this.options.enableWorker)

        videoStartTime = avRescaleQ(videoStream.startTime, videoStream.timeBase, AV_MILLI_TIME_BASE_Q)

        this.demuxer2VideoDecoderChannel = createMessageChannel(this.options.enableWorker)
        this.videoDecoder2VideoRenderChannel = createMessageChannel(this.options.enableWorker)

        let resource = await this.getResource('decoder', videoStream.codecpar.codecId, videoStream.codecpar.codecType)
        if (!resource) {
          if (support.videoDecoder) {
            const isSupport = await VideoDecoder.isConfigSupported({
              codec: getVideoCodec(videoStream.codecpar)
            })
            if (!isSupport.supported) {
              logger.fatal(`${dumpCodecName(videoStream.codecpar.codecType, videoStream.codecpar.codecId)} codecId ${videoStream.codecpar.codecId} not support`)
            }
          }
          else {
            logger.fatal(`${dumpCodecName(videoStream.codecpar.codecType, videoStream.codecpar.codecId)} codecId ${videoStream.codecpar.codecId} not support`)
          }
        }

        // 注册一个视频解码任务
        await this.VideoDecoderThread.registerTask
          .transfer(this.demuxer2VideoDecoderChannel.port2, this.videoDecoder2VideoRenderChannel.port1)
          .invoke({
            taskId: this.taskId,
            resource,
            leftPort: this.demuxer2VideoDecoderChannel.port2,
            rightPort: this.videoDecoder2VideoRenderChannel.port1,
            stats: addressof(this.GlobalData.stats),
            enableHardware: this.options.enableHardware,
            avpacketList: addressof(this.GlobalData.avpacketList),
            avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
            avframeList: addressof(this.GlobalData.avframeList),
            avframeListMutex: addressof(this.GlobalData.avframeListMutex),
            preferWebCodecs: !isHdr(videoStream.codecpar) && !hasAlphaChannel(videoStream.codecpar)
          })

        let ret = await this.VideoDecoderThread.open(this.taskId, serializeAVCodecParameters(videoStream.codecpar))
        if (ret < 0) {
          logger.fatal(`cannot open video ${dumpCodecName(videoStream.codecpar.codecType, videoStream.codecpar.codecId)} decoder`)
        }

        await AVPlayer.DemuxerThread.connectStreamTask
          .transfer(this.demuxer2VideoDecoderChannel.port1)
          .invoke(this.subTaskId || this.taskId, videoStream.index, this.demuxer2VideoDecoderChannel.port1)

        this.VideoDecoderThread.setPlayRate(this.taskId, this.playRate)
      }
      if (audioStream && options.audio) {
        this.fire(eventType.PROGRESS, [AVPlayerProgress.LOAD_AUDIO_DECODER, audioStream])
        this.selectedAudioStream = audioStream
        await AVPlayer.startAudioPipeline(this.options.enableWorker)

        if (AVPlayer.audioContext.state === 'suspended') {
          await Promise.race([
            AVPlayer.audioContext.resume(),
            new Sleep(0.1)
          ])
        }

        audioStartTime = avRescaleQ(audioStream.startTime, audioStream.timeBase, AV_MILLI_TIME_BASE_Q)

        this.demuxer2AudioDecoderChannel = createMessageChannel(this.options.enableWorker)
        this.audioDecoder2AudioRenderChannel = createMessageChannel(this.options.enableWorker)

        let resource = await this.getResource('decoder', audioStream.codecpar.codecId, audioStream.codecpar.codecType)

        if (!resource) {
          if (support.audioDecoder) {
            const isSupport = await AudioDecoder.isConfigSupported({
              codec: getAudioCodec(audioStream.codecpar),
              sampleRate: audioStream.codecpar.sampleRate,
              numberOfChannels: audioStream.codecpar.chLayout.nbChannels
            })
            if (!isSupport.supported) {
              logger.fatal(`${dumpCodecName(audioStream.codecpar.codecType, audioStream.codecpar.codecId)} codecId ${audioStream.codecpar.codecId} not support`)
            }
          }
          else {
            logger.fatal(`${dumpCodecName(audioStream.codecpar.codecType, audioStream.codecpar.codecId)} codecId ${audioStream.codecpar.codecId} not support`)
          }
        }

        // 注册一个音频解码任务
        await AVPlayer.AudioDecoderThread.registerTask
          .transfer(this.demuxer2AudioDecoderChannel.port2, this.audioDecoder2AudioRenderChannel.port1)
          .invoke({
            taskId: this.taskId,
            resource,
            leftPort: this.demuxer2AudioDecoderChannel.port2,
            rightPort: this.audioDecoder2AudioRenderChannel.port1,
            stats: addressof(this.GlobalData.stats),
            timeBase: {
              num: audioStream.timeBase.num,
              den: audioStream.timeBase.den,
            },
            avpacketList: addressof(this.GlobalData.avpacketList),
            avpacketListMutex: addressof(this.GlobalData.avpacketListMutex),
            avframeList: addressof(this.GlobalData.avframeList),
            avframeListMutex: addressof(this.GlobalData.avframeListMutex)
          })

        let ret = await AVPlayer.AudioDecoderThread.open(this.taskId, serializeAVCodecParameters(audioStream.codecpar))
        if (ret < 0) {
          logger.fatal(`cannot open audio ${dumpCodecName(audioStream.codecpar.codecType, audioStream.codecpar.codecId)} decoder`)
        }

        await AVPlayer.DemuxerThread.connectStreamTask
          .transfer(this.demuxer2AudioDecoderChannel.port1)
          .invoke(this.taskId, audioStream.index, this.demuxer2AudioDecoderChannel.port1)
      }

      if (this.videoDecoder2VideoRenderChannel) {
        this.canvas = this.createCanvas()
        this.options.container.appendChild(this.canvas)
        const canvas = (supportOffscreenCanvas() && (cheapConfig.USE_THREADS && defined(ENABLE_THREADS) || support.worker))
          ? this.canvas.transferControlToOffscreen()
          : this.canvas
        const stream = this.formatContext.streams.find((stream) => {
          return stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO
        })

        // 注册一个视频渲染任务
        await this.VideoRenderThread.registerTask
          .transfer(
            this.videoDecoder2VideoRenderChannel.port2,
            this.controller.getVideoRenderControlPort(),
            canvas as OffscreenCanvas
          )
          .invoke({
            taskId: this.taskId,
            leftPort: this.videoDecoder2VideoRenderChannel.port2,
            controlPort: this.controller.getVideoRenderControlPort(),
            canvas,
            renderMode: this.renderMode,
            renderRotate: this.renderRotate,
            flipHorizontal: this.flipHorizontal,
            flipVertical: this.flipVertical,
            timeBase: {
              num: stream.timeBase.num,
              den: stream.timeBase.den,
            },
            viewportWidth: this.options.container.offsetWidth,
            viewportHeight: this.options.container.offsetHeight,
            devicePixelRatio: devicePixelRatio,
            stats: addressof(this.GlobalData.stats),
            enableWebGPU: this.options.enableWebGPU,
            startPTS: stream.startTime,
            avframeList: addressof(this.GlobalData.avframeList),
            avframeListMutex: addressof(this.GlobalData.avframeListMutex),
            enableJitterBuffer: !!this.jitterBufferController && !this.audioDecoder2AudioRenderChannel
          })

        this.videoEnded = false
        this.VideoRenderThread.setPlayRate(this.taskId, this.playRate)
        promises.push(this.VideoRenderThread.play(this.taskId))
      }
      if (this.audioDecoder2AudioRenderChannel) {

        const stream = this.formatContext.streams.find((stream) => {
          return stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO
        })

        this.audioRender2AudioWorkletChannel = new MessageChannel()

        const playChannels = Math.max(stream.codecpar.chLayout.nbChannels, Math.min(AVPlayer.audioContext.destination.channelCount, 2))

        let resamplerResource = await this.getResource('resampler')
        let stretchpitcherResource = await this.getResource('stretchpitcher')

        if (!resamplerResource) {
          logger.fatal('resampler not found')
        }
        if (!stretchpitcherResource) {
          logger.fatal('stretch pitcher not found')
        }

        // 注册一个音频渲染任务
        await AVPlayer.AudioRenderThread.registerTask
          .transfer(
            this.audioDecoder2AudioRenderChannel.port2,
            this.audioRender2AudioWorkletChannel.port1,
            this.controller.getAudioRenderControlPort()
          )
          .invoke({
            taskId: this.taskId,
            leftPort: this.audioDecoder2AudioRenderChannel.port2,
            rightPort: this.audioRender2AudioWorkletChannel.port1,
            controlPort: this.controller.getAudioRenderControlPort(),
            playFormat: AVSampleFormat.AV_SAMPLE_FMT_FLTP,
            playSampleRate: AVPlayer.audioContext.sampleRate,
            playChannels: playChannels,
            resamplerResource,
            stretchpitcherResource,
            stats: addressof(this.GlobalData.stats),
            timeBase: {
              num: stream.timeBase.num,
              den: stream.timeBase.den,
            },
            startPTS: stream.startTime,
            avframeList: addressof(this.GlobalData.avframeList),
            avframeListMutex: addressof(this.GlobalData.avframeListMutex),
            enableJitterBuffer: !!this.jitterBufferController
          })

        // 创建一个音频源节点
        let AudioSource: typeof AudioSourceWorkletNode | typeof AudioSourceBufferNode
        if (support.audioWorklet) {
          AudioSource = AudioSourceWorkletNode
        }
        else {
          AudioSource = AudioSourceBufferNode
        }
        this.audioSourceNode = new AudioSource(
          AVPlayer.audioContext,
          {
            onEnded: () => {
              this.onAudioEnded()
            },
            onFirstRendered: () => {
              this.onFirstAudioRendered()
            },
            onStutter: () => {
              this.onAudioStutter()
            }
          },
          {
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [playChannels],
            isMainWorker: !!AVPlayer.AudioPipelineProxy
          }
        )

        if (cheapConfig.USE_THREADS
          && defined(ENABLE_THREADS)
          && support.audioWorklet
          && (!browser.safari || browser.checkVersion(browser.version, '16.1', true))
        ) {
          await this.audioSourceNode.request('init', {
            memory: Memory
          })
        }

        AVPlayer.AudioRenderThread.setPlayTempo(this.taskId, this.playRate)

        this.gainNode = AVPlayer.audioContext.createGain()
        this.gainNode.connect(AVPlayer.audioContext.destination)
        this.audioSourceNode.connect(this.gainNode)

        this.setVolume(this.volume)

        this.audioEnded = false

        promises.push(this.audioSourceNode.request('start', {
          port: this.audioRender2AudioWorkletChannel.port2,
          channels: playChannels
        }, [this.audioRender2AudioWorkletChannel.port2]))
      }
      if (this.audioDecoder2AudioRenderChannel) {
        this.controller.setTimeUpdateListenType(AVMediaType.AVMEDIA_TYPE_AUDIO)
      }
      else if (this.videoDecoder2VideoRenderChannel) {
        this.controller.setTimeUpdateListenType(AVMediaType.AVMEDIA_TYPE_VIDEO)
      }

      // 开始时间戳超过 10 秒不对齐就不再同步音视频了
      // 这种情况下可视为音频和视频本身就是独立的，各自播放
      if (this.videoDecoder2VideoRenderChannel
        && this.audioDecoder2AudioRenderChannel
        && bigint.abs(videoStartTime - audioStartTime) > 10000n
      ) {
        this.controller.setEnableAudioVideoSync(false)
      }
    }

    const subtitleStream = this.findBestStream(this.formatContext.streams, AVMediaType.AVMEDIA_TYPE_SUBTITLE)
    if (subtitleStream && options.subtitle && this.isCodecIdSupported(subtitleStream.codecpar.codecId)) {
      const externalTask = this.externalSubtitleTasks.find((task) => {
        return task.streamId === subtitleStream.id
      })
      this.createSubtitleRender(subtitleStream, externalTask ? externalTask.taskId : (this.subtitleTaskId || this.taskId))
    }

    if (this.subtitleRender && this.externalSubtitleTasks.length) {
      for (let i = 0; i < this.externalSubtitleTasks.length; i++) {
        const stream = this.formatContext.streams.find(((s) => s.id === this.externalSubtitleTasks[i].streamId))
        if (stream !== subtitleStream) {
          await AVPlayer.DemuxerThread.connectStreamTask.transfer(this.subtitleRender.getDemuxerPort(this.externalSubtitleTasks[i].taskId))
            .invoke(this.externalSubtitleTasks[i].taskId, stream.index, this.subtitleRender.getDemuxerPort(this.externalSubtitleTasks[i].taskId))
        }
      }
    }

    let minQueueLength = 10
    if (is.string(this.source) && !this.options.isLive) {
      this.formatContext.streams.forEach((stream) => {
        minQueueLength = Math.max(Math.ceil(avQ2D(stream.codecpar.framerate) * this.options.preLoadTime), minQueueLength)
      })
    }
    promises.push(AVPlayer.DemuxerThread.startDemux(this.taskId, this.options.isLive, minQueueLength))
    if (defined(ENABLE_PROTOCOL_DASH) && this.subTaskId) {
      promises.push(AVPlayer.DemuxerThread.startDemux(this.subTaskId, this.options.isLive, minQueueLength))
    }
    if ((defined(ENABLE_PROTOCOL_DASH) || defined(ENABLE_PROTOCOL_HLS)) && this.subtitleTaskId) {
      promises.push(AVPlayer.DemuxerThread.startDemux(this.subtitleTaskId, this.options.isLive, minQueueLength))
    }

    return Promise.all(promises).then(async () => {
      this.status = AVPlayerStatus.PLAYED
      if (defined(ENABLE_MSE) && this.useMSE) {
        await Promise.all([
          this.video?.play(),
          this.audio?.play()
        ]).catch((error) => {
          if (this.video) {
            this.video.muted = true
            this.fire(eventType.RESUME)
            logger.warn('the audioContext was not started. It must be resumed after a user gesture')
            return this.video.play()
          }
          else {
            throw error
          }
        })
      }
      else {
        if (this.audioSourceNode && AVPlayer.audioContext.state === 'suspended') {
          if (AVPlayer.audioContext.state === 'suspended') {
            this.fire(eventType.RESUME)
            logger.warn('the audioContext was not started. It must be resumed after a user gesture')
          }
          if (this.videoDecoder2VideoRenderChannel) {
            AVPlayer.AudioRenderThread.fakePlay(this.taskId)
            this.controller.setTimeUpdateListenType(AVMediaType.AVMEDIA_TYPE_VIDEO)
          }
          else {
            // 只有音频无法播放时直接抛错，和 mse 行为保持一致
            throw new Error('the audioContext was not started. It must be resumed after a user gesture')
          }
        }
      }
      this.fire(eventType.PLAYED)
      this.statsController.start()
      if (this.jitterBufferController) {
        this.jitterBufferController.start()
      }
      if (this.subtitleRender) {
        this.subtitleRender.start()
      }
    })
  }

  /**
   * 暂停播放
   */
  public async pause() {

    logger.info(`call pause, taskId: ${this.taskId}`)

    if (!this.options.isLive) {
      const promises = []
      if (defined(ENABLE_MSE) && this.useMSE) {
        if (this.audio) {
          this.audio.pause()
        }
        if (this.video) {
          this.video.pause()
        }
        promises.push(AVPlayer.MSEThread.pause(this.taskId))
      }
      else {
        if (this.audioSourceNode) {
          promises.push(this.audioSourceNode.request('pause'))
          // stop fake play
          promises.push(AVPlayer.AudioRenderThread.pause(this.taskId))
        }
        if (this.videoDecoder2VideoRenderChannel) {
          promises.push(this.VideoRenderThread.pause(this.taskId))
        }
      }
      return Promise.all(promises).then(() => {
        if (this.status === AVPlayerStatus.SEEKING) {
          this.lastStatus = AVPlayerStatus.PAUSED
        }
        else {
          this.status = AVPlayerStatus.PAUSED
        }
        this.fire(eventType.PAUSED)
        if (this.jitterBufferController) {
          this.jitterBufferController.stop()
        }
        if (this.subtitleRender) {
          this.subtitleRender.pause()
        }
      })
    }
    else {
      logger.warn(`pause can only used in vod, taskId: ${this.taskId}`)
    }
  }

  private async doSeek(timestamp: int64, streamIndex: int32, options: {
    onBeforeSeek?: Function
  } = {}) {

    if (defined(ENABLE_MSE) && this.useMSE) {
      await AVPlayer.MSEThread.beforeSeek(this.taskId)
    }
    else {
      await Promise.all([
        AVPlayer.AudioRenderThread?.beforeSeek(this.taskId),
        this.VideoRenderThread?.beforeSeek(this.taskId)
      ])
    }

    if (options.onBeforeSeek) {
      await options.onBeforeSeek()
    }

    let seekedTimestamp = -1n

    if (defined(ENABLE_PROTOCOL_HLS) && this.isHls()) {
      seekedTimestamp = await AVPlayer.DemuxerThread.seek(this.taskId, timestamp, AVSeekFlags.TIMESTAMP)
    }
    else if (defined(ENABLE_PROTOCOL_DASH) && this.isDash()) {
      seekedTimestamp = await AVPlayer.DemuxerThread.seek(this.taskId, timestamp, AVSeekFlags.TIMESTAMP)
      if (this.subTaskId) {
        await AVPlayer.DemuxerThread.seek(this.subTaskId, timestamp, AVSeekFlags.TIMESTAMP)
      }
    }
    else {
      seekedTimestamp = await AVPlayer.DemuxerThread.seek(this.taskId, timestamp, AVSeekFlags.FRAME, streamIndex)
    }

    if ((defined(ENABLE_PROTOCOL_DASH) || defined(ENABLE_PROTOCOL_HLS)) && this.subtitleTaskId) {
      await AVPlayer.DemuxerThread.seek(this.subtitleTaskId, timestamp, AVSeekFlags.TIMESTAMP)
    }

    if (seekedTimestamp >= 0n) {
      logger.debug(`seeked to packet timestamp: ${seekedTimestamp}, taskId: ${this.taskId}`)
    }
    else {
      logger.error(`demuxer seek failed, code: ${seekedTimestamp}, taskId: ${this.taskId}`)
    }

    if (defined(ENABLE_MSE) && this.useMSE) {
      if (seekedTimestamp >= 0n) {
        const time = await AVPlayer.MSEThread.afterSeek(this.taskId, seekedTimestamp > timestamp ? seekedTimestamp : timestamp)
        if (this.video) {
          this.video.currentTime = time
        }
        else if (this.audio) {
          this.audio.currentTime = time
        }
      }
      else {
        await AVPlayer.MSEThread.afterSeek(this.taskId, NOPTS_VALUE_BIGINT)
      }
    }
    else {
      let maxQueueLength = 20
      this.formatContext.streams.forEach((stream) => {
        if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO) {
          maxQueueLength = Math.max(Math.ceil(avQ2D(stream.codecpar.framerate)), maxQueueLength)
        }
      })
      if (seekedTimestamp >= 0n) {
        await Promise.all([
          AVPlayer.AudioDecoderThread?.resetTask(this.taskId),
          this.VideoDecoderThread?.resetTask(this.taskId)
        ])
        await Promise.all([
          AVPlayer.AudioRenderThread?.syncSeekTime(
            this.taskId,
            seekedTimestamp > timestamp ? seekedTimestamp : timestamp,
            maxQueueLength
          ),
          this.VideoRenderThread?.syncSeekTime(
            this.taskId,
            seekedTimestamp > timestamp ? seekedTimestamp : timestamp,
            maxQueueLength
          )
        ])
        await Promise.all([
          AVPlayer.AudioRenderThread?.afterSeek(this.taskId, seekedTimestamp > timestamp ? seekedTimestamp : timestamp),
          this.VideoRenderThread?.afterSeek(this.taskId, seekedTimestamp > timestamp ? seekedTimestamp : timestamp),
        ])
      }
      else {
        await Promise.all([
          AVPlayer.AudioRenderThread?.syncSeekTime(this.taskId, NOPTS_VALUE_BIGINT, maxQueueLength),
          this.VideoRenderThread?.syncSeekTime(this.taskId, NOPTS_VALUE_BIGINT, maxQueueLength),
        ])
        await Promise.all([
          AVPlayer.AudioRenderThread?.afterSeek(this.taskId, NOPTS_VALUE_BIGINT),
          this.VideoRenderThread?.afterSeek(this.taskId, NOPTS_VALUE_BIGINT),
        ])
      }
      if (this.jitterBufferController) {
        this.jitterBufferController.reset()
      }
    }
    for (let i = 0; i < this.externalSubtitleTasks.length; i++) {
      await AVPlayer.DemuxerThread.seek(this.externalSubtitleTasks[i].taskId, this.currentTime, AVSeekFlags.FRAME)
    }
    if (this.subtitleRender) {
      this.subtitleRender.reset()
    }
  }

  /**
   * 跳转到指定时间戳位置播放（只支持点播）
   * 某些文件可能不会 seek 成功
   * 
   * @param timestamp 毫秒
   */
  public async seek(timestamp: int64) {

    logger.info(`call seek, timestamp: ${timestamp}, taskId: ${this.taskId}`)

    if (!this.formatContext.streams.length) {
      logger.error(`cannot found any stream to seek, taskId: ${this.taskId}`)
      return
    }

    if (this.status === AVPlayerStatus.SEEKING) {
      logger.warn(`player is seeking now, taskId: ${this.taskId}`)
      return
    }

    if (!this.options.isLive) {
      this.lastStatus = this.status
      this.status = AVPlayerStatus.SEEKING

      this.fire(eventType.SEEKING)

      let streamIndex = -1

      if (this.selectedVideoStream) {
        streamIndex = this.selectedVideoStream.index
      }
      else if (this.selectedAudioStream) {
        streamIndex = this.selectedAudioStream.index
      }

      await this.doSeek(timestamp, streamIndex)

      this.status = this.lastStatus
      this.fire(eventType.SEEKED)
    }
    else {
      logger.warn(`seek can only used in vod, taskId: ${this.taskId}`)
    }
  }

  /**
   * 获取流信息
   * 
   * @returns 
   */
  public getStreams() {
    return this.formatContext.streams.map((stream) => {
      return {
        ...stream,
        /**
         * 媒体类型
         */
        mediaType: dumpKey(mediaType2AVMediaType, stream.codecpar.codecType),
        codecparProxy: accessof(stream.codecpar)
      }
    })
  }

  /**
   * 获取当前选择播放的视频流 id
   * 
   * @returns 
   */
  public getSelectedVideoStreamId() {
    if (this.selectedVideoStream) {
      return this.selectedVideoStream.id
    }
    return -1
  }

  /**
   * 获取当前选择播放的音频流 id
   * 
   * @returns 
   */
  public getSelectedAudioStreamId() {
    if (this.selectedAudioStream) {
      return this.selectedAudioStream.id
    }
    return -1
  }

  /**
   * 获取当前选择播放的字幕流 id
   * 
   * @returns 
   */
  public getSelectedSubtitleStreamId() {
    if (this.selectedSubtitleStream) {
      return this.selectedSubtitleStream.id
    }
    return -1
  }

  /**
   * 获取章节信息
   * 
   * @returns 
   */
  public getChapters() {
    return this.formatContext.chapters
  }

  /**
   * 获取总时长（毫秒）
   * 
   * @returns 
   */
  public getDuration() {
    if (!this.options.isLive) {
      let max = 0n
      this.formatContext.streams.forEach((stream) => {
        if (stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO
          || stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO
        ) {
          const duration = avRescaleQ(
            stream.duration,
            {
              den: stream.timeBase.den,
              num: stream.timeBase.num
            },
            AV_MILLI_TIME_BASE_Q
          )
          if (duration > max) {
            max = duration
          }
        }
      })
      return max
    }
    return 0n
  }

  /**
   * 停止播放
   * 
   * @returns 
   */
  public async stop() {

    logger.info(`call stop, taskId: ${this.taskId}`)

    if (this.status === AVPlayerStatus.STOPPED) {
      logger.warn(`player has already stopped, taskId: ${this.taskId}`)
      return
    }

    if (this.audioSourceNode) {
      await this.audioSourceNode.request('stop')
      this.audioSourceNode.disconnect()
      this.audioSourceNode = null
    }
    if (this.VideoRenderThread) {
      await this.VideoRenderThread.unregisterTask(this.taskId)
    }
    if (AVPlayer.AudioRenderThread) {
      await AVPlayer.AudioRenderThread.unregisterTask(this.taskId)
    }
    if (this.VideoDecoderThread) {
      await this.VideoDecoderThread.unregisterTask(this.taskId)
    }
    if (AVPlayer.AudioDecoderThread) {
      await AVPlayer.AudioDecoderThread.unregisterTask(this.taskId)
    }
    if (AVPlayer.MSEThread) {
      await AVPlayer.MSEThread.unregisterTask(this.taskId)
    }
    if (AVPlayer.DemuxerThread) {
      await AVPlayer.DemuxerThread.unregisterTask(this.taskId)
      if (defined(ENABLE_PROTOCOL_DASH) && this.subTaskId) {
        await AVPlayer.DemuxerThread.unregisterTask(this.subTaskId)
      }
      if ((defined(ENABLE_PROTOCOL_DASH) || defined(ENABLE_PROTOCOL_HLS)) && this.subtitleTaskId) {
        await AVPlayer.DemuxerThread.unregisterTask(this.subtitleTaskId)
      }
    }
    if (AVPlayer.IOThread) {
      await AVPlayer.IOThread.unregisterTask(this.taskId)
    }
    if (this.ioIPCPort) {
      await (this.source as CustomIOLoader).stop()
      this.ioIPCPort.destroy()
      this.ioIPCPort = null
    }

    for (let i = 0; i < this.externalSubtitleTasks.length; i++) {
      await AVPlayer.DemuxerThread.unregisterTask(this.externalSubtitleTasks[i].taskId)
      await AVPlayer.IOThread.unregisterTask(this.externalSubtitleTasks[i].taskId)
    }

    if (this.subtitleRender) {
      this.subtitleRender.destroy()
      this.subtitleRender = null
    }

    if (this.gainNode) {
      this.gainNode.disconnect()
      this.gainNode = null
    }
    if (this.controller) {
      this.controller.destroy()
    }
    if ((this.video || this.audio)?.src) {
      URL.revokeObjectURL((this.video || this.audio).src)
    }
    if (this.video) {
      this.options.container.removeChild(this.video)
      this.video = null
    }
    if (this.audio) {
      this.options.container.removeChild(this.audio)
      this.audio = null
    }
    if (this.canvas) {
      this.options.container.removeChild(this.canvas)
      this.canvas = null
    }

    this.ioloader2DemuxerChannel = null
    this.demuxer2VideoDecoderChannel = null
    this.demuxer2AudioDecoderChannel = null
    this.videoDecoder2VideoRenderChannel = null
    this.audioDecoder2AudioRenderChannel = null
    this.audioRender2AudioWorkletChannel = null

    this.selectedAudioStream = null
    this.selectedVideoStream = null
    this.selectedSubtitleStream = null
    this.lastSelectedInnerSubtitleStreamIndex = -1
    this.source = null
    this.ext = ''

    this.statsController.stop()
    if (this.jitterBufferController) {
      this.jitterBufferController.stop()
      this.jitterBufferController = null
    }

    this.fire(eventType.STOPPED)

    this.status = AVPlayerStatus.STOPPED
  }

  /*
  * 设置播放速率（只支持点播）
  * 
  * @param rate 
  */
  public setPlaybackRate(rate: number) {
    if (!this.options.isLive) {
      this.playRate = restrain(rate, 0.5, 2)
      if (defined(ENABLE_MSE) && this.useMSE) {
        AVPlayer.MSEThread?.setPlayRate(this.taskId, this.playRate)
        if (this.video) {
          this.video.playbackRate = this.playRate
        }
        else if (this.audio) {
          this.audio.playbackRate = this.playRate
        }
      }
      else {
        AVPlayer.AudioRenderThread?.setPlayTempo(this.taskId, this.playRate)
        this.VideoRenderThread?.setPlayRate(this.taskId, this.playRate)
        this.VideoDecoderThread?.setPlayRate(this.taskId, this.playRate)
      }
      logger.info(`player call setPlaybackRate, set ${this.playRate}, taskId: ${this.taskId}`)
    }
    else {
      logger.warn(`setPlaybackRate can only used in playback, taskId: ${this.taskId}`)
    }
  }

  /**
   * 获取倍数值
   * 
   * @returns 
   */
  public getPlaybackRate() {
    return this.playRate
  }

  /**
   * resume 音频
   */
  public async resume() {
    if (AVPlayer.audioContext?.state === 'suspended') {
      await Promise.race([
        AVPlayer.audioContext.resume(),
        new Sleep(0.1)
      ])
      if (AVPlayer.audioContext.state === 'suspended') {
        logger.warn('the audioContext was not allowed to start. It must be resumed after a user gesture')
      }
      else {
        if (this.audioSourceNode) {
          this.controller.setTimeUpdateListenType(AVMediaType.AVMEDIA_TYPE_AUDIO)
        }
        if (this.video) {
          this.video.muted = false
        }
      }
    }
    if (this.video) {
      this.video.muted = false
      if (!this.video.played) {
        await this.video.play()
      }
    }
    else if (this.audio) {
      this.audio.muted = false
      if (!this.audio.played) {
        await this.audio.play()
      }
    }

    logger.info(`call resume, taskId: ${this.taskId}`)
  }

  /**
   * 获取播放音量
   * 
   * @returns 
   */
  public getVolume() {
    return this.volume
  }

  /**
   * 设置播放音量
   * 
   * @param volume [0, 3]
   * 
   */
  public setVolume(volume: number, force: boolean = false) {
    this.volume = restrain(volume, 0, 3)
    if (this.gainNode && AVPlayer.audioContext) {
      this.gainNode.gain.cancelScheduledValues(AVPlayer.audioContext.currentTime)

      if (browser.firefox && !force) {
        this.gainNode.gain.setValueAtTime(this.volume, AVPlayer.audioContext.currentTime + 1)
      }
      else {
        if (this.gainNode.gain.value === 0 || this.volume === 0 || force) {
          this.gainNode.gain.value = this.volume
        }
        else {
          this.gainNode.gain.exponentialRampToValueAtTime(this.volume, AVPlayer.audioContext.currentTime + 1)
        }
      }
    }
    else if (this.video) {
      this.video.volume = this.volume
    }
    else if (this.audio) {
      this.audio.volume = this.volume
    }

    this.fire(eventType.VOLUME_CHANGE, [this.volume])

    logger.info(`player call setVolume, set ${volume}, used ${this.volume}, taskId: ${this.taskId}`)
  }

  /**
   * 
   * 获取渲染模式
   * 
   * @param mode 
   * @returns 
   */
  public getRenderMode() {
    return this.renderMode
  }

  /**
   * 设置画面填充模式
   * 
   * - 0 自适应
   * - 1 填充
   * 
   * @param mode 
   */
  public setRenderMode(mode: RenderMode) {
    this.renderMode = mode
    if (defined(ENABLE_MSE) && this.useMSE && this.video) {
      this.video.style['object-fit'] = ObjectFitMap[this.renderMode]
    }
    else {
      this.VideoRenderThread?.setRenderMode(this.taskId, mode)
    }
    logger.info(`player call setRenderMode, mode: ${mode}, taskId: ${this.taskId}`)
  }

  private getVideoTransformContext() {
    let text = ''
    if (this.renderRotate !== 0) {
      text += `rotateZ(${this.renderRotate}deg)`
    }
    if (this.flipHorizontal) {
      text += `${text.length ? ' ' : ''}scaleX(-1)`
    }
    if (this.flipVertical) {
      text += `${text.length ? ' ' : ''}scaleY(-1)`
    }
    return text
  }

  /**
   * 设置视频渲染旋转角度
   * 
   * @param angle 
   */
  public setRotate(angle: double) {
    this.renderRotate = angle
    if (defined(ENABLE_MSE) && this.useMSE && this.video) {
      this.video.style.transform = this.getVideoTransformContext()
    }
    else {
      this.VideoRenderThread?.setRenderRotate(this.taskId, angle)
    }
    logger.info(`player call setRotate, angle: ${angle}, taskId: ${this.taskId}`)
  }

  public enableHorizontalFlip(enable: boolean) {
    this.flipHorizontal = enable
    if (defined(ENABLE_MSE) && this.useMSE && this.video) {
      this.video.style.transform = this.getVideoTransformContext()
    }
    else {
      this.VideoRenderThread?.enableHorizontalFlip(this.taskId, enable)
    }
    logger.info(`player call enableHorizontalFlip, enable: ${enable}, taskId: ${this.taskId}`)
  }

  public enableVerticalFlip(enable: boolean) {
    this.flipVertical = enable
    if (defined(ENABLE_MSE) && this.useMSE && this.video) {
      this.video.style.transform = this.getVideoTransformContext()
    }
    else {
      this.VideoRenderThread?.enableVerticalFlip(this.taskId, enable)
    }
    logger.info(`player call enableVerticalFlip, enable: ${enable}, taskId: ${this.taskId}`)
  }

  /**
   * 设置是否循环播放
   * 
   * @param enable 
   */
  public setLoop(enable: boolean) {

    this.options.loop = enable

    logger.info(`call setLoop, enable: ${enable}, taskId: ${this.taskId}`)
  }

  /**
   * 
   * 设置字幕延时（毫秒）
   * 
   * @param delay 
   */
  public setSubtitleDelay(delay: int32) {
    if (this.subtitleRender && this.getSubtitleDelay() !== delay) {
      this.subtitleRender.setDelay(static_cast<int64>(delay))

      logger.info(`set subtitle delay ${delay}`)

      this.fire(eventType.SUBTITLE_DELAY_CHANGE, [delay])
    }
  }

  /**
   * 获取字幕延时（毫秒）
   * 
   * @returns 
   */
  public getSubtitleDelay() {
    if (this.subtitleRender) {
      return static_cast<int32>(this.subtitleRender.getDelay())
    }
    return 0
  }

  /**
   * 设置是否开启字幕显示
   * 
   * @param enable 
   */
  public setSubtitleEnable(enable: boolean) {
    if (this.subtitleRender && this.selectedSubtitleStream) {
      if (enable) {
        const externalTask = this.externalSubtitleTasks.find((task) => {
          return task.streamId === this.selectedSubtitleStream.id
        })
        if (externalTask) {
          AVPlayer.DemuxerThread.seek(externalTask.taskId, this.currentTime, AVSeekFlags.FRAME)
        }
        this.subtitleRender.reset()
        this.subtitleRender.start()
      }
      else {
        this.subtitleRender.stop()
      }
    }
  }

  /**
   * 重置渲染视图大小
   * 
   * @param width 
   * @param height 
   */
  public resize(width: number, height: number) {
    if (!this.useMSE) {
      this.VideoRenderThread?.resize(this.taskId, width, height)
    }
    logger.info(`player call resize, width: ${width}, height: ${height}, taskId: ${this.taskId}`)
  }

  /**
   * 当前是否是 mse 播放模式
   * 
   * @returns 
   */
  public isMSE() {
    return this.useMSE
  }

  /**
   * 当前是否是 live 模式
   * 
   * @returns 
   */
  public isLive() {
    return this.options.isLive
  }

  /**
   * 获取视频列表（ dash 使用）
   * 
   * @returns 
   */
  public async getVideoList() {
    return AVPlayer.IOThread?.getVideoList(this.taskId)
  }

  /**
   * 获取音频列表（ dash 使用）
   * 
   * @returns 
   */
  public async getAudioList() {
    return AVPlayer.IOThread?.getAudioList(this.taskId)
  }

  /**
   * 获取字幕列表（ dash 使用）
   * 
   * @returns 
   */
  public async getSubtitleList() {
    return AVPlayer.IOThread?.getSubtitleList(this.taskId)
  }

  /**
   * 获取 status 状态
   * 
   * @returns 
   */
  public getStatus() {
    return this.status
  }

  /**
   * 是否播放了音频
   * 
   * @returns 
   */
  public hasAudio() {
    return !!this.selectedAudioStream
  }

  /**
   * 是否播放了视频
   * 
   * @returns 
   */
  public hasVideo() {
    return !!this.selectedVideoStream
  }

  /**
   * 是否播放了字幕
   * 
   * @returns 
   */
  public hasSubtitle() {
    return !!this.selectedSubtitleStream
  }

  /**
   * 获取当前的播放源
   * 
   * @returns 
   */
  public getSource() {
    return this.source
  }

  /**
   * 获取 formatContext 对象
   * 
   * @returns 
   */
  public getFormatContext() {
    return this.formatContext
  }

  /**
   * 获取当前加载的外挂字幕
   * 
   * @returns 
   */
  public getExternalSubtitle() {
    return this.externalSubtitleTasks.map((task) => {
      return {
        source: task.source,
        lang: task.lang,
        title: task.title
      }
    })
  }

  /**
   * 获取 AVPlayerOptions
   * 
   * @returns 
   */
  public getOptions() {
    return this.options
  }

  /**
   * 重新设置是否是直播，load 之前调用
   * 
   * @param is 
   */
  public setIsLive(is: boolean) {
    this.options.isLive = is
  }
  /**
   * 获取 audioContext 声音输出 Node，可拿给外部去处理
   */
  public getAudioOutputNode(): AudioNode {
    return this.gainNode
  }

  /**
   * 判断是否处于画中画状态
   * 
   * @returns 
   */
  public isPictureInPicture() {
    if (this.useMSE) {
      return this.video && document.pictureInPictureElement === this.video
    }
    else if (this.canvas && typeof documentPictureInPicture === 'object') {
      return documentPictureInPicture.window
        && documentPictureInPicture.window.document.body.querySelector('#' + this.canvas.id) === this.canvas
    }
    return false
  }

  /**
   * 设置播放视频轨道
   * 
   * @param id 流 id，dash 传 getVideoList 列表中的 index
   * @returns 
   */
  public async selectVideo(id: number) {
    if (defined(ENABLE_PROTOCOL_HLS) && this.isHls() || defined(ENABLE_PROTOCOL_DASH) && this.isDash()) {
      logger.info(`call IOThread selectVideo, index: ${id}, taskId: ${this.taskId}`)
      return AVPlayer.IOThread?.selectVideo(this.taskId, id)
    }
    else {
      const stream = this.formatContext.streams.find((stream) => stream.id === id)
      if (this.selectedVideoStream && stream && stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_VIDEO && stream !== this.selectedVideoStream) {

        if (this.status === AVPlayerStatus.CHANGING) {
          logger.warn(`player is changing now, taskId: ${this.taskId}`)
          return
        }
        this.lastStatus = this.status
        this.status = AVPlayerStatus.CHANGING
        this.fire(eventType.CHANGING, [AVMediaType.AVMEDIA_TYPE_VIDEO, stream.id, this.selectedVideoStream.id])

        if (this.useMSE) {
          await this.doSeek(this.currentTime, stream.index, {
            onBeforeSeek: async () => {
              await AVPlayer.DemuxerThread.changeConnectStream(this.taskId, stream.index, this.selectedVideoStream.index)
              await AVPlayer.MSEThread.reAddStream(this.taskId, stream.index, serializeAVCodecParameters(stream.codecpar), stream.timeBase, stream.startTime)
            }
          })
        }
        else {
          await this.doSeek(this.currentTime, stream.index, {
            onBeforeSeek: async () => {
              await AVPlayer.DemuxerThread.changeConnectStream(this.taskId, stream.index, this.selectedVideoStream.index)
              await this.VideoDecoderThread.reopenDecoder(
                this.taskId,
                serializeAVCodecParameters(stream.codecpar),
                await this.getResource('decoder', stream.codecpar.codecId, AVMediaType.AVMEDIA_TYPE_VIDEO)
              )
            }
          })
        }

        logger.info(`changed selected video stream, from ${this.selectedVideoStream.id} to ${stream.id}, taskId: ${this.taskId}`)
        this.selectedVideoStream = stream

        if (this.subtitleRender) {
          this.subtitleRender.updateVideoResolution(stream.codecpar.width, stream.codecpar.height)
        }

        this.status = this.lastStatus
        this.fire(eventType.CHANGED, [AVMediaType.AVMEDIA_TYPE_VIDEO, stream.id, this.selectedVideoStream.id])
      }
      else {
        logger.error(`call selectVideo failed, id: ${id}, taskId: ${this.taskId}`)
      }
    }
  }

  /**
   * 设置播放音频轨道
   * 
   * @param id 流 id，dash 传 getAudioList 列表中的 index
   * @returns 
   */
  public async selectAudio(id: number) {
    if (defined(ENABLE_PROTOCOL_HLS) && this.isHls() || defined(ENABLE_PROTOCOL_DASH) && this.isDash()) {
      logger.info(`call IOThread selectAudio, index: ${id}, taskId: ${this.taskId}`)
      return AVPlayer.IOThread?.selectAudio(this.taskId, id)
    }
    else {
      const stream = this.formatContext.streams.find((stream) => stream.id === id)
      if (this.selectedAudioStream && stream && stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_AUDIO && stream !== this.selectedAudioStream) {
        if (this.status === AVPlayerStatus.CHANGING) {
          logger.warn(`player is changing now, taskId: ${this.taskId}`)
          return
        }
        this.lastStatus = this.status
        this.status = AVPlayerStatus.CHANGING
        this.fire(eventType.CHANGING, [AVMediaType.AVMEDIA_TYPE_AUDIO, stream.id, this.selectedAudioStream.id])

        if (stream.codecpar.codecId !== this.selectedAudioStream.codecpar.codecId
          || this.useMSE
            && (stream.codecpar.sampleRate !== this.selectedAudioStream.codecpar.sampleRate
            || stream.codecpar.chLayout.nbChannels !== this.selectedAudioStream.codecpar.chLayout.nbChannels)
        ) {
          let seekStreamId = stream.index
          if (this.selectedVideoStream) {
            seekStreamId = this.selectedVideoStream.index
          }
          if (this.useMSE) {
            await this.doSeek(this.currentTime, seekStreamId, {
              onBeforeSeek: async () => {
                await AVPlayer.DemuxerThread.changeConnectStream(this.taskId, stream.index, this.selectedAudioStream.index)
                await AVPlayer.MSEThread.reAddStream(this.taskId, stream.index, serializeAVCodecParameters(stream.codecpar), stream.timeBase, stream.startTime)
              }
            })
          }
          else {
            await this.doSeek(this.currentTime, seekStreamId, {
              onBeforeSeek: async () => {
                await AVPlayer.DemuxerThread.changeConnectStream(this.taskId, stream.index, this.selectedAudioStream.index)
                await AVPlayer.AudioDecoderThread.reopenDecoder(
                  this.taskId,
                  serializeAVCodecParameters(stream.codecpar),
                  await this.getResource('decoder', stream.codecpar.codecId, AVMediaType.AVMEDIA_TYPE_AUDIO)
                )
              }
            })
          }
        }
        else {
          await AVPlayer.DemuxerThread.changeConnectStream(this.taskId, stream.index, this.selectedAudioStream.index, false)
        }

        logger.info(`changed selected audio stream, from ${this.selectedAudioStream.id} to ${stream.id}, taskId: ${this.taskId}`)

        this.selectedAudioStream = stream

        this.status = this.lastStatus
        this.fire(eventType.CHANGED, [AVMediaType.AVMEDIA_TYPE_AUDIO, stream.id, this.selectedAudioStream.id])

      }
      else {
        logger.error(`call selectAudio failed, id: ${id}, taskId: ${this.taskId}`)
      }
    }
  }

  /**
   * 设置播放字幕轨道
   * 
   * @param id 流 id，dash 传 getSubtitleList 列表中的 index
   * @returns 
   */
  public async selectSubtitle(id: number) {
    if (defined(ENABLE_PROTOCOL_HLS) && this.isHls() || defined(ENABLE_PROTOCOL_DASH) && this.isDash()) {
      logger.info(`call IOThread selectSubtitle, index: ${id}, taskId: ${this.taskId}`)
      await AVPlayer.IOThread?.selectSubtitle(this.taskId, id)
      if (this.subtitleTaskId) {
        await AVPlayer.DemuxerThread.seek(this.subtitleTaskId, this.currentTime, AVSeekFlags.TIMESTAMP)
      }
      if (this.subtitleRender) {
        this.subtitleRender.reset()
        this.subtitleRender.start()
      }
    }
    else {
      const stream = this.formatContext.streams.find((stream) => stream.id === id)
      if (this.selectedSubtitleStream && stream && stream.codecpar.codecType === AVMediaType.AVMEDIA_TYPE_SUBTITLE && stream !== this.selectedSubtitleStream) {
        if (this.status === AVPlayerStatus.CHANGING) {
          logger.warn(`player is changing now, taskId: ${this.taskId}`)
          return
        }
        this.lastStatus = this.status
        this.status = AVPlayerStatus.CHANGING
        this.fire(eventType.CHANGING, [AVMediaType.AVMEDIA_TYPE_SUBTITLE, stream.id, this.selectedSubtitleStream.id])

        this.subtitleRender.reopenDecoder(stream.codecpar)

        const externalTask = this.externalSubtitleTasks.find((task) => {
          return task.streamId === stream.id
        })
        if (externalTask) {
          this.subtitleRender.setDemuxTask(externalTask.taskId)
          this.subtitleRender.reset()
          await AVPlayer.DemuxerThread.seek(externalTask.taskId, this.currentTime, AVSeekFlags.FRAME, stream.index)
        }
        else {
          this.subtitleRender.setDemuxTask(this.taskId)
          if (this.lastSelectedInnerSubtitleStreamIndex === -1) {
            await AVPlayer.DemuxerThread.connectStreamTask.transfer(this.subtitleRender.getDemuxerPort(this.taskId))
              .invoke(this.taskId, stream.index, this.subtitleRender.getDemuxerPort(this.taskId))
          }
          else {
            await AVPlayer.DemuxerThread.changeConnectStream(this.taskId, stream.index, this.lastSelectedInnerSubtitleStreamIndex, false)
          }
          const lastExternalTask = this.externalSubtitleTasks.find((task) => {
            return task.streamId === this.selectedSubtitleStream.id
          })
          if (lastExternalTask) {
            this.subtitleRender.reset()
          }
          this.lastSelectedInnerSubtitleStreamIndex = stream.index
        }

        if (this.subtitleRender) {
          this.subtitleRender.start()
        }

        logger.info(`changed selected subtitle stream, from ${this.selectedSubtitleStream.id} to ${stream.id}, taskId: ${this.taskId}`)

        this.selectedSubtitleStream = stream

        this.status = this.lastStatus
        this.fire(eventType.CHANGED, [AVMediaType.AVMEDIA_TYPE_SUBTITLE, stream.id, this.selectedSubtitleStream.id])
      }
      else {
        logger.error(`call selectSubtitle failed, id: ${id}, taskId: ${this.taskId}`)
      }
    }
  }

  /**
   * 播放视频下一帧，可用于逐帧播放，暂停状态下使用（不支持 mse 模式）
   */
  public async playNextFrame() {
    if (!this.useMSE && this.status === AVPlayerStatus.PAUSED && this.selectedVideoStream) {
      await this.VideoRenderThread.renderNextFrame(this.taskId)
    }
  }

  /**
   * 全屏
   */
  public enterFullscreen() {
    const element: HTMLElement = this.options.container
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
    else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    }
    else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    }
    else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
    logger.info(`player call enterFullscreen, taskId: ${this.taskId}`)
  }

  /**
   * 退出全屏
   */
  public exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    else if (document.mozExitFullScreen) {
      document.mozExitFullScreen()
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    logger.info(`player call exitFullscreen, taskId: ${this.taskId}`)
  }

  /**
   * 获取截图
   * 
   * @param type 生成图片格式
   * @param quality 生成图片质量
   */
  public snapshot(type: 'png' | 'jpeg' | 'webp' = 'png', quality: number = 1) {
    if (defined(ENABLE_MSE) && this.useMSE && this.video) {
      const canvas = document.createElement('canvas')
      canvas.width = this.video.videoWidth
      canvas.height = this.video.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(this.video, 0, 0)
      return canvas.toDataURL(`image/${type}`, quality)
    }
    else if (this.canvas) {
      return this.canvas.toDataURL(`image/${type}`, quality)
    }
  }

  /**
   * 获取统计数据
   * 
   * @returns 
   */
  public getStats() {
    return this.GlobalData.stats
  }

  /**
   * 销毁播放器
   * 
   * @returns 
   */
  public async destroy() {

    logger.info(`call destroy, taskId: ${this.taskId}`)

    if (this.status === AVPlayerStatus.DESTROYED) {
      logger.warn(`player has already destroyed, taskId: ${this.taskId}`)
      return
    }

    await this.stop()

    if (this.VideoPipelineProxy) {
      await this.VideoDecoderThread.clear()
      await this.VideoRenderThread.clear()
      await this.VideoPipelineProxy.destroy()
      this.VideoDecoderThread = null
      this.VideoPipelineProxy = null
    }

    if (this.VideoDecoderThread) {
      await this.VideoDecoderThread.clear()
      closeThread(this.VideoDecoderThread)
      this.VideoDecoderThread = null
    }

    this.VideoRenderThread = null

    if (this.GlobalData) {
      this.GlobalData.avframeList.clear((avframe) => {
        unrefAVFrame(avframe)
      })
      this.GlobalData.avpacketList.clear((avpacket) => {
        unrefAVPacket(avpacket)
      })

      mutex.destroy(addressof(this.GlobalData.avpacketListMutex))
      mutex.destroy(addressof(this.GlobalData.avframeListMutex))

      unmake(this.GlobalData)
      this.GlobalData = null
    }

    this.status = AVPlayerStatus.DESTROYED
  }

  /**
   * @internal
   */
  public onVideoEnded(): void {
    this.videoEnded = true
    this.handleEnded()
  }

  /**
   * @internal
   */
  public onAudioEnded(): void {
    this.audioEnded = true
    this.handleEnded()
  }

  /**
   * @internal
   */
  public onCanvasUpdated(): void {
    this.updateCanvas = this.createCanvas()
    const canvas = (supportOffscreenCanvas() && cheapConfig.USE_THREADS && defined(ENABLE_THREADS))
      ? this.updateCanvas.transferControlToOffscreen()
      : this.updateCanvas
    this.VideoRenderThread.updateCanvas
      .transfer(canvas as OffscreenCanvas)
      .invoke(this.taskId, canvas)
  }

  /**
   * @internal
   */
  public async onGetDecoderResource(mediaType: AVMediaType, codecId: AVCodecID): Promise<WebAssemblyResource | string | ArrayBuffer> {
    return this.getResource('decoder', codecId, mediaType)
  }

  /**
   * @internal
   */
  public onFirstVideoRendered(): void {
    logger.info(`first video frame rendered, taskId: ${this.taskId}`)
    this.fire(eventType.FIRST_VIDEO_RENDERED)
  }

  /**
   * @internal
   */
  public onFirstAudioRendered(): void {
    logger.info(`first audio frame rendered, taskId: ${this.taskId}`)
    this.fire(eventType.FIRST_AUDIO_RENDERED)
  }

  /**
   * @internal
   */
  public onAudioStutter() {
    if (this.status === AVPlayerStatus.PLAYED) {
      this.GlobalData.stats.audioStutter++
    }
  }
  public onVideoStutter() {
    if (this.status === AVPlayerStatus.PLAYED) {
      this.GlobalData.stats.videoStutter++
    }
  }

  /**
   * @internal
   */
  public onFirstVideoRenderedAfterUpdateCanvas(): void {
    if (this.updateCanvas) {
      if (this.canvas) {
        this.options.container.removeChild(this.canvas)
      }
      this.canvas = this.updateCanvas
      this.options.container.appendChild(this.canvas)
      this.updateCanvas = null
    }
  }

  /**
   * @internal
   */
  public onTimeUpdate(pts: int64): void {
    this.fire(eventType.TIME, [pts])
  }

  /**
   * @internal
   */
  public onMSESeek(time: number): void {
    if (this.audio) {
      this.audio.currentTime = time
    }
    else if (this.video) {
      this.video.currentTime = time
    }
  }

  private async createVideoDecoderThread(enableWorker: boolean = true) {

    if (this.VideoDecoderThread) {
      return
    }

    if (cheapConfig.USE_THREADS || !support.worker || !enableWorker || !supportOffscreenCanvas()) {
      this.VideoDecoderThread = await createThreadFromClass(VideoDecodePipeline, {
        name: 'VideoDecoderThread',
      }).run()
      this.VideoDecoderThread.setLogLevel(AVPlayer.level)
      this.VideoRenderThread = AVPlayer.VideoRenderThread
    }
    else {
      this.VideoPipelineProxy = new VideoPipelineProxy()
      await this.VideoPipelineProxy.run()
      this.VideoPipelineProxy.setLogLevel(AVPlayer.level)
      this.VideoDecoderThread = this.VideoPipelineProxy.VideoDecodePipeline as Thread<VideoDecodePipeline>
      this.VideoRenderThread = this.VideoPipelineProxy.VideoRenderPipeline as Thread<VideoRenderPipeline>
    }
  }

  static async startDemuxPipeline(enableWorker: boolean = true) {
    if (AVPlayer.DemuxThreadReady) {
      return AVPlayer.DemuxThreadReady
    }

    return AVPlayer.DemuxThreadReady = new Promise(async (resolve) => {
      if (cheapConfig.USE_THREADS || !support.worker || !enableWorker) {
        AVPlayer.IOThread = await createThreadFromClass(IOPipeline, {
          name: 'IOThread'
        }).run()
        AVPlayer.IOThread.setLogLevel(AVPlayer.level)

        AVPlayer.DemuxerThread = await createThreadFromClass(DemuxPipeline, {
          name: 'DemuxerThread'
        }).run()
        AVPlayer.DemuxerThread.setLogLevel(AVPlayer.level)
      }
      else {
        AVPlayer.IODemuxProxy = new IODemuxPipelineProxy()
        await AVPlayer.IODemuxProxy.run()
        AVPlayer.IODemuxProxy.setLogLevel(AVPlayer.level)
        AVPlayer.IOThread = AVPlayer.IODemuxProxy.IOPipeline as Thread<IOPipeline>
        AVPlayer.DemuxerThread = AVPlayer.IODemuxProxy.DemuxPipeline as Thread<DemuxPipeline>
      }
      resolve()
    })
  }

  static async startAudioPipeline(enableWorker: boolean = true) {
    if (AVPlayer.AudioThreadReady) {
      return AVPlayer.AudioThreadReady
    }

    return AVPlayer.AudioThreadReady = new Promise(async (resolve) => {
      if (!AVPlayer.audioContext) {
        AVPlayer.audioContext = new (AudioContext || webkitAudioContext)()
      }
      if (support.audioWorklet) {
        await registerProcessor(
          AVPlayer.audioContext,
          defined(ENABLE_THREADS) && cheapConfig.USE_THREADS && (!browser.safari || browser.checkVersion(browser.version, '16.1', true))
            ? require.resolve('avrender/pcm/AudioSourceWorkletProcessor2')
            : require.resolve('avrender/pcm/AudioSourceWorkletProcessor')
        )
      }

      if (cheapConfig.USE_THREADS || !support.worker || !enableWorker) {
        AVPlayer.AudioDecoderThread = await createThreadFromClass(AudioDecodePipeline, {
          name: 'AudioDecoderThread',
        }).run()
        AVPlayer.AudioDecoderThread.setLogLevel(AVPlayer.level)

        AVPlayer.AudioRenderThread = await createThreadFromClass(AudioRenderPipeline, {
          name: 'AudioRenderThread',
        }).run()
        AVPlayer.AudioRenderThread.setLogLevel(AVPlayer.level)
      }
      else {
        AVPlayer.AudioPipelineProxy = new AudioPipelineProxy()
        await AVPlayer.AudioPipelineProxy.run()
        AVPlayer.AudioPipelineProxy.setLogLevel(AVPlayer.level)
        AVPlayer.AudioDecoderThread = AVPlayer.AudioPipelineProxy.AudioDecodePipeline as Thread<AudioDecodePipeline>
        AVPlayer.AudioRenderThread = AVPlayer.AudioPipelineProxy.AudioRenderPipeline as Thread<AudioRenderPipeline>
      }
      resolve()
    })
  }

  static async startVideoRenderPipeline(enableWorker: boolean = true) {
    if (AVPlayer.VideoThreadReady) {
      return AVPlayer.VideoThreadReady
    }

    return AVPlayer.VideoThreadReady = new Promise(async (resolve) => {
      if (cheapConfig.USE_THREADS || !support.worker || !enableWorker || !supportOffscreenCanvas()) {
        AVPlayer.VideoRenderThread = await createThreadFromClass(VideoRenderPipeline, {
          name: 'VideoRenderThread',
          disableWorker: !supportOffscreenCanvas()
        }).run()
        AVPlayer.VideoRenderThread.setLogLevel(AVPlayer.level)
      }
      resolve()
    })
  }

  static async startMSEPipeline(enableWorker: boolean = true) {
    if (defined(ENABLE_MSE)) {
      if (AVPlayer.MSEThreadReady) {
        return AVPlayer.MSEThreadReady
      }
      return AVPlayer.MSEThreadReady = new Promise(async (resolve) => {
        if (cheapConfig.USE_THREADS || !support.worker || !enableWorker || !support.workerMSE) {
          AVPlayer.MSEThread = await createThreadFromClass(MSEPipeline, {
            name: 'MSEThread',
            disableWorker: !support.workerMSE
          }).run()
          AVPlayer.MSEThread.setLogLevel(AVPlayer.level)
        }
        else {
          AVPlayer.MSEPipelineProxy = new MSEPipelineProxy()
          await AVPlayer.MSEPipelineProxy.run()
          AVPlayer.MSEPipelineProxy.setLogLevel(AVPlayer.level)
          AVPlayer.MSEThread = AVPlayer.MSEPipelineProxy.MSEPipeline as Thread<MSEPipeline>
        }
        resolve()
      })
    }
  }

  /**
   * 提前运行所有管线
   */
  static async startPipelines(enableWorker: boolean = true) {
    await AVPlayer.startDemuxPipeline(enableWorker)
    await AVPlayer.startAudioPipeline(enableWorker)
    await AVPlayer.startVideoRenderPipeline(enableWorker)
    await AVPlayer.startMSEPipeline(enableWorker)
    logger.info('AVPlayer pipelines started')
  }

  /**
   * 停止所有管线
   */
  static async stopPipelines() {
    if (AVPlayer.VideoRenderThread) {
      await AVPlayer.VideoRenderThread.clear()
      closeThread(AVPlayer.VideoRenderThread)
    }

    if (AVPlayer.AudioPipelineProxy) {
      await AVPlayer.AudioRenderThread.clear()
      await AVPlayer.AudioDecoderThread.clear()
      await AVPlayer.AudioPipelineProxy.destroy()
      AVPlayer.AudioRenderThread = null
      AVPlayer.AudioDecoderThread = null
    }
    if (AVPlayer.AudioRenderThread) {
      await AVPlayer.AudioRenderThread.clear()
      closeThread(AVPlayer.AudioRenderThread)
    }
    if (AVPlayer.AudioDecoderThread) {
      await AVPlayer.AudioDecoderThread.clear()
      closeThread(AVPlayer.AudioDecoderThread)
    }

    if (AVPlayer.IODemuxProxy) {
      await AVPlayer.DemuxerThread.clear()
      await AVPlayer.IOThread.clear()
      await AVPlayer.IODemuxProxy.destroy()
      AVPlayer.DemuxerThread = null
      AVPlayer.IOThread = null
    }
    if (AVPlayer.DemuxerThread) {
      await AVPlayer.DemuxerThread.clear()
      closeThread(AVPlayer.DemuxerThread)
    }
    if (AVPlayer.IOThread) {
      await AVPlayer.IOThread.clear()
      closeThread(AVPlayer.IOThread)
    }

    if (defined(ENABLE_MSE)) {
      if (AVPlayer.MSEPipelineProxy) {
        await AVPlayer.MSEThread.clear()
        AVPlayer.MSEPipelineProxy.destroy()
        AVPlayer.MSEThread = null
      }
      if (AVPlayer.MSEThread) {
        await AVPlayer.MSEThread.clear()
        closeThread(AVPlayer.MSEThread)
      }
    }

    AVPlayer.AudioPipelineProxy = null
    AVPlayer.AudioDecoderThread = null
    AVPlayer.IODemuxProxy = null
    AVPlayer.DemuxerThread = null
    AVPlayer.IOThread = null
    AVPlayer.audioContext = null
    AVPlayer.MSEThread = null

    logger.info('AVPlayer pipelines stopped')

  }

  /**
   * 设置日志等级
   * 
   * @param level 
   */
  static setLogLevel(level: number) {
    AVPlayer.level = level
    logger.setLevel(level)

    if (AVPlayer.IOThread) {
      AVPlayer.IOThread.setLogLevel(level)
    }
    if (AVPlayer.DemuxerThread) {
      AVPlayer.DemuxerThread.setLogLevel(level)
    }
    if (AVPlayer.AudioDecoderThread) {
      AVPlayer.AudioDecoderThread.setLogLevel(level)
    }
    if (AVPlayer.AudioRenderThread) {
      AVPlayer.AudioRenderThread.setLogLevel(level)
    }
    if (AVPlayer.VideoRenderThread) {
      AVPlayer.VideoRenderThread.setLogLevel(level)
    }
    if (AVPlayer.MSEThread) {
      AVPlayer.MSEThread.setLogLevel(level)
    }

    logger.info(`set log level: ${level}`)
  }

  public on(event: typeof eventType.LOADING, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.LOADED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.PLAYING, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.PLAYED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.PAUSED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.STOPPED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.ENDED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.SEEKING, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.STOPPED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.CHANGING, listener: typeof playerEventChanging, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.CHANGED, listener: typeof playerEventChanged, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.RESUME, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.TIME, listener: typeof playerEventTime, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.STREAM_UPDATE, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer

  public on(event: typeof eventType.FIRST_AUDIO_RENDERED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.FIRST_VIDEO_RENDERED, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer

  public on(event: typeof eventType.ERROR, listener: typeof playerEventError, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: typeof eventType.TIMEOUT, listener: typeof playerEventNoParam, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: string, listener: Fn, options?: Partial<EmitterOptions>): AVPlayer
  public on(event: string, listener: Fn, options: Partial<EmitterOptions> = {}) {
    super.on(event, object.extend({
      fn: listener
    }, options))
    return this
  }
  public one(event: string, listener: Fn, options: Partial<EmitterOptions> = {}) {
    super.on(event, object.extend({
      fn: listener,
      max: 1
    }, options))
    return this
  }
}
