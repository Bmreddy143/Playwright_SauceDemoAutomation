import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';
import { constants } from '../data/constants';

let inventoryPage:InventoryPage;
let loginPage:LoginPage;

// using playwright's beforeEach hook - runs before each test
test.beforeEach(async({page})=>{
  loginPage=new LoginPage(page);
  inventoryPage=new InventoryPage(page);
  await loginPage.open()
})


test('cart badge update when adding products @smoke', async({page})=>{
    await inventoryPage.addProductToCart(constants.text.bagPack)
    await inventoryPage.addProductToCart(constants.text.bikeLight)
    const cartCount=await inventoryPage.getCartCount
    expect(cartCount).toBe(2);
})

test('products can be sorted by price low to high', async({page})=>{
    await inventoryPage.sortBy(constants.sortOptions.priceLowtoHigh)
    const prices=await inventoryPage.getAllProductPrice();
    const sortedPrices=[...prices].sort((a,b)=>a-b);
    expect(prices).toEqual(sortedPrices)
})