export const markdown_short = `import { Draft, LocalData } from "auteur";

const draft = useRef(new Draft());

const local = useRef(coffee.slice(110, 120));
const newLocal = useRef(new LocalData(local.current));

let sizeScale = d3.scaleLinear()
                    .domain(d3.extent(local.current, d => d["Flavor"]))
                    .range([3, 10]);

const styles = {"mark": {"fill":"none", "stroke": "red", "r": (d, i) => sizeScale(d.Flavor)}};

newLocal.current.updateStyles(styles);

draft.current.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude()
            .augment(newLocal.current.getAugs());
`