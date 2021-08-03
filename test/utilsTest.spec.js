const expect = require('expect.js');
const commons = require('../utils/commons');

describe('Commons Test', () => {
  it('should return true if null', () => {
    const isNull = commons.isNull(null);
    expect(isNull).to.be.eql(true);
  });

  it('should return a removed text accent', () => {
    const rmText = commons.rmAccent('Jéssica');
    expect(rmText).to.be.eql('Jessica');
  });

  it('should return a to Upper fir charactere text', () => {
    const rmText = commons.toUpperName('pablo');
    expect(rmText).to.be.eql('Pablo');
  });

  it('should return a full name', () => {
    const name = commons.makeFullName('Fernando', 'Costa');
    expect(name).to.be.eql('Fernando Costa');
  });
});