import express from "express";
import cors from "cors";
import db from "./src/models/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import projectRoutes from "./src/routes/project.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import connectDB from "./src/config/connectDB.js";


const app = express();


// connect to frontend
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

connectDB();

const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "hello world." });
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("api/v1/projects", projectRoutes);


// unhandle route
app.all('*', (req, res, next) => {
  const err = new Error('the route cannot be found');
  err.status = 404;
  next(err);
});

// error handling
app.use(errorHandler);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});