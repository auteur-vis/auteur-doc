export const html = `<div>
    <div>
        <p>min x-threshold: </p>
        <input
            type="range"
            id="selectMinX"
            name="quantity"
            min=6.5
            max=8.5
            step="0.01"
            value="7.5" />
    </div>
    <div>
        <p>max x-threshold: </p>
        <input
            type="range"
            id="selectMaxX"
            name="quantity"
            min=6.5
            max=8.5
            step="0.01"
            value="8" />
    </div>
    <div>
        <p>min y-threshold: </p>
        <input
            type="range"
            id="selectMinY"
            name="quantity"
            min=6.5
            max=8.5
            step="0.01"
            value="6.5" />
    </div>
    <div>
        <p>max y-threshold: </p>
        <input
            type="range"
            id="selectMaxY"
            name="quantity"
            min=6.5
            max=8.5
            step="0.01"
            value="7.5" />
    </div>
    <svg id="svg">
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`