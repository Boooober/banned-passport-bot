module.exports.formatAllPassports = (data) =>
  data.reduce((result, { series, numbers }) => {
    const full = numbers.map((number) => `${series}${number}`).join(' ');
    return `${result}Серія ${series}:\n${full}\n\n`;
  }, '');

module.exports.normalizePassports = (data) =>
  data.reduce((result, { series, numbers }) => {
    numbers.forEach((number) => {
      const [from, to] = number.split('-');

      if (from && to) {
        let current = parseInt(from);
        const end = parseInt(to);

        for (; current <= end; current++) {
          result[`${series}${`000000${current}`.slice(-6)}`] = true;
        }
      } else if (from) {
        result[`${series}${from}`] = true;
      }
    });

    return result;
  }, {});

module.exports.normalizeInputPassport = (passport) => {
  let text = passport.trim();

  text = text.replace(/a/gi, 'а');
  text = text.replace(/b/gi, 'в');
  text = text.replace(/c/gi, 'с');
  text = text.replace(/e/gi, 'е');
  text = text.replace(/h/gi, 'н');
  text = text.replace(/k/gi, 'к');
  text = text.replace(/m/gi, 'м');
  text = text.replace(/o/gi, 'о');
  text = text.replace(/p/gi, 'р');
  text = text.replace(/t/gi, 'т');
  text = text.replace(/y/gi, 'у');
  text = text.replace(/x/gi, 'х');

  return text.toUpperCase();
};
