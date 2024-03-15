export const markdown_short = `import { Draft, Range } from "auteur";

const chart = useRef(new Draft());

const [minVal, setMinVal] = useState(9930);
const [maxVal, setMaxVal] = useState(12000);
const newRange = useRef(new Range("value", [minVal, maxVal]));

newRange.current.selection(arcs);

chart.current.layer(ref.current)
    .exclude({"name":["fill"]})
    .augment(newRange.current.getAugs());
`