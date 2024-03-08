export const markdown_short = `import { Draft, Emphasis } from "auteur";

const [emphVal1, setEmphVal1] = React.useState("Other");
const [emphVal2, setEmphVal2] = React.useState("Bourbon");

const newEmphasis = useRef(new Emphasis("Variety", [emphVal1, emphVal2]));

let colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
					.domain(d3.extent(data, d => d["Flavor"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

newEmphasis.current.updateStyles(styles);

draft.current.layer(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label", "regression"]})
            .augment(newEmphasis.current.getAugs());
`