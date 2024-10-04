import express from "express";
import {UserService} from './userService'

const router = express.Router();

router.post("/publish", UserService.publishMessage);

export default router;
