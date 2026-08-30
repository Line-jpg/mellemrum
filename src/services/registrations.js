import { supabase } from "../lib/supabase";

export async function getRegistrationsForEvent(eventId) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getRegistrationById(id) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function createRegistration(registration) {
  const { data, error } = await supabase
    .from("registrations")
    .insert(registration)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateRegistration(id, updates) {
  const { data, error } = await supabase
    .from("registrations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteRegistration(id) {
  const { error } = await supabase.from("registrations").delete().eq("id", id);

  if (error) throw error;
}
