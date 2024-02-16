export function calculateDiscount(priceVal, discountVal) {
    const PERCENT = 100;
    let price = parseFloat(priceVal);
    let discount = parseFloat(discountVal);
    let discountedPrice = price - (price * (discount / PERCENT));
    return discountedPrice;
}
