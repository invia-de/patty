var _preactComponents = (function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 5))
  );
})([
  function(e, t, n) {
    e.exports = n(2)();
  },
  function(e, t, n) {
    e.exports = { fakefake: 'Test_fakefake__1AAmg' };
  },
  function(e, t, n) {
    'use strict';
    var r = n(3);
    function o() {}
    function i() {}
    (i.resetWarningCache = o),
      (e.exports = function() {
        function e(e, t, n, o, i, a) {
          if (a !== r) {
            var l = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
            throw ((l.name = 'Invariant Violation'), l);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var n = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: i,
          resetWarningCache: o
        };
        return (n.PropTypes = n), n;
      });
  },
  function(e, t, n) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  ,
  function(e, t, n) {
    'use strict';
    n.r(t);
    var r = n(0),
      o = n.n(r),
      i = function() {},
      a = {},
      l = [],
      p = [];
    function s(e, t) {
      var n,
        r,
        o,
        s,
        c = p;
      for (s = arguments.length; s-- > 2; ) l.push(arguments[s]);
      for (
        t &&
        null != t.children &&
        (l.length || l.push(t.children), delete t.children);
        l.length;

      )
        if ((r = l.pop()) && void 0 !== r.pop)
          for (s = r.length; s--; ) l.push(r[s]);
        else
          'boolean' === typeof r && (r = null),
            (o = 'function' !== typeof e) &&
              (null == r
                ? (r = '')
                : 'number' === typeof r
                ? (r = String(r))
                : 'string' !== typeof r && (o = !1)),
            o && n ? (c[c.length - 1] += r) : c === p ? (c = [r]) : c.push(r),
            (n = o);
      var u = new i();
      return (
        (u.nodeName = e),
        (u.children = c),
        (u.attributes = null == t ? void 0 : t),
        (u.key = null == t ? void 0 : t.key),
        void 0 !== a.vnode && a.vnode(u),
        u
      );
    }
    function c(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function u(e, t) {
      null != e && ('function' == typeof e ? e(t) : (e.current = t));
    }
    var f =
      'function' == typeof Promise
        ? Promise.resolve().then.bind(Promise.resolve())
        : setTimeout;
    function d(e, t) {
      return s(
        e.nodeName,
        c(c({}, e.attributes), t),
        arguments.length > 2 ? [].slice.call(arguments, 2) : e.children
      );
    }
    var h = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      m = [];
    function v(e) {
      !e._dirty &&
        (e._dirty = !0) &&
        1 == m.push(e) &&
        (a.debounceRendering || f)(y);
    }
    function y() {
      for (var e; (e = m.pop()); ) e._dirty && A(e);
    }
    function b(e, t) {
      return (
        e.normalizedNodeName === t ||
        e.nodeName.toLowerCase() === t.toLowerCase()
      );
    }
    function _(e) {
      var t = c({}, e.attributes);
      t.children = e.children;
      var n = e.nodeName.defaultProps;
      if (void 0 !== n) for (var r in n) void 0 === t[r] && (t[r] = n[r]);
      return t;
    }
    function g(e) {
      var t = e.parentNode;
      t && t.removeChild(e);
    }
    function C(e, t, n, r, o) {
      if (('className' === t && (t = 'class'), 'key' === t));
      else if ('ref' === t) u(n, null), u(r, e);
      else if ('class' !== t || o)
        if ('style' === t) {
          if (
            ((r && 'string' !== typeof r && 'string' !== typeof n) ||
              (e.style.cssText = r || ''),
            r && 'object' === typeof r)
          ) {
            if ('string' !== typeof n)
              for (var i in n) i in r || (e.style[i] = '');
            for (var i in r)
              e.style[i] =
                'number' === typeof r[i] && !1 === h.test(i)
                  ? r[i] + 'px'
                  : r[i];
          }
        } else if ('dangerouslySetInnerHTML' === t)
          r && (e.innerHTML = r.__html || '');
        else if ('o' == t[0] && 'n' == t[1]) {
          var a = t !== (t = t.replace(/Capture$/, ''));
          (t = t.toLowerCase().substring(2)),
            r
              ? n || e.addEventListener(t, N, a)
              : e.removeEventListener(t, N, a),
            ((e._listeners || (e._listeners = {}))[t] = r);
        } else if ('list' !== t && 'type' !== t && !o && t in e) {
          try {
            e[t] = null == r ? '' : r;
          } catch (p) {}
          (null != r && !1 !== r) || 'spellcheck' == t || e.removeAttribute(t);
        } else {
          var l = o && t !== (t = t.replace(/^xlink:?/, ''));
          null == r || !1 === r
            ? l
              ? e.removeAttributeNS(
                  'http://www.w3.org/1999/xlink',
                  t.toLowerCase()
                )
              : e.removeAttribute(t)
            : 'function' !== typeof r &&
              (l
                ? e.setAttributeNS(
                    'http://www.w3.org/1999/xlink',
                    t.toLowerCase(),
                    r
                  )
                : e.setAttribute(t, r));
        }
      else e.className = r || '';
    }
    function N(e) {
      return this._listeners[e.type]((a.event && a.event(e)) || e);
    }
    var x = [],
      P = 0,
      k = !1,
      S = !1;
    function w() {
      for (var e; (e = x.shift()); )
        a.afterMount && a.afterMount(e),
          e.componentDidMount && e.componentDidMount();
    }
    function T(e, t, n, r, o, i) {
      P++ ||
        ((k = null != o && void 0 !== o.ownerSVGElement),
        (S = null != e && !('__preactattr_' in e)));
      var a = O(e, t, n, r, i);
      return (
        o && a.parentNode !== o && o.appendChild(a),
        --P || ((S = !1), i || w()),
        a
      );
    }
    function O(e, t, n, r, o) {
      var i = e,
        a = k;
      if (
        ((null != t && 'boolean' !== typeof t) || (t = ''),
        'string' === typeof t || 'number' === typeof t)
      )
        return (
          e && void 0 !== e.splitText && e.parentNode && (!e._component || o)
            ? e.nodeValue != t && (e.nodeValue = t)
            : ((i = document.createTextNode(t)),
              e && (e.parentNode && e.parentNode.replaceChild(i, e), U(e, !0))),
          (i.__preactattr_ = !0),
          i
        );
      var l = t.nodeName;
      if ('function' === typeof l)
        return (function(e, t, n, r) {
          var o = e && e._component,
            i = o,
            a = e,
            l = o && e._componentConstructor === t.nodeName,
            p = l,
            s = _(t);
          for (; o && !p && (o = o._parentComponent); )
            p = o.constructor === t.nodeName;
          o && p && (!r || o._component)
            ? (W(o, s, 3, n, r), (e = o.base))
            : (i && !l && (D(i), (e = a = null)),
              (o = M(t.nodeName, s, n)),
              e && !o.nextBase && ((o.nextBase = e), (a = null)),
              W(o, s, 1, n, r),
              (e = o.base),
              a && e !== a && ((a._component = null), U(a, !1)));
          return e;
        })(e, t, n, r);
      if (
        ((k = 'svg' === l || ('foreignObject' !== l && k)),
        (l = String(l)),
        (!e || !b(e, l)) &&
          ((i = (function(e, t) {
            var n = t
              ? document.createElementNS('http://www.w3.org/2000/svg', e)
              : document.createElement(e);
            return (n.normalizedNodeName = e), n;
          })(l, k)),
          e))
      ) {
        for (; e.firstChild; ) i.appendChild(e.firstChild);
        e.parentNode && e.parentNode.replaceChild(i, e), U(e, !0);
      }
      var p = i.firstChild,
        s = i.__preactattr_,
        c = t.children;
      if (null == s) {
        s = i.__preactattr_ = {};
        for (var u = i.attributes, f = u.length; f--; )
          s[u[f].name] = u[f].value;
      }
      return (
        !S &&
        c &&
        1 === c.length &&
        'string' === typeof c[0] &&
        null != p &&
        void 0 !== p.splitText &&
        null == p.nextSibling
          ? p.nodeValue != c[0] && (p.nodeValue = c[0])
          : ((c && c.length) || null != p) &&
            (function(e, t, n, r, o) {
              var i,
                a,
                l,
                p,
                s,
                c = e.childNodes,
                u = [],
                f = {},
                d = 0,
                h = 0,
                m = c.length,
                v = 0,
                y = t ? t.length : 0;
              if (0 !== m)
                for (var _ = 0; _ < m; _++) {
                  var C = c[_],
                    N = C.__preactattr_,
                    x =
                      y && N
                        ? C._component
                          ? C._component.__key
                          : N.key
                        : null;
                  null != x
                    ? (d++, (f[x] = C))
                    : (N ||
                        (void 0 !== C.splitText
                          ? !o || C.nodeValue.trim()
                          : o)) &&
                      (u[v++] = C);
                }
              if (0 !== y)
                for (var _ = 0; _ < y; _++) {
                  (p = t[_]), (s = null);
                  var x = p.key;
                  if (null != x)
                    d && void 0 !== f[x] && ((s = f[x]), (f[x] = void 0), d--);
                  else if (h < v)
                    for (i = h; i < v; i++)
                      if (
                        void 0 !== u[i] &&
                        ((P = a = u[i]),
                        (S = o),
                        'string' === typeof (k = p) || 'number' === typeof k
                          ? void 0 !== P.splitText
                          : 'string' === typeof k.nodeName
                          ? !P._componentConstructor && b(P, k.nodeName)
                          : S || P._componentConstructor === k.nodeName)
                      ) {
                        (s = a),
                          (u[i] = void 0),
                          i === v - 1 && v--,
                          i === h && h++;
                        break;
                      }
                  (s = O(s, p, n, r)),
                    (l = c[_]),
                    s &&
                      s !== e &&
                      s !== l &&
                      (null == l
                        ? e.appendChild(s)
                        : s === l.nextSibling
                        ? g(l)
                        : e.insertBefore(s, l));
                }
              var P, k, S;
              if (d) for (var _ in f) void 0 !== f[_] && U(f[_], !1);
              for (; h <= v; ) void 0 !== (s = u[v--]) && U(s, !1);
            })(i, c, n, r, S || null != s.dangerouslySetInnerHTML),
        (function(e, t, n) {
          var r;
          for (r in n)
            (t && null != t[r]) ||
              null == n[r] ||
              C(e, r, n[r], (n[r] = void 0), k);
          for (r in t)
            'children' === r ||
              'innerHTML' === r ||
              (r in n &&
                t[r] === ('value' === r || 'checked' === r ? e[r] : n[r])) ||
              C(e, r, n[r], (n[r] = t[r]), k);
        })(i, t.attributes, s),
        (k = a),
        i
      );
    }
    function U(e, t) {
      var n = e._component;
      n
        ? D(n)
        : (null != e.__preactattr_ && u(e.__preactattr_.ref, null),
          (!1 !== t && null != e.__preactattr_) || g(e),
          j(e));
    }
    function j(e) {
      for (e = e.lastChild; e; ) {
        var t = e.previousSibling;
        U(e, !0), (e = t);
      }
    }
    var E = [];
    function M(e, t, n) {
      var r,
        o = E.length;
      for (
        e.prototype && e.prototype.render
          ? ((r = new e(t, n)), L.call(r, t, n))
          : (((r = new L(t, n)).constructor = e), (r.render = R));
        o--;

      )
        if (E[o].constructor === e)
          return (r.nextBase = E[o].nextBase), E.splice(o, 1), r;
      return r;
    }
    function R(e, t, n) {
      return this.constructor(e, n);
    }
    function W(e, t, n, r, o) {
      e._disable ||
        ((e._disable = !0),
        (e.__ref = t.ref),
        (e.__key = t.key),
        delete t.ref,
        delete t.key,
        'undefined' === typeof e.constructor.getDerivedStateFromProps &&
          (!e.base || o
            ? e.componentWillMount && e.componentWillMount()
            : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)),
        r &&
          r !== e.context &&
          (e.prevContext || (e.prevContext = e.context), (e.context = r)),
        e.prevProps || (e.prevProps = e.props),
        (e.props = t),
        (e._disable = !1),
        0 !== n &&
          (1 !== n && !1 === a.syncComponentUpdates && e.base
            ? v(e)
            : A(e, 1, o)),
        u(e.__ref, e));
    }
    function A(e, t, n, r) {
      if (!e._disable) {
        var o,
          i,
          l,
          p = e.props,
          s = e.state,
          u = e.context,
          f = e.prevProps || p,
          d = e.prevState || s,
          h = e.prevContext || u,
          m = e.base,
          v = e.nextBase,
          y = m || v,
          b = e._component,
          g = !1,
          C = h;
        if (
          (e.constructor.getDerivedStateFromProps &&
            ((s = c(c({}, s), e.constructor.getDerivedStateFromProps(p, s))),
            (e.state = s)),
          m &&
            ((e.props = f),
            (e.state = d),
            (e.context = h),
            2 !== t &&
            e.shouldComponentUpdate &&
            !1 === e.shouldComponentUpdate(p, s, u)
              ? (g = !0)
              : e.componentWillUpdate && e.componentWillUpdate(p, s, u),
            (e.props = p),
            (e.state = s),
            (e.context = u)),
          (e.prevProps = e.prevState = e.prevContext = e.nextBase = null),
          (e._dirty = !1),
          !g)
        ) {
          (o = e.render(p, s, u)),
            e.getChildContext && (u = c(c({}, u), e.getChildContext())),
            m &&
              e.getSnapshotBeforeUpdate &&
              (C = e.getSnapshotBeforeUpdate(f, d));
          var N,
            k,
            S = o && o.nodeName;
          if ('function' === typeof S) {
            var O = _(o);
            (i = b) && i.constructor === S && O.key == i.__key
              ? W(i, O, 1, u, !1)
              : ((N = i),
                (e._component = i = M(S, O, u)),
                (i.nextBase = i.nextBase || v),
                (i._parentComponent = e),
                W(i, O, 0, u, !1),
                A(i, 1, n, !0)),
              (k = i.base);
          } else
            (l = y),
              (N = b) && (l = e._component = null),
              (y || 1 === t) &&
                (l && (l._component = null),
                (k = T(l, o, u, n || !m, y && y.parentNode, !0)));
          if (y && k !== y && i !== b) {
            var j = y.parentNode;
            j &&
              k !== j &&
              (j.replaceChild(k, y), N || ((y._component = null), U(y, !1)));
          }
          if ((N && D(N), (e.base = k), k && !r)) {
            for (var E = e, R = e; (R = R._parentComponent); ) (E = R).base = k;
            (k._component = E), (k._componentConstructor = E.constructor);
          }
        }
        for (
          !m || n
            ? x.push(e)
            : g ||
              (e.componentDidUpdate && e.componentDidUpdate(f, d, C),
              a.afterUpdate && a.afterUpdate(e));
          e._renderCallbacks.length;

        )
          e._renderCallbacks.pop().call(e);
        P || r || w();
      }
    }
    function D(e) {
      a.beforeUnmount && a.beforeUnmount(e);
      var t = e.base;
      (e._disable = !0),
        e.componentWillUnmount && e.componentWillUnmount(),
        (e.base = null);
      var n = e._component;
      n
        ? D(n)
        : t &&
          (null != t.__preactattr_ && u(t.__preactattr_.ref, null),
          (e.nextBase = t),
          g(t),
          E.push(e),
          j(t)),
        u(e.__ref, null);
    }
    function L(e, t) {
      (this._dirty = !0),
        (this.context = t),
        (this.props = e),
        (this.state = this.state || {}),
        (this._renderCallbacks = []);
    }
    function B(e, t, n) {
      return T(n, e, {}, !1, t, !1);
    }
    c(L.prototype, {
      setState: function(e, t) {
        this.prevState || (this.prevState = this.state),
          (this.state = c(
            c({}, this.state),
            'function' === typeof e ? e(this.state, this.props) : e
          )),
          t && this._renderCallbacks.push(t),
          v(this);
      },
      forceUpdate: function(e) {
        e && this._renderCallbacks.push(e), A(this, 2);
      },
      render: function() {}
    });
    var V = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(
        ' '
      ),
      I =
        ('undefined' !== typeof Symbol &&
          Symbol.for &&
          Symbol.for('react.element')) ||
        60103,
      z =
        'undefined' !== typeof Symbol && Symbol.for
          ? Symbol.for('__preactCompatWrapper')
          : '__preactCompatWrapper',
      $ = {
        constructor: 1,
        render: 1,
        shouldComponentUpdate: 1,
        componentWillReceiveProps: 1,
        componentWillUpdate: 1,
        componentDidUpdate: 1,
        componentWillMount: 1,
        componentDidMount: 1,
        componentWillUnmount: 1,
        componentDidUnmount: 1
      },
      F = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/,
      H = {},
      q = !1;
    try {
      q = !1;
    } catch (Oe) {}
    function G() {
      return null;
    }
    var Z = s('a', null).constructor;
    (Z.prototype.$$typeof = I),
      (Z.prototype.preactCompatUpgraded = !1),
      (Z.prototype.preactCompatNormalized = !1),
      Object.defineProperty(Z.prototype, 'type', {
        get: function() {
          return this.nodeName;
        },
        set: function(e) {
          this.nodeName = e;
        },
        configurable: !0
      }),
      Object.defineProperty(Z.prototype, 'props', {
        get: function() {
          return this.attributes;
        },
        set: function(e) {
          this.attributes = e;
        },
        configurable: !0
      });
    var Y = a.event;
    a.event = function(e) {
      return Y && (e = Y(e)), (e.persist = Object), (e.nativeEvent = e), e;
    };
    var J = a.vnode;
    function K(e, t, n) {
      var r = t && t._preactCompatRendered && t._preactCompatRendered.base;
      r && r.parentNode !== t && (r = null),
        !r && t && (r = t.firstElementChild);
      for (var o = t.childNodes.length; o--; )
        t.childNodes[o] !== r && t.removeChild(t.childNodes[o]);
      var i = B(e, t, r);
      return (
        t && (t._preactCompatRendered = i && (i._component || { base: i })),
        'function' === typeof n && n(),
        (i && i._component) || i
      );
    }
    a.vnode = function(e) {
      if (!e.preactCompatUpgraded) {
        e.preactCompatUpgraded = !0;
        var t = e.nodeName,
          n = (e.attributes = null == e.attributes ? {} : fe({}, e.attributes));
        'function' === typeof t
          ? (!0 === t[z] ||
              (t.prototype && 'isReactComponent' in t.prototype)) &&
            (e.children && '' === String(e.children) && (e.children = void 0),
            e.children && (n.children = e.children),
            e.preactCompatNormalized || se(e),
            (function(e) {
              var t = e.nodeName,
                n = e.attributes;
              (e.attributes = {}),
                t.defaultProps && fe(e.attributes, t.defaultProps);
              n && fe(e.attributes, n);
            })(e))
          : (e.children && '' === String(e.children) && (e.children = void 0),
            e.children && (n.children = e.children),
            n.defaultValue &&
              (n.value || 0 === n.value || (n.value = n.defaultValue),
              delete n.defaultValue),
            (function(e, t) {
              var n, r, o;
              if (t) {
                for (o in t) if ((n = F.test(o))) break;
                if (n)
                  for (o in ((r = e.attributes = {}), t))
                    t.hasOwnProperty(o) &&
                      (r[
                        F.test(o)
                          ? o.replace(/([A-Z0-9])/, '-$1').toLowerCase()
                          : o
                      ] = t[o]);
              }
            })(e, n));
      }
      J && J(e);
    };
    var Q = function() {};
    function X(e, t, n, r) {
      var o = K(s(Q, { context: e.context }, t), n),
        i = o._component || o.base;
      return r && r.call(i, o), i;
    }
    function ee(e) {
      X(this, e.vnode, e.container);
    }
    (Q.prototype.getChildContext = function() {
      return this.props.context;
    }),
      (Q.prototype.render = function(e) {
        return e.children[0];
      });
    var te,
      ne = [],
      re = {
        map: function(e, t, n) {
          return null == e
            ? null
            : ((e = re.toArray(e)), n && n !== e && (t = t.bind(n)), e.map(t));
        },
        forEach: function(e, t, n) {
          if (null == e) return null;
          (e = re.toArray(e)), n && n !== e && (t = t.bind(n)), e.forEach(t);
        },
        count: function(e) {
          return (e && e.length) || 0;
        },
        only: function(e) {
          if (1 !== (e = re.toArray(e)).length)
            throw new Error('Children.only() expects only one child.');
          return e[0];
        },
        toArray: function(e) {
          return null == e ? [] : ne.concat(e);
        }
      };
    function oe(e) {
      return pe.bind(null, e);
    }
    for (var ie = {}, ae = V.length; ae--; ) ie[V[ae]] = oe(V[ae]);
    function le(e) {
      var t,
        n = e[z];
      return n
        ? !0 === n
          ? e
          : n
        : ((n = me({
            displayName: (t = e).displayName || t.name,
            render: function() {
              return t(this.props, this.context);
            }
          })),
          Object.defineProperty(n, z, { configurable: !0, value: !0 }),
          (n.displayName = e.displayName),
          (n.propTypes = e.propTypes),
          (n.defaultProps = e.defaultProps),
          Object.defineProperty(e, z, { configurable: !0, value: n }),
          n);
    }
    function pe() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      return (
        (function e(t, n) {
          for (var r = n || 0; r < t.length; r++) {
            var o = t[r];
            Array.isArray(o)
              ? e(o)
              : o &&
                'object' === typeof o &&
                !ce(o) &&
                ((o.props && o.type) ||
                  (o.attributes && o.nodeName) ||
                  o.children) &&
                (t[r] = pe(
                  o.type || o.nodeName,
                  o.props || o.attributes,
                  o.children
                ));
          }
        })(e, 2),
        se(s.apply(void 0, e))
      );
    }
    function se(e) {
      var t;
      (e.preactCompatNormalized = !0),
        (function(e) {
          var t = e.attributes || (e.attributes = {});
          (ue.enumerable = 'className' in t),
            t.className && (t.class = t.className);
          Object.defineProperty(t, 'className', ue);
        })(e),
        'function' !== typeof (t = e.nodeName) ||
          (t.prototype && t.prototype.render) ||
          (e.nodeName = le(e.nodeName));
      var n,
        r,
        o = e.attributes.ref,
        i = o && typeof o;
      return (
        !te ||
          ('string' !== i && 'number' !== i) ||
          (e.attributes.ref = ((n = o),
          (r = te)._refProxies[n] ||
            (r._refProxies[n] = function(e) {
              r &&
                r.refs &&
                ((r.refs[n] = e),
                null === e && (delete r._refProxies[n], (r = null)));
            }))),
        (function(e) {
          var t = e.nodeName,
            n = e.attributes;
          if (!n || 'string' !== typeof t) return;
          var r = {};
          for (var o in n) r[o.toLowerCase()] = o;
          r.ondoubleclick &&
            ((n.ondblclick = n[r.ondoubleclick]), delete n[r.ondoubleclick]);
          if (
            r.onchange &&
            ('textarea' === t ||
              ('input' === t.toLowerCase() && !/^fil|che|rad/i.test(n.type)))
          ) {
            var i = r.oninput || 'oninput';
            n[i] || ((n[i] = ye([n[i], n[r.onchange]])), delete n[r.onchange]);
          }
        })(e),
        e
      );
    }
    function ce(e) {
      return e && (e instanceof Z || e.$$typeof === I);
    }
    var ue = {
      configurable: !0,
      get: function() {
        return this.class;
      },
      set: function(e) {
        this.class = e;
      }
    };
    function fe(e, t) {
      for (var n = arguments, r = 1, o = void 0; r < arguments.length; r++)
        if ((o = n[r])) for (var i in o) o.hasOwnProperty(i) && (e[i] = o[i]);
      return e;
    }
    function de(e, t) {
      for (var n in e) if (!(n in t)) return !0;
      for (var r in t) if (e[r] !== t[r]) return !0;
      return !1;
    }
    function he() {}
    function me(e) {
      function t(e, t) {
        !(function(e) {
          for (var t in e) {
            var n = e[t];
            'function' !== typeof n ||
              n.__bound ||
              $.hasOwnProperty(t) ||
              ((e[t] = n.bind(e)).__bound = !0);
          }
        })(this),
          Ne.call(this, e, t, H),
          be.call(this, e, t);
      }
      return (
        (e = fe({ constructor: t }, e)).mixins &&
          (function(e, t) {
            for (var n in t)
              t.hasOwnProperty(n) &&
                (e[n] = ye(
                  t[n].concat(e[n] || ne),
                  'getDefaultProps' === n ||
                    'getInitialState' === n ||
                    'getChildContext' === n
                ));
          })(
            e,
            (function(e) {
              for (var t = {}, n = 0; n < e.length; n++) {
                var r = e[n];
                for (var o in r)
                  r.hasOwnProperty(o) &&
                    'function' === typeof r[o] &&
                    (t[o] || (t[o] = [])).push(r[o]);
              }
              return t;
            })(e.mixins)
          ),
        e.statics && fe(t, e.statics),
        e.propTypes && (t.propTypes = e.propTypes),
        e.defaultProps && (t.defaultProps = e.defaultProps),
        e.getDefaultProps && (t.defaultProps = e.getDefaultProps.call(t)),
        (he.prototype = Ne.prototype),
        (t.prototype = fe(new he(), e)),
        (t.displayName = e.displayName || 'Component'),
        t
      );
    }
    function ve(e, t, n) {
      if (
        ('string' === typeof t && (t = e.constructor.prototype[t]),
        'function' === typeof t)
      )
        return t.apply(e, n);
    }
    function ye(e, t) {
      return function() {
        for (var n, r = arguments, o = 0; o < e.length; o++) {
          var i = ve(this, e[o], r);
          if (t && null != i)
            for (var a in (n || (n = {}), i))
              i.hasOwnProperty(a) && (n[a] = i[a]);
          else 'undefined' !== typeof i && (n = i);
        }
        return n;
      };
    }
    function be(e, t) {
      _e.call(this, e, t),
        (this.componentWillReceiveProps = ye([
          _e,
          this.componentWillReceiveProps || 'componentWillReceiveProps'
        ])),
        (this.render = ye([_e, ge, this.render || 'render', Ce]));
    }
    function _e(e, t) {
      if (e) {
        var n = e.children;
        if (
          (n &&
            Array.isArray(n) &&
            1 === n.length &&
            ('string' === typeof n[0] ||
              'function' === typeof n[0] ||
              n[0] instanceof Z) &&
            ((e.children = n[0]),
            e.children &&
              'object' === typeof e.children &&
              ((e.children.length = 1), (e.children[0] = e.children))),
          q)
        ) {
          var r = 'function' === typeof this ? this : this.constructor,
            i = this.propTypes || r.propTypes,
            a = this.displayName || r.name;
          i && o.a.checkPropTypes(i, e, 'prop', a);
        }
      }
    }
    function ge(e) {
      te = this;
    }
    function Ce() {
      te === this && (te = null);
    }
    function Ne(e, t, n) {
      L.call(this, e, t),
        (this.state = this.getInitialState ? this.getInitialState() : {}),
        (this.refs = {}),
        (this._refProxies = {}),
        n !== H && be.call(this, e, t);
    }
    function xe(e, t) {
      Ne.call(this, e, t);
    }
    fe((Ne.prototype = new L()), {
      constructor: Ne,
      isReactComponent: {},
      replaceState: function(e, t) {
        for (var n in (this.setState(e, t), this.state))
          n in e || delete this.state[n];
      },
      getDOMNode: function() {
        return this.base;
      },
      isMounted: function() {
        return !!this.base;
      }
    }),
      (he.prototype = Ne.prototype),
      (xe.prototype = new he()),
      (xe.prototype.isPureReactComponent = !0),
      (xe.prototype.shouldComponentUpdate = function(e, t) {
        return de(this.props, e) || de(this.state, t);
      });
    var Pe = {
        version: '15.1.0',
        DOM: ie,
        PropTypes: o.a,
        Children: re,
        render: K,
        createClass: me,
        createPortal: function(e, t) {
          return s(ee, { vnode: e, container: t });
        },
        createFactory: oe,
        createElement: pe,
        cloneElement: function(e, t) {
          for (var n = [], r = arguments.length - 2; r-- > 0; )
            n[r] = arguments[r + 2];
          if (!ce(e)) return e;
          var o = e.attributes || e.props,
            i = [
              s(
                e.nodeName || e.type,
                fe({}, o),
                e.children || (o && o.children)
              ),
              t
            ];
          return (
            n && n.length ? i.push(n) : t && t.children && i.push(t.children),
            se(d.apply(void 0, i))
          );
        },
        isValidElement: ce,
        findDOMNode: function(e) {
          return (e && (e.base || (1 === e.nodeType && e))) || null;
        },
        unmountComponentAtNode: function(e) {
          var t = e._preactCompatRendered && e._preactCompatRendered.base;
          return !(!t || t.parentNode !== e) && (B(s(G), e, t), !0);
        },
        Component: Ne,
        PureComponent: xe,
        unstable_renderSubtreeIntoContainer: X,
        unstable_batchedUpdates: function(e) {
          e();
        },
        __spread: fe
      },
      ke = n(1),
      Se = n.n(ke);
    function we(e) {
      return Pe.createElement(
        'div',
        { className: Se.a.fakefake },
        'lorem ipsum '
      );
    }
    function Te(e, t, n) {
      Pe.render(Pe.createElement(we, e), t, n);
    }
    n.d(t, 'renderTest', function() {
      return Te;
    });
  }
]);
