"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function sign(user, name) {
    const token = jsonwebtoken_1.default.sign({
        usuario: user,
        username: name,
    }, process.env.KEY_TO_JWT || "key", {
        expiresIn: "10h",
    });
    return token;
}
exports.sign = sign;
const validateToken = (req, resp, next) => {
    const token = req.headers["authorization"];
    if (token != undefined && token.startsWith("Bearer ")) {
        const token_without_bearer = token.slice(7);
        jsonwebtoken_1.default.verify(token_without_bearer, process.env.KEY_TO_JWT || "key");
        next();
    }
    else
        resp.status(401).json({
            msg: "Access denied",
        });
};
exports.validateToken = validateToken;
//# sourceMappingURL=JWT.js.map