mapboxgl.accessToken = 'pk.eyJ1IjoibG8tbW8iLCJhIjoiY2wzeDRrZ2x6MGQ1ZDNsbzR1enRxamVqdiJ9.iqDK6QB33KchsIknZ84h9A';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


const marker1 = new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
)
.addTo(map);
