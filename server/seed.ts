import { db } from "./db";
import { adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    // Check if admin user already exists
    const [existingAdmin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, "admin"));

    if (!existingAdmin) {
      // Create default admin user
      await db.insert(adminUsers).values({
        username: "admin",
        password: "1234",
      });
      console.log("✓ Default admin user created (admin/1234)");
    } else {
      // Update password to ensure consistency across deployments
      await db
        .update(adminUsers)
        .set({ password: "1234" })
        .where(eq(adminUsers.username, "admin"));
      console.log("✓ Admin user password updated to ensure consistency");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
