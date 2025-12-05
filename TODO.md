# TODO

- [x] Replace password field eye icons with eye slash variants on Teacher and Student registration forms while keeping clicks toggling visibility.
- [x] Standardize document titles across all pages so browser tabs show only "SyncED".
- [x] Redirect users to the role selection screen after successful registration for all roles (student, teacher, parent, admin).
- [x] Tighten footer spacing on admin and teacher login pages to reduce excess gaps while preserving readability.
- [x] Build an admin registration page; wire it into navigation and routing.
- [x] Update student login footer links so the primary CTA opens `/student-register` and the fallback link returns to `/register` (see fix6.png).
- [x] Investigate and resolve the student login flow returning "Invalid email or password" despite valid credentials, and document root cause plus fix plan (see fix7.png).
- [x] Recolor teacher/student registration iconography, links, and buttons to use the primary purple brand color (see fix8.png).
- [x] Swap landing page footer contact icons for Lucide equivalents while preserving sizing and layout (see fix9.png).
- [x] Move `syncED.png` into `src/assets/` and update all import/asset references accordingly to avoid broken routes.
