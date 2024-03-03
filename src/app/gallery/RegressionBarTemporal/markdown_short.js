export const markdown_short = `import { Draft, Regression } from "auteur";

const draft = useRef(new Draft());
const regression = useRef(new Regression());

draft.current.chart(ref.current)
            .selection(bars)
            .x("month", xScale)
            .y("AverageTemperature", yScale)
            .exclude({"name":["stroke", "text", "label", "regression"]})
            .augment(regression.current.getAugs());
`