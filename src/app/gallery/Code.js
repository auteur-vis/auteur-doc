"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import styles from "../subpage.module.css";

export default function Code({markdown_short="", markdown_long=""}) {

  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    setOpen(!open);
  };

  return (
    <div>
      <Button style={{"margin":"20px 0 0 0"}} size="small" onClick={() => handleOpen()} variant="outlined" startIcon={open ? <ExpandLess /> : <ExpandMore />}>
        {open ? "collapse code" : "expand code"}
      </Button>
      <pre className={styles.codesegment}>{open ? markdown_long : markdown_short}</pre>
    </div>
  );
}
