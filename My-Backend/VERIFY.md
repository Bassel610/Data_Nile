# Phase 12 — End-to-end verification checklist

Run after `composer install && php artisan migrate --seed && php artisan serve` (Laravel on `:8000`)
and `npm start` in `../my-app` with `REACT_APP_API_BASE=http://localhost:8000`.

## Backend smoke tests (curl)

```bash
# 1. Public site content
curl -s http://localhost:8000/api/site-content | jq '. | keys'
# Expect: ["about","contactForm","heroSub","heroTitle","services"]

# 2. Public theme
curl -s http://localhost:8000/api/theme | jq '."--nile-deep"'
# Expect: a hex color (e.g. "#0c2a3a")

# 3. Admin login
TOKEN=$(curl -s -X POST http://localhost:8000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@datanile.local","password":"ChangeMe!2025"}' \
  | jq -r .token)
echo $TOKEN
# Expect: a long random string (Sanctum plain-text token)

# 4. Protected list
curl -s http://localhost:8000/api/invites -H "Authorization: Bearer $TOKEN" | jq
# Expect: { "data": [] }

# 5. Public invite submission
curl -s -X POST http://localhost:8000/api/invites \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","role":"Just exploring"}' | jq
# Expect: { id, at, name, email, ... }

# 6. Error envelope on bad path
curl -s http://localhost:8000/api/nope | jq
# Expect: { "error": ..., "status": 404, "detail": null }

# 7. Logout revokes token
curl -s -X POST http://localhost:8000/api/admin/logout -H "Authorization: Bearer $TOKEN"
curl -s http://localhost:8000/api/invites -H "Authorization: Bearer $TOKEN" | jq .status
# Expect: 401
```

## Frontend round-trip checklist

- [ ] `npm start` boots without errors
- [ ] Landing page renders hero, about, services, contact form using API data
- [ ] Submitting the contact form (logged out) returns success
- [ ] Visiting `/dashboard` shows the login gate (email + password fields)
- [ ] Login with seeded admin (`ADMIN_EMAIL` / `ADMIN_INITIAL_PASSWORD`) succeeds
- [ ] Dashboard lists invites; the one submitted above is present
- [ ] Auto-refresh tick visible after 15 seconds
- [ ] Edit hero title → save → reload page → value persists
- [ ] Edit about → save → reload → value persists
- [ ] Edit services → save → reload → value persists
- [ ] Edit contact form → save → reload → value persists
- [ ] Open invite detail → delete → invite disappears from list and DB
- [ ] Theme picker change → CSS variables update on reload
- [ ] Reset password (min 8, mixed case, numbers) succeeds
- [ ] Re-login with new password succeeds
- [ ] Logout button → returns to login gate, protected calls return 401
- [ ] Browser console: no CORS errors, no 500s

## Backend quality gates (in `My-Backend/`)

- [ ] `php artisan test` — all green (≥ 25 assertions)
- [ ] `vendor/bin/pint --test` — clean (no formatting drift)
- [ ] `vendor/bin/phpstan analyse` — level 8 clean
- [ ] `php artisan route:list` — exactly 10 `/api/*` routes (+ health `up`)

## Senior-review checklist

- [ ] No Eloquent calls in any controller (controllers depend on services only)
- [ ] No HTTP types (`Request`, `JsonResponse`) leak into `app/Domain/*`
- [ ] Every service method has a return type and parameter types
- [ ] Every error path returns the `{ error, status, detail }` envelope
- [ ] No plain-text passwords or tokens persisted in DB (verify with `SELECT * FROM admin_users`, `SELECT * FROM personal_access_tokens`)
- [ ] Migrations down-cleanly (`php artisan migrate:rollback` then re-`migrate`)
- [ ] Seeders are idempotent — running `db:seed` twice doesn't duplicate rows
- [ ] FormRequests cover every field the frontend sends; unknown fields are dropped, not echoed back
