const $=(s)=>document.querySelector(s),$$=(s)=>[...document.querySelectorAll(s)];
const get=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}};
const set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};

// tema claro/escuro
function tema(t){document.documentElement.dataset.theme=t;set('tema',t);const b=$('#tema');if(b)b.textContent=t==='dark'?'Modo claro':'Modo escuro'}
tema(get('tema',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
$('#tema')?.addEventListener('click',()=>tema(document.documentElement.dataset.theme==='dark'?'light':'dark'));

// tamanho da fonte
let fs=+get('fs',100);
function fonte(v){fs=Math.min(150,Math.max(80,v));document.documentElement.style.fontSize=fs+'%';set('fs',fs)}
fonte(fs);
$('#maior')?.addEventListener('click',()=>fonte(fs+10));
$('#menor')?.addEventListener('click',()=>fonte(fs-10));
$('#normal')?.addEventListener('click',()=>fonte(100));

// abas + pesquisa
let cat='todas';
function filtrar(){
  const q=($('#busca')?.value||'').toLowerCase().trim();let n=0;
  $$('.loja').forEach(c=>{
    const ok=(cat==='todas'||c.dataset.cat===cat)&&c.textContent.toLowerCase().includes(q);
    c.hidden=!ok;if(ok)n++;
  });
  $('#count').textContent=n+' loja(s) encontrada(s)';
  $('#vazio').hidden=n>0;
}
$$('.tab').forEach(t=>t.addEventListener('click',()=>{
  cat=t.dataset.cat;$$('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));filtrar();
}));
$('#busca')?.addEventListener('input',filtrar);
if($('#busca'))filtrar();

// carrossel
const slides=$$('.slide');let i=0,timer;
function ir(n){if(!slides.length)return;i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('on',k===i))}
function auto(){clearInterval(timer);timer=setInterval(()=>ir(i+1),5000)}
$('#prev')?.addEventListener('click',()=>ir(i-1));
$('#next')?.addEventListener('click',()=>ir(i+1));
$('#pausa')?.addEventListener('click',e=>{
  const p=e.target.getAttribute('aria-pressed')==='true';
  e.target.setAttribute('aria-pressed',!p);e.target.textContent=p?'⏸ Pausar':'▶ Retomar';p?auto():clearInterval(timer);
});
if(slides.length){ir(0);auto()}

// formulários (simulação)
$$('form:not([data-js])').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();
  f.querySelector('.msg').textContent=f.dataset.ok;f.reset();
}));

// rastreio (dados de exemplo)
const PEDIDOS={
  EC100001:{loja:'TechNova – Notebooks',item:'Notebook 15"',destino:'Brasília – DF',etapa:3,prev:'2 dias'},
  EC100002:{loja:'SonoBom Colchões',item:'Colchão queen',destino:'Goiânia – GO',etapa:1,prev:'4 dias'},
  EC100003:{loja:'AutoPrime Veículos',item:'SUV 2024',destino:'Belo Horizonte – MG',etapa:5,prev:'Entregue'}
};
const ETAPAS=['Pedido recebido','Separado na loja','Em transporte','Saiu para entrega','Entregue'];
$('#form-rastreio')?.addEventListener('submit',e=>{
  e.preventDefault();
  const c=$('#codigo').value.trim().toUpperCase(),p=PEDIDOS[c],r=$('#res-rastreio');
  r.hidden=false;
  if(!p){r.innerHTML='<p><strong>Código não encontrado.</strong> Confira e tente de novo.</p>';return}
  r.innerHTML=`<h2>${c} – ${p.item}</h2><p>Loja: ${p.loja}<br>Destino: ${p.destino}<br>Previsão: ${p.prev}</p><ol class="timeline">`+
    ETAPAS.map((t,i)=>`<li class="${(i+1<p.etapa||p.etapa===5)?'done':i+1===p.etapa?'atual':''}">${t}</li>`).join('')+'</ol>';
});

// cotação (cálculo simulado)
const REG={CO:[0,0],SE:[1,-1],S:[1,-2.5],NE:[2,1],N:[-1,2]};
const TAB={tecnologia:[20,12,1.5,1],colchoes:[50,20,.8,2],carros:[500,150,.05,5],casas:[3000,800,.01,20]}; // base, por distância, por kg, prazo base
$('#form-cotacao')?.addEventListener('submit',e=>{
  e.preventDefault();
  const a=REG[$('#origem').value],b=REG[$('#destino').value],[base,pd,pk,pz]=TAB[$('#cat').value];
  const d=Math.hypot(a[0]-b[0],a[1]-b[1]),kg=+$('#peso').value;
  let preco=base+d*pd+kg*pk,prazo=pz+Math.ceil(d*2);
  if($('#urg').value==='e'){preco*=1.4;prazo=Math.max(1,Math.ceil(prazo/2))}
  const r=$('#res-cotacao');r.hidden=false;
  r.innerHTML=`<h2>Resultado</h2><p>Valor estimado: <strong>${preco.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</strong><br>Prazo estimado: <strong>${prazo} dia(s) útil(eis)</strong></p>`;
});
