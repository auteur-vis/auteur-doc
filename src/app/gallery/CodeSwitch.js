"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import Code from "./Code";
import CodePlain from "./CodePlain";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CodeSwitch({markdown_short="", markdown_long="", html="", js_long="", js_short=""}) {
  const [selection, setSelection] = React.useState('react');

  function handleChange() {
  	if (selection === "react") {
  		setSelection("plain");
  	} else {
  		setSelection("react");
  	}
  }

  return (
  	<div>
	    <ToggleButtonGroup
	      color="primary"
	      value={selection}
	      exclusive
	      onChange={handleChange}
	      aria-label="Platform"
	      style={{"height": "20px", "border-radius":"10px"}}
	    >
	      <ToggleButton value="plain">plain js</ToggleButton>
	      <ToggleButton value="react">React</ToggleButton>
	    </ToggleButtonGroup>
	    {selection === "react"
	    	? <Code markdown_short={markdown_short} markdown_long={markdown_long} />
	    	: <CodePlain html={html} js_long={js_long} js_short={js_short} />}
    </div>
  );
}