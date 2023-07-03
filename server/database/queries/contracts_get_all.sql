select 
  c.id as "id",
  c.name as "name", 
  c.signed_date as "signedDate", 
  c.due_date as "dueDate", 
  c.total_price as "totalPrice", 
  array_agg(cat.name) as "categories",
  inst.name as "institution",
  (select 
    json_agg(
      json_build_object(
        'id', ci.id, 
        'signedPricePerBatch', ci.signed_price_per_batch, 
        'totalRequestedBatchQuantity', ci.total_requested_batch_quantity, 
        'amountPerBatch', ci.amount_per_batch,
        'description', ci.description,
        'code', i.code
      )
    ) from contract_item ci inner join item i
      on ci.item_id = i.id
      where c.id = ci.contract_id 
  ) as "items"
from contract c 
inner join institution inst on c.institution_id = inst.id
inner join contract_category cc on c.id = cc.contract_id
inner join category cat on cat.id = cc.category_id
group by c.id, c.name, c.signed_date, c.due_date, c.total_price, inst.name;