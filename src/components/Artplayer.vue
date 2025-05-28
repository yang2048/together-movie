<script setup lang="ts">
import Artplayer from 'artplayer'
import artplayerPluginAmbilight from 'artplayer-plugin-ambilight'
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku'
// import artplayerPluginDanmukuMask from 'artplayer-plugin-danmuku-mask'
import artplayerPluginHlsControl from 'artplayer-plugin-hls-control'
import Hls from 'hls.js'

// 接收 props
const props = defineProps<Props>()
// 定义 emits
const emit = defineEmits(['getInstance'])
// 定义 Artplayer 实例
let art: Artplayer | null = null
// 定义 artRef 提前到使用前
const artRef = ref<HTMLDivElement | string>('')

// 定义 props 类型
interface Props {
  option: {
    container?: HTMLElement
    [key: string]: any
    url: string
  }
}

function saveDanmu(danmu: any): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟保存成功或失败
      const success = true // 可根据实际逻辑判断是否通过
      resolve(success)
    }, 1000)
  })
}

onMounted(() => {
  art = new Artplayer({
    ...props.option,
    container: artRef.value,
    autoplay: true,
    autoSize: false,
    autoMini: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    screenshot: true,
    subtitleOffset: true,
    setting: true,
    hotkey: true,
    pip: true,
    fullscreen: true,
    fullscreenWeb: false,
    miniProgressBar: true,
    playsInline: false,
    lock: true,
    gesture: true,
    fastForward: true,
    autoOrientation: true,
    airplay: true,
    poster: 'https://vip.diaoyu18.com/img/palyboxBg.png',
    plugins: [
      // artplayerPluginAmbilight({
      //   blur: '50px',
      //   opacity: 1,
      //   frequency: 10,
      //   duration: 0.3,
      //   zIndex: 1000,
      // }),
      artplayerPluginHlsControl({
        quality: {
          // Show qualitys in control
          control: false,
          // Show qualitys in setting
          setting: true,
          // Get the quality name from level
          getName: level => `${level.height}P`,
          // I18n
          title: '画质',
          auto: 'Auto',
        },
        audio: {
          control: false,
          setting: true,
          getName: track => track.name,
          title: '音频',
          auto: 'Auto',
        },
      }),
      artplayerPluginDanmuku({
        danmuku: '/assets/sample/danmuku.xml',
        maxLength: 150,
        // heatmap: true,
        // 点击发送按钮后触发的函数
        async beforeEmit(danmu) {
          const state = await saveDanmu(danmu)
          return Boolean(state)
        },
        // 弹幕的过滤器，包含来自服务端的和来自用户输入的
        filter(danmu) {
          const isDirty = (/fuck/i).test(danmu.text)
          if (isDirty)
            return false
          return danmu.text.length <= 100
        },
        async beforeVisible(danmu) {
          console.log('danmu 已更新', danmu)
          return true
        },
      }),
      // artplayerPluginDanmukuMask({
      //   solutionPath: '/assets/selfie_segmentation',
      // }),
    ],
    customType: {
      m3u8: function playM3u8(video, url, art) {
        if (Hls.isSupported()) {
          const hls = new Hls()
          hls.loadSource(url)
          hls.attachMedia(video)
          // console.log('video ', video)
          // console.log('url ', url)
          // console.log('art ', art)
          // console.log('hls ', hls)

          art.hls = hls
          art.once('destroy', () => hls.destroy())
        }
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = url
        }
        else {
          art.notice.show = 'Unsupported playback format: m3u8'
        }
      },
    },
  })

  nextTick(() => {
    console.log('DOM 已更新')
    if (art) {
      art.contextmenu.add({
        name: 'your-menu',
        html: '<div class="artplayer-contextmenu-item">自定义</div>',
        click: () => {
          console.log('自定义菜单项被点击')
        },
      })
      art.contextmenu.remove('version')
      const $danmu = artRef.value as HTMLDivElement
      art.plugins.artplayerPluginDanmuku.mount($danmu)
      emit('getInstance', art)
    }
  })
})

onBeforeUnmount(() => {
  if (art && art.destroy) {
    art.destroy(false)
  }
})
</script>

<template>
  <div>
    <div ref="artRef" class="artplayer-app" />
  </div>
</template>

<style lang="scss" scoped>
.artplayer-app {
  aspect-ratio: 16/9;
}
</style>
