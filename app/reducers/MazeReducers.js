import _ from 'lodash';
import Im from 'immutable';

const initialState = Im.Map(
    {
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    }
);

export default function (state = initialState, action) {
    let position = state.get('position');
    let updatedPosition = _.clone(position);
    let move = false;
    switch (action.type) {
        case 'updatePosition':
            let update = evaluateMove(action.key, state.maze);
            if (update) {
                return _.assign({}, state, {position: update});
            } else {
                return state;
            }
        default:
            return state;
    }
};
