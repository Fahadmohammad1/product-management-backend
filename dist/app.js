"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api", routes_1.default);
app.use("*", (req, res) => {
    res.send({
        success: false,
        message: "Route not found",
    });
});
app.get("/", (req, res) => {
    res.send("Working fine");
});
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
