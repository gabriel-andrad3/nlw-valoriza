"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("./controllers/CreateUserController");
var router = express_1.Router();
exports.router = router;
var createUserController = new CreateUserController_1.CreateUserController();
router.post("/users", createUserController.handle);
