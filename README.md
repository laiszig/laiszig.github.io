# Lais Ziegler - Personal Portfolio & Blog

A modern, responsive Jekyll-based personal portfolio and blog website hosted on GitHub Pages.

## 📋 Project Overview

This is a Jekyll static site generator project that creates a personal portfolio website featuring:
- **Blog**: Write and publish technical blog posts
- **Projects**: Showcase your projects and work
- **About Page**: Personal information and skills
- **Guide Section**: Technical guides and tutorials
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Responsive Design**: Mobile-friendly layout

## 🛠️ Technology Stack

- **Jekyll** 4.4.1 - Static site generator
- **Ruby** 4.0.1 - Programming language
- **SASS/SCSS** - CSS preprocessor
- **Liquid** - Template language
- **GitHub Pages** - Hosting platform

## 🚀 Getting Started

### Prerequisites

- **Ruby** 4.0.1 or higher
  - Check version: `ruby --version`
  - Install via Homebrew (macOS): `brew install ruby`
  - Or use [rbenv](https://github.com/rbenv/rbenv) for version management

- **Bundler** (Ruby gem manager)
  - Install: `gem install bundler`

- **Git** (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/laiszig/laiszig.github.io.git
   cd laiszig.github.io
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Start the Jekyll development server:**
   ```bash
   bundle exec jekyll serve
   ```
   
   Or with live reload:
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:4000`
   - The site will automatically rebuild when you make changes

### Alternative: Using Docker

If you prefer not to install Ruby locally:

```bash
docker-compose up
```

Then visit `http://localhost:4000`

## 📁 Project Structure

```
.
├── _config.yml          # Jekyll configuration file
├── _includes/           # Reusable HTML components
│   ├── *.html          # HTML includes (header, footer, nav, etc.)
│   └── *.scss          # SASS style sheets
├── _layouts/            # Page templates
│   ├── default.html    # Main layout template
│   ├── post.html       # Blog post layout
│   ├── page.html       # Standard page layout
│   └── guide.html      # Guide section layout
├── _posts/              # Blog posts (markdown files)
│   └── projects/       # Project posts
├── _sass/               # SASS stylesheets
│   ├── base/           # Base styles (variables, normalize, general)
│   ├── components/     # Component styles (nav, footer, etc.)
│   └── pages/          # Page-specific styles
├── _data/               # Data files (YAML)
├── assets/              # Static assets
│   └── images/         # Images and media files
├── guide/               # Guide pages (markdown)
├── public/              # Public static files
│   └── js/             # JavaScript files
├── about.md             # About page content
├── projects.html        # Projects listing page
├── blog.html            # Blog listing page
├── index.html           # Home page
├── Gemfile              # Ruby dependencies
├── .ruby-version        # Ruby version specification
└── docker-compose.yml   # Docker configuration
```

### Key Files Explained

- **`_config.yml`**: Main configuration - update site title, bio, social links, theme settings
- **`_posts/`**: Add new blog posts here (format: `YYYY-MM-DD-title.md`)
- **`about.md`**: Edit your about page content
- **`assets/images/`**: Add your images here
- **`_sass/`**: Customize styles and themes
- **`_includes/`**: Reusable components (header, footer, navigation)

## ✏️ Making Changes

### Adding a New Blog Post

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-your-title.md`
2. Add front matter at the top:
   ```yaml
   ---
   title: Your Post Title
   date: 2025-01-24
   categories: [blog]
   tags: [jekyll, web-development]
   ---
   ```
3. Write your content in Markdown below the front matter

### Updating Your Profile

Edit `_config.yml` to update:
- Site title and bio (`title`, `bio`)
- Social media links (`instagram`, `linkedin`, `github`, `email`)
- Profile picture path (`picture`)
- Theme settings (`dark-theme`)
- Site description (`description`)

### Updating About Page

Edit `about.md` to change your about page content, skills, and project links.

### Customizing Styles

- Edit files in `_sass/` to customize styles
- Base variables are in `_sass/base/variables.sass` (light theme) and `_sass/base/variables-dark.sass` (dark theme)
- Component styles are in `_sass/components/`

## 🔧 Configuration

### Theme Settings

In `_config.yml`:
- `dark-theme: auto` - Automatically switches based on system preference
- `dark-theme: true` - Always use dark theme
- `dark-theme: false` - Always use light theme

### Site Width

- `width: normal` - 560px max width
- `width: large` - 810px max width (current setting)

### Enabling/Disabling Features

Toggle features in `_config.yml`:
- `blog: true/false` - Show blog section
- `projects: true/false` - Show projects section
- `about: true/false` - Show about page
- `guide: true/false` - Show guide section
- `read-time: true/false` - Show reading time on posts
- `show-tags: true/false` - Show tags on posts
- `related: true/false` - Show related posts

## 🐛 Troubleshooting

### Bundle install fails
- Make sure Ruby 4.0.1 is installed: `ruby --version`
- Update bundler: `gem update bundler`
- Try: `bundle update`

### Jekyll serve errors
- Clear Jekyll cache: `bundle exec jekyll clean`
- Check Ruby version compatibility
- Try: `bundle exec jekyll serve --trace` for detailed errors

### Port 4000 already in use
- Use a different port: `bundle exec jekyll serve --port 4001`

### SASS compilation errors
- Ensure all SASS files use spaces (not tabs) for indentation
- Check for syntax errors in SASS files
- Verify all imported files exist

## 🌐 Deployment

This site is configured for GitHub Pages. Simply push changes to your repository:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

- GitHub Pages will automatically build and deploy
- The site will be available at `https://laiszig.github.io`
- Builds typically take 1-2 minutes

## 📝 Notes

- Changes to `_config.yml` require restarting the Jekyll server
- Posts in `_posts/` are automatically detected
- The `_site/` folder is generated and should not be edited manually
- SASS files are compiled on build - edit `.sass`/`.scss` files, not generated CSS

## 🔗 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [SASS Documentation](https://sass-lang.com/documentation/)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Jekyll**
