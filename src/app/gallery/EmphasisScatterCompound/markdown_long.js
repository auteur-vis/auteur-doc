export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import coffee from "../coffee.json";

export default function Vis() {

    const [emphVal, setEmphVal] = React.useState(6);
    const [emphVar, setEmphVar] = React.useState("Sweetness");

    const [emphCatVal, setEmphCatVal] = React.useState("Other");
    const [emphCatVar, setEmphCatVar] = React.useState("Variety");
    const [emphOptions, setEmphOptions] = React.useState(Array.from(new Set(coffee.map(d => d.Variety))));

    const ref = useRef("emphMulti");
    const draft = useRef(new Draft());
    const newEmphasis = useRef(new Emphasis(emphVar, emphVal));
    const newCatEmphasis = useRef(new Emphasis(emphCatVar, emphCatVal));

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
                                    .join("circle")
                                    .attr("class", "scatterpoint")
                                    .attr("cx", d => xScale(d["Aroma"]) + Math.random() * 8 - 4)
                                    .attr("cy", d => yScale(d["Flavor"]) + Math.random() * 8 - 4)
                                    .attr("r", d => 3);

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
                  .text(d => d);

        function alignY(d, i) {
            return yScale(d["Flavor"])
        }

        function getText(d, i) {
            return ${"`"}produced in ${"$"}{d.Country}${"`"}
        }

        const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

        newEmphasis.current.updateStyles(styles);

        draft.current.chart(ref.current)
                    .selection(scatterpoints)
                    .x("Aroma", xScale)
                    .y("Flavor", yScale)
                    .exclude({"name":["text"]})
                    .augment(newEmphasis.current.intersect(newCatEmphasis.current));

    }, [data])

    useEffect(() => {

        newEmphasis.current.updateVariable(emphVar);
        let newAugs = newEmphasis.current.intersect(newCatEmphasis.current);

        draft.current.augment(newAugs);

    }, [emphVar])

    useEffect(() => {

        newEmphasis.current.updateVal(emphVal);
        let newAugs = newEmphasis.current.intersect(newCatEmphasis.current);

        draft.current.augment(newAugs);

    }, [emphVal])

    useEffect(() => {

        newCatEmphasis.current.updateVal(emphCatVal);
        let newAugs = newEmphasis.current.intersect(newCatEmphasis.current);

        draft.current.augment(newAugs);

    }, [emphCatVal])

    function updateEmphVar(e) {
        setEmphVar(e.target.value);
    }

    function updateEmphVal(e) {
        setEmphVal(e.target.value);
    }

    function updateEmphCatVal(e) {
        setEmphCatVal(e.target.value);
    }

    let controlStyle = {"display":"flex"};
    let paragraphStyle = {"margin":"3px"};

    return (
        <div>
            <div style={controlStyle}>
                <p style={paragraphStyle}>Highlight variable </p>
                <select value={emphVar} onChange={(e) => updateEmphVar(e)}>
                    <option value="Aroma">Aroma</option>
                    <option value="Flavor">Flavor</option>
                    <option value="Aftertaste">Aftertaste</option>
                    <option value="Acidity">Acidity</option>
                    <option value="Body">Body</option>
                    <option value="Balance">Balance</option>
                    <option value="Uniformity">Uniformity</option>
                    <option value="Clean.Cup">Clean.Cup</option>
                    <option value="Sweetness">Sweetness</option>
                </select>
                <p style={paragraphStyle}>when value is: </p>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0" max="10"
                    step="0.01"
                    value={emphVal}
                    onChange={(e) => updateEmphVal(e)} />
                <p style={paragraphStyle}>and when Variety is: </p>
                <select value={emphCatVal} onChange={(e) => updateEmphCatVal(e)}>
                    {emphOptions.map((d, i) => {
                        return <option value={d} key={${"`"}option${"$"}{i}${"`"}}>{d}</option>
                    })}
                </select>
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