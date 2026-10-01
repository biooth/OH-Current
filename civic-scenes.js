/* Original vector environments. Labels and highlights follow the simulation state. */
(()=>{
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const skins=['#9b654d','#d4a17c','#b77b58','#79503e','#dcb28d'];
 function person(x,y,index=0,active=false,scale=1){
  const skin=skins[index%skins.length],coat=['#254858','#4e5677','#6b4965','#345e4f','#6e5644'][index%5];
  return '<g transform="translate('+x+' '+y+') scale('+scale+')">'+(active?'<ellipse cx="0" cy="27" rx="42" ry="54" fill="#f1cc70" opacity=".22"/>':'')+'<rect x="-26" y="0" width="52" height="71" rx="13" fill="#24313c"/><path d="M-23 61V28Q-22 8 0 10Q22 8 23 28V61" fill="'+coat+'"/><path d="M-8 14L0 35L8 14" fill="#f8f2e6"/><rect x="-5" y="4" width="10" height="12" fill="'+skin+'"/><ellipse cy="-9" rx="14" ry="18" fill="'+skin+'"/><path d="M-14 -11Q-15 -32 3 -29Q19 -29 14 -9L8 -21Q-2 -16 -14 -11" fill="#2e272b"/><path d="M-7 -8h3m8 0h3" stroke="#30252b" stroke-width="2.5"/><path d="M-3 0q3 3 7 0" fill="none" stroke="#76453e" stroke-width="1.5"/><path d="M-19 28L-30 48M19 28L30 48" stroke="'+coat+'" stroke-width="12" stroke-linecap="round"/><path d="M-30 49l13 3m47-3l-13 3" stroke="'+skin+'" stroke-width="7" stroke-linecap="round"/></g>';
 }
 function paper(x,y,mark=false){return '<g transform="translate('+x+' '+y+')"><rect width="35" height="24" rx="1" fill="#f8f1df"/><path d="M6 6h23M6 12h20M6 18h17" stroke="'+(mark?'#ae5060':'#91a0a1')+'" stroke-width="2"/></g>';}
 function health(s,c){
  const names=['Chair Ellis','Rep. Mercer','Rep. Desai','Rep. Brooks','Rep. Park'],active=s.stage===2?2:s.stage===4?[...s.members].slice(-1)[0]:-1;
  const witness=c.witnesses[s.witness];
  let art='<defs><linearGradient id="roomWall" x2="0" y2="1"><stop stop-color="#203f4b"/><stop offset="1" stop-color="#345c63"/></linearGradient><linearGradient id="wood" x2="0" y2="1"><stop stop-color="#987459"/><stop offset="1" stop-color="#574333"/></linearGradient></defs><rect width="800" height="360" fill="url(#roomWall)"/><path d="M0 235H800V360H0" fill="#344a4d"/><path d="M0 360L270 235M800 360L530 235M150 360L330 235M650 360L470 235" stroke="#456064" stroke-width="2"/><path d="M45 26h130v115H45zM625 26h130v115H625z" fill="#7ea0ae" stroke="#182f3c" stroke-width="9"/><path d="M110 26v115M690 26v115M45 84h130M625 84h130" stroke="#243f4b" stroke-width="5"/><path d="M64 130l20-36 25 10 25-39 25 65zM643 130l20-36 25 10 25-39 25 65z" fill="#55767c"/><rect x="264" y="25" width="270" height="53" rx="3" fill="#1a303b" stroke="#739a9c"/><text x="400" y="47" text-anchor="middle" fill="#e1cc97" font-size="16" letter-spacing="3">OHIO • COMMITTEE</text><text x="400" y="66" text-anchor="middle" fill="#bed4d5" font-size="12">FICTIONAL PRACTICE HEARING</text>';
  names.forEach((n,i)=>{const x=160+i*120;art+=person(x,125,i,active===i,.88)+paper(x+20,167)+ '<path d="M'+(x-31)+' 178v-37l10-6" stroke="#b4c8cb" stroke-width="3"/>';});
  art+='<path d="M91 180H709V231H91Z" fill="url(#wood)"/><path d="M91 180H709" stroke="#c4a276" stroke-width="7"/>';
  names.forEach((n,i)=>art+='<rect x="'+(114+i*120)+'" y="193" width="92" height="22" rx="3" fill="'+(active===i?'#ffe29a':'#233c45')+'"/><text x="'+(160+i*120)+'" y="208" font-size="12" fill="'+(active===i?'#233c45':'#f1e2bd')+'" text-anchor="middle">'+n+'</text>');
  art+=person(400,260,s.witness+1,s.stage===1||s.stage===2,.95)+'<path d="M270 300H530L555 326H245Z" fill="#947153"/><path d="M245 326H555V350H245Z" fill="#634b37"/>'+paper(435,303,s.stage===3)+'<path d="M365 307v-35l14-9" stroke="#c2d2d2" stroke-width="3"/><rect x="299" y="330" width="202" height="19" rx="3" fill="#efe0bd"/><text x="400" y="344" fill="#273e43" font-size="12" text-anchor="middle">'+escape(s.stage===1||s.stage===2?witness.name:'WITNESS TABLE')+'</text>';
  art+=person(80,290,3,false,.65)+person(720,290,2,false,.65)+'<rect x="18" y="324" width="124" height="31" rx="4" fill="#243a42"/><rect x="657" y="324" width="125" height="31" rx="4" fill="#243a42"/><text x="80" y="344" font-size="12" text-anchor="middle" fill="#cee0dd">PUBLIC GALLERY</text><text x="719" y="344" font-size="12" text-anchor="middle" fill="#cee0dd">CLERK / RECORD</text>';
  return art;
 }
 function culture(s,c){
  let art='<defs><linearGradient id="studioWall" x2="0" y2="1"><stop stop-color="#4b355c"/><stop offset="1" stop-color="#2c233b"/></linearGradient></defs><rect width="800" height="300" fill="url(#studioWall)"/><path d="M0 212H800V300H0" fill="#382d39"/><rect x="44" y="28" width="160" height="142" fill="#9b806b" stroke="#392b33" stroke-width="8"/>';
  ['NEEDS','SCOPE','REVIEW'].forEach((t,i)=>art+='<g transform="translate('+(56+i*44)+' '+(47+i*13)+') rotate('+(i*3-3)+')"><rect width="52" height="69" fill="'+['#eed9a6','#d4e2d5','#ead2dc'][i]+'"/><circle cx="26" cy="5" r="3" fill="#864d58"/><text x="26" y="23" text-anchor="middle" font-size="9" fill="#4b3a42">'+t+'</text><path d="M7 35h36M7 43h30M7 51h34" stroke="#ad9995"/></g>');
  art+='<rect x="635" y="25" width="122" height="141" fill="#718698" stroke="#291f31" stroke-width="8"/><path d="M696 25v141M635 96h122" stroke="#291f31" stroke-width="5"/><path d="M646 156l25-42 25 26 19-61 30 77" fill="#4e6577"/><text x="400" y="38" text-anchor="middle" fill="#e1c1db" letter-spacing="3" font-size="16">LEGISLATIVE DRAFTING OFFICE</text>';
  [285,400,515].forEach((x,i)=>art+=person(x,121,i+1,s.activePerson===i+1,.88));
  art+='<path d="M220 171H580L630 262H170Z" fill="#987351"/><path d="M170 262H630V281H170Z" fill="#684837"/>';
  c.clauses.forEach((cl,i)=>{const filled=s.choices[i]!=null;art+='<g transform="translate('+(264+i*68)+' 195)"><rect width="57" height="51" rx="2" fill="'+(filled?'#fcf6e8':'#c8b49b')+'" stroke="'+(s.stage===2&&s.clauseIndex===i?'#f7bd75':'#ad9579')+'" stroke-width="3"/><path d="M8 10h40M8 19h35M8 28h39" stroke="#9b9197" stroke-width="2"/><text x="28" y="43" text-anchor="middle" font-size="10" fill="#4a414d">'+(filled?'WRITTEN':'DRAFT')+'</text></g>';});
  art+='<path d="M591 218v-84l-32-33" stroke="#26333e" stroke-width="8"/><path d="M530 112l25-30 31 30z" fill="#e1ac66"/><path d="M195 217h28v33h-28z" fill="#d9d9d3"/><path d="M222 223q25 9 0 20" fill="none" stroke="#d9d9d3" stroke-width="5"/><text x="50" y="206" fill="#d6c6d5" font-size="13">COMMUNITY NOTES</text><text x="638" y="206" fill="#d6c6d5" font-size="13">SOURCE LIBRARY</text>';
  if(s.stage>=3)art+='<g transform="translate(575 232) rotate(-12)"><rect width="110" height="29" rx="3" fill="#f7d3dc"/><text x="55" y="20" text-anchor="middle" fill="#713b54" font-size="13">'+(s.redline==null?'REVIEW':'REVISED')+'</text></g>';
  return art;
 }
 window.updateCivicScene=(kind,state,c)=>{
  const isHealth=kind==='health',root=document.querySelector(isHealth?'.room':'.studio');
  if(!root)return;
  let visual=root.querySelector('.scene-environment');
  if(!visual){visual=document.createElement('div');visual.className='scene-environment';root.prepend(visual);}
  const label=isHealth?'Committee hearing: lawmakers, witness table, public gallery, and clerk.':'Drafting office: community notes, stakeholders, and four clause documents.';
  visual.innerHTML='<svg viewBox="0 0 800 '+(isHealth?'360':'300')+'" role="img" aria-label="'+label+'">'+(isHealth?health(state,c):culture(state,c))+'</svg>';
  root.dataset.stage=String(state.stage);
  if(isHealth){
   const bill=document.getElementById('billPaper');
   const amendment=state.amendment==null?null:c.amendments[state.amendment];
   bill.innerHTML='<small>AMENDMENT DESK</small><h3>'+escape(amendment?amendment[0]:'Examine the proposed language')+'</h3><p>'+escape(amendment?amendment[1]:'Select an amendment to compare its rule with the hearing record.')+'</p>';
   let outcome=root.querySelector('.procedural-outcome');
   if(!outcome){outcome=document.createElement('div');outcome.className='procedural-outcome';root.append(outcome);}
   outcome.hidden=state.stage<5;
   outcome.innerHTML='<small>COMMITTEE ROUTE</small><div class="route-options">'+['Full chamber','Another hearing','Remain in committee'].map((x,i)=>'<span class="'+(state.action===i?'chosen':'')+'">'+x+'</span>').join('')+'</div><p>'+escape(state.action===null?'Choose the next procedural action.':['Amended bill advances to the full chamber. It is not yet law.','The committee keeps the bill and seeks more information.','The bill does not advance from committee at this time.'][state.action])+'</p>';
  }else{
   let revision=root.querySelector('.applied-redline');
   if(!revision){revision=document.createElement('div');revision.className='applied-redline';document.getElementById('bill').append(revision);}
   revision.hidden=state.redline===null||state.stage<3;
   revision.innerHTML=state.redline===null?'':'<b>SPONSOR REVISION</b><p>'+escape(c.redlines[state.redline][1])+'</p>';
  }
 };
 window.civicGlyph=(kind=0)=>'<svg viewBox="0 0 180 120" aria-hidden="true"><path d="M10 105H170" stroke="#92bfb9" stroke-width="5"/><path d="M28 44L90 14L152 44Z" fill="#dfb95e"/><rect x="31" y="49" width="118" height="9" fill="#527b92"/>'+[44,74,104,134].map(x=>'<rect x="'+(x-6)+'" y="60" width="12" height="39" rx="2" fill="'+(kind%2?'#c29dbd':'#8dbab1')+'"/>').join('')+'<rect x="26" y="99" width="128" height="9" rx="2" fill="#527b92"/><circle cx="90" cy="36" r="7" fill="#183c53"/></svg>';
})();
