export const markdown_short = `import { Draft, Range } from "auteur";

const [maxXThreshold, setMaxXThreshold] = React.useState(8);
const [minXThreshold, setMinXThreshold] = React.useState(7.5);

const [maxYThreshold, setMaxYThreshold] = React.useState(7.5);
const [minYThreshold, setMinYThreshold] = React.useState(6.5);

const draft = useRef(new Draft());
const newXRange = useRef(new Range("Aroma", [minXThreshold, maxXThreshold], "open"));
const newYRange = useRef(new Range("Flavor", [minYThreshold, maxYThreshold], "closed"));

newXRange.current.selection(scatterpoints);
newYRange.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["regression", "label", "text"]})
            .augment(newXRange.current.union(newYRange.current));
`