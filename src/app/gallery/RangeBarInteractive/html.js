export const html = `<div>
  <div>
      <p>min threshold: </p>
      <input
          type="range"
          id="selectMin"
          name="quantity"
          min=8
          max=8.8
          step="0.01"
          value="8">
      </input>
  </div>
  <div>
      <p>max threshold: </p>
      <input
          type="range"
          id="selectMax"
          name="quantity"
          min=8
          max=8.8
          step="0.01"
          value="8.5">
      </input>
  </div>
  <svg id="svg">
      <g id="mark"></g>
      <g id="xAxis"></g>
      <g id="yAxis"></g>
  </svg>
</div>
`