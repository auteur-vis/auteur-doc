export const markdown_short = `import { Draft, Regression } from "auteur";

const draft = useRef(new Draft());
const mainRegression = useRef(new Regression());

mainRegression.current.selection(scatterpoints);

draft.current.layer(ref.current)
            .x("sepalLength", xScale)
            .y("petalLength", yScale)
            .exclude({"name":["text"]})
            .augment(mainRegression.current.getAugs());

let species = Array.from(new Set(data.map(d => d.species)));

for (let s of species) {

    let speciesSelection = svgElement.selectAll(${"`"}.${"$"}{s}${"`"});
    const speciesStyle = {"regression": {"stroke": colorScale(s), "stroke-width": "2px"}};

    let speciesRegression = new Regression();
    speciesRegression.updateStyles(speciesStyle).selection(speciesSelection);

    draft.current.augment(speciesRegression.getAugs());
}
`