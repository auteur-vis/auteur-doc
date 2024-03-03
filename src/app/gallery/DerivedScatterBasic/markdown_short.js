export const markdown_short = `import { Draft, DerivedValues } from "auteur";

const draft = new Draft();
const newDerivedValues = new DerivedValues("Flavor", 0.15, "sub");

function alignX(d, i) {
    return xScale(d.FIELD1)
}

let newStyle = {"line":{"x1":alignX, "x2":alignX, "stroke-dasharray":"2px 5px 5px 5px"}};

newDerivedValues.updateStyles(newStyle);

draft.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .augment(newDerivedValues.getAugs());
`