export const markdown_short = `import { Draft, Range } from "auteur";

const newRange = useRef(new Range("date", [minThreshold, maxThreshold], "closed"));

newRange.current.selection(lines);

const draft = new Draft();

draft.layer(ref.current)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .exclude({"name": ["text", "opacity"]})
    .augment(newRange.current.getAugs());
`