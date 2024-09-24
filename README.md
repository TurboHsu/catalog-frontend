# Catalog-frontend

Cats are good, so it's a web page that shows off cat pics.

## Deployment

_You will need to deploy a `catalog-go` instance. Check out [catalog-go](https://github.com/TurboHsu/catalog-go)_

Create a copy of `.env.example` and rename it to `.env`.

Here are the environment variables you need to set:

- `VITE_PAGE_SIZE`: The number of images to show per page (infinite scroll).
- `VITE_BACKEND_ADDR`: The address of the backend API server.
- `VITE_CDN_ADDR`: The address that can access cat pics.
- `VITE_APP_FOOTER_LINK`: The footer link.
- `VITE_APP_FOOTER`: The footer text.

After setting everything up, run `pnpm i` to install dependencies, then run `pnpm build` to build the project.

## Credits

Thanks to all the cats i met.
