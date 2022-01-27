module.exports = {
    preset: 'ts-jest',
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/nucarf/'],
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
