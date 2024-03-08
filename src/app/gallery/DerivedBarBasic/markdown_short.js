export const markdown_short = `import { Draft, DerivedValues } from "auteur";

const draft = new Draft();
const newDerivedValues = new DerivedValues("Flavor", 0.1, "sub", undefined, style);

draft.layer(ref.current)
	  .selection(bars)
	  .x("FIELD1", xScale)
	  .y("Flavor", yScale)
	  .exclude({"name":["line"]})
	  .augment(newDerivedValues.getAugs());
`