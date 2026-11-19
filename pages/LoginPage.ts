import{Page,Locator} from '@playwright/test';
class LoginPage{
    // declaration of property
    page:Page; 
    baseURL:string;
    locators: Record<string, Locator>
    // usernameInput:Locator
    // passwordInput:Locator
    // loginButton:Locator
    constructor(page:Page){
        this.page=page
        this.baseURL=process.env.BASE_URL || '';
        // Locators
        this.locators ={
            usernameInput:page.getByPlaceholder('Username'),
            passwordInput:page.getByPlaceholder('Password'),
            loginButton:page.getByRole("button",{name:'Login'} )
        }
        
    }

    async open(){
     console.log(`Opening base URL: ${this.baseURL}`)   
     await this.page.goto(this.baseURL);
     console.log('Landing page successfully opened')
   }
   
   async login(username:string,password:string){
    await this.locators.usernameInput.fill(username)
    await this.locators.passwordInput.fill(password)
    await this.locators.loginButton.click()
   }
}

export default LoginPage;
