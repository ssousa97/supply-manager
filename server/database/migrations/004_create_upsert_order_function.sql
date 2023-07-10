create or replace function upsert_order(newOrder json) returns void as $$
  declare orderId integer;
  declare orderItem json;
  declare orderItemId integer;
  declare orderCategoryId integer;
  declare orderCategoryName varchar;
  declare orderInstitutionId integer;
  declare orderContractId integer;
begin

  select id into orderInstitutionId from institution where name = newOrder->>'institution';
  if orderInstitutionId is null then
    insert into institution(name) values(newOrder->>'institution') returning id into orderInstitutionId;
  else 
    update institution
    set 
      name = newOrder->>'institution'
    where 
      id = orderInstitutionId;
  end if; 

  select id into orderContractId from contract where name = newOrder->>'contractName';
  select id into orderId from "order" where name = newOrder->>'name' or id = cast(newOrder->>'id' as integer);
  if orderId is null then
    insert into "order"(name, check_in_date, portal, due_date, trade, receipt, uf, price, dispatch_date, delivery_date, 
                        shipping, shipping_fee, postal_code, status, institution_id, contract_id)
    values(
      newOrder->>'name',
      cast(newOrder->>'checkInDate' as date),
      newOrder->>'portal',
      cast(newOrder->>'dueDate' as date),
      newOrder->>'trade',
      newOrder->>'receipt',
      newOrder->>'uf',
      cast(newOrder->>'price' as numeric),
      cast(newOrder->>'dispatchDate' as date),
      cast(newOrder->>'deliveryDate' as date),
      newOrder->>'shipping',
      cast(newOrder->>'shippingFee' as numeric),
      newOrder->>'postalCode',
      newOrder->>'status',
      orderInstitutionId,
      orderContractId
    ) returning id into orderId;
  else 
    update "order"
    set 
      name = newOrder->>'name',
      check_in_date = cast(newOrder->>'checkInDate' as date),
      portal = newOrder->>'portal',
      due_date = cast(newOrder->>'dueDate' as date),
      trade = newOrder->>'trade',
      receipt = newOrder->>'receipt',
      uf = newOrder->>'uf',
      price = cast(newOrder->>'price' as numeric),
      dispatch_date = cast(newOrder->>'dispatchDate' as date),
      delivery_date = cast(newOrder->>'deliveryDate' as date),
      shipping = newOrder->>'shipping',
      shipping_fee = cast(newOrder->>'shippingFee' as numeric),
      postal_code = newOrder->>'postalCode',
      status = newOrder->>'status',
      institution_id = orderInstitutionId,
      contract_id = orderContractId
    where 
      orderId = cast(newOrder->>'id' as integer)
    returning id into orderId;
  end if;

  delete from order_category where order_id = orderId;
  for orderCategoryName in select * from json_array_elements_text(newOrder->'categories')
    loop
      select id into orderCategoryId from category where name = orderCategoryName;
      if orderCategoryId is null then
        insert into category(name) values (orderCategoryName) returning id into orderCategoryId;
      end if;
      insert into order_category(order_id, category_id) values(orderId, orderCategoryId);
    end loop;

  delete from order_item where order_id = orderId; 
  for orderItem in select * from json_array_elements(newOrder->'items')
    loop
      select id into orderItemId from item where code = orderItem->>'code';
      if orderItemId is null then
        insert into item(code) values (orderItem->>'code') returning id into orderItemId;
      end if;
      insert into order_item(signed_price_per_batch, amount_per_batch, requested_batch_quantity, description, item_id, order_id)
      values(
        cast(orderItem->>'signedPricePerBatch' as decimal), 
        cast(orderItem->>'amountPerBatch' as decimal), 
        cast(orderItem->>'requestedBatchQuantity' as int), 
        orderItem->>'description', 
        orderItemId, 
        orderId);
    end loop;

end $$ language plpgsql;