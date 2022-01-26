var zo = Object.defineProperty,
    Vo = Object.defineProperties;
var Jo = Object.getOwnPropertyDescriptors;
var Vs = Object.getOwnPropertySymbols;
var Yo = Object.prototype.hasOwnProperty,
    Xo = Object.prototype.propertyIsEnumerable;
var Js = (e, t, n) =>
        t in e
            ? zo(e, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: n
              })
            : (e[t] = n),
    ze = (e, t) => {
        for (var n in t || (t = {})) Yo.call(t, n) && Js(e, n, t[n]);
        if (Vs) for (var n of Vs(t)) Xo.call(t, n) && Js(e, n, t[n]);
        return e;
    },
    mt = (e, t) => Vo(e, Jo(t));
function Wn(e, t) {
    const n = Object.create(null),
        s = e.split(',');
    for (let r = 0; r < s.length; r++) n[s[r]] = !0;
    return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const Zo =
        'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
    Qo = Wn(Zo);
function Ys(e) {
    return !!e || e === '';
}
function qn(e) {
    if (H(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = he(s) ? ti(s) : qn(s);
            if (r) for (const o in r) t[o] = r[o];
        }
        return t;
    } else {
        if (he(e)) return e;
        if (ae(e)) return e;
    }
}
const Go = /;(?![^(]*\))/g,
    ei = /:(.+)/;
function ti(e) {
    const t = {};
    return (
        e.split(Go).forEach((n) => {
            if (n) {
                const s = n.split(ei);
                s.length > 1 && (t[s[0].trim()] = s[1].trim());
            }
        }),
        t
    );
}
function De(e) {
    let t = '';
    if (he(e)) t = e;
    else if (H(e))
        for (let n = 0; n < e.length; n++) {
            const s = De(e[n]);
            s && (t += s + ' ');
        }
    else if (ae(e)) for (const n in e) e[n] && (t += n + ' ');
    return t.trim();
}
const Ce = (e) =>
        e == null
            ? ''
            : H(e) || (ae(e) && (e.toString === Gs || !j(e.toString)))
            ? JSON.stringify(e, Xs, 2)
            : String(e),
    Xs = (e, t) =>
        t && t.__v_isRef
            ? Xs(e, t.value)
            : bt(t)
            ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                      (n, [s, r]) => ((n[`${s} =>`] = r), n),
                      {}
                  )
              }
            : Zs(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : ae(t) && !H(t) && !er(t)
            ? String(t)
            : t,
    ee = {},
    vt = [],
    Me = () => {},
    ni = () => !1,
    si = /^on[^a-z]/,
    Nt = (e) => si.test(e),
    zn = (e) => e.startsWith('onUpdate:'),
    _e = Object.assign,
    Vn = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    ri = Object.prototype.hasOwnProperty,
    J = (e, t) => ri.call(e, t),
    H = Array.isArray,
    bt = (e) => tn(e) === '[object Map]',
    Zs = (e) => tn(e) === '[object Set]',
    j = (e) => typeof e == 'function',
    he = (e) => typeof e == 'string',
    Jn = (e) => typeof e == 'symbol',
    ae = (e) => e !== null && typeof e == 'object',
    Qs = (e) => ae(e) && j(e.then) && j(e.catch),
    Gs = Object.prototype.toString,
    tn = (e) => Gs.call(e),
    oi = (e) => tn(e).slice(8, -1),
    er = (e) => tn(e) === '[object Object]',
    Yn = (e) =>
        he(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
    Bt = Wn(
        ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
    ),
    nn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    ii = /-(\w)/g,
    Re = nn((e) => e.replace(ii, (t, n) => (n ? n.toUpperCase() : ''))),
    li = /\B([A-Z])/g,
    yt = nn((e) => e.replace(li, '-$1').toLowerCase()),
    sn = nn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Xn = nn((e) => (e ? `on${sn(e)}` : '')),
    Ht = (e, t) => !Object.is(e, t),
    Zn = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    rn = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        });
    },
    ci = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let tr;
const ai = () =>
    tr ||
    (tr =
        typeof globalThis != 'undefined'
            ? globalThis
            : typeof self != 'undefined'
            ? self
            : typeof window != 'undefined'
            ? window
            : typeof global != 'undefined'
            ? global
            : {});
let nt;
const on = [];
class ui {
    constructor(t = !1) {
        (this.active = !0),
            (this.effects = []),
            (this.cleanups = []),
            !t &&
                nt &&
                ((this.parent = nt),
                (this.index = (nt.scopes || (nt.scopes = [])).push(this) - 1));
    }
    run(t) {
        if (this.active)
            try {
                return this.on(), t();
            } finally {
                this.off();
            }
    }
    on() {
        this.active && (on.push(this), (nt = this));
    }
    off() {
        this.active && (on.pop(), (nt = on[on.length - 1]));
    }
    stop(t) {
        if (this.active) {
            if (
                (this.effects.forEach((n) => n.stop()),
                this.cleanups.forEach((n) => n()),
                this.scopes && this.scopes.forEach((n) => n.stop(!0)),
                this.parent && !t)
            ) {
                const n = this.parent.scopes.pop();
                n &&
                    n !== this &&
                    ((this.parent.scopes[this.index] = n),
                    (n.index = this.index));
            }
            this.active = !1;
        }
    }
}
function fi(e, t) {
    (t = t || nt), t && t.active && t.effects.push(e);
}
const Qn = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    nr = (e) => (e.w & Ve) > 0,
    sr = (e) => (e.n & Ve) > 0,
    di = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ve;
    },
    hi = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let s = 0; s < t.length; s++) {
                const r = t[s];
                nr(r) && !sr(r) ? r.delete(e) : (t[n++] = r),
                    (r.w &= ~Ve),
                    (r.n &= ~Ve);
            }
            t.length = n;
        }
    },
    Gn = new WeakMap();
let Ut = 0,
    Ve = 1;
const es = 30,
    xt = [];
let st;
const rt = Symbol(''),
    ts = Symbol('');
class ns {
    constructor(t, n = null, s) {
        (this.fn = t),
            (this.scheduler = n),
            (this.active = !0),
            (this.deps = []),
            fi(this, s);
    }
    run() {
        if (!this.active) return this.fn();
        if (!xt.length || !xt.includes(this))
            try {
                return (
                    xt.push((st = this)),
                    pi(),
                    (Ve = 1 << ++Ut),
                    Ut <= es ? di(this) : rr(this),
                    this.fn()
                );
            } finally {
                Ut <= es && hi(this), (Ve = 1 << --Ut), ot(), xt.pop();
                const t = xt.length;
                st = t > 0 ? xt[t - 1] : void 0;
            }
    }
    stop() {
        this.active &&
            (rr(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function rr(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let wt = !0;
const ss = [];
function Ct() {
    ss.push(wt), (wt = !1);
}
function pi() {
    ss.push(wt), (wt = !0);
}
function ot() {
    const e = ss.pop();
    wt = e === void 0 ? !0 : e;
}
function $e(e, t, n) {
    if (!or()) return;
    let s = Gn.get(e);
    s || Gn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Qn())), ir(r);
}
function or() {
    return wt && st !== void 0;
}
function ir(e, t) {
    let n = !1;
    Ut <= es ? sr(e) || ((e.n |= Ve), (n = !nr(e))) : (n = !e.has(st)),
        n && (e.add(st), st.deps.push(e));
}
function je(e, t, n, s, r, o) {
    const i = Gn.get(e);
    if (!i) return;
    let l = [];
    if (t === 'clear') l = [...i.values()];
    else if (n === 'length' && H(e))
        i.forEach((c, f) => {
            (f === 'length' || f >= s) && l.push(c);
        });
    else
        switch ((n !== void 0 && l.push(i.get(n)), t)) {
            case 'add':
                H(e)
                    ? Yn(n) && l.push(i.get('length'))
                    : (l.push(i.get(rt)), bt(e) && l.push(i.get(ts)));
                break;
            case 'delete':
                H(e) || (l.push(i.get(rt)), bt(e) && l.push(i.get(ts)));
                break;
            case 'set':
                bt(e) && l.push(i.get(rt));
                break;
        }
    if (l.length === 1) l[0] && rs(l[0]);
    else {
        const c = [];
        for (const f of l) f && c.push(...f);
        rs(Qn(c));
    }
}
function rs(e, t) {
    for (const n of H(e) ? e : [...e])
        (n !== st || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const _i = Wn('__proto__,__v_isRef,__isVue'),
    lr = new Set(
        Object.getOwnPropertyNames(Symbol)
            .map((e) => Symbol[e])
            .filter(Jn)
    ),
    gi = os(),
    mi = os(!1, !0),
    vi = os(!0),
    cr = bi();
function bi() {
    const e = {};
    return (
        ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
            e[t] = function (...n) {
                const s = Y(this);
                for (let o = 0, i = this.length; o < i; o++)
                    $e(s, 'get', o + '');
                const r = s[t](...n);
                return r === -1 || r === !1 ? s[t](...n.map(Y)) : r;
            };
        }),
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
            e[t] = function (...n) {
                Ct();
                const s = Y(this)[t].apply(this, n);
                return ot(), s;
            };
        }),
        e
    );
}
function os(e = !1, t = !1) {
    return function (s, r, o) {
        if (r === '__v_isReactive') return !e;
        if (r === '__v_isReadonly') return e;
        if (r === '__v_isShallow') return t;
        if (r === '__v_raw' && o === (e ? (t ? Fi : mr) : t ? gr : _r).get(s))
            return s;
        const i = H(s);
        if (!e && i && J(cr, r)) return Reflect.get(cr, r, o);
        const l = Reflect.get(s, r, o);
        return (Jn(r) ? lr.has(r) : _i(r)) || (e || $e(s, 'get', r), t)
            ? l
            : fe(l)
            ? !i || !Yn(r)
                ? l.value
                : l
            : ae(l)
            ? e
                ? hn(l)
                : $t(l)
            : l;
    };
}
const yi = ar(),
    xi = ar(!0);
function ar(e = !1) {
    return function (n, s, r, o) {
        let i = n[s];
        if (Dt(i) && fe(i) && !fe(r)) return !1;
        if (
            !e &&
            !Dt(r) &&
            (vr(r) || ((r = Y(r)), (i = Y(i))), !H(n) && fe(i) && !fe(r))
        )
            return (i.value = r), !0;
        const l = H(n) && Yn(s) ? Number(s) < n.length : J(n, s),
            c = Reflect.set(n, s, r, o);
        return (
            n === Y(o) &&
                (l ? Ht(r, i) && je(n, 'set', s, r) : je(n, 'add', s, r)),
            c
        );
    };
}
function wi(e, t) {
    const n = J(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && je(e, 'delete', t, void 0), s;
}
function Ci(e, t) {
    const n = Reflect.has(e, t);
    return (!Jn(t) || !lr.has(t)) && $e(e, 'has', t), n;
}
function $i(e) {
    return $e(e, 'iterate', H(e) ? 'length' : rt), Reflect.ownKeys(e);
}
const ur = { get: gi, set: yi, deleteProperty: wi, has: Ci, ownKeys: $i },
    ki = {
        get: vi,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        }
    },
    Ei = _e({}, ur, { get: mi, set: xi }),
    is = (e) => e,
    ln = (e) => Reflect.getPrototypeOf(e);
function cn(e, t, n = !1, s = !1) {
    e = e.__v_raw;
    const r = Y(e),
        o = Y(t);
    t !== o && !n && $e(r, 'get', t), !n && $e(r, 'get', o);
    const { has: i } = ln(r),
        l = s ? is : n ? as : jt;
    if (i.call(r, t)) return l(e.get(t));
    if (i.call(r, o)) return l(e.get(o));
    e !== r && e.get(t);
}
function an(e, t = !1) {
    const n = this.__v_raw,
        s = Y(n),
        r = Y(e);
    return (
        e !== r && !t && $e(s, 'has', e),
        !t && $e(s, 'has', r),
        e === r ? n.has(e) : n.has(e) || n.has(r)
    );
}
function un(e, t = !1) {
    return (
        (e = e.__v_raw),
        !t && $e(Y(e), 'iterate', rt),
        Reflect.get(e, 'size', e)
    );
}
function fr(e) {
    e = Y(e);
    const t = Y(this);
    return ln(t).has.call(t, e) || (t.add(e), je(t, 'add', e, e)), this;
}
function dr(e, t) {
    t = Y(t);
    const n = Y(this),
        { has: s, get: r } = ln(n);
    let o = s.call(n, e);
    o || ((e = Y(e)), (o = s.call(n, e)));
    const i = r.call(n, e);
    return (
        n.set(e, t),
        o ? Ht(t, i) && je(n, 'set', e, t) : je(n, 'add', e, t),
        this
    );
}
function hr(e) {
    const t = Y(this),
        { has: n, get: s } = ln(t);
    let r = n.call(t, e);
    r || ((e = Y(e)), (r = n.call(t, e))), s && s.call(t, e);
    const o = t.delete(e);
    return r && je(t, 'delete', e, void 0), o;
}
function pr() {
    const e = Y(this),
        t = e.size !== 0,
        n = e.clear();
    return t && je(e, 'clear', void 0, void 0), n;
}
function fn(e, t) {
    return function (s, r) {
        const o = this,
            i = o.__v_raw,
            l = Y(i),
            c = t ? is : e ? as : jt;
        return (
            !e && $e(l, 'iterate', rt),
            i.forEach((f, h) => s.call(r, c(f), c(h), o))
        );
    };
}
function dn(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            o = Y(r),
            i = bt(o),
            l = e === 'entries' || (e === Symbol.iterator && i),
            c = e === 'keys' && i,
            f = r[e](...s),
            h = n ? is : t ? as : jt;
        return (
            !t && $e(o, 'iterate', c ? ts : rt),
            {
                next() {
                    const { value: v, done: b } = f.next();
                    return b
                        ? { value: v, done: b }
                        : { value: l ? [h(v[0]), h(v[1])] : h(v), done: b };
                },
                [Symbol.iterator]() {
                    return this;
                }
            }
        );
    };
}
function Je(e) {
    return function (...t) {
        return e === 'delete' ? !1 : this;
    };
}
function Ti() {
    const e = {
            get(o) {
                return cn(this, o);
            },
            get size() {
                return un(this);
            },
            has: an,
            add: fr,
            set: dr,
            delete: hr,
            clear: pr,
            forEach: fn(!1, !1)
        },
        t = {
            get(o) {
                return cn(this, o, !1, !0);
            },
            get size() {
                return un(this);
            },
            has: an,
            add: fr,
            set: dr,
            delete: hr,
            clear: pr,
            forEach: fn(!1, !0)
        },
        n = {
            get(o) {
                return cn(this, o, !0);
            },
            get size() {
                return un(this, !0);
            },
            has(o) {
                return an.call(this, o, !0);
            },
            add: Je('add'),
            set: Je('set'),
            delete: Je('delete'),
            clear: Je('clear'),
            forEach: fn(!0, !1)
        },
        s = {
            get(o) {
                return cn(this, o, !0, !0);
            },
            get size() {
                return un(this, !0);
            },
            has(o) {
                return an.call(this, o, !0);
            },
            add: Je('add'),
            set: Je('set'),
            delete: Je('delete'),
            clear: Je('clear'),
            forEach: fn(!0, !0)
        };
    return (
        ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
            (e[o] = dn(o, !1, !1)),
                (n[o] = dn(o, !0, !1)),
                (t[o] = dn(o, !1, !0)),
                (s[o] = dn(o, !0, !0));
        }),
        [e, n, t, s]
    );
}
const [Li, Si, Ai, Pi] = Ti();
function ls(e, t) {
    const n = t ? (e ? Pi : Ai) : e ? Si : Li;
    return (s, r, o) =>
        r === '__v_isReactive'
            ? !e
            : r === '__v_isReadonly'
            ? e
            : r === '__v_raw'
            ? s
            : Reflect.get(J(n, r) && r in s ? n : s, r, o);
}
const Mi = { get: ls(!1, !1) },
    Ii = { get: ls(!1, !0) },
    Oi = { get: ls(!0, !1) },
    _r = new WeakMap(),
    gr = new WeakMap(),
    mr = new WeakMap(),
    Fi = new WeakMap();
