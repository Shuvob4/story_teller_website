import { defineConfig } from "tinacms";

const branch = process.env.TINA_BRANCH || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "work",
        label: "Work Items",
        path: "src/content/work",
        format: "mdx",
        fields: [
          { name: "title", label: "Title", type: "string", required: true },
          {
            name: "category",
            label: "Category",
            type: "string",
            required: true,
            options: [
              "Street Photography",
              "Videography",
              "Urban/Street Videography",
              "Video Editing",
            ],
          },
          { name: "thumbnail", label: "Thumbnail", type: "image", required: true },
          { name: "embedUrl", label: "Embed URL (YouTube/Vimeo)", type: "string" },
          { name: "description", label: "Description", type: "rich-text" },
          { name: "featured", label: "Featured", type: "boolean" },
          { name: "sortOrder", label: "Sort Order", type: "number" },
        ],
      },
      {
        name: "home",
        label: "Home Page",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "home" },
        fields: [
          { name: "heroVideoUrl", label: "Hero Video URL", type: "string" },
          { name: "heroPosterImage", label: "Hero Poster Image", type: "image" },
          {
            name: "aboutTeaserText",
            label: "About Teaser Text",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "aboutPortrait", label: "About Portrait", type: "image" },
          { name: "aboutPortraitAlt", label: "Portrait Alt Text", type: "string" },
        ],
      },
      {
        name: "about",
        label: "About Page",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "about" },
        fields: [
          {
            name: "biography",
            label: "Biography",
            type: "string",
            ui: { component: "textarea" },
          },
          { name: "portrait", label: "Portrait Image", type: "image" },
          { name: "portraitAlt", label: "Portrait Alt Text", type: "string" },
          { name: "storyCopy", label: "Story / Values", type: "rich-text" },
        ],
      },
      {
        name: "services",
        label: "Services Page",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "services" },
        fields: [
          {
            name: "services",
            label: "Service Tiers",
            type: "object",
            list: true,
            fields: [
              { name: "title", label: "Title", type: "string", required: true },
              { name: "description", label: "Description", type: "string", required: true },
              {
                name: "items",
                label: "Included Items",
                type: "string",
                list: true,
              },
            ],
          },
        ],
      },
      {
        name: "meta",
        label: "Site Metadata",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "meta" },
        fields: [
          { name: "siteTitle", label: "Site Title", type: "string" },
          { name: "siteDescription", label: "Site Description", type: "string" },
          { name: "ogImage", label: "Default OG Image", type: "image" },
        ],
      },
    ],
  },
});
