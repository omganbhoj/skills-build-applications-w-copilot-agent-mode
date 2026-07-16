"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = require("../models/leaderboard");
const utils_1 = require("./utils");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({}).sort({ rank: 1 }).lean();
    res.json({
        message: 'Leaderboard route',
        ...(0, utils_1.getApiMetadata)(),
        endpoint: '/api/leaderboard/',
        leaderboard
    });
});
exports.default = router;
