const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  showToasts
}

//网络不稳定提示 1:success 2:error 3：loading 4 ：none
function showToasts(types,message){
  switch(types){
    case 1:
      wx.showToast({
        title: message,
        duration: 1000,
        mask:true
      })
    case 2:
      wx.showToast({
        title: message,
        icon: 'error',
        duration: 1000,
        mask:true
      })
    case 3:
      wx.showToast({
        title: message,
        icon: '3：loading',
        duration: 1000,
        mask:true
      })
    case 4:
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 1000,
        mask:true
      })
  }
}

