// lib/user.js ( services)
import { supabase } from './supabaseClient';  // Importing Supabase client setup

export const addContactInfo = async (userId, contactNo) => {
  const { data, error } = await supabase
    .from('users')  // 'users' is table in Supabase
    .upsert({ id: userId, contact_no: contactNo })  // Using upsert to insert or update
    .single();

  if (error) {
    console.error('Error adding contact info:', error.message);
    return;
  }

  console.log('Contact info added successfully:', data);
};
