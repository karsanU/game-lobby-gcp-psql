const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function () {
  try {
    const user = await prisma.user.create({
      data: {
        email: "karsan1@gmail.com",
        name: "karsan",
        password: "pass",
        players: {
          create: {
            playerId: 1,
          },
          create: {
            playerId: 2,
          },
          create: {
            playerId: 3,
          },
          create: {
            playerId: 4,
          },
        },
      },
    });
    console.log("success");
    console.log(user);
  } catch (e) {
    console.log(e);
    console.log("fail");
  }
})();
