const $=(s,e=document)=>e.querySelector(s),H=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BIO=['Fingerprint','Iris','Face'],METH=[...BIO,'Manual','Portal'],PAYCAT=['Stipend','Salary','Bonus','Advance','Deduction','Reimbursement','Other'];
const MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
let S={emps:[],att:{},hol:{},pay:[]};
try{const r=localStorage.getItem('ashokam_portal');if(r)S=JSON.parse(r)}catch(e){}
// Load shared data from the Vercel database (/api/state); falls back to this browser's storage if the API is unavailable
let REMOTE=false;
try{const x=new XMLHttpRequest();x.open('GET','/api/state',false);x.send();if(x.status===200){REMOTE=true;if(x.responseText&&x.responseText!=='null')S=JSON.parse(x.responseText)}}catch(e){}
S.emps=S.emps||[];S.att=S.att||{};S.hol=S.hol||{};S.pay=S.pay||[];
S.notes=S.notes||[];S.leaves=S.leaves||[];
const save=()=>{try{localStorage.setItem('ashokam_portal',JSON.stringify(S))}catch(e){}
 if(REMOTE)try{const x=new XMLHttpRequest();x.open('PUT','/api/state',false);x.setRequestHeader('Content-Type','application/json');x.send(JSON.stringify(S))}catch(e){}};
const uid=()=>Math.random().toString(36).slice(2,9);
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=iso(new Date()),money=n=>'NPR '+Number(n||0).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
const emp=id=>S.emps.find(e=>e.id===id);
const isWk=ds=>new Date(ds+'T00:00').getDay()===6; // Saturday weekly off in Nepal
const ui={tab:'cal',emp:'',month:today.slice(0,7),date:today,q:''};
async function sha(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const avatar=e=>e.photo?`<img class="av" src="${e.photo}" alt="">`:`<span class="av">${H((e.name||'?')[0])}</span>`;
const bioPills=e=>BIO.map(b=>`<span class="pill ${e.bio?.[b]?'ok':'no'}">${b}</span>`).join('');
// day status: holiday > leave/present/absent record > weekend > none
function dayInfo(id,ds){const r=S.att[id+'|'+ds];
 if(S.hol[ds])return{k:'holiday',t:S.hol[ds],r};
 if(r?.status==='leave')return{k:'leave',t:'Leave',r};
 if(r?.in)return{k:'present',t:'Present',r};
 if(r?.status==='absent')return{k:'absent',t:'Absent',r};
 if(isWk(ds))return{k:'wk',t:'Weekly off',r};
 return{k:ds<today?'absent':'',t:ds<today?'Absent':'',r}}
const stat=(id,m)=>{let c={present:0,leave:0,absent:0,holiday:0};const[y,mo]=m.split('-').map(Number);const n=new Date(y,mo,0).getDate();
 for(let d=1;d<=n;d++){const ds=m+'-'+String(d).padStart(2,'0');if(ds>today)break;const k=dayInfo(id,ds).k;if(c[k]!==undefined)c[k]++}return c};
const EP=document.body.dataset.portal==='employee',BASE='';
const logo=()=>`<img class="logo" src="${BASE}assets/logo.jpg" alt="Ashokam Infotech" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='https://ashokaminfotech.vercel.app/assets/logo.jpg'}else{this.outerHTML='<i>AK</i>'}">`;
const ME=()=>{try{return emp(sessionStorage.getItem('ashokam_emp'))}catch(e){}};
const myNotes=()=>{const m=ME();return m?S.notes.filter(n=>n.to==='all'||n.to===m.id).sort((a,b)=>b.date.localeCompare(a.date)):[]};
const unread=()=>{const m=ME();return m?myNotes().filter(n=>!(n.read||{})[m.id]).length:0};
const PAGES=[['dashboard','index.html','Dashboard'],['employees','employees.html','Employees'],['attendance','attendance.html','Attendance'],['payroll','payroll.html','Stipend &amp; Salary'],['notices','notices.html','Notices &amp; Leaves']];
const EPAGES=[['home','home.html','Home'],['profile','profile.html','Profile'],['attendance','attendance.html','Attendance'],['salary','salary.html','Salary'],['wallet','wallet.html','Wallet'],['notifications','notifications.html','Notifications']];
const PAGE=document.body.dataset.page;
if(!(EP&&PAGE==='login')){const L=EP?EPAGES:PAGES,n=unread();
document.body.insertAdjacentHTML('afterbegin',`<header><div class="bar"><a class="brand" href="${L[0][1]}" style="text-decoration:none;color:inherit">${logo()}<div>Ashokam Infotech<small>${EP?'Employee Portal':'Admin Portal'}</small></div></a><nav id="nav">${L.map(p=>`<a href="${p[1]}" class="${p[0]===PAGE?'on':''}">${p[2]}${p[0]==='notifications'&&n?` <span class="pill no">${n}</span>`:''}</a>`).join('')}</nav><button id="th" class="s">Theme</button>${EP?'<button id="lo" class="s">Log out</button>':''}</div></header>`);
if(EP)$('#lo').onclick=()=>{try{sessionStorage.removeItem('ashokam_emp')}catch(e){}location.href='index.html'}}
else document.body.insertAdjacentHTML('afterbegin','<div style="text-align:right;padding:10px"><button id="th" class="s">Theme</button></div>');
if(EP&&PAGE!=='login'&&!ME())location.replace('index.html');
try{const t=localStorage.getItem('ashokam_theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const r=document.documentElement,d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches),n=d?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('ashokam_theme',n)}catch(e){}};
function render(){window.__page&&window.__page()}
const empOpts=(sel,all)=>(all?'<option value="">All employees</option>':'')+S.emps.map(e=>`<option value="${e.id}" ${e.id===sel?'selected':''}>${H(e.name)}</option>`).join('');
function open(h){const d=$('#dlg');d.innerHTML=h;d.showModal()}const close=()=>$('#dlg').close();
