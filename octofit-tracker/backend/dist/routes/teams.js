"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const utils_1 = require("./utils");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.Team.find({}).populate('members').populate('captain').lean();
    res.json({
        message: 'Teams route',
        baseUrl: (0, utils_1.getBaseUrl)(),
        endpoint: '/api/teams/',
        teams
    });
});
exports.default = router;
