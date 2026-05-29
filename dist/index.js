"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    return res.status(200).json({ 'status': 'ok' });
});
//  auth
app.use('/auth', auth_routes_1.default);
app.use('/events', auth_middleware_1.default, event_routes_1.default);
app.use('/booking', auth_middleware_1.default, booking_routes_1.default);
app.listen(port, () => {
    console.log(`serer is running in port ${port}`);
});
//# sourceMappingURL=index.js.map