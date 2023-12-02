export function getNextReviewDate(date: number, lvl: number) {
  const dateObj = new Date(date)
  if (lvl === -1) {
    dateObj.setHours(dateObj.getHours() + 10)
    return dateObj.toISOString()
  }
  else if (lvl === 1) {
    dateObj.setDate(dateObj.getDate() + 3)
    return dateObj.toISOString()
  }
  else { return null }
}

export function getFormattedDate(dateString: string | null) {
  if (!dateString)
    return
  const date = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  }).format(date)

  return formattedDate
}

function showToast(msg: string, type?: 'error' | 'success' | 'info') {
  useNuxtApp().$toast(msg, {
    theme: 'auto',
    type,
  })
}

export const showSuccessMessage = (msg: string) => showToast(msg, 'success')
export const showErrorMessage = (msg: string) => showToast(msg, 'error')
