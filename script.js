const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let readyToLoadMoreImages = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
apiKey = "APb39TD6r31tWel4oszoq4JyxG67-wa9v5EGAfF1IHo"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log('imageLoaded');
    if (imagesLoaded === totalImages) {
        readyToLoadMoreImages = true;
        loader.hidden = true;
        // console.log('ready =', readyToLoadMoreImages);
    }
}

// DRY - Don't repeat yourself. alternative way to make to code shorter

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}


// Create Elements For Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Creat <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Creat <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        //Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoadMoreImages) {
        readyToLoadMoreImages = false;
        getPhotos();
    }
})

// On Load
getPhotos()