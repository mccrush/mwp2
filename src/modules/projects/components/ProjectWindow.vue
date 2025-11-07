<script setup>
import { computed, ref, watch } from 'vue'
import { useLinksStore } from '../../../shared/stores/links'
import { factory_link } from '../helpers/factory_link'

import ProjectTabButtons from './../components/ProjectTabButtons.vue'
import ProjectForms from './../components/ProjectForms.vue'

const { currentProject } = defineProps({
  currentProject: Object
})

const linksStore = useLinksStore()

const formsArray = computed(() => linksStore.links)
const tabView = ref('TabLinks')
const tabType = ref('links')

const setViewTab = (tabViewV, tabTypeV) => {
  console.log('setViewTab tabViewV=', tabViewV, ' tabTypeV=', tabTypeV)
  tabView.value = tabViewV
  tabType.value = tabTypeV
}

const createForm = () => {
  // Необходимо определять фабрику и Стор по типу формы
  const newForm = factory_link(currentProject.id)
  linksStore.addLinks({ link: newForm })
}

const getFormsArray = (projectId, tabType) => {
  console.log('getFormsArray projectId=', projectId, ' tabType=', tabType)

  linksStore.getLinks({
    projectId
  })

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
    getFormsArray(currentProject.id, newType.value)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <pre>{{ currentProject }}</pre>
    <ProjectTabButtons
      :tabView="tabView"
      @set-view-tab="setViewTab"
      @create-form="createForm"
    />
    <ProjectForms :tabType="tabType" :formsArray="formsArray" />
  </div>
</template>