// Smooth Scroll
$("#view-work").on("click", function () {
	const images = $("#images").position().top;
	$("html, body").animate(
		{
			scrollTop: images,
		},
		900
	);
});
// Text Writer
class TypeWriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = "";
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}
	type() {
		// Current Index Of Word
		const current = this.wordIndex % this.words.length;
		// Get Full Text Of Current Word
		const fullTxt = this.words[current];
		// Check If Deleting
		if (this.isDeleting) {
			// Remove Character
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			// Add Character
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		// Insert Text Into Element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
		// Initial Type Speed
		let typeSpeed = 300;
		if (this.isDeleting) {
			typeSpeed /= 2;
		}
		// If Word Is Complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// Pause At End
			typeSpeed = this.wait;
			// Set Delete To True
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			// Move To Next Word
			this.wordIndex++;
			// Pause Before Start Typing
			typeSpeed = 500;
		}
		setTimeout(() => this.type(), typeSpeed);
	}
}
// Initialize On DOM Load
document.addEventListener("DOMContentLoaded", init);
// Initilalize App
function init() {
	const txtElement = document.querySelector(".txt-type");
	const words = JSON.parse(txtElement.getAttribute("data-words"));
	const wait = txtElement.getAttribute("data-wait");
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}
