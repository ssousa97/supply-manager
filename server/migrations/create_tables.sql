create table if not exists institution(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null
);

create table if not exists category(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null
);

create table if not exists item_code(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null
);

create table if not exists contract(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  description text,
  signedDate date not null,
  dueDate date not null,
  totalPrice decimal not null,
  categoryId uuid not null references category(id),
  institutionId uuid not null references institution(id)
);


create table if not exists order(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  checkInDate date not null,
  portal varchar(255) not null,
  dueDate date not null,
  tradeNumber varchar(255) not null,
  uf varchar(2) not null,
  price decimal not null,
  dispatchDate date,
  deliveryDate date,
  shipping varchar(255) not null,
  shippingFee decimal not null,
  postalCode varchar(40) not null,
  status varchar(40) not null,  
  institutionId uuid not null references institution(id),
  contractId uuid references contract(id)
);

create table if not exists receipt(
  id uuid primary key default gen_random_uuid(),
  orderId uuid references order(id)
);

create table if not exists requested_item(
  id uuid primary key default gen_random_uuid(),
  signedPricePerUnit decimal not null,
  requestedQuantity int not null,
  amountPerUnit varchar(255) not null,
  description text,
  itemCodeId uuid not null references item_code(id),
  orderId uuid not null references order(id),
  contractId uuid references contract(id)
);

create table if not exists supply_item(
  id uuid primary key default gen_random_uuid(),
  totalQuantity int not null,
  itemCodeId uuid not null references item_code(id)
);
