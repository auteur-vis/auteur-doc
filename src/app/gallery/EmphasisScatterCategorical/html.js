export const html = `<div> 
    <div>
        <p>Highlight variable </p>
        <select id="varSelector">
            <option value="Country">Country</option>
            <option value="Color">Color</option>
            <option value="Variety">Variety</option>
        </select>
        <p>when value is: </p>
        <select id="optionsSelector">
        </select>
    </div>
    <svg id="svg">
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`