function notif(){const m=ME(),ns=myNotes();
 $('#app').innerHTML=`<h1>Notifications</h1><p class="sub">Messages from your manager.</p><div class="row"><button id="ma">Mark all as read</button></div>${ns.length?ns.map(n=>`<div class="note ${(n.read||{})[m.id]?'':'new'}"><b>${H(n.title)}</b> ${n.to==='all'?'<span class="pill pr">Everyone</span>':''}<br>${H(n.body).replace(/\n/g,'<br>')}<br><small>${H(n.from||'Manager')} · ${new Date(n.date).toLocaleString()}</small></div>`).join(''):'<div class="card empty">Nothing here yet.</div>'}`;
 $('#ma').onclick=()=>{ns.forEach(n=>{n.read=n.read||{};n.read[m.id]=true});save();location.reload()}}
if(ME())notif();
