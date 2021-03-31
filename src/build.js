import React from "react";
import path from "path";

import JscadRenderer from "@landaujs/landau";

import { RaspberryPi3B } from "./index";

const outputPath = {
  path: path.join(__dirname, "../output/rpi3b.stl"),
};
JscadRenderer.render(<RaspberryPi3B />, outputPath);
