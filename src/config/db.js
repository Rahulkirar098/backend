const mongooes = require("mongoose");

mongooes
  .connect(process.env.MONGO_URL)
  .then((response) => {
    console.log(`connect to the database : ${response?.Collection?.name} `);
  })
  .catch((error) => console.log(`connection error: ${error}`));