function Ri(e) {
    switch (e) {
        case 'Object':
        case 'Array':
            return 1;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2;
        default:
            return 0;
    }
}
function Ni(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Ri(oi(e));
}
function $t(e) {
    return Dt(e) ? e : cs(e, !1, ur, Mi, _r);
}
function Bi(e) {
    return cs(e, !1, Ei, Ii, gr);
}
function hn(e) {
    return cs(e, !0, ki, Oi, mr);
}
function cs(e, t, n, s, r) {
    if (!ae(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const o = r.get(e);
    if (o) return o;
    const i = Ni(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? s : n);
    return r.set(e, l), l;
}
function kt(e) {
    return Dt(e) ? kt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Dt(e) {
    return !!(e && e.__v_isReadonly);
}
function vr(e) {
    return !!(e && e.__v_isShallow);
}
function br(e) {
    return kt(e) || Dt(e);
}
function Y(e) {
    const t = e && e.__v_raw;
    return t ? Y(t) : e;
}
function pn(e) {
    return rn(e, '__v_skip', !0), e;
}
const jt = (e) => (ae(e) ? $t(e) : e),
    as = (e) => (ae(e) ? hn(e) : e);
function yr(e) {
    or() && ((e = Y(e)), e.dep || (e.dep = Qn()), ir(e.dep));
}
function xr(e, t) {
    (e = Y(e)), e.dep && rs(e.dep);
}
function fe(e) {
    return Boolean(e && e.__v_isRef === !0);
}
function Ye(e) {
    return Hi(e, !1);
}
function Hi(e, t) {
    return fe(e) ? e : new Ui(e, t);
}
class Ui {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : Y(t)),
            (this._value = n ? t : jt(t));
    }
    get value() {
        return yr(this), this._value;
    }
    set value(t) {
        (t = this.__v_isShallow ? t : Y(t)),
            Ht(t, this._rawValue) &&
                ((this._rawValue = t),
                (this._value = this.__v_isShallow ? t : jt(t)),
                xr(this));
    }
}
function F(e) {
    return fe(e) ? e.value : e;
}
const Di = {
    get: (e, t, n) => F(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
    }
};
function wr(e) {
    return kt(e) ? e : new Proxy(e, Di);
}
function _n(e) {
    const t = H(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = Ki(e, n);
    return t;
}
class ji {
    constructor(t, n, s) {
        (this._object = t),
            (this._key = n),
            (this._defaultValue = s),
            (this.__v_isRef = !0);
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
        this._object[this._key] = t;
    }
}
function Ki(e, t, n) {
    const s = e[t];
    return fe(s) ? s : new ji(e, t, n);
}
class Wi {
    constructor(t, n, s, r) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._dirty = !0),
            (this.effect = new ns(t, () => {
                this._dirty || ((this._dirty = !0), xr(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !r),
            (this.__v_isReadonly = s);
    }
    get value() {
        const t = Y(this);
        return (
            yr(t),
            (t._dirty || !t._cacheable) &&
                ((t._dirty = !1), (t._value = t.effect.run())),
            t._value
        );
    }
    set value(t) {
        this._setter(t);
    }
}
function qi(e, t, n = !1) {
    let s, r;
    const o = j(e);
    return (
        o ? ((s = e), (r = Me)) : ((s = e.get), (r = e.set)),
        new Wi(s, r, o || !r, n)
    );
}
Promise.resolve();
function Xe(e, t, n, s) {
    let r;
    try {
        r = s ? e(...s) : e();
    } catch (o) {
        Kt(o, t, n);
    }
    return r;
}
function Te(e, t, n, s) {
    if (j(e)) {
        const o = Xe(e, t, n, s);
        return (
            o &&
                Qs(o) &&
                o.catch((i) => {
                    Kt(i, t, n);
                }),
            o
        );
    }
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(Te(e[o], t, n, s));
    return r;
}
function Kt(e, t, n, s = !0) {
    const r = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy,
            l = n;
        for (; o; ) {
            const f = o.ec;
            if (f) {
                for (let h = 0; h < f.length; h++)
                    if (f[h](e, i, l) === !1) return;
            }
            o = o.parent;
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            Xe(c, null, 10, [e, i, l]);
            return;
        }
    }
    zi(e, n, r, s);
}
function zi(e, t, n, s = !0) {
    console.error(e);
}
let gn = !1,
    us = !1;
const ke = [];
let Ke = 0;
const Wt = [];
let qt = null,
    Et = 0;
const zt = [];
let Ze = null,
    Tt = 0;
const Cr = Promise.resolve();
let fs = null,
    ds = null;
function $r(e) {
    const t = fs || Cr;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Vi(e) {
    let t = Ke + 1,
        n = ke.length;
    for (; t < n; ) {
        const s = (t + n) >>> 1;
        Vt(ke[s]) < e ? (t = s + 1) : (n = s);
    }
    return t;
}
function hs(e) {
    (!ke.length || !ke.includes(e, gn && e.allowRecurse ? Ke + 1 : Ke)) &&
        e !== ds &&
        (e.id == null ? ke.push(e) : ke.splice(Vi(e.id), 0, e), kr());
}
function kr() {
    !gn && !us && ((us = !0), (fs = Cr.then(Tr)));
}
function Ji(e) {
    const t = ke.indexOf(e);
    t > Ke && ke.splice(t, 1);
}
function Er(e, t, n, s) {
    H(e)
        ? n.push(...e)
        : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
        kr();
}
function Yi(e) {
    Er(e, qt, Wt, Et);
}
function Xi(e) {
    Er(e, Ze, zt, Tt);
}
function ps(e, t = null) {
    if (Wt.length) {
        for (
            ds = t, qt = [...new Set(Wt)], Wt.length = 0, Et = 0;
            Et < qt.length;
            Et++
        )
            qt[Et]();
        (qt = null), (Et = 0), (ds = null), ps(e, t);
    }
}
function mn(e) {
    if (zt.length) {
        const t = [...new Set(zt)];
        if (((zt.length = 0), Ze)) {
            Ze.push(...t);
            return;
        }
        for (
            Ze = t, Ze.sort((n, s) => Vt(n) - Vt(s)), Tt = 0;
            Tt < Ze.length;
            Tt++
        )
            Ze[Tt]();
        (Ze = null), (Tt = 0);
    }
}
const Vt = (e) => (e.id == null ? 1 / 0 : e.id);
function Tr(e) {
    (us = !1), (gn = !0), ps(e), ke.sort((n, s) => Vt(n) - Vt(s));
    const t = Me;
    try {
        for (Ke = 0; Ke < ke.length; Ke++) {
            const n = ke[Ke];
            n && n.active !== !1 && Xe(n, null, 14);
        }
    } finally {
        (Ke = 0),
            (ke.length = 0),
            mn(),
            (gn = !1),
            (fs = null),
            (ke.length || Wt.length || zt.length) && Tr(e);
    }
}
function Zi(e, t, ...n) {
    const s = e.vnode.props || ee;
    let r = n;
    const o = t.startsWith('update:'),
        i = o && t.slice(7);
    if (i && i in s) {
        const h = `${i === 'modelValue' ? 'model' : i}Modifiers`,
            { number: v, trim: b } = s[h] || ee;
        b ? (r = n.map(($) => $.trim())) : v && (r = n.map(ci));
    }
    let l,
        c = s[(l = Xn(t))] || s[(l = Xn(Re(t)))];
    !c && o && (c = s[(l = Xn(yt(t)))]), c && Te(c, e, 6, r);
    const f = s[l + 'Once'];
    if (f) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        (e.emitted[l] = !0), Te(f, e, 6, r);
    }
}
function Lr(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const o = e.emits;
    let i = {},
        l = !1;
    if (!j(e)) {
        const c = (f) => {
            const h = Lr(f, t, !0);
            h && ((l = !0), _e(i, h));
        };
        !n && t.mixins.length && t.mixins.forEach(c),
            e.extends && c(e.extends),
            e.mixins && e.mixins.forEach(c);
    }
    return !o && !l
        ? (s.set(e, null), null)
        : (H(o) ? o.forEach((c) => (i[c] = null)) : _e(i, o), s.set(e, i), i);
}
function _s(e, t) {
    return !e || !Nt(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, '')),
          J(e, t[0].toLowerCase() + t.slice(1)) || J(e, yt(t)) || J(e, t));
}
let Ee = null,
    vn = null;
function bn(e) {
    const t = Ee;
    return (Ee = e), (vn = (e && e.type.__scopeId) || null), t;
}
function Sr(e) {
    vn = e;
}
function Ar() {
    vn = null;
}
function Ne(e, t = Ee, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && ro(-1);
        const o = bn(t),
            i = e(...r);
        return bn(o), s._d && ro(1), i;
    };
    return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function gs(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: r,
        props: o,
        propsOptions: [i],
        slots: l,
        attrs: c,
        emit: f,
        render: h,
        renderCache: v,
        data: b,
        setupState: $,
        ctx: E,
        inheritAttrs: N
    } = e;
    let p, y;
    const O = bn(e);
    try {
        if (n.shapeFlag & 4) {
            const R = r || s;
            (p = Ie(h.call(R, R, v, o, $, b, E))), (y = c);
        } else {
            const R = t;
            (p = Ie(
                R.length > 1
                    ? R(o, { attrs: c, slots: l, emit: f })
                    : R(o, null)
            )),
                (y = t.props ? c : Qi(c));
        }
    } catch (R) {
        (Zt.length = 0), Kt(R, e, 1), (p = U(Se));
    }
    let S = p;
    if (y && N !== !1) {
        const R = Object.keys(y),
            { shapeFlag: q } = S;
        R.length &&
            q & (1 | 6) &&
            (i && R.some(zn) && (y = Gi(y, i)), (S = At(S, y)));
    }
    return (
        n.dirs && (S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs),
        n.transition && (S.transition = n.transition),
        (p = S),
        bn(O),
        p
    );
}
const Qi = (e) => {
        let t;
        for (const n in e)
            (n === 'class' || n === 'style' || Nt(n)) &&
                ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Gi = (e, t) => {
        const n = {};
        for (const s in e) (!zn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function el(e, t, n) {
    const { props: s, children: r, component: o } = e,
        { props: i, children: l, patchFlag: c } = t,
        f = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return s ? Pr(s, i, f) : !!i;
        if (c & 8) {
            const h = t.dynamicProps;
            for (let v = 0; v < h.length; v++) {
                const b = h[v];
                if (i[b] !== s[b] && !_s(f, b)) return !0;
            }
        }
    } else
        return (r || l) && (!l || !l.$stable)
            ? !0
            : s === i
            ? !1
            : s
            ? i
                ? Pr(s, i, f)
                : !0
            : !!i;
    return !1;
}
function Pr(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (t[o] !== e[o] && !_s(n, o)) return !0;
    }
    return !1;
}
function tl({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const nl = (e) => e.__isSuspense;
function Mr(e, t) {
    t && t.pendingBranch
        ? H(e)
            ? t.effects.push(...e)
            : t.effects.push(e)
        : Xi(e);
}
function sl(e, t) {
    if (ue) {
        let n = ue.provides;
        const s = ue.parent && ue.parent.provides;
        s === n && (n = ue.provides = Object.create(s)), (n[e] = t);
    }
}
function yn(e, t, n = !1) {
    const s = ue || Ee;
    if (s) {
        const r =
            s.parent == null
                ? s.vnode.appContext && s.vnode.appContext.provides
                : s.parent.provides;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && j(t) ? t.call(s.proxy) : t;
    }
}
function rl(e, t) {
    return ms(e, null, t);
}
const Ir = {};
function Lt(e, t, n) {
    return ms(e, t, n);
}
function ms(
    e,
    t,
    { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = ee
) {
    const l = ue;
    let c,
        f = !1,
        h = !1;
    if (
        (fe(e)
            ? ((c = () => e.value), (f = vr(e)))
            : kt(e)
            ? ((c = () => e), (s = !0))
            : H(e)
            ? ((h = !0),
              (f = e.some(kt)),
              (c = () =>
                  e.map((y) => {
                      if (fe(y)) return y.value;
                      if (kt(y)) return it(y);
                      if (j(y)) return Xe(y, l, 2);
                  })))
            : j(e)
            ? t
                ? (c = () => Xe(e, l, 2))
                : (c = () => {
                      if (!(l && l.isUnmounted))
                          return v && v(), Te(e, l, 3, [b]);
                  })
            : (c = Me),
        t && s)
    ) {
        const y = c;
        c = () => it(y());
    }
    let v,
        b = (y) => {
            v = p.onStop = () => {
                Xe(y, l, 4);
            };
        };
    if (Mt)
        return (
            (b = Me), t ? n && Te(t, l, 3, [c(), h ? [] : void 0, b]) : c(), Me
        );
    let $ = h ? [] : Ir;
    const E = () => {
        if (!!p.active)
            if (t) {
                const y = p.run();
                (s || f || (h ? y.some((O, S) => Ht(O, $[S])) : Ht(y, $))) &&
                    (v && v(),
                    Te(t, l, 3, [y, $ === Ir ? void 0 : $, b]),
                    ($ = y));
            } else p.run();
    };
    E.allowRecurse = !!t;
    let N;
    r === 'sync'
        ? (N = E)
        : r === 'post'
        ? (N = () => xe(E, l && l.suspense))
        : (N = () => {
              !l || l.isMounted ? Yi(E) : E();
          });
    const p = new ns(c, N);
    return (
        t
            ? n
                ? E()
                : ($ = p.run())
            : r === 'post'
            ? xe(p.run.bind(p), l && l.suspense)
            : p.run(),
        () => {
            p.stop(), l && l.scope && Vn(l.scope.effects, p);
        }
    );
}
function ol(e, t, n) {
    const s = this.proxy,
        r = he(e) ? (e.includes('.') ? Or(s, e) : () => s[e]) : e.bind(s, s);
    let o;
    j(t) ? (o = t) : ((o = t.handler), (n = t));
    const i = ue;
    Pt(this);
    const l = ms(r, o.bind(s), n);
    return i ? Pt(i) : dt(), l;
}
function Or(e, t) {
    const n = t.split('.');
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s;
    };
}
function it(e, t) {
    if (!ae(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), fe(e))) it(e.value, t);
    else if (H(e)) for (let n = 0; n < e.length; n++) it(e[n], t);
    else if (Zs(e) || bt(e))
        e.forEach((n) => {
            it(n, t);
        });
    else if (er(e)) for (const n in e) it(e[n], t);
    return e;
}
function il() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map()
    };
    return (
        St(() => {
            e.isMounted = !0;
        }),
        Ur(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const Le = [Function, Array],
    ll = {
        name: 'BaseTransition',
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Le,
            onEnter: Le,
            onAfterEnter: Le,
            onEnterCancelled: Le,
            onBeforeLeave: Le,
            onLeave: Le,
            onAfterLeave: Le,
            onLeaveCancelled: Le,
            onBeforeAppear: Le,
            onAppear: Le,
            onAfterAppear: Le,
            onAppearCancelled: Le
        },
        setup(e, { slots: t }) {
            const n = ql(),
                s = il();
            let r;
            return () => {
                const o = t.default && Nr(t.default(), !0);
                if (!o || !o.length) return;
                const i = Y(e),
                    { mode: l } = i,
                    c = o[0];
                if (s.isLeaving) return bs(c);
                const f = Rr(c);
                if (!f) return bs(c);
                const h = vs(f, i, s, n);
                ys(f, h);
                const v = n.subTree,
                    b = v && Rr(v);
                let $ = !1;
                const { getTransitionKey: E } = f.type;
                if (E) {
                    const N = E();
                    r === void 0 ? (r = N) : N !== r && ((r = N), ($ = !0));
                }
                if (b && b.type !== Se && (!ft(f, b) || $)) {
                    const N = vs(b, i, s, n);
                    if ((ys(b, N), l === 'out-in'))
                        return (
                            (s.isLeaving = !0),
                            (N.afterLeave = () => {
                                (s.isLeaving = !1), n.update();
                            }),
                            bs(c)
                        );
                    l === 'in-out' &&
                        f.type !== Se &&
                        (N.delayLeave = (p, y, O) => {
                            const S = Fr(s, b);
                            (S[String(b.key)] = b),
                                (p._leaveCb = () => {
                                    y(),
                                        (p._leaveCb = void 0),
                                        delete h.delayedLeave;
                                }),
                                (h.delayedLeave = O);
                        });
                }
                return c;
            };
        }
    },
    cl = ll;
function Fr(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function vs(e, t, n, s) {
    const {
            appear: r,
            mode: o,
            persisted: i = !1,
            onBeforeEnter: l,
            onEnter: c,
            onAfterEnter: f,
            onEnterCancelled: h,
            onBeforeLeave: v,
            onLeave: b,
            onAfterLeave: $,
            onLeaveCancelled: E,
            onBeforeAppear: N,
            onAppear: p,
            onAfterAppear: y,
            onAppearCancelled: O
        } = t,
        S = String(e.key),
        R = Fr(n, e),
        q = (L, z) => {
            L && Te(L, s, 9, z);
        },
        Z = {
            mode: o,
            persisted: i,
            beforeEnter(L) {
                let z = l;
                if (!n.isMounted)
                    if (r) z = N || l;
                    else return;
                L._leaveCb && L._leaveCb(!0);
                const W = R[S];
                W && ft(e, W) && W.el._leaveCb && W.el._leaveCb(), q(z, [L]);
            },
            enter(L) {
                let z = c,
                    W = f,
                    Q = h;
                if (!n.isMounted)
                    if (r) (z = p || c), (W = y || f), (Q = O || h);
                    else return;
                let re = !1;
                const D = (L._enterCb = (oe) => {
                    re ||
                        ((re = !0),
                        oe ? q(Q, [L]) : q(W, [L]),
                        Z.delayedLeave && Z.delayedLeave(),
                        (L._enterCb = void 0));
                });
                z ? (z(L, D), z.length <= 1 && D()) : D();
            },
            leave(L, z) {
                const W = String(e.key);
                if ((L._enterCb && L._enterCb(!0), n.isUnmounting)) return z();
                q(v, [L]);
                let Q = !1;
                const re = (L._leaveCb = (D) => {
                    Q ||
                        ((Q = !0),
                        z(),
                        D ? q(E, [L]) : q($, [L]),
                        (L._leaveCb = void 0),
                        R[W] === e && delete R[W]);
                });
                (R[W] = e), b ? (b(L, re), b.length <= 1 && re()) : re();
            },
            clone(L) {
                return vs(L, t, n, s);
            }
        };
    return Z;
}
function bs(e) {
    if (Jt(e)) return (e = At(e)), (e.children = null), e;
}
function Rr(e) {
    return Jt(e) ? (e.children ? e.children[0] : void 0) : e;
}
function ys(e, t) {
    e.shapeFlag & 6 && e.component
        ? ys(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function Nr(e, t = !1) {
    let n = [],
        s = 0;
    for (let r = 0; r < e.length; r++) {
        const o = e[r];
        o.type === le
            ? (o.patchFlag & 128 && s++, (n = n.concat(Nr(o.children, t))))
            : (t || o.type !== Se) && n.push(o);
    }
    if (s > 1) for (let r = 0; r < n.length; r++) n[r].patchFlag = -2;
    return n;
}
function de(e) {
    return j(e) ? { setup: e, name: e.name } : e;
}
const xn = (e) => !!e.type.__asyncLoader;
function al(e) {
    j(e) && (e = { loader: e });
    const {
        loader: t,
        loadingComponent: n,
        errorComponent: s,
        delay: r = 200,
        timeout: o,
        suspensible: i = !0,
        onError: l
    } = e;
    let c = null,
        f,
        h = 0;
    const v = () => (h++, (c = null), b()),
        b = () => {
            let $;
            return (
                c ||
                ($ = c =
                    t()
                        .catch((E) => {
                            if (
                                ((E =
                                    E instanceof Error
                                        ? E
                                        : new Error(String(E))),
                                l)
                            )
                                return new Promise((N, p) => {
                                    l(
                                        E,
                                        () => N(v()),
                                        () => p(E),
                                        h + 1
                                    );
                                });
                            throw E;
                        })
                        .then((E) =>
                            $ !== c && c
                                ? c
                                : (E &&
                                      (E.__esModule ||
                                          E[Symbol.toStringTag] === 'Module') &&
                                      (E = E.default),
                                  (f = E),
                                  E)
                        ))
            );
        };
    return de({
        name: 'AsyncComponentWrapper',
        __asyncLoader: b,
        get __asyncResolved() {
            return f;
        },
        setup() {
            const $ = ue;
            if (f) return () => xs(f, $);
            const E = (O) => {
                (c = null), Kt(O, $, 13, !s);
            };
            if ((i && $.suspense) || Mt)
                return b()
                    .then((O) => () => xs(O, $))
                    .catch(
                        (O) => (E(O), () => (s ? U(s, { error: O }) : null))
                    );
            const N = Ye(!1),
                p = Ye(),
                y = Ye(!!r);
            return (
                r &&
                    setTimeout(() => {
                        y.value = !1;
                    }, r),
                o != null &&
                    setTimeout(() => {
                        if (!N.value && !p.value) {
                            const O = new Error(
                                `Async component timed out after ${o}ms.`
                            );
                            E(O), (p.value = O);
                        }
                    }, o),
                b()
                    .then(() => {
                        (N.value = !0),
                            $.parent &&
                                Jt($.parent.vnode) &&
                                hs($.parent.update);
                    })
                    .catch((O) => {
                        E(O), (p.value = O);
                    }),
                () => {
                    if (N.value && f) return xs(f, $);
                    if (p.value && s) return U(s, { error: p.value });
                    if (n && !y.value) return U(n);
                }
            );
        }
    });
}
function xs(e, { vnode: { ref: t, props: n, children: s } }) {
    const r = U(e, n, s);
    return (r.ref = t), r;
}
const Jt = (e) => e.type.__isKeepAlive;
function ul(e, t) {
    Br(e, 'a', t);
}
function fl(e, t) {
    Br(e, 'da', t);
}
function Br(e, t, n = ue) {
    const s =
        e.__wdc ||
        (e.__wdc = () => {
            let r = n;
            for (; r; ) {
                if (r.isDeactivated) return;
                r = r.parent;
            }
            return e();
        });
    if ((wn(t, s, n), n)) {
        let r = n.parent;
        for (; r && r.parent; )
            Jt(r.parent.vnode) && dl(s, t, n, r), (r = r.parent);
    }
}
function dl(e, t, n, s) {
    const r = wn(t, e, s, !0);
    Cn(() => {
        Vn(s[t], r);
    }, n);
}
function wn(e, t, n = ue, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            o =
                t.__weh ||
                (t.__weh = (...i) => {
                    if (n.isUnmounted) return;
                    Ct(), Pt(n);
                    const l = Te(t, n, e, i);
                    return dt(), ot(), l;
                });
        return s ? r.unshift(o) : r.push(o), o;
    }
}
const We =
        (e) =>
        (t, n = ue) =>
            (!Mt || e === 'sp') && wn(e, t, n),
    hl = We('bm'),
    St = We('m'),
    pl = We('bu'),
    Hr = We('u'),
    Ur = We('bum'),
    Cn = We('um'),
    _l = We('sp'),
    gl = We('rtg'),
    ml = We('rtc');
function vl(e, t = ue) {
    wn('ec', e, t);
}
let ws = !0;
function bl(e) {
    const t = Kr(e),
        n = e.proxy,
        s = e.ctx;
    (ws = !1), t.beforeCreate && Dr(t.beforeCreate, e, 'bc');
    const {
        data: r,
        computed: o,
        methods: i,
        watch: l,
        provide: c,
        inject: f,
        created: h,
        beforeMount: v,
        mounted: b,
        beforeUpdate: $,
        updated: E,
        activated: N,
        deactivated: p,
        beforeDestroy: y,
        beforeUnmount: O,
        destroyed: S,
        unmounted: R,
        render: q,
        renderTracked: Z,
        renderTriggered: L,
        errorCaptured: z,
        serverPrefetch: W,
        expose: Q,
        inheritAttrs: re,
        components: D,
        directives: oe,
        filters: be
    } = t;
    if ((f && yl(f, s, null, e.appContext.config.unwrapInjectedRef), i))
        for (const ie in i) {
            const te = i[ie];
            j(te) && (s[ie] = te.bind(n));
        }
    if (r) {
        const ie = r.call(n, n);
        ae(ie) && (e.data = $t(ie));
    }
    if (((ws = !0), o))
        for (const ie in o) {
            const te = o[ie],
                He = j(te) ? te.bind(n, n) : j(te.get) ? te.get.bind(n, n) : Me,
                Dn = !j(te) && j(te.set) ? te.set.bind(n) : Me,
                Ft = X({ get: He, set: Dn });
            Object.defineProperty(s, ie, {
                enumerable: !0,
                configurable: !0,
                get: () => Ft.value,
                set: (pt) => (Ft.value = pt)
            });
        }
    if (l) for (const ie in l) jr(l[ie], s, n, ie);
    if (c) {
        const ie = j(c) ? c.call(n) : c;
        Reflect.ownKeys(ie).forEach((te) => {
            sl(te, ie[te]);
        });
    }
    h && Dr(h, e, 'c');
    function ye(ie, te) {
        H(te) ? te.forEach((He) => ie(He.bind(n))) : te && ie(te.bind(n));
    }
    if (
        (ye(hl, v),
        ye(St, b),
        ye(pl, $),
        ye(Hr, E),
        ye(ul, N),
        ye(fl, p),
        ye(vl, z),
        ye(ml, Z),
        ye(gl, L),
        ye(Ur, O),
        ye(Cn, R),
        ye(_l, W),
        H(Q))
    )
        if (Q.length) {
            const ie = e.exposed || (e.exposed = {});
            Q.forEach((te) => {
                Object.defineProperty(ie, te, {
                    get: () => n[te],
                    set: (He) => (n[te] = He)
                });
            });
        } else e.exposed || (e.exposed = {});
    q && e.render === Me && (e.render = q),
        re != null && (e.inheritAttrs = re),
        D && (e.components = D),
        oe && (e.directives = oe);
}
function yl(e, t, n = Me, s = !1) {
    H(e) && (e = Cs(e));
    for (const r in e) {
        const o = e[r];
        let i;
        ae(o)
            ? 'default' in o
                ? (i = yn(o.from || r, o.default, !0))
                : (i = yn(o.from || r))
            : (i = yn(o)),
            fe(i) && s
                ? Object.defineProperty(t, r, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => i.value,
                      set: (l) => (i.value = l)
                  })
                : (t[r] = i);
    }
}
function Dr(e, t, n) {
    Te(H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function jr(e, t, n, s) {
    const r = s.includes('.') ? Or(n, s) : () => n[s];
    if (he(e)) {
        const o = t[e];
        j(o) && Lt(r, o);
    } else if (j(e)) Lt(r, e.bind(n));
    else if (ae(e))
        if (H(e)) e.forEach((o) => jr(o, t, n, s));
        else {
            const o = j(e.handler) ? e.handler.bind(n) : t[e.handler];
            j(o) && Lt(r, o, e);
        }
}
function Kr(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: r,
            optionsCache: o,
            config: { optionMergeStrategies: i }
        } = e.appContext,
        l = o.get(t);
    let c;
    return (
        l
            ? (c = l)
            : !r.length && !n && !s
            ? (c = t)
            : ((c = {}),
              r.length && r.forEach((f) => $n(c, f, i, !0)),
              $n(c, t, i)),
        o.set(t, c),
        c
    );
}
function $n(e, t, n, s = !1) {
    const { mixins: r, extends: o } = t;
    o && $n(e, o, n, !0), r && r.forEach((i) => $n(e, i, n, !0));
    for (const i in t)
        if (!(s && i === 'expose')) {
            const l = xl[i] || (n && n[i]);
            e[i] = l ? l(e[i], t[i]) : t[i];
        }
    return e;
}
const xl = {
    data: Wr,
    props: lt,
    emits: lt,
    methods: lt,
    computed: lt,
    beforeCreate: me,
    created: me,
    beforeMount: me,
    mounted: me,
    beforeUpdate: me,
    updated: me,
    beforeDestroy: me,
    beforeUnmount: me,
    destroyed: me,
    unmounted: me,
    activated: me,
    deactivated: me,
    errorCaptured: me,
    serverPrefetch: me,
    components: lt,
    directives: lt,
    watch: Cl,
    provide: Wr,
    inject: wl
};
function Wr(e, t) {
    return t
        ? e
            ? function () {
                  return _e(
                      j(e) ? e.call(this, this) : e,
                      j(t) ? t.call(this, this) : t
                  );
              }
            : t
        : e;
}
function wl(e, t) {
    return lt(Cs(e), Cs(t));
}
function Cs(e) {
    if (H(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function me(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function lt(e, t) {
    return e ? _e(_e(Object.create(null), e), t) : t;
}
function Cl(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = _e(Object.create(null), e);
    for (const s in t) n[s] = me(e[s], t[s]);
    return n;
}
function $l(e, t, n, s = !1) {
    const r = {},
        o = {};
    rn(o, An, 1), (e.propsDefaults = Object.create(null)), qr(e, t, r, o);
    for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
    n
        ? (e.props = s ? r : Bi(r))
        : e.type.props
        ? (e.props = r)
        : (e.props = o),
        (e.attrs = o);
}
function kl(e, t, n, s) {
    const {
            props: r,
            attrs: o,
            vnode: { patchFlag: i }
        } = e,
        l = Y(r),
        [c] = e.propsOptions;
    let f = !1;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const h = e.vnode.dynamicProps;
            for (let v = 0; v < h.length; v++) {
                let b = h[v];
                const $ = t[b];
                if (c)
                    if (J(o, b)) $ !== o[b] && ((o[b] = $), (f = !0));
                    else {
                        const E = Re(b);
                        r[E] = $s(c, l, E, $, e, !1);
                    }
                else $ !== o[b] && ((o[b] = $), (f = !0));
            }
        }
    } else {
        qr(e, t, r, o) && (f = !0);
        let h;
        for (const v in l)
            (!t || (!J(t, v) && ((h = yt(v)) === v || !J(t, h)))) &&
                (c
                    ? n &&
                      (n[v] !== void 0 || n[h] !== void 0) &&
                      (r[v] = $s(c, l, v, void 0, e, !0))
                    : delete r[v]);
        if (o !== l)
            for (const v in o)
                (!t || (!J(t, v) && !0)) && (delete o[v], (f = !0));
    }
    f && je(e, 'set', '$attrs');
}
function qr(e, t, n, s) {
    const [r, o] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let c in t) {
            if (Bt(c)) continue;
            const f = t[c];
            let h;
            r && J(r, (h = Re(c)))
                ? !o || !o.includes(h)
                    ? (n[h] = f)
                    : ((l || (l = {}))[h] = f)
                : _s(e.emitsOptions, c) ||
                  ((!(c in s) || f !== s[c]) && ((s[c] = f), (i = !0)));
        }
    if (o) {
        const c = Y(n),
            f = l || ee;
        for (let h = 0; h < o.length; h++) {
            const v = o[h];
            n[v] = $s(r, c, v, f[v], e, !J(f, v));
        }
    }
    return i;
}
function $s(e, t, n, s, r, o) {
    const i = e[n];
    if (i != null) {
        const l = J(i, 'default');
        if (l && s === void 0) {
            const c = i.default;
            if (i.type !== Function && j(c)) {
                const { propsDefaults: f } = r;
                n in f
                    ? (s = f[n])
                    : (Pt(r), (s = f[n] = c.call(null, t)), dt());
            } else s = c;
        }
        i[0] &&
            (o && !l
                ? (s = !1)
                : i[1] && (s === '' || s === yt(n)) && (s = !0));
    }
    return s;
}
function zr(e, t, n = !1) {
    const s = t.propsCache,
        r = s.get(e);
    if (r) return r;
    const o = e.props,
        i = {},
        l = [];
    let c = !1;
    if (!j(e)) {
        const h = (v) => {
            c = !0;
            const [b, $] = zr(v, t, !0);
            _e(i, b), $ && l.push(...$);
        };
        !n && t.mixins.length && t.mixins.forEach(h),
            e.extends && h(e.extends),
            e.mixins && e.mixins.forEach(h);
    }
    if (!o && !c) return s.set(e, vt), vt;
    if (H(o))
        for (let h = 0; h < o.length; h++) {
            const v = Re(o[h]);
            Vr(v) && (i[v] = ee);
        }
    else if (o)
        for (const h in o) {
            const v = Re(h);
            if (Vr(v)) {
                const b = o[h],
                    $ = (i[v] = H(b) || j(b) ? { type: b } : b);
                if ($) {
                    const E = Xr(Boolean, $.type),
                        N = Xr(String, $.type);
                    ($[0] = E > -1),
                        ($[1] = N < 0 || E < N),
                        (E > -1 || J($, 'default')) && l.push(v);
                }
            }
        }
    const f = [i, l];
    return s.set(e, f), f;
}
function Vr(e) {
    return e[0] !== '$';
}
function Jr(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? 'null' : '';
}
function Yr(e, t) {
    return Jr(e) === Jr(t);
}
function Xr(e, t) {
    return H(t) ? t.findIndex((n) => Yr(n, e)) : j(t) && Yr(t, e) ? 0 : -1;
}
const Zr = (e) => e[0] === '_' || e === '$stable',
    ks = (e) => (H(e) ? e.map(Ie) : [Ie(e)]),
    El = (e, t, n) => {
        const s = Ne((...r) => ks(t(...r)), n);
        return (s._c = !1), s;
    },
    Qr = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (Zr(r)) continue;
            const o = e[r];
            if (j(o)) t[r] = El(r, o, s);
            else if (o != null) {
                const i = ks(o);
                t[r] = () => i;
            }
        }
    },
    Gr = (e, t) => {
        const n = ks(t);
        e.slots.default = () => n;
    },
    Tl = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = Y(t)), rn(t, '_', n)) : Qr(t, (e.slots = {}));
        } else (e.slots = {}), t && Gr(e, t);
        rn(e.slots, An, 1);
    },
    Ll = (e, t, n) => {
        const { vnode: s, slots: r } = e;
        let o = !0,
            i = ee;
        if (s.shapeFlag & 32) {
            const l = t._;
            l
                ? n && l === 1
                    ? (o = !1)
                    : (_e(r, t), !n && l === 1 && delete r._)
                : ((o = !t.$stable), Qr(t, r)),
                (i = t);
        } else t && (Gr(e, t), (i = { default: 1 }));
        if (o) for (const l in r) !Zr(l) && !(l in i) && delete r[l];
    };
