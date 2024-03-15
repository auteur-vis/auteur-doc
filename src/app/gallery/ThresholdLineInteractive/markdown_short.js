export const markdown_short = `import { Draft, Threshold } from "auteur";

const [yThreshold, setYThreshold] = React.useState(8);

const draft = useRef(new Draft());
const newYThreshold = useRef(new Threshold("AverageTemperature", yThreshold, "geq"));

const styles = {"stroke": {"stroke": (d, i) => colorScale(d[0].City), "stroke-width": "2px"}};

newYThreshold.current.selection(lines).updateStyles(styles);

draft.current.layer(ref.current)
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name":["fill"]})
            .augment(newYThreshold.current.getAugs());
`