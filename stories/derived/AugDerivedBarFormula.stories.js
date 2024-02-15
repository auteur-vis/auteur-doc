import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";
import { FormulaBuilder } from "./FormulaBuilder.js";

import Draft from "../../../auteur/src/lib/Draft.js";
import DerivedValues from "../../../auteur/src/lib/DerivedValues.js";

// data from https://rkabacoff.github.io/qacData/reference/coffee.html
import coffee from "../../public/arabica_data_cleaned_top15.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/Derived/Bar/Formula',
};

export const Formula = () => {

	const style = {"multiple":{"fill":"steelblue", "opacity":1}};

	const ref = useRef("constant");
	const chart = useRef(new Draft())
	chart.current.chart(ref.current);

	const [data, setData] = React.useState(coffee.slice(0, 15).map(d => {
		d.Rating = d["Total.Cup.Points"] / 10;
		return d;
	}));
	const [formula, setFormula] = useState('return 0;');
	const newYConstant = useRef(null);
	const datapoint = useRef(JSON.parse(JSON.stringify(coffee.slice(0, 10)[0])))

	let layout={"width":900,
	   		   "height":500,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":50};

	function updatePlot() {

		let svgElement = d3.select(ref.current);

		// create a tooltip
		var tooltip = svgElement.select("#tooltip")
						.attr("text-anchor", "middle")
						.attr("font-family", "sans-serif")
						.attr("font-size", 10)
					    .attr("opacity", 0);

		svgElement.attr("width", layout.width)
				.attr("height", layout.height);

		let xScale = d3.scaleBand()
						.domain(data.map(d => d["FIELD1"]))
						.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
						.domain([7, d3.max(data, d => d.Rating)])
						.range([layout.height - layout.marginBottom, layout.marginTop]);

		let bars = svgElement.select("#mark")
							.selectAll(".bar")
							.data(data)
							.join("rect")
							.attr("class", "bar")
							.attr("x", d => xScale(d["FIELD1"]) + 1)
							.attr("y", d => yScale(d["Rating"]))
							.attr("width", xScale.bandwidth() - 2)
							.attr("height", d => yScale(7) - yScale(d["Rating"]))
							.attr("fill", "steelblue")
							.attr("opacity", "0.5")
							.on("mouseover", (event, d) => {

								let xPos = xScale(d["FIELD1"]) + xScale.bandwidth() / 2;
								let yPos = yScale(d["Rating"]) - 8;

								tooltip.attr("transform", `translate(${xPos}, ${yPos})`)
										.attr("opacity", 1)
										.text(`${d["Rating"]} Expert Rating`);

							})
							.on("mouseout", (event, d) => {

								tooltip.attr("opacity", 0);

							});

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		chart.current.selection(bars)
					.x("FIELD1", xScale)
					.y("Rating", yScale)
					.exclude({"name":["line"]})
					.augment(newYConstant.current.getAugs());

		let xAxis = svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#xAxis").selectAll("#xTitle")
				  .data(["FIELD1 (ID)"])
				  .join("text")
				  .attr("id", "xTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(${layout.width/2}, 30)`)
				  .attr("fill", "black")
				  .text(d => d);

		let yAxis = svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		svgElement.select("#yAxis").selectAll("#yTitle")
				  .data(["Rating"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d);
	}

	useEffect(() => {

		if (newYConstant.current) {
			newYConstant.current.updateFunction(new Function('d', formula));
		} else {
			newYConstant.current = new DerivedValues('Rating', undefined, undefined, new Function('d', formula), style);
		}
		
		let newAug2 = newYConstant.current.getAugs();
		chart.current.augment(newAug2);

	}, [formula])

	useEffect(() => {
		
		newYConstant.current = new DerivedValues('Rating', undefined, undefined, new Function('d', formula), style);
		updatePlot()
		let newAug2 = newYConstant.current.getAugs();
		chart.current.augment(newAug2);

	}, [data])

	return (
		<div>
			<div>
			<FormulaBuilder setFormula = {setFormula} dataPoint = {datapoint.current}/>
			</div>
			{/* <div>
				<p>Showing Flavor * {yConstant}: </p>
				<input
					type="range"
					id="quantity"
					name="quantity"
					min="0" max="1"
					step="0.1"
					value={yConstant}
					onChange={(e) => updateY(e)} />
			</div> */}
			<svg id="barless" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<text id="tooltip" />
			</svg>
		</div>
	)
}

Formula.story = {
  name: 'Formula',
};