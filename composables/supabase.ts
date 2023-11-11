export async function findWord(word: string) {
  try {
    return await $fetch(`/api/supabase/user-words/${word}`, {
      headers: useRequestHeaders(['cookie']),
    })
  }
  catch (e) {
  }
}

export async function saveWord(word: string) {
  try {
    return await $fetch(`/api/supabase/user-words/${word}`, {
      method: 'post',
      headers: useRequestHeaders(['cookie']),
    })
  }
  catch (e) {
  }
}
