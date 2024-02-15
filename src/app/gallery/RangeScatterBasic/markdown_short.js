export const markdown_short = `const range = new Range("Flavor", [6.5, 7.5]);

let colorScale = d3.scaleSequential(d3.interpolateTurbo)
    .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {
    "fill": d => colorScale(d.Aroma) }};

range.updateStyles(styles);

const draft = new Draft();
draft.chart(ref.current)
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .include({"name":["rect", "fill", "stroke"]})
    .augment(range.getAugs());
`