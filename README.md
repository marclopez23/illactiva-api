# Illactiva

<br>

## M3 Final Project

<br>

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
- **Follow commerce** As a user I can follow a commerce.
- **Unollow commerce** As a user I can unfollow a commerce.
- **View User profile** As a user I can see my profile
- **Edit User profile** As a user I can edit my profile

## Backlog

- Show event stats
- Send emails with notifications
- Geolocalize events by neighborhood
- Create a list of created event
- Create a list of attended event
- Light/Dark mode

<br>

# Client / Frontend

## React Router Routes (React App)

| Path               | Component       | Permissions                | Behavior                                                         |
| ------------------ | --------------- | -------------------------- | ---------------------------------------------------------------- |
| `/`                | HomePage        | public `<Route>`           | Home page / Landing Page                                         |
| `/signup`          | SignupPage      | anon only `<AnonRoute>`    | Signup form, link to login, navigate to dashboard after signup   |
| `/login`           | LoginPage       | anon only `<AnonRoute>`    | Login form, link to signup, navigate to dashboard after login    |
| `/dashboard`       | EventsPage      | user only `<PrivateRoute>` | Page that shows all created events                               |
| `/events/add`      | AddEventForm    | user only `<PrivateRoute>` | New project form, adds a new ticket and redirects to ticket page |
| `/events/edit/:id` | EditEventForm   | user only `<PrivateRoute>` | Edit the project info                                            |
| `/events/:id`      | EventDetailPage | user only `<PrivateRoute>` | Page with the details of a event                                 |
| `/profile`         | ProfilePage     | user only `<PrivateRoute>` | Shows the user profile, an edit options                          |
| `/commerce/:id`    | ProfilePage     | user only `<PrivateRoute>` | Shows the commerce profile, an their events                      |

## Components

- HomePage

- LoginPage

- SignupPage

- EventsPage

  - EventCard

- AddEventForm
- EditEventForm

- EventDetailPage

- ProfilePage

  - EditProfileForm

- Routes

  - AnonRoute
  - PrivateRoute

- Common
  - Navbar
  - Footer
  - Button...

## Services

- Auth Service

  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Events Service

  - eventsApi.list()
  - eventsApi.addEvent(event)
  - eventsApi.getEventDetails(eventId)
  - eventsApi.editEvent(eventId, eventBody)
  - eventsApi.deletEevent(eventId)

- User Service
  - usersApi.editUser(userId, userBody)
  - userApi.followCommerce(userId, commerceId)

<br>

# Server / Backend

## Models

User model

```javascript
{
  name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  direction: {type: String, required: true},
  category: {type: String, required: true, enum:["talleres", "deporte", "exposiciones", "Visitas y tours", "infatil", "quedadas", "cine", "espectáculos", "charlas", "música", "otros"] },
  profileImg: {type: String },
  eventsJoined: [ { type: mongoose.Schema.Types.ObjectId, ref: "Event" } ]
  eventsCreated: [ { type: mongoose.Schema.Types.ObjectId, ref: "Event" } ]
}
```

Commerce model

```javascript
{
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true}
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  direction: {type: String, required: true},
  category: {type: String, enum:["restauración", "cultura", "moda", "asociación", "deporte", "salud", "electrónica", "otros", "comida"], required: true },
  tags: {type: Array, required: true },
  schedule: {type: String, required: true}
  profileImg: {type: String },
  eventsCreated: [ { type: mongoose.Schema.Types.ObjectId, ref: "Envent" } ]
}
```

Event model

```javascript
{
  creator: [ { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" } ],
  onModel: {
    type: String,
    required: true,
    enum: ['User', 'Commerce']
  }
  title: {type: String, required: true },
  description: {type: String, required: true },
  eventImg: { type: String },
  category: {type: String, required: true, enum:["talleres", "deporte", "exposiciones", "Visitas y tours", "infatil", "quedadas", "cine", "espectáculos", "charlas", "música", "otros"] },
  free: {type: boolean, required: true,}
  likes: {type: Number }
  price: {type: Number},
  location: {type: String, required: true },
  date: {type: Date, required: true },
  resgisteredUsers: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
},
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                       | Request Body                | Success status | Error Status | Description                                                                                                                     |
| ----------- | ------------------------- | --------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`            | {username, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`             | {email, password}           | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`            | (empty)                     | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/projects`           |                             |                | 400          | Sends all projects                                                                                                              |
| GET         | `/api/projects/:projecId` | {id}                        |                |              | Sends one specific project with its tasks (if any)                                                                              |
| POST        | `/api/projects`           | {title, description}        | 201            | 400          | Create and saves a new project in the DB                                                                                        |
| PUT         | `/api/projects/:projecId` | {title, description}        | 200            | 400          | Edits project in the DB                                                                                                         |
| DELETE      | `/api/projects/:projecId` | {id}                        | 201            | 400          | Deletes project                                                                                                                 |
| POST        | `/api/tasks/:projecId`    | {name,description, status}  | 200            | 404          | Adds a new task to a specific project                                                                                           |
| PUT         | `/api/tasks/:taskId`      | {name,description, status}  | 201            | 400          | Edits a task in the DB                                                                                                          |
| DELETE      | `/api/tasks/:taskId`      | {id}                        | 200            | 400          | Deletes task                                                                                                                    |
| GET         | `/api/user`               | {}                          | 201            | 400          | Sends user detauls                                                                                                              |
| PUT         | `/api/user/:userId`       | {username ...}              |                |              | Edits user                                                                                                                      |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/)
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/yourgitusername/project-client)

[Server repository Link](https://github.com/yourgitusername/project-server)

[Deployed App Link](http://netlify.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
