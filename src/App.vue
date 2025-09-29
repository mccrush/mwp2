<script setup>
import { computed } from 'vue'
import { useRouterStore } from './shared/stores/router'

import TheNavbar from './shared/components/blocks/TheNavbar.vue'
import TheFooter from './shared/components/blocks/TheFooter.vue'
import HomePage from './modules/home/HomePage.vue'

const viewComponents = {
  HomePage
}

const routerStore = useRouterStore()

const activeComponent = computed(() => {
  // Находим компонент в карте по имени из хранилища
  return viewComponents[routerStore.activeView] || HomePage
})
</script>

<template>
  <div>
    <div
      class="my-container-992 container-xl shadow rounded text-body-secondary pl-0"
    >
      <TheNavbar />
      <div class="row border-top border-dark-subtle"></div>
      <transition name="fade" mode="out-in">
        <component :is="activeComponent" />
      </transition>
      <TheFooter />
    </div>
    <!-- <TheMessage /> -->
  </div>
</template>