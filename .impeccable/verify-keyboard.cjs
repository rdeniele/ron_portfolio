/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('C:/Users/ronde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3011/web',{waitUntil:'domcontentloaded'});
 await page.locator('.forge-mascot[data-ready="true"]').waitFor();
 await page.waitForTimeout(2500);
 const cat=page.locator('.forge-mascot');
 const start=await cat.boundingBox();
 await page.keyboard.down('a');await page.waitForTimeout(400);await page.keyboard.up('a');
 assert.ok((await cat.boundingBox()).x<start.x-40);
 for(const id of ['about','works','services','contact','career','skills','blog']){
  for(let i=0;i<90;i++){
   if(await page.locator('.workshop-room').getAttribute('data-nearby')===id)break;
   const box=await cat.boundingBox(),target=await page.locator(`[data-item="${id}"]`).boundingBox();
   const dx=target.x+22-(box.x+box.width*.6),dy=target.y+14-(box.y+box.height*.7);
   const keys=[];if(Math.abs(dx)>12)keys.push(dx>0?'d':'a');if(Math.abs(dy)>12)keys.push(dy>0?'s':'w');
   for(const key of keys)await page.keyboard.down(key);
   await page.waitForTimeout(120);
   for(const key of keys)await page.keyboard.up(key);
  }
  assert.equal(await page.locator('.workshop-room').getAttribute('data-nearby'),id,`Reach ${id}`);
  await page.keyboard.press('Enter');await page.getByRole('dialog',{name:id,exact:true}).waitFor();
  await page.waitForTimeout(200);
  await page.getByRole('dialog',{name:id,exact:true}).waitFor();
  const before=await cat.boundingBox();await page.keyboard.down('w');await page.waitForTimeout(150);await page.keyboard.up('w');
  assert.ok(Math.abs((await cat.boundingBox()).y-before.y)<1);
  await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'detached'});
  if(id!=='about'){
   await cat.dispatchEvent('click',{detail:0});
   await page.getByRole('dialog',{name:id,exact:true}).waitFor();
   await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'detached'});
  }
  console.log(id,'reachable with WASD; Enter opens modal; modal blocks movement');
 }
 await page.screenshot({path:'.impeccable/review/keyboard-pc.png',style:'nextjs-portal,.splash{display:none!important}'});
 await page.keyboard.press('Escape');
 await page.waitForFunction(()=>document.querySelector('.forge-mascot').dataset.activity==='crafting');
 assert.deepEqual(errors,[]);
 for(const width of [768,390]){
  await page.setViewportSize({width,height:844});await page.waitForTimeout(200);
  assert.equal(await page.locator('.forge-pc-controls').evaluate(e=>getComputedStyle(e).display),'none');
  const before=await cat.boundingBox();await page.keyboard.down('d');await page.waitForTimeout(250);await page.keyboard.up('d');
  assert.ok(Math.abs((await cat.boundingBox()).x-before.x)<1);console.log(width,'PC controls hidden and disabled');
 }
 await browser.close();
})();
