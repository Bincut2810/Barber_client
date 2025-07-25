import dayjs from "dayjs"

export const getRegexEmail = () => {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return re
}

export const getRegexPassowrd = () => {
  const re = /^[A-Z][a-zA-Z0-9]{7,}$/
  return re
}

export function getRegexNumber() {
  const re = /^[0-9]+$/
  return re
}

export function getRegexPhoneNumber() {
  const re = /^(\+84|84|0)+(9|3|7|8|5)+([0-9]{8})\b/g
  return re
}

export function getMsgClient(message) {
  return message.indexOf("[!|") !== -1 && message.indexOf("|!]") !== -1
    ? message.split("[!|")[0].trim() + message.split("|!]")[1]
    : message
}

export const getRegexDOB = (dateString) => {
  return dayjs(dateString, 'DD/MM/YYYY', true).isValid()
}

export const getRealFee = (price, profitPrecent) => {
  return price - price * profitPrecent
}

export const formatMoney = money => {
  return (Math.round(money)).toLocaleString().replaceAll(",", ".")
}

export const formatNumber = (number) => {
  var formattedNumber = number.toLocaleString('en-US').replace(/,/g, '.')
  return formattedNumber
}

