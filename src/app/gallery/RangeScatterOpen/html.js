export const html = `<div>
    <div>
      <p>min threshold: </p>
      <input
        type="range"
        id="selectMin"
        name="quantity"
        min=6
        max=8.5
        step="0.01"
        value="6.5" />
    </div>
    <div>
      <p>max threshold: </p>
      <input
        type="range"
        id="selectMax"
        name="quantity"
        min=6
        max=8.5
        step="0.01"
        value="8" />
    </div>
    <svg id="svg">
        <g id="augmentations" />
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`