import { useEffect, useReducer, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Order } from '../../../types/order'
import Select from '../common/forms/Select'
import MultiSelect from '../common/forms/MultiSelect'
import OrderItems from './OrderItems'
import moment from 'moment'
import PriceInput from '../common/forms/PriceInput'
import { OrderItem } from '../../../types/item'
import toast from 'react-hot-toast'

const newOrder: Order = {
  name: '',
  checkInDate: new Date(),
  dueDate: new Date(),
  portal: '',
  trade: '',
  uf: '',
  price: 0,
  status: 'AGUARDANDO ENVIO',
  shippingFee: 0,
  postalCode: '',
  institution: '',
  categories: [],
  items: [],
}

function reducer(state: Order, action: any): Order {
  switch (action.type) {
    case 'set':
      return { ...action.payload }
    case 'name':
      return { ...state, name: action.payload }
    case 'checkInDate':
      return { ...state, checkInDate: action.payload }
    case 'portal':
      return { ...state, portal: action.payload }
    case 'trade':
      return { ...state, trade: action.payload }
    case 'receipt':
      return { ...state, receipt: action.payload }
    case 'uf':
      return { ...state, uf: action.payload }
    case 'dispatchDate':
      return { ...state, dispatchDate: action.payload }
    case 'deliveryDate':
      return { ...state, deliveryDate: action.payload }
    case 'shipping':
      return { ...state, shipping: action.payload }
    case 'shippingFee':
      return { ...state, shippingFee: action.payload }
    case 'postalCode':
      return { ...state, postalCode: action.payload }
    case 'status':
      return { ...state, status: action.payload }
    case 'institution':
      return { ...state, institution: action.payload }
    case 'contractName':
      return { ...state, contractName: action.payload }
    case 'categories':
      return {
        ...state,
        categories: [...action.payload],
      }
    case 'addItem': {
      const newItem: OrderItem = {
        code: '',
        signedPricePerBatch: 0,
        requestedBatchQuantity: 0,
        amountPerBatch: 0,
        description: action.payload,
      }
      return { ...state, items: state.items?.length > 0 ? [...state.items, newItem] : [newItem] }
    }
    case 'removeItem':
      return { ...state, items: state.items.filter((_, i) => i !== action.payload) }
    case 'itemDescription': {
      const { index, description } = action.payload
      state.items[index].description = description
      return { ...state }
    }
    case 'itemSignedPricePerBatch': {
      const { index, signedPricePerBatch } = action.payload
      state.items[index].signedPricePerBatch = signedPricePerBatch
      return { ...state }
    }
    case 'itemRequestedBatchQuantity': {
      const { index, requestedBatchQuantity } = action.payload
      state.items[index].requestedBatchQuantity = requestedBatchQuantity
      return { ...state }
    }
    case 'itemCode': {
      const { index, code } = action.payload
      state.items[index].code = code
      return { ...state }
    }
    case 'itemAmountPerBatch': {
      const { index, amountPerBatch } = action.payload
      state.items[index].amountPerBatch = amountPerBatch
      return { ...state }
    }
  }
  return { ...state }
}

