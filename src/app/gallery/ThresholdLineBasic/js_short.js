export const js_short = `import { Draft, Threshold } from "auteur";

const xThreshold = new Date(2006, 3, 10);

const draft = new Draft();
const newXThreshold = new Threshold("date", xThreshold, "eq");

const styles = {"line": {"stroke": (d, i) => "red", "stroke-width": "2px"}};

newXThreshold.updateStyles(styles);

draft.chart("#svg")
    .selection(lines)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .include({"name":["line"]})
    .augment(newXThreshold.getAugs());
`