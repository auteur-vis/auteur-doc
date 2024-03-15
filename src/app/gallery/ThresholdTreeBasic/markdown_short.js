export const markdown_short = `import { Draft, Threshold } from "auteur";

const chart = useRef(new Draft());

const [threshold, setThreshold] = useState(9930)
const newThreshold = useRef(new Threshold("value", threshold, "geq"));

newThreshold.current.selection(leafRects);

chart.current.layer(ref.current)
        .exclude({"name":["fill"]})
        .augment(newThreshold.current.getAugs());
`