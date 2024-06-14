import { Router } from "express";
import { checkSlotAvailability } from "./slot.controller";

const router = Router();

router.get('/', checkSlotAvailability)

export const checkAvailabilityRoute = router;