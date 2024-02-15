"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import styles from "./page.module.css";

import ResponsiveAppBar from "./header";
import PermanentDrawerLeft from "./drawer";

import Documentation from "./documentation";
import Gettingstarted from "./gettingstarted";
import Gallery from "./gallery";

export default function Home() {

  const optionsMap = {
    "Getting Started":["Installation", "Tutorial"],
    "Documentation":["Generation Criteria", "Augmentations", "Draft", "Compound Criteria", "Stats", "Custom Styles"],
    "Gallery":["Emphasis", "Threshold", "Range", "Derived Values", "Local Data", "Regression"]};

  const [selection, setSelection] = React.useState("Getting Started");
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

        <div className={styles.body}>
          <PermanentDrawerLeft options={options} />
          {(selection == "Documentation")
            ? <Documentation />
            : (selection == "Getting Started")
              ? <Gettingstarted />
              : <Gallery />}
        </div>
        
      </div>
    </main>
  );
}
