import axios from "axios";
import { oneLineTrim } from "common-tags";

export const http = axios.create({
    baseURL: process.env.HTTP_ENDPOINT_URL,
    timeout: process.env.HTTP_TIMEOUT_SECONDS * 1000,
    headers: {
      "Content-Type": "application/json"
    }
});

export async function getSunInfoForDate(date){
  try {
    const sunInfo = await http.get(
        oneLineTrim`https://api.sunrise-sunset.org/json
        ?lat=${process.env.LATITUDE}
        &lng=${process.env.LONGITUDE}
        &formatted=0
        &date=${date}`
    );
    return {
      "sunrise": sunInfo.data.results.nautical_twilight_begin,
      "sunset": sunInfo.data.results.civil_twilight_end,
    };
  } catch(e) {
    console.log(e);
    throw (e)
  }
};

