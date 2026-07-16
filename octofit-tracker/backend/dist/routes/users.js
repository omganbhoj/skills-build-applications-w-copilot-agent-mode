"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const utils_1 = require("./utils");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json({
        message: 'Users route',
        baseUrl: (0, utils_1.getBaseUrl)(),
        endpoint: '/api/users/',
        users
    });
});
exports.default = router;
