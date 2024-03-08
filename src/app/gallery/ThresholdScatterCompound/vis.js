import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const [xThreshold, setXThreshold] = React.useState(8.3);
	const [yThreshold, setYThreshold] = React.useState(8.55);
	const [mergeBy, setMergeBy] = useState("symmdiff");

	const ref = useRef("quadrant");
	const draft = useRef(new Draft());
	const newXThreshold = useRef(new Threshold("Aroma", xThreshold, "leq"));
	const newYThreshold = useRef(new Threshold("Flavor", yThreshold, "leq"));

	const [data, setData] = React.useState(coffee.slice(0, 20));

	let layout={"width":size.width,
	   		   "height":size.height,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	function merge(threshold1, threshold2, mergeValue) {

		if (mergeValue === "union") {
			return threshold1.union(threshold2);
		} else if (mergeValue === "intersect") {
			return threshold1.intersect(threshold2);
		} else if (mergeValue === "difference") {
			return threshold1.difference(threshold2);
		} else if (mergeValue === "symmdiff") {
			return threshold1.symmdiff(threshold2);
		}

		return threshold1.getAugs().concat(threshold2.getAugs())

	}

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
				  .text(d => d)

		draft.current.layer(ref.current)
					.selection(scatterpoints)
					.x("Aroma", xScale)
					.y("Flavor", yScale)

		if (sparse) {
			draft.current.exclude({"name":["label", "regression"]}).augment(merge(newXThreshold.current, newYThreshold.current, mergeBy));
		} else {
			draft.current.augment(merge(newXThreshold.current, newYThreshold.current, mergeBy));
		}

	}, [data])

	useEffect(() => {

		newYThreshold.current.updateVal(yThreshold);
		let newAugs = merge(newXThreshold.current, newYThreshold.current, mergeBy);

		draft.current.augment(newAugs);

	}, [yThreshold])

	useEffect(() => {

		newXThreshold.current.updateVal(xThreshold);
		let newAugs = merge(newXThreshold.current, newYThreshold.current, mergeBy);

		draft.current.augment(newAugs);

	}, [xThreshold])

	useEffect(() => {

		let newAugs = merge(newXThreshold.current, newYThreshold.current, mergeBy);

		draft.current.augment(newAugs);

	}, [mergeBy])

	function updateY(e) {
		setYThreshold(e.target.value);
	}

	function updateX(e) {
		setXThreshold(e.target.value);
	}

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/ThresholdScatterCompound">interactive quadrant</a></h3>
				: <div> 
					<div>
						<p>x-axis threshold: </p>
						<input
							type="range"
							id="quantity"
							name="quantity"
							min="7.9" max="8.7"
							step="0.01"
							value={xThreshold}
							onChange={(e) => updateX(e)} />
					</div>
					<div>
						<p>y-axis threshold: </p>
						<input
							type="range"
							id="quantity"
							name="quantity"
							min="8.2" max="8.9"
							step="0.01"
							value={yThreshold}
							onChange={(e) => updateY(e)} />
					</div>
					<div>
						<p>merge by: </p>
						<select value={mergeBy} onChange={(e) => setMergeBy(e.target.value)}>
							<option value="union">Union</option>
							<option value="intersect">Intersect</option>
							<option value="symmdiff">symmdiff</option>
						</select>
					</div>
				</div>
			}
			<svg id="less" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<text id="tooltip" />
			</svg>
		</div>
	)
}