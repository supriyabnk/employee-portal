$('#app').innerHTML=`<div class="card login">${logo()}<h1>Employee Portal</h1><p class="sub">Ashokam Infotech Pvt. Ltd. · Let's Make A Change</p>
<form id="f"><div><label>Username</label><input name="u" required autocomplete="username"></div><div><label>Password</label><input type="password" name="p" required autocomplete="current-password"></div><div class="err" id="er"></div><button class="p">Log in</button></form>
<p class="sub" style="margin-top:16px;font-size:13px">Your username and password are given by the admin. Forgot it? Ask your manager to reset it.</p></div>`;
$('#f').onsubmit=async ev=>{ev.preventDefault();const f=new FormData(ev.target),e=S.emps.find(x=>x.user===f.get('u').trim());
 if(!e||e.pass!==await sha(f.get('p')))return $('#er').textContent='Incorrect username or password.';
 try{sessionStorage.setItem('ashokam_emp',e.id)}catch(x){}location.href='home.html'};
