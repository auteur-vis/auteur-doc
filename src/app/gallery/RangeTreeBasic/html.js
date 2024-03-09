export const html = `<div>
  <div>
    <p>Highlight group when value is between min:</p>
    <input
      type="range"
      id="minSelect"
      name="quantity"
      min="0" max="12870"
      value="9930">
    </input>
    <p>max:</p>
    <input
      type="range"
      id="maxSelect"
      name="quantity"
      min="0" max="12870"
      value="12000">
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