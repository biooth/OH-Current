/* Presentation, scene feedback and representative search; no external runtime dependencies. */
(()=>{
 const $=(s,r=document)=>r.querySelector(s);
 const esc=escapeHtml;
 // Official directories provide identity and contact destinations; avoid unrelated portrait matches.
 hydrateOfficialPortrait=()=>{};
 officialHtml=(key,n)=>{const o=officialFor(key,n);return `<div class="contact-card"><span class="office-monogram" aria-hidden="true">${esc(initials(o.name))}</span><p>${esc(o.role||DISTRICT_LAYERS[key].title)} · District ${n}</p><h3>${esc(o.name)}</h3>${o.phone?`<a href="tel:${o.phone.replace(/[^+\d]/g,'')}">${esc(o.phone)}</a>`:''}<a class="contact-link" href="${esc(o.url||'https://www.ohiohouse.gov/members/directory')}" target="_blank" rel="noopener noreferrer">${o.name==='Vacant'?'District office information':'Official profile / Contact'}</a><small>Official directory snapshot · Sep 29, 2026</small></div>`};
 const panel=$('#explorer .district-panel');
 panel.insertAdjacentHTML('afterbegin',`<form id="representativeSearch" role="search"><label for="repQuery">Find a representative</label><div class="search-input-row"><input id="repQuery" type="search" placeholder="Name or district number" autocomplete="off" aria-describedby="repSearchHelp"><button type="submit">Search</button></div><small id="repSearchHelp">Names search all three offices. Numbers use the selected map.</small><div id="repSearchStatus" role="status" aria-live="polite"></div><div id="repResults" aria-label="Search results"></div></form>`);
 panel.insertAdjacentHTML('beforeend',`<details class="lookup-details"><summary>Find by address / ZIP</summary><p>A ZIP can cross districts. Use an official lookup for an exact match, then select that district here.</p><a href="https://www.ohiosenate.gov/members/district-map" target="_blank" rel="noopener noreferrer">Ohio address lookup</a><a href="https://www.house.gov/representatives/find-your-representative" target="_blank" rel="noopener noreferrer">U.S. House ZIP lookup</a></details><div class="registration-card"><b>Your next civic step</b><a href="https://www.ohiosos.gov/elections/register-to-vote" target="_blank" rel="noopener noreferrer">Register / Check Registration</a><a class="registration-secondary" href="https://voterlookup.ohiosos.gov/VoterLookup.aspx" target="_blank" rel="noopener noreferrer">Check existing registration</a><small>Ohio Secretary of State</small></div>`);
 const officialPanel=$('#officialCardV2').parentElement;officialPanel.append($('.registration-card'));
 $('.future-lines').innerHTML='<strong>Current officeholders, not 2026 candidates.</strong> New congressional election boundaries take effect for representation in January 2027.';
 $('#explorer .notice').innerHTML='<strong>Map periods:</strong> U.S. House: current Congress through January 2, 2027. Ohio House / Senate: 2024–2032.';
 $('#explorer .source-strip').innerHTML='<a href="https://www.ohiosos.gov/elections/district-maps" target="_blank" rel="noopener">Official Ohio district maps and election boundaries</a>';
 const labels={congress:'U.S. House',house:'Ohio House',senate:'Ohio Senate'};
 function search(){
  const q=$('#repQuery').value.trim().toLocaleLowerCase(),results=$('#repResults');results.replaceChildren();
  if(!q){$('#repSearchStatus').textContent='Enter a name or district number.';return;}
  if(/^\d{5}(?:-\d{4})?$/.test(q)||/\d+\s+\w+\s+(street|st|road|rd|ave|avenue|drive|dr|lane|ln)\b/.test(q)){$('#repSearchStatus').textContent='Use the official address / ZIP lookup below; ZIP codes do not identify one district.';$('.lookup-details').open=true;return;}
  const num=q.match(/^(?:(ohio house|ohio senate|u\.?s\.? house|house|senate|congress)\s*)?(?:district\s*|oh[- ]?)?(\d{1,3})$/);
  const layer=num?.[1]?(num[1].includes('senate')?'senate':num[1]==='house'||num[1]==='ohio house'?'house':'congress'):currentDistrictLayer;
  const matches=Object.entries(CURRENT_OFFICIALS).flatMap(([key,list])=>Object.entries(list).filter(([n,o])=>num?key===layer&&Number(n)===Number(num[2]):q.split(/\s+/).every(t=>o.name.toLocaleLowerCase().includes(t))).map(([n,o])=>({key,n:Number(n),o})));
  $('#repSearchStatus').textContent=matches.length?`${matches.length} ${matches.length===1?'match':'matches'}. Select to highlight the district.`:'No matches. Try a surname or a district number.';
  matches.forEach(({key,n,o})=>{const b=document.createElement('button');b.type='button';b.className='rep-result';b.innerHTML=`<b>${esc(o.name)}</b><span>${labels[key]} · District ${n}</span>`;b.onclick=()=>{loadDistrictLayer(key);selectDistrict(n);const shape=$('.district-shape.selected');shape?.focus({preventScroll:true});$('#repSearchStatus').textContent=`Selected ${labels[key]} District ${n}: ${o.name}.`;};results.append(b);});
 }
 $('#representativeSearch').onsubmit=e=>{e.preventDefault();search();};$('#repQuery').oninput=search;
 const oldLoad=loadDistrictLayer;loadDistrictLayer=function(key){oldLoad(key);if($('#repQuery').value.trim())search();};
 
})();