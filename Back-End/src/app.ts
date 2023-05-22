
//import connection from "./db/config";
import dotenv from 'dotenv';
import Server from './models/server'
dotenv.config();


const server = new Server();
server.listen();
/*
connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
*/