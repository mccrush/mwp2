import { describe, expect, test } from "vitest"
import { factory_project } from './factory_project'

describe("Проверка фабрики создания нового проекта", () => {
  test("Результат без передачи параметров", () => {
    expect(factory_project()).toEqual({
      user_id: null,
      company_id: null,
      name: 'New Project',
      description: '',
    })
  })

  test("Результат с параметрами", () => {
    expect(factory_project('01', '02', 'Мой новый проект')).toEqual({
      user_id: '01',
      company_id: '02',
      name: 'Мой новый проект',
      description: '',
    })
  })
})