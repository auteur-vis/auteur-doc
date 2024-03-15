export const markdown_short = `import { Draft, Range } from "auteur";

const draft = useRef(new Draft());

const [maxThreshold, setMaxThreshold] = React.useState(8.5);
const [minThreshold, setMinThreshold] = React.useState(8);
const newRange = useRef(new Range("Flavor", [minThreshold, maxThreshold], "closed", style));

newRange.current.selection(bars);

let newAugs = newRange.current.getAugs();

draft.current.layer(ref.current)
            .x("FIELD1", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label", "regression", "text"]})
            .augment(newAugs);
`