export const orders_upsert = `
DO $$
	DECLARE "order" json;
	DECLARE orderId integer;
	DECLARE orderItem json;
	DECLARE orderCategoryId integer;
	DECLARE orderInstitutionId integer;
	DECLARE orderItemId integer;
	DECLARE orderCategoryName varchar;
	DECLARE orderContractId integer;

BEGIN
  "order" := $1::json;

	SELECT id INTO orderInstitutionId FROM "Institution" WHERE name = "order"->>'institution';
	
	IF orderInstitutionId IS NULL THEN
	    INSERT INTO "Institution"(name) VALUES("order"->>'institution') RETURNING id INTO orderInstitutionId;
	ELSE 
	    UPDATE "Institution"
	  SET
		  name = "order"->>'institution'
    WHERE 
      id = orderInstitutionId;
	END IF;
	
	SELECT id INTO orderContractId FROM "Contract" WHERE name = "order"->>'contractName';
	SELECT id INTO orderId FROM "Order" WHERE name = "order"->>'name' OR id = CAST("order"->>'id' AS integer);
	IF orderId IS NULL THEN
    INSERT INTO "Order"(name, "checkInDate" , portal, "dueDate" , trade, receipt, uf, price, "dispatchDate" , "deliveryDate" , shipping, "postalCode" , status, "institutionId" , "contractId")
	VALUES(
    "order"->>'name', 
    CAST("order"->>'checkInDate' AS date), 
    "order"->>'portal', 
    CAST("order"->>'dueDate' AS date), 
    "order"->>'trade', 
    "order"->>'receipt', 
    "order"->>'uf', 
    CAST("order"->>'price' AS NUMERIC),
    CAST("order"->>'dispatchDate' AS date), 
    CAST("order"->>'deliveryDate' AS date), 
    "order"->>'shipping', 
    "order"->>'postalCode', 
    "order"->>'status', 
    orderInstitutionId, 
    orderContractId
  ) RETURNING id INTO orderId;
	ELSE 
    UPDATE 
      "Order"
	  SET
		  name = "order"->>'name', 
      "checkInDate" = CAST("order"->>'checkInDate' AS date), 
      portal = "order"->>'portal', 
      "dispatchDate" = CAST("order"->>'dueDate' AS date), 
      trade = "order"->>'trade', 
      receipt = "order"->>'receipt', 
      uf = "order"->>'uf', 
      price = CAST("order"->>'price' AS money), 
      "dispatchDate" = CAST(newOrder->>'dispatchDate' AS date), 
      "deliveryDate" = CAST(newOrder->>'deliveryDate' AS date), 
      shipping = newOrder->>'shipping', 
      "postalCode" = newOrder->>'postalCode', 
      status = newOrder->>'status', 
      "institutionId" = orderInstitutionId, 
      "contractId" = orderContractId
	  WHERE orderId = CAST("order"->>'id' AS integer) RETURNING id INTO orderId;
	END IF;
	
	DELETE FROM "OrderCategory"  WHERE "orderId"= orderId;
	FOR orderCategoryName IN SELECT * FROM json_array_elements_text("order"->'categories') LOOP
    SELECT id INTO orderCategoryId FROM "Category" WHERE name = orderCategoryName;
    IF orderCategoryId IS NULL THEN 
      INSERT INTO "Category"(name) VALUES (orderCategoryName) RETURNING id INTO orderCategoryId;
    END IF;
    INSERT INTO "OrderCategory"("orderId", "categoryId") VALUES(orderId, orderCategoryId);
	END LOOP;
	
	DELETE FROM "OrderItem" WHERE "orderId" = orderId;
	FOR orderItem IN SELECT * FROM json_array_elements("order"->'items') LOOP
    SELECT id INTO orderItemId FROM "Item" WHERE code = orderItem->>'code';
	
    IF orderItemId IS NULL THEN
      INSERT INTO "Item"(code) VALUES (orderItem->>'code') RETURNING id INTO orderItemId;
    END IF;
	
	INSERT INTO "OrderItem"("signedPricePerBatch" ,"amountPerBatch" , "requestedBatchQuantity" , description, "itemId" , "orderId")
	VALUES(
	  CAST(orderItem->>'signedPricePerBatch' AS decimal), CAST(orderItem->>'amountPerBatch' AS integer), CAST(orderItem->>'requestedBatchQuantity' AS int), orderItem->>'description', orderItemId, orderId
  );
	END LOOP;
END$$;
`
