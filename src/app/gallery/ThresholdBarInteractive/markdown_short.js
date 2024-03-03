export const markdown_short = `import { Draft, Threshold } from "auteur";

const [barThreshold, setBarThreshold] = React.useState(150);
const [barOperation, setBarOperation] = useState("leq");

const draft = useRef(new Draft());
const newBarThreshold = useRef(new Threshold("count", barThreshold, barOperation));

draft.current.chart(ref.current)
            .selection(bars)
            .x("Country", xScale)
            .y("count", yScale)
            .exclude({"name":["label", "regression", "fill", "stroke"]})
            .augment(newBarThreshold.current.getAugs());
`