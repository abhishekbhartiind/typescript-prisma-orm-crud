import express, { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

// POST
app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// GET
app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Search with ID
app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  })

  res.json(user)
})

// PUT
app.put("/", async (req: Request, res: Response) => {
  const { id, username } = req.body
  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
  })

  res.json(updateUser)
})

app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const deleteUser = await prisma.user.delete({
    where: { id: Number(id) },
  })

  res.json(deleteUser)
})

app.listen(4000, () => {
  console.log("Server is running on PORT: 4000")
})
