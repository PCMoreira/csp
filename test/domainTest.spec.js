const expect = require('expect.js');
const domain = require('../api/domain/contact');
const mockQueryContacts = require('./mocks/mockSelectAllUsers.json');
const mockResponseContacts = require('./mocks/mockResponseGetContacts.json');
const mockQueryOneContact = require('./mocks/mockSelectOneUser.json');
const mockResponseContact = require('./mocks/mockResponseGetOneContactResponse.json');
const mockEmail = 'pablo.moreira@csp.com.br';
const mockFiltered = require('./mocks/mockCheckedFilter.json');
const mockWrongFiltered = require('./mocks/mockWrongFiltered.json');

describe('Domain Test', () => {
  it('Many contacts', () => {
    const result = domain.makeContacts(mockQueryContacts.data);
    expect(result).to.be.eql(mockResponseContacts.data);
  });

  it('One contact', () => {
    const result = domain.makeContact(mockQueryOneContact);
    expect(result).to.be.eql(mockResponseContact.data[0]);
  });

  it('Check kind of filter ', () => {
    const result = domain.checkFilter('pablo', mockEmail, mockQueryContacts.data);
    expect(result).to.be.eql([]);
  });

  it('Check kind of filter right', () => {
    const result = domain.checkFilter('Pablo', mockEmail, mockQueryContacts.data);
    expect(result).to.be.eql(mockFiltered.data);
  });

  it('Check kind of filter wrong ', () => {
    const result = domain.checkFilter('Pablo', null, mockQueryContacts.data);
    expect(result).to.be.eql(mockWrongFiltered);
  });
});