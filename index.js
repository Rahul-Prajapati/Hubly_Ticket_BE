require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 5000;
const { authRoutes } = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, (res) =>{
      console.log(`Server running on port ${PORT}`);
       })
  })
  .catch((err) => {
    console.log(err);
  });

// Sample Route
app.get("/", (req, res) => {
  res.send("Backend Server is Started!!!");
});

