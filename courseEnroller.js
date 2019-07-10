const puppeteer = require('puppeteer');
const shell = require('shelljs');

var human_dis = 0;
var comm = 0;
var lab = 0;
var res = 4;
var load_status = -1;

var twirlTimer = (function() {
  var P = ["\\", "|", "/", "-"];
  var x = 0;
  return setInterval(function() {
    if (load_status){
    process.stdout.write("\r" + P[x++]);
    x &= 3;
    }
  }, 250);
})();


function enroll(selector){
  var pic_name1 = selector + "1.png";
  var pic_name2 = selector + "2.png";
  (async () => {
      const browser = await puppeteer.launch({headless: false});
      process.stdout.clearLine();
        console.log("Opening Student Center");
          page = await browser.newPage();
          await page.goto('https://epprd.mcmaster.ca/psp/prepprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?', {waitUntil: 'load'});
          const newPage = await page.evaluate(() => {
          document.getElementById('userid').value = "";
          document.getElementById('pwd').value = "";
              });
              page.keyboard.press('Tab');
              page.keyboard.press('Tab');
              page.keyboard.press('Tab');
              page.keyboard.press('Enter');
              await page.waitFor(10000);
              setTimeout(function(){
                         page.keyboard.press('Tab');
                    		 page.keyboard.press('Tab');
            			       page.keyboard.press('Tab');
            			       page.keyboard.press('Enter');
                       }, 1000);
              await page.waitFor(4000);
              for (var i = 0; i < 16; ++i){
                page.keyboard.press('Tab');
              }
              page.keyboard.press('ArrowDown');
              if (selector == 'l'){
                page.keyboard.press('ArrowDown');
              }
              await page.waitFor(500);
              page.keyboard.press('Tab');
              await page.waitFor(300);
              page.keyboard.press('Enter');
              await page.waitFor(4000);
              for (var i = 0; i < 16; ++i){
                page.keyboard.press('Tab');
              }
              page.keyboard.press('Enter');
              await page.waitFor(3000);
              for (var i = 0; i < 23; ++i){
                page.keyboard.press('Tab');
              }
              await page.screenshot({path: pic_name1});
              page.keyboard.press('Enter');
              await page.waitFor(5000);
              await page.screenshot({path: pic_name2});
              await page.waitFor(500);
              await browser.close();
              if (selector == 'h'){
                human_dis = 3;
              } else if (selector == 's') {
                comm = 3;
              } else if (selector == 'l'){
                lab = 3;
              } else if (selector == 'r'){
                res = 3;
              }
              process.stdout.clearLine();
              console.log("Enroll executed");
    })();
}


