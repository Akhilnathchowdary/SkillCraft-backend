"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const users_1 = require("./routers/users");
const instructors_1 = require("./routers/instructors");
const courses_1 = require("./routers/courses");
const coursefiles_1 = require("./routers/coursefiles");
const ratings_1 = require("./routers/ratings");
const notifications_1 = require("./routers/notifications");
const usercourses_1 = require("./routers/usercourses");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = config_1.CONFIG.PORT;
const publicFolder = path_1.default.join(process.cwd(), "public");
app.use(express_1.default.static(publicFolder));
const foldersToCreate = ["videos", "pdfs"];
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.authenticate();
            console.log("Connection has been established successfully.");
            if (config_1.CONFIG.DB_SYNC) {
                yield db_1.default.sync({ alter: true });
                console.log("Database synchronized");
            }
            if (!fs_1.default.existsSync(publicFolder)) {
                fs_1.default.mkdirSync(publicFolder);
            }
            for (const folder of foldersToCreate) {
                const folderPath = path_1.default.join(publicFolder, folder);
                if (!fs_1.default.existsSync(folderPath)) {
                    fs_1.default.mkdirSync(folderPath);
                }
            }
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
startServer();
app.use("/users", users_1.userRouter);
app.use("/instructors", instructors_1.instructorRouter);
app.use("/courses", courses_1.courseRouter);
app.use("/coursefiles", coursefiles_1.courseFileRouter);
app.use("/ratings", ratings_1.ratingRouter);
app.use("/notifications", notifications_1.notificationRouter);
app.use("/usercourses", usercourses_1.userCourseRouter);
