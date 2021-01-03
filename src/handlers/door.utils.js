import { gpioDoorDown, gpioDoorUp } from "../gpios"

export function isItAfterIsoTime(dateIsoString) {
    return new Date(dateIsoString) < new Date();
}

export function getTodaysDate() {
    return new Date().toLocaleDateString();
}

export function getTomorrowsDate(){
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString()
  };

export function calculateMsToIsoDate(date) {
    return new Date(date) - new Date();
}

export function moveDoorDown() {
    gpioDoorUp.digitalWrite(1);
    gpioDoorDown.digitalWrite(0);
}

export function moveDoorUp() {
    gpioDoorUp.digitalWrite(0);
    gpioDoorDown.digitalWrite(1);
}