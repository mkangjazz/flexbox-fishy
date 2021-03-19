export default function cssToJS(str) {
  const regex = /(-[a-z])/gm;
  const matches = str.match(regex);

  let result = str;

  if (matches) {
    for (let i = 0; i < matches.length; i += 1) {
      const replacement = matches[i].slice(-1).toUpperCase();

      result = result.replace(matches[i], replacement);
    }
  }

  return result;
};
