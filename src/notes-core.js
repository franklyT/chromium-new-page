onDOMLoad(
  chrome.storage.sync.get("notes", function(items) {
    select("#notesInput").value = items.notes;
  })
);

onDOMLoad(
  select("#notes").addEventListener("click", () => {
    select("#notesTray").classList.toggle("notes__overlay--hidden");
  })
);

onDOMLoad(
  document.body.addEventListener("click", () => {
    if (
    // This condition fixes de-selection when drag-to-highlight escapes the tray
    ( getSelectedText() === "" ||
      !select("#notesInput").value.includes(getSelectedText()) ) &&
      
      event.target !== select("#notes") &&
      event.target !== select("#notesTray") &&
      !select("#notesTray").contains(event.target) &&
      !select("#notesTray").classList.contains("notes__overlay--hidden")
    ) {
      select("#notesTray").classList.toggle("notes__overlay--hidden");
    }
  })
);

onDOMLoad(
  select("#notesTray").addEventListener("keydown", () => {
    chrome.storage.sync.set(
      { notes: select("#notesInput").value },
      function() {}
    );
  })
);
