export const markdown_short = `import { Draft, Threshold } from "auteur";

const chart = useRef(new Draft());

const [threshold, setThreshold] = useState(150000);
const newThreshold = useRef(new Threshold("value", threshold, "geq"));

chart.current.layer(ref.current)
		.selection(arcs)
		.exclude({"name":["fill"]})
		.augment(newThreshold.current.getAugs());
`