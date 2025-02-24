import Countries from '@data/demo/countries';
import Groups from '@data/demo/groups';

const {faker} = require('@faker-js/faker');

const countriesNames = Object.values(Countries).map((country) => country.name);
const groupAccessNames = Object.values(Groups).map((group) => group.name);

const currencies = ['All currencies', 'Euro'];
const reductionType = ['Amount', 'Percentage'];
const reductionTax = ['Tax excluded', 'Tax included'];

/**
 * Create new catalog price rule to use on creation catalog price rule form on BO
 * @class
 */
class CatalogPriceRuleData {
  /**
   * Constructor for class CatalogPriceRuleData
   * @param priceRuleToCreate {Object} Could be used to force the value of some members
   */
  constructor(priceRuleToCreate = {}) {
    /** @type {string} Name of the price rule */
    this.name = priceRuleToCreate.name || faker.commerce.department();

    /** @type {string} Currency of the price rule */
    this.currency = priceRuleToCreate.currency || faker.helpers.arrayElement(currencies);

    /** @type {string} Country that could use the cart rule */
    this.country = priceRuleToCreate.country || faker.helpers.arrayElement(countriesNames);

    /** @type {string} Customer group that could use the price rule */
    this.group = priceRuleToCreate.group || faker.helpers.arrayElement(groupAccessNames);

    /** @type {number} Minimum quantity to apply price rule */
    this.fromQuantity = priceRuleToCreate.fromQuantity === undefined
      ? faker.datatype.number({min: 1, max: 9})
      : priceRuleToCreate.fromQuantity;

    /** @type {string} Starting date to apply the price rule  */
    this.fromDate = priceRuleToCreate.fromDate || '';

    /** @type {string} Ending date to apply price rule */
    this.toDate = priceRuleToCreate.toDate || '';

    /** @type {string} Reduction type of the price rule */
    this.reductionType = priceRuleToCreate.reductionType || faker.helpers.arrayElement(reductionType);

    /** @type {string} Reduction tax for the price rule */
    this.reductionTax = priceRuleToCreate.reductionTax || faker.helpers.arrayElement(reductionTax);

    /** @type {number} Reduction value of the price rule */
    this.reduction = priceRuleToCreate.reduction || faker.datatype.number({min: 20, max: 30});
  }
}

module.exports = CatalogPriceRuleData;
