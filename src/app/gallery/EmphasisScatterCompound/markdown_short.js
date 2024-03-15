export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = useRef(new Draft());

const [emphVal, setEmphVal] = React.useState(6);
const [emphVar, setEmphVar] = React.useState("Sweetness");

const [emphCatVal, setEmphCatVal] = React.useState("Other");
const [emphCatVar, setEmphCatVar] = React.useState("Variety");

const newEmphasis = useRef(new Emphasis(emphVar, emphVal));
const newCatEmphasis = useRef(new Emphasis(emphCatVar, emphCatVal));

newEmphasis.current.selection(scatterpoints);
newCatEmphasis.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label", "regression"]})
            .augment(newEmphasis.current.intersect(newCatEmphasis.current));
`