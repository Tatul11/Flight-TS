require("dotenv").config();
import express from "express";
const flightRouter = require("./routes/flight");
const app = express();

app.use(express.json());
app.use("/flight", flightRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
