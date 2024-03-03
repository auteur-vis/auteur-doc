export const html = `<div>
    <div>
        <p>y-axis threshold: </p>
        <input
            type="range"
            id="selectQuantity"
            name="quantity"
            min="0" max="236"
            value="150" />
    </div>
    <div>
        <p>y-axis operation: </p>
        <select id="selectType">
            <option value="eq">Equals</option>
            <option value="le">Less Than</option>
            <option value="leq">Less Than or Equals To</option>
            <option value="ge">Greater Than</option>
            <option value="geq">Greater Than or Equals To</option>
        </select>
    </div>
    <svg id="svg">
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`