function kn(e, t) {
    const n = Ee;
    if (n === null) return e;
    const s = n.proxy,
        r = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [i, l, c, f = ee] = t[o];
        j(i) && (i = { mounted: i, updated: i }),
            i.deep && it(l),
            r.push({
                dir: i,
                instance: s,
                value: l,
                oldValue: void 0,
                arg: c,
                modifiers: f
            });
    }
    return e;
}
function Be(e, t, n, s) {
    const r = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < r.length; i++) {
        const l = r[i];
        o && (l.oldValue = o[i].value);
        let c = l.dir[s];
        c && (Ct(), Te(c, n, 8, [e.el, l, e, t]), ot());
    }
}
function eo() {
    return {
        app: null,
        config: {
            isNativeTag: ni,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap()
    };
}
let Sl = 0;
function Al(e, t) {
    return function (s, r = null) {
        r != null && !ae(r) && (r = null);
        const o = eo(),
            i = new Set();
        let l = !1;
        const c = (o.app = {
            _uid: Sl++,
            _component: s,
            _props: r,
            _container: null,
            _context: o,
            _instance: null,
            version: Ql,
            get config() {
                return o.config;
            },
            set config(f) {},
            use(f, ...h) {
                return (
                    i.has(f) ||
                        (f && j(f.install)
                            ? (i.add(f), f.install(c, ...h))
                            : j(f) && (i.add(f), f(c, ...h))),
                    c
                );
            },
            mixin(f) {
                return o.mixins.includes(f) || o.mixins.push(f), c;
            },
            component(f, h) {
                return h ? ((o.components[f] = h), c) : o.components[f];
            },
            directive(f, h) {
                return h ? ((o.directives[f] = h), c) : o.directives[f];
            },
            mount(f, h, v) {
                if (!l) {
                    const b = U(s, r);
                    return (
                        (b.appContext = o),
                        h && t ? t(b, f) : e(b, f, v),
                        (l = !0),
                        (c._container = f),
                        (f.__vue_app__ = c),
                        Ss(b.component) || b.component.proxy
                    );
                }
            },
            unmount() {
                l && (e(null, c._container), delete c._container.__vue_app__);
            },
            provide(f, h) {
                return (o.provides[f] = h), c;
            }
        });
        return c;
    };
}
function En(e, t, n, s, r = !1) {
    if (H(e)) {
        e.forEach((b, $) => En(b, t && (H(t) ? t[$] : t), n, s, r));
        return;
    }
    if (xn(s) && !r) return;
    const o = s.shapeFlag & 4 ? Ss(s.component) || s.component.proxy : s.el,
        i = r ? null : o,
        { i: l, r: c } = e,
        f = t && t.r,
        h = l.refs === ee ? (l.refs = {}) : l.refs,
        v = l.setupState;
    if (
        (f != null &&
            f !== c &&
            (he(f)
                ? ((h[f] = null), J(v, f) && (v[f] = null))
                : fe(f) && (f.value = null)),
        j(c))
    )
        Xe(c, l, 12, [i, h]);
    else {
        const b = he(c),
            $ = fe(c);
        if (b || $) {
            const E = () => {
                if (e.f) {
                    const N = b ? h[c] : c.value;
                    r
                        ? H(N) && Vn(N, o)
                        : H(N)
                        ? N.includes(o) || N.push(o)
                        : b
                        ? (h[c] = [o])
                        : ((c.value = [o]), e.k && (h[e.k] = c.value));
                } else
                    b
                        ? ((h[c] = i), J(v, c) && (v[c] = i))
                        : fe(c) && ((c.value = i), e.k && (h[e.k] = i));
            };
            i ? ((E.id = -1), xe(E, n)) : E();
        }
    }
}
let Qe = !1;
const Tn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== 'foreignObject',
    Es = (e) => e.nodeType === 8;
function Pl(e) {
    const {
            mt: t,
            p: n,
            o: {
                patchProp: s,
                nextSibling: r,
                parentNode: o,
                remove: i,
                insert: l,
                createComment: c
            }
        } = e,
        f = (p, y) => {
            if (!y.hasChildNodes()) {
                n(null, p, y), mn();
                return;
            }
            (Qe = !1),
                h(y.firstChild, p, null, null, null),
                mn(),
                Qe &&
                    console.error(
                        'Hydration completed but contains mismatches.'
                    );
        },
        h = (p, y, O, S, R, q = !1) => {
            const Z = Es(p) && p.data === '[',
                L = () => E(p, y, O, S, R, Z),
                { type: z, ref: W, shapeFlag: Q } = y,
                re = p.nodeType;
            y.el = p;
            let D = null;
            switch (z) {
                case Yt:
                    re !== 3
                        ? (D = L())
                        : (p.data !== y.children &&
                              ((Qe = !0), (p.data = y.children)),
                          (D = r(p)));
                    break;
                case Se:
                    re !== 8 || Z ? (D = L()) : (D = r(p));
                    break;
                case Xt:
                    if (re !== 1) D = L();
                    else {
                        D = p;
                        const oe = !y.children.length;
                        for (let be = 0; be < y.staticCount; be++)
                            oe && (y.children += D.outerHTML),
                                be === y.staticCount - 1 && (y.anchor = D),
                                (D = r(D));
                        return D;
                    }
                    break;
                case le:
                    Z ? (D = $(p, y, O, S, R, q)) : (D = L());
                    break;
                default:
                    if (Q & 1)
                        re !== 1 ||
                        y.type.toLowerCase() !== p.tagName.toLowerCase()
                            ? (D = L())
                            : (D = v(p, y, O, S, R, q));
                    else if (Q & 6) {
                        y.slotScopeIds = R;
                        const oe = o(p);
                        if (
                            (t(y, oe, null, O, S, Tn(oe), q),
                            (D = Z ? N(p) : r(p)),
                            xn(y))
                        ) {
                            let be;
                            Z
                                ? ((be = U(le)),
                                  (be.anchor = D
                                      ? D.previousSibling
                                      : oe.lastChild))
                                : (be = p.nodeType === 3 ? Qt('') : U('div')),
                                (be.el = p),
                                (y.component.subTree = be);
                        }
                    } else
                        Q & 64
                            ? re !== 8
                                ? (D = L())
                                : (D = y.type.hydrate(p, y, O, S, R, q, e, b))
                            : Q & 128 &&
                              (D = y.type.hydrate(
                                  p,
                                  y,
                                  O,
                                  S,
                                  Tn(o(p)),
                                  R,
                                  q,
                                  e,
                                  h
                              ));
            }
            return W != null && En(W, null, S, y), D;
        },
        v = (p, y, O, S, R, q) => {
            q = q || !!y.dynamicChildren;
            const {
                    type: Z,
                    props: L,
                    patchFlag: z,
                    shapeFlag: W,
                    dirs: Q
                } = y,
                re = (Z === 'input' && Q) || Z === 'option';
            if (re || z !== -1) {
                if ((Q && Be(y, null, O, 'created'), L))
                    if (re || !q || z & (16 | 32))
                        for (const oe in L)
                            ((re && oe.endsWith('value')) ||
                                (Nt(oe) && !Bt(oe))) &&
                                s(p, oe, null, L[oe], !1, void 0, O);
                    else
                        L.onClick &&
                            s(p, 'onClick', null, L.onClick, !1, void 0, O);
                let D;
                if (
                    ((D = L && L.onVnodeBeforeMount) && Ae(D, O, y),
                    Q && Be(y, null, O, 'beforeMount'),
                    ((D = L && L.onVnodeMounted) || Q) &&
                        Mr(() => {
                            D && Ae(D, O, y), Q && Be(y, null, O, 'mounted');
                        }, S),
                    W & 16 && !(L && (L.innerHTML || L.textContent)))
                ) {
                    let oe = b(p.firstChild, y, p, O, S, R, q);
                    for (; oe; ) {
                        Qe = !0;
                        const be = oe;
                        (oe = oe.nextSibling), i(be);
                    }
                } else
                    W & 8 &&
                        p.textContent !== y.children &&
                        ((Qe = !0), (p.textContent = y.children));
            }
            return p.nextSibling;
        },
        b = (p, y, O, S, R, q, Z) => {
            Z = Z || !!y.dynamicChildren;
            const L = y.children,
                z = L.length;
            for (let W = 0; W < z; W++) {
                const Q = Z ? L[W] : (L[W] = Ie(L[W]));
                if (p) p = h(p, Q, S, R, q, Z);
                else {
                    if (Q.type === Yt && !Q.children) continue;
                    (Qe = !0), n(null, Q, O, null, S, R, Tn(O), q);
                }
            }
            return p;
        },
        $ = (p, y, O, S, R, q) => {
            const { slotScopeIds: Z } = y;
            Z && (R = R ? R.concat(Z) : Z);
            const L = o(p),
                z = b(r(p), y, L, O, S, R, q);
            return z && Es(z) && z.data === ']'
                ? r((y.anchor = z))
                : ((Qe = !0), l((y.anchor = c(']')), L, z), z);
        },
        E = (p, y, O, S, R, q) => {
            if (((Qe = !0), (y.el = null), q)) {
                const z = N(p);
                for (;;) {
                    const W = r(p);
                    if (W && W !== z) i(W);
                    else break;
                }
            }
            const Z = r(p),
                L = o(p);
            return i(p), n(null, y, L, Z, O, S, Tn(L), R), Z;
        },
        N = (p) => {
            let y = 0;
            for (; p; )
                if (
                    ((p = r(p)),
                    p && Es(p) && (p.data === '[' && y++, p.data === ']'))
                ) {
                    if (y === 0) return r(p);
                    y--;
                }
            return p;
        };
    return [f, h];
}
const xe = Mr;
function Ml(e) {
    return Il(e, Pl);
}
function Il(e, t) {
    const n = ai();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: r,
            patchProp: o,
            createElement: i,
            createText: l,
            createComment: c,
            setText: f,
            setElementText: h,
            parentNode: v,
            nextSibling: b,
            setScopeId: $ = Me,
            cloneNode: E,
            insertStaticContent: N
        } = e,
        p = (
            a,
            u,
            d,
            g = null,
            _ = null,
            w = null,
            k = !1,
            x = null,
            C = !!u.dynamicChildren
        ) => {
            if (a === u) return;
            a && !ft(a, u) && ((g = en(a)), qe(a, _, w, !0), (a = null)),
                u.patchFlag === -2 && ((C = !1), (u.dynamicChildren = null));
            const { type: m, ref: P, shapeFlag: T } = u;
            switch (m) {
                case Yt:
                    y(a, u, d, g);
                    break;
                case Se:
                    O(a, u, d, g);
                    break;
                case Xt:
                    a == null && S(u, d, g, k);
                    break;
                case le:
                    oe(a, u, d, g, _, w, k, x, C);
                    break;
                default:
                    T & 1
                        ? Z(a, u, d, g, _, w, k, x, C)
                        : T & 6
                        ? be(a, u, d, g, _, w, k, x, C)
                        : (T & 64 || T & 128) &&
                          m.process(a, u, d, g, _, w, k, x, C, _t);
            }
            P != null && _ && En(P, a && a.ref, w, u || a, !u);
        },
        y = (a, u, d, g) => {
            if (a == null) s((u.el = l(u.children)), d, g);
            else {
                const _ = (u.el = a.el);
                u.children !== a.children && f(_, u.children);
            }
        },
        O = (a, u, d, g) => {
            a == null ? s((u.el = c(u.children || '')), d, g) : (u.el = a.el);
        },
        S = (a, u, d, g) => {
            [a.el, a.anchor] = N(a.children, u, d, g, a.el, a.anchor);
        },
        R = ({ el: a, anchor: u }, d, g) => {
            let _;
            for (; a && a !== u; ) (_ = b(a)), s(a, d, g), (a = _);
            s(u, d, g);
        },
        q = ({ el: a, anchor: u }) => {
            let d;
            for (; a && a !== u; ) (d = b(a)), r(a), (a = d);
            r(u);
        },
        Z = (a, u, d, g, _, w, k, x, C) => {
            (k = k || u.type === 'svg'),
                a == null ? L(u, d, g, _, w, k, x, C) : Q(a, u, _, w, k, x, C);
        },
        L = (a, u, d, g, _, w, k, x) => {
            let C, m;
            const {
                type: P,
                props: T,
                shapeFlag: M,
                transition: B,
                patchFlag: V,
                dirs: se
            } = a;
            if (a.el && E !== void 0 && V === -1) C = a.el = E(a.el);
            else {
                if (
                    ((C = a.el = i(a.type, w, T && T.is, T)),
                    M & 8
                        ? h(C, a.children)
                        : M & 16 &&
                          W(
                              a.children,
                              C,
                              null,
                              g,
                              _,
                              w && P !== 'foreignObject',
                              k,
                              x
                          ),
                    se && Be(a, null, g, 'created'),
                    T)
                ) {
                    for (const ne in T)
                        ne !== 'value' &&
                            !Bt(ne) &&
                            o(C, ne, null, T[ne], w, a.children, g, _, Ue);
                    'value' in T && o(C, 'value', null, T.value),
                        (m = T.onVnodeBeforeMount) && Ae(m, g, a);
                }
                z(C, a, a.scopeId, k, g);
            }
            se && Be(a, null, g, 'beforeMount');
            const G = (!_ || (_ && !_.pendingBranch)) && B && !B.persisted;
            G && B.beforeEnter(C),
                s(C, u, d),
                ((m = T && T.onVnodeMounted) || G || se) &&
                    xe(() => {
                        m && Ae(m, g, a),
                            G && B.enter(C),
                            se && Be(a, null, g, 'mounted');
                    }, _);
        },
        z = (a, u, d, g, _) => {
            if ((d && $(a, d), g))
                for (let w = 0; w < g.length; w++) $(a, g[w]);
            if (_) {
                let w = _.subTree;
                if (u === w) {
                    const k = _.vnode;
                    z(a, k, k.scopeId, k.slotScopeIds, _.parent);
                }
            }
        },
        W = (a, u, d, g, _, w, k, x, C = 0) => {
            for (let m = C; m < a.length; m++) {
                const P = (a[m] = x ? Ge(a[m]) : Ie(a[m]));
                p(null, P, u, d, g, _, w, k, x);
            }
        },
        Q = (a, u, d, g, _, w, k) => {
            const x = (u.el = a.el);
            let { patchFlag: C, dynamicChildren: m, dirs: P } = u;
            C |= a.patchFlag & 16;
            const T = a.props || ee,
                M = u.props || ee;
            let B;
            d && ct(d, !1),
                (B = M.onVnodeBeforeUpdate) && Ae(B, d, u, a),
                P && Be(u, a, d, 'beforeUpdate'),
                d && ct(d, !0);
            const V = _ && u.type !== 'foreignObject';
            if (
                (m
                    ? re(a.dynamicChildren, m, x, d, g, V, w)
                    : k || He(a, u, x, null, d, g, V, w, !1),
                C > 0)
            ) {
                if (C & 16) D(x, u, T, M, d, g, _);
                else if (
                    (C & 2 &&
                        T.class !== M.class &&
                        o(x, 'class', null, M.class, _),
                    C & 4 && o(x, 'style', T.style, M.style, _),
                    C & 8)
                ) {
                    const se = u.dynamicProps;
                    for (let G = 0; G < se.length; G++) {
                        const ne = se[G],
                            Pe = T[ne],
                            gt = M[ne];
                        (gt !== Pe || ne === 'value') &&
                            o(x, ne, Pe, gt, _, a.children, d, g, Ue);
                    }
                }
                C & 1 && a.children !== u.children && h(x, u.children);
            } else !k && m == null && D(x, u, T, M, d, g, _);
            ((B = M.onVnodeUpdated) || P) &&
                xe(() => {
                    B && Ae(B, d, u, a), P && Be(u, a, d, 'updated');
                }, g);
        },
        re = (a, u, d, g, _, w, k) => {
            for (let x = 0; x < u.length; x++) {
                const C = a[x],
                    m = u[x],
                    P =
                        C.el &&
                        (C.type === le || !ft(C, m) || C.shapeFlag & (6 | 64))
                            ? v(C.el)
                            : d;
                p(C, m, P, null, g, _, w, k, !0);
            }
        },
        D = (a, u, d, g, _, w, k) => {
            if (d !== g) {
                for (const x in g) {
                    if (Bt(x)) continue;
                    const C = g[x],
                        m = d[x];
                    C !== m &&
                        x !== 'value' &&
                        o(a, x, m, C, k, u.children, _, w, Ue);
                }
                if (d !== ee)
                    for (const x in d)
                        !Bt(x) &&
                            !(x in g) &&
                            o(a, x, d[x], null, k, u.children, _, w, Ue);
                'value' in g && o(a, 'value', d.value, g.value);
            }
        },
        oe = (a, u, d, g, _, w, k, x, C) => {
            const m = (u.el = a ? a.el : l('')),
                P = (u.anchor = a ? a.anchor : l(''));
            let { patchFlag: T, dynamicChildren: M, slotScopeIds: B } = u;
            B && (x = x ? x.concat(B) : B),
                a == null
                    ? (s(m, d, g),
                      s(P, d, g),
                      W(u.children, d, P, _, w, k, x, C))
                    : T > 0 && T & 64 && M && a.dynamicChildren
                    ? (re(a.dynamicChildren, M, d, _, w, k, x),
                      (u.key != null || (_ && u === _.subTree)) && to(a, u, !0))
                    : He(a, u, d, P, _, w, k, x, C);
        },
        be = (a, u, d, g, _, w, k, x, C) => {
            (u.slotScopeIds = x),
                a == null
                    ? u.shapeFlag & 512
                        ? _.ctx.activate(u, d, g, k, C)
                        : Un(u, d, g, _, w, k, C)
                    : ye(a, u, C);
        },
        Un = (a, u, d, g, _, w, k) => {
            const x = (a.component = Wl(a, g, _));
            if ((Jt(a) && (x.ctx.renderer = _t), zl(x), x.asyncDep)) {
                if ((_ && _.registerDep(x, ie), !a.el)) {
                    const C = (x.subTree = U(Se));
                    O(null, C, u, d);
                }
                return;
            }
            ie(x, a, u, d, _, w, k);
        },
        ye = (a, u, d) => {
            const g = (u.component = a.component);
            if (el(a, u, d))
                if (g.asyncDep && !g.asyncResolved) {
                    te(g, u, d);
                    return;
                } else (g.next = u), Ji(g.update), g.update();
            else (u.component = a.component), (u.el = a.el), (g.vnode = u);
        },
        ie = (a, u, d, g, _, w, k) => {
            const x = () => {
                    if (a.isMounted) {
                        let { next: P, bu: T, u: M, parent: B, vnode: V } = a,
                            se = P,
                            G;
                        ct(a, !1),
                            P ? ((P.el = V.el), te(a, P, k)) : (P = V),
                            T && Zn(T),
                            (G = P.props && P.props.onVnodeBeforeUpdate) &&
                                Ae(G, B, P, V),
                            ct(a, !0);
                        const ne = gs(a),
                            Pe = a.subTree;
                        (a.subTree = ne),
                            p(Pe, ne, v(Pe.el), en(Pe), a, _, w),
                            (P.el = ne.el),
                            se === null && tl(a, ne.el),
                            M && xe(M, _),
                            (G = P.props && P.props.onVnodeUpdated) &&
                                xe(() => Ae(G, B, P, V), _);
                    } else {
                        let P;
                        const { el: T, props: M } = u,
                            { bm: B, m: V, parent: se } = a,
                            G = xn(u);
                        if (
                            (ct(a, !1),
                            B && Zn(B),
                            !G &&
                                (P = M && M.onVnodeBeforeMount) &&
                                Ae(P, se, u),
                            ct(a, !0),
                            T && Kn)
                        ) {
                            const ne = () => {
                                (a.subTree = gs(a)),
                                    Kn(T, a.subTree, a, _, null);
                            };
                            G
                                ? u.type
                                      .__asyncLoader()
                                      .then(() => !a.isUnmounted && ne())
                                : ne();
                        } else {
                            const ne = (a.subTree = gs(a));
                            p(null, ne, d, g, a, _, w), (u.el = ne.el);
                        }
                        if (
                            (V && xe(V, _), !G && (P = M && M.onVnodeMounted))
                        ) {
                            const ne = u;
                            xe(() => Ae(P, se, ne), _);
                        }
                        u.shapeFlag & 256 && a.a && xe(a.a, _),
                            (a.isMounted = !0),
                            (u = d = g = null);
                    }
                },
                C = (a.effect = new ns(x, () => hs(a.update), a.scope)),
                m = (a.update = C.run.bind(C));
            (m.id = a.uid), ct(a, !0), m();
        },
        te = (a, u, d) => {
            u.component = a;
            const g = a.vnode.props;
            (a.vnode = u),
                (a.next = null),
                kl(a, u.props, g, d),
                Ll(a, u.children, d),
                Ct(),
                ps(void 0, a.update),
                ot();
        },
        He = (a, u, d, g, _, w, k, x, C = !1) => {
            const m = a && a.children,
                P = a ? a.shapeFlag : 0,
                T = u.children,
                { patchFlag: M, shapeFlag: B } = u;
            if (M > 0) {
                if (M & 128) {
                    Ft(m, T, d, g, _, w, k, x, C);
                    return;
                } else if (M & 256) {
                    Dn(m, T, d, g, _, w, k, x, C);
                    return;
                }
            }
            B & 8
                ? (P & 16 && Ue(m, _, w), T !== m && h(d, T))
                : P & 16
                ? B & 16
                    ? Ft(m, T, d, g, _, w, k, x, C)
                    : Ue(m, _, w, !0)
                : (P & 8 && h(d, ''), B & 16 && W(T, d, g, _, w, k, x, C));
        },
        Dn = (a, u, d, g, _, w, k, x, C) => {
            (a = a || vt), (u = u || vt);
            const m = a.length,
                P = u.length,
                T = Math.min(m, P);
            let M;
            for (M = 0; M < T; M++) {
                const B = (u[M] = C ? Ge(u[M]) : Ie(u[M]));
                p(a[M], B, d, null, _, w, k, x, C);
            }
            m > P ? Ue(a, _, w, !0, !1, T) : W(u, d, g, _, w, k, x, C, T);
        },
        Ft = (a, u, d, g, _, w, k, x, C) => {
            let m = 0;
            const P = u.length;
            let T = a.length - 1,
                M = P - 1;
            for (; m <= T && m <= M; ) {
                const B = a[m],
                    V = (u[m] = C ? Ge(u[m]) : Ie(u[m]));
                if (ft(B, V)) p(B, V, d, null, _, w, k, x, C);
                else break;
                m++;
            }
            for (; m <= T && m <= M; ) {
                const B = a[T],
                    V = (u[M] = C ? Ge(u[M]) : Ie(u[M]));
                if (ft(B, V)) p(B, V, d, null, _, w, k, x, C);
                else break;
                T--, M--;
            }
            if (m > T) {
                if (m <= M) {
                    const B = M + 1,
                        V = B < P ? u[B].el : g;
                    for (; m <= M; )
                        p(
                            null,
                            (u[m] = C ? Ge(u[m]) : Ie(u[m])),
                            d,
                            V,
                            _,
                            w,
                            k,
                            x,
                            C
                        ),
                            m++;
                }
            } else if (m > M) for (; m <= T; ) qe(a[m], _, w, !0), m++;
            else {
                const B = m,
                    V = m,
                    se = new Map();
                for (m = V; m <= M; m++) {
                    const we = (u[m] = C ? Ge(u[m]) : Ie(u[m]));
                    we.key != null && se.set(we.key, m);
                }
                let G,
                    ne = 0;
                const Pe = M - V + 1;
                let gt = !1,
                    Ws = 0;
                const Rt = new Array(Pe);
                for (m = 0; m < Pe; m++) Rt[m] = 0;
                for (m = B; m <= T; m++) {
                    const we = a[m];
                    if (ne >= Pe) {
                        qe(we, _, w, !0);
                        continue;
                    }
                    let Fe;
                    if (we.key != null) Fe = se.get(we.key);
                    else
                        for (G = V; G <= M; G++)
                            if (Rt[G - V] === 0 && ft(we, u[G])) {
                                Fe = G;
                                break;
                            }
                    Fe === void 0
                        ? qe(we, _, w, !0)
                        : ((Rt[Fe - V] = m + 1),
                          Fe >= Ws ? (Ws = Fe) : (gt = !0),
                          p(we, u[Fe], d, null, _, w, k, x, C),
                          ne++);
                }
                const qs = gt ? Ol(Rt) : vt;
                for (G = qs.length - 1, m = Pe - 1; m >= 0; m--) {
                    const we = V + m,
                        Fe = u[we],
                        zs = we + 1 < P ? u[we + 1].el : g;
                    Rt[m] === 0
                        ? p(null, Fe, d, zs, _, w, k, x, C)
                        : gt && (G < 0 || m !== qs[G] ? pt(Fe, d, zs, 2) : G--);
                }
            }
        },
        pt = (a, u, d, g, _ = null) => {
            const {
                el: w,
                type: k,
                transition: x,
                children: C,
                shapeFlag: m
            } = a;
            if (m & 6) {
                pt(a.component.subTree, u, d, g);
                return;
            }
            if (m & 128) {
                a.suspense.move(u, d, g);
                return;
            }
            if (m & 64) {
                k.move(a, u, d, _t);
                return;
            }
            if (k === le) {
                s(w, u, d);
                for (let T = 0; T < C.length; T++) pt(C[T], u, d, g);
                s(a.anchor, u, d);
                return;
            }
            if (k === Xt) {
                R(a, u, d);
                return;
            }
            if (g !== 2 && m & 1 && x)
                if (g === 0)
                    x.beforeEnter(w), s(w, u, d), xe(() => x.enter(w), _);
                else {
                    const { leave: T, delayLeave: M, afterLeave: B } = x,
                        V = () => s(w, u, d),
                        se = () => {
                            T(w, () => {
                                V(), B && B();
                            });
                        };
                    M ? M(w, V, se) : se();
                }
            else s(w, u, d);
        },
        qe = (a, u, d, g = !1, _ = !1) => {
            const {
                type: w,
                props: k,
                ref: x,
                children: C,
                dynamicChildren: m,
                shapeFlag: P,
                patchFlag: T,
                dirs: M
            } = a;
            if ((x != null && En(x, null, d, a, !0), P & 256)) {
                u.ctx.deactivate(a);
                return;
            }
            const B = P & 1 && M,
                V = !xn(a);
            let se;
            if (
                (V && (se = k && k.onVnodeBeforeUnmount) && Ae(se, u, a), P & 6)
            )
                qo(a.component, d, g);
            else {
                if (P & 128) {
                    a.suspense.unmount(d, g);
                    return;
                }
                B && Be(a, null, u, 'beforeUnmount'),
                    P & 64
                        ? a.type.remove(a, u, d, _, _t, g)
                        : m && (w !== le || (T > 0 && T & 64))
                        ? Ue(m, u, d, !1, !0)
                        : ((w === le && T & (128 | 256)) || (!_ && P & 16)) &&
                          Ue(C, u, d),
                    g && js(a);
            }
            ((V && (se = k && k.onVnodeUnmounted)) || B) &&
                xe(() => {
                    se && Ae(se, u, a), B && Be(a, null, u, 'unmounted');
                }, d);
        },
        js = (a) => {
            const { type: u, el: d, anchor: g, transition: _ } = a;
            if (u === le) {
                Wo(d, g);
                return;
            }
            if (u === Xt) {
                q(a);
                return;
            }
            const w = () => {
                r(d), _ && !_.persisted && _.afterLeave && _.afterLeave();
            };
            if (a.shapeFlag & 1 && _ && !_.persisted) {
                const { leave: k, delayLeave: x } = _,
                    C = () => k(d, w);
                x ? x(a.el, w, C) : C();
            } else w();
        },
        Wo = (a, u) => {
            let d;
            for (; a !== u; ) (d = b(a)), r(a), (a = d);
            r(u);
        },
        qo = (a, u, d) => {
            const { bum: g, scope: _, update: w, subTree: k, um: x } = a;
            g && Zn(g),
                _.stop(),
                w && ((w.active = !1), qe(k, a, u, d)),
                x && xe(x, u),
                xe(() => {
                    a.isUnmounted = !0;
                }, u),
                u &&
                    u.pendingBranch &&
                    !u.isUnmounted &&
                    a.asyncDep &&
                    !a.asyncResolved &&
                    a.suspenseId === u.pendingId &&
                    (u.deps--, u.deps === 0 && u.resolve());
        },
        Ue = (a, u, d, g = !1, _ = !1, w = 0) => {
            for (let k = w; k < a.length; k++) qe(a[k], u, d, g, _);
        },
        en = (a) =>
            a.shapeFlag & 6
                ? en(a.component.subTree)
                : a.shapeFlag & 128
                ? a.suspense.next()
                : b(a.anchor || a.el),
        Ks = (a, u, d) => {
            a == null
                ? u._vnode && qe(u._vnode, null, null, !0)
                : p(u._vnode || null, a, u, null, null, null, d),
                mn(),
                (u._vnode = a);
        },
        _t = {
            p,
            um: qe,
            m: pt,
            r: js,
            mt: Un,
            mc: W,
            pc: He,
            pbc: re,
            n: en,
            o: e
        };
    let jn, Kn;
    return (
        t && ([jn, Kn] = t(_t)),
        { render: Ks, hydrate: jn, createApp: Al(Ks, jn) }
    );
}
function ct({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function to(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (H(s) && H(r))
        for (let o = 0; o < s.length; o++) {
            const i = s[o];
            let l = r[o];
            l.shapeFlag & 1 &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || l.patchFlag === 32) &&
                    ((l = r[o] = Ge(r[o])), (l.el = i.el)),
                n || to(i, l));
        }
}
function Ol(e) {
    const t = e.slice(),
        n = [0];
    let s, r, o, i, l;
    const c = e.length;
    for (s = 0; s < c; s++) {
        const f = e[s];
        if (f !== 0) {
            if (((r = n[n.length - 1]), e[r] < f)) {
                (t[s] = r), n.push(s);
                continue;
            }
            for (o = 0, i = n.length - 1; o < i; )
                (l = (o + i) >> 1), e[n[l]] < f ? (o = l + 1) : (i = l);
            f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
    return n;
}
const Fl = (e) => e.__isTeleport,
    no = 'components';
function at(e, t) {
    return Nl(no, e, !0, t) || e;
}
const Rl = Symbol();
function Nl(e, t, n = !0, s = !1) {
    const r = Ee || ue;
    if (r) {
        const o = r.type;
        if (e === no) {
            const l = Xl(o);
            if (l && (l === t || l === Re(t) || l === sn(Re(t)))) return o;
        }
        const i = so(r[e] || o[e], t) || so(r.appContext[e], t);
        return !i && s ? o : i;
    }
}
function so(e, t) {
    return e && (e[t] || e[Re(t)] || e[sn(Re(t))]);
}
const le = Symbol(void 0),
    Yt = Symbol(void 0),
    Se = Symbol(void 0),
    Xt = Symbol(void 0),
    Zt = [];
let ut = null;
function I(e = !1) {
    Zt.push((ut = e ? null : []));
}
function Bl() {
    Zt.pop(), (ut = Zt[Zt.length - 1] || null);
}
let Ln = 1;
function ro(e) {
    Ln += e;
}
function oo(e) {
    return (
        (e.dynamicChildren = Ln > 0 ? ut || vt : null),
        Bl(),
        Ln > 0 && ut && ut.push(e),
        e
    );
}
function K(e, t, n, s, r, o) {
    return oo(A(e, t, n, s, r, o, !0));
}
function ve(e, t, n, s, r) {
    return oo(U(e, t, n, s, r, !0));
}
function Sn(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function ft(e, t) {
    return e.type === t.type && e.key === t.key;
}
const An = '__vInternal',
    io = ({ key: e }) => (e != null ? e : null),
    Pn = ({ ref: e, ref_key: t, ref_for: n }) =>
        e != null
            ? he(e) || fe(e) || j(e)
                ? { i: Ee, r: e, k: t, f: !!n }
                : e
            : null;
function A(
    e,
    t = null,
    n = null,
    s = 0,
    r = null,
    o = e === le ? 0 : 1,
    i = !1,
    l = !1
) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && io(t),
        ref: t && Pn(t),
        scopeId: vn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null
    };
    return (
        l
            ? (Ts(c, n), o & 128 && e.normalize(c))
            : n && (c.shapeFlag |= he(n) ? 8 : 16),
        Ln > 0 &&
            !i &&
            ut &&
            (c.patchFlag > 0 || o & 6) &&
            c.patchFlag !== 32 &&
            ut.push(c),
        c
    );
}
const U = Hl;
function Hl(e, t = null, n = null, s = 0, r = null, o = !1) {
    if (((!e || e === Rl) && (e = Se), Sn(e))) {
        const l = At(e, t, !0);
        return n && Ts(l, n), l;
    }
    if ((Zl(e) && (e = e.__vccOpts), t)) {
        t = Ul(t);
        let { class: l, style: c } = t;
        l && !he(l) && (t.class = De(l)),
            ae(c) && (br(c) && !H(c) && (c = _e({}, c)), (t.style = qn(c)));
    }
    const i = he(e) ? 1 : nl(e) ? 128 : Fl(e) ? 64 : ae(e) ? 4 : j(e) ? 2 : 0;
    return A(e, t, n, s, r, i, o, !0);
}
function Ul(e) {
    return e ? (br(e) || An in e ? _e({}, e) : e) : null;
}
function At(e, t, n = !1) {
    const { props: s, ref: r, patchFlag: o, children: i } = e,
        l = t ? Mn(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && io(l),
        ref:
            t && t.ref
                ? n && r
                    ? H(r)
                        ? r.concat(Pn(t))
                        : [r, Pn(t)]
                    : Pn(t)
                : r,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== le ? (o === -1 ? 16 : o | 16) : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && At(e.ssContent),
        ssFallback: e.ssFallback && At(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    };
}
function Qt(e = ' ', t = 0) {
    return U(Yt, null, e, t);
}
function Vf(e, t) {
    const n = U(Xt, null, e);
    return (n.staticCount = t), n;
}
function pe(e = '', t = !1) {
    return t ? (I(), ve(Se, null, e)) : U(Se, null, e);
}
function Ie(e) {
    return e == null || typeof e == 'boolean'
        ? U(Se)
        : H(e)
        ? U(le, null, e.slice())
        : typeof e == 'object'
        ? Ge(e)
        : U(Yt, null, String(e));
}
function Ge(e) {
    return e.el === null || e.memo ? e : At(e);
}
function Ts(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (H(t)) n = 16;
    else if (typeof t == 'object')
        if (s & (1 | 64)) {
            const r = t.default;
            r && (r._c && (r._d = !1), Ts(e, r()), r._c && (r._d = !0));
            return;
        } else {
            n = 32;
            const r = t._;
            !r && !(An in t)
                ? (t._ctx = Ee)
                : r === 3 &&
                  Ee &&
                  (Ee.slots._ === 1
                      ? (t._ = 1)
                      : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        j(t)
            ? ((t = { default: t, _ctx: Ee }), (n = 32))
            : ((t = String(t)), s & 64 ? ((n = 16), (t = [Qt(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function Mn(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === 'class')
                t.class !== s.class && (t.class = De([t.class, s.class]));
            else if (r === 'style') t.style = qn([t.style, s.style]);
            else if (Nt(r)) {
                const o = t[r],
                    i = s[r];
                i &&
                    o !== i &&
                    !(H(o) && o.includes(i)) &&
                    (t[r] = o ? [].concat(o, i) : i);
            } else r !== '' && (t[r] = s[r]);
    }
    return t;
}
function Ae(e, t, n, s = null) {
    Te(e, t, 7, [n, s]);
}
function In(e, t, n, s) {
    let r;
    const o = n && n[s];
    if (H(e) || he(e)) {
        r = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++)
            r[i] = t(e[i], i, void 0, o && o[i]);
    } else if (typeof e == 'number') {
        r = new Array(e);
        for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
    } else if (ae(e))
        if (e[Symbol.iterator])
            r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
        else {
            const i = Object.keys(e);
            r = new Array(i.length);
            for (let l = 0, c = i.length; l < c; l++) {
                const f = i[l];
                r[l] = t(e[f], f, l, o && o[l]);
            }
        }
    else r = [];
    return n && (n[s] = r), r;
}
function ge(e, t, n = {}, s, r) {
    if (Ee.isCE)
        return U('slot', t === 'default' ? null : { name: t }, s && s());
    let o = e[t];
    o && o._c && (o._d = !1), I();
    const i = o && lo(o(n)),
        l = ve(
            le,
            { key: n.key || `_${t}` },
            i || (s ? s() : []),
            i && e._ === 1 ? 64 : -2
        );
    return (
        !r && l.scopeId && (l.slotScopeIds = [l.scopeId + '-s']),
        o && o._c && (o._d = !0),
        l
    );
}
function lo(e) {
    return e.some((t) =>
        Sn(t) ? !(t.type === Se || (t.type === le && !lo(t.children))) : !0
    )
        ? e
        : null;
}
const Ls = (e) => (e ? (co(e) ? Ss(e) || e.proxy : Ls(e.parent)) : null),
    On = _e(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Ls(e.parent),
        $root: (e) => Ls(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Kr(e),
        $forceUpdate: (e) => () => hs(e.update),
        $nextTick: (e) => $r.bind(e.proxy),
        $watch: (e) => ol.bind(e)
    }),
    Dl = {
        get({ _: e }, t) {
            const {
                ctx: n,
                setupState: s,
                data: r,
                props: o,
                accessCache: i,
                type: l,
                appContext: c
            } = e;
            let f;
            if (t[0] !== '$') {
                const $ = i[t];
                if ($ !== void 0)
                    switch ($) {
                        case 1:
                            return s[t];
                        case 2:
                            return r[t];
                        case 4:
                            return n[t];
                        case 3:
                            return o[t];
                    }
                else {
                    if (s !== ee && J(s, t)) return (i[t] = 1), s[t];
                    if (r !== ee && J(r, t)) return (i[t] = 2), r[t];
                    if ((f = e.propsOptions[0]) && J(f, t))
                        return (i[t] = 3), o[t];
                    if (n !== ee && J(n, t)) return (i[t] = 4), n[t];
                    ws && (i[t] = 0);
                }
            }
            const h = On[t];
            let v, b;
            if (h) return t === '$attrs' && $e(e, 'get', t), h(e);
            if ((v = l.__cssModules) && (v = v[t])) return v;
            if (n !== ee && J(n, t)) return (i[t] = 4), n[t];
            if (((b = c.config.globalProperties), J(b, t))) return b[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: r, ctx: o } = e;
            if (r !== ee && J(r, t)) r[t] = n;
            else if (s !== ee && J(s, t)) s[t] = n;
            else if (J(e.props, t)) return !1;
            return t[0] === '$' && t.slice(1) in e ? !1 : ((o[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: s,
                    appContext: r,
                    propsOptions: o
                }
            },
            i
        ) {
            let l;
            return (
                !!n[i] ||
                (e !== ee && J(e, i)) ||
                (t !== ee && J(t, i)) ||
                ((l = o[0]) && J(l, i)) ||
                J(s, i) ||
                J(On, i) ||
                J(r.config.globalProperties, i)
            );
        }
    },
    jl = eo();
let Kl = 0;
function Wl(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || jl,
        o = {
            uid: Kl++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new ui(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(r.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: zr(s, r),
            emitsOptions: Lr(s, r),
            emit: null,
            emitted: null,
            propsDefaults: ee,
            inheritAttrs: s.inheritAttrs,
            ctx: ee,
            data: ee,
            props: ee,
            attrs: ee,
            slots: ee,
            refs: ee,
            setupState: ee,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return (
        (o.ctx = { _: o }),
        (o.root = t ? t.root : o),
        (o.emit = Zi.bind(null, o)),
        e.ce && e.ce(o),
        o
    );
}
let ue = null;
const ql = () => ue || Ee,
    Pt = (e) => {
        (ue = e), e.scope.on();
    },
    dt = () => {
        ue && ue.scope.off(), (ue = null);
    };
function co(e) {
    return e.vnode.shapeFlag & 4;
}
let Mt = !1;
function zl(e, t = !1) {
    Mt = t;
    const { props: n, children: s } = e.vnode,
        r = co(e);
    $l(e, n, r, t), Tl(e, s);
    const o = r ? Vl(e, t) : void 0;
    return (Mt = !1), o;
}
function Vl(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = pn(new Proxy(e.ctx, Dl)));
    const { setup: s } = n;
    if (s) {
        const r = (e.setupContext = s.length > 1 ? Yl(e) : null);
        Pt(e), Ct();
        const o = Xe(s, e, 0, [e.props, r]);
        if ((ot(), dt(), Qs(o))) {
            if ((o.then(dt, dt), t))
                return o
                    .then((i) => {
                        ao(e, i, t);
                    })
                    .catch((i) => {
                        Kt(i, e, 0);
                    });
            e.asyncDep = o;
        } else ao(e, o, t);
    } else fo(e, t);
}
function ao(e, t, n) {
    j(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : ae(t) && (e.setupState = wr(t)),
        fo(e, n);
}
let uo;
function fo(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && uo && !s.render) {
            const r = s.template;
            if (r) {
                const { isCustomElement: o, compilerOptions: i } =
                        e.appContext.config,
                    { delimiters: l, compilerOptions: c } = s,
                    f = _e(_e({ isCustomElement: o, delimiters: l }, i), c);
                s.render = uo(r, f);
            }
        }
        e.render = s.render || Me;
    }
    Pt(e), Ct(), bl(e), ot(), dt();
}
function Jl(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return $e(e, 'get', '$attrs'), t[n];
        }
    });
}
function Yl(e) {
    const t = (s) => {
        e.exposed = s || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = Jl(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    };
}
function Ss(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(wr(pn(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in On) return On[n](e);
                }
            }))
        );
}
function Xl(e) {
    return (j(e) && e.displayName) || e.name;
}
function Zl(e) {
    return j(e) && '__vccOpts' in e;
}
const X = (e, t) => qi(e, t, Mt);
function It(e, t, n) {
    const s = arguments.length;
    return s === 2
        ? ae(t) && !H(t)
            ? Sn(t)
                ? U(e, null, [t])
                : U(e, t)
            : U(e, null, t)
        : (s > 3
              ? (n = Array.prototype.slice.call(arguments, 2))
              : s === 3 && Sn(n) && (n = [n]),
          U(e, t, n));
}
const Ql = '3.2.29',
    Gl = 'http://www.w3.org/2000/svg',
    ht = typeof document != 'undefined' ? document : null,
    ho = ht && ht.createElement('template'),
    ec = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, s) => {
            const r = t
                ? ht.createElementNS(Gl, e)
                : ht.createElement(e, n ? { is: n } : void 0);
            return (
                e === 'select' &&
                    s &&
                    s.multiple != null &&
                    r.setAttribute('multiple', s.multiple),
                r
            );
        },
        createText: (e) => ht.createTextNode(e),
        createComment: (e) => ht.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => ht.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, '');
        },
        cloneNode(e) {
            const t = e.cloneNode(!0);
            return '_value' in e && (t._value = e._value), t;
        },
        insertStaticContent(e, t, n, s, r, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (r && (r === o || r.nextSibling))
                for (
                    ;
                    t.insertBefore(r.cloneNode(!0), n),
                        !(r === o || !(r = r.nextSibling));

                );
            else {
                ho.innerHTML = s ? `<svg>${e}</svg>` : e;
                const l = ho.content;
                if (s) {
                    const c = l.firstChild;
                    for (; c.firstChild; ) l.appendChild(c.firstChild);
                    l.removeChild(c);
                }
                t.insertBefore(l, n);
            }
            return [
                i ? i.nextSibling : t.firstChild,
                n ? n.previousSibling : t.lastChild
            ];
        }
    };
