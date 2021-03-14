let fubino = (function () {
  var binomials = [1n]; //creating arr to store already calculated binomial numbers
  function binomial(n, k) {
    //getting binomial number n over k
    while (n >= BigInt(binomials.length)) {
      //adding new layer if needed
      let s = BigInt(binomials.length);
      let nextRow = [1n];
      let half = s / 2n;
      for (let i = 1n, prev = s - 1n; i < half + 1n; i++) {
        //only calucating first half
        nextRow[i] = BigInt(binomials[prev][i - 1n] + binomials[prev][i]);
      }
      if (s % 2n == 0n) {
        //concat other half depending on layer length
        binomials.push(
          nextRow.concat(nextRow.slice(0, Number(half)).reverse())
        );
      } else {
        binomials.push(
          nextRow.concat(nextRow.slice(0, Number(half + 1n)).reverse())
        );
      }
    }
    return binomials[n][k];
  }

  function fubini(n) {
    //calculating fubini
    let arr = [1n];
    for (let i = 1n; i < n; i++) {
      //calculate every fubini to n
      let sum = 0n;
      for (let j = 1n; j <= i; j++) {
        //using regressive sum formular
        sum += BigInt(binomial(i, j)) * arr[i - j];
      }
      arr[i] = sum;
    }
    return arr;
  }
  return fubini;
})();

const n = BigInt(process.env.INPUT); //getting input from console
console.log(fubino(n).toString(10)); //output
