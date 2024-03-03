export const markdown_short = `import { Draft, Range } from "auteur";

const newRange = useRef(new Range("date", [minThreshold, maxThreshold], "closed"));

const draft = useRef(new Draft());

draft.current.chart(ref.current)
            .selection(lines)
            .layer("#augmentations")
            .x("date", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name": ["text", "opacity"]})
            .augment(newRange.current.getAugs());
`