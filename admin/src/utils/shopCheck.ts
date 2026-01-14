export function checkShopState(shop: any): { isValid: boolean; error?: string } {
  if (!shop) {
    return { isValid: false, error: 'Магазин не найден в Redux' };
  }

  if (!shop.id) {
    return { isValid: false, error: 'ID магазина отсутствует' };
  }

  if (shop.id === 'undefined' || shop.id === 'null') {
    return { isValid: false, error: `ID магазина некорректен: "${shop.id}"` };
  }

  const shopId = parseInt(shop.id);
  if (isNaN(shopId)) {
    return { isValid: false, error: `ID магазина не является числом: "${shop.id}"` };
  }

  if (shopId <= 0) {
    return { isValid: false, error: `ID магазина должен быть положительным числом: ${shopId}` };
  }

  return { isValid: true };
}
