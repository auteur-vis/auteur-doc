export const markdown_short = `import { Draft, Threshold } from "auteur";

const chart = useRef(new Draft());

const [threshold, setThreshold] = useState(150000);
const newThreshold = useRef(new Threshold("value", threshold, "geq"));

newThreshold.current.selection(arcs);

chart.current.layer(ref.current)
		.exclude({"name":["fill"]})
		.augment(newThreshold.current.getAugs());
`