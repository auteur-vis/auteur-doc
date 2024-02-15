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

export default function Gettingstarted() {

  return (
    <div>

      <div className={styles.section}>
        <p>Auteur is a front-end JavaScript toolkit designed to help with adding augmentations to web-based D3 visualizations and visualization
        systems to convey statistical and custom data relationships.</p>
        <p className={styles.sectionContent}>To get started using Auteur, check out the installation guides and tutorials below.</p>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Installation">Installation</h1>
        <p className={styles.sectionContent}>You can install Auteur using your preferred package manager:</p>

        <p className={styles.sectionContentNoMargin}>NPM</p>
        <pre className={styles.codeblock}>
            {`npm install auteur`}
        </pre>

        <p className={styles.sectionContentNoMargin}>Yarn</p>
        <pre className={styles.codeblock}>
            {`yarn install auteur`}
        </pre>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionHeader} id="Installation">Import</h2>
        <p className={styles.sectionContent}>Once auteur has been successfully installed, it can now be added using the following:</p>
        <pre className={styles.codeblock}>
            {`import * as autr from "auteur"`}
        </pre>

        <p className={styles.sectionContent}>Alternatively, you can specify named components:</p>
        <pre className={styles.codeblock}>
            {`import { Draft, Threshold } from "auteur"`}
        </pre>

        <p className={styles.sectionContent}>For all available components, <a className={styles.link} href="/auteur-doc/documentation">read our documentation here</a>. To see them in use, <a className={styles.link} href="/auteur-doc/gallery">check out our gallery</a>.</p>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Tutorial">Tutorial</h1>
        <p className={styles.sectionContent}>
        <video controls src={"/video.mp4"} width="100%" height="auto" type='video/mp4'></video>
        </p>
      </div>

    </div>
  );
}
