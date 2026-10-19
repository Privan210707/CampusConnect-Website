# CampusConnect Project Status

Audit date: 2026-10-19

## Scope and structure

The repository root contains the `CampusConnect/` project folder and a `.git/` repository. The app has exactly four frontend HTML pages:

- `CampusConnect/frontend/index.html` — Home
- `CampusConnect/frontend/clubs.html` — Clubs & Societies
- `CampusConnect/frontend/events.html` — Events
- `CampusConnect/frontend/contact.html` — Contact Us

Frontend assets:

- `CampusConnect/frontend/css/style.css`
- `CampusConnect/frontend/js/api.js` — shared fetch/API and error helpers
- `CampusConnect/frontend/js/data.js` — static college details and categories
- `CampusConnect/frontend/js/main.js` — shared UI helpers
- `CampusConnect/frontend/js/home.js`, `clubs.js`, `events.js`, `contact.js` — page behavior

Backend:

- `CampusConnect/backend/manage.py`
- `CampusConnect/backend/campusconnect/{settings.py,urls.py,asgi.py,wsgi.py}`
- `CampusConnect/backend/college/{models.py,serializers.py,views.py,urls.py,admin.py,apps.py,tests.py}`
- `CampusConnect/backend/college/migrations/0001_initial.py`
- `CampusConnect/backend/seed_data.py`
- `CampusConnect/backend/requirements.txt`
- `CampusConnect/backend/.env` exists; its contents were not read or printed.

No frontend package manifest, frontend test suite, Docker configuration, or root README was found in the inspected file inventory. The repository root has no `.gitignore`; the backend folder contains the project environment file.

## Implemented features

- Four-page static site with shared navigation and responsive styling.
- Home page loads announcements and an event preview from the API; the college intro is static.
- Clubs page loads clubs and implements client-side category filtering, search, and detail modal. The API also supports server-side category and search filters.
- Events page lists API events and posts event registration data.
- Contact page shows static college contact details and posts feedback.
- Django models cover announcements, clubs, events, event registrations, and feedback. Admin registrations are present.
- Serializers validate email and required fields, normalize emails, enforce unique event/email registrations, and enforce minimum feedback message length.
- Seed script idempotently adds sample announcement, club, and event records (requires a working database and configured Django environment).

The source code provides these behaviors, but frontend browser behavior has not been exercised in a browser. The API requests are wired in code and their contracts align with the backend serializers/views; this does not establish live browser-to-server connectivity.

## Existing API endpoints

All endpoints are under `/api/`, use JSON, and are exposed with DRF `AllowAny` permissions and no authentication classes.

| Method | Path | Behavior / response |
|---|---|---|
| GET | `/api/announcements/` | JSON array of announcement objects: `id`, `title`, `description`, `published_at`, `created_at` |
| GET | `/api/clubs/` | JSON array of clubs: `id`, `name`, `category`, `description`, `image_url`; optional `category`, `search`, or `name` query parameters |
| GET | `/api/events/` | JSON array of events: `id`, `title`, `description`, `starts_at`, `venue` |
| POST | `/api/registrations/` | Creates registration from `event`, `student_name`, `email`; returns serialized object (201) or field errors (400) |
| POST | `/api/feedback/` | Creates feedback from `name`, `email`, `subject`, `message`; returns serialized object (201) or field errors (400) |

DRF list endpoints return arrays (pagination is not configured). Create endpoints return a serialized object when successful and DRF field-keyed validation errors on failure.

## Frontend/backend integration

The frontend's `api.js` sets its API origin to `http://127.0.0.1:8000`. Page scripts use matching paths and methods: GET for announcements/clubs/events and JSON POST for registrations/feedback. Registration sends the serializer's expected `event`, `student_name`, `email` keys; feedback sends the expected four fields. Error rendering maps DRF field errors to form fields.

Django CORS middleware is installed before `CommonMiddleware`. The configured default origins include ports 5500 on localhost/127.0.0.1; when `DEBUG` is true, a regex permits any port on those local hosts. This matches common local static-server use. A frontend served from a different hostname/port, or deployed separately, needs explicit matching CORS configuration and an appropriate API base URL. Serving the frontend over HTTPS while its API base remains HTTP will be blocked as mixed content.

## Git state and recent files

