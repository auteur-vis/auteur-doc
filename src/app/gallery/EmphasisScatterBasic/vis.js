import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const [emphVal, setEmphVal] = React.useState("median");
	const [emphVar, setEmphVar] = React.useState("Aroma");

	const ref = useRef("emphVal");

	const [data, setData] = React.useState(coffee);

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
									.attr("cx", d => xScale(d["Aroma"]))
									.attr("cy", d => yScale(d["Flavor"]))
									.attr("r", d => 3)
									.attr("fill", "steelblue");

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale).ticks(5))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["Aroma"])
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
				  .data(["Flavor"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d);

		function alignY(d, i) {
			return yScale(d["Flavor"])
		}

		function getText(d, i) {
			return `produced in ${d.Country}`
		}

		const styles = {"text": {"text-anchor":"end", "x": 490, "y":alignY, "text": getText}};

		const draft = new Draft();
		const newEmphasis = new Emphasis(emphVar, emphVal);

		newEmphasis.updateStyles(styles);

		draft.chart(ref.current)
					.selection(scatterpoints)
					.x("Aroma", xScale)
					.y("Flavor", yScale)
					.exclude({"name":["label"]})

		if (sparse) {
			draft.exclude({"name":["label", "regression"]}).augment(newEmphasis.getAugs());
		} else {
			draft.augment(newEmphasis.getAugs());
		}

	}, [data])

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/EmphasisScatterBasic">scatterplot</a></h3>
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