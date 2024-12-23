require('dotenv').config();
const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const VALID_PET_PROPS = ["id", "name", "type"];

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: 'postgres',
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

let dbClient;

function extractPetObject(requestBody) {
  const pet = {};
  pet.name = requestBody["name"] || "";
  pet.type = requestBody["type"] || "";

  return pet;
}

(async () => {
  try {
    await client.connect();

    const petsDatabase = process.env.PG_DATABASE;
    const checkIfExists = `SELECT 1 from pg_database WHERE datname ='${petsDatabase}'`;
    const result = await client.query(checkIfExists);

    if (result.rows.length === 0) {
      await client.query(`CREATE DATABASE ${petsDatabase}`);
      console.log('Database created successfully')
    } else {
      console.log('Database already exists');
    }

    await client.end();
    dbClient = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: petsDatabase,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    });

    await dbClient.connect();

    const schemaPath = path.join(__dirname, "../db/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await dbClient.query(schemaSql);

    console.log("Table set up successfully!");
  } catch (error) {
    console.error("Error during database setup: ", error);
  }
})();

function isValidPet(pet) {  
  return (
    pet.name.length >= 1 &&
    (pet.type.length >= 2 || pet.type === "") &&
    Object.keys(pet).every(prop => VALID_PET_PROPS.includes(prop))
  );
}

function createUpdateQuery(petObj, id) {
  const attributesForUpdate = Object.keys(petObj).filter(function (key) {
    return petObj[key] !== "" && key !== "id";
  });

  const attributesForUpdateQuery = attributesForUpdate.map(function (key) {
    return `${key} = '${petObj[key]}'`;
  });

  return `UPDATE pets SET ${attributesForUpdateQuery.join(
    ", "
  )} WHERE id = ${id} RETURNING *;`;
}

router.get("/seed", async (req, res) => {
  try {
    const seedData = fs.readFileSync(path.join(__dirname, "../db/seed.sql")).toString();
    await dbClient.query(seedData);
    res.status(200).send("Seed data set up successfully!");
  } catch (error) {
    console.error("Error with seed data: ", error);
    return res.status(500).send("Setting up seed data failed.")
  }
})

router.get("/pets", async (req, res, next) => {
  try {
    const request = "SELECT * FROM pets;";
    const { rows } = await dbClient.query(request);
    res.setHeader("Content-Type", "application/json");
    res.json(rows);
  } catch (error) {
    console.error("Error getting all pets: ", error);
    return res.status(500).send("Getting all pets failed.")
  }
});

router.get("/pets/:id", async (req, res, next) => {
  try {
    const request = `SELECT * FROM pets WHERE id = ${req.params["id"]}`;
    const { rows } = await dbClient.query(request);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error getting pet: ", error);
    res.status(404).send("The pet could not be found.")
  }
});

router.post("/pets", async (req, res, next) => {

  try {
    const petObj = extractPetObject(req.body);

    if (!isValidPet(petObj)) {
      res.status(400).send("Pet cannot be saved.");
    }

    const insertQuery = `INSERT INTO pets (name, type) VALUES ($1, $2) RETURNING *;`
    const { rows } = await dbClient.query(insertQuery, [petObj.name, petObj.type])
    res.status(201).json(rows[0]);
  } catch (error) {
    console.log("Error saving pet: ", error);
    return res.status(500).send("Saving pet failed.")
  }

});

router.put("/pets/:id", async (req, res, next) => {
  const id = req.params["id"];

  try {
    const selectQuery = "SELECT * FROM pets WHERE id = $1"
    const { rows } = await dbClient.query(selectQuery, [id])
    if (rows.length > 0) {
      const petObj = {...rows[0], ...req.body}

      if (!isValidPet(petObj)) {
        res.status(400).send("Pet cannot be updated.");
      } else {
        const updateQuery = createUpdateQuery(petObj, id);
        const { rows } = await dbClient.query(updateQuery);
        res.status(200).json(rows[0])
      }
    } else {
      res.status(404).send("The pet could not be found.");
    }
  } catch (error) {
    console.log("Error saving pet: ", error);
    return res.status(500).send("Saving pet failed.")
  }
});


router.delete("/pets/:id", async (req, res, next) => {
  const id = req.params["id"];
  try {
    const selectQuery = "SELECT * FROM pets WHERE id = $1"
    const { rows } = await dbClient.query(selectQuery, [id]);
    if (rows.length > 0) {
      const deleteQuery = "DELETE FROM pets where id = $1"
      await dbClient.query(deleteQuery, [id]);
      res.sendStatus(204);
    } else {
      res.status(404).send("The pet could not be found.");
    }
  } catch (error) {
    console.log("Error deleting pet: ", error);
    return res.status(500).send("Deleting pet failed.")
  }
});

module.exports = router;
