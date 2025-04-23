!["Xarta - A dynamic card manager"](./docs/xarta-cta.png)


# Xarta

A dynamic card manager built on top of Ghost CMS.

## Installation

### Installation with Docker (Recommended)

- Create a `.env` file in the project's root folder.
    - Set the `PROJECT_NAME` environment variable. By default, it can be set to `xarta`. Tip: If you plan on having multiple Xarta deployments, you may differentiate them by using different project names, e.g. `xarta-org-1`, `xarta-personal`, etc.
    - Configure the `GHOST_DB_PASSWORD` variable. Note: once set, Mysql will not update your password on env change.
    - Define the `PUBLIC_URL`, e.g. `http://localhost:3009`

For example, this is an example of `.env` file:

```
PROJECT_NAME=xarta-myorg
GHOST_DB_PASSWORD=PleaseChangeThis
PUBLIC_URL=http://localhost
```

- Call the `. ./prod/setup.sh` script and follow its instructions.


## Xarta Customization

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