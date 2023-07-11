export const item_add_inflow = `
  update item 
  set 
    quantity_on_stock = quantity_on_stock + cast($1 as integer)
  where
    code = $2
`
