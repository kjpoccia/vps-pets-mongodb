require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const MongoPet = require('../models/mongoPet')
const router = express.Router();
const url = process.env.MONGODB_URI

const VALID_PET_PROPS = ["id", "name", "type", "_id", "__v"];

function extractPetObject(requestBody) {
  const pet = {};
  pet.name = requestBody["name"] || "";
  pet.type = requestBody["type"] || "";

  return pet;
}

function transformPets(pet) {
  return {
    ...pet._doc,
    id: pet._id.toString(),
  }
}

(async () => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected!')
    } catch (error) {
      console.error('MongoDB connection error', error?.message);
    }
})();

function isValidPet(pet) {  
  return (
    pet.name.length >= 1 &&
    (pet.type.length >= 2 || pet.type === "") &&
    Object.keys(pet).every(prop => VALID_PET_PROPS.includes(prop))
  );
}

router.get("/pets", async (req, res, next) => {
  try {
    const pets = await MongoPet.find();
    const transformedPets = pets.map(transformPets);
    res.json(transformedPets);
  } catch (error) {
    console.error("Error getting all pets: ", error);
    return res.status(500).send("Getting all pets failed.")
  }
});

router.get("/pets/:id", async (req, res, next) => {
  try {
    const pet = await MongoPet.findById(req.params["id"]);
    const transformedPet = transformPets(pet);
    res.json(transformedPet);
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

    const newPet = new MongoPet(petObj);
    await newPet.save();
    const transformedPet = transformPets(newPet);
    res.status(201).json(transformedPet);
  } catch (error) {
    console.log("Error saving pet: ", error);
    return res.status(500).send("Saving pet failed.")
  }

});

router.put("/pets/:id", async (req, res, next) => {
  const id = req.params["id"];

  try {
    const pet = await MongoPet.findById(id);
    const petObj = {...pet.toObject(), ...req.body}

    if (!isValidPet(petObj)) {
      res.status(400).send("Pet cannot be updated.");
    } else {
      try {
        await MongoPet.findByIdAndUpdate(id, petObj, { new: true }) // ensures findByIdAndUpdate returns the updated record
        const transformedPet = transformPets(petObj);
        res.status(200).json(transformedPet)
      } catch (error) {
        console.log("Error saving pet: ", error);
        return res.status(500).send("Saving pet failed.")
      }
    }
  } catch (error) {
    res.status(404).send("The pet could not be found.");
  }
});


router.delete("/pets/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
      await MongoPet.findByIdAndDelete(id);
      res.sendStatus(204);
  } catch (error) {
      res.status(500).send("Deleting pet failed.")
  }
});

router.get("/deleteall", async () => {
  try {
    const result = await MongoPet.deleteMany({});
    console.log(`${result.deletedCount} records were deleted.`)
  } catch (error) {
    console.error('Error deleting records: ', error)
  }
})

module.exports = router;
