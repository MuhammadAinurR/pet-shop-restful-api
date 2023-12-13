import { PrismaClient } from "@prisma/client";
import { ZenStackMiddleware } from "@zenstackhq/server/express";
import RestApiHandler from "@zenstackhq/server/api/rest";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { withPresets } from "@zenstackhq/runtime";
import type { Request } from "express";

function getUser(req: Request) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("TOKEN:", token);
  if (!token) {
    return undefined;
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return { id: decoded.sub };
  } catch {
    // bad token
    return undefined;
  }
}

// load .env environment variables
dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user || !compareSync(password, user.password)) {
    res.status(401).json({ error: "Invalid credentials" });
  } else {
    // sign a JWT token and return it in the response
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!);
    res.json({ id: user.id, email: user.email, token });
  }
});

const apiHandler = RestApiHandler({ endpoint: "http://localhost:3000/api" });

app.use(
  "/api",
  ZenStackMiddleware({
    getPrisma: (req) => {
      return withPresets(prisma, { user: getUser(req) });
    },
    handler: apiHandler,
  })
);

export default app;
