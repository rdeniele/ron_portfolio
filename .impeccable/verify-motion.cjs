/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('C:/Users/ronde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 for(const [width,height] of [[1850,887],[1440,960],[390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3011/web',{waitUntil:'domcontentloaded'});
  if(width===1850)await page.locator('[data-composition="panoramic"]').waitFor();
  await page.locator('.forge-mascot-frame').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));
  assert.equal(await page.locator('.forge-mascot-frame').count(),4);
  assert.equal(await page.locator('.forge-smoke').count(),3);
  const names=await page.locator('.forge-flame').evaluateAll(el=>el.map(e=>getComputedStyle(e).animationName));
  assert.ok(names.every(n=>n==='forge-flame-idle'));
  const first=await page.locator('.forge-mascot-frame').evaluateAll(el=>el.map(e=>getComputedStyle(e).opacity));
  await page.waitForTimeout(1100);
  const second=await page.locator('.forge-mascot-frame').evaluateAll(el=>el.map(e=>getComputedStyle(e).opacity));
  assert.notDeepEqual(first,second);assert.equal(second.filter(n=>n==='1').length,1);
  await page.screenshot({path:`.impeccable/review/idle-${width}.png`,style:'nextjs-portal{display:none!important}'});
  await page.getByRole('button',{name:'meet ron — character profile',exact:true}).click();
  await page.getByRole('dialog').waitFor();
  assert.equal(await page.locator('.forge-mascot-frame').first().evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
  assert.equal(await page.locator('.forge-smoke').first().evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
  await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'detached'});
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.forge-mascot-idle').evaluate(e=>getComputedStyle(e).animationName),'none');
  assert.equal(await page.locator('.forge-mascot-frame').first().evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('.forge-smoke').first().evaluate(e=>getComputedStyle(e).display),'none');
  assert.equal(await page.locator('.forge-flame').first().evaluate(e=>getComputedStyle(e).animationName),'none');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight),true);
  assert.deepEqual(errors,[]);console.log(width,'idle loop, flames, smoke, pause-on-panel, reduced motion and About click passed');
  await page.close();
 }
 await browser.close();
})();
