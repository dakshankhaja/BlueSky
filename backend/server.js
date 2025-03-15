import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.MONGO_URI);

// CORS configuration
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

app.use(express.json());    //to parse req.body
app.use(express.urlencoded({ extended: true }));    //to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});