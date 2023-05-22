"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.removedData = exports.addData = exports.getExcelData = exports.getExcellFile = void 0;
const excel_data_model_1 = __importDefault(require("../models/excel_data.model"));
const node_1 = __importDefault(require("read-excel-file/node"));
const fs_1 = __importDefault(require("fs"));
const user_files_model_1 = __importDefault(require("../models/user_files.model"));
const getExcellFile = (file, username, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cont_general = 0; //se usa para omitir cabeceras del xml
    let cont_cells = 0;
    const excelData = yield excel_data_model_1.default.max('idfile');
    console.log("EXCELDATA", excelData);
    let id = 0;
    if (excelData != undefined)
        id = Number(excelData) + 1;
    console.log("NEXTID", id);
    yield (0, node_1.default)(fs_1.default.createReadStream(file.path)).then((rows) => __awaiter(void 0, void 0, void 0, function* () {
        for (let row of rows) {
            if (cont_general > 0) {
                cont_cells = 0;
                const row_to_save = {
                    user_id: "",
                    username: "",
                    date: "",
                    punchin: "",
                    punchout: "",
                    idfile: -1
                };
                for (let cell of row) {
                    switch (cont_cells) {
                        case 0:
                            row_to_save.user_id = cell;
                            break;
                        case 1:
                            row_to_save.username = cell;
                            break;
                        case 2:
                            row_to_save.date = cell;
                            break;
                        case 3:
                            row_to_save.punchin = cell;
                            break;
                        case 4:
                            row_to_save.punchout = cell;
                            break;
                    }
                    cont_cells += 1;
                }
                row_to_save.idfile = id;
                const excelData = excel_data_model_1.default.build(row_to_save);
                yield excelData.save();
            }
            cont_general = cont_general + 1;
        }
        const userData = {
            idfile: -1,
            username: ""
        };
        userData.idfile = id;
        userData.username = username;
        const userfiles = user_files_model_1.default.build(userData);
        yield userfiles.save();
    }));
    res.json({
        id
    });
});
exports.getExcellFile = getExcellFile;
const getExcelData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ID QUERY GET", req.query.id);
    const excelData = yield excel_data_model_1.default.findAll({
        where: {
            idfile: req.query.id
        }
    });
    res.json({
        excelData
    });
});
exports.getExcelData = getExcelData;
const addData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const excelData = excel_data_model_1.default.build(body);
        yield excelData.save().then((excel) => {
            console.log((excel.dataValues.idexceldata));
            res.json({
                msg: 'Se ha agregado de forma éxitosa',
                id: excel.dataValues.idexceldata
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error en servidor'
        });
    }
});
exports.addData = addData;
const removedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const excelData = yield excel_data_model_1.default.findByPk(id);
        if (!excelData) {
            return res.status(404).json({
                error: "No existe este registro"
            });
        }
        yield excelData.destroy();
        res.json({
            msg: "Se ha eliminado de forma correcta"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error: "Error al actualizar"
        });
    }
});
exports.removedData = removedData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    console.log(req.params);
    try {
        console.log("Searching: ", id);
        const excelData = yield excel_data_model_1.default.findByPk(id);
        console.log(excelData);
        if (!excelData) {
            return res.status(404).json({
                error: "No existe este registro"
            });
        }
        yield excelData.update(body);
        res.json({
            msg: "Se ha actualizado el registro"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error: "Error al actualizar"
        });
    }
});
exports.updateData = updateData;
//# sourceMappingURL=excel_data.controller.js.map