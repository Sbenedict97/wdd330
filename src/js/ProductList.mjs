export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    
    async init() {
      const list = await this.dataSource.getData();
    }
  }