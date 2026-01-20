const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRoutes = require('./api/routes/newsRoutes');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/news', newsRoutes)
mongoose.connect (process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.get("/", (req,res )=> res.send ("Server is Running"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server on port ${PORT}`));