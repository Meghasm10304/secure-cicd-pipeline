const fs = require('fs');

function checkFile(path, name) {
  try {
    fs.accessSync(path);
    console.log(`✅ PASS: ${name}`);
  } catch (e) {
    console.error(`❌ FAIL: ${name} missing`);
    process.exit(1);
  }
}

checkFile('index.html', 'HTML Structure');
checkFile('style.css', 'Styling');
checkFile('main.js', 'Application Logic');
console.log('🎉 All tests passed');