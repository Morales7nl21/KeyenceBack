import {DataType } from "sequelize-typescript";

import connection from "../db/config";


const Userfiles = connection.define('user_files',{
  iduser_files:{
    type: DataType.INTEGER,
    primaryKey:true,
    unique:true,
    autoIncrement:true,
    allowNull: false,
  },
  idfile: {
    type: DataType.INTEGER,
    allowNull: false
  },
  username: {
    type: DataType.STRING,
    allowNull: false
  }
});

export default Userfiles;