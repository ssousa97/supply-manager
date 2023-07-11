import { ReactNode } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'

type DialogProps = {
  trigger: ReactNode
  content: ReactNode
}
export default function Dialog({ trigger, content }: DialogProps) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black opacity-[35%]" />
        <RadixDialog.Content className=" fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          {content}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
