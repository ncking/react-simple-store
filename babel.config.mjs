

const plugins = [
    '@babel/transform-react-jsx',
]


// const presets = [
//     "@babel/preset-typescript",
//     ["@babel/preset-react", { "runtime": "automatic" }]
// ]

const presets = [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ]



export default {
    presets,
    plugins
}

