export const html = `<div>
  <div>
    <p>Highlight group when value is greater or equal to: </p>
    <input
      type="range"
      id="selectQuantity"
      name="quantity"
      min="0" max="12870"
      value="9930">
    </input>
  </div>
  <svg id="svg">
  	  <g id="augmentations"></g>
      <g id="mark"></g>
      <g id="xAxis"></g>
      <g id="yAxis"></g>
  </svg>
</div>
`