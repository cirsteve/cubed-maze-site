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
        justifyContent: 'space-between'
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

    levelIndicator: {
        fontSize: '0.9em',
    },

    completionMessage: {
        position: 'absolute',
        zIndex: '100',
        height: '80%',
        width: '60%',
        top: '10%',
        left: '20%',
        padding: '5px',
        textAlign: 'center',
        color: 'white',
    },

    successMessage: {
        backgroundColor: TC(colors.success).lighten(20).toString()
    },

    expiredMessage: {
        backgroundColor: TC(colors.fail).lighten(20).toString()
    }
}
