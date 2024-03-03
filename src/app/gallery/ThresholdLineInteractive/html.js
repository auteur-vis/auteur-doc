export const html = `<div>
    <div>
        <p>y-axis threshold: </p>
        <input
            type="range"
            id="selectQuantity"
            name="quantity"
            min="-5" max="25"
            value="8" />
    </div>
    <svg id="svg">
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`