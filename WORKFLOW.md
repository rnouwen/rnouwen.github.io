# Editing & Publishing Workflow

The basic procedure for making a small change to the website and previewing it locally
before publishing.

## 1. Start the local preview server

From the project folder (`/home/rnouwen/abu/rnouwen.github.io`):

```bash
bundle exec jekyll serve --livereload
```

- It builds the site, then watches for changes.
- Open **http://localhost:4000** in your browser.
- Leave this running in its own terminal while you work. `--livereload` auto-refreshes the
  browser whenever you save a file.
- First build takes ~25s; edits after that rebuild in a second or two.

## 2. Make your change

Open the relevant source file in your editor and save it. Where things live:

| To change…                              | Edit…                       |
| --------------------------------------- | --------------------------- |
| The About page                          | `_pages/about.md`           |
| A news/announcement item                | a file in `_news/`          |
| A publication                           | `_bibliography/papers.bib`  |
| Site-wide settings (title, links, menu) | `_config.yml`               |
| Images / PDFs                           | `assets/`                   |

Most content files start with a **front-matter** block (between `---` lines) holding
metadata, followed by the actual content in Markdown below it. Edit the text, save.

> One caveat: changes to **`_config.yml`** are the exception — Jekyll does *not* live-reload
> those. If you edit `_config.yml`, stop the server (`Ctrl-C`) and restart it.

## 3. Preview it

Switch to your browser at **http://localhost:4000** — with `--livereload` it refreshes on
its own. Confirm the change looks right. Iterate: edit → save → glance at the browser, as
many times as you like. Nothing is public yet; this is entirely on your laptop.

## 4. Publish when you're happy

Stop the preview server (`Ctrl-C`), then:

```bash
git add -A
git commit -m "Update about page intro"
git push origin main
```

That push triggers GitHub Actions, which rebuilds the site and deploys it. Your change is
live at **https://rnouwen.github.io** in about 1–2 minutes.

## Mental model to keep

- **`bundle exec jekyll serve`** = private preview on your laptop. Instant, safe, unlimited
  retries.
- **`git push origin main`** = publish to the world. Automatic build + deploy.
- You only ever edit files on `main` and push `main`. Everything else (the `gh-pages` branch,
  the `_site/` folder) is generated automatically — don't touch it.

That's the whole loop: **serve → edit → check browser → commit → push.**

---

## First-time / troubleshooting setup notes

If the local server or `bundle install` fails, these are the machine-specific fixes that were
needed to get the native Ruby gems building on this laptop:

- **Missing Ruby headers:** native gems fail to compile without them. Install with
  `sudo apt-get install ruby-dev` (provides `ruby.h`).
- **Bundler deadlock during install:** run single-threaded —
  `bundle config set --local jobs 1`, then `bundle install --jobs 1`.
- **Platform mismatch in `Gemfile.lock`:** this machine's Bundler names the platform
  `x86_64-linux-gnu`, but the committed `Gemfile.lock` (used by CI) uses `x86_64-linux`.
  The lockfile is marked `skip-worktree` so the local platform variant is not committed
  (`git update-index --skip-worktree Gemfile.lock`, then
  `bundle lock --add-platform x86_64-linux-gnu`). Do **not** commit the `-gnu` lockfile — it
  could break CI's Bundler.
- **Sass deprecation warnings** from the vendored tabler-icons during a build are harmless.
