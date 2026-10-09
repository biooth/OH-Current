/* OH! Civics — one clear action at a time.
   The original lesson copy and controls remain in the page for educational context;
   this presentation layer removes duplicate cards without changing gameplay state. */
(function(){
'use strict';
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function count(set){return set&&typeof set.size==='number'?set.size:0;}
function phase(kind,step){
 if(kind==='culture')return step<2?0:step<4?1:2;
 return step<3?0:step<5?1:2;
}
var names={culture:['Listen','Draft','Test'],health:['Hear','Shape','Decide']};
function nextAction(kind,step,s,c){
 if(kind==='culture'){
  if(step===0)return 'Meet the community →';
  if(step===1)return 'Start drafting →';
  if(step===2)return s.clauseIndex>=c.clauses.length?'Revise the bill →':s.clauseIndex===c.clauses.length-1?'Review the full bill →':'Next clause →';
  if(step===3)return 'Try the rule →';
  if(step===4)return 'See the draft →';
  return 'Play again ↻';
 }
 return ['Call the witnesses →','Ask a question →','Compare amendments →','Hear the members →','Decide what happens →','See the outcome →','Play again ↻'][step];
}
function instruction(kind,s,c){
 var st=s.stage;
 if(kind==='culture'){
  if(st===0)return 'See how one idea turns into four parts of a bill.';
  if(st===1)return count(s.heard)>=c.needs.length?'You heard everyone. Ready to write.':'Tap each person · '+count(s.heard)+' of '+c.needs.length+' heard.';
  if(st===2)return s.clauseIndex>=c.clauses.length?'Four clauses drafted. Review your bill.':'Choose wording for '+c.clauses[s.clauseIndex].name.toLowerCase()+'.';
  if(st===3)return 'Pick a revision and watch the text change.';
  if(st===4)return 'Try a real-world request against your wording.';
  return 'The draft is ready for review—not yet law.';
 }
 if(st===0)return 'See what the committee will examine.';
 if(st===1)return count(s.heard)>=c.witnesses.length?'All witnesses heard. Ask what is missing.':'Tap each witness · '+count(s.heard)+' of '+c.witnesses.length+' heard.';
 if(st===2)return 'Pick a question that checks a practical gap.';
 if(st===3)return 'Choose an amendment and watch what it fixes.';
 if(st===4)return count(s.members)>=3?'Three viewpoints heard. Ready to decide.':'Hear three members · '+Math.min(3,count(s.members))+' of 3 heard.';
 if(st===5)return 'Choose the bill’s next procedural step.';
 return 'A committee decision is not the same as a law.';
}
function explanation(kind,s,c){
 var st=s.stage;
 if(kind==='culture'){
  if(st===0)return 'A goal describes what lawmakers want. A bill must also say who qualifies, what happens, how it works, and what gets reviewed.';
  if(st===1){var x=s.activePerson?c.needs[s.activePerson-1]:null;return x?x.need+' '+x.clue:'Speak with the people affected by this proposal. Their concerns help identify missing rules.';}
  if(st===2){var i=s.clauseIndex;if(i>=c.clauses.length)return 'You have purpose, eligibility, mechanism, and accountability. Those four sections perform different jobs.';var cl=c.clauses[i],n=s.choices[i];return n==null?cl.prompt+' Specific text makes decisions more predictable; flexible text delegates choices to administrators.':cl.opts[n][0]+' '+cl.opts[n][1];}
  if(st===3)return s.redline==null?'Redlining means revising actual bill language in response to an identified problem.':c.redlines[s.redline][1]+' '+c.redlines[s.redline][2];
  if(st===4)return s.test==null?'Try an applicant or agency case. The test shows whether the bill text leads to a clear decision.':c.tests[s.test][1]+' '+c.tests[s.test][2];
  return 'You assembled a fictional bill and tested its language. Additional legislative steps would still be required before any provision could become law.';
 }
 if(st===0)return c.brief+' A committee hearing builds a record; it does not enact the proposal.';
 if(st===1){var w=c.witnesses[s.witness];return w.claim+' '+w.evidence+' '+w.concern;}
 if(st===2)return s.question==null?'Questions help a committee separate broad intentions from concrete implementation gaps.':c.questions[s.question][1]+' '+c.questions[s.question][2];
 if(st===3)return s.amendment==null?'A markup changes the proposed legal text. Compare what an amendment addresses and what it leaves unresolved.':c.amendments[s.amendment][1]+' '+c.amendments[s.amendment][2];
 if(st===4){var list=Array.from(s.members||[]),last=list[list.length-1];return last==null?'Committee members can weigh the same testimony differently. Hear several viewpoints before deciding.':c.memberLines[last][0]+': '+c.memberLines[last][1];}
 if(st===5)return 'Reporting a bill, continuing a hearing, or declining to report are committee actions. None enacts a bill. Further legislative steps may follow.';
 return 'You heard testimony, asked questions, examined an amendment, and reached a procedural outcome. This was a fictional committee simulation.';
}
function selectionNote(kind,s,c){
 if(kind==='culture'){
  if(s.stage===1&&s.activePerson)return 'Their concern points to a rule the bill needs.';
  if(s.stage===2&&s.clauseIndex<c.clauses.length&&s.choices[s.clauseIndex]!=null){
   return s.choices[s.clauseIndex]===0?'More specific wording makes the rule easier to apply.':'More flexible wording leaves more decisions to the agency.';
  }
  if(s.stage===3&&s.redline!=null)return 'The revision changes the bill text, not just its title.';
  if(s.stage===4&&s.test!=null)return 'Your earlier language determines how clear this decision is.';
  return '';
 }
 if(s.stage===1&&count(s.heard))return 'Each witness adds a different concern to the record.';
 if(s.stage===2&&s.question!=null)return 'This question tests a practical point in the process.';
 if(s.stage===3&&s.amendment!=null)return 'Watch which problems remain after this change.';
 if(s.stage===4&&count(s.members))return 'Different members can interpret the same record differently.';
 if(s.stage===5&&s.action!=null)return 'The bill’s route changes. It has not become law.';
 return '';
}
function paint(kind,s,c){
 var surface=document.querySelector('.play-surface');
 if(!surface)return;
 document.body.classList.add('flow-simplified');
 var prog=document.getElementById('progress');
 var ph=phase(kind,s.stage), labels=names[kind];
 if(prog){
  prog.classList.add('flow-progress');
  prog.setAttribute('role','group');
  prog.setAttribute('aria-label','Three chapters in this game');
  prog.innerHTML=labels.map(function(n,i){var mark=i<ph?' completed':i===ph?' current':'';return '<div class="flow-chapter'+mark+'"'+(i===ph?' aria-current="step"':'')+'><span class="flow-chapter-dot" aria-hidden="true"></span><span class="flow-chapter-label">'+(i+1)+'. '+n+'</span></div>';}).join('');
 }
 var counter=document.getElementById('stageCounter');
 if(counter)counter.textContent='Step '+(s.stage+1)+' of '+(kind==='culture'?6:7);
 var coach=surface.querySelector('.play-coach-words p');
 if(coach)coach.textContent=instruction(kind,s,c);
 var name=surface.querySelector('.play-coach-name');
 if(name)name.textContent=kind==='culture'?'Renee · Drafting guide':'Avery · Hearing guide';
 var next=document.getElementById('nextBtn');
 if(next)next.textContent=nextAction(kind,s.stage,s,c);
 var previous=document.getElementById('backBtn');
 if(previous)previous.textContent='← Back';
 var notes=surface.querySelector('[data-play-details]');
 var expanded=document.body.classList.contains('show-full-game-text');
 if(notes){notes.textContent=expanded?'Less detail':'Why?';notes.setAttribute('aria-expanded',String(expanded));notes.setAttribute('aria-controls','flow-context');}
 var area=surface.querySelector('.play-gamearea');
 if(area){
  // Feedback lives in the same reading line as the player's choices, without a new card.
  var note=selectionNote(kind,s,c);
  if(note)area.insertAdjacentHTML('beforeend','<p class="flow-feedback" role="status"><span aria-hidden="true">↳</span> '+esc(note)+'</p>');
 }
 var detail=document.createElement('div');
 detail.id='flow-context';
 detail.className='flow-context';
 detail.hidden=!expanded;
 detail.innerHTML='<p><strong>Why it matters</strong> '+esc(explanation(kind,s,c))+'</p>';
 surface.appendChild(detail);
}
var base=window.OHGameLayer;
if(base&&typeof base.render==='function'){
 var original=base.render;
 base.render=function(kind,s,c){original(kind,s,c);paint(kind,s,c);};
}
document.addEventListener('click',function(e){
 var button=e.target.closest('[data-play-details]');if(!button)return;
 // gameplay-layer.js toggles this class first in its own event handler.
 var expanded=document.body.classList.contains('show-full-game-text');
 var detail=document.getElementById('flow-context');
 if(detail)detail.hidden=!expanded;
 button.textContent=expanded?'Less detail':'Why?';
});
window.OHGameFlow={phase:phase,instruction:instruction,nextAction:nextAction,explanation:explanation,selectionNote:selectionNote};
})();