import { useParams } from 'react-router-dom'
import { Contract } from './Contracts'
import { useEffect, useReducer, useRef } from 'react'
import Items from './Items'
import moment from 'moment'
import Select from '../common/Select'

const newContract: Contract = {
  id: '0',
  name: '',
  uf: '',
  institution: '',
  category: '',
  due: '',
  items: [],
  price: 0,
  signedAt: '',
}

function reducer(state: Contract, action: any): Contract {
  switch (action.type) {
    case 'set':
      return { ...action.payload }
    case 'name':
      return { ...state, name: action.payload }
    case 'uf':
      return { ...state, uf: action.payload }
    case 'institution':
      return { ...state, institution: action.payload }
    case 'category':
      return { ...state, category: action.payload }
    case 'signedAt':
      return { ...state, signedAt: action.payload }
    case 'addItem': {
      const newItem = {
        description: action.payload,
        category: '',
        code: '',
        id: 0,
        requestedQuantity: 0,
        signedPrice: 0,
        unit: '',
      }
      return {
        ...state,
        items: state.items ? [...state.items, newItem] : [newItem],
      }
    }
    case 'removeItem':
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      }
    case 'itemDescription': {
      const { index, description } = action.payload
      state.items[index].description = description
      return { ...state }
    }
    case 'itemCode': {
      const { index, code } = action.payload
      state.items[index].code = code
      return { ...state }
    }
    case 'itemCategory': {
      const { index, category } = action.payload
      state.items[index].category = category
      return { ...state }
    }
    case 'itemSignedPrice': {
      const { index, price } = action.payload
      state.items[index].signedPrice = price
      return { ...state }
    }
    case 'itemRequestedQuantity': {
      const { index, quantity } = action.payload
      state.items[index].requestedQuantity = quantity
      return { ...state }
    }
    case 'itemUnit': {
      const { index, unit } = action.payload
      state.items[index].unit = unit
      return { ...state }
    }
    default:
      return state
  }
}

export default function Contract() {
  const { id } = useParams()
  const [contract, dispatch] = useReducer(reducer, newContract)
  const itemDescriptionRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (id === 'new') return
    fetch(`http://localhost:3000/api/contracts/${id}`)
      .then((res) => res.json())
      .then(({ contract }) => dispatch({ type: 'set', payload: contract }))
  }, [])

  contract.price =
    contract.items?.reduce(
      (acc, item) => acc + item.signedPrice * item.requestedQuantity,
      0
    ) ?? 0

  contract.due = moment(contract.signedAt).add(12, 'months').toString() ?? ''

  const addItem = (description: string | undefined) => {
    if (description === undefined || description === '' || description === null)
      return
    dispatch({
      type: 'addItem',
      payload: description,
    })
    itemDescriptionRef.current?.focus()
    itemDescriptionRef.current!.value = ''
  }

  return (
    <div className="flex h-[99%] min-h-[99%] w-[60rem] flex-col place-self-center rounded-xl bg-accent p-4 shadow-xl">
      <div className="flex w-[50%]">
        <div className="flex flex-1 flex-col">
          <label htmlFor="contractPrice">Valor total da Ata</label>
          <span className="text-2xl font-bold text-white">{`R$ ${
            isNaN(contract.price) ? 0 : contract.price
          }`}</span>
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="contractPrice">Vencimento</label>
          <span className="text-2xl font-bold text-white">
            {contract.due === 'Invalid date'
              ? ''
              : moment(contract.due).format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex gap-2">
        <div className="flex flex-[2] flex-col">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="input"
            value={contract.name}
            onChange={(e) =>
              dispatch({
                type: 'name',
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="name">UF</label>
          <Select
            optionType="uf"
            value={contract.uf}
            onChange={(value) => {
              dispatch({
                type: 'uf',
                payload: value,
              })
            }}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="name">Assinado em</label>
          <input
            type="date"
            className="input"
            value={contract.signedAt}
            onChange={(e) =>
              dispatch({
                type: 'signedAt',
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col">
          <label htmlFor="name">Instituição</label>
          <Select
            optionType="institution"
            value={contract.institution}
            onChange={(value) => {
              dispatch({
                type: 'institution',
                payload: value,
              })
            }}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="name">Categoria</label>
          <Select
            optionType="category"
            value={contract.category}
            onChange={(value) => {
              dispatch({
                type: 'category',
                payload: value,
              })
            }}
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col">
        <label htmlFor="name">Items</label>
        <div className="join w-full">
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
            className="btn-primary join-item btn"
            onClick={() => addItem(itemDescriptionRef.current?.value)}>
            +
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <Items
        items={contract.items}
        dispatch={dispatch}
      />
      <div className="divider"></div>
      <div className="flex justify-end gap-2">
        <button className="btn-error btn-sm btn">Limpar</button>
        <button
          className="btn-success btn-sm btn"
          onClick={() => {
            fetch('http://localhost:3000/api/contracts/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(contract),
            })
          }}>
          Salvar
        </button>
      </div>
    </div>
  )
}
