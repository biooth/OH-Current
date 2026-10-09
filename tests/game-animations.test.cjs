/* Stage-specific visualization checks; run with node tests/game-animations.test.cjs */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const window={OHGameLayer:{render(){}}};
const document={addEventListener(){}};
vm.runInNewContext(fs.readFileSync('game-animations.js','utf8'),{window,document}, {filename:'game-animations.js'});
const layer=window.OHAnimatedScenes;
assert.equal(typeof layer.buildScene,'function');

const cultureCase={
  title:'Community Arts Access Grant',goal:'Create an arts grant for local organizations.',
  needs:[{name:'Ari Monroe',need:'Small organizations need clear eligibility.'},{name:'Cam Price',need:'Specify allowed expenses.'},{name:'Leah Soto',need:'Publish annual reports.'}],
  redlines:[['Define public arts programming','A definition narrows uncertainty.'],['Set a pilot period','A two-year review.']],
  tests:[['An Ohio nonprofit applies'],['Agency reviews an invoice']]
};
const draft={choices:[0,1,0,1],activePerson:1,clauseIndex:2,redline:0,test:0};
for(let stage=0;stage<6;stage++){
  const a=layer.buildScene('culture',{...draft,stage},cultureCase);
  assert.match(a,/scene-learning-theater/);
  assert.match(a,/<svg /);
  assert.match(a,/<title /);
  assert.match(a,/data-scene-replay/);
}
assert.match(layer.buildScene('culture',{...draft,stage:2},cultureCase),/scene-ink-write/);
assert.match(layer.buildScene('culture',{...draft,stage:3},cultureCase),/scene-redline/);
assert.match(layer.buildScene('culture',{...draft,stage:4},cultureCase),/CLEARER RULE/);
assert.match(layer.buildScene('culture',{...draft,stage:4,choices:[1,1,1,1]},cultureCase),/NEEDS REVIEW/);
assert.match(layer.buildScene('culture',{...draft,stage:5},cultureCase),/NOT ENACTED/);

const healthCase={
  title:'Rural Maternity Transfer Bill',brief:'Help hospitals transfer patients safely.',
  witnesses:[{name:'Dr. Lena Morris',tag:'Implementation',quote:'An accepting hospital must confirm an available bed.'},{name:'Andre Bell',tag:'Access',quote:'Transfers need clear calls.'},{name:'Nora Chen',tag:'Fiscal',quote:'Grant ceilings need clarification.'}],
  questions:[['Ask about capacity'],['Ask about popularity'],['Ask about timing']],
  amendments:[['Confirm capacity','Requires an accepting bed','Addresses the capacity concern.'],['Pilot funding','Limits grants','Addresses fiscal questions.'],['Agency rules','Delegate design','Leaves operational detail to later rules.']],
  memberLines:[['Chair Ellis','Clarify the amendment.'],['Rep. Mercer','Does it work?'],['Rep. Desai','Confirm acceptance.'],['Rep. Brooks','Check costs.'],['Rep. Park','We need a record.']]
};
const hearing={witness:0,question:0,amendment:0,members:new Set([0,1,2]),action:1};
for(let stage=0;stage<7;stage++){
  const a=layer.buildScene('health',{...hearing,stage},healthCase);
  assert.match(a,/scene-learning-theater/);
  assert.match(a,/<svg /);
}
assert.match(layer.buildScene('health',{...hearing,stage:1},healthCase),/scene-witness-moving/);
assert.match(layer.buildScene('health',{...hearing,stage:2},healthCase),/ACCEPTING BED/);
assert.match(layer.buildScene('health',{...hearing,stage:3},healthCase),/TARGETED/);
assert.match(layer.buildScene('health',{...hearing,stage:3,amendment:2},healthCase),/DELEGATED/);
assert.match(layer.buildScene('health',{...hearing,stage:5},healthCase),/ANOTHER HEARING/);
assert.match(layer.buildScene('health',{...hearing,stage:5},healthCase),/SELECTED/);
assert.match(layer.buildScene('health',{...hearing,stage:6},healthCase),/not an enacted law/);

const hostile={...cultureCase,goal:'<script>alert("bad")</script>'};
const safe=layer.buildScene('culture',{...draft,stage:0},hostile);
assert.doesNotMatch(safe,/<script>/);
const css=fs.readFileSync('game-animations.css','utf8');
assert.match(css,/prefers-reduced-motion:reduce/);
assert.match(css,/scene-ink-write/);
assert.match(css,/scene-witness-moving/);
assert.match(css,/scene-redline/);
assert.match(css,/scene-route-selected/);
assert.match(css,/max-width:620px/);
for(const page of ['culture-drafting.html','health-committee.html']){
  const html=fs.readFileSync(page,'utf8');
  assert.match(html,/href="game-animations.css"/);
  assert.match(html,/src="game-animations.js"/);
  assert.ok(html.indexOf('src="gameplay-layer.js"')<html.indexOf('src="game-animations.js"'));
}
console.log('Animated scenes: 13 stage variations + choice feedback, reduced-motion, integration: PASS');
