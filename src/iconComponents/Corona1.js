import * as React from "react";

function SvgCorona1(props) {
  return (
    <svg width={800} height={600} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke="#000" fill="#fff" d="M99 126h530v259H99z" />
      <path
        stroke="#000"
        fill="none"
        d="M151 171l258 180M472 342l153-131M405 225l-153-40M462 178l33 125M422 271l2 106M396 180l119 23M572 143l-231 95M240 170l86 140"
      />
    </svg>
  );
}

export default SvgCorona1;
