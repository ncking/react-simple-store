import {resolve} from 'node:path'
const plugins = [
    '@babel/transform-react-jsx',
    ['babel-plugin-module-resolver', {
        root: ['.'],
        alias : {
            "@createStore": resolve('./src/index.ts'),
            "@shallowEqual": resolve('./src/shallow-equal.ts')
        },
    }],
]



const presets = [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ]

export default {
    presets,
    plugins
}

