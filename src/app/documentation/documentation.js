"use client"; // This is a client component

import React, {useState, useEffect} from 'react';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Markdown from 'react-markdown'

import styles from "../subpage.module.css";

export default function Documentation() {

  return (
    <div>

      <div className={styles.section}>
        <p>There are three main classes of objects in Auteur - Generation Criteria, Augmentations, and Drafts.
            Generation Criteria are templates that can be parameterized based on the data relationships relevant to the usage context.
            Each generation criterion is mapped to multiple Augmentations. For example, the data relationship x&#60;15 can be expressed
            using the Threshold generation criterion as <code className={styles.code}>Threshold("x", 15, "leq")</code>. This Threshold
            is mapped to multiple augmentations that can be used to express the specified relationship: a threshold line at x = 15,
            changing the fill, opacity, and stroke encodings of points less than or equal 15, and so on.</p>
            
        <p className={styles.sectionContent}To use a generation criterion, it needs to be parameterized. That is to say, we need to specify the details of the relationship.
            In the above example, we use the parameters "x", 15, and "leq" (less than equals). Once a generation criterion has been
            parameterized, a <code className={styles.code}>.selection(D3Selection)</code> or <code className={styles.code}>.select(CSSSelector)</code>
            needs to be defined. This determines the SVG elements the augmentations will be applied to.</p>

        <p className={styles.sectionContent}>Finally, an array of Augmentations can be generated using the <code className={styles.code}>.getAugs()</code> function to
            convey the details of the data relationship. This list of augmentations and a target D3 visualization can be input to the Draft object, which then renders
            the augmentations onto the visualization. An overview of this workflow is shown below:</p>
        <img src="/auteur-doc/algo.png" alt="overview of algorithm" style={{"width":"50%","marginTop":"20px"}}/>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="GenerationCriteria">Generation Criteria</h1>
        <p className={styles.sectionContent}>Auteur provides six generation criteria that serve as general templates for different types of data relationships.
          These six generation criteria are: Emphasis, Threshold, Range, Derived Values, Local Data, and Regression.
          Each generation criterion accepts a set of input parameters that determine the details of that data relationship.
          For example, the Threshold criterion has three parameters: the variable (data attribute), value (numerical or temporal
          value of the threshold), and type (less than, equals, greater than <i>etc</i>).
          </p>

        <h2 className={styles.sectionSubHeader}>Emphasis</h2>
        <p className={styles.sectionContent}>A single or an array of important values for a numerical (N) or categorical (C) variable.</p>
        <p className={styles.sectionContent}>Usage: <code className={styles.code}>new Emphasis(variable, value, type)</code></p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    variable
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>Name of variable of interest.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    value
                  </TableCell>
                  <TableCell><b><i>str/num/date or array of str/num/date or stat, default=None</i></b><br/>Value(s) to be emphasized.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    type
                  </TableCell>
                  <TableCell><b><i>"any" or "all", default="any"</i></b><br/>If array provided for value parameter, highlights data item if variable value matches "any" or "all" of the values in the array</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className={styles.sectionContent}><code className={styles.code}>.getAugs()</code> returns: Stroke, Label, Fill, Opacity, Regression</p>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Threshold</h2>
        <p className={styles.sectionContent}>A threshold value for a numerical (N) or temporal (T) variable.</p>
        <p className={styles.sectionContent}>Usage: <code className={styles.code}>new Threshold(variable, value, type)</code></p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    variable
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>Name of variable of interest.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    value
                  </TableCell>
                  <TableCell><b><i>num/date or stat, default=None</i></b><br/>Value to be used as threshold.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    type
                  </TableCell>
                  <TableCell><b><i>"eq" / "le" / "leq" / "ge" / "geq", default="eq"</i></b><br/>Highlights data item if variable value is "eq" (equal to), "le" (less than), "leq" (less than or equal to), "ge" (greater than) or "geq" (greater than or equal to) value parameter.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className={styles.sectionContent}><code className={styles.code}>.getAugs()</code> returns: Line, Text, Opacity, Stroke, Fill, Label, Regression</p>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Range</h2>
        <p className={styles.sectionContent}>A range of values for a numerical (N) or temporal (T) variable.</p>
        <p className={styles.sectionContent}>Usage: <code className={styles.code}>new Range(variable, value, type)</code></p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    variable
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>Name of variable of interest.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    value
                  </TableCell>
                  <TableCell><b><i>list of num/date or stat, default=None</i></b><br/>[min, max] value to be used as the extents of the range.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    type
                  </TableCell>
                  <TableCell><b><i>"closed" or "open", default="closed"</i></b><br/>If "closed" highlights data item if variable value is inclusive of [min, max] value parameter list. If "open" highlights data item if variable value is exclusive of [min, max] value parameter list - i.e. mathematically (min, max).</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className={styles.sectionContent}><code className={styles.code}>.getAugs()</code> returns: Rect, Text, Opacity, Stroke, Fill, Label, Regression</p>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Derived Values</h2>
        <p className={styles.sectionContent}>Value(s) calculated from existing numerical (N) variable(s).</p>
        <p className={styles.sectionContent}>Usage: <br /> <code className={styles.code}>new DerivedValues(variable, value, calculation)</code> or <br /> <code className={styles.code}>new DerivedValues(variable, undefined, undefined, function)</code></p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    variable
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>Variable to be used for calculation. If multiple variables are used, any one can be used as the initial "starting" variable.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    value
                  </TableCell>
                  <TableCell><b><i>num or str, default=None (optional)</i></b><br/>Adjust the initial "starting" variable by a constant num (numeric) value or another variable name str (another numeric variable) from the dataset.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    calculation
                  </TableCell>
                  <TableCell><b><i>"add" / "sub" / "mult" / "div", default="add" (optional)</i></b><br/>Adjust the initial "starting" variable by "add" (adding), "sub" (subtracting), "mult" (multiplying) or "div" (dividing) by the value parameter.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    function
                  </TableCell>
                  <TableCell><b><i>function, default=None (optional)</i></b><br/>Adjust the initial "starting" variable by applying a user defined function to the variable, the function takes a single data item (row) as input and should return a num.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className={styles.sectionContent}><code className={styles.code}>.getAugs()</code> returns: Mark, Line</p>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Local Data</h2>
        <p className={styles.sectionContent}>Additional data instances not originally in data set.</p>
        <p className={styles.sectionContent}>Usage: <code className={styles.code}>new LocalData(value)</code></p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    value
                  </TableCell>
                  <TableCell><b><i>array, default=None</i></b><br/>Array of new data instances, should resemble original data, i.e. [&#123;variable1:value1, variable2:value2, ...&#125;, ...].</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <p className={styles.sectionContent}><code className={styles.code}>.getAugs()</code> returns: Mark</p>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Regression</h2>
        <p className={styles.sectionContent}>Linear least squares regression trend line of items in data set.</p>
        <p className={styles.sectionContent}>Usage: <code className={styles.code}>new Regression()</code></p>
        <p className={styles.sectionContent}>The regression generation criterion uses the standard mathematical linear least squares approach and does not require any additional user input parameters.</p>
        <p className={styles.sectionContent}><code className={styles.code}>.getAugs()</code> returns: Line</p>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader} id="Selections">Selections</h2>

        <p className={styles.sectionContent}>Selections determine the SVG elements that augmentations will be applied to. They should be defined either for each Generation Criterion or for the entire
        Draft object as a whole. If defined on the Generation Criterion level, multiple Generation Criteria can have different selections even when added to the same visualization. If a single
        selection is defined for the Draft object, this selection applies to all generation criteria added to that Draft.</p>

        <h3 className={styles.sectionSubHeader}>.select(selector)</h3>
        <p className={styles.sectionContent}>A css selector that defines the svg element(s) that should be considered when applying the augmentations.
        For example, encoding-type augmentations will only be applied to data items within the selection. Either <code className={styles.code}>.select()</code> or
        <code className={styles.code}>.selection()</code> needs to be defined.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.select("circle")`}
        </code><br />
        <code className={styles.code}>
            {`.select(".{CLASSNAME}")`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    selector
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>A css selector of all svg elements to be included when applying augmentations.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <h3 className={styles.sectionSubHeader}>.selection(selection)</h3>
        <p className={styles.sectionContent}>A d3 selection that defines the svg element(s) that should be considered when applying the augmentations.
        For example, encoding-type augmentations will only be applied to data items within the selection. Either <code className={styles.code}>.select()</code> or
        <code className={styles.code}>.selection()</code> needs to be defined.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.selection(d3.selectAll("circle"))`}
        </code><br />
        <code className={styles.code}>
            {`.selection(d3.selectAll(".{CLASSNAME}"))`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    selection
                  </TableCell>
                  <TableCell><b><i>array, default=None</i></b><br/>A d3 selection of all svg elements to be included when applying augmentations.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader} id="CompoundCriteria">Compound Generation Criteria</h2>
        <p className={styles.sectionContent}>To further enhance the variety and expressiveness of the library, developers can apply multiple generation criteria to the same visualization.
          Since each generation criterion returns multiple augmentations, combining generation criteria requires a way to merge multiple sets of augmentations on the same visualization.
          Each generation criterion has three methods that can be used to combine its augmentations with another generation criterion using set operations - union, intersect, and symmdiff - to express more complex data relationships.</p>

        <img src="/auteur-doc/set_operations.png" alt="set operations for combining two different threshold generation criteria" style={{"width":"100%","marginTop":"20px"}}/>

        <h3 className={styles.sectionSubHeader}>.union(generationCriteria)</h3>
        <p className={styles.sectionContent}>Augmentations from all provided generation criteria are applied.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.union(generationCriterion)`}
        </code> OR<br />
        <code className={styles.code}>
            {`.union([generationCriterion, generationCriterion, ...])`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    generationCriteria
                  </TableCell>
                  <TableCell><b><i>generationCriterion or list of generationCriteria, default=None</i></b><br/>
                    A generation criterion or an array of generation criteria.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <h3 className={styles.sectionSubHeader}>.intersect(generationCriteria)</h3>
        <p className={styles.sectionContent}>Only augmentations at the intersection of all provided generation criteria are applied (i.e. satisfies all generation criteria).</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.intersect(generationCriterion)`}
        </code> OR<br />
        <code className={styles.code}>
            {`.intersect([generationCriterion, generationCriterion, ...])`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    generationCriteria
                  </TableCell>
                  <TableCell><b><i>generationCriterion or list of generationCriteria, default=None</i></b><br/>
                    A generation criterion or an array of generation criteria.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <h3 className={styles.sectionSubHeader}>.symmdiff(generationCriteria)</h3>
        <p className={styles.sectionContent}>The symmetric difference of augmentations for provided generation criteria (i.e. only augmentations that satisfy one of the provided generation criteria are applied).</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.symmdiff(generationCriterion)`}
        </code> OR<br />
        <code className={styles.code}>
            {`.symmdiff([generationCriterion, generationCriterion, ...])`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    generationCriteria
                  </TableCell>
                  <TableCell><b><i>generationCriterion or list of generationCriteria, default=None</i></b><br/>
                    A generation criterion or an array of generation criteria.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader} id="Customization">Customization</h2>

        <p className={styles.sectionContent}>The following functions can be used to select, filter, and customize augmentations.</p>

        <h3 className={styles.sectionSubHeader}>.updateStyles(styles, override)</h3>
        <p className={styles.sectionContent}>For fine-grained customization of augmentations, users can define their own styles for
          each augmentation returned by the <code className={styles.code}>.getAugs()</code> function.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.updateStyles({augmentationName:{cssStyles}, ...})`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    styles
                  </TableCell>
                  <TableCell><b><i>object, default=None</i></b><br/>
                    An object that contains the name of each augmentation mapped to the css styles to apply.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    override
                  </TableCell>
                  <TableCell><b><i>boolean, default=False</i></b><br/>
                    If False, merges new styles with current styles. If True, replaces current styles with new styles.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <h3 className={styles.sectionSubHeader}>.include(inclusions)</h3>
        <p className={styles.sectionContent}>Defines the augmentations to apply to the chart. Cannot be used with <code className={styles.code}>.exclude()</code>.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.include({"type": ["mark"]})`}
        </code><br />
        <code className={styles.code}>
            {`.include({"name": ["line", "opacity", "regression", "label", ...]})`}
        </code><br />
        <code className={styles.code}>
            {`.include({"type": ["encoding"], "name": ["line", "opacity", ...]})`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    inclusions
                  </TableCell>
                  <TableCell><b><i>object, default=None</i></b><br/>
                    Can contain an object mapped to an array of the type(s) of augmentations to include and/or an array of the name(s) of the augmentations to include.
                    Augmentation names are exactly identical to the <u><a href="#Augmentations">documentation</a></u> above.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <h3 className={styles.sectionSubHeader}>.exclude(exclusions)</h3>
        <p className={styles.sectionContent}>Defines the augmentations to exclude when applying augmentations to the chart.
        Cannot be used with <code className={styles.code}>.include()</code>.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.exclude({"type": ["mark"]})`}
        </code><br />
        <code className={styles.code}>
            {`.exclude({"name": ["line", "opacity", "regression", "label", ...]})`}
        </code><br />
        <code className={styles.code}>
            {`.exclude({"type": ["encoding"], "name": ["line", "opacity", ...]})`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    exclusions
                  </TableCell>
                  <TableCell><b><i>object, default=None</i></b><br/>
                    Can contain an object mapped to an array of the type(s) of augmentations to exclude and/or an array of the name(s) of the augmentations to exclude.
                    Augmentation names are exactly identical to the <a href="#Augmentations">documentation</a> above.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader} id="Stats">Stats</h2>
        <p className={styles.sectionContent}>For those generation criteria that express data relationships
          about a certain value or values (i.e. Threshold, Range, and Emphasis),
          these values can be custom specified by the user or calculated from statistical summaries.
          There are a total of eight statistical summary values that are accepted input parameters.</p>   

        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`new Emphasis(variable, "median")`}
        </code><br />
        <code className={styles.code}>
            {`new Threshold(variable, "upperbound", "geq")`}
        </code><br />
        <code className={styles.code}>
            {`new Range(variable, ["Q1", "Q3"])`}
        </code>
        </p>  

        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "min"
                  </TableCell>
                  <TableCell>Minimum value of a variable.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "max"
                  </TableCell>
                  <TableCell>Maximum value of a variable.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "mean"
                  </TableCell>
                  <TableCell>Statistical average of variable.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "median"
                  </TableCell>
                  <TableCell>Middle value of variable.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "Q1"
                  </TableCell>
                  <TableCell>Value of 25th quartile of variable.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "Q3"
                  </TableCell>
                  <TableCell>Value of 75th quartile of variable.
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "lowerbound"
                  </TableCell>
                  <TableCell>Q1 − 1.5 IQR, values below this lowerbound are considered outliers
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    "upperbound"
                  </TableCell>
                  <TableCell>Q3 + 1.5 IQR, values below this upperbound are considered outliers
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>   

      </div>



      {/* BEGIN AUGMENTAIONS HERE */}
      {/* BEGIN AUGMENTAIONS HERE */}
      {/* BEGIN AUGMENTAIONS HERE */}
      {/* BEGIN AUGMENTAIONS HERE */}
      {/* BEGIN AUGMENTAIONS HERE */}
      {/* BEGIN AUGMENTAIONS HERE */}



      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Augmentations">Augmentations</h1>
        <p className={styles.sectionContent}>Each generation criterion in Auteur is mapped to one or more augmentations that convey the corresponding data relationship.
          There are a total of nine augmentations provided by Auteur derived from prior works: Opacity, Stroke, Fill, Text, Label, Line, Regression, Rect, Mark.
          Each augmentation is associated with a type (mark or encoding).
          Opacity, Stroke, and Fill are encoding type augmentations that change the attributes of existing SVG elements, such as their fill color.
          In contrast, Text, Label, Line, Regression, Rect, and Mark are mark type augmentations that add new elements to the SVG.</p>
        <p className={styles.sectionContent}>It is unlikely that you will ever have to work with Augmentations directly. However, they are documented below for reference.</p>

        <h2 className={styles.sectionSubHeader}>Opacity</h2>
        <p className={styles.sectionContent}>Changes the <code className={styles.code}>opacity</code> of existing svg items. Items relevant to the data relationship will have an opacity of 1, while all other items will have opacity of 0.25.</p>
        <p className={styles.sectionContent}>Type: encoding</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "opacity": 1
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Stroke</h2>
        <p className={styles.sectionContent}>Adds a <code className={styles.code}>stroke</code> around all items relevant to the data relationship.</p>
        <p className={styles.sectionContent}>Type: encoding</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "stroke": "black",
  "stroke-opacity": 1,
  "stroke-width": "1px"
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Fill</h2>
        <p className={styles.sectionContent}>Changes the <code className={styles.code}>fill</code> color of existing svg items. Items relevant to the data relationship will have a fill color of "red", while all other items will have unchanged fill.</p>
        <p className={styles.sectionContent}>Type: encoding</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "fill": "#eb4034"
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Text</h2>
        <p className={styles.sectionContent}>Adds <code className={styles.code}>&lt;text&gt;</code> element(s) to the chart to describe relevant information about the data relationship.
        For Threshold generation criterion, describes value of threshold and statistic (if used).
        For Range generation criterion, describes value of extents of range.</p>
        <p className={styles.sectionContent}>Type: mark</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "font-family":"sans-serif",
  "font-size":11
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Label</h2>
        <p className={styles.sectionContent}>Adds <code className={styles.code}>&lt;text&gt;</code> element(s) to the chart to label the value of items relevant to the data relationship.
        Label is positioned above data item by default.</p>
        <p className={styles.sectionContent}>Type: mark</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "font-family":"sans-serif",
  "font-size":11,
  "text-anchor": "middle",
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Line</h2>
        <p className={styles.sectionContent}>Only applies to the Threshold generation criterion. Adds a <code className={styles.code}>&lt;line&gt;</code> element to the chart to indicate the threshold value.</p>
        <p className={styles.sectionContent}>Type: mark</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "stroke": "black",
  "stroke-opacity": 1,
  "stroke-width": "1px"
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Regression</h2>
        <p className={styles.sectionContent}>Adds a <code className={styles.code}>&lt;line&gt;</code> element to indicate the least squares regression of all items relevant to a data relationship.</p>
        <p className={styles.sectionContent}>Type: mark</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "stroke": "black",
  "stroke-opacity": 1,
  "stroke-width": "1px"
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Rect</h2>
        <p className={styles.sectionContent}>Only applies to the Range generation criterion. Adds a <code className={styles.code}>&lt;rect&gt;</code> element to the chart to indicate the range extent.</p>
        <p className={styles.sectionContent}>Type: mark</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "opacity": 0.1,
  "fill": "black"
}`}
        </pre>
        
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>Mark</h2>
        <p className={styles.sectionContent}>A general mark type augmentation where the new elements added to the SVG are determined either by inferring from existing SVG elements or through user input.
          Only for the Derived Values and Local Data generation criteria. New values calculated from existing data or input by users are rendered as multiples (duplicates) of existing marks.
          This augmentation would thus add different SVG elements depending on the input D3 visualization.</p>
        <p className={styles.sectionContent}>Type: mark</p>
        <p className={styles.sectionContentNoMargin}>Default styling:</p>
        <pre className={styles.codeblock}>
            {`{
  "stroke-opacity": 0.25,
}`}
        </pre>
        

      </div>



      {/* BEGIN DRAFT HERE */}
      {/* BEGIN DRAFT HERE */}
      {/* BEGIN DRAFT HERE */}
      {/* BEGIN DRAFT HERE */}
      {/* BEGIN DRAFT HERE */}
      {/* BEGIN DRAFT HERE */}



      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Draft">Draft</h1>
        <p>After parameterizing the generation criteria and obtaining the corresponding augmentations, these augmentations can be rendered onto a D3 visualization using the Draft object.
          The Draft requires details about the D3 visualization, but to reduce the amount of additional effort necessary,
          these should already be defined during the process of authoring the visualization such as its SVG container,
          the D3 selection of elements mapped to the underlying data, and the <i>xy</i>-axis scales.</p>

        <p className={styles.sectionContent}>Usage: <code className={styles.code}>new Draft()</code></p>

        <h2 className={styles.sectionSubHeader}>.layer(selector)</h2>
        <p className={styles.sectionContent}>Defines the DOM element to which mark type augmentations will be added. Typically, this is the top-level <code className={styles.code}>&lt;svg&gt;</code> element, but it can also be a <code className={styles.code}>&lt;g&gt;</code> container.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.layer("svg")`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    el
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>A css selector for an svg or g element.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.select(selector)</h2>
        <p className={styles.sectionContent}>A css selector that defines the svg element(s) that should be considered when applying the augmentations.
        For example, encoding-type augmentations will only be applied to data items within the selection. Either <code className={styles.code}>.select()</code> or
        <code className={styles.code}>.selection()</code> needs to be defined.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.select("circle")`}
        </code><br />
        <code className={styles.code}>
            {`.select(".{CLASSNAME}")`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    selector
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>A css selector of all svg elements to be included when applying augmentations.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.selection(selection)</h2>
        <p className={styles.sectionContent}>A d3 selection that defines the svg element(s) that should be considered when applying the augmentations.
        For example, encoding-type augmentations will only be applied to data items within the selection. Either <code className={styles.code}>.select()</code> or
        <code className={styles.code}>.selection()</code> needs to be defined.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.selection(d3.selectAll("circle"))`}
        </code><br />
        <code className={styles.code}>
            {`.selection(d3.selectAll(".{CLASSNAME}"))`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    selection
                  </TableCell>
                  <TableCell><b><i>array, default=None</i></b><br/>A d3 selection of all svg elements to be included when applying augmentations.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.x(variable, scaleX) (optional)</h2>
        <p className={styles.sectionContent}>Defines the <i>x</i>-axis of the chart. If this is not provided, some mark-type augmentations will not be rendered.</p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    variable
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>Name of the variable on the <i>x</i>-axis.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    scaleX
                  </TableCell>
                  <TableCell><b><i>function, default=None</i></b><br/>d3 scale applied to the variable on the <i>x</i>-axis.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.y(variable, scaleY) (optional)</h2>
        <p className={styles.sectionContent}>Defines the <i>y</i>-axis of the chart. If this is not provided, some mark-type augmentations will not be rendered.</p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    variable
                  </TableCell>
                  <TableCell><b><i>str, default=None</i></b><br/>Name of the variable on the <i>y</i>-axis.</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    scaleY
                  </TableCell>
                  <TableCell><b><i>function, default=None</i></b><br/>d3 scale applied to the variable on the <i>y</i>-axis.</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.include(inclusions) (optional)</h2>
        <p className={styles.sectionContent}>Defines the augmentations to apply to the chart. Cannot be used with <code className={styles.code}>.exclude()</code>.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.include({"type": ["mark"]})`}
        </code><br />
        <code className={styles.code}>
            {`.include({"name": ["line", "opacity", "regression", "label", ...]})`}
        </code><br />
        <code className={styles.code}>
            {`.include({"type": ["encoding"], "name": ["line", "opacity", ...]})`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    inclusions
                  </TableCell>
                  <TableCell><b><i>object, default=None</i></b><br/>
                    Can contain an object mapped to an array of the type(s) of augmentations to include and/or an array of the name(s) of the augmentations to include.
                    Augmentation names are exactly identical to the <u><a href="#Augmentations">documentation</a></u>.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.exclude(exclusions) (optional)</h2>
        <p className={styles.sectionContent}>Defines the augmentations to exclude when applying augmentations to the chart.
        Cannot be used with <code className={styles.code}>.include()</code>.</p>
        <p className={styles.sectionContent}>Usage: <br />
        <code className={styles.code}>
            {`.exclude({"type": ["mark"]})`}
        </code><br />
        <code className={styles.code}>
            {`.exclude({"name": ["line", "opacity", "regression", "label", ...]})`}
        </code><br />
        <code className={styles.code}>
            {`.exclude({"type": ["encoding"], "name": ["line", "opacity", ...]})`}
        </code>
        </p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    exclusions
                  </TableCell>
                  <TableCell><b><i>object, default=None</i></b><br/>
                    Can contain an object mapped to an array of the type(s) of augmentations to exclude and/or an array of the name(s) of the augmentations to exclude.
                    Augmentation names are exactly identical to the <u><a href="#Augmentations">documentation</a></u>.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider className={styles.divider} />

        <h2 className={styles.sectionSubHeader}>.augment(augmentations)</h2>
        <p className={styles.sectionContent}>Applies array of augmentations to the selected svg and svg elements.</p>
        <p className={styles.sectionContent}>Parameters:</p>
        <TableContainer component={Paper} style={{ boxShadow:"none", borderRadius:"0px" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    augmentations
                  </TableCell>
                  <TableCell><b><i>array, default=None</i></b><br/>
                    Obtained by calling the <code className={styles.code}>.getAugs()</code> function after specifying a generation criterion.
                    Can also be obtained by creating a compound generation criterion.
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
