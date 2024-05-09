const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutes = require("./src/routes/auth");
//const gigRoutes = require("./src/routes/gig")
const app = express();
const cookieParser = require("cookie-parser")

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/myServiceapp', {

}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err + "not connected"));
app.use(cookieParser());

app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));