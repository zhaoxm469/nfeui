#!/usr/bin/env zx

$`vitepress-fc dev --root=docs --host & sleep 3 node nucarf/generate-cnavconfig --watch`
setTimeout(() => $`node nucarf/generate-cnavconfig --watch` , 3000);
