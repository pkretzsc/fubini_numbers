const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    let fubino = (function() {
        // step 1: a basic LUT with a few steps of Pascal's triangle
        var binomials = [
          [1n],
          // [1,1],
          // [1,2,1],
          // [1,3,3,1],
          // [1,4,6,4,1],
          // [1,5,10,10,5,1],
          // [1,6,15,20,15,6,1],
          // [1,7,21,35,35,21,7,1],
          // [1n,8n,28n,56n,70n,56n,28n,8n,1n]
        ];
      
        // step 2: a function that builds out the LUT if it needs to.
        function binomial(n,k) {
          while(n >= BigInt(binomials.length)) {
            let s = BigInt(binomials.length);
      
            // binomials.push([...Array(s+1)].map((_, i) => i == 0 || i == s ? 1 : binomials[s-1][i-1] + binomials[s-1][i]));
            // binomials.push(new Array(s+1).fill(0n).map((_, BigInt(i)) => i == 0 || i == s ? 1 : binomials[s-1][i-1] + binomials[s-1][i]));
            let nextRow = [];
            nextRow[0] = 1n;
            for(let i=1n, prev=s-1n; i<s; i++) {
              nextRow[i] = BigInt(binomials[prev][i-1n] + binomials[prev][i]);
            }
            nextRow[s] = 1n;
            binomials.push(nextRow);
          }
          return binomials[n][k];
        }
      
        function fubini(n){
          let arr = [1n];
          for(let i = 1n; i < n; i++){
            let sum = 0n;
            for(let j = 1n; j <= i; j++){
              sum += BigInt(binomial(i,j)) * arr[i-j]
            }
          arr[i] = sum;
          }
          return arr;
        }
        return fubini;
        
      }());
    //   var t0 = performance.now()
      // console.log(fubino(1000n).toString(10));
    //   var t1 = performance.now()
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    
    res.send(fubino(3500n).toString(10))});

app.listen(3000, () => {
    console.log('My Rest API is running on port 3000')

})