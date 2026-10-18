document.addEventListener("DOMContentLoaded", function () {
  var clubs = CampusConnect.SAMPLE_DATA.clubs;
  var grid = document.getElementById("club-grid");
  var search = document.getElementById("club-search");
  var filters = document.getElementById("club-filters");
  var count = document.getElementById("club-count");
  var modal = document.getElementById("club-modal");
  var modalBody = document.getElementById("club-modal-body");
  var activeCategory = "All";

  CampusConnect.initModal(modal);

  function renderFilters() {
    filters.innerHTML = CampusConnect.CLUB_CATEGORIES.map(function (category) {
      var pressed = category === activeCategory ? "true" : "false";
      return (
        '<button type="button" class="filter-btn" data-category="' +
        CampusConnect.escapeHtml(category) +
        '" aria-pressed="' +
        pressed +
        '">' +
        CampusConnect.escapeHtml(category) +
        "</button>"
      );
    }).join("");
  }

  function matches(club, query) {
    var haystack = (club.name + " " + club.short + " " + club.description).toLowerCase();
    var categoryOk = activeCategory === "All" || club.category === activeCategory;
    return categoryOk && haystack.indexOf(query) !== -1;
  }

  function renderClubs() {
    var query = (search.value || "").trim().toLowerCase();
    var visible = clubs.filter(function (club) {
      return matches(club, query);
    });

    count.textContent =
      visible.length === 1 ? "1 club shown" : visible.length + " clubs shown";

    if (!visible.length) {
      grid.innerHTML =
        '<p class="empty-state">No clubs match that search. Try another keyword or category.</p>';
      return;
    }

    grid.innerHTML = visible
      .map(function (club) {
        return (
          '<article class="card">' +
          '<div class="card-media" style="background:' +
          CampusConnect.mediaGradient(club.id) +
          '">' +
          CampusConnect.escapeHtml(club.name.slice(0, 2).toUpperCase()) +
          "</div>" +
          '<div class="card-body">' +
          '<span class="chip">' +
          CampusConnect.escapeHtml(club.category) +
          "</span>" +
          "<h3>" +
          CampusConnect.escapeHtml(club.name) +
          "</h3>" +
          "<p>" +
          CampusConnect.escapeHtml(club.short) +
          "</p>" +
          '<div class="card-actions">' +
          '<button type="button" class="btn btn-navy" data-club-id="' +
          club.id +
          '">View details</button>' +
          "</div></div></article>"
        );
      })
      .join("");
  }

  function showClub(id) {
    var club = clubs.find(function (item) {
      return item.id === id;
    });
    if (!club) {
      return;
    }
    modalBody.innerHTML =
      '<p class="chip">' +
      CampusConnect.escapeHtml(club.category) +
      "</p>" +
      "<p>" +
      CampusConnect.escapeHtml(club.description) +
      "</p>" +
      '<p class="meta"><strong>Meets:</strong> ' +
      CampusConnect.escapeHtml(club.meeting) +
      "</p>" +
      '<p class="meta"><strong>Contact:</strong> ' +
      CampusConnect.escapeHtml(club.email) +
      "</p>";
    document.getElementById("club-modal-title").textContent = club.name;
    CampusConnect.openModal(modal);
  }

  filters.addEventListener("click", function (event) {
    var button = event.target.closest("[data-category]");
    if (!button) {
      return;
    }
    activeCategory = button.getAttribute("data-category");
    renderFilters();
    renderClubs();
  });

  search.addEventListener("input", renderClubs);

  grid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-club-id]");
    if (!button) {
      return;
    }
    showClub(Number(button.getAttribute("data-club-id")));
  });

  renderFilters();
  renderClubs();
});
