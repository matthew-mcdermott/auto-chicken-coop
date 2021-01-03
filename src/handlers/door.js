import * as utils from "./door.utils";
import { getSunInfoForDate } from "../http";

const MS_IN_A_MIN = 60000;

let doorUpTime = null;
let doorDownTime = null;

let doorUpTimeout = null;
let doorDownTimeout = null;

let checkInterval = null;

export async function startDoorControl() {
    console.log(`Fetching sun cycle times and starting timeouts for first run.`);
    await setDoorTimesForToday();
    resetDoorTimeouts();
    console.log(`Cycle times set. Door up time: ${doorUpTime}. Door down time: ${doorDownTime}.`)
    console.log(`Starting check interval every ${process.env.CHECK_INTERVAL_MINS} minutes.`)
    checkInterval = setInterval(async () => {
        console.log(`Check interval loop running...`)
        if (doorUpTime === null || doorDownTime === null) {
            console.log(`Sun cycle times were empty, Let's get sun cycle times from API.`)
            await setDoorTimesForToday();
            console.log(`Set door up time: ${doorUpTime}. Set door down time: ${doorDownTime}`)
            resetDoorTimeouts();
        }
        if (utils.isItAfterIsoTime(doorDownTime)) {
            console.log(`It is after door down time. Renewing sun cycle times for tomorrow.`)
            await setDoorTimesForTomorrow();
            console.log(`Set door up time: ${doorUpTime}. Set door down time: ${doorDownTime}`)
            resetDoorTimeouts();
        }

    }, process.env.CHECK_INTERVAL_MINS*MS_IN_A_MIN);
    // calculate ms until door open and ms until door close based on sunrise and sunset (ignore negative times.)
    // settimeouts to schedule call for door up and door down for the day.
}

async function setDoorTimesForToday() {
    const todaySunInfo = await getSunInfoForDate(
        utils.getTodaysDate()
    );
    doorUpTime = todaySunInfo.sunrise;
    doorDownTime = todaySunInfo.sunset;
}

async function setDoorTimesForTomorrow() {
    const tomorrowSunInfo = await getSunInfoForDate(
        utils.getTomorrowsDate()
    );
    doorUpTime = tomorrowSunInfo.sunrise;
    doorDownTime = tomorrowSunInfo.sunset;
}

function resetDoorTimeouts() {
    clearTimeouts();
    const msTilDoorUp = utils.calculateMsToIsoDate(doorUpTime)
    const msTilDoorDown = utils.calculateMsToIsoDate(doorDownTime)
    doorUpTimeout = setTimeout(utils.moveDoorUp, msTilDoorUp);
    doorDownTimeout = setTimeout(utils.moveDoorDown, msTilDoorDown);
}

function clearTimeouts() {
    if (doorUpTimeout) {
        clearTimeout(doorUpTimeout);        
    }
    if (doorDownTimeout) {
        clearTimeout(doorDownTimeout);
    }
}

process.on("SIGINT", function () {
    clearTimeouts();
    clearInterval(checkInterval);
})