"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticate = void 0;
var jwt = require('jsonwebtoken');
var userModel_1 = require("../Models/Auth/userModel");
var secret_key = process.env.SECRET_KEY;
var authenticate = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    var token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        var decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
exports.authenticate = authenticate;
var isAdmin = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    var token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        var decoded = jwt.verify(token, secret_key);
        if (decoded && decoded.role === userModel_1.UserRole.Admin) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(403).json({ error: 'Access denied. Only admins are allowed.' });
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
exports.isAdmin = isAdmin;
