export const markdown_short = `import { Draft, Range } from "auteur";

const range = new Range("count", [25, 50]);

const styles = {"stroke": {"stroke": "red", "stroke-width": "2px"}};
range.selection(groups).updateStyles(styles);

const draft = new Draft();

draft.layer(ref.current)
    .x("country", xScale)
    .y("count", yScale)
    .include({"name":["stroke", "opacity"]})
    .augment(range.getAugs());
`