import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":900, "height":500}, sparse=false}) {

	let group = d3.group(coffee, d => d["Country"]);
	let groupedData = [...group.entries()].map(d => { return {"Country":d[0], "entries":d[1], "count":d[1].length} }).sort((a, b) => a.count - b.count);
	
	const [barThreshold, setBarThreshold] = React.useState(150);
	const [barOperation, setBarOperation] = useState("leq");

	const ref = useRef("barless");
	const draft = useRef(new Draft());
	const newBarThreshold = useRef(new Threshold("count", barThreshold, barOperation));

	const [data, setData] = React.useState(groupedData);

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
						.domain(data.map(d => d["Country"]))
						.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
						.domain([0, d3.max(data, d => d["count"])])
						.range([layout.height - layout.marginBottom, layout.marginTop]);

		let bars = svgElement.select("#mark")
							.selectAll(".bar")
							.data(data)
							.join("rect")
							.attr("class", "bar")
							.attr("x", d => xScale(d["Country"]) + 1)
							.attr("y", d => yScale(d["count"]))
							.attr("width", xScale.bandwidth() - 2)
							.attr("height", d => yScale(0) - yScale(d["count"]))
							.attr("fill", "steelblue");

		let xAxisStyle;

		if (sparse) {
			xAxisStyle = d3.axisBottom(xScale).ticks(5).tickValues([]);
		} else {
			xAxisStyle = d3.axisBottom(xScale).ticks(5);
		}

		svgElement.select("#xAxis")
				  .call(xAxisStyle)
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["Country"])
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
				  .data(["Count"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d);

		newBarThreshold.current.selection(bars);

		draft.current.layer(ref.current)
					.x("Country", xScale)
					.y("count", yScale)
					.exclude({"name":["label", "regression", "fill", "stroke"]});

		if (sparse) {
			draft.current.augment(newBarThreshold.current.getAugs());
		} else {
			draft.current.augment(newBarThreshold.current.getAugs());
		}

	}, [data])

	useEffect(() => {

		newBarThreshold.current.updateVal(barThreshold);
		let newAug2 = newBarThreshold.current.getAugs();

		draft.current.augment(newAug2);

	}, [barThreshold])

	useEffect(() => {

		newBarThreshold.current.updateType(barOperation);
		let newAugs = newBarThreshold.current.getAugs();

		draft.current.augment(newAugs);

	}, [barOperation])

	function updateY(e) {
		setBarThreshold(e.target.value);
	}

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/ThresholdBarInteractive">interactive bar chart threshold</a></h3>
				: <div>
					<div>
						<p>y-axis threshold: </p>
						<input
							type="range"
							id="quantity"
							name="quantity"
							min="0" max="236"
							value={barThreshold}
							onChange={(e) => updateY(e)} />
					</div>
					<div>
						<p>y-axis operation: </p>
						<select value={barOperation} onChange={(e) => setBarOperation(e.target.value)}>
							<option value="eq">Equals</option>
							<option value="le">Less Than</option>
							<option value="leq">Less Than or Equals To</option>
							<option value="ge">Greater Than</option>
							<option value="geq">Greater Than or Equals To</option>
						</select>
					</div>
				</div>
			}
			<svg id="barless" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<text id="tooltip" />
			</svg>
		</div>
	)
}