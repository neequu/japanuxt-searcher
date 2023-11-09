export async function saveWord() {
  return await $fetch('/api/supabase/save-word')
}
