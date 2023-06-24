// server.js
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const seatsRouter = require("./routes/seatRoutes");
const path= require("path")

const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cors());
app.use("/seats", seatsRouter);

// ---------------Deployment-------------------

const __dirname1=path.resolve()

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
}else{
  app.get("/", (req, res) => {
    res.send("Running");
  });
}

// ---------------Deployment-------------------

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
