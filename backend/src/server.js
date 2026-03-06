import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import recordRoutes from "./routes/recordRoutes.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors(
  //{origin:"http://localhost:5173"}
))

//app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Comic Storyboard Creator Backend Running");
});

app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
console.log("Server running successfully");
console.log(` Base URL: http://localhost:${PORT}`);
console.log(`Comics API: http://localhost:${PORT}/api/records`);

});


