import { Router } from "express";
import handleEvent from "../controllers/event.controller";
import {getEvents} from "../controllers/event.controller";
import {getEvent,delEvent,createSeats} from "../controllers/event.controller";

const eventrouter = Router()

eventrouter.post('/',handleEvent)
eventrouter.get('/',getEvents)
eventrouter.get('/:id',getEvent)
eventrouter.delete('/:id',delEvent)

// create seat for event 

eventrouter.post('/:id/seats',createSeats)

export default eventrouter;