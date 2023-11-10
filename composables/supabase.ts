export async function checkWord(word: string) {
  try {
    return await $fetch(`/api/supabase/save-word/${word}`)
  }
  catch (e) {
  }
}

export async function saveWord(word: string) {
  try {
    return await $fetch('/api/supabase/save-word', {
      method: 'post',
      body: { word },
    })
  }
  catch (e) {
  }
}
