const currencyFormat = (value, currency, locale) => {
  let Denomination = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
  return Denomination.format(value);
};

export default currencyFormat;
