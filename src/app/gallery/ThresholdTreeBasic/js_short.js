export const js_short = `import { Draft, Threshold } from "auteur";

const chart = new Draft();

let threshold = 9930;
const newThreshold = new Threshold("value", threshold, "geq");

newThreshold.selection(leafRects);

chart.layer("#svg")
      .exclude({"name":["fill"]})
      .augment(newThreshold.getAugs());
`