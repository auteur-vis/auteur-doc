export const markdown_short = `import { Draft, Emphasis } from "auteur";

const [emphVal, setEmphVal] = React.useState(8);
const [emphVar, setEmphVar] = React.useState("Sweetness");

const draft = useRef(new Draft());
const newEmphasis = useRef(new Emphasis(emphVar, emphVal));

draft.current.layer(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["regression", "label"]})
            .augment(newEmphasis.current.getAugs());
`