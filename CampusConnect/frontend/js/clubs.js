document.addEventListener("DOMContentLoaded", function () {
  var clubs = [];
  var loadError = "";
  var grid = document.getElementById("club-grid");
  var search = document.getElementById("club-search");
  var filters = document.getElementById("club-filters");
  var count = document.getElementById("club-count");
  var modal = document.getElementById("club-modal");
  var modalBody = document.getElementById("club-modal-body");
  var activeCategory = "All";

  CampusConnect.initModal(modal);

  function imageForClub(club) {
    var name = String(club.name || "").toLowerCase();
    var text = [club.name, club.category, club.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    var images = [
      { match: /ccc society/, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", alt: "Students collaborating around a laptop for CCC Society" },
      { match: /coding club/, url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", alt: "A programming workspace for the Coding Club" },
      { match: /robotics club/, url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", alt: "A robot representing the Robotics Club" },
      { match: /literary club/, url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80", alt: "Shelves of books for the Literary Club" },
      { match: /cultural club/, url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80", alt: "A live performance representing the Cultural Club" },
      { match: /photography club/, url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80", alt: "A camera for the Photography Club" },
      { match: /social service club/, url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80", alt: "Volunteers working together for a community service club" },
      { match: /sports club/, url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80", alt: "Players competing in a team sport for the Sports Club" }
    ];
    var image = images.find(function (item) { return item.match.test(name); });
    if (image) {
      return image;
    }

    var topicImages = [
      { match: /robot|robotics|electronics|automation|engineering/, url: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=900&q=80", alt: "A robotics project being built" },
      { match: /coding|program|software|computer|technical/, url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80", alt: "A computer screen displaying programming code" },
      { match: /literature|reading|writing|book|academic/, url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80", alt: "Books and reading materials" },
      { match: /camera|photo|visual|creative/, url: "https://images.unsplash.com/photo-1510127034890-1e589b88a8ac?auto=format&fit=crop&w=900&q=80", alt: "A camera ready to take a photograph" },
      { match: /culture|dance|music|festival|perform/, url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80", alt: "A crowd enjoying a live performance" },
      { match: /social|service|volunteer|community/, url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80", alt: "People volunteering together in their community" },
      { match: /sport|fitness|athletic|team/, url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80", alt: "Athletes training outdoors" }
    ];
    return topicImages.find(function (item) { return item.match.test(text); }) || {
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80",
      alt: "Students gathering for a campus club"
    };
  }

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
    var haystack = (club.name + " " + club.category + " " + club.description).toLowerCase();
    var categoryOk = activeCategory === "All" || club.category === activeCategory;
    return categoryOk && haystack.indexOf(query) !== -1;
  }

  function renderClubs() {
    if (loadError) {
      count.textContent = "";
      CampusConnect.showState(grid, loadError);
      return;
    }

    var query = (search.value || "").trim().toLowerCase();
    var visible = clubs.filter(function (club) {
      return matches(club, query);
    });

    count.textContent =
      visible.length === 1 ? "1 club shown" : visible.length + " clubs shown";

    if (!clubs.length) {
      CampusConnect.showState(grid, "No clubs are listed yet.");
      return;
    }

    if (!visible.length) {
      CampusConnect.showState(
        grid,
        "No clubs match that search. Try another keyword or category."
      );
      return;
    }

    grid.innerHTML = visible
      .map(function (club) {
        var image = imageForClub(club);
        return (
          '<article class="card">' +
          '<div class="club-card-media">' +
          '<img src="' + image.url + '" alt="' +
          CampusConnect.escapeHtml(image.alt) +
          '" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add(\'image-fallback\')">' +
          "</div>" +
          '<div class="card-body">' +
          '<span class="chip">' +
          CampusConnect.escapeHtml(club.category || "") +
          "</span>" +
          "<h3>" +
          CampusConnect.escapeHtml(club.name || "") +
          "</h3>" +
          "<p>" +
          CampusConnect.escapeHtml(CampusConnect.truncate(club.description, 140)) +
          "</p>" +
          '<div class="card-actions">' +
          '<button type="button" class="btn btn-navy" data-club-id="' +
          CampusConnect.escapeHtml(String(club.id)) +
          '">View details</button>' +
          "</div></div></article>"
        );
      })
      .join("");
  }

  function showClub(id) {
    var club = clubs.find(function (item) {
      return Number(item.id) === Number(id);
    });
    if (!club) {
      return;
    }
    modalBody.innerHTML =
      '<p class="chip">' +
      CampusConnect.escapeHtml(club.category || "") +
      "</p>" +
      "<p>" +
      CampusConnect.escapeHtml(club.description || "") +
      "</p>";
    document.getElementById("club-modal-title").textContent = club.name || "Club details";
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
    showClub(button.getAttribute("data-club-id"));
  });

  renderFilters();
  CampusConnect.showState(grid, "Loading clubs…");
  count.textContent = "";

  CampusConnect.getJson("/api/clubs/")
    .then(function (items) {
      clubs = Array.isArray(items) ? items : [];
      loadError = "";
      renderClubs();
    })
    .catch(function (error) {
      clubs = [];
      loadError =
        error && error.message
          ? error.message
          : "Unable to load clubs. Please try again later.";
      renderClubs();
    });
});
