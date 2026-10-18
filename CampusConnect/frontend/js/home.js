document.addEventListener("DOMContentLoaded", function () {
  var data = CampusConnect.SAMPLE_DATA;
  var intro = document.getElementById("college-intro");
  var announcementList = document.getElementById("announcement-list");
  var eventPreview = document.getElementById("event-preview");

  if (intro) {
    intro.textContent = data.college.intro;
  }

  if (announcementList) {
    announcementList.innerHTML = data.announcements
      .map(function (item) {
        return (
          '<article class="announcement">' +
          "<h3>" +
          CampusConnect.escapeHtml(item.title) +
          "</h3>" +
          "<time datetime=\"" +
          CampusConnect.escapeHtml(item.date) +
          "\">" +
          CampusConnect.formatDate(item.date) +
          "</time>" +
          "<p>" +
          CampusConnect.escapeHtml(item.body) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  if (eventPreview) {
    var upcoming = data.events.slice().sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
    eventPreview.innerHTML = upcoming
      .slice(0, 3)
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
          '<div class="card-actions"><a class="btn btn-navy" href="events.html">View events</a></div>' +
          "</div></article>"
        );
      })
      .join("");
  }
});
