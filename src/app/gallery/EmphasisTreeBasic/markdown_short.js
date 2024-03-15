export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = useRef(new Draft());
const newEmphasis = useRef(new Emphasis("value", "max"));

newEmphasis.current.selection(leafRects);

draft.current.layer(ref.current)
        .exclude({"name":["fill"]})
        .augment(newEmphasis.current.getAugs());
`