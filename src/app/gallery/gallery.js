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

import Code from './Code';

import styles from "../subpage.module.css";

import * as autr from "auteur";

import EmphasisScatterBasic from "./EmphasisScatterBasic/vis";
import EmphasisScatterNumeric from "./EmphasisScatterNumeric/vis";
import EmphasisScatterCategorical from "./EmphasisScatterCategorical/vis";
import EmphasisScatterMultipleValues from "./EmphasisScatterMultipleValues/vis";
import EmphasisScatterCompound from "./EmphasisScatterCompound/vis";
import EmphasisBarBasic from "./EmphasisBarBasic/vis";
import EmphasisBarCategorical from "./EmphasisBarCategorical/vis";
import EmphasisLineBasic from "./EmphasisLineBasic/vis";

import ThresholdScatterBasic from "./ThresholdScatterBasic/vis";
import ThresholdScatterLess from "./ThresholdScatterLess/vis";
import ThresholdScatterStatistic from "./ThresholdScatterStatistic/vis";
import ThresholdScatterLogScale from "./ThresholdScatterLogScale/vis";
import ThresholdScatterCompound from "./ThresholdScatterCompound/vis";
import ThresholdScatterLasso from "./ThresholdScatterLasso/vis";
import ThresholdBarBasic from "./ThresholdBarBasic/vis";
import ThresholdBarInteractive from "./ThresholdBarInteractive/vis";
import ThresholdBarLogScale from "./ThresholdBarLogScale/vis";
import ThresholdLineBasic from "./ThresholdLineBasic/vis";
import ThresholdLineInteractive from "./ThresholdLineInteractive/vis";
import ThresholdLineLayered from "./ThresholdLineLayered/vis";

import RangeScatterBasic from "./RangeScatterBasic/vis";
import RangeScatterIQR from "./RangeScatterIQR/vis";
import RangeScatterOpen from "./RangeScatterOpen/vis";
import RangeScatterCompound from "./RangeScatterCompound/vis";
import RangePointBasic from "./RangePointBasic/vis";
import RangeHeatmapBasic from "./RangeHeatmapBasic/vis";
import RangeBarBasic from "./RangeBarBasic/vis";
import RangeBarInteractive from "./RangeBarInteractive/vis";
import RangeLineBasic from "./RangeLineBasic/vis";
import RangeLineTemporal from "./RangeLineTemporal/vis";

import DerivedScatterBasic from "./DerivedScatterBasic/vis";
import DerivedBarBasic from "./DerivedBarBasic/vis";
import DerivedLineBasic from "./DerivedLineBasic/vis";

import LocalScatterBasic from "./LocalScatterBasic/vis";

import RegressionScatterMulti from "./RegressionScatterMulti/vis";
import RegressionBarTemporal from "./RegressionBarTemporal/vis";

