export const html = `<div>
  <div>
    <p>Highlight group when value is greater or equal to: </p>
    <input
      type="range"
      id="selectQuantity"
      name="quantity"
      min="0" max="12870"
      value="9930" />
  </div>
  <svg id="svg">
  	  <g id="augmentations" />
      <g id="mark" />
      <g id="xAxis" />
      <g id="yAxis" />
  </svg>
</div>
`