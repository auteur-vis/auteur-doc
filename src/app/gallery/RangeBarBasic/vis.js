import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Range } from "auteur";

import coffee from "../coffee.json";

export default function Vis({size={"width":500, "height":500}, sparse=false}) {

	let countries = ["Colombia", "Guatemala", "Brazil", "Costa Rica", "Ethiopia"];
	let varieties = ["Other", "Arusha", "Bourbon", "Caturra", "Catuai", "Pacamara", "Gesha"];

	let filteredCoffee = coffee.filter((d) => {return countries.indexOf(d.Country) >= 0 && varieties.indexOf(d.Variety) >= 0});

	let series = d3.stack()
					.keys(Array.from(new Set(filteredCoffee.map(d => d.Variety))))
					.value(([, D], key) => D.get(key) ? D.get(key).length : 0)(d3.group(filteredCoffee, d => d["Country"], d => d.Variety));
	let flatten = [];

	for (let t of series) {

		let variety = t.key;

		for (let m of t) {

			let country = m.data[0];

			flatten.push({"country":country, "variety":variety, "0":m[0], "1":m[1], "count":m[1] - m[0]});
		}

	}

	const ref = useRef("barstacked");
	const [data, setData] = React.useState(flatten);

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
						.domain(countries)
						.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleLinear()
						.domain([0, d3.max(data, d => d["1"])])
						.range([layout.height - layout.marginBottom, layout.marginTop]);

		let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
							.domain(d3.extent(data, d => d.variety));

		let reversed = varieties.reverse();

		if (!sparse) {
			let legend = svgElement.select("#legend")
							.selectAll(".legendRect")
							.data(reversed)
							.join("rect")
							.attr("class", "legendRect")
							.attr("x", (d, i) => layout.width - 100)
							.attr("y", (d, i) => layout.marginTop + 16 * i)
							.attr("width", 10)
							.attr("height", 10)
							.attr("fill", d => colorScale(d))
							.attr("fill-opacity", 0.5)

			let legendText = svgElement.select("#legend")
							.selectAll(".legendText")
							.data(reversed)
							.join("text")
							.attr("class", "legendText")
							.attr("x", (d, i) => layout.width - 100 + 16)
							.attr("y", (d, i) => layout.marginTop + 16 * i + 9)
							.attr("fill", d => colorScale(d))
							.attr("text-anchor", "start")
							.attr("font-family", "sans-serif")
							.attr("font-size", "10")
							.text(d => d)
		}

		let xAxisStyle;

		if (sparse) {
			xAxisStyle = d3.axisBottom(xScale).ticks(5).tickValues([]);
		} else {
			xAxisStyle = d3.axisBottom(xScale).ticks(5);
		}

		let yAxisStyle;

		if (sparse) {
			yAxisStyle = d3.axisLeft(xScale).ticks(5).tickValues([]);
		} else {
			yAxisStyle = d3.axisLeft(xScale).ticks(5);
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
				  .call(yAxisStyle)
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		svgElement.select("#yAxis").selectAll("#yTitle")
				  .data(["Count"])
				  .join("text")
				  .attr("id", "yTitle")
				  .attr("text-anchor", "middle")
				  .attr("transform", `translate(0, 40)`)
				  .attr("fill", "black")
				  .text(d => d);

		let groups = svgElement.select("#mark")
							.selectAll(".bar")
							.data(data)
							.join("rect")
							.attr("class", "bar")
							.attr("x", d => xScale(d.country) + 8)
							.attr("y", d => yScale(d["1"]))
							.attr("width", xScale.bandwidth() - 16)
							.attr("height", d => yScale(d["0"]) - yScale(d["1"]))
							.attr("fill", d => colorScale(d.variety))
							.attr("fill-opacity", 0.5);

		const range = new Range("count", [25, 50]);

		const styles = {"stroke": {"stroke": "red", "stroke-width": "2px"}};
		range.selection(groups).updateStyles(styles);

		const draft = new Draft();

		draft.layer("#svg")
			.x("country", xScale)
			.y("count", yScale)
			.include({"name":["stroke", "opacity"]})
			.augment(range.getAugs());

	}, [data])

	return (
		<div>
			{sparse
				? <h3><a href="./gallery/RangeBarBasic">stacked bar chart</a></h3>
				: <div />
			}
			<svg id="svg" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<g id="legend" />
			</svg>
		</div>
	)
}