export const html = `<div>
    <div>
        <p>y-axis threshold: </p>
        <input
            type="range"
            id="selectQuantity"
            name="quantity"
            min="6" max="9"
            step="0.01"
            value="8" />
    </div>
    <svg id="svg">
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`