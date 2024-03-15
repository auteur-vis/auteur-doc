export const markdown_long = `import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import { Draft, Emphasis } from "auteur";

import flare from "../flare.json";

// This visualization is adapted from https://observablehq.com/@d3/treemap-stratify?intent=fork
export default function Vis() {

    const ref = useRef("treemap");
    const draft = useRef(new Draft());
    const newEmphasis = useRef(new Emphasis("value", "max"));

    let layout={"width":900,
               "height":900,
               "marginTop":50,
               "marginRight":50,
               "marginBottom":50,
               "marginLeft":50};

    // This custom tiling function adapts the built-in binary tiling function
    // for the appropriate aspect ratio when the treemap is zoomed-in.
    function tile(node, x0, y0, x1, y1) {
        d3.treemapBinary(node, 0, 0, layout.width, layout.height);
        for (const child of node.children) {
          child.x0 = x0 + child.x0 / layout.width * (x1 - x0);
          child.x1 = x0 + child.x1 / layout.width * (x1 - x0);
          child.y0 = y0 + child.y0 / layout.height * (y1 - y0);
          child.y1 = y0 + child.y1 / layout.height * (y1 - y0);
        }
    }

    const data = d3.stratify().path(d => d.name.replace(/${"\\"}./g, "/"))(flare);

    // Specify the color scale.
    const color = d3.scaleOrdinal(data.children.map(d => d.id.split("/").at(-1)), d3.schemeTableau10);

    // Compute the layout.
    const root = d3.treemap()
        .tile(d3.treemapSquarify) // e.g., d3.treemapSquarify
        .size([layout.width, layout.height])
        .padding(1)
        .round(true)
    (d3.hierarchy(data)
        .sum(d => d.data.size)
        .sort((a, b) => b.value - a.value));

    const format = d3.format(",d");

    const [leaves, setLeaves] = useState(root.leaves());

    useEffect(() => {

        let svg = d3.select(ref.current);

        svg.attr("width", layout.width)
            .attr("height", layout.height)
            .style("font-family", "sans-serif")
            .style("font-size", "11px");

        // Add a cell for each leaf of the hierarchy, with a link to the corresponding GitHub page.
        const leaf = svg.selectAll("g")
            .data(leaves)
            .join("a")
                .attr("transform", d => ${"`"}translate(${"$"}{d.x0},${"$"}{d.y0})${"`"});

        // Append a clipPath to ensure text does not overflow.
        leaf.append("clipPath")
          .attr("id", (d, i) => (d.clipUid = ${"`"}clip-${"$"}{i}${"`"}))
          .append("rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0);

        // Append a color rectangle. 
        let leafRects = leaf.append("rect")
            .attr("fill", d => color(d.data.id.split("/").at(2)))
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0);

        // Append multiline text. The last line shows the value and has a specific formatting.
        leaf.append("text")
            .attr("clip-path", (d, i) => ${"`"}url(#clip-${"$"}{i})${"`"})
        .selectAll("tspan")
        .data(d => d.data.id.split("/").at(-1).split(/(?=[A-Z][a-z])|${"\\"}s+/g).concat(format(d.value)))
        .join("tspan")
            .attr("x", 3)
            .attr("y", (d, i, nodes) => ${"`"}${"$"}{(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em${"`"})
            .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            .text(d => d);

        newEmphasis.current.selection(leafRects);

        draft.current.layer(ref.current)
                    .exclude({"name":["fill"]})
                    .augment(newEmphasis.current.getAugs());

    }, [leaves])    

    return (
        <div>
            <svg id="less" ref={ref}>
                <g id="mark" />
                <g id="xAxis" />
                <g id="yAxis" />
            </svg>
        </div>
    )
}
`