import { OrderItemSchema } from './item'
import { z } from 'zod'

export const OrderSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: 'Você deve incluir o nome do empenho.' }),
  checkInDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  portal: z.string().min(1, { message: 'Você deve incluir o portal de compras.' }),
  trade: z.string().min(1, { message: 'Você deve incluir o numero do pregão.' }),
  receipt: z.string().optional(),
  uf: z.string().min(2, { message: 'Selecione a UF.' }).max(2, { message: 'Selecione a UF.' }),
  price: z.coerce.number().min(0),
  dispatchDate: z.coerce.date().optional().nullable(),
  deliveryDate: z.coerce.date().optional().nullable(),
  shipping: z.coerce.string().optional().nullable(),
  shippingFee: z.coerce.number().min(0).optional().nullable(),
  postalCode: z.string().min(1, { message: 'Você deve incluir o codigo postal.' }),
  status: z.enum(['ENVIADO', 'ENTREGUE', 'AGUARDANDO ENVIO']),
  institution: z.string().min(1, { message: 'Você deve incluir a instituição.' }),
  contractName: z.coerce.string().optional(),
  categories: z.array(z.string()).min(1, { message: 'Você deve incluir ao menos uma categoria' }),
  items: z.array(OrderItemSchema).min(1, { message: 'Você deve incluir ao menos um item.' }),
})

export type IOrder = z.infer<typeof OrderSchema>
