export const items_get_all = `

  select
    i.id,
    i.code,
    i.quantity_on_stock as "quantityOnStock",
    (
      select 
        sum(oi.requested_batch_quantity * oi.amount_per_batch) 
      from 
        order_item oi 
      where 
        oi.item_id = i.id and
        o.checkInDate between $1 and $2
      inner join "order" o on oi.order_id = o.id
    ) as "totalRequestedQuantityOnCurrentMonth"
    from item i
    

`
