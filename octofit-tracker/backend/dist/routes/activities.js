"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const utils_1 = require("./utils");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json({
        message: 'Activities route',
        ...(0, utils_1.getApiMetadata)(),
        endpoint: '/api/activities/',
        activities
    });
});
exports.default = router;
