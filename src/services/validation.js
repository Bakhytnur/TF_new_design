import { extend } from 'vee-validate'
import { required, email, min, max, numeric } from 'vee-validate/dist/rules'

extend('alpha_digit', {
  validate: (value) => {
    const reg = /^[a-zA-Z0-9а-яА-ЯёЁ_ ]*$/
    return value.match(reg)
  },
  message: 'Введены недопустимые символы'
})

extend('required', {
  ...required,
  message: 'Пожалуйста, заполните это поле'
})

extend('email', {
  ...email,
  message: 'Пожалуйста, введите корректный адрес'
})

extend('min', {
  ...min,
  message: 'Номер слишком короткий'
})

extend('max', {
  ...max,
  message: 'Номер слишком длинный'
})

extend('numeric', {
  ...numeric,
  message: 'Пожалуйста, используйте только цифры'
})
