import CreatableSelect from 'react-select/creatable'
import { getOptions, makeOptions } from '../../services/getOptions'
import { useEffect, useState } from 'react'

type Option = {
  label: string
  value: string
}

type CreatableSelectProps = {
  values?: any[]
  onSelect: (value: any[]) => void
  optionType: string
  className?: string
}

export default function MultiSelect({ values, className, onSelect, optionType }: CreatableSelectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    setIsLoading(true)
    getOptions(optionType)
      .then((options) => setOptions(options))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <CreatableSelect
      isMulti
      unstyled
      isClearable
      isLoading={isLoading}
      options={options}
      value={makeOptions(values ?? [])}
      onChange={(newValue) => {
        onSelect(newValue.map((value) => value.value))
      }}
      classNames={{
        control: () => `input !min-h-[2rem] ${className ?? ''} `,
        menu: () => 'bg-neutral p-2',
        option: () => 'hover:bg-accent pl-2',
      }}
    />
  )
}
