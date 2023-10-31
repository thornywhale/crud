CREATE TABLE "things"(
  "id" SERIAL PRIMARY KEY,
  "body" TEXT NOT NULL CHECK("body" != ''),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
);
--create
INSERT INTO "things"("body") VALUES ('test text 2') RETURNING *;
--update
UPDATE "things" 
SET "body"='new text', "updatedAt"=current_timestamp
WHERE "id"=1;
--delete
DELETE FROM "things" WHERE "id"=2;
--read
SELECT * FROM "things";