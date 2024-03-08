"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import DownloadIcon from '@mui/icons-material/Download';

import styles from "../subpage.module.css";

export default function CodePlain({html="", js_long="", js_short="", data_link=""}) {

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
      <Button href={data_link}
              size="small"
              variant="outlined">
        {`View raw data`}
      </Button>
    </div>
  );
}
