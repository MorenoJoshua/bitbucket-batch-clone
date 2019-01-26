#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var axios_1 = require("axios");
var gitclone = require("git-clone");
var app = function () { return __awaiter(_this, void 0, void 0, function () {
    var username, password, teamName, responses, _a, _b, _c, bbinfo, repos, reposToCloneQuestion, reposArr, _i, reposArr_1, repo;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                username = {
                    name: 'username',
                    type: "input",
                    message: "Please input your Bitbucket Username (Leave blank if you don't need authentication)"
                };
                password = {
                    name: 'password',
                    type: "password",
                    message: "Please input your Bitbucket Password",
                    verify: function (hash) { return !!hash.match(/.+/) ? true : 'Please enter a password'; }
                };
                teamName = {
                    name: 'teamname',
                    type: "input",
                    message: "Please input a Team/User name",
                    verify: function (hash) { return !!hash.match(/.+/) ? true : 'Please enter a team name or Username'; }
                };
                responses = {};
                _a = [{}, responses];
                return [4 /*yield*/, inquirer.prompt(username)];
            case 1:
                responses = __assign.apply(void 0, _a.concat([_d.sent()]));
                if (!(responses.username && responses.username !== '')) return [3 /*break*/, 3];
                _b = [{}, responses];
                return [4 /*yield*/, inquirer.prompt(password)];
            case 2:
                responses = __assign.apply(void 0, _b.concat([_d.sent()]));
                _d.label = 3;
            case 3:
                _c = [{}, responses];
                return [4 /*yield*/, inquirer.prompt(teamName)];
            case 4:
                responses = __assign.apply(void 0, _c.concat([_d.sent()]));
                bbinfo = {};
                if (!(responses.teamname !== '' && responses.username === '')) return [3 /*break*/, 6];
                return [4 /*yield*/, axios_1.default
                        .get("https://api.bitbucket.org/1.0/users/" + responses.teamname).then(function (r) { return r.data; })
                        .catch(function (e) { return console.warn(e); })];
            case 5:
                bbinfo = _d.sent();
                return [3 /*break*/, 8];
            case 6:
                if (!(responses.teamname != '' && responses.username != '' && responses.password != '')) return [3 /*break*/, 8];
                return [4 /*yield*/, axios_1.default
                        .get("https://api.bitbucket.org/1.0/users/" + responses.teamname, {
                        auth: {
                            password: responses.password,
                            username: responses.username,
                        }
                    }).then(function (r) { return r.data; })
                        .catch(function (e) { return console.warn(e); })];
            case 7:
                bbinfo = _d.sent();
                _d.label = 8;
            case 8:
                repos = bbinfo.repositories;
                reposToCloneQuestion = {
                    name: 'repostoclone',
                    message: 'Please select the repos you want to clone',
                    type: "checkbox",
                    pageSize: 40,
                    choices: repos.map(function (repo) { return repo.name; })
                };
                return [4 /*yield*/, inquirer.prompt(reposToCloneQuestion).catch(function (e) { return console.warn(e); })];
            case 9:
                reposArr = (_d.sent()).repostoclone;
                _i = 0, reposArr_1 = reposArr;
                _d.label = 10;
            case 10:
                if (!(_i < reposArr_1.length)) return [3 /*break*/, 13];
                repo = reposArr_1[_i];
                return [4 /*yield*/, gitclone("https://" + responses.username + ":" + responses.password + "@bitbucket.org/" + responses.teamname + "/" + repo + ".git", 
                    // `https://${responses.username}:${responses.password}@bitbucket.org/${responses.teamname}/${repo}.git`,
                    "./" + repo, {}, console.log("Cloning " + repo + "..."))];
            case 11:
                _d.sent();
                _d.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 10];
            case 13: return [2 /*return*/];
        }
    });
}); };
app();
//# sourceMappingURL=index.js.map