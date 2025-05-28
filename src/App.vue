<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="bg-gray-800 min-h-screen">
    <div class="mx-auto bg-gray-900 w-full shadow-md navbar md:w-80%">
      <div class="flex-1">
        <a class="text-xl btn btn-ghost" href="/">Together ❤️ Video</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="avatar btn btn-ghost btn-circle">
            <div class="rounded-full w-10">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              >
            </div>
          </div>
          <ul
            tabindex="0"
            class="mt-3 p-2 rounded-xl bg-black w-30 shadow z-1 dropdown-content menu menu-sm"
          >
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <main class="mx-auto container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
