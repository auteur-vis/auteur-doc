export const js_short = `import { Draft, LocalData } from "auteur";

const draft = new Draft();

const data = coffee.slice(0, 110);
const local = coffee.slice(110, 120);
const newLocal = new LocalData(local);

let sizeScale = d3.scaleLinear()
                  .domain(d3.extent(local, d => d["Flavor"]))
                  .range([3, 10]);

const styles = {"mark": {"fill":"none", "stroke": "red", "r": (d, i) => sizeScale(d.Flavor)}};

newLocal.updateStyles(styles);

draft.chart("#svg")
  .selection(scatterpoints)
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .exclude()
  .augment(newLocal.getAugs());
`