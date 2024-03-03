export const js_short = `import { Draft, Regression } from "auteur";

const draft = new Draft();
const regression = new Regression();

draft.chart("#svg")
  .selection(bars)
  .x("month", xScale)
  .y("AverageTemperature", yScale)
  .exclude({"name":["stroke", "text", "label", "regression"]})
  .augment(regression.getAugs());
`