export const markdown_short = `const upperBound = new DerivedValues('AverageTemperature', "AverageTemperatureUncertainty", "add");

const lowerBound = new DerivedValues('AverageTemperature', "AverageTemperatureUncertainty", "sub");

const draft = new Draft();

draft.chart("#svg")
.selection(lines)
.x("date", xScale)
.y("AverageTemperature", yScale)
.exclude({"name":["fill"]})
.augment(upperBound.getAugs())
.augment(lowerBound.getAugs());
`