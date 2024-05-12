const plugins = [
    '@babel/transform-react-jsx',
]

const presets = [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ]


export default {
    presets,
    plugins
}

