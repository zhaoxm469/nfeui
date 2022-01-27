module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: ['src/**/*.ts'],
    moduleNameMapper: {},
    transform: {
        '^.+\\.vue$': 'vue-jest'
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'vue',
        'js',
        'json',
        'jsx',
        'tsx',
        'node'
    ]
};
