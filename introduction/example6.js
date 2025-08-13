function test1() {
  console.log('Test 1 function');
}

function test2() {
  console.log('Test 2 function');
}

function main() {
  console.log('Main function');
  
  setTimeout(test1, 1000);
  
  test2();
}

main();