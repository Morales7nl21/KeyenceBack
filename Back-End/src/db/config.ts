import { Sequelize } from "sequelize-typescript";
import ExcelData from "../models/excel_data.model";

const connection = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    username:"Blas",
    password:"David_escomMySQL",
    database:"keyence",        
});
export default connection;