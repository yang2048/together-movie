<script setup lang="ts">
import type Artplayer from 'artplayer'
import { useClipboard, usePermission } from '@vueuse/core'

const { copy, isSupported } = useClipboard()
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')

const route = useRoute()
const router = useRouter()
const roomNo = route.params.roomNo
const roomPd = route.query.roomPd
const p = route.query.p
const option = {
  url: p?.toString() || 'https://img.tukuppt.com/video_show/14490244/00/12/95/5dde9ceb470d1.mp4',
}
// 定义 Artplayer 实例
let art: Artplayer | null = null

function playUrl() {
  if (option.url) {
    console.log('播放视频 URL:', option.url)
    if (art) {
      art.switchUrl(option.url)
      if (roomNo) {
        router.push({ path: `/room/${roomNo}`, query: { p: option.url, roomPd } })
      }
    }
    else {
      console.error('Artplayer 实例未初始化')
    }
  }
  else {
    console.warn('请输入有效的视频 URL')
  }
}
function share() {
  if (roomNo && roomPd) {
    const shareUrl = `${window.location.href}`
    copy(shareUrl)
      .then(() => {
        console.log('分享链接已复制到剪贴板:', shareUrl)
      })
      .catch((error) => {
        console.error('复制分享链接失败:', error)
      })
  }
  else {
    console.warn('房间密码未定义，无法生成分享链接')
  }
}
function getInstance(ins: Artplayer) {
  console.log('Artplayer instance:', ins)
  art = ins
}

function loadRemoteScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => {
      console.log(`✅ 脚本加载成功: ${src}`)
      resolve()
    }
    script.onerror = (e) => {
      console.error(`❌ 脚本加载失败: ${src}`, e)
      reject(new Error(`Failed to load script: ${src}`))
    }
    document.head.appendChild(script)
  })
}
onMounted(async () => {
  await loadRemoteScript(
    'https://fastly.jsdelivr.net/gh/VideoTogether/VideoTogether@latest/release/extension.website.user.js',
  ).then(() => {
    console.log('🎬 VideoTogether 扩展脚本已加载')
    const wrapper = document.querySelector('#VideoTogetherWrapper')
    if (!wrapper) {
      console.warn('未找到 #VideoTogetherWrapper 元素')
      return
    }

    const root = wrapper.shadowRoot
    if (!root) {
      console.warn('#VideoTogetherWrapper 的 shadowRoot 不存在')
      return
    }

    const statusText = root.querySelector('#videoTogetherStatusText')
    const donate = root.querySelector('#vtDonate')
    const helpButton = root.querySelector('#videoTogetherHelpButton')
    const headerText = root.querySelector('#videoTogetherHeader > div > div')
    const roomNameInput = root.querySelector('#videoTogetherRoomNameInput')
    const videoTogetherRoomPdIpt = root.querySelector('#videoTogetherRoomPdIpt')

    if (statusText) {
      statusText.remove()
      if (donate) {
        donate.remove()
        if (helpButton) {
          helpButton.remove()
          if (headerText)
            headerText.textContent = '邀您一起观看'
        }
      }
    }
    if (roomNameInput && videoTogetherRoomPdIpt) {
      roomNameInput.value = roomNo
      videoTogetherRoomPdIpt.value = roomPd
      roomNameInput.disabled = true
      videoTogetherRoomPdIpt.disabled = true
    }
  })
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="m-5 align-start flex w-full items-center justify-between md:w-3/4">
      <h2>欢迎来到房间：{{ roomNo }}</h2>

      <note>
        read <b>{{ permissionRead }}</b> | write <b>{{ permissionWrite }}</b>
      </note>
      <div v-if="isSupported">
        <button class="btn btn-accent" @click="share">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
          分享好友
        </button>
      </div>
    </div>
    <div class="mx-auto w-full md:w-3/4">
      <div class="p-2 b b-gray-700 rounded-lg">
        <Artplayer :option="option" @get-instance="getInstance" />
      </div>
      <div class="mt-2">
        <div class="w-full join">
          <input v-model="option.url" type="text" class="w-full input join-item" placeholder="视频URL">
          <button class="btn join-item" @click="playUrl">
            save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 无需额外样式 */
</style>
