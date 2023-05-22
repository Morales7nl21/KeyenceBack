import {DataType } from "sequelize-typescript";

import connection from "../db/config";


const CredentialData = connection.define('users',{
  
  username: {
    type: DataType.STRING,
    primaryKey:true,
    unique:true,
    allowNull: false
  },
  password: {
    type: DataType.STRING,
    allowNull: false
  }
});

export default CredentialData;