function home(){const m=ME(),k=m.id+'|'+today,r=S.att[k]||{},i=dayInfo(m.id,today),st=stat(m.id,today.slice(0,7));
 const bal=S.pay.filter(p=>p.empId===m.id&&p.mode==='Wallet').reduce((a,p)=>a+(p.type==='Credit'?p.amount:-p.amount),0);
 const last=S.pay.filter(p=>p.empId===m.id&&p.type==='Credit').sort((a,b)=>b.date.localeCompare(a.date))[0];
 const ns=myNotes().slice(0,3),hol=Object.entries(S.hol).filter(([d])=>d>=today).sort().slice(0,3);
 const can=!S.hol[today]&&r.status!=='leave'&&!(r.in&&r.out),lab=r.in?'Check out':'Check in';
 $('#app').innerHTML=`<h1>Hello, ${H(m.name.split(' ')[0])} 👋</h1><p class="sub">${new Date().toDateString()} · ${H(m.pos||m.type)}</p>
 <div class="grid g2"><div class="card"><label>Today</label><div class="big">${r.in?`In ${H(r.in)}${r.out?' · Out '+H(r.out):''}`:H(i.t||'Not checked in')}</div>
 <p>${r.method?`<span class="pill pr">${H(r.method)}</span>`:''}${S.hol[today]?`<span class="pill hl">Holiday: ${H(S.hol[today])}</span>`:''}</p>
 ${can?`<button class="p punch" id="pu">${lab}</button>`:`<span class="pill ${i.k==='present'?'ok':'pr'}">${r.in&&r.out?'Day complete':H(i.t||'')}</span>`}</div>
 <div class="card"><label>Wallet balance</label><div class="big ${bal>=0?'cr':'db'}">${money(bal)}</div><a href="wallet.html">View wallet →</a><p style="margin:10px 0 0"><label>Last credit</label>${last?`${money(last.amount)} · ${H(last.cat)} · ${last.date}`:'—'}</p></div></div>
 <div class="grid g4"><div class="card stat"><b class="cr">${st.present}</b><span>Present this month</span></div><div class="card stat"><b>${st.leave}</b><span>Leave days</span></div><div class="card stat"><b>${st.holiday}</b><span>Holidays</span></div><div class="card stat"><b class="db">${st.absent}</b><span>Absent</span></div></div>
 <div class="grid g2"><div class="card"><b>Latest from your manager</b><div style="margin-top:10px">${ns.length?ns.map(n=>`<div class="note ${(n.read||{})[m.id]?'':'new'}"><b>${H(n.title)}</b><br>${H(n.body)}<br><small>${new Date(n.date).toLocaleString()}</small></div>`).join(''):'<div class="empty">No notifications.</div>'}</div><a href="notifications.html">All notifications →</a></div>
 <div class="card"><b>Upcoming holidays</b><div style="margin-top:10px">${hol.length?hol.map(([d,n])=>`<p><span class="pill hl">${d}</span> ${H(n)}</p>`).join(''):'<div class="empty">None scheduled.</div>'}</div></div></div>`;
 const b=$('#pu');if(b)b.onclick=()=>{const t=new Date().toTimeString().slice(0,5);S.att[k]=r.in?{...r,out:t}:{status:'present',in:t,out:'',method:'Portal',bioTime:'',reason:''};save();home()}}
if(ME())home();
