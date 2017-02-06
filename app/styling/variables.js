import tinyColor from 'tinycolor2';

let baseColors = {
    blue: '#067780',
    orange: '#ED8F11',
    brown: '#4D0202',
    red: '#ED1111',
    black: '#020303'
};

let palette = {
    green: '2EED99',
    yellow: 'EDB42E',
    red: 'ED402E',
    blue: '412EED'
};

export const colors = Object.assign({
    success: baseColors.orange,
    fail: baseColors.blue,
    hint: 'yellowgreen'
}, baseColors);

export const MAZE_COLORS = {
    0:{
        wall: 0xFF0033,
        outerWall: 0x104E8B,
        ceiling: 0x009933,
        floor: 0x33CCFF,
        marker: 0x9900FF,
        goal: 0xFFCC00,
        hint: 0x33FF00
    }
}
