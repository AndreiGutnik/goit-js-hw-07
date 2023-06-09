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
				<img
					class="gallery__image"
					src="${preview}"
					data-source="${original}"
					alt="${description}"
				/>
			</a>
		</li>
		`;
    })
    .join("");
}

function ongalleryContainerClick(evt) {
  // Canceling standard actions
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const originalImage = evt.target.dataset.source;
  // Open the gallary
  const instance = basicLightbox.create(`
    <img src="${originalImage}" width="800" height="600">
`);
	instance.show(() => {
		// Close the gallary
		galleryContainer.addEventListener("keydown", (evt) => {
			if (evt.code === "Escape") {
				instance.close(() => {
					galleryContainer.removeEventListener("keydown", () => {})
				});
			}
		});
	});
}
