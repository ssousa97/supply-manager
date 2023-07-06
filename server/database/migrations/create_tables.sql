create table if not exists institution(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null unique
);

create table if not exists category(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null unique
);

create table if not exists item(
  id uuid primary key default gen_random_uuid(),
  code varchar(255) not null unique,
  quantity_on_stock int default 0
);

create table if not exists contract(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null unique,
  uf varchar(2) not null,
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
  name varchar(255) not null unique,
  check_in_date date not null,
  portal varchar(255) not null,
  due_date date not null,
  trade varchar(255) not null,
  receipt varchar(255),
  uf varchar(2) not null,
  price decimal not null,
  dispatch_date date,
  delivery_date date,
  shipping varchar(255),
  shipping_fee decimal,
  postal_code varchar(255) not null,
  status varchar(255),  
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
  item_id uuid not null references item(id),
  order_id uuid not null references "order"(id)
);
