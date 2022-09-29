"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hello_1 = require("./hello");
const index_1 = require("./index");
const router = (0, express_1.Router)();
router.get('/', index_1.index);
router.get('/hello/:name', hello_1.hello);
exports.default = router;
