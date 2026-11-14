function profile(){const m=ME();
 $('#app').innerHTML=`<h1>My Profile</h1><p class="sub">Contact the admin to change name, position or biometric details.</p>
 <div class="grid g2"><div class="card"><div style="text-align:center">${m.photo?`<img class="av" style="width:96px;height:96px" src="${m.photo}">`:avatar(m)}<h2 style="margin:8px 0 0">${H(m.name)}</h2><span class="pill pr">${H(m.type)}</span> ${H(m.pos)}</div>
 <table><tr><th>Username</th><td>${H(m.user)}</td></tr><tr><th>Date of birth</th><td>${H(m.dob||'—')}</td></tr><tr><th>Joining date</th><td>${H(m.join||'—')}</td></tr><tr><th>Employee ID</th><td>${H(m.id.toUpperCase())}</td></tr></table>
 <label style="margin-top:12px">Biometric enrollment</label>${bioPills(m)}</div>
 <div><form id="cf" class="card grid"><b>Contact details</b><div><label>Phone</label><input name="phone" value="${H(m.phone)}"></div><div><label>Email</label><input type="email" name="email" value="${H(m.email)}"></div><button class="p">Save</button></form>
 <form id="pf" class="card grid"><b>Change password</b><div><label>Current password</label><input type="password" name="c" required></div><div><label>New password (min 6)</label><input type="password" name="n" minlength="6" required></div><button class="p">Update password</button></form></div></div>`;
 $('#cf').onsubmit=ev=>{ev.preventDefault();const f=new FormData(ev.target);m.phone=f.get('phone');m.email=f.get('email');save();alert('Saved.')};
 $('#pf').onsubmit=async ev=>{ev.preventDefault();const f=new FormData(ev.target);if(m.pass!==await sha(f.get('c')))return alert('Current password is wrong.');m.pass=await sha(f.get('n'));save();ev.target.reset();alert('Password updated.')}}
if(ME())profile();
