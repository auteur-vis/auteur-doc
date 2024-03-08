export const js_short = `import { Draft, Threshold } from "auteur";

const chart = new Draft();

let threshold = 9930;
const newThreshold = new Threshold("value", threshold, "geq");

chart.layer("#svg")
      .selection(leafRects)
      .exclude({"name":["fill"]})
      .augment(newThreshold.getAugs());
`