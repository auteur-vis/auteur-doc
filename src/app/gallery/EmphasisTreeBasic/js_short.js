export const js_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("value", "max");

newEmphasis.selection(leafRects);

draft.layer('#svg')
      .exclude({"name":["fill"]})
      .augment(newEmphasis.getAugs());
`