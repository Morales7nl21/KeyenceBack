"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../db/config"));
const Userfiles = config_1.default.define('user_files', {
    iduser_files: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    idfile: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    username: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }
});
exports.default = Userfiles;
//# sourceMappingURL=user_files.model.js.map