function tc(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(' ')),
        t == null
            ? e.removeAttribute('class')
            : n
            ? e.setAttribute('class', t)
            : (e.className = t);
}
function nc(e, t, n) {
    const s = e.style,
        r = he(n);
    if (n && !r) {
        for (const o in n) As(s, o, n[o]);
        if (t && !he(t)) for (const o in t) n[o] == null && As(s, o, '');
    } else {
        const o = s.display;
        r ? t !== n && (s.cssText = n) : t && e.removeAttribute('style'),
            '_vod' in e && (s.display = o);
    }
}
const po = /\s*!important$/;
function As(e, t, n) {
    if (H(n)) n.forEach((s) => As(e, t, s));
    else if (t.startsWith('--')) e.setProperty(t, n);
    else {
        const s = sc(e, t);
        po.test(n)
            ? e.setProperty(yt(s), n.replace(po, ''), 'important')
            : (e[s] = n);
    }
}
const _o = ['Webkit', 'Moz', 'ms'],
    Ps = {};
function sc(e, t) {
    const n = Ps[t];
    if (n) return n;
    let s = Re(t);
    if (s !== 'filter' && s in e) return (Ps[t] = s);
    s = sn(s);
    for (let r = 0; r < _o.length; r++) {
        const o = _o[r] + s;
        if (o in e) return (Ps[t] = o);
    }
    return t;
}
const go = 'http://www.w3.org/1999/xlink';
function rc(e, t, n, s, r) {
    if (s && t.startsWith('xlink:'))
        n == null
            ? e.removeAttributeNS(go, t.slice(6, t.length))
            : e.setAttributeNS(go, t, n);
    else {
        const o = Qo(t);
        n == null || (o && !Ys(n))
            ? e.removeAttribute(t)
            : e.setAttribute(t, o ? '' : n);
    }
}
function oc(e, t, n, s, r, o, i) {
    if (t === 'innerHTML' || t === 'textContent') {
        s && i(s, r, o), (e[t] = n == null ? '' : n);
        return;
    }
    if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
        e._value = n;
        const l = n == null ? '' : n;
        (e.value !== l || e.tagName === 'OPTION') && (e.value = l),
            n == null && e.removeAttribute(t);
        return;
    }
    if (n === '' || n == null) {
        const l = typeof e[t];
        if (l === 'boolean') {
            e[t] = Ys(n);
            return;
        } else if (n == null && l === 'string') {
            (e[t] = ''), e.removeAttribute(t);
            return;
        } else if (l === 'number') {
            try {
                e[t] = 0;
            } catch {}
            e.removeAttribute(t);
            return;
        }
    }
    try {
        e[t] = n;
    } catch {}
}
let Fn = Date.now,
    mo = !1;
