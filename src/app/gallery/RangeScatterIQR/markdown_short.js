export const markdown_short = `import { Draft, Range } from "auteur";

const draft = useRef(new Draft());
const newRange = useRef(new Range("Flavor", ["Q1", "Q3"], "closed", style));

newRange.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["opacity", "regression", "label"]})
            .augment(newRange.current.getAugs());
`