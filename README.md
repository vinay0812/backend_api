# Event Booking API

A production-ready REST API for event management and seat booking, built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

**Live API:** https://event-api-qecw.onrender.com

---

## Features

- JWT-based authentication with bcrypt password hashing
- Protected routes via auth middleware
- Event creation and management
- Automated seat generation per event
- Race-condition-safe seat booking using database transactions and pessimistic locking
- Input validation with Zod
- Clean MVC folder structure

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL (Supabase)
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **Deployment:** Render

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login and get JWT token | No |

### Events
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/events` | Create event | Yes |
| GET | `/events` | Get all events | Yes |
| GET | `/events/:id` | Get single event | Yes |
| DELETE | `/events/:id` | Delete event | Yes |
| POST | `/events/:id/seats` | Generate seats for event | Yes |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/bookings` | Book a seat | Yes |

---

## Database Schema

- **User** — authentication and profile
- **Event** — event details with organizer relation
- **Seat** — seats per event with status (AVAILABLE/LOCKED/BOOKED)
- **Booking** — booking records linking user, event, and seat

---

## Key Technical Decisions

**Race condition prevention** — seat booking uses `SELECT ... FOR UPDATE` pessimistic locking inside a Prisma transaction. This prevents two users from booking the same seat simultaneously under concurrent traffic.

**Atomic operations** — seat status update and booking creation are wrapped in a single database transaction. If either fails, both roll back.

**Optimised seat generation** — seats are generated using `createMany` in a single database query instead of individual inserts per seat.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/vinay0812/backend_api
cd backend_api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL and JWT_KEY

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

---

## Environment Variables

```
DATABASE_URL=your_postgresql_connection_string
JWT_KEY=your_secret_key
```

---

## Author

Vinay Joshi — [GitHub](https://github.com/vinay0812) · [LinkedIn](https://www.linkedin.com/in/vinayjoshi08)
