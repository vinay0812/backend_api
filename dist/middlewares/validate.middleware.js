"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateRegisterUser;
const zod_1 = require("zod");
const userSchemas_1 = require("../schemas/userSchemas");
async function validateRegisterUser(req, res, next) {
    try {
        userSchemas_1.userRegisterSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
    }
}
//# sourceMappingURL=validate.middleware.js.map