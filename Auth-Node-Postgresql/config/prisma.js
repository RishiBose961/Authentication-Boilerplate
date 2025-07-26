// config/prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect(); // Optional, but good for manual connection check
    console.log("✅ Connected to the database!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Exit if DB is unreachable
  }
})();

export default prisma;
