export const markdown_short = `const range = new Range("count", [25, 50]);

const styles = {"stroke": {"stroke": "red", "stroke-width": "2px"}};
range.updateStyles(styles);

const draft = new Draft();

draft.chart("#svg")
    .selection(groups)
    .x("country", xScale)
    .y("count", yScale)
    .include({"name":["stroke", "opacity"]})
    .augment(range.getAugs());`