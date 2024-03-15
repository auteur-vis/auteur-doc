export const markdown_short = `import { Draft, Threshold } from "auteur";

const [xThreshold, setXThreshold] = React.useState(8.3);
const [yThreshold, setYThreshold] = React.useState(8.55);
const [mergeBy, setMergeBy] = useState("symmdiff");

const draft = useRef(new Draft());
const newXThreshold = useRef(new Threshold("Aroma", xThreshold, "leq"));
const newYThreshold = useRef(new Threshold("Flavor", yThreshold, "leq"));

newXThreshold.current.selection(scatterpoints);
newYThreshold.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .augment(merge(newXThreshold.current, newYThreshold.current, mergeBy));
`