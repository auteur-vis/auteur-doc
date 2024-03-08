import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const [maxThreshold, setMaxThreshold] = React.useState(8);
	const [minThreshold, setMinThreshold] = React.useState(6.5);

	const style = {"rect":{"fill":"#edcf7b", "opacity": 0.2}};

	const ref = useRef("range");
	const draft = useRef(new Draft());
	const newRange = useRef(new Range("Aroma", [minThreshold, maxThreshold], "open", style));

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
									.attr("opacity", 0.25);

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
					.exclude({"name":["label", "regression", "text"]});

		if (sparse) {
			draft.current.augment(newRange.current.getAugs());
		} else {
			draft.current.augment(newRange.current.getAugs());
		}

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
			{sparse
				? <h3><a href="./gallery/RangeScatterOpen">interactive open interval</a></h3>
				: <div>
					<div>
						<p>min threshold: </p>
						<input
							type="range"
							id="quantity"
							name="quantity"
							min={d3.min(data, d => d.Aroma)}
							max={d3.max(data, d => d.Aroma)}
							step="0.01"
							value={minThreshold}
							onChange={(e) => updateMin(e)} />
					</div>
					<div>
						<p>max threshold: </p>
						<input
							type="range"
							id="quantity"
							name="quantity"
							min={d3.min(data, d => d.Aroma)}
							max={d3.max(data, d => d.Aroma)}
							step="0.01"
							value={maxThreshold}
							onChange={(e) => updateMax(e)} />
					</div>
				</div>
			}
			<svg id="less" ref={ref}>
				<g id="augmentations" />
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}