import React from "react";
import styled from "styled-components";

const SvgLoader = styled.svg`
  margin: auto;
  background: none;
  display: block;
  shape-rendering: auto;
  margin-top: 10rem;
`;

const Loader = () => {
  return (
    <SvgLoader
      xmlns="http://www.w3.org/2000/svg"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <rect x="13" y="13" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="39" y="13" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.125s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="65" y="13" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="13" y="39" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.875s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="65" y="39" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.375s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="13" y="65" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="39" y="65" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.625s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="65" y="65" width="22" height="22" fill="#1c4595">
        <animate
          attributeName="fill"
          values="#e76a24;#1c4595;#1c4595"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          calcMode="discrete"
        ></animate>
      </rect>
    </SvgLoader>
  );
};

export default Loader;
