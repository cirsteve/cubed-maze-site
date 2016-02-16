export function updateConfig(dimension, value) {
    return {
        type: 'UPDATE_CONFIG',
        dimension: dimension,
        value: value
    };
};
