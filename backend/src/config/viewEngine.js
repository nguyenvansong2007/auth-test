import db from "../models/index.js"; 


export const viewEngine = (app) => {
  app.set('views', './src/views');
  app.set('view engine', 'ejs');
  // Trang xác thực
  app.get("/auth", (req, res) => {
    res.render("auth");
  });

  // Trang danh sách project
  app.get("/projects", async (req, res) => {
    const projects = await db.project.findAll();
    res.render("projects", { projects });
  });

  // Trang danh sách user
  app.get("/users", async (req, res) => {
    const users = await db.user.findAll();
    res.render("users", { users });
  });

  // Trang danh sách file upload
  app.get("/uploads", async (req, res) => {
    const files = await db.file.findAll();
    res.render("uploads", { files });
  });
};