if (typeof window != 'undefined') {
    Fn() > document.createEvent('Event').timeStamp &&
        (Fn = () => performance.now());
    const e = navigator.userAgent.match(/firefox\/(\d+)/i);
    mo = !!(e && Number(e[1]) <= 53);
}
let Ms = 0;
const ic = Promise.resolve(),
    lc = () => {
        Ms = 0;
    },
    cc = () => Ms || (ic.then(lc), (Ms = Fn()));
function ac(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function uc(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
function fc(e, t, n, s, r = null) {
    const o = e._vei || (e._vei = {}),
        i = o[t];
    if (s && i) i.value = s;
    else {
        const [l, c] = dc(t);
        if (s) {
            const f = (o[t] = hc(s, r));
            ac(e, l, f, c);
        } else i && (uc(e, l, i, c), (o[t] = void 0));
    }
}
const vo = /(?:Once|Passive|Capture)$/;
function dc(e) {
    let t;
    if (vo.test(e)) {
        t = {};
        let n;
        for (; (n = e.match(vo)); )
            (e = e.slice(0, e.length - n[0].length)),
                (t[n[0].toLowerCase()] = !0);
    }
    return [yt(e.slice(2)), t];
}
function hc(e, t) {
    const n = (s) => {
        const r = s.timeStamp || Fn();
        (mo || r >= n.attached - 1) && Te(pc(s, n.value), t, 5, [s]);
    };
    return (n.value = e), (n.attached = cc()), n;
}
function pc(e, t) {
    if (H(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((s) => (r) => !r._stopped && s && s(r))
        );
    } else return t;
}
const bo = /^on[a-z]/,
    _c = (e, t, n, s, r = !1, o, i, l, c) => {
        t === 'class'
            ? tc(e, s, r)
            : t === 'style'
            ? nc(e, n, s)
            : Nt(t)
            ? zn(t) || fc(e, t, n, s, i)
            : (
                  t[0] === '.'
                      ? ((t = t.slice(1)), !0)
                      : t[0] === '^'
                      ? ((t = t.slice(1)), !1)
                      : gc(e, t, s, r)
              )
            ? oc(e, t, s, o, i, l, c)
            : (t === 'true-value'
                  ? (e._trueValue = s)
                  : t === 'false-value' && (e._falseValue = s),
              rc(e, t, s, r));
    };
function gc(e, t, n, s) {
    return s
        ? !!(
              t === 'innerHTML' ||
              t === 'textContent' ||
              (t in e && bo.test(t) && j(n))
          )
        : t === 'spellcheck' ||
          t === 'draggable' ||
          t === 'form' ||
          (t === 'list' && e.tagName === 'INPUT') ||
          (t === 'type' && e.tagName === 'TEXTAREA') ||
          (bo.test(t) && he(n))
        ? !1
        : t in e;
}
const mc = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
cl.props;
const vc = ['ctrl', 'shift', 'alt', 'meta'],
    bc = {
        stop: (e) => e.stopPropagation(),
        prevent: (e) => e.preventDefault(),
        self: (e) => e.target !== e.currentTarget,
        ctrl: (e) => !e.ctrlKey,
        shift: (e) => !e.shiftKey,
        alt: (e) => !e.altKey,
        meta: (e) => !e.metaKey,
        left: (e) => 'button' in e && e.button !== 0,
        middle: (e) => 'button' in e && e.button !== 1,
        right: (e) => 'button' in e && e.button !== 2,
        exact: (e, t) => vc.some((n) => e[`${n}Key`] && !t.includes(n))
    },
    Jf =
        (e, t) =>
        (n, ...s) => {
            for (let r = 0; r < t.length; r++) {
                const o = bc[t[r]];
                if (o && o(n, t)) return;
            }
            return e(n, ...s);
        },
    Rn = {
        beforeMount(e, { value: t }, { transition: n }) {
            (e._vod = e.style.display === 'none' ? '' : e.style.display),
                n && t ? n.beforeEnter(e) : Gt(e, t);
        },
        mounted(e, { value: t }, { transition: n }) {
            n && t && n.enter(e);
        },
        updated(e, { value: t, oldValue: n }, { transition: s }) {
            !t != !n &&
                (s
                    ? t
                        ? (s.beforeEnter(e), Gt(e, !0), s.enter(e))
                        : s.leave(e, () => {
                              Gt(e, !1);
                          })
                    : Gt(e, t));
        },
        beforeUnmount(e, { value: t }) {
            Gt(e, t);
        }
    };
function Gt(e, t) {
    e.style.display = t ? e._vod : 'none';
}
const yc = _e({ patchProp: _c }, ec);
let Is,
    yo = !1;
function xc() {
    return (Is = yo ? Is : Ml(yc)), (yo = !0), Is;
}
const wc = (...e) => {
    const t = xc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (s) => {
            const r = Cc(s);
            if (r) return n(r, !0, r instanceof SVGElement);
        }),
        t
    );
};
function Cc(e) {
    return he(e) ? document.querySelector(e) : e;
}
const et = typeof window != 'undefined';
function xo(e, t) {
    return `${e}${t}`.replace(/\/+/g, '/');
}
function wo(e) {
    let t = e.replace(/\.html$/, '');
    if ((t.endsWith('/') && (t += 'index'), et)) {
        const n = '/';
        t = t.slice(n.length).replace(/\//g, '_') + '.md';
        const s = __VP_HASH_MAP__[t.toLowerCase()];
        t = `${n}assets/${t}.${s}.js`;
    } else t = `./${t.slice(1).replace(/\//g, '_')}.md.js`;
    return t;
}
const Co = Symbol(),
    $o = 'http://a.com',
    $c = () => ({ path: '/', component: null, data: null });
function kc(e, t) {
    const n = $t($c()),
        s = typeof window != 'undefined';
    function r(l = s ? location.href : '/') {
        const c = new URL(l, $o);
        return (
            !c.pathname.endsWith('/') &&
                !c.pathname.endsWith('.html') &&
                ((c.pathname += '.html'), (l = c.pathname + c.search + c.hash)),
            s &&
                (history.replaceState(
                    { scrollPosition: window.scrollY },
                    document.title
                ),
                history.pushState(null, '', l)),
            i(l)
        );
    }
    let o = null;
    async function i(l, c = 0) {
        const f = new URL(l, $o),
            h = (o = f.pathname);
        try {
            let v = e(h);
            if (
                ('then' in v && typeof v.then == 'function' && (v = await v),
                o === h)
            ) {
                o = null;
                const { default: b, __pageData: $ } = v;
                if (!b) throw new Error(`Invalid route component: ${b}`);
                (n.path = h),
                    (n.component = pn(b)),
                    (n.data = hn(JSON.parse($))),
                    s &&
                        $r(() => {
                            if (f.hash && !c) {
                                const E = document.querySelector(
                                    decodeURIComponent(f.hash)
                                );
                                if (E) {
                                    ko(E, f.hash);
                                    return;
                                }
                            }
                            window.scrollTo(0, c);
                        });
            }
        } catch (v) {
            v.message.match(/fetch/) || console.error(v),
                o === h &&
                    ((o = null),
                    (n.path = h),
                    (n.component = t ? pn(t) : null));
        }
    }
    return (
        s &&
            (window.addEventListener(
                'click',
                (l) => {
                    const c = l.target.closest('a');
                    if (c) {
                        const {
                                href: f,
                                protocol: h,
                                hostname: v,
                                pathname: b,
                                hash: $,
                                target: E
                            } = c,
                            N = window.location,
                            p = b.match(/\.\w+$/);
                        !l.ctrlKey &&
                            !l.shiftKey &&
                            !l.altKey &&
                            !l.metaKey &&
                            E !== '_blank' &&
                            h === N.protocol &&
                            v === N.hostname &&
                            !(p && p[0] !== '.html') &&
                            (l.preventDefault(),
                            b === N.pathname
                                ? $ &&
                                  $ !== N.hash &&
                                  (history.pushState(null, '', $),
                                  ko(
                                      c,
                                      $,
                                      c.classList.contains('header-anchor')
                                  ))
                                : r(f));
                    }
                },
                { capture: !0 }
            ),
            window.addEventListener('popstate', (l) => {
                i(location.href, (l.state && l.state.scrollPosition) || 0);
            }),
            window.addEventListener('hashchange', (l) => {
                l.preventDefault();
            })),
        { route: n, go: r }
    );
}
function Ec() {
    const e = yn(Co);
    if (!e) throw new Error('useRouter() is called without provider.');
    return e;
}
function Oe() {
    return Ec().route;
}
function ko(e, t, n = !1) {
    const s = document.querySelector('.nav-bar').offsetHeight,
        r = e.classList.contains('.header-anchor')
            ? e
            : document.querySelector(decodeURIComponent(t));
    if (r) {
        const o = r.offsetTop - s - 15;
        !n || Math.abs(o - window.scrollY) > window.innerHeight
            ? window.scrollTo(0, o)
            : window.scrollTo({ left: 0, top: o, behavior: 'smooth' });
    }
}
const Tc = de({
    name: 'VitePressContent',
    setup() {
        const e = Oe();
        return () => (e.component ? It(e.component) : null);
    }
});
var ce = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
};
const Lc = {
        setup() {
            return {};
        }
    },
    Sc = {
        t: '1596458734865',
        class: 'icon',
        viewBox: '0 0 1024 1024',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        'p-id': '4898',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        width: '16',
        height: '16'
    },
    Ac = A(
        'path',
        {
            d: 'M68.608 962.56V206.848h740.864V962.56H68.608zM746.496 271.36H131.584v629.248h614.912V271.36zM131.584 262.144',
            'p-id': '4899',
            fill: '#666'
        },
        null,
        -1
    ),
    Pc = A(
        'path',
        {
            d: 'M219.136 65.024v116.224h62.976V129.536h614.912v629.248h-60.416v61.952h123.392V65.024z',
            'p-id': '4900',
            fill: '#666'
        },
        null,
        -1
    ),
    Mc = [Ac, Pc];
