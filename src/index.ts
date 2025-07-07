import exprress from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import db from "./utils/database";

async function init() {
  try {
    const connection = await db();
    console.log(`Database connection status: ${connection}`);

    const PORT = 3000;
    const app = exprress();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing the application:", error);
  }
}

init();
