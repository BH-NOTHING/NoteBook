export const store = {
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    // TODO 保存至服务端
  },
  fetch (key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || []
    } catch (e) {
      // TODO 从服务端获取
      return []
    }
  }
}

export function getTitle (content) {
  let title = content.split('\n')[0]
  if (title.length > 6) {
    title = title.substring(0, 6) + '...'
  }
  return title
}

export function getNowFormatDate () {
  let date = new Date()
  let time = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
  for (let i in time) {
    if (time[i] <= 9) {
      time[i] = '0' + time[i]
    }
  }
  return time.year + '-' + time.month + '-' + time.date + ' ' + time.hour + ':' + time.minute + ':' + time.second
}
