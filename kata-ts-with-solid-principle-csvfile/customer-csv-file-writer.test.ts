import { Customer } from './customer';
import { CustomerCsvFileWriter } from './customer-csv-file-writter';
import { FileWriter } from './file-writer';
import mockCustomer from './mock/customer.json';

describe('CustomerCsvFileWriter', () => {
  describe('writeCustomers', () => {
    describe('null customers array', () => {
      test('should throw an argument exception', () => {
        // Arrange

        // Arrange - Double
        const fileWriter = CreateMockFileWriter();
        const sut = CreateCustomerCsvFileWriter(fileWriter);

        // Act/Assert
        expect(() => sut.writeCustomers('customer.csv', null!)).toThrow('customer');
      });
    });
    describe('no customers', () => {
      test('should not write any lines', () => {
        // Arrange

        // Arrange - Double
        const fileWriter = CreateMockFileWriter();
        const sut = CreateCustomerCsvFileWriter(fileWriter);
        const fileName = 'customer.csv';
        const customers: Customer[] = [];
        // Act
        sut.writeCustomers(fileName, customers);

        // Assert
        fileWriter.assertCustomerWereWrittenToFile(fileName, customers);
        fileWriter.assertNumberOfCustomerWritten(customers.length);
      });
    });
    describe('one customer', () => {
      test.each([
        {
          customer: createCustomer('Peter Wiles', '123456789'),
          expected: 'Peter Wiles, 123456789',
        },
        {
          customer: createCustomer('Brendon Page', '45648484654'),
          expected: 'Brendon Page, 45648484654',
        },
      ])('customer $expected', ({ customer }) => {
        // Arrange
        // const customer = new Customer('Peter wiles', '123456789');

        // Arrange - Double
        const fileWriter = CreateMockFileWriter();
        const sut = CreateCustomerCsvFileWriter(fileWriter);
        const fileName = 'customer.csv';

        const customers = [customer];
        // Act
        sut.writeCustomers(fileName, customers);

        // Assert
        fileWriter.assertCustomerWereWrittenToFile(fileName, customers);
        fileWriter.assertNumberOfCustomerWritten(customers.length);
      });
    });

    describe('many customers', () => {
      test('should write all customers', () => {
        const customers = createCustomerList(3);
        const fileName = 'cust.csv';
        // Arrange - Double
        const fileWriter = CreateMockFileWriter();
        const sut = CreateCustomerCsvFileWriter(fileWriter);

        // Act
        sut.writeCustomers(fileName, customers);

        // Assert
        fileWriter.assertCustomerWereWrittenToFile(fileName, customers);
        fileWriter.assertNumberOfCustomerWritten(customers.length);
      });
    });
  });
});

// ################## HELPER

// Assert

// Interface  for Mock
export interface MockFileWriter extends FileWriter {
  assertCustomerWereWrittenToFile(fileName: string, customers: Array<Customer>): void;
  assertCustomerWasWrittenToFile(fileName: string, customer: Customer): void;
  assertNumberOfCustomerWritten(numberOfCustomer: number): void;
}

export function CreateMockFileWriter(): MockFileWriter {
  return {
    writeLine: jest.fn(),
    assertCustomerWasWrittenToFile(fileName: string, customer: Customer) {
      expect(this.writeLine).toHaveBeenCalledWith(
        fileName,
        `${customer.name}, ${customer.contactNumber}`
      );
    },
    assertCustomerWereWrittenToFile(fileName: string, customers: Array<Customer>) {
      customers.forEach((customer) => {
        this.assertCustomerWasWrittenToFile(fileName, customer);
      });
    },
    assertNumberOfCustomerWritten(numberOfCustomer: number) {
      expect(this.writeLine).toHaveBeenCalledTimes(numberOfCustomer);
    },
  };
}

// Class
export function CreateCustomerCsvFileWriter(fileWriter: FileWriter) {
  return new CustomerCsvFileWriter(fileWriter);
}

// Class
export function createCustomer(name: string, contactNumber: string): Customer {
  return new Customer(name, contactNumber);
}

// Support Class
export function createCustomerList(person: number): Customer[] {
  return mockCustomer
    .map((person) => createCustomer(person.name, person.contactNumber))
    .slice(0, person);
}
