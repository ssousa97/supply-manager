select 
	c.name as "name", 
	c.signed_date as "signedDate", 
	c.due_date as "dueDate", 
	c.total_price as "totalPrice", 
    (select array_agg(cat.name) 
    from category cat 
    inner join contract_category c_cat 
    on cat.id = c_cat.category_id 
    where c_cat.contract_id = c.id
	) as "categories", 
    (select array_agg(inst.name) 
    from institution inst 
    where inst.id = c.institution_id
	) as "institutions",
	(select 
		array_agg(
			json_build_object(
				'id', ci.id, 
				'signedPricePerBatch', ci.signed_price_per_batch, 
				'totalRequestedBatchQuantity', ci.total_requested_batch_quantity, 
				'amountPerBatch', ci.amount_per_batch,
				'description', ci.description,
				'code', (select code from item i where i.id = ci.item_id)
			)
		) from contract_item ci where c.id = ci.contract_id 
	) as "categories"
from contract c