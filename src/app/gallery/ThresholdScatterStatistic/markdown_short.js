export const markdown_short = `import { Draft, Threshold } from "auteur";

const [yThreshold, setYThreshold] = React.useState(d3.mean(coffee, d => d.Flavor));
const [yStatistic, setYStatistic] = useState("mean");

const draft = useRef(new Draft());
const newYThreshold = useRef(new Threshold("Flavor", yStatistic, "leq"));

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["regression", "label"]})
            .augment(newYThreshold.current.getAugs());
`