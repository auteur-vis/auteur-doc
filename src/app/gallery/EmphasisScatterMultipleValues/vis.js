import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const [emphVal1, setEmphVal1] = React.useState("Other");
	const [emphVal2, setEmphVal2] = React.useState("Bourbon");

	const options = Array.from(new Set(coffee.map(d => d.Variety)));

	const ref = useRef("emphVal");
	const draft = useRef(new Draft());
	const newEmphasis = useRef(new Emphasis("Variety", [emphVal1, emphVal2]));

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
				  .text(d => d);

		let colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
							.domain(d3.extent(data, d => d["Flavor"]));

		const styles = {"fill": {"fill": (d, i) => colorScale(d.Flavor)}};

		newEmphasis.current.updateStyles(styles);

		draft.current.layer(ref.current)
					.selection(scatterpoints)
					.x("Aroma", xScale)
					.y("Flavor", yScale)
					.exclude({"name":["label", "regression"]});

		if (sparse) {
			draft.current.exclude({"name":["label", "regression", "text"]}).augment(newEmphasis.current.getAugs());
		} else {
			draft.current.augment(newEmphasis.current.getAugs());
		}

	}, [data])

	useEffect(() => {

		let newEmphVals = [emphVal1, emphVal2];
		newEmphasis.current.updateVal(newEmphVals);
		
		let newAugs = newEmphasis.current.getAugs();
		draft.current.augment(newAugs);

	}, [emphVal1, emphVal2])

	function updateEmphVal1(e) {
		setEmphVal1(e.target.value);
	}

	function updateEmphVal2(e) {
		setEmphVal2(e.target.value);
	}

	let controlStyle = {"display":"flex"};
	let paragraphStyle = {"margin":"3px"};

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/EmphasisScatterMultipleValues">multiple values</a></h3>
				: <div style={controlStyle}>
					<p style={paragraphStyle}>Highlight varieties </p>
					<select value={emphVal1} onChange={(e) => updateEmphVal1(e)}>
						{options.map((d, i) => {
							return <option value={d} key={`option1${i}`}>{d}</option>
						})}
					</select>
					<p style={paragraphStyle}> and </p>
					<select value={emphVal2} onChange={(e) => updateEmphVal2(e)}>
						{options.map((d, i) => {
							return <option value={d} key={`option2${i}`}>{d}</option>
						})}
					</select>
				</div>
			}
			<svg id="less" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
			</svg>
		</div>
	)
}