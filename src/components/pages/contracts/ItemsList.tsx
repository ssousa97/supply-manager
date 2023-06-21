import * as Dialog from '@radix-ui/react-dialog'
import { CellContext } from '@tanstack/react-table'
import { Contract, Item } from '../../../../@types'

export default function ItemsList({
  value,
}: {
  value: CellContext<Contract, Item[]>
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span className="overflow-clip hover:underline">
          {value
            .getValue()
            .map((item) => item.description)
            .join(', ')}
        </span>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-[rgb(0,0,0,0.5)]" />
      <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <ul>
          {value.getValue().map((item) => (
            <li key={item.id}>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </Dialog.Content>
    </Dialog.Root>
  )
}
