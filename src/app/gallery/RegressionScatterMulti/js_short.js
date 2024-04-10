export const js_short = `import { Draft, Regression } from "auteur";

const draft = new Draft();
const mainRegression = new Regression();

mainRegression.selection(scatterpoints);

draft.layer("#svg")
      .x("sepalLength", xScale)
      .y("petalLength", yScale)
      .exclude({"name":["text"]})
      .augment(mainRegression.getAugs());

let species = Array.from(new Set(data.map(d => d.species)));

for (let s of species) {

  let speciesSelection = svgElement.selectAll(${"`"}.${"$"}{s}${"`"});
  const speciesStyle = {"regression": {"stroke": colorScale(s), "stroke-width": "2px"}};

  let speciesRegression = new Regression();
  speciesRegression.updateStyles(speciesStyle).selection(speciesSelection);

  draft.augment(speciesRegression.getAugs());
}
`