import { Request, Response } from "express";


import { PgBossService } from "./pgBossService";

export class UserService {

  constructor() {
  }

  public static async publishMessage(req: Request, res: Response) {
    try {
        const pgBossService = PgBossService.getInstance();
        const { name, message, startAfter, retryLimit } = req.body;
        await pgBossService.publishOneTime(name, message, startAfter, retryLimit);
        res.status(200).json({ message: "Job published successfully" });
    } catch (error) {
        console.error("Error publishing job:", error);
        res.status(500).json({ error: "Internal server error" });
    }
  }

}