function Ic(e, t, n, s, r, o) {
    return I(), K('svg', Sc, Mc);
}
var Oc = ce(Lc, [['render', Ic]]);
const Fc = {
        setup() {
            return {};
        }
    },
    Rc = {
        t: '1596458647160',
        class: 'icon',
        viewBox: '0 0 1024 1024',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        'p-id': '2840',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        width: '22',
        height: '22'
    },
    Nc = A(
        'path',
        {
            d: 'M311.1 739c-6.1 0-12.2-2.3-16.8-7L69.7 507.4l224.6-224.6c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-191 191 191 191c9.3 9.3 9.3 24.3 0 33.6-4.6 4.7-10.7 7-16.8 7zM711.5 739c-6.1 0-12.2-2.3-16.8-7-9.3-9.3-9.3-24.3 0-33.6l191-191-191-191c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L953 507.4 728.3 732c-4.6 4.7-10.7 7-16.8 7zM418.5 814.7c-2.4 0-4.8-0.4-7.2-1.1-12.5-4-19.4-17.3-15.5-29.8l179.6-567.1c4-12.5 17.3-19.4 29.8-15.5 12.5 4 19.4 17.3 15.5 29.8L441.1 798.1a23.73 23.73 0 0 1-22.6 16.6z',
            fill: '#666',
            'p-id': '2841'
        },
        null,
        -1
    ),
    Bc = [Nc];
function Hc(e, t, n, s, r, o) {
    return I(), K('svg', Rc, Bc);
}
var Uc = ce(Fc, [['render', Hc]]);
const Dc = ['href'],
    jc = A(
        'div',
        { style: { width: '16px', 'margin-left': '6px' } },
        [
            A(
                'svg',
                {
                    version: '1.1',
                    id: 'Layer_1',
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    x: '0px',
                    y: '0px',
                    viewBox: '0 0 1024 1024',
                    'xml:space': 'preserve'
                },
                [
                    A('g', null, [
                        A('path', {
                            d: 'M1004.57 319.408l-468-312c-15.974-9.83-33.022-9.92-49.142 0l-468 312C7.428 327.406 0 341.694 0 355.978v311.998c0 14.286 7.428 28.572 19.43 36.572l468 312.044c15.974 9.83 33.022 9.92 49.142 0l468-312.044c12-7.998 19.43-22.286 19.43-36.572V355.978c-0.002-14.284-7.43-28.572-19.432-36.57zM556 126.262l344.572 229.716-153.714 102.858L556 331.406V126.262z m-88 0v205.144l-190.858 127.43-153.714-102.858L468 126.262zM88 438.264l110.286 73.714L88 585.692v-147.428z m380 459.43L123.428 667.978l153.714-102.858L468 692.55v205.144z m44-281.716l-155.43-104 155.43-104 155.43 104-155.43 104z m44 281.716V692.55l190.858-127.43 153.714 102.858L556 897.694z m380-312.002l-110.286-73.714L936 438.264v147.428z',
                            'p-id': '2793',
                            fill: '#555'
                        })
                    ])
                ]
            )
        ],
        -1
    ),
    Kc = [jc],
    Wc = de({
        props: { content: null, importMap: null },
        setup(e) {
            const t = e,
                n = 'https://sfc.vuejs.org/',
                s = X(() => {
                    const r = { 'App.vue': t.content };
                    if (t.importMap)
                        try {
                            r['import-map.json'] = JSON.stringify({
                                imports: JSON.parse(
                                    decodeURIComponent(t.importMap)
                                )
                            });
                        } catch {}
                    return `${n}#${btoa(
                        unescape(encodeURIComponent(JSON.stringify(r)))
                    )}`;
                });
            return (r, o) => (
                I(),
                K(
                    'a',
                    {
                        href: F(s),
                        style: { display: 'flex', 'align-items': 'center' },
                        target: '_blank'
                    },
                    Kc,
                    8,
                    Dc
                )
            );
        }
    });
function qc(e) {
    const t = $t({ showTip: !1 });
    function n() {
        navigator.clipboard.writeText(e),
            (t.showTip = !0),
            setTimeout(() => {
                t.showTip = !1;
            }, 5 * 1e3);
    }
    return mt(ze({}, _n(t)), { copyCode: n });
}
const Eo = /<script.*>([\s\S]+)<\/script>/,
    To = /<style>([\s\S]+)<\/style>/,
    Lo = /<template>([\s\S]+)<\/template>/,
    Os = (e) => (t) => {
        const n = t.match(e);
        return n && n[1].trim();
    },
    So = (e) => JSON.parse(decodeURIComponent(e));
function zc(e, t, n) {
    const s = $t({ expand: !1 }),
        r = () => (s.expand = !s.expand),
        o = X(() => {
            const i = Os(Eo)(e) || '',
                l = Os(To)(e) || '',
                c =
                    Os(Lo)(e) ||
                    e.replace(Eo, '').replace(To, '').replace(Lo, '').trim(),
                f = So(t),
                h = So(n);
            return { js: i, css: l, html: c, jsLibs: f, cssLibs: h };
        });
    return mt(ze({}, _n(s)), { toggleExpand: r, parsedCode: o });
}
const Vc = {
        props: {
            componentName: String,
            htmlStr: String,
            codeStr: String,
            importMap: String,
            language: { default: 'vue', type: String },
            platforms: { default: () => ['codepen'], type: Array },
            jsLibsStr: { type: String, default: '[]' },
            cssLibsStr: { type: String, default: '[]' },
            title: { type: String, default: '' },
            desc: { type: String, default: '' }
        },
        components: { copySvg: Oc, codeSvg: Uc, OnlineEdit: Wc },
        setup(e) {
            const t = X(() => {
                    var c;
                    return decodeURIComponent((c = e.htmlStr) != null ? c : '');
                }),
                n = X(() => {
                    var c;
                    return decodeURIComponent((c = e.codeStr) != null ? c : '');
                }),
                { showTip: s, copyCode: r } = qc(n.value),
                {
                    expand: o,
                    toggleExpand: i,
                    parsedCode: l
                } = zc(n.value, e.jsLibsStr, e.cssLibsStr);
            return {
                expand: o,
                toggleExpand: i,
                decodedHtmlStr: t,
                parsedCode: l,
                showTip: s,
                copyCode: r,
                decodedCodeStr: n
            };
        }
    },
    Jc = { class: 'demo-slot' },
    Yc = { class: 'demo-title-desc' },
    Xc = { class: 'demo-title' },
    Zc = { class: 'demo-desc' },
    Qc = { class: 'demo-actions' },
    Gc = { class: 'demo-platforms' },
    ea = { class: 'demo-buttons' },
    ta = { class: 'demo-actions-copy' },
    na = { class: 'demo-actions-tip' },
    sa = ['innerHTML'];
function ra(e, t, n, s, r, o) {
    const i = at('OnlineEdit'),
        l = at('copySvg'),
        c = at('codeSvg'),
        f = at('ClientOnly');
    return (
        I(),
        ve(f, null, {
            default: Ne(() => [
                A(
                    'article',
                    Mn(e.$attrs, { class: 'demo' }),
                    [
                        A('div', Jc, [ge(e.$slots, 'default')]),
                        kn(
                            A(
                                'div',
                                Yc,
                                [
                                    A('span', Xc, Ce(n.title), 1),
                                    A('span', Zc, Ce(n.desc), 1)
                                ],
                                512
                            ),
                            [[Rn, n.title || n.desc]]
                        ),
                        A('div', Qc, [
                            A('div', Gc, [
                                U(
                                    i,
                                    {
                                        content: s.decodedCodeStr,
                                        importMap: n.importMap
                                    },
                                    null,
                                    8,
                                    ['content', 'importMap']
                                )
                            ]),
                            A('div', ea, [
                                A('div', ta, [
                                    kn(
                                        A(
                                            'span',
                                            na,
                                            '\u590D\u5236\u6210\u529F!',
                                            512
                                        ),
                                        [[Rn, s.showTip]]
                                    ),
                                    kn(
                                        U(
                                            l,
                                            {
                                                onClick: s.copyCode,
                                                title: '\u590D\u5236'
                                            },
                                            null,
                                            8,
                                            ['onClick']
                                        ),
                                        [[Rn, !s.showTip]]
                                    )
                                ]),
                                U(c, {
                                    class: 'demo-actions-expand',
                                    onClick:
                                        t[0] ||
                                        (t[0] = (h) => s.toggleExpand()),
                                    title: '\u5C55\u5F00'
                                })
                            ])
                        ]),
                        kn(
                            A(
                                'div',
                                {
                                    innerHTML: s.decodedHtmlStr,
                                    class: De(
                                        `language-${n.language} extra-class`
                                    )
                                },
                                null,
                                10,
                                sa
                            ),
                            [[Rn, s.expand]]
                        )
                    ],
                    16
                )
            ]),
            _: 3
        })
    );
}
var oa = ce(Vc, [['render', ra]]);
const ia = de({
    setup(e, { slots: t }) {
        const n = Ye(!1);
        return (
            St(() => {
                n.value = !0;
            }),
            () => (n.value && t.default ? t.default() : null)
        );
    }
});
function la(e, t, n, s) {
    Object.defineProperties(e.config.globalProperties, {
        $site: {
            get() {
                return t.value;
            }
        },
        $siteByRoute: {
            get() {
                return n.value;
            }
        },
        $themeConfig: {
            get() {
                return n.value.themeConfig;
            }
        },
        $page: {
            get() {
                return s.value;
            }
        },
        $frontmatter: {
            get() {
                return s.value.frontmatter;
            }
        },
        $lang: {
            get() {
                return n.value.lang;
            }
        },
        $localePath: {
            get() {
                const { locales: r } = t.value,
                    { lang: o } = n.value,
                    i = Object.keys(r).find((l) => r[l].lang === o);
                return (r && i) || '/';
            }
        },
        $title: {
            get() {
                return s.value.title
                    ? s.value.title + ' | ' + n.value.title
                    : n.value.title;
            }
        },
        $description: {
            get() {
                return s.value.description || n.value.description;
            }
        },
        $withBase: {
            value(r) {
                return xo(t.value.base, r);
            }
        }
    });
}
function ca(e) {
    e.component('Content', Tc),
        e.component('ClientOnly', ia),
        e.component('Demo', oa),
        e.component('Debug', () => null);
}
var aa =
    '{"lang":"en-US","title":"nfeui","description":"A VitePress site","base":"/","head":[["link",{"rel":"stylesheet","href":"//cdn.jsdelivr.net/npm/element-plus/dist/index.css"}]],"themeConfig":{"logo":"/logo.png","locales":{"/":{"lang":"zh-CN","title":"nfeui","description":"","label":"\u4E2D\u6587","selectText":"\u8BED\u8A00","nav":[{"text":"\u6307\u5357","link":"/intro"},{"text":"\u7EC4\u4EF6","link":"/components/button/doc"}],"sidebar":[{"text":"\u5F00\u53D1\u6307\u5357","children":[{"text":"\u4ECB\u7ECD","link":"/intro"},{"text":"\u5FEB\u901F\u5F00\u59CB","link":"/quickstart"},{"text":"\u5F00\u53D1\u7EC4\u4EF6","link":"/addComponents"},{"text":"\u66F4\u65B0\u65E5\u5FD7","link":"/changelog"}]},{"text":"\u57FA\u7840\u7EC4\u4EF6","children":[{"text":"Button \u6309\u94AE","link":"/components/button/doc"}]}]}},"search":{"searchMaxSuggestions":10},"repo":"https://git.nucarf.cn/frontend/n-p-m/nfeui","repoLabel":"GitLab","lastUpdated":true,"prevLink":true,"nextLink":true},"locales":{},"customData":{}}';
