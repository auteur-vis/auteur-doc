export const markdown_short = `const draft = useRef(new Draft());
const regression = useRef(new Regression());

const style = {"fill":{"fill":"green"}, "regression":{"transform":${"`"}translate(${"$"}{xScale.bandwidth()/2}, 0)${"`"}}};

regression.current.updateStyles(style);

draft.current.chart(ref.current)
            .selection(bars)
            .x("month", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name":["stroke", "text", "label", "regression"]})
            .augment(regression.current.getAugs());
`