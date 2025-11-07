<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useLinksStore } from '../../../shared/stores/links'
import { factory_link } from '../helpers/factory_link'

import ProjectTabButtons from './../components/ProjectTabButtons.vue'
import ProjectForms from './../components/ProjectForms.vue'

const { currentProjectId } = defineProps({
  currentProjectId: Number
})

const linksStore = useLinksStore()

const formsArray = computed(() => linksStore.links)
const tabView = ref('TabLinks')
const tabType = ref('links')

onMounted(() => {
  if ('tab-view' in localStorage)
    tabView.value = localStorage.getItem('tab-view')

  if ('tab-type' in localStorage)
    tabType.value = localStorage.getItem('tab-type')
})

const setViewTab = (tabViewV, tabTypeV) => {
  //console.log('setViewTab tabViewV=', tabViewV, ' tabTypeV=', tabTypeV)
  tabView.value = tabViewV
  tabType.value = tabTypeV
  localStorage.setItem('tab-view', tabViewV)
  localStorage.setItem('tab-type', tabTypeV)
}

const createForm = () => {
  // Необходимо определять фабрику и Стор по типу формы
  const newForm = factory_link(currentProjectId)
  linksStore.addLinks({ link: newForm })
}

const getFormsArray = (projectId, tabType) => {
  //console.log('getFormsArray projectId=', projectId, ' tabType=', tabType)

  linksStore.getLinks({
    projectId
  })

  // Каким-то образом из БД получать только те типы форм,
  // которые сейчас активны для проекта
  // Подумать и над оптимизацией. Чтобы не дергать каждый раз
  // БД, а кешировать в сторе или еще как-то
}

// Если меняется тип формы, то обновляем массив форм
watch(
  () => tabType.value,
  newType => {
    getFormsArray(currentProjectId, newType)
  },
  { immediate: true }
)

// Если меняется ID проекта, то обновляем массив форм
watch(
  () => currentProjectId,
  newId => {
    getFormsArray(newId, tabType.value)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <pre>P_ID: {{ currentProjectId }}</pre>
    <ProjectTabButtons
      :tabView="tabView"
      @set-view-tab="setViewTab"
      @create-form="createForm"
    />
    <ProjectForms :tabType="tabType" :formsArray="formsArray" />
  </div>
</template>