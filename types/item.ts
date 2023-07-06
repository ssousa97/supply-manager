import { z } from 'zod'

export const ContractItemSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, { message: 'Inclua ou selecione o código do Item.' }),
  signedPricePerBatch: z.coerce.number().min(0),
  totalRequestedBatchQuantity: z.coerce.number().min(0),
  amountPerBatch: z.coerce.number().min(0),
  description: z.string(),
})

export const OrderItemSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, { message: 'Inclua ou selecione o código do Item.' }),
  signedPricePerBatch: z.coerce.number().min(0),
  requestedBatchQuantity: z.coerce.number().min(0),
  amountPerBatch: z.coerce.number().min(0),
  description: z.string(),
})

export const ItemSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, { message: 'Inclua ou selecione o código do Item.' }),
  quantityOnStock: z.coerce.number().min(0),
})

export type IContractItem = z.infer<typeof ContractItemSchema>
export type IOrderItem = z.infer<typeof OrderItemSchema>
export type IItem = z.infer<typeof ItemSchema>
