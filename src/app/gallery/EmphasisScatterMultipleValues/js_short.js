export const js_short = `import { Draft, Emphasis } from "auteur";

let emphVal1 = "Other";
let emphVal2 = "Bourbon";

const draft = new Draft();
const newEmphasis = new Emphasis("Variety", [emphVal1, emphVal2]);

let colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
                    .domain(d3.extent(data, d => d["Flavor"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

newEmphasis.updateStyles(styles);

draft.layer("#svg")
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label", "regression"]})
            .augment(newEmphasis.getAugs());
`