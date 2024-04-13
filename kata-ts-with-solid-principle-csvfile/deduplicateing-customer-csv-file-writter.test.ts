import {
  CreateMockFileWriter,
  MockFileWriter,
  CreateCustomerCsvFileWriter,
  createCustomerList,
} from './customer-csv-file-writer.test';

describe('DeduplicateCustomerCsvFileWriter', () => {
  describe('writeCustomers', () => {
    describe('no duplicate', () => {
      // Arrange
      const customer = createCustomerList(8);
      const fileWriter = CreateMockFileWriter();
      const sut = createDeduplicatingCustomerCsvFileWriter(fileWriter);
      const fileName = 'dedup.csv';

      // Act
      sut.writeCustomer(fileName, customer);

      // Assert
    });
  });
});

// ################## HELPER

// Assert

function createDeduplicatingCustomerCsvFileWriter(
  fileWriter: MockFileWriter,
  batchSize: number = 10
) {
  const csvFileWriter = CreateCustomerCsvFileWriter(fileWriter);
  const sut = new BatchedCustomerCsvFileWriter(csvFileWriter, batchSize);
  return sut;
}
