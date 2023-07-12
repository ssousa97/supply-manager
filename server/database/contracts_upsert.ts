export const contracts_upsert = `
DO $$
	DECLARE contract json;
	DECLARE item json;
	DECLARE	category TEXT;
	DECLARE institutionId integer;
	DECLARE contractId integer;
	DECLARE itemId integer;
	DECLARE categoryId integer;

BEGIN
	contract := $1::json;
	
	SELECT "id" INTO institutionId FROM "Institution" WHERE "name" = contract->>'institution';
	IF institutionId IS NULL THEN
		INSERT INTO "Institution"("name") VALUES(contract->>'institution') RETURNING "id" INTO institutionId;
	END IF;

	SELECT id INTO contractId FROM "Contract" WHERE "id" = CAST(contract->>'id' AS integer) OR "name" = contract->>'name';
	IF contractId IS NULL THEN	
		INSERT INTO "Contract"("name", "signedDate", "dueDate", "uf", "totalPrice", "institutionId")
		VALUES (
			contract->>'name', 
			CAST(contract->>'signedDate' AS timestamp(3)), 
			CAST(contract->>'dueDate' AS timestamp(3)), 
			contract->>'uf', 
			CAST(contract->>'totalPrice' AS money), 
			institutionId
		) RETURNING id INTO contractId;
	ELSE 
		UPDATE "Contract"
		SET 
			"name" = contract->>'name',
			"signedDate" = CAST(contract->>'signedDate' AS timestamp(3)),
			"dueDate" = CAST(contract->>'dueDate' AS timestamp(3)),
			"uf" =  contract->>'uf',
			"totalPrice" = CAST(contract->>'totalPrice' AS money),
			"institutionId" = institutionId
		WHERE 
			"id" = contractId;
	END IF;

	DELETE FROM "ContractCategory" WHERE "contractId" = contractId;
	FOR category IN SELECT * FROM json_array_elements_text(contract->'categories') LOOP
		SELECT id INTO categoryId FROM "Category" WHERE "name" = category;
		IF categoryId IS NULL THEN
			INSERT INTO "Category"("name") VALUES (category) RETURNING id INTO categoryId;
		END IF;
		INSERT INTO "ContractCategory"("categoryId", "contractId") VALUES (categoryId, contractId);
	END LOOP;

	DELETE FROM "ContractItem" WHERE "contractId" = contractId;
	FOR item IN SELECT * FROM json_array_elements(contract->'items') LOOP
		SELECT id INTO itemId FROM "Item" WHERE "code" = item->>'code';
		IF itemId IS NULL THEN
			INSERT INTO "Item"("code") VALUES(item->>'code') RETURNING id INTO itemId;
		END IF;
		INSERT INTO "ContractItem"("signedPricePerBatch", "amountPerBatch", "totalRequestedBatchQuantity", "description", "itemId", "contractId")
		VALUES (
			CAST(item->>'signedPricePerBatch' AS money),
			CAST(item->>'amountPerBatch' AS integer),
			CAST(item->>'totalRequestedBatchQuantity' AS integer),
			item->>'description',
			itemId,
			contractId
		);
	END LOOP;
END $$;
`
