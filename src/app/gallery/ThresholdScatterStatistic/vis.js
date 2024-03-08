import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	const [yThreshold, setYThreshold] = React.useState(d3.mean(coffee, d => d.Flavor));
	const [yStatistic, setYStatistic] = useState("mean");

	const ref = useRef("calculated");
	const draft = useRef(new Draft());
	const newYThreshold = useRef(new Threshold("Flavor", yStatistic, "leq"));

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

		let scatterpoints = svgElement.select("#mark")
									.selectAll(".scatterpoint")
									.data(data)
									.join("circle")
									.attr("class", "scatterpoint")
									.attr("cx", d => xScale(d["Aroma"]))
									.attr("cy", d => yScale(d["Flavor"]))
									.attr("r", d => 3)
									.attr("fill", "none")
									.attr("stroke", "steelblue");

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
					.exclude({"name":["label", "regression"]})
		
		if (sparse) {
			draft.current.augment(newYThreshold.current.getAugs());
		} else {
			draft.current.augment(newYThreshold.current.getAugs());
		}

	}, [data])

	useEffect(() => {

		newYThreshold.current.updateVal(yStatistic);

		let newAug2 = newYThreshold.current.getAugs();
		
		draft.current.augment(newAug2);

	}, [yStatistic])

	function updateY(e) {
		setYStatistic(e.target.value);
	}

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/ThresholdScatterStatistic">statistic</a></h3>
				: <div>
					<p>y-statistic: </p>
					<select value={yStatistic} onChange={(e) => updateY(e)}>
						<option value="min">Min</option>
						<option value="mean">Mean</option>
						<option value="median">Median</option>
						<option value="max">Max</option>
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