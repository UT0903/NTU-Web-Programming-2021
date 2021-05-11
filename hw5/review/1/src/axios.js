import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });

const handleError = (error, number) => {
    if (error.response) {
        if (error.response.data.msg === "Not a legal number.") {
            throw new Error(`"${number}" is not a valid number (1 - 100)`);
        } else {
            throw new Error("Error occur on the server side");
        }
    } else if (error.request) {
        throw new Error("Error: cannot connect to server");
    } else {
        throw new Error("Error: cannot send the request");
    }
};
const startGame = async() => {
    try {
        const {
            data: { msg },
        } = await instance.post("/start");

        return msg;
    } catch (error) {
        handleError(error);
    }
};

const guess = async(number) => {
    // TODO: Change this to catch error
    // The error message should be: Error: "xx" is not a valid number (1 - 100)
    try {
        const {
            data: { msg },
        } = await instance.get("/guess", { params: { number } });
        return msg;
    } catch (error) {
        handleError(error, number);
    }
};

const restart = async() => {
    try {
        const {
            data: { msg },
        } = await instance.post("/restart");

        return msg;
    } catch (error) {
        handleError(error);
    }
};

export { startGame, guess, restart };