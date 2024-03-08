export const js_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newYEmphasis = new Emphasis("City", "New York");

const styles = {"stroke": {"stroke": (d, i) => colorScale(d[0].City), "stroke-width": "3px"}};

newYEmphasis.updateStyles(styles);

draft.layer("#svg")
    .selection(lines)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .include({"name":["stroke"]})
    .augment(newYEmphasis.getAugs());
`