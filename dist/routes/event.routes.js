"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const event_controller_2 = require("../controllers/event.controller");
const event_controller_3 = require("../controllers/event.controller");
const eventrouter = (0, express_1.Router)();
eventrouter.post('/', event_controller_1.default);
eventrouter.get('/', event_controller_2.getEvents);
eventrouter.get('/:id', event_controller_3.getEvent);
eventrouter.delete('/:id', event_controller_3.delEvent);
// create seat for event 
eventrouter.post('/:id/seats', event_controller_3.createSeats);
exports.default = eventrouter;
//# sourceMappingURL=event.routes.js.map