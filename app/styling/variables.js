let baseColors = {
    blue: '#067780',
    orange: '#ED8F11',
    brown: '#4D0202',
    red: '#ED1111',
    black: '#020303'
}

export const colors = Object.assign({
    success: baseColors.orange,
    fail: baseColors.blue,
    hint: 'green'
}, baseColors);
