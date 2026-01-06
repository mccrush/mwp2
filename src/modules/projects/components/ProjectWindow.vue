<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useItemsStore } from '../../../shared/stores/items'
//import { factory_link } from '../helpers/factory_link'
import { factory_items } from '../helpers/factory_items'

import ProjectTabButtons from './../components/ProjectTabButtons.vue'
import ProjectForms from './../components/ProjectForms.vue'

const { currentProjectId } = defineProps({
  currentProjectId: Number
})

const itemsStore = useItemsStore()

const tabView = ref('TabLinks')
const tabType = ref('links')
const formsArray = computed(() => itemsStore[tabType.value])

onMounted(() => {
  if ('tab-view' in localStorage)
    tabView.value = localStorage.getItem('mwp-tab-view')

  if ('tab-type' in localStorage)
    tabType.value = localStorage.getItem('mwp-tab-type')
})

const setViewTab = (tabViewV, tabTypeV) => {
  //console.log('setViewTab tabViewV=', tabViewV, ' tabTypeV=', tabTypeV)
  tabView.value = tabViewV
  tabType.value = tabTypeV
  localStorage.setItem('mwp-tab-view', tabViewV)
  localStorage.setItem('mwp-tab-type', tabTypeV)
}

const createForm = () => {
  // Необходимо определять фабрику и Стор по типу формы
  const newForm = factory_items(tabType.value)
  newForm.project_id = currentProjectId
  itemsStore.addItem({ item: newForm, table: tabType.value })
}

const getFormsArray = (projectId, tabType) => {
  //console.log('getFormsArray projectId=', projectId, ' tabType=', tabType)

  itemsStore.getItems({
    projectId,
    table: tabType
  })
}

// Если меняется тип формы, то обновляем массив форм
watch(
  () => tabType.value,
  newType => {
    //console.log('newType =', newType)
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