export const markdown_short = `import { Draft, Range } from "auteur";

const range = new Range("Flavor", [6.5, 7.5]);

let colorScale = d3.scaleSequential(d3.interpolateTurbo)
    .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {
    "fill": d => colorScale(d.Aroma) }};

range.selection(scatterpoints).updateStyles(styles);

const draft = new Draft();
draft.layer(ref.current)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .include({"name":["rect", "fill", "stroke"]})
    .augment(range.getAugs());
`