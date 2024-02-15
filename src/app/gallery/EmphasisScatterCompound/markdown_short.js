export const markdown_short = `const draft = useRef(new Draft());
const newEmphasis = useRef(new Emphasis(emphVar, emphVal));
const newCatEmphasis = useRef(new Emphasis(emphCatVar, emphCatVal));

function alignY(d, i) {
    return yScale(d["Flavor"])
}

function getText(d, i) {
    return ${"`"}produced in ${"$"}{d.Country}${"`"}
}

const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

newEmphasis.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["text"]})
            .augment(newEmphasis.current.intersect(newCatEmphasis.current));
`