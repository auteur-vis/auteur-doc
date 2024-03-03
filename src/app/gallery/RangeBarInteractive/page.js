"use client"; // This is a client component

import React, {useRef, useState, useEffect} from "react";
import * as d3 from "d3";

import styles from "../../page.module.css";

import ResponsiveAppBar from "../../header";
import CodeSwitch from "../CodeSwitch";
import Vis from "./vis";
import { markdown_long } from "./markdown_long";
import { markdown_short } from "./markdown_short"; 

import { html } from "./html";
import { js_long } from "./js_long";
import { js_short } from "./js_short";

export default function RangeBarInteractive() {

	return (
		<main className={styles.main}>
			<div>
				<div>
		          <ResponsiveAppBar selected={"Gallery"} />
		        </div>

		        <div className={styles.codecontainer}>
					<Vis />
					<CodeSwitch html={html}
								js_long={js_long}
								js_short={js_short}
								markdown_long={markdown_long}
								markdown_short={markdown_short} />
				</div>
			</div>
		</main>
	)
}