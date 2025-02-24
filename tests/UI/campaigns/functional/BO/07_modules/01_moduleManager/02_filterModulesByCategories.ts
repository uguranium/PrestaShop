// Import utils
import helper from '@utils/helpers';
import testContext from '@utils/testContext';

// Import commonTests
import loginCommon from '@commonTests/BO/loginBO';

// Import pages
import dashboardPage from '@pages/BO/dashboard';
import moduleManagerPage from '@pages/BO/modules/moduleManager';

// Import data
import {moduleCategories} from '@data/demo/moduleCategories';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';

const baseContext: string = 'functional_BO_modules_moduleManager_filterModulesByCategories';

describe('BO - Modules - Module Manager : Filter modules by Categories', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  it('should login in BO', async function () {
    await loginCommon.loginBO(this, page);
  });

  it('should go to \'Modules > Module Manager\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToModuleManagerPage', baseContext);

    await dashboardPage.goToSubMenu(
      page,
      dashboardPage.modulesParentLink,
      dashboardPage.moduleManagerLink,
    );
    await moduleManagerPage.closeSfToolBar(page);

    const pageTitle = await moduleManagerPage.getPageTitle(page);
    await expect(pageTitle).to.contains(moduleManagerPage.pageTitle);
  });

  describe('Filter modules by categories', async () => {
    moduleCategories.forEach((category) => {
      it(`should filter by category : '${category}'`, async function () {
        await testContext.addContextItem(this, 'testIdentifier', `filterByCategory${category}`, baseContext);

        // Filter modules by categories
        const categoriesNumber: number = await moduleManagerPage.filterByCategory(page, category);

        if (categoriesNumber !== 0) {
          // Check first category displayed
          const firstBlockTitle = await moduleManagerPage.getBlockModuleTitle(page, 1);
          await expect(firstBlockTitle).to.equal(category);
        } else {
          // Check that module title is not visible
          const isModuleTitleVisible = await moduleManagerPage.isModulesListBlockTitleVisible(page);
          await expect(isModuleTitleVisible).to.be.false;
        }
      });
    });
  });
});
