declare module '*.png' {
  const content: string;
  // @ts-ignore
  export default content;
}

declare module '*.jpg' {
  const content: string;
  // @ts-ignore
  export default content;
}

// SVGs are loaded with SVGR, and import a React component.
declare module '*.svg' {
  const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  // @ts-ignore
  export default value;
}

// Definition for the build-time-plugin virtual module.
declare module 'virtual:build-time' {
  export default function getBuildTime(): number;
}
