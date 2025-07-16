import exprress from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import db from "./utils/database";
import docs from "./docs/route";
import cors from "cors";

async function init() {
  try {
    const connection = await db();
    console.log(`Database connection status: ${connection}`);

    const PORT = 3000;
    const app = exprress();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running up!",
        data: null,
      });
    });
    app.use("/api", router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing the application:", error);
  }
}

init();
