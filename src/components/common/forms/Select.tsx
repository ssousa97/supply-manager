import CreatableSelect from 'react-select/creatable'
import { getOptions, makeOption } from '../../../services/getOptions'
import { useState, useEffect } from 'react'

type Option = {
  label: string
  value: string
}

type CreatableSelectProps = {
  initialValue: any
  className?: string
  onSelect: (value: string) => void
  optionType: string
}

export default function Select({ initialValue, className, onSelect, optionType }: CreatableSelectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<any>([])
  const [selectedOption, setSelectedOption] = useState<any>(makeOption(initialValue))

  useEffect(() => {
    setIsLoading(true)
    getOptions(optionType)
      .then((options) => setOptions(options))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setSelectedOption(makeOption(initialValue))
  }, [initialValue])

  const addOption = async (newValue: string) => {
    const newOption = makeOption(newValue)
    setOptions([...options, newOption])
    setSelectedOption(newOption)
    onSelect(newValue)
  }

  return (
    <CreatableSelect
      unstyled
      isLoading={isLoading}
      onCreateOption={addOption}
      value={selectedOption}
      options={options}
      onChange={(option: Option) => {
        onSelect(option.value)
        setSelectedOption(option)
      }}
      classNames={{
        control: () => `input !min-h-[2rem] ${className ?? ''} `,
        menu: () => 'bg-neutral p-2',
        option: () => 'hover:bg-accent pl-2',
      }}
    />
  )
}
