export async function findWord(word: string) {
  try {
    return await $fetch(`/api/supabase/get-word/${word}`, {
      headers: useRequestHeaders(['cookie']),
    })
  }
  catch (e) {
  }
}

export async function saveWord(word: string) {
  try {
    return await $fetch('/api/supabase/save-word', {
      method: 'post',
      headers: useRequestHeaders(['cookie']),
      body: { word },
    })
  }
  catch (e) {
  }
}