export default function Gallery() {

  const allEmphasis = {"EmphasisScatterBasic": <EmphasisScatterBasic key="EmphasisScatterBasic" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisScatterNumeric": <EmphasisScatterNumeric key="EmphasisScatterNumeric" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisScatterCategorical": <EmphasisScatterCategorical key="EmphasisScatterCategorical" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisScatterMultipleValues": <EmphasisScatterMultipleValues key="EmphasisScatterMultipleValues" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisScatterCompound": <EmphasisScatterCompound key="EmphasisScatterCompound" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisBarBasic": <EmphasisBarBasic key="EmphasisBarBasic" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisBarCategorical": <EmphasisBarCategorical key="EmphasisBarCategorical" size={{"width":250, "height":250}} sparse={true} />,
    "EmphasisLineBasic": <EmphasisLineBasic key="EmphasisLineBasic" size={{"width":250, "height":250}} sparse={true} />
  };

  const allThreshold = {"ThresholdScatterBasic": <ThresholdScatterBasic key="ThresholdScatterBasic" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdScatterLess": <ThresholdScatterLess key="ThresholdScatterLess" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdScatterStatistic": <ThresholdScatterStatistic key="ThresholdScatterStatistic" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdScatterLogScale": <ThresholdScatterLogScale key="ThresholdScatterLogScale" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdScatterCompound": <ThresholdScatterCompound key="ThresholdScatterCompound" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdScatterLasso": <ThresholdScatterLasso key="ThresholdScatterLasso" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdBarBasic": <ThresholdBarBasic key="ThresholdBarBasic" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdBarInteractive": <ThresholdBarInteractive key="ThresholdBarInteractive" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdBarLogScale": <ThresholdBarLogScale key="ThresholdBarLogScale" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdLineBasic": <ThresholdLineBasic key="ThresholdLineBasic" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdLineInteractive": <ThresholdLineInteractive key="ThresholdLineInteractive" size={{"width":250, "height":250}} sparse={true} />,
    "ThresholdLineLayered": <ThresholdLineLayered key="ThresholdLineLayered" size={{"width":250, "height":250}} sparse={true} />
  };

  const allRange = {"RangeScatterBasic": <RangeScatterBasic key="RangeScatterBasic" size={{"width":250, "height":250}} sparse={true} />,
    "RangeScatterIQR": <RangeScatterIQR key="RangeScatterIQR" size={{"width":250, "height":250}} sparse={true} />,
    "RangeScatterOpen": <RangeScatterOpen key="RangeScatterOpen" size={{"width":250, "height":250}} sparse={true} />,
    "RangeScatterCompound": <RangeScatterCompound key="RangeScatterCompound" size={{"width":250, "height":250}} sparse={true} />,
    "RangePointBasic": <RangePointBasic key="RangePointBasic" size={{"width":250, "height":250}} sparse={true} />,
    "RangeHeatmapBasic": <RangeHeatmapBasic key="RangeHeatmapBasic" size={{"width":250, "height":250}} sparse={true} />,
    "RangeBarBasic": <RangeBarBasic key="RangeBarBasic" size={{"width":250, "height":250}} sparse={true} />,
    "RangeBarInteractive": <RangeBarInteractive key="RangeBarInteractive" size={{"width":250, "height":250}} sparse={true} />,
    "RangeLineBasic": <RangeLineBasic key="RangeLineBasic" size={{"width":250, "height":250}} sparse={true} />,
    "RangeLineTemporal": <RangeLineTemporal key="RangeLineTemporal" size={{"width":250, "height":250}} sparse={true} />
  };

  const allDerived = {"DerivedScatterBasic": <DerivedScatterBasic key="DerivedScatterBasic" size={{"width":250, "height":250}} sparse={true} />,
    "DerivedBarBasic": <DerivedBarBasic key="DerivedBarBasic" size={{"width":250, "height":250}} sparse={true} />,
    "DerivedLineBasic": <DerivedLineBasic key="DerivedLineBasic" size={{"width":250, "height":250}} sparse={true} />
  };

  const allLocal = {"LocalScatterBasic": <LocalScatterBasic key="LocalScatterBasic" size={{"width":250, "height":250}} sparse={true} />
  };

  const allRegression = {"RegressionScatterMulti": <RegressionScatterMulti key="RegressionScatterMulti" size={{"width":250, "height":250}} sparse={true} />,
    "RegressionBarTemporal": <RegressionBarTemporal key="RegressionBarTemporal" size={{"width":250, "height":250}} sparse={true} />
  };

  return (
    <div>

      <div className={styles.section}>
        <p>Explore various examples of Auteur here. Select the name of an example to see full implementation details.</p>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Emphasis">Emphasis</h1>
        <div className={styles.sectionGallery}>
          {Object.keys(allEmphasis).map(v => allEmphasis[v])}
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Threshold">Threshold</h1>
        <div className={styles.sectionGallery}>
          {Object.keys(allThreshold).map(v => allThreshold[v])}
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Range">Range</h1>
        <div className={styles.sectionGallery}>
          {Object.keys(allRange).map(v => allRange[v])}
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Derivedvalues">Derived Values</h1>
        <div className={styles.sectionGallery}>
          {Object.keys(allDerived).map(v => allDerived[v])}
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Localdata">Local Data</h1>
        <div className={styles.sectionGallery}>
          {Object.keys(allLocal).map(v => allLocal[v])}
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionHeader} id="Regression">Regression</h1>
        <div className={styles.sectionGallery}>
          {Object.keys(allRegression).map(v => allRegression[v])}
        </div>
      </div>

    </div>
  );
}
