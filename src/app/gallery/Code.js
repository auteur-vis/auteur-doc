"use client"; // This is a client component

import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import DownloadIcon from '@mui/icons-material/Download';

import styles from "../subpage.module.css";

export default function Code({markdown_short="", markdown_long="", data_link=""}) {

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
      <Button href={data_link}
              size="small"
              variant="outlined">
        {`View raw data`}
      </Button>
    </div>
  );
}
