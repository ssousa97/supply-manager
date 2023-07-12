import { z } from 'zod'

export const ContractItemSchema = z.object({
  id: z.coerce.number().optional(),
  code: z.string().min(1, { message: 'Inclua ou selecione o código do Item.' }),
  signedPricePerBatch: z.coerce.number().min(0),
  totalRequestedBatchQuantity: z.coerce.number().min(0),
  amountPerBatch: z.coerce.number().min(0),
  description: z.string(),
})

export const OrderItemSchema = z.object({
  id: z.coerce.number().optional(),
  code: z.string().min(1, { message: 'Inclua ou selecione o código do Item.' }),
  signedPricePerBatch: z.coerce.number().min(0),
  requestedBatchQuantity: z.coerce.number().min(0),
  amountPerBatch: z.coerce.number().min(0),
  description: z.string(),
})

export const ItemSchema = z.object({
  id: z.coerce.number().optional(),
  code: z.string().min(1, { message: 'Inclua ou selecione o código do Item.' }),
  quantityOnStock: z.coerce.number().min(0),
})

export const InflowSchema = z.object({
  id: z.coerce.number(),
  inflowQuantity: z.coerce.number(),
})

export const OutflowSchema = z.object({
  itemId: z.coerce.number(),
  outflowQuantity: z.coerce.number(),
  currentQuantity: z.coerce.number(),
})

export type IContractItem = z.infer<typeof ContractItemSchema>
export type IOrderItem = z.infer<typeof OrderItemSchema>
export type IItem = z.infer<typeof ItemSchema>
export type IInflow = z.infer<typeof InflowSchema>
export type IOutflow = z.infer<typeof OutflowSchema>
