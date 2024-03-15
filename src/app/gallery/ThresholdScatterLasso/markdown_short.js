export const markdown_short = `import { Draft, Threshold } from "auteur";

const [yThreshold, setYThreshold] = React.useState(7.25);

const draft = useRef(new Draft());
const newYThreshold = useRef(new Threshold("Flavor", yThreshold, "geq"));

let colorScale = d3.scaleSequential(d3.interpolateMagma)
                    .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

newYThreshold.current.updateStyles(styles);

draft.current.layer(ref.current)
			.selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["regression", "label"]})
            .augment(newYThreshold.current.getAugs());
`