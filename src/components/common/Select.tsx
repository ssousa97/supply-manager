import CreatableSelect from 'react-select/creatable'
import { getOptions } from '../../services/getOptions'
import { useState, useEffect } from 'react'

type CreatableSelectProps = {
  value: any
  className?: string
  onChange: (value: any) => void
  optionType: string
}
export default function Select({
  value,
  className,
  onChange,
  optionType,
}: CreatableSelectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<any>([])

  useEffect(() => {
    setIsLoading(true)
    getOptions(optionType)
      .then((options) => setOptions(options))
      .finally(() => setIsLoading(false))
  }, [])

  const addOption = async (value: string) =>
    setOptions([...options, { value, label: value }])

  return (
    <CreatableSelect
      unstyled
      isLoading={isLoading}
      onCreateOption={addOption}
      classNames={{
        control: () => `input !min-h-[2rem] ${className ?? ''} `,
        menu: () => 'bg-neutral p-2',
        option: () => 'hover:bg-accent pl-2',
      }}
      defaultValue={value}
      onChange={(value) => onChange(value.value)}
      options={options}
    />
  )
}
