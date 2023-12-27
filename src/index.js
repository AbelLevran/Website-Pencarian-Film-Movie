// Mengimpor modul yang diperlukan dari Express dan path
const express = require("express");
const path = require("path");

// Membuat instance aplikasi Express
const app = express();

// Mengimpor model LogInCollection dari file mongo.js
const LogInCollection = require("./mongo");

// Menetapkan port untuk aplikasi, menggunakan port yang diberikan atau default 4000
const port = process.env.PORT || 4000;

// Menggunakan middleware untuk memproses JSON dan URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Menentukan path untuk file-template dan file publik
const templatePath = path.join(__dirname, "../templates");
const publicPath = path.join(__dirname, "../public");

// Mengatur view engine dan views path
app.set("view engine", "hbs");
app.set("views", templatePath);

// Menggunakan file publik untuk menyajikan halaman web
app.use(express.static(publicPath));

// Route untuk menampilkan halaman signup
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Route untuk menampilkan halaman login
app.get("/login", (req, res) => {
  res.render("login");
});

// Route untuk menerima data signup dari form
app.post("/signup", async (req, res) => {
  try {
    // Mencari atau membuat data pengguna baru dalam LogInCollection
    const result = await LogInCollection.findOneAndUpdate(
      { name: req.body.name },
      { $setOnInsert: { name: req.body.name, password: req.body.password } },
      { upsert: true, new: true }
    );

    if (result) {
      // Redirect ke halaman login setelah signup berhasil
      res.status(201).redirect("/login");
    } else {
      res.send("Error creating or retrieving user.");
    }
  } catch (error) {
    res.send("Error in signup: " + error.message);
  }
});

// Route untuk proses login
app.post("/login", async (req, res) => {
  try {
    // Memeriksa apakah pengguna ada dalam database
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (check && check.password === req.body.password) {
      // Jika login berhasil, tampilkan halaman home dengan nama pengguna
      res.status(201).render("home", { naming: `${req.body.name}` });
    } else {
      // Jika login gagal, tampilkan pesan kesalahan di halaman login
      res.render("login", { error: "Incorrect username or password." });
    }
  } catch (error) {
    res.send("Error in login: " + error.message);
  }
});

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
  console.log("Server is running on port", port);
});
