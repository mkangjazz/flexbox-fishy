import jsToCSS from '../utility/jsToCSS';

export default function makeStyleStringFromObj(obj) {
  var s = '';

  if (obj.selector === '.fishies') {
    s += '.scales';
  } else {
    s += obj.selector;
  }

  s += '{';

  for (var key in obj.styles) {
    if (obj.styles.hasOwnProperty(key)) {
      s += `${jsToCSS(key)}:${obj.styles[key]};`;
    }
  }

  s += '}';

  return s;
};
