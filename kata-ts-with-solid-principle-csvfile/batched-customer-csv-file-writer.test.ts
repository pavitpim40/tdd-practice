import { BatchedCustomerCsvFileWriter } from './batched-customer-csv-file-writer';
import {
  CreateMockFileWriter,
  MockFileWriter,
  CreateCustomerCsvFileWriter,
  createCustomerList,
} from './customer-csv-file-writer.test';

describe('writeCustomerInBatched', () => {
  describe('batch of ten', () => {
    describe('1-10 customers should batch in one group', () => {
      test('10 customer should write in 10', () => {
        const fileWriter = CreateMockFileWriter();
        const customers = createCustomerList(10);
        const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 10);
        const fileName = 'batchedcust.csv';
        // Act
        sut.writeCustomer(fileName, customers);

        // Assert
        fileWriter.assertCustomerWereWrittenToFile('batchedcust.csv', customers.slice(0, 10));
      });
    });

    describe('11-20 customers should batch in two file', () => {
      test('12 customer should write in 10 and 2', () => {
        const fileWriter = CreateMockFileWriter();
        const customers = createCustomerList(12);
        const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 10);
        const fileName = 'batchedcust.csv';
        // Act
        sut.writeCustomer(fileName, customers);

        // Assert
        fileWriter.assertCustomerWereWrittenToFile('batchedcust1.csv', customers.slice(0, 10));
        fileWriter.assertCustomerWereWrittenToFile('batchedcust2.csv', customers.slice(10, 13));
      });
    });

    describe('21-30 customers should batch in two file', () => {
      test('23 customer should write in 10,10 and 3', () => {
        const fileWriter = CreateMockFileWriter();
        const customers = createCustomerList(23);
        const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 10);
        const fileName = 'batchedcustomer.csv';
        // Act
        sut.writeCustomer(fileName, customers);

        // Assert
        fileWriter.assertCustomerWereWrittenToFile('batchedcustomer1.csv', customers.slice(0, 10));
        fileWriter.assertCustomerWereWrittenToFile('batchedcustomer2.csv', customers.slice(10, 20));
        fileWriter.assertCustomerWereWrittenToFile('batchedcustomer3.csv', customers.slice(20));
      });
    });

    test('write all 100 customer', () => {
      const fileWriter = CreateMockFileWriter();
      const customers = createCustomerList(100);
      const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 10);
      const fileName = 'batchedcustomer.csv';
      // Act
      sut.writeCustomer(fileName, customers);

      // Assert
      fileWriter.assertNumberOfCustomerWritten(customers.length);
    });

    test('should name files correctly without extension', () => {
      const fileWriter = CreateMockFileWriter();
      const customers = createCustomerList(15);
      const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 10);
      const fileName = 'noext';
      // Act
      sut.writeCustomer(fileName, customers);

      // Assert
      fileWriter.assertCustomerWereWrittenToFile('noext1', customers.slice(0, 10));
      fileWriter.assertCustomerWereWrittenToFile('noext2', customers.slice(10, 20));
    });
  });

  describe('variant in number of each batch', () => {
    test('batch of 3', () => {
      // Arrange
      const fileWriter = CreateMockFileWriter();
      const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 3);
      const customers = createCustomerList(10);

      // Act
      sut.writeCustomer('variantbatch.csv', customers);

      // Assert
      fileWriter.assertCustomerWereWrittenToFile('variantbatch1.csv', customers.slice(0, 3));
      fileWriter.assertCustomerWereWrittenToFile('variantbatch2.csv', customers.slice(3, 6));
      fileWriter.assertCustomerWereWrittenToFile('variantbatch3.csv', customers.slice(6, 9));
      fileWriter.assertCustomerWereWrittenToFile('variantbatch4.csv', customers.slice(9, 11));
    });

    test('batch of 6', () => {
      // Arrange
      const fileWriter = CreateMockFileWriter();
      const sut = CreateBatchCsvFileWriterWithBatchSize(fileWriter, 6);
      const customers = createCustomerList(14);

      // Act
      sut.writeCustomer('variantbatch.csv', customers);

      // Assert
      fileWriter.assertCustomerWereWrittenToFile('variantbatch1.csv', customers.slice(0, 6));
      fileWriter.assertCustomerWereWrittenToFile('variantbatch2.csv', customers.slice(6, 12));
      fileWriter.assertCustomerWereWrittenToFile('variantbatch3.csv', customers.slice(12, 15));
    });
  });
});

// ################## HELPER

// Assert

function CreateBatchCsvFileWriterWithBatchSize(fileWriter: MockFileWriter, batchSize: number = 10) {
  const csvFileWriter = CreateCustomerCsvFileWriter(fileWriter);
  const sut = new BatchedCustomerCsvFileWriter(csvFileWriter, batchSize);
  return sut;
}
