"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_KEY;
if (!secret)
    throw new Error("JWT_KEY not set");
async function auth(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decode = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        return res.status(401).send('authentication failed');
    }
}
//# sourceMappingURL=auth.middleware.js.map