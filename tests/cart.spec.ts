import { test, expect } from '@playwright/test';
import CartPage from '../pages/cartPage';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import { constants } from '../data/constants';

let cartPage:CartPage;
let loginPage:LoginPage;
let inventoryPage:InventoryPage;

// using playwright's beforeEach hook - runs before each test
test.beforeEach(async({page})=>{
  loginPage=new LoginPage(page);
  cartPage=new CartPage(page);
  inventoryPage=new InventoryPage(page);
  await loginPage.open()
})

test('addded products appear correctly in cart', async({page})=>{
     await inventoryPage.addProductToCart(constants.text.bagPack)
     await inventoryPage.addProductToCart(constants.text.bikeLight)
     await cartPage.goToCart
     await expect(page).toHaveURL(constants.urls.cart)
     const itemNames=await cartPage.getAllCartProductNames()
     expect(itemNames).toEqual([constants.text.bagPack,constants.text.bikeLight])
})

test('product can be removed from the cart', async({page})=>{
     await inventoryPage.addProductToCart(constants.text.bagPack)
     await inventoryPage.addProductToCart(constants.text.bikeLight)
     await cartPage.goToCart()
     await cartPage.removeProduct(constants.text.bagPack)
     const count=await cartPage.getCartItemCount()
     expect(count).toBe(1);
     const remainingProduct=await cartPage.getAllCartProductNames
     expect(remainingProduct).toEqual(constants.text.bikeLight)
})

test('add a product to cart and head to checkout and user can probably proceed with right info', async({page})=>{
     await inventoryPage.addProductToCart(constants.text.bagPack)
     await inventoryPage.addProductToCart(constants.text.bikeLight)
     await cartPage.goToCart()
     await cartPage.clickOncheckout()
     await cartPage.fillcheckoutInfo(constants.checkoutData.firsName,constants.checkoutData.lastName,constants.checkoutData.lastName)
     await cartPage.clickonContinueToOverview()

     await expect(page).toHaveURL(constants.urls.checkoutoverview)

     const subtotal=await cartPage.getSubtotal()
     const tax=await cartPage.getTax()
     const total=await cartPage.getTotal()     
     expect(total).toBeCloseTo(subtotal+tax,2)
     await cartPage.clickonFinish()
     await expect(page).toHaveURL(constants.urls.checkoutcomplete)
     await expect(cartPage.locators.orderSuccessHeader).toHaveText(constants.text.ordersucess)
    })
