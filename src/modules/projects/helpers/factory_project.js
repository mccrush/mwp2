export const factory_project = (userId = null, companyId = null, name = 'New Project') => {
  return {
    user_id: userId,
    company_id: companyId,
    name: name,
    description: '',
  }
}

/* 

  id bigserial not null,
  user_id uuid null,
  company_id bigint null,
  name text not null,
  description text null,

*/