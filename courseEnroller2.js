const puppeteer = require('puppeteer');

var human_dis = 0;
var comm = 0;
var load_status = -1;
function loader(){
  while(load_status){
    console.log('--');
    console.log('\\');
    console.log('|');
    console.log('/');
  }
}

function enroll(selector){
  (async () => {
      const browser = await puppeteer.launch({headless: false});
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
              await page.waitFor(500);
              page.keyboard.press('Tab');
              page.keyboard.press('Enter');
              await page.waitFor(4000);
              for (var i = 0; i < 16; ++i){
                page.keyboard.press('Tab');
              }
              page.keyboard.press('Enter');
              await page.waitFor(4000);
              for (var i = 0; i < 23; ++i){
                page.keyboard.press('Tab');
              }
              page.keyboard.press('Enter');
              await page.waitFor(4000);
              await browser.close();
              if (selector == 'h'){
                human_dis = 3;
              } else if (selector == 's') {
                comm = 3;
              }
              console.log("Enroll executed");
    })();
}


function checkCourse(){
  if (human_dis == 1){
    human_dis = 2;
    enroll('h');
    console.log("Enrolling in Human Disaster");
  } else if (human_dis == 3) {
    console.log("You've already been enrolled in Human Disaster ");
  }
  if (comm == 1){
    comm = 2;
    enroll('s');
    console.log("Enrolling in Science Communication in Life Sci");
  }  if (comm == 3) {
    console.log("You've already been enrolled in Science Communication in Life Sci");
  }
  if (comm == 2 || human_dis == 2){
    return 0;
  }
    (async () => {
        const browser = await puppeteer.launch({args: ["--proxy-server='direct://'", '--proxy-bypass-list=*'], headless: true});
          console.log("Opening Browser");


page = await browser.newPage();
await page.goto('https://applicants.mcmaster.ca/psp/prepprd/EMPLOYEE/PSFT_LS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?', {waitUntil: 'load'});
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
if (comm == 0) {
            await page.waitFor(1000);
            page.keyboard.press('Tab');
            page.keyboard.press('Tab');
            page.keyboard.press('2');
            await page.waitFor(1000);
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
     			       }, 1500);
        await page.waitFor(5000);
        const status = await page.evaluate(() => {
        var frame = document.getElementById('ptifrmtgtframe');
        return frame.contentWindow.document.getElementsByTagName("IMG")[8].alt;
            });
            if (status == "Open"){
              comm = 1;
            }
        console.log("Sci Communication in Life Sci is " + status);

        await page.waitFor(1000);

} if (human_dis == 0) {

         page.keyboard.press('Enter');
         await page.waitFor(1000);
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
       }, 1500);
     await page.waitFor(5000);
     const status2 = await page.evaluate(() => {
     var frame = document.getElementById('ptifrmtgtframe');
     return frame.contentWindow.document.getElementsByTagName("IMG")[8].alt;
         });

      if (status2 == "Open"){
        human_dis = 1;
      }
      console.log("Human Disaster is " + status2);
    }
    await page.waitFor(2000);
    await browser.close();
      })();
}

checkCourse();
setInterval(checkCourse, 40000);
