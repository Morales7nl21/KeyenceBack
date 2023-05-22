import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import excelRoutes from '../routes/excel_data.route';
import credentialRoutes from '../routes/user_credential'
import cors from 'cors'
import connection from "../db/config";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    data_excel: '/api/excel_data'
  }
  constructor() {

    this.app = express();
    this.port = process.env.PORT || "3000";
    
    this.dbConnection();
    this.middlewares();
    this.routes();

    this.app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(500).json({ message: err.message });
      }
    );
      
  }
  async dbConnection(){
    try {
      await connection.authenticate();
      console.log("Database online")
    } catch (error) {
      if(typeof error === "string")
        throw new Error(error);
    }
  }
  middlewares(){
    //cors y lectura de body
    this.app.use(cors());
    this.app.use(json());
    //this.app.use(urlencoded({ extended: true }));

  }
  routes(){
    this.app.use(this.apiPaths.data_excel,excelRoutes);
    this.app.use(this.apiPaths.data_excel,credentialRoutes);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server on port:: ", this.port);
    });
  }
}

export default Server;
