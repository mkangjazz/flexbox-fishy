export default function getLevelFromQueryString(query) {
  if (query.get("level")) {
    const queryLevel = query.get("level")
      .replace(/[^0-9]/gi,'');

    if (queryLevel < 1) {
      history.push(`/?level=1`);

      return 0;
    }

    if (queryLevel > levels.length) {
      history.push(`/?level=${levels.length}`);

      return levels.length - 1;
    }

    if (queryLevel) {
      return (Number(queryLevel) - 1);
    }
  }
}
