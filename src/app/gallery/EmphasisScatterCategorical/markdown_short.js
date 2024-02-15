export const markdown_short = `const draft = useRef(new Draft());
const newEmphasis = useRef(new Emphasis(emphVar, emphVal));

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["text"]})
            .augment(newEmphasis.current.getAugs());
`