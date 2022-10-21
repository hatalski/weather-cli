#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printForecast } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('The token has not been sent.');
        return;
    }
    try {
        await saveKeyValue('token', token);
        printSuccess('Token saved.')
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('The city has not been specified.');
        return;
    }
    try {
        await saveKeyValue('city', city);
        printSuccess('City saved.');
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        printForecast(await getWeather())
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Incorrect city.');
        } else if (e?.response?.status == 401) {
            printError('Incorrect token.');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        // output help info
        printHelp();
    } else if (args.s) {
        saveCity(args.s);
    } else if (args.t) {
        saveToken(args.t);
    } else {
        getForecast();
    }
}

initCLI();