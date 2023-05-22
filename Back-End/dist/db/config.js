"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "Blas",
    password: "David_escomMySQL",
    database: "keyence",
});
exports.default = connection;
//# sourceMappingURL=config.js.map