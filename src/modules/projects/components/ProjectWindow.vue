<script setup>
import { ref, watch } from 'vue'

import ProjectTabButtons from './../components/ProjectTabButtons.vue'
import ProjectForms from './../components/ProjectForms.vue'

const { currentProject } = defineProps({
  currentProject: Object
})

const formsArray = ref([])
const tabView = ref('TabLinks')
const tabType = ref('links')

const setViewTab = (tabView, tabType) => {
  tabView.value = tabView
  tabType.value = tabType
}

const getFormsArray = (projectId, tabType) => {
  // Каким-то образом из БД получать только те типы форм,
  // которые сейчас активны для проекта
  // Подумать и над оптимизацией. Чтобы не дергать каждый раз
  // БД, а кешировать в сторе или еще как-то
}

// Если меняется проект, то обновляем массив форм
// watch(
//   () => currentProject,
//   newProject => {
//     getFormsArray(newProject.id, tabType.value)
//   },
//   { immediate: true }
// )

// Если меняется тип формы, то обновляем массив форм
watch(
  () => tabType,
  newType => {
    getFormsArray(currentProject.id, newType)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <pre>{{ currentProject }}</pre>
    <ProjectTabButtons :tabView="tabView" @set-view-tab="setViewTab" />
    <ProjectForms :tabType="tabType" />
  </div>
</template>