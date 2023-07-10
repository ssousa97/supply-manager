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
  if (optionType === 'institutions') {
    const { institutions } = await fetch('http://localhost:3000/api/institutions').then((res) => res.json())

    return institutions.map((institution: any) => {
      return { label: institution.name, value: institution.name }
    })
  }

  if (optionType === 'categories') {
    const { categories } = await fetch('http://localhost:3000/api/categories').then((res) => res.json())

    return categories.map((category: any) => {
      return { label: category.name, value: category.name }
    })
  }

  if (optionType === 'itemsCodes') {
    const { codes } = await fetch('http://localhost:3000/api/items/codes').then((res) => res.json())
    return codes.map((code: any) => {
      return { label: code.code, value: code.code }
    })
  }

  if (optionType === 'contracts') {
    const { contractNames } = await fetch('http://localhost:3000/api/contracts/names').then((res) => res.json())
    return contractNames.map((contract: any) => {
      return { label: contract.name, value: contract.name }
    })
  }

  if (optionType === 'shipping') {
    return [
      { label: 'PAC', value: 'PAC' },
      { label: 'CARRO', value: 'CARRO' },
      { label: 'SEDEX', value: 'SEDEX' },
    ]
  }
  return []
}

export const makeOptions = (values: string[]) => values.map((value) => ({ value, label: value }))
export const makeOption = (value: string) => ({ label: value, value })
