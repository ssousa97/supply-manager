export const contracts_get = `
SELECT 
	c."id",
	c."name",
	c."signedDate",
	c."dueDate", 
	c."uf",
	CAST(c."totalPrice" as numeric),
	i."name",
	array_agg(ca."name") AS "categories",
	(SELECT json_agg(
		json_build_object(
			'id', ci.id,
			'signedPricePerBatch', CAST(ci."signedPricePerBatch" as numeric),
			'totalRequestedBatchQuantity', ci."totalRequestedBatchQuantity",
			'amountPerBatch', ci."amountPerBatch",
			'code', im.code
		) 
	) FROM "ContractItem" ci INNER JOIN "Item" im ON ci."itemId" = im.id WHERE ci."contractId" = c.id 
	) AS "items"
FROM
	"Contract" c
INNER JOIN 
	"Institution" i ON i.id = c."institutionId" 
INNER JOIN 
	"ContractCategory" cc ON c.id = cc."contractId" 
INNER JOIN 
	"Category" ca ON ca.id = cc."categoryId" 
WHERE c."id" = $1  
GROUP BY
	c."id",
	c."name",
	c."signedDate",
	c."dueDate", 
	c."uf",	
	c."totalPrice",
	i."name"
`
