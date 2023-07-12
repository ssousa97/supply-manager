-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "quantityOnStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "signedDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" MONEY NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractItem" (
    "id" SERIAL NOT NULL,
    "signedPricePerBatch" MONEY NOT NULL,
    "amountPerBatch" INTEGER NOT NULL,
    "totalRequestedBatchQuantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "ContractItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractCategory" (
    "categoryId" INTEGER NOT NULL,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "ContractCategory_pkey" PRIMARY KEY ("categoryId","contractId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "portal" TEXT NOT NULL,
    "trade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "receipt" TEXT,
    "dispatchDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "shipping" TEXT,
    "institutionId" INTEGER NOT NULL,
    "contractId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "signedPricePerBatch" MONEY NOT NULL,
    "amountPerBatch" INTEGER NOT NULL,
    "requestedBatchQuantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderCategory" (
    "categoryId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderCategory_pkey" PRIMARY KEY ("categoryId","orderId")
);

-- CreateTable
CREATE TABLE "Inflow" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Inflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outflow" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Outflow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_code_key" ON "Item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_name_key" ON "Contract"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_name_key" ON "Order"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Outflow_orderId_key" ON "Outflow"("orderId");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractItem" ADD CONSTRAINT "ContractItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractItem" ADD CONSTRAINT "ContractItem_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractCategory" ADD CONSTRAINT "ContractCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractCategory" ADD CONSTRAINT "ContractCategory_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCategory" ADD CONSTRAINT "OrderCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCategory" ADD CONSTRAINT "OrderCategory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inflow" ADD CONSTRAINT "Inflow_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outflow" ADD CONSTRAINT "Outflow_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outflow" ADD CONSTRAINT "Outflow_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
