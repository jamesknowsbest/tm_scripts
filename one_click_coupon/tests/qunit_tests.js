const { test } = QUnit;

QUnit.module('Sanity Checks');

test('findAllCoupons is function', assert => {
  assert.true(typeof findAllCoupons === "function", 'findAllCoupons is a function');
});
test('clipAllCoupons is function', assert => {
  assert.true(typeof clipAllCoupons === "function", 'clipAllCoupons is a function');
});
test('delay is function', assert => {
    assert.true(typeof delay === "function", 'delay is a function');
});
test('userIsLoggedIn is function', assert => {
    assert.true(typeof userIsLoggedIn === "function", 'userIsLoggedIn is a function');
});
test('createClipAllBtn is function', assert => {
    assert.true(typeof createClipAllBtn === "function", 'createClipAllBtn is a function');
});

QUnit.module('Functional tests');

test('findAllCoupons returns NodeList with length of 5', assert => {
    let NodeListOfCoupons = findAllCoupons();
    console.log("typeof NodeListOfCoupons", typeof NodeListOfCoupons);
    assert.true(typeof NodeListOfCoupons === "object", 'NodeListOfCoupons is a object');
    assert.true(NodeListOfCoupons.length === 5, 'NodeListOfCoupons has length of 5');
});
test('clipAllCoupons returns true', async assert => {
    let result = await clipAllCoupons();
    assert.true(typeof result === "boolean", 'result is a boolean');
    assert.false(result, 'result is false because not signed in');
});
test('userIsLoggedIn returns false', assert => {
    let result = userIsLoggedIn();
    assert.true(typeof result === "boolean", 'result is a boolean');
    assert.false(result, 'result is false');
});
