#!/usr/bin/env zx

const { cd } = require("zx")

cd('docs/dist')
await $`http-serve`


