import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import Draft from "../../../auteur/src/lib/Draft.js";
import Range from "../../../auteur/src/lib/Range.js";

// data from https://rkabacoff.github.io/qacData/reference/coffee.html
import coffee from "../../public/arabica_data_cleaned_top15.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Aug/Range/Heatmap/Auteur',
};

export const Auteur = () => {

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

	let layout={"width":560,
	   		   "height":400,
	   		   "marginTop":50,
	   		   "marginRight":50,
	   		   "marginBottom":50,
	   		   "marginLeft":110};

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

		let xScale = d3.scaleBand()
						.domain(countries)
						.range([layout.marginLeft, layout.width - layout.marginRight]);

		let yScale = d3.scaleBand()
						.domain(data.map(d => d.variety).sort())
						.range([layout.height - layout.marginBottom, layout.marginTop]);

		let colorScale = d3.scaleSequential(d3.interpolateGnBu)
							.domain(d3.extent(data, d => d.count));

		svgElement.select("#xAxis")
				  .call(d3.axisBottom(xScale))
				  .attr("transform", `translate(0, ${layout.height - layout.marginBottom})`);

		svgElement.select("#yAxis")
				  .call(d3.axisLeft(yScale).ticks(5))
				  .attr("transform", `translate(${layout.marginLeft}, 0)`);

		let groups = svgElement.select("#mark")
							.selectAll(".cell")
							.data(data)
							.join("rect")
							.attr("class", "cell")
							.attr("x", d => xScale(d.country) + 1)
							.attr("y", d => yScale(d.variety) + 1)
							.attr("width", xScale.bandwidth() - 2)
							.attr("height", d => yScale.bandwidth() - 2)
							.attr("stroke", "gray")
							.attr("fill", d => 
								d.count != 0 ? colorScale(d.count) : "none")
							.attr("fill-opacity", 0.5);

		const range = new Range("count", [25, 50]);

		const styles = {"stroke": {"stroke": "red", "stroke-width": "2px"}};
		range.updateStyles(styles);

		const draft = new Draft();

		draft.chart("#svg")
			.selection(groups)
			.x("country", xScale)
			.y("count", yScale)
			.include({"name":["stroke", "opacity"]})
			.augment(range.getAugs());

	}, [data])

	return (
		<div>
			<svg id="barless" ref={ref}>
				<g id="mark" />
				<g id="xAxis" />
				<g id="yAxis" />
				<text id="tooltip" />
			</svg>
		</div>
	)
}

Auteur.story = {
  name: 'Auteur',
};