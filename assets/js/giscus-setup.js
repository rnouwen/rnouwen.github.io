function determineGiscusTheme() {
  
    // theme.js runs synchronously in <head> and resolves the visitor's setting (including
    // the light-by-default fallback) into a computed "light"/"dark" on <html data-theme>.
    // Read that single source of truth rather than localStorage or prefers-color-scheme,
    // so the comment widget can never disagree with the rest of the page.
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "dark" ? "dark" : "light";
  
}

(function setupGiscus() {
  let giscusTheme = determineGiscusTheme();

  let giscusAttributes = {
    src: "https://giscus.app/client.js",
    "data-repo": "rnouwen/rnouwen.github.io",
    "data-repo-id": "",
    "data-category": "Comments",
    "data-category-id": "",
    "data-mapping": "title",
    "data-strict": "1",
    "data-reactions-enabled": "1",
    "data-emit-metadata": "0",
    "data-input-position": "bottom",
    "data-theme": giscusTheme,
    "data-lang": "en",
    crossorigin: "anonymous",
    async: true,
  };

  let giscusScript = document.createElement("script");
  Object.entries(giscusAttributes).forEach(([key, value]) =>
    giscusScript.setAttribute(key, value)
  );
  document.getElementById("giscus_thread").appendChild(giscusScript);
})();

