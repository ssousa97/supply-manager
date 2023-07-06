import { z } from 'zod'
import { ContractItemSchema } from './item'

export const ContractSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'Você deve incluir o nome do contrato.' }),
  uf: z.string().min(2, { message: 'Selecione a UF.' }).max(2, { message: 'Selecione a UF.' }),
  signedDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  totalPrice: z.coerce.number().min(0),
  categories: z.array(z.string()).min(1, { message: 'O contrato precisa ter ao menos 1 categoria.' }),
  institution: z.string(),
  items: z.array(ContractItemSchema).min(1, { message: 'Você deve incluir ao menos 1 item.' }),
})

export type IContract = z.infer<typeof ContractSchema>
