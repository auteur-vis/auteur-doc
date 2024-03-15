import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import Draft from "../../../auteur/src/lib/Draft.js";
import Range from "../../../auteur/src/lib/Range.js";

import data from "../../public/hierarchy.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/Range/Sunburst/Sunburst',
};

// This visualization is adapted from https://observablehq.com/@d3/sunburst/2?intent=fork
export const Sunburst = () => {

	const ref = useRef("treemap");
	const chart = useRef(new Draft());

	const [minVal, setMinVal] = useState(9930);
	const [maxVal, setMaxVal] = useState(12000);
	const newRange = useRef(new Range("value", [minVal, maxVal]));

	let layout={"width":1000,
	   		   "height":1000,
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

		chart.current.layer(ref.current)
					.selection(arcs)
					.exclude({"name":["fill"]})
					.augment(newRange.current.getAugs());

	}, [rays])

	useEffect(() => {

		newRange.current.updateVal([minVal, maxVal]);
		let newAugs = newRange.current.getAugs();

		chart.current.augment(newAugs);

	}, [minVal, maxVal])

	function updateMin(e) {
		setMinVal(e.target.value);
	}

	function updateMax(e) {
		setMaxVal(e.target.value);
	}

	let controlStyle = {"display":"flex"};
	let paragraphStyle = {"margin":"3px"};

	return (
		<div>
			<div style={controlStyle}>
				<p style={paragraphStyle}>Highlight group when value is between min </p>
				<input
					type="range"
					id="quantity"
					name="quantity"
					min="0" max="12870"
					value={minVal}
					onChange={(e) => updateMin(e)} />
				<p style={paragraphStyle}>{minVal}</p>
				<p style={paragraphStyle}>and max</p>
				<input
					type="range"
					id="quantity"
					name="quantity"
					min="0" max="12870"
					value={maxVal}
					onChange={(e) => updateMax(e)} />
				<p style={paragraphStyle}>{maxVal}</p>
			</div>
			<svg id="less" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}

Sunburst.story = {
  name: 'Sunburst',
};