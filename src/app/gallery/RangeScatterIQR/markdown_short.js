export const markdown_short = `import { Draft, Range } from "auteur";

const draft = useRef(new Draft());
const newRange = useRef(new Range("Flavor", ["Q1", "Q3"], "closed", style));

draft.current.chart(ref.current)
                .layer("#augmentations")
                .selection(scatterpoints)
                .x("Aroma", xScale)
                .y("Flavor", yScale)
                .exclude({"name":["opacity", "regression", "label"]})
                .augment(newRange.current.getAugs());
`