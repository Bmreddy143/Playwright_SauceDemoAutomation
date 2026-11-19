import{Page,Locator} from '@playwright/test';
class CartPage {
        page:Page; 
        baseURL:string;
        locators: Record<string, Locator>
    constructor(page:Page){
            this.page=page
            this.baseURL=process.env.BASE_URL || '';
            // Locators
       this.locators ={
        cartLink:page.locator('[data-test="shopping-cart-badge"]'),
        itemNames:page.locator('[data-test="inventory-item-name"]'),    
        cartItem:page.locator('[data-test="inventory-item-name"]'),    
        checkoutButton:page.getByRole('button',{name:'Checkout'}) ,
        
        // checkout page locators
        firstName:page.getByPlaceholder('First Name'),
        lastName: page.getByPlaceholder('Last Name'),
        zipCode: page.getByPlaceholder('Zip/Postal Code'),
        continue:page.getByRole('button',{name:'continue'}),
        subtotal:page.locator('[data-test="subtotal-label"]'),
        tax:page.locator('[data-test="tax-label"]'),
        total:page.locator('[data-test="total-label"]'),
        finish:page.getByRole('button',{name:'Finish'}),
        orderSuccessHeader:page.locator('[data-test="complete-header"]')
       }
    }

    async goToCart(){
        await this.locators.cartLink.click();
    }
     
    async getAllCartProductNames(){
        return await this.locators.itemNames.allTextContents();
    }
    
    async removeProduct(productName:string){
        const item=this.getcartItem(productName)
        await item.getByRole('button',{name:'Remove'}) 
    }
    
    getcartItem(productName:string) {
      return this.locators.cartItem.filter({hasText: productName})    
    }

    async getCartItemCount(){
       return await this.locators.cartIem.count();
    }

    async clickOncheckout(){
        await this.locators.checkoutButton.click()
    }

    async fillcheckoutInfo(firstName:string,lastName:string,zipcode:string)
    {
      await this.locators.firsName.fill(firstName)
      await this.locators.lastName.fill(lastName)
      await this.locators.zipCode.fill(zipcode)
    }

    async clickonContinueToOverview(){
        await this.locators.continue.click()
    }
    async getSubtotal(){
        const text=await this.locators.subtotal.textContent()
        return parseFloat(text?.replace('Item total: $', '') ?? '0')
    }

    async getTax(){
        const text=await this.locators.tax.textContent()
        return parseFloat(text?.replace('Tax: $', '') ?? '0')
    }

    async getTotal(){
        const text=await this.locators.total.textContent()
        return parseFloat(text?.replace('Total: $', '') ?? '0')
    }
    async clickonFinish(){
        await this.locators.finish.click()
    }

    async getHeader(){
        await this.locators.orderSuccessHeader.textContent()
    }
}
export default CartPage;