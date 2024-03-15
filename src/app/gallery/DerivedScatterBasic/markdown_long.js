export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, DerivedValues } from "auteur";

import coffee from "../coffee.json";

export default function Vis() {

    const ref = useRef("derivedBasic");

    const [data, setData] = React.useState(coffee.slice(0, 10));

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

        let xScale = d3.scaleBand()
                            .domain(data.map(d => d.FIELD1))
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
                                    .join("circle")
                                    .attr("class", "scatterpoint")
                                    .attr("cx", d => xScale(d["FIELD1"]))
                                    .attr("cy", d => yScale(d["Flavor"]))
                                    .attr("r", d => 3)
                                    .attr("fill", "black");

        svgElement.select("#xAxis")
                  .call(d3.axisBottom(xScale))
                  .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

        svgElement.select("#xAxis").selectAll("#xTitle")
                  .data(["FIELD1 (ID)"])
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
                  .text(d => d);

        const draft = new Draft();
        const newDerivedValues = new DerivedValues("Flavor", 0.15, "sub");

        function alignX(d, i) {
            return xScale(d.FIELD1)
        }

        let newStyle = {"line":{"x1":alignX, "x2":alignX, "stroke-dasharray":"2px 5px 5px 5px"}};

        newDerivedValues.updateStyles(newStyle);

        draft.layer(ref.current)
              .selection(scatterpoints)
              .x("Aroma", xScale)
              .y("Flavor", yScale)
              .augment(newDerivedValues.getAugs());

    }, [data])

    return (
        <div>
            <svg id="less" ref={ref}>
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
            </svg>
        </div>
    )
}
`