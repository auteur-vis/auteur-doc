import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import Draft from "../../../auteur/src/lib/Draft.js";
import Threshold from "../../../auteur/src/lib/Threshold.js";

// data from https://rkabacoff.github.io/qacData/reference/coffee.html
import coffee from "../../public/arabica_data_cleaned_top15.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/Threshold/Scatter/Outlier',
};

export const Outlier = () => {

	const ref = useRef("outlier");

	const chart = useRef(new Draft());
	const newYMin = useRef(new Threshold("Flavor", "lowerBound", "leq"));
	const newYMax = useRef(new Threshold("Flavor", "upperBound", "geq"));

	// ... some code omitted ...

	const [data, setData] = React.useState(coffee);

	let layout={"width":500,
	   		   "height":500,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		// create a tooltip
		var tooltip = svgElement.select("#tooltip")
						.attr("text-anchor", "middle")
						.attr("font-family", "sans-serif")
						.attr("font-size", 10)
					    .attr("opacity", 0);

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
									.join("rect")
									.attr("class", "scatterpoint")
									.attr("x", d => xScale(d["Aroma"]) - 3)
									.attr("y", d => yScale(d["Flavor"]) - 3)
									.attr("width", 6)
									.attr("height", 6)
									.attr("opacity", 0.3)

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
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

		// ... some code omitted ...

		let colorScale = d3.scaleSequential(d3.interpolateViridis)
							.domain(d3.extent(data, d => d["Aroma"]));

		const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

		newYMin.current.updateStyles(styles);

		chart.current.chart(ref.current)
					.selection(scatterpoints)
					.x("Aroma", xScale)
					.y("Flavor", yScale)
					.include({"name":["line", "fill", "stroke", "opacity", "text"]})
					.augment(newYMin.current.union(newYMax.current));

	}, [data])

	return (
		<div>
			<svg id="less" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<text id="tooltip" />
			</svg>
		</div>
	)
}

Outlier.story = {
  name: 'Outlier',
};