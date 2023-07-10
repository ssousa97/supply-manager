create or replace function upsert_item(newItem json) returns void as $$
declare itemId integer;
begin
  select id into itemId from item where code = newItem->>'code' or id = cast(newItem->>'id' as integer);
  if itemId is null then
    insert into item(code, quantity_on_stock) values(newItem->>'code', cast(newItem->>'quantityOnStock' as int));
  else
    update item 
    set 
      code = newItem->>'code', 
      quantity_on_stock = cast(newItem->>'quantityOnStock' as int)
    where 
      id = cast(newItem->>'id' as integer);
  end if;
end $$ language plpgsql;