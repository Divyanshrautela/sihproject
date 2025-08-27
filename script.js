/* ---------- Language & Navigation ---------- */
function selectLanguage(lang) {
  try { localStorage.setItem('smartagri_lang', lang); } catch(e){}
  window.location.href = 'register.html';
}

function changeLanguageToggle() {
  const cur = localStorage.getItem('smartagri_lang') || 'en';
  const next = cur==='en'?'hi':'en';
  localStorage.setItem('smartagri_lang', next);
  alert('Language switched to '+next);
  location.reload();
}

function logout(){
  try{localStorage.removeItem('smartagri_lang');}catch(e){}
  window.location.href='index.html';
}

/* ---------- OTP demo ---------- */
function sendOtp(){
  const m=document.getElementById('mobile')?.value||'';
  if(!/^\d{10}$/.test(m)){alert('Enter valid 10-digit number');return;}
  document.getElementById('otp-block').style.display='block';
  alert('Demo OTP sent: 1234');
}

function verifyOtp(){
  const otp=document.getElementById('otp')?.value||'';
  if(otp.trim()==='1234'){window.location.href='home.html';}
  else{alert('Wrong OTP. Use 1234');}
}

/* ---------- Helper ---------- */
function goHome(){ window.location.href='home.html'; }

/* ---------- Crops & Symptoms ---------- */
const crops=[
  {name:'Rice',scientific:'Oryza sativa',symptoms:['Yellowish leaves','Stunted growth','Brown spots','Leaf blight'],stages:['1 week','2 weeks','6 months','12 months']},
  {name:'Wheat',scientific:'Triticum aestivum',symptoms:['Rusty leaves','Powdery patches','Weak stems','Leaf curl'],stages:['1 week','2 weeks','6 months','12 months']},
  {name:'Maize',scientific:'Zea mays',symptoms:['Leaf blight','Rust spots','Yellow veins','Dried edges'],stages:['1 week','2 weeks','6 months','12 months']},
  {name:'Potato',scientific:'Solanum tuberosum',symptoms:['Late blight','Scab','Yellow leaves','Rotting tubers'],stages:['1 week','2 weeks','6 months','12 months']},
  {name:'Tomato',scientific:'Solanum lycopersicum',symptoms:['Early blight','Fusarium wilt','Leaf curl','Yellow spots'],stages:['1 week','2 weeks','6 months','12 months']}
];

function showCrops(){
  const grid=document.getElementById('cropGrid');
  if(!grid) return;
  grid.innerHTML='';

  crops.forEach((crop,idx)=>{
    const box=document.createElement('div');
    box.className='box';
    box.innerHTML=`
      <img src="images/${crop.name.toLowerCase()}.jpg" alt="${crop.name}" style="width:100%; border-radius:10px; margin-bottom:6px;">
      <div class="box-title">${crop.name}</div>
      <div class="box-desc"><em>(${crop.scientific})</em></div>

      <div class="select-block">
        <label>Symptoms:</label>
        <select id="symptom-select-${idx}">
          ${crop.symptoms.map(s=>`<option>${s}</option>`).join('')}
        </select>
      </div>

      <div class="select-block">
        <label>Stage:</label>
        <select>
          ${crop.stages.map(s=>`<option>${s}</option>`).join('')}
        </select>
      </div>

      <div class="patao-info" id="patao-${idx}" style="margin-top:6px; font-style:italic; color:#fff;">
        Enter info here...
      </div>
    `;
    grid.appendChild(box);

    if(crop.name==='Tomato'||crop.name==='Potato'){
      const sel=document.getElementById(`symptom-select-${idx}`);
      const info=document.getElementById(`patao-${idx}`);
      function updateInfo(){ info.textContent=`Selected symptom: ${sel.value}`; }
      sel.addEventListener('change',updateInfo);
      sel.addEventListener('touchstart',()=>{setTimeout(updateInfo,200);});
    }
  });
}

document.addEventListener('DOMContentLoaded',showCrops);

/* ---------- Falling leaves animation ---------- */
(function leavesInit(){
  const container=document.getElementById('leafContainer');
  if(!container) return;

  const isMobile=/Mobi|Android/i.test(navigator.userAgent)||innerWidth<700;
  const maxLeaves=isMobile?6:16;

  function spawnLeaf(){
    const leaf=document.createElement('div');
    const t=Math.ceil(Math.random()*3);
    leaf.className='leaf type'+t;

    const size=Math.random()*26+18;
    leaf.style.width=size+'px';
    leaf.style.height=Math.floor(size*0.8)+'px';

    leaf.style.left=Math.random()*100+'vw';
    leaf.style.top=(-10-Math.random()*8)+'vh';

    const dur=8+Math.random()*8;
    const delay=Math.random()*6;
    leaf.style.animation=`leafFall ${dur}s linear ${delay}s forwards`;
    leaf.style.transform=`rotate(${Math.random()*360}deg)`;

    container.appendChild(leaf);
    setTimeout(()=>{try{container.removeChild(leaf);}catch(e){}},(dur+delay+0.5)*1000);
  }

  for(let i=0;i<Math.min(6,maxLeaves);i++) setTimeout(spawnLeaf,i*400);
  setInterval(()=>{if(container.children.length<maxLeaves) spawnLeaf();},1200);
})();
