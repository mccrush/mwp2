import { supabase } from '../../supabase/supabaseClient'

const addItem = async ({ table, item }) => {
  try {
    const { data, error } = await supabase.from(table).insert([item]).select()
    if (error) throw error
    //console.log('addItem successful data:', data)
    return data
  } catch (error) {
    console.error('addItem error:', error.message)
    throw error
  }
}

const getItems = async ({ table, userId, select }) => {
  try {
    const { data, error } = await supabase.from(table).select(select).eq('user_id', userId)
    if (error) throw error
    return data
  } catch (error) {
    console.error('getItems error:', error.message)
    throw error
  }
}

const deleteItem = async ({ table, id }) => {
  try {
    const { data, error } = await supabase.from(table).delete().eq('id', id).select()
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('deleteItem() error = ', error);
  }
}

const updateItem = async ({ table, item }) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(item)
      .eq('id', item.id)
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('updateItem() error = ', error);
  }
}

export { addItem, getItems, deleteItem, updateItem }