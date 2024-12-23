libmedia
======
English | [中文](README.md)

![](https://img.shields.io/badge/language-typescript-blue.svg) [![](https://img.shields.io/badge/base-cheap-green.svg)](https://github.com/zhaohappy/cheap) ![](https://img.shields.io/badge/feature-thread-red.svg) ![license](https://img.shields.io/github/license/zhaohappy/libmedia)

### Introduction
 
libmedia is a tool library for processing multimedia content (such as audio, video, subtitles) on the web platform.

libmedia has typescript module and webAssembly module, and the design concept is all things dominated by typescript module; we implemented the module of media demux and mux in typescript, so that we can use asynchronous IO to process stream from anywhere. This allows the entire system to run on a non-SharedArrayBuffer or non-Worker environment.

The decoding and encoding modules are put into the webAssembly module. These modules can be compiled from the libavcodec module of FFmpeg, and each decoder and encoder is compiled into a separate wasm module to solve the problem of too large of compiled c/c++ product. When using it, you only need to load the modules you want to use. At the same time, the codec module also can use web's WebCodecs.

The api design of libmedia refers to the FFmpeg. Many data structure concepts are consistent, so you can see data structures such as ```AVStream```, ```AVCodecParameters```, ```AVFormatContext```, ```AVPacket```, ```AVFrame``` etc. As the de facto standards in the media industry, FFmpeg's design is very excellent, following the design, we can directly obtain excellent design patterns, and it also reduces the difficulty for developers to learn and understand. After all, most audio and video developers have learned about FFmpeg. Of course, the main reason is that we need to make this data can read and write in both typescript modules and webAssembly modules, the struct layout in memory must is consistent with FFmpeg.

libmedia is designed to run on multi-threads, but can fallback to running on the main thread; so it is more friendly to multi-threaded development; developers can easy do multi-threaded development based on this, After all, processing video and audio with multi-threads will bring a better experience.


### Libraries

- ```avformat``` video and audio format libraries(flv、mp4、mpegts、matroska、ogg、mp3)
- avcodec Audio and video codec library, mainly Wasm compiled by C/C++ (FFmpeg and other codec projects) and Web platform standard WebCodecs
- ```audioresample``` Audio resampling (compiled by FFmpeg audio resampling module)
- ```audiostretchpitch``` Audio speed change and pitch change processing (compiled by soundtouch)
- ```videoscale``` video scale, format transform（compiled by FFmpeg libswscale）
- ```avnetwork``` Web Platform network file IO related (Fetch, WebSocket, WebTransport, File)
- ```avprotocol``` Audio and video protocols (dash, m3u8、rtp、rtsp、rtmp)
- ```avrender``` Audio and video rendering (8bit, 10bit, HDR, audioWorklet, WebGL, WebGPU)
- ```avpipeline``` Media task processing pipeline for multi-threaded parallel processing tasks

### Multi-threads

libmedia supports multi-threading, but the page needs to use SharedArrayBuffer. You can add the following two response headers to the response header of the top-level document to enable use of SharedArrayBuffer:

- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp

if multi-threading is not supported, it will fall back to running on the main thread.


### Tools

- AVPlayer is libmedia's audio and video player implementation, supporting software decoding, hardware decoding, and MSE; it supports multiple encapsulation protocols and multiple encoding formats.
[online demo](https://zhaohappy.github.io/libmedia/test/avplayer.html)
[online player](https://zhaohappy.github.io/libmedia/product/player/player.html)


- AVTranscoder is the transcoding tool implementation of libmedia
[online demo](https://zhaohappy.github.io/libmedia/test/avtranscoder.html)

### Formats

| Format   | Input   | Output    |
| ---------| --------|-----------|
| flv      | ✅       | ✅        |
| mov      | ✅       | ✅        |
| mp4      | ✅       | ✅        |
| mpegts   | ✅       | ✅        |
| mpegps   | ✅       | ❌        |
| matroska | ✅       | ✅        |
| webm     | ✅       | ✅        |
| h264     | ✅       | ❌        |
| hevc     | ✅       | ❌        |
| vvc      | ✅       | ❌        |
| mp3      | ✅       | ✅        |
| ogg      | ✅       | ✅        |
| ivf      | ✅       | ✅        |
| aac      | ✅       | ❌        |
| flac     | ✅       | ❌        |
| wav      | ✅       | ❌        |
| webvtt   | ✅       | ❌        |
| srt      | ✅       | ❌        |
| ass      | ✅       | ❌        |
| ssa      | ✅       | ❌        |
| ttml     | ✅       | ❌        |

### Protocol

| Protocol | Input   | Output    |
| ---------| --------|-----------|
| hls      | ✅       | ❌        |
| dash     | ✅       | ❌        |
| rtmp     | ✅       | ❌        |
| rtsp     | ✅       | ❌        |

rtmp and rtsp need use WebSocket or WebTransport proxy tcp connection，for example in avplayer:

```JavaScript

const player = new AVPlayer()

// first url is the websocket proxy rtmp url 
player.load('rtmp://xxx.xxx.xxx.xxx/xxx/xxx', {
  // uri is the source rtmp url
  uri: 'rtmp://xxx.xxx.xxx.xxx/xxx/xxx'
})
player.play()

player.load('rtsp://xxx.xxx.xxx.xxx/xxx')
player.play()

// use wss
player.load('rtsp://xxx.xxx.xxx.xxx/xxx')
// use ws
player.load('rtsp+ws://xxx.xxx.xxx.xxx/xxx')
// use webtransport
player.load('rtsp+webtransport://xxx.xxx.xxx.xxx/xxx')

```

### Codecs

Codecs are compiled into separate wasm modules, the decoders are in the ```dist/decode``` directory, and the encoders are in the ```dist/encode``` directory. There are three versions of the encoding and decoding wasm module: baseline, atomic, and simd. The baseline version's instruction set corresponds to the MVP version of WebAssembly, but it needs to support Mutable Globals, with the highest compatibility and the lowest performance; atomic version add the atomic operation instruction set and Bulk memory instruction set; simd version add the simd vector acceleration instruction set, has the highest performance. The current simd version is automatically optimized by the compiler, and different codecs have different effects (currently I have not seen any codec projects has optimized for the wasm simd instruction set. If you want higher acceleration effects, you may want to optimize by yourself).

> If you find that some wasm(such as aac.wasm) file's size are too large, it is because the source code implementation of the wasm declares a large size of global array, causing the Data segment to contain large pieces of data all zero; as long as your web server enables gzip for static resources can make it very small.

#### Compatibility support status of three versions and Webcodecs

| environment    | baseline     | atomic     | simd         | webcodecs            |
| -----------    | -----------  |----------- | -----------  | -----------          |
| Chrome         | 74+          | 75+        | 91+          |94+                   |
| Firefox        | 61+          | 79+        | 89+          |130+                  |
| Safari         | 13.4+        | 15+        | 16.4+        |16.4+(video only)     |
| Wasmtime       | 0.20+        | 15+        | 15+          |N/A                   |
| Wasmer         | 0.7+         | N/A        | N/A          |N/A                   |
| Node.js        | 12.0+        | 16.4+      | 16.4+        |N/A                   |
| Deno           | 0.1+         | 1.9+       | 1.9+         |N/A                   |
| wasm2c         | 1.0.1+       | N/A        | N/A          |N/A                   |


#### Supported decode codecs status

| codec       | baseline   | atomic     | simd        |  webcodecs(Chrome)|
| ----------- | -----------|----------- | ----------- | -----------       |
| h264        | ✅         | ✅          | ✅          | ✅                 |
| hevc        | ✅         | ✅          | ✅          | ✅ (hardware only) |
| vvc         | ✅         | ✅          | ✅          | ❌                 |
| av1         | ✅         | ✅          | ✅          | ✅                 |
| vp8         | ✅         | ✅          | ✅          | ✅                 |
| vp9         | ✅         | ✅          | ✅          | ✅                 |
| mpeg1       | ✅         | ✅          | ✅          | ❌                 |
| mpeg2       | ✅         | ✅          | ✅          | ❌                 |
| mpeg4       | ✅         | ✅          | ✅          | ❌                 |
| theora      | ✅         | ✅          | ✅          | ❌                 |
| aac         | ✅         | ✅          | ✅          | ✅                 |
| mp3         | ✅         | ✅          | ✅          | ✅                 |
| opus        | ✅         | ✅          | ✅          | ✅                 |
| flac        | ✅         | ✅          | ✅          | ❌                 |
| speex       | ✅         | ✅          | ✅          | ❌                 |
| vorbis      | ✅         | ✅          | ✅          | ❌                 |
| ac3         | ✅         | ✅          | ✅          | ❌                 |
| eac3        | ✅         | ✅          | ✅          | ❌                 |
| dts         | ✅         | ✅          | ✅          | ❌                 |
| G.711 A-law | ✅         | ✅          | ✅          | ❌                 |
| G.711 μ-law | ✅         | ✅          | ✅          | ❌                 |

#### Supported encode codecs status

| codec       | baseline   | atomic     | simd        |  webcodecs(Chrome) |
| ----------- | -----------|----------- | ----------- | -----------        |
| h264        | ✅         | ✅          | ✅          | ✅                 |
| hevc        | ❌         | ✅          | ✅          | ❌                 |
| vvc         | ❌         | ❌          | ❌          | ❌                 |
| av1         | ❌         | ✅          | ✅          | ✅                 |
| vp8         | ✅         | ✅          | ✅          | ✅                 |
| vp9         | ✅         | ✅          | ✅          | ✅                 |
| mpeg4       | ✅         | ✅          | ✅          | ❌                 |
| theora      | ✅         | ✅          | ✅          | ❌                 |
| aac         | ✅         | ✅          | ✅          | ✅                 |
| mp3         | ✅         | ✅          | ✅          | ❌                 |
| opus        | ✅         | ✅          | ✅          | ✅                 |
| flac        | ✅         | ✅          | ✅          | ❌                 |
| speex       | ✅         | ✅          | ✅          | ❌                 |
| vorbis      | ✅         | ✅          | ✅          | ❌                 |
| ac3         | ✅         | ✅          | ✅          | ❌                 |
| eac3        | ✅         | ✅          | ✅          | ❌                 |
| dts         | ✅         | ✅          | ✅          | ❌                 |
| G.711 A-law | ✅         | ✅          | ✅          | ❌                 |
| G.711 μ-law | ✅         | ✅          | ✅          | ❌                 |


### Start

If you want to integrate this project for development, it is recommended to use libmedia as a sub-module. The project dependence on [cheap](https://github.com/zhaohappy/cheap) library, which requires you to understanding of the usage of cheap.

Currently, this project only supports using webpack for compilation and packaging.

Here's how to compile the AVPlayer and AVTranscoder tool

```shell

# Clone the project and all submodules
git clone git@github.com:zhaohappy/libmedia.git --recursive

# enter libmedia directory
cd libmedia

# Install dependencies
npm install

# Compile AVPlayer with development mode
npm run build-avplayer-dev

# Compile AVTranscoder with development mode
npm run build-avtranscoder-dev

# Start local http service
# Any http service will do. If it reports that edp cannot be found, you can install it globally use: npm install edp -g
edp webserver start --port=9000

# use browser access http://localhost:9000/test/avplayer.html

```

To debug the code in multi-threaded Worker from source, set the ```ENABLE_THREADS_SPLIT``` macro in ```tsconfig.json``` to ```true``` and recompile.

```json
{
  "cheap": {
    "defined": {
      "ENABLE_THREADS_SPLIT": true
    }
  }
}
```

```tsconfig.json``` can also set other macros to tailor compilation. You can change the relevant settings according to your own needs. For details, see ```tsconfig.json``` -> ```cheap``` -> Configuration in ```defined```

### Example

```examples/demux.ts``` is an example of demux

```examples/mux.ts``` is an example of mux

```examples/decode.ts``` is an example of decode

```test/avplayer.html``` is an example of using AVPlayer and also the implementation of online demo.

```test/avtranscode.html``` is an example of using AVTranscoder and also the implementation of online demo.

### License

libmedia uses the LGPL open source license. You need to comply with the license requirements. For details, see [LGPL](https://github.com/zhaohappy/libmedia/blob/master/COPYING.LGPLv3)

But some dependent libraries are under GPL license. If you use these dependent libraries, libmedia will be infected with GPL license. These dependent libraries are used by the following components:

 - dist/encoder/x264.wasm
 - dist/encoder/x264-atomic.wasm
 - dist/encoder/x264-simd.wasm
 - dist/encoder/x265-atomic.wasm
 - dist/encoder/x265-simd.wasm

#### Dependence Licence
 - [ffmpeg](https://github.com/FFmpeg/FFmpeg): LGPL v2.1+
 - [soundtouch](https://www.surina.net/soundtouch/): LGPL v2.1
 - [openh264](https://github.com/cisco/openh264): BSD-2-Clause
 - [x264](https://www.videolan.org/developers/x264.html): GPL
 - [x265](https://www.videolan.org/developers/x265.html): GPL
 - [theora](https://github.com/xiph/theora): BSD-3-Clause
 - [vorbis](https://xiph.org/vorbis/): based BSD
 - [speex](https://www.speex.org/): revised BSD 
 - [opus](https://opus-codec.org/): BSD-3-Clause
 - [libvpx](https://chromium.googlesource.com/webm/libvpx/): BSD-3-Clause
 - [libogg](https://github.com/gcp/libogg): BSD-3-Clause
 - [lame](https://lame.sourceforge.io/): LGPL
 - [kvazaar](https://github.com/ultravideo/kvazaar): BSD-3-Clause
 - [flac](https://github.com/xiph/flac): BSD-3-Clause
 - [fdkaac](https://www.linuxfromscratch.org/blfs/view/svn/multimedia/fdk-aac.html): based BSD
 - [dav1d](https://code.videolan.org/videolan/dav1d/): BSD-2-Clause
 - [aom](https://aomedia.googlesource.com/aom/): BSD-2-Clause
 - [hls-parser](https://github.com/kuu/hls-parser): MIT
 - [sdp-transform](https://github.com/clux/sdp-transform): MIT
 - [ass.js](https://github.com/weizhenye/ASS): MIT
 - [ass-compiler](https://github.com/weizhenye/ass-compiler): MIT
 - [yox](https://github.com/yoxjs/yox): MIT

Copyright (C) 2024-present, Gaoxing Zhao