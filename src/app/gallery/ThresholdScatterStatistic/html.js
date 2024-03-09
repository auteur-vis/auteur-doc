export const html = `<div>
    <div>
        <p>y-statistic: </p>
        <select id="selectStat">
            <option value="min">Min</option>
            <option value="mean">Mean</option>
            <option value="median">Median</option>
            <option value="max">Max</option>
        </select>
    </div>
    <svg id="svg">
        <g id="mark"></g>
        <g id="xAxis"></g>
        <g id="yAxis"></g>
    </svg>
</div>
`