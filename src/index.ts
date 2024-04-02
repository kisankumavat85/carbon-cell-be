import express from "express";
import dotenv from "dotenv";

import rootRouter from "./routes/root";
import authRoutes from "./routes/auth";
import { validationErrorHandler } from "./middlewares/validation-error";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import publicAPIsRoute from "./routes/public-apis";
import userRoute from "./routes/user";
import swaggerDocs from "./libs/swagger";
import ethereumRoute from "./routes/ethereum";

dotenv.config();

const app = express();
const PORT = process.env.PORT!;

app.use(express.json());
app.use("/", rootRouter);
app.use("/api/auth", authRoutes);
app.use("/api/public-apis", publicAPIsRoute);
app.use("/api/user", userRoute);
app.use("/api/ethereum", ethereumRoute);
swaggerDocs(app, PORT);
app.use(notFoundHandler);
app.use(validationErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
