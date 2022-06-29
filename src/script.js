let isLeftDragging = false;
let dragbarWidth = 6;
let page = document.getElementById("page");

window.ResetColumnSizes = function ResetColumnSizes() {
  page.style.gridTemplateColumns = "auto 6px auto auto";
}

window.SetCursor = function SetCursor(cursor) {
  page.style.cursor = cursor;
}

window.StartDrag = function StartDrag() {
  isLeftDragging = true;

  SetCursor("ew-resize");
}

window.EndDrag = function EndDrag() {
  isLeftDragging = false;

  SetCursor("auto");
}

window.OnDrag = function OnDrag(event) {
  if (isLeftDragging) {
    let cols = [
      event.clientX,
      dragbarWidth,
      page.clientWidth - 2 * dragbarWidth - event.clientX,
      "auto"
    ];

    page.style.gridTemplateColumns = cols.map((c) => c.toString() === "auto" ? c.toString() : c.toString() + "px").join(" ");

    event.preventDefault();
  }
}
