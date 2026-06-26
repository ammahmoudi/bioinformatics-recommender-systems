# Image Replacement Prompts

Use these prompts to generate optional replacement images for the integrated placeholder nodes in `presentation.html`. Save the generated files in an `assets/` folder and use them as CSS backgrounds for the matching `.thumb` nodes, or replace the inner placeholder `<div class="thumb ...">` with an `<img>` inside the same diagram step.

## Inception Placeholder

Filename suggestion: `assets/inception-style-concept.png`

Prompt:

> Cinematic science-fiction dream architecture scene inspired by the concept of Inception, folding city geometry, elegant academic presentation style, no text, no logos, glassy high-contrast lighting, wide 16:9 composition.

## Interstellar Placeholder

Filename suggestion: `assets/interstellar-style-concept.png`

Prompt:

> Cinematic space exploration scene inspired by Interstellar, spacecraft near a luminous planetary horizon, quiet scientific mood, no text, no logos, realistic lighting, wide 16:9 composition.

## Leonardo DiCaprio Placeholder

Filename suggestion: `assets/actor-node-placeholder.png`

Prompt:

> Editorial-style portrait placeholder for a famous movie actor node in a recommendation graph, clean cinematic lighting, neutral expression, no text, no logos, suitable for an academic slide, wide 16:9 crop.

## Titanic Placeholder

Filename suggestion: `assets/titanic-style-movie-node.png`

Prompt:

> Cinematic ocean liner movie-node placeholder, early 20th-century ship silhouette on dark blue water, dramatic but clean academic presentation style, no text, no logos, wide 16:9 composition.

## Molecular Background

Filename suggestion: `assets/molecule-background.png`

Prompt:

> High-resolution abstract molecular network visualization, atoms and bonds floating in glassy dark background, cyan, mint, amber, and rose accents, clean scientific presentation style, no text, no labels, wide 16:9 composition.

## RNA-seq / Multi-omics Background

Filename suggestion: `assets/omics-background.png`

## Optional CSS Replacement Pattern

After generating images, you can add CSS like this inside `presentation.html`:

```css
.thumb.inception {
  background-image: linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.18)), url("assets/inception-style-concept.png");
  background-size: cover;
  background-position: center;
}
```

Prompt:

> Scientific data visualization background showing layered omics profiles, gene expression heatmap motifs, subtle DNA/RNA patterns, glassy interface aesthetic, no text, no labels, wide 16:9 composition.
