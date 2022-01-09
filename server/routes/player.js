const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = new express.Router();

DEFAULT_COLORS = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163"];

// update color
router.put("/players", async (req, res) => {
  const { userId, playerId, color } = req.body;
  // only update if predefined color
  if (!DEFAULT_COLORS.includes(color) && color) throw "not valid color";
  try {
    const players = await prisma.player.findMany({
      where: {
        userId,
      },
    });
    // sort the list incremental order
    players.sort((player1, player2) => player1.playerId - player2.playerId);
    // if any player already has that color throw err
    players.forEach((player) => {
      if (player.color === color && color) throw "color already in use";
    });
    const updatedPlayer = await prisma.player.update({
      where: {
        id: players[playerId].id,
      },
      data: {
        color: color || null,
      },
    });
    // set the new color
    players[playerId].color = color;
    res.status(201).send({ players });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
