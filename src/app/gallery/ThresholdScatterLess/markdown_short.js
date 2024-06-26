export const markdown_short = `import { Draft, Threshold } from "auteur";

const [yThreshold, setYThreshold] = React.useState(8);

const draft = useRef(new Draft());
const newYThreshold = useRef(new Threshold("Flavor", yThreshold, "leq"));

let colorScale = d3.scaleSequential(d3.interpolateViridis)
                    .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

newYThreshold.current.selection(scatterpoints).updateStyles(styles);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .include({"name":["line", "fill", "stroke", "opacity", "text"]})
            .augment(newYThreshold.current.getAugs());
`