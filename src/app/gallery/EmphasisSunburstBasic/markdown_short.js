export const markdown_short = `import { Draft, Emphasis } from "auteur";

const chart = useRef(new Draft());
const newEmphasis = useRef(new Emphasis("value", "max"));

newEmphasis.current.selection(arcs);

chart.current.layer(ref.current)
	.exclude({"name":["fill"]})
	.augment(newEmphasis.current.getAugs());
`