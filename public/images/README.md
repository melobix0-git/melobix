# Portrait photos

Drop the founder headshot here as `wonders.jpg` — the About hero renders it
from `/images/wonders.jpg` (see `aboutHero.portrait` in `src/data/about.ts`).

Until the file exists, the hero card falls back to the gradient name card, so
an empty folder is safe to deploy.

Recommended processing for the original photo (4:5 crop, ~800×1000, <200 KB):

```sh
convert wonders-original.jpg \
  -resize 800x1000^ \
  -gravity North \
  -extent 800x1000 \
  -strip -quality 85 \
  public/images/wonders.jpg
```

`gravity North` keeps the face in frame; the CSS also uses
`object-position: top` as a second safeguard.
