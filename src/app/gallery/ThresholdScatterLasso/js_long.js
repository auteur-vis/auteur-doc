export const js_long = `import * as d3 from "d3";

import { Draft, Threshold } from "auteur";

import coffee from "../coffee.json";

export const Vis = () => {

  let yThreshold = 7.25;
  let selectedPoints;

  const draft = new Draft();
  const newYThreshold = new Threshold("Flavor", yThreshold, "geq");

  let selectQuantity = document.getElementById('selectQuantity');
  selectQuantity.addEventListener(
    'change',
    function(e) { updateY(e); },
    false
  );

  const data = coffee;

  let layout={"width":500,
             "height":500,
             "marginTop":50,
             "marginRight":50,
             "marginBottom":50,
             "marginLeft":50};

  // set up listeners that will follow this gesture all along
  // (even outside the target canvas)
  function trackPointer(e, { start, move, out, end }) {
    const tracker = {},
      id = (tracker.id = e.pointerId),
      target = e.target;
    tracker.point = d3.pointer(e, target);
    target.setPointerCapture(id);

    d3.select(target)
      .on(${"`"}pointerup.${"$"}{id} pointercancel.${"$"}{id} lostpointercapture.${"$"}{id}${"`"}, (e) => {
        if (e.pointerId !== id) return;
        tracker.sourceEvent = e;
        d3.select(target).on(${"`"}.${"$"}{id}${"`"}, null);
        target.releasePointerCapture(id);
        end && end(tracker);
      })
      .on(${"`"}pointermove.${"$"}{id}${"`"}, (e) => {
        if (e.pointerId !== id) return;
        tracker.sourceEvent = e;
        tracker.prev = tracker.point;
        tracker.point = d3.pointer(e, target);
        move && move(tracker);
      })
      .on(${"`"}pointerout.${"$"}{id}${"`"}, (e) => {
        if (e.pointerId !== id) return;
        tracker.sourceEvent = e;
        tracker.point = null;
        out && out(tracker);
      });

    start && start(tracker);
  }

  let svgElement = d3.select("#svg");
  let svg = svgElement.node()
  let path = d3.geoPath();
  let l = svgElement.append("path")
                    .attr("class", "lasso")
                    .attr("fill", "none")
                    .attr("stroke", "red")
                    .attr("stroke-width", "2px");

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
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("transform", ${"`"}translate(0, ${"$"}{layout.height - layout.marginBottom})${"`"});

  svgElement.select("#xAxis").selectAll("#xTitle")
            .data(["Aroma"])
            .join("text")
            .attr("id", "xTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(${"$"}{layout.width/2}, 30)${"`"})
            .attr("fill", "black")
            .text(d => d);

  svgElement.select("#yAxis")
            .call(d3.axisLeft(yScale).ticks(5))
            .attr("transform", ${"`"}translate(${"$"}{layout.marginLeft}, 0)${"`"});

  svgElement.select("#yAxis").selectAll("#yTitle")
            .data(["Flavor"])
            .join("text")
            .attr("id", "yTitle")
            .attr("text-anchor", "middle")
            .attr("transform", ${"`"}translate(0, 40)${"`"})
            .attr("fill", "black")
            .text(d => d)

  // Lasso adapted from https://observablehq.com/@fil/lasso-selection
  function lasso() {
      const dispatch = d3.dispatch("start", "lasso", "end");
      const lasso = function(selection) {
      const node = selection.node();
      const polygon = [];

      selection
        .on("touchmove", e => e.preventDefault()) // prevent scrolling
        .on("pointerdown", e => {
          trackPointer(e, {
            start: p => {
              polygon.length = 0;
              dispatch.call("start", node, polygon);
            },
            move: p => {
              polygon.push(p.point);
              dispatch.call("lasso", node, polygon);
            },
            end: p => {
              dispatch.call("end", node, polygon);
            }
          });
        });
      };
      lasso.on = function(type, _) {
      return _ ? (dispatch.on(...arguments), lasso) : dispatch.on(...arguments);
      };

      return lasso;
  }

  function draw(polygon) {
      l.datum({
        type: "LineString",
        coordinates: polygon
      }).attr("d", path);

      const selected = polygon.length > 2 ? [] : data;

      // note: d3.polygonContains uses the even-odd rule
      // which is reflected in the CSS for the lasso shape
      let isSelected = scatterpoints.filter(
        (d) => {
          let coords = [xScale(d["Aroma"]), yScale(d["Flavor"])]
          return polygon.length > 2 && d3.polygonContains(polygon, coords)}
      );

      updateSelected(isSelected);

      svg.value = { polygon, selected };
      svg.dispatchEvent(new CustomEvent('input'));
  }

  svgElement.call(lasso().on("start lasso end", draw));

  let colorScale = d3.scaleSequential(d3.interpolateMagma)
                      .domain(d3.extent(data, d => d["Aroma"]));

  const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

  newYThreshold.updateStyles(styles);

  draft.layer("#svg")
      .selection(scatterpoints)
      .x("Aroma", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["regression", "label"]})
      .augment(newYThreshold.getAugs());

  function updateSelected(selectedPoints) {
    newYThreshold.selection(selectedPoints);
    let newAug2 = newYThreshold.getAugs();
    
    draft.augment(newAug2);
  }

  function updateY(e) {
    yThreshold = e.target.value;

    newYThreshold.updateVal(yThreshold);
    let newAug2 = newYThreshold.getAugs();
    
    draft.augment(newAug2);
  }

}

Vis.story = {
  name: 'Vis',
};
`