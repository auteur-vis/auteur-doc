export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import coffee from "../coffee.json";

export default function Vis() {

    let group = d3.group(coffee, d => d["Country"]);
    let groupedData = [...group.entries()].map(d => { return {"Country":d[0], "entries":d[1], "count":d[1].length} });
    
    const [categories, setCategories] = React.useState(["Colombia", "Ethiopia"]);

    const ref = useRef("barrange");
    const draft = useRef(new Draft());
    const newEmphasis = useRef(new Emphasis("Country", categories));

    const [data, setData] = React.useState(groupedData);

    let layout={"width":900,
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
                        .domain(data.map(d => d["Country"]))
                        .range([layout.marginLeft, layout.width - layout.marginRight]);

        let yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => d["count"])])
                        .range([layout.height - layout.marginBottom, layout.marginTop]);

        let bars = svgElement.select("#mark")
                            .selectAll(".bar")
                            .data(data)
                            .join("rect")
                            .attr("class", "bar")
                            .attr("x", d => xScale(d["Country"]) + 1)
                            .attr("y", d => yScale(d["count"]))
                            .attr("width", xScale.bandwidth() - 2)
                            .attr("height", d => yScale(0) - yScale(d["count"]))
                            .attr("fill", "steelblue")
                            .attr("fill-opacity", 0.5);

        svgElement.select("#xAxis")
                  .call(d3.axisBottom(xScale))
                  .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

        svgElement.select("#xAxis").selectAll("#xTitle")
                  .data(["Country"])
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
                  .data(["Count"])
                  .join("text")
                  .attr("id", "yTitle")
                  .attr("text-anchor", "middle")
                  .attr("transform", ${"`"}translate(0, 40)${"`"})
                  .attr("fill", "black")
                  .text(d => d)

        const style = {"fill":{"fill":"green"}};

        newEmphasis.current.updateStyles(style);

        draft.current.chart(ref.current)
                    .selection(bars)
                    .x("Country", xScale)
                    .y("count", yScale)
                    .exclude({"name":["stroke", "text", "label", "regression"]})
                    .augment(newEmphasis.current.getAugs());

    }, [data])

    return (
        <div>
            <svg id="barless" ref={ref}>
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
            </svg>
        </div>
    )
}

`