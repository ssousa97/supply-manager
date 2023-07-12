export const orders_dispatch_order = `
  update "order" 
  set 
    status = 'ENVIADO',
    shipping = $<shipping>,
    dispatch_date = cast(now() as date)
  where
    id = $<id>;
`
