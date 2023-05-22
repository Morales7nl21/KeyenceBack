import { Request, Response } from "express"
import Exceldata from "../models/excel_data.model";
import readExcel from 'read-excel-file/node';
import fs from 'fs';   
import Userfiles from "../models/user_files.model";

export const getExcellFile= async (file:Express.Multer.File,username:string,res:Response)=>{

   let cont_general:number = 0; //se usa para omitir cabeceras del xml
   let cont_cells:number=0;
   const excelData = await Exceldata.max('idfile');
   console.log("EXCELDATA", excelData);
   let id = 0;
   if(excelData != undefined)
    id=Number(excelData)+1;
   console.log("NEXTID", id);
   
    await readExcel(fs.createReadStream(file.path)).then(async (rows)=>{
        
        for(let row of rows){
            
            if(cont_general>0){
                cont_cells=0;
                const row_to_save = {
                    user_id:"",
                    username:"",
                    date:"",
                    punchin:"",
                    punchout:"",
                    idfile:-1
                }
                for(let cell of row) {
                    switch(cont_cells){
                        case 0:
                            row_to_save.user_id=(cell as string);
                            break;
                        case 1:
                            row_to_save.username=(cell as string);
                            break;
                        case 2:
                            row_to_save.date=(cell as string);
                            break;
                        case 3:
                            row_to_save.punchin=(cell as string);
                            break;
                        case 4:
                            row_to_save.punchout=(cell as string);
                            break;
                    }                    
                    cont_cells+=1;
                }
                row_to_save.idfile=id;
                const excelData =  Exceldata.build(row_to_save);
                await excelData.save();
               
            }            
            cont_general= cont_general + 1;
        }      
         
        const userData = {
            idfile:-1,
            username:""
        }
        userData.idfile=id;
        userData.username=username;
        const userfiles = Userfiles.build(userData)
        await userfiles.save();
    })
    res.json({
        id
    });
}
export const getExcelData = async (req:Request,res:Response)=>{
    console.log("ID QUERY GET", req.query.id)
    const excelData = await Exceldata.findAll({
        where:{
            idfile:req.query.id
        }
    });
    res.json({        
        excelData
    });
}
export const addData = async (req:Request,res:Response)=>{

    const {body} = req;
    try {

        const excelData =  Exceldata.build(body);
        await excelData.save().then((excel:any)=>{
            console.log((excel.dataValues.idexceldata))
            res.json({
               msg: 'Se ha agregado de forma éxitosa',  
                id:excel.dataValues.idexceldata         
            });
        });
       

        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:'Error en servidor'
        })
    }

}



export const removedData = async (req:Request,res:Response)=>{

    
    const {id} = req.params;
    try {
        const excelData = await Exceldata.findByPk(id); 
        if(!excelData){
            return res.status(404).json({
                error:"No existe este registro"
            })
        }
        await excelData.destroy();  
        res.json({
            msg:"Se ha eliminado de forma correcta"
        }) 
    } catch (error) {
        console.log(error);
        res.json({
            error:"Error al actualizar"
        })
    }
   
}

export const updateData = async (req:Request,res:Response)=>{

    const {body} = req;
    const {id} = req.params;
    console.log(req.params)
    try{
        console.log("Searching: ", id);
        const excelData = await Exceldata.findByPk(id);        
        console.log(excelData);
        if(!excelData){
            return res.status(404).json({
                error:"No existe este registro"
            })
        }
        await excelData.update(body);
        res.json({
            msg:"Se ha actualizado el registro"
        })
    }catch(error){
        console.log(error);
        res.json({
            error:"Error al actualizar"
        })
    }
}