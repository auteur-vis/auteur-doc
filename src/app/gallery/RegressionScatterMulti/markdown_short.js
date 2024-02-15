export const markdown_short = `const draft = useRef(new Draft());
const mainRegression = useRef(new Regression());

function alignY(d, i) {
    return yScale(d["petalLength"])
}

function getText(d, i) {
    return ${"`"}produced in ${"$"}{d.Country}${"`"}
}

const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

mainRegression.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("sepalLength", xScale)
            .y("petalLength", yScale)
            .exclude({"name":["text"]})
            .augment(mainRegression.current.getAugs());

let species = Array.from(new Set(data.map(d => d.species)));

for (let s of species) {

    let speciesSelection = svgElement.selectAll(${"`"}.${"$"}{s}${"`"});
    const speciesStyle = {"line": {"stroke": colorScale(s), "stroke-width": "2px"}};

    let speciesRegression = new Regression(speciesStyle);
    speciesRegression.selection(speciesSelection);

    draft.current.augment(speciesRegression.getAugs());

}
`