function checkCourse(){
  if (human_dis == 1){
    human_dis = 2;
    enroll('h');
    process.stdout.clearLine();
    console.log("Enrolling in Human Disaster");
  } else if (human_dis == 3) {
    process.stdout.clearLine();
    console.log("You've already been enrolled in Human Disaster ");
  }
  if (comm == 1){
    comm = 2;
    enroll('s');
    process.stdout.clearLine();
    console.log("Enrolling in Science Communication in Life Sci");
  }  if (comm == 3) {
    process.stdout.clearLine();
    console.log("You've already been enrolled in Science Communication in Life Sci");
  }
  if (lab == 1){
    lab = 2;
    enroll('l');
    process.stdout.clearLine();
    console.log("Enrolling in Laboratory Methods in Life Sciences");
  }  if (lab == 3) {
    process.stdout.clearLine();
    console.log("You've already been enrolled in Laboratory Methods in Life Sciences");
  }
  if (res == 1){
    res = 2;
    enroll('r');
    process.stdout.clearLine();
    console.log("Enrolling in Research");
  }  if (res == 3) {
    process.stdout.clearLine();
    console.log("You've already been enrolled in Research");
  }
  if (comm == 2 || human_dis == 2 || lab == 2 || res == 2){
    return 0;
  }
    (async () => {
        const browser = await puppeteer.launch({args: ["--proxy-server='direct://'", '--proxy-bypass-list=*'], headless: true});
          process.stdout.clearLine();
          console.log("Opening Browser");


page = await browser.newPage();
await page.goto('https://applicants.mcmaster.ca/psp/prepprd/EMPLOYEE/PSFT_LS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?', {waitUntil: 'load'});
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
load_status = 1;
if (comm == 0) {
            await page.waitFor(1500);
            page.keyboard.press('Tab');
            page.keyboard.press('Tab');
            page.keyboard.press('2');
            await page.waitFor(1500);
    	setTimeout(function(){ page.keyboard.press('Tab');
            		 page.keyboard.press('Tab');
    			       page.keyboard.press('Tab');
            	 	 page.keyboard.press('Tab');
    			       page.keyboard.press('Tab');
    			       page.keyboard.press('Tab');
            	 	 page.keyboard.press('Tab');
    			       page.keyboard.press('1');
    			       page.keyboard.press('1');
    			       page.keyboard.press('3');
    			       page.keyboard.press('3');
    			       page.keyboard.press('9');
    			       page.keyboard.press('Enter');
               }, 2000);
        await page.waitFor(5000);
        const status = await page.evaluate(() => {
        var frame = document.getElementById('ptifrmtgtframe');
        return frame.contentWindow.document.getElementsByTagName("IMG")[8].alt;
            });
            if (status == "Open"){
              comm = 1;
              shell.exec('./sendemail');
              console.log("Sending email");
            }
        load_status = 0;
        process.stdout.clearLine();
        console.log("Sci Communication in Life Sci is " + status);
        load_status = 1;
        await page.waitFor(1000);

} if (human_dis == 0) {

         page.keyboard.press('Enter');
         await page.waitFor(2500);
         setTimeout(function(){ page.keyboard.press('Tab');
         for (var i = 0; i < 8; ++i){
           page.keyboard.press('Tab');
         }

         page.keyboard.press('1');
         page.keyboard.press('5');
         page.keyboard.press('3');
         page.keyboard.press('7');
         page.keyboard.press('9');
         page.keyboard.press('Enter');
       }, 2000);
     await page.waitFor(5000);
     const status2 = await page.evaluate(() => {
     var frame = document.getElementById('ptifrmtgtframe');
     return frame.contentWindow.document.getElementsByTagName("IMG")[8].alt;
         });

      if (status2 == "Open"){
        human_dis = 1;
        shell.exec('./sendemail');
        console.log("Sending email");
      }
      process.stdout.write("");
      process.stdout.clearLine();
      console.log("Human Disaster is " + status2);
    } if (lab == 0){
      page.keyboard.press('Tab');
      page.keyboard.press('Tab');
      page.keyboard.press('Tab');
      page.keyboard.press('2');
      await page.waitFor(1000);
      page.keyboard.press('2');
      await page.waitFor(1000);
      page.keyboard.press('2');
      await page.waitFor(1500);
      for (var i = 0; i < 7; ++i){
        page.keyboard.press('Tab');
      }
      page.keyboard.press('Backspace');
      page.keyboard.press('1');
      page.keyboard.press('1');
      page.keyboard.press('0');
      page.keyboard.press('8');
      page.keyboard.press('3');
      page.keyboard.press('Enter');

      await page.waitFor(3000);
      const status3 = await page.evaluate(() => {
      var frame = document.getElementById('ptifrmtgtframe');
      return frame.contentWindow.document.getElementsByTagName("IMG")[8].alt;
          });

       if (status3 == "Open"){
         lab = 1;
         shell.exec('./sendemail');
         console.log("Sending email");
       }
       process.stdout.write("");
       process.stdout.clearLine();
       console.log("Laboratory Methods in Life Sciences is " + status3);
    } if (res == 0){

      for (var i = 0; i < 10; ++i){
        page.keyboard.press('Tab');
      }
      page.keyboard.press('Backspace');
      page.keyboard.press('1');
      page.keyboard.press('2');
      page.keyboard.press('4');
      page.keyboard.press('1');
      page.keyboard.press('8');
      page.keyboard.press('Enter');


      await page.waitFor(3000);
      const status4 = await page.evaluate(() => {
      var frame = document.getElementById('ptifrmtgtframe');
      return frame.contentWindow.document.getElementsByTagName("IMG")[8].alt;
          });

       if (status4 == "Open"){
         res = 1;
         shell.exec('./sendemail');
         console.log("Sending email");
       }
       process.stdout.write("");
       process.stdout.clearLine();
       console.log("Research course is " + status4);
     }
    await page.waitFor(2000);
    await browser.close();
      })();
}

checkCourse();
setInterval(checkCourse, 40000);
