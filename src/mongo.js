// Mengimpor modul Mongoose
const mongoose = require("mongoose");

// Melakukan koneksi ke database MongoDB menggunakan Mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/user_melongmovie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose berhasil terhubung"); // Pesan berhasil jika terhubung ke MongoDB
  })
  .catch((e) => {
    console.error("MongoDB gagal terhubung: " + e.message); // Pesan kesalahan jika gagal terhubung
  });

// Membuat skema untuk data pengguna
const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Membuat model LogInCollection yang terkait dengan skema logInSchema
const LogInCollection = new mongoose.model("data-user", logInSchema);

// Mengekspor model LogInCollection untuk digunakan di file lain
module.exports = LogInCollection;

