export async function getOptions(optionType: string) {
  if (optionType === 'uf') {
    return [
      { label: 'AL', value: 'AL' },
      { label: 'AM', value: 'AM' },
      { label: 'BA', value: 'BA' },
      { label: 'CE', value: 'CE' },
      { label: 'DF', value: 'DF' },
      { label: 'ES', value: 'ES' },
      { label: 'GO', value: 'GO' },
      { label: 'MA', value: 'MA' },
      { label: 'MG', value: 'MG' },
      { label: 'MS', value: 'MS' },
      { label: 'MT', value: 'MT' },
      { label: 'PA', value: 'PA' },
      { label: 'PB', value: 'PB' },
      { label: 'PE', value: 'PE' },
      { label: 'PI', value: 'PI' },
      { label: 'PR', value: 'PR' },
      { label: 'RJ', value: 'RJ' },
      { label: 'RN', value: 'RN' },
      { label: 'RO', value: 'RO' },
      { label: 'RR', value: 'RR' },
      { label: 'RS', value: 'RS' },
      { label: 'SC', value: 'SC' },
      { label: 'SE', value: 'SE' },
      { label: 'SP', value: 'SP' },
      { label: 'TO', value: 'TO' },
    ]
  }
  return []
}
