"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import styles from "./page.module.css";

import ResponsiveAppBar from "./header";
import PermanentDrawerLeft from "./drawer";

// import Gettingstarted from "./gettingstarted";
// import Gallery from "./gallery";

export default function Home() {

  const optionsMap = {
    "Getting Started":["Installation", "Tutorial"],
    "Documentation":["Generation Criteria", "*Compound Criteria", "*Customization", "*Stats", "Augmentations", "Draft"],
    "Gallery":["Emphasis", "Threshold", "Range", "Derived Values", "Local Data", "Regression"]};

  // const suboptions = ["Compound Criteria", "Stats", "Custom Styles"];

  const [selection, setSelection] = React.useState("");
  const [options, setOptions] = React.useState(optionsMap[selection]); 

  useEffect(() => {
    setOptions(optionsMap[selection]);
  }, [selection]) 

  return (
    <main className={styles.main}>
      <div>
        <div>
          <ResponsiveAppBar selected={selection} setSelection={setSelection} />
        </div>
        
      </div>
    </main>
  );
}
