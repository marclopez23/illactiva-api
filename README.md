<br>

![Illactiva](https://github.com/marclopez23/illactiva-client/blob/main/src/assets/logo.png)

<br>

### Deploy Link

[Link](https://illactiva.netlify.app/)

## Description

It is an app that will allow neighbors and local businesses to create events. The intention is to create these activities within the neighborhoods to improve the disconnection that currently exists in big cities and to promote local commerce.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up to the app so that I can start creating my own events or join them.
- **Login:** As a user I can login to the app so that I can manage my own events or join them.
- **Logout:** As a user I can logout from the app so no one else can use it
- **View Events** As a user I want to see a list of my events and also a view of each event individually
- **Create Event** As a user I can add a event
- **Edit event** As a user I can edit a event
- **Delete event** As a user I can delete a event
- **Join event** As a user I can join to an event.
- **Unsubscribe event** As a user I can unsubscribe from an event
- **Follow commerce** As a user I can follow a commerce
- **Unollow commerce** As a user I can unfollow a commerce
- **View User profile** As a user I can see my profile
- **Edit User profile** As a user I can edit my profile
- **Commerce profile** As a user I want to see the commerces profiles
- **My Activities** As a user I want to see my joined and created events
- **My folowed commerces** As a user I want to see my followed commerces

## Backlog

- Show event stats
- Send emails with notifications
- Geolocalize events by neighborhood
- Light/Dark mode

<br>

# Client / Frontend

## React Router Routes (React App)

| Path               | Component       | Permissions                | Behavior                                                         |
| ------------------ | --------------- | -------------------------- | ---------------------------------------------------------------- |
| `/`                | Home / HomePrivate       | public / user  `<Route>` / `<PrivateRoute>`      | Home page / Landing Page           |
| `/registrarme`          | SignUp    | anon only `<AnonRoute>`    | Signup form, link to login, navigate to Home Private  after signup   |
| `/iniciar-sesion`           | Login    | anon only `<AnonRoute>`    | Login form, link to signup, navigate to Home Private after login    |
| `/eventos`       | Events   | user only `<PrivateRoute>` | Page where the user can select to see the events joined or created                             |
| `/crear-evento`      | CreateEvent   | user only `<PrivateRoute>` | New event form, adds a new event and redirects to event connfirmation |
| `/evento/editar/:id` | EditEvent   | user only `<PrivateRoute>` | Edit the event info                                            |
| `/evento/creado` | EventConfirmation   | user only `<PrivateRoute>` | Screen to confirm to the user that the event is created              |
| `/evento/:id`      | Event | user only `<PrivateRoute>` | Page with the details of a event where the user can join                                 |
| `/eventos/:query/`      | UserEvents | user only `<PrivateRoute>` | Page with a list of user joined or created events                               |
| `/eventos/:query/:cuando`| MoreEvents | user only `<PrivateRoute>` | Page with a list of user joined or created events but filter for next or past events   |
| `/perfil`         | Profile   | user only `<PrivateRoute>` | Shows the user profile                        |
| `/perfil/editar/:id` | EditProfile   | user only `<PrivateRoute>` | Page where the user can edit the profile info                      |
| `/comercios/:id`    | CommercePage     | user only `<PrivateRoute>` | Shows the commerce profile, an their events                      |
| `/comercios/seguidos`    | FollowedCommerces     | user only `<PrivateRoute>` | Shows the commerces followed by the user                     |
| `/buscar`    | Search    | user only `<PrivateRoute>` | Page where the user can search events by category                    |
| `/eventos-:filtro`    | EventsList    | user only `<PrivateRoute>` | Page where the user can search events by a filter                   |
| `*`    | ErrorPage   | publlic | 404 or ErrorBoundary Page                 |

## Components

- Home

- HomePrivate
  - EventCard
  - EventCardLarge
  - Header
  - CommerceCard

- Login
  - LoginForm

- Signup
  - SimpleHeader
  - SignUpForm
    - CategorySelector
    - ConfirmationForm
    - FormFooter
  - SignUpCommerce
    - Tag
    - ConfirmationForm
    - FormFooter

- Events
  - Header

- CreateEvent
 - EventForm
   - FormFooter

- EditEvent
 - SimpleHeader

- EventConfirmation 

- Event

- UserEvents
  - SimpleHeader
  - EventCardLarge

- MoreEvents
  - SimpleHeader
  - EventCardLarge

- Profile
  - ProfileHeader
  - Tag
  - ListButton
  
- EditProfile
  - Tag
  - CategorySelector
  - Loader
  - SimpleHeader

- CommercePage
  - ProfileHeader
  - Tag
  - EventCardLarge
 
- FollowedCommerces
  - CommerceCard
  - SimpleHeader

- Search
  - CategorySelector
  - EventCardLarge
  - Tag

- EventsList
  - SimpleHeader
  - EventCardLarge

- ErrorPage

- Routes
  - AnonRoute
  - PrivateRoute

- Common
  - Navbar
  - Footer
  - Button
  - Menu
  - Loader
  - Footer
  - ErrorBoundary
  - ScrollToTop

## Services

- Auth Service
  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Events Service
  - eventsApi.getEvents()
  - eventsApi.createEvent(info)
  - eventsApi.getEvent(id)
  - eventsApi.editEvent(id, info)
  - eventsApi.deletEevent(eventId)
  - eventsApi.joinEvent(eventId) -> This also works for unsubscribe for an event

- User Service
  - usersApi.get()
  - usersApi.edit(id, info)
  - userApi.followCommerce(commerceId) -> This also works for unfollow commerces

- Commerces Service
  - commerceApi.getCommerces()
  - commerceApi.getCommerce(id)

- Upload Image Service
  - projectApi.uploadFileService(file)

<br>

## Contexts

- AuthContext
  - user
  - handleLogin()
  - handleLogout()
  - handleSignup()
  - setUser()

- EventContext
  - events
  - bringEvent(id)
  - newEvent(id)
  - setEvents()
  - registerEvent(id)
  - quitEvent(id)
  - eventEdit(id, info)

# Server / Backend

## Models

User model

```javascript
{
    email: {
      type: String,
      require: true,
      unique: true,
      match: EMAIL_REGEX,
    },
    hashedPassword: {
      type: String,
      require: true,
      select: false,
    },
    name: { type: String, required: true },
    neighbourhood: { type: String, required: true },
    category: {
      type: [String],
      required: true,
    },
    profileImg: { type: String },
    eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commerce" }],
  }
```

Commerce model

```javascript
{
    email: {
      type: String,
      require: true,
      unique: true,
      match: EMAIL_REGEX,
    },
    hashedPassword: {
      type: String,
      require: true,
      select: false,
    },
    name: { type: String, required: true },
    direction: { type: String, required: true },
    neighbourhood: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    tags: { type: [String], required: true },
    schedule: { type: [String], required: true },
    profileImg: { type: String },
    eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commerce" }],
    web: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    description: { type: String, required: true },
  }
```

Event model

```javascript
{
    creator: { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "Commerce"],
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventImg: { type: String },
    category: {
      type: String,
      required: true,
    },
    free: { type: Boolean, required: true },
    likes: { type: Number },
    price: { type: String },
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    end: { type: String, required: true },
    place: { type: String, required: true },
    maxUsers: { type: String, required: true },
    resgisteredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  }
```

<br>

Delte model (shallow deleting)

```javascript
 {
    collectionName: {
      type: String,
      required: true,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Object,
    },
  }
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body          | Success status | Error Status | 
| ----------- | --------------------------- | --------------------- | -------------- | ------------ |
| POST        | `/auth/signup`              | {password, email, name, direction, category, profileImg, isCommerce, tags,schedule, description, neighbourhood, facebook, twitter, instagram, web,} | 200            | 400        | 
| POST        | `/auth/login`               | {email, password}     | 200            | 401        | 
| POST        | `/auth/logout`              |            | 200            | 400          | 
| GET         | `/events`               | {}                       |  200              | 400 / 401          | 
| GET         | `/events/:eventId`      | {id}                  | 200                |              | 
| PATCH         | `/events/edit/:eventId`| {eventId, title, description, category, free, date, hour, place, end}      |   200             |    400          | 
| POST        | `/events/create`        | {title, description, category, free, date, hour, place, end}  | 200           | 400          | 
| PATCH       | `/api/events/:join/:eventId`      | {eventId}  | 200            | 400          |                                           
| DELETE      | `/events/:eventId`      | {eventId}                  | 200            | 400          | 
| GET         | `/user`                 | {}                    | 200            | 400          | 
| PATCH       | `/user/edit/:userId`         | {email, name, direction, category, profileImg, tags,schedule, description, neighbourhood, facebook, twitter, instagram, web}        |    200            |    400          | 
| PATCH      | `/user/follow/:commerceId` | {commerceId}            |    200            |     400         |
| GET         | `/commerces`             | {}                    | 200            | 400          | 
| GET         | `/commerces/:commerceId` | {commerceId}            |  200              |  400            |

<br>

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/pEiiw1N0)

### Figma Proto

[Link to prototype](https://www.figma.com/proto/5j8DYsYFr4BfVLwJUxnCHh/Proyecto-illactiva?node-id=832%3A4066&viewport=-148%2C173%2C0.07832704484462738&scaling=scale-down)

### API Repo

[Link to the repo](https://github.com/marclopez23/illactiva-api)

