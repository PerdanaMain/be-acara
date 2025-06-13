import exprress from "express";
import router from "./routes/api";

const app = exprress();

const PORT = 3000;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
