create table if not exists institution(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null
);

create table if not exists category(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null
);

create table if not exists item(
  id uuid primary key default gen_random_uuid(),
  code varchar(255) not null,
  quantity_on_stock int not null
);

create table if not exists contract(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  signed_date date not null,
  due_date date not null,
  total_price decimal not null,
  institution_id uuid not null references institution(id)
);

create table if not exists contract_item(
  id uuid primary key default gen_random_uuid(),
  signed_price_per_batch decimal not null,
  amount_per_batch int not null,
  total_requested_batch_quantity int not null,
  description text,
  item_id uuid not null references item(id),
  contract_id uuid not null references contract(id)
);

create table if not exists contract_category(
  contract_id uuid not null references contract(id),
  category_id uuid not null references category(id)
);

create table if not exists "order"(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  check_in_date date not null,
  portal varchar(255) not null,
  due_date date not null,
  trade varchar(255) not null,
  receipt varchar(255) not null,
  uf varchar(2) not null,
  price decimal not null,
  dispatch_date date,
  delivery_date date,
  shipping int not null,
  shipping_fee decimal not null,
  postal_code varchar(255) not null,
  status int not null,  
  institution_id uuid not null references institution(id),
  contract_id uuid references contract(id)
);

create table if not exists order_category(
  order_id uuid not null references "order"(id),
  category_id uuid not null references category(id)
);

create table if not exists order_item(
  id uuid primary key default gen_random_uuid(),
  signed_price_per_batch decimal not null,
  requested_batch_quantity int not null,
  amount_per_batch int not null,
  description text,
  item_id uuid not null references item_code(id),
  order_id uuid not null references "order"(id)
);