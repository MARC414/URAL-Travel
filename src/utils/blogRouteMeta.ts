/**
 * Blog-article-only SEO, structured-data, and cover-alt helpers.
 *
 * Dynamically imported by src/App.tsx only when a /blog route is active (and
 * modulepreloaded on prerendered /blog HTML files), keeping per-article copy
 * tables and generated scheduled-blog metadata out of the eager entry bundle.
 */
export { getBengaliSeoCopy, getSeoCopy } from "./seoCopy";
export { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "./blogStructuredData";
export { generateBlogCoverAltText } from "./blogAltText";
