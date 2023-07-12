// todo: use name paremeters
export const items_add_inflow = `
do $$
begin
  update item 
  set 
    quantity_on_stock = quantity_on_stock + $<inflowQuantity>
  where
    id = $<id>

  insert into inflows(item_id, inflow_date, quantity)
  values (
    $<id>,
    cast(now() as date),
    $<inflowQuantity>
  );

end $$;
`
