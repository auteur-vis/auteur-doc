export const js_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("value", "max");

draft.layer('#svg')
      .selection(leafRects)
      .exclude({"name":["fill"]})
      .augment(newEmphasis.getAugs());
`