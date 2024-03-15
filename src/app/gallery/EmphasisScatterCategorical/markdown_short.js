export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = useRef(new Draft());

const [emphVal, setEmphVal] = React.useState("Other");
const [emphVar, setEmphVar] = React.useState("Variety");
const newEmphasis = useRef(new Emphasis(emphVar, emphVal));

newEmphasis.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label", "regression"]})
            .augment(newEmphasis.current.getAugs());
`