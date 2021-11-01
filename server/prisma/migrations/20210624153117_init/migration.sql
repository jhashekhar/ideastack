-- CreateTable
CREATE TABLE "Book" (
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book.title_unique" ON "Book"("title");
