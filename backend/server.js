/* eslint-env node */
import express from "express";

import dataRoutes from "./routes/dataRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.sendStatus(204);
  }
  next();
});

app.use("/api/data", dataRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Basic error handler to ensure consistent responses
app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
