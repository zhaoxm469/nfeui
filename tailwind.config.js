const unit = 'px';

const spacing = () => {
    let result = {};
    for (let i = 1; i < 100; i++) {
        result[i] = i + unit;
    }
    return result;
};

const borderRadius = () => {
    let result = {
        '50%': '50%'
    };
    for (let i = 5; i < 30; i++) {
        result[i] = i + unit;
    }
    return result;
};

const fontSize = () => {
    let result = {
        xs: '.75' * 16 + 'px',
        sm: '.875' * 16 + 'px',
        tiny: '.875' * 16 + 'px',
        base: '1' * 16 + 'px',
        lg: '1.125' * 16 + 'px',
        xl: '1.25' * 16 + 'px',
        '2xl': '1.5' * 16 + 'px',
        '3xl': '1.875' * 16 + 'px',
        '4xl': '2.25' * 16 + 'px',
        '5xl': '3' * 16 + 'px',
        '6xl': '4' * 16 + 'px',
        '7xl': '5' * 16 + 'px'
    };

    for (let i = 12; i < 40; i++) {
        result[i] = i + unit;
    }
    return result;
};

module.exports = {
    content: [
        './packages/**/*.html',
        './packages/**/*.vue',
        './packages/**/*.jsx'
    ],
    prefix: `tf-`,
    theme: {
        extend: {
            spacing,
            fontSize,
            borderRadius
        }
    },
    plugins: []
};
