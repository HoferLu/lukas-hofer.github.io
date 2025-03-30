# Skill Logos for Word Cloud

This directory is where you should place SVG logo files for the skills word cloud on your About page.

## Required Logo Files

The following SVG logo files are needed to match the skills in your `content_option.js` file:

1. `python.svg` - Python logo
2. `powerbi.svg` - Power BI logo
3. `terraform.svg` - Terraform logo
4. `gcp.svg` - Google Cloud Platform logo
5. `azure.svg` - Microsoft Azure logo
6. `sql.svg` - SQL logo
7. `react.svg` - React logo

## How to Obtain Logo Files

You can download official SVG logos from:

- [Simple Icons](https://simpleicons.org/) - Collection of brand SVG icons
- [World Vector Logo](https://worldvectorlogo.com/) - Another source for brand logos
- Official websites of each technology

## Guidelines for Logo Files

- Use SVG format for best scaling quality
- Prefer transparent backgrounds
- Try to find versions with consistent styling (solid color that will work with your theme)
- Keep file sizes small for better performance
- Rename files to match the paths in the `content_option.js` file

## Adding New Skills

When you add a new skill to your `content_option.js` file, remember to:

1. Add the corresponding logo file to this directory
2. Update the path in the skills array with the correct filename

Example:
```javascript
{
    name: "Docker",
    value: 75,
    logo: "/images/skills/docker.svg",
}
``` 