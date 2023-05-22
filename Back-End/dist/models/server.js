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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const excel_data_route_1 = __importDefault(require("../routes/excel_data.route"));
const user_credential_1 = __importDefault(require("../routes/user_credential"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../db/config"));
class Server {
    constructor() {
        this.apiPaths = {
            data_excel: '/api/excel_data'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.app.use((err, req, res, next) => {
            res.status(500).json({ message: err.message });
        });
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.default.authenticate();
                console.log("Database online");
            }
            catch (error) {
                if (typeof error === "string")
                    throw new Error(error);
            }
        });
    }
    middlewares() {
        //cors y lectura de body
        this.app.use((0, cors_1.default)());
        this.app.use((0, body_parser_1.json)());
        //this.app.use(urlencoded({ extended: true }));
    }
    routes() {
        this.app.use(this.apiPaths.data_excel, excel_data_route_1.default);
        this.app.use(this.apiPaths.data_excel, user_credential_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server on port:: ", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map