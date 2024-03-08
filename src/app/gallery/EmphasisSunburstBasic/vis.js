"use client"; // This is a client component

import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import data from "../hierarchy.json";

// This visualization is adapted from https://observablehq.com/@d3/sunburst/2?intent=fork
export default function Vis({size={"width":1000, "height":1000}, sparse=false}) {

	const ref = useRef("treemap");
	const chart = useRef(new Draft());
	const newEmphasis = useRef(new Emphasis("value", "max"));

	let layout={"width":size.width,
	   		   "height":size.height,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
	const radius = layout.width / 2;

	// Prepare the layout.
	const partition = data => d3.partition()
		.size([2 * Math.PI, radius])
	(d3.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => b.value - a.value));

	const arc = d3.arc()
		.startAngle(d => d.x0)
		.endAngle(d => d.x1)
		.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
		.padRadius(radius / 2)
		.innerRadius(d => d.y0)
		.outerRadius(d => d.y1 - 1);

	const root = partition(data);

	const [rays, setRays] = useState(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10));

	useEffect(() => {

		let svg = d3.select(ref.current);

		svg.attr("width", layout.width)
			.attr("height", layout.height);

		const format = d3.format(",d");
		let arcContainer = svg.select("#mark")
			  .attr("fill-opacity", 0.6)
			  .attr("transform", `translate(${layout.width / 2}, ${layout.height / 2})`)

		let arcs = arcContainer.selectAll("path")
			.data(rays)
			.join("path")
			  .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
			  .attr("d", arc)

		if (!sparse) {
			arcs.append("title")
				.text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

			// Add a label for each element.
			svg.append("g")
				  .attr("pointer-events", "none")
				  .attr("text-anchor", "middle")
				  .attr("font-size", 10)
				  .attr("font-family", "sans-serif")
				  .attr("transform", `translate(${layout.width / 2}, ${layout.height / 2})`)
				.selectAll("text")
				.data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
				.join("text")
				  .attr("transform", function(d) {
				    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
				    const y = (d.y0 + d.y1) / 2;
				    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
				  })
				  .attr("dy", "0.35em")
				  .text(d => d.data.name);
		}	

		chart.current.layer(ref.current)
					.selection(arcs)
					.exclude({"name":["fill"]})
					.augment(newEmphasis.current.getAugs());

	}, [rays])

	let containerStyle = {"margin":"10px 25px 15px 0px"};

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/EmphasisSunburstBasic">sunburst</a></h3>
				: <div />
			}
			<svg style={containerStyle} id="less" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}