export const markdown_short = `import { Draft, Regression } from "auteur";

const draft = useRef(new Draft());
const regression = useRef(new Regression());

const style = {"regression":{"transform":${"`"}translate(${"$"}{xScale.bandwidth()/2}, 0)${"`"}}};

regression.current.selection(bars).updateStyles(style);

draft.current.layer(ref.current)
            .x("month", xScale)
            .y("AverageTemperature", yScale)
            .augment(regression.current.getAugs());
`