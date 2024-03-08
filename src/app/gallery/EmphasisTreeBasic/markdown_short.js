export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = useRef(new Draft());
const newEmphasis = useRef(new Emphasis("value", "max"));

draft.current.layer(ref.current)
        .selection(leafRects)
        .exclude({"name":["fill"]})
        .augment(newEmphasis.current.getAugs());
`