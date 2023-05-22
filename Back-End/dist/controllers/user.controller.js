"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.loggin = void 0;
const credential_model_1 = __importDefault(require("../models/credential.model"));
const JWT_1 = require("../lib/JWT");
const crypto_js_1 = __importDefault(require("crypto-js"));
const loggin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    password = crypto_js_1.default.SHA256(password).toString();
    const excelData = yield credential_model_1.default.findOne({
        where: {
            username,
            password
        }
    });
    if (!excelData) {
        res.json({
            error: "No se ha encontrado el usuario"
        });
        return;
    }
    const token = (0, JWT_1.sign)(username, password);
    res.json({
        username,
        token
    });
});
exports.loggin = loggin;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = req.body;
        password = crypto_js_1.default.SHA256(password).toString();
        console.log(username, password);
        const new_user = {
            username,
            password
        };
        const registerUserBuildByReq = credential_model_1.default.build(new_user);
        yield registerUserBuildByReq.save();
        res.json({
            msg: "Se ha creado el nuevo usuario"
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Error en servidor'
        });
    }
});
exports.register = register;
//# sourceMappingURL=user.controller.js.map