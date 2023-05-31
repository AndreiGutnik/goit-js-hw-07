import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);
const galleryContainer = document.querySelector("ul.gallery");
const gallaryItemMarkup = createGallaryItemMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", gallaryItemMarkup);

galleryContainer.addEventListener("click", ongalleryContainerClick);

function createGallaryItemMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
			return `
			<li class="gallery__item">
				<a class="gallery__link" href="${original}">
				<img class="gallery__image" src="${preview}" alt="${description}"/>
				</a>
			</li>
			`;
			})
    .join("");
}

function ongalleryContainerClick(evt) {
  //console.log(evt.target)
	// Canceling standard actions
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  // Open the gallary
  const gallery = new SimpleLightbox(".gallery__item a", {
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
	}); 
	
  // Close the gallary
  galleryContainer.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
			gallery.refresh();
    }
	});
	gallery.on("closed.simplelightbox", () => {
    gallery.refresh();
  });  
}














