import { Router } from "express";
import { addData, getExcelData, getExcellFile, removedData, updateData } from "../controllers/excel_data.controller";
import multer from 'multer';
import os from 'os';
import { validateToken } from "../lib/JWT";
const router = Router();
const upload = multer({ dest: os.tmpdir() });

router.post('/up_file', validateToken, upload.single('tec'),(req,res)=>{
    const file = req.file; 
    const username = req.body.username   
    console.log(username)
    if(file)
        getExcellFile(file,username,res);
});
router.get('/', validateToken,getExcelData);
router.post('/',validateToken,addData);
router.put('/:id',validateToken, updateData);
router.delete('/:id',validateToken,removedData );

export default router;