import{Page,Locator} from '@playwright/test';
class InventoryPage{
     // declaration of property
        page:Page; 
        baseURL:string;
        locators: Record<string, Locator>
    constructor(page:Page){
            this.page=page
            this.baseURL=process.env.BASE_URL || '';
            // Locators
    this.locators ={
        inventorItems:page.locator('[data-test="inventory-item"]'), //css locator
        cartBadge:page.locator('[data-test="shopping-cart-badge"]'),
        sortDropDown:page.locator('[data-test="product-sort-container"]'),    
        itemPrices:page.locator('[data-test="inventory-item-price"]')       
    }
            
        }
 
    getProductCard(productName:string){
         return this.locators.inventoryItems.filter({hasText:productName})
    }

    async addProductToCart(productName:string){
        const product=this.getProductCard(productName)
        await product.getByRole('button',{name:'Add to cart'}).click();
    }    
     
    async getCartCount(){
        const hasBadge=await this.locators.cartBadge.count();
        if(hasBadge===0) return 0;
       const text=await this.locators.cartBadge.textContent();
       return parseInt(text ?? '0',10);
    }

    async sortBy(optionvalue:string){
        await this.locators.sortDropDown.selectOption(optionvalue)// it will click on the sort option
    } 
   
    async getAllProductPrice(){
       const priceTexts=await this.locators.itemPrices.allTextContents();
       return priceTexts.map((p)=>parseFloat(p.replace('$','')))
    }

}

export default InventoryPage;