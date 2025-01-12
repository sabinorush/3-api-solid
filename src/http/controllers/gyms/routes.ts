import { FastifyInstance } from "fastify";

import { verifiJwt } from "@/http/middlewares/verify-jwt";



export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifiJwt)

  
}