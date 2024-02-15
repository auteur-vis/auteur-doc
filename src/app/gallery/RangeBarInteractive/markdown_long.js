export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export default function Vis() {

    const style = {"fill":{"fill":"steelblue"},
                   "line":{"stroke-dasharray":"2px 5px 5px 5px"}};

    const ref = useRef("range");
    const draft = useRef(new Draft());
    
    const [data, setData] = React.useState(coffee.slice(0, 10));
    const [maxThreshold, setMaxThreshold] = React.useState(8.5);
    const [minThreshold, setMinThreshold] = React.useState(8);
    const newRange = useRef(new Range("Flavor", [minThreshold, maxThreshold], "closed", style));

    let layout={"width":700,
               "height":500,
               "marginTop":50,
               "marginRight":50,
               "marginBottom":50,
               "marginLeft":50};

    function updatePlot() {

        let svgElement = d3.select(ref.current);

        svgElement.attr("width", layout.width)
                .attr("height", layout.height);

        let xScale = d3.scaleBand()
                        .domain(data.map(d => d["FIELD1"]))
                        .range([layout.marginLeft, layout.width - layout.marginRight]);

        let yScale = d3.scaleLinear()
                        .domain([d3.min(data, d => d.Flavor) - 0.5, d3.max(data, d => d["Flavor"])])
                        .range([layout.height - layout.marginBottom, layout.marginTop]);

        let bars = svgElement.select("#mark")
                            .selectAll(".bar")
                            .data(data)
                            .join("rect")
                            .attr("class", "bar")
                            .attr("x", d => xScale(d["FIELD1"]) + 1)
                            .attr("y", d => yScale(d["Flavor"]))
                            .attr("width", xScale.bandwidth() - 2)
                            .attr("height", d => layout.height - layout.marginBottom - yScale(d["Flavor"]))
                            .attr("fill", "steelblue")
                            .attr("opacity", "0.5");

        svgElement.select("#xAxis")
                    .call(d3.axisBottom(xScale))
                    .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

        svgElement.select("#yAxis")
                    .call(d3.axisLeft(yScale).ticks(5))
                    .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

        let xAxis = svgElement.select("#xAxis")
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

        let yAxis = svgElement.select("#yAxis")
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

    }
            
    useEffect(() => {

        updatePlot()
        let newAugs = newRange.current.getAugs();

        draft.current.chart(ref.current)
                    .selection(bars)
                    .x("FIELD1", xScale)
                    .y("Flavor", yScale)
                    .exclude({"name":["label", "regression", "text"]})
                    .augment(newAugs);

    }, [data])

    useEffect(() => {

        newRange.current.updateVal([minThreshold, maxThreshold]);
        let newAugs = newRange.current.getAugs();
        draft.current.augment(newAugs);

    }, [minThreshold, maxThreshold])

    function updateMax(e) {
        setMaxThreshold(e.target.value);
    }

    function updateMin(e) {
        setMinThreshold(e.target.value);
    }

    return (
        <div>
            <div style={{"display":"flex", "height":"20px", "align-items":"center", "margin-bottom":"10px"}}>
                <p>min threshold: </p>
                <input
                    type="range"
                    id="quantity"
                    name="quantity"
                    min={d3.min(data, d => d.Flavor) - 0.5}
                    max={d3.max(data, d => d.Flavor)}
                    step="0.01"
                    value={minThreshold}
                    onChange={(e) => updateMin(e)} />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={minThreshold}
                    onChange={(e) => updateMin(e)}
                    style={{ marginLeft: '10px', width: '60px' }}/>
            </div>
            <div style={{"display":"flex", "height":"20px", "align-items":"center"}}>
                <p>max threshold: </p>
                <input
                    type="range"
                    id="quantity"
                    name="quantity"
                    min={d3.min(data, d => d.Flavor) - 0.5}
                    max={d3.max(data, d => d.Flavor)}
                    step="0.01"
                    value={maxThreshold}
                    onChange={(e) => updateMax(e)} />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={maxThreshold}
                    onChange={(e) => updateMax(e)}
                    style={{ marginLeft: '10px', width: '60px' }}
                />  
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