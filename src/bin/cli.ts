#!/usr/bin/env node

import { parse } from "../src/parse";
import process from "process";

const args = process.argv.slice(2);

parse(args);