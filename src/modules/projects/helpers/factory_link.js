export const factory_link = (project_id, title = 'New Link', url = '') => {
  return {
    project_id,
    title,
    url,
    description: '',
  }
}