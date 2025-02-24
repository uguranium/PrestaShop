// Import utils
import files from '@utils/files';
import helper from '@utils/helpers';
import testContext from '@utils/testContext';

// Import common tests
import loginCommon from '@commonTests/BO/loginBO';
import {createOrderByCustomerTest} from '@commonTests/FO/order';

// Import BO pages
import dashboardPage from '@pages/BO/dashboard';
import ordersPage from '@pages/BO/orders';
import invoicesPage from '@pages/BO/orders/invoices/index';
import orderPagePaymentBlock from '@pages/BO/orders/view/paymentBlock';
import orderPageProductsBlock from '@pages/BO/orders/view/productsBlock';
import orderPageTabListBlock from '@pages/BO/orders/view/tabListBlock';

// Import data
import {DefaultCustomer} from '@data/demo/customer';
import OrderStatuses from '@data/demo/orderStatuses';
import {PaymentMethods} from '@data/demo/paymentMethods';
import type Order from '@data/types/order';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';

const baseContext: string = 'functional_BO_orders_orders_viewAndEditOrder_documentsTab';

/*
Pre-condition :
- Create order by default customer
Scenario :
- Disable/Enable invoices and check result
- Check all types of documents( invoice, delivery slip, credit slip) and download them
- Check add note, enter payment buttons
 */

