import "dotenv/config"
import { door } from "./src/gpios"

door.digitalWrite(1);
