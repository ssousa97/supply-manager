import { CellContext } from '@tanstack/react-table'
import * as Dialog from '@radix-ui/react-dialog'

export default function TableInfoDialog<T>({ item }: { item: CellContext<T, any> }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span className="hover:underline">{item.getValue()}</span>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-[rgb(0,0,0,0.5)]" />
      <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        TODO
      </Dialog.Content>
    </Dialog.Root>
  )
}
