import { Router } from "express";
import bookSeat from "../controllers/booking.controller";

const bookingRouter = Router()

bookingRouter.post('/',bookSeat)

export default bookingRouter