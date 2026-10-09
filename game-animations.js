/* OH! Civics animation scenes: educational motion tied to player choices. */
(function () {
  'use strict';
  var ns = 'http://www.w3.org/2000/svg';
  var e = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (ch) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
  }); };
  var short = function (value, n) {
    var text = String(value == null ? '' : value).trim();
    return text.length <= n ? text : text.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
  };
  function text(x,y,words,klass,extra) {
    return '<text x="'+x+'" y="'+y+'" class="'+(klass||'')+'" '+(extra||'')+'>'+e(words)+'</text>';
  }
  function path(d,klass) { return '<path d="'+d+'" class="'+(klass||'scene-flow')+'"/>'; }
  function box(x,y,w,h,klass){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14" class="'+klass+'"/>';}
  function dot(x,y,klass) { return '<circle cx="'+x+'" cy="'+y+'" r="9" class="'+(klass||'scene-dot')+'"/>'; }
  function pill(x,y,value,klass,width) {
    var w=width||Math.max(90,Math.min(270,String(value).length*8+26));
    return box(x,y,w,31,'scene-pill '+(klass||''))+text(x+w/2,y+21,value,'scene-pill-label','text-anchor="middle"');
  }
  function character(x,y,index,klass) {
    var skin=['#bd7c54','#8c513e','#dfaa7e','#ab6d50','#d69c71'][index%5];
    var jacket=['#38677c','#8c5575','#6b6857','#72588c','#34665a'][index%5];
    return '<g transform="translate('+x+' '+y+')" class="scene-character '+(klass||'')+'">' +
      '<ellipse cx="0" cy="74" rx="36" ry="9" fill="#000" opacity=".13"/>'+
      '<path d="M-37 76Q-37 36 0 36Q37 36 37 76" fill="'+jacket+'"/>'+
      '<path d="M-13 40L0 53L13 40" fill="#faf4e8"/>'+
      '<rect x="-8" y="28" width="16" height="16" rx="5" fill="'+skin+'"/>'+
      '<ellipse cx="0" cy="8" rx="25" ry="29" fill="'+skin+'"/>'+
      '<path d="M-25 7Q-28 -22 0 -23Q27 -23 25 9Q15 0 11 -8Q0 7 -25 7" fill="#302632"/>'+
      '<circle cx="-9" cy="10" r="2.4" fill="#33252b"/><circle cx="9" cy="10" r="2.4" fill="#33252b"/>'+
      '<path d="M-7 22q7 5 14 0" fill="none" stroke="#764640" stroke-width="2.3" stroke-linecap="round"/>'+
      '</g>';
  }
  function documentShape(x,y,w,h,rows) {
    var a='<g class="scene-document">'+box(x,y,w,h,'scene-paper')+'<rect x="'+(x+15)+'" y="'+(y+12)+'" width="'+(w*.52)+'" height="7" rx="3" class="scene-ink-head"/>';
    for (var i=0;i<rows;i++) {
      a+='<path d="M'+(x+16)+' '+(y+37+i*23)+'h'+(w-32-(i%2)*26)+'" class="scene-ink-line '+(i===0?'scene-ink-write':'')+'"/>';
    }
    return a+'</g>';
  }
  function shell(kind,inner,title,desc) {
    var health=kind==='health';
    return '<svg viewBox="0 0 880 300" xmlns="'+ns+'" role="img" aria-labelledby="scene-lesson-title scene-lesson-desc" preserveAspectRatio="xMidYMid meet">'+
    '<title id="scene-lesson-title">'+e(title)+'</title><desc id="scene-lesson-desc">'+e(desc)+'</desc>'+
    '<defs><linearGradient id="sceneWall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+(health?'#143b4d':'#4f385c')+'"/><stop offset="1" stop-color="'+(health?'#09222d':'#261c3d')+'"/></linearGradient>'+
    '<linearGradient id="sceneDesk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="'+(health?'#937c5d':'#ad866b')+'"/><stop offset="1" stop-color="'+(health?'#5d473b':'#63445a')+'"/></linearGradient>'+
    '</defs><rect width="880" height="300" rx="18" fill="url(#sceneWall)"/>'+
    '<path d="M0 246H880V300H0" fill="'+(health?'#132e35':'#332943')+'"/>'+
    '<rect x="20" y="18" width="840" height="264" rx="12" fill="none" stroke="#ffffff" stroke-opacity=".13"/>'+
    inner+'</svg>';
  }
  function cultureStage(s,c) {
    var stage=s.stage, name='Culture drafting';
    if (stage===0) {
      return {title:'From an idea to an enforceable bill',desc:'An idea moves into four legal sections.',
        html: pill(35,35,'COMMUNITY IDEA','',180)+text(46,115,short(c.goal,42),'scene-white-medium')+
        path('M240 134H380','scene-energy-path')+dot(379,134,'scene-energy-dot')+
        documentShape(440,30,345,234,0)+text(612,80,'THE BILL','scene-ink-dark','text-anchor="middle"')+
        ['Purpose','Eligibility','Mechanism','Accountability'].map(function(label,i) {
          return '<g class="scene-build-row" style="--scene-delay:'+(i*.22)+'s">'+
            box(466,94+i*40,290,30,'scene-empty-row')+
            text(485,114+i*40,(i+1)+'.  '+label,'scene-ink-dark')+'</g>';
        }).join('')};
    }
    if (stage===1) {
      var active=s.activePerson===null?-1:s.activePerson-1;
      var need=active>=0?c.needs[active]:null;
      var index=active===0?1:active===1?2:3;
      return {title:'Community voices guide specific bill sections',desc:need?
        need.name+' raises the need: '+need.need:'Choose a stakeholder to discover the missing rule.',
        html:[0,1,2].map(function(i) {
          var px=126+i*170;
          return '<g class="scene-voice-entry" style="--scene-delay:'+(i*.14)+'s">'+
            character(px,125,i+1,active===i?'scene-spotlight':'')+
            text(px,224,c.needs[i].name,'scene-white-small','text-anchor="middle"')+'</g>';
        }).join('')+
        documentShape(622,53,200,215,3)+
        (need?path('M'+(126+active*170)+' 96Q590 27 635 115','scene-energy-path')+
          box(276,24,330,70,'scene-speech-bubble scene-enter')+
          text(292,52,short(need.need,42),'scene-ink-dark')+
          text(292,75,'→ '+(['Eligibility','Allowable uses','Public reporting'][active]),'scene-ink-highlight'):
          text(439,44,'Tap a character to reveal a drafting need','scene-white-small','text-anchor="middle"'))};
    }
    if (stage===2) {
      var idx=Math.min(s.clauseIndex,3),filled=s.choices[idx]!=null,selected=s.choices[idx];
      return {title:'The bill fills as you place clause cards',desc:'Active section '+(idx+1)+
        '. '+(filled?'Chosen language inserted.':'Choose a specific or flexible clause card.'),
        html:documentShape(240,28,410,236,0)+
          ['PURPOSE','ELIGIBILITY','MECHANISM','ACCOUNTABILITY'].map(function(section,i){
            var chosen=s.choices[i],current=idx===i;
            return '<g class="'+(current?'scene-clause-focus':'')+'">'+box(270,54+i*51,350,43,
              chosen!=null?'scene-written-slot':current?'scene-current-slot':'scene-empty-row')+
              text(288,80+i*51,section,'scene-ink-dark')+
              (chosen!=null?'<path d="M453 '+(76+i*51)+'h124" class="scene-ink-line scene-ink-write"/>'+pill(567,59+i*51,chosen===0?'DEFINED':'FLEXIBLE','scene-mini',70):'')+
              '</g>';
          }).join('')+
          '<g class="scene-pen"><path d="M682 85l42-67 15 11-43 68-20 9z" fill="#e8b56c" stroke="#d37d5c" stroke-width="4"/></g>'+
          (filled?pill(40,115,'CLAUSE INSERTED','scene-signal',165):pill(40,115,'PICK A CLAUSE','',165))};
    }
    if (stage===3) {
      var rev=s.redline==null?null:c.redlines[s.redline],label=rev?rev[0]:'Choose a sponsor revision';
      return {title:'Redlining changes what the law says',desc:rev?rev[1]:'Select a redline to see how text is revised.',
        html:documentShape(75,45,310,200,4)+documentShape(505,45,310,200,4)+
          pill(105,16,'BEFORE','',118)+pill(540,16,'AFTER','scene-signal',118)+
          path('M170 146h180','scene-redline')+
          path('M396 140H481','scene-energy-path')+
          (rev?box(523,109,272,65,'scene-highlight-paper')+text(537,136,short(label,31),'scene-ink-dark')+
            text(537,156,'Specific rule added','scene-ink-highlight')+
            '<path d="M526 169h238" class="scene-green-write"/>':
            text(660,137,'Your revision appears here','scene-ink-dark','text-anchor="middle"'))};
    }
    if (stage===4) {
      var test=s.test;
      var phased=/Historic/.test(c.title)&&test===0;
      var clear=test==null?null:(phased?s.redline===0:s.choices[test===0?1:2]===0);
      var outcome=clear==null?'RUN A TEST':clear?'CLEARER RULE':'NEEDS REVIEW';
      return {title:'A real request tests the draft',desc:'An applicant takes their request through your drafted rule: '+outcome+'.',
        html:box(34,86,205,132,'scene-diagram-node')+
          text(135,115,'APPLICANT','scene-white-heading','text-anchor="middle"')+
          character(135,135,2,'scene-applicant')+
          path('M248 153H343','scene-energy-path')+
          box(345,86,205,132,'scene-diagram-node')+
          text(446,122,'YOUR BILL','scene-white-heading','text-anchor="middle"')+
          documentShape(407,139,77,68,2)+
          path('M556 153H652','scene-energy-path')+
          box(655,86,190,132,'scene-diagram-node '+(test!=null?(clear?'scene-yes':'scene-hold'):''))+
          text(750,133,outcome,'scene-white-heading','text-anchor="middle"')+
          text(750,164,test===null?'Choose a scenario':clear?'Applies more clearly':'An agency must interpret','scene-white-small','text-anchor="middle"')+
          (test!=null?pill(328,235,short(c.tests[test][0],32),'scene-signal',225):'')};
    }
    return {title:'The completed draft is ready for legislative review',desc:'A complete draft does not mean that the bill is enacted.',
      html:documentShape(285,22,310,247,4)+text(440,63,'DRAFT BILL','scene-ink-dark','text-anchor="middle"')+
        ['Purpose','Eligibility','Mechanism','Accountability'].map(function(v,i){
          return pill(333,91+i*39,'✓  '+v,'scene-signal',225);
        }).join('')+
        '<g class="scene-seal"><circle cx="690" cy="210" r="53" fill="none" stroke="#f2d58c" stroke-width="8"/>'+
        text(690,210,'DRAFTED','scene-white-medium','text-anchor="middle"')+
        text(690,230,'NOT ENACTED','scene-white-small','text-anchor="middle"')+'</g>'};
  }
  function healthStage(s,c) {
    var stage=s.stage,school=/School/.test(c.title);
    if(stage===0){
      return {title:'A bill arrives for committee review',desc:'A proposal is examined through testimony, amendments, and possible committee action.',
        html:documentShape(82,49,250,201,4)+
          text(207,100,'BILL FILE','scene-ink-dark','text-anchor="middle"')+
          path('M333 155H535','scene-energy-path')+dot(533,155,'scene-energy-dot')+
          '<path d="M590 220v-61q0-58 102-58t102 58v61" fill="#5b483e" stroke="#c69a6e" stroke-width="8"/>'+
          character(693,95,0,'scene-spotlight')+
          text(690,249,'COMMITTEE HEARING','scene-white-heading','text-anchor="middle"')};
    }
    if(stage===1){
      var w=c.witnesses[s.witness];
      return {title:'A witness joins the record',desc:w.name+' testifies: '+w.quote,
        html: '<path d="M70 233H824" stroke="#6a8391" stroke-width="3"/>'+
          '<rect x="320" y="185" width="350" height="64" rx="8" fill="url(#sceneDesk)"/>'+
          '<path d="M538 188v-77l32-20" stroke="#a0e1d9" stroke-width="6" fill="none"/>'+
          '<circle cx="572" cy="89" r="10" fill="#d4f5ec"/>'+
          character(415,117,s.witness+1,'scene-witness-moving')+
          box(95,39,435,64,'scene-speech-bubble scene-enter')+
          text(114,65,short(w.quote,49),'scene-ink-dark')+
          text(114,87,w.name+' · '+w.tag,'scene-ink-highlight')+
          pill(668,188,'ON RECORD','scene-signal',146)+
          path('M94 216H263','scene-travel-path')};
    }
    if(stage===2){
      var nodes=school?['SCREEN','CONSENT','REFERRAL','RECORDS']:['LOCAL','TRANSFER CALL','ACCEPTING BED','TRANSPORT'];
      var problem=school?(s.question===2?3:2):(s.question===2?1:2);
      return {title:'Questions locate a practical gap in the process',
        desc:school?'The screening workflow highlights consent, follow-up, and records.':'The transfer workflow highlights calls, accepting capacity, and transport.',
        html:nodes.map(function(n,i){
          var x=30+i*221,highlight=s.question!=null&&problem===i;
          return '<g class="scene-flow-node" style="--scene-delay:'+(i*.12)+'s">'+
            box(x,105,184,106,'scene-diagram-node '+(highlight?'scene-concern':''))+
            text(x+92,150,n,'scene-white-heading','text-anchor="middle"')+
            text(x+92,176,(highlight?'CHECK HERE':(i+1)+' OF 4'),'scene-white-small','text-anchor="middle"')+'</g>'+
            (i<3?path('M'+(x+184)+' 160h37','scene-energy-path'):'');
        }).join('')+
        pill(260,27,s.question==null?'ASK A FOCUSED QUESTION':short(c.questions[s.question][0],30),'',330)};
    }
    if(stage===3){
      var labels=school?['Consent & records','Referral duties','Funding formula']:['Receiving capacity','Communication','Grant limits'];
      var selected=s.amendment,fix=school?[0,1,2]:[0,2,-1],idx=selected==null?-1:fix[selected];
      return {title:'An amendment addresses some issues, but not necessarily all',desc:selected==null?'Choose an amendment to compare coverage.':
        c.amendments[selected][0]+': '+c.amendments[selected][2],
        html: pill(38,31,'AMENDMENT','',190)+text(37,97,
          selected==null?'Choose a revision':short(c.amendments[selected][0],29),'scene-white-heading')+
          path('M289 152H430','scene-energy-path')+
          labels.map(function(label,i){
            var focus=idx===i,delegated=!school&&selected===2&&i===1;
            var y=35+i*79;
            return '<g class="scene-coverage-row '+(focus?'scene-addressed':'')+'" style="--scene-delay:'+(i*.12)+'s">'+
              box(448,y,380,64,'scene-diagram-node '+(focus?'scene-yes':'scene-muted'))+
              text(470,y+29,label,'scene-white-medium')+
              text(470,y+49,selected==null?'TO REVIEW':focus?'TARGETED':delegated?'DELEGATED':'STILL OPEN','scene-white-small')+
              (focus?'<path d="M775 '+(y+32)+'l10 9 16-20" class="scene-check-stroke"/>':'')+
              '</g>';
          }).join('')};
    }
    if(stage===4){
      var members=c.memberLines,last=[].concat(Array.from(s.members)).slice(-1)[0];
      return {title:'Committee members examine the same record from different angles',
        desc:last==null?'Select three members to hear different concerns.':
          members[last][0]+' says: '+members[last][1],
        html:members.map(function(m,i){
          var x=99+i*170;
          return character(x,142,i,i===last?'scene-spotlight':'')+
            text(x,250,m[0],'scene-white-small','text-anchor="middle"');
        }).join('')+
        (last==null?pill(234,30,'TAP A MEMBER TO SPEAK','',410):
        box(218,21,445,93,'scene-speech-bubble scene-enter')+
        text(235,53,members[last][0],'scene-ink-highlight')+
        text(235,83,short(members[last][1],57),'scene-ink-dark'))};
    }
    if(stage===5){
      var destinations=['FULL CHAMBER','ANOTHER HEARING','REMAIN IN COMMITTEE'];
      return {title:'Choose where the committee sends the bill next',
        desc:s.action==null?'Three possible committee outcomes. None enacts the bill.':
          'Selected route: '+destinations[s.action]+'. The bill is not yet law.',
        html:box(340,17,200,65,'scene-diagram-node')+
          text(440,46,'COMMITTEE','scene-white-heading','text-anchor="middle"')+
          text(440,68,'PROCEDURAL DECISION','scene-white-small','text-anchor="middle"')+
          path('M440 82V131H156V158 M440 131V158 M440 131H720V158','scene-route-network')+
          destinations.map(function(d,i){
            var x=35+i*291,active=s.action===i;
            return '<g class="scene-route-node '+(active?'scene-route-selected':'')+'">'+
              box(x,158,230,98,'scene-diagram-node '+(active?'scene-yes':''))+
              text(x+115,193,d,'scene-white-heading','text-anchor="middle"')+
              text(x+115,220,active?'SELECTED':'AVAILABLE','scene-white-small','text-anchor="middle"')+
              (active?'<circle cx="'+(x+115)+'" cy="246" r="5" fill="#eaffcb" class="scene-choice-tracer"/>':'')+'</g>';
          }).join('')+
          (s.action!=null?path('M440 82V131H'+(150+s.action*291)+'V152','scene-energy-path'):'')};
    }
    return {title:'A committee checkpoint, not a final law',desc:'The hearing produces a record and a procedural next step, not an enacted law.',
      html:['HEARING','QUESTIONS','AMENDMENT','COMMITTEE ACTION'].map(function(n,i){
        var x=36+i*213;
        return box(x,90,178,107,'scene-diagram-node scene-yes')+
        text(x+89,139,n,'scene-white-heading','text-anchor="middle"')+
        text(x+89,163,'REVIEWED','scene-white-small','text-anchor="middle"')+
        (i<3?path('M'+(x+178)+' 145h35','scene-energy-path'):'');
      }).join('')};
  }
  var lastKind='', lastState=null;
  function sceneMarkup(kind,s,c) {
    var data=kind==='culture'?cultureStage(s,c):healthStage(s,c);
    return '<figure class="scene-learning-theater '+(kind==='culture'?'scene-culture':'scene-health')+'" aria-label="Animated civic process illustration">'+
      '<div class="scene-learning-head"><span>WATCH IT HAPPEN · '+(kind==='culture'?'DRAFTING':'HEARING')+'</span>'+
      '<button type="button" class="scene-replay" data-scene-replay aria-label="Replay the process animation">↻ Replay animation</button></div>'+
      '<div class="scene-motion" data-scene-motion>'+shell(kind,data.html,data.title,data.desc)+'</div>'+
      '<figcaption>'+e(data.title)+'</figcaption></figure>';
  }
  function draw(kind,s,c) {
    var board=document.querySelector('.play-surface');
    if(!board)return;
    var area=board.querySelector('.play-gamearea');
    if(!area)return;
    var scene=area.querySelector('.scene-learning-theater');
    if(scene)scene.remove();
    area.insertAdjacentHTML('afterbegin',sceneMarkup(kind,s,c));
    document.body.classList.add('animated-gameplay');
    document.body.dataset.gameScene=kind+'-'+s.stage;
    lastKind=kind;
    lastState=s.stage;
  }
  var game=window.OHGameLayer;
  if(game&&typeof game.render==='function') {
    var previous=game.render;
    game.render=function(kind,s,c) {previous(kind,s,c);draw(kind,s,c);};
  }
  document.addEventListener('click',function(event){
    var control=event.target.closest('[data-scene-replay]');
    if(!control)return;
    var scene=control.closest('.scene-learning-theater');
    if(!scene)return;
    var visual=scene.querySelector('[data-scene-motion]');
    visual.classList.remove('scene-play');
    void visual.offsetWidth;
    visual.classList.add('scene-play');
  });
  window.OHAnimatedScenes={buildScene:sceneMarkup,describeCulture:cultureStage,describeHealth:healthStage};
})();