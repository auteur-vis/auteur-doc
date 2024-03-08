export const markdown_short = `import { Draft, Range } from "auteur";

const chart = useRef(new Draft());

const [minVal, setMinVal] = useState(9930);
const [maxVal, setMaxVal] = useState(12000);
const newRange = useRef(new Range("value", [minVal, maxVal]));

chart.current.layer(ref.current)
    .selection(leafRects)
    .exclude({"name":["fill"]})
    .augment(newRange.current.getAugs());
`