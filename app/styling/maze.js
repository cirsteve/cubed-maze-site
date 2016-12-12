import { colors } from "./variables.js";
import TC from 'tinycolor2';

export default {
    overlay: {
        position: 'absolute',
        zIndex: '100',
        backgroundColor: colors.orange,
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        paddingTop: '30%',
        textAlign: 'center',
        fontSize: '2em'
    },
    controlGroup: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    },

    levelControls: {
        display: 'flex',
        flexDirection: 'column'
    },

    directionControls: {
        display: 'flex',
        flexDirection: 'column',
        height: '20%',
        width: '20%',
    },

    levelIndicatorWrapper: {
        width: '10%',
        textAlign: 'center'
    },

    levelIndicator: {
        fontSize: '3em',
        position: 'relative',
        borderTop: `2px solid ${colors.black}`,
    },


    goalLevel: {
        position: 'absolute',
        color: colors.orange,
        top: '15%',
        left: '15%',
    },

    currentLevelIndicator: {
        position: 'absolute',
        backgroundColor: 'yellow',
        opacity: '0.6',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        zIndex: '50',
        top: '15%',
        left: '10%',
    },

    completionMessage: {
        position: 'absolute',
        zIndex: '100',
        height: '60%',
        width: '60%',
        top: '10%',
        left: '20%',
        padding: '5px',
        textAlign: 'center',
        fontSize: '2em',
        color: 'white',
    },

    successMessage: {
        backgroundColor: TC(colors.success).lighten(20).toString()
    },

    expiredMessage: {
        backgroundColor: TC(colors.fail).lighten(20).toString()
    }
}
