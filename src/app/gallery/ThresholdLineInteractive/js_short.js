export const js_short = `import { Draft, Threshold } from "auteur";

let yThreshold = 8;

const draft = new Draft();
const newYThreshold = new Threshold("AverageTemperature", yThreshold, "geq");

const styles = {"stroke": {"stroke": (d, i) => colorScale(d[0].City), "stroke-width": "2px"}};

newYThreshold.updateStyles(styles);

draft.chart("#svg")
  .selection(lines)
  .x("date", xScale)
  .y("AverageTemperature", yScale)
  .exclude({"name":["label", "regression", "text", "fill"]})
  .augment(newYThreshold.getAugs());
`