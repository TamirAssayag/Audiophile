import sumBy from 'lodash/sumBy'
export const genGrandTotal = (cart) => {
  return sumBy(cart, (item) => item.quantity * item.price)
}
