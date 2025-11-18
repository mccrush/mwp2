import { factory_links } from './factory_links'
import { factory_passwords } from './factory_passwords'
import { factory_contacts } from './factory_contacts'
import { factory_tasks } from './factory_tasks'

export const factory_items = type => {
  switch (type) {
    case 'links':
      return factory_links()
    case 'passwords':
      return factory_passwords()
    case 'contacts':
      return factory_contacts()
    case 'tasks':
      return factory_tasks()
  }
}