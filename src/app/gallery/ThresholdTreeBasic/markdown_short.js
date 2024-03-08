export const markdown_short = `import { Draft, Threshold } from "auteur";

const chart = useRef(new Draft());

const [threshold, setThreshold] = useState(9930)
const newThreshold = useRef(new Threshold("value", threshold, "geq"));

chart.current.layer(ref.current)
        .selection(leafRects)
        .exclude({"name":["fill"]})
        .augment(newThreshold.current.getAugs());
`