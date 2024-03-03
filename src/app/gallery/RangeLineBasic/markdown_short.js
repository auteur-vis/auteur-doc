export const markdown_short = `import { Draft, Range } from "auteur";

const newRange = useRef(new Range("AverageTemperature", [minThreshold, maxThreshold], "closed"));

const draft = useRef(new Draft());

draft.current.chart(ref.current)
            .selection(lines)
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name": ["fill", "label"]})
            .augment(newRange.current.getAugs());
`