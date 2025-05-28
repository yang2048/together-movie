<script setup lang="ts">
import { randomInt } from 'es-toolkit/math'

const count = ref(0)
const router = useRouter()
const roomNo = ref(randomInt(10000, 99999))
const roomPd = ref()
function goToRoom() {
  if (roomNo.value) {
    router.push({ path: `/room/${roomNo.value}`, query: { roomPd: roomPd.value } })
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="m-5 p-5 shadow-2xl items-center card">
      <p class="text-lg m-5">
        当前房间人数：{{ count }}
      </p>
      <div class="card-body">
        <div class="justify-center card-actions">
          <label class="input">
            <span class="label">房间号</span>
            <input v-model="roomNo" type="text" placeholder="房间号" disabled>
          </label>
          <label class="input">
            <span class="label">房间密码</span>
            <input v-model="roomPd" type="text" placeholder="房间密码">
          </label>
        </div>
        <button class="mt-8 btn btn-primary" @click="goToRoom">
          进入房间
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