export default function OrderEditPage() {
  const { id } = useParams()
  const [order, dispatch] = useReducer(reducer, newOrder)

  const itemDescriptionRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id === 'new') return
    fetch(`http://localhost:3000/api/orders/${id}`)
      .then((res) => res.json())
      .then(({ order }) => dispatch({ type: 'set', payload: order }))
  }, [])

  const addItem = (description: string | undefined) => {
    if (description === undefined || description === '' || description === null) return
    dispatch({
      type: 'addItem',
      payload: description,
    })
    itemDescriptionRef.current?.focus()
    itemDescriptionRef.current!.value = ''
  }

  order.dueDate = moment(order.checkInDate).add(30, 'days').toDate()
  order.price = order.items?.reduce((acc, item) => acc + item.signedPricePerBatch * item.requestedBatchQuantity, 0) ?? 0

  return (
    <div className="relative grid place-items-center">
      <div className="absolute top-5 flex  min-h-[90%] min-w-[25%] flex-col gap-y-4 rounded-lg bg-base-200 p-6 shadow-2xl">
        <div>
          <label htmlFor="">Nome</label>
          <input
            type="text"
            className="input input-sm block w-full"
            value={order.name}
            onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
          />
        </div>
        <div className="flex justify-between gap-x-6">
          <div className="flex w-full flex-col">
            <label htmlFor="">Portal</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.portal}
              onChange={(e) => dispatch({ type: 'portal', payload: e.target.value })}
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Pregão</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.trade}
              onChange={(e) => dispatch({ type: 'trade', payload: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label>Categorias</label>
          <MultiSelect
            values={order.categories}
            optionType="categories"
            className="input input-sm block w-full"
            onSelect={(val) => dispatch({ type: 'categories', payload: val })}
          />
        </div>
        <div className="flex gap-x-6">
          <div className="flex-[4]">
            <label>Instituição</label>
            <Select
              optionType="institutions"
              className="input input-sm block w-full"
              initialValue={order.institution}
              onSelect={(val) => dispatch({ type: 'institution', payload: val })}
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex flex-[3] flex-col">
            <label>Codigo da nota fiscal</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.receipt}
              onChange={(e) => dispatch({ type: 'receipt', payload: e.target.value })}
            />
          </div>
          <div className="flex flex-[3] flex-col">
            <label>Codigo postal</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.postalCode}
              onChange={(e) => dispatch({ type: 'postalCode', payload: e.target.value })}
            />
          </div>
          <div className="flex flex-[2] flex-col">
            <label>UF</label>
            <Select
              className="input input-sm block w-full"
              initialValue={order.uf}
              onSelect={(val) => dispatch({ type: 'uf', payload: val })}
              optionType="uf"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex flex-1 flex-col">
            <label className="text-sm">Data de emissão do empenho</label>
            <input
              type="date"
              className="input input-sm block w-full"
              value={moment(order.checkInDate).format('yyyy-MM-DD')}
              onChange={(e) => dispatch({ type: 'checkInDate', payload: e.target.value })}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label className="text-sm">Data limite de entrega (30 dias)</label>
            <input
              type="date"
              className="input input-sm block w-full"
              defaultValue={moment(order.dueDate).format('yyyy-MM-DD')}
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-1">
            <label>Data de envio dos materiais</label>
            <input
              type="date"
              className="input input-sm block w-full"
              value={order.dispatchDate ? moment(order.dispatchDate).format('yyyy-MM-DD') : ''}
              onChange={(e) => dispatch({ type: 'dispatchDate', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Data de chegada</label>
            <input
              type="date"
              className="input input-sm block w-full"
              value={order.deliveryDate ? moment(order.deliveryDate).format('yyyy-MM-DD') : ''}
              onChange={(e) => dispatch({ type: 'deliveryDate', payload: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label>Contrato (se houver)</label>
          <Select
            initialValue={order.contractName}
            onSelect={(val) => dispatch({ type: 'contractName', payload: val })}
            optionType="contracts"
            className="input-sm"
          />
        </div>
        <div className="flex justify-between gap-x-6">
          <div className="flex flex-1 flex-col">
            <label>Método de entrega</label>
            <Select
              initialValue={order.shipping}
              onSelect={(val) => dispatch({ type: 'shipping', payload: val })}
              optionType="shipping"
              className="input-sm"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label>Taxa de entrega</label>
            <PriceInput
              value={order.shippingFee}
              onChange={(val) => dispatch({ type: 'shippingFee', payload: val })}
              className="input-sm"
            />
          </div>
        </div>
        <label htmlFor="">Adicionar itens</label>
        <div className="join">
          <input
            type="text"
            className="input join-item w-full"
            ref={itemDescriptionRef}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                addItem(itemDescriptionRef.current?.value)
              }
            }}
          />
          <button
            onClick={() => addItem(itemDescriptionRef.current?.value)}
            className="join-item btn bg-accent">
            +
          </button>
        </div>
        <OrderItems
          items={order.items}
          dispatch={dispatch}
        />
        <div className="flex justify-center gap-x-2">
          <button
            className="btn-accent btn-sm btn"
            onClick={async () => {
              const result = await fetch('http://localhost:3000/api/orders/upsert', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
              }).then((res) => res.json())
              if (result.status !== 'success') {
                toast.error(<b>{result.message}</b>, { duration: 5000 })
                return
              } else {
                toast.success('Empenho salvo com sucesso')
                navigate('/orders')
              }
            }}>
            Salvar
          </button>
          <button className="btn-error btn-sm btn">Limpar</button>
        </div>
      </div>
    </div>
  )
}
