import {
    _ as v,
    d as f,
    u as T,
    s as g,
    b as r,
    x as t,
    o as s,
    c as o,
    f as l,
    y as n,
    j as u,
    z as x,
    N as H,
    F,
    A as I,
    i as B,
    k as h,
    r as y
} from './app.d0c06810.js';
const L = { key: 0, class: 'home-hero' },
    C = { key: 0, class: 'figure' },
    N = ['src', 'alt'],
    b = { key: 1, id: 'main-title', class: 'title' },
    w = { key: 2, class: 'description' },
    S = f({
        setup(i) {
            const a = T(),
                e = g(),
                _ = r(() => e.value.heroImage || m.value || c.value || $.value),
                m = r(() => e.value.heroText !== null),
                k = r(() => e.value.heroText || a.value.title),
                c = r(() => e.value.tagline !== null),
                p = r(() => e.value.tagline || a.value.description),
                $ = r(() => e.value.actionLink && e.value.actionText),
                A = r(() => e.value.altActionLink && e.value.altActionText);
            return (d, Z) =>
                t(_)
                    ? (s(),
                      o('header', L, [
                          d.$frontmatter.heroImage
                              ? (s(),
                                o('figure', C, [
                                    l(
                                        'img',
                                        {
                                            class: 'image',
                                            src: d.$withBase(
                                                d.$frontmatter.heroImage
                                            ),
                                            alt: d.$frontmatter.heroAlt
                                        },
                                        null,
                                        8,
                                        N
                                    )
                                ]))
                              : n('', !0),
                          t(m) ? (s(), o('h1', b, u(t(k)), 1)) : n('', !0),
                          t(c) ? (s(), o('p', w, u(t(p)), 1)) : n('', !0),
                          t($)
                              ? (s(),
                                x(
                                    H,
                                    {
                                        key: 3,
                                        item: {
                                            link: t(e).actionLink,
                                            text: t(e).actionText
                                        },
                                        class: 'action'
                                    },
                                    null,
                                    8,
                                    ['item']
                                ))
                              : n('', !0),
                          t(A)
                              ? (s(),
                                x(
                                    H,
                                    {
                                        key: 4,
                                        item: {
                                            link: t(e).altActionLink,
                                            text: t(e).altActionText
                                        },
                                        class: 'action alt'
                                    },
                                    null,
                                    8,
                                    ['item']
                                ))
                              : n('', !0)
                      ]))
                    : n('', !0);
        }
    });
var V = v(S, [['__scopeId', 'data-v-4aeb51c6']]);
const j = { key: 0, class: 'home-features' },
    D = { class: 'wrapper' },
    z = { class: 'container' },
    E = { class: 'features' },
    R = { key: 0, class: 'title' },
    q = { key: 1, class: 'details' },
    G = f({
        setup(i) {
            const a = g(),
                e = r(() => a.value.features && a.value.features.length > 0),
                _ = r(() => (a.value.features ? a.value.features : []));
            return (m, k) =>
                t(e)
                    ? (s(),
                      o('div', j, [
                          l('div', D, [
                              l('div', z, [
                                  l('div', E, [
                                      (s(!0),
                                      o(
                                          F,
                                          null,
                                          I(
                                              t(_),
                                              (c, p) => (
                                                  s(),
                                                  o(
                                                      'section',
                                                      {
                                                          key: p,
                                                          class: 'feature'
                                                      },
                                                      [
                                                          c.title
                                                              ? (s(),
                                                                o(
                                                                    'h2',
                                                                    R,
                                                                    u(c.title),
                                                                    1
                                                                ))
                                                              : n('', !0),
                                                          c.details
                                                              ? (s(),
                                                                o(
                                                                    'p',
                                                                    q,
                                                                    u(
                                                                        c.details
                                                                    ),
                                                                    1
                                                                ))
                                                              : n('', !0)
                                                      ]
                                                  )
                                              )
                                          ),
                                          128
                                      ))
                                  ])
                              ])
                          ])
                      ]))
                    : n('', !0);
        }
    });
var J = v(G, [['__scopeId', 'data-v-793c2722']]);
const K = {},
    M = { key: 0, class: 'footer' },
    O = { class: 'container' },
    P = { class: 'text' };
function Q(i, a) {
    return i.$frontmatter.footer
        ? (s(),
          o('footer', M, [
              l('div', O, [l('p', P, u(i.$frontmatter.footer), 1)])
          ]))
        : n('', !0);
}
var U = v(K, [
    ['render', Q],
    ['__scopeId', 'data-v-41020908']
]);
const W = { class: 'home', 'aria-labelledby': 'main-title' },
    X = { class: 'home-content' },
    Y = f({
        setup(i) {
            return (a, e) => {
                const _ = B('Content');
                return (
                    s(),
                    o('main', W, [
                        h(V),
                        y(a.$slots, 'hero', {}, void 0, !0),
                        h(J),
                        l('div', X, [h(_)]),
                        y(a.$slots, 'features', {}, void 0, !0),
                        h(U),
                        y(a.$slots, 'footer', {}, void 0, !0)
                    ])
                );
            };
        }
    });
var te = v(Y, [['__scopeId', 'data-v-cc1f894c']]);
export { te as default };
