"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var pg_1 = require("pg");
var pool = new pg_1["default"].Pool();
var res = await pool.query('SELECT NOW()');
await pool.end();
console.log(res.rows[0].now);
