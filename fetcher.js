const request = require("request");
const fs = require("fs");
const readline = require("readline");

const userInput = (LOCAL_FILE, body) => {
  const rl = readline.createInterface({
    input: process.stdin
  });
  console.log("Please confirm overwritting existing file by enter y");
  rl.on("line", (line) => {
    if (line === "y") {
      rl.close();
      fs.writeFile(LOCAL_FILE, body, err => {
        if (err) {
          console.error(err)
          return;
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${LOCAL_FILE}`);
      });
    } else {
      return;
    }
  })
};

const URL = process.argv[2]; //http://example.edu/
const LOCAL_FILE = process.argv[3]; //./hello.txt

request(URL, (error, response, body) => {
  if (error) {
    console.log(error);
    return;
  } 
  if(body) {
    if (fs.existsSync(LOCAL_FILE)) {
      userInput(LOCAL_FILE, body);
    } else{
      fs.writeFile(LOCAL_FILE, body, err => {
        if (err) {
          console.error(err)
          return;
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${LOCAL_FILE}`);
      });
    }
  }
});


