export const markdown_short = `let colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
.domain(d3.extent(data, d => d["Flavor"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

newEmphasis.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["text"]})
            .augment(newEmphasis.current.getAugs());
`