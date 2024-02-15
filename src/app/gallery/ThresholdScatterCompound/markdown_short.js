export const markdown_short = `onst [xThreshold, setXThreshold] = React.useState(8.3);
const [yThreshold, setYThreshold] = React.useState(8.55);
const [mergeBy, setMergeBy] = useState("symmdiff");

const draft = useRef(new Draft());
const newXThreshold = useRef(new Threshold("Aroma", xThreshold, "leq"));
const newYThreshold = useRef(new Threshold("Flavor", yThreshold, "leq"));

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .augment(merge(newXThreshold.current, newYThreshold.current, mergeBy));
`