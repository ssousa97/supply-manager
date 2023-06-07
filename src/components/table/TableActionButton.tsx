import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'

const possibleActions = {
  add: {
    element: <AiOutlinePlus className="text-4xl focus:outline-none" />,
    tooltip: 'Adicionar',
    action: () => {},
  },
  remove: {
    element: <AiOutlineMinus className="text-4xl focus:outline-none" />,
    tooltip: 'Remover',
    action: () => {},
  },
  edit: {
    element: <AiOutlineEdit className="text-4xl focus:outline-none" />,
    tooltip: 'Editar',
    action: () => {},
  },
}

export default function TableActionButton({ action }: { action: keyof typeof possibleActions }) {
  return (
    <>
      <div
        className="select-none rounded-xl bg-primary p-1 text-center text-4xl text-white 
                   hover:cursor-pointer hover:bg-green-500 hover:underline focus:outline-none"
        data-tooltip-id={action}
        data-tooltip-content={possibleActions[action].tooltip}
        onClick={possibleActions[action].action}>
        {possibleActions[action].element}
      </div>
      <Tooltip
        id={action}
        className="z-10"
        delayHide={150}
        delayShow={150}
      />
    </>
  )
}
