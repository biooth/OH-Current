/* OH! Civics: visual-first mini-games. Fictional cases, not a live legislative record. */
(function(){
'use strict';
var rootClass='play-upgraded', kindLast='';
var esc=function(x){return String(x==null?'':x).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]})};
var crop=function(t,n){t=String(t);return t.length>n?t.slice(0,n-1).replace(/\s+\S*$/,'')+'…':t};
var glyphs={
 goal:'<path d="M12 2v20M3 8l9-5 9 5-9 5z"/><path d="M6 20h12"/>',
 people:'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 21v-4a6 6 0 0 1 12 0v4M12 21v-4a5 5 0 0 1 10 0v4"/>',
 rule:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 check:'<circle cx="12" cy="12" r="10"/><path d="m7 12 3 3 7-7"/>',
 revise:'<path d="M4 17 17 4l3 3L7 20l-4 1zM15 6l3 3"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 question:'<circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 18v.2"/>',
 hearing:'<path d="M3 9v6M7 6v12M11 3v18M15 7v10M19 10v4"/>',
 vote:'<path d="M4 20h16M5 17h14V9l-7-5-7 5zM9 12h6"/>',
 route:'<circle cx="4" cy="12" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 12h6l5-6M12 12l5 6"/>',
 file:'<path d="M5 2h10l4 4v16H5zM14 2v5h5M8 12h8M8 16h8"/>'
};
function icon(type){return '<svg class="play-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">'+(glyphs[type]||glyphs.rule)+'</svg>'}
function face(index){
 var coats=['#95455d','#3c647d','#977443','#49715a','#65568a'],skin=['#c88962','#7d4b37','#e0ad85','#ad7057','#9f6c50'],hair=['#392831','#221b23','#584032','#252d32','#2d2429'];
 return '<svg class="play-avatar" viewBox="0 0 80 86" aria-hidden="true"><ellipse cx="40" cy="77" rx="34" ry="8" fill="#000" opacity=".12"/><path d="M8 83Q8 48 40 48Q72 48 72 83" fill="'+coats[index%5]+'"/><path d="M29 51l11 12 11-12" fill="#eee5d8"/><rect x="34" y="43" width="12" height="14" rx="5" fill="'+skin[index%5]+'"/><ellipse cx="40" cy="28" rx="23" ry="25" fill="'+skin[index%5]+'"/><path d="M17 29Q13 2 40 3Q66 3 63 30Q50 23 48 15Q37 27 17 29" fill="'+hair[index%5]+'"/><circle cx="32" cy="31" r="2" fill="#382b2b"/><circle cx="48" cy="31" r="2" fill="#382b2b"/><path d="M34 41q6 4 12 0" fill="none" stroke="#784846" stroke-width="2" stroke-linecap="round"/></svg>';
}
function playButton(label,sub,kind,i,selected,visual){
 return '<button type="button" class="play-option'+(selected?' is-picked':'')+'" data-kind="'+kind+'" data-index="'+i+'" aria-pressed="'+!!selected+'"'+(kind==='clause'?' draggable="true"':'')+'>'+ (visual||icon('rule'))+'<span class="play-option-copy"><strong>'+esc(label)+'</strong>'+(sub?'<span>'+esc(sub)+'</span>':'')+'</span>'+(selected?'<span class="play-tick" aria-hidden="true">✓</span>':'')+'</button>';
}
var slots=[['Purpose','goal'],['Eligibility','people'],['Mechanism','rule'],['Accountability','check']];
function clauseSlots(s){
 return '<div class="play-slots" aria-label="Bill clause progress">'+slots.map(function(p,i){var filled=s.choices[i]!=null,active=s.stage===2&&s.clauseIndex===i;return '<div class="play-slot'+(filled?' filled':'')+(active?' active':'')+'" '+(active?'data-clause-drop="true" tabindex="0" role="group" aria-label="Drop a clause here"':'')+'>'+icon(p[1])+'<strong>'+p[0]+'</strong><span>'+(filled?(s.choices[i]===0?'Defined':'Flexible'):(active?'Drop here':'Empty'))+'</span></div>'}).join('')+'</div>';
}
function coach(text,i,tip){
 return '<div class="play-coach"><div class="play-coach-portrait">'+face(i)+'</div><div class="play-coach-words"><span class="play-coach-name">'+(kindLast==='culture'?'Renee · Your drafting partner':'Avery · Committee clerk')+'</span><p>'+esc(text)+'</p></div><button type="button" class="play-more" data-play-details="true" aria-expanded="'+document.body.classList.contains('show-full-game-text')+'">'+(document.body.classList.contains('show-full-game-text')?'Hide full notes':'Full notes +')+'</button></div>'+(tip?'<div class="play-nudge">'+icon('check')+esc(tip)+'</div>':'');
}
var cultureLines=[
'First, see how a goal becomes four enforceable instructions.',
'TALK to each stakeholder. Their concerns point to different clauses.',
'PICK or DRAG a clause card onto the glowing document slot.',
'Redline the draft. Every change must solve a defined problem.',
'Try an applicant or agency test. Does the wording answer it?',
'Your bill is assembled. Follow each instruction from goal to oversight.'
];
function culture(s,c){
 var st=s.stage,active=s.clauseIndex,area='',tip='';
 if(st===0){
 area='<div class="play-storyboard"><div>'+icon('goal')+'<strong>Community goal</strong><span>'+esc(c.goal)+'</span></div><b>→</b><div>'+icon('rule')+'<strong>Bill instructions</strong><span>Who? What? How? Checked by whom?</span></div></div>'+clauseSlots(s);
 }else if(st===1){
 area='<div class="play-caption">OPEN THE COMMUNITY NOTEBOOK <span>'+s.heard.size+' / '+c.needs.length+' heard</span></div><div class="play-people">'+c.needs.map(function(n,i){return playButton(n.name,n.role,'need',i,s.activePerson===i+1,face(i+1))}).join('')+'</div>';
 if(s.activePerson>0){var n=c.needs[s.activePerson-1];area+='<div class="play-dialogue"><strong>'+esc(n.name)+' says:</strong> “'+esc(n.need)+'”<div class="play-lesson-arrow">'+icon('route')+esc(n.clue)+'</div></div>';}
 tip=s.heard.size===c.needs.length?'All three needs collected. Move to clause drafting.':'Characters unlock what the bill must specify.';
 }else if(st===2){
 area=clauseSlots(s);
 if(active<c.clauses.length){
  var cl=c.clauses[active],selection=s.choices[active],labels=[['Give the goal a tool','Broad statement'],['Set who qualifies','Leave eligibility open'],['List allowed uses','Leave discretion to agency'],['Require a record','Promise efficiency']];
  area+='<div class="play-caption">DRAFTING '+esc(cl.name.toUpperCase())+' <span>'+(active+1)+' OF 4</span></div><p class="play-question">'+esc(cl.prompt)+'</p><div class="play-tiles">'+cl.opts.map(function(o,i){return playButton(labels[active][i],crop(o[0],94),'clause',i,selection===i,icon(i===0?'check':'question'))}).join('')+'</div>';
  if(selection!=null)area+='<div class="play-stamp">'+icon('check')+' Inserted into '+esc(cl.name)+' · '+(selection===0?'clearer instructions':'more agency flexibility')+'</div>';
  tip='Drag a card to the highlighted slot, or tap it to insert.';
 }else{area+='<div class="play-stamp">'+icon('check')+' Four clauses ready for the sponsor’s redline.</div>';tip='Review the whole paper before revising.';}
 }else if(st===3){
 area='<div class="play-caption">REVISION DESK <span>CHOOSE ONE REDLINE</span></div><div class="play-tiles">'+c.redlines.map(function(r,i){return playButton(r[0],crop(r[1],95),'redline',i,s.redline===i,icon('revise'))}).join('')+'</div><div class="play-before-after"><div><small>BEFORE</small><strong>Unclear or incomplete</strong><div class="play-line faded"></div><div class="play-line faded short"></div></div><b>→</b><div class="'+(s.redline==null?'':'is-live')+'"><small>AFTER</small><strong>'+(s.redline==null?'Choose a revision':esc(c.redlines[s.redline][0]))+'</strong><div class="play-line"></div><div class="play-line short"></div></div></div>';
 tip=s.redline!=null?'The text changes, not just the title.':'Find the specific ambiguity you want to resolve.';
 }else if(st===4){
 var t=s.test,selected=t==null?null:c.tests[t],checkClause=t===0?1:2,clear=s.choices[checkClause]===0;
 area='<div class="play-caption">APPLICATION COUNTER <span>RUN A TEST</span></div><div class="play-tiles">'+c.tests.map(function(x,i){return playButton(x[0],crop(x[1],84),'test',i,t===i,icon(i===0?'people':'file'))}).join('')+'</div><div class="play-application"><div>'+icon('people')+'<strong>Real-world request</strong></div><span class="play-flow-arrow">→</span><div>'+icon('rule')+'<strong>Apply your rule</strong></div><span class="play-flow-arrow">→</span><div class="'+(selected?'is-live':'')+'">'+icon('check')+'<strong>'+(selected?(clear?'More predictable':'Needs interpretation'):'Try a case')+'</strong></div></div>';
 tip=selected?(clear?'Your earlier precise clause gives the reviewer a clearer starting rule.':'Your flexible clause leaves an important call to the administrator.'):'Choose a scenario; see how your earlier drafting choice matters.';
 }else{
 area=clauseSlots(s)+'<div class="play-final"><div class="play-final-seal">'+icon('check')+'</div><strong>Draft assembled</strong><span>Community voices → legal instructions → sponsor revision → practical test.</span></div>';
 tip='The fictional bill has been drafted, not enacted into law.';
 }
 return '<section class="play-surface play-culture" aria-label="Interactive culture drafting puzzle"><div class="play-surface-top"><span>'+icon('file')+' DRAFTING WORKBENCH</span><span>PUZZLE · '+(st+1)+'/6</span></div>'+coach(cultureLines[st],0,tip)+'<div class="play-gamearea" aria-live="polite">'+area+'</div></section>';
}
var healthLines=[
'You chair a practice hearing. First, understand the proposal.',
'CALL the witnesses. Notice how each changes the evidence record.',
'ASK a focused question that tests what the bill leaves unclear.',
'COMPARE amendments. Each fixes one issue and may leave others.',
'HEAR different members. The same record can raise different concerns.',
'Choose the next COMMITTEE ACTION. A committee vote never makes a law.',
'Debrief the hearing record and where the bill goes next.'
];
function issueMap(s,c){
 var caseTwo=/School/.test(c.title);
 var issues=caseTwo?['Consent and records','Referral workflow','Funding formula']:['Transfer capacity','Emergency handoff','Grant limits'];
 var match=caseTwo?[0,1,2]:[0,2,1],chosen=s.amendment;
 return '<div class="play-issue-map"><div class="play-caption">HEARING RECORD <span>WHAT DOES THE AMENDMENT ADDRESS?</span></div>'+issues.map(function(iss,i){var focus=chosen!=null&&match[chosen]===i;return '<div class="play-issue-row"><span>'+icon(focus?'check':'question')+esc(iss)+'</span><b class="'+(focus?'addressed':'open')+'">'+(chosen==null?'Pending':focus?'Addressed by proposal':'Still to examine')+'</b></div>'}).join('')+'</div>';
}
function health(s,c){
 var st=s.stage,area='',tip='';
 if(st===0){
 area='<div class="play-hearing-intro"><div>'+icon('file')+'<strong>Proposal</strong><span>'+esc(c.brief)+'</span></div><div>'+icon('hearing')+'<strong>Hearing</strong><span>Witnesses add evidence to the record.</span></div><div>'+icon('vote')+'<strong>Decision</strong><span>Committee decides the next procedural step.</span></div></div>';
 tip='This is a fictional Ohio-style legislative exercise, not an actual hearing.';
 }else if(st===1){
 area='<div class="play-caption">WITNESS LINEUP <span>'+s.heard.size+' / 3 ON RECORD</span></div><div class="play-witnesses">'+c.witnesses.map(function(w,i){return playButton(w.name,w.tag+' · '+crop(w.claim,58),'witness',i,s.witness===i,face(i+1))}).join('')+'</div><div class="play-record"><span class="play-led"></span> NOW TESTIFYING: <strong>'+esc(c.witnesses[s.witness].name)+'</strong><p>'+esc(c.witnesses[s.witness].quote)+'</p></div>';
 tip=s.heard.size===3?'Three perspectives are on the record. Now question them.':'Tap a character to bring testimony to the microphone.';
 }else if(st===2){
 area='<div class="play-caption">QUESTION CONSOLE <span>TEST THE RECORD</span></div><div class="play-tiles">'+c.questions.map(function(q,i){return playButton(q[0],crop(q[1],90),'question',i,s.question===i,icon(i===1?'people':'question'))}).join('')+'</div>'+(s.question==null?'':'<div class="play-record"><span class="play-led"></span> WHAT THIS REVEALS<p>'+esc(c.questions[s.question][2])+'</p></div>');
 tip='Ask about a specific gap, not simply whether the goal sounds popular.';
 }else if(st===3){
 area='<div class="play-caption">AMENDMENT CONTROL BOARD <span>COMPARE THE TRADEOFFS</span></div><div class="play-tiles play-amendments">'+c.amendments.map(function(a,i){return playButton(a[0],crop(a[1],90),'amendment',i,s.amendment===i,icon('revise'))}).join('')+'</div>'+issueMap(s,c);
 tip=s.amendment==null?'Choose a change to the bill text.':'One amendment rarely solves every problem raised in testimony.';
 }else if(st===4){
 area='<div class="play-caption">MEMBER MICROPHONES <span>'+s.members.size+' / 3 REQUIRED</span></div><div class="play-witnesses play-members">'+c.memberLines.map(function(m,i){return playButton(m[0],s.members.has(i)?crop(m[1],75):'Tap to hear viewpoint','member',i,s.members.has(i),face(i))}).join('')+'</div>';
 tip='There is no made-up vote count here. These are fictional viewpoints.';
 }else if(st===5){
 var routes=[['Report the bill','Full chamber','route'],['Continue the hearing','Committee keeps bill','clock'],['Do not report','Bill stays in committee','file']];
 area='<div class="play-caption">PROCEDURAL ROUTE <span>SELECT THE NEXT STOP</span></div><div class="play-route-start">'+icon('hearing')+' COMMITTEE CHECKPOINT</div><div class="play-route-fork"></div><div class="play-route-choices">'+routes.map(function(r,i){return playButton(r[0],r[1],'action',i,s.action===i,icon(r[2]))}).join('')+'</div>';
 tip=s.action==null?'A committee decides where the proposal goes next.':'No selection here means the bill is enacted. Other steps remain.';
 }else{
 area='<div class="play-hearing-intro"><div>'+icon('hearing')+'<strong>Testimony</strong><span>'+s.heard.size+' witnesses heard</span></div><div>'+icon('revise')+'<strong>Amendment</strong><span>'+esc(c.amendments[s.amendment][0])+'</span></div><div>'+icon('route')+'<strong>Next stop</strong><span>'+esc(['Full chamber','Further hearing','In committee'][s.action])+'</span></div></div>';
 tip='Hearing → questions → proposed amendment → committee action. Not a final law.';
 }
 return '<section class="play-surface play-health" aria-label="Interactive committee hearing simulation"><div class="play-surface-top"><span>'+icon('hearing')+' LIVE HEARING BOARD <i aria-hidden="true"></i></span><span>SIMULATION · '+(st+1)+'/7</span></div>'+coach(healthLines[st],1,tip)+'<div class="play-gamearea" aria-live="polite">'+area+'</div></section>';
}
function mount(kind,s,c){
 kindLast=kind;
 var scene=document.querySelector(kind==='culture'?'.studio':'.room');if(!scene)return;
 var board=scene.querySelector('.play-surface');
 if(!board){board=document.createElement('div');var svg=scene.querySelector('.scene-environment');if(svg)svg.insertAdjacentElement('afterend',board);else scene.prepend(board);}
 board.outerHTML=kind==='culture'?culture(s,c):health(s,c);
 document.body.classList.add(rootClass);document.body.classList.toggle('is-culture-play',kind==='culture');document.body.classList.toggle('is-health-play',kind==='health');
 var x=document.getElementById('lessonText');if(x)x.hidden=true;
 var y=document.getElementById('actionText');if(y)y.hidden=true;
}
document.addEventListener('click',function(e){
 var toggle=e.target.closest('[data-play-details]');if(!toggle)return;
 document.body.classList.toggle('show-full-game-text');
 toggle.setAttribute('aria-expanded',String(document.body.classList.contains('show-full-game-text')));
 toggle.textContent=document.body.classList.contains('show-full-game-text')?'Hide full notes':'Full notes +';
});
var draggedIndex=null;
document.addEventListener('dragstart',function(e){var tile=e.target.closest('.play-culture [draggable]');if(!tile)return;draggedIndex=Number(tile.dataset.index);if(e.dataTransfer){e.dataTransfer.effectAllowed='copy';e.dataTransfer.setData('text/plain',String(draggedIndex));}});
document.addEventListener('dragover',function(e){if(e.target.closest('[data-clause-drop]'))e.preventDefault();});
document.addEventListener('drop',function(e){if(!e.target.closest('[data-clause-drop]'))return;e.preventDefault();var index=draggedIndex;if(index==null&&e.dataTransfer)index=Number(e.dataTransfer.getData('text/plain'));var b=document.querySelector('.play-culture .play-tiles [data-kind="clause"][data-index="'+index+'"]');if(b)b.click();draggedIndex=null;});
window.OHGameLayer={render:mount};
})();