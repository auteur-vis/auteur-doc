import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Regression } from "auteur";

import climate from "../climate.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const ref = useRef("barrange");
	const draft = useRef(new Draft());
	const regression = useRef(new Regression());

	const [data, setData] = React.useState(climate.filter(d => d.year == 2005 && d.City == "Los Angeles"));

	let layout={"width":size.width,
	   		   "height":size.height,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scaleBand()
						.domain(data.map(d => d["month"]))
						.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
						.domain([0, d3.max(data, d => d["AverageTemperature"])])
						.range([layout.height - layout.marginBottom, layout.marginTop]);

		let bars = svgElement.select("#mark")
							.selectAll(".bar")
							.data(data)
							.join("rect")
							.attr("class", "bar")
							.attr("x", d => xScale(d["month"]) + 1)
							.attr("y", d => yScale(d["AverageTemperature"]))
							.attr("width", xScale.bandwidth() - 2)
							.attr("height", d => yScale(0) - yScale(d["AverageTemperature"]))
							.attr("fill", "steelblue")
							.attr("fill-opacity", 0.75);

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["Month"])
				  .join("text")
				  .attr("id", "xTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(${layout.width/2}, 30)`)
				  .attr("fill", "black")
				  .text(d => d);

		svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		svgElement.select("#yAxis").selectAll("#yTitle")
				  .data(["Average Temperature"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d)

		const style = {"regression":{"transform":`translate(${xScale.bandwidth()/2}, 0)`}};

		regression.current.updateStyles(style);

		draft.current.layer(ref.current)
					.selection(bars)
					.x("month", xScale)
					.y("AverageTemperature", yScale)
					.augment(regression.current.getAugs());

	}, [data])

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/RegressionBarTemporal">bar chart</a></h3>
				: <div />
			}
			<svg id="barless" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}