require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/user");
const connectDB = require("./config/db");
const cors = require('cors');

app.use(cors());
app.use(helmet());

connectDB();


app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API running..." });
});


// Router middle ware
app.use("/api/products", productRoutes);
app.use('/user', userRoutes)

//heroku
const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}


// Connection to Mongo done through Mongoose.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));