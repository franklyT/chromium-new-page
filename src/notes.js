onDOMLoad(moveInit('#notesTray', '#notesTray'));

onDOMLoad(
  chrome.storage.sync.get('notes', (items) => {
    select('#notesInput').value = items.notes;
  }),
);

onDOMLoad(
  select('#notes').addEventListener('click', () => {
    select('#notesTray').classList.toggle('notes__overlay--hidden');
    if (!select('#notesTray').classList.contains('notes__overlay--hidden')) {
      chrome.storage.sync.set(
        {
          notesOn: true,
        },
        () => {},
      );
    } else {
      chrome.storage.sync.set(
        {
          notesOn: false,
        },
        () => {},
      );
    }
  }),
);

onDOMLoad(
  select('#notesCancel').addEventListener('click', () => {
    select('#notesTray').classList.toggle('notes__overlay--hidden');
    if (!select('#notesTray').classList.contains('notes__overlay--hidden')) {
      chrome.storage.sync.set(
        {
          notesOn: true,
        },
        () => {},
      );
    } else {
      chrome.storage.sync.set(
        {
          notesOn: false,
        },
        () => {},
      );
    }
  }),
);

onDOMLoad(
  chrome.storage.sync.get('notesXY', (items) => {
    select('#notesTray').style.left = items.notesXY[0];
    select('#notesTray').style.top = items.notesXY[1];
    // Reset lost notes tray
    if (!isInViewport(select('#notesTray'))) {
      select('#notesTray').style.left = 0;
      select('#notesTray').style.top = 0;
    }
  }),
);

onDOMLoad(
  chrome.storage.sync.get('notesOn', (items) => {
    if (items.notesOn) {
      select('#notesTray').classList.toggle('notes__overlay--hidden');
    }
  }),
);

onDOMLoad(
  select('#notes').addEventListener(
    'contextmenu',
    (ev) => {
      ev.preventDefault();
      const resetNotes = confirm('Reset notes position?');
      if (resetNotes) {
        select('#notesTray').style.left = 0;
        select('#notesTray').style.top = 0;
        if (select('#notesTray').classList.contains('notes__overlay--hidden')) {
          select('#notesTray').classList.toggle('notes__overlay--hidden');
        }
      }
      return false;
    },
    false,
  ),
);

onDOMLoad(
  select('#notesTray').addEventListener('keyup', () => {
    chrome.storage.sync.set({ notes: select('#notesInput').value }, () => {});
  }),
);

// Make the DIV element draggable:
function moveInit(dragHandle, dragTarget) {
  let dragObj = null; // object to be moved
  let xOffset = 0; // used to prevent dragged object jumping to mouse location
  let yOffset = 0;

  document.querySelector(dragHandle).addEventListener('mousedown', startDrag, true);
  document.querySelector(dragHandle).addEventListener('touchstart', startDrag, { passive: true });

  /* sets offset parameters and starts listening for mouse-move */
  function startDrag(e) {
    if (e.target === select('#notesInput')) {
      return;
    }
    if (e.target === select('#notesCancel')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    dragObj = document.querySelector(dragTarget);
    dragObj.style.position = 'absolute';
    const rect = dragObj.getBoundingClientRect();

    if (e.type === 'mousedown') {
      xOffset = e.clientX - rect.left;
      // clientX+getBoundingClientRect() use viewable area adjusted when scrolling aka 'viewport'
      yOffset = e.clientY - rect.top;
      window.addEventListener('mousemove', dragObject, true);
    } else if (e.type === 'touchstart') {
      xOffset = e.targetTouches[0].clientX - rect.left;
      yOffset = e.targetTouches[0].clientY - rect.top;
      window.addEventListener('touchmove', dragObject, true);
    }
  }

  /* Drag object */
  function dragObject(e) {
    e.preventDefault();
    e.stopPropagation();
    if (dragObj == null) {
      // if there is no object being dragged then do nothing
    } else if (e.type === 'mousemove') {
      dragObj.style.left = `${e.clientX - xOffset}px`; // adjust location of dragged object so doesn't jump to mouse position
      dragObj.style.top = `${e.clientY - yOffset}px`;
    } else if (e.type === 'touchmove') {
      dragObj.style.left = `${e.targetTouches[0].clientX - xOffset}px`; // adjust location of dragged object so doesn't jump to mouse position
      dragObj.style.top = `${e.targetTouches[0].clientY - yOffset}px`;
    }
  }

  /* End dragging */
  document.onmouseup = function () {
    if (dragObj) {
      chrome.storage.sync.set(
        {
          notesXY: [`${select('#notesTray').style.left}`, `${select('#notesTray').style.top}`],
        },
        () => {},
      );
      dragObj = null;
      window.removeEventListener('mousemove', dragObject, true);
      window.removeEventListener('touchmove', dragObject, true);
    }
  };
}
