-- Create enum type (safe if not exists manually)
DO $$ BEGIN
    CREATE TYPE "MembershipRole" AS ENUM ('ADMIN', 'MEMBER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Convert WorkspaceMembership.role safely
ALTER TABLE "WorkspaceMembership"
ALTER COLUMN "role"
TYPE "MembershipRole"
USING "role"::text::"MembershipRole";

-- Convert ProjectMembership.role safely
ALTER TABLE "ProjectMembership"
ALTER COLUMN "role"
TYPE "MembershipRole"
USING "role"::text::"MembershipRole";