export const markdown_short = `const yThreshold = new Threshold("AverageTemperature", 7, "leq");

const pointStyles = {"stroke": {
                    "stroke": (d) => colorScale(d.City),
                    "stroke-width": "2px"}};

yThreshold.updateStyles(pointStyles)
          .selection(scatterpoints);

const draft = new Draft();

draft.chart(ref.current)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .exclude({"name":["fill", "text"]})
    .augment(yThreshold.getAugs());
`