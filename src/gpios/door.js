import pigpio from "pigpio";

const Gpio = pigpio.Gpio; 
export const gpioDoorUp = new Gpio(process.env.GPIO_DOOR_UP, {mode: Gpio.OUTPUT});
export const gpioDoorDown = new Gpio(process.env.GPIO_DOOR_DOWN, {mode: Gpio.OUTPUT});

