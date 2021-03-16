var cancel_button = document.getElementById("cancel-button")
var comment_button = document.getElementById("comment-button")
var comment_input = document.getElementById("comment-input")
var comment_group = document.getElementById("comment-group")
var comment_num = document.getElementById("comment-num")
let count = 1
comment_input.addEventListener('input', (event) => {
  
  if(comment_input.value.trim() != ''){
  	comment_button.style["background-color"] = "#065fd4"
  	comment_button.disabled = false;
  }
  else{
  	comment_button.style["background-color"] = "#cccccc"
  	comment_button.disabled = true;
  }

});
const front_string = "<div class=\"comment\"> \
	                        <img class=\"comment-img\" src=\"images/user-icon.jpg\"/> \
                        <div class=\"comment-right\"> \
                            <div> \
                                <span class=\"comment-name\">Toby Chen</span> \
                                <span class=\"comment-time\">現在</span> \
                            </div> \
                            <p class=\"comment-text\">"
const back_string = "</p> </div> </div>"                            
comment_button.addEventListener('click', (event) => {
	//console.log('comment')
	comment_group.innerHTML += front_string + comment_input.value.trim() + back_string
	count ++
	comment_num.innerHTML = count + "則留言"
	comment_input.value = ''
	comment_button.style["background-color"] = "#cccccc"
});

comment_input.addEventListener('focusin', (event) => {
  cancel_button.style["display"] = "block"
  comment_button.style["display"] = "block"

});
cancel_button.addEventListener('click', (event) => {
  comment_input.value = ''
  cancel_button.style["display"] = "none"
  comment_button.style["display"] = "none"
});