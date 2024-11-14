# Xarta

A dynamic card manager built on top of Ghost CMS.

## Installation

### Local Setup

#### Prerequisites: 

##### Install Ghost

- Setup ghost https://ghost.org/docs/introduction/

- Optional: inside ghost container, run `ghost config url`, or provide `url=http://your.url.com` to Ghost container.

- Access `localhost:3000` (or go to caddy address, `dev-container-node-xarta-caddy:3000`).
- Go to `/ghost` and create your admin user. Provide the following information:
    - Blog title
    - Email
    - Full name
    - Password
- Create an integration:
    - Go to `/ghost/#/settings/advanced`, scroll down to `Integrations` and then click `Add Custom Integration`. You can name it `Xarta`
    - Copy your `Content API key` and `Admin API key` tokens into `.env`
    - Copy your `API URL` into `.env` ?
- Optional: Rebuild Next.
- Close settings
- Add yourself as a member of your website: 
    - click `Members` in the menu
    - add yourself as member to test

- Impersonate yourself in order to login without email SMTP configuration:
    - Click on your username, click the gear icon, click Impersonate, and copy and paste the link into your browser.

- Optional: Go to labs > portal translate and choose a desired language in pub language (e.g. `pt-br`)
- Optional: Set a timezone
- Optional: Configure SMTP server

##### Add a Reverse Proxy

- In order to run both Ghost and Xarta, you should create a reverse proxy to route specific subpaths. We recommend using Caddy. For example, the following configuration works for both Xarta and Ghost on localhost on ports `3000` and `2368`, respectively:

```caddy
:3000 {

    # DO NOT use /xarta/* as it will cause infinite redirects
    reverse_proxy /xarta* xarta-container-name-here:3000 {
        header_down Access-Control-Allow-Origin "*"
        header_down Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
        header_down Access-Control-Allow-Headers "Content-Type, Authorization"
    }

    # Proxy anything else to Ghost
    reverse_proxy * ghost-container-name-here:2368
}
```

- You may further restrict `Access-Control-Allow-Origin` to your domains of choice, if desired.

#### Run Xarta

- Provide the following variables along with `npm run dev`: 
    - `NEXT_PUBLIC_ROOT_URL`
    - `GHOST_ADMIN_API_KEY`
    - `GHOST_CONTENT_API_KEY`
    - `INTERNAL_GHOST_URL`
    - `NEXT_INTERNAL_ROOT_URL`

### Production Deployment

- Deploy a Ghost instance and configure it using the steps provided above. Save the content and api keys.
- Build `Dockerfile.next` with your public root URL, e.g.: `NEXT_PUBLIC_ROOT_URL=https://xarta.dev`
- Start the Next.js app with both `GHOST_ADMIN_API_KEY` and `GHOST_CONTENT_API_KEY` variables provided: `node .next/standalone/server.js`

### Customization

- You may configure styling for classes `xarta-card`, `xarta-title`, `xarta-excerpt`, `xarta-updated-at`, `xarta-content`, `xarta-footer`, `xarta-custom-logo`, `xarta-default-logo` to further customize your card.

- Xarta features an internal demo mode which can be used to automatically login with a username and password of choice:
    - Configure both `NEXT_PUBLIC_DEMO_USERNAME` and `NEXT_PUBLIC_DEMO_PASSWORD` env variables and rebuild your Next.js app. 

## Code Documentation

### Next.js APIs

Next.js APIs can be accessed at `/xarta/api/` and were built to achieve functionality specific to Xarta, as well as wrap some of the Ghost APIs for conveniency:

**Public APIs:**

- `code-injection`: Retrieves custom `head` and `footer` customization, allowing the user to add scripts and style tags of choice.
- `get-settings`: Returns a subset of Ghost Settings API used for Xarta UI
- `embed-script/[id]`: Returns a `script` tag which loads the Xarta embed card and makes it responsive according to the internal content's height.
- `get-post`: Wrapper for `/posts/{id}` api from Ghost.

### Next.js Pages

Next.js pages can be accessed at `/xarta`

- `create-card`: Create a new Xarta
- `edit-card`: Edit an existing Xarta
- `view-card`: Visualize an existing Xarta
- `embed`: Embeds a Xarta
- `login`: Login route
- `settings`: View Xarta settings

### License

- [MIT License](./LICENSE)