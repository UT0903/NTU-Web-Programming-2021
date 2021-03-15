var linkk=["https://i.insider.com/5e9f4f1c38bf2321286a37c9?width=1100&format=jpeg&auto=webp","https://www.thespruceeats.com/thmb/4QUIYqDCxzubLJmYFDwgr9GgBBk=/1333x1000/smart/filters:no_upscale()/terris-crispy-fried-chicken-legs-3056879-10_preview-5b05ec40a474be00362260d7.jpeg","https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/master/pass/Smashburger-recipe-120219.jpg"]
var button_class = document.getElementsByClassName('image-viewer__button')
var previous_button =  document.getElementById("previous")
var next_button =  document.getElementById("next")
var main_img = document.getElementById('display')
var src_link = document.getElementById('source_ref')

main_img.src = linkk[0];
src_link.href = linkk[0];
src_link.innerHTML = linkk[0];
previous_button.onclick = previousImage;
next_button.onclick = nextImage;
previous_button.classList.add("disabled") ;
var image_seq = 0;

function previousImage(){
	image_seq = image_seq - 1;
	if(image_seq<0){
		image_seq = 0;
	}
	else if(image_seq === 0){
		previous_button.classList.add("disabled") ;
	}
	else if(image_seq<2){
		next_button.classList.remove("disabled");
	}
	main_img.src = linkk[image_seq];
	src_link.href = linkk[image_seq];
	src_link.innerHTML = linkk[image_seq];
	console.log("previous clicked");
}
function nextImage(){
	image_seq = image_seq + 1;
	if(image_seq>2){
		image_seq = 2;
	}
	else if(image_seq === 2){
		next_button.classList.add("disabled") ;
	}
	else if(image_seq > 0){
		previous_button.classList.remove("disabled");
	}
	main_img.src = linkk[image_seq];
	src_link.href = linkk[image_seq];
	src_link.innerHTML = linkk[image_seq];
}