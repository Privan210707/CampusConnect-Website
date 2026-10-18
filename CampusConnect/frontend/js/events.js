document.addEventListener("DOMContentLoaded", function () {
  var events = CampusConnect.SAMPLE_DATA.events.slice().sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });
  var grid = document.getElementById("event-grid");
  var modal = document.getElementById("register-modal");
  var form = document.getElementById("register-form");
  var status = document.getElementById("register-status");
  var eventTitle = document.getElementById("register-event-title");
  var eventIdInput = document.getElementById("register-event-id");
  var selectedEventId = null;

  CampusConnect.initModal(modal);

  grid.innerHTML = events
    .map(function (event) {
      return (
        '<article class="card">' +
        '<div class="card-media" style="background:' +
        CampusConnect.mediaGradient(event.id) +
        '">' +
        CampusConnect.formatDate(event.date) +
        "</div>" +
        '<div class="card-body">' +
        "<h3>" +
        CampusConnect.escapeHtml(event.title) +
        "</h3>" +
        '<p class="meta">' +
        CampusConnect.escapeHtml(event.venue) +
        " · " +
        CampusConnect.escapeHtml(event.time) +
        "</p>" +
        "<p>" +
        CampusConnect.escapeHtml(event.description) +
        "</p>" +
        '<div class="card-actions">' +
        '<button type="button" class="btn btn-navy" data-register="' +
        event.id +
        '">Register</button>' +
        "</div></div></article>"
      );
    })
    .join("");

  grid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-register]");
    if (!button) {
      return;
    }
    selectedEventId = Number(button.getAttribute("data-register"));
    var item = events.find(function (row) {
      return row.id === selectedEventId;
    });
    eventTitle.textContent = item ? item.title : "Event";
    eventIdInput.value = String(selectedEventId);
    form.reset();
    CampusConnect.clearFieldErrors(form);
    status.textContent = "";
    status.className = "form-status";
    CampusConnect.openModal(modal);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    CampusConnect.clearFieldErrors(form);
    status.textContent = "";
    status.className = "form-status";

    if (!CampusConnect.validateRequired(form, ["name", "email"])) {
      status.textContent = "Please fix the highlighted fields.";
      status.className = "form-status error";
      return;
    }

    /* Temporary client-only confirmation. Not saved to a database. */
    status.textContent =
      "Registration captured locally for preview only. It is not stored in PostgreSQL yet.";
    status.className = "form-status success";
    form.reset();
  });
});
