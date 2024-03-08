export const html = `<div>
  <div>
    <p>Highlight group when value is between min:</p>
    <input
      type="range"
      id="minSelect"
      name="quantity"
      min="0" max="432629"
      value="9930" />
    <p>max:</p>
    <input
      type="range"
      id="maxSelect"
      name="quantity"
      min="0" max="432629"
      value="12000" />
  </div>
  <svg id="svg">
  	  <g id="augmentations" />
      <g id="mark" />
      <g id="xAxis" />
      <g id="yAxis" />
  </svg>
</div>
`