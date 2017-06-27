$('#photoSearch').on('keypress', (e) => {
    if (e.which == 13) {
        searchPicture();
    }
})
function searchPicture(){
    // 563492ad6f9170000100000172ef63d0155144725a94b9b7b795b842 
    $.ajax({
        url: "http://api.pexels.com/v1/search?query=" + document.getElementById('photoSearch').value + "&per_page=15&page=1",
        headers: {
            "Authorization": "563492ad6f9170000100000172ef63d0155144725a94b9b7b795b842"
        },
        success: (data) => infiniteScrollImages(data)
    })
}

function infiniteScrollImages(images) {
    for (pix in images.photos){
        let pixNode = document.createElement('img').setAttribute("src", images.photos[pix].src.original)
        document.getElementById('photosDisplay').appendChild(pixNode)
    }
}