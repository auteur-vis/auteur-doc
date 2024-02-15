export const markdown_short = `const [yThreshold, setYThreshold] = React.useState(8);

const draft = useRef(new Draft());
const newYThreshold = useRef(new Threshold("Aroma", yThreshold, "geq"));

let colorScale = d3.scaleSequential(d3.interpolateViridis)
                    .domain(d3.extent(data, d => d["Flavor"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

newYThreshold.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Flavor", xScale)
            .y("Aroma", yScale)
            .augment(newYThreshold.current.getAugs());
`