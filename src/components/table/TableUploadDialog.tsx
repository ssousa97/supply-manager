import { Dispatch, SetStateAction } from 'react'

export default function TableUploadDialog({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className="fixed left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-primary p-4">
      <span className="w-[25rem ] mb-4  block text-left text-white">
        Você pode subir arquivos excel (.xlsx) para vários itens, ou então arquivos pdf para
        adicionar somente um item. Se for um dos tipos suportados, o arquivo aparecerá na tabela.
      </span>
      <input
        type="file"
        className="rounded-xl p-2 text-white"
        placeholder="selecionar arquivo pdf..."
      />
      <div className="flex items-center justify-end text-xl text-white">
        <button
          onClick={() => {
            setDialogOpen(false)
          }}
          className="rounded-xl bg-secondary p-2 hover:bg-tertiary">
          Adicionar
        </button>
      </div>
    </div>
  )
}
