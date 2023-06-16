import { Dispatch, SetStateAction } from 'react'
import { FaPlus } from 'react-icons/fa'

export default function EditContracts({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const save = () => {
    setOpen(false)
  }
  return (
    <div className="fixed left-[50%] top-[50%] z-20 flex translate-x-[-50%] translate-y-[-50%] flex-col gap-y-4 rounded-xl bg-primary p-4">
      <h1 className="text-lg text-white">Editar Contratos</h1>
      {/* row */}
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-white">
            Nome
          </label>
          <input
            type="text"
            className="rounded-xl p-2"
            name="name"
            id="name"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="text-white">
            Preço
          </label>
          <input
            className="rounded-xl p-2"
            type="number"
            name="price"
            id="price"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="uf"
            className="text-white">
            UF
          </label>
          <select
            name="uf"
            className="rounded-xl p-2"
            id="uf">
            <option value="AC">AC</option>
            <option value="AL">AL</option>
          </select>
        </div>
      </div>
      {/* row */}
      <div className="flex flex-col">
        <label
          htmlFor="institution"
          className="text-white">
          Instituição
        </label>
        <select
          name="institution"
          className="rounded-xl p-2"
          id="institution">
          <option value="UFRJ">UFRJ</option>
          <option value="UFF">UFF</option>
        </select>
      </div>
      {/* row */}
      <div className="flex flex-col">
        <div className="relative flex flex-col">
          <label
            htmlFor="items"
            className="text-white">
            Itens
          </label>
          <input
            type="text"
            className="rounded-xl p-2"
            name="items"
            id="items"
          />
          <div className="absolute right-2 top-[45%] rounded-full bg-secondary p-1 hover:cursor-pointer hover:bg-tertiary">
            <FaPlus className="text-2xl text-white" />
          </div>
        </div>
        <ul className="ml-1 mt-2">
          <li className="text-white">Item 1</li>
          <li className="text-white">Item 2</li>
          <li className="text-white">Item 3</li>
          <li className="text-white">Item 4</li>
          <li className="text-white">Item 5</li>
        </ul>
      </div>
      {/* row */}
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="signed"
            className="text-white">
            Assinado em
          </label>
          <input
            type="date"
            className="rounded-xl p-2"
            name="signed"
            id="signed"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="signed"
            className="text-white">
            Vencimento em
          </label>
          <input
            type="date"
            className="rounded-xl p-2"
            name="due"
            id="due"
          />
        </div>
      </div>
      {/* row */}
      <div className="flex justify-end">
        <button
          onClick={save}
          className="rounded-xl bg-secondary p-2 text-lg text-white hover:bg-tertiary">
          Salvar
        </button>
      </div>
    </div>
  )
}
