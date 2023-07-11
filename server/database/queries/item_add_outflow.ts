export const item_add_outflow = `
  update item 
  set 
    quantity_on_stock = quantity_on_stock - cast($1 as integer)
  where
    code = $2
`
