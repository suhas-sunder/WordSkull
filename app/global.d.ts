// Extend the Window interface globally in src/global.d.ts or a similar global type definition file

interface Window {
  adsbygoogle: {
    push: (config: object) => void; // Expecting an object as the argument for the push method
  };
}
