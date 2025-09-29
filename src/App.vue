<script setup>
import { computed } from 'vue'
import { useRouterStore } from './shared/stores/router'
import { useCurrentUserStore } from './shared/stores/currentUser'

import TheNavbar from './shared/components/blocks/TheNavbar.vue'
import TheHeader from './shared/components/blocks/TheHeader.vue'
import TheFooter from './shared/components/blocks/TheFooter.vue'
import HomePage from './modules/home/HomePage.vue'
import LoginPage from './modules/login/LoginPage.vue'

const viewComponents = {
  HomePage
}

const routerStore = useRouterStore()
const currentUserStore = useCurrentUserStore()

const activeComponent = computed(() => {
  if (!currentUserStore.isLoggedIn) {
    return LoginPage
  }
  return viewComponents[routerStore.activeView] || HomePage
})
</script>

<template>
  <div>
    <div
      class="my-container-992 container-xl shadow rounded text-body-secondary pl-0"
    >
      <!-- <TheNavbar /> -->
      <TheHeader />
      <div class="row border-top border-dark-subtle"></div>
      <transition name="fade" mode="out-in">
        <component :is="activeComponent" />
      </transition>
      <TheFooter />
    </div>
    <!-- <TheMessage /> -->
  </div>
</template>