import { colors } from "./variables";

export default {
    maze: {
        position: 'relative',
        display: 'flex',
        backgroundColor: 'darkgray'
    },

    column: {
        width: '50px',
        display: 'inline-block',
    },

    marker: {
        position: 'absolute',
        backgroundColor: 'yellow',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        zIndex: '100',
    },

    gameOver: {
        opacity: '0.5'
    },

    node: {
        backgroundcolor: 'gray',
        border: '1px solid lightgray',
        height: '50px',
        width: '50px',
        boxSizing: 'border-box',
        flex: '1',
        position: 'relative',
    },

    eastWall: {
        borderRight: `4px solid ${colors.brown}`,
    },

    northWall: {
        borderTop: `4px solid ${colors.brown}`,
    },

    goal: {
        backgroundColor: colors.orange
    },

    openCeiling: {
        position: 'absolute',
        top: '0',
        right: '50%',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: `10px solid ${colors.blue}`,
    },

    openFloor: {
        position: 'absolute',
        width: '0',
        height: '0',
        bottom: '0',
        right: '50%',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid black',
    },

    goalNode: {
        zIndex: '-1',
    },
    hint: {
        color: colors.hint
    }
}
