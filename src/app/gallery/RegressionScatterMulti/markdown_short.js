export const markdown_short = `import { Draft, Regression } from "auteur";

const draft = useRef(new Draft());
const mainRegression = useRef(new Regression());

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