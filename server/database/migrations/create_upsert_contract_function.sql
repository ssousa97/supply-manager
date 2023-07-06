create or replace function upsert_contract(newContract json) returns void as $$
  declare contractId uuid;
  declare contractItem json;
  declare contractItemId uuid;
  declare contractCategoryId uuid;
  declare contractCategoryName varchar;
  declare contractInstitutionId uuid;
begin

  select id into contractInstitutionId from institution where name = newContract->>'institution';
  if contractInstitutionId is null then
    insert into institution(name) values (newContract->>'institution') returning id into contractInstitutionId;
  else 
    update institution
    set 
      name = newContract->>'institution'
    where 
      id = contractInstitutionId;
  end if;

  if newContract->>'id' is null then
    insert into contract(name, uf, signed_date, due_date, total_price, institution_id)  
      values(
        newContract->>'name', 
        newContract->>'uf',
        cast(newContract->>'signedDate' as date), 
        cast(newContract->>'dueDate' as date),
        cast(newContract->>'totalPrice' as numeric),
        contractInstitutionId
      ) 
    returning id into contractId;
  else
    update contract
    set
      name = newContract->>'name',
      signed_date = cast(newContract->>'signedDate' as date),
      due_date = cast(newContract->>'dueDate' as date),
      total_price = cast(newContract->>'totalPrice' as numeric),
      institution_id = contractInstitutionId
    where 
      id = cast(newContract->>'id' as uuid)
    returning id into contractId;
  end if;

  delete from contract_category where contract_id = contractId;
  for contractCategoryName in select * from json_array_elements_text(newContract->'categories')
  loop
    select id into contractCategoryId from category where name = contractCategoryName;
    if contractCategoryId is null then
      insert into category(name) values (contractCategoryName) returning id into contractCategoryId;
    end if;
    insert into contract_category(contract_id, category_id) values(contractId, contractCategoryId);
  end loop;

  delete from contract_item where contract_id = contractId; 
  for contractItem in select * from json_array_elements(newContract->'items')
  loop
    select id into contractItemId from item where code = contractItem->>'code';
    if contractItemId is null then
      insert into item(code) values (contractItem->>'code') returning id into contractItemId;
    end if;
    insert into contract_item(signed_price_per_batch, amount_per_batch, total_requested_batch_quantity, description, item_id, contract_id)
    values(
      cast(contractItem->>'signedPricePerBatch' as decimal), 
      cast(contractItem->>'amountPerBatch' as decimal), 
      cast(contractItem->>'totalRequestedBatchQuantity' as int), 
      contractItem->>'description', 
      contractItemId, 
      contractId);
  end loop;

end $$ language plpgsql;