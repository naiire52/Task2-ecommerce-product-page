const lightboxContainer = document.querySelector('.lightbox-container');
const lightbox = document.querySelector('.lightbox');
const carouselImage = lightbox.querySelector('.carousel-image');
const thumbnails = document.querySelectorAll('.thumbnail img');

let currentImageIndex = 0;

// Array of image sources for the carousel
const carouselImages = [
  '1.jpg',
  '2.jpg',
  '2.jpg',
  '2.jpg',
  // Add more carousel image sources as needed
];

// Function to open the lightbox with a specific image index
function openLightbox(index) {
  currentImageIndex = index;
  const imageSrc = carouselImages[index];
  carouselImage.src = imageSrc;
  lightbox.style.display = 'block';
}
// Initialize the lightbox with the first thumbnail image
openLightbox(0);

// Attach click event listeners to thumbnails
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    openLightbox(index);
  });
});   


////////////////////////////////////////////////////////////////////////
///////////////JS FOR ACTIVE THUMBNAIL BORDER COLOR/////////////////////


function activateThumbnail(thumbnailIndex) {
    // Remove the active class from all thumbnails
    var thumbnails = document.getElementsByClassName("thumbnail");
    for (var i = 0; i < thumbnails.length; i++) {
      thumbnails[i].classList.remove("active");
    }
  
    // Add the active class to the clicked thumbnail
    thumbnails[thumbnailIndex - 0].classList.add("active");
  }



  ///////////////////////////////////////////////////////////////
  /////////////////JS FOR ORDER QUANTITY//////////////////////
  const decrementButton = document.getElementById('decrement');
        const incrementButton = document.getElementById('increment');
        const quantityElement = document.getElementById('quantity');

        let quantity = 0;

        decrementButton.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityElement.innerText = quantity;
            }
        });

        incrementButton.addEventListener('click', () => {
            quantity++;
            quantityElement.innerText = quantity;
        });

        // JavaScript for adding to cart (you can implement your cart logic here)
        const addToCartButton = document.getElementById('addToCart');
        const badge = document.getElementById('badge');

        addToCartButton.addEventListener('click', () => {
            // Add your cart logic here
            // alert(`Added ${quantity} item(s) to the cart.`);
            badge.innerHTML = `${quantity}`

        });
        