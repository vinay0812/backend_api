"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bookSeat;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jwt_key = process.env.JWT_KEY;
async function bookSeat(req, res) {
    try {
        // user will do booking
        const { userId, eventId, seat } = req.body;
        const event = await prisma.event.findFirst({
            where: { id: Number(eventId) }
        });
        if (!event) {
            return res.status(404).json({ message: "event does not exist" });
        }
        const seats = await prisma.seat.findFirst({
            where: {
                eventId: Number(eventId),
                seatNumber: seat,
                status: "AVILABLE"
            },
        });
        if (!seats) {
            return res.status(404).json({ message: "seat is not avilable" });
        }
        const result = await prisma.$transaction(async (tx) => {
            // race condition
            await tx.$queryRaw `select * from Seat WHERE id = ${seats.id} FOR UPDATE`;
            await tx.seat.update({
                where: { id: seats.id },
                data: { status: "BOOKED" }
            });
            const booking = await tx.booking.create({
                data: {
                    userId: Number(userId),
                    eventId: Number(eventId),
                    seatId: seats.id,
                }
            });
            return booking;
        });
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
//# sourceMappingURL=booking.controller.js.map