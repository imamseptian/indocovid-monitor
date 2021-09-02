import * as React from "react";

function SvgHappyemoji(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" {...props}>
      <circle cx={21} cy={21} r={21} fill="#fbd971" />
      <circle cx={13.5} cy={13.5} r={3.5} fill="#af8066" />
      <circle cx={29.5} cy={13.5} r={3.5} fill="#af8066" />
      <path
        d="M32 24c0 6.075-4.925 11-11 11s-11-4.925-11-11h22z"
        fill="#c03a2b"
      />
    </svg>
  );
}

export default SvgHappyemoji;
