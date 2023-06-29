/*DUMMY ROWS FOR CONTRACTS*/
insert into category(name) values('ELETRICOS');
insert into category(name) values('DIVERSOS');
insert into item(code, quantity_on_stock) values('PILHA 3A', 20);
insert into item(code, quantity_on_stock) values('PILHA 2A', 20);
insert into institution(name) values ('UFRJ');
insert into contract(name, signed_date, due_date, total_price, institution_id) 
	values('TESTE 1', '2023-05-05', '2024-05-05', 2789.20, (select id from institution where name = 'UFRJ'));
insert into contract_item(signed_price_per_batch, amount_per_batch, total_requested_batch_quantity, description, item_id, contract_id)
	values(278.92, 1, 10, 'PILHA ALCALINA ETC', (select id from item where code = 'PILHA 3A'), (select id from contract where name = 'TESTE 1'));
insert into contract_item(signed_price_per_batch, amount_per_batch, total_requested_batch_quantity, description, item_id, contract_id)
	values(278.92, 1, 10, 'PILHA 2A ALCALINA ETC', (select id from item where code = 'PILHA 2A'), (select id from contract where name = 'TESTE 1'));
insert into contract_category(contract_id, category_id)
	values((select id from contract where name = 'TESTE 1'), (select id from category where name = 'ELETRICOS'));
insert into contract_category(contract_id, category_id)
	values((select id from contract where name = 'TESTE 1'), (select id from category where name = 'DIVERSOS'));


/*CLEAN UP*/
delete from contract_category;
delete from contract_item;
delete from contract;
delete from item;
delete from category;
delete from institution;

{
	"name": "TESTE 1",
	"signedDate": "2023-05-05",
	"dueDate": "2024-05-05",
	"totalPrice": 76542.4,
	"institution": "UFRJ",
	"categories": ["ELETRICOS"],
	"items": [
		{
			"code": "PILHA 3A",
			"signedPricePerBatch": 123.56,
			"totalRequestedBatchQuantity": 10,
			"amountPerBatch": 1,
			"description": "PILHA ALCALINA SEI LA"
		}
	]
}