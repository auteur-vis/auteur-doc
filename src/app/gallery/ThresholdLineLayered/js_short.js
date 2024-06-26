export const js_short = `import { Draft, Threshold } from "auteur";

const yThreshold = new Threshold("AverageTemperature", 7, "leq");

const pointStyles = {"stroke": {
                  "stroke": (d) => colorScale(d.City),
                  "stroke-width": "2px"}};

yThreshold.updateStyles(pointStyles)
        .selection(scatterpoints);

const draft = new Draft();

draft.layer("#svg")
  .x("date", xScale)
  .y("AverageTemperature", yScale)
  .exclude({"name":["fill", "text", "regression"]})
  .augment(yThreshold.getAugs());
`