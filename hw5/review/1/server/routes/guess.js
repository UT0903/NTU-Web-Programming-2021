import express from "express";
import getNumber from "../core/getNumber";
import { logger } from "../server";
import moment from "moment";

const router = express.Router();

function roughScale(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
    return NaN;
}

// Just call getNumber(true) to generate a random number for guessing game
router.post("/start", (_, res) => {
    const number = getNumber(true);
    try {
        logger.info(
            "start number=" + number + " " + moment().format("YYYY-MM-DD-HH-mm-ss")
        );
    } catch (error) {
        logger.error(
            "error" + error + " " + moment().format("YYYY-MM-DD-HH-mm-ss")
        );
    }

    res.json({ msg: number });
});

router.get("/guess", (req, res) => {
    const number = getNumber();
    const guessed = roughScale(req.query.number);

    // check if NOT a num or not in range [1,100]
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(400).send({ msg: "Not a legal number." });
        logger.error(
            "guess " + guessed + " " + moment().format("YYYY-MM-DD-HH-mm-ss")
        );
    } else {
        // TODO: check if number and guessed are the same,
        // and response with some hint "Equal", "Bigger", "Smaller"
        logger.info(
            "guess " + guessed + " " + moment().format("YYYY-MM-DD-HH-mm-ss")
        );
        if (number === guessed) {
            res.json({ msg: "Equal" });
        } else if (number > guessed) {
            res.json({ msg: `Guess Bigger` });
        } else {
            res.json({ msg: `Guess Smaller` });
        }
    }
});

// TODO: add router.post('/restart',...)
router.post("/restart", (_, res) => {
    const number = getNumber(true);
    try {
        logger.info("end-game");
        logger.info(
            "restart number=" + number + " " + moment().format("YYYY-MM-DD-HH-mm-ss")
        );
    } catch (error) {
        logger.error(
            "error" + error + " " + moment().format("YYYY-MM-DD-HH-mm-ss")
        );
    }

    res.json({ msg: "The game has restarted." });
});

export default router;