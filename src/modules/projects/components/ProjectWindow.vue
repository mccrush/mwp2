<script setup>
import { ref } from 'vue'

import ProjectTabButtons from './../components/ProjectTabButtons.vue'
import ProjectForms from './../components/ProjectForms.vue'

defineProps({
  currentProject: Object
})

const viewTab = ref('TabLinks')

const setViewTab = tab => {
  viewTab.value = tab
}
</script>

<template>
  <div>
    <ProjectTabButtons :viewTab="viewTab" @set-view-tab="setViewTab" />
    <ProjectForms />
  </div>
</template>