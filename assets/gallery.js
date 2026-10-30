(function(){
'use strict';
const en=document.documentElement.lang==='en';
const shots={
overseas:['overseas-desktop','海外应用桌面','International apps','Facebook、TikTok、YouTube 与 Google 应用已安装在同一个展示空间。','Facebook, TikTok, YouTube, and Google apps installed together in a showcase space.'],
china:['china-desktop','微信和微博，单独放。','A space for WeChat and Weibo.','国内应用放进另一个空间，和海外展示应用分开管理。','Domestic apps have their own space, separate from the international showcase.'],
drag:['smartisan-drag','长按，拖动。','Press, then drag.','长按图标进入拖动状态。这张是实际交互截图，展示的是测试应用。','A long press puts the icon into drag mode. This actual interaction screenshot uses a test app.'],
settings:['smartisan-settings','宫格和外观，自己选。','Choose your grid and appearance.','桌面设置提供宫格、主题、翻页效果和图标选项。','Desktop settings include grid layouts, themes, page effects, and icon options.']
};
const main=document.getElementById('main-shot');
document.querySelectorAll('[data-shot]').forEach(button=>button.addEventListener('click',()=>{const shot=shots[button.dataset.shot];main.src='assets/screens/'+shot[0]+'.png';main.alt=shot[en?2:1];document.getElementById('shot-title').textContent=shot[en?2:1];document.getElementById('shot-description').textContent=shot[en?4:3];document.querySelectorAll('[data-shot]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});}));
const dialog=document.getElementById('image-dialog'),large=document.getElementById('dialog-image');
document.querySelectorAll('[data-zoom-src],[data-zoom-target]').forEach(button=>button.addEventListener('click',()=>{const img=button.dataset.zoomTarget?document.getElementById(button.dataset.zoomTarget):button.querySelector('img');large.src=button.dataset.zoomSrc||img.src;large.alt=img.alt;dialog.showModal();}));
document.getElementById('close-image').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
})();
