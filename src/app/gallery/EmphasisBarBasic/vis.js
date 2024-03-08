import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const [emphVar, setEmphVar] = React.useState("Flavor");

	const ref = useRef("emphVal");
	const draft = useRef(new Draft());
	const newEmphasis = useRef(new Emphasis(emphVar, "min"));

	const [data, setData] = React.useState(coffee.slice(0, 10));
	

	let layout={"width":size.width,
	   		   "height":size.height,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	let yScale;
	
	function updatePlot() {

		let svgElement = d3.select(ref.current);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scaleBand()
						.domain(data.map(d => d["FIELD1"]))
						.range([layout.marginLeft, layout.width - layout.marginRight]);

		yScale = d3.scaleLinear()
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
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		let xAxis = svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["FIELD1 (ID)"])
				  .join("text")
				  .attr("id", "xTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(${layout.width/2}, 30)`)
				  .attr("fill", "black")
				  .text(d => d);

		let yAxis = svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		svgElement.select("#yAxis").selectAll("#yTitle")
				  .data(["Flavor"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d);

		draft.current.layer(ref.current)
					.selection(bars)
					.x("FIELD1", xScale)
					.y("Flavor", yScale)
					.exclude({"name":["label"]});
	}

	useEffect(() => {
		function alignY(d, i) {
			return yScale(d["Flavor"])
		}

		function getText(d, i) {
			return `produced in ${d.Country}`
		}
		
		const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};
		updatePlot();
		newEmphasis.current.updateStyles(styles);

		if (sparse) {
			draft.current.augment(newEmphasis.current.getAugs());
		} else {
			draft.current.augment(newEmphasis.current.getAugs());
		}

	}, [data])

	let controlStyle = {"display":"flex"};
	let paragraphStyle = {"margin":"3px"};

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/EmphasisBarBasic">bar chart</a></h3>
				: <div />
			}
			<svg id="less" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}