import express from "express";
import connectDB from "./config/db";

import usersRouter from "./routes/api/users";
import authRouter from "./routes/api/auth";
import profileRouter from "./routes/api/profile";
import postsRouter from "./routes/api/posts";

const app = express();

connectDB();

// Init Middleware
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
