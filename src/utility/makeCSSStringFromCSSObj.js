export default function makeCSSStringFromFlatArray(arr) {
  let cssString = '';

  for (let i = 0; i < arr.length; i += 1) {
    cssString += arr[i];
    cssString += (i % 2 === 0 ? ':' : ';');
  }

  return cssString;
};