const Fs = Ye(ua(aa));
function Nn() {
    return Fs;
}
function ua(e) {
    return hn(JSON.parse(e));
}
const fa = typeof window != 'undefined';
function da(e, t) {
    t.sort((n, s) => {
        const r = s.split('/').length - n.split('/').length;
        return r !== 0 ? r : s.length - n.length;
    });
    for (const n of t) if (e.startsWith(n)) return n;
}
function Ao(e, t) {
    const n = da(t, Object.keys(e));
    return n ? e[n] : void 0;
}
function ha(e, t) {
    t = pa(e, t);
    const n = Ao(e.locales || {}, t) || {},
        s = Ao((e.themeConfig && e.themeConfig.locales) || {}, t) || {};
    return mt(ze(ze({}, e), n), {
        themeConfig: mt(ze(ze({}, e.themeConfig), s), { locales: {} }),
        locales: {}
    });
}
function pa(e, t) {
    if (!fa) return t;
    const n = e.base,
        s = n.endsWith('/') ? n.slice(0, -1) : n;
    return t.slice(s.length);
}
function tt(e) {
    const t = e || Oe();
    return X(() => ha(Fs.value, t.path));
}
function Ot(e) {
    const t = e || Oe();
    return X(() => t.data);
}
function _a(e, t) {
    const n = Array.from(document.querySelectorAll('meta'));
    let s = !0;
    const r = (o) => {
        if (s) {
            s = !1;
            return;
        }
        n.forEach((i) => document.head.removeChild(i)),
            (n.length = 0),
            o &&
                o.length &&
                o.forEach((i) => {
                    const l = ga(i);
                    document.head.appendChild(l), n.push(l);
                });
    };
    rl(() => {
        const o = e.data,
            i = t.value,
            l = o && o.title,
            c = o && o.description,
            f = o && o.frontmatter.head;
        (document.title = (l ? l + ' | ' : '') + i.title),
            r([
                ['meta', { charset: 'utf-8' }],
                [
                    'meta',
                    {
                        name: 'viewport',
                        content: 'width=device-width,initial-scale=1'
                    }
                ],
                ['meta', { name: 'description', content: c || i.description }],
                ...i.head,
                ...((f && va(f)) || [])
            ]);
    });
}
function ga([e, t, n]) {
    const s = document.createElement(e);
    for (const r in t) s.setAttribute(r, t[r]);
    return n && (s.innerHTML = n), s;
}
function ma(e) {
    return e[0] === 'meta' && e[1] && e[1].name === 'description';
}
function va(e) {
    return e.filter((t) => !ma(t));
}
function Yf() {
    const e = Ot();
    return X(() => e.value.frontmatter);
}
const ba = /#.*$/,
    ya = /(index)?\.(md|html)$/,
    Bn = /\/$/,
    xa = /^[a-z]+:/i;
function wa(e) {
    return e == null;
}
function Rs(e) {
    return Array.isArray(e);
}
function Ns(e) {
    return xa.test(e);
}
function Ca(e, t) {
    if (t === void 0) return !1;
    const n = Po(`/${e.data.relativePath}`),
        s = Po(t);
    return n === s;
}
function Po(e) {
    return decodeURI(e).replace(ba, '').replace(ya, '');
}
function $a(e, t) {
    const n = e.endsWith('/'),
        s = t.startsWith('/');
    return n && s ? e.slice(0, -1) + t : !n && !s ? `${e}/${t}` : e + t;
}
function Bs(e) {
    return /^\//.test(e) ? e : `/${e}`;
}
function Mo(e) {
    return e.replace(/(index)?(\.(md|html))?$/, '') || '/';
}
function ka(e) {
    return e === !1 || e === 'auto' || Rs(e);
}
function Ea(e) {
    return e.children !== void 0;
}
function Ta(e) {
    return Rs(e) ? e.length === 0 : !e;
}
function Hs(e, t) {
    if (ka(e)) return e;
    t = Bs(t);
    for (const n in e) if (t.startsWith(Bs(n))) return e[n];
    return 'auto';
}
function Io(e) {
    return e.reduce(
        (t, n) => (
            n.link && t.push({ text: n.text, link: Mo(n.link) }),
            Ea(n) && (t = [...t, ...Io(n.children)]),
            t
        ),
        []
    );
}
const La = {},
    Sa = ['href', 'aria-label'],
    Aa = ['src'];
