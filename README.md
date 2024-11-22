!["Xarta - A dynamic card manager"](./docs/xarta-cta.png)


# Xarta

A dynamic card manager built on top of Ghost CMS.

## Installation

### Local Setup

The Xarta stack is composed by 3 services: 
- [Ghost](https://ghost.org/): a CMS used internally by Xarta App.
- Xarta App: the Next.js app contained in this repository. Responsible for rendering the Xarta user interface and its APIs.
- A reverse proxy: an auxiliary service used as routing entrypoint to Ghost or Xarta requests. We suggest running [Caddy](https://caddyserver.com/), but you may replace it with [nginx](https://nginx.org/en/) if desired.

#### Suggested Configuration

In this guide, we suggest running all services in the host computer with the following configuration:

- Ghost: Runs on `localhost:2368`.
- Xarta App: Run on port `localhost:3000`.
- Caddy: Runs on port `localhost:3001`. 

**Optional Customizations:**
- Ports can have different values as long as the configuration files mentioned in this guide are also updated to match the changes.
- If you prefer using a container-based setup (e.g. using [Docker](https://www.docker.com/)) instead, you may replace `localhost` in the configuration files with the corresponding container names. You may also create a bridge network between all three containers.

#### Prerequisites: 

##### Add a Reverse Proxy

In order to run both Ghost and Xarta, let's first create a reverse proxy to route specific subpaths. We recommend using [Caddy](https://caddyserver.com). 

- Choose one of the [installation methods](https://caddyserver.com/docs/install) from Caddy's website.

- Add a [Caddyfile](https://caddyserver.com/docs/caddyfile) to inform Caddy of the desired configuration for the Xarta stack.

    For example, the following configuration works for both Xarta and Ghost on localhost on ports `3000` and `2368`, respectively:

    ```caddy
    :3001 {

        # Proxy /xarta subroutes to Xarta
        # DO NOT use /xarta/* as it will cause infinite redirects
        reverse_proxy /xarta* localhost:3000 {
            header_down Access-Control-Allow-Origin "*"
            header_down Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
            header_down Access-Control-Allow-Headers "Content-Type, Authorization"
        }

        # Proxy anything else to Ghost
        reverse_proxy * localhost:2368
    }
    ```
    
    - Optional: You may further restrict `Access-Control-Allow-Origin` to your domains of choice, if desired. See [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) for more information.

- Save your Caddyfile and apply it with [`caddy reload`](https://caddyserver.com/docs/command-line#caddy-reload), for example:
    ```bash
    caddy reload --config /path/to/Caddyfile
    ```

##### Install Ghost

- Setup Ghost. You may choose any of the [installation methods](https://ghost.org/docs/install/) from their website.

- Since Ghost will be accessed via reverse-proxy, we must point it to use `localhost:3001` as the default [url](https://ghost.org/docs/config/#url). 
    - If you installed Ghost on your **host**, using [Ghost-CLI config](https://ghost.org/docs/ghost-cli/#ghost-config) option run `ghost config url localhost:3001`;
    - If you installed Ghost on a **container**, provide `url=http://localhost:3001` as an environment variable to it.

- Access `localhost:3001`.
- Go to `/ghost` and create your admin user. Provide the following information:
    - Blog title
    - Email
    - Full name
    - Password
- Create an integration:
    - Go to `/ghost/#/settings/advanced`, scroll down to `Integrations` and then click `Add Custom Integration`. You can name it `Xarta`
    - Copy your `Content API key` and `Admin API key` tokens as well as the `API URL` value into an `.env` file in the root of this repository. Such file will be used by Xarta App to connect to Ghost:
    ```env
    NEXT_PUBLIC_ROOT_URL=localhost:3001
    GHOST_ADMIN_API_KEY=[[Admin API key here]]
    GHOST_CONTENT_API_KEY=[[Content API key here]]
    INTERNAL_GHOST_URL=localhost:3001
    NEXT_INTERNAL_ROOT_URL=localhost:3001
    ```
    - Copy your  into `.env`
- Close settings

- Optional: Go to labs > portal translate and choose a desired language in pub language (e.g. `pt-br`)
- Optional: Set a timezone
- Optional: Configure SMTP server


#### Run Xarta

- Ensure that you have already created the `.env` file in the repository, including the keys for Ghost configuration.
    - `NEXT_PUBLIC_ROOT_URL`
    - `GHOST_ADMIN_API_KEY`
    - `GHOST_CONTENT_API_KEY`
    - `INTERNAL_GHOST_URL`
    - `NEXT_INTERNAL_ROOT_URL`
- Run `npm ci` to install dependencies.
- Run `npm run dev`.
- Access `http://localhost:3001/xarta`


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

Next.js APIs can be accessed at `/xarta/api/` and were built to achieve functionality specific to Xarta, as well as wrap some of the Ghost APIs for convenience:

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