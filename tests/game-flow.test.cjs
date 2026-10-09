/* OH! Civics: focused flow, accurate optional context and non-duplicative UI. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const window={OHGameLayer:{render(){}}};
const document={addEventListener(){}};
vm.runInNewContext(fs.readFileSync('game-flow.js','utf8'),{window,document},{filename:'game-flow.js'});
const flow=window.OHGameFlow;
assert.equal(typeof flow.instruction,'function');
assert.equal(typeof flow.explanation,'function');
assert.equal(typeof flow.nextAction,'function');
assert.equal(typeof flow.selectionNote,'function');

const culture={
 title:'Community Arts Access Grant',
 needs:[
  {name:'Ari',need:'Small groups need an eligibility rule.',clue:'Define eligibility.'},
  {name:'Cam',need:'Allowed expenses need limits.',clue:'Define allowable costs.'},
  {name:'Leah',need:'Report the results.',clue:'Require oversight.'}
 ],
 clauses:[
  {name:'Purpose',prompt:'What is the bill for?',opts:[['Narrow purpose','Narrow purpose gives direction.'],['Broad purpose','Broad purpose leaves flexibility.']]},
  {name:'Eligibility',prompt:'Who qualifies?',opts:[['Nonprofits in small towns','Clearer rule.'],['Cultural groups','Flexible rule.']]},
  {name:'Mechanism',prompt:'Which uses?',opts:[['Specified uses','Clearer rule.'],['Any reasonable use','Flexible rule.']]},
  {name:'Accountability',prompt:'Which reports?',opts:[['Annual data','Auditable.'],['General efficiency','More discretion.']]}
 ],
 redlines:[['Define program','Add a definition.','Now the meaning is clearer.'],['Pilot','Set a time window.','Requires a future review.']],
 tests:[['Nonprofit applies','Eligibility is needed.','A specific rule helps.'],['Invoice','Review allowable uses.','A specific rule helps.']]
};
const health={
 brief:'Proposed rural transfer safeguards.',
 witnesses:[
  {name:'Dr. Lee',claim:'A receiving bed must be confirmed.',quote:'Confirm a bed.',evidence:'Observed handoff delays.',concern:'Delays can harm care.'},
  {name:'Paramedic',claim:'Communication matters.',quote:'Improve calls.',evidence:'Call reports.',concern:'Routing gaps.'},
  {name:'Auditor',claim:'Funding limits matter.',quote:'Budget needed.',evidence:'State costs.',concern:'Open costs.'}
 ],
 questions:[['How soon?','Ask about timing.','This tests timelines.'],['Who?','Ask who decides.','This tests authority.']],
 amendments:[['Capacity confirmation','Adds an accepting facility check.','Clarifies responsibility.'],['Pilot grants','Limits spending.','Makes fiscal exposure smaller.']],
 memberLines:[['Rep. Hill','Needs clarity.'],['Rep. Diaz','Needs evidence.'],['Rep. Bell','Needs funding.']]
};
assert.deepEqual([0,1,2,3,4,5].map(i=>flow.phase('culture',i)),[0,0,1,1,2,2]);
assert.deepEqual([0,1,2,3,4,5,6].map(i=>flow.phase('health',i)),[0,0,0,1,1,2,2]);
const draft={stage:1,heard:new Set([0,1]),activePerson:1,choices:[0,1,0,1],clauseIndex:2,redline:0,test:1};
assert.match(flow.instruction('culture',draft,culture),/2 of 3 heard/);
assert.match(flow.instruction('culture',{...draft,heard:new Set([0,1,2])},culture),/Ready to write/);
assert.match(flow.instruction('culture',{...draft,stage:2},culture),/mechanism/);
assert.match(flow.instruction('culture',{...draft,stage:5},culture),/not yet law/);
assert.match(flow.explanation('culture',draft,culture),/eligibility/);
assert.match(flow.explanation('culture',{...draft,stage:2},culture),/Specified uses/);
assert.match(flow.explanation('culture',{...draft,stage:3},culture),/definition/);
assert.match(flow.selectionNote('culture',{...draft,stage:2},culture),/More specific/);
assert.match(flow.nextAction('culture',2,{clauseIndex:3},culture),/Review the full bill/);
assert.match(flow.nextAction('culture',2,{clauseIndex:4},culture),/Revise the bill/);
const hearing={stage:1,witness:0,heard:new Set([0]),question:0,amendment:0,members:new Set([0,1]),action:0};
assert.match(flow.instruction('health',hearing,health),/1 of 3 heard/);
assert.match(flow.instruction('health',{...hearing,stage:4},health),/2 of 3 heard/);
assert.match(flow.instruction('health',{...hearing,stage:5},health),/procedural/);
assert.match(flow.explanation('health',hearing,health),/receiving bed/);
assert.match(flow.explanation('health',{...hearing,stage:2},health),/timelines/);
assert.match(flow.explanation('health',{...hearing,stage:3},health),/responsibility/);
assert.match(flow.explanation('health',{...hearing,stage:5},health),/None enacts/);
assert.match(flow.selectionNote('health',{...hearing,stage:5},health),/not become law/);
assert.match(flow.nextAction('health',6,hearing,health),/Play again/);
const css=fs.readFileSync('game-flow.css','utf8');
for(const rule of ['.flow-simplified .play-coach','.flow-simplified .progress.flow-progress','.flow-simplified .play-surface .play-option',
                    '.flow-simplified .flow-context[hidden]','.flow-simplified.show-full-game-text .learning>.action-card',
                    '@media(max-width:760px)','prefers-reduced-motion'])assert.ok(css.includes(rule),'Missing CSS rule: '+rule);
for(const page of ['health-committee.html','culture-drafting.html']){
 const text=fs.readFileSync(page,'utf8');
 for(const marker of ['src="gameplay-layer.js"','src="game-animations.js"','src="game-flow.js"',
                      'href="civic-character-art.css"','href="game-flow.css"'])assert.ok(text.includes(marker),page+' missing '+marker);
 assert.ok(text.indexOf('src="game-animations.js"')<text.indexOf('src="game-flow.js"'));
}
console.log('Flow tests PASS: 3 chapters, concise instructions, conditional notes, clear next actions and both themes.');
