export const orders_get = `
SELECT
	o.id,
	o.name,
	o."checkInDate",
	o.portal,
	o."dueDate",
	o.trade,
	o.receipt,
	o.uf,
	CAST(o.price AS numeric),
	o."dispatchDate",
	o."deliveryDate",
	o.shipping,
	o."postalCode",
	o.status,
	i.name AS "institution",
	c.name AS "contractName",
	array_agg(cat.name) AS "categories",
	(
	SELECT
		json_agg(
        json_build_object(
          'id',
		oi.id,
		'signedPricePerBatch',
		CAST(oi."signedPricePerBatch" AS numeric),
		'requestedBatchQuantity',
		oi."requestedBatchQuantity" ,
		'amountPerBatch',
		oi."amountPerBatch" ,
		'description',
		oi.description,
		'code',
		i.code 
        )
      )
	FROM
		"OrderItem" oi
	INNER JOIN "Item" i
        ON
		oi."itemId"  = i.id
	WHERE
		o.id = oi."orderId" 
    ) AS "items"
FROM
	"Order" o
INNER JOIN "Institution" i ON
	i.id = o."institutionId" 
LEFT JOIN "Contract" c ON
	c.id = o."contractId" 
INNER JOIN "OrderCategory" oc ON
	oc."orderId" = o.id
INNER JOIN "Category" cat ON
	cat.id = oc."categoryId" 
WHERE 
  o.id = $1
GROUP BY
	(
    o.id,
	o.name,
	o."checkInDate",
	o.portal,
	o."dueDate",
	o.trade,
	o.receipt,
	o.uf,
	o.price,
	o."dispatchDate",
	o."deliveryDate",
	o.shipping,
	o."postalCode",
	o.status,
	i.name,
	c.name
  );
`
