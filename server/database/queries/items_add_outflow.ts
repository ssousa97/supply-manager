export const items_add_outflow = `
do $$
begin
  update item 
  set 
    quantity_on_stock = quantity_on_stock - $<outflowQuantity>
  where
    id = $<itemId>;

  insert into outflows(item_id, order_id, outflow_date, quantity)
  values (
    $<itemId>,
    $<orderId>,
    cast(now() as date),
    $<outflowQuantity>
  );

end $$;
`
