import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.dow@gmail.com",
      avatarUrl: "https://github.com/Mateus8741.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Exemple Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-07T07:57:53.201Z",
      firstTeamCountryCode: "DE",
      secondTeamCountyCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-07T07:57:53.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountyCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
