export const markdown_short = `const [xThreshold, setXThreshold] = React.useState(new Date(2006, 3, 10));

const draft = useRef(new Draft());
const newXThreshold = useRef(new Threshold("date", xThreshold, "geq"));

const styles = {"line": {"stroke": (d, i) => "red", "stroke-width": "2px"}};

newXThreshold.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(lines)
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"rank":1})
            .augment(newXThreshold.current.getAugs());
`