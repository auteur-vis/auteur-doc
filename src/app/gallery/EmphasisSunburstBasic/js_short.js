export const js_short = `import { Draft, Emphasis } from "auteur";

const chart = new Draft();
const newEmphasis = new Emphasis("value", "max");

newEmphasis.selection(arcs);

chart.layer("#svg")
        .exclude({"name":["fill"]})
        .augment(newEmphasis.getAugs());
`