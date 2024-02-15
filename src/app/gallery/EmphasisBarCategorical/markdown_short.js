export const markdown_short = `const style = {"fill":{"fill":"green"}};

newEmphasis.current.updateStyles(style);

draft.current.chart(ref.current)
            .selection(bars)
            .x("Country", xScale)
            .y("count", yScale)
            .exclude({"name":["stroke", "text", "label", "regression"]})
            .augment(newEmphasis.current.getAugs());
`