-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "usn" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "sem" INTEGER NOT NULL DEFAULT 3,
    "year" INTEGER NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "backlogs" INTEGER NOT NULL DEFAULT 0,
    "resume" TEXT,
    "aadhar" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_userId_key" ON "student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_usn_key" ON "student"("usn");

-- CreateIndex
CREATE INDEX "student_usn_idx" ON "student"("usn");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
