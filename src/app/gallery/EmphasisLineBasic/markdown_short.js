export const markdown_short = `const draft = useRef(new Draft());
const newYEmphasis = useRef(new Emphasis("City", yValue));

const styles = {"stroke": {"stroke": (d, i) => colorScale(d[0].City), "stroke-width": "3px"}};

newYEmphasis.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(lines)
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name":["label", "regression", "fill", "opacity", "text"]})
            .augment(newYEmphasis.current.getAugs());
`