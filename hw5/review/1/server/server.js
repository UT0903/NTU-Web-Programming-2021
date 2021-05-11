import express from "express";
import cors from "cors";
import path from "path";
import guessRoute from "./routes/guess";
import moment from "moment";

const winston = require("winston");
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// init middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    // logger.info({
    //     message: `${req}`,
    // });
    if (isProduction && req.headers["x-forwarded-proto"] !== "https")
        return res.redirect("https://" + req.headers.host + req.url);
    return next();
});

// define routes
app.use("/api/guess", guessRoute);

const port = process.env.PORT || 4000;
let directory = "";

if (fs.existsSync(`./server/log/${moment().format("YYYY-MM-DD-HH-mm")}.log`)) {
    directory = `./server/log/${moment().format("YYYY-MM-DD-HH-mm-ss")}.log`;
} else {
    directory = `./server/log/${moment().format("YYYY-MM-DD-HH-mm")}.log`;
}

export const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            filename: directory,
        }),
    ],
});

if (isProduction) {
    // set static folder
    const publicPath = path.join(__dirname, "..", "build");

    app.use(express.static(publicPath));

    app.get("*", (_, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

logger.add(
    new winston.transports.Console({
        format: winston.format.simple(),
    })
);