import React from 'react';
import React from 'react';
import numeral from 'numeral';

const USD_TO_ETB_RATE = 165; // approximate exchange rate — update as needed

const CurrencyFormat = ({ amount }) => {
  const etbAmount = amount * USD_TO_ETB_RATE;
  const formattedAmount = numeral(etbAmount).format('0,0.00');
  return <div>{formattedAmount} ETB</div>;
};

export default CurrencyFormat;