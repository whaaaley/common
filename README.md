# common

Small helpers that fit nowhere else.

## Helpers

| Export | What it does |
| --- | --- |
| [`safe` / `safeAsync`](#safe--safeasync) | runs a callback and returns `{ data, error }` instead of throwing |
| [`pluralize`](#pluralize) | picks the singular or plural form of a word for a count |

Each helper is its own export, so importing one does not pull in the rest.

## Install

```sh
deno add jsr:@whaaaley/common
```

## Runtimes

Verified on Node 24.19.0, Node 26.7.0, and Bun 1.3.14, with all 21 tests passing under each.

Run `deno task runtimes` to reproduce it.

## safe / safeAsync

`safe` takes a synchronous callback and `safeAsync` takes one returning a promise.

```ts
import { safe, safeAsync } from '@whaaaley/common/safe'

const { data, error } = safe(() => JSON.parse(input))

if (error) {
  return
}

const { data: response, error: fetchError } = await safeAsync(() => fetch(url))
```

`error` is always an `Error`.
A thrown value that is not an `Error` is wrapped in one.

## pluralize

```ts
import { pluralize } from '@whaaaley/common/pluralize'

pluralize('file', 1) // '1 file'
pluralize('file', 2) // '2 files'
pluralize('file', 2, false) // 'files'
```

The category comes from `Intl.PluralRules`, but the plural is formed by appending `s` with no English spelling rules.
`pluralize('box', 2)` returns `2 boxs`.
