import { supabase } from '../../supabase/supabaseClient'

const logInUser = async ({ email, password }) => {
  console.log('logInUser(), email = ', email, ' password = ', password ? '***' : 'null');
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error;
    //console.log('logInUser successful data.user.id:', data.user.id);
  } catch (error) {
    console.error('logInUser error:', error.message);
    throw error;
  }

}

const logOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    //console.log('logOutUser successful');
  } catch (error) {
    console.error('logOutUser error:', error.message);
    throw error;
  }
}

export { logInUser, logOutUser }