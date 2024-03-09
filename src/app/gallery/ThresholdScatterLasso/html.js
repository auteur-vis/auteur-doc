export const html = `<div>
    <div>
        <p>Preferred Flavor threshold: </p>
        <input
          type="range"
          id="selectQuantity"
          name="quantity"
          min="6" max="9"
          step="0.01"
          value="7.25">
        </input>
    </div>
    <svg id="svg">
        <g id="mark"></g>
        <g id="xAxis"></g>
        <g id="yAxis"></g>
    </svg>
</div>
`