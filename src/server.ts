import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log(`🛢️  Database is connected successfully`);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
}

main();
