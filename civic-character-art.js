/* OH! Civics character system: detailed illustrated people with expressive states.
   No external artwork, identity data, or image requests. */
(function (root) {
  'use strict';
  var palettes = [
    {skin:'#B66F50', shadow:'#95523D', hair:'#30242A', coat:'#3B6774', coatShade:'#244553', trim:'#E7D5AD'},
    {skin:'#80513E', shadow:'#623A2F', hair:'#161A24', coat:'#8A546C', coatShade:'#633B53', trim:'#E8C6C0'},
    {skin:'#D8A77D', shadow:'#B87C5C', hair:'#53403A', coat:'#6C7855', coatShade:'#495B46', trim:'#E9CF94'},
    {skin:'#A86E56', shadow:'#8B4D3D', hair:'#292329', coat:'#66598C', coatShade:'#494268', trim:'#DCC8ED'},
    {skin:'#E0B18E', shadow:'#BC8468', hair:'#4E3434', coat:'#4F697D', coatShade:'#334957', trim:'#BED9E4'},
    {skin:'#935D46', shadow:'#704333', hair:'#262124', coat:'#98764A', coatShade:'#6A503C', trim:'#F1D8AD'},
    {skin:'#C58C67', shadow:'#9C664E', hair:'#423038', coat:'#577B66', coatShade:'#385547', trim:'#CDE0CF'}
  ];
  function inner(index, mood, pose, role) {
    var n=((Number(index)||0)%palettes.length+palettes.length)%palettes.length;
    var p=palettes[n], active=pose==='speak'||pose==='point', smiles=mood==='happy';
    var eyebrow = mood==='concerned' ? 'M31 36q7-5 13-2M57 34q8-3 13 2'
      : mood==='serious' ? 'M31 33h13M57 33h13'
      : 'M30 34q7-3 14 0M57 34q7-3 14 0';
    var mouth = mood==='concerned' ? 'M43 61q7-6 15 0'
      : smiles ? 'M41 58q9 10 18 0' : 'M42 60q8 4 16 0';
    var styles=[
      '<path d="M26 32Q16 7 46 6Q78 7 75 36L67 22Q50 33 26 32" fill="'+p.hair+'"/>',
      '<path d="M24 33Q17 4 50 7Q75 7 76 31L67 18Q48 30 24 33" fill="'+p.hair+'"/><circle cx="73" cy="20" r="12" fill="'+p.hair+'"/>',
      '<path d="M25 34Q13 16 28 7Q38 0 49 5Q72-1 77 26L71 37Q59 16 48 18Q34 30 25 34" fill="'+p.hair+'"/><circle cx="29" cy="11" r="8" fill="'+p.hair+'"/><circle cx="46" cy="7" r="10" fill="'+p.hair+'"/><circle cx="64" cy="10" r="8" fill="'+p.hair+'"/>',
      '<path d="M25 36Q13 8 40 4Q66-1 76 30L66 16Q50 31 25 36" fill="'+p.hair+'"/><path d="M25 28q-13 30-4 48h10l3-45M72 27q15 31 5 50h-10l-5-42" fill="'+p.hair+'"/>',
      '<path d="M25 29Q21 7 48 9Q69 9 73 29L68 23Q50 30 25 29" fill="'+p.hair+'"/><path d="M29 16L73 20" stroke="'+p.shadow+'" stroke-opacity=".32" stroke-width="3"/>',
      '<path d="M25 31Q14 6 42 5Q71 0 76 29Q64 14 48 16Q35 15 25 31" fill="'+p.hair+'"/><path d="M25 24Q17 44 28 57" stroke="'+p.hair+'" stroke-width="9"/>',
      '<path d="M25 30Q15 9 43 6Q72 4 77 32L65 22Q51 34 25 30" fill="'+p.hair+'"/><path d="M34 11Q48 6 64 16" stroke="#fff" stroke-opacity=".12" stroke-width="4" fill="none"/>'
    ];
    var accessory=role==='doctor' ?
      '<path d="M40 83Q28 102 40 104M60 83Q70 98 59 105" stroke="#b7dadc" stroke-width="3.5" fill="none"/><circle cx="59" cy="106" r="5" fill="#d5e8e7" stroke="#618b91" stroke-width="2"/>'
      : role==='ems' ? '<path d="M17 93h25M58 93h25" stroke="#F2D17B" stroke-width="5"/><path d="M49 82v14M42 89h14" stroke="#eff9ef" stroke-width="3"/>'
      : role==='auditor'||role==='analyst' ? '<path d="M30 38h17M54 38h17" stroke="#463e42" stroke-width="2"/><rect x="28" y="36" width="20" height="12" rx="4" fill="none" stroke="#424046" stroke-width="2"/><rect x="53" y="36" width="20" height="12" rx="4" fill="none" stroke="#424046" stroke-width="2"/>'
      : role==='arts' ? '<path d="M29 94q22 12 42-2" fill="none" stroke="#edbcaa" stroke-width="5"/><circle cx="63" cy="102" r="4" fill="#e9c77f"/>'
      : role==='member'||role==='chair' ? '<path d="M46 86l4-6 4 6-4 21z" fill="#d4cfe4"/><circle cx="68" cy="88" r="4" fill="#ecce81"/>'
      : '<path d="M41 87h18" stroke="'+p.trim+'" stroke-width="4"/>';
    var armLeft = '<path class="civic-arm-left" d="M28 81Q11 84 9 110L25 111Q30 100 40 96" fill="'+p.coatShade+'" stroke="'+p.coatShade+'" stroke-width="2"/>';
    var armRight = pose==='point' ?
      '<g class="civic-arm-right"><path d="M73 82Q87 76 92 55L100 62Q99 89 82 108" fill="'+p.coatShade+'"/><path d="M92 55l4-14 5 1-1 22" fill="'+p.skin+'"/></g>'
      : pose==='speak' ?
      '<g class="civic-arm-right"><path d="M71 83Q86 83 91 63L100 70Q98 98 81 110" fill="'+p.coatShade+'"/><path d="M91 63l-4-8 3-7 6 7 6 9-2 10" fill="'+p.skin+'"/></g>'
      : '<g class="civic-arm-right"><path d="M72 81Q90 87 91 109L77 111Q69 99 60 96" fill="'+p.coatShade+'"/></g>';
    return '<g class="civic-person mood-'+mood+' pose-'+pose+'" data-role="'+role+'">'+
       '<ellipse cx="50" cy="111" rx="42" ry="5" fill="#07070d" opacity=".2"/>'+
       '<g class="civic-body">'+
         '<path d="M15 113Q11 76 38 74L50 86 62 74Q89 76 85 113Z" fill="'+p.coat+'" stroke="'+p.coatShade+'" stroke-width="2"/>'+
         '<path d="M39 75l11 17 11-17" fill="#f9f3e9"/><path d="M43 76l7 10 7-10-7 31z" fill="'+p.trim+'" opacity=".88"/>'+
         '<path d="M36 82l-12 13 21 16M64 82l12 13-21 16" fill="none" stroke="'+p.coatShade+'" stroke-width="3" opacity=".7"/>'+
         armLeft+armRight+accessory+
       '</g>'+
       '<g class="civic-neck"><path d="M40 66h20v18q-10 11-20 0z" fill="'+p.skin+'"/><path d="M40 74q10 8 20 0" stroke="'+p.shadow+'" stroke-width="3" opacity=".3"/></g>'+
       '<g class="civic-head">'+
         '<path d="M27 41Q24 18 50 17Q76 19 73 43L72 52Q66 74 50 75Q33 73 28 53Z" fill="'+p.skin+'"/>'+
         '<path d="M29 52q7 15 19 18q-18-2-21-23" fill="'+p.shadow+'" opacity=".18"/>'+
         '<ellipse cx="27" cy="49" rx="5.5" ry="8" fill="'+p.skin+'"/><ellipse cx="73" cy="49" rx="5.5" ry="8" fill="'+p.skin+'"/>'+
         '<path d="M27 35q2-25 23-26q23 0 24 24" fill="none" stroke="'+p.hair+'" stroke-width="5" opacity=".5"/>'+styles[n]+
         '<path d="'+eyebrow+'" stroke="'+p.hair+'" stroke-width="2.3" fill="none" stroke-linecap="round"/>'+
         '<g class="civic-eyes"><ellipse cx="38" cy="45" rx="2.7" ry="3.2" fill="#281f23"/><ellipse cx="62" cy="45" rx="2.7" ry="3.2" fill="#281f23"/><circle cx="39" cy="44" r=".8" fill="#fff"/><circle cx="63" cy="44" r=".8" fill="#fff"/></g>'+
         '<path d="M49 46q-2 7 1 11h4" fill="none" stroke="'+p.shadow+'" stroke-opacity=".55" stroke-width="1.7" stroke-linecap="round"/>'+
         '<g class="civic-mouth"><path d="'+mouth+'" stroke="'+p.shadow+'" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>'+
         '<path d="M32 55q5 4 10 2M58 57q5 2 10-2" fill="none" stroke="'+p.shadow+'" stroke-opacity=".15" stroke-width="2"/>'+
       '</g></g>';
  }
  function portrait(index, options) {
    var o=options||{},mood=o.mood||'neutral',pose=o.pose||'listen',role=o.role||'citizen';
    return '<svg class="play-avatar civic-portrait" viewBox="0 0 105 117" aria-hidden="true" focusable="false">'+inner(index,mood,pose,role)+'</svg>';
  }
  function scene(x, y, index, options) {
    var o=options||{},mood=o.mood||'neutral',pose=o.pose||'listen',role=o.role||'citizen';
    // Keep fixed placement separate from the animated inner group to prevent SVG transform overrides.
    return '<g transform="translate('+(Number(x)-50)+' '+(Number(y)-32)+') scale(.93)"><g class="scene-character '+(o.className||'')+'">'+inner(index,mood,pose,role)+'</g></g>';
  }
  root.OHCharacterArt={portrait:portrait,scene:scene};
})(window);
