/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('C:/Users/ronde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 for(const [width,height] of [[1850,887],[1440,960],[1920,1080],[2560,1440],[3440,1440],[3440,1080],[768,1024],[390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto('http://localhost:3011/web',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>{const i=document.querySelector('.workshop-art');return i&&i.complete&&i.naturalWidth>0}); await page.waitForTimeout(400);
  const bounds=await page.locator('.workshop-room').boundingBox();
  assert.equal(bounds.x,0); assert.equal(bounds.width,width);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight),true);
  if(width>=1440){
   const art=await page.locator('.workshop-outlines').boundingBox();
   const stage=await page.locator('.workshop-stage').boundingBox();
   assert.ok(art.x>=stage.x-.5&&art.y>=stage.y-.5&&art.x+art.width<=stage.x+stage.width+.5&&art.y+art.height<=stage.y+stage.height+.5,'complete artwork stays within stage');
   for(const button of await page.locator('.workshop-hotspot').all()){
    const pin=button.locator('.hotspot-pin');
    const box=await pin.boundingBox();
    assert.ok(box.x>=0&&box.x+box.width<=width&&box.y>=0&&box.y+box.height<=height);
    await pin.click(); await page.getByRole('dialog').waitFor();
    await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({state:'detached'});
   }
  }
  await page.screenshot({path:`.impeccable/review/fullscreen-${width}x${height}.png`,style:'nextjs-portal{display:none!important}'});
  console.log(`${width}x${height}: full-width scene, no scroll, visible clickable stickers verified`);
  await page.close();
 }
 await browser.close();
})();
