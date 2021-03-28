const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      debug: true,
      corejs: 3,
      targets: "> 0.25%, not dead"
    }
  ]
];
const plugins = [
  [
    "@babel/plugin-proposal-class-properties"
  ]
];
module.exports = { presets, plugins };
