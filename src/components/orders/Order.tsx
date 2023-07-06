import { useEffect, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { IOrder } from '../../../types/order'
import Select from '../common/Select'
import MultiSelect from '../common/MultiSelect'
import OrderItem from './OrderItem'

const newOrder: IOrder = {
  name: '',
  checkInDate: new Date(),
  dueDate: new Date(),
  portal: '',
  trade: '',
  uf: '',
  price: 0,
  shipping: 'PAC',
  status: 'ENVIADO',
  shippingFee: 0,
  postalCode: '',
  institution: '',
  categories: [],
  items: [],
}

function reducer(state: IOrder, action: any): IOrder {
  return { ...state }
}

export default function Order() {
  const { id } = useParams()
  const [order, dispatch] = useReducer(reducer, newOrder)

  const itemDescriptionRef = useRef<HTMLInputElement | null>(null)

  const addItem = (description: string | undefined) => {
    if (description === undefined || description === '' || description === null) return
    dispatch({
      type: 'addItem',
      payload: description,
    })
    itemDescriptionRef.current?.focus()
    itemDescriptionRef.current!.value = ''
  }

  useEffect(() => {
    if (id === 'new') return
    fetch(`http://localhost:3000/api/orders/${id}`)
      .then((res) => res.json())
      .then(({ contract }) => dispatch({ type: 'set', payload: contract }))
  }, [])

  return (
    <div className="grid place-items-center">
      <div className="flex max-h-[90%] min-h-[90%] flex-col gap-y-4 rounded-lg  bg-base-200 p-6 shadow-2xl">
        <div className="flex gap-x-6">
          <div className="flex-1">
            <label>Nome</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Portal</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'portal', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Pregão</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'trade', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>UF</label>
            <Select
              className="input input-sm block w-full"
              initialValue={order.uf}
              onSelect={(e) => dispatch({ type: 'uf', payload: e })}
              optionType="uf"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-1">
            <label>Valor da nota</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'price', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Codigo postal</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'postalCode', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Instituição</label>
            <Select
              optionType="institutions"
              className="input input-sm block w-full"
              initialValue={order.institution}
              onSelect={(e) => dispatch({ type: 'institution', payload: e })}
            />
          </div>
          <div className="flex-1">
            <label>Categorias</label>
            <MultiSelect
              optionType="categories"
              className="input input-sm block w-full"
              onSelect={(e) => dispatch({ type: 'categories', payload: e })}
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-1">
            <label>Codigo da nota fiscal</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'receipt', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Data de saída</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'dispatchDate', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Data de entrega</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Contrato (se houver)</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
            />
          </div>
        </div>
        <div className="flex w-[50%] gap-x-6">
          <div className="flex-1">
            <label>Método de entrega</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Taxa de entrega</label>
            <input
              type="text"
              className="input input-sm block w-full"
              value={order.name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
            />
          </div>
        </div>
        <label htmlFor="">Adicionar item</label>
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
        <OrderItem
          items={order.items}
          dispatch={dispatch}
        />
      </div>
    </div>
  )
}
