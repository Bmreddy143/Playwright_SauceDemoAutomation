import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import {users} from '../data/users'
import { constants } from '../data/constants';
let loginPage:LoginPage; // declaring object

// using playwright's beforeEach hook - runs before each test
test.beforeEach(async({page})=>{
  loginPage=new LoginPage(page);
  await loginPage.open()
})





// testcase 1 -login scenario
test('user can login with valid credentials @smoke', async({page})=>{
  await loginPage.login(users.standardUser.username, users.standardUser.password)
  await expect(page).toHaveURL(constants.urls.inventry_url)
  await expect(page.locator('.title')).toHaveText(constants.text.productTitle)
})


