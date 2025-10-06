import { describe, expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import ProjectCreateForm from './ProjectCreateForm.vue'

describe("Проверка компонента ввода данных и события emet", () => {
  test("Ввод значение и событие по кнопке", async () => {
    let wrapper = mount(ProjectCreateForm)

    await wrapper.find("input").setValue('Новый проект')
    await wrapper.find("button").trigger("click")

    // Захват параметров события
    let inputEvents = wrapper.emitted("input")[0][0]

    expect(inputEvents.target.value).toBe('Новый проект')
  })
})