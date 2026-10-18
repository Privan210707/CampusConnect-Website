document.addEventListener("DOMContentLoaded", function () {
  var college = CampusConnect.SAMPLE_DATA.college;
  var details = document.getElementById("contact-details");
  var form = document.getElementById("feedback-form");
  var status = document.getElementById("feedback-status");

  details.innerHTML =
    "<h2>" +
    CampusConnect.escapeHtml(college.name) +
    "</h2>" +
    "<p>" +
    CampusConnect.escapeHtml(college.tagline) +
    "</p>" +
    "<dl>" +
    "<dt>Address</dt><dd>" +
    CampusConnect.escapeHtml(college.address) +
    "</dd>" +
    "<dt>Phone</dt><dd><a href=\"tel:" +
    CampusConnect.escapeHtml(college.phone.replace(/\s/g, "")) +
    "\">" +
    CampusConnect.escapeHtml(college.phone) +
    "</a></dd>" +
    "<dt>Email</dt><dd><a href=\"mailto:" +
    CampusConnect.escapeHtml(college.email) +
    "\">" +
    CampusConnect.escapeHtml(college.email) +
    "</a></dd>" +
    "<dt>Office hours</dt><dd>" +
    CampusConnect.escapeHtml(college.hours) +
    "</dd>" +
    "</dl>";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    CampusConnect.clearFieldErrors(form);
    status.textContent = "";
    status.className = "form-status";

    if (!CampusConnect.validateRequired(form, ["name", "email", "subject", "message"])) {
      status.textContent = "Please fix the highlighted fields.";
      status.className = "form-status error";
      return;
    }

    /* Temporary client-only confirmation. Not saved to a database. */
    status.textContent =
      "Feedback captured locally for preview only. It is not stored in PostgreSQL yet.";
    status.className = "form-status success";
    form.reset();
  });
});
