const getUrlParameter = (name) => {
  const { search } = { search: window.location.search.replace('?', '') };

  if (!search) {
    return '1';
  }

  const { vars } = { vars: search.split('&') };

  for (let i = 0; i < vars.length; i++) {
    var { pair } = { pair: vars[i].split('=') };

    if (pair[0] === name) {
      return pair[1];
    }
  }
};

export default getUrlParameter;