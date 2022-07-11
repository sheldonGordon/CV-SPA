//############## DRAG ##############
let isLeftDragging = false;
let isBottomDragging = false;
let dragbarWidth = 6;
let page = document.getElementById("page");

window.ResetColumnSizes = function ResetColumnSizes() {
  page.style.gridTemplateColumns = "15em 6px auto auto";
  page.style.gridTemplateRows = "auto auto auto auto 6px auto";
};

function SetCursor(cursor) {
  page.style.cursor = cursor;
}

window.StartLeftDrag = function StartLeftDrag() {
  isLeftDragging = true;

  SetCursor("ew-resize");
};

window.StartBottomDrag = function StartBottomDrag() {
  isBottomDragging = true;

  SetCursor("ns-resize");
};

window.EndDrag = function EndDrag() {
  isLeftDragging = false;
  isBottomDragging = false;

  SetCursor("auto");
};

window.OnDrag = function OnDrag(event) {
  if (isLeftDragging) {
    let cols = [
      event.clientX,
      dragbarWidth,
      page.clientWidth - 2 * dragbarWidth - event.clientX,
      "auto"
    ];

    page.style.gridTemplateColumns = cols
      .map((c) =>
        c.toString() === "auto" ? c.toString() : c.toString() + "px"
      )
      .join(" ");

    event.preventDefault();
  }

  if (isBottomDragging) {
    let rows = [
      "auto",
      "auto",
      "auto",
      "auto",
      dragbarWidth,
      page.clientHeight - 2 * dragbarWidth - event.clientY
    ];

    page.style.gridTemplateRows = rows
      .map((c) =>
        c.toString() === "auto" ? c.toString() : c.toString() + "px"
      )
      .join(" ");

    event.preventDefault();
  }
};

//############## TREE ##############
let toggler = document.getElementsByClassName("arrow");

for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("arrow-down");
  });
}

//############## CLICK LIEN ##############
let link = document.getElementsByClassName("link");
let content_part = document.getElementsByClassName("content-part");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function (){
    for(let j = 0; j < content_part.length ; j++){
      if(content_part[j].getAttribute("id").toString() !== this.getAttribute("href").substring(1)){
        content_part[j].classList.remove("active");
        content_part[j].classList.add("nested");
      }else{
        content_part[j].classList.remove("nested");
        content_part[j].classList.add("active");
      }
    }
  })
}

//############## CLICK ONGLET ##############
let top_content_item = document.getElementsByClassName("top-content-item");

for(let i = 0; i < top_content_item.length; i++){
  top_content_item[i].addEventListener("click", function (){
    for(let j = 0; j < content_part.length ; j++){
      if(content_part[j].getAttribute("id").toString() !== this.innerHTML.toString().slice(0, -5)){
        content_part[j].classList.remove("active");
        content_part[j].classList.add("nested");
      }else{
        content_part[j].classList.remove("nested");
        content_part[j].classList.add("active");
      }
    }
  })
}