describe('BO - Orders - View and edit order : Check order documents tab', async () => {
  let browserContext: BrowserContext;
  let page: Page;
  let filePath: string|null;

  const note: string = 'Test note for document';
  // New order by customer data
  const orderByCustomerData: Order = {
    customer: DefaultCustomer,
    productId: 1,
    productQuantity: 1,
    paymentMethod: PaymentMethods.wirePayment.moduleName,
  };

  // Pre-condition - Create order by default customer
  createOrderByCustomerTest(orderByCustomerData, `${baseContext}_preTest_1`);

  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  // 1 - Disable invoices
  describe('Disable invoices', async () => {
    it('should login in BO', async function () {
      await loginCommon.loginBO(this, page);
    });

    it('should go to \'Orders > Invoices\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToInvoicesPage1', baseContext);

      await dashboardPage.goToSubMenu(
        page,
        dashboardPage.ordersParentLink,
        dashboardPage.invoicesLink,
      );
      await invoicesPage.closeSfToolBar(page);

      const pageTitle = await invoicesPage.getPageTitle(page);
      await expect(pageTitle).to.contains(invoicesPage.pageTitle);
    });

    it('should disable invoices', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'disableInvoices', baseContext);

      await invoicesPage.enableInvoices(page, false);

      const textMessage = await invoicesPage.saveInvoiceOptions(page);
      await expect(textMessage).to.contains(invoicesPage.successfulUpdateMessage);
    });
  });

  // 2 - Go to view order page
  describe('Go to view order page', async () => {
    it('should go to \'Orders > Orders\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage1', baseContext);

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
      await testContext.addContextItem(this, 'testIdentifier', 'resetOrderTableFilters1', baseContext);

      const numberOfOrders = await ordersPage.resetAndGetNumberOfLines(page);
      await expect(numberOfOrders).to.be.above(0);
    });

    it(`should filter the Orders table by 'Customer: ${DefaultCustomer.lastName}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterByCustomer1', baseContext);

      await ordersPage.filterOrders(page, 'input', 'customer', DefaultCustomer.lastName);

      const textColumn = await ordersPage.getTextColumn(page, 'customer', 1);
      await expect(textColumn).to.contains(DefaultCustomer.lastName);
    });

    it('should view the order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'orderPageTabListBlock1', baseContext);

      await ordersPage.goToOrder(page, 1);

      const pageTitle = await orderPageTabListBlock.getPageTitle(page);
      await expect(pageTitle).to.contains(orderPageTabListBlock.pageTitle);
    });
  });

  // 3 - Check generate invoice button
  describe('Check generate invoice button', async () => {
    it('should click on \'Documents\' tab', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'displayDocumentsTab1', baseContext);

      const isTabOpened = await orderPageTabListBlock.goToDocumentsTab(page);
      await expect(isTabOpened).to.be.true;
    });

    it('should check that \'Generate invoice\' button is not visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkGenerateInvoiceButton1', baseContext);

      const isVisible = await orderPageTabListBlock.isGenerateInvoiceButtonVisible(page);
      await expect(isVisible).to.be.false;
    });
  });

  // 4 - Enable invoices
  describe('Enable invoices', async () => {
    it('should go to \'Orders > Invoices\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToInvoicesPage2', baseContext);

      await dashboardPage.goToSubMenu(
        page,
        dashboardPage.ordersParentLink,
        dashboardPage.invoicesLink,
      );
      await invoicesPage.closeSfToolBar(page);

      const pageTitle = await invoicesPage.getPageTitle(page);
      await expect(pageTitle).to.contains(invoicesPage.pageTitle);
    });

    it('should enable invoices', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'enableInvoices', baseContext);

      await invoicesPage.enableInvoices(page, true);

      const textMessage = await invoicesPage.saveInvoiceOptions(page);
      await expect(textMessage).to.contains(invoicesPage.successfulUpdateMessage);
    });
  });

  // 5 - Go to view order page
  describe('Go to view order page', async () => {
    it('should go to \'Orders > Orders\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage2', baseContext);

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
      await testContext.addContextItem(this, 'testIdentifier', 'resetOrderTableFilters2', baseContext);

      const numberOfOrders = await ordersPage.resetAndGetNumberOfLines(page);
      await expect(numberOfOrders).to.be.above(0);
    });

    it(`should filter the Orders table by 'Customer: ${DefaultCustomer.lastName}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterByCustomer', baseContext);

      await ordersPage.filterOrders(page, 'input', 'customer', DefaultCustomer.lastName);

      const textColumn = await ordersPage.getTextColumn(page, 'customer', 1);
      await expect(textColumn).to.contains(DefaultCustomer.lastName);
    });

    it('should view the order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'orderPageTabListBlock2', baseContext);

      await ordersPage.goToOrder(page, 1);

      const pageTitle = await orderPageTabListBlock.getPageTitle(page);
      await expect(pageTitle).to.contains(orderPageTabListBlock.pageTitle);
    });
  });

  // 6 - Check documents tab
  describe('Check documents tab', async () => {
    it('should click on \'DocumentS\' tab', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'displayDocumentsTab2', baseContext);

      const isTabOpened = await orderPageTabListBlock.goToDocumentsTab(page);
      await expect(isTabOpened).to.be.true;
    });

    it('should check that \'Generate invoice\' button is visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkGenerateInvoiceButton2', baseContext);

      const isVisible = await orderPageTabListBlock.isGenerateInvoiceButtonVisible(page);
      await expect(isVisible).to.be.true;
    });

    it('should check that documents number is equal to 0', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkDocumentsNumber0', baseContext);

      const documentsNumber = await orderPageTabListBlock.getDocumentsNumber(page);
      await expect(documentsNumber).to.be.equal(0);
    });

    it('should check the existence of the message \'There is no available document\'', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkMessage', baseContext);

      const textMessage = await orderPageTabListBlock.getTextColumnFromDocumentsTable(page, 'alert-available', 1);
      await expect(textMessage).to.be.equal(orderPageTabListBlock.noAvailableDocumentsMessage);
    });

    it('should click on \'Generate invoice\' button', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'create invoice', baseContext);

      const textResult = await orderPageTabListBlock.generateInvoice(page);
      await expect(textResult).to.equal(orderPageTabListBlock.successfulUpdateMessage);
    });

    it('should check that documents number is equal to 1', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkDocumentsNumber1', baseContext);

      const documentsNumber = await orderPageTabListBlock.getDocumentsNumber(page);
      await expect(documentsNumber).to.be.equal(1);
    });

    it('should check if \'Invoice\' document is created', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkInvoiceDocument', baseContext);

      const documentType = await orderPageTabListBlock.getDocumentType(page, 1);
      await expect(documentType).to.be.equal('Invoice');
    });

    it('should download the \'Invoice\' file', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'downloadInvoice', baseContext);

      filePath = await orderPageTabListBlock.downloadInvoice(page, 1);
      await expect(filePath).to.be.not.null;

      const doesFileExist = await files.doesFileExist(filePath as string, 5000);
      await expect(doesFileExist).to.be.true;
    });

    it('should add note', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'addNote', baseContext);

      const textResult = await orderPageTabListBlock.setDocumentNote(page, note, 1);
      await expect(textResult).to.equal(orderPageTabListBlock.updateSuccessfullMessage);
    });

    it('should check that the button \'Edit note\' is visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkEditNoteButton', baseContext);

      const isVisible = await orderPageTabListBlock.isEditDocumentNoteButtonVisible(page);
      await expect(isVisible).to.be.true;
    });

    it('should delete note', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'deleteNote', baseContext);

      const textResult = await orderPageTabListBlock.setDocumentNote(page, '', 1);
      await expect(textResult).to.equal(orderPageTabListBlock.updateSuccessfullMessage);
    });

    it('should check that the button \'Add note\' is visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkAddNoteButton', baseContext);

      const isVisible = await orderPageTabListBlock.isAddDocumentNoteButtonVisible(page);
      await expect(isVisible).to.be.true;
    });

    it('should click on \'Enter payment\' button', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkPaymentButton', baseContext);

      await orderPageTabListBlock.clickOnEnterPaymentButton(page);

      const amountValue = await orderPagePaymentBlock.getPaymentAmountInputValue(page);
      await expect(amountValue).to.not.equal('');
    });

    it(`should change the order status to '${OrderStatuses.paymentAccepted.name}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'updateOrderStatusPaymentAccepted', baseContext);

      const textResult = await orderPageTabListBlock.modifyOrderStatus(page, OrderStatuses.paymentAccepted.name);
      await expect(textResult).to.equal(OrderStatuses.paymentAccepted.name);
    });

    it('should check that the button \'Enter payment\' is not visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkEnterPaymentButton', baseContext);

      const isVisible = await orderPageTabListBlock.isEnterPaymentButtonVisible(page);
      await expect(isVisible).to.be.false;
    });

    it(`should change the order status to '${OrderStatuses.shipped.name}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'updateOrderStatusShipped', baseContext);

      const textResult = await orderPageTabListBlock.modifyOrderStatus(page, OrderStatuses.shipped.name);
      await expect(textResult).to.equal(OrderStatuses.shipped.name);
    });

    it('should check that documents number is equal to 2', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkDocumentsNumber2', baseContext);

      const documentsNumber = await orderPageTabListBlock.getDocumentsNumber(page);
      await expect(documentsNumber).to.be.equal(2);
    });

    it('should check if \'Delivery slip\' document is created', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkDeliverySlipDocument', baseContext);

      const documentType = await orderPageTabListBlock.getDocumentType(page, 3);
      await expect(documentType).to.be.equal('Delivery slip');
    });

    it('should download \'Delivery slip\' file', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'downloadDeliverySlip', baseContext);

      filePath = await orderPageTabListBlock.downloadInvoice(page, 3);
      await expect(filePath).to.be.not.null;

      const doesFileExist = await files.doesFileExist(filePath as string, 5000);
      await expect(doesFileExist).to.be.true;
    });

    it('should create \'Partial refund\'', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'createPartialRefund', baseContext);

      await orderPageTabListBlock.clickOnPartialRefund(page);

      const textMessage = await orderPageProductsBlock.addPartialRefundProduct(page, 1, 1);
      await expect(textMessage).to.contains(orderPageProductsBlock.partialRefundValidationMessage);
    });

    it('should check if \'Credit slip\' document is created', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkCreditSlipDocument', baseContext);

      // Get document name
      const documentType = await orderPageTabListBlock.getDocumentType(page, 4);
      await expect(documentType).to.be.equal('Credit slip');
    });

    it('should download \'Credit slip\' file', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'downloadCreditSlip', baseContext);

      filePath = await orderPageTabListBlock.downloadInvoice(page, 4);
      await expect(filePath).to.be.not.null;

      const doesFileExist = await files.doesFileExist(filePath as string, 5000);
      await expect(doesFileExist).to.be.true;
    });
  });
});
