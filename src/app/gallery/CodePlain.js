"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import styles from "../subpage.module.css";

export default function CodePlain({html="", js_long="", js_short=""}) {

  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    setOpen(!open);
  };

  return (
    <div>
      <div style={{"display":"flex", "align-items":"center", "margin":"20px 0 0 0"}}>
        <p>HTML</p>
      </div>
      <pre className={styles.codesegment}>{html}</pre>
      <div style={{"display":"flex", "align-items":"center", "margin":"20px 0 0 0"}}>
        <p style={{"margin":"0 20px 0 0"}}>JS</p>
        <Button size="small" onClick={() => handleOpen()} variant="outlined" startIcon={open ? <ExpandLess /> : <ExpandMore />}>
          {open ? "collapse code" : "expand code"}
        </Button>
      </div>
      <pre className={styles.codesegment}>{open ? js_long : js_short}</pre>
    </div>
  );
}
