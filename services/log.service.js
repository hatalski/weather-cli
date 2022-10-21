import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

export const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        No parameters - show weather
        -h - show help
        -s [CITY] add city
        -t [API_KEY] add auth API token
        `
    );
}

export const printForecast = (forecast) => {
    console.log(dedent`${chalk.bgGreenBright(' WEATHER for ' + forecast.name)}
        Temperature is ${forecast.main.temp} celcius 
        Feels like ${forecast.main.feels_like} celcius
        Pressure is ${forecast.main.pressure}
        Humidity is ${forecast.main.humidity}
    `);
    forecast.main.temp;
}