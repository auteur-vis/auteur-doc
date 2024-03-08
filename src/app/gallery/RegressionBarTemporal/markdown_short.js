export const markdown_short = `import { Draft, Regression } from "auteur";

const draft = useRef(new Draft());
const regression = useRef(new Regression());

const style = {"regression":{"transform":${"`"}translate(${"$"}{xScale.bandwidth()/2}, 0)${"`"}}};

regression.current.updateStyles(style);

draft.current.layer(ref.current)
            .selection(bars)
            .x("month", xScale)
            .y("AverageTemperature", yScale)
            .augment(regression.current.getAugs());
`