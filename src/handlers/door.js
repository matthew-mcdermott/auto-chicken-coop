import { gpioDoorUp, gpioDoorDown } from "../gpios"


export function doorDown() {
    gpioDoorUp.digitalWrite(1);
    gpioDoorDown.digitalWrite(0);
}

export function doorUp() {
    gpioDoorUp.digitalWrite(0);
    gpioDoorDown.digitalWrite(1);
}