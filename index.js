import { parse } from "csv-parse";
import { createReadStream } from "node:fs";

const habitableExoplanets = [];

const parser = parse({
  columns: true,
  comment: "#",
});

const isHabitableExoplanet = (exoplanet) =>
  exoplanet.koi_disposition === "CONFIRMED" &&
  exoplanet.koi_insol > 0.36 &&
  exoplanet.koi_insol < 1.1 &&
  exoplanet.koi_prad < 1.6;

createReadStream("kepler_data.csv")
  .pipe(parser)
  .on("data", (chunk) => {
    if (isHabitableExoplanet(chunk)) habitableExoplanets.push(chunk);
  })
  .on("error", (err) => console.error(err))
  .on("end", () => {
    console.log(habitableExoplanets.map((exoplanet) => exoplanet.kepler_name));
    console.log(`We found ${habitableExoplanets.length} habitable exoplanets`);
  });
