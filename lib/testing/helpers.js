export function axeCheck(done) {
  axe.run(document.body, function (err, result) {
    expect(err).to.be.null();
    expect(result.violations.length).to.equal(0);
    done();
  });
}
