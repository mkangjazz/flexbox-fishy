export default function makeCSSStringFromInputs(els) {
  const chunk = 2;

  let result = '';

  for (let i = 0; i < els.length; i += chunk) {
    const chunked = els.slice(i, i + chunk);

    let property = chunked[0].value || '';
    let value = chunked[1].value || '';

    // this is what's causing the issue!
    // if (!property || !value) {
    //   continue;
    // }

    const selector = chunked[0].getAttribute('data-selector') || chunked[1].getAttribute('data-selector');
    
    const isNewSelector = result.indexOf(selector) === -1 ? true : false;

    if (isNewSelector) {
      result += `${selector}`;
      result += '{';
    }

    result += property;
    result += ':';
    result += value;
    result += ';';

    const nextEl = els[i + chunk];

    if (nextEl) {
      const nextSelector = nextEl.getAttribute('data-selector');

      if (selector !== nextSelector) {
        result += '}';
      }
    } else {
      result += '}';
    }
  }

  return result;
};
