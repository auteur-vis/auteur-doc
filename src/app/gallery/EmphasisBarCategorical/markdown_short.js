export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("Country", ["Colombia", "Ethiopia"]);

const style = {"fill":{"fill":"green"}};

newEmphasis.updateStyles(style);

draft.chart(ref.current)
    .selection(bars)
    .x("Country", xScale)
    .y("count", yScale)
    .include({"name":["fill", "opacity"]})
    .augment(newEmphasis.getAugs());
`