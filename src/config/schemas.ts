import { z } from 'zod'

export const emailShape = z
    .string({
        required_error: "Це поле є обов'язковим"
    })
    .email('Введіть дійсну адресу електронної пошти')

export const passwordShape = z
    .string({
        required_error: "Це поле є обов'язковим"
    })
    .min(1, "Це поле є обов'язковим")
