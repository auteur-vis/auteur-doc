export const html = `<div>
    <div>
        <p>Highlight variable</p>
        <select id="selectVar">
            <option value="Aroma">Aroma</option>
            <option value="Flavor">Flavor</option>
            <option value="Aftertaste">Aftertaste</option>
            <option value="Acidity">Acidity</option>
            <option value="Body">Body</option>
            <option value="Balance">Balance</option>
            <option value="Uniformity">Uniformity</option>
            <option value="Clean.Cup">Clean.Cup</option>
            <option value="Sweetness">Sweetness</option>
        </select>
        <p>when value is: </p>
        <input
            type="number"
            id="selectQuantity"
            name="quantity"
            min="0" max="10"
            step="0.01"
            value="6" />
        <p>and when Variety is: </p>
        <select id="selectVariety">
        </select>
    </div>
    <svg id="svg">
        <g id="mark" />
        <g id="xAxis" />
        <g id="yAxis" />
    </svg>
</div>
`