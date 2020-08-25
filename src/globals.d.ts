declare module '*.png' {
  const content: string;
  export default content;
}


declare module '*.jpg' {
  const content: string;
  export default content;
}

// SVGs are loaded with SVGR, and import a React component.
declare module '*.svg' {
  const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
