export const periodNames = {
  day: ['день', 'дня', 'дней'],
  month: ['месяц', 'месяца', 'месяцев'],
  year: ['год', 'года', 'лет']
}

export const getFormattedDate = (date) => {
  const d = new Date(date)
  const formatted_date =
    `0${d.getDate()}`.slice(-2) +
    '.' +
    `0${d.getMonth() + 1}`.slice(-2) +
    '.' +
    `0000${d.getFullYear()}`.slice(-4)
  return formatted_date
}

export const getDateRu = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('ru-RU', options)
}

export const getPeriodString = (num, period) => {
  if (!Array.isArray(period) || period.length !== 3) {
    return ''
  }
  if (num > 10 && num < 21) {
    return period[2]
  } else {
    switch (`${num}`.slice(-1)) {
      case '1':
        return period[0]
      case '2':
      case '3':
      case '4':
        return period[1]
      default:
        return period[2]
    }
  }
}
