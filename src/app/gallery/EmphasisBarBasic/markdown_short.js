export const markdown_short = `function alignY(d, i) {
    return yScale(d["Flavor"])
}

function getText(d, i) {
    return ${"`"}produced in ${"$"}{d.Country}${"`"}
}

const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

newEmphasis.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(bars)
            .x("FIELD1", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["line"]})
            .augment(newEmphasis.current.getAugs());`