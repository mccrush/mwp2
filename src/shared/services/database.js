import { supabase } from '../../supabase/supabaseClient'

const addItem = async ({ table, item }) => {
  try {
    const { data, error } = await supabase.from(table).insert([item]).select()
    if (error) throw error
    //console.log('addItem successful data[0]:', data[0])
    return data[0]
  } catch (error) {
    console.error('addItem error:', error.message)
    throw error
  }
}

const getItems = async ({ table, select, condition, order = 'created_at', ascending = true }) => {
  try {
    const { data, error } = await supabase.from(table).select(select).or(condition).order(order, { ascending })
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