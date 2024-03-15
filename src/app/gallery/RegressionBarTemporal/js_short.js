export const js_short = `import { Draft, Regression } from "auteur";

const draft = new Draft();
const regression = new Regression();

const style = {"regression":{"transform":${"`"}translate(${"$"}{xScale.bandwidth()/2}, 0)${"`"}}};

regression.selection(bars).updateStyles(style);

draft.layer("#svg")
  .x("month", xScale)
  .y("AverageTemperature", yScale)
  .augment(regression.getAugs());
`