import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const ref = useRef("less");

	const [data, setData] = React.useState(coffee.slice(0, 20));

	useEffect(() => {

		let svg = d3.select(ref.current);

		let layout={"width":size.width,
	   		   "height":size.height,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

		svg.attr("width", layout.width)
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

		svg.select("#xAxis")
				  .call(d3.axisBottom(xScale).ticks(5))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svg.select("#xAxis").selectAll("#xTitle")
				  .data(["Aroma"])
				  .join("text")
				  .attr("id", "xTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(${layout.width/2}, 30)`)
				  .attr("fill", "black")
				  .text(d => d);

		svg.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		svg.select("#yAxis").selectAll("#yTitle")
				  .data(["Flavor"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d)

		let scatterpoints = svg.select("#mark")
							.selectAll("circle")
							.data(data)
							.join("circle")
							.attr("cx", d => xScale(d["Aroma"]))
							.attr("cy", d => yScale(d["Flavor"]))
							.attr("r", 3)
							.attr("fill", "steelblue");

		const yThreshold = new Threshold("Flavor", "median", "geq");
		const augmentations = yThreshold.getAugs();

		const draft = new Draft();

		draft.layer("#svg")
			.selection(scatterpoints)
			.x("Aroma", xScale)
			.y("Flavor", yScale);

		if (sparse) {
			draft.exclude({"name":["label", "regression"]}).augment(augmentations);
		} else {
			draft.augment(augmentations);
		}

	}, [data])

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/ThresholdScatterBasic">scatterplot</a></h3>
				: <p />
			}
			<svg id="svg" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}