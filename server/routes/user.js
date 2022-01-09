const express = require("express");
const { PrismaClient } = require("@prisma/client");
var validator = require("validator");
const prisma = new PrismaClient();

const router = new express.Router();

DEFAULT_COLORS = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163"];

// update color
router.post("/users/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!validator.isEmail(email)) throw "email not valid";
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        players: {
          createMany: {
            data: [
              { playerId: 0 },
              { playerId: 1 },
              { playerId: 2 },
              { playerId: 3 },
            ],
          },
        },
      },
    });
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send({ message: e.toString() });
  }
});

// update color
router.get("/users/login", async (req, res) => {
  const { email, password } = req.query;
  try {
    if (!validator.isEmail(email)) throw "email not valid";
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw "user doesn't exist";
    if (user.password !== password) throw "wrong password";
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send({ message: e.toString() });
  }
});

module.exports = router;
