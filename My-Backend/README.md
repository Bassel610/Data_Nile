# Data Nile API

Laravel 11 + MySQL backend for the Data Nile React frontend (`../my-app`).

## Stack

- PHP 8.2+
- Laravel 11
- MySQL 8 (`utf8mb4`)
- Sanctum (bearer-token auth, hashed at rest)
- Bcrypt (cost 12) — `'hashed'` cast
- Pest 3 + Larastan 3 + Pint

## Architecture

Domain modules with thin HTTP controllers:

```
app/
├── Domain/
│   ├── SiteContent/   {Models, Repositories, Services, Support}
│   ├── Theme/         {Models, Repositories, Services}
│   ├── Invite/        {Models, Repositories, Services, DTOs}
│   └── Admin/         {Models, Services}
├── Http/
│   ├── Controllers/Api/        # thin — call services
│   ├── Requests/               # FormRequest validation
│   └── Resources/              # JSON shaping
├── Exceptions/Handler.php      # global JSON error envelope
└── Providers/                  # repository bindings
```

**Layering rule** — `Controller → FormRequest → Service → Repository (interface) → Eloquent`. Controllers never touch Eloquent. Services never see HTTP. Repositories never see validation.

## Setup

```bash
# 1. Install PHP 8.2+, Composer 2, MySQL 8 first.

# 2. Install dependencies
composer install

# 3. Configure environment
cp .env.example .env
php artisan key:generate

# 4. Edit .env: DB_*, ADMIN_EMAIL, ADMIN_INITIAL_PASSWORD, FRONTEND_URL
#    The FRONTEND_URL must match the React dev server (default http://localhost:3000).

# 5. Create DB and migrate + seed
mysql -uroot -e "CREATE DATABASE datanile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
php artisan migrate --seed

# 6. Run the API on :8000
php artisan serve
```

Then in `../my-app`, set `REACT_APP_API_BASE=http://localhost:8000` (in `.env.local`) and `npm start`.

## Environment variables

| Var | Purpose | Example |
|---|---|---|
| `APP_KEY` | Laravel encryption key | (auto via `key:generate`) |
| `DB_CONNECTION` | DB driver | `mysql` |
| `DB_HOST`/`DB_PORT`/`DB_DATABASE`/`DB_USERNAME`/`DB_PASSWORD` | MySQL connection | — |
| `FRONTEND_URL` | CORS allow-list origin | `http://localhost:3000` |
| `ADMIN_EMAIL` | Initial admin (idempotent seed) | `admin@datanile.local` |
| `ADMIN_INITIAL_PASSWORD` | Initial admin password | `ChangeMe!2025` |
| `BCRYPT_ROUNDS` | Bcrypt cost | `12` |
| `SANCTUM_TOKEN_EXPIRATION` | Token TTL in minutes (null = forever) | `null` |

## API contract

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/site-content` | – | Defaults overlay missing keys |
| PATCH | `/api/site-content` | bearer | Whitelist via `config/site.php` |
| GET | `/api/invites` | bearer | newest first, capped at 500 |
| POST | `/api/invites` | – | throttle 10/min |
| DELETE | `/api/invites/{public_id}` | bearer | 404 with envelope on miss |
| GET | `/api/theme` | – | CSS custom properties map |
| PATCH | `/api/theme` | bearer | Only `--`-prefixed keys persist |
| POST | `/api/admin/login` | – | `{ email, password }` → `{ token }`, throttle 5/min |
| POST | `/api/admin/logout` | bearer | Revokes current token only |
| POST | `/api/admin/password` | bearer | Min 8, mixed case + numbers |

**Error envelope** (all failures):

```json
{ "error": "<message>", "status": <code>, "detail": { ... } | null }
```

## Daily commands

```bash
php artisan test            # Pest feature suite
vendor/bin/pint             # auto-format
vendor/bin/phpstan analyse  # level 8 static analysis
php artisan route:list      # introspect API
php artisan tinker          # REPL
```

## Notes for the senior reviewer

- **Repository pattern** — all Eloquent access is hidden behind interfaces (`*Repository`). Bindings live in `App\Providers\DomainServiceProvider`.
- **DTOs** — invite payloads cross the HTTP boundary as `InviteData`, isolating the domain from request shape.
- **Sanctum tokens** — stored as SHA-256 in `personal_access_tokens.token`; plaintext returned once on login.
- **Password change revokes other tokens** — a session re-issuing its own token continues working; all stale sessions invalidate.
- **Rate limiting** — `throttle:10,1` on public POST `/api/invites`, `throttle:5,1` on `/api/admin/login` (configurable in `config/site.php`).
- **Defaults** — `SiteContentDefaults` is the one source of truth, ported verbatim from the legacy Node backend.
- **Frontend contract preserved** — endpoints, headers, JSON shapes unchanged; only `/api/admin/login` now requires `email` (frontend already updated).
