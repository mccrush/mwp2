import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Компонент для тестирования
import ProjectsPage from './ProjectsPage.vue'

// Мокаем сервисы
import * as supabaseService from '../../shared/services/database'

// Мокируем весь модуль supabaseService
vi.mock('../../shared/services/database')

describe('ProjectsPage.vue', () => {
  // Локальная "база данных" для теста
  let fakeProjectsDB = []

  beforeEach(() => {
    // Устанавливаем Pinia перед каждым тестом
    setActivePinia(createPinia())

    // Сбрасываем нашу "базу данных" и моки
    fakeProjectsDB = [
      { id: 1, name: 'Старый проект 1' },
    ]
    vi.clearAllMocks()

    // Настраиваем поведение моков
    supabaseService.getItems.mockImplementation(async () => {
      // getItems возвращает текущее состояние нашей фейковой БД
      return [...fakeProjectsDB]
    })

    supabaseService.addItem.mockImplementation(async (project) => {
      // addItem добавляет новый проект в фейковую БД
      const newProject = { ...project, id: Date.now() } // Генерируем ID
      fakeProjectsDB.push(newProject)
      return newProject
    })
  })

  it('создает новый проект и обновляет список при нажатии на кнопку', async () => {
    // 1. Монтируем компонент
    const wrapper = mount(ProjectsPage, {
      global: {
        plugins: [createPinia()],
      },
    })

    // Ожидаем, пока компонент загрузит начальные данные
    await wrapper.vm.$nextTick()

    // Убедимся, что начальные данные отобразились
    expect(wrapper.text()).toContain('Старый проект 1')

    // 2. Имитируем ввод пользователя
    const projectName = 'Новый супер проект'
    await wrapper.find('input').setValue(projectName)

    // 3. Имитируем клик по кнопке
    await wrapper.find('button').trigger('click')

    // Ожидаем, пока Vue обработает обновления
    await wrapper.vm.$nextTick()

    // 4. Проверяем результат
    // Был ли вызван наш мок-сервис для создания проекта?
    expect(supabaseService.addItem).toHaveBeenCalledTimes(1)
    // Был ли он вызван с правильными данными (не учитывая ID)?
    expect(supabaseService.addItem).toHaveBeenCalledWith(
      expect.objectContaining({ name: projectName })
    )

    // Был ли вызван сервис для обновления списка проектов?
    // 1 раз при монтировании, 1 раз после создания
    expect(supabaseService.getItems).toHaveBeenCalledTimes(2)

    // Отобразился ли новый проект в списке?
    expect(wrapper.text()).toContain(projectName)
    // Старый проект все еще на месте?
    expect(wrapper.text()).toContain('Старый проект 1')
  })
})