The repository has `.git` metadata and an `origin` remote configured. However, the `git` executable is unavailable in the shell (`git` was not recognized), so `git status`, diff, and recent commit inspection could not be run. Do not interpret filesystem timestamps as proof of Git modifications. Files with the latest observed filesystem modification times include the college serializer and tests, backend settings, and frontend events script/style and page scripts; exact created/modified/untracked status remains unverified. No existing changes were discarded or overwritten.

The backend `.env` file exists and was excluded from all content reads. The repository `.gitignore` was absent at the root; whether `.env` is ignored cannot be confirmed without Git. Verify that credentials are not committed and add an ignore rule if needed.

## Checks run

Using Python 3.13.7 and the dependencies available in the configured system environment:

- `python manage.py check` — passed: no issues.
- `python manage.py makemigrations --check --dry-run` — passed: no model changes without migrations.
- `python manage.py test --verbosity 1` — passed: 14 tests.

The Django test runner created and destroyed its temporary test database. It did not alter the project database. The tests exercise API/model behavior with Django's test database; they do not establish that the configured PostgreSQL service or `campusconnect` database is reachable for normal runs. No migration was applied to the project database, and no seed data was inserted.

## Errors, risks, and blockers

1. Git status/diff cannot currently be verified because Git is missing from PATH and known checked locations. This blocks exact reporting of modified, created, staged, and untracked files.
2. Runtime PostgreSQL connectivity has not been confirmed. Settings select PostgreSQL and default the database name to `campusconnect`, but configured connection details are environment-driven.
3. `DEBUG` defaults to `true`; this is convenient locally but unsafe as a production default. Production must explicitly disable debug and set secure secret/host/origin values.
4. Public POST endpoints permit unauthenticated registrations and feedback without visible throttling, CAPTCHA, or abuse controls. This is acceptable for a local demo but creates spam/data integrity risk if exposed publicly.
5. `.env` exists while no root `.gitignore` was found. Its tracking/ignore status remains unverified; secret values were not exposed.
6. Project identity content is inconsistent with the brief: frontend static data describes a fictional “Riverside College,” while the requested event is a college society bug-hunting event and seed data includes “CCC Society Bug Hunt.” Confirm the intended institution and branding before implementation edits.
7. `MAILERS` is defined in settings rather than Django's standard `EMAIL` setting and is unused by the current feedback flow (feedback is stored in the database; no email is sent).
8. Existing JavaScript/UI strings show mojibake in several places (for example ellipses, middle dots, and dash characters), suggesting an encoding issue in source content.
9. Frontend behavior and cross-origin requests have not been verified in a real browser. The local API URL is hard-coded and must match how the pages are served.

## Remaining work, prioritized

1. Restore/locate Git CLI access and capture `git status --short --branch`, a diff summary, and recent commits so the audit can distinguish pre-existing edits from committed files.
2. Verify `.env` is excluded from version control without printing it; establish a local PostgreSQL connection and verify the configured database before applying migrations or seeding.
3. Run the backend server and serve the static frontend from a supported local origin; exercise all four pages and confirm GET/POST requests, CORS headers, and validation/error rendering in a browser.
4. Confirm intended college identity/event naming and decide whether sample seed content should match the bug-hunting event.
5. Before any public deployment, set production-safe settings and decide on abuse controls for unauthenticated POST endpoints.
6. Address the encoding artifacts and unused mail setting if they are confirmed defects and in scope.

## Commands to run and test

Run from `CampusConnect/backend` in PowerShell, after installing `requirements.txt` and configuring `backend/.env` with the required Django key and PostgreSQL settings. These commands do not print environment values:

```powershell
cd .\CampusConnect\backend
python -m pip install -r requirements.txt
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py showmigrations
python manage.py migrate
python manage.py test
python manage.py runserver 127.0.0.1:8000
```

`migrate` changes the configured database schema; run it only after confirming the database target. To load sample records after migration:

```powershell
python seed_data.py
```

In a second PowerShell terminal, serve the static frontend on a CORS-allowed local origin:

```powershell
cd .\CampusConnect\frontend
python -m http.server 5500 --bind 127.0.0.1
```

Open `http://127.0.0.1:5500/index.html`. Git review commands, once Git is available, should be run from the repository root:

```powershell
git status --short --branch
git diff --stat
git diff --cached --stat
git log -5 --oneline --decorate
```
