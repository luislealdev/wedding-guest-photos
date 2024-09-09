-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "memoryId" TEXT NOT NULL,

    CONSTRAINT "MemoryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemoryImage" ADD CONSTRAINT "MemoryImage_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
