"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../db/config"));
const Exceldata = config_1.default.define('Exceldata', {
    idexceldata: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    username: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    date: {
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    },
    punchin: {
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false
    },
    punchout: {
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false
    },
    idfile: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }
});
exports.default = Exceldata;
//# sourceMappingURL=excel_data.model.js.map