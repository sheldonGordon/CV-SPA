let isLeftDragging = false;
let isBottomDragging = false;
let dragbarWidth = 6;
let page = document.getElementById("page");

window.ResetColumnSizes = function ResetColumnSizes() {
  page.style.gridTemplateColumns = "auto 6px auto auto";
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
