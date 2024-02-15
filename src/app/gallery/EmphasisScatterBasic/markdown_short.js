export const markdown_short = `function alignY(d, i) {
    return yScale(d["Flavor"])
}

function getText(d, i) {
    return ${"`"}produced in ${"$"}{d.Country}${"`"}
}

const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

const draft = new Draft();
const newEmphasis = new Emphasis(emphVar, emphVal);

newEmphasis.updateStyles(styles);

draft.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label"]})
            .augment(newEmphasis.getAugs());`