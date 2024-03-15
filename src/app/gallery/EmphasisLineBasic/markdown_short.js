export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newYEmphasis = new Emphasis("City", "New York");

const styles = {"stroke": {"stroke": (d, i) => colorScale(d[0].City), "stroke-width": "3px"}};

newYEmphasis.selection(lines)
			.updateStyles(styles);

draft.layer(ref.current)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .include({"name":["stroke"]})
    .augment(newYEmphasis.getAugs());
`