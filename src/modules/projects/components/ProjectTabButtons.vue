<script setup>
import { dataTabs } from './../helpers/dataTabs'

import BtnTabTitle from './buttons/BtnTabTitle.vue'
import BtnAddTabForm from './buttons/BtnAddTabForm.vue'

defineEmits(['set-view-tab'])

defineProps({
  viewTab: {
    type: String,
    default: 'TabLinks'
  }
})
</script>


<template>
  <div class="p-2">
    <div class="row">
      <div
        class="col-6 col-md-3 pt-sm-2 pb-sm-2"
        v-for="tabButton in dataTabs"
        :key="'bt' + tabButton.type"
      >
        <div class="btn-group w-100" role="group">
          <BtnTabTitle
            class="w-75"
            :class="{
              active: tabButton.viewTab === viewTab
            }"
            @click="$emit('set-view-tab', tabButton.viewTab)"
          >
            {{ tabButton.title }}
          </BtnTabTitle>
          <BtnAddTabForm
            class="d-flex justify-content-center align-items-center w-25"
            v-if="tabButton.viewTab === viewTab"
          />
        </div>
      </div>
    </div>
  </div>
</template>