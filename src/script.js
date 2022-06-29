let isLeftDragging = false;

window.ResetColumnSizes = function ResetColumnSizes() {
  // when page resizes return to default col sizes
  let page = document.getElementById("page");
  page.style.gridTemplateColumns = "auto 6px auto auto";
}

window.SetCursor = function SetCursor(cursor) {
  let page = document.getElementById("page");
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
    let page = document.getElementById("page");
    let leftcol = document.getElementById("explorer");

    let leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;

    let dragbarWidth = 6;

    let cols = [
      leftColWidth,
      dragbarWidth,
      page.clientWidth - 2 * dragbarWidth - leftColWidth,
      "auto"
    ];

    let newColDefn = cols.map((c) => c.toString() === "auto" ? c.toString() : c.toString() + "px").join(" ");

    page.style.gridTemplateColumns = newColDefn;

    event.preventDefault();
  }
}
