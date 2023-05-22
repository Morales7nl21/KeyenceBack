"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const excel_data_controller_1 = require("../controllers/excel_data.controller");
const multer_1 = __importDefault(require("multer"));
const os_1 = __importDefault(require("os"));
const JWT_1 = require("../lib/JWT");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: os_1.default.tmpdir() });
router.post('/up_file', JWT_1.validateToken, upload.single('tec'), (req, res) => {
    const file = req.file;
    const username = req.body.username;
    console.log(username);
    if (file)
        (0, excel_data_controller_1.getExcellFile)(file, username, res);
});
router.get('/', JWT_1.validateToken, excel_data_controller_1.getExcelData);
router.post('/', JWT_1.validateToken, excel_data_controller_1.addData);
router.put('/:id', JWT_1.validateToken, excel_data_controller_1.updateData);
router.delete('/:id', JWT_1.validateToken, excel_data_controller_1.removedData);
exports.default = router;
//# sourceMappingURL=excel_data.route.js.map