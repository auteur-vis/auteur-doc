export const html = `<div>
    <div>
        <p>y-axis threshold: </p>
        <input
            type="range"
            id="selectQuantity"
            name="quantity"
            min="-5" max="25"
            value="8">
        </input>
    </div>
    <svg id="svg">
        <g id="mark"></g>
        <g id="xAxis"></g>
        <g id="yAxis"></g>
    </svg>
</div>
`