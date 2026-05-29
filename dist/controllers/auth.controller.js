"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerUser;
exports.login = login;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const process = require("process");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const jwtkey = process.env.JWT_KEY;
if (!jwtkey)
    throw new Error("JWT_KEY not set");
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                isAdmin: false,
                password: hashedPassword
            }
        });
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ "message": error });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({ "message": "user does not exist" });
        }
        const result = await bcrypt_1.default.compare(password, user.password);
        if (!result) {
            return res.status(403).json({ "message": "wrong credentials" });
        }
        const token = jsonwebtoken_1.default.sign(String(user.id), jwtkey);
        return res.json(token);
    }
    catch (error) {
        return res.status(500).json({ "message": error });
    }
}
//# sourceMappingURL=auth.controller.js.map