// Import utils
import date from '@utils/date';
import helper from '@utils/helpers';
import testContext from '@utils/testContext';

// Import commonTests
import {createAddressTest} from '@commonTests/BO/customers/address';
import {createCustomerTest, deleteCustomerTest} from '@commonTests/BO/customers/customer';
import loginCommon from '@commonTests/BO/loginBO';
import {createOrderByCustomerTest} from '@commonTests/FO/order';

// Import BO pages
import customersPage from '@pages/BO/customers';
import dashboardPage from '@pages/BO/dashboard';
import ordersPage from '@pages/BO/orders';
import addOrderPage from '@pages/BO/orders/add';
import orderPageCustomerBlock from '@pages/BO/orders/view/customerBlock';
import orderPageProductsBlock from '@pages/BO/orders/view/productsBlock';
import orderPageTabListBlock from '@pages/BO/orders/view/tabListBlock';

// Import data
import OrderStatuses from '@data/demo/orderStatuses';
import {PaymentMethods} from '@data/demo/paymentMethods';
import Products from '@data/demo/products';
import AddressFaker from '@data/faker/address';
import CustomerFaker from '@data/faker/customer';
import OrderStatusData from '@data/faker/orderStatus';
import type Order from '@data/types/order';

import {expect} from 'chai';
import type {BrowserContext, Frame, Page} from 'playwright';

const baseContext: string = 'functional_BO_orders_orders_createOrders_selectPreviousOrders';

/*
Pre-condition:
- Create customer
- Create address
- Create order by new customer
Scenario:
- Go to create order page
- Check orders table
- Check order details
- Complete the order
Post-condition:
- Delete created customer

 */
