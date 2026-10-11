/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('C:/Users/ronde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 for(const [name,width,height] of [['desktop',1440,960],['tablet',768,1024],['mobile',390,844]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3011/web',{waitUntil:'networkidle'});
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight <= innerHeight),true);
  assert.equal(await page.locator('.forge-dock [data-panel]').count(),7);
  const shots={style:'nextjs-portal {display:none !important}'};
  await page.screenshot({path:`.impeccable/review/${name}.png`,...shots});
  for(const id of ['about','works','services','career','skills','contact','blog']) {
   await page.locator(`.forge-dock [data-panel="${id}"]`).click();
   await page.getByRole('dialog').waitFor();
   if(id==='about') {
    assert.equal(await page.locator('#about-chapter h3').innerText(),'origin');
    await page.getByRole('button',{name:'previous about page',exact:true}).click();
    assert.equal(await page.locator('#about-chapter h3').innerText(),'philosophy');
    await page.getByRole('button',{name:'next about page',exact:true}).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#about-chapter h3').innerText(),'origin');
    assert.ok((await page.getByRole('group',{name:'about pages'}).innerText()).includes('1 / 5'));
   }
   if(id==='skills') {await page.getByRole('button',{name:/design & video/}).click();assert.equal(await page.locator('#skill-inventory li').count(),6);}
   if(id==='services') {
    await page.getByRole('button',{name:'previous services page',exact:true}).click();
    assert.ok((await page.locator('#service-details').innerText()).includes('illustrations'));
    await page.getByRole('button',{name:'next services page',exact:true}).click();
    assert.ok((await page.getByRole('group',{name:'services pages'}).innerText()).includes('1 / 4'));
   }
   if(id==='works') {
    assert.equal(await page.getByRole('button',{name:/- open project$/}).count(),39);
    await page.getByRole('button',{name:'glooblet - open project',exact:true}).click();
    const image=page.getByRole('img',{name:'glooblet - web development & design',exact:true}); await image.waitFor();
    await page.waitForFunction(()=>Array.from(document.images).some(i=>i.alt==='glooblet - web development & design'&&i.complete&&i.naturalWidth>0));
    assert.equal(await page.getByRole('link',{name:/visit site/}).getAttribute('href'),'https://glooblet.vercel.app');
   }
   if(id==='career') assert.equal(await page.locator('.forge-career').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
   if(name!=='tablet' && ['works','about','skills','career'].includes(id)) await page.screenshot({path:`.impeccable/review/${name}-${id}.png`,...shots});
   await page.getByRole('button',{name:`close ${id}`,exact:true}).click();
   await page.getByRole('dialog').waitFor({state:'detached'});
  }
  await page.getByRole('button',{name:'switch between light and dark theme'}).click();
  await page.screenshot({path:`.impeccable/review/${name}-dark.png`,...shots});
  await page.locator('.forge-dock [data-panel="skills"]').click();
  await page.screenshot({path:`.impeccable/review/${name}-skills-dark.png`,...shots});
  await page.getByRole('button',{name:'close skills',exact:true}).click();
  await page.locator('.forge-dock [data-panel="about"]').focus();
  await page.keyboard.press('Space'); await page.waitForTimeout(300); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300); await page.keyboard.press('Space');
  await page.waitForTimeout(400);
  assert.equal(await page.getByRole('button',{name:'reset layout',exact:true}).isEnabled(),true);
  await page.getByRole('button',{name:'reset layout',exact:true}).click();
  assert.equal(await page.locator('.forge-dock [data-panel]').first().getAttribute('data-panel'),'about');
  for(const route of ['/art','/video-editor','/blog']) {await page.goto('http://localhost:3011'+route,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').count()>0,true);}
  assert.deepEqual(errors,[]); console.log(name,'all panels, project image/link, themes, keyboard sorting/reset, routes and no page scrolling verified');
  await page.close();
 }
 await browser.close();
})();
