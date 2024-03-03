export const markdown_short = `import { Draft, Threshold } from "auteur";

const [xThreshold, setXThreshold] = React.useState(new Date(2006, 3, 10));

const draft = useRef(new Draft());
const newXThreshold = useRef(new Threshold("date", xThreshold, "eq"));

const styles = {"line": {"stroke": (d, i) => "red", "stroke-width": "2px"}};

newXThreshold.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(lines)
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .include({"name":["line"]})
            .augment(newXThreshold.current.getAugs());
`