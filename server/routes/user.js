const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = new express.Router();

DEFAULT_COLORS = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163"];

// update color
router.post("/users/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        players: {
          createMany: {
            data: [
              { playerId: 1 },
              { playerId: 2 },
              { playerId: 3 },
              { playerId: 4 },
            ],
          },
        },
      },
    });
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// update color
router.get("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw "user doesn't exist";
    if (user.password !== password) throw "wrong password";
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
