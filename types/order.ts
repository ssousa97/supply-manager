import { OrderItemSchema } from './item'
import { z } from 'zod'

export const OrderSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  checkInDate: z.date(),
  dueDate: z.date(),
  portal: z.string(),
  trade: z.string(),
  receipt: z.string().optional(),
  uf: z.string().min(2).max(2),
  price: z.number().min(0),
  dispatchDate: z.date().optional(),
  deliveryDate: z.date().optional(),
  shipping: z.enum(['PAC', 'CARRO', 'SEDEX']).optional(),
  shippingFee: z.number().min(0).optional(),
  postalCode: z.string(),
  status: z.enum(['ENVIADO', 'ENTREGUE', 'AGUARDANDO ENVIO']),
  institution: z.string(),
  contractName: z.string().optional(),
  categories: z.array(z.string()),
  items: z.array(OrderItemSchema),
})

export type IOrder = z.infer<typeof OrderSchema>
