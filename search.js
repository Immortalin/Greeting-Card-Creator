$('#photoSearch').on('keypress', (e) => {
    if (e.which == 13) {
        document.getElementById('photosDisplay').innerHTML = ""
        searchPicture()
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

function nextPage(nextPageUrl){
    $.ajax({
        url: nextPageUrl,
        headers: {
            "Authorization": "563492ad6f9170000100000172ef63d0155144725a94b9b7b795b842"
        },
        success: (data) => {
            document.getElementById('photosDisplay').removeChild(document.getElementById('photosDisplay').lastChild)
            infiniteScrollImages(data)
        }
    })
}

// Next page boolean checks if it is necessary to clear the search results div
// If it is true, then it would just append to existing data
function infiniteScrollImages(images) {
    for (pix in images.photos){
        // let pixNode = document.createElement('img')
        let pixNode = document.createElement('div')
        let pixNodeImg = document.createElement('img')
        let pixNodeOverlay = document.createElement('div')
        let pixNodeText = document.createElement('a')
        // let pixNode = document.createElement('option')
        // pixNode.setAttribute('data-img-src', images.photos[pix].src.small)
        // pixNode.src = images.photos[pix].src.small
        pixNodeImg.src = images.photos[pix].src.small
        pixNodeImg.className = "card-img"
        pixNode.className = "card"
        pixNodeOverlay.className = "card-img-overlay"
        // pixNode.className = "img-thumbnail"
        pixNodeText.href = window.location.href + "miniPaint/index.html?input_image_url=" + images.photos[pix].src.original
        pixNodeText.textContent = "Use this"
        pixNodeText.className = "card-title"
        pixNodeOverlay.appendChild(pixNodeText)
        pixNode.appendChild(pixNodeImg)
        pixNode.appendChild(pixNodeOverlay)
        document.getElementById('photosDisplay').appendChild(pixNode)
        // https://masonry.desandro.com/#getting-started
        // const masonry = new Masonry('grid', {
        //     itemSelector: '.grid-pix',

        // })
    }
    console.log(images)
    if (images.photos.length > 0 && images.next_page != undefined){
        let nextPageBtn = document.createElement("button") 
        nextPageBtn.innerHTML = "More Photos"
        let onClickContent = "nextPage(\"" + images.next_page + "\")"
        nextPageBtn.setAttribute("onclick", onClickContent) 
        document.getElementById('photosDisplay').appendChild(nextPageBtn)
    }
    // $("select[name='image-selector']").imagepicker()
}
