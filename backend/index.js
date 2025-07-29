const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ExcelJS = require("exceljs");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/save", async (req, res) => {
  const data = req.body;
  const filePath = "./datos.xlsx";
  let workbook;

  if (fs.existsSync(filePath)) {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
  } else {
    workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Datos");
    sheet.addRow([
      "First name", "Last name", "Favorite sport", "Gender",
      "State", "21 or older", "Ford", "Chrysler", "Toyota", "Nissan"
    ]);
  }

  const sheet = workbook.getWorksheet("Datos");
  sheet.addRow([
    data.firstName,
    data.lastName,
    data.favoriteSport,
    data.gender,
    data.state,
    data.is21OrOlder ? 1 : 0,
    data.cars.includes("Ford") ? 1 : 0,
    data.cars.includes("Chrysler") ? 1 : 0,
    data.cars.includes("Toyota") ? 1 : 0,
    data.cars.includes("Nissan") ? 1 : 0,
  ]);

  await workbook.xlsx.writeFile(filePath);
  res.send("Datos guardados correctamente");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

