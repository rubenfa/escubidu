import assert from 'assert';
import something from '../../../web/static/js/something'

describe('something()', function() {
  it('does something', function () {
    assert.equal("something", something());
  });
});
