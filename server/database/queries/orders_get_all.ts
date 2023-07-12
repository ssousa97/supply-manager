export const orders_get_all = `
  select 
    o.id,
    o.name,
    o.check_in_date as "checkInDate",
    o.portal,
    o.due_date as "dueDate",
    o.trade,
    o.receipt,
    o.uf,
    o.price,
    o.dispatch_date as "dispatchDate",
    o.delivery_date as "deliveryDate",
    o.shipping,
    o.postal_code as "postalCode",
    o.status,
    i.name as "institution",
    c.name as "contractName",
    array_agg(cat.name) as "categories",
    (select 
      json_agg(
        json_build_object(
          'id', oi.id, 
          'signedPricePerBatch', oi.signed_price_per_batch, 
          'requestedBatchQuantity', oi.requested_batch_quantity, 
          'amountPerBatch', oi.amount_per_batch,
          'description', oi.description,
          'code', i.code 
        )
      ) from order_item oi inner join item i
        on oi.item_id = i.id
        where o.id = oi.order_id 
    ) as "items"
  from "order" o
  inner join institution i on i.id = o.institution_id
  left join contract c on c.id = o.contract_id
  inner join order_category oc on oc.order_id = o.id
  inner join category cat on cat.id = oc.category_id
  group by(
    o.id, o.name, o.check_in_date, o.portal, o.due_date, o.trade, o.receipt, o.uf,
    o.price, o.dispatch_date, o.delivery_date, o.shipping, o.shipping_fee, o.postal_code,
    o.status, i.name, c.name
  );

`
