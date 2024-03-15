export const markdown_short = `import { Draft, Threshold } from "auteur";

const [yThreshold, setYThreshold] = React.useState(8);

const draft = useRef(new Draft());
const newYThreshold = useRef(new Threshold("Aroma", yThreshold, "geq"));

let colorScale = d3.scaleSequential(d3.interpolateViridis)
                    .domain(d3.extent(data, d => d["Flavor"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

newYThreshold.current.selection(scatterpoints).updateStyles(styles);

draft.current.layer(ref.current)
            .x("Flavor", xScale)
            .y("Aroma", yScale)
            .exclude({"name":["label"]})
            .augment(newYThreshold.current.getAugs());
`