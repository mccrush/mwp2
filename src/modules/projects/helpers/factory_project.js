export const factory_project = (userId = null, companyId = null, projectName = 'New Project') => {
  //console.log('userId =', userId);
  //console.log('projectName =', projectName);

  return {
    user_id: userId,
    company_id: companyId,
    name: projectName,
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