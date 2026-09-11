# Illini Rhythm Syndicate

### Don't you wish you could pay your taxes by playing rhythm games?

Public-facing website for Illini Rhythm Syndicate (IRS), UIUC's rhythm game club. You can visit the live website at [https://uiucirs.com/](https://uiucirs.com/)

The site is built using [Astro](https://astro.build/), a modern web framework designed for building fast, content-driven websites, and styled using [Tailwind CSS](https://tailwindcss.com/), a customizable CSS framework. It also has [React](https://react.dev/) integration for any dynamic components.

## Prerequisites

In order to set up the project locally and start development, please ensure you have the following installed on your computer:

- [Node.js (>= 22.12)](https://nodejs.org/en/download/current)
- [Git](https://git-scm.com/install/)
- [VS Code](https://code.visualstudio.com/)


We also require the following VS Code extensions to ensure a consistent development experience for everyone:
  - [ESLint VS Code Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
  
Please set Astro as your default formatter for `.astro` files:

**Settings > Commonly Used > Editor: Default Formatter > Astro**

**Settings > Commonly Used > Editor: Format on Save > True**

Alternatively, paste the following into your `settings.json`

```json
{
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode",
    "editor.formatOnSave": true
  }
}
```

## Getting Started

1. Clone the repository
```
git clone https://github.com/Illini-Rhythm-Syndicate/uiucirs.com.git
```

2. Install Node dependencies
```
npm i
```

3. Start the local development server
```
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to view the site.

## Available Scripts

| Command | Action |
| :---: | :--: |
| `npm run dev` | Start the local development server at [http://localhost:4321](http://localhost:4321) |
| `npm run build` | Builds production assets into `dist/` |
| `npm run preview` | Previews the production build from `dist/` |

## Contribution Workflow

Due to the size of our team and to enforce consistency and quality in everyone's work, we enforce a strict **Branch -> Pull Request -> Merge workflow** for all commits. Direct pushes to `master` will be blocked by a ruleset. We would also prefer everyone to use commit messages in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style.

** For now, site content maintenance will also have to go through this procedure. We may want to implement a CMS in the future. **

If you are unfamiliar with what any of this means, please ask AI or reach out to the Core Infra team on Discord.

1. Sync your local branch
```
git checkout master
git pull origin master
```

2. Create a feature branch
```
git checkout -b dev/brief-description-of-feature
```

3. Develop, test, build

Please ensure content is added under the appropriate directory in the repository (i.e., images go in `assets/`, new webpage components go in `components/`, display content like blogs go in `content/appropriate-name-for-type-of-content/`)

Test your changes in development mode
```
npm run dev
```

Test the website builds with
```
npm run build
npm run preview
```

4. Commit and push
```
git add .
git commit -m "<type>: <description>
git push origin dev/your-feature-name
```

Alternatively, use the Git GUI in VS Code or the GitHub Desktop GUI

5. Open a PR
  1. Open a pull request into `master` on GitHub
  2. In the description, provide a brief summary of your changes
  3. Assign reviewers: either one Core Infra member OR two non-Core Infra members
