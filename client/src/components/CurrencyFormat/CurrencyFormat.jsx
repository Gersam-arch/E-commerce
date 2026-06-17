import React from 'react';
import numeral from 'numeral';
import customPrices from '../../Api/customPrices';

const CurrencyFormat = ({ productId }) => {
  const etbAmount = customPrices[productId];
  const formattedAmount = numeral(etbAmount).format('0,0');
  return <span>{formattedAmount} ETB</span>;
};

export default CurrencyFormat;