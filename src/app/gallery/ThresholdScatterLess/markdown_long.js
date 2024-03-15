export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export default Vis() {

    const [yThreshold, setYThreshold] = React.useState(8);

    const ref = useRef("less");

    const draft = useRef(new Draft());
    const newYThreshold = useRef(new Threshold("Flavor", yThreshold, "leq"));

    const [data, setData] = React.useState(coffee);

    let layout={"width":500,
               "height":500,
               "marginTop":50,
               "marginRight":50,
               "marginBottom":50,
               "marginLeft":50};

    useEffect(() => {

        let svgElement = d3.select(ref.current);

        svgElement.attr("width", layout.width)
                .attr("height", layout.height);

        let xScale = d3.scaleLinear()
                            .domain(d3.extent(data, d => d["Aroma"]))
                            .range([layout.marginLeft, layout.width - layout.marginRight]);

        let yScale = d3.scaleLinear()
                            .domain(d3.extent(data, d => d["Flavor"]))
                            .range([layout.height - layout.marginBottom, layout.marginTop]);

        let sizeScale = d3.scaleLinear()
                            .domain(d3.extent(data, d => d["Flavor"]))
                            .range([3, 6]);

        let scatterpoints = svgElement.select("#mark")
                                    .selectAll(".scatterpoint")
                                    .data(data)
                                    .join("rect")
                                    .attr("class", "scatterpoint")
                                    .attr("x", d => xScale(d["Aroma"]) - 3)
                                    .attr("y", d => yScale(d["Flavor"]) - 3)
                                    .attr("width", 6)
                                    .attr("height", 6)
                                    .attr("opacity", 0.3)

        svgElement.select("#xAxis")
                  .call(d3.axisBottom(xScale).ticks(5))
                  .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

        svgElement.select("#xAxis").selectAll("#xTitle")
                  .data(["Aroma"])
                  .join("text")
                  .attr("id", "xTitle")
                  .attr("text-anchor", "middle")
                  .attr("transform", ${"`"}translate(${"$"}{layout.width/2}, 30)${"`"})
                  .attr("fill", "black")
                  .text(d => d);

        svgElement.select("#yAxis")
                  .call(d3.axisLeft(yScale).ticks(5))
                  .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

        svgElement.select("#yAxis").selectAll("#yTitle")
                  .data(["Flavor"])
                  .join("text")
                  .attr("id", "yTitle")
                  .attr("text-anchor", "middle")
                  .attr("transform", ${"`"}translate(0, 40)${"`"})
                  .attr("fill", "black")
                  .text(d => d)

        let colorScale = d3.scaleSequential(d3.interpolateViridis)
                            .domain(d3.extent(data, d => d["Aroma"]));

        const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

        newYThreshold.current.selection(scatterpoints).updateStyles(styles);

        draft.current.layer(ref.current)
                    .x("Aroma", xScale)
                    .y("Flavor", yScale)
                    .include({"name":["line", "fill", "stroke", "opacity", "text"]})
                    .augment(newYThreshold.current.getAugs());

    }, [data])

    useEffect(() => {

        newYThreshold.current.updateVal(yThreshold);
        let newAug2 = newYThreshold.current.getAugs();
        
        draft.current.augment(newAug2);

    }, [yThreshold])

    function updateY(e) {
        setYThreshold(e.target.value);
    }

    return (
        <div>
            <div>
                <p>y-axis threshold: </p>
                <input
                    type="range"
                    id="quantity"
                    name="quantity"
                    min="6" max="9"
                    step="0.01"
                    value={yThreshold}
                    onChange={(e) => updateY(e)} />
            </div>
            <svg id="less" ref={ref}>
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
            </svg>
        </div>
    )
}
`