

const plugins = [
    '@babel/transform-react-jsx',
]


const presets = [
    "@babel/preset-typescript",
    ["@babel/preset-react", { "runtime": "automatic" }]
]



export default {
    presets,
    plugins
}

