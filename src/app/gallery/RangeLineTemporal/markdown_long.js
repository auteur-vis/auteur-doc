export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Range } from "auteur";

import climate from "../climate.json";

export default function Vis() {

    const [maxThreshold, setMaxThreshold] = React.useState(new Date(2011, 12, 31));
    const [minThreshold, setMinThreshold] = React.useState(new Date(2006, 1, 1));

    const ref = useRef("linerange");

    const draft = useRef(new Draft());
    const newRange = useRef(new Range("date", [minThreshold, maxThreshold], "closed"));

    const [data, setData] = React.useState(climate);

    let layout={"width":900,
               "height":500,
               "marginTop":50,
               "marginRight":50,
               "marginBottom":50,
               "marginLeft":50};

    useEffect(() => {

        let svgElement = d3.select(ref.current);

        const dataTime = data.map((d) => {
            let dateSplit = d.dt.split("-");
            let formatDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
            d.date = formatDate;
            return d;
        })

        let grouped = d3.group(dataTime, d => d.City);

        svgElement.attr("width", layout.width)
                .attr("height", layout.height);

        let xScale = d3.scaleTime()
                    .domain(d3.extent(dataTime, d => d["date"]))
                    .range([layout.marginLeft, layout.width - layout.marginRight]);

        let yScale = d3.scaleLinear()
                            .domain(d3.extent(dataTime, d => d["AverageTemperature"]))
                            .range([layout.height - layout.marginBottom, layout.marginTop]);

        let sizeScale = d3.scaleLinear()
                            .domain(d3.extent(dataTime, d => d["AverageTemperature"]))
                            .range([3, 6]);

        let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
                            .domain(['Chicago', 'Los Angeles', 'New York']);

        let lineFunction = d3.line()
                             .x(d => xScale(d["date"]))
                             .y(d => yScale(d["AverageTemperature"]));

        let flattenGroup = [...grouped].map(d => {
            return d[1].map(di => {di.City = d[0]; return di});
            return d[1]
        });

        let lines = svgElement.select("#mark")
                                    .selectAll(".climateLine")
                                    .data(flattenGroup)
                                    .join("path")
                                    .attr("class", "climateLine")
                                    .attr('fill', 'none')
                                    .attr('stroke-width', 1)
                                    .attr('stroke', d => colorScale(d[0].City))
                                    .attr("d", d => {
                                        return lineFunction(d)
                                    })

        svgElement.select("#xAxis")
                  .call(d3.axisBottom(xScale).ticks(3))
                  .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

        svgElement.select("#xAxis").selectAll("#xTitle")
                  .data(["date"])
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
                  .data(["Average Temperature"])
                  .join("text")
                  .attr("id", "yTitle")
                  .attr("text-anchor", "middle")
                  .attr("transform", ${"`"}translate(0, 40)${"`"})
                  .attr("fill", "black")
                  .text(d => d)

        const styles = {"line": {"stroke": (d, i) => "red", "stroke-width": "2px"}};

        newRange.current.updateStyles(styles);

        draft.current.chart(ref.current)
                    .selection(lines)
                    .layer("#augmentations")
                    .x("date", xScale)
                    .y("AverageTemperature", yScale)
                    .exclude({"name": ["text", "opacity"]})
                    .augment(newRange.current.getAugs());

    }, [data])

    return (
        <div>
            <svg id="less" ref={ref}>
                <g id="augmentations" />
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
            </svg>
        </div>
    )
}
`