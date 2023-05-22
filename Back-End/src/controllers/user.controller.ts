import { Request, Response } from "express";
import CredentialModel from "../models/credential.model";
import { sign } from "../lib/JWT";
import CryptoJS from "crypto-js"; 
export const loggin = async (req:Request,res:Response)=>{
    let {username,password} = req.body;
    password = CryptoJS.SHA256(password).toString();
    const excelData = await CredentialModel.findOne({
        where:{
            username,
            password
        }
    });
    if(!excelData){
        res.json({
            error:"No se ha encontrado el usuario"
        })
        return;
    }

    const token = sign(username,password);
    res.json({ 
        username,       
        token
    });
}
export const register = async (req:Request,res:Response)=>{

    try {
        let{username,password} = req.body;
        password = CryptoJS.SHA256(password).toString();
        console.log(username,password)
        const new_user = {
            username,
            password
        }
        const registerUserBuildByReq =  CredentialModel.build(new_user);
        await registerUserBuildByReq.save();
        res.json({        
            msg:"Se ha creado el nuevo usuario"
        });
    } catch (error) {
        res.status(500).json({
            error:'Error en servidor'
        })
    }       
}