function Pa(e, t) {
    return (
        I(),
        K(
            'a',
            {
                class: 'nav-bar-title',
                href: e.$withBase(e.$localePath),
                'aria-label': `${e.$siteByRoute.title}, back to home`
            },
            [
                e.$themeConfig.logo
                    ? (I(),
                      K(
                          'img',
                          {
                              key: 0,
                              class: 'logo',
                              src: e.$withBase(e.$themeConfig.logo),
                              alt: 'Logo'
                          },
                          null,
                          8,
                          Aa
                      ))
                    : pe('', !0),
                Qt(' ' + Ce(e.$site.title), 1)
            ],
            8,
            Sa
        )
    );
}
var Ma = ce(La, [
    ['render', Pa],
    ['__scopeId', 'data-v-74be2d57']
]);
function Ia() {
    const e = Oe(),
        t = Nn();
    return X(() => {
        const s = t.value.themeConfig.locales;
        if (!s) return null;
        const r = Object.keys(s);
        if (r.length <= 1) return null;
        const o = et ? t.value.base : '/',
            i = o.endsWith('/') ? o.slice(0, -1) : o,
            l = e.path.slice(i.length),
            c = r.find(($) => ($ === '/' ? !1 : l.startsWith($))),
            f = c ? l.substring(c.length - 1) : l,
            h = r.map(($) => {
                const E = $.endsWith('/') ? $.slice(0, -1) : $;
                return { text: s[$].label, link: `${E}${f}` };
            }),
            v = c || '/';
        return {
            text: s[v].selectText ? s[v].selectText : 'Languages',
            items: h
        };
    });
}
const Oa = ['GitHub', 'GitLab', 'Bitbucket'].map((e) => [
    e,
    new RegExp(e, 'i')
]);
function Fa() {
    const e = tt();
    return X(() => {
        const t = e.value.themeConfig,
            n = t.docsRepo || t.repo;
        if (!n) return null;
        const s = Ra(n);
        return { text: Na(s, t.repoLabel), link: s };
    });
}
function Ra(e) {
    return /^https?:/.test(e) ? e : `https://github.com/${e}`;
}
function Na(e, t) {
    if (t) return t;
    const n = e.match(/^https?:\/\/[^/]+/);
    if (!n) return 'Source';
    const s = Oa.find(([r, o]) => o.test(n[0]));
    return s && s[0] ? s[0] : 'Source';
}
function Ba() {
    const e = Nn();
    function t(n) {
        return xo(e.value.base, n);
    }
    return { withBase: t };
}
function Oo(e) {
    const t = Oe(),
        { withBase: n } = Ba(),
        s = Ns(e.value.link);
    return {
        props: X(() => {
            const o = Fo(`/${t.data.relativePath}`);
            let i = !1;
            if (e.value.activeMatch)
                i = new RegExp(e.value.activeMatch).test(o);
            else {
                const l = Fo(n(e.value.link));
                i = l === '/' ? l === o : o.startsWith(l);
            }
            return {
                class: { active: i, isExternal: s },
                href: s ? e.value.link : n(e.value.link),
                target: e.value.target || s ? '_blank' : null,
                rel: e.value.rel || s ? 'noopener noreferrer' : null,
                'aria-label': e.value.ariaLabel
            };
        }),
        isExternal: s
    };
}
function Fo(e) {
    return e
        .replace(/#.*$/, '')
        .replace(/\?.*$/, '')
        .replace(/\.(html|md)$/, '')
        .replace(/\/index$/, '/');
}
const Ha = {},
    Ua = {
        class: 'icon outbound',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': 'true',
        x: '0px',
        y: '0px',
        viewBox: '0 0 100 100',
        width: '15',
        height: '15'
    },
    Da = A(
        'path',
        {
            fill: 'currentColor',
            d: 'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z'
        },
        null,
        -1
    ),
    ja = A(
        'polygon',
        {
            fill: 'currentColor',
            points: '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9'
        },
        null,
        -1
    ),
    Ka = [Da, ja];
function Wa(e, t) {
    return I(), K('svg', Ua, Ka);
}
var Us = ce(Ha, [['render', Wa]]);
const qa = { class: 'nav-link' },
    za = de({
        props: { item: null },
        setup(e) {
            const n = _n(e),
                { props: s, isExternal: r } = Oo(n.item);
            return (o, i) => (
                I(),
                K('div', qa, [
                    A(
                        'a',
                        Mn({ class: 'item' }, F(s)),
                        [
                            Qt(Ce(e.item.text) + ' ', 1),
                            F(r) ? (I(), ve(Us, { key: 0 })) : pe('', !0)
                        ],
                        16
                    )
                ])
            );
        }
    });
var Ro = ce(za, [['__scopeId', 'data-v-f6252dde']]);
const Va = (e) => (Sr('data-v-230bcec6'), (e = e()), Ar(), e),
    Ja = { class: 'nav-dropdown-link-item' },
    Ya = Va(() => A('span', { class: 'arrow' }, null, -1)),
    Xa = { class: 'text' },
    Za = { class: 'icon' },
    Qa = de({
        props: { item: null },
        setup(e) {
            const n = _n(e),
                { props: s, isExternal: r } = Oo(n.item);
            return (o, i) => (
                I(),
                K('div', Ja, [
                    A(
                        'a',
                        Mn({ class: 'item' }, F(s)),
                        [
                            Ya,
                            A('span', Xa, Ce(e.item.text), 1),
                            A('span', Za, [
                                F(r) ? (I(), ve(Us, { key: 0 })) : pe('', !0)
                            ])
                        ],
                        16
                    )
                ])
            );
        }
    });
var Ga = ce(Qa, [['__scopeId', 'data-v-230bcec6']]);
const eu = ['aria-label'],
    tu = { class: 'button-text' },
    nu = { class: 'dialog' },
    su = de({
        props: { item: null },
        setup(e) {
            const t = Oe(),
                n = Ye(!1);
            Lt(
                () => t.path,
                () => {
                    n.value = !1;
                }
            );
            function s() {
                n.value = !n.value;
            }
            return (r, o) => (
                I(),
                K(
                    'div',
                    { class: De(['nav-dropdown-link', { open: n.value }]) },
                    [
                        A(
                            'button',
                            {
                                class: 'button',
                                'aria-label': e.item.ariaLabel,
                                onClick: s
                            },
                            [
                                A('span', tu, Ce(e.item.text), 1),
                                A(
                                    'span',
                                    {
                                        class: De([
                                            'button-arrow',
                                            n.value ? 'down' : 'right'
                                        ])
                                    },
                                    null,
                                    2
                                )
                            ],
                            8,
                            eu
                        ),
                        A('ul', nu, [
                            (I(!0),
                            K(
                                le,
                                null,
                                In(
                                    e.item.items,
                                    (i) => (
                                        I(),
                                        K(
                                            'li',
                                            {
                                                key: i.text,
                                                class: 'dialog-item'
                                            },
                                            [
                                                U(Ga, { item: i }, null, 8, [
                                                    'item'
                                                ])
                                            ]
                                        )
                                    )
                                ),
                                128
                            ))
                        ])
                    ],
                    2
                )
            );
        }
    });
var No = ce(su, [['__scopeId', 'data-v-09ac5408']]);
const ru = { key: 0, class: 'nav-links' },
    ou = { key: 1, class: 'item' },
    iu = { key: 2, class: 'item' },
    lu = de({
        setup(e) {
            const t = tt(),
                n = Ia(),
                s = Fa(),
                r = X(() => o.value || s.value),
                o = X(() => t.value.themeConfig.nav);
            return (i, l) =>
                F(r)
                    ? (I(),
                      K('nav', ru, [
                          F(o)
                              ? (I(!0),
                                K(
                                    le,
                                    { key: 0 },
                                    In(
                                        F(o),
                                        (c) => (
                                            I(),
                                            K(
                                                'div',
                                                { key: c.text, class: 'item' },
                                                [
                                                    c.items
                                                        ? (I(),
                                                          ve(
                                                              No,
                                                              {
                                                                  key: 0,
                                                                  item: c
                                                              },
                                                              null,
                                                              8,
                                                              ['item']
                                                          ))
                                                        : (I(),
                                                          ve(
                                                              Ro,
                                                              {
                                                                  key: 1,
                                                                  item: c
                                                              },
                                                              null,
                                                              8,
                                                              ['item']
                                                          ))
                                                ]
                                            )
                                        )
                                    ),
                                    128
                                ))
                              : pe('', !0),
                          F(n)
                              ? (I(),
                                K('div', ou, [
                                    U(No, { item: F(n) }, null, 8, ['item'])
                                ]))
                              : pe('', !0),
                          F(s)
                              ? (I(),
                                K('div', iu, [
                                    U(Ro, { item: F(s) }, null, 8, ['item'])
                                ]))
                              : pe('', !0)
                      ]))
                    : pe('', !0);
        }
    });
var Bo = ce(lu, [['__scopeId', 'data-v-46905c02']]);
const cu = { emits: ['toggle'] },
    au = A(
        'svg',
        {
            class: 'icon',
            xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true',
            role: 'img',
            viewBox: '0 0 448 512'
        },
        [
            A('path', {
                fill: 'currentColor',
                d: 'M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z',
                class: ''
            })
        ],
        -1
    ),
    uu = [au];
function fu(e, t, n, s, r, o) {
    return (
        I(),
        K(
            'div',
            {
                class: 'sidebar-button',
                onClick: t[0] || (t[0] = (i) => e.$emit('toggle'))
            },
            uu
        )
    );
}
var du = ce(cu, [['render', fu]]);
const hu = (e) => (Sr('data-v-33b2da5a'), (e = e()), Ar(), e),
    pu = { class: 'nav-bar' },
    _u = hu(() => A('div', { class: 'flex-grow' }, null, -1)),
    gu = { class: 'nav' },
    mu = de({
        emits: ['toggle'],
        setup(e) {
            return (t, n) => (
                I(),
                K('header', pu, [
                    U(du, {
                        onToggle: n[0] || (n[0] = (s) => t.$emit('toggle'))
                    }),
                    U(Ma),
                    _u,
                    A('div', gu, [U(Bo)]),
                    ge(t.$slots, 'search', {}, void 0, !0)
                ])
            );
        }
    });
var vu = ce(mu, [['__scopeId', 'data-v-33b2da5a']]);
function bu() {
    let e = null,
        t = null;
    const n = $u(s, 300);
    function s() {
        const i = yu(),
            l = xu(i);
        for (let c = 0; c < l.length; c++) {
            const f = l[c],
                h = l[c + 1],
                [v, b] = Cu(c, f, h);
            if (v) {
                history.replaceState(null, document.title, b || ' '), r(b);
                return;
            }
        }
    }
    function r(i) {
        if (
            (o(t),
            o(e),
            (t = document.querySelector(`.sidebar a[href="${i}"]`)),
            !t)
        )
            return;
        t.classList.add('active');
        const l = t.closest('.sidebar-links > ul > li');
        l && l !== t.parentElement
            ? ((e = l.querySelector('a')), e && e.classList.add('active'))
            : (e = null);
    }
    function o(i) {
        i && i.classList.remove('active');
    }
    St(() => {
        s(), window.addEventListener('scroll', n);
    }),
        Hr(() => {
            r(decodeURIComponent(location.hash));
        }),
        Cn(() => {
            window.removeEventListener('scroll', n);
        });
}
function yu() {
    return [].slice.call(
        document.querySelectorAll('.sidebar a.sidebar-link-item')
    );
}
function xu(e) {
    return [].slice
        .call(document.querySelectorAll('.header-anchor'))
        .filter((t) => e.some((n) => n.hash === t.hash));
}
function wu() {
    return document.querySelector('.nav-bar').offsetHeight;
}
function Ho(e) {
    const t = wu();
    return e.parentElement.offsetTop - t - 15;
}
function Cu(e, t, n) {
    const s = window.scrollY;
    return e === 0 && s === 0
        ? [!0, null]
        : s < Ho(t)
        ? [!1, null]
        : !n || s < Ho(n)
        ? [!0, decodeURIComponent(t.hash)]
        : [!1, null];
}
function $u(e, t) {
    let n,
        s = !1;
    return () => {
        n && clearTimeout(n),
            s
                ? (n = setTimeout(e, t))
                : (e(),
                  (s = !0),
                  setTimeout(() => {
                      s = !1;
                  }, t));
    };
}
function ku() {
    const e = Oe(),
        t = tt();
    return (
        bu(),
        X(() => {
            const n = e.data.headers,
                s = e.data.frontmatter.sidebar,
                r = e.data.frontmatter.sidebarDepth;
            if (s === !1) return [];
            if (s === 'auto') return Uo(n, r);
            const o = Hs(t.value.themeConfig.sidebar, e.data.relativePath);
            return o === !1 ? [] : o === 'auto' ? Uo(n, r) : o;
        })
    );
}
function Uo(e, t) {
    const n = [];
    if (e === void 0) return [];
    let s;
    return (
        e.forEach(({ level: r, title: o, slug: i }) => {
            if (r - 1 > t) return;
            const l = { text: o, link: `#${i}` };
            r === 2
                ? ((s = l), n.push(l))
                : s && (s.children || (s.children = [])).push(l);
        }),
        n
    );
}
const Do = (e) => {
    const t = Oe(),
        n = Nn();
    t.data.headers;
    const s = e.item.text,
        r = Eu(n.value.base, e.item.link),
        o = e.item.children,
        i = Ca(t, e.item.link),
        l = Tu(i, o);
    return It('li', { class: 'sidebar-link' }, [
        It(
            r ? 'a' : 'p',
            { class: { 'sidebar-link-item': !0, active: i }, href: r },
            s
        ),
        l
    ]);
};
function Eu(e, t) {
    return t === void 0 || t.startsWith('#') ? t : $a(e, t);
}
function Tu(e, t, n) {
    return t && t.length > 0
        ? It(
              'ul',
              { class: 'sidebar-links' },
              t.map((s) => It(Do, { item: s }))
          )
        : null;
}
const Lu = { key: 0, class: 'sidebar-links' },
    Su = de({
        setup(e) {
            const t = ku();
            return (n, s) =>
                F(t).length > 0
                    ? (I(),
                      K('ul', Lu, [
                          (I(!0),
                          K(
                              le,
                              null,
                              In(
                                  F(t),
                                  (r) => (
                                      I(),
                                      ve(
                                          F(Do),
                                          { key: r.text, item: r },
                                          null,
                                          8,
                                          ['item']
                                      )
                                  )
                              ),
                              128
                          ))
                      ]))
                    : pe('', !0);
        }
    });
const Au = {
        setup() {
            const e = Oe();
            return {
                slugs: X(() => {
                    var r;
                    const n = ((r = e.data.headers) != null ? r : []).filter(
                        (o) => o.level > 1
                    );
                    let s = 10;
                    for (const { level: o } of n) s > o && (s = o);
                    return n
                        .filter((o) => o.level < s + 2)
                        .map((o) =>
                            mt(ze({}, o), {
                                link: `#${o.slug}`,
                                level: o.level === s ? 1 : 2
                            })
                        );
                })
            };
        }
    },
    Pu = { class: 'right-slug' },
    Mu = ['href'];
function Iu(e, t, n, s, r, o) {
    return (
        I(),
        K('ul', Pu, [
            (I(!0),
            K(
                le,
                null,
                In(
                    s.slugs,
                    ({ level: i, link: l, title: c }) => (
                        I(),
                        K(
                            'li',
                            { class: De(`slug-item level-${i}`), key: l },
                            [A('a', { href: l, class: 'link' }, Ce(c), 9, Mu)],
                            2
                        )
                    )
                ),
                128
            ))
        ])
    );
}
var Ou = ce(Au, [
    ['render', Iu],
    ['__scopeId', 'data-v-1336cdc6']
]);
const Fu = de({
    props: { open: { type: Boolean, required: !0 } },
    setup(e) {
        return (t, n) => (
            I(),
            K(
                le,
                null,
                [
                    A(
                        'aside',
                        {
                            class: De([
                                'sidebar hover-scrollbar',
                                { open: e.open }
                            ])
                        },
                        [
                            U(Bo, { class: 'nav' }),
                            ge(t.$slots, 'sidebar-top', {}, void 0, !0),
                            U(Su),
                            ge(t.$slots, 'sidebar-bottom', {}, void 0, !0)
                        ],
                        2
                    ),
                    U(Ou)
                ],
                64
            )
        );
    }
});
var Ru = ce(Fu, [['__scopeId', 'data-v-509f3b00']]);
const Nu = /bitbucket.org/;
function Bu() {
    const e = tt(),
        t = Ot(),
        n = X(() => {
            const r = wa(t.value.frontmatter.editLink)
                    ? e.value.themeConfig.editLinks
                    : t.value.frontmatter.editLink,
                {
                    repo: o,
                    docsDir: i = '',
                    docsBranch: l = 'master',
                    docsRepo: c = o
                } = e.value.themeConfig,
                { relativePath: f } = t.value;
            return !r || !f || !o ? null : Hu(o, c, i, l, f);
        }),
        s = X(() => e.value.themeConfig.editLinkText || 'Edit this page');
    return { url: n, text: s };
}
function Hu(e, t, n, s, r) {
    return Nu.test(e) ? Du(e, t, n, s, r) : Uu(e, t, n, s, r);
}
function Uu(e, t, n, s, r) {
    return (
        (Ns(t) ? t : `https://github.com/${t}`).replace(Bn, '') +
        `/edit/${s}/` +
        (n ? n.replace(Bn, '') + '/' : '') +
        r
    );
}
function Du(e, t, n, s, r) {
    return (
        (Ns(t) ? t : e).replace(Bn, '') +
        `/src/${s}/` +
        (n ? n.replace(Bn, '') + '/' : '') +
        r +
        `?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`
    );
}
const ju = { class: 'edit-link' },
    Ku = ['href'],
    Wu = de({
        setup(e) {
            const { url: t, text: n } = Bu();
            return (s, r) => (
                I(),
                K('div', ju, [
                    F(t)
                        ? (I(),
                          K(
                              'a',
                              {
                                  key: 0,
                                  class: 'link',
                                  href: F(t),
                                  target: '_blank',
                                  rel: 'noopener noreferrer'
                              },
                              [Qt(Ce(F(n)) + ' ', 1), U(Us, { class: 'icon' })],
                              8,
                              Ku
                          ))
                        : pe('', !0)
                ])
            );
        }
    });
var qu = ce(Wu, [['__scopeId', 'data-v-4e0cf990']]);
const zu = { key: 0, class: 'last-updated' },
    Vu = { class: 'prefix' },
    Ju = { class: 'datetime' },
    Yu = de({
        setup(e) {
            const t = tt(),
                n = Ot(),
                s = X(() => {
                    const i = t.value.themeConfig.lastUpdated;
                    return i !== void 0 && i !== !1;
                }),
                r = X(() => {
                    const i = t.value.themeConfig.lastUpdated;
                    return i === !0 ? 'Last Updated' : i;
                }),
                o = Ye('');
            return (
                St(() => {
                    o.value = new Date(n.value.lastUpdated).toLocaleString(
                        'en-US'
                    );
                }),
                (i, l) =>
                    F(s)
                        ? (I(),
                          K('p', zu, [
                              A('span', Vu, Ce(F(r)) + ':', 1),
                              A('span', Ju, Ce(o.value), 1)
                          ]))
                        : pe('', !0)
            );
        }
    });
var Xu = ce(Yu, [['__scopeId', 'data-v-62bdcaad']]);
const Zu = { class: 'page-footer' },
    Qu = { class: 'edit' },
    Gu = { class: 'updated' },
    ef = de({
        setup(e) {
            return (t, n) => (
                I(),
                K('footer', Zu, [A('div', Qu, [U(qu)]), A('div', Gu, [U(Xu)])])
            );
        }
    });
var tf = ce(ef, [['__scopeId', 'data-v-79d80dc0']]);
function nf() {
    const e = tt(),
        t = Ot(),
        n = X(() => Mo(Bs(t.value.relativePath))),
        s = X(() => {
            const c = Hs(e.value.themeConfig.sidebar, n.value);
            return Rs(c) ? Io(c) : [];
        }),
        r = X(() => s.value.findIndex((c) => c.link === n.value)),
        o = X(() => {
            if (
                e.value.themeConfig.nextLinks !== !1 &&
                r.value > -1 &&
                r.value < s.value.length - 1
            )
                return s.value[r.value + 1];
        }),
        i = X(() => {
            if (e.value.themeConfig.prevLinks !== !1 && r.value > 0)
                return s.value[r.value - 1];
        }),
        l = X(() => !!o.value || !!i.value);
    return { next: o, prev: i, hasLinks: l };
}
const sf = {},
    rf = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
    of = A(
        'path',
        {
            d: 'M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z'
        },
        null,
        -1
    ),
    lf = [of];
function cf(e, t) {
    return I(), K('svg', rf, lf);
}
var af = ce(sf, [['render', cf]]);
const uf = {},
    ff = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
    df = A(
        'path',
        {
            d: 'M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z'
        },
        null,
        -1
    ),
    hf = [df];
function pf(e, t) {
    return I(), K('svg', ff, hf);
}
var _f = ce(uf, [['render', pf]]);
const gf = { key: 0, class: 'next-and-prev-link' },
    mf = { class: 'container' },
    vf = { class: 'prev' },
    bf = ['href'],
    yf = { class: 'text' },
    xf = { class: 'next' },
    wf = ['href'],
    Cf = { class: 'text' },
    $f = de({
        setup(e) {
            const { hasLinks: t, prev: n, next: s } = nf();
            return (r, o) =>
                F(t)
                    ? (I(),
                      K('div', gf, [
                          A('div', mf, [
                              A('div', vf, [
                                  F(n)
                                      ? (I(),
                                        K(
                                            'a',
                                            {
                                                key: 0,
                                                class: 'link',
                                                href: r.$withBase(F(n).link)
                                            },
                                            [
                                                U(af, {
                                                    class: 'icon icon-prev'
                                                }),
                                                A('span', yf, Ce(F(n).text), 1)
                                            ],
                                            8,
                                            bf
                                        ))
                                      : pe('', !0)
                              ]),
                              A('div', xf, [
                                  F(s)
                                      ? (I(),
                                        K(
                                            'a',
                                            {
                                                key: 0,
                                                class: 'link',
                                                href: r.$withBase(F(s).link)
                                            },
                                            [
                                                A('span', Cf, Ce(F(s).text), 1),
                                                U(_f, {
                                                    class: 'icon icon-next'
                                                })
                                            ],
                                            8,
                                            wf
                                        ))
                                      : pe('', !0)
                              ])
                          ])
                      ]))
                    : pe('', !0);
        }
    });
var kf = ce($f, [['__scopeId', 'data-v-6ea49ff3']]);
const Ef = { class: 'page' },
    Tf = { class: 'container hover-scrollbar' },
    Lf = { class: 'content' },
    Sf = de({
        setup(e) {
            return (t, n) => {
                const s = at('Content');
                return (
                    I(),
                    K('main', Ef, [
                        A('div', Tf, [
                            ge(t.$slots, 'top', {}, void 0, !0),
                            A('div', Lf, [U(s)]),
                            U(tf),
                            U(kf),
                            ge(t.$slots, 'bottom', {}, void 0, !0)
                        ])
                    ])
                );
            };
        }
    });
var Af = ce(Sf, [['__scopeId', 'data-v-a901e69a']]);
const Pf = { key: 0, id: 'ads-container' },
    Mf = de({
        setup(e) {
            const t = al(() => import('./Home.a3acf7a8.js')),
                n = () => null,
                s = n,
                r = n,
                o = n,
                i = Oe(),
                l = Nn(),
                c = tt(),
                f = X(() => l.value.themeConfig),
                h = Ot(),
                v = X(() => !!i.data.frontmatter.customLayout),
                b = X(() => !!i.data.frontmatter.home),
                $ = X(() => {
                    const { themeConfig: S } = c.value,
                        { frontmatter: R } = i.data;
                    return R.navbar === !1 || S.navbar === !1
                        ? !1
                        : l.value.title || S.logo || S.repo || S.nav;
                }),
                E = Ye(!1),
                N = X(() => {
                    const { frontmatter: S } = i.data;
                    if (S.home || S.sidebar === !1) return !1;
                    const { themeConfig: R } = c.value;
                    return !Ta(Hs(R.sidebar, i.data.relativePath));
                }),
                p = (S) => {
                    E.value = typeof S == 'boolean' ? S : !E.value;
                },
                y = p.bind(null, !1);
            Lt(i, y);
            const O = X(() => [
                {
                    'no-navbar': !$.value,
                    'sidebar-open': E.value,
                    'no-sidebar': !N.value
                }
            ]);
            return (S, R) => {
                const q = at('Content'),
                    Z = at('Debug');
                return (
                    I(),
                    K(
                        le,
                        null,
                        [
                            A(
                                'div',
                                { class: De(['theme', F(O)]) },
                                [
                                    F($)
                                        ? (I(),
                                          ve(
                                              vu,
                                              { key: 0, onToggle: p },
                                              {
                                                  search: Ne(() => [
                                                      ge(
                                                          S.$slots,
                                                          'navbar-search',
                                                          {},
                                                          () => [
                                                              F(f).algolia
                                                                  ? (I(),
                                                                    ve(
                                                                        F(o),
                                                                        {
                                                                            key: 0,
                                                                            options:
                                                                                F(
                                                                                    f
                                                                                )
                                                                                    .algolia
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            'options'
                                                                        ]
                                                                    ))
                                                                  : pe('', !0)
                                                          ]
                                                      )
                                                  ]),
                                                  _: 3
                                              }
                                          ))
                                        : pe('', !0),
                                    U(
                                        Ru,
                                        { open: E.value },
                                        {
                                            'sidebar-top': Ne(() => [
                                                ge(S.$slots, 'sidebar-top')
                                            ]),
                                            'sidebar-bottom': Ne(() => [
                                                ge(S.$slots, 'sidebar-bottom')
                                            ]),
                                            _: 3
                                        },
                                        8,
                                        ['open']
                                    ),
                                    A('div', {
                                        class: 'sidebar-mask',
                                        onClick: R[0] || (R[0] = (L) => p(!1))
                                    }),
                                    F(v)
                                        ? (I(), ve(q, { key: 1 }))
                                        : F(b)
                                        ? (I(),
                                          ve(
                                              F(t),
                                              { key: 2 },
                                              {
                                                  hero: Ne(() => [
                                                      ge(S.$slots, 'home-hero')
                                                  ]),
                                                  features: Ne(() => [
                                                      ge(
                                                          S.$slots,
                                                          'home-features'
                                                      )
                                                  ]),
                                                  footer: Ne(() => [
                                                      ge(
                                                          S.$slots,
                                                          'home-footer'
                                                      )
                                                  ]),
                                                  _: 3
                                              }
                                          ))
                                        : (I(),
                                          ve(
                                              Af,
                                              { key: 3 },
                                              {
                                                  top: Ne(() => [
                                                      ge(
                                                          S.$slots,
                                                          'page-top-ads',
                                                          {},
                                                          () => [
                                                              F(f).carbonAds &&
                                                              F(f).carbonAds
                                                                  .carbon
                                                                  ? (I(),
                                                                    K(
                                                                        'div',
                                                                        Pf,
                                                                        [
                                                                            (I(),
                                                                            ve(
                                                                                F(
                                                                                    s
                                                                                ),
                                                                                {
                                                                                    key:
                                                                                        'carbon' +
                                                                                        F(
                                                                                            h
                                                                                        )
                                                                                            .relativePath,
                                                                                    code: F(
                                                                                        f
                                                                                    )
                                                                                        .carbonAds
                                                                                        .carbon,
                                                                                    placement:
                                                                                        F(
                                                                                            f
                                                                                        )
                                                                                            .carbonAds
                                                                                            .placement
                                                                                },
                                                                                null,
                                                                                8,
                                                                                [
                                                                                    'code',
                                                                                    'placement'
                                                                                ]
                                                                            ))
                                                                        ]
                                                                    ))
                                                                  : pe('', !0)
                                                          ]
                                                      ),
                                                      ge(S.$slots, 'page-top')
                                                  ]),
                                                  bottom: Ne(() => [
                                                      ge(
                                                          S.$slots,
                                                          'page-bottom'
                                                      ),
                                                      ge(
                                                          S.$slots,
                                                          'page-bottom-ads',
                                                          {},
                                                          () => [
                                                              F(f).carbonAds &&
                                                              F(f).carbonAds
                                                                  .custom
                                                                  ? (I(),
                                                                    ve(
                                                                        F(r),
                                                                        {
                                                                            key:
                                                                                'custom' +
                                                                                F(
                                                                                    h
                                                                                )
                                                                                    .relativePath,
                                                                            code: F(
                                                                                f
                                                                            )
                                                                                .carbonAds
                                                                                .custom,
                                                                            placement:
                                                                                F(
                                                                                    f
                                                                                )
                                                                                    .carbonAds
                                                                                    .placement
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            'code',
                                                                            'placement'
                                                                        ]
                                                                    ))
                                                                  : pe('', !0)
                                                          ]
                                                      )
                                                  ]),
                                                  _: 3
                                              }
                                          ))
                                ],
                                2
                            ),
                            U(Z)
                        ],
                        64
                    )
                );
            };
        }
    }),
    If = { class: 'theme' },
    Of = A('h1', null, '404', -1),
    Ff = ['href'],
    Rf = de({
        setup(e) {
            const t = [
                "There's nothing here.",
                'How did we get here?',
                "That's a Four-Oh-Four.",
                "Looks like we've got some broken links."
            ];
            function n() {
                return t[Math.floor(Math.random() * t.length)];
            }
            return (s, r) => (
                I(),
                K('div', If, [
                    Of,
                    A('blockquote', null, Ce(n()), 1),
                    A(
                        'a',
                        { href: s.$site.base, 'aria-label': 'go to home' },
                        'Take me home.',
                        8,
                        Ff
                    )
                ])
            );
        }
    }),
    jo = { Layout: Mf, NotFound: Rf },
    Ds = new Set(),
    Ko = () => document.createElement('link'),
    Nf = (e) => {
        const t = Ko();
        (t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t);
    },
    Bf = (e) => {
        const t = new XMLHttpRequest();
        t.open('GET', e, (t.withCredentials = !0)), t.send();
    };
let Hn;
const Hf =
    et &&
    (Hn = Ko()) &&
    Hn.relList &&
    Hn.relList.supports &&
    Hn.relList.supports('prefetch')
        ? Nf
        : Bf;
function Uf() {
    if (!et || !window.IntersectionObserver) return;
    let e;
    if (
        (e = navigator.connection) &&
        (e.saveData || /2g/.test(e.effectiveType))
    )
        return;
    const t = window.requestIdleCallback || setTimeout;
    let n = null;
    const s = () => {
        n && n.disconnect(),
            (n = new IntersectionObserver((o) => {
                o.forEach((i) => {
                    if (i.isIntersecting) {
                        const l = i.target;
                        n.unobserve(l);
                        const { pathname: c } = l;
                        if (!Ds.has(c)) {
                            Ds.add(c);
                            const f = wo(c);
                            Hf(f);
                        }
                    }
                });
            })),
            t(() => {
                document.querySelectorAll('#app a').forEach((o) => {
                    const { target: i, hostname: l, pathname: c } = o,
                        f = c.match(/\.\w+$/);
                    (f && f[0] !== '.html') ||
                        (i !== '_blank' &&
                            l === location.hostname &&
                            (c !== location.pathname
                                ? n.observe(o)
                                : Ds.add(c)));
                });
            });
    };
    St(s);
    const r = Oe();
    Lt(() => r.path, s),
        Cn(() => {
            n && n.disconnect();
        });
}
const Df = jo.NotFound || (() => '404 Not Found'),
    jf = {
        name: 'VitePressApp',
        setup() {
            return Uf(), () => It(jo.Layout);
        }
    };
function Kf() {
    const e = qf(),
        t = Wf();
    t.provide(Co, e);
    const n = tt(e.route),
        s = Ot(e.route);
    return et && _a(e.route, n), la(t, Fs, n, s), ca(t), { app: t, router: e };
}
function Wf() {
    return wc(jf);
}
function qf() {
    let e = et,
        t;
    return kc((n) => {
        let s = wo(n);
        return (
            e && (t = s),
            (e || t === s) && (s = s.replace(/\.js$/, '.lean.js')),
            et ? ((e = !1), import(s)) : require(s)
        );
    }, Df);
}
if (et) {
    const { app: e, router: t } = Kf();
    t.go().then(() => {
        e.mount('#app');
    });
}
export {
    le as F,
    Ro as N,
    ce as _,
    Vf as a,
    X as b,
    K as c,
    Kf as createApp,
    de as d,
    kn as e,
    A as f,
    Jf as g,
    $t as h,
    at as i,
    Ce as j,
    U as k,
    Ne as l,
    Qt as m,
    De as n,
    I as o,
    Yf as p,
    F as q,
    ge as r,
    pe as s,
    _n as t,
    tt as u,
    Rn as v,
    Lt as w,
    ve as x,
    In as y
};
