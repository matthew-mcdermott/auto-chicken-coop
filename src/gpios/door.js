import pigpio from "pigpio";

const Gpio = pigpio.Gpio; 
export const door = new Gpio(process.env.GPIO_DOOR, {mode: Gpio.OUTPUT});

