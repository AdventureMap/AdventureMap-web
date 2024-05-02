await ymaps3.ready;
const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapGeolocationControl,
    YMapControls,
} = ymaps3;
export async function initMap(theme: string) {
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [37.588144, 55.733842],
                zoom: 10
            },
        }
    )
    map.addChild(new YMapDefaultSchemeLayer({theme: theme}))
    const controls = new YMapControls();
    controls.addChild(new YMapGeolocationControl());
    map.addChild(controls)
    return map
}