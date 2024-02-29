-- CreateTable
CREATE TABLE "PlantsCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "plantType" TEXT NOT NULL,

    CONSTRAINT "PlantsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantsType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "PlantsType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "plantTypeId" INTEGER NOT NULL,
    "plantsCategoryId" INTEGER NOT NULL,
    "waterPeriod" TEXT NOT NULL,
    "yieldDuration" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "lightRequirement" TEXT NOT NULL,
    "cultivationMethod" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "plantTypeId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "plantName" TEXT NOT NULL,
    "plantVariety" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "dagree" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_plantTypeId_key" ON "Plant"("name", "plantTypeId");

-- AddForeignKey
ALTER TABLE "PlantsType" ADD CONSTRAINT "PlantsType_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PlantsCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plantTypeId_fkey" FOREIGN KEY ("plantTypeId") REFERENCES "PlantsType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plantsCategoryId_fkey" FOREIGN KEY ("plantsCategoryId") REFERENCES "PlantsCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
