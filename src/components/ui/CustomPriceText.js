import { Text, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomPriceText({ price, textColor, textSize }) {
  const priceString = price.toFixed(2);
  const [integerPart, decimalPart] = priceString.split('.');

  return (
    <Text
      style={[
        styles.priceInteger,
        {
          color: textColor,
          fontSize: textSize,
        },
      ]}
    >
      <Text style={[styles.priceDollar, { fontSize: textSize - 7 }]}>$</Text>
      {integerPart}.
      <Text style={[styles.priceDecimal, { fontSize: textSize - 7 }]}>
        {decimalPart}
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  priceDollar: {
    fontWeight: '700',
  },
  priceInteger: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontWeight: '700',
  },
  priceDecimal: {
    fontWeight: '700',
  },
});
