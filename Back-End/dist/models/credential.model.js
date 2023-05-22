"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../db/config"));
const CredentialData = config_1.default.define('users', {
    username: {
        type: sequelize_typescript_1.DataType.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }
});
exports.default = CredentialData;
//# sourceMappingURL=credential.model.js.map