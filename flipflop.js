var S3fTileProto = Object.create(HTMLElement.prototype);

S3fTileProto.spin = function() {
	// Initiate a spin when it is spinning does not look right.	
	if(this.isSpinning == true) return;
	this.isSpinning = true;

	var $element = $(this.shadowRoot).find("div");
	var $img = $(this.shadowRoot).find("img");
	
	var showFront = function() { $img.attr("src", this.attr("back-image")); }.bind($(this));
	var showBack = function() { $img.attr("src", "texture.png"); };

	TweenLite.set($element, {transformPerspective:500});
	new TimelineLite()
		.fromTo($element, 1, {rotationY: "0deg"}, { rotationY: "90deg", ease: Power1.easeIn, onComplete: showFront })
		.to($element, 1, { rotationY: "180deg", ease: Power1.easeOut })
		.to($element, 1, { rotationY: "270deg", ease: Power1.easeIn, onComplete: showBack })
		.to($element, 1, { rotationY: "360deg", ease: Power1.easeOut, onComplete: function() { this.isSpinning = false }.bind(this) })
		.play();
};

S3fTileProto.createdCallback = function() {
	this.addEventListener('click', this.spin);

	var clone = document.importNode($('#tile')[0].content, true);
	this.createShadowRoot().appendChild(clone);
}

document.registerElement("s3f-tile", { prototype: S3fTileProto });
