function findLocation(x,y) {
  for (var i=0; i< places.length;i++) {
    if (places[i].location[0]==x && places[i].location[1]==y) {
      return i;
    }
  }
  return -1;
}

function showLocation(e) {
  let ix= findLocation(e.latlng.lat,e.latlng.lng);
  if (ix >=0) {
    img.src= places[ix].picture;
    par.textContent=places[ix].review;
  }
}

(async function (){
  const URL="https://dwisulfahnur-bce1c.firebaseapp.com/project4/data/maps.json";
  try {
    let resp= await(fetch(URL));
    let resp2= await resp.json();
    localStorage.setItem('places',
    JSON.stringify(resp2.places));//
  }
  catch(err){
    console.log(err);
  }
})( ); // <--- IIFE

let gmb= document.getElementById("gmb");
let rev= document.getElementById("review");
let img= document.createElement('img');
let par= document.createElement('p');

gmb.appendChild(img);
rev.appendChild(par);

let places = JSON.parse(localStorage.getItem('places'));

for (var p of places) {
  var marker= L.marker(p.location).addTo(mymap)
  .bindPopup(p.sponsor);
  marker.on('click', showLocation);
}
