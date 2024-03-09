export const html = `<div>
    <div>
        <p>x-axis threshold: </p>
        <input
          type="range"
          id="selectX"
          name="quantity"
          min="7.9" max="8.7"
          step="0.01"
          value="8.3">
        </input>
    </div>
    <div>
        <p>y-axis threshold: </p>
        <input
          type="range"
          id="selectY"
          name="quantity"
          min="8.2" max="8.9"
          step="0.01"
          value="8.55">
        </input>
    </div>
    <div>
        <p>merge by: </p>
        <select id="mergeBy">
            <option value="union">Union</option>
            <option value="intersect">Intersect</option>
            <option value="symmdiff">symmdiff</option>
        </select>
    </div>
    <svg id="svg">
        <g id="mark"></g>
        <g id="xAxis"></g>
        <g id="yAxis"></g>
    </svg>
</div>
`