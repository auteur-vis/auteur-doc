export const markdown_short = `import { Draft, Emphasis } from "auteur";

const chart = useRef(new Draft());
const newEmphasis = useRef(new Emphasis("value", "max"));

chart.current.layer(ref.current)
	.selection(arcs)
	.exclude({"name":["fill"]})
	.augment(newEmphasis.current.getAugs());
`