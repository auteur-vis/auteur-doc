export const markdown_short = `const draft = useRef(new Draft());
const newRange = useRef(new Range("AverageTemperature", [minThreshold, maxThreshold], "closed"));

const styles = {"line": {"stroke": (d, i) => "red", "stroke-width": "2px"}};

newRange.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(lines)
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name": ["fill"]})
            .augment(newRange.current.getAugs());
`