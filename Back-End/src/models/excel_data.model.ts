import {DataType } from "sequelize-typescript";

import connection from "../db/config";


const Exceldata = connection.define('Exceldata',{
  idexceldata:{
    type: DataType.INTEGER,
    primaryKey:true,
    unique:true,
    autoIncrement:true,
    allowNull: false,
  },
  user_id: {
    type: DataType.STRING,
    allowNull: false
  },
  username: {
    type: DataType.STRING,
    allowNull: false
  },
  date: {
    type: DataType.DATE,
    allowNull: false
  },
  punchin:{
    type: DataType.TIME,
    allowNull: false
  },
  punchout:{
    type: DataType.TIME,
    allowNull: false
  },
  idfile:{
    type: DataType.INTEGER,
    allowNull: false
  }
});

export default Exceldata;