import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path, Mask, G, Defs, LinearGradient, Stop } from "react-native-svg";

const { width , height } = Dimensions.get("window");

const SVGComponent = (props : any) => (
  <Svg
    width={width * 0.9}
    height={height / 4}
    viewBox="0 0 249 157"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M237.774 0H10.808C4.84 0 0 4.815 0 10.754v135.493C0 152.186 4.84 157 10.808 157h226.966c5.969 0 10.808-4.814 10.808-10.753V10.754c0-5.94-4.839-10.754-10.808-10.754"
      fill="url(#a)"
    />
    <Mask
      id="b"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={249}
      height={157}
    >
      <Path
        d="M237.776 0H10.811C4.84 0 .002 4.814.002 10.753v135.494c0 5.939 4.84 10.753 10.809 10.753h226.965c5.97 0 10.809-4.814 10.809-10.753V10.753C248.585 4.814 243.746 0 237.776 0"
        fill="#3E77BC"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        opacity={0.8}
        d="m-27.547-218.043-.006-.009c.25-.154.491-.325.74-.477 30.78-18.656 119.334-29.996 247.782 95.058C291.193 41.116 210.71 100.7 179.931 119.355c-.251.153-.514.287-.766.438l-.006-.01-54.635 33.117-54.669 33.136-24.114 14.617-.012-.019L-104.95 60.432l-56.005-197.584-.012-.019 71.73-43.479 7.054-4.275z"
        fill="#1A3249"
        fillOpacity={0.29}
      />
      <Path
        opacity={0.749}
        d="m-49.952-64.162-.005-.008c.205-.126.404-.266.61-.39C-24.04-79.835 62.259-110.398 162.1-2.124c50.343 138.147-16.774 200.183-42.082 215.459-.206.122-.423.234-.63.358l-.005-.009-44.924 27.115L29.51 267.93 9.68 279.897l-.01-.016-123.583-115.414-45.734-162.4-.01-.015 58.98-35.6 5.799-3.5z"
        fill="url(#c)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={78.5}
        x2={248.582}
        y2={78.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1A3249" />
        <Stop offset={1} stopColor="#3E77BC" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={-159.656}
        y1={99.703}
        x2={180.347}
        y2={99.703}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1A3249" />
        <Stop offset={1} stopColor="#3E77BC" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SVGComponent;
