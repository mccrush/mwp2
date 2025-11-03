<script setup>
//import { ref } from 'vue'
import BtnTextSlot from './../../../shared/components/buttons/BtnTextSlot.vue'
import BtnTrash from './../../../shared/components/buttons/BtnTrash.vue'

const emit = defineEmits(['save-project', 'set-mod', 'delete-project'])

defineProps({
  mod: String,
  currentProjectId: Number
})

const newProjectName = defineModel()

const saveProject = () => {
  emit('save-project')
}
</script>

<template>
  <div class="ps-2 pe-2">
    <Transition name="slide-up" mode="out-in">
      <div v-if="mod === 'create' || mod === 'edit'">
        <input
          class="form-control form-control-sm"
          type="text"
          id="projectCreateForm"
          placeholder="Название проекта"
          minlength="1"
          maxlength="32"
          v-model.trim="newProjectName"
          @keyup.enter="saveProject"
        />
        <div class="d-flex">
          <BtnTextSlot class="mt-1 me-1" @click="$emit('set-mod', '')">
            Отмена
          </BtnTextSlot>
          <BtnTrash
            v-if="mod === 'edit'"
            class="mt-1 me-1"
            @click="$emit('delete-project', currentProjectId)"
          >
            Удалить
          </BtnTrash>
          <BtnTextSlot
            class="mt-1"
            :class="{ disabled: !newProjectName }"
            @click="saveProject"
          >
            Сохранить
          </BtnTextSlot>
        </div>
      </div>

      <BtnTextSlot v-else @click="$emit('set-mod', 'create')">
        Создать проект
      </BtnTextSlot>
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