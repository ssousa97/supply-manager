create table if not exists batch (
  id serial primary key,
  code varchar(50) not null,
  date timestamptz
);

create table if not exists category (
  id serial primary key,
  name varchar(250)
);

create table if not exists institution (
  id serial primary key,
  name varchar(250),
  uf varchar(2)
);

create table if not exists item (
  id serial primary key,
  name varchar(250) unique not null, 
  slug varchar(250),
  category_id int,
  batch_id int,
  price decimal not null,
  on_stock int default 0,
  constraint fk_category
    foreign key(category_id)
      references category(id),
  constraint fk_batch
    foreign key(batch_id)
      references batch(id)
);

create table if not exists contract (
  id serial primary key,
  name varchar(250),
  institution_id int,
  total_price decimal,
  due date,
  signed_at date,
  constraint fk_institution
    foreign key(institution_id)
      references institution(id)
);

create table if not exists contract_item (
  contract_id int,
  item_id int,
  amount_requested int,
  constraint fk_contract
    foreign key(contract_id)
      references contract(id),
  constraint fk_item
    foreign key(item_id)
      references item(id),      
  unique(contract_id, item_id)
);


