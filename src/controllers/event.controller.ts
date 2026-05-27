import { Request, Response } from "express"
// import { PrismaClient } from "../generated/prisma/client"
import { PrismaClient } from "@prisma/client"
// import prisma client at top
const prisma = new PrismaClient()


// create evenet
export default async function handleEvent(req: Request, res: Response) {

    // create event
    try {

        const body = req.body
        const { eventname, avilableseats, totalseats, vanue, date } = body
        const event = await prisma.event.create({
            data: {
                eventname,
                avilableseats,
                totalseats,
                vanue,
                date,
                authorId: 1
            }

        })
        return res.status(200).json(event)
    } catch (error) {
        return res.status(500).json(error)
    }

}

// get all event
async function getEvents(req: Request, res: Response) {

    try {
        const data = await prisma.event.findMany()

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }



}


// single event 

async function getEvent(req: Request, res: Response) {

    try {

        const eventid = req.params.id


        const event = await prisma.event.findUnique({
            where: { id: Number(eventid) },
        })

        if (!event) {
            return res.status(404).json({ message: "event not found" })
        }
        return res.status(200).json(event)
    } catch (error) {
        return res.status(500).json(error)
    }

}

// delete single event

async function delEvent(req: Request, res: Response) {
    try {

        const id = req.params.id

        await prisma.event.delete({
            where: { id: Number(id) }
        })

        return res.status(200).json('event deleted')
    } catch (error) {
        return res.status(500).json(error)
    }

}

async function createSeats(req: Request, res: Response) {

    try {

        // get id of event
        const eventid = req.params.id

        // get how many seat we want
        const { seatsPerRow } = req.body

        // check event 
        const event = await prisma.event.findFirst({
            where: { id: Number(eventid) }
        })

        if (!event) {
            return res.status(404).json({ "message": "event not found" })
        }

        const existingSeats = await prisma.seat.findFirst({
            where: {
                eventId: Number(eventid)
            }
        })

        if (existingSeats) {
            return res.status(400).json({ message: "seats already created for this event" })
        }
        let row = ["a", "b", "c", "d", "e", "f"];
        let seatsData = []

        for (let i = 0; i < row.length; i++) {
            for (let j = 1; j <= seatsPerRow; j++) {
                let seatNumber = `${row[i]}${j}`

                // but this create n+1 problem databse query inside a loop
                //    const exist =  await prisma.seat.findFirst({
                //         where:{seatNumber,eventId: Number(eventid) }
                //     })

                //     if(exist){
                //         continue
                //     }


                seatsData.push({ seatNumber, eventId: Number(eventid) })
            }

        }
        const seats = await prisma.seat.createMany({ data: seatsData })

        return res.status(201).json(seats)

        // return res.json(eventid)
    } catch (error) {
        return res.status(500).json(error)
    }

}

export { getEvents, getEvent, delEvent, createSeats }