import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import Draft from "../../../auteur/src/lib/Draft.js";
import DerivedValues from "../../../auteur/src/lib/DerivedValues.js";

// data from https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data
import climate from "../../public/climate.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/Derived/Line/Uncertainty',
};

export const Uncertainty = () => {

	function uncertaintyLowerBound(d) {
		return d.AverageTemperature - d.AverageTemperatureUncertainty;
	}

	function uncertaintyUpperBound(d) {
		return d.AverageTemperature + d.AverageTemperatureUncertainty;
	}

	const style = {"multiple":{"stroke-width":"1px", "stroke-dasharray":"2px 2px"}};

	const ref = useRef("lineformula");

	const chart = useRef(new Draft());
	const newDerivedUpper = useRef(new DerivedValues('AverageTemperature', "AverageTemperatureUncertainty", "add", undefined, style));
	const newDerivedLower = useRef(new DerivedValues('AverageTemperature', "AverageTemperatureUncertainty", "sub", undefined, style));

	// ... some code omitted ...

	const [data, setData] = React.useState(climate.filter(d => d.year >= 2011));

	let layout={"width":900,
	   		   "height":500,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	useEffect(() => {

		let svgElement = d3.select(ref.current);

		const dataTime = data.map((d) => {
			let dateSplit = d.dt.split("-");
			let formatDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
			d.date = formatDate;
			return d;
		})

		let grouped = d3.group(dataTime, d => d.City);

		// create a tooltip
		var tooltip = svgElement.select("#tooltip")
						.attr("text-anchor", "middle")
						.attr("font-family", "sans-serif")
						.attr("font-size", 10)
					    .attr("opacity", 0);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scaleTime()
					.domain(d3.extent(dataTime, d => d["date"]))
					.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
							.domain([d3.min(dataTime, d => d.AverageTemperature - d.AverageTemperatureUncertainty), d3.max(dataTime, d => d.AverageTemperature + d.AverageTemperatureUncertainty)])
							.range([layout.height - layout.marginBottom, layout.marginTop]);

		let sizeScale = d3.scaleLinear()
							.domain(d3.extent(dataTime, d => d["AverageTemperature"]))
							.range([3, 6]);

		let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
							.domain(['Chicago', 'Los Angeles', 'New York']);

		let lineFunction = d3.line()
							 .x(d => xScale(d["date"]))
							 .y(d => yScale(d["AverageTemperature"]));

		let flattenGroup = [...grouped].map(d => {
			return d[1].map(di => {di.City = d[0]; return di});
			return d[1]
		});

		let lines = svgElement.select("#mark")
									.selectAll(".climateLine")
									.data(flattenGroup)
									.join("path")
									.attr("class", "climateLine")
									.attr('fill', 'none')
									.attr('stroke-width', 1.5)
									.attr("stroke", d => colorScale(d[0].City))
									.attr("d", d => {
										return lineFunction(d)
									})

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["date"])
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
				  .data(["Average Temperature"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d)

		// ... some code omitted ...

		// const styles = {"stroke": {"stroke": (d, i) => colorScale(d[0].City), "stroke-width": "2px"}};

		// newYThreshold.current.updateStyles(styles);

		chart.current.chart(ref.current)
					.selection(lines)
					.x("date", xScale)
					.y("AverageTemperature", yScale)
					.exclude({"name":["fill"]})
					.augment(newDerivedUpper.current.getAugs())
					.augment(newDerivedLower.current.getAugs());

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

Uncertainty.story = {
  name: 'Uncertainty',
};