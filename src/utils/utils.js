export const store = {
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  fetch (key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || []
    } catch (e) {
      return []
    }
  }
}

export function getTitle (content) {
  let title = content
  if (content.length > 6) {
    title = content.substring(0, 6) + '...'
  }
  return title
}

export function getNowFormatDate () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  return year + '-' + month + '-' + strDate + ' ' + hour + ':' + minute + ':' + second
}
