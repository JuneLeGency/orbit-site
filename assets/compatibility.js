(function(){
'use strict';
const en=document.documentElement.lang==='en';
const cards=[...document.querySelectorAll('.compat-app')];
const search=document.getElementById('app-search'),category=document.getElementById('app-category'),status=document.getElementById('app-status'),expand=document.getElementById('catalog-expand'),count=document.getElementById('catalog-count');
let expanded=false;
function render(){
 const query=search.value.trim().toLocaleLowerCase();
 const matching=cards.filter(c=>(!query||c.dataset.keywords.toLocaleLowerCase().includes(query))&&(!category.value||c.dataset.category===category.value)&&(!status.value||c.dataset.bucket===status.value));
 const visible=new Set(expanded?matching:matching.slice(0,36));
 cards.forEach(c=>{c.hidden=!visible.has(c);});
 count.textContent=en?`Showing ${visible.size} of ${matching.length} matches · ${cards.length} samples total`:`显示 ${visible.size} / ${matching.length} 个匹配应用 · 全部 ${cards.length} 款样本`;
 expand.hidden=matching.length<=36;
 expand.textContent=expanded?(en?'Show fewer':'收起列表'):(en?`Show all ${matching.length} matching apps`:`查看全部 ${matching.length} 个匹配应用`);
}
for(const control of [search,category,status])control.addEventListener('input',()=>{expanded=false;render();});
expand.addEventListener('click',()=>{expanded=!expanded;render();});
function revealHash(){
 let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
 const target=document.getElementById(id);
 if(!target||!target.classList.contains('compat-app'))return;
 search.value='';category.value='';status.value='';expanded=true;render();target.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'center'}));
}
render();revealHash();window.addEventListener('hashchange',revealHash);
const nativeFilter=document.getElementById('native-filter');
nativeFilter.addEventListener('change',()=>{
 const v=nativeFilter.value;
 document.querySelectorAll('[data-check-status]').forEach(row=>{row.hidden=!(v==='all'||(v==='native'&&row.dataset.native==='true')||row.dataset.checkStatus===v);});
});
})();
