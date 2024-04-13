import { Customer } from './customer';
import { CustomerCsvFileWriter } from './customer-csv-file-writter';

export class BatchedCustomerCsvFileWriter {
  constructor(
    private customerCsvFileWriter: CustomerCsvFileWriter,
    private batchSize: number = 10
  ) {}
  writeCustomer(fileName: string, customers: Customer[]) {
    if (customers.length <= this.batchSize) {
      return this.customerCsvFileWriter.writeCustomers(fileName, customers);
    }
    let [baseFilename, extension] = fileName.split('.');
    let totalBatch = Math.ceil(customers.length / this.batchSize);
    for (let batchNumber = 1; batchNumber <= totalBatch; batchNumber++) {
      let batchFileName = `${baseFilename}${batchNumber}`;
      if (extension) batchFileName += `.${extension}`;
      let startPerson = (batchNumber - 1) * this.batchSize;
      let endPerson = batchNumber * this.batchSize;
      this.customerCsvFileWriter.writeCustomers(
        batchFileName,
        customers.slice(startPerson, endPerson)
      );
    }
  }
}
