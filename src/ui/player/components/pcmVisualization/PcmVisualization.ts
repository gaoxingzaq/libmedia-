import { ComponentOptions } from 'yox'
import AVPlayer, { AVPlayerStatus } from 'avplayer/AVPlayer'
import * as eventType from 'avplayer/eventType'

import template from './PcmVisualization.hbs'
import style from './PcmVisualization.styl'
import debounce from 'common/function/debounce'

// 将 RGB 转换为 HSL
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s, l]
}

// 将 HSL 转换为 RGB
function hslToRgb(h: number, s: number, l: number) {
  let r, g, b

  if (s == 0) {
    r = g = b = l
  }
  else {
    const hue2rgb = function (p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 3) return q
      if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    h /= 360
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// 色相插值函数
function interpolateHue(hue, t) {
  let newHue = (hue + t) % 360
  if (newHue < 0) newHue += 360
  return newHue
}

class Drawer {

  private OUTER_MAX_HEIGHT = 0.4
  private MIDDLE_MAX_HEIGHT = 0.3
  private INNER_MAX_HEIGHT = 0.2

  private MAX_LENGTH = 64

  constructor() {

  }

  draw(data: Uint8Array, context: CanvasRenderingContext2D) {
    const width = context.canvas.width
    const height = context.canvas.height
    const minRadius = Math.min(width, height) / 2

    let length = Math.floor(this.MAX_LENGTH * (1 + Math.min(1, (minRadius - 500) / 200)))

    const step = Math.floor(data.length / length * 0.6)

    context.clearRect(0, 0, width, height)

    const radius = Math.min(width / 2, height / 2) * (1 - 0.05 - this.OUTER_MAX_HEIGHT)
    
    const outerPoints = []
    const lines = []
    const innerPoints = []

    const delta = 2 * Math.PI / length

    for (let i = 0; i < length; i++) {
      const factor = 0 + 1 * Math.pow(data[i * step] / 255, 2.2)
      outerPoints.push({
        x: width / 2 + (radius + this.OUTER_MAX_HEIGHT * minRadius * factor) * Math.cos(i * delta * -1),
        y: height / 2 + (radius + this.OUTER_MAX_HEIGHT * minRadius * factor) * Math.sin(i * delta * -1),
      })
      innerPoints.push({
        x: width / 2 + (radius - this.INNER_MAX_HEIGHT * minRadius * factor) * Math.cos(i * delta * -1),
        y: height / 2 + (radius - this.INNER_MAX_HEIGHT * minRadius * factor) * Math.sin(i * delta * -1),
      })
      lines.push({
        start: {
          x: width / 2 + radius * Math.cos(i * delta * -1),
          y: height / 2 + radius * Math.sin(i * delta * -1),
        },
        end: {
          x: width / 2 + (radius + this.MIDDLE_MAX_HEIGHT * minRadius * factor) * Math.cos(i * delta * -1),
          y: height / 2 + (radius + this.MIDDLE_MAX_HEIGHT * minRadius * factor) * Math.sin(i * delta * -1),
        }
      })
    }

    const hslColor = rgbToHsl(255, 0, 0)

    context.lineCap = 'round'
    context.lineWidth = 8
    
    context.shadowBlur = 20
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0

    const degDelta = 360 / outerPoints.length

    for (let i = 0; i < outerPoints.length; i++) {
      let deg = Math.floor(i * degDelta) - 60
      if (deg < 0) {
        deg += 360
      }
      const interpolatedHue = interpolateHue(hslColor[0], deg)
      const newRgbColor = hslToRgb(interpolatedHue, hslColor[1], hslColor[2])

      const colorString = `rgb(${newRgbColor[0]},${newRgbColor[1]},${newRgbColor[2]})`
      context.strokeStyle = colorString
      context.fillStyle = colorString
      context.shadowColor = colorString

      context.beginPath()
      context.arc(outerPoints[i].x, outerPoints[i].y, 4, 0, Math.PI * 2, true)
      context.fill()

      context.beginPath()
      context.arc(innerPoints[i].x, innerPoints[i].y, 4, 0, Math.PI * 2, true)
      context.fill()

      context.beginPath()
      context.moveTo(lines[i].start.x, lines[i].start.y)
      context.lineTo(lines[i].end.x, lines[i].end.y)
      context.stroke()
    }

    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = 'rgba(149, 251, 254)'
    context.moveTo(innerPoints[0].x, innerPoints[0].y)
    for (let i = 1; i < innerPoints.length; i++) {
      context.lineTo(innerPoints[i].x, innerPoints[i].y)
    }
    context.lineTo(innerPoints[0].x, innerPoints[0].y)
    context.stroke()
  }
}

const PcmVisualization: ComponentOptions = {

  name: 'PcmVisualization',

  template,

  propTypes: {
    player: {
      type: 'object',
      required: true
    },
    language: {
      type: 'object',
      required: true
    }
  },

  data: function () {
    return {
      style,
    }
  },

  methods: {
    draw() {
      this.analyser.getByteFrequencyData(this.buffer)
      this.drawer.draw(this.buffer, this.context)
      requestAnimationFrame(() => {
        if (!this.playing) {
          return
        }
        this.draw()
      })
    },

    init(player: AVPlayer) {
      if (player.hasVideo()) {
        this.playing = false
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
      }
      else if (player.hasAudio()) {
        this.playing = true
        if (!this.analyser) {
          this.analyser = AVPlayer.audioContext.createAnalyser()
          this.buffer = new Uint8Array(this.analyser.frequencyBinCount)
        }
        player.getAudioOutputNode().connect(this.analyser)
        this.draw()
      }
    }
  },

  afterMount() {
    this.namespace = '.component_pcm_visualization' + Math.random()

    this.$refs['canvas'].width = this.$el.offsetWidth * devicePixelRatio
    this.$refs['canvas'].height = this.$el.offsetHeight * devicePixelRatio
    this.context = this.$refs['canvas'].getContext('2d')
    this.drawer = new Drawer()

    const player = this.get('player') as AVPlayer

    player.on(eventType.PLAYED + this.namespace, () => {
      this.init(player)
    })
    if (player.getStatus() === AVPlayerStatus.PLAYED) {
      this.init(player)
    }
    this.onresize = debounce(() => {
      this.$refs['canvas'].width = this.$el.offsetWidth * devicePixelRatio
      this.$refs['canvas'].height = this.$el.offsetHeight * devicePixelRatio
    }, 500)
    window.addEventListener('resize', this.onresize)
  },

  beforeDestroy() {
    const player = this.get('player') as AVPlayer
    if (this.namespace) {
      player.off(this.namespace)
    }
    this.playing = false
    window.removeEventListener('resize', this.onresize)
  }
}

export default PcmVisualization