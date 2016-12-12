import _ from 'lodash';

export let getStyle = function (styles) {
    //takes an array conditional style arrays of the form [styleObject, conditionExpression]ie[{color:'red'}, this.props.isError]
    let style = {};
    styles.forEach(s=> {if (s[1]) _.merge(style, s[0])});
    return style;
};
