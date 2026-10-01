/* Original vector symbols, each tied to a different civic task. */
(()=>{
const building=window.civicGlyph;
window.civicGlyph=(kind=0)=>{if(kind===0)return building(0);const art=[
'',
'<path d="M24 60H154" stroke="#92bfb9" stroke-width="5"/>'+[20,74,128].map((x,i)=>'<rect x="'+x+'" y="30" width="34" height="56" rx="5" fill="#e9e6d9"/><path d="M'+(x+8)+' 46h18m-18 12h18m-18 12h10" stroke="#527b92" stroke-width="3"/><circle cx="'+(x+17)+'" cy="99" r="7" fill="'+['#64cbb4','#92b8ed','#dfb95e'][i]+'"/>').join(''),
'<path d="M18 94H162V108H18Z" fill="#bba47b"/><rect x="77" y="18" width="26" height="53" rx="13" fill="#90ccc3"/><path d="M67 48v9a23 23 0 0 0 46 0v-9M90 80v14M72 94h36" fill="none" stroke="#e7cd89" stroke-width="5"/><path d="M37 38q-15 17 0 34M143 38q15 17 0 34" fill="none" stroke="#527b92" stroke-width="4"/>',
'<rect x="39" y="12" width="95" height="100" rx="5" fill="#eee9dd"/><path d="M55 33h61m-61 15h61m-61 15h50m-50 15h40m-40 15h56" stroke="#8098aa" stroke-width="4"/><path d="M51 63h63M51 69h63" stroke="#bc6079" stroke-width="3"/><path d="M114 91l27-49 10 6-27 49-12 8Z" fill="#daa667"/>',
'<rect x="24" y="17" width="91" height="92" rx="5" fill="#e9e6da"/><path d="M40 35h60m-60 15h44m-44 15h55m-55 15h40" stroke="#527b92" stroke-width="4"/><circle cx="116" cy="66" r="27" fill="#153a50" stroke="#91c7bc" stroke-width="7"/><path d="M135 86l26 25" stroke="#91c7bc" stroke-width="9"/><path d="M102 66l9 9 19-21" fill="none" stroke="#dfb95e" stroke-width="5"/>'
][kind%5];return '<svg viewBox="0 0 180 120" aria-hidden="true">'+art+'</svg>'};
if(document.querySelector('.system-panel')){
 document.querySelector('.system-panel').innerHTML='<small>Learn → practice → participate</small><h3>Follow the work of lawmaking.</h3><div class="home-workflow">'+[[0,'Understand','Institutions & records'],[2,'Question','Testimony → amendment'],[3,'Draft','Goal → workable rules']].map(([i,t,s])=>'<div>'+civicGlyph(i)+'<strong>'+t+'</strong><span>'+s+'</span></div>').join('')+'</div>';
 document.querySelectorAll('.path-card .icon').forEach((el,i)=>el.innerHTML=civicGlyph([0,2,3][i]));
 document.querySelector('.path-heading h2').textContent='Choose your next step.';document.querySelector('.path-heading p').remove();
 const ps=['Explore institutions, follow a bill, and verify official records.','Hear evidence, examine amendments, and decide the committee’s next action.','Draft four clauses, resolve an ambiguity, and test implementation.'];document.querySelectorAll('.path-card p').forEach((el,i)=>el.textContent=ps[i]);
}
if(document.querySelector('#deepModal')){
 document.querySelectorAll('.avatar,.intro-avatar,.coach-character').forEach(el=>el.innerHTML=civicGlyph(4));
 document.addEventListener('keydown',e=>{const modal=document.getElementById('deepModal');if(!modal.classList.contains('show'))return;if(['ArrowRight','ArrowLeft','Escape','Tab'].includes(e.key)){e.stopImmediatePropagation();if(e.key==='Escape'){closeDeep();document.querySelector('#deepOpen')?.focus()}if(e.key==='ArrowRight')document.getElementById('deepContinue').click();if(e.key==='ArrowLeft')document.getElementById('deepPrev').click();if(e.key==='Tab'){const els=[...modal.querySelectorAll('button:not(:disabled)')];let n=els.indexOf(document.activeElement)+(e.shiftKey?-1:1);els[(n+els.length)%els.length].focus()}e.preventDefault()}},true);
}
})();
