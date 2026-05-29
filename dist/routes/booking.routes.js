"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
const bookingRouter = (0, express_1.Router)();
bookingRouter.post('/', booking_controller_1.default);
exports.default = bookingRouter;
//# sourceMappingURL=booking.routes.js.map