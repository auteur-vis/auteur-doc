export const js_short = `import { Draft, Emphasis } from "auteur";

const chart = new Draft();
const newEmphasis = new Emphasis("value", "max");

chart.layer("#svg")
        .selection(arcs)
        .exclude({"name":["fill"]})
        .augment(newEmphasis.getAugs());
`