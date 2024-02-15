"use client"; // This is a client component

import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import styles from "../../page.module.css";

import ResponsiveAppBar from "../../header";
import Code from "../Code";
import Vis from "./vis";
import { markdown_long } from "./markdown_long";
import { markdown_short } from "./markdown_short"; 

export default function ThresholdLineLayered() {

	return (
		<main className={styles.main}>
			<div>
				<div>
		          <ResponsiveAppBar selected={"Gallery"} />
		        </div>

		        <div className={styles.codecontainer}>
					<Vis />
					<Code markdown_long={markdown_long} markdown_short={markdown_short} />
				</div>
			</div>
		</main>
	)
}