describe('BO - Orders - Create order : Select previous orders', async () => {
  let browserContext: BrowserContext;
  let page: Page;
  let orderID: number = 0;
  let customerID: number = 0;
  let orderIframe: Frame|null;

  const today: string = date.getDateFormat('yyyy-mm-dd');
  const newCustomer: CustomerFaker = new CustomerFaker();
  const newAddress: AddressFaker = new AddressFaker({
    email: newCustomer.email,
    country: 'France',
  });
  const orderData: Order = {
    customer: newCustomer,
    productId: 1,
    productQuantity: 1,
    paymentMethod: PaymentMethods.wirePayment.moduleName,
  };
  const paymentMethod: string = PaymentMethods.checkPayment.moduleName;
  const orderStatus: OrderStatusData = OrderStatuses.paymentAccepted;

  // Pre-condition: Create new customer
  createCustomerTest(newCustomer, `${baseContext}_preTest_1`);

  // Pre-condition: Create new address
  createAddressTest(newAddress, `${baseContext}_preTest_2`);

  // Pre-condition: Create order
  createOrderByCustomerTest(orderData, `${baseContext}_preTest_3`);

  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  // Pre-condition: Get customer ID
  describe('PRE-TEST: Get customer ID', async () => {
    it('should login in BO', async function () {
      await loginCommon.loginBO(this, page);
    });

    it('should go \'Customers > Customers\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToCustomersPage', baseContext);

      await dashboardPage.goToSubMenu(
        page,
        dashboardPage.customersParentLink,
        dashboardPage.customersLink,
      );
      await customersPage.closeSfToolBar(page);

      const pageTitle = await customersPage.getPageTitle(page);
      await expect(pageTitle).to.contains(customersPage.pageTitle);
    });

    it('should filter list by email', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterToDelete', baseContext);

      await customersPage.filterCustomers(page, 'input', 'email', newCustomer.email);

      const textResult = await customersPage.getTextColumnFromTableCustomers(page, 1, 'email');
      await expect(textResult).to.contains(newCustomer.email);
    });

    it('should get the customer ID', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'getCustomerID', baseContext);

      customerID = parseInt(await customersPage.getTextColumnFromTableCustomers(page, 1, 'id_customer'), 10);
      await expect(customerID).to.be.above(0);
    });
  });

  // Pre-condition: Get created order ID
  describe('PRE-TEST: Get the created order ID', async () => {
    it('should go to \'Orders > Orders\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage', baseContext);

      await dashboardPage.goToSubMenu(
        page,
        dashboardPage.ordersParentLink,
        dashboardPage.ordersLink,
      );
      await ordersPage.closeSfToolBar(page);

      const pageTitle = await ordersPage.getPageTitle(page);
      await expect(pageTitle).to.contains(ordersPage.pageTitle);
    });

    it('should reset all filters', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'resetAllFilters', baseContext);

      const numberOfOrders = await ordersPage.resetAndGetNumberOfLines(page);
      await expect(numberOfOrders).to.be.above(0);
    });

    it(`should filter the Orders table by 'Customer: ${newCustomer.lastName}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterTable', baseContext);

      await ordersPage.filterOrders(page, 'input', 'customer', newCustomer.lastName);

      const textColumn = await ordersPage.getTextColumn(page, 'customer', 1);
      await expect(textColumn).to.contains(newCustomer.lastName);
    });

    it('should get the order ID', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'getOrderID', baseContext);

      orderID = await ordersPage.getOrderIDNumber(page);
      await expect(parseInt(orderID, 10)).to.be.at.least(5);
    });
  });

  // 1 - Go to create order page
  describe('Go to create order page', async () => {
    it('should go to create order page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToCreateOrderPage', baseContext);

      await ordersPage.goToCreateOrderPage(page);

      const pageTitle = await addOrderPage.getPageTitle(page);
      await expect(pageTitle).to.contains(addOrderPage.pageTitle);
    });

    it(`should choose customer ${newCustomer.firstName} ${newCustomer.lastName}`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'chooseDefaultCustomer', baseContext);

      await addOrderPage.searchCustomer(page, newCustomer.email);

      const isCartsTableVisible = await addOrderPage.chooseCustomer(page);
      await expect(isCartsTableVisible, 'History block is not visible!').to.be.true;
    });
  });

  // 2 - Check orders table
  describe('Check orders table', async () => {
    it('should go to \'Orders\' tab', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'selectOrdersTab', baseContext);

      const isOrdersTableVisible = await addOrderPage.clickOnOrdersTab(page);
      await expect(isOrdersTableVisible, 'Orders table is not visible!').to.be.true;
    });

    it('should check that there is only one order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkOrdersNumber', baseContext);

      const ordersNumber = await addOrderPage.getOrdersNumber(page);
      await expect(ordersNumber, 'Orders number is not correct!').to.be.equal(1);
    });

    it('should check the order \'id\'', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkIdOrder', baseContext);

      const textResult = await addOrderPage.getTextFromOrdersTable(page, 'id');
      await expect(textResult, 'The \'id\' value is not correct!').to.contains(orderID);
    });

    [
      {args: {columnName: 'date', content: today}},
      {args: {columnName: 'products', content: 1}},
      {args: {columnName: 'total-paid', content: '€0.00'}},
      {args: {columnName: 'payment-method', content: 'Bank transfer'}},
      {args: {columnName: 'status', content: 'Awaiting bank wire payment'}},
    ].forEach((test) => {
      it(`should check the order '${test.args.columnName}'`, async function () {
        await testContext.addContextItem(this, 'testIdentifier', `check${test.args.columnName}Order`, baseContext);

        const textResult = await addOrderPage.getTextFromOrdersTable(page, test.args.columnName);
        await expect(textResult, `The '${test.args.columnName}' value is not correct!`).to.contains(test.args.content);
      });
    });
  });

  // 3 - Check order details
  describe('Check order details', async () => {
    it('should click on \'Details\' button', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnDetailsButton', baseContext);

      const isIframeVisible = await addOrderPage.clickOnOrderDetailsButton(page);
      await expect(isIframeVisible, 'View order Iframe is not visible!').to.be.true;
    });

    it('should check customer title, name, lastname, reference', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkCustomerInfo', baseContext);

      orderIframe = await addOrderPage.getOrderIframe(page, orderID);

      const customerInfo = await orderPageCustomerBlock.getCustomerInfoBlock(orderIframe);
      await expect(customerInfo).to.contains(newCustomer.socialTitle);
      await expect(customerInfo).to.contains(newCustomer.firstName);
      await expect(customerInfo).to.contains(newCustomer.lastName);
      await expect(customerInfo).to.contains(customerID.toString());
    });

    it('should check number of ordered products', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkNumberOfProducts0', baseContext);

      const productCount = await orderPageProductsBlock.getProductsNumber(orderIframe);
      await expect(productCount).to.equal(1);
    });

    it('should check the ordered product details', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkSimpleProductDetails', baseContext);

      const result = await orderPageProductsBlock.getProductDetails(orderIframe, 1);
      await Promise.all([
        expect(result.name).to.equal(`${Products.demo_1.name} (Size: S - Color: White)`),
        expect(result.reference).to.equal(`Reference number: ${Products.demo_1.reference}`),
        expect(result.basePrice).to.equal(Products.demo_1.finalPrice),
        expect(result.quantity).to.equal(1),
        expect(result.total).to.equal(Products.demo_1.finalPrice),
      ]);
    });

    it('should check that the status number is equal to 1', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkStatusNumber', baseContext);

      const statusNumber = await orderPageTabListBlock.getStatusNumber(orderIframe);
      await expect(statusNumber).to.be.equal(1);
    });

    it('should check the status name from the table', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkStatusName', baseContext);

      const statusName = await orderPageTabListBlock.getTextColumnFromHistoryTable(orderIframe, 'status', 1);
      await expect(statusName).to.be.equal('Awaiting bank wire payment');
    });
  });

  // 4 - Complete the order
  describe('Complete the order', async () => {
    it('should close the order Iframe', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'closeOrderIframe', baseContext);

      const isIframeNotVisible = await addOrderPage.closeIframe(page);
      await expect(isIframeNotVisible, 'Order iframe still visible!').to.be.true;
    });

    it('should click on \'Use\' button and check that product table is visible on \'Cart\' block', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnUseButton', baseContext);

      const isProductTableVisible = await addOrderPage.clickOnOrderUseButton(page);
      await expect(isProductTableVisible, 'Product table is not visible!').to.be.true;
    });

    it('should complete the order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'completeOrder', baseContext);

      await addOrderPage.setSummaryAndCreateOrder(page, paymentMethod, orderStatus);

      const pageTitle = await orderPageProductsBlock.getPageTitle(page);
      await expect(pageTitle).to.contain(orderPageProductsBlock.pageTitle);
    });
  });

  // Post-condition: Delete created customer
  deleteCustomerTest(newCustomer, `${baseContext}_postTest_1`);
});
