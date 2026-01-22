# Urtopia US Shopify Theme - Developer Guide

## 1. Getting Started

### Prerequisites

| Software | Version | Purpose |
|----------|----------|----------|
| Node.js | 18.0+ | JavaScript runtime |
| npm | 9.0+ | Package manager |
| Shopify CLI | 3.0+ | Theme development |

### Installation

```bash
# Install Node.js
# Download from https://nodejs.org/ and install LTS version

# Verify installation
node --version
npm --version

# Install Shopify CLI
npm install -g @shopify/cli
shopify version

# Clone and setup
git clone https://github.com/ErpanOmer/urtopia-us.git
cd urtopia-us
npm install
```

---

## 2. Development Workflow

### Project Structure

```
urtopia-us/
├── assets/           # CSS, JS, SCSS files
├── config/           # Theme settings
├── layout/           # Page layouts
├── locales/          # 30+ language files
├── sections/         # Page sections
├── snippets/         # Reusable components
├── templates/        # Page templates
└── config.yml        # Shopify CLI config
```

### Development Steps

1. **Pull latest code**
   ```bash
   git checkout master
   git pull origin master
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   - Compiles Tailwind CSS automatically
   - Syncs changes to Shopify in real-time

3. **Edit files**
   - Liquid templates: `sections/`, `snippets/`, `templates/`
   - Styles: `assets/*.css`, `assets/*.scss`
   - Scripts: `assets/*.js`

4. **Preview changes**
   - Visit Shopify admin: https://urtopia.myshopify.com/admin/themes
   - Preview development theme

### Coding Standards

**Liquid**
- Use `{% render %}` instead of `{% include %}` for performance
- File names: `kebab-case.liquid`
- Variables: `snake_case`

**CSS**
- Use Tailwind utility classes
- Custom classes: prefix with `er-`
- SCSS: BEM naming convention

**JavaScript**
- ES6+ syntax
- Event delegation for dynamic elements

---

## 3. Configuration Guide

### Shopify CLI (config.yml)

```yaml
development:
  password: shptka_dab499d4c49564633f7e939fd532c667
  theme_id: "133930189048"
  store: urtopia.myshopify.com
```

### Tailwind CSS (tailwind.config.js)

```javascript
export default {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.liquid'
  ],
  prefix: 'er-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: {
        mb: { max: '768px' },
        headermb: { max: '989px' }
      },
      colors: {
        primary: '#FD4B17',
        dark: '#242729',
        salecolor: '#D50B28'
      }
    }
  }
}
```

### Theme Settings (config/settings_schema.json)

Add custom options in `settings_schema.json`:

```json
{
  "name": "global_variable",
  "settings": [
    {
      "type": "text",
      "id": "sale_name",
      "label": "Sale Name",
      "default": "Independence Day Sale"
    },
    {
      "type": "checkbox",
      "id": "hide_sale_countdown",
      "default": false,
      "label": "Hide Countdown"
    }
  ]
}
```

Access in Liquid: `{{ settings.sale_name }}`

---

## 4. Deployment Process

### Local Preview

```bash
npm run dev
# Preview at Shopify admin
```

### Publish to Production

```bash
# 1. Verify all changes are committed
git status

# 2. Preview in Shopify admin
# https://urtopia.myshopify.com/admin/themes

# 3. Publish theme
shopify theme publish -s urtopia.myshopify.com
```

⚠️ **Warning**: This replaces the live theme. Test thoroughly before publishing.

### Deployment Commands

| Command | Purpose |
|---------|----------|
| `npm run dev` | Start development server |
| `npm run css` | Compile Tailwind CSS |
| `npm run pull` | Pull live theme from Shopify |
| `npm run list` | List all themes |
| `shopify theme publish` | Publish to production |

---

## 5. Push Procedures

### Git Commit Flow

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add product comparison feature"

# Push to remote
git push origin master
```

### Pre-push Hook

The `.git/hooks/pre-push` hook automatically syncs theme files to Shopify on push.

**Behavior:**
- Only runs on `master` branch
- Syncs only changed files from last commit
- Skips non-theme files (package.json, configs, docs)
- Exits with code 0 on non-master branches (allows push without sync)

**Synced Directories:**
- `sections/`, `templates/`, `snippets/`, `assets/`, `config/`, `locales/`

### Manual Sync

```bash
# Sync last commit changes
npm run shopify:sync

# Sync specific files
shopify theme push --store urtopia.myshopify.com --theme 133930189048 --allow-live --only "sections/header.liquid"
```

### Branch Management

**Create backup branch:**
```bash
npm run backup
# Creates branch: vYYYY.MM.DD
```

**Switch branches:**
```bash
git checkout v2026.01.22
```

**Merge to master:**
```bash
git checkout master
git merge v2026.01.22
```

---

## 6. Backup Strategy

### Create Backup

```bash
npm run backup
```

**Output:**
```
step:1 -------> git checkout master
step:2 -------> git checkout -B v2026.01.22
step:3 -------> git push origin v2026.01.22 -f
step:4 -------> git checkout master
```

### Restore from Backup

```bash
# Switch to backup branch
git checkout v2026.01.22

# View history
git log

# Merge to master (if needed)
git checkout master
git merge v2026.01.22
```

### List All Backups

```bash
git branch -a | grep v
```

### Backup Best Practices

| Scenario | Frequency |
|----------|------------|
| Daily development | Once per day (end of day) |
| Important changes | Immediately before change |
| Version release | Mandatory before release |

**Naming Convention:** `vYYYY.MM.DD`

**Retention:**
- Daily backups: 30 days
- Release backups: Permanent

---

## Quick Reference

### Essential Commands

```bash
npm run dev              # Start development
npm run css              # Compile CSS
npm run pull             # Pull from Shopify
npm run push             # Push to Git (triggers sync)
npm run backup           # Create backup
npm run shopify:sync     # Manual sync
```

### File Locations

| File | Purpose |
|------|----------|
| `config.yml` | Shopify CLI configuration |
| `tailwind.config.js` | Tailwind CSS settings |
| `settings_schema.json` | Theme customization |
| `.git/hooks/pre-push` | Auto-sync hook |
| `shopify-sync.js` | Manual sync script |

### Resources

- [Shopify CLI Docs](https://shopify.dev/docs/themes/tools/cli/commands)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Version**: 1.0.0
**Last Updated**: 2026-01-22
