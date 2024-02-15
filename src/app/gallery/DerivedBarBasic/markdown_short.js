export const markdown_short = `const style = {"multiple":{"fill":"steelblue", "opacity":1}};

const draft = new Draft();
const newDerivedValues = new DerivedValues("Flavor", 0.1, "sub", undefined, style);

draft.chart(ref.current)
        .selection(bars)
        .x("FIELD1", xScale)
        .y("Flavor", yScale)
        .exclude({"name":["line"]})
        .augment(newDerivedValues.getAugs());
`