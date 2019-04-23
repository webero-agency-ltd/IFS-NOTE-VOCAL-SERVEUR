"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serveur_1 = __importDefault(require("./serveur"));
//@TODO : on change le port si on fait npm run dev ou prod
var serv = new serveur_1.default(3000);
serv.start();
