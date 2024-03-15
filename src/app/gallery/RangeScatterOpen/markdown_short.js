export const markdown_short = `import { Draft, Range } from "auteur";

const [maxThreshold, setMaxThreshold] = React.useState(8);
const [minThreshold, setMinThreshold] = React.useState(6.5);

const style = {"rect":{"fill":"#edcf7b", "opacity": 0.2}};

const draft = useRef(new Draft());
const newRange = useRef(new Range("Aroma", [minThreshold, maxThreshold], "open", style));

newRange.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .augment(newRange.current.getAugs());
`