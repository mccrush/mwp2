<script setup>
import { ref } from 'vue'
import BtnTextSlot from './../../../shared/components/buttons/BtnTextSlot.vue'
import BtnAddProject from './buttons/BtnAddProject.vue'

const emit = defineEmits(['save-project'])

const newProjectName = defineModel()

const mod = ref('')

const saveProject = () => {
  emit('save-project')
  mod.value = ''
}
</script>

<template>
  <div class="ps-2 pe-2">
    <Transition name="slide-up" mode="out-in">
      <div v-if="mod === 'create'">
        <input
          class="form-control form-control-sm"
          type="text"
          placeholder="Название проекта"
          minlength="1"
          maxlength="32"
          v-model.trim="newProjectName"
          @keyup.enter="saveProject"
        />
        <div class="d-flex">
          <BtnTextSlot class="mt-1 me-1" @click="mod = ''">
            Отмена
          </BtnTextSlot>
          <BtnTextSlot
            class="mt-1"
            :class="{ disabled: !newProjectName }"
            @click="saveProject"
          >
            Сохранить
          </BtnTextSlot>
        </div>
      </div>

      <BtnTextSlot v-else @click="mod = 'create'"> Создать проект </BtnTextSlot>
    </Transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.15s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>