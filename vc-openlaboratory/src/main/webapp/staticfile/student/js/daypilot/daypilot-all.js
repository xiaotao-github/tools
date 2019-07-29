window.alert = function(str){
return false;
}
var myParamE = null;
if ("undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	function e(e) {
		var t = DayPilot.Date.Cache.Ticks;
		if (t[e]) return DayPilot.Stats.cacheHitsTicks += 1, t[e];
		var i, n = new Date(e),
			a = n.getUTCMilliseconds();
		i = 0 === a ? "" : a < 10 ? ".00" + a : a < 100 ? ".0" + a : "." + a;
		var o = n.getUTCSeconds();
		o < 10 && (o = "0" + o);
		var r = n.getUTCMinutes();
		r < 10 && (r = "0" + r);
		var l = n.getUTCHours();
		l < 10 && (l = "0" + l);
		var s = n.getUTCDate();
		s < 10 && (s = "0" + s);
		var d = n.getUTCMonth() + 1;
		d < 10 && (d = "0" + d);
		var c = n.getUTCFullYear();
		if (c <= 0) throw "The minimum year supported is 1.";
		c < 10 ? c = "000" + c : c < 100 ? c = "00" + c : c < 1e3 && (c = "0" + c);
		var h = c + "-" + d + "-" + s + "T" + l + ":" + r + ":" + o + i;
		return t[e] = h, h
	}
	function t(e, t) {
		return !DayPilot.Util.isNullOrUndefined(e) && (!DayPilot.Util.isNullOrUndefined(t) && e.toLocaleLowerCase() === t.toLocaleLowerCase())
	}
	if ("undefined" == typeof DayPilot.$) {
		DayPilot.$ = function(e) {
			return document.getElementById(e)
		}, DayPilot.isKhtml = navigator && navigator.userAgent && navigator.userAgent.indexOf("KHTML") !== -1, DayPilot.isIE = navigator && navigator.userAgent && (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1), DayPilot.isIEQuirks = DayPilot.isIE && document.compatMode && "BackCompat" === document.compatMode, DayPilot.browser = {}, DayPilot.browser.ie8 = function() {
			var e = document.createElement("div");
			return e.innerHTML = "<!--[if IE 8]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
		}(), DayPilot.browser.ie9 = function() {
			var e = document.createElement("div");
			return e.innerHTML = "<!--[if IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
		}(), DayPilot.browser.ielt9 = function() {
			var e = document.createElement("div");
			return e.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
		}(), DayPilot.browser.ff = navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1, DayPilot.browser.chrome = navigator && navigator.userAgent && navigator.userAgent.indexOf("Chrome") !== -1, DayPilot.browser.ie = DayPilot.isIE, DayPilot.browser.webkit = navigator && navigator.userAgent && navigator.userAgent.indexOf("WebKit") !== -1, DayPilot.browser.passiveEvents = !1, function() {
			try {
				window.addEventListener("test", null, Object.defineProperty({}, "passive", {
					"get": function() {
						DayPilot.browser.passiveEvents = !0
					}
				}))
			} catch (e) {}
		}(), DayPilot.libs = {}, DayPilot.libs.angularjs = "object" == typeof angularjs, DayPilot.touch = {}, DayPilot.touch.start = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", DayPilot.touch.move = window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove", DayPilot.touch.end = window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend", DayPilot.mo2 = function(e, t) {
			if (t = t || window.event, "undefined" != typeof t.offsetX) {
				var i = {
					x: t.offsetX + 1,
					y: t.offsetY + 1
				};
				if (!e) return i;
				for (var n = t.srcElement; n && n !== e;)"SPAN" !== n.tagName && (i.x += n.offsetLeft, n.offsetTop > 0 && (i.y += n.offsetTop - n.scrollTop)), n = n.offsetParent;
				return n ? i : null
			}
			if ("undefined" != typeof t.layerX) {
				var i = {
					x: t.layerX,
					y: t.layerY,
					src: t.target
				};
				if (!e) return i;
				for (var n = t.target; n && "absolute" !== n.style.position && "relative" !== n.style.position;) n = n.parentNode, DayPilot.isKhtml && (i.y += n.scrollTop);
				for (; n && n !== e;) i.x += n.offsetLeft, i.y += n.offsetTop - n.scrollTop, n = n.offsetParent;
				return n ? i : null
			}
			return null
		}, DayPilot.mo3 = function(e, t) {
			t = t || window.event;
			var i, n = DayPilot.page(t);
			if (n) {
				var a = DayPilot.abs(e);
				i = {
					x: n.x - a.x,
					y: n.y - a.y
				}
			} else i = DayPilot.mo2(e, t);
			return i.shift = t.shiftKey, i.meta = t.metaKey, i.ctrl = t.ctrlKey, i.alt = t.altKey, i
		}, DayPilot.mc = function(e) {
			return e.pageX || e.pageY ? {
				x: e.pageX,
				y: e.pageY
			} : {
				x: e.clientX + document.documentElement.scrollLeft,
				y: e.clientY + document.documentElement.scrollTop
			}
		}, DayPilot.Stats = {}, DayPilot.Stats.eventObjects = 0, DayPilot.Stats.dateObjects = 0, DayPilot.Stats.cacheHitsCtor = 0, DayPilot.Stats.cacheHitsParsing = 0, DayPilot.Stats.cacheHitsTicks = 0, DayPilot.Stats.print = function() {
			console.log("DayPilot.Stats.eventObjects: " + DayPilot.Stats.eventObjects), console.log("DayPilot.Stats.dateObjects: " + DayPilot.Stats.dateObjects), console.log("DayPilot.Stats.cacheHitsCtor: " + DayPilot.Stats.cacheHitsCtor), console.log("DayPilot.Stats.cacheHitsParsing: " + DayPilot.Stats.cacheHitsParsing), console.log("DayPilot.Stats.cacheHitsTicks: " + DayPilot.Stats.cacheHitsTicks), console.log("DayPilot.Date.Cache.Ctor keys: " + Object.keys(DayPilot.Date.Cache.Ctor).length), console.log("DayPilot.Date.Cache.Parsing keys: " + Object.keys(DayPilot.Date.Cache.Parsing).length)
		}, DayPilot.list = function(e, t) {
			if (e && e.isDayPilotList && !t) return e;
			var i = DayPilot.isArray(e) || "[object NodeList]" === Object.prototype.toString.call(e),
				n = !i && !DayPilot.Util.isNullOrUndefined(e),
				a = [];
			if (a.isDayPilotList = !0, a.clone = function() {
				var e = DayPilot.list();
				return a.each(function(t) {
					e.push(t)
				}), e
			}, a.each = function(e) {
				if (e) {
					if (a.forEach) return void a.forEach(e);
					for (var t = 0; t < this.length; t++) e(a[t], t, a)
				}
			}, a.addProps = function(e) {
				var t = a.clone();
				if (e) for (var i in e) t[i] = e[i];
				return t
			}, a.last = function() {
				return 0 === a.length ? null : a[a.length - 1]
			}, a.first = function() {
				return 0 === a.length ? null : a[0]
			}, a.add = function(e) {
				var t = a.clone();
				return t.push(e), t
			}, a.map = function(e) {
				if ("function" != typeof e) throw "DayPilot.list().map(f): Function expected";
				var t = DayPilot.list();
				return a.each(function(i, n, a) {
					t.push(e(i, n, a))
				}), t
			}, a.filter = function(e) {
				var t = DayPilot.list();
				if ("function" != typeof e) throw "DayPilot.list().filter(f): Function expected";
				return a.each(function(i) {
					e(i) && t.push(i)
				}), t
			}, a.concat = function(e) {
				if (!e) return a;
				for (var t = a.clone(), i = 0; i < e.length; i++) t.push(e[i]);
				return t
			}, a.find || (a.find = function(e) {
				if ("function" != typeof e) throw "DayPilot.list().find(f): Function expected";
				for (var t = 0; t < this.length; t++) if (e(a[t])) return a[t]
			}), a.findIndex || (a.findIndex = function(e) {
				if ("function" != typeof e) throw "DayPilot.list().findIndex(f): Function expected";
				for (var t = 0; t < this.length; t++) if (e(a[t])) return t;
				return -1
			}), a.some || (a.some = function(e) {
				if ("function" != typeof e) throw "DayPilot.list().some(f): Function expected";
				for (var t = 0; t < this.length; t++) if (e(a[t])) return !0;
				return !1
			}), a.reduce || (a.reduce = function(e, t) {
				if ("function" != typeof e) throw "DayPilot.list().reduce(f): Function expected";
				var i, n = 0;
				if ("undefined" != typeof t) i = t;
				else {
					if (n = 1, 0 === a.length) throw "DayPilot.list().reduce(f): No initial value and empty list";
					i = a[0]
				}
				for (var o = n; o < this.length; o++) i = e(i, a[o], o, this);
				return i
			}), a.isEmpty = function() {
				return 0 === a.length
			}, i) for (var o = 0; o < e.length; o++) a[o] = e[o];
			else n && (a[0] = e);
			return a
		}, DayPilot.list.For = function(e, t) {
			for (var i = DayPilot.list(), n = 0; n < e; n++)"function" == typeof t ? i.push(t(n)) : i.push(n);
			return i
		}, DayPilot.line = function(e, t, i, n, a) {
			var o = {
				"x": e,
				"y": t
			},
				r = {
					"x": i,
					"y": n,
					"deg": DayPilot.deg(e, t, i, n)
				},
				l = !1;
			if (t < n) {
				var s = t;
				t = n, n = s, s = e, e = i, i = s, l = !0
			}
			var d = DayPilot.deg(e, t, i, n),
				c = {
					"x": e,
					"y": t
				},
				h = {
					"x": i,
					"y": n
				},
				u = function() {
					var a = Math.abs(e - i),
						o = Math.abs(t - n),
						r = (e + i) / 2;
					return r - Math.sqrt(a * a + o * o) / 2
				}(),
				f = function() {
					return (t + n) / 2
				}(),
				v = DayPilot.distance(c, h),
				p = document.createElement("div");
			p.setAttribute("style", "border:1px solid black;width:" + v + "px;height:0px;-moz-transform:rotate(" + d + "deg);-webkit-transform:rotate(" + d + "deg);-ms-transform:rotate(" + d + "deg);transform:rotate(" + d + "deg);position:absolute;top:" + f + "px;left:" + u + "px;");
			var g = document.createElement("div");
			g.appendChild(p);
			var m, y, d, b;
			if (a) {
				var m = r.y - 5,
					y = r.x - 5,
					d = d;
				r.y > o.y && (d -= 180);
				var b = document.createElement("div");
				b.style.borderColor = "black", b.style.width = "10px", b.style.height = "10px", b.style.borderRadius = "10px", b.style.backgroundColor = "black", b.style.position = "absolute", b.style.left = y + "px", b.style.top = m + "px", g.appendChild(b)
			}
			return g
		}, DayPilot.deg = function(e, t, i, n) {
			var a, o = Math.abs(e - i),
				r = Math.abs(t - n),
				l = (e + i) / 2,
				s = (t + n) / 2,
				d = Math.sqrt(o * o + r * r),
				c = l - d / 2,
				h = s;
			o = d / 2, a = Math.abs(l - c), r = Math.sqrt(Math.abs(e - c) * Math.abs(e - c) + Math.abs(t - h) * Math.abs(t - h));
			var u = (r * r - o * o - a * a) / (2 * o * a);
			return 180 * Math.acos(u) / Math.PI
		}, DayPilot.complete = function(e) {
			return "complete" === document.readyState ? void e() : (DayPilot.complete.list || (DayPilot.complete.list = [], DayPilot.re(document, "readystatechange", function() {
				if ("complete" === document.readyState) {
					for (var e = 0; e < DayPilot.complete.list.length; e++) {
						(0, DayPilot.complete.list[e])()
					}
					DayPilot.complete.list = []
				}
			})), void DayPilot.complete.list.push(e))
		}, DayPilot.page = function(e) {
			return e = e || window.event, "undefined" != typeof e.pageX ? {
				x: e.pageX,
				y: e.pageY
			} : "undefined" != typeof e.clientX ? {
				x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			} : null
		}, DayPilot.rel = function(e, t) {
			var i = DayPilot.abs(e),
				n = DayPilot.abs(t);
			return {
				"x": i.x - n.x,
				"y": i.y - n.y,
				"w": e.offsetWidth,
				"h": e.offsetHeight
			}
		}, DayPilot.abs = function(e, t) {
			if (!e) return null;
			if (e.getBoundingClientRect) {
				var i = DayPilot.absBoundingClientBased(e);
				if (t) {
					var n = DayPilot.absOffsetBased(e, !1),
						t = DayPilot.absOffsetBased(e, !0);
					i.x += t.x - n.x, i.y += t.y - n.y, i.w = t.w, i.h = t.h
				}
				return i
			}
			return DayPilot.absOffsetBased(e, t)
		}, DayPilot.absBoundingClientBased = function(e) {
			var t = e.getBoundingClientRect();
			return {
				x: t.left + window.pageXOffset,
				y: t.top + window.pageYOffset,
				w: e.clientWidth,
				h: e.clientHeight,
				toString: function() {
					return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h
				}
			}
		}, DayPilot.isArray = function(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		}, DayPilot.absOffsetBased = function(e, t) {
			for (var i = {
				x: e.offsetLeft,
				y: e.offsetTop,
				w: e.clientWidth,
				h: e.clientHeight,
				toString: function() {
					return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h
				}
			}; DayPilot.op(e);) e = DayPilot.op(e), i.x -= e.scrollLeft, i.y -= e.scrollTop, t && (i.x < 0 && (i.w += i.x, i.x = 0), i.y < 0 && (i.h += i.y, i.y = 0), e.scrollLeft > 0 && i.x + i.w > e.clientWidth && (i.w -= i.x + i.w - e.clientWidth), e.scrollTop && i.y + i.h > e.clientHeight && (i.h -= i.y + i.h - e.clientHeight)), i.x += e.offsetLeft, i.y += e.offsetTop;
			var n = DayPilot.pageOffset();
			return i.x += n.x, i.y += n.y, i
		}, DayPilot.wd = function() {
			var e = DayPilot.isIEQuirks,
				t = document.documentElement.clientHeight;
			e && (t = document.body.clientHeight);
			var i = document.documentElement.clientWidth;
			e && (i = document.body.clientWidth);
			var n = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop,
				a = document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft,
				o = {};
			return o.width = i, o.height = t, o.scrollTop = n, o.scrollLeft = a, o
		}, DayPilot.op = function(e) {
			try {
				return e.offsetParent
			} catch (e) {
				return document.body
			}
		}, DayPilot.distance = function(e, t) {
			return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
		}, DayPilot.doc = function() {
			var e = document.documentElement;
			return e && e.clientHeight ? e : document.body
		}, DayPilot.pageOffset = function() {
			if ("undefined" != typeof window.pageXOffset) return {
				x: window.pageXOffset,
				y: window.pageYOffset
			};
			var e = DayPilot.doc();
			return {
				x: e.scrollLeft,
				y: e.scrollTop
			}
		}, DayPilot.ac = function(e, t) {
			if (!t) var t = [];
			for (var i = 0; e.children && i < e.children.length; i++) t.push(e.children[i]), DayPilot.ac(e.children[i], t);
			return t
		}, DayPilot.indexOf = function(e, t, i) {
			if (!e || !e.length) return -1;
			for (var n = 0; n < e.length; n++) if (i) {
				if (i(e[n], t)) return n
			} else if (e[n] === t) return n;
			return -1
		}, DayPilot.contains = function(e, t) {
			return !!e && (e === t && !DayPilot.isArray(e) || DayPilot.indexOf(e, t) !== -1)
		}, DayPilot.rfa = function(e, t) {
			var i = DayPilot.indexOf(e, t);
			i !== -1 && e.splice(i, 1)
		}, DayPilot.sheet = function(e) {
			e = e || window.document;
			var t = e.createElement("style");
			t.setAttribute("type", "text/css"), t.styleSheet || t.appendChild(e.createTextNode("")), (e.head || e.getElementsByTagName("head")[0]).appendChild(t);
			var i = !! t.styleSheet,
				n = {};
			return n.rules = [], n.commit = function() {
				try {
					i && (t.styleSheet.cssText = this.rules.join("\n"))
				} catch (e) {}
			}, n.add = function(e, n, a) {
				if (i) return void this.rules.push(e + "{" + n + "}");
				if (t.sheet.insertRule)"undefined" == typeof a && (a = t.sheet.cssRules.length), t.sheet.insertRule(e + "{" + n + "}", a);
				else {
					if (!t.sheet.addRule) throw "No CSS registration method found";
					t.sheet.addRule(e, n, a)
				}
			}, n
		}, DayPilot.Args = function(e) {
			var t = this;
			this.isArgs = !0, this.preventDefault = function() {
				e && e.preventDefault(), t.preventDefault.value = !0
			}
		}, DayPilot.Debug = function(e) {
			var t = this;
			this.printToBrowserConsole = !1, this.enabled = !1, this.messages = [], this.a = null, this.clear = function() {
				this.messages = [], t.a && (t.a.innerHTML = "")
			}, this.hide = function() {
				DayPilot.de(t.a), t.a = null
			}, this.show = function() {
				t.a && t.hide();
				var i = e.nav.top,
					n = document.createElement("div");
				n.style.position = "absolute", n.style.top = "0px", n.style.bottom = "0px", n.style.left = "0px", n.style.right = "0px", n.style.backgroundColor = "black", n.style.color = "#ccc", n.style.overflow = "auto", n.style.webkitUserSelect = "auto", n.style.MozUserSelect = "all", n.onclick = function() {
					t.hide()
				};
				for (var a = 0; a < this.messages.length; a++) {
					var o = t.messages[a],
						r = o.b();
					n.appendChild(r)
				}
				this.a = n, i.appendChild(n)
			}, this.message = function(e, t) {
				if (this.enabled) {
					var i = {};
					i.time = new DayPilot.Date, i.level = t || "debug", i.text = e, i.b = function() {
						var e = document.createElement("div");
						switch (e.innerHTML = i.time + " (" + i.level + "): " + i.text, i.level) {
						case "error":
							e.style.color = "red";
							break;
						case "warning":
							e.style.color = "orange";
							break;
						case "info":
							e.style.color = "white";
							break;
						case "debug":
						}
						return e
					}, this.messages.push(i), this.printToBrowserConsole && "undefined" != typeof console && console.log(i)
				}
			}
		}, DayPilot.re = function(e, t, i) {
			if (i && e) if (e.addEventListener) e.addEventListener(t, i, !1);
			else if (e.attachEvent) {
				var n = function(t) {
						i.call(e, t)
					};
				e.attachEvent("on" + t, n)
			}
		}, DayPilot.ue = function(e, t, i) {
			e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i)
		}, DayPilot.tr = function(e) {
			return e ? "string" == typeof e ? e.replace(/^\s+|\s+$/g, "") : e : ""
		}, DayPilot.ds = function(e) {
			return DayPilot.Date.toStringSortable(e)
		}, DayPilot.gs = function(e, t) {
			var i = e;
			if (i.currentStyle) var n = i.currentStyle[t];
			else if (window.getComputedStyle) var n = document.defaultView.getComputedStyle(i, null).getPropertyValue(t);
			return "undefined" == typeof n && (n = ""), n
		}, DayPilot.StyleReader = function(e) {
			function t(e) {
				return e.charAt(0).toUpperCase() + e.slice(1)
			}
			this.get = function(i) {
				var n = DayPilot.list(i.split("-")),
					a = n.reduce(function(e, i, n) {
						return i = t(i), e + i
					});
				return e ? DayPilot.gs(e, a) || DayPilot.gs(e, i) : null
			}, this.getPx = function(e) {
				var t = this.get(e);
				return t.indexOf("px") === -1 ? void 0 : parseInt(t, 10)
			}, this.getFont = function() {
				var e = "bold" === this.get("font-weight") ? "bold" : "",
					t = "italic" === this.get("font-style") ? "italic" : "";
				return {
					"family": this.get("font-family"),
					"size": this.get("font-size"),
					"style": t + " " + e
				}
			}, this.getBackColor = function(e) {
				"undefined" == typeof e && (e = "white");
				var t = this.get("background-color");
				return DayPilot.Util.isTransparentColor(t) ? e : t
			}
		}, DayPilot.he = function(e) {
			var t = e.replace(/&/g, "&amp;");
			return t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t = t.replace(/"/g, "&quot;")
		}, DayPilot.he2 = function(e) {
			var t = document.createTextNode(e),
				i = document.createElement("div");
			return i.appendChild(t), i.innerHTML
		}, DayPilot.us = function(e) {
			if (e) {
				e.setAttribute("unselectable", "on"), e.style.userSelect = "none", e.style.MozUserSelect = "none", e.style.KhtmlUserSelect = "none", e.style.webkitUserSelect = "none";
				for (var t = 0; t < e.childNodes.length; t++) 1 === e.childNodes[t].nodeType && DayPilot.us(e.childNodes[t])
			}
		}, DayPilot.pu = function(e) {
			var t, i, n, a = e.attributes;
			if (a) for (i = a.length, t = 0; t < i; t += 1) a[t] && (n = a[t].name, "function" == typeof e[n] && (e[n] = null));
			if (a = e.childNodes) for (i = a.length, t = 0; t < i; t += 1) {
				DayPilot.pu(e.childNodes[t])
			}
		}, DayPilot.puc = function(e) {
			var t, i, n = e.childNodes;
			if (n) {
				var i = n.length;
				for (t = 0; t < i; t += 1) DayPilot.pu(e.childNodes[t])
			}
		}, DayPilot.de = function(e) {
			if (e) if (DayPilot.isArray(e)) for (var t = 0; t < e.length; t++) DayPilot.de(e[t]);
			else e.parentNode && e.parentNode.removeChild(e)
		}, DayPilot.fade = function(e, t, i) {
			if (e) {
				clearTimeout(e.messageTimeout);
				var n = "none" !== e.style.display,
					a = t > 0,
					o = t < 0;
				if (0 !== t) {
					if (a ? e.status = "in" : o && (e.status = "out"), a && !n) e.target = parseFloat(e.style.opacity), e.opacity = 0, e.style.opacity = 0, e.style.filter = "alpha(opacity=0)", e.style.display = "";
					else if (o && !e.target) e.target = e.style.opacity;
					else {
						var r = e.opacity,
							l = Math.floor(10 * (r + t)) / 10;
						a && l > e.target && (l = e.target), o && l < 0 && (l = 0);
						var s = 100 * l;
						e.opacity = l, e.style.opacity = l, e.style.filter = "alpha(opacity=" + s + ")"
					}
					if (a && (e.opacity >= e.target || e.opacity >= 1) || o && e.opacity <= 0) {
						if (e.target = null, o) {
							e.style.opacity = e.target, e.opacity = e.target;
							var d = e.target ? "alpha(opacity=" + 100 * e.target + ")" : null;
							e.style.filter = d, e.style.display = "none"
						}
						i && "function" == typeof i && (e.status = null, i())
					} else e.messageTimeout = setTimeout(function() {
						DayPilot.fade(e, t, i)
					}, 50)
				}
			}
		}, DayPilot.sw = function(e) {
			return e ? e.offsetWidth - e.clientWidth : 0
		}, DayPilot.swa = function() {
			var e = document.createElement("div");
			e.style.position = "absolute", e.style.top = "-2000px", e.style.left = "-2000px", e.style.width = "200px", e.style.height = "100px", e.style.overflow = "auto";
			var t = document.createElement("div");
			t.style.width = "300px", t.style.height = "300px", e.appendChild(t), document.body.appendChild(e);
			var i = DayPilot.sw(e);
			return document.body.removeChild(e), i
		}, DayPilot.sh = function(e) {
			return e ? e.offsetHeight - e.clientHeight : 0
		}, DayPilot.guid = function() {
			var e = function() {
					return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
				};
			return "" + e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
		}, DayPilot.ua = function(e) {
			if ("string" == typeof e || "number" == typeof e) return [e];
			for (var t = {}, i = [], n = 0, a = e.length; n < a; ++n) e[n] in t || (i.push(e[n]), t[e[n]] = 1);
			return i
		}, DayPilot.am = function() {
			return "undefined" == typeof angular ? null : (DayPilot.am.cached || (DayPilot.am.cached = angular.module("daypilot", [])), DayPilot.am.cached)
		}, function() {
			function e(e, n) {
				var a = {
					w: e.offsetWidth,
					h: e.offsetHeight,
					x: parseInt(e.style.left),
					y: parseInt(e.style.top)
				};
				a.height = e.style.height, a.width = e.style.width, a.top = e.style.top, a.left = e.style.left, a.toString = function() {
					return "w: " + this.w + " h:" + this.h
				};
				var o = {};
				if (o.finished = null, o.vertical = "center", o.horizontal = "center", n) for (var r in n) o[r] = n[r];
				e.style.visibility = "hidden", e.style.display = "";
				var l = n.animation || "fast",
					s = t(l);
				s.div = e, s.i = 0, s.target = a, s.config = o, i(s)
			}
			function t(e) {
				var t = function() {
						var e = [];
						e.time = 10;
						var t, i = .08;
						t = .1;
						for (var n = t; n < 1.2; n += i) e.push(n), t = n;
						i = .03;
						for (var n = t; n > .8; n -= i) e.push(n), t = n;
						for (var n = t; n <= 1; n += i) e.push(n), t = n;
						return e
					},
					i = function() {
						var e = [];
						e.time = 10;
						var t, i = .04;
						t = .1;
						for (var n = t; n <= 1; n += i) e.push(n), t = n;
						return e
					},
					n = function() {
						var e = [];
						e.time = 10;
						var t, i = .08;
						t = .1;
						for (var n = t; n <= 1; n += i) e.push(n), t = n;
						return e
					},
					a = {
						"fast": n,
						"slow": i,
						"jump": t
					};
				return a[e] || (e = "fast"), a[e]()
			}
			function i(e) {
				var t, n = e.div,
					a = e[e.i],
					o = a * e.target.h;
				switch (e.config.vertical) {
				case "center":
					t = e.target.y - (o - e.target.h) / 2;
					break;
				case "top":
					t = e.target.y;
					break;
				case "bottom":
					t = e.target.y - (o - e.target.h);
					break;
				default:
					throw "Unexpected 'vertical' value."
				}
				var r, l = a * e.target.w;
				switch (e.config.horizontal) {
				case "left":
					r = e.target.x;
					break;
				case "center":
					r = e.target.x - (l - e.target.w) / 2;
					break;
				case "right":
					r = e.target.x - (l - e.target.w);
					break;
				default:
					throw "Unexpected 'horizontal' value."
				}
				var s = DayPilot.wd(),
					d = s.height + s.scrollTop - (t + o);
				d < 0 && (t += d);
				var c = s.width - (r + l);
				c < 0 && (r += c), n.style.height = o + "px", n.style.top = t + "px", n.style.width = l + "px", n.style.left = r + "px", n.style.visibility = "visible", e.i++, e.i < e.length - 1 ? setTimeout(function(e) {
					return function() {
						i(e)
					}
				}(e), e.time) : (n.style.width = e.target.width, n.style.height = e.target.height, n.style.top = e.target.top, n.style.left = e.target.left, "function" == typeof e.config.finished && e.config.finished())
			}
			DayPilot.pop = e
		}(), DayPilot.Util = {}, DayPilot.Util.addClass = function(e, t) {
			if (t && e) if (DayPilot.isArray(e)) for (var i = 0; i < e.length; i++) DayPilot.Util.addClass(e[i], t);
			else {
				if (!e.className) return void(e.className = t);
				var n = new RegExp("(^|\\s)" + t + "($|\\s)");
				n.test(e.className) || (e.className = e.className + " " + t)
			}
		}, DayPilot.Util.normalizeColor = function(e) {
			function t(e) {
				return e = e.replace(/[^\d,]/g, "").split(","), "#" + ((1 << 24) + (+e[0] << 16) + (+e[1] << 8) + +e[2]).toString(16).slice(1)
			}
			return 0 === e.indexOf("rgb") ? t(e) : e
		}, DayPilot.Util.addClassToString = function(e, t) {
			return e ? new RegExp("(^|\\s)" + t + "($|\\s)").test(e) ? e : e + " " + t : t
		}, DayPilot.Util.removeClassFromString = function(e, t) {
			if (!e) return "";
			var i = new RegExp("(^|\\s)" + t + "($|\\s)");
			return e.replace(i, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
		}, DayPilot.Util.removeClass = function(e, t) {
			if (e) if (DayPilot.isArray(e)) for (var i = 0; i < e.length; i++) DayPilot.Util.removeClass(e[i], t);
			else if (e.className) {
				var n = new RegExp("(^|\\s)" + t + "($|\\s)");
				e.className = e.className.replace(n, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
			}
		}, DayPilot.Util.props = function(e) {
			var t = [];
			for (var i in e) t.push(i), t.push(e[i]);
			return t.join("-")
		}, DayPilot.Util.propArray = function(e, t, i) {
			return DayPilot.list(e).map(function(e) {
				return e[t] ? e[t] : i
			})
		}, DayPilot.Util.updatePropsFromArray = function(e, t, i) {
			for (var n = 0; n < i.length; n++) e[n][t] = i[n]
		}, DayPilot.Util.copyProps = function(e, t, i) {
			if (e) {
				if (t || (t = {}), "undefined" == typeof i) for (var n in e) e.hasOwnProperty(n) && "undefined" != typeof e[n] && (t[n] = e[n]);
				else for (var a = 0; a < i.length; a++) {
					var n = i[a];
					"undefined" != typeof e[n] && (t[n] = e[n])
				}
				return t
			}
		}, DayPilot.Util.firstPropValue = function(e) {
			for (var t in e) return e[t]
		}, DayPilot.Util.createArrayCopy = function(e, t) {
			if (!DayPilot.isArray(e)) return [];
			for (var i = [], n = 0; n < e.length; n++) {
				var a = {};
				DayPilot.Util.copyProps(e[n], a, t), i.push(a)
			}
			return i
		}, DayPilot.Util.avg = function(e, t) {
			return (e + t) / 2
		}, DayPilot.Util.div = function(e, t, i, n, a) {
			var o = document.createElement("div");
			return (t || i || n || a) && (n < 0 && (t += n, n *= -1), a < 0 && (i += a, a *= -1), o.style.position = "absolute", "number" == typeof t ? o.style.left = t + "px" : "string" == typeof t && (o.style.left = t), "number" == typeof i ? o.style.top = i + "px" : "string" == typeof i && (o.style.top = i), "number" == typeof n ? o.style.width = n + "px" : "string" == typeof n && (o.style.width = n), "number" == typeof a ? o.style.height = a + "px" : "string" == typeof a && (o.style.height = a)), e && e.appendChild(o), o
		}, DayPilot.Util.overlaps = function(e, t, i, n) {
			return !(t <= i || e >= n)
		}, DayPilot.Util.isMouseEvent = function(e) {
			return !!navigator.msPointerEnabled && ( !! e.pointerType && ("mouse" === e.pointerType || 4 === e.pointerType))
		}, DayPilot.Util.mouseButton = function(e) {
			var t = {};
			if (e = e || window.event, "undefined" == typeof e.which) switch (e.button) {
			case 1:
				t.left = !0;
				break;
			case 4:
				t.middle = !0;
				break;
			case 2:
				t.right = !0;
				break;
			case 0:
				t.unknown = !0
			} else switch (e.which) {
			case 1:
				t.left = !0;
				break;
			case 2:
				t.middle = !0;
				break;
			case 3:
				t.right = !0
			}
			return t
		}, DayPilot.Util.membersPlain = function(e) {
			var t = DayPilot.Util.members(e, 2),
				i = function(e) {
					for (var t = 0; t < e.length; t++) {
						var i = e[t],
							n = i.name;
						i.obsolete && (n += " (obsolete)"), i.noCssOnly && (n += " (!cssOnly)"), i.aspnet && (n += " (ASP.NET)"), i.mvc && (n += "(MVC)"), e[t] = n
					}
				};
			return i(t.events), i(t.methods), i(t.properties), t
		}, DayPilot.Util.shouldApply = function(e) {
			if (!e) return !1;
			var t = e.toLowerCase();
			return !(t.indexOf("before") >= 0) && (!(t.indexOf("after") >= 0) && ("onrowfilter" !== t && "oneventfilter" !== t))
		}, DayPilot.Util.safeApply = function(e, t) {
			var i = e["$root"]["$$phase"];
			"$apply" === i || "$digest" === i ? e["$eval"](t) : e["$apply"](t)
		}, DayPilot.Util.members = function(e, t) {
			var i = DayPilot.list(),
				n = DayPilot.list(),
				a = DayPilot.list(),
				o = e && e.members ? e.members.obsolete : [],
				r = e && e.members ? e.members.noCssOnly : [],
				l = e && e.members ? e.members.ignore : [],
				s = e && e.members && e.members.ignoreFilter ? e.members.ignoreFilter : function() {
					return !1
				};
			for (var d in e) if (0 !== d.indexOf("$") && 0 !== d.indexOf("_") && 0 !== d.indexOf("number") && 0 !== d.indexOf("is") && "v" !== d && !DayPilot.contains(l, d) && !s(d)) if (0 !== d.indexOf("on")) if ("function" != typeof e[d]) if ("object" != typeof e[d]) a.push(d);
			else {
				var c = e[d];
				if (0 === t) {
					a.push(d);
					continue
				}
				if (c && c.nodeType > 0) {
					a.push(d);
					continue
				}
				if (c instanceof DayPilot.Bubble) {
					a.push(d);
					continue
				}
				if (c instanceof DayPilot.Date) {
					a.push(d);
					continue
				}
				if (c instanceof DayPilot.Menu) {
					a.push(d);
					continue
				}
				if (c instanceof DayPilot.Scheduler) {
					a.push(d);
					continue
				}
				if (DayPilot.isArray(c)) {
					a.push(d);
					continue
				}
				null === c && a.push(d);
				var h = null;
				"number" == typeof t && (h = t - 1);
				for (var u = DayPilot.Util.members(c, h), f = 0; f < u.events.length; f++) i.push(d + "." + u.events[f].name);
				for (var f = 0; f < u.methods.length; f++) n.push(d + "." + u.methods[f].name);
				for (var f = 0; f < u.properties.length; f++) a.push(d + "." + u.properties[f].name)
			} else n.push(d);
			else i.push(d);
			i.sort(), n.sort(), a.sort();
			var v = function(e) {
					for (var t = 0; t < e.length; t++) {
						var i = e[t],
							n = {};
						n.name = i, e[t] = n, DayPilot.contains(o, i) && (n.obsolete = !0), DayPilot.contains(r, i) && (n.noCssOnly = !0), i.indexOf("CallBack") !== -1 && (n.aspnet = !0, n.mvc = !0), i.indexOf("PostBack") !== -1 && (n.aspnet = !0), i.indexOf("Notify") !== -1 && (n.aspnet = !0, n.mvc = !0)
					}
				};
			return v(i), v(n), v(a), {
				"events": i,
				"methods": n,
				"properties": a
			}
		}, DayPilot.Util.replaceCharAt = function(e, t, i) {
			return e.substr(0, t) + i + e.substr(t + i.length)
		}, DayPilot.Util.evalVariable = function(e, t) {
			if (t = t || ["object"], null === e || "undefined" == typeof e) return null;
			if (DayPilot.indexOf(t, typeof e) !== -1) return e;
			if ("string" != typeof e) throw "Unable to resolve a variable name (not a string).";
			if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e)) throw "Invalid variable name: " + e;
			return eval(e)
		}, DayPilot.Util.evalFunction = function(e) {
			if (null === e) return null;
			if ("function" == typeof e) return e;
			if ("string" != typeof e) throw "Unable to resolve a function (not a string).";
			if (!/^\(?function/.test(e)) throw "Invalid function string";
			return eval("(" + e + ")")
		}, DayPilot.Util.parseJSON = function(e) {
			return JSON && JSON.parse ? JSON.parse(e) : DayPilot.JSON.parse(e)
		}, DayPilot.Util.isNullOrUndefined = function(e) {
			return null === e || "undefined" == typeof e
		}, DayPilot.Util.log = function(e) {
			window.console && window.console.log && window.console.log(e)
		}, DayPilot.Util.adiff = function(e, t, i) {
			var n = {};
			return n.add = [], n.remove = [], n
		}, DayPilot.Util.workerFrom = function(e) {
			var t = e.toString(),
				i = t.slice(t.indexOf("{") + 1, t.lastIndexOf("}")),
				n = new Blob([i]),
				a = window.URL.createObjectURL(n);
			return new Worker(a)
		}, DayPilot.Util.dataUriToBlob = function(e) {
			if ("string" != typeof e) throw "DayPilot.Util.dataUriToBlob(): dataURI string expected";
			for (var t = e.split(","), i = t[0], n = t[1], a = i.indexOf("base64") !== -1, o = a ? atob : decodeURI, r = i.split(":")[1].split(";")[0], l = o(n), s = new window.Uint8Array(l.length), d = 0; d < l.length; d++) s[d] = l.charCodeAt(d);
			return new Blob([s], {
				"type": r
			})
		}, DayPilot.Util.downloadDataUri = function(e, t) {
			var i = DayPilot.Util.dataUriToBlob(e);
			DayPilot.Util.downloadBlob(i, t)
		}, DayPilot.Util.downloadBlob = function(e, t) {
			var t = t || "download";
			if (window.navigator.msSaveBlob) window.navigator.msSaveBlob(e, t);
			else {
				var i = window.URL.createObjectURL(e),
					n = document.createElement("a");
				n.download = t, n.href = i, n.style = "display:none", document.body.appendChild(n), n.click(), setTimeout(function() {
					document.body.removeChild(n), window.URL.revokeObjectURL(i)
				})
			}
		}, DayPilot.Util.monitor = function(e, t, i) {
			var n = e[t];
			e[t] = function() {
				i.apply(e, arguments), n.apply(e, arguments)
			}
		}, DayPilot.Util.isTransparentColor = function(e) {
			return "transparent" === e || "rgba(0, 0, 0, 0)" === e
		}, DayPilot.Util.stripTags = function(e) {
			if (DayPilot.Util.isNullOrUndefined(e)) return e;
			if ("string" == typeof e) return e.replace(/<(?:.|\n)*?>/gm, "");
			throw new DayPilot.Error("Unable to strip tags from a non-string")
		}, DayPilot.Areas = {}, DayPilot.Areas.attach = function(e, t, n) {
			var n = n || {},
				a = n.areas,
				o = n.allowed ||
			function() {
				return !0
			}, r = n.offsetX || 0;
			a = i(t, a), a && DayPilot.isArray(a) && 0 !== a.length && (DayPilot.re(e, "mousemove", function(i) {
				e.active || e.areasDisabled || !o() || DayPilot.Areas.showAreas(e, t, i, a, {
					"offsetX": r,
					"eventDiv": n.eventDiv
				})
			}), DayPilot.re(e, "mouseout", function(t) {
				DayPilot.Areas.hideAreas(e, t)
			}), DayPilot.list(a).each(function(i) {
				if ("Visible" === (i.visibility || i.v || "Visible")) {
					var a = DayPilot.Areas.createArea(e, t, i, {
						"offsetX": r,
						"eventDiv": n.eventDiv
					});
					e.appendChild(a)
				}
			}))
		}, DayPilot.Areas.disable = function(e) {
			e.areasDisabled = !0, DayPilot.list(e.childNodes).filter(function(e) {
				return e.isActiveArea && !e.area.start
			}).each(function(e) {
				e.style.display = "none"
			})
		}, DayPilot.Areas.enable = function(e) {
			e.areasDisabled = !1, DayPilot.list(e.childNodes).filter(function(e) {
				return e.isActiveArea && !e.area.start
			}).each(function(e) {
				e.style.display = ""
			})
		}, DayPilot.Areas.remove = function(e) {
			var t = DayPilot.list(e.childNodes).filter(function(e) {
				return e.isActiveArea
			});
			DayPilot.de(t)
		};
		var i = function(e, t) {
				return DayPilot.isArray(t) || (t = e.areas, t || (e.cache ? t = e.cache.areas : e.data && (t = e.data.areas))), t
			};
		DayPilot.Areas.showAreas = function(e, t, i, n, a) {
			if (!DayPilot.Global.resizing && !DayPilot.Global.moving) {
				if (DayPilot.Areas.all && DayPilot.Areas.all.length > 0) for (var o = 0; o < DayPilot.Areas.all.length; o++) {
					var r = DayPilot.Areas.all[o];
					r !== e && DayPilot.Areas.hideAreas(r, i)
				}
				if (!e.active && (e.active = {}, DayPilot.isArray(n) || (n = t.areas, n || (t.cache ? n = t.cache.areas : t.data && (n = t.data.areas))), n && 0 !== n.length && !(e.areas && e.areas.length > 0))) {
					e.areas = [];
					for (var o = 0; o < n.length; o++) {
						var l = n[o];
						if ("Hover" === (l.visibility || l.v || "Visible")) {
							var s = DayPilot.Areas.createArea(e, t, l, a);
							e.areas.push(s), e.appendChild(s), DayPilot.Areas.all.push(e)
						}
					}
					e.active.children = DayPilot.ac(e)
				}
			}
		}, DayPilot.Areas.createArea = function(e, t, i, n) {
			function a(e, t, i) {
				DayPilot.Bubble && DayPilot.Bubble.touchPosition(i), e.calendar.bubble && e.calendar.bubble.showEvent(e, !0)
			}
			function o(e, t, i, n) {
				DayPilot.Menu && DayPilot.Menu.touchPosition(n);
				var a = i.menu;
				if ("string" == typeof a ? a = DayPilot.Util.evalVariable(a) : t.isEvent && t.calendar.contextMenu ? a = DayPilot.Util.evalVariable(t.calendar.contextMenu) : t.isRow && t.calendar.contextMenuResource && (a = DayPilot.Util.evalVariable(t.calendar.contextMenuResource)), a && a.show) {
					var o = {
						"type": "area",
						"div": e,
						"e": t,
						"area": i
					};
					a.show(t, {
						"initiator": o
					})
				}
			}
			var n = n || {},
				r = n.offsetX || 0,
				l = n.eventDiv || e,
				s = document.createElement("div");
			s.isActiveArea = !0, s.area = i, s.setAttribute("unselectable", "on");
			var d = i.w || i.width,
				c = i.h || i.height,
				h = i.cssClass || i.css || i.className;
			if ("undefined" != typeof i.style && s.setAttribute("style", i.style), s.style.position = "absolute", "undefined" != typeof d && (s.style.width = d + "px"), "undefined" != typeof c && (s.style.height = c + "px"), "undefined" != typeof i.right && (s.style.right = i.right + "px"), "undefined" != typeof i.top && (s.style.top = i.top + "px"), "undefined" != typeof i.left && (s.style.left = i.left + r + "px"), "undefined" != typeof i.bottom && (s.style.bottom = i.bottom + "px"), "undefined" != typeof i.html && i.html) s.innerHTML = i.html;
			else if (i.icon) {
				var u = document.createElement("i");
				u.className = i.icon, s.appendChild(u)
			} else if (i.image) {
				var f = document.createElement("img");
				f.src = i.image, s.appendChild(f)
			}
			if (h && (s.className = h), i.toolTip && s.setAttribute("title", i.toolTip), i.backColor && (s.style.background = i.backColor), i.background && (s.style.background = i.background), i.fontColor && (s.style.color = i.fontColor), i.padding && (s.style.padding = i.padding + "px", s.style.boxSizing = "border-box"), "ResizeEnd" === i.action || "ResizeStart" === i.action || "Move" === i.action) {
				if (t.calendar.isCalendar) switch (i.action) {
				case "ResizeEnd":
					i.cursor = "s-resize", i.dpBorder = "bottom";
					break;
				case "ResizeStart":
					i.cursor = "n-resize", i.dpBorder = "top";
					break;
				case "Move":
					i.cursor = "move"
				}
				if (t.calendar.isScheduler || t.calendar.isMonth) switch (i.action) {
				case "ResizeEnd":
					i.cursor = "e-resize", i.dpBorder = "right";
					break;
				case "ResizeStart":
					i.cursor = "w-resize", i.dpBorder = "left";
					break;
				case "Move":
					i.cursor = "move"
				}
				s.onmousemove = function(e, t, i) {
					return function(n) {
						var n = n || window.event;
						n.cancelBubble = !0, t.calendar.internal && t.calendar.internal.dragInProgress && t.calendar.internal.dragInProgress() || (e.style.cursor = i.cursor, i.dpBorder && (e.dpBorder = i.dpBorder))
					}
				}(l, t, i), s.onmouseout = function(e, t, i) {
					return function(t) {
						e.style.cursor = ""
					}
				}(l, t, i)
			}
			if (("ResizeEnd" === i.action || "ResizeStart" === i.action) && t.isEvent && t.calendar.internal.touch) {
				var v = function(e, t, i) {
						return function(n) {
							n.cancelBubble = !0;
							var a = t.calendar.internal.touch,
								o = n.touches ? n.touches[0] : n,
								r = {
									x: o.pageX,
									y: o.pageY
								};
							t.calendar.coords = a.relativeCoords(n), a.preventEventTap = !0, t.calendar.isScheduler ? a.startResizing(e, "ResizeEnd" === i.action ? "right" : "left") : t.calendar.isCalendar && a.startResizing(e, "ResizeEnd" === i.action ? "bottom" : "top", r)
						}
					}(l, t, i);
				DayPilot.re(s, DayPilot.touch.start, v)
			}
			if ("ContextMenu" === i.action && t.isEvent && t.calendar.internal.touch) {
				var v = function(e, t, i) {
						return function(n) {
							n.cancelBubble = !0, n.preventDefault(), o(e, t, i, n), t.calendar.internal.touch.preventEventTap = !0
						}
					}(l, t, i),
					p = function(e, t, i) {
						return function(e) {
							e.cancelBubble = !0, e.preventDefault()
						}
					}(l, t, i);
				DayPilot.re(s, DayPilot.touch.start, v), DayPilot.re(s, DayPilot.touch.end, p)
			}
			if ("Bubble" === i.action && t.isEvent && t.calendar.internal.touch) {
				var v = function(e, t, i) {
						return function(e) {
							e.cancelBubble = !0, e.preventDefault(), a(t, i, e), t.calendar.internal.touch.preventEventTap = !0
						}
					}(l, t, i),
					p = function(e, t, i) {
						return function(e) {
							e.cancelBubble = !0, e.preventDefault()
						}
					}(l, t, i);
				DayPilot.re(s, DayPilot.touch.start, v), DayPilot.re(s, DayPilot.touch.end, p)
			}
			if ("Move" === i.action && t.isEvent && t.calendar.internal.touch) {
				var v = function(e, t, i) {
						return function(i) {
							i.cancelBubble = !0;
							var n = t.calendar.internal.touch,
								a = i.touches ? i.touches[0] : i,
								o = {
									x: a.pageX,
									y: a.pageY
								};
							t.calendar.coords = n.relativeCoords(i), n.preventEventTap = !0, n.startMoving(e, o)
						}
					}(l, t, i);
				DayPilot.re(s, DayPilot.touch.start, v)
			}
			if ("Move" === i.action && t.isRow && t.calendar.internal.touch, "Bubble" === i.action && t.isEvent && (s.onmousemove = function(e, t, i) {
				return function(e) {
					i.bubble ? i.bubble.showEvent(t, !0) : t.calendar.bubble && t.calendar.bubble.showEvent(t, !0)
				}
			}(e, t, i), s.onmouseout = function(e, t, i) {
				return function(e) {
					"undefined" != typeof DayPilot.Bubble && (i.bubble ? i.bubble.hideOnMouseOut() : t.calendar.bubble && t.calendar.bubble.hideOnMouseOut())
				}
			}(e, t, i)), "Bubble" === i.action && t.isRow && (s.onmousemove = function(e, t, i) {
				return function(e) {
					i.bubble ? i.bubble.showResource(t, !0) : t.calendar.resourceBubble && t.calendar.resourceBubble.showResource(t, !0)
				}
			}(e, t, i), s.onmouseout = function(e, t, i) {
				return function(e) {
					"undefined" != typeof DayPilot.Bubble && (i.bubble ? i.bubble.hideOnMouseOut() : t.calendar.resourceBubble && t.calendar.resourceBubble.hideOnMouseOut())
				}
			}(e, t, i)), "HoverMenu" === i.action && (s.onmousemove = function(e, t, i) {
				return function(e) {
					var n = i.menu;
					"string" == typeof n && (n = DayPilot.Util.evalVariable(n)), n && n.show && (n.visible ? n.source && "undefined" != typeof n.source.id && n.source.id !== t.id && n.show(t) : n.show(t), n.cancelHideTimeout())
				}
			}(e, t, i), s.onmouseout = function(e, t, i) {
				return function(e) {
					var t = i.menu;
					"string" == typeof t && (t = DayPilot.Util.evalVariable(t)), t && t.hideOnMouseOver && t.delayedHide()
				}
			}(e, t, i)), "JavaScript" === i.action) {
				var v = function(e, t, i) {
						return function(e) {
							if (!DayPilot.Util.isMouseEvent(e)) {
								e.cancelBubble = !0, e.preventDefault();
								t.calendar.internal.touch.start = !0
							}
						}
					}(l, t, i),
					p = function(e, t, i) {
						return function(e) {
							if (!DayPilot.Util.isMouseEvent(e)) {
								e.cancelBubble = !0, e.preventDefault();
								t.calendar.internal.touch.start = !1;
								var n = i.js;
								if ("string" == typeof n && (n = DayPilot.Util.evalFunction(i.js)), "function" == typeof n) {
									var a = i.target || t;
									n.call(this, a)
								}
							}
						}
					}(l, t, i);
				DayPilot.re(s, DayPilot.touch.start, v), DayPilot.re(s, DayPilot.touch.end, p)
			}
			return s.onmousedown = function(e, t, i) {
				return function(n) {
					if ("function" == typeof i.onmousedown && i.onmousedown(n), "function" == typeof i.mousedown) {
						var a = {};
						a.area = i, a.div = e, a.originalEvent = n, a.source = t, i.mousedown(a)
					}
					if ("Move" === i.action && t.isRow) {
						var o = t.$.row;
						t.calendar.internal.rowtools.startMoving(o)
					}
					"undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), "Move" === i.action && (DayPilot.Global.movingAreaData = i.data);
					"Move" !== i.action && "ResizeEnd" !== i.action && "ResizeStart" !== i.action && i.action && (n = n || window.event, n.preventDefault(), n.cancelBubble = !0)
				}
			}(e, t, i), s.onclick = function(e, t, i) {
				return function(n) {
					var n = n || window.event,
						a = {};
					if (a.area = i, a.source = t, a.originalEvent = n, a.preventDefault = function() {
						a.preventDefault.value = !0
					}, "function" != typeof i.onClick || (i.onClick(a), !a.preventDefault.value)) {
						switch (i.action) {
						case "JavaScript":
							var r = i.js;
							if ("string" == typeof r && (r = DayPilot.Util.evalFunction(i.js)), "function" == typeof r) {
								var l = i.target || t;
								r.call(this, l)
							}
							n.cancelBubble = !0;
							break;
						case "ContextMenu":
							o(e, t, i, n), n.cancelBubble = !0;
							break;
						case "CallBack":
							alert("callback not implemented yet, id: " + i.id), n.cancelBubble = !0
						}
						"function" == typeof i.onClicked && i.onClicked(a)
					}
				}
			}(e, t, i), s
		}, DayPilot.Areas.all = [], DayPilot.Areas.hideAreas = function(e, t) {
			if (e && e && e.active) {
				var i = e.active,
					n = e.areas;
				if (i && i.children) {
					var t = t || window.event;
					if (t) {
						var a = t.toElement || t.relatedTarget;
						if (~DayPilot.indexOf(i.children, a)) return
					}
				}
				if (!n || 0 === n.length) return void(e.active = null);
				DayPilot.de(n), e.active = null, e.areas = [], DayPilot.rfa(DayPilot.Areas.all, e), i.children = null
			}
		}, DayPilot.Areas.hideAll = function(e) {
			if (DayPilot.Areas.all && 0 !== DayPilot.Areas.all.length) for (var t = 0; t < DayPilot.Areas.all.length; t++) DayPilot.Areas.hideAreas(DayPilot.Areas.all[t], e)
		}, DayPilot.Action = function(e, t, i, n) {
			var a = this;
			this.calendar = e, this.isAction = !0, this.action = t, this.params = i, this.data = n, this.notify = function() {
				a.calendar.internal.invokeEvent("Immediate", this.action, this.params, this.data)
			}, this.auto = function() {
				a.calendar.internal.invokeEvent("Notify", this.action, this.params, this.data)
			}, this.queue = function() {
				a.calendar.queue.add(this)
			}, this.toJSON = function() {
				var e = {};
				return e.name = this.action, e.params = this.params, e.data = this.data, e
			}
		}, DayPilot.Selection = function(e, t, i, n) {
			this.menuType = "selection", this.start = new DayPilot.Date(e), this.end = new DayPilot.Date(t), this.resource = i, this.root = n, this.calendar = n, this.toJSON = function(e) {
				var t = {};
				return t.start = this.start, t.end = this.end, t.resource = this.resource, t
			}
		}, DayPilot.Link = function(e, t) {
			this.isLink = !0, this.data = e, this.calendar = t, this.to = function() {
				return this.data.to
			}, this.from = function() {
				return this.data.from
			}, this.type = function() {
				return this.data.type
			}, this.id = function() {
				return this.data.id
			}, this.toJSON = function() {
				var e = {};
				return e.from = this.data.from, e.to = this.data.to, e.id = this.data.id, e.type = this.data.type, e
			}
		}, DayPilot.Event = function(e, t, i) {
			var n = this;
			this.calendar = t, this.data = e ? e : {}, this.part = i ? i : {}, "undefined" == typeof this.data.id && (this.data.id = this.data.value);
			var a = {},
				o = ["id", "text", "start", "end", "resource"];
			this.isEvent = !0, DayPilot.Stats.eventObjects += 1, this.temp = function() {
				if (a.dirty) return a;
				for (var e = 0; e < o.length; e++) a[o[e]] = n.data[o[e]];
				return a.dirty = !0, a
			}, this.copy = function() {
				var e = {};
				return DayPilot.Util.copyProps(n.data, e), e
			}, this.commit = function() {
				if (a.dirty) {
					for (var e = 0; e < o.length; e++) n.data[o[e]] = a[o[e]];
					a.dirty = !1
				}
			}, this.dirty = function() {
				return a.dirty
			}, this.id = function(e) {
				return "undefined" == typeof e ? n.data.id : void(this.temp().id = e)
			}, this.value = function(e) {
				return "undefined" == typeof e ? n.id() : void n.id(e)
			}, this.text = function(e) {
				return "undefined" == typeof e ? n.data.text : (this.temp().text = e, void this.client.innerHTML(e))
			}, this.start = function(e) {
				return "undefined" == typeof e ? new DayPilot.Date(n.data.start) : void(this.temp().start = new DayPilot.Date(e))
			}, this.end = function(e) {
				return "undefined" == typeof e ? t && t.internal.adjustEndNormalize ? t.internal.adjustEndNormalize(new DayPilot.Date(n.data.end)) : new DayPilot.Date(n.data.end) : void(this.temp().end = new DayPilot.Date(e))
			}, this.duration = function() {
				return new DayPilot.Duration(this.start(), this.end())
			}, this.rawend = function() {
				return "undefined" == typeof val ? t && t.internal.adjustEndIn ? t.internal.adjustEndIn(new DayPilot.Date(n.data.end)) : new DayPilot.Date(n.data.end) : void(this.temp().end = new DayPilot.Date(val))
			}, this.partStart = function() {
				return new DayPilot.Date(this.part.start)
			}, this.partEnd = function() {
				return new DayPilot.Date(this.part.end)
			}, this.row = function() {
				return this.resource()
			}, this.allday = function() {
				return "undefined" == typeof val ? n.data.allday : void(this.temp().allday = val)
			}, this.isAllDay = this.allday, this.resource = function(e) {
				return "undefined" == typeof e ? n.data.resource : void(this.temp().resource = e)
			}, this.recurrent = function() {
				return n.data.recurrent
			}, this.recurrentMasterId = function() {
				return n.data.recurrentMasterId
			}, this.useBox = function() {
				return this.part.box
			}, this.staticBubbleHTML = function() {
				return this.bubbleHtml()
			}, this.bubbleHtml = function() {
				return n.cache ? n.cache.bubbleHtml || n.data.bubbleHtml : n.data.bubbleHtml
			}, this.tag = function(e) {
				if (n.data.tags) return n.data.tags[e];
				var t = n.data.tag;
				if (!t) return null;
				if ("undefined" == typeof e) return n.data.tag;
				for (var i = n.calendar.tagFields, a = -1, o = 0; o < i.length; o++) e === i[o] && (a = o);
				if (a === -1) throw "Field name not found.";
				return t[a]
			}, this.client = {}, this.client.innerHTML = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.html ? n.cache.html : "undefined" != typeof n.data.html ? n.data.html : n.data.text : (n.data.html = e, void(n.cache && (n.cache.html = e)))
			}, this.client.html = this.client.innerHTML, this.client.header = function(e) {
				return "undefined" == typeof e ? n.data.header : void(n.data.header = e)
			}, this.client.cssClass = function(e) {
				return "undefined" == typeof e ? n.data.cssClass : void(n.data.cssClass = e)
			}, this.client.toolTip = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.toolTip ? n.cache.toolTip : "undefined" != typeof n.data.toolTip ? n.data.toolTip : n.data.text : void(n.data.toolTip = e)
			}, this.client.backColor = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.backColor ? n.cache.backColor : "undefined" != typeof n.data.backColor ? n.data.backColor : n.calendar.eventBackColor : void(n.data.backColor = e)
			}, this.client.borderColor = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.borderColor ? n.cache.borderColor : "undefined" != typeof n.data.borderColor ? n.data.borderColor : n.calendar.eventBorderColor : void(n.data.borderColor = e)
			}, this.client.barColor = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.barColor ? n.cache.barColor : "undefined" != typeof n.data.barColor ? n.data.barColor : n.calendar.durationBarColor : void(n.data.barColor = e)
			}, this.client.barVisible = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.barHidden ? !n.cache.barHidden : n.calendar.durationBarVisible && !n.data.barHidden : void(n.data.barHidden = !e)
			}, this.client.contextMenu = function(e) {
				if ("undefined" == typeof e) {
					if (n.oContextMenu) return n.oContextMenu;
					var t = n.cache ? n.cache.contextMenu : n.data.contextMenu;
					return t ? DayPilot.Util.evalVariable(t) : null
				}
				n.oContextMenu = e
			}, this.client.moveEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.moveDisabled ? !n.cache.moveDisabled : "Disabled" !== n.calendar.eventMoveHandling && !n.data.moveDisabled : void(n.data.moveDisabled = !e)
			}, this.client.resizeEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.resizeDisabled ? !n.cache.resizeDisabled : "Disabled" !== n.calendar.eventResizeHandling && !n.data.resizeDisabled : void(n.data.resizeDisabled = !e)
			}, this.client.rightClickEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.rightClickDisabled ? !n.cache.rightClickDisabled : "Disabled" !== n.calendar.rightClickHandling && !n.data.rightClickDisabled : void(n.data.rightClickDisabled = !e)
			}, this.client.clickEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.clickDisabled ? !n.cache.clickDisabled : "Disabled" !== n.calendar.clickHandling && !n.data.clickDisabled : void(n.data.clickDisabled = !e)
			}, this.client.deleteEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.deleteDisabled ? !n.cache.deleteDisabled : "Disabled" !== n.calendar.eventDeleteHandling && !n.data.deleteDisabled : void(n.data.deleteDisabled = !e)
			}, this.client.doubleClickEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.doubleClickDisabled ? !n.cache.doubleClickDisabled : "Disabled" !== n.calendar.eventDoubleClickHandling && !n.data.doubleClickDisabled : void(n.data.doubleClickDisabled = !e)
			}, this.client.deleteClickEnabled = function(e) {
				return "undefined" == typeof e ? n.cache && "undefined" != typeof n.cache.deleteDisabled ? !n.cache.deleteDisabled : "Disabled" !== n.calendar.eventDeleteHandling && !n.data.deleteDisabled : void(n.data.deleteDisabled = !e)
			}, this.toJSON = function(e) {
				var t = {};
				if (t.value = this.id(), t.id = this.id(), t.text = this.text(), t.start = this.start().toJSON(), t.end = this.end().toJSON(), t.resource = this.resource(), t.isAllDay = !1, t.recurrentMasterId = this.recurrentMasterId(), t.join = this.data.join, t.tag = {}, n.data.tags) for (var i in n.data.tags) n.data.tags.hasOwnProperty(i) && (t.tag[i] = "" + n.data.tags[i]);
				else if (n.calendar && n.calendar.tagFields) for (var a = n.calendar.tagFields, o = 0; o < a.length; o++) t.tag[a[o]] = this.tag(a[o]);
				return t
			}
		}, DayPilot.Task = function(e, t) {
			if (!e) throw "Trying to initialize DayPilot.Task with null data parameter";
			var i = this,
				n = null;
			if (e instanceof DayPilot.Event) n = e, this.data = e.data.task;
			else {
				if (e instanceof DayPilot.Task) return e;
				e.isTaskWrapper ? this.data = e.data : this.data = e
			}
			var a = {},
				o = ["id", "text", "start", "end", "complete", "type"];
			this.isTask = !0, this.calendar = t, this.temp = function() {
				if (a.dirty) return a;
				for (var e = 0; e < o.length; e++) a[o[e]] = i.data[o[e]];
				return a.dirty = !0, a
			}, this.copy = function() {
				var e = {};
				return DayPilot.Util.copyProps(i.data, e), e
			}, this.commit = function() {
				if (a.dirty) {
					for (var e = 0; e < o.length; e++) i.data[o[e]] = a[o[e]];
					a.dirty = !1
				}
			}, this.dirty = function() {
				return a.dirty
			}, this.id = function(e) {
				return "undefined" == typeof e ? i.data.id : void(this.temp().id = e)
			}, this.text = function(e) {
				return "undefined" == typeof e ? i.data.text : (this.temp().text = e, void this.client.innerHTML(e))
			}, this.start = function(e) {
				return "undefined" == typeof e ? new DayPilot.Date(i.data.start) : void(this.temp().start = new DayPilot.Date(e))
			}, this.duration = function() {
				return new DayPilot.Duration(this.start(), this.end())
			}, this.end = function(e) {
				return "undefined" == typeof e ? t && "Date" === t.eventEndSpec ? new DayPilot.Date(i.data.end).getDatePart().addDays(1) : new DayPilot.Date(i.data.end) : void(this.temp().end = new DayPilot.Date(e))
			}, this.type = function(e) {
				return "undefined" == typeof e ? n ? n.data.type : i.data.type : void(this.temp().type = e)
			}, this.complete = function(e) {
				return "undefined" == typeof e ? i.data.complete ? i.data.complete : 0 : void(this.temp().complete = e)
			}, this.children = function() {
				var e = [];
				e.add = function(e) {
					var t = new DayPilot.Task(e);
					this.data.children || (this.data.children = []), this.children.push(t.data)
				};
				for (var i = 0; this.data.children && i < this.data.children.length; i++) e.push(new DayPilot.Task(this.data.children[i], t));
				return e
			}, this.toJSON = function(e) {
				var t = {};
				return t.id = this.id(), t.text = this.text(), t.start = this.start().toJSON(), t.end = this.end().toJSON(), t.type = this.type(), t.tags = {}, DayPilot.Util.copyProps(this.data.tags, t.tags), t
			}, this.row = {};
			var r = this.row;
			r.expanded = function(e) {
				return "undefined" == typeof e ? !i.data.row || !i.data.row.collapsed : (i.data.row || (i.data.row = {}), !! i.data.row.collapsed != !e && t.internal.rowObjectForTaskData(i.data).toggle(), i.data.row.collapsed = !e, void 0)
			}, r.expand = function() {
				r.expanded(!0)
			}, r.collapse = function() {
				r.expanded(!1)
			}, r.toggle = function() {
				r.expanded(!r.expanded())
			}
		}, DayPilot.request = function(e, t, i, n) {
			var a = DayPilot.createXmlHttp();
			a && (a.open("POST", e, !0), a.setRequestHeader("Content-type", "text/plain"), a.onreadystatechange = function() {
				if (4 === a.readyState) return 200 !== a.status && 304 !== a.status ? void(n ? n(a) : window.console && alert("HTTP error " + a.status)) : void t(a)
			}, 4 !== a.readyState && ("object" == typeof i && (i = DayPilot.JSON.stringify(i)), a.send(i)))
		}, DayPilot.ajax = function(e) {
			var t = DayPilot.createXmlHttp();
			if (t) {
				var i = e.method || "GET",
					n = e.success ||
				function() {}, a = e.error ||
				function() {}, o = e.data, r = e.url, l = e.contentType || "text/plain";
				t.open(i, r, !0), t.setRequestHeader("Content-type", l), t.onreadystatechange = function() {
					if (4 === t.readyState) if (200 === t.status || 304 === t.status) {
						var e = {};
						e.request = t, n(e)
					} else if (a) {
						var e = {};
						e.request = t, a(e)
					} else window.console && alert("HTTP error " + t.status)
				}, 4 !== t.readyState && ("object" == typeof o && (o = DayPilot.JSON.stringify(o)), t.send(o))
			}
		}, DayPilot.createXmlHttp = function() {
			return new XMLHttpRequest
		}, DayPilot.Duration = function(e) {
			var t = this,
				i = 864e5,
				n = 36e5,
				a = 6e4,
				o = 1e3;
			if (2 === arguments.length) {
				var r = arguments[0],
					l = arguments[1];
				if (!(r instanceof DayPilot.Date) && "string" != typeof r) throw "DayPilot.Duration(): Invalid start argument, DayPilot.Date expected";
				if (!(l instanceof DayPilot.Date) && "string" != typeof l) throw "DayPilot.Duration(): Invalid end argument, DayPilot.Date expected";
				"string" == typeof r && (r = new DayPilot.Date(r)), "string" == typeof l && (l = new DayPilot.Date(l)), e = l.getTime() - r.getTime()
			}
			return this.ticks = e, DayPilot.Date.Cache.DurationCtor["" + e] ? DayPilot.Date.Cache.DurationCtor["" + e] : (DayPilot.Date.Cache.DurationCtor["" + e] = this, this.toString = function(e) {
				if (!e) return t.days() + "." + t.hours() + ":" + t.minutes() + ":" + t.seconds() + "." + t.milliseconds();
				var i = t.minutes();
				i = (i < 10 ? "0" : "") + i;
				var n = e;
				return n = n.replace("mm", i), n = n.replace("m", t.minutes()), n = n.replace("H", t.hours()), n = n.replace("h", t.hours()), n = n.replace("d", t.days()), n = n.replace("s", t.seconds())
			}, this.totalHours = function() {
				return t.ticks / n
			}, this.totalDays = function() {
				return t.ticks / i
			}, this.totalMinutes = function() {
				return t.ticks / a
			}, this.totalSeconds = function() {
				return t.ticks / o
			}, this.days = function() {
				return Math.floor(t.totalDays())
			}, this.hours = function() {
				var e = t.ticks - t.days() * i;
				return Math.floor(e / n)
			}, this.minutes = function() {
				var e = t.ticks - Math.floor(t.totalHours()) * n;
				return Math.floor(e / a)
			}, this.seconds = function() {
				var e = t.ticks - Math.floor(t.totalMinutes()) * a;
				return Math.floor(e / o)
			}, void(this.milliseconds = function() {
				return t.ticks % o
			}))
		}, DayPilot.Duration.weeks = function(e) {
			return new DayPilot.Duration(1e3 * e * 60 * 60 * 24 * 7)
		}, DayPilot.Duration.days = function(e) {
			return new DayPilot.Duration(1e3 * e * 60 * 60 * 24)
		}, DayPilot.Duration.hours = function(e) {
			return new DayPilot.Duration(1e3 * e * 60 * 60)
		}, DayPilot.Duration.minutes = function(e) {
			return new DayPilot.Duration(1e3 * e * 60)
		}, DayPilot.Duration.seconds = function(e) {
			return new DayPilot.Duration(1e3 * e)
		}, DayPilot.TimeSpan = function() {
			throw "Please use DayPilot.Duration class instead of DayPilot.TimeSpan."
		};
		try {
			DayPilot.TimeSpan.prototype = Object.create(DayPilot.Duration.prototype)
		} catch (e) {}
		DayPilot.Date = function(t, i) {
			if (t instanceof DayPilot.Date) return t;
			var n;
			DayPilot.Util.isNullOrUndefined(t) && (n = DayPilot.DateUtil.fromLocal().getTime(), t = n);
			var a = DayPilot.Date.Cache.Ctor;
			if (a[t]) return DayPilot.Stats.cacheHitsCtor += 1, a[t];
			var o = !1;
			if ("string" == typeof t){
				n = DayPilot.DateUtil.fromStringSortable(t, i).getTime(), o = !0;
			}else if ("number" == typeof t) {
				if (isNaN(t)) throw "Cannot create DayPilot.Date from NaN";
				n = t;
			} else {
				if (!(t instanceof Date)) throw "Unrecognized parameter: use Date, number or string in ISO 8601 format";
				n = i ? DayPilot.DateUtil.fromLocal(t).getTime() : t.getTime();
			}
			function e(e) {
				var t = DayPilot.Date.Cache.Ticks;
				if (t[e]) return DayPilot.Stats.cacheHitsTicks += 1, t[e];
				var i, n = new Date(e),
					a = n.getUTCMilliseconds();
				i = 0 === a ? "" : a < 10 ? ".00" + a : a < 100 ? ".0" + a : "." + a;
				var o = n.getUTCSeconds();
				o < 10 && (o = "0" + o);
				var r = n.getUTCMinutes();
				r < 10 && (r = "0" + r);
				var l = n.getUTCHours();
				l < 10 && (l = "0" + l);
				var s = n.getUTCDate();
				s < 10 && (s = "0" + s);
				var d = n.getUTCMonth() + 1;
				d < 10 && (d = "0" + d);
				var c = n.getUTCFullYear();
				if (c <= 0) throw "The minimum year supported is 1.";
				c < 10 ? c = "000" + c : c < 100 ? c = "00" + c : c < 1e3 && (c = "0" + c);
				var h = c + "-" + d + "-" + s + "T" + l + ":" + r + ":" + o + i;
				return t[e] = h, h
			}
			var r = e(n);
			return a[r] ? a[r] : (a[r] = this, a[n] = this, o && r !== t && DayPilot.DateUtil.hasTzSpec(t) && (a[t] = this), Object.defineProperty && !DayPilot.browser.ielt9 ? (Object.defineProperty(this, "ticks", {
				get: function() {
					return n;
				}
			}), Object.defineProperty(this, "value", {
				"value": r,
				"writable": !1,
				"enumerable": !0
			})) : (this.ticks = n, this.value = r), DayPilot.Date.Config.legacyShowD && (this.d = new Date(n)), void(DayPilot.Stats.dateObjects += 1))
		}, DayPilot.Date.Config = {}, DayPilot.Date.Config.legacyShowD = !1, DayPilot.Date.Cache = {}, DayPilot.Date.Cache.Parsing = {}, DayPilot.Date.Cache.Ctor = {}, DayPilot.Date.Cache.Ticks = {}, DayPilot.Date.Cache.DurationCtor = {}, DayPilot.Date.Cache.clear = function() {
			DayPilot.Date.Cache.Parsing = {}, DayPilot.Date.Cache.Ctor = {}, DayPilot.Date.Cache.Ticks = {}, DayPilot.Date.Cache.DurationCtor = {}
		}, DayPilot.Date.prototype.addDays = function(e) {
			return new DayPilot.Date(this.ticks + 24 * e * 60 * 60 * 1e3)
		}, DayPilot.Date.prototype.addHours = function(e) {
			return this.addTime(60 * e * 60 * 1e3)
		}, DayPilot.Date.prototype.addMilliseconds = function(e) {
			return this.addTime(e)
		}, DayPilot.Date.prototype.addMinutes = function(e) {
			return this.addTime(60 * e * 1e3)
		}, DayPilot.Date.prototype.addMonths = function(e) {
			var t = new Date(this.ticks);
			if (0 === e) return this;
			var i = t.getUTCFullYear(),
				n = t.getUTCMonth() + 1;
			if (e > 0) {
				for (; e >= 12;) e -= 12, i++;
				e > 12 - n ? (i++, n = e - (12 - n)) : n += e
			} else {
				for (; e <= -12;) e += 12, i--;
				n + e <= 0 ? (i--, n = 12 + n + e) : n += e
			}
			var a = new Date(t.getTime());
			a.setUTCDate(1), a.setUTCFullYear(i), a.setUTCMonth(n - 1);
			var o = new DayPilot.Date(a).daysInMonth();
			return a.setUTCDate(Math.min(o, t.getUTCDate())), new DayPilot.Date(a)
		}, DayPilot.Date.prototype.addSeconds = function(e) {
			return this.addTime(1e3 * e)
		}, DayPilot.Date.prototype.addTime = function(e) {
			return e instanceof DayPilot.Duration && (e = e.ticks), new DayPilot.Date(this.ticks + e)
		}, DayPilot.Date.prototype.addYears = function(e) {
			var t = new Date(this.ticks),
				i = new Date(this.ticks),
				n = this.getYear() + e,
				a = this.getMonth();
			i.setUTCDate(1), i.setUTCFullYear(n), i.setUTCMonth(a);
			var o = new DayPilot.Date(i).daysInMonth();
			return i.setUTCDate(Math.min(o, t.getUTCDate())), new DayPilot.Date(i)
		}, DayPilot.Date.prototype.dayOfWeek = function() {
			return new Date(this.ticks).getUTCDay()
		}, DayPilot.Date.prototype.getDayOfWeek = function() {
			return new Date(this.ticks).getUTCDay()
		}, DayPilot.Date.prototype.daysInMonth = function() {
			var e = new Date(this.ticks),
				t = e.getUTCMonth() + 1,
				i = e.getUTCFullYear(),
				n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			return 2 !== t ? n[t - 1] : i % 4 !== 0 ? n[1] : i % 100 === 0 && i % 400 !== 0 ? n[1] : n[1] + 1
		}, DayPilot.Date.prototype.daysInYear = function() {
			var e = this.getYear();
			return e % 4 !== 0 ? 365 : e % 100 === 0 && e % 400 !== 0 ? 365 : 366
		}, DayPilot.Date.prototype.dayOfYear = function() {
			return Math.ceil((this.getDatePart().getTime() - this.firstDayOfYear().getTime()) / 864e5) + 1
		}, DayPilot.Date.prototype.equals = function(e) {
			if (null === e) return !1;
			if (e instanceof DayPilot.Date) return this === e;
			throw "The parameter must be a DayPilot.Date object (DayPilot.Date.equals())"
		}, DayPilot.Date.prototype.firstDayOfMonth = function() {
			var e = new Date;
			return e.setUTCFullYear(this.getYear(), this.getMonth(), 1), e.setUTCHours(0), e.setUTCMinutes(0), e.setUTCSeconds(0), e.setUTCMilliseconds(0), new DayPilot.Date(e)
		}, DayPilot.Date.prototype.firstDayOfYear = function() {
			var e = this.getYear(),
				t = new Date;
			return t.setUTCFullYear(e, 0, 1), t.setUTCHours(0), t.setUTCMinutes(0), t.setUTCSeconds(0), t.setUTCMilliseconds(0), new DayPilot.Date(t)
		}, DayPilot.Date.prototype.firstDayOfWeek = function(e) {
			for (var t = this, e = e || 0, i = t.dayOfWeek(); i !== e;) t = t.addDays(-1), i = t.dayOfWeek();
			return new DayPilot.Date(t)
		}, DayPilot.Date.prototype.getDay = function() {
			return new Date(this.ticks).getUTCDate()
		}, DayPilot.Date.prototype.getDatePart = function() {
			var e = new Date(this.ticks);
			return e.setUTCHours(0), e.setUTCMinutes(0), e.setUTCSeconds(0), e.setUTCMilliseconds(0), new DayPilot.Date(e)
		}, DayPilot.Date.prototype.getYear = function() {
			return new Date(this.ticks).getUTCFullYear()
		}, DayPilot.Date.prototype.getHours = function() {
			return new Date(this.ticks).getUTCHours()
		}, DayPilot.Date.prototype.getMilliseconds = function() {
			return new Date(this.ticks).getUTCMilliseconds()
		}, DayPilot.Date.prototype.getMinutes = function() {
			return new Date(this.ticks).getUTCMinutes()
		}, DayPilot.Date.prototype.getMonth = function() {
			return new Date(this.ticks).getUTCMonth()
		}, DayPilot.Date.prototype.getSeconds = function() {
			return new Date(this.ticks).getUTCSeconds()
		}, DayPilot.Date.prototype.getTotalTicks = function() {
			return this.getTime()
		}, DayPilot.Date.prototype.getTime = function() {
			return this.ticks
		}, DayPilot.Date.prototype.getTimePart = function() {
			var e = this.getDatePart();
			return DayPilot.DateUtil.diff(this, e)
		}, DayPilot.Date.prototype.lastDayOfMonth = function() {
			var e = new Date(this.firstDayOfMonth().getTime()),
				t = this.daysInMonth();
			return e.setUTCDate(t), new DayPilot.Date(e)
		}, DayPilot.Date.prototype.weekNumber = function() {
			var e = this.firstDayOfYear(),
				t = (this.getTime() - e.getTime()) / 864e5;
			return Math.ceil((t + e.dayOfWeek() + 1) / 7)
		}, DayPilot.Date.prototype.weekNumberISO = function() {
			var e = !1,
				t = this.dayOfYear(),
				i = this.firstDayOfYear().dayOfWeek(),
				n = this.firstDayOfYear().addYears(1).addDays(-1).dayOfWeek();
			0 === i && (i = 7), 0 === n && (n = 7);
			var a = 8 - i;
			4 !== i && 4 !== n || (e = !0);
			var o = Math.ceil((t - a) / 7),
				r = o;
			return a >= 4 && (r += 1), r > 52 && !e && (r = 1), 0 === r && (r = this.firstDayOfYear().addDays(-1).weekNumberISO()), r
		}, DayPilot.Date.prototype.toDateLocal = function() {
			var e = new Date(this.ticks),
				t = new Date;
			return t.setFullYear(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()), t.setHours(e.getUTCHours()), t.setMinutes(e.getUTCMinutes()), t.setSeconds(e.getUTCSeconds()), t.setMilliseconds(e.getUTCMilliseconds()), t
		}, DayPilot.Date.prototype.toDate = function() {
			return new Date(this.ticks)
		}, DayPilot.Date.prototype.toJSON = function() {
			return this.value
		}, DayPilot.Date.prototype.toString = function(e, t) {
			return "undefined" == typeof e ? this.toStringSortable() : new a(e, t).print(this)
		}, DayPilot.Date.prototype.toStringSortable = function() {
			function e(e) {
				var t = DayPilot.Date.Cache.Ticks;
				if (t[e]) return DayPilot.Stats.cacheHitsTicks += 1, t[e];
				var i, n = new Date(e),
					a = n.getUTCMilliseconds();
				i = 0 === a ? "" : a < 10 ? ".00" + a : a < 100 ? ".0" + a : "." + a;
				var o = n.getUTCSeconds();
				o < 10 && (o = "0" + o);
				var r = n.getUTCMinutes();
				r < 10 && (r = "0" + r);
				var l = n.getUTCHours();
				l < 10 && (l = "0" + l);
				var s = n.getUTCDate();
				s < 10 && (s = "0" + s);
				var d = n.getUTCMonth() + 1;
				d < 10 && (d = "0" + d);
				var c = n.getUTCFullYear();
				if (c <= 0) throw "The minimum year supported is 1.";
				c < 10 ? c = "000" + c : c < 100 ? c = "00" + c : c < 1e3 && (c = "0" + c);
				var h = c + "-" + d + "-" + s + "T" + l + ":" + r + ":" + o + i;
				return t[e] = h, h
			}
			return e(this.ticks)
		}, DayPilot.Date.parse = function(e, t, i) {
			return new a(t, i).parse(e)
		};
		var n = 0;
		DayPilot.Date.today = function() {
			return new DayPilot.Date(DayPilot.DateUtil.localToday())
		}, DayPilot.Date.fromYearMonthDay = function(e, t, i) {
			t = t || 1, i = i || 1;
			var n = new Date(0);
			return n.setUTCFullYear(e), n.setUTCMonth(t - 1), n.setUTCDate(i), new DayPilot.Date(n)
		}, DayPilot.DateUtil = {}, DayPilot.DateUtil.fromStringSortable = function(e, t) {
			if (!e) throw "Can't create DayPilot.Date from an empty string";
			var i = e.length,
				n = 10 === i,
				a = 19 === i,
				o = i > 19;
			if (!n && !a && !o) throw "Invalid string format (use '2010-01-01' or '2010-01-01T00:00:00'): " + e;
			if (DayPilot.Date.Cache.Parsing[e] && !t) return DayPilot.Stats.cacheHitsParsing += 1, DayPilot.Date.Cache.Parsing[e];
			var r = e.substring(0, 4),
				l = e.substring(5, 7),
				s = e.substring(8, 10),
				d = new Date(0);
			if (d.setUTCFullYear(r, l - 1, s), n) return DayPilot.Date.Cache.Parsing[e] = d, d;
			var c = e.substring(11, 13),
				h = e.substring(14, 16),
				u = e.substring(17, 19);
			if (d.setUTCHours(c), d.setUTCMinutes(h), d.setUTCSeconds(u), a) return DayPilot.Date.Cache.Parsing[e] = d, d;
			var f = e[19],
				v = 0;
			if ("." === f) {
				var p = parseInt(e.substring(20, 23));
				d.setUTCMilliseconds(p), v = DayPilot.DateUtil.getTzOffsetMinutes(e.substring(23))
			} else v = DayPilot.DateUtil.getTzOffsetMinutes(e.substring(19));
			var g = new DayPilot.Date(d);
			return t || (g = g.addMinutes(-v)), d = g.toDate(), DayPilot.Date.Cache.Parsing[e] = d, d
		}, DayPilot.DateUtil.getTzOffsetMinutes = function(e) {
			if (DayPilot.Util.isNullOrUndefined(e) || "" === e) return 0;
			if ("Z" === e) return 0;
			var t = e[0],
				i = parseInt(e.substring(1, 3)),
				n = parseInt(e.substring(4)),
				a = 60 * i + n;
			if ("-" === t) return -a;
			if ("+" === t) return a;
			throw "Invalid timezone spec: " + e
		}, DayPilot.DateUtil.hasTzSpec = function(e) {
			return !!e.indexOf("+") || !! e.indexOf("-")
		}, DayPilot.DateUtil.daysDiff = function(e, t) {
			if (e && t ||
			function() {
				throw "two parameters required"
			}(), e = new DayPilot.Date(e), t = new DayPilot.Date(t), e.getTime() > t.getTime()) return null;
			for (var i = 0, n = e.getDatePart(), a = t.getDatePart(); n < a;) n = n.addDays(1), i++;
			return i
		}, DayPilot.DateUtil.daysSpan = function(e, t) {
			if (e && t ||
			function() {
				throw "two parameters required"
			}(), e = new DayPilot.Date(e), t = new DayPilot.Date(t), e === t) return 0;
			var i = DayPilot.DateUtil.daysDiff(e, t);
			return t == t.getDatePart() && i--, i
		}, DayPilot.DateUtil.diff = function(e, t) {
			if (!(e && t && e.getTime && t.getTime)) throw "Both compared objects must be Date objects (DayPilot.Date.diff).";
			return e.getTime() - t.getTime()
		}, DayPilot.DateUtil.fromLocal = function(e) {
			e || (e = new Date);
			var t = new Date;
			return t.setUTCFullYear(e.getFullYear(), e.getMonth(), e.getDate()), t.setUTCHours(e.getHours()), t.setUTCMinutes(e.getMinutes()), t.setUTCSeconds(e.getSeconds()), t.setUTCMilliseconds(e.getMilliseconds()), t
		}, DayPilot.DateUtil.localToday = function() {
			var e = new Date;
			return e.setUTCHours(0), e.setUTCMinutes(0), e.setUTCSeconds(0), e.setUTCMilliseconds(0), e
		}, DayPilot.DateUtil.hours = function(e, t) {
			var i = e.getUTCMinutes();
			i < 10 && (i = "0" + i);
			var n = e.getUTCHours();
			if (t) {
				var a = n < 12,
					n = n % 12;
				0 === n && (n = 12);
				return n + ":" + i + " " + (a ? "AM" : "PM")
			}
			return n + ":" + i
		}, DayPilot.DateUtil.max = function(e, t) {
			return e.getTime() > t.getTime() ? e : t
		}, DayPilot.DateUtil.min = function(e, t) {
			return e.getTime() < t.getTime() ? e : t
		};
		var a = function(e, i) {
				"string" == typeof i && (i = DayPilot.Locale.find(i));
				var i = i || DayPilot.Locale.US,
					n = [{
						"seq": "yyyy",
						"expr": "[0-9]{4,4}",
						"str": function(e) {
							return e.getYear()
						}
					}, {
						"seq": "yy",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							return e.getYear() % 100
						}
					}, {
						"seq": "mm",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							var t = e.getMinutes();
							return t < 10 ? "0" + t : t
						}
					}, {
						"seq": "m",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							return e.getMinutes()
						}
					}, {
						"seq": "HH",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							var t = e.getHours();
							return t < 10 ? "0" + t : t
						}
					}, {
						"seq": "H",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							return e.getHours()
						}
					}, {
						"seq": "hh",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							var t = e.getHours(),
								t = t % 12;
							0 === t && (t = 12);
							var i = t;
							return i < 10 ? "0" + i : i
						}
					}, {
						"seq": "h",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							var t = e.getHours(),
								t = t % 12;
							return 0 === t && (t = 12), t
						}
					}, {
						"seq": "ss",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							var t = e.getSeconds();
							return t < 10 ? "0" + t : t
						}
					}, {
						"seq": "s",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							return e.getSeconds()
						}
					}, {
						"seq": "MMMM",
						"expr": "[^\\s0-9]*",
						"str": function(e) {
							return i.monthNames[e.getMonth()]
						},
						"transform": function(e) {
							var n = DayPilot.indexOf(i.monthNames, e, t);
							return n < 0 ? null : n + 1
						}
					}, {
						"seq": "MMM",
						"expr": "[^\\s0-9]*",
						"str": function(e) {
							return i.monthNamesShort[e.getMonth()]
						},
						"transform": function(e) {
							var n = DayPilot.indexOf(i.monthNamesShort, e, t);
							return n < 0 ? null : n + 1
						}
					}, {
						"seq": "MM",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							var t = e.getMonth() + 1;
							return t < 10 ? "0" + t : t
						}
					}, {
						"seq": "M",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							return e.getMonth() + 1
						}
					}, {
						"seq": "dddd",
						"expr": "[^\\s0-9]*",
						"str": function(e) {
							return i.dayNames[e.getDayOfWeek()]
						}
					}, {
						"seq": "ddd",
						"expr": "[^\\s0-9]*",
						"str": function(e) {
							return i.dayNamesShort[e.getDayOfWeek()]
						}
					}, {
						"seq": "dd",
						"expr": "[0-9]{2,2}",
						"str": function(e) {
							var t = e.getDay();
							return t < 10 ? "0" + t : t
						}
					}, {
						"seq": "%d",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							return e.getDay()
						}
					}, {
						"seq": "d",
						"expr": "[0-9]{1,2}",
						"str": function(e) {
							return e.getDay()
						}
					}, {
						"seq": "tt",
						"expr": "(AM|PM|am|pm)",
						"str": function(e) {
							return e.getHours() < 12 ? "AM" : "PM"
						},
						"transform": function(e) {
							return e.toUpperCase()
						}
					}],
					a = function(e) {
						return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
					};
				this.init = function() {
					this.year = this.findSequence("yyyy"), this.month = this.findSequence("MMMM") || this.findSequence("MMM") || this.findSequence("MM") || this.findSequence("M"), this.day = this.findSequence("dd") || this.findSequence("d"), this.hours = this.findSequence("HH") || this.findSequence("H"), this.minutes = this.findSequence("mm") || this.findSequence("m"), this.seconds = this.findSequence("ss") || this.findSequence("s"), this.ampm = this.findSequence("tt"), this.hours12 = this.findSequence("hh") || this.findSequence("h")
				}, this.findSequence = function(t) {
					function i(e) {
						return parseInt(e)
					}
					return e.indexOf(t) === -1 ? null : {
						"findValue": function(o) {
							for (var r = a(e), l = null, s = 0; s < n.length; s++) {
								var d = (n[s].length, t === n[s].seq),
									c = n[s].expr;
								d && (c = "(" + c + ")", l = n[s].transform), r = r.replace(n[s].seq, c)
							}
							r = "^" + r + "$";
							try {
								var h = new RegExp(r),
									u = h.exec(o);
								return u ? (l = l || i)(u[1]) : null
							} catch (e) {
								throw "unable to create regex from: " + r
							}
						}
					}
				}, this.print = function(t) {
					for (var i = function(e) {
							for (var t = 0; t < n.length; t++) if (n[t] && n[t].seq === e) return n[t];
							return null
						}, a = e.length <= 0, o = 0, r = []; !a;) {
						var l = e.substring(o),
							s = /%?(.)\1*/.exec(l);
						if (s && s.length > 0) {
							var d = s[0],
								c = i(d);
							c ? r.push(c) : r.push(d), o += d.length, a = e.length <= o
						} else a = !0
					}
					for (var h = 0; h < r.length; h++) {
						var u = r[h];
						"string" != typeof u && (r[h] = u.str(t))
					}
					return r.join("")
				}, this.parse = function(e) {
					var t = this.year.findValue(e);
					if (!t) return null;
					var i = this.month.findValue(e);
					if (DayPilot.Util.isNullOrUndefined(i)) return null;
					if (i > 12 || i < 1) return null;
					var n = this.day.findValue(e),
						a = DayPilot.Date.fromYearMonthDay(t, i).daysInMonth();
					if (n < 1 || n > a) return null;
					var o = this.hours ? this.hours.findValue(e) : 0,
						r = this.minutes ? this.minutes.findValue(e) : 0,
						l = this.seconds ? this.seconds.findValue(e) : 0,
						s = this.ampm ? this.ampm.findValue(e) : null;
					if (this.ampm && this.hours12) {
						var d = this.hours12.findValue(e);
						if (d < 1 || d > 12) return null;
						o = "PM" === s ? 12 === d ? 12 : d + 12 : 12 === d ? 0 : d
					}
					if (o < 0 || o > 23) return null;
					if (r < 0 || r > 59) return null;
					if (l < 0 || l > 59) return null;
					var c = new Date;
					return c.setUTCFullYear(t, i - 1, n), c.setUTCHours(o), c.setUTCMinutes(r), c.setUTCSeconds(l), c.setUTCMilliseconds(0), new DayPilot.Date(c)
				}, this.init()
			};
		DayPilot.Canvas = function(e, t, i, n, a) {
			function o(e, t, i) {
				for (var n = t.split(" "), a = [], o = n[0], r = 1; r < n.length; r++) {
					var l = n[r];
					e.measureText(o + " " + l).width < i ? o += " " + l : (a.push(o), o = l)
				}
				return a.push(o), a
			}
			var n = n || 1,
				r = document.createElement("canvas");
			r.width = e * n, r.height = t * n;
			var l = r.getContext("2d");
			l.scale(n, n), this.defaultFileName = "image.png", "image/jpeg" === i && (this.defaultFileName = "image.jpg", a = a || .92), this.fillRect = function(e, t) {
				l.save(), l.strokeStyle = "rgb(0,0,0,0)", l.fillStyle = t, l.fillRect(e.x + .5, e.y + .5, e.w - .5, e.h - .5), l.restore()
			}, this.rect = function(e, t) {
				l.save(), l.strokeStyle = t, l.beginPath(), l.rect(e.x + .5, e.y + .5, e.w - 1, e.h - 1), l.stroke(), l.restore()
			}, this.text = function(e, t, i, n, a, r) {
				if ("number" == typeof t && (t = "" + t), "string" != typeof t) throw "String expected";
				a = a || "left", r = r || 0, n = n || "#000", l.save();
				var s = parseInt(i.size),
					d = DayPilot.browser.ff ? 3 : 0;
				d += .2 * s, d += DayPilot.browser.chrome ? 1 : 0, d += DayPilot.browser.ie ? 1 : 0, l.rect(e.x + .5 + r, e.y + .5 + r, e.w - 1 - r, e.h - 1 - r), l.clip(), l.fillStyle = n, l.font = i.style + " " + i.size + " " + i.family, l.textBaseline = "top", l.textAlign = a;
				var c = e.x;
				switch (a) {
				case "center":
					c += e.w / 2;
					break;
				case "right":
					c += e.w
				}
				var h = 0;
				c += h;
				var u = 1.2 * parseInt(i.size),
					f = t.split("\n"),
					v = [];
				DayPilot.list(f).each(function(t) {
					var i = o(l, t, e.w);
					DayPilot.list(i).each(function(e) {
						v.push(e)
					})
				});
				for (var p = e.y + h + r + d, g = 0; g < v.length; g++) {
					var m = v[g];
					l.fillText(m, c + r, p), p += u
				}
				l.restore()
			}, this.line = function(e, t, i, n, a) {
				l.save(), l.lineWidth = 1, l.strokeStyle = a, l.beginPath(), l.moveTo(e + .5, t + .5), l.lineTo(i + .5, n + .5), l.stroke(), l.restore()
			}, this.image = function(e, t) {
				if (t) {
					if ("string" == typeof t) {
						var i = t,
							t = document.createElement("img");
						if (0 !== i.indexOf("data:")) return t.onload = function() {
							l.save(), l.drawImage(t, e.x, e.y), l.restore()
						}, void(t.src = i);
						t.src = i
					}
					l.save(), l.drawImage(t, e.x, e.y), l.restore()
				}
			}, this.getWidth = function() {
				return r.width
			}, this.getHeight = function() {
				return r.height
			}, this.getElement = function() {
				return r
			}, this.getSource = function() {
				return "<img src='" + r.toDataURL(i, a) + "' />"
			}, this.getDataUri = function() {
				return r.toDataURL(i, a)
			}, this.getDefaultFileName = function() {
				return this.defaultFileName
			}, this.getBlob = function() {
				return r.msToBlob ? r.msToBlob() : DayPilot.Util.dataUriToBlob(this.getDataUri())
			}
		}, DayPilot.Svg = function(e, t) {
			function i(e, t) {
				var i = null;
				if (e) {
					if ("string" == typeof e) {
						if (0 === e.indexOf("data:")) {
							var n = {};
							n.dataUri = e, t(n)
						}
						i = e
					} else i = e.src;
					var e = document.createElement("img");
					e.onload = function() {
						var e = document.createElement("canvas");
						e.width = this.naturalWidth, e.height = this.naturalHeight, e.getContext("2d").drawImage(this, 0, 0);
						var i = {};
						i.dataUri = e.toDataURL("image/png"), t(i)
					}, e.src = i
				}
			}
			var n = "http://www.w3.org/2000/svg",
				a = document.createElementNS(n, "svg");
			a.outerHTML && a.setAttribute("xmlns", n), a.setAttribute("viewBox", "0 0 " + e + " " + t), this.defaultFileName = "image.svg", this.fillRect = function(e, t) {
				var i = document.createElementNS(n, "rect");
				i.setAttribute("x", e.x + .5), i.setAttribute("y", e.y + .5), i.setAttribute("width", e.w - 1), i.setAttribute("height", e.h - 1), i.setAttribute("fill", t), a.appendChild(i)
			}, this.rect = function(e, t) {
				var i = document.createElementNS(n, "rect");
				i.setAttribute("x", e.x + .5), i.setAttribute("y", e.y + .5), i.setAttribute("width", e.w - 1), i.setAttribute("height", e.h - 1), i.setAttribute("stroke", t), i.setAttribute("stroke-width", "1"), i.setAttribute("fill", "transparent"), a.appendChild(i)
			}, this.text = function(e, t, i, o, r, l) {
				function s(e, t, r) {
					var l = document.createElementNS(n, "text");
					l.setAttribute("fill", o), l.setAttribute("font-family", i.family), l.setAttribute("font-size", i.size), l.setAttribute("font-style", i.style), l.setAttribute("x", t), l.setAttribute("y", r), l.setAttribute("dy", "1em"), l.setAttribute("text-anchor", h), l.setAttribute("clip-path", "url(#" + u.id + ")");
					var s = document.createTextNode(e);
					l.appendChild(s), a.appendChild(l)
				}
				if ("number" == typeof t && (t = "" + t), "string" != typeof t) throw "String expected";
				var r = r || "left",
					l = l || 0,
					d = 3,
					c = e.x,
					h = "start";
				switch (r) {
				case "center":
					c += e.w / 2, h = "middle";
					break;
				case "right":
					c += e.w, h = "end"
				}
				var u = document.createElementNS(n, "clipPath");
				u.id = "clip" + DayPilot.guid();
				var f = document.createElementNS(n, "rect");
				f.setAttribute("x", e.x), f.setAttribute("y", e.y), f.setAttribute("width", e.w), f.setAttribute("height", e.h), u.appendChild(f), a.appendChild(u);
				for (var v = 1.2 * parseInt(i.size), p = t.split("\n"), g = e.y + l + d, m = 0; m < p.length; m++) {
					s(p[m], c + l, g), g += v
				}
			}, this.line = function(e, t, i, o, r) {
				var l = document.createElementNS(n, "line");
				l.setAttribute("x1", e + .5), l.setAttribute("y1", t + .5), l.setAttribute("x2", i + .5), l.setAttribute("y2", o + .5), l.setAttribute("stroke", r), a.appendChild(l)
			}, this.image = function(e, t) {
				function o(t) {
					var i = document.createElementNS(n, "image");
					i.setAttributeNS("http://www.w3.org/1999/xlink", "href", t.dataUri), i.setAttribute("x", e.x), i.setAttribute("y", e.y), i.setAttribute("width", e.w), i.setAttribute("height", e.h), a.appendChild(i)
				}
				i(t, o)
			}, this.getWidth = function() {
				return e
			}, this.getHeight = function() {
				return t
			}, this.getElement = function() {
				return a
			}, this.getSource = function() {
				if (a.outerHTML) return a.outerHTML;
				var e = document.createElement("div"),
					t = a.cloneNode(!0);
				return e.appendChild(t), e.innerHTML
			}, this.getDataUri = function() {
				return "data:application/octet-stream," + encodeURIComponent(this.getSource())
			}, this.getDefaultFileName = function() {
				return this.defaultFileName
			}, this.getBlob = function() {
				return new Blob([this.getSource()])
			}
		}, DayPilot.Excel = function() {
			var e = this,
				t = null,
				i = null,
				n = null,
				a = {};
			a.xmlns = "urn:schemas-microsoft-com:office:spreadsheet", a.o = "urn:schemas-microsoft-com:office:office", a.x = "urn:schemas-microsoft-com:office:excel", a.ss = "urn:schemas-microsoft-com:office:spreadsheet", a.html = "http://www.w3.org/TR/REC-html40", this.init = function() {
				t = document.implementation.createDocument(a.xmlns, "Workbook", null), t.documentElement.setAttribute("xmlns:o", a.o), t.documentElement.setAttribute("xmlns:x", a.x), t.documentElement.setAttribute("xmlns:ss", a.ss), t.documentElement.setAttribute("xmlns:html", a.html);
				var o = t.createElement("x:ExcelWorkbook");
				t.documentElement.appendChild(o), i = t.createElement("ss:Styles"), t.documentElement.appendChild(i), n = e.styles.create(), n.setId("Default"), n.setName("Normal")
			}, this.worksheets = [], this.worksheets.create = function(t) {
				var i = e.el(a.ss, "Worksheet"),
					n = new o(i);
				return n.setName(t), this.push(n), n
			}, this.styles = [], this.styles.create = function(e) {
				var n = t.createElement("ss:Style");
				i.appendChild(n);
				var a = new r(n);
				return this.push(a), a
			}, this.styles.getDefault = function() {
				return n
			}, this.el = function(e, i) {
				var n = t.createElementNS(e, i);
				return t.documentElement.appendChild(n), n
			}, this.getSource = function() {
				return '<?xml version="1.0"?>' + (new XMLSerializer).serializeToString(t)
			}, this.getDataUri = function() {
				return "data:application/vnd.ms-excel," + encodeURIComponent(this.getSource())
			}, this.getElement = function() {
				return t
			}, this.getDefaultFileName = function() {
				return "spreadsheet.xls"
			}, this.getBlob = function() {
				return new Blob([this.getSource()])
			};
			var o = function(e) {
					var i = t.createElement("Table");
					e.appendChild(i);
					var n = t.createElement("x:WorksheetOptions");
					e.appendChild(n), this.rows = [], this.setName = function(t) {
						e.setAttribute("ss:Name", t)
					}, this.cell = function(e, n) {
						for (; n >= this.rows.length;) {
							var o = t.createElement("Row");
							i.appendChild(o), this.rows.push(new a(o))
						}
						return this.rows[n].cell(e)
					}, this.enableGridlines = function(e) {
						var i = DayPilot.list(n.childNodes).find(function(e) {
							return "x:DoNotDisplayGridlines" === e.tagName
						});
						if (!i && !e) {
							var a = t.createElement("x:DoNotDisplayGridlines");
							n.appendChild(a)
						}
						i && e && n.removeChild(i)
					};
					var a = function(e) {
							this.cells = [], this.getElement = function() {
								return e
							}, this.cell = function(n) {
								for (; n >= this.cells.length;) {
									var a = t.createElement("Cell");
									e.appendChild(a), this.cells.push(new i(a))
								}
								return this.cells[n]
							};
							var i = function(e) {
									this.setText = function(i) {
										var n = t.createElement("Data");
										n.setAttribute("ss:Type", "String");
										var a = t.createTextNode(i);
										for (n.appendChild(a); e.firstChild;) e.removeChild(e.firstChild);
										return e.appendChild(n), this
									}, this.setColspan = function(t) {
										return t > 1 ? e.setAttribute("ss:MergeAcross", t - 1) : e.removeAttribute("ss:MergeAcross"), this
									}, this.setRowspan = function(t) {
										return t > 1 ? e.setAttribute("ss:MergeDown", t - 1) : e.removeAttribute("ss:MergeDown"), this
									}, this.setStyle = function(t) {
										if (!(t instanceof r)) throw "Invalid argument, Style expected";
										return e.setAttribute("ss:StyleID", t.getId()), this
									}
								}
						}
				},
				r = function(e) {
					var i = DayPilot.guid();
					e.setAttribute("ss:ID", i);
					var n = t.createElement("ss:Alignment");
					e.appendChild(n);
					var a = t.createElement("ss:Interior");
					e.appendChild(a);
					var o = t.createElement("ss:Borders");
					e.appendChild(o), this.setHorizontalAlignment = function(e) {
						n.setAttribute("ss:Horizontal", e)
					}, this.setVerticalAlignment = function(e) {
						n.setAttribute("ss:Vertical", e)
					}, this.setBackColor = function(e) {
						var t = DayPilot.Util.normalizeColor(e);
						a.setAttribute("ss:Color", t), a.setAttribute("ss:Pattern", "Solid")
					}, this.setBorderColor = function(e) {
						function i(e, i) {
							var n = t.createElement("ss:Border");
							return n.setAttribute("ss:Position", e), n.setAttribute("ss:LineStyle", "Continuous"), n.setAttribute("ss:Color", DayPilot.Util.normalizeColor(i)), n
						}
						this.clearBorders();
						var n = i("Left", e);
						o.appendChild(n);
						var a = i("Right", e);
						o.appendChild(a);
						var r = i("Top", e);
						o.appendChild(r);
						var l = i("Bottom", e);
						o.appendChild(l)
					}, this.clearBorders = function() {
						for (; o.firstChild;) o.removeChild(o.firstChild)
					}, this.getId = function() {
						return i
					}, this.setId = function(t) {
						i = t, e.setAttribute("ss:ID", i)
					}, this.setName = function(t) {
						e.setAttribute("ss:Name", t)
					}
				};
			this.init()
		}, DayPilot.Export = function(e) {
			this.toElement = function() {
				return e.getElement()
			}, this.dimensions = function() {
				return {
					"width": e.getWidth(),
					"height": e.getHeight()
				}
			}, this.toHtml = function() {
				return e.getSource()
			}, this.toDataUri = function() {
				return e.getDataUri()
			}, this.toBlob = function() {
				return e.getBlob()
			}, this.print = function(t) {
				t = t || {}, t.orientation = t.orientation || "portrait";
				var i = document.createElement("iframe");
				i.setAttribute("width", 0), i.setAttribute("height", 0), i.setAttribute("frameborder", 0), i.setAttribute("src", "about:blank"), i.onload = function() {
					var n = i.contentWindow.document;
					if (n.body.appendChild(e.getElement()), "landscape" === t.orientation) {
						var a = DayPilot.sheet(n);
						a.add("@page", "size: landscape;"), a.commit()
					}
					i.contentWindow.document.execCommand("print", !1, null) || (i.contentWindow.focus(), i.contentWindow.print()), setTimeout(function() {
						document.body.removeChild(i)
					}, 10)
				}, document.body.appendChild(i)
			}, this.download = function(t) {
				var t = t || e.getDefaultFileName(),
					i = e.getBlob();
				DayPilot.Util.downloadBlob(i, t)
			}
		}, DayPilot.Exception = function(e) {
			this.message = e, this.toString = function() {
				return this.message
			}
		}, DayPilot.Locale = function(e, t) {
			if (this.id = e, this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], this.dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], this.monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], this.datePattern = "M/d/yyyy", this.timePattern = "H:mm", this.dateTimePattern = "M/d/yyyy H:mm", this.timeFormat = "Clock12Hours", this.weekStarts = 0, t) for (var i in t) this[i] = t[i]
		}, DayPilot.Locale.all = {}, DayPilot.Locale.find = function(e) {
			if (!e) return null;
			var t = e.toLowerCase();
			return t.length > 2 && (t = DayPilot.Util.replaceCharAt(t, 2, "-")), DayPilot.Locale.all[t]
		}, DayPilot.Locale.register = function(e) {
			DayPilot.Locale.all[e.id] = e
		}, DayPilot.Locale.register(new DayPilot.Locale("ca-es", {
			"dayNames": ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
			"dayNamesShort": ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
			"monthNames": ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre", ""],
			"monthNamesShort": ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des.", ""],
			"timePattern": "H:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("cs-cz", {
			"dayNames": ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],
			"dayNamesShort": ["ne", "po", "út", "st", "čt", "pá", "so"],
			"monthNames": ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec", ""],
			"monthNamesShort": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", ""],
			"timePattern": "H:mm",
			"datePattern": "d. M. yyyy",
			"dateTimePattern": "d. M. yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("da-dk", {
			"dayNames": ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
			"dayNamesShort": ["sø", "ma", "ti", "on", "to", "fr", "lø"],
			"monthNames": ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december", ""],
			"monthNamesShort": ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd-MM-yyyy",
			"dateTimePattern": "dd-MM-yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("de-at", {
			"dayNames": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
			"dayNamesShort": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
			"monthNames": ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
			"monthNamesShort": ["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("de-ch", {
			"dayNames": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
			"dayNamesShort": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
			"monthNames": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
			"monthNamesShort": ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("de-de", {
			"dayNames": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
			"dayNamesShort": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
			"monthNames": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
			"monthNamesShort": ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("de-lu", {
			"dayNames": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
			"dayNamesShort": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
			"monthNames": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
			"monthNamesShort": ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("en-au", {
			"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			"dayNamesShort": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			"monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
			"monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
			"timePattern": "h:mm tt",
			"datePattern": "d/MM/yyyy",
			"dateTimePattern": "d/MM/yyyy h:mm tt",
			"timeFormat": "Clock12Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("en-ca", {
			"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			"dayNamesShort": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			"monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
			"monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
			"timePattern": "h:mm tt",
			"datePattern": "yyyy-MM-dd",
			"dateTimePattern": "yyyy-MM-dd h:mm tt",
			"timeFormat": "Clock12Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("en-gb", {
			"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			"dayNamesShort": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			"monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
			"monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("en-us", {
			"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			"dayNamesShort": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			"monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
			"monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
			"timePattern": "h:mm tt",
			"datePattern": "M/d/yyyy",
			"dateTimePattern": "M/d/yyyy h:mm tt",
			"timeFormat": "Clock12Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("es-es", {
			"dayNames": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
			"dayNamesShort": ["D", "L", "M", "X", "J", "V", "S"],
			"monthNames": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],
			"monthNamesShort": ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""],
			"timePattern": "H:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("es-mx", {
			"dayNames": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
			"dayNamesShort": ["do.", "lu.", "ma.", "mi.", "ju.", "vi.", "sá."],
			"monthNames": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],
			"monthNamesShort": ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""],
			"timePattern": "hh:mm tt",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy hh:mm tt",
			"timeFormat": "Clock12Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("eu-es", {
			"dayNames": ["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"],
			"dayNamesShort": ["ig", "al", "as", "az", "og", "or", "lr"],
			"monthNames": ["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua", ""],
			"monthNamesShort": ["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe.", ""],
			"timePattern": "H:mm",
			"datePattern": "yyyy/MM/dd",
			"dateTimePattern": "yyyy/MM/dd H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("fi-fi", {
			"dayNames": ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
			"dayNamesShort": ["su", "ma", "ti", "ke", "to", "pe", "la"],
			"monthNames": ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu", ""],
			"monthNamesShort": ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu", ""],
			"timePattern": "H:mm",
			"datePattern": "d.M.yyyy",
			"dateTimePattern": "d.M.yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("fr-be", {
			"dayNames": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
			"dayNamesShort": ["di", "lu", "ma", "me", "je", "ve", "sa"],
			"monthNames": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
			"monthNamesShort": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd-MM-yy",
			"dateTimePattern": "dd-MM-yy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("fr-ca", {
			"dayNames": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
			"dayNamesShort": ["di", "lu", "ma", "me", "je", "ve", "sa"],
			"monthNames": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
			"monthNamesShort": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
			"timePattern": "HH:mm",
			"datePattern": "yyyy-MM-dd",
			"dateTimePattern": "yyyy-MM-dd HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("fr-ch", {
			"dayNames": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
			"dayNamesShort": ["di", "lu", "ma", "me", "je", "ve", "sa"],
			"monthNames": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
			"monthNamesShort": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("fr-fr", {
			"dayNames": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
			"dayNamesShort": ["di", "lu", "ma", "me", "je", "ve", "sa"],
			"monthNames": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
			"monthNamesShort": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("fr-lu", {
			"dayNames": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
			"dayNamesShort": ["di", "lu", "ma", "me", "je", "ve", "sa"],
			"monthNames": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
			"monthNamesShort": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("gl-es", {
			"dayNames": ["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"],
			"dayNamesShort": ["do", "lu", "ma", "mé", "xo", "ve", "sá"],
			"monthNames": ["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro", ""],
			"monthNamesShort": ["xan", "feb", "mar", "abr", "maio", "xuño", "xul", "ago", "set", "out", "nov", "dec", ""],
			"timePattern": "H:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("it-it", {
			"dayNames": ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
			"dayNamesShort": ["do", "lu", "ma", "me", "gi", "ve", "sa"],
			"monthNames": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],
			"monthNamesShort": ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("it-ch", {
			"dayNames": ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
			"dayNamesShort": ["do", "lu", "ma", "me", "gi", "ve", "sa"],
			"monthNames": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],
			"monthNamesShort": ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("ja-jp", {
			"dayNames": ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
			"dayNamesShort": ["日", "月", "火", "水", "木", "金", "土"],
			"monthNames": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],
			"monthNamesShort": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],
			"timePattern": "H:mm",
			"datePattern": "yyyy/MM/dd",
			"dateTimePattern": "yyyy/MM/dd H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("nb-no", {
			"dayNames": ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
			"dayNamesShort": ["sø", "ma", "ti", "on", "to", "fr", "lø"],
			"monthNames": ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],
			"monthNamesShort": ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("nl-nl", {
			"dayNames": ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
			"dayNamesShort": ["zo", "ma", "di", "wo", "do", "vr", "za"],
			"monthNames": ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december", ""],
			"monthNamesShort": ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
			"timePattern": "HH:mm",
			"datePattern": "d-M-yyyy",
			"dateTimePattern": "d-M-yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("nl-be", {
			"dayNames": ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
			"dayNamesShort": ["zo", "ma", "di", "wo", "do", "vr", "za"],
			"monthNames": ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december", ""],
			"monthNamesShort": ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
			"timePattern": "H:mm",
			"datePattern": "d/MM/yyyy",
			"dateTimePattern": "d/MM/yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("nn-no", {
			"dayNames": ["søndag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"],
			"dayNamesShort": ["sø", "må", "ty", "on", "to", "fr", "la"],
			"monthNames": ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],
			"monthNamesShort": ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("pt-br", {
			"dayNames": ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
			"dayNamesShort": ["D", "S", "T", "Q", "Q", "S", "S"],
			"monthNames": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", ""],
			"monthNamesShort": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("pl-pl", {
			"dayNames": ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"],
			"dayNamesShort": ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
			"monthNames": ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień", ""],
			"monthNamesShort": ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru", ""],
			"timePattern": "HH:mm",
			"datePattern": "yyyy-MM-dd",
			"dateTimePattern": "yyyy-MM-dd HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("pt-pt", {
			"dayNames": ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
			"dayNamesShort": ["D", "S", "T", "Q", "Q", "S", "S"],
			"monthNames": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", ""],
			"monthNamesShort": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", ""],
			"timePattern": "HH:mm",
			"datePattern": "dd/MM/yyyy",
			"dateTimePattern": "dd/MM/yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 0
		})), DayPilot.Locale.register(new DayPilot.Locale("ro-ro", {
			"dayNames": ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"],
			"dayNamesShort": ["D", "L", "Ma", "Mi", "J", "V", "S"],
			"monthNames": ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie", ""],
			"monthNamesShort": ["ian.", "feb.", "mar.", "apr.", "mai.", "iun.", "iul.", "aug.", "sep.", "oct.", "nov.", "dec.", ""],
			"timePattern": "H:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("ru-ru", {
			"dayNames": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
			"dayNamesShort": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			"monthNames": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],
			"monthNamesShort": ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],
			"timePattern": "H:mm",
			"datePattern": "dd.MM.yyyy",
			"dateTimePattern": "dd.MM.yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("sk-sk", {
			"dayNames": ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"],
			"dayNamesShort": ["ne", "po", "ut", "st", "št", "pi", "so"],
			"monthNames": ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december", ""],
			"monthNamesShort": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],
			"timePattern": "H:mm",
			"datePattern": "d.M.yyyy",
			"dateTimePattern": "d.M.yyyy H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("sv-se", {
			"dayNames": ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
			"dayNamesShort": ["sö", "må", "ti", "on", "to", "fr", "lö"],
			"monthNames": ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december", ""],
			"monthNamesShort": ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
			"timePattern": "HH:mm",
			"datePattern": "yyyy-MM-dd",
			"dateTimePattern": "yyyy-MM-dd HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("tr-tr", {
			"dayNames": ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
			"dayNamesShort": ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
			"monthNames": ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", ""],
			"monthNamesShort": ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara", ""],
			"timePattern": "HH:mm",
			"datePattern": "d.M.yyyy",
			"dateTimePattern": "d.M.yyyy HH:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.register(new DayPilot.Locale("zh-cn", {
			"dayNames": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
			"dayNamesShort": ["日", "一", "二", "三", "四", "五", "六"],
			"monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
			"monthNamesShort": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],
			"timePattern": "H:mm",
			"datePattern": "yyyy/M/d",
			"dateTimePattern": "yyyy/M/d H:mm",
			"timeFormat": "Clock24Hours",
			"weekStarts": 1
		})), DayPilot.Locale.US = DayPilot.Locale.find("en-us"), DayPilot.Switcher = function(e) {
			function t(e, t, n) {
				var a = {};
				a.start = e, a.end = t, a.day = n, a.target = i.active.control, a.preventDefault = function() {
					this.preventDefault.value = !0
				};
				var o = i.k;
				o && o.start === a.start && o.end === a.end && o.day === a.day && o.target === a.target || (i.k = a, "function" == typeof i.onChange && (i.onChange(a), a.preventDefault.value) || "function" == typeof i.onTimeRangeSelect && (i.onTimeRangeSelect(a), a.preventDefault.value) || (i.active.sendNavigate(i.day), "function" == typeof i.onChanged && i.onChanged(a), "function" == typeof i.onTimeRangeSelected && i.onTimeRangeSelected(a)))
			}
			var i = this;
			this.views = [], this.triggers = [], this.navigator = {}, this.selectedClass = null, this.active = null, this.day = DayPilot.Date.today(), this.onChange = null, this.onChanged = null, this.navigator.updateMode = function(e) {
				var t = i.navigator.control;
				t && (t.selectMode = e, t.select(i.day))
			}, this.addView = function(e, t) {
				var n;
				if ("string" == typeof e) {
					if (n = document.getElementById(e), !n) throw "Element not found: " + e
				} else n = e;
				var a = n,
					o = {};
				return o.isView = !0, o.id = a.id, o.control = a, o.options = t || {}, o.hide = function() {
					a.hide ? a.hide() : a.nav && a.nav.top ? a.nav.top.style.display = "none" : a.style.display = "none"
				}, o.sendNavigate = function(e) {
					(function() {
						return !!a.backendUrl || !("function" != typeof WebForm_DoCallback || !a.uniqueID)
					})() ? a.commandCallBack && a.commandCallBack("navigate", {
						"day": e
					}) : (a.startDate = e, a.update())
				}, o.show = function() {
					i.c(), a.show ? a.show() : a.nav && a.nav.top ? a.nav.top.style.display = "" : a.style.display = ""
				}, o.selectMode = function() {
					if (o.options.navigatorSelectMode) return o.options.navigatorSelectMode;
					if (a.isCalendar) switch (a.viewType) {
					case "Day":
						return "day";
					case "Week":
						return "week";
					case "WorkWeek":
						return "week";
					default:
						return "day"
					} else if (a.isMonth) switch (a.viewType) {
					case "Month":
						return "month";
					case "Weeks":
						return "week";
					default:
						return "day"
					}
					return "day"
				}, this.views.push(o), o
			}, this.addTrigger = function(e, t) {
				var n;
				if ("string" == typeof e) {
					if (n = document.getElementById(e), !n) throw "Element not found: " + e
				} else n = e;
				var a = this.f(t);
				a || (a = this.addView(t));
				var o = {};
				return o.isTrigger = !0, o.element = n, o.id = n.id, o.view = a, o.onClick = function(e) {
					i.show(o), i.g(o), e = e || window.event, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
				}, DayPilot.re(n, "click", o.onClick), this.triggers.push(o), o
			}, this.addButton = this.addTrigger, this.select = function(e) {
				var t = this.j(e);
				t ? t.onClick() : this.triggers.length > 0 && this.triggers[0].onClick()
			}, this.j = function(e) {
				for (var t = 0; t < this.triggers.length; t++) {
					var i = this.triggers[t];
					if (i.id === e) return i
				}
				return null
			}, this.g = function(e) {
				if (this.selectedClass) {
					for (var t = 0; t < this.triggers.length; t++) {
						var i = this.triggers[t];
						DayPilot.Util.removeClass(i.element, this.selectedClass)
					}
					DayPilot.Util.addClass(e.element, this.selectedClass)
				}
			}, this.addNavigator = function(e) {
				i.navigator.control = e, e.timeRangeSelectedHandling = "JavaScript", e.onTimeRangeSelected = function() {
					var n, a, o;
					if (1 === e.api) n = arguments[0], a = arguments[1], o = arguments[2];
					else {
						var r = arguments[0];
						n = r.start, a = r.end, o = r.day
					}
					i.day = o, t(n, a, o)
				}
			}, this.show = function(e) {
				var t, n;
				if (e.isTrigger) n = e, t = n.view;
				else if (t = e.isView ? e : this.f(e), this.active === t) return;
				if (i.onSelect) {
					var a = {};
					a.source = n ? n.element : null, a.target = t.control, i.onSelect(a)
				}
				this.active = t, t.show();
				var o = t.selectMode();
				i.navigator.updateMode(o)
			}, this.f = function(e) {
				for (var t = 0; t < this.views.length; t++) if (this.views[t].control === e) return this.views[t];
				return null
			}, this.c = function() {
				for (var e = 0; e < this.views.length; e++) this.views[e].hide()
			}, this.events = {}, this.events.load = function(e, t, n) {
				if (!i.active || !i.active.control) throw "DayPilot.Switcher.events.load(): Active view not found";
				i.active.control.events.load(e, t, n)
			}, this.k = null, this.l = function() {
				if (e) for (var t in e)"triggers" === t ? DayPilot.list(e.triggers).each(function(e) {
					i.addTrigger(e.id, e.view)
				}) : "navigator" === t ? i.addNavigator(e.navigator) : i[t] = e[t]
			}, this.l()
		}, function() {
			if (!DayPilot.Global.defaultCss) {
				var e = DayPilot.sheet();
				e.add(".bubble_default_main", "cursor: default;"), e.add(".bubble_default_main_inner", 'border-radius: 5px;font-size: 12px;padding: 4px;color: #666;background: #eeeeee; background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");border: 1px solid #ccc;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;-moz-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);-webkit-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);'), e.add(".calendar_default_main", "border: 1px solid #c0c0c0; font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;"), e.add(".calendar_default_main *, .calendar_default_main *:before, .calendar_default_main *:after", "box-sizing: content-box;"), e.add(".calendar_default_rowheader_inner,.calendar_default_cornerright_inner,.calendar_default_corner_inner,.calendar_default_colheader_inner,.calendar_default_alldayheader_inner", "color: #333;background: #f3f3f3;"), e.add(".calendar_default_cornerright_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\tborder-bottom: 1px solid #c0c0c0;"), e.add(".calendar_default_rowheader_inner", "font-size: 16pt;text-align: right; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"), e.add(".calendar_default_corner_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"), e.add(".calendar_default_rowheader_minutes", "font-size:10px;vertical-align: super;padding-left: 2px;padding-right: 2px;"), e.add(".calendar_default_colheader_inner", "text-align: center; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"), e.add(".calendar_default_cell_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #ddd;border-bottom: 1px solid #ddd; background: #f9f9f9;"), e.add(".calendar_default_cell_business .calendar_default_cell_inner", "background: #fff"), e.add(".calendar_default_alldayheader_inner", "text-align: center;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"), e.add(".calendar_default_message", "opacity: 0.9;filter: alpha(opacity=90);\tpadding: 10px; color: #ffffff;background: #ffa216;"), e.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", "color: #666; border: 1px solid #999;"), e.add(".calendar_default_event_bar", "top: 0px;bottom: 0px;left: 0px;width: 4px;background-color: #9dc8e8;"), e.add(".calendar_default_event_bar_inner", "position: absolute;width: 4px;background-color: #1066a8;"), e.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".calendar_default_selected .calendar_default_event_inner", "background: #ddd;"), e.add(".calendar_default_alldayevent_inner", "position: absolute;top: 2px;bottom: 2px;left: 2px;right: 2px;padding: 2px;margin-right: 1px;font-size: 12px;"), e.add(".calendar_default_event_withheader .calendar_default_event_inner", "padding-top: 15px;"), e.add(".calendar_default_event", "cursor: default;"), e.add(".calendar_default_event_inner", "position: absolute;overflow: hidden;top: 0px;bottom: 0px;left: 0px;right: 0px;padding: 2px 2px 2px 6px;font-size: 12px;"), e.add(".calendar_default_shadow_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;background-color: #666666; opacity: 0.5;filter: alpha(opacity=50);"), e.add(".calendar_default_event_delete", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; -ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)'; cursor: pointer;"), e.add(".calendar_default_event_delete:hover", "opacity: 1;-ms-filter: none;"), e.add(".calendar_default_scroll_up", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAB3RJTUUH2wESDiYcrhwCiQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAARnQU1BAACxjwv8YQUAAACcSURBVHjaY2AgF9wWsTW6yGMlhi7OhC7AyMDQzMnBXIpFHAFuCtuaMTP+P8nA8P/b1x//FfW/HHuF1UQmxv+NUP1c3OxMVVhNvCVi683E8H8LXOY/w9+fTH81tF8fv4NiIpBRj+YoZtZ/LDUoJmKYhsVUpv0MDiyMDP96sIYV0FS2/8z9ICaLlOhvS4b/jC//MzC8xBG0vJeF7GQBlK0xdiUzCtsAAAAASUVORK5CYII=);"), e.add(".calendar_default_scroll_down", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALiMAAC4jAXilP3YAAACqSURBVChTY7wpam3L9J+xmQEP+PGPKZZxP4MDi4zI78uMDIwa2NT+Z2DYovrmiC+TI8OBP/8ZmEqwGvif4e8vxr+FIDkmEKH25vBWBgbG0+iK/zEwLtF+ffwOXCGI8Y+BoRFFIdC030x/WmBiYBNhpgLdswNJ8RSYaSgmgk39z1gPUfj/29ef/9rwhQTDHRHbrbdEbLvRFcGthkkAra/9/uMvhkK8piNLAgCRpTnNn4AEmAAAAABJRU5ErkJggg==);"), e.add(".calendar_default_now", "background-color: red;"), e.add(".calendar_default_now:before", "content: ''; top: -5px; border-width: 5px; border-color: transparent transparent transparent red; border-style: solid; width: 0px; height:0px; position: absolute; -moz-transform: scale(.9999);"), e.add(".calendar_default_shadow_forbidden .calendar_default_shadow_inner", "background-color: red;"), e.add(".calendar_default_shadow_top", 'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".calendar_default_shadow_bottom", 'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".menu_default_main", "font-family: Tahoma, Arial, Helvetica, Sans-Serif;font-size: 12px;border: 1px solid #dddddd;background-color: white;padding: 0px;cursor: default;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAABCAIAAABG0om7AAAAKXRFWHRDcmVhdGlvbiBUaW1lAHBvIDEwIDUgMjAxMCAyMjozMzo1OSArMDEwMGzy7+IAAAAHdElNRQfaBQoUJAesj4VUAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGPC/xhBQAAABVJREFUeNpj/P//PwO1weMnT2RlZAAYuwX/4oA3BgAAAABJRU5ErkJggg==);background-repeat: repeat-y;xborder-radius: 5px;-moz-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);-webkit-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);"), e.add(".menu_default_main, .menu_default_main *, .menu_default_main *:before, .menu_default_main *:after", "box-sizing: content-box;"), e.add(".menu_default_title", "background-color: #f2f2f2;border-bottom: 1px solid gray;padding: 4px 4px 4px 37px;"), e.add(".menu_default_main a", "padding: 2px 2px 2px 35px;color: black;text-decoration: none;cursor: default;"), e.add(".menu_default_main a img", "margin-left: 6px;margin-top: 2px;"), e.add(".menu_default_item_text", "display: block;height: 20px;line-height: 20px; overflow:hidden;padding-left: 2px;padding-right: 20px;"), e.add(".menu_default_main a:hover", "background-color: #f3f3f3;"), e.add(".menu_default_main div div", "border-top: 1px solid #dddddd;margin-top: 2px;margin-bottom: 2px;margin-left: 28px;"), e.add(".menu_default_main a.menu_default_item_disabled", "color: #ccc"), e.add(".menu_default_item_haschildren.menu_default_item_haschildren_active", 'background: #eeeeee;background: -webkit-gradient(linear, left top, left bottom, from(#efefef), to(#e6e6e6));background: -webkit-linear-gradient(top, #efefef 0%, #e6e6e6);background: -moz-linear-gradient(top, #efefef 0%, #e6e6e6);background: -ms-linear-gradient(top, #efefef 0%, #e6e6e6);background: -o-linear-gradient(top, #efefef 0%, #e6e6e6);background: linear-gradient(top, #efefef 0%, #e6e6e6);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#efefef", endColorStr="#e6e6e6");'), e.add(".menu_default_item_haschildren a:before", "content: ''; border-width: 6px; border-color: transparent transparent transparent black; border-style: solid; width: 0px; height:0px; position: absolute; right: 5px; margin-top: 4px;"), e.add(".menu_default_item_icon", "position: absolute; top:0px; left: 0px; padding: 2px 2px 2px 8px;"), e.add(".menu_default_item a i", "height: 20px;line-height: 20px;"), e.add(".menubar_default_main", "border-bottom: 1px solid #ccc; font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;"), e.add(".menubar_default_item", "display: inline-block;  padding: 6px 10px; cursor: default;"), e.add(".menubar_default_item:hover", "background-color: #f2f2f2;"), e.add(".menubar_default_item_active", "background-color: #f2f2f2;"), e.add(".month_default_main", "border: 1px solid #c0c0c0;font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;color: #333;"), e.add(".month_default_main *, .month_default_main *:before, .month_default_main *:after", "box-sizing: content-box;"), e.add(".month_default_cell_inner", "border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;background-color: #f9f9f9;"), e.add(".month_default_cell_business .month_default_cell_inner", "background-color: #fff;"), e.add(".month_default_cell_header", "text-align: right;padding-right: 2px;"), e.add(".month_default_header_inner", "text-align: center; vertical-align: middle;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;cursor: default;color: #333;background: #f3f3f3;"), e.add(".month_default_message", 'padding: 10px;opacity: 0.9;filter: alpha(opacity=90);color: #ffffff;background: #ffa216;background: -webkit-gradient(linear, left top, left bottom, from(#ffa216), to(#ff8400));background: -webkit-linear-gradient(top, #ffa216 0%, #ff8400);background: -moz-linear-gradient(top, #ffa216 0%, #ff8400);background: -ms-linear-gradient(top, #ffa216 0%, #ff8400);background: -o-linear-gradient(top, #ffa216 0%, #ff8400);background: linear-gradient(top, #ffa216 0%, #ff8400);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffa216", endColorStr="#ff8400");'), e.add(".month_default_event_inner", 'position: absolute;top: 0px;bottom: 0px;left: 1px;right: 1px;overflow:hidden;padding: 2px;padding-left: 5px;font-size: 12px;color: #333;background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");border: 1px solid #999;border-radius: 0px;'), e.add(".month_default_event_continueright .month_default_event_inner", "border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-right-style: dotted;"), e.add(".month_default_event_continueleft .month_default_event_inner", "border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-left-style: dotted;"), e.add(".month_default_event_hover .month_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#e8e8e8));background: -webkit-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -moz-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -ms-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -o-linear-gradient(top, #ffffff 0%, #e8e8e8);background: linear-gradient(top, #ffffff 0%, #e8e8e8);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#e8e8e8");'), e.add(".month_default_selected .month_default_event_inner, .month_default_event_hover.month_default_selected .month_default_event_inner", "background: #ddd;"), e.add(".month_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;"), e.add(".month_default_event_delete", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; -ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)';cursor: pointer;"), e.add(".month_default_event_delete:hover", "opacity: 1;-ms-filter: none;"), e.add(".month_default_event_timeleft", "color: #ccc; font-size: 8pt"), e.add(".month_default_event_timeright", "color: #ccc; font-size: 8pt; text-align: right;"), e.add(".navigator_default_main", "border-left: 1px solid #c0c0c0;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;background-color: white;color: #000000; box-sizing: content-box;"), e.add(".navigator_default_main *, .navigator_default_main *:before, .navigator_default_main *:after", "box-sizing: content-box;"), e.add(".navigator_default_month", "font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 11px;"), e.add(".navigator_default_day", "color: black;"), e.add(".navigator_default_weekend", "background-color: #f0f0f0;"), e.add(".navigator_default_dayheader", "color: black;"), e.add(".navigator_default_line", "border-bottom: 1px solid #c0c0c0;"), e.add(".navigator_default_dayother", "color: gray;"), e.add(".navigator_default_todaybox", "border: 1px solid red;"), e.add(".navigator_default_title, .navigator_default_titleleft, .navigator_default_titleright", "border-top: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;color: #333;background: #f3f3f3;"), e.add(".navigator_default_busy", "font-weight: bold;"), e.add(".navigator_default_cell", "text-align: center;"), e.add(".navigator_default_select .navigator_default_cell_box", "background-color: #FFE794; opacity: 0.5;"), e.add(".navigator_default_title", "text-align: center;"), e.add(".navigator_default_titleleft, .navigator_default_titleright", "text-align: center;"), e.add(".navigator_default_dayheader", "text-align: center;"), e.add(".navigator_default_weeknumber", "text-align: center;"), e.add(".scheduler_default_main *, .scheduler_default_main *:before, .scheduler_default_main *:after", "box-sizing: content-box;"), e.add(".scheduler_default_main", "box-sizing: content-box; border: 1px solid #c0c0c0;font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;"), e.add(".scheduler_default_selected .scheduler_default_event_inner", "background: #ddd;"), e.add(".scheduler_default_timeheader", "cursor: default;color: #333;"), e.add(".scheduler_default_message", "opacity: 0.9;filter: alpha(opacity=90);padding: 10px; color: #ffffff;background: #ffa216;"), e.add(".scheduler_default_timeheadergroup,.scheduler_default_timeheadercol", "color: #333;background: #f3f3f3;"), e.add(".scheduler_default_rowheader,.scheduler_default_corner", "color: #333;background: #f3f3f3;"), e.add(".scheduler_default_rowheader.scheduler_default_rowheader_selected", "background-color: #aaa;background-image: -webkit-gradient(linear, 0 100%, 100% 0,color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".scheduler_default_rowheader_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #e0e0e0;padding: 2px;"), e.add(".scheduler_default_timeheadergroup, .scheduler_default_timeheadercol", "text-align: center;"), e.add(".scheduler_default_timeheadergroup_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"), e.add(".scheduler_default_timeheadercol_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;"), e.add(".scheduler_default_divider, .scheduler_default_splitter", "background-color: #c0c0c0;"), e.add(".scheduler_default_divider_horizontal", "background-color: #c0c0c0;"), e.add(".scheduler_default_matrix_vertical_line", "background-color: #eee;"), e.add(".scheduler_default_matrix_vertical_break", "background-color: #999;"), e.add(".scheduler_default_matrix_horizontal_line", "background-color: #eee;"), e.add(".scheduler_default_resourcedivider", "background-color: #c0c0c0;"), e.add(".scheduler_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;"), e.add(".scheduler_default_event", "font-size:12px;color:#333;"), e.add(".scheduler_default_event_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;padding:5px 2px 2px 2px;overflow:hidden;border:1px solid #ccc;"), e.add(".scheduler_default_event_bar", "top:0px;left:0px;right:0px;height:4px;background-color:#9dc8e8;"), e.add(".scheduler_default_event_bar_inner", "position:absolute;height:4px;background-color:#1066a8;"), e.add(".scheduler_default_event_inner", 'background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".scheduler_default_event_float_inner", "padding:6px 2px 2px 8px;"), e.add(".scheduler_default_event_float_inner:after", 'content:"";border-color: transparent #666 transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:8px;left:-4px;'), e.add(".scheduler_default_columnheader_inner", "font-weight: bold;"), e.add(".scheduler_default_columnheader_splitter", "box-sizing: border-box; border-right: 1px solid #c0c0c0;"), e.add(".scheduler_default_columnheader_splitter:hover", "background-color: #c0c0c0;"), e.add(".scheduler_default_columnheader_cell_inner", "padding: 2px;"), e.add(".scheduler_default_cell", "background-color: #f9f9f9;"), e.add(".scheduler_default_cell.scheduler_default_cell_business", "background-color: #fff;"), e.add(".scheduler_default_cell.scheduler_default_cell_business.scheduler_default_cell_selected,.scheduler_default_cell.scheduler_default_cell_selected", "background-color: #ccc;background-image: -webkit-gradient(linear, 0 100%, 100% 0,\tcolor-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".scheduler_default_tree_image_no_children", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLzEyzsCJAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAADBJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOL31MeLxHwCeXUT0WkFMKAAAAABJRU5ErkJggg==);"), e.add(".scheduler_default_tree_image_expand", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLyUoFBT0AAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAFJJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeRhgJGREc4GijMBtTNgA0BxFog+uA4IA2gmUJwFog/IgUhAGBB9KPYhA3T74Jog+hjx+A8A1KRQ+AN5vcwAAAAASUVORK5CYII=);"), e.add(".scheduler_default_tree_image_collapse", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLxB+p9DXAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAENJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOAtEHyMjI7IE0EygOAtEH5CDqY9c+xjx+A8ANndK9WaZlP4AAAAASUVORK5CYII=);"), e.add(".scheduler_default_event_move_left", 'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".scheduler_default_event_move_right", 'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".scheduler_default_event_delete", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; -ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)';cursor: pointer;"), e.add(".scheduler_default_event_delete:hover", "opacity: 1;-ms-filter: none;"), e.add(".scheduler_default_rowmove_handle", "background-repeat: no-repeat; background-position: center center; background-color: #ccc; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAYAAACT+/8OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAClJREFUGFdj+P//P4O9vX2Bg4NDP4gNFgBytgPxebgAMsYuQGMz/jMAAFsTZDPYJlDHAAAAAElFTkSuQmCC); cursor: move;"), e.add(".scheduler_default_rowmove_source", "background-color: black; opacity: 0.2;"), e.add(".scheduler_default_rowmove_position_before, .scheduler_default_rowmove_position_after", "background-color: #999; height: 2px;"), e.add(".scheduler_default_rowmove_position_child", "margin-left: 10px; background-color: #999; height: 2px;"), e.add(".scheduler_default_rowmove_position_child:before", "content: '+'; color: #999; position: absolute; top: -8px; left: -10px;"), e.add(".scheduler_default_rowmove_position_forbidden", "background-color: red; height: 2px; margin-left: 10px;"), e.add(".scheduler_default_rowmove_position_forbidden:before", "content: 'x'; color: red; position: absolute; top: -8px; left: -10px;"), e.add(".scheduler_default_link_horizontal", "border-bottom-style: solid; border-bottom-color: red"), e.add(".scheduler_default_link_vertical", "border-right-style: solid; border-right-color: red"), e.add(".scheduler_default_link_arrow_right:before", "content: ''; border-width: 6px; border-color: transparent transparent transparent red; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".scheduler_default_link_arrow_left:before", "content: ''; border-width: 6px; border-color: transparent red transparent transparent; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".scheduler_default_link_arrow_down:before", "content: ''; border-width: 6px; border-color: red transparent transparent transparent; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".scheduler_default_link_arrow_up:before", "content: ''; border-width: 6px; border-color: transparent transparent red transparent; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".scheduler_default_shadow_overlap .scheduler_default_shadow_inner", "background-color: red;"), e.add(".scheduler_default_block", "background-color: gray; opacity: 0.5; filter: alpha(opacity=50);"), e.add(".scheduler_default_main .scheduler_default_event_group", "box-sizing: border-box; font-size:12px; color:#666; padding:4px 2px 2px 2px; overflow:hidden; border:1px solid #ccc; background-color: #fff;"), e.add(".scheduler_default_main .scheduler_default_header_icon", "box-sizing: border-box; border: 1px solid #c0c0c0; background-color: #f5f5f5; color: #000;"), e.add(".scheduler_default_header_icon:hover", "background-color: #ccc;"), e.add(".scheduler_default_header_icon_hide:before", "content: '\\00AB';"), e.add(".scheduler_default_header_icon_show:before", "content: '\\00BB';"), e.add(".scheduler_default_row_new .scheduler_default_rowheader_inner", "padding-left: 10px; color: #666; cursor: text; background-position: 0px 5px; background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABUSURBVChTY0ACslAaK2CC0iCQDMSlECYmQFYIAl1AjFUxukIQwKoYm0IQwFCMSyEIaEJpMMClcD4Qp0CYEIBNIUzRPzAPCtAVYlWEDgyAGIdTGBgAbqEJYyjqa3oAAAAASUVORK5CYII=);"), e.add(".scheduler_default_row_new .scheduler_default_rowheader_inner:hover", "background: white; color: white;"), e.add(".scheduler_default_rowheader textarea", "padding: 3px;"), e.add(".scheduler_default_rowheader_scroll", "cursor: default;"), e.add(".scheduler_default_shadow_forbidden .scheduler_default_shadow_inner", "background-color: red;"), e.add(".scheduler_default_event_moving_source", "opacity: 0.5; filter: alpha(opacity=50);"), e.add(".scheduler_default_linkpoint", "background-color: white; border: 1px solid gray; border-radius: 5px;"), e.add(".scheduler_default_linkpoint.scheduler_default_linkpoint_hover", "background-color: black;"), e.add(".scheduler_default_event.scheduler_default_event_version .scheduler_default_event_inner", "background-color: #cfdde8;background-image: -webkit-gradient(linear, 0 100%, 100% 0,\tcolor-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".scheduler_default_crosshair_vertical, .scheduler_default_crosshair_horizontal, .scheduler_default_crosshair_left, .scheduler_default_crosshair_top", "background-color: gray; opacity: 0.2; filter: alpha(opacity=20)"), e.add(".scheduler_default_link_dot", "border-radius: 10px; background-color: red"), e.add(".gantt_default_selected .gantt_default_event_inner", "background: #ddd;"), e.add(".gantt_default_main", "border: 1px solid #c0c0c0;font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;"), e.add(".gantt_default_main *, .gantt_default_main *:before, .gantt_default_main *:after", "box-sizing: content-box;"), e.add(".gantt_default_timeheader", "cursor: default;color: #666;"), e.add(".gantt_default_message", "opacity: 0.9;filter: alpha(opacity=90);padding: 10px; color: #ffffff;background: #ffa216;"), e.add(".gantt_default_timeheadergroup,.gantt_default_timeheadercol", "color: #333;background: #f3f3f3;"), e.add(".gantt_default_rowheader,.gantt_default_corner", "color: #333;background: #f3f3f3;"), e.add(".gantt_default_rowheader.gantt_default_rowheader_selected", "background-color: #aaa;background-image: -webkit-gradient(linear, 0 100%, 100% 0,color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".gantt_default_rowheader_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;padding: 2px;"), e.add(".gantt_default_timeheadergroup, .gantt_default_timeheadercol", "text-align: center;"), e.add(".gantt_default_timeheadergroup_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #aaa;border-bottom: 1px solid #aaa;"), e.add(".gantt_default_timeheadercol_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #aaa;"), e.add(".gantt_default_divider, .gantt_default_splitter", "background-color: #aaa;"), e.add(".gantt_default_divider_horizontal", "background-color: #aaa;"), e.add(".gantt_default_matrix_vertical_line", "background-color: #eee;"), e.add(".gantt_default_matrix_vertical_break", "background-color: #000;"), e.add(".gantt_default_matrix_horizontal_line", "background-color: #eee;"), e.add(".gantt_default_resourcedivider", "background-color: #aaa;"), e.add(".gantt_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;"), e.add(".gantt_default_event", "font-size:12px;color:#666;"), e.add(".gantt_default_event_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;padding:5px 2px 2px 2px;overflow:hidden;border:1px solid #ccc;"), e.add(".gantt_default_event_bar", "top:0px;left:0px;right:0px;height:4px;background-color:#9dc8e8;"), e.add(".gantt_default_event_bar_inner", "position:absolute;height:4px;background-color:#1066a8;"), e.add(".gantt_default_event_inner", 'background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".gantt_default_event_float_inner", "padding:6px 2px 2px 8px;"), e.add(".gantt_default_event_float_inner:after", 'content:"";border-color: transparent #666 transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:8px;left:-4px;'), e.add(".gantt_default_columnheader_inner", "font-weight: bold;"), e.add(".gantt_default_columnheader_splitter", "background-color: #666;opacity: 0.5;filter: alpha(opacity=50);"), e.add(".gantt_default_columnheader_cell_inner", "padding: 2px;"), e.add(".gantt_default_cell", "background-color: #f9f9f9;"), e.add(".gantt_default_cell.gantt_default_cell_business", "background-color: #fff;"), e.add(".gantt_default_cell.gantt_default_cell_business.gantt_default_cell_selected,.gantt_default_cell.gantt_default_cell_selected", "background-color: #ccc;background-image: -webkit-gradient(linear, 0 100%, 100% 0,\tcolor-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".gantt_default_tree_image_no_children", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLzEyzsCJAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAADBJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOL31MeLxHwCeXUT0WkFMKAAAAABJRU5ErkJggg==);"), e.add(".gantt_default_tree_image_expand", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLyUoFBT0AAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAFJJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeRhgJGREc4GijMBtTNgA0BxFog+uA4IA2gmUJwFog/IgUhAGBB9KPYhA3T74Jog+hjx+A8A1KRQ+AN5vcwAAAAASUVORK5CYII=);"), e.add(".gantt_default_tree_image_collapse", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLxB+p9DXAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAENJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOAtEHyMjI7IE0EygOAtEH5CDqY9c+xjx+A8ANndK9WaZlP4AAAAASUVORK5CYII=);"), e.add(".gantt_default_event_move_left", 'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".gantt_default_event_move_right", 'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".gantt_default_event_delete", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; -ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)';cursor: pointer;"), e.add(".gantt_default_event_delete:hover", "opacity: 1;-ms-filter: none;"), e.add(".gantt_default_rowmove_handle", "background-repeat: no-repeat; background-position: center center; background-color: #ccc; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAYAAACT+/8OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAClJREFUGFdj+P//P4O9vX2Bg4NDP4gNFgBytgPxebgAMsYuQGMz/jMAAFsTZDPYJlDHAAAAAElFTkSuQmCC); cursor: move;"), e.add(".gantt_default_rowmove_source", "background-color: black; opacity: 0.2;"), e.add(".gantt_default_rowmove_position_before, .gantt_default_rowmove_position_after", "background-color: #999; height: 2px;"), e.add(".gantt_default_rowmove_position_child", "margin-left: 10px; background-color: #999; height: 2px;"), e.add(".gantt_default_rowmove_position_child:before", "content: '+'; color: #999; position: absolute; top: -8px; left: -10px;"), e.add(".gantt_default_rowmove_position_forbidden", "background-color: red; height: 2px; margin-left: 10px;");
				e.add(".gantt_default_rowmove_position_forbidden:before", "content: 'x'; color: red; position: absolute; top: -8px; left: -10px;");
				e.add(".gantt_default_task_group .gantt_default_event_inner", "position:absolute;top:5px;left:0px;right:0px;bottom:6px;overflow:hidden; background: #1155cc; filter: none; border: 0px none;"), e.add(".gantt_default_task_group.gantt_default_event:before", "content:''; border-color: transparent transparent transparent #1155cc; border-style: solid; border-width: 6px; position: absolute; bottom: 0px;"), e.add(".gantt_default_task_group.gantt_default_event:after", "content:''; border-color: transparent #1155cc transparent transparent; border-style: solid; border-width: 6px; position: absolute; bottom: 0px; right: 0px;"), e.add(".gantt_default_task_milestone .gantt_default_event_inner", "position:absolute;top:16%;left:16%;right:16%;bottom:16%; background: #38761d; border: 0px none; -webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg); transform: rotate(45deg); filter: none;"), e.add(".gantt_default_browser_ie8 .gantt_default_task_milestone .gantt_default_event_inner", "-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(SizingMethod='auto expand', M11=0.7071067811865476, M12=-0.7071067811865475, M21=0.7071067811865475, M22=0.7071067811865476);\""), e.add(".gantt_default_event_left", "white-space: nowrap; padding-top: 5px; color: #666; cursor: default;"), e.add(".gantt_default_event_right", "white-space: nowrap; padding-top: 5px; color: #666; cursor: default;"), e.add(".gantt_default_link_horizontal", "border-bottom-style: solid; border-bottom-color: red;"), e.add(".gantt_default_link_vertical", "border-right-style: solid; border-right-color: red;"), e.add(".gantt_default_link_arrow_right:before", "content: ''; border-width: 6px; border-color: transparent transparent transparent red; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".gantt_default_link_arrow_left:before", "content: ''; border-width: 6px; border-color: transparent red transparent transparent; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".gantt_default_link_arrow_down:before", "content: ''; border-width: 6px; border-color: red transparent transparent transparent; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".gantt_default_link_arrow_up:before", "content: ''; border-width: 6px; border-color: transparent transparent red transparent; border-style: solid; width: 0px; height:0px; position: absolute;"), e.add(".gantt_default_shadow_overlap .gantt_default_shadow_inner", "background-color: red;"), e.add(".gantt_default_block", "background-color: gray; opacity: 0.5; filter: alpha(opacity=50);"), e.add(".gantt_default_link_hover", "box-shadow: 0px 0px 2px 2px rgba(255, 0, 0, 0.3)"), e.add(".gantt_default_main .gantt_default_header_icon", "box-sizing: border-box; border: 1px solid #aaa; background-color: #f5f5f5; color: #000;"), e.add(".gantt_default_header_icon:hover", "background-color: #ccc;"), e.add(".gantt_default_header_icon_hide:before", "content: '\\00AB';"), e.add(".gantt_default_header_icon_show:before", "content: '\\00BB';"), e.add(".gantt_default_row_new .gantt_default_rowheader_inner", "cursor: text; background-position: 0 50%; background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABUSURBVChTY0ACslAaK2CC0iCQDMSlECYmQFYIAl1AjFUxukIQwKoYm0IQwFCMSyEIaEJpMMClcD4Qp0CYEIBNIUzRPzAPCtAVYlWEDgyAGIdTGBgAbqEJYyjqa3oAAAAASUVORK5CYII=);"), e.add(".gantt_default_row_new .gantt_default_rowheader_inner:hover", "background: white;"), e.add(".gantt_default_rowheader textarea", "padding: 5px;"), e.add(".gantt_default_rowheader_scroll", "cursor: default;"), e.add(".gantt_default_shadow_forbidden .gantt_default_shadow_inner", "background-color: red;"), e.add(".gantt_default_event_moving_source", "opacity: 0.5; filter: alpha(opacity=50);"), e.add(".gantt_default_event.gantt_default_event_version .gantt_default_event_inner", "background-color: #cfdde8;background-image: -webkit-gradient(linear, 0 100%, 100% 0,\tcolor-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".gantt_default_task_group.gantt_default_event_continueleft.gantt_default_event:before", "border:0;"), e.add(".gantt_default_task_group.gantt_default_event_continueleft.gantt_default_event .gantt_default_event_inner:before", 'content:"";border-color: transparent #fff transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:2px;left:-4px;'), e.add(".gantt_default_event_continueleft.gantt_default_event .gantt_default_event_inner", "padding-left: 8px;"), e.add(".gantt_default_event_continueleft.gantt_default_event .gantt_default_event_inner:before", 'content:"";border-color: transparent #000 transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:7px;left:-4px;'), e.add(".gantt_default_task_group.gantt_default_event_continueright.gantt_default_event:after", "border:0;"), e.add(".gantt_default_task_group.gantt_default_event_continueright.gantt_default_event .gantt_default_event_inner:after", 'content:"";border-color: transparent transparent transparent #fff;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:2px;right:-2px;'), e.add(".gantt_default_event_continueright.gantt_default_event .gantt_default_event_inner", "padding-right: 8px;"), e.add(".gantt_default_event_continueright.gantt_default_event .gantt_default_event_inner:after", 'content:"";border-color: transparent transparent transparent #000;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:7px;right:-2px;'), e.add(".gantt_default_linkpoint", "background-color: white; border: 1px solid gray; border-radius: 5px;"), e.add(".gantt_default_linkpoint.gantt_default_linkpoint_hover", "background-color: black;"), e.add(".gantt_default_crosshair_vertical, .gantt_default_crosshair_horizontal, .gantt_default_crosshair_left, .gantt_default_crosshair_top", "background-color: gray; opacity: 0.2; filter: alpha(opacity=20)"), e.add(".kanban_default_main *, .kanban_default_main *:before, .kanban_default_main *:after", "box-sizing: content-box;"), e.add(".kanban_default_main", "box-sizing: content-box; border: 1px solid #c0c0c0;font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;"), e.add(".kanban_default_selected .kanban_default_event_inner", "background: #ddd;"), e.add(".kanban_default_timeheader", "cursor: default;color: #333;"), e.add(".kanban_default_message", "opacity: 0.9;filter: alpha(opacity=90);padding: 10px; color: #ffffff;background: #ffa216;"), e.add(".kanban_default_colheadercell", "color: #333;background: #f3f3f3;"), e.add(".kanban_default_rowheader,.kanban_default_corner", "color: #333;background: #f3f3f3;"), e.add(".kanban_default_rowheader.kanban_default_rowheader_selected", "background-color: #aaa;background-image: -webkit-gradient(linear, 0 100%, 100% 0,color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".kanban_default_rowheader_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #f3f3f3;padding: 2px;"), e.add(".kanban_default_colheadercell", "text-align: center;"), e.add(".kanban_default_colheadercell_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;"), e.add(".kanban_default_divider, .kanban_default_splitter", "background-color: #c0c0c0;"), e.add(".kanban_default_divider_horizontal", "background-color: #c0c0c0;"), e.add(".kanban_default_matrix_vertical_line", "background-color: #eee;"), e.add(".kanban_default_matrix_vertical_break", "background-color: #000;"), e.add(".kanban_default_matrix_horizontal_line", "background-color: #eee;"), e.add(".kanban_default_rowheaderdivider", "background-color: #c0c0c0;"), e.add(".kanban_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;"), e.add(".kanban_default_card", "font-size:12px;color:#333;"), e.add(".kanban_default_card_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;padding:5px 2px 2px 2px;overflow:hidden;border:1px solid #ccc;"), e.add(".kanban_default_card_inner", 'background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'), e.add(".kanban_default_cell", "background-color: #fff;"), e.add(".kanban_default_cell.kanban_default_cell_selected", "background-color: #ccc;background-image: -webkit-gradient(linear, 0 100%, 100% 0,\tcolor-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),\tcolor-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -ms-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);-webkit-background-size: 20px 20px;-moz-background-size: 20px 20px;background-size: 20px 20px;"), e.add(".kanban_default_tree_image_no_children", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLzEyzsCJAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAADBJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOL31MeLxHwCeXUT0WkFMKAAAAABJRU5ErkJggg==);"), e.add(".kanban_default_tree_image_expand", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLyUoFBT0AAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAFJJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeRhgJGREc4GijMBtTNgA0BxFog+uA4IA2gmUJwFog/IgUhAGBB9KPYhA3T74Jog+hjx+A8A1KRQ+AN5vcwAAAAASUVORK5CYII=);"), e.add(".kanban_default_tree_image_collapse", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLxB+p9DXAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAENJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOAtEHyMjI7IE0EygOAtEH5CDqY9c+xjx+A8ANndK9WaZlP4AAAAASUVORK5CYII=);"), e.add(".kanban_default_card_delete", "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; -ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)';cursor: pointer;"), e.add(".kanban_default_card_delete:hover", "opacity: 1;-ms-filter: none;"), e.add(".kanban_default_rowmove_source", "background-color: black; opacity: 0.2;"), e.add(".kanban_default_rowmove_position_before, .kanban_default_rowmove_position_after", "background-color: #999; height: 2px;"), e.add(".kanban_default_rowmove_position_forbidden", "background-color: red; height: 2px; margin-left: 10px;"), e.add(".kanban_default_rowmove_position_forbidden:before", "content: 'x'; color: red; position: absolute; top: -8px; left: -10px;"), e.add(".kanban_default_block", "background-color: gray; opacity: 0.5; filter: alpha(opacity=50);"), e.add(".kanban_default_main .kanban_default_header_icon", "box-sizing: border-box; border: 1px solid #aaa; background-color: #f5f5f5; color: #000;"), e.add(".kanban_default_header_icon:hover", "background-color: #ccc;"), e.add(".kanban_default_header_icon_hide:before", "content: '\\00AB';"), e.add(".kanban_default_header_icon_show:before", "content: '\\00BB';"), e.add(".kanban_default_row_new .kanban_default_rowheader_inner", "cursor: text; background-position: 0px 5px; background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABUSURBVChTY0ACslAaK2CC0iCQDMSlECYmQFYIAl1AjFUxukIQwKoYm0IQwFCMSyEIaEJpMMClcD4Qp0CYEIBNIUzRPzAPCtAVYlWEDgyAGIdTGBgAbqEJYyjqa3oAAAAASUVORK5CYII=);"), e.add(".kanban_default_row_new .kanban_default_rowheader_inner:hover", "background: white;"), e.add(".kanban_default_rowheader textarea", "padding: 3px;"), e.add(".kanban_default_rowheader_scroll", "cursor: default;"), e.add(".kanban_default_card_moving_source", "opacity: 0.5; filter: alpha(opacity=50);"), e.add(".kanban_default_card .kanban_default_card_inner", "padding: 5px 5px 5px 10px;"), e.add(".kanban_default_cell", "background-color: #fff;"), e.add(".kanban_default_rowmove_handle", "opacity: 0.5; background-repeat: no-repeat; background-position: center center; background-color: #ccc; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAYAAACT+/8OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAClJREFUGFdj+P//P4O9vX2Bg4NDP4gNFgBytgPxebgAMsYuQGMz/jMAAFsTZDPYJlDHAAAAAElFTkSuQmCC); cursor: move;"), e.add(".kanban_default_card_header", "font-size: 120%; font-weight: bold;"), e.add(".kanban_default_card_bar", "background-color: #cc0000; cursor:move;"), e.add(".kanban_default_cell.kanban_default_collapsed", "background-color: #eee;"), e.add(".kanban_default_swimlane_collapse", "cursor:pointer; border: 1px solid #ccc; text-align:center;"), e.add(".kanban_default_swimlane_collapse:before", "content: '^';"), e.add(".kanban_default_swimlane_expand", "cursor:pointer; border: 1px solid #ccc; text-align:center;"), e.add(".kanban_default_swimlane_expand:before", "content: '>';"), e.add(".kanban_default_columnmove_handle", "opacity: 0.5; background-repeat: no-repeat; background-position: center center; background-color: #ccc; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAYAAACT+/8OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAClJREFUGFdj+P//P4O9vX2Bg4NDP4gNFgBytgPxebgAMsYuQGMz/jMAAFsTZDPYJlDHAAAAAElFTkSuQmCC); cursor: move;"), e.add(".kanban_default_columnmove_position", "background-color: #333;"), e.add(".kanban_default_crosshair_vertical, .kanban_default_crosshair_horizontal, .kanban_default_crosshair_left, .kanban_default_crosshair_top", "background-color: gray; opacity: 0.2; filter: alpha(opacity=20)"), e.commit(), DayPilot.Global.defaultCss = !0
			}
		}();
		var o = function(e) {
				var t = this;
				this.id = e, this.widths = [], this.titles = [], this.height = null, this.splitterWidth = 3, this.css = {}, this.css.title = null, this.css.titleInner = null, this.css.splitter = null, this.blocks = [], this.drag = {}, this.updated = function() {}, this.updating = function() {}, this.init = function() {
					var i;
					if (!e) throw "error: id not provided";
					if ("string" == typeof e) i = document.getElementById(e);
					else {
						if (!e.appendChild) throw "error: invalid object provided";
						i = e
					}
					this.div = i, this.blocks = [];
					for (var n = 0; n < this.widths.length; n++) {
						var a = document.createElement("div");
						a.style.display = "inline-block", null !== t.height ? a.style.height = t.height + "px" : a.style.height = "100%", a.style.width = this.widths[n] - this.splitterWidth + "px", a.style.overflow = "hidden", a.style.verticalAlign = "top", a.style.position = "relative", a.setAttribute("unselectable", "on"), a.className = this.css.title, i.appendChild(a);
						var o = document.createElement("div");
						o.innerHTML = this.titles[n], o.setAttribute("unselectable", "on"), o.className = this.css.titleInner, a.appendChild(o);
						var r = document.createElement("div");
						r.style.display = "inline-block", null !== t.height ? r.style.height = t.height + "px" : r.style.height = "100%", r.style.width = this.splitterWidth + "px", r.style.position = "relative", r.appendChild(document.createElement("div")), r.style.cursor = "col-resize", r.setAttribute("unselectable", "on"), r.className = this.css.splitter;
						var l = {};
						l.index = n, l.width = this.widths[n], r.data = l, r.onmousedown = function(e) {
							t.drag.start = DayPilot.page(e), t.drag.data = this.data, t.div.style.cursor = "col-resize", e = e || window.event, e.preventDefault ? e.preventDefault() : e.returnValue = !1
						}, i.appendChild(r);
						var s = {};
						s.section = a, s.handle = r, this.blocks.push(s)
					}
					this.registerGlobalHandlers()
				}, this.updateWidths = function() {
					for (var e = 0; e < this.blocks.length; e++) {
						var t = this.blocks[e],
							i = this.widths[e];
						t.handle.data.width = i, this.m(e)
					}
				}, this.m = function(e) {
					var t = this.blocks[e],
						i = this.widths[e];
					t.section.style.width = i - this.splitterWidth + "px"
				}, this.totalWidth = function() {
					for (var e = 0, t = 0; t < this.widths.length; t++) e += this.widths[t];
					return e
				}, this.gMouseMove = function(e) {
					if (t.drag.start) {
						var i = t.drag.data,
							n = DayPilot.page(e),
							a = n.x - t.drag.start.x,
							o = i.index;
						t.widths[o] = Math.max(5, i.width + a), t.m(o);
						var r = {};
						r.widths = this.widths, r.index = i.index, t.updating(r)
					}
				}, this.gMouseUp = function(e) {
					if (t.drag.start) {
						t.drag.start = null, document.body.style.cursor = "", t.div.style.cursor = "";
						var i = t.drag.data;
						i.width = t.widths[i.index];
						var n = {};
						n.widths = this.widths, n.index = i.index, t.updated(n)
					}
				}, this.dispose = function() {
					DayPilot.list(this.blocks).each(function(e) {
						e.handle.onmousedown = null, DayPilot.de(e.section), DayPilot.de(e.handle)
					}), this.unregisterGlobalHandlers()
				}, this.registerGlobalHandlers = function() {
					DayPilot.re(document, "mousemove", this.gMouseMove), DayPilot.re(document, "mouseup", this.gMouseUp)
				}, this.unregisterGlobalHandlers = function() {
					DayPilot.ue(document, "mousemove", this.gMouseMove), DayPilot.ue(document, "mouseup", this.gMouseUp)
				}
			};
		DayPilot.Splitter = o
	}
}(), DayPilot.JSON = {}, function() {
	function e(e) {
		return e < 10 ? "0" + e : e
	}
	function t(e) {
		return a.lastIndex = 0, a.test(e) ? '"' + e.replace(a, function(e) {
			var t = l[e];
			return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + e + '"'
	}
	function i(e, n) {
		var a, l, d, c, h, u = o,
			f = n[e];
		switch (f && "object" == typeof f && "function" == typeof f.toJSON && !f.ignoreToJSON && (f = f.toJSON(e)), "function" == typeof s && (f = s.call(n, e, f)), typeof f) {
		case "string":
			return t(f);
		case "number":
			return isFinite(f) ? String(f) : "null";
		case "boolean":
		case "null":
			return String(f);
		case "object":
			if (!f) return "null";
			if (o += r, h = [], "number" == typeof f.length && !f.propertyIsEnumerable("length")) {
				for (c = f.length, a = 0; a < c; a += 1) h[a] = i(a, f) || "null";
				return d = 0 === h.length ? "[]" : o ? "[\n" + o + h.join(",\n" + o) + "\n" + u + "]" : "[" + h.join(",") + "]", o = u, d
			}
			if (s && "object" == typeof s) for (c = s.length, a = 0; a < c; a += 1) l = s[a], "string" == typeof l && (d = i(l, f), d && h.push(t(l) + (o ? ": " : ":") + d));
			else for (l in f) Object.hasOwnProperty.call(f, l) && (d = i(l, f), d && h.push(t(l) + (o ? ": " : ":") + d));
			return d = 0 === h.length ? "{}" : o ? "{\n" + o + h.join(",\n" + o) + "\n" + u + "}" : "{" + h.join(",") + "}", o = u, d
		}
	}
	"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "Z" : null
	}), "function" != typeof String.prototype.toJSON && (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
		return this.valueOf()
	});
	var n = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		a = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		o, r, l = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		s;
	DayPilot.JSON.stringify = function(e, t, n) {
		if ("undefined" != typeof JSON && JSON.stringify) return JSON.stringify(e, t, n);
		var a;
		if (o = "", r = "", "number" == typeof n) for (a = 0; a < n; a += 1) r += " ";
		else "string" == typeof n && (r = n);
		if (s = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
		console.log("throw1");
		return i("", {
			"": e
		})
	}, DayPilot.JSON.parse = function(e, t) {
		function i(e, n) {
			var a, o, r = e[n];
			if (r && "object" == typeof r) for (a in r) Object.prototype.hasOwnProperty.call(r, a) && (o = i(r, a), void 0 !== o ? r[a] = o : delete r[a]);
			return t.call(e, n, r)
		}
		var a;
		if (e = String(e), n.lastIndex = 0, n.test(e) && (e = e.replace(n, function(e) {
			return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
		})), /^[\],:{}\s]*$/.test(e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return a = eval("(" + e + ")"), "function" == typeof t ? i({
			"": a
		}, "") : a;
		throw new SyntaxError("JSON.parse")
		console.log("throw2");
	}, "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	if ("undefined" == typeof DayPilot.Bubble) {
		var e = {};
		e.mouseMove = function(t) {
			if ("undefined" != typeof e) {
				e.mouse = e.mousePosition(t);
				var i = e.active;
				if (i && i.n.showPosition) {
					var n = i.n.showPosition,
						a = e.mouse;
					n.clientX !== a.clientX || n.clientY !== a.clientY
				}
			}
			myParamE = e;
		}, e.touchPosition = function(e) {
			if (!e || !e.touches) return null;
			var t = e.touches[0],
				i = {};
			return i.x = t.pageX, i.y = t.pageY, i.clientX = t.clientX, i.clientY = t.clientY, i
		}, e.mousePosition = function(e) {
			var t = DayPilot.mo3(document.body, e);
			return e && (t.clientY = e.clientY, t.clientX = e.clientX), t
		}, e.cancelShowing = function() {
			e.timeoutShow && (window.clearTimeout(e.timeoutShow), e.timeoutShow = null, e.showing = null);
		}, e.cancelHiding = function() {
			e.timeoutHide && window.clearTimeout(e.timeoutHide);
		}, e.hideActive = function() {
			e.cancelHiding();
			var t = e.active;
			t && (t.removeDiv(), t.removeShadow()), e.active = null;
		}, e.CallBackArgs = function(e, t, i, n) {
			this.calendar = e, this.type = t, this.object = i, this.staticHTML = n, this.toJSON = function() {
				var e = {};
				return e.uid = this.calendar.uniqueID, e.type = this.type, e.object = i, e
			}
		},DayPilot.Bubble = function(t) {
			this.v = "3058";
			var i = this,
				n = {};
			if (this.cssOnly = !0, this.hideAfter = 500, this.loadingText = "Loading...", this.animated = !0, this.animation = "fast", this.position = "EventTop", this.hideOnClick = !0, this.showAfter = 500, this.showLoadingLabel = !0, this.zIndex = 10, this.theme = "bubble_default", this.n = function() {}, this.callBack = function(e) {
				this.aspnet() ? WebForm_DoCallback(this.uniqueID, DayPilot.JSON.stringify(e), this.updateView, this, this.callbackError, !0) : e.calendar.internal.bubbleCallBack ? e.calendar.internal.bubbleCallBack(e, this) : e.calendar.bubbleCallBack(e, this)
			}, this.callbackError = function(e, t) {
				alert(e);
			}, this.updateView = function(t, a) {
				if (i !== a) throw "Callback object mismatch (internal error)";
				return t ? (e.active = i, void(i && (n.div && (n.div.firstChild.innerHTML = t), i.adjustPosition(), i.animated || i.addShadow()))) : (i.removeDiv(), void i.removeShadow())
			}, this.init = function() {}, this.aspnet = function() {
				return "undefined" != typeof WebForm_DoCallback
			}, this.rounded = function() {
				return "Rounded" === this.corners
			}, this.showEvent = function(t, i) {
				var n = new e.CallBackArgs(t.calendar || t.root, "Event", t, t.bubbleHtml ? t.bubbleHtml() : null);
				i ? this.show(n) : this.showOnMouseOver(n)
			}, this.showCell = function(t) {
				e.cancelShowing();
				var i = new e.CallBackArgs(t.calendar || t.root, "Cell", t, t.staticBubbleHTML ? t.staticBubbleHTML() : null);
				this.showOnMouseOver(i)
			}, this.showTime = function(t) {
				var i = new e.CallBackArgs(t.calendar || t.root, "Time", t, t.staticBubbleHTML ? t.staticBubbleHTML() : null);
				this.showOnMouseOver(i)
			}, this.showResource = function(t, i) {
				var n = {};
				n.calendar = t.calendar, n.id = t.id, t.bubbleHtml ? n.bubbleHtml = function() {
					return t.bubbleHtml
				} : t.data && t.data.bubbleHtml && (n.bubbleHtml = function() {
					return t.data.bubbleHtml
				}), n.toJSON = function() {
					var e = {};
					return e.id = this.id, e
				};
				var a = new e.CallBackArgs(n.calendar || n.root, "Resource", n, n.bubbleHtml ? n.bubbleHtml() : null);
				i ? this.show(a) : this.showOnMouseOver(a)
			}, this.p = function(e) {
				return {}
			}, this.showHtml = function(t, i) {
				var n = new e.CallBackArgs(null, "Html", null, t);
				n.div = i, this.show(n)
			}, this.show = function(t) {
				var a = this.animated;
				var e = myParamE;
				if (this.n.showPosition = e.mouse, !e.mouse) return void setTimeout(function() {
					i.show(t)
				}, 100);
				var o;
				try {
					o = DayPilot.JSON.stringify(t.object)
				} catch (e) {
					return
				}
				if (!(e.active === this && this.n.sourceId === o || "undefined" != typeof DayPilot.Menu && DayPilot.Menu.active)) {
					i.cssOnly || (i.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), e.hideActive(), e.active = this, this.n.sourceId = o;
					var r = document.createElement("div");
					r.setAttribute("unselectable", "on"), r.style.position = "absolute", this.showLoadingLabel || (r.style.display = "none"), this.cssOnly ? r.className = this.q("_main") : (this.width && (r.style.width = this.width), r.style.cursor = "default"), r.style.top = "0px", r.style.left = "0px", r.style.zIndex = this.zIndex + 1, a && (r.style.visibility = "hidden"), this.hideOnClick && (r.onclick = function() {
						e.hideActive()
					}), r.onmousemove = function(t) {
						e.cancelHiding();
						var t = t || window.event;
						t.cancelBubble = !0
					}, r.oncontextmenu = function() {
						return !1
					}, r.onmouseout = function() {
						i.delayedHide()
					};
					var l = document.createElement("div");
					r.appendChild(l), this.cssOnly ? l.className = this.q("_main_inner") : (l.style.padding = "4px", this.border && (l.style.border = this.border), this.rounded() && (l.style.MozBorderRadius = "5px", l.style.webkitBorderRadius = "5px", l.style.borderRadius = "5px"), l.style.backgroundColor = this.backgroundColor), l.innerHTML = this.loadingText, document.body.appendChild(r), n.div = r;
					var r = this.getDiv(t);
					if ("EventTop" === this.position && r) {
						var s = DayPilot.abs(r, !0),
							d = DayPilot.abs(document.body, !0);
						this.n.mouse = e.mouse, this.n.mouse.x = s.x - d.x, this.n.mouse.y = s.y - d.y, this.n.mouse.h = s.h + 2, this.n.mouse.w = s.w
					} else this.n.mouse = e.mouse;
					if (this.showLoadingLabel && !a && (this.adjustPosition(), this.addShadow()), t.staticHTML && "function" != typeof this.onLoad) this.updateView(t.staticHTML, this);
					else if ("function" == typeof this.onLoad) {
						var c = {};
						c.source = t.object, c.async = !1, c.html = t.staticHTML, c.loaded = function() {
							this.async && i.updateView(c.html, i)
						}, this.onLoad(c), c.async || i.updateView(c.html, i)
					} else this.r(t) && this.callBack(t)
				}
			}, this.getDiv = function(e) {
				return e.div ? e.div : "Event" === e.type && e.calendar && e.calendar.internal.findEventDiv ? e.calendar.internal.findEventDiv(e.object) : void 0
			}, this.q = function(e) {
				var t = this.theme || this.cssClassPrefix;
				return t ? t + e : ""
			}, this.loadingElement = null, this.loadingStart = function(e) {}, this.loadingStop = function() {}, this.adjustPosition = function() {
				var t = this.animated,
					a = this.position,
					o = 10;
				if (n.div && this.n.mouse) {
					if (!this.n.mouse.x || !this.n.mouse.y) return void e.hideActive();
					var r = n.div;
					r.style.display = "";
					var l = r.offsetHeight,
						s = r.offsetWidth;
					r.style.display = "none";
					var d = DayPilot.wd(),
						c = d.width,
						h = d.height;
					if ("Mouse" === a) {
						var u = 0;
						if (this.n.mouse.clientY > h - l + o) {
							this.n.mouse.clientY - (h - l) + o;
							u = this.n.mouse.y - l - 10
						} else u = this.n.mouse.y + 22;
						if ("number" == typeof u && (r.style.top = Math.max(u, 0) + "px"), this.n.mouse.clientX > c - s + o) {
							var f = this.n.mouse.clientX - (c - s) + o;
							r.style.left = this.n.mouse.x - f + "px"
						} else r.style.left = this.n.mouse.x + "px"
					} else if ("EventTop" === a) {
						var v = 2,
							u = this.n.mouse.y - l - v,
							p = d.scrollTop;
						u < p && (u = this.n.mouse.y + this.n.mouse.h + v), "number" == typeof u && (r.style.top = Math.max(u, 0) + "px");
						var g = this.n.mouse.x;
						this.n.mouse.x + s + o > c && (g = c - s - o), r.style.left = g + "px"
					}
					if (r.style.display = "", t) {
						r.style.display = "";
						var m = {};
						m.color = r.firstChild.style.color, m.overflow = r.style.overflow, r.firstChild.style.color = "transparent", r.style.overflow = "hidden", this.removeShadow(), DayPilot.pop(r, {
							"finished": function() {
								r.firstChild.style.color = m.color, r.style.overflow = m.overflow, i.addShadow()
							},
							"vertical": "bottom",
							"horizontal": "left",
							"animation": i.animation
						})
					}
				}
			}, this.delayedHide = function() {
				e.showing == this && e.cancelShowing();
				var t = e.active;
				if (t === this && (e.cancelHiding(), t.hideAfter > 0)) {
					var i = t.hideAfter;
					e.timeoutHide = window.setTimeout(e.hideActive, i)
				}
			}, this.showOnMouseOver = function(t) {
				var n = function(e) {
						return function() {
							i.show(e)
						}
					};
				clearTimeout(e.timeoutShow), e.timeoutShow = window.setTimeout(n(t), this.showAfter), e.showing = this
			}, this.hideOnMouseOut = function() {
				this.delayedHide()
			}, this.r = function(e) {
				return !!e.calendar.backendUrl || !("function" != typeof WebForm_DoCallback || !this.uniqueID)
			}, this.addShadow = function() {
				if (this.useShadow && !this.cssOnly && n.div) {
					var e = n.div;
					this.shadows && this.shadows.length > 0 && this.removeShadow(), this.shadows = [];
					for (var t = 0; t < 5; t++) {
						var i = document.createElement("div");
						i.setAttribute("unselectable", "on"), i.style.position = "absolute", i.style.width = e.offsetWidth + "px", i.style.height = e.offsetHeight + "px", i.style.top = e.offsetTop + t + "px", i.style.left = e.offsetLeft + t + "px", i.style.zIndex = this.zIndex, i.style.filter = "alpha(opacity:10)", i.style.opacity = .1, i.style.backgroundColor = "#000000", this.rounded() && (i.style.MozBorderRadius = "5px", i.style.webkitBorderRadius = "5px", i.style.borderRadius = "5px"), document.body.appendChild(i), this.shadows.push(i)
					}
				}
			}, this.removeShadow = function() {
				if (this.shadows) {
					for (var e = 0; e < this.shadows.length; e++) document.body.removeChild(this.shadows[e]);
					this.shadows = []
				}
			}, this.removeDiv = function() {
				n.div && (document.body.removeChild(n.div), n.div = null)
			}, t) for (var a in t) this[a] = t[a];
			this.init()
		}, DayPilot.Bubble.touchPosition = function(t) {
			t.touches && (e.mouse = e.touchPosition(t))
		}, DayPilot.re(document, "mousemove", e.mouseMove), DayPilot.Bubble.hideActive = e.hideActive, DayPilot.Bubble.cancelShowing = e.cancelShowing, "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	if ("undefined" == typeof DayPilot.Calendar) {
		DayPilot.Calendar = function(t, i) {
			this.v = "3058";
			var n = !1;
			if (this instanceof DayPilot.Calendar && !this.s && (n = !0, this.s = !0), !n) throw "DayPilot.Calendar() is a constructor and must be called as 'var c = new DayPilot.Calendar(id);'";
			var a = this;
			this.uniqueID = null, this.id = t, this.isCalendar = !0, this.api = 2, this.clientName = t, this.clientState = {}, this.t = {}, this.t.pixels = {}, this.t.events = [], this.elements = {}, this.elements.events = [], this.elements.separators = [], this.elements.selection = [], this.nav = {}, this.events = {}, this.hideUntilInit = !0, this.u = !0, this.allDayEnd = "DateTime", this.allDayEventHeight = 25, this.allowMultiSelect = !0, this.autoRefreshCommand = "refresh", this.autoRefreshEnabled = !1, this.autoRefreshInterval = 60, this.autoRefreshMaxCount = 20, this.backendUrl = null, this.borderColor = "#000000", "function" == typeof DayPilot.Bubble ? (this.bubble = new DayPilot.Bubble, this.cellBubble = new DayPilot.Bubble, this.columnBubble = new DayPilot.Bubble) : (this.bubble = null, this.cellBubble = null, this.columnBubble = null), this.businessBeginsHour = 9, this.businessEndsHour = 18, this.cellBackColor = "#FFFFD5", this.cellBackColorNonBusiness = "#FFF4BC", this.cellBorderColor = "#999999", this.cellHeight = 20, this.cellDuration = 30, this.columnMarginRight = 5, this.columns = null, this.columnWidth = 200, this.columnWidthSpec = "Auto", this.contextMenu = null, this.contextMenuSelection = null, this.cornerBackColor = "#ECE9D8", this.cornerHtml = "", this.crosshairColor = "Gray", this.crosshairOpacity = 20, this.crosshairType = "Header", this.cssOnly = !0, this.dayBeginsHour = 0, this.dayEndsHour = 24, this.days = 1, this.durationBarColor = "blue", this.durationBarVisible = !0, this.durationBarWidth = 5, this.durationBarImageUrl = null, this.eventArrangement = "SideBySide", this.eventBackColor = "#ffffff", this.eventBorderColor = "#000000", this.eventFontFamily = "Tahoma", this.eventFontSize = "8pt", this.eventFontColor = "#000000", this.eventSelectColor = "blue", this.eventsLoadMethod = "GET", this.headerFontSize = "10pt", this.headerFontFamily = "Tahoma", this.headerFontColor = "#000000", this.headerHeight = 20, this.headerLevels = 1, this.height = 300, this.heightSpec = "BusinessHours", this.hideFreeCells = !1, this.headerDateFormat = null, this.hourHalfBorderColor = "#F3E4B1", this.hourBorderColor = "#EAD098", this.hourFontColor = "#000000", this.hourFontFamily = "Tahoma", this.hourFontSize = "16pt", this.hourNameBackColor = "#ECE9D8", this.hourNameBorderColor = "#ACA899", this.hourWidth = 45, this.initScrollPos = null, this.loadingLabelText = "Loading...", this.loadingLabelVisible = !0, this.loadingLabelBackColor = "orange", this.loadingLabelFontColor = "#ffffff", this.loadingLabelFontFamily = "Tahoma", this.loadingLabelFontSize = "10pt", this.locale = "en-us", this.messageHideAfter = 5e3, this.moveBy = "Full", this.notifyCommit = "Immediate", this.roundedCorners = !1, this.rtl = !1, this.scrollLabelsVisible = !1, this.selectedColor = "#316AC5", this.shadow = "Fill", this.showToolTip = !0, this.showAllDayEvents = !1, this.showAllDayEventStartEnd = !0, this.showEventStartEnd = !1, this.showHeader = !0, this.showHours = !0, this.showCurrentTime = !0, this.showCurrentTimeMode = "Day", this.showCurrentTimeOffset = 0, this.startDate = DayPilot.Date.today(), this.cssClassPrefix = "calendar_default", this.tapAndHoldTimeout = 300, this.theme = null, this.timeFormat = "Auto", this.timeHeaderCellDuration = 60, this.timeRangeSelectingStartEndEnabled = !1, this.timeRangeSelectingStartEndFormat = "Auto", this.useEventBoxes = "Always", this.viewType = "Days", this.visible = !0, this.weekStarts = null, this.width = null, this.eventClickHandling = "Enabled", this.eventDoubleClickHandling = "Disabled", this.eventRightClickHandling = "ContextMenu", this.eventDeleteHandling = "Disabled", this.eventEditHandling = "Update", this.eventHoverHandling = "Bubble", this.eventResizeHandling = "Update", this.eventMoveHandling = "Update", this.eventSelectHandling = "Update", this.eventTapAndHoldHandling = "Move", this.headerClickHandling = "Enabled", this.timeRangeTapAndHoldHandling = "Select", this.timeRangeSelectedHandling = "Enabled", this.timeRangeDoubleClickHandling = "Disabled", this.timeRangeRightClickHandling = "ContextMenu", this.onTimeRangeRightClick = null, this.onTimeRangeRightClicked = null, this.onEventFilter = null, this.onBeforeEventRender = null, this.onBeforeEventExport = null, this.onBeforeCellExport = null, this.onBeforeHeaderRender = null, this.onBeforeHeaderExport = null, this.onBeforeTimeHeaderRender = null, this.z = !0, this.A = !1, this.B = 0, this.doubleClickTimeout = 300, this.members = {}, this.members.obsolete = ["Init", "cleanSelection", "cssClassPrefix", "cssOnly", "clientName", "uniqueID"], this.members.ignore = ["internal", "nav", "debug", "temp", "elements", "members"], this.members.noCssOnly = ["allDayEventBorderColor", "allDayEventFontColor", "allDayEventFontFamily", "allDayEventFontSize", "borderColor", "cellBackColor", "cellBackColorNonBusiness", "cellBorderColor", "cornerBackColor", "durationBarColor", "durationBarImageUrl", "eventBackColor", "eventBorderColor", "eventFontColor", "eventFontFamily", "eventFontSize", "eventSelectColor", "headerFontColor", "headerFontFamily", "headerFontSize", "hourBorderColor", "hourFontColor", "hourFontFamily", "hourFontSize", "hourHalfBorderColor", "hourNameBackColor", "hourNameBorderColor", "loadingLabelBackColor", "loadingLabelFontColor", "loadingLabelFontFamily", "loadingLabelFontSize", "roundedCorners", "selectedColor", "shadow", "useEventSelectionBars"], this.C = {}, this.C.ie = navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1, this.C.ie9 = navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE 9") !== -1, this.C.ielt9 = function() {
				var e = document.createElement("div");
				return e.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
			}(), this.C.ff = navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1, this.C.opera105 = function() {
				if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					return new Number(RegExp.$1) >= 10.5
				}
				return !1
			}(), this.C.webkit522 = function() {
				if (/AppleWebKit[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					return new Number(RegExp.$1) >= 522
				}
				return !1
			}(), this.clearSelection = function() {
				return this.selectedCells ? (e.topSelectedCell = null, e.bottomSelectedCell = null, e.selecting = null, this.D(), void(this.selectedCells = [])) : void(this.selectedCells = [])
			}, this.D = function() {
				this.selectedCells && !
				function() {
					DayPilot.de(a.elements.selection), a.elements.selection = []
				}()
			}, this.cleanSelection = this.clearSelection, this.E = function(e, t, i) {
				var n = {};
				n.action = e, n.parameters = i, n.data = t, n.header = this.F();
				var o = "JSON" + DayPilot.JSON.stringify(n);
				__doPostBack(a.uniqueID, o)
			}, this.G = function(e, t, i, n) {
				if (!this.r()) return void a.debug.message("Callback invoked without the server-side backend specified. Callback canceled.", "warning");
				this.callbackTimeout && window.clearTimeout(this.callbackTimeout), "undefined" == typeof n && (n = "CallBack"), this.callbackTimeout = window.setTimeout(function() {
					a.H()
				}, 100);
				var o = {};
				o.action = e, o.type = n, o.parameters = t, o.data = i, o.header = this.F();
				var r = "JSON" + DayPilot.JSON.stringify(o);
				this.backendUrl ? DayPilot.request(this.backendUrl, this.I, r, this.J) : "function" == typeof WebForm_DoCallback && WebForm_DoCallback(this.uniqueID, r, this.K, this.clientName, this.onCallbackError, !0)
			}, this.r = function() {
				return !!this.backendUrl || !("function" != typeof WebForm_DoCallback || !this.uniqueID)
			}, this.J = function(e) {
				if ("function" == typeof a.onAjaxError) {
					var t = {};
					t.request = e, a.onAjaxError(t)
				} else "function" == typeof a.ajaxError && a.ajaxError(e)
			}, this.dispose = function() {
				var t = a;
				t.nav.top && (t.L(), t.M(), t.nav.messageClose && (t.nav.messageClose.onclick = null), t.nav.hourTable && (t.nav.hourTable.oncontextmenu = null), t.nav.hourTable && (t.nav.hourTable.onmousemove = null), t.nav.header && (t.nav.header.oncontextmenu = null), t.nav.corner && (t.nav.corner.oncontextmenu = null), t.nav.zoom.onmousemove = null, t.nav.zoom.oncontextmenu = null, t.nav.scroll.onscroll = null, t.nav.scroll.root = null, DayPilot.pu(t.nav.loading), t.N(), t.O(), t.nav.select = null, t.nav.cornerRight = null, t.nav.scrollable = null, t.nav.bottomLeft = null, t.nav.bottomRight = null, t.nav.allday = null, t.nav.zoom = null, t.nav.loading = null, t.nav.events = null, t.nav.header = null, t.nav.hourTable = null, t.nav.scrolltop = null, t.nav.scroll = null, t.nav.vsph = null, t.nav.main = null, t.nav.message = null, t.nav.messageClose = null, t.nav.top.removeAttribute("style"), t.nav.top.removeAttribute("class"), t.nav.top.innerHTML = "", t.nav.top.dp = null, t.nav.top = null, DayPilot.ue(window, "resize", t.P), e.unregister(t))
			}, this.Q = function() {
				this.nav.top.dispose = this.dispose
			}, this.I = function(e) {
				a.K(e.responseText)
			}, this.F = function() {
				var e = {};
				return e.v = this.v, e.control = "dpc", e.id = this.id, e.clientState = a.clientState, e.columns = this.R(), e.days = a.days, e.startDate = a.startDate, e.cellDuration = a.cellDuration, e.cssClassPrefix = a.cssClassPrefix, e.heightSpec = a.heightSpec, e.businessBeginsHour = a.businessBeginsHour, e.businessEndsHour = a.businessEndsHour, e.viewType = a.viewType, e.dayBeginsHour = a.dayBeginsHour, e.dayEndsHour = a.dayEndsHour, e.headerLevels = a.headerLevels, e.backColor = a.cellBackColor, e.nonBusinessBackColor = a.cellBackColorNonBusiness, e.eventHeaderVisible = a.eventHeaderVisible, e.timeFormat = a.timeFormat, e.timeHeaderCellDuration = a.timeHeaderCellDuration, e.locale = a.locale, e.scrollY = a.scrollPos, e.showAllDayEvents = a.showAllDayEvents, e.tagFields = a.tagFields, e.weekStarts = a.weekStarts, e.hourNameBackColor = a.hourNameBackColor, e.hourFontFamily = a.hourFontFamily, e.hourFontSize = a.hourFontSize, e.hourFontColor = a.hourFontColor, e.selected = a.multiselect.events(), e.hashes = a.hashes, e
			}, this.S = function() {
				this.T(), DayPilot.Areas.hideAll()
			}, this.R = function() {
				var e = [];
				if (e.ignoreToJSON = !0, !this.U) return e;
				for (var t = 0; t < this.U.length; t++) {
					var i = this.U[t],
						n = this.V(i);
					e.push(n)
				}
				return e
			}, this.V = function(e) {
				var t = {};
				return t.Value = e.id, t.Name = e.name, t.ToolTip = e.toolTip, t.Date = e.start, t.Children = this.W(e.children), t
			}, this.W = function(e) {
				var t = [];
				if (t.ignoreToJSON = !0, !e) return t;
				for (var i = 0; i < e.length; i++) t.push(this.V(e[i]));
				return t
			}, this.K = function(e, t) {
				var e = DayPilot.Util.parseJSON(e);
				if (e.BubbleGuid) {
					var i = e.BubbleGuid,
						n = this.bubbles[i];
					return delete this.bubbles[i], a.X(), void("undefined" != typeof e.Result.BubbleHTML && n.updateView(e.Result.BubbleHTML, n))
				}
				if (e.CallBackRedirect) return void(document.location.href = e.CallBackRedirect);
				if ("undefined" != typeof e.ClientState && (a.clientState = e.ClientState), "None" === e.UpdateType) return a.X(), a.Y(e.CallBackData, !0), void(e.Message && a.message(e.Message));
				if (e.VsUpdate) {
					var o = document.createElement("input");
					o.type = "hidden", o.name = a.id + "_vsupdate", o.id = o.name, o.value = e.VsUpdate, a.nav.vsph.innerHTML = "", a.nav.vsph.appendChild(o)
				}
				if (a.M(), a.multiselect.clear(!0), a.multiselect.Z = e.SelectedEvents, "undefined" != typeof e.TagFields && (a.tagFields = e.TagFields), "undefined" != typeof e.SortDirections && (a.sortDirections = e.SortDirections), "Full" === e.UpdateType && (a.colors = e.Colors, a.palette = e.Palette, a.dirtyColors = e.DirtyColors, a.cellProperties = e.CellProperties, a.cellConfig = e.CellConfig, a.columns = e.Columns, a.days = e.Days, a.startDate = new DayPilot.Date(e.StartDate).getDatePart(), a.cellDuration = e.CellDuration, a.heightSpec = e.HeightSpec ? e.HeightSpec : a.heightSpec, a.businessBeginsHour = e.BusinessBeginsHour ? e.BusinessBeginsHour : a.businessBeginsHour, a.businessEndsHour = e.BusinessEndsHour ? e.BusinessEndsHour : a.businessEndsHour, a.viewType = e.ViewType, a.headerLevels = e.HeaderLevels, a.backColor = e.BackColor ? e.BackColor : a.backColor, a.nonBusinessBackColor = e.NonBusinessBackColor ? e.NonBusinessBackColor : a.nonBusinessBackColor, a.eventHeaderVisible = e.EventHeaderVisible ? e.EventHeaderVisible : a.eventHeaderVisible, a.timeFormat = e.TimeFormat ? e.TimeFormat : a.timeFormat, a.timeHeaderCellDuration = "undefined" != typeof e.TimeHeaderCellDuration ? e.TimeHeaderCellDuration : a.timeHeaderCellDuration, a.locale = e.Locale ? e.Locale : a.locale, a.dayBeginsHour = "undefined" != typeof e.DayBeginsHour ? e.DayBeginsHour : a.dayBeginsHour, a.dayEndsHour = "undefined" != typeof e.DayEndsHour ? e.DayEndsHour : a.dayEndsHour, a.cornerBackColor = e.CornerBackColor, a.cornerHtml = e.CornerHTML, a.hours = e.Hours, a._(), a.aa()), e.Hashes) for (var r in e.Hashes) a.hashes[r] = e.Hashes[r];
				if (a.ba(e.Events), a.ca(), ("Full" === e.UpdateType || a.hideFreeCells) && (a.da(), a.ea(), a.fa(), a.ga(), a.ha(), a.ia(), a.ja(), a.ka(), a.clearSelection(), a.la(), "undefined" != typeof e.ScrollY ? a.scrollToY(e.ScrollY) : a.scrollToY(a.initScrollPos)), a.ma(), a.na(), a.oa(), a.pa(), "Parent100Pct" === a.heightSpec && a.P(), "HoldForever" !== a.timeRangeSelectedHandling && a.clearSelection(), a.qa(), a.todo && a.todo.del) {
					var l = a.todo.del;
					l.parentNode.removeChild(l), a.todo.del = null
				}
				a.Y(e.CallBackData, !0), a.X(), a.ra(), e.Message && a.message(e.Message)
			}, this.Y = function(e, t) {
				var i = function(e, t) {
						return function() {
							if (a.sa()) {
								if ("function" == typeof a.onAfterRender) {
									var i = {};
									i.isCallBack = t, i.data = e, a.onAfterRender(i)
								}
							} else a.afterRender && a.afterRender(e, t)
						}
					};
				window.setTimeout(i(e, t), 0)
			}, this.ta = function(e, t, i) {
				var n = a.nav.events,
					o = n.rows[0].cells.length,
					r = n.clientWidth / o,
					l = Math.floor(a.coords.x / r);
				l < 0 && (l = 0), l >= o && (l = o - 1), a.rtl && (l = a.va.length - l - 1);
				var s = n.rows[0].cells[l],
					d = 0,
					c = 0,
					h = 0;
				if ("undefined" != typeof e.duration) {
					var u = e.duration;
					h = Math.floor((a.coords.y - d + a.cellHeight / 2) / a.cellHeight) * a.cellHeight + d, c = u * a.cellHeight / (60 * a.cellDuration), c = Math.max(c, a.cellHeight)
				} else {
					var f = e.event;
					c = f.part.height, h = f.part.top
				}
				var v = document.createElement("div");
				v.setAttribute("unselectable", "on"), v.style.position = "absolute", v.style.width = "100%", v.style.height = c + "px", v.style.left = "0px", v.style.top = h + "px", v.style.zIndex = 101, v.exclude = !0;
				var p = document.createElement("div");
				return v.appendChild(p), v.className = a.q("_shadow"), p.className = this.q("_shadow_inner"), s.events.appendChild(v), v
			}, this.wa = function() {
				return this.xa() / 36e5
			}, this.ya = function() {
				return this.businessBeginsHour > this.businessEndsHour ? 24 - this.businessBeginsHour + this.businessEndsHour : this.businessEndsHour - this.businessBeginsHour
			}, this.za = function() {
				return this.dayBeginsHour >= this.dayEndsHour ? 24 - this.dayBeginsHour + this.dayEndsHour : this.dayEndsHour - this.dayBeginsHour
			}, this.xa = function(e) {
				var t = 0;
				if ("BusinessHoursNoScroll" === this.heightSpec) t = this.ya();
				else if (this.hideFreeCells && !e) {
					var i = (this.Aa - 1) * this.cellDuration / this.cellHeight,
						n = Math.ceil(i / 60),
						a = this.businessBeginsHour > this.businessEndsHour ? this.businessEndsHour + 24 : this.businessEndsHour;
					t = Math.max(this.dayBeginsHour + n, a) - this.Ba()
				} else t = this.za();
				return 60 * t * 60 * 1e3
			}, this.message = function(e, t, i, n) {
				if (e) {
					var o, t = t || this.messageHideAfter || 2e3,
						r = this.Ca(),
						l = this.showHours ? this.hourWidth : 0,
						s = DayPilot.sw(a.Da());
					if (a.rtl) {
						var d = l;
						l = s, s = d
					}
					if (this.nav.message) o = a.nav.message, this.nav.message.style.top = r + "px";
					else {
						o = document.createElement("div"), o.style.position = "absolute", o.style.left = l + "px", o.style.top = r + "px", o.style.right = "0px", o.style.display = "none", o.onmousemove = function() {
							o.messageTimeout && !o.status && clearTimeout(o.messageTimeout)
						}, o.onmouseout = function() {
							"none" !== a.nav.message.style.display && (o.messageTimeout = setTimeout(a.Ea, 500))
						};
						var c = document.createElement("div");
						c.onclick = function() {
							a.nav.message.style.display = "none"
						}, c.className = this.q("_message"), o.appendChild(c);
						var h = document.createElement("div");
						h.style.position = "absolute", h.className = this.q("_message_close"), h.onclick = function() {
							a.nav.message.style.display = "none"
						}, o.appendChild(h), this.nav.top.insertBefore(o, this.nav.loading), this.nav.message = o, this.nav.messageClose = h
					}
					this.nav.cornerRight ? this.nav.message.style.right = s + "px" : this.nav.message.style.right = "0px";
					var u = function() {
							if (a.nav.message) {
								a.nav.message.firstChild.innerHTML = e;
								var i = function() {
										o.messageTimeout = setTimeout(a.Ea, t)
									};
								DayPilot.fade(a.nav.message, .2, i)
							}
						};
					clearTimeout(o.messageTimeout), "none" !== this.nav.message.style.display ? DayPilot.fade(a.nav.message, -.2, u) : u()
				}
			}, this.message.show = function(e) {
				a.message(e)
			}, this.message.hide = function() {
				a.Ea()
			}, this.Ea = function() {
				var e = function() {
						a.nav.message.style.display = "none"
					};
				DayPilot.fade(a.nav.message, -.2, e)
			}, this.ga = function() {
				this.nav.message && (this.nav.message.style.top = this.Ca() + "px")
			}, this.Fa = function() {
				return this.xa() / (6e4 * this.cellDuration)
			}, this.eventClickPostBack = function(e, t) {
				this.E("EventClick", t, e)
			}, this.eventClickCallBack = function(e, t) {
				this.G("EventClick", e, t)
			}, this.Ga = function(e) {
				var t = this,
					e = e || window.event,
					i = e.ctrlKey,
					n = e.metaKey;
				if ("undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), "Disabled" === a.eventDoubleClickHandling) return void a.Ha(t, i, n, e);
				if (a.timeouts) {
					for (var o in a.timeouts) window.clearTimeout(a.timeouts[o]);
					a.timeouts = []
				} else a.timeouts = [];
				var r = function(e, t, i, n) {
						return function() {
							a.Ha(e, t, i, n)
						}
					};
				a.timeouts.push(window.setTimeout(r(this, i, n, e), a.doubleClickTimeout))
			}, this.Ha = function(e, t, i, n) {
				var o = e.event;
				if (o.client.clickEnabled()) if (a.sa()) {
					var r = {};
					if (r.e = o, r.ctrl = t, r.meta = i, r.originalEvent = n, r.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventClick && (a.onEventClick(r), r.preventDefault.value)) return;
					switch (a.eventClickHandling) {
					case "PostBack":
						a.eventClickPostBack(o);
						break;
					case "CallBack":
						a.eventClickCallBack(o);
						break;
					case "Edit":
						a.Ia(e);
						break;
					case "Select":
						a.Ja(e, o, t, i);
						break;
					case "Bubble":
						a.bubble && a.bubble.showEvent(o);
						break;
					case "ContextMenu":
						var l = o.client.contextMenu();
						l ? l.show(o) : a.contextMenu && a.contextMenu.show(o)
					}
					"function" == typeof a.onEventClicked && a.onEventClicked(r)
				} else switch (a.eventClickHandling) {
				case "PostBack":
					a.eventClickPostBack(o);
					break;
				case "CallBack":
					a.eventClickCallBack(o);
					break;
				case "JavaScript":
					a.onEventClick(o);
					break;
				case "Edit":
					a.Ia(e);
					break;
				case "Select":
					a.Ja(e, o, t, i);
					break;
				case "Bubble":
					a.bubble && a.bubble.showEvent(o);
					break;
				case "ContextMenu":
					var l = o.client.contextMenu();
					l ? l.show(o) : a.contextMenu && a.contextMenu.show(o)
				}
			}, this.eventDoubleClickPostBack = function(e, t) {
				this.E("EventDoubleClick", t, e)
			}, this.eventDoubleClickCallBack = function(e, t) {
				this.G("EventDoubleClick", e, t)
			}, this.Ka = function(e) {
				if ("undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), a.timeouts) {
					for (var t in a.timeouts) window.clearTimeout(a.timeouts[t]);
					a.timeouts = null
				}
				var i = this.event,
					e = e || window.event;
				if (a.sa()) {
					var n = {};
					if (n.e = i, n.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventDoubleClick && (a.onEventDoubleClick(n), n.preventDefault.value)) return;
					switch (a.eventDoubleClickHandling) {
					case "PostBack":
						a.eventDoubleClickPostBack(i);
						break;
					case "CallBack":
						a.eventDoubleClickCallBack(i);
						break;
					case "Edit":
						i.allday() || a.Ia(this);
						break;
					case "Select":
						i.allday() || a.Ja(this, i, e.ctrlKey);
						break;
					case "Bubble":
						a.bubble && a.bubble.showEvent(i)
					}
					"function" == typeof a.onEventDoubleClicked && a.onEventDoubleClicked(n)
				} else switch (a.eventDoubleClickHandling) {
				case "PostBack":
					a.eventDoubleClickPostBack(i);
					break;
				case "CallBack":
					a.eventDoubleClickCallBack(i);
					break;
				case "JavaScript":
					a.onEventDoubleClick(i);
					break;
				case "Edit":
					i.allday() || a.Ia(this);
					break;
				case "Select":
					i.allday() || a.Ja(this, i, e.ctrlKey);
					break;
				case "Bubble":
					a.bubble && a.bubble.showEvent(i)
				}
			}, this.eventRightClickPostBack = function(e, t) {
				this.E("EventRightClick", t, e)
			}, this.eventRightClickCallBack = function(e, t) {
				this.G("EventRightClick", e, t)
			}, this.La = function(e) {
				var t = this.event;
				if (e.stopPropagation && e.stopPropagation(), !t.client.rightClickEnabled()) return !1;
				if (a.sa()) {
					var i = {};
					if (i.e = t, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventRightClick && (a.onEventRightClick(i), i.preventDefault.value)) return !1;
					switch (a.eventRightClickHandling) {
					case "PostBack":
						a.eventRightClickPostBack(t);
						break;
					case "CallBack":
						a.eventRightClickCallBack(t);
						break;
					case "ContextMenu":
						var n = t.client.contextMenu();
						n ? n.show(t) : a.contextMenu && a.contextMenu.show(this.event);
						break;
					case "Bubble":
						a.bubble && a.bubble.showEvent(t)
					}
					"function" == typeof a.onEventRightClicked && a.onEventRightClicked(i)
				} else switch (a.eventRightClickHandling) {
				case "PostBack":
					a.eventRightClickPostBack(t);
					break;
				case "CallBack":
					a.eventRightClickCallBack(t);
					break;
				case "JavaScript":
					a.onEventRightClick(t);
					break;
				case "ContextMenu":
					var n = t.client.contextMenu();
					n ? n.show(t) : a.contextMenu && a.contextMenu.show(this.event);
					break;
				case "Bubble":
					a.bubble && a.bubble.showEvent(t)
				}
				return e.preventDefault && e.preventDefault(), !1
			}, this.headerClickPostBack = function(e, t) {
				this.E("HeaderClick", t, e)
			}, this.headerClickCallBack = function(e, t) {
				this.G("HeaderClick", e, t)
			}, this.Ma = function(t) {
				var i = this.data,
					n = new e.Column(i.id, i.name, i.start);
				if (a.sa()) {
					var o = {};
					if (o.header = {}, o.header.id = i.id, o.header.name = i.name, o.header.start = i.start, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onHeaderClick && (a.onHeaderClick(o), o.preventDefault.value)) return;
					switch (a.headerClickHandling) {
					case "PostBack":
						a.headerClickPostBack(n);
						break;
					case "CallBack":
						a.headerClickCallBack(n)
					}
					"function" == typeof a.onHeaderClicked && a.onHeaderClicked(o)
				} else switch (a.headerClickHandling) {
				case "PostBack":
					a.headerClickPostBack(n);
					break;
				case "CallBack":
					a.headerClickCallBack(n);
					break;
				case "JavaScript":
					a.onHeaderClick(n);
				}
			}, this.Na = function() {
				if ("undefined" != typeof DayPilot.Bubble && a.columnBubble) if ("Resources" === a.viewType) {
					var t = {};
					t.calendar = a, t.id = this.data.id, t.toJSON = function() {
						var e = {};
						return e.id = this.id, e
					}, a.columnBubble.showResource(t)
				} else {
					var i = new DayPilot.Date(this.data.start),
						n = i.addDays(1),
						o = {};
					o.calendar = a, o.start = i, o.end = n, o.toJSON = function() {
						var e = {};
						return e.start = this.start, e.end = this.end, e
					}, a.columnBubble.showTime(o)
				}
				var r = this,
					l = r.firstChild;
				if (!l.active) {
					var s = r.data,
						d = new e.Column(s.id, s.name, s.start);
					d.areas = r.data.areas, DayPilot.Areas.showAreas(l, d)
				}
			}, this.Oa = function(e) {
				"undefined" != typeof DayPilot.Bubble && a.columnBubble && a.columnBubble.hideOnMouseOut(), DayPilot.Areas.hideAreas(this.firstChild, e)
			}, this.eventDeletePostBack = function(e, t) {
				this.E("EventDelete", t, e)
			}, this.eventDeleteCallBack = function(e, t) {
				this.G("EventDelete", e, t)
			};
			this.Pa = function(e) {
				var t;
				if (t = e && e.isEvent ? e : e.parentNode.parentNode.event, a.sa()) {
					var i = {};
					if (i.e = t, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventDelete && (a.onEventDelete(i), i.preventDefault.value)) return;
					switch (a.eventDeleteHandling) {
					case "PostBack":
						a.eventDeletePostBack(t);
						break;
					case "CallBack":
						a.eventDeleteCallBack(t);
						break;
					case "Update":
						a.events.remove(t)
					}
					"function" == typeof a.onEventDeleted && a.onEventDeleted(i)
				} else switch (a.eventDeleteHandling) {
				case "PostBack":
					a.eventDeletePostBack(t);
					break;
				case "CallBack":
					a.eventDeleteCallBack(t);
					break;
				case "JavaScript":
					a.onEventDelete(t)
				}
			};
			this.eventResizePostBack = function(e, t, i, n) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var a = {};
				a.e = e, a.newStart = t, a.newEnd = i, this.E("EventResize", n, a)
			}, this.eventResizeCallBack = function(e, t, i, n) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var a = {};
				a.e = e, a.newStart = t, a.newEnd = i, this.G("EventResize", a, n)
			}, this.Qa = function(e, t, i, n) {
				if ("PostBack" === e) a.postBack2(t, i, n);
				else if ("CallBack" === e) a.G(t, i, n, "CallBack");
				else if ("Immediate" === e) a.G(t, i, n, "Notify");
				else if ("Queue" === e) a.queue.add(new DayPilot.Action(this, t, i, n));
				else {
					if ("Notify" !== e) throw "Invalid event invocation type";
					"Notify" === r.notifyType() ? a.G(t, i, n, "Notify") : a.queue.add(new DayPilot.Action(a, t, i, n))
				}
			}, this.Ba = function(e) {
				if ("BusinessHoursNoScroll" === this.heightSpec) return this.businessBeginsHour;
				if (this.hideFreeCells && !e) {
					var t = this.Ra * this.cellDuration / this.cellHeight,
						i = Math.floor(t / 60);
					return i = Math.max(0, i), Math.min(this.dayBeginsHour + i, this.businessBeginsHour)
				}
				return this.dayBeginsHour
			}, this.visibleStart = function() {
				if ("Resources" === a.viewType) {
					var e = DayPilot.list(a.va).map(function(e) {
						return e.start.getTime()
					}),
						t = Math.min.apply(null, e);
					return new DayPilot.Date(t)
				}
				return this.va[0].start
			}, this.visibleEnd = function() {
				if ("Resources" === a.viewType) {
					var e = DayPilot.list(a.va).map(function(e) {
						return e.start.getTime()
					}),
						t = Math.max.apply(null, e);
					return new DayPilot.Date(t).addDays(1)
				}
				var i = this.va,
					t = i.length - 1;
				return i[t].start.addDays(1)
			}, this.sa = function() {
				return 2 === a.api
			}, this.Sa = function(e, t, i, n) {
				if ("Disabled" !== this.eventResizeHandling) {
					var o = 0,
						r = new Date,
						l = new Date,
						s = e.start(),
						d = (e.end(), a.cellDuration),
						c = a.va[e.part.dayIndex].start;
					if ("top" === n) {
						var c = s.getDatePart(),
							h = Math.floor((i - o) / a.cellHeight),
							u = h * d,
							f = 60 * u * 1e3,
							v = 60 * a.Ba() * 60 * 1e3;
						r = c.addTime(f + v), l = e.end()
					} else if ("bottom" === n) {
						var h = Math.floor((i + t - o) / a.cellHeight),
							u = h * d,
							f = 60 * u * 1e3,
							v = 60 * a.Ba() * 60 * 1e3;
						r = s, l = c.addTime(f + v)
					}
					if (a.sa()) {
						var p = {};
						if (p.e = e, p.newStart = r, p.newEnd = l, p.preventDefault = function() {
							this.preventDefault.value = !0
						}, "function" == typeof a.onEventResize && (a.onEventResize(p), p.preventDefault.value)) return;
						switch (a.eventResizeHandling) {
						case "PostBack":
							a.eventResizePostBack(e, r, l);
							break;
						case "CallBack":
							a.eventResizeCallBack(e, r, l);
							break;
						case "Notify":
							a.eventResizeNotify(e, r, l);
							break;
						case "Update":
							e.start(r), e.end(l), a.events.update(e)
						}
						"function" == typeof a.onEventResized && a.onEventResized(p)
					} else switch (a.eventResizeHandling) {
					case "PostBack":
						a.eventResizePostBack(e, r, l);
						break;
					case "CallBack":
						a.eventResizeCallBack(e, r, l);
						break;
					case "JavaScript":
						a.onEventResize(e, r, l);
						break;
					case "Notify":
						a.eventResizeNotify(e, r, l)
					}
				}
			}, this.eventResizeNotify = function(e, t, i, n) {
				var o = new DayPilot.Event(e.copy(), this);
				e.start(t), e.end(i), e.commit(), a.update(), this.Ta("Notify", o, t, i, n)
			}, this.Ta = function(e, t, i, n, a) {
				var o = {};
				o.e = t, o.newStart = i, o.newEnd = n, this.Qa(e, "EventResize", o, a)
			}, this.eventMovePostBack = function(e, t, i, n, a) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var o = {};
				o.e = e, o.newStart = t, o.newEnd = i, o.newResource = n, this.E("EventMove", a, o)
			}, this.eventMoveCallBack = function(e, t, i, n, a) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var o = {};
				o.e = e, o.newStart = t, o.newEnd = i, o.newResource = n, this.G("EventMove", o, a)
			}, this.Ua = function(e, t, i) {
				var n = 0,
					o = Math.floor((i - n) / a.cellHeight),
					r = a.cellDuration,
					l = o * r * 60 * 1e3,
					s = e.start(),
					d = e.end(),
					c = new Date;
				s instanceof DayPilot.Date && (s = s.toDate()), c.setTime(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
				var h = "Never" !== a.useEventBoxes ? s.getTime() - (c.getTime() + 3600 * s.getUTCHours() * 1e3 + Math.floor(s.getUTCMinutes() / r) * r * 60 * 1e3) : 0,
					u = d.getTime() - s.getTime(),
					f = 3600 * a.Ba() * 1e3;
				"undefined" == typeof t && (t = e.part.dayIndex);
				var v = this.va[t],
					p = v.start.getTime(),
					g = new Date;
				g.setTime(p + l + h + f);
				var m = new DayPilot.Date(g);
				return {
					"start": m,
					"end": m.addTime(u),
					"resource": v.id
				}
			}, this.Va = function(e, t, i, n, o) {
				if ("Disabled" !== a.eventMoveHandling) {
					var r = a.Ua(e, t, i),
						l = r.start,
						s = r.end,
						d = r.resource,
						c = !! o;
					if (a.sa()) {
						var h = {};
						if (h.e = e, h.newStart = r.start, h.newEnd = r.end, h.newResource = r.resource, h.external = c, h.ctrl = !1, n && (h.ctrl = n.ctrlKey), h.shift = !1, n && (h.shift = n.shiftKey), h.preventDefault = function() {
							this.preventDefault.value = !0
						}, "function" == typeof a.onEventMove && (a.onEventMove(h), h.preventDefault.value)) return;
						switch (a.eventMoveHandling) {
						case "PostBack":
							a.eventMovePostBack(e, l, s, d);
							break;
						case "CallBack":
							a.eventMoveCallBack(e, l, s, d);
							break;
						case "Notify":
							a.eventMoveNotify(e, l, s, d);
							break;
						case "Update":
							e.start(l), e.end(s), e.resource(d), c ? (e.commit(), a.events.add(e)) : a.events.update(e), a.Wa()
						}
						"function" == typeof a.onEventMoved && a.onEventMoved(h)
					} else switch (a.eventMoveHandling) {
					case "PostBack":
						a.eventMovePostBack(e, l, s, d);
						break;
					case "CallBack":
						a.eventMoveCallBack(e, l, s, d);
						break;
					case "JavaScript":
						a.onEventMove(e, l, s, d, c, !! n && n.ctrlKey, !! n && n.shiftKey);
						break;
					case "Notify":
						a.eventMoveNotify(e, l, s, d, null)
					}
				}
			}, this.eventMoveNotify = function(e, t, i, n, o) {
				var r = new DayPilot.Event(e.copy(), this);
				e.start(t), e.end(i), e.resource(n), e.commit(), a.update(), this.Xa("Notify", r, t, i, n, o)
			}, this.Xa = function(e, t, i, n, a, o) {
				var r = {};
				r.e = t, r.newStart = i, r.newEnd = n, r.newResource = a, this.Qa(e, "EventMove", r, o)
			}, this.Wa = function() {
				if (a.todo && a.todo.del) {
					var e = a.todo.del;
					e.parentNode.removeChild(e), a.todo.del = null
				}
			}, this.Ya = function(e, t) {
				var i = a.Za(t),
					n = {};
				n.args = e, n.guid = i, a.G("Bubble", n)
			}, this.Za = function(e) {
				var t = DayPilot.guid();
				return this.bubbles || (this.bubbles = []), this.bubbles[t] = e, t
			}, this.eventMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.command = t, this.E("EventMenuClick", i, n)
			}, this.eventMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.command = t, this.G("EventMenuClick", n, i)
			}, this.$a = function(e, t, i) {
				switch (i) {
				case "PostBack":
					a.eventMenuClickPostBack(t, e);
					break;
				case "CallBack":
					a.eventMenuClickCallBack(t, e)
				}
			}, this.timeRangeMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.selection = e, n.command = t, this.E("TimeRangeMenuClick", i, n)
			}, this.timeRangeMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.selection = e, n.command = t, this.G("TimeRangeMenuClick", n, i)
			}, this._a = function(e, t, i) {
				switch (i) {
				case "PostBack":
					a.timeRangeMenuClickPostBack(t, e);
					break;
				case "CallBack":
					a.timeRangeMenuClickCallBack(t, e)
				}
			}, this.timeRangeSelectedPostBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.E("TimeRangeSelected", n, a)
			}, this.timeRangeSelectedCallBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.G("TimeRangeSelected", a, n)
			}, this.ab = function(e, t, i) {
				e = new DayPilot.Date(e), t = new DayPilot.Date(t);
				var n = i;
				if (a.sa()) {
					var o = {};
					if (o.start = e, o.end = t, o.resource = n, o.control = a, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onTimeRangeSelect && (a.onTimeRangeSelect(o), o.preventDefault.value)) return;
					switch (a.timeRangeSelectedHandling) {
					case "PostBack":
						a.timeRangeSelectedPostBack(e, t, n);
						break;
					case "CallBack":
						a.timeRangeSelectedCallBack(e, t, n)
					}
					"function" == typeof a.onTimeRangeSelected && a.onTimeRangeSelected(o)
				} else switch (a.timeRangeSelectedHandling) {
				case "PostBack":
					a.timeRangeSelectedPostBack(e, t, i);
					break;
				case "CallBack":
					a.timeRangeSelectedCallBack(e, t, i);
					break;
				case "JavaScript":
					a.onTimeRangeSelected(e, t, i)
				}
			}, this.timeRangeDoubleClickPostBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.E("TimeRangeDoubleClick", n, a)
			}, this.timeRangeDoubleClickCallBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.G("TimeRangeDoubleClick", a, n)
			}, this.bb = function(e, t, i) {
				if (a.sa()) {
					var n = i,
						o = {};
					if (o.start = e, o.end = t, o.resource = n, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onTimeRangeDoubleClick && (a.onTimeRangeDoubleClick(o), o.preventDefault.value)) return;
					switch (a.timeRangeDoubleClickHandling) {
					case "PostBack":
						a.timeRangeDoubleClickPostBack(e, t, n);
						break;
					case "CallBack":
						a.timeRangeDoubleClickCallBack(e, t, n)
					}
					"function" == typeof a.onTimeRangeDoubleClicked && a.onTimeRangeDoubleClicked(o)
				} else switch (a.timeRangeDoubleClickHandling) {
				case "PostBack":
					a.timeRangeDoubleClickPostBack(e, t, i);
					break;
				case "CallBack":
					a.timeRangeDoubleClickCallBack(e, t, i);
					break;
				case "JavaScript":
					a.onTimeRangeDoubleClick(e, t, i)
				}
			}, this.eventEditPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.newText = t, this.E("EventEdit", i, n)
			}, this.eventEditCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.newText = t, this.G("EventEdit", n, i)
			}, this.cb = function(e, t) {
				if (a.sa()) {
					var i = {};
					if (i.e = e, i.newText = t, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventEdit && (a.onEventEdit(i), i.preventDefault.value)) return;
					switch (a.eventEditHandling) {
					case "PostBack":
						a.eventEditPostBack(e, t);
						break;
					case "CallBack":
						a.eventEditCallBack(e, t);
						break;
					case "Update":
						e.text(t), a.events.update(e)
					}
					if ("function" == typeof a.onEventEdited && (a.onEventEdited(i), i.preventDefault.value)) return
				} else switch (a.eventEditHandling) {
				case "PostBack":
					a.eventEditPostBack(e, t);
					break;
				case "CallBack":
					a.eventEditCallBack(e, t);
					break;
				case "JavaScript":
					a.onEventEdit(e, t)
				}
			}, this.eventSelectPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.change = t, this.E("EventSelect", i, n)
			}, this.eventSelectCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.change = t, this.G("EventSelect", n, i)
			}, this.db = function(e, t, i, n) {
				var o = a.multiselect,
					r = o.isSelected(t);
				if (i || n || !r || 1 !== o.eb.length) if (a.sa()) {
					o.previous = o.events();
					var l = {};
					if (l.e = t, l.selected = o.isSelected(t), l.ctrl = i, l.meta = n, l.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventSelect && (a.onEventSelect(l), l.preventDefault.value)) return;
					switch (a.eventSelectHandling) {
					case "PostBack":
						a.eventSelectPostBack(t, s);
						break;
					case "CallBack":
						"undefined" != typeof WebForm_InitCallback && (window.fb = "", window.gb = [], WebForm_InitCallback()), a.eventSelectCallBack(t, s);
						break;
					case "Update":
						o.hb(e, i)
					}
					"function" == typeof a.onEventSelected && (l.change = o.isSelected(t) ? "selected" : "deselected", l.selected = o.isSelected(t), a.onEventSelected(l))
				} else {
					o.previous = o.events(), o.hb(e, i);
					var s = o.isSelected(t) ? "selected" : "deselected";
					switch (a.eventSelectHandling) {
					case "PostBack":
						a.eventSelectPostBack(t, s);
						break;
					case "CallBack":
						"undefined" != typeof WebForm_InitCallback && (window.fb = "", window.gb = [], WebForm_InitCallback()), a.eventSelectCallBack(t, s);
						break;
					case "JavaScript":
						a.onEventSelect(t, s)
					}
				}
			}, this.commandCallBack = function(e, t) {
				this.L();
				var i = {};
				i.command = e, this.G("Command", i, t)
			}, this.ib = function(t) {
				if (!o.active && !o.using && (clearTimeout(e.selectedTimeout), !e.selecting)) {
					if (e.editing) return void e.editing.blur();
					if (a.selectedCells && "Disabled" !== a.timeRangeDoubleClickHandling) for (var i = 0; i < a.selectedCells.length; i++) if (this === a.selectedCells[i]) return;
					if ("Disabled" !== a.timeRangeSelectedHandling) {
						DayPilot.Util.mouseButton(t).left && (e.firstMousePos = a.coords, e.firstMousePos.calendar = a, a.clearSelection(), e.topSelectedCell = this, e.bottomSelectedCell = this, e.column = e.getColumn(this), a.selectedCells.push(this), e.firstSelected = this)
					}
				}
			}, this.jb = function() {
				this.getSelection() && a.selectedCells && !
				function() {
					var t = e.topSelectedCell,
						i = e.bottomSelectedCell,
						n = t.parentNode.cells,
						o = function() {
							for (var e = 0; e < n.length; e++) if (n[e] === t) return e;
							return -1
						}(),
						l = a.timeRangeSelectingStartEndFormat;
					"Auto" === l && (l = "Clock24Hours" === r.timeFormat() ? "H:mm" : "h:mm tt");
					var s = a.va[o],
						d = {};
					if (d.start = t.start, d.end = i.end, d.duration = new DayPilot.Duration(d.start, d.end), d.resource = s.id, d.allowed = !0, d.html = null, d.cssClass = null, d.top = {}, d.top.width = null, d.top.space = 5, d.top.html = d.start.toString(l, r.locale()), d.top.enabled = a.timeRangeSelectingStartEndEnabled, d.bottom = {}, d.bottom.width = null, d.bottom.space = 5, d.bottom.html = d.end.toString(l, r.locale()), d.bottom.enabled = a.timeRangeSelectingStartEndEnabled, e.selecting) {
						var c = e.selecting.args;
						if (!c || c.start !== d.start || c.end !== d.end || c.resource != d.resource) {
							"function" == typeof a.onTimeRangeSelecting && a.onTimeRangeSelecting(d), DayPilot.de(a.elements.selection), a.elements.selection = [], e.selecting.args = d;
							var h = a.kb(t.start, s.start).boxTop,
								u = a.kb(i.end, s.start).boxBottom,
								f = u - h,
								v = document.createElement("div");
							v.style.position = "absolute", v.style.top = h + "px", v.style.height = f + "px", v.style.left = "0px", v.style.width = "100%", v.className = a.q("_shadow");
							var p = document.createElement("div");
							if (p.className = a.q("_shadow_inner"), d.html && (p.innerHTML = d.html), d.cssClass && DayPilot.Util.addClass(v, d.cssClass), !d.allowed) {
								var g = a.q("_shadow_forbidden");
								DayPilot.Util.addClass(v, g)
							}
							v.appendChild(p), a.nav.events.rows[0].cells[o].selection.appendChild(v), a.elements.selection.push(v), a.lb(v, o, d)
						}
					}
				}()
			}, this.lb = function(e, t, i) {
				var n = a.nav.events.rows[0].cells,
					o = n[t].selection,
					r = t === n.length - 1;
				if (i.top.enabled) {
					var l = document.createElement("div");
					l.style.position = "absolute", l.style.top = e.offsetTop + "px", r ? l.style.right = "0px" : l.style.left = e.offsetWidth + i.top.space + "px", i.top.width ? l.style.width = i.top.width + "px" : l.style.whiteSpace = "nowrap", i.top.html && (l.innerHTML = i.top.html), l.className = a.q("_shadow_top"), o.appendChild(l), a.elements.selection.push(l)
				}
				if (i.bottom.enabled) {
					var s = document.createElement("div");
					s.style.position = "absolute", s.style.top = e.offsetTop + e.offsetHeight + "px", r ? s.style.right = "0px" : s.style.left = e.offsetWidth + i.bottom.space + "px", i.bottom.width ? s.style.width = i.bottom.width + "px" : s.style.whiteSpace = "nowrap", i.bottom.html && (s.innerHTML = i.bottom.html), s.className = a.q("_shadow_bottom"), o.appendChild(s);
					var d = s.offsetHeight;
					s.style.top = e.offsetTop + e.offsetHeight - d + "px", a.elements.selection.push(s)
				}
			}, this.mb = function(e) {
				"undefined" != typeof DayPilot.Bubble && a.cellBubble && a.cellBubble.hideOnMouseOut()
			}, this.nb = function(t) {
				if ("undefined" != typeof e && !o.active && !o.using && "undefined" != typeof DayPilot.Bubble && a.cellBubble) {
					var i = e.getColumn(this),
						n = a.va[i].id,
						r = {};
					r.calendar = a, r.start = this.start, r.end = this.end, r.resource = n, r.toJSON = function() {
						var e = {};
						return e.start = this.start, e.end = this.end, e.resource = this.resource, e
					}, a.cellBubble.showCell(r)
				}
			}, this.getSelection = function() {
				if (!e.topSelectedCell) return null;
				if (!e.bottomSelectedCell) return null;
				var t = e.topSelectedCell.start,
					i = e.bottomSelectedCell.end,
					n = e.topSelectedCell.resource;
				return new DayPilot.Selection(t, i, n, a)
			}, this.ob = function(e) {}, this.pb = function(e) {
				if ("Fixed" === a.columnWidthSpec || a.qb) {
					if (!a.nav.bottomLeft) return;
					a.nav.bottomLeft.scrollTop = a.nav.bottomRight.scrollTop, a.nav.upperRight && (a.nav.upperRight.scrollLeft = a.nav.bottomRight.scrollLeft), a.nav.scrollLayer.scrollLeft = a.nav.bottomRight.scrollLeft
				}
				var t = a.rb();
				a.scrollPos = t.scrollTop, a.sb = t.clientHeight, a.nav.scrollpos.value = a.scrollPos, a.qa()
			}, this.qa = function() {
				if (this.scrollLabelsVisible && this.tb) {
					if (this.nav && this.nav.main && this.nav.main.rows && this.nav.main.rows.length > 0 && this.nav.main.rows[0].cells.length > 0) {
						for (var e = (this.va, this.showHours ? this.hourWidth : 0), t = this.nav.main.rows[0].cells[0].clientWidth, i = 1, n = 0; n < this.nav.scrollUp.length; n++) {
							var o = this.nav.scrollUp[n],
								r = this.nav.scrollDown[n],
								l = Math.floor(e + n * t + t / 2 - 5 + i);
							l < 0 && (l = 0), l -= a.nav.bottomRight.scrollLeft, o && o.style && (o.style.left = l + "px"), r && r.style && (r.style.left = l + "px")
						}
						for (var s = this.ub(), n = 0; n < this.nav.scrollUp.length; n++) {
							var d = this.nav.scrollUp[n],
								c = this.nav.scrollDown[n],
								h = this.tb[n].minEnd - s,
								u = this.tb[n].maxStart - s;
							d && c && (h <= a.scrollPos && parseInt(d.style.left) >= a.hourWidth ? (d.style.top = this.Ca() + "px", d.style.display = "") : d.style.display = "none", u >= a.scrollPos + a.sb && parseInt(c.style.left) >= a.hourWidth ? (c.style.top = this.Ca() + this.sb - 10 + "px", c.style.display = "") : c.style.display = "none")
						}
					}
				}
			}, this.vb = function(e) {
				var t = e.parentNode,
					i = 0,
					n = e.offsetTop,
					a = e.parentNode.offsetWidth,
					o = e.offsetHeight;
				e.event.allday() && (i = e.offsetLeft, a = e.offsetWidth);
				var r = document.createElement("textarea");
				r.style.boxSizing = "border-box", r.style.position = "absolute", r.style.width = a + "px", r.style.height = o + "px";
				var l = DayPilot.gs(e, "fontFamily");
				l || (l = DayPilot.gs(e, "font-family")), r.style.fontFamily = l;
				var s = DayPilot.gs(e, "fontSize");
				return s || (s = DayPilot.gs(e, "font-size")), r.style.fontSize = s, r.style.left = i + "px", r.style.top = n + "px", r.style.border = "1px solid black", r.style.padding = "0px", r.style.marginTop = "0px", r.style.backgroundColor = "white", r.value = DayPilot.tr(e.event.text()), r.event = e.event, t.appendChild(r), r
			}, this.Ja = function(e, t, i, n) {
				a.db(e, t, i, n)
			}, this.multiselect = {}, this.multiselect.Z = [], this.multiselect.eb = [], this.multiselect.wb = [], this.multiselect.xb = [], this.multiselect.yb = function() {
				var e = a.multiselect;
				return DayPilot.JSON.stringify(e.events())
			}, this.multiselect.events = function() {
				var e = a.multiselect,
					t = [];
				t.ignoreToJSON = !0;
				for (var i = 0; i < e.eb.length; i++) t.push(e.eb[i]);
				return t
			}, this.multiselect.zb = function() {
				a.nav.select.value = a.multiselect.yb()
			}, this.multiselect.hb = function(e, t) {
				var i = a.multiselect;
				if (i.isSelected(e.event)) if (a.allowMultiSelect) if (t) i.remove(e.event, !0);
				else {
					var n = i.eb.length;
					i.clear(!0), n > 1 && i.add(e.event, !0)
				} else i.clear(!0);
				else a.allowMultiSelect && t ? i.add(e.event, !0) : (i.clear(!0), i.add(e.event, !0));
				i.redraw(), i.zb()
			}, this.multiselect.Ab = function(e) {
				var t = a.multiselect;
				return t.Bb(e, t.Z)
			}, this.multiselect.Cb = function() {
				for (var e = a.multiselect, t = [], i = 0; i < e.eb.length; i++) {
					var n = e.eb[i];
					t.push(n.value())
				}
				alert(t.join("\n")+"11111111111")
			}, this.multiselect.add = function(e, t) {
				var i = a.multiselect;
				i.Db(e) === -1 && i.eb.push(e), i.zb(), t || i.redraw()
			}, this.multiselect.remove = function(e, t) {
				var i = a.multiselect,
					n = i.Db(e);
				n !== -1 && i.eb.splice(n, 1), i.zb(), t || i.redraw()
			}, this.multiselect.clear = function(e) {
				var t = a.multiselect;
				t.eb = [], t.zb(), e || t.redraw()
			}, this.multiselect.redraw = function() {
				for (var e = a.multiselect, t = 0; t < a.elements.events.length; t++) {
					var i = a.elements.events[t];
					e.isSelected(i.event) ? e.Eb(i) : e.Fb(i)
				}
			}, this.multiselect.Eb = function(e) {
				var t = a.multiselect,
					i = a.q("_selected"),
					n = t.Gb(e);
				DayPilot.Util.addClass(n, i), a.useEventSelectionBars && t.Hb(e), t.wb.push(e)
			}, this.multiselect.Gb = function(e) {
				return e
			}, this.multiselect.Ib = function() {
				for (var e = a.multiselect, t = 0; t < e.wb.length; t++) {
					var i = e.wb[t];
					e.Fb(i, !0)
				}
				e.wb = []
			}, this.multiselect.Fb = function(e, t) {
				var i = a.multiselect,
					n = a.q("_selected"),
					o = i.Gb(e);
				if (DayPilot.Util.removeClass(o, n), a.useEventSelectionBars && i.Jb(e), !t) {
					var r = DayPilot.indexOf(i.wb, e);
					r !== -1 && i.wb.splice(r, 1)
				}
			}, this.multiselect.isSelected = function(e) {
				return a.multiselect.Bb(e, a.multiselect.eb)
			}, this.multiselect.Db = function(e) {
				return DayPilot.indexOf(a.multiselect.eb, e)
			}, this.multiselect.Bb = function(e, t) {
				if (!t) return !1;
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					if (e === n) return !0;
					if ("function" == typeof n.value) {
						if (null !== n.value() && null !== e.value() && n.value() === e.value()) return !0;
						if (null === n.value() && null === e.value() && n.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === n.start()) return !0
					} else {
						if (null !== n.value && null !== e.value() && n.value === e.value()) return !0;
						if (null === n.value && null === e.value() && n.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === n.start) return !0
					}
				}
				return !1
			}, this.multiselect.Hb = function(e) {
				var t = 5;
				if (!e.top) {
					var i = document.createElement("div");
					i.setAttribute("unselectable", "on"), i.style.position = "absolute", i.style.left = e.offsetLeft + "px", i.style.width = e.offsetWidth + "px", i.style.top = e.offsetTop - t + "px", i.style.height = "5px", i.style.backgroundColor = a.eventSelectColor, i.style.zIndex = 100, e.parentNode.appendChild(i), e.top = i
				}
				if (!e.bottom) {
					var n = document.createElement("div");
					n.setAttribute("unselectable", "on"), n.style.position = "absolute", n.style.left = e.offsetLeft + "px", n.style.width = e.offsetWidth + "px", n.style.top = e.offsetTop + e.offsetHeight + "px", n.style.height = "5px", n.style.backgroundColor = a.eventSelectColor, n.style.zIndex = 100, e.parentNode.appendChild(n), e.bottom = n
				}
			}, this.multiselect.Jb = function(e) {
				e.top && (e.parentNode.removeChild(e.top), e.top = null), e.bottom && (e.parentNode.removeChild(e.bottom), e.bottom = null)
			}, this.Ia = function(t) {
				if (e.editing) return void e.editing.blur();
				var i = this.vb(t);
				e.editing = i, DayPilot.re(i, DayPilot.touch.start, function(e) {
					e.stopPropagation()
				}), i.onblur = function() {
					if (t.event) {
						var n = (t.event.value(), t.event.tag(), t.event.text()),
							o = i.value;
						e.editing = null, i.onblur = null, DayPilot.de(i), n !== o && (t.style.display = "none", a.cb(t.event, o))
					}
				}, i.onkeypress = function(t) {
					var n = window.event ? event.keyCode : t.keyCode;
					return 13 === n ? (this.onblur(), !1) : (27 === n && (i.parentNode.removeChild(i), e.editing = !1), !0)
				}, i.select(), i.focus()
			}, this.Kb = function() {
				return "Resources" !== a.viewType && (!a.columns || !a.r())
			}, this._ = function() {
				if (a.Kb()) {
					var e = this.Lb();
					this.va = this.Mb(e)
				} else this.U = this.Mb(this.columns || []), this.va = this.Nb(this.headerLevels, !0)
			}, this.Ob = function() {
				var e = this.startDate.getDatePart(),
					t = this.days;
				switch (this.viewType) {
				case "Day":
					t = 1;
					break;
				case "Week":
					t = 7, e = e.firstDayOfWeek(r.weekStarts());
					break;
				case "WorkWeek":
					t = 5, e = e.firstDayOfWeek(1)
				}
				var i = e.addDays(t),
					n = {};
				return n.start = e, n.end = i, n.days = t, n
			}, this.Lb = function() {
				for (var e = [], t = this.Ob(), i = t.start, n = t.days, o = 0; o < n; o++) {
					var l = {};
					l.start = i.addDays(o);
					var s = r.locale().datePattern;
					a.headerDateFormat && (s = a.headerDateFormat), l.name = l.start.toString(s, r.locale()), l.html = l.name, e.push(l)
				}
				return e
			}, this.Pb = function(e) {
				var t = {};
				return e.Start && (e.id = e.Value, e.start = e.Start, e.name = e.Name, e.html = e.InnerHTML, e.toolTip = e.ToolTip, e.backColor = e.BackColor, e.areas = e.Areas, e.children = e.Children, delete e.Value, delete e.Start, delete e.Name, delete e.InnerHTML, delete e.ToolTip, delete e.BackColor, delete e.Areas, delete e.Children), t.id = e.id, t.start = new DayPilot.Date(e.start || a.startDate).getDatePart(), t.name = e.name, t.html = e.html || e.name, t.toolTip = e.toolTip, t.backColor = e.backColor, t.areas = e.areas, t.getChildren = function(e, t) {
					var i = [];
					if (e <= 1) return i.push(this), i;
					if (!this.children || 0 === this.children.length) return t ? i.push(this) : i.push("empty"), i;
					for (var n = 0; n < this.children.length; n++) for (var a = this.children[n], o = a.getChildren(e - 1, t), r = 0; r < o.length; r++) i.push(o[r]);
					return i
				}, t.getChildrenCount = function(e) {
					var t = 0;
					if (!this.children || this.children.length <= 0 || e <= 1) return 1;
					for (var i = 0; i < this.children.length; i++) t += this.children[i].getChildrenCount(e - 1);
					return t
				}, t.putIntoBlock = function(e) {
					for (var t = 0; t < this.blocks.length; t++) {
						var i = this.blocks[t];
						if (i.overlapsWith(e.part.top, e.part.height)) return i.events.push(e), i.min = Math.min(i.min, e.part.top), i.max = Math.max(i.max, e.part.top + e.part.height), t
					}
					var i = [];
					return i.lines = [], i.events = [], i.overlapsWith = function(e, t) {
						return !(e + t - 1 < this.min || e > this.max - 1)
					}, i.putIntoLine = function(e) {
						for (var t = 0; t < this.lines.length; t++) {
							var i = this.lines[t];
							if (i.isFree(e.part.top, e.part.height)) return i.push(e), t
						}
						var i = [];
						return i.isFree = function(e, t) {
							for (var i = e + t - 1, n = this.length, a = 0; a < n; a++) {
								var o = this[a];
								if (!(i < o.part.top || e > o.part.top + o.part.height - 1)) return !1
							}
							return !0
						}, i.push(e), this.lines.push(i), this.lines.length - 1
					}, i.events.push(e), i.min = e.part.top, i.max = e.part.top + e.part.height, this.blocks.push(i), this.blocks.length - 1
				}, t.putIntoLine = function(e) {
					for (var t = 0; t < this.lines.length; t++) {
						var i = this.lines[t];
						if (i.isFree(e.part.top, e.part.height)) return i.push(e), t
					}
					var i = [];
					return i.isFree = function(e, t) {
						for (var i = e + t - 1, n = this.length, a = 0; a < n; a++) {
							var o = this[a];
							if (!(i < o.part.top || e > o.part.top + o.part.height - 1)) return !1
						}
						return !0
					}, i.push(e), this.lines.push(i), this.lines.length - 1
				}, e.children && (t.children = this.Mb(e.children)), t
			}, this.Mb = function(e) {
				var t = DayPilot.list();
				return DayPilot.list(e).each(function(e) {
					var i = a.Pb(e);
					t.push(i)
				}), t
			}, this.Nb = function(e, t) {
				for (var i = this.Kb() ? this.va : this.U, n = [], a = 0; a < i.length; a++) for (var o = i[a].getChildren(e, t), r = 0; r < o.length; r++) n.push(o[r]);
				return n
			}, this.pa = function() {
				if (this.showAllDayEvents) {
					var e = this.nav.header;
					if (e) {
						e.style.display = "none";
						for (var t = this.va.length, i = 0; i < this.Qb.lines.length; i++) for (var n = this.Qb.lines[i], o = 0; o < n.length; o++) {
							var l = n[o],
								s = l.cache || l.data,
								d = document.createElement("div");
							d.event = l, d.setAttribute("unselectable", "on"), d.style.position = "absolute", a.rtl ? d.style.right = 100 * l.part.colStart / t + "%" : d.style.left = 100 * l.part.colStart / t + "%", d.style.width = 100 * l.part.colWidth / t + "%", d.style.height = r.allDayEventHeight() + "px", d.className = this.q("_alldayevent"), d.style.top = this.headerLevels * r.headerHeight() + i * r.allDayEventHeight() + "px", s.cssClass && DayPilot.Util.addClass(d, s.cssClass), d.style.textAlign = "left", d.style.lineHeight = "1.2", l.client.clickEnabled() && (d.onclick = this.Ga), l.client.doubleClickEnabled() && (d.ondblclick = this.Ka), l.client.clickEnabled() || l.client.doubleClickEnabled() ? d.style.cursor = "pointer" : d.style.cursor = "default", DayPilot.re(d, "contextmenu", this.La), d.onmousemove = function(e) {
								var t = this;
								if (!t.active) {
									var i = [];
									l.client.deleteEnabled() && i.push({
										"action": "JavaScript",
										"v": "Hover",
										"w": 17,
										"h": 17,
										"top": 3,
										"right": 3,
										"css": a.q("_event_delete"),
										"js": function(e) {
											a.Pa(e)
										}
									});
									var n = s.areas;
									n && n.length > 0 && (i = i.concat(n)), DayPilot.Areas.showAreas(t, t.event, null, i), DayPilot.Util.addClass(t, a.q("_alldayevent_hover"))
								}
								"undefined" != typeof DayPilot.Bubble && a.bubble && "Disabled" !== a.eventHoverHandling && a.bubble.showEvent(this.event)
							}, d.onmouseout = function(e) {
								var t = this;
								DayPilot.Util.removeClass(t, a.q("_alldayevent_hover")), DayPilot.Areas.hideAreas(this, e), a.bubble && a.bubble.hideOnMouseOut()
							}, this.showToolTip && !this.bubble && d.setAttribute("title", l.client.toolTip());
							var c = l.start().getTime() === l.part.start.getTime(),
								h = l.end().getTime() === l.part.end.getTime(),
								u = s.backColor,
								f = document.createElement("div");
							if (f.setAttribute("unselectable", "on"), f.className = this.q("_alldayevent_inner"), u && (f.style.background = u), s.fontColor && (f.style.color = s.fontColor), s.borderColor && (f.style.borderColor = s.borderColor), a.rtl ? (c || DayPilot.Util.addClass(d, this.q("_alldayevent_continueright")), h || DayPilot.Util.addClass(d, this.q("_alldayevent_continueleft"))) : (c || DayPilot.Util.addClass(d, this.q("_alldayevent_continueleft")), h || DayPilot.Util.addClass(d, this.q("_alldayevent_continueright"))), l.client.innerHTML() ? f.innerHTML = l.client.innerHTML() : f.innerHTML = l.text(), d.appendChild(f), a.sa()) {
								if ("function" == typeof a.onAfterEventRender) {
									var v = {};
									v.e = d.event, v.div = d, a.onAfterEventRender(v)
								}
							} else a.afterEventRender && a.afterEventRender(d.event, d);
							this.nav.allday.appendChild(d), this.elements.events.push(d)
						}
						e.style.display = ""
					}
				}
			}, this.M = function(e) {
				if (a.multiselect.Ib(), this.elements.events) for (var t = 0; t < this.elements.events.length; t++) {
					var i = this.elements.events[t],
						n = i.event;
					if (!n || !e || n.allday()) {
						if (n && (n.div = null, n.root = null), i.onclick = null, i.onclickSave = null, i.ondblclick = null, i.oncontextmenu = null, i.onmouseover = null, i.onmouseout = null, i.onmousemove = null, i.onmousedown = null, i.firstChild && i.firstChild.firstChild && i.firstChild.firstChild.tagName && "IMG" === i.firstChild.firstChild.tagName.toUpperCase()) {
							var o = i.firstChild.firstChild;
							o.onmousedown = null, o.onmousemove = null, o.onclick = null
						}
						i.helper = null, i.event = null, DayPilot.de(i)
					}
				}
				this.elements.events = []
			}, this.Rb = function(e) {
				var t = this.nav.events,
					i = (this.roundedCorners, this.roundedCorners && (this.C.ff || this.C.opera105 || this.C.webkit522 || !this.C.ielt9)),
					n = (this.roundedCorners && !i, e.cache || e.data),
					o = (n.borderColor || this.eventBorderColor, document.createElement("div"));
				o.setAttribute("unselectable", "on"), o.style.MozUserSelect = "none", o.style.KhtmlUserSelect = "none", o.style.WebkitUserSelect = "none", o.style.position = "absolute", o.className = this.q("_event"), o.style.left = e.part.left + "%", o.style.top = e.part.top - this.ub() + "px", o.style.width = e.part.width + "%", o.style.height = Math.max(e.part.height, 2) + "px", o.style.overflow = "hidden", o.isFirst = e.part.start.getTime() === e.start().getTime(), o.isLast = e.part.end.getTime() === e.end().getTime(), e.client.clickEnabled() && (o.onclick = this.Ga), e.client.doubleClickEnabled() && (o.ondblclick = this.Ka), DayPilot.re(o, "contextmenu", this.La), o.onmousemove = this.Sb, o.onmouseout = this.Tb, o.onmousedown = this.Ub, DayPilot.re(o, DayPilot.touch.start, this.Vb.onEventTouchStart), DayPilot.re(o, DayPilot.touch.move, this.Vb.onEventTouchMove), DayPilot.re(o, DayPilot.touch.end, this.Vb.onEventTouchEnd);
				n.cssClass && DayPilot.Util.addClass(o, n.cssClass), this.showToolTip && !this.bubble && o.setAttribute("title", e.client.toolTip());
				var r = document.createElement("div");
				if (r.setAttribute("unselectable", "on"), r.className = a.q("_event_inner"), r.innerHTML = e.client.innerHTML(), n.fontColor && (r.style.color = n.fontColor), n.backColor && (r.style.background = n.backColor, (DayPilot.browser.ie9 || DayPilot.browser.ielt9) && (r.style.filter = "")), n.borderColor && (r.style.borderColor = n.borderColor), n.backgroundImage && (r.style.backgroundImage = "url(" + n.backgroundImage + ")", n.backgroundRepeat && (r.style.backgroundRepeat = n.backgroundRepeat)), o.appendChild(r), e.client.barVisible()) {
					var l = e.part.height - 2,
						s = 100 * e.part.barTop / l,
						d = Math.ceil(100 * e.part.barHeight / l);
					"PercentComplete" === this.durationBarMode && (s = 0, d = n.complete);
					var c = document.createElement("div");
					c.setAttribute("unselectable", "on"), c.className = this.q("_event_bar"), c.style.position = "absolute", n.barBackColor && (c.style.backgroundColor = n.barBackColor);
					var h = document.createElement("div");
					h.setAttribute("unselectable", "on"), h.className = this.q("_event_bar_inner"), h.style.top = s + "%", 0 < d && d <= 1 ? h.style.height = "1px" : h.style.height = d + "%", n.barColor && (h.style.backgroundColor = n.barColor), c.appendChild(h), o.appendChild(c)
				}
				if (n.areas) for (var u = 0; u < n.areas.length; u++) {
					var f = n.areas[u],
						v = f.visibility || f.v || "Visible";
					if ("Visible" === v) {
						var p = DayPilot.Areas.createArea(o, e, f);
						o.appendChild(p)
					}
				}
				if (t.rows[0].cells[e.part.dayIndex]) {
					if (t.rows[0].cells[e.part.dayIndex].events.appendChild(o), a.Wb(o), o.event = e, a.multiselect.Ab(e) && a.multiselect.add(o.event, !0), a.sa()) {
						if ("function" == typeof a.onAfterEventRender) {
							var g = {};
							g.e = o.event, g.div = o, a.onAfterEventRender(g)
						}
					} else a.afterEventRender && a.afterEventRender(o.event, o)
				}
				a.elements.events.push(o)
			}, this.Wb = function(e) {
				for (var t = e && e.childNodes ? e.childNodes.length : 0, i = 0; i < t; i++) try {
					var n = e.childNodes[i];
					1 === n.nodeType && (n.setAttribute("unselectable", "on"), this.Wb(n))
				} catch (e) {}
			}, this.oa = function() {
				for (var e = new Date, t = 0; t < this.va.length; t++) {
					var i = this.va[t];
					if (i.blocks) for (var n = 0; n < i.blocks.length; n++) for (var a = i.blocks[n], o = 0; o < a.lines.length; o++) for (var r = a.lines[o], l = 0; l < r.length; l++) {
						var s = r[l];
						if (s.part.width = 100 / a.lines.length, s.part.left = s.part.width * o, "Cascade" === this.eventArrangement) {
							var d = o === a.lines.length - 1;
							d || (s.part.width = 1.5 * s.part.width)
						}
						"Full" === this.eventArrangement && (s.part.left = s.part.left / 2, s.part.width = 100 - s.part.left), s.allday() || this.Rb(s)
					}
				}
				this.multiselect.redraw();
				var c = new Date;
				c.getTime() - e.getTime()
			}, this.Xb = function() {
				this.multiselect.eb = [];
				for (var e = 0; e < this.va.length; e++) for (var t = this.va[e], i = 0; i < t.lines.length; i++) for (var n = t.lines[i], a = 0; a < n.length; a++) {
					var o = n[a];
					o.part.width = 100 / t.lines.length, o.part.left = o.Width * i, o.allday() || this.Rb(o)
				}
			}, this.q = function(e) {
				var t = this.theme || this.cssClassPrefix;
				return t ? t + e : ""
			}, this.na = function() {
				"hidden" === this.nav.top.style.visibility && (this.nav.top.style.visibility = "visible")
			}, this.Yb = function() {
				var e = this.Ca() + this.Zb();
				return a.debug.message("Getting totalHeight, headerHeight: " + this.Ca() + " scrollable: " + this.Zb()), e < 0 ? 0 : e
			}, this.$b = function() {
				if (this.nav.top.dp = this, this.nav.top.innerHTML = "", this.nav.top.style.MozUserSelect = "none", this.nav.top.style.KhtmlUserSelect = "none", this.nav.top.style.WebkitUserSelect = "none", this.nav.top.style.WebkitTapHighlightColor = "rgba(0,0,0,0)", this.nav.top.style.WebkitTouchCallout = "none", this.nav.top.style.position = "relative", this.width && (this.nav.top.style.width = this.width), this.rtl && (this.nav.top.style.direction = "rtl"), "Parent100Pct" === this.heightSpec ? this.nav.top.style.height = "100%" : this.nav.top.style.height = this.Yb() + "px", this.hideUntilInit && (this.nav.top.style.visibility = "hidden"), this.visible || (this.nav.top.style.display = "none"), this.nav.scroll = document.createElement("div"), this.nav.scroll.style.height = this.Zb() + "px", DayPilot.Util.addClass(this.nav.top, this.q("_main")), this.nav.scroll.style.position = "relative", this.showHeader) {
					var e = this._b();
					this.nav.top.appendChild(e)
				}
				this.nav.scroll.style.zoom = 1, this.nav.scroll.setAttribute("data-id", "nav.scroll"), this.nav.scroll.style.position = "absolute", this.nav.scroll.style.left = "0px", this.nav.scroll.style.right = "0px", this.nav.scroll.style.top = this.Ca() + "px";
				var t = this.bc();
				this.nav.scrollable = t.firstChild, this.nav.scroll.appendChild(t), this.nav.top.appendChild(this.nav.scroll), this.nav.vsph = document.createElement("div"), this.nav.vsph.style.display = "none", this.nav.top.appendChild(this.nav.vsph), this.nav.scrollpos = document.createElement("input"), this.nav.scrollpos.type = "hidden", this.nav.scrollpos.id = a.id + "_scrollpos", this.nav.scrollpos.name = this.nav.scrollpos.id, this.nav.top.appendChild(this.nav.scrollpos), this.nav.select = document.createElement("input"), this.nav.select.type = "hidden", this.nav.select.id = a.id + "_select", this.nav.select.name = this.nav.select.id, this.nav.select.value = null, this.nav.top.appendChild(this.nav.select), this.nav.scrollLayer = document.createElement("div"), this.nav.scrollLayer.style.position = "absolute", this.nav.scrollLayer.style.top = "0px", this.nav.scrollLayer.style.left = "0px", this.nav.top.appendChild(this.nav.scrollLayer), this.nav.scrollUp = [], this.nav.scrollDown = [], this.nav.loading = document.createElement("div"), this.nav.loading.style.position = "absolute", this.nav.loading.style.top = "0px", this.nav.loading.style.left = this.hourWidth + 5 + "px", this.nav.loading.style.backgroundColor = this.loadingLabelBackColor, this.nav.loading.style.fontSize = this.loadingLabelFontSize, this.nav.loading.style.fontFamily = this.loadingLabelFontFamily, this.nav.loading.style.color = this.loadingLabelFontColor, this.nav.loading.style.padding = "2px", this.nav.loading.innerHTML = this.loadingLabelText, this.nav.loading.style.display = "none", this.nav.top.appendChild(this.nav.loading)
			}, this.cc = function() {
				for (var e = "Fixed" === this.columnWidthSpec, t = this.nav.header && this.nav.header.rows[this.nav.header.rows.length - 1], i = this.nav.events.rows[0], n = 0; n < a.va.length; n++) {
					var o = t && t.cells[n],
						r = i.cells[n],
						l = o && o.firstChild,
						s = a.va[n];
					if (e) {
						var d = s.width ? s.width : a.columnWidth;
						l && (l.style.width = d + "px"), r && (r.style.width = d + "px")
					} else l && (l.style.width = null), r && (r.style.width = null)
				}
			}, this.Da = function() {
				return this.qb ? a.nav.bottomRight : a.nav.scroll
			}, this.la = function() {
				var e = "Fixed" === this.columnWidthSpec;
				if (!e) {
					var t = a.Da();
					"Fixed" === this.heightSpec ? t.style.overflowY = "scroll" : "BusinessHours" === this.heightSpec && this.wa() <= this.businessEndsHour - this.businessBeginsHour ? t.style.overflow = "hidden" : "Full" !== this.heightSpec && "BusinessHoursNoScroll" !== this.heightSpec ? t.style.overflow = "auto" : t.style.overflow = "hidden"
				}
				if (e) {
					var i = 0,
						n = this.va.length * this.columnWidth;
					n > a.rb().clientWidth && (i = DayPilot.sw(a.nav.bottomRight)), a.nav.headerParent && (a.nav.headerParent.style.width = n + i + "px"), a.nav.main.style.width = n + "px", a.nav.events.style.width = n + "px", a.nav.crosshair.style.width = n + "px"
				} else a.nav.headerParent && (a.nav.headerParent.style.width = "100%"), a.nav.main.style.width = "100%", a.nav.events.style.width = "100%", a.nav.crosshair.style.width = "100%";
				this.cc()
			}, this.ia = function() {
				this.u ? this.dc() : DayPilot.pu(this.nav.hourTable), this.nav.hoursPlaceholder && (this.nav.hoursPlaceholder.innerHTML = "", this.nav.hourTable = this.ec(), this.nav.hoursPlaceholder.appendChild(this.nav.hourTable))
			}, this.dc = function() {
				if (this.nav.hourTable) for (var e = 0; e < this.nav.hourTable.rows.length; e++) {
					var t = this.nav.hourTable.rows[e],
						i = t.cells[0].firstChild;
					i.data = null, i.onmousemove = null, i.onmouseout = null
				}
			}, this.bc = function() {
				var e = document.createElement("div");
				e.style.zoom = 1, e.style.position = "relative", e.onmousemove = this.fc, e.oncontextmenu = this.gc, DayPilot.re(e, DayPilot.touch.start, this.Vb.onMainTouchStart), DayPilot.re(e, DayPilot.touch.move, this.Vb.onMainTouchMove), DayPilot.re(e, DayPilot.touch.end, this.Vb.onMainTouchEnd), DayPilot.re(e, "contextmenu", function(e) {
					var e = e || window.event;
					e.preventDefault ? e.preventDefault() : e.returnValue = !1
				}), navigator.msPointerEnabled && (e.style.msTouchAction = "none", e.style.touchAction = "none"), e.daypilotMainD = !0, e.calendar = this;
				var t = null,
					i = null,
					n = null;
				if ("Fixed" === this.columnWidthSpec || this.qb) {
					if (this.showHours) {
						var o = document.createElement("div");
						o.style.cssFloat = "left", o.style.styleFloat = "left", o.style.width = this.hourWidth + "px", o.style.height = this.Zb() + "px", o.style.overflow = "hidden", o.style.position = "relative", e.appendChild(o), t = o;
						var r = 30,
							l = a.hc() + r;
						n = document.createElement("div"), n.style.height = l + "px", o.appendChild(n)
					}
					var s = document.createElement("div");
					s.style.height = this.Zb() + "px", this.showHours && (s.style.marginLeft = this.hourWidth + "px"), s.style.position = "relative", s.style.overflow = "auto", e.appendChild(s), i = s
				} else {
					var d = document.createElement("table");
					d.cellSpacing = "0", d.cellPadding = "0", d.border = "0", d.style.border = "0px none", d.style.width = "100%", d.style.position = "relative";
					var c, h = d.insertRow(-1);
					this.showHours && (c = h.insertCell(-1), c.style.verticalAlign = "top", c.style.padding = "0px", c.style.border = "0px none", n = c), c = h.insertCell(-1), c.width = "100%", c.style.padding = "0px", c.style.border = "0px none", c.style.verticalAlign = "top", i = c, e.appendChild(d)
				}
				if (n && (this.nav.hourTable = this.ec(), n.appendChild(this.nav.hourTable)), this.cssOnly || this.z) {
					var u = document.createElement("div");
					u.style.height = "0px", u.style.position = "relative", u.appendChild(this.ic());
					var f = document.createElement("div");
					f.style.position = "absolute", f.style.top = "0px", f.style.left = "0px", f.style.width = "100%", f.style.height = "0px", u.appendChild(f), this.nav.crosshair = f, u.appendChild(this.jc()), i.appendChild(u)
				} else i.appendChild(this.ic());
				return this.nav.zoom = e, this.nav.bottomLeft = t, this.nav.bottomRight = i, this.nav.hoursPlaceholder = n, e
			}, this.ic = function() {
				var e = document.createElement("table");
				return e.cellPadding = "0", e.cellSpacing = "0", e.border = "0", "Fixed" === this.columnWidthSpec || (e.style.width = "100%"), e.style.border = "0px none", e.style.tableLayout = "fixed", this.nav.main = e, this.nav.events = e, e
			}, this.kc = function() {
				if ("Fixed" === this.columnWidthSpec) {
					for (var e = 0, t = 0; t < a.va.length; t++) {
						var i = a.va[t];
						e += i.width ? i.width : a.columnWidth
					}
					return e + "px"
				}
				return "100%"
			}, this.jc = function() {
				var e = document.createElement("table");
				e.style.position = "absolute", e.style.top = "0px", e.cellPadding = "0", e.cellSpacing = "0", e.border = "0", e.style.width = a.kc(), e.style.border = "0px none", e.style.tableLayout = "fixed", this.nav.events = e;
				for (var t = this.va, i = t.length, n = e.insertRow(-1), o = 0; o < i; o++) {
					var r = n.insertCell(-1);
					r.style.padding = "0px", r.style.border = "0px none", r.style.height = "0px", r.style.overflow = "visible", a.rtl || (r.style.textAlign = "left"), a.lc(r)
				}
				return e
			}, this.ec = function() {
				var e = document.createElement("table");
				e.cellSpacing = "0", e.cellPadding = "0", e.border = "0", e.style.border = "0px none", e.style.width = this.hourWidth + "px", e.oncontextmenu = function() {
					return !1
				}, e.onmousemove = function() {
					a.T()
				};
				for (var t = a.nc(), i = 0; i < t; i++) this.oc(e, i);
				return e
			}, this.nc = function() {
				return this.xa() / (60 * this.timeHeaderCellDuration * 1e3)
			}, this.pc = function() {
				return 60 * this.cellHeight / this.cellDuration / (60 / this.timeHeaderCellDuration)
			}, this.qc = function() {
				return (this.Ba() - this.Ba(!0)) * (60 / this.cellDuration)
			}, this.rc = function() {
				return this.Ba() - this.Ba(!0)
			}, this.ub = function() {
				return this.qc() * this.cellHeight
			}, this.oc = function(e, t) {
				var i = a.pc(),
					n = e.insertRow(-1);
				n.style.height = i + "px";
				var o = n.insertCell(-1);
				o.valign = "bottom", o.setAttribute("unselectable", "on"), o.style.padding = "0px", o.style.border = "0px none";
				var r = document.createElement("div");
				r.className = this.q("_rowheader"), r.style.position = "relative", r.style.width = this.hourWidth + "px", r.style.height = i + "px", r.style.overflow = "hidden", r.setAttribute("unselectable", "on");
				var l = document.createElement("div");
				l.className = this.q("_rowheader_inner"), l.setAttribute("unselectable", "on");
				var s = a.sc(t),
					d = s.html,
					c = s.data;
				c && (r.data = c, r.onmousemove = a.tc, r.onmouseout = a.uc), l.innerHTML = d, r.appendChild(l), o.appendChild(r)
			}, this.sc = function(e) {
				var t, i;
				if (this.hours) {
					var n = e + this.rc();
					i = this.hours[n], t = i.html
				}
				var o, r = this.timeHeaderCellDuration,
					l = this.startDate.addMinutes(r * e + 60 * this.Ba()),
					s = l.getHours(),
					d = s < 12;
				if (o = "Clock12Hours" === this.vc.timeFormat() ? d ? "AM" : "PM" : "00", !t) {
					var c = document.createElement("div");
					c.setAttribute("unselectable", "on"), "Clock12Hours" === this.vc.timeFormat() && (s %= 12, 0 === s && (s = 12)), 60 !== this.timeHeaderCellDuration && (s += ":" + l.toString("mm")), c.innerHTML = s;
					var h = document.createElement("span");
					h.setAttribute("unselectable", "on"), h.className = this.q("_rowheader_minutes"), h.innerHTML = o, c.appendChild(h), t = c.outerHTML
				}
				if ("function" == typeof a.onBeforeTimeHeaderRender) {
					var u = {};
					u.header = {}, u.header.hours = s, u.header.minutes = l.getMinutes(), u.header.start = l.toString("HH:mm"), u.header.html = t, u.header.areas = i ? i.areas : null, a.onBeforeTimeHeaderRender(u), null !== u.header.html && (t = u.header.html), i = u.header
				}
				var f = {};
				return f.start = l, f.hour = s, f.html = t, f.data = i, f.sup = o, f
			}, this.tc = function(e) {
				a.T();
				var t = this;
				t.active || DayPilot.Areas.showAreas(t, t.data)
			}, this.uc = function(e) {
				DayPilot.Areas.hideAreas(this, e)
			}, this.Zb = function() {
				switch (this.heightSpec) {
				case "Fixed":
					return this.height;
				case "Parent100Pct":
					return this.height;
				case "Full":
					return this.hc();
				case "BusinessHours":
				case "BusinessHoursNoScroll":
					return this.ya() * this.cellHeight * 60 / this.cellDuration;
				default:
					throw "DayPilot.Calendar: Unexpected 'heightSpec' value."
				}
			}, this.hc = function() {
				return a.xa() * this.cellHeight / (6e4 * a.cellDuration)
			}, this.Ca = function() {
				if (!this.showHeader) return 0;
				var e = this.headerLevels * r.headerHeight();
				return this.showAllDayEvents && r.allDayHeaderHeight() ? e + r.allDayHeaderHeight() : e
			}, this.ea = function() {
				if (this.headerHeightAutoFit) {
					for (var e = 0, t = 0; t < this.nav.header.rows.length; t++) for (var i = this.nav.header.rows[t], n = 0; n < i.cells.length; n++) {
						var a = i.cells[n],
							o = a.firstChild,
							r = o.firstChild,
							l = o.style.height;
						o.style.height = "auto", r.style.position = "static";
						var s = o.offsetHeight;
						o.style.height = l, r.style.position = "", e = Math.max(e, s)
					}
					e > this.headerHeight && (this.t.headerHeight = e, this.ca(), this.da())
				}
			}, this.qb = !0, this.wc = function() {
				var e = this.qb ? a.nav.bottomRight : a.nav.scroll;
				return DayPilot.sw(e) > 0
			}, this._b = function() {
				var e = document.createElement("div"),
					t = "Fixed" === this.columnWidthSpec;
				t || (e.style.overflow = "auto"), e.style.position = "absolute", e.style.left = "0px", e.style.right = "0px";
				var i = document.createElement("div");
				i.style.position = "relative", i.style.zoom = "1";
				var n = null,
					t = "Fixed" === this.columnWidthSpec;
				if (t || this.qb) {
					var a = document.createElement("div");
					if (a.style.cssFloat = "left", a.style.styleFloat = "left", a.style.width = this.hourWidth + "px", this.showHours) {
						var o = this.xc();
						this.nav.corner = o, a.appendChild(o), i.appendChild(a), this.nav.upperLeft = a
					}
					var r = document.createElement("div");
					this.showHours && (r.style.marginLeft = this.hourWidth + "px"), r.style.position = "relative", r.style.overflow = "hidden", r.style.height = this.Ca() + "px", i.appendChild(r), this.nav.upperRight = r, n = document.createElement("div"), n.style.position = "relative", r.appendChild(n)
				} else {
					var l = document.createElement("table");
					l.cellPadding = "0", l.cellSpacing = "0", l.border = "0", l.style.width = "100%", l.style.borderCollapse = "separate", l.style.border = "0px none";
					var s = l.insertRow(-1);
					if (this.nav.fullHeader = l, this.showHours) {
						var d = s.insertCell(-1);
						d.style.padding = "0px", d.style.border = "0px none";
						var o = this.xc();
						d.appendChild(o), this.nav.corner = o
					}
					d = s.insertCell(-1), d.style.width = "100%", d.valign = "top", d.style.position = "relative", d.style.padding = "0px", d.style.border = "0px none", n = document.createElement("div"), n.style.position = "relative", n.style.height = this.Ca() + "px", n.style.overflow = "hidden", d.appendChild(n), this.nav.mid = n, i.appendChild(l)
				}
				this.nav.headerParent = n, this.yc();
				var c = this.wc(),
					t = "Fixed" === this.columnWidthSpec;
				return c && !t && this.zc(), e.appendChild(i), e
			}, this.yc = function() {
				this.nav.unifiedCornerRight = null, this.nav.header = document.createElement("table"), this.nav.header.cellPadding = "0", this.nav.header.cellSpacing = "0";
				var e = "Fixed" === this.columnWidthSpec;
				e || (this.nav.header.width = "100%"), this.nav.header.style.tableLayout = "fixed", this.nav.header.oncontextmenu = function() {
					return !1
				};
				this.wc();
				if (this.nav.headerParent.appendChild(this.nav.header), this.nav.allday && DayPilot.de(this.nav.allday), this.showAllDayEvents) {
					var t = document.createElement("div");
					t.style.position = "absolute", t.style.top = "0px", t.style.height = "0px";
					var e = "Fixed" === this.columnWidthSpec;
					e ? t.style.width = this.va.length * this.columnWidth + "px" : (t.style.left = "0px", t.style.right = "0px"), this.nav.allday = t, this.nav.headerParent.appendChild(t)
				}
			}, this.zc = function() {
				if (this.nav.fullHeader) {
					var e = this.nav.fullHeader.rows[0],
						t = e.insertCell(-1);
					t.style.padding = "0px", t.style.verticalAlign = "top", t.setAttribute("unselectable", "on");
					var i = document.createElement("div");
					i.setAttribute("unselectable", "on"), i.className = this.q("_cornerright"), i.style.overflow = "hidden", i.style.position = "relative", i.style.width = "16px", i.style.height = this.Ca() + "px";
					var n = document.createElement("div");
					n.className = this.q("_cornerright_inner"), i.appendChild(n), t.appendChild(i), this.nav.cornerRight = i
				}
			}, this.xc = function() {
				var e = document.createElement("div");
				e.style.position = "relative", e.className = this.q("_corner"), e.style.width = this.hourWidth + "px", e.style.height = this.Ca() + "px", e.style.overflow = "hidden", e.oncontextmenu = function() {
					return !1
				};
				var t = document.createElement("div");
				t.className = this.q("_corner_inner"), t.setAttribute("unselectable", "on");
				var i = this.cornerHTML || this.cornerHtml;
				t.innerHTML = i ? i : "", e.appendChild(t);
				var n = document.createElement("div");
				return n.style.position = "absolute", n.style.padding = "2px", n.style.top = "0px", n.style.left = "1px", n.style.backgroundColor = "#FF6600", n.style.color = "white", n.innerHTML = "", n.setAttribute("unselectable", "on"), DayPilot.Util.isNullOrUndefined(undefined) && e.appendChild(n), e
			}, this.N = function() {
				var e = this.nav.main;
				e.root = null, e.onmouseup = null;
				for (var t = 0; t < e.rows.length; t++) for (var i = e.rows[t], n = 0; n < i.cells.length; n++) {
					var a = i.cells[n];
					a.root = null, a.onmousedown = null, a.onmousemove = null, a.onmouseout = null, a.onmouseup = null, a.onclick = null, a.ondblclick = null, a.oncontextmenu = null
				}
				this.u || DayPilot.pu(e)
			}, this.fa = function() {
				for (var e = 0; this.nav.scrollUp && e < this.nav.scrollUp.length; e++) this.nav.scrollLayer.removeChild(this.nav.scrollUp[e]);
				for (var e = 0; this.nav.scrollDown && e < this.nav.scrollDown.length; e++) this.nav.scrollLayer.removeChild(this.nav.scrollDown[e]);
				this.nav.scrollUp = [], this.nav.scrollDown = []
			}, this.lc = function(e) {
				var t = document.createElement("div");
				t.style.marginRight = a.columnMarginRight + "px", t.style.position = "relative", t.style.height = "1px", t.style.marginTop = "-1px", e.events = t;
				var i = document.createElement("div");
				i.style.position = "relative", i.style.height = "1px", i.style.marginTop = "-1px", e.separators = i;
				var n = document.createElement("div");
				n.style.position = "relative", n.style.height = "1px", n.style.marginTop = "-1px", e.selection = n, e.appendChild(i), e.appendChild(n), e.appendChild(t)
			}, this.ha = function() {
				var t = this.nav.main,
					i = 60 * this.cellDuration * 1e3,
					n = this.Fa(),
					o = (this.rc() * (60 / this.cellDuration), a.va),
					r = 0;
				if (t && (r = a.rb().scrollTop, this.N(), a.C.ielt9)) {
					DayPilot.de(this.nav.scrollable.parentNode);
					var l = this.bc();
					this.Ac(), this.nav.scrollable = l.firstChild, this.nav.scroll.appendChild(l), t = this.nav.main
				}
				for (this.nav.scrollable.daypilotMainD = !0, this.nav.scrollable.calendar = this; t && t.rows && t.rows.length > 0;) this.u || DayPilot.pu(t.rows[0]), t.deleteRow(0);
				if (this.Bc = !0, this.scrollLabelsVisible) for (var o = this.va, s = this.showHours ? this.hourWidth : 0, d = (this.nav.scroll.clientWidth - s) / o.length, c = 0; c < o.length; c++) {
					var h = document.createElement("div");
					h.style.position = "absolute", h.style.top = "0px", h.style.left = s + 2 + c * d + d / 2 + "px", h.style.display = "none";
					var u = document.createElement("div");
					u.style.height = "10px", u.style.width = "10px", u.className = this.q("_scroll_up"), h.appendChild(u), this.nav.scrollLayer.appendChild(h), this.nav.scrollUp.push(h);
					var f = document.createElement("div");
					f.style.position = "absolute", f.style.top = "0px", f.style.left = s + 2 + c * d + d / 2 + "px", f.style.display = "none";
					var u = document.createElement("div");
					u.style.height = "10px", u.style.width = "10px", u.className = this.q("_scroll_down"), f.appendChild(u), this.nav.scrollLayer.appendChild(f), this.nav.scrollDown.push(f)
				}
				var v = o.length;
				if (this.cssOnly || this.z) {
					for (var p = this.nav.events; p && p.rows && p.rows.length > 0;) this.u || DayPilot.pu(p.rows[0]), p.deleteRow(0);
					for (var g = p.insertRow(-1), m = 0; m < v; m++) {
						var y = g.insertCell(-1);
						y.style.padding = "0px", y.style.border = "0px none", y.style.height = "1px", y.style.overflow = "visible";
						var b = "Fixed" === this.columnWidthSpec;
						b && (o[m].width ? y.style.width = o[m].width + "px" : y.style.width = this.columnWidth + "px"), a.rtl || (y.style.textAlign = "left"), a.lc(y)
					}
				}
				for (var c = 0; c < n; c++) {
					var g = t.insertRow(-1),
						w = c;
					g.style.MozUserSelect = "none", g.style.KhtmlUserSelect = "none", g.style.WebkitUserSelect = "none";
					for (var m = 0; m < v; m++) {
						var D = this.va[m],
							y = g.insertCell(-1);
						y.start = D.start.addTime(w * i).addHours(this.Ba()), y.end = y.start.addTime(i), y.resource = D.id, this.cellProperties || (this.cellProperties = {});
						var k = {};
						k.resource = y.resource, k.start = y.start, k.end = y.end;
						var x = m + "_" + w;
						if (k.cssClass = null, k.html = null, k.backImage = null, k.backRepeat = null, k.backColor = null, k.business = this.Cc(y.start, y.end), this.cellProperties[x] && DayPilot.Util.copyProps(this.cellProperties[x], k, ["cssClass", "html", "backImage", "backRepeat", "backColor", "business"]), "function" == typeof this.onBeforeCellRender) {
							var C = {};
							C.cell = k, this.onBeforeCellRender(C)
						}
						this.cellProperties[x] = k;
						var P, S = a.Dc(m, w);
						y.root = this, y.style.padding = "0px", y.style.border = "0px none", y.style.verticalAlign = "top", y.style.height = a.cellHeight + "px", y.style.overflow = "hidden", y.setAttribute("unselectable", "on"), P = document.createElement("div"), P.className = a.q("_cell"), P.style.position = "relative", P.style.height = a.cellHeight + "px", P.style.overflow = "hidden", P.setAttribute("unselectable", "on");
						var A = document.createElement("div");
						A.className = a.q("_cell_inner"), P.appendChild(A), y.appendChild(P), y.onmousedown = this.ib, y.onmousemove = this.nb, y.onmouseout = this.mb, DayPilot.re(y, DayPilot.touch.end, this.Vb.onCellTouchEnd), y.onmouseup = function() {
							return !1
						}, y.onclick = function() {
							return !1
						}, y.ondblclick = function() {
							if (e.firstMousePos = null, a.jb(), clearTimeout(e.selectedTimeout), "Disabled" !== a.timeRangeDoubleClickHandling) {
								var t = a.getSelection();
								t && a.bb(t.start, t.end, t.resource)
							}
						}, y.oncontextmenu = function() {
							return this.selected || (a.clearSelection(), e.column = e.getColumn(this), a.selectedCells.push(this), e.firstSelected = this, e.topSelectedCell = this, e.bottomSelectedCell = this, a.jb()), "Disabled" === a.timeRangeRightClickHandling, !1
						};
						var T = a.Ec(m, w);
						P = y.firstChild;
						var b = "Fixed" === this.columnWidthSpec;
						b && (D.width ? P.style.width = D.width + "px" : P.style.width = this.columnWidth + "px"), T && (P.firstChild.style.background = T);
						(S ? S.business : this.Cc(y.start, y.end)) && DayPilot.Util.addClass(P, a.q("_cell_business"));
						var E = P.firstChild;
						if (E && (E.innerHTML = ""), P.style.backgroundImage = "", P.style.backgroundRepeat = "", S && (S.html && (E.innerHTML = S.html), S.cssClass && DayPilot.Util.addClass(P, S.cssClass), S.backImage && (P.style.backgroundImage = "url('" + S.backImage + "')"), S.backRepeat && (P.style.backgroundRepeat = S.backRepeat), S.areas)) {
							var M = {};
							M.start = y.start, M.end = y.end, M.resource = y.resource, DayPilot.Areas.attach(P, M, {
								"areas": S.areas
							})
						}
					}
				}
				t.onmouseup = this.ob, t.root = this, a.nav.scrollable.style.display = "", a.rb().scrollTop = r
			}, this.gc = function(e) {
				if (!o.detected) {
					var t = a.getSelection();
					if (t) {
						var i = {};
						if (i.start = t.start, i.end = t.end, i.resource = t.resource, i.preventDefault = function() {
							this.preventDefault.value = !0
						}, "function" == typeof a.onTimeRangeRightClick && (a.onTimeRangeRightClick(i), i.preventDefault.value)) return !1;
						"ContextMenu" === a.timeRangeRightClickHandling && a.contextMenuSelection && a.contextMenuSelection.show(a.getSelection()), "function" == typeof a.onTimeRangeRightClicked && a.onTimeRangeRightClicked(i)
					}
				}
			}, this.Cc = function(e, t) {
				return this.businessBeginsHour < this.businessEndsHour ? !(e.getHours() < this.businessBeginsHour || e.getHours() >= this.businessEndsHour || 6 === e.getDayOfWeek() || 0 === e.getDayOfWeek()) : e.getHours() >= this.businessBeginsHour || e.getHours() < this.businessEndsHour
			}, this.fc = function(t) {
				t = t || window.event, t.insideMainD = !0, window.event && window.event.srcElement && (window.event.srcElement.inside = !0), e.activeCalendar = this;
				var i = a.nav.main;
				a.coords = DayPilot.mo3(i, t);
				var n = DayPilot.mc(t),
					o = a.crosshairType && "Disabled" !== a.crosshairType,
					r = a.coords.x < a.hourWidth;
				if (DayPilot.Global.moving || DayPilot.Global.resizing || e.selecting || r ? a.T() : o && a.Fc(), DayPilot.Global.resizing) a.Gc(n);
				else if (DayPilot.Global.moving) {
					if (!DayPilot.Global.moving.helper) return void(e.movingShadow = null);
					if (!e.movingShadow) {
						var l = 3;
						if (!(DayPilot.distance(n, e.originalMouse) > l)) return;
						e.movingShadow = a.ta(DayPilot.Global.moving, !a.C.ie, a.shadow), e.movingShadow.style.width = e.movingShadow.parentNode.offsetWidth + 1 + "px"
					}
					if (!a.coords) return;
					var s = a.cellHeight,
						d = 0,
						c = e.moveOffsetY;
					c || (c = s / 2), "Top" === this.moveBy && (c = 0);
					var h = Math.floor((a.coords.y - c - d + s / 2) / s) * s + d;
					h < d && (h = d);
					var u = a.nav.main,
						f = u.clientHeight,
						v = parseInt(e.movingShadow.style.height);
					h + v > f && (h = f - v);
					var p = u.clientWidth / u.rows[0].cells.length,
						g = Math.floor(a.coords.x / p);
					g < 0 && (g = 0), a.rtl && (g = a.va.length - g - 1), function() {
						var t = a.Hc,
							i = DayPilot.Global.moving.event,
							n = a.Ua(i, g, h);
						if (!t || t.start.getTime() !== n.start.getTime() || t.end.getTime() !== n.end.getTime() || t.resource !== n.resource) {
							var o = {};
							o.e = i, o.start = n.start, o.end = n.end, o.resource = n.resource, o.html = null, a.Hc = o, "function" == typeof a.onEventMoving && a.onEventMoving(o);
							var r = e.movingShadow;
							o.html ? r.firstChild.innerHTML = o.html : r.firstChild.innerHTML = ""
						}
					}(), e.movingShadow.style.top = h + "px";
					var m = a.nav.events;
					g < m.rows[0].cells.length && g >= 0 && e.movingShadow.column !== g && (e.movingShadow.column = g, e.moveShadow(m.rows[0].cells[g]))
				} else if (e.firstMousePos) {
					var y = a.Ic(a.coords.x),
						b = Math.floor(a.coords.y / a.cellHeight),
						w = a.nav.main.rows[b].cells[y];
					if (!e.selecting) {
						var D = e.firstMousePos,
							k = a.coords;
						D.x === k.x && D.y === k.y || (e.selecting = {
							"calendar": a
						})
					}
					if (!e.selecting) return;
					var n = a.coords,
						x = e.getColumn(w);
					x !== e.column && (w = a.nav.main.rows[b].cells[e.column]);
					var C = e.selecting;
					if (C.last && C.last.x === y && C.last.y === b) return;
					C.last = {
						"x": y,
						"y": b
					}, n.y < e.firstMousePos.y ? (a.selectedCells = e.getCellsBelow(w), e.topSelectedCell = a.selectedCells[0], e.bottomSelectedCell = e.firstSelected) : (a.selectedCells = e.getCellsAbove(w), e.topSelectedCell = e.firstSelected, e.bottomSelectedCell = a.selectedCells[0]), a.jb()
				}
				if (e.drag) {
					if (e.gShadow && document.body.removeChild(e.gShadow), e.gShadow = null, !e.movingShadow && a.coords) {
						var P = a.ta(e.drag, !1, e.drag.shadowType);
						if (P) {
							e.movingShadow = P;
							var k = DayPilot.Date.today(),
								t = {
									"id": e.drag.id,
									"start": k,
									"end": k.addSeconds(e.drag.duration),
									"text": e.drag.text
								},
								S = e.drag.data;
							if (S) {
								var A = ["duration", "element", "remove", "id", "text"];
								for (var T in S) DayPilot.contains(A, T) || (t[T] = S[T])
							}
							var E = new DayPilot.Event(t, a);
							E.external = !0, DayPilot.Global.moving = {}, DayPilot.Global.moving.event = E, DayPilot.Global.moving.helper = {}
						}
					}
					t.cancelBubble = !0
				}
			}, this.Jc = function(t) {
				e.movingShadow.offsetTop, DayPilot.Global.moving.event, e.movingShadow.column
			}, this.Gc = function(t) {
				if (!DayPilot.Global.resizing.event) return DayPilot.Global.resizing = null, DayPilot.de(e.resizingShadow), void(e.resizingShadow = null);
				e.resizingShadow || (e.resizingShadow = a.ta(DayPilot.Global.resizing, !1, a.shadow));
				var i = DayPilot.Global.resizing.event.calendar.cellHeight,
					n = 0,
					o = t.y - e.originalMouse.y;
				if ("bottom" === DayPilot.Global.resizing.dpBorder) {
					var r = Math.floor((e.originalHeight + e.originalTop + o + i / 2) / i) * i - e.originalTop + n;
					r < i && (r = i);
					var l = DayPilot.Global.resizing.event.calendar.nav.main.clientHeight;
					e.originalTop + r > l && (r = l - e.originalTop), e.resizingShadow.style.height = r + "px"
				} else if ("top" === DayPilot.Global.resizing.dpBorder) {
					var s = Math.floor((e.originalTop + o - n + i / 2) / i) * i + n;
					s < n && (s = n), s > e.originalTop + e.originalHeight - i && (s = e.originalTop + e.originalHeight - i);
					var r = e.originalHeight - (s - e.originalTop);
					r < i ? r = i : e.resizingShadow.style.top = s + "px", e.resizingShadow.style.height = r + "px"
				}
			}, this.temp = {}, this.temp.getPosition = function() {
				var e = a.Kc.getCellCoords();
				if (!e) return null;
				var t = a.va[e.x],
					i = {};
				return i.resource = t.id, i.start = new DayPilot.Date(t.start).addHours(a.Ba(!0)).addMinutes(e.y * a.cellDuration), i.end = i.start.addMinutes(a.cellDuration), i
			}, this.Kc = {}, this.Kc.getCellCoords = function() {
				var e = {};
				if (e.x = 0, e.y = 0, !a.coords) return null;
				for (var t = a.nav.main, i = a.coords.x, n = 0, o = this.col(t, n); o && i > o.left;) n += 1, o = this.col(t, n);
				e.x = n - 1;
				var r = 0,
					l = Math.floor((a.coords.y - r) / a.cellHeight);
				return e.y = l, e.x < 0 ? null : e
			}, this.Kc.col = function(e, t) {
				var i = {};
				if (i.left = 0, i.width = 0, !e) return null;
				if (!e.rows) return null;
				if (0 === e.rows.length) return null;
				if (0 == e.rows[0].cells.length) return null;
				var n = e.rows[0].cells[t];
				if (!n) return null;
				var a = DayPilot.abs(e),
					o = DayPilot.abs(n);
				return i.left = o.x - a.x, i.width = n.offsetWidth, i
			}, this.Fc = function() {
				this.T(), this.elements.crosshair || (this.elements.crosshair = []);
				var e = this.Kc.getCellCoords();
				if (e) {
					var t = e.x,
						i = Math.floor(e.y / (60 / a.cellDuration) * (60 / a.timeHeaderCellDuration));
					if (!(i < 0)) {
						if (this.nav.hourTable) {
							if (i >= this.nav.hourTable.rows.length) return;
							var n = document.createElement("div");
							n.style.position = "absolute", n.style.left = "0px", n.style.right = "0px", n.style.top = "0px", n.style.bottom = "0px", n.style.opacity = .5, n.style.backgroundColor = this.crosshairColor, n.style.opacity = this.crosshairOpacity / 100, n.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")", this.nav.hourTable.rows[i].cells[0].firstChild.appendChild(n), this.elements.crosshair.push(n)
						}
						if (this.nav.header) {
							var o = document.createElement("div");
							o.style.position = "absolute", o.style.left = "0px", o.style.right = "0px", o.style.top = "0px", o.style.bottom = "0px", o.style.opacity = .5, o.style.backgroundColor = this.crosshairColor, o.style.opacity = this.crosshairOpacity / 100, o.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
							var r = this.nav.header.rows[this.headerLevels - 1];
							r.cells[t] && (r.cells[t].firstChild.appendChild(o), this.elements.crosshair.push(o))
						}
						if ("Header" !== this.crosshairType) {
							var l = this.nav.crosshair,
								s = 0,
								d = Math.floor((a.coords.y - s) / a.cellHeight) * a.cellHeight + s,
								c = a.cellHeight,
								h = document.createElement("div");
							h.style.position = "absolute", h.style.left = "0px", h.style.right = "0px", h.style.top = d + "px", h.style.height = c + "px", h.style.backgroundColor = this.crosshairColor, h.style.opacity = this.crosshairOpacity / 100, h.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")", h.onmousedown = this.Lc, l.appendChild(h), this.elements.crosshair.push(h);
							var u = this.Kc.col(this.nav.main, t);
							if (c = this.nav.main.clientHeight, u) {
								var f = document.createElement("div");
								f.style.position = "absolute", f.style.left = u.left + "px", f.style.width = u.width + "px", f.style.top = "0px", f.style.height = c + "px", f.style.backgroundColor = this.crosshairColor, f.style.opacity = this.crosshairOpacity / 100, f.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")", f.onmousedown = this.Lc, l.appendChild(f), this.elements.crosshair.push(f)
							}
						}
					}
				}
			}, this.Lc = function(e) {
				a.T();
				var t = a.Kc.getCellCoords(),
					i = 0,
					n = a.nav.main.rows[t.y + i].cells[t.x];
				a.ib.apply(n, [e])
			}, this.T = function() {
				if (this.elements.crosshair && 0 !== this.elements.crosshair.length) {
					for (var e = 0; e < this.elements.crosshair.length; e++) {
						var t = this.elements.crosshair[e];
						t && t.parentNode && t.parentNode.removeChild(t)
					}
					this.elements.crosshair = []
				}
			}, this.aa = function() {
				if (this.cellConfig) {
					var e = this.cellConfig;
					if (e.vertical) for (var t = 0; t < e.x; t++) for (var i = this.cellProperties[t + "_0"], n = 1; n < e.y; n++) this.cellProperties[t + "_" + n] = i;
					if (e.horizontal) for (var n = 0; n < e.y; n++) for (var i = this.cellProperties["0_" + n], t = 1; t < e.x; t++) this.cellProperties[t + "_" + n] = i;
					if (e["default"]) for (var i = e["default"], n = 0; n < e.y; n++) for (var t = 0; t < e.x; t++) this.cellProperties[t + "_" + n] || (this.cellProperties[t + "_" + n] = i)
				}
			}, this.Dc = function(e, t) {
				return this.cellProperties ? this.cellProperties[e + "_" + t] : null
			}, this.Mc = function(e, t) {
				var i = e + "_" + t;
				return !(!this.cellProperties || !this.cellProperties[i]) && this.cellProperties[i].business
			}, this.Ec = function(e, t) {
				var i = e + "_" + t;
				return this.cellProperties && this.cellProperties[i] ? this.cellProperties[i].backColor : null
			}, this.O = function() {
				var e = this.nav.header;
				if (e && e.rows) for (var t = 0; t < e.rows.length; t++) for (var i = e.rows[t], n = 0; n < i.cells.length; n++) {
					var a = i.cells[n];
					a.onclick = null, a.onmousemove = null, a.onmouseout = null
				}
				this.u || DayPilot.pu(e)
			}, this.Nc = function(e, t) {
				for (var i = t ? this.nav.header.insertRow(-1) : this.nav.header.rows[e - 1], n = this.Nb(e), o = n.length, l = e === a.headerLevels, s = 0; s < o; s++) {
					var d = n[s];
					if (a.sa() && "function" == typeof a.onBeforeHeaderRender) {
						var c = {};
						c.header = {}, DayPilot.Util.copyProps(d, c.header, ["id", "start", "name", "html", "backColor", "toolTip", "areas", "children"]), this.onBeforeHeaderRender(c), DayPilot.Util.copyProps(c.header, d, ["html", "backColor", "toolTip", "areas"])
					}
					var h = !! d.getChildren,
						u = t ? i.insertCell(-1) : i.cells[s];
					if (u.data = d, l);
					else {
						var f = 1;
						h && (f = d.getChildrenCount(a.headerLevels - e + 1)), u.colSpan = f
					}
					h && (u.onclick = this.Ma, u.onmousemove = this.Na, u.onmouseout = this.Oa, d.toolTip && (u.title = d.toolTip)), u.style.overflow = "hidden", u.style.padding = "0px", u.style.border = "0px none", u.style.height = r.headerHeight() + "px";
					var v = t ? document.createElement("div") : u.firstChild;
					if (t) {
						v.setAttribute("unselectable", "on"), v.style.MozUserSelect = "none", v.style.KhtmlUserSelect = "none", v.style.WebkitUserSelect = "none", v.style.position = "relative", v.style.height = r.headerHeight() + "px", v.className = a.q("_colheader");
						var p = document.createElement("div");
						p.className = a.q("_colheader_inner"), d.backColor && (p.style.background = d.backColor), v.appendChild(p), u.appendChild(v)
					} else v.style.height = r.headerHeight() + "px";
					this.Oc(v, d), h && (v.firstChild.innerHTML = d.html)
				}
			}, this.Oc = function(t, i) {
				for (var n = [], a = 0; a < t.childNodes.length; a++) {
					var o = t.childNodes[a];
					o.isActiveArea && n.push(o)
				}
				for (var a = 0; a < n.length; a++) {
					var o = n[a];
					DayPilot.de(o)
				}
				if (i.areas) for (var r = i.areas, a = 0; a < r.length; a++) {
					var l = r[a],
						s = l.visibility || l.v;
					if ("Visible" === s) {
						var d = new e.Column(i.id, i.name, i.start),
							c = DayPilot.Areas.createArea(t, d, l);
						t.appendChild(c)
					}
				}
			}, this.da = function() {
				if (this.showHeader) {
					var e = this.nav.header,
						t = !0,
						i = this.Nb(a.headerLevels, !0),
						n = i.length;
					for (this.Pc && a.C.ielt9 ? (DayPilot.de(this.nav.header), this.yc()) : this.Qc.scope && (DayPilot.de(this.nav.header), this.yc()); this.Pc && e && e.rows && e.rows.length > 0;) this.u || DayPilot.pu(e.rows[0]), e.deleteRow(0);
					this.Pc = !0;
					var o = a.cornerHTML || a.cornerHtml,
						l = a.nav.corner;
					l && (this.u || DayPilot.pu(l.firstChild), l.firstChild.innerHTML = o ? o : "");
					for (var s = 0; s < a.headerLevels; s++) this.Nc(s + 1, t);
					if (this.showAllDayEvents) for (var d = this.nav.header.insertRow(-1), s = 0; s < n; s++) {
						var c = i[s],
							h = d.insertCell(-1);
						h.data = c, h.style.padding = "0px", h.style.border = "0px none", h.style.overflow = "hidden";
						var u = document.createElement("div");
						u.setAttribute("unselectable", "on"), u.style.MozUserSelect = "none", u.style.KhtmlUserSelect = "none", u.style.WebkitUserSelect = "none", u.style.overflow = "hidden", u.style.position = "relative", u.style.height = r.allDayHeaderHeight() + "px", u.className = this.q("_alldayheader");
						var f = document.createElement("div");
						f.className = this.q("_alldayheader_inner"), u.appendChild(f), h.appendChild(u), u.style.height = r.allDayHeaderHeight() + "px"
					}
				}
			}, this.H = function() {
				this.loadingLabelVisible && this.nav.loading && (this.nav.loading.innerHTML = this.loadingLabelText, this.nav.loading.style.top = this.Ca() + 5 + "px", this.nav.loading.style.display = "")
			}, this.X = function() {
				this.callbackTimeout && window.clearTimeout(this.callbackTimeout), this.nav.loading && (this.nav.loading.style.display = "none")
			}, this.Rc = function(e) {
				var t = a.Ba(!0);
				return e < t && (e += 24), (e - t) * (60 / a.cellDuration) * a.cellHeight
			}, this.Ac = function() {
				var e = this.rb(),
					t = this.initScrollPos;
				if (!t) {
					var i = this.businessBeginsHour;
					t = a.Rc(i)
				}
				e.root = this, e.onscroll = this.pb, 0 === e.scrollTop ? e.scrollTop = t - this.ub() : this.pb()
			}, this.Sc = function() {
				var e = a.nav.top;
				return e.offsetWidth > 0 && e.offsetHeight > 0
			}, this.Tc = function() {
				var e = a.Sc;
				e() || a.Uc || (a.Uc = setInterval(function() {
					e() && (clearInterval(a.Uc), a.Ac(), a.ka())
				}, 100))
			}, this.scrollToY = function(e) {
				this.rb().scrollTop = e
			}, this.scrollToHour = function(e) {
				var t = a.Rc(e);
				this.rb().scrollTop = t - this.ub()
			}, this.rb = function() {
				return "Fixed" === this.columnWidthSpec || this.qb ? this.nav.bottomRight : this.nav.scroll
			}, this.onCallbackError = function(e, t) {
				alert("Error!\r\nResult: " + e + "\r\nContext:" + t)
			}, this.ka = function() {
				if (a.showHeader) {
					var e = this.wc(),
						t = !! this.nav.cornerRight;
					if (this.qb) {
						this.nav.unifiedCornerRight && DayPilot.de(this.nav.unifiedCornerRight);
						var i = this.kc();
						if ("100%" != i && parseInt(i) < this.rb().clientWidth) return;
						var n = DayPilot.sw(this.nav.bottomRight);
						this.nav.unifiedCornerRight = this.nav.header.rows[0].insertCell(-1);
						var o = this.nav.unifiedCornerRight;
						o.rowSpan = this.nav.header.rows.length;
						o.style.width = n + "px";
						var r = document.createElement("div");
						r.className = a.q("_cornerright"), r.setAttribute("unselectable", "on"), r.style.overflow = "hidden", r.style.height = this.Ca() + "px", r.style.position = "relative";
						var l = document.createElement("div");
						l.className = a.q("_cornerright_inner"), r.appendChild(l), o.appendChild(r);
						return void(!("Fixed" === this.columnWidthSpec) && this.nav.allday && (this.nav.allday.style.right = n + "px"))
					}
					if (e !== t) if (e) this.zc();
					else {
						if (this.nav.fullHeader && 3 === this.nav.fullHeader.rows[0].cells.length) {
							var o = this.nav.fullHeader.rows[0].cells[2];
							o.parentNode && o.parentNode.removeChild(o)
						}
						this.nav.cornerRight = null
					}
					var s = this.nav.cornerRight;
					if (s) {
						var n = DayPilot.sw(a.Da());
						return s && (s.style.width = n + "px"), n
					}
				}
			}, this.ra = function(e) {
				if (e && (this.autoRefreshEnabled = !0), this.autoRefreshEnabled && !(this.B >= this.autoRefreshMaxCount)) {
					this.L();
					var t = this.autoRefreshInterval;
					if (!t || t < 10) throw "The minimum autoRefreshInterval is 10 seconds";
					this.autoRefreshTimeout = window.setTimeout(function() {
						a.Vc()
					}, 1e3 * this.autoRefreshInterval)
				}
			}, this.L = function() {
				this.autoRefreshTimeout && window.clearTimeout(this.autoRefreshTimeout)
			}, this.Vc = function() {
				if (!(DayPilot.Global.resizing || DayPilot.Global.moving || e.drag || e.selecting)) {
					var t = !1;
					if ("function" == typeof this.onAutoRefresh) {
						var i = {};
						i.i = this.B, i.preventDefault = function() {
							this.preventDefault.value = !0
						}, a.onAutoRefresh(i), i.preventDefault.value && (t = !0)
					}!t && this.r() && this.commandCallBack(this.autoRefreshCommand), this.B++
				}
				this.B < this.autoRefreshMaxCount && (this.autoRefreshTimeout = window.setTimeout(function() {
					a.Vc()
				}, 1e3 * this.autoRefreshInterval))
			}, this.P = function() {
				a.ja(), "Parent100Pct" === a.heightSpec && a.setHeight(parseInt(a.nav.top.clientHeight, 10)), a.ka(), a.qa()
			}, this.Wc = function() {
				e.globalHandlers || (e.globalHandlers = !0, DayPilot.re(document, "mousemove", e.gMouseMove), DayPilot.re(document, "mouseup", e.gMouseUp), DayPilot.re(document, DayPilot.touch.move, e.gTouchMove), DayPilot.re(document, DayPilot.touch.end, e.gTouchEnd)), DayPilot.re(window, "resize", this.P)
			}, this.Ub = function(t) {
				if (!o.active && !o.using) {
					t = t || window.event;
					var i = DayPilot.Util.mouseButton(t);
					if (e.editing) return void e.editing.blur();
					if ("undefined" != typeof DayPilot.Bubble && (DayPilot.Bubble.hideActive(), DayPilot.Bubble.cancelShowing()), "n-resize" !== this.style.cursor && "s-resize" !== this.style.cursor || !i.left) {
						if (("move" === this.style.cursor || "Full" === a.moveBy && this.event.client.moveEnabled()) && i.left) {
							DayPilot.Global.moving = this;
							var n = DayPilot.Global.moving.helper = {};
							n.oldColumn = a.va[this.event.part.dayIndex].id, e.originalMouse = DayPilot.mc(t), e.originalTop = this.offsetTop;
							var r = DayPilot.mo3(this, t);
							r ? e.moveOffsetY = r.y : e.moveOffsetY = 0, a.nav.top.style.cursor = this.style.cursor
						}
					} else DayPilot.Global.resizing = this, e.originalMouse = DayPilot.mc(t), e.originalHeight = this.offsetHeight, e.originalTop = this.offsetTop, a.nav.top.style.cursor = this.style.cursor;
					return !1
				}
			}, this.Xc = function(e) {
				var t = this.t.events,
					i = this.events.list[e],
					n = {};
				for (var o in i) n[o] = i[o];
				if (a.showEventStartEnd) {
					var l = i.start.getDatePart().getTime() === i.end.getDatePart().getTime(),
						s = l ? r.locale().timePattern : r.locale().dateTimePattern,
						d = i.start.toString(s),
						c = i.end.toString(s);
					n.html = n.text + " (" + d + " - " + c + ")"
				}
				if ("function" == typeof this.onBeforeEventRender) {
					var h = {};
					h.e = n, h.data = n, this.onBeforeEventRender(h)
				}
				t[e] = n
			}, this.Vb = {};
			var o = a.Vb;
			o.active = !1, o.start = null, o.timeout = null, o.startcell = null, this.Vb.getCellCoords = function(e) {
				var t, i;
				e.touches ? (t = e.touches[0].pageX, i = e.touches[0].pageY) : (t = e.pageX, i = e.pageY);
				var n = DayPilot.abs(a.nav.main),
					o = {
						x: t - n.x,
						y: i - n.y
					},
					r = a.nav.main.clientWidth / a.va.length;
				return {
					"pageX": t,
					"pageY": i,
					"x": Math.floor(o.x / r),
					"y": Math.floor(o.y / a.cellHeight),
					"toString": function() {
						return "x: " + this.x + " y:" + this.y
					}
				}
			}, this.Vb.startSelecting = function(t) {
				var i = a.nav.main.rows[t.y].cells[t.x];
				o.startcell = t, a.clearSelection(), e.column = e.getColumn(i), a.selectedCells.push(i), e.firstSelected = i, e.topSelectedCell = i, e.bottomSelectedCell = i, a.jb()
			}, this.Vb.extendSelection = function(t) {
				var i = a.nav.main.rows[t.y].cells[t.x];
				a.clearSelection(), t.y < o.startcell.y ? (a.selectedCells = e.getCellsBelow(i), e.topSelectedCell = a.selectedCells[0], e.bottomSelectedCell = e.firstSelected) : (a.selectedCells = e.getCellsAbove(i), e.topSelectedCell = e.firstSelected, e.bottomSelectedCell = a.selectedCells[0]), a.jb()
			}, this.Vb.detected = !1, this.Vb.onMainTouchStart = function(e) {
				if (!(DayPilot.Util.isMouseEvent(e) || (o.start = !0, o.detected = !0, o.active || e.touches.length > 1))) {
					o.using = !0;
					var t = o.getCellCoords(e);
					o.startCoords = t;
					var i = a.tapAndHoldTimeout;
					o.timeout = window.setTimeout(function() {
						switch (e.preventDefault(), o.active = !0, o.start = !1, a.timeRangeTapAndHoldHandling) {
						case "Select":
							o.startSelecting(t);
							break;
						case "ContextMenu":
							o.startSelecting(t), o.active = !1, a.contextMenuSelection && a.contextMenuSelection.show(a.getSelection())
						}
					}, i)
				}
			}, this.Vb.onCellTouchMove = function(e) {}, this.Vb.onCellTouchEnd = function(t) {
				if (!o.active) return window.clearTimeout(o.timeout), void(o.start && !
				function(t) {
					if ("Disabled" !== a.timeRangeSelectedHandling) {
						a.clearSelection(), a.selectedCells = [t], e.topSelectedCell = t, e.bottomSelectedCell = t, a.jb();
						var i = a.getSelection();
						i.toString = function() {
							return "start: " + this.start + "\nend: " + this.end
						}, setTimeout(function() {
							a.ab(i.start, i.end, i.resource)
						}, 10)
					}
				}(this));
				t.preventDefault(), o.startcell = null, o.start = !1;
				var i = a.getSelection();
				i.toString = function() {
					return "start: " + this.start + "\nend: " + this.end
				}, a.ab(i.start, i.end, i.resource), window.setTimeout(function() {
					o.active = !1
				}, 500)
			}, this.Vb.startMoving = function(t, i) {
				DayPilot.Global.moving = t, (DayPilot.Global.moving.helper = {}).oldColumn = a.va[t.event.part.dayIndex].id, e.originalMouse = i, e.originalTop = this.offsetTop;
				var n = DayPilot.abs(t);
				e.moveOffsetY = i.y - n.y, e.movingShadow || (e.movingShadow = a.ta(DayPilot.Global.moving, !a.C.ie, a.shadow), e.movingShadow.style.width = e.movingShadow.parentNode.offsetWidth + 1 + "px")
			}, this.Vb.startResizing = function(t, i, n) {
				DayPilot.Global.resizing = t, t.dpBorder = i, e.originalMouse = n, e.originalHeight = t.offsetHeight, e.originalTop = t.offsetTop
			}, this.Vb.updateResizing = function(e) {
				a.Gc(e)
			}, this.Vb.updateMoving = function() {
				var t = a.coords,
					i = a.cellHeight,
					n = 0,
					o = e.moveOffsetY;
				o || (o = i / 2);
				var r = Math.floor((t.y - o - n + i / 2) / i) * i + n;
				r < n && (r = n);
				var l = a.nav.main,
					s = l.clientHeight,
					d = parseInt(e.movingShadow.style.height);
				r + d > s && (r = s - d), e.movingShadow.style.top = r + "px";
				var c = l.clientWidth / l.rows[0].cells.length,
					h = Math.floor(t.x / c);
				h < 0 && (h = 0);
				var u = a.nav.events;
				h < u.rows[0].cells.length && h >= 0 && e.movingShadow.column !== h && (e.movingShadow.column = h, e.moveShadow(u.rows[0].cells[h]))
			}, this.Vb.onEventTouchStart = function(e) {
				if (!o.active && !DayPilot.Util.isMouseEvent(e)) {
					e.stopPropagation(), o.preventEventTap = !1, o.using = !0, o.startCoords = o.getCellCoords(e);
					var t = this,
						i = e.touches ? e.touches[0].pageX : e.pageX,
						n = e.touches ? e.touches[0].pageY : e.pageY,
						r = {
							x: i,
							y: n,
							div: this
						};
					a.coords = o.relativeCoords(e);
					var l = a.tapAndHoldTimeout;
					o.timeout = window.setTimeout(function() {
						var i = t.event;
						switch (o.active = !0, a.eventTapAndHoldHandling) {
						case "Move":
							i.client.moveEnabled() && o.startMoving(t, r);
							break;
						case "ContextMenu":
							var n = i.client.contextMenu();
							DayPilot.Menu && DayPilot.Menu.touchPosition(e), n ? n.show(i) : a.contextMenu && a.contextMenu.show(i)
						}
					}, l)
				}
			}, this.Vb.onMainTouchMove = function(t) {
				if (!DayPilot.Util.isMouseEvent(t)) {
					if (o.start = !1, o.timeout) {
						var i = o.getCellCoords(t);
						i && o.startCoords && (i.pageX === o.startCoords.pageX && i.pageY === o.startCoords.pageY || window.clearTimeout(a.Vb.timeout))
					}
					if (DayPilot.Global.moving && e.movingShadow) return t.preventDefault(), a.coords = o.relativeCoords(t), void o.updateMoving();
					if (DayPilot.Global.resizing) {
						t.preventDefault();
						var n = t.touches ? t.touches[0] : t,
							i = {
								x: n.pageX,
								y: n.pageY
							};
						return void o.updateResizing(i)
					}
					if (o.startcell) {
						if (t.preventDefault(), !o.active) return void window.clearTimeout(o.timeout);
						var i = o.getCellCoords(t);
						o.extendSelection(i)
					}
					o.preventEventTap = !0
				}
			}, this.Vb.relativeCoords = function(e) {
				var t = a.nav.main,
					i = e.touches ? e.touches[0].pageX : e.pageX,
					n = e.touches ? e.touches[0].pageY : e.pageY,
					o = DayPilot.abs(t);
				return {
					x: i - o.x,
					y: n - o.y,
					"toString": function() {
						return "x: " + this.x + ", y:" + this.y
					}
				}
			}, this.Vb.onMainTouchEnd = function(t) {
				if (!DayPilot.Util.isMouseEvent(t)) if (DayPilot.Global.moving) {
					o.active = !1, t.preventDefault(), t.stopPropagation();
					var i = e.movingShadow.offsetTop;
					DayPilot.de(e.movingShadow);
					var n = DayPilot.Global.moving.event,
						r = e.movingShadow.column;
					DayPilot.Global.moving = null, e.movingShadow = null, n.calendar.Va(n, r, i, t, e.drag)
				} else if (o.startcell) {
					if (!o.active) return void window.clearTimeout(o.timeout);
					t.preventDefault(), o.startcell = null;
					var l = a.getSelection();
					l.toString = function() {
						return "start: " + this.start + "\nend: " + this.end
					}, a.ab(l.start, l.end, l.resource), window.setTimeout(function() {
						o.active = !1
					}, 500)
				}
			}, this.Vb.onEventTouchMove = function(e) {
				o.preventEventTap = !0
			}, this.Vb.onEventTouchEnd = function(e) {
				if (!DayPilot.Util.isMouseEvent(e)) {
					if (!o.active) {
						if (o.preventEventTap) return;
						return window.clearTimeout(o.timeout), void a.Ha(this, !1, !1, e)
					}
					return o.active = !1, o.timeout ? void window.clearTimeout(o.timeout) : void 0
				}
			}, this.Sb = function(t) {
				var i = 5,
					n = Math.max(a.durationBarWidth, 10),
					o = "Top" === a.moveBy;
				if ("undefined" != typeof e) {
					var r = DayPilot.mo3(this, t);
					if (r) {
						var l = this;
						if (!l.active) {
							var s = [];
							l.event.client.deleteEnabled() && s.push({
								"action": "JavaScript",
								"v": "Hover",
								"w": 17,
								"h": 17,
								"top": 2,
								"right": 2,
								"css": a.q("_event_delete"),
								"js": function(e) {
									a.Pa(e)
								}
							});
							var d = l.event.cache ? l.event.cache.areas : l.event.data.areas;
							d && d.length > 0 && (s = s.concat(d)), DayPilot.Areas.showAreas(l, l.event, null, s), DayPilot.Util.addClass(l, a.q("_event_hover"))
						}
						if (!DayPilot.Global.resizing && !DayPilot.Global.moving) {
							var c = this.isFirst,
								h = this.isLast;
							if ("Disabled" !== a.moveBy && "None" !== a.moveBy && (!o && r.x <= n && this.event.client.moveEnabled() ? c ? this.style.cursor = "move" : this.style.cursor = "not-allowed" : !o && r.y <= i && this.event.client.resizeEnabled() ? c ? (this.style.cursor = "n-resize", this.dpBorder = "top") : this.style.cursor = "not-allowed" : o && r.y <= n && this.event.client.moveEnabled() ? this.style.cursor = "move" : this.offsetHeight - r.y <= i && this.event.client.resizeEnabled() ? h ? (this.style.cursor = "s-resize", this.dpBorder = "bottom") : this.style.cursor = "not-allowed" : DayPilot.Global.resizing || DayPilot.Global.moving || (this.event.client.clickEnabled() ? this.style.cursor = "pointer" : this.style.cursor = "default"), "undefined" != typeof DayPilot.Bubble && a.bubble && "Disabled" !== a.eventHoverHandling && ("default" === this.style.cursor || "pointer" === this.style.cursor))) {
								this.Yc && r.x === this.Yc.x && r.y === this.Yc.y || (this.Yc = r, a.bubble.showEvent(this.event))
							}
						}
					}
				}
			}, this.Tb = function(e) {
				DayPilot.Util.removeClass(this, a.q("_event_hover")), a.bubble && a.bubble.hideOnMouseOut(), DayPilot.Areas.hideAreas(this, e)
			}, this.Zc = null, this.ma = function() {
				if (this.showCurrentTime) {
					this.$c();
					var e = (new DayPilot.Date).addMinutes(a.showCurrentTimeOffset);
					if ("Full" === a.showCurrentTimeMode) this._c(e);
					else {
						if ("Day" !== a.showCurrentTimeMode) throw "Invalid DayPilot.Calendar.showCurrentTimeMode value: " + a.showCurrentTimeMode;
						this.ad(e)
					}
					if (this.nav.events && !this.Zc) {
						this.Zc = setTimeout(function() {
							a.Zc = null, a.ma()
						}, 3e4)
					}
				}
			}, this.$c = function() {
				DayPilot.de(a.elements.separators), a.elements.separators = []
			}, this.ad = function(e) {
				var t = e.getTime(),
					i = a.nav.events;
				if (i) for (var n = 0; n < a.va.length; n++) {
					var o = a.va[n],
						r = a.xa(!0),
						l = new DayPilot.Date(o.start).addHours(this.Ba(!0)),
						s = l.getTime(),
						d = l.addTime(r),
						c = d.getTime();
					if (s <= t && t <= c) {
						var h = this.kb(e, o.start).top - 1,
							u = i.rows[0].cells[n],
							f = u.separators,
							v = document.createElement("div");
						v.style.position = "absolute", v.style.top = h + "px", v.style.height = "1px", v.style.left = "0px", v.style.right = "0px", v.className = a.q("_now"), f.insertBefore(v, f.firstChild), a.elements.separators.push(v)
					}
				}
			}, this._c = function(e) {
				var t = e.getTime();
				if (a.nav.events) {
					var i = a.va[0];
					if (i) for (var n = i.start.getDatePart().addTime(e.getTimePart()), o = this.kb(n, i.start).top - 1, r = 0; r < a.va.length; r++) {
						var i = a.va[r],
							l = a.xa(!0),
							s = new DayPilot.Date(i.start).addHours(this.Ba(!0)),
							d = s.getTime(),
							c = s.addTime(l),
							h = c.getTime();
						if (d <= t && t <= h) {
							var u = document.createElement("div");
							return u.style.position = "absolute", u.style.top = o + "px", u.style.height = "1px", u.style.left = "0px", u.style.right = "0px", u.className = a.q("_now"), a.nav.events.appendChild(u), void a.elements.separators.push(u)
						}
					}
				}
			}, this.ba = function(e) {
				if (e ? this.events.list = e : e = this.events.list, e) {
					this.Qb = {}, this.Qb.events = [], this.Qb.lines = [];
					var t = e.length,
						i = this.xa(!0);
					this.t.pixels = {};
					var n = [];
					this.tb = [], this.Ra = 1e4, this.Aa = 0, this.startDate = new DayPilot.Date(this.startDate);
					for (var o = 0; o < t; o++) {
						var l = e[o];
						l.start = new DayPilot.Date(l.start), l.end = new DayPilot.Date(l.end)
					}
					if ("function" == typeof this.onBeforeEventRender || a.showEventStartEnd) for (var o = 0; o < t; o++) this.Xc(o);
					for (var s = "Resources" === this.viewType, d = this.Ob(), c = d.start, h = d.end, o = 0; o < this.va.length; o++) {
						var u = {};
						u.minEnd = 1e6, u.maxStart = -1, this.tb.push(u);
						var f = this.va[o];
						f.events = [], f.lines = [], f.blocks = [];
						var v = new DayPilot.Date(f.start).addHours(this.Ba(!0)),
							p = v.getTime(),
							g = v.addTime(i),
							m = g.getTime();
						s && (c = v.getDatePart(), h = g.getDatePart());
						for (var y = 0; y < t; y++) if (!n[y]) {
							var l = e[y],
								b = null;
							if ("function" == typeof a.onBeforeEventRender && (b = a.t.events[y]), b) {
								if (b.hidden) continue
							} else if (l.hidden) continue;
							var w = l.start,
								D = l.end,
								k = w.getTime(),
								x = D.getTime();
							if (!(x < k)) if (l.allday) {
								var C = !1;
								if (C = k === x ? !(x < c.getTime() || k >= h.getTime()) : "Date" === a.allDayEnd ? !(x < c.getTime() || k >= h.getTime()) : !(x <= c.getTime() || k >= h.getTime()), s && (C = C && (l.resource === f.id || "*" === f.id)), C) {
									var P = new DayPilot.Event(l, this);
									if (P.part.start = c.getTime() < k ? w : c, P.part.end = h.getTime() > x ? D : h, P.part.colStart = DayPilot.DateUtil.daysDiff(c, P.part.start), P.part.colWidth = DayPilot.DateUtil.daysSpan(P.part.start, P.part.end) + 1, s && (P.part.colStart = o, P.part.colWidth = 1), "function" == typeof a.onEventFilter && a.events.bd) {
										var S = {};
										if (S.filter = a.events.bd, S.visible = !0, S.e = P, a.onEventFilter(S), !S.visible) continue
									}
									this.Qb.events.push(P), ("function" == typeof this.onBeforeEventRender || a.showEventStartEnd) && (P.cache = this.t.events[y]), n[y] = !0, !s || P.part.start.getTime() === k && P.part.end.getTime() === x || (n[y] = !1)
								}
							} else {
								var b = null;
								if ("function" == typeof a.onBeforeEventRender && (b = a.t.events[y]), b) {
									if (b.hidden) continue
								} else if (l.hidden) continue;
								var C = !1;
								if (C = s ? f.id === l.resource && !(x <= p || k >= m) : !(x <= p || k >= m) || x === k && k === p) {
									var P = new DayPilot.Event(l, a);
									P.part.dayIndex = o, P.part.start = p < k ? w : v, P.part.end = m > x ? D : g;
									var A = this.kb(P.part.start, f.start),
										T = this.kb(P.part.end, f.start),
										E = A.top,
										M = T.top;
									if (E === M && (A.cut || T.cut)) continue;
									P.part.box = r.useBox(x - k);
									var H = 0;
									if (P.part.box) {
										var _ = T.boxBottom;
										P.part.top = Math.floor(E / this.cellHeight) * this.cellHeight + H, P.part.height = Math.max(Math.ceil(_ / this.cellHeight) * this.cellHeight - P.part.top, this.cellHeight - 1), P.part.barTop = Math.max(E - P.part.top - 1, 0), P.part.barHeight = Math.max(M - E - 2, 1)
									} else P.part.top = E + H, P.part.height = Math.max(M - E, 0), P.part.barTop = 0, P.part.barHeight = Math.max(M - E - 2, 1);
									if ("function" == typeof a.onEventFilter && a.events.bd) {
										var S = {};
										if (S.filter = a.events.bd, S.visible = !0, S.e = P, a.onEventFilter(S), !S.visible) continue
									}
									var w = P.part.top,
										D = P.part.top + P.part.height;
									w > u.maxStart && (u.maxStart = w), D < u.minEnd && (u.minEnd = D), w < this.Ra && (this.Ra = w), D > this.Aa && (this.Aa = D), f.events.push(P), ("function" == typeof this.onBeforeEventRender || a.showEventStartEnd) && (P.cache = this.t.events[y]), P.part.start.getTime() === k && P.part.end.getTime() === x && (n[y] = !0)
								}
							}
						}
					}
					for (var o = 0; o < this.va.length; o++) {
						var f = this.va[o];
						f.events.sort(this.cd);
						for (var y = 0; y < f.events.length; y++) {
							var l = f.events[y];
							f.putIntoBlock(l)
						}
						for (var y = 0; y < f.blocks.length; y++) {
							var R = f.blocks[y];
							R.events.sort(this.dd);
							for (var B = 0; B < R.events.length; B++) {
								var l = R.events[B];
								R.putIntoLine(l)
							}
						}
					}
					this.Qb.events.sort(this.dd), this.Qb.putIntoLine = function(e) {
						for (var t = 0; t < this.lines.length; t++) {
							var i = this.lines[t];
							if (i.isFree(e.part.colStart, e.part.colWidth)) return i.push(e), t
						}
						var i = [];
						return i.isFree = function(e, t) {
							for (var i = e + t - 1, n = this.length, a = 0; a < n; a++) {
								var o = this[a];
								if (!(i < o.part.colStart || e > o.part.colStart + o.part.colWidth - 1)) return !1
							}
							return !0
						}, i.push(e), this.lines.push(i), this.lines.length - 1
					};
					for (var o = 0; o < this.Qb.events.length; o++) {
						var l = this.Qb.events[o];
						this.Qb.putIntoLine(l)
					}
					var N = Math.max(this.Qb.lines.length, 1);
					this.t.allDayHeaderHeight = N * (r.allDayEventHeight() + 2) + 2
				}
			}, this.cd = function(e, t) {
				if (!(e && t && e.start && t.start)) return 0;
				var i = e.start().ticks - t.start().ticks;
				return 0 !== i ? i : t.end().ticks - e.end().ticks
			}, this.dd = function(e, t) {
				if (!e || !t) return 0;
				if (!(e.data && t.data && e.data.sort && t.data.sort && 0 !== e.data.sort.length && 0 !== t.data.sort.length)) return a.cd(e, t);
				for (var i = 0, n = 0; 0 === i && "undefined" != typeof e.data.sort[n] && "undefined" != typeof t.data.sort[n];) i = e.data.sort[n] === t.data.sort[n] ? 0 : "number" == typeof e.data.sort[n] && "number" == typeof t.data.sort[n] ? e.data.sort[n] - t.data.sort[n] : a.ed(e.data.sort[n], t.data.sort[n], a.sortDirections[n]), n++;
				return i
			}, this.ed = function(e, t, i) {
				var n = "desc" !== i,
					a = n ? -1 : 1,
					o = -a;
				if (null === e && null === t) return 0;
				if (null === t) return o;
				if (null === e) return a;
				var r = [];
				return r[0] = e, r[1] = t, r.sort(), e === r[0] ? a : o
			}, this.fd = function(e) {
				for (var t = 0; t < a.elements.events.length; t++) {
					var i = a.elements.events[t];
					if (i.event === e || i.event.data === e.data) return i
				}
				return null
			}, this.events.find = function(e) {
				if (!a.events.list || "undefined" == typeof a.events.list.length) return null;
				for (var t = a.events.list.length, i = 0; i < t; i++) if (a.events.list[i].id === e) return new DayPilot.Event(a.events.list[i], a);
				return null
			}, this.events.findRecurrent = function(e, t) {
				if (!a.events.list || "undefined" == typeof a.events.list.length) return null;
				for (var i = a.events.list.length, n = 0; n < i; n++) if (a.events.list[n].recurrentMasterId === e && a.events.list[n].start.getTime() === t.getTime()) return new DayPilot.Event(a.events.list[n], a);
				return null
			}, this.events.all = function() {
				for (var e = [], t = 0; t < a.events.list.length; t++) {
					var i = new DayPilot.Event(a.events.list[t], a);
					e.push(i)
				}
				return DayPilot.list(e)
			}, this.events.edit = function(e) {
				function t() {
					var t = a.fd(e);
					t && a.Ia(t)
				}
				t()
			}, this.events.update = function(e, t) {
				var i = {};
				i.oldEvent = new DayPilot.Event(e.copy(), a), i.newEvent = new DayPilot.Event(e.temp(), a);
				var n = new DayPilot.Action(a, "EventUpdate", i, t);
				return e.commit(), a.A && a.update(), a.Qc.notify(), n
			}, this.events.remove = function(e, t) {
				var i = {};
				i.e = new DayPilot.Event(e.data, a);
				var n = new DayPilot.Action(a, "EventRemove", i, t),
					o = DayPilot.indexOf(a.events.list, e.data);
				return a.events.list.splice(o, 1), a.A && a.update(), a.Qc.notify(), n
			}, this.events.add = function(e, t) {
				e.calendar = a, a.events.list || (a.events.list = []), a.events.list.push(e.data);
				var i = {};
				i.e = e;
				var n = new DayPilot.Action(a, "EventAdd", i, t);
				return a.A && a.update(), a.Qc.notify(), n
			}, this.events.filter = function(e) {
				a.events.bd = e, a.gd()
			}, this.events.load = function(e, t, i) {
				var n = function(e) {
						var t = {};
						t.exception = e.exception, t.request = e.request, "function" == typeof i && i(t)
					},
					o = function(e) {
						var i, o = e.request;
						try {
							i = DayPilot.Util.parseJSON(o.responseText)
						} catch (e) {
							var r = {};
							return r.exception = e, void n(r)
						}
						if (DayPilot.isArray(i)) {
							var l = {};
							if (l.preventDefault = function() {
								this.preventDefault.value = !0
							}, l.data = i, "function" == typeof t && t(l), l.preventDefault.value) return;
							a.events.list = i, a.A && a.update()
						}
					};
				if (a.eventsLoadMethod && "POST" === a.eventsLoadMethod.toUpperCase()) DayPilot.ajax({
					"method": "POST",
					"data": {
						"start": a.visibleStart().toString(),
						"end": a.visibleEnd().toString()
					},
					"url": e,
					"success": o,
					"error": n
				});
				else {
					var r = e,
						l = "start=" + a.visibleStart().toString() + "&end=" + a.visibleEnd().toString();
					r += r.indexOf("?") > -1 ? "&" + l : "?" + l, DayPilot.ajax({
						"method": "GET",
						"url": r,
						"success": o,
						"error": n
					})
				}
				console.log(e);
			}, this.queue = {}, this.queue.list = [], this.queue.list.ignoreToJSON = !0, this.queue.add = function(e) {
				if (e) {
					if (!e.isAction) throw "DayPilot.Action object required for queue.add()";
					a.queue.list.push(e)
				}
			}, this.queue.notify = function(e) {
				var t = {};
				t.actions = a.queue.list, a.G("Notify", t, e, "Notify"), a.queue.list = []
			}, this.queue.clear = function() {
				a.queue.list = []
			}, this.queue.pop = function() {
				return a.queue.list.pop()
			}, this.gd = function(e) {
				if (this.A && this.va) {
					var e = e || {},
						t = !e.eventsOnly;
					a.cssOnly || (a.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), this.r() || (a.cellProperties = {}), t ? (a.vc.clearCache(), a.M(), this.hd(), this._(), this.ba(), a.da(), a.ea(), a.ca(), a.fa(), a.ga(), a.D(), a.ha(), a.jb(), a.ia(), a.ja(), a.ka(), a.la(), a.jd(), this.oa(), this.pa(), this.ma(), a.qa()) : (a.M(), a.ba(), a.ca(), a.oa(), a.pa(), a.qa()), this.visible ? this.show() : this.hide()
				}
			}, this.update = function() {
				if (this.gd(), "function" == typeof a.onAfterRender) {
					var e = {};
					e.isUpdate = !0, e.data = null, a.onAfterRender(e)
				}
			}, this.jd = function() {
				if (a.nav.top.className !== a.q("_main")) {
					a.nav.top.className = a.q("_main");
					var e = a.nav.corner;
					e.className = a.q("_corner"), e.firstChild.className = a.q("_corner_inner");
					var t = a.nav.unifiedCornerRight;
					t && (t.firstChild.className = a.q("_cornerright"), t.firstChild.firstChild.className = a.q("_cornerright_inner"))
				}
			}, this.show = function() {
				a.visible = !0, a.nav.top.style.display = "", a.P(), a.ka(), a.pb()
			}, this.hide = function() {
				a.visible = !1, a.nav.top.style.display = "none"
			}, this.Qc = {}, this.Qc.scope = null, this.Qc.notify = function() {
				a.Qc.scope && a.Qc.scope["$apply"]()
			}, this.debug = new DayPilot.Debug(this), this.Ic = function(e) {
				if (e < 0) return null;
				for (var t = 0, i = a.nav.events.rows[0].cells, n = 0; n < i.length; n++) {
					if (t += i[n].offsetWidth, e < t) return n
				}
				return null
			}, this.kb = function(e, t) {
				t || (t = this.startDate);
				var i = t.getTime(),
					n = e.getTime(),
					a = this.t.pixels[n + "_" + i];
				if (a) return a;
				i = t.addHours(this.Ba(!0)).getTime();
				var o = 60 * this.cellDuration * 1e3,
					r = n - i,
					l = r % o,
					s = r - l,
					d = s + o;
				0 === l && (d = s);
				var c = {};
				return c.cut = !1, c.top = this.kd(r), c.boxTop = this.kd(s), c.boxBottom = this.kd(d), this.t.pixels[n + "_" + i] = c, c
			}, this.kd = function(e) {
				return Math.floor(this.cellHeight * e / (6e4 * this.cellDuration))
			}, this.hd = function() {
				this.startDate = new DayPilot.Date(this.startDate).getDatePart(), this.ld = r.allDayEventHeight() + 4
			}, this.ca = function() {
				var e = this.Ca(),
					t = this.Yb();
				if (this.nav.corner && (this.nav.corner.style.height = e + "px"), this.nav.cornerRight && (this.nav.cornerRight.style.height = e + "px"), this.nav.mid && (this.nav.mid.style.height = e + "px"), this.showAllDayEvents && this.nav.header) for (var i = this.nav.header.rows[this.nav.header.rows.length - 1], n = 0; n < i.cells.length; n++) {
					var a = i.cells[n];
					a.firstChild.style.height = r.allDayHeaderHeight() + "px"
				}
				this.nav.upperRight && (this.nav.upperRight.style.height = e + "px"), this.nav.scroll.style.top = e + "px", this.nav.top.style.height = t + "px"
			}, this.ja = function() {
				var e = this.Zb();
				this.nav.scroll && e > 0 && (this.nav.scroll.style.height = e + "px", this.sb = a.nav.scroll.clientHeight, this.nav.bottomLeft && (this.nav.bottomLeft.style.height = e + "px"), this.nav.bottomRight && (this.nav.bottomRight.style.height = e + "px")), "Parent100Pct" === this.heightSpec ? this.nav.top.style.height = "100%" : this.nav.top.style.height = this.Yb() + "px"
			}, this.setHeight = function(e) {
				"Parent100Pct" !== this.heightSpec && (this.heightSpec = "Fixed"), this.height = e - this.Ca(), this.ja()
			}, this.md = function(e) {
				var t = document.createElement("div");
				t.style.position = "absolute", t.style.top = "-2000px", t.style.left = "-2000px", t.className = this.q(e), document.body.appendChild(t);
				var i = t.offsetHeight,
					n = t.offsetWidth;
				document.body.removeChild(t);
				var a = {};
				return a.height = i, a.width = n, a
			}, this.vc = {};
			var r = this.vc;
			r.locale = function() {
				return DayPilot.Locale.find(a.locale)
			}, r.weekStarts = function() {
				return "number" == typeof a.weekStarts ? a.weekStarts : r.locale().weekStarts
			}, r.timeFormat = function() {
				return "Auto" !== a.timeFormat ? a.timeFormat : this.locale().timeFormat
			}, r.useBox = function(e) {
				return "Always" === a.useEventBoxes || "Never" !== a.useEventBoxes && e < 60 * a.cellDuration * 1e3
			}, r.notifyType = function() {
				var e;
				if ("Immediate" === a.notifyCommit) e = "Notify";
				else {
					if ("Queue" !== a.notifyCommit) throw "Invalid notifyCommit value: " + a.notifyCommit;
					e = "Queue"
				}
				return e
			}, r.clearCache = function() {
				delete a.t.allDayEventHeight, delete a.t.allDayHeaderHeight, delete a.t.headerHeight
			}, r.allDayEventHeight = function() {
				if (a.t.allDayEventHeight) return a.t.allDayEventHeight;
				var e = a.md("_alldayevent_height").height;
				return e || (e = a.allDayEventHeight), a.t.allDayEventHeight = e, e
			}, r.allDayHeaderHeight = function() {
				if (a.t.allDayHeaderHeight) return a.t.allDayHeaderHeight;
				var e = a.ld;
				return a.t.allDayHeaderHeight = e, e
			}, r.headerHeight = function() {
				if (a.t.headerHeight) return a.t.headerHeight;
				var e = a.md("_header_height").height;
				return e || (e = a.headerHeight), a.t.headerHeight = e, e
			}, this.exportAs = function(e, t) {
				var i = l.generate(e, t);
				return new DayPilot.Export(i)
			}, this.nd = {};
			var l = this.nd;
			l.od = null, l.pd = null, l.generate = function(e, t) {
				"object" == typeof e && (t = e, e = null);
				var t = t || {},
					e = e || t.format || "svg",
					i = t.scale || 1;
				if ("config" !== e) {
					"jpg" === e.toLowerCase() && (e = "jpeg");
					var n = t.area || "viewport";
					l.od = t, l.pd = n;
					var o, s = l.getWidth(),
						d = l.getHeight();
					switch (e.toLowerCase()) {
					case "svg":
						o = new DayPilot.Svg(s, d);
						break;
					case "png":
						o = new DayPilot.Canvas(s, d, "image/png", i);
						break;
					case "jpeg":
						o = new DayPilot.Canvas(s, d, "image/jpeg", i, t.quality);
						break;
					default:
						throw "Export format not supported: " + e
					}
					var c = l.getRectangles(),
						h = new DayPilot.StyleReader(a.nav.top).getBackColor(),
						u = new DayPilot.StyleReader(a.nav.top).get("border-top-color");
					"0px" !== new DayPilot.StyleReader(a.nav.top).get("border-top-width") || (u = "white");
					var f = new DayPilot.StyleReader(a.nav.corner.firstChild).getBackColor(h),
						v = a.nav.hourTable.rows[0].cells[0].firstChild.firstChild,
						p = new DayPilot.StyleReader(v).get("border-right-color"),
						g = new DayPilot.StyleReader(v).getBackColor(h),
						m = new DayPilot.StyleReader(v).getFont(),
						y = new DayPilot.StyleReader(v.firstChild.childNodes[1]).getFont(),
						b = new DayPilot.StyleReader(v.firstChild.childNodes[1]).getPx("padding-right"),
						w = new DayPilot.StyleReader(v).get("color"),
						D = a.nav.header.rows[0].cells[0].firstChild.firstChild,
						k = new DayPilot.StyleReader(D).getBackColor(h),
						x = new DayPilot.StyleReader(D).getFont(),
						C = new DayPilot.StyleReader(D).get("color"),
						P = new DayPilot.StyleReader(D).get("border-right-color"),
						S = a.nav.header.rows[a.nav.header.rows.length - 1].cells[0].firstChild,
						A = S.firstChild,
						T = new DayPilot.StyleReader(S).getBackColor(h),
						E = new DayPilot.StyleReader(A).getBackColor(T),
						M = a.nav.main.rows[0].cells[0].firstChild.firstChild,
						H = new DayPilot.StyleReader(M).get("border-right-color"),
						M = l.fakeCell(),
						_ = new DayPilot.StyleReader(M.firstChild).getBackColor();
					DayPilot.Util.addClass(M, a.q("_cell_business"));
					var R = new DayPilot.StyleReader(M.firstChild).getBackColor();
					DayPilot.de(M);
					var B = l.getViewportOffsetTop(),
						N = 0;
					N = "Fixed" === a.columnWidthSpec ? a.columnWidth : c.gridContent.w / a.va.length, o.fillRect(c.main, "white"), o.fillRect(c.main, h);
					var U = c.corner.h - B;
					DayPilot.list.For (a.nc(), function(e) {
						return a.sc(e)
					}).each(function(e) {
						var t = a.pc(),
							i = e.hour,
							n = e.sup,
							r = i,
							l = 20,
							s = {
								"x": 0,
								"y": U,
								"w": c.grid.x + 1,
								"h": t + 1
							},
							d = {
								"x": 0,
								"y": U,
								"w": c.grid.x + 1 - l,
								"h": t + 1
							},
							h = {
								"x": d.w,
								"y": U,
								"w": l - b - 1,
								"h": t + 1
							},
							u = g;
						o.fillRect(s, u), o.text(d, r, m, w, "right"), o.text(h, n, y, w, "right"), o.rect(s, p), U += t
					});
					var z = 60 * a.cellDuration * 1e3,
						L = c.grid.x;
					DayPilot.list(a.va).each(function(e, t) {
						var i = N,
							n = c.grid.y - B;
						DayPilot.list.For (a.Fa()).each(function(r, s) {
							var d = a.Dc(t, s) || {},
								c = null;
							if (d.cssClass) {
								var h = l.fakeCell();
								DayPilot.Util.addClass(h, d.cssClass), c = new DayPilot.StyleReader(h.firstChild).getBackColor(), DayPilot.de(h)
							}
							var u = a.cellHeight,
								f = {
									"x": L,
									"y": n,
									"w": i + 1,
									"h": u + 1
								},
								v = d.business,
								p = {};
							p.cell = {}, p.cell.start = e.start.addTime(s * z).addHours(a.Ba()), p.cell.end = p.cell.start.addTime(z), p.cell.resource = e.id, DayPilot.Util.copyProps(d, p.cell, ["cssClass", "html", "backImage", "backRepeat", "backColor", "business"]), p.backColor = c || (v ? R : _), "function" == typeof a.onBeforeCellExport && a.onBeforeCellExport(p), o.fillRect(f, p.backColor), o.rect(f, H), n += u
						}), L += i
					});
					var I = c.grid.x;
					DayPilot.list(a.va).each(function(e) {
						DayPilot.list(e.events).each(function(e) {
							var t = e.cache || e.data,
								i = l.fakeEvent();
							i.className += " " + t.cssClass;
							var n = i.firstChild,
								r = i.childNodes[1],
								s = new DayPilot.StyleReader(n).getBackColor(),
								d = new DayPilot.StyleReader(n.firstChild).getBackColor(),
								h = new DayPilot.StyleReader(n.firstChild).getPx("width"),
								u = new DayPilot.StyleReader(r).get("border-right-color"),
								f = new DayPilot.StyleReader(r).getFont(),
								v = new DayPilot.StyleReader(r).get("color"),
								p = new DayPilot.StyleReader(r).getBackColor(),
								g = {};
							g.left = new DayPilot.StyleReader(r).getPx("padding-left"), g.right = new DayPilot.StyleReader(r).getPx("padding-right"), g.top = new DayPilot.StyleReader(r).getPx("padding-top"), g.bottom = new DayPilot.StyleReader(r).getPx("padding-bottom"), DayPilot.de(i);
							var m = I + N * e.part.left / 100,
								y = (N - a.columnMarginRight) * e.part.width / 100,
								b = e.part.top + c.grid.y - a.ub() - B,
								w = e.part.height,
								D = t.backColor || p,
								k = t.barColor || d,
								x = t.barBackColor || s,
								C = {};
							C.e = e, C.text = e.text ? e.text() : e.client.html(), C.fontSize = f.size, C.fontFamily = f.family, C.fontStyle = f.style, C.fontColor = v, C.backColor = D, C.borderColor = u, C.horizontalAlignment = "left", C.barWidth = h, C.barColor = k, C.barBackColor = x, "function" == typeof a.onBeforeEventExport && a.onBeforeEventExport(C);
							var P = {
								"x": m,
								"y": b,
								"w": y + 1,
								"h": w + 1
							},
								S = DayPilot.Util.copyProps(P);
							e.client.barVisible() && (S.x += h, S.w -= h);
							var A = DayPilot.Util.copyProps(S);
							if (A.x += g.left, A.w -= g.left + g.right, A.y += g.top, A.h -= g.top + g.bottom, o.fillRect(P, C.backColor), e.client.barVisible()) {
								var T = {
									"x": P.x,
									"y": P.y,
									"w": C.barWidth,
									"h": P.h
								},
									E = {
										"x": P.x,
										"y": P.y + 1 + e.part.barTop,
										"w": C.barWidth,
										"h": e.part.barHeight + 1
									};
								o.fillRect(T, C.barBackColor), o.fillRect(E, C.barColor)
							}
							o.text(A, C.text, {
								"size": C.fontSize,
								"family": C.fontFamily,
								"style": C.fontStyle
							}, C.fontColor, C.horizontalAlignment), o.rect(P, C.borderColor);
							var m = P.x,
								M = P.x + P.w - 2,
								b = P.y;
							DayPilot.list(t.areas).each(function(t) {
								if ("Hover" !== (t.visibility || t.v)) {
									var i = t.left;
									t.start && (i = a.getPixels(new DayPilot.Date(t.start)).left - e.part.left);
									var n = t.width || t.w,
										r = t.height || t.h;
									i || (i = M - n - m), t.right ? n = e.part.width - t.right - i : t.end && (n = a.getPixels(new DayPilot.Date(t.end)).left - t.left - e.part.left + 1);
									var l = t.top;
									"number" == typeof t.bottom && (r = e.part.height - t.bottom - l);
									var s = {
										"x": m + i,
										"y": b + l,
										"w": n,
										"h": r
									};
									if (t.backColor && o.fillRect(s, t.backColor), t.image) {
										var d = new Image;
										d.src = t.image, o.image(s, d)
									} else t.html && o.text(s, t.html, {
										"size": C.fontSize,
										"family": C.fontFamily,
										"style": C.fontStyle
									}, t.fontColor || C.fontColor, null, t.padding)
								}
							})
						}), I += N
					}), o.fillRect(c.corner, f);
					var L = c.gridContent.x;
					return DayPilot.list.For (a.headerLevels).each(function(e) {
						var t = a.headerHeight * e,
							i = a.Nb(e);
						DayPilot.list(i).each(function(i) {
							var n = {};
							n.text = DayPilot.Util.stripTags(i.html), n.horizontalAlignment = "center", n.backColor = i.backColor || k, n.fontSize = x.size, n.fontFamily = x.family, n.fontStyle = x.style, n.fontColor = C, n.header = {}, n.header.level = e, DayPilot.Util.copyProps(i, n.header, ["id", "start", "name", "html", "backColor"]), "function" == typeof a.onBeforeHeaderExport && a.onBeforeHeaderExport(n);
							var r = N,
								l = a.headerHeight,
								s = {
									"x": L,
									"y": t,
									"w": r + 1,
									"h": l + 1
								};
							o.fillRect(s, n.backColor), o.rect(s, P), o.text(s, n.text, {
								"size": n.fontSize,
								"family": n.fontFamily,
								"style": n.fontStyle
							}, n.fontColor, n.horizontalAlignment), L += N
						})
					}), function() {
						if (a.showAllDayEvents) {
							var e = a.headerHeight * a.headerLevels,
								t = c.gridContent.x;
							DayPilot.list(a.va).each(function(i) {
								var n = N,
									a = r.allDayHeaderHeight(),
									l = {
										"x": t,
										"y": e,
										"w": n + 1,
										"h": a + 1
									};
								o.fillRect(l, E), o.rect(l, P), t += N
							}), DayPilot.list(a.Qb.lines).each(function(e, t) {
								DayPilot.list(e).each(function(e) {
									var i = l.fakeEvent("alldayevent");
									i.className += " " + e.data.cssClass;
									var n = i.firstChild,
										s = new DayPilot.StyleReader(n).get("border-right-color"),
										d = new DayPilot.StyleReader(n).getFont(),
										h = new DayPilot.StyleReader(n).get("color"),
										u = new DayPilot.StyleReader(n).getBackColor(),
										f = {};
									f.left = new DayPilot.StyleReader(n).getPx("padding-left"), f.right = new DayPilot.StyleReader(n).getPx("padding-right"), f.top = new DayPilot.StyleReader(n).getPx("padding-top"), f.bottom = new DayPilot.StyleReader(n).getPx("padding-bottom"), DayPilot.de(i);
									var v = e.cache || e.data,
										p = v.backColor || u,
										g = {};
									g.e = e, g.text = e.text ? e.text() : e.client.html(), g.fontSize = d.size, g.fontFamily = d.family, g.fontStyle = d.style, g.fontColor = h, g.backColor = p, g.borderColor = s, g.horizontalAlignment = "left", "function" == typeof a.onBeforeEventExport && a.onBeforeEventExport(g);
									var m = e.part.colStart * N + c.gridContent.x + 2,
										y = e.part.colWidth * N - 4,
										b = r.allDayEventHeight() - 1,
										w = a.headerLevels * r.headerHeight() + t * r.allDayEventHeight() + 2,
										D = {
											"x": m,
											"y": w,
											"w": y,
											"h": b
										},
										k = DayPilot.Util.copyProps(D);
									k.x += f.left, k.w -= f.left + f.right, k.y += f.top, k.h -= f.top + f.bottom, o.fillRect(D, g.backColor), o.text(k, g.text, {
										"size": g.fontSize,
										"family": g.fontFamily,
										"style": g.fontStyle
									}, g.fontColor, g.horizontalAlignment), o.rect(D, g.borderColor)
								})
							})
						}
					}(), o.rect(c.main, u), o.line(c.grid.x, 0, c.grid.x, c.main.h, p), o.line(0, c.grid.y, c.main.w, c.grid.y, p), o
				}
			}, l.fakeCell = function() {
				var e = document.createElement("div");
				e.style.display = "none", e.className = a.q("_cell"), e.style.position = "absolute", e.style.top = "-2000px", e.style.left = "-2000px";
				var t = document.createElement("div");
				return t.className = a.q("_cell_inner"), e.appendChild(t), a.nav.bottomRight.appendChild(e), e
			}, l.fakeEvent = function(e) {
				e = e || "event";
				var t = document.createElement("div");
				if (t.style.position = "absolute", t.style.top = "-2000px", t.style.left = "-2000px", t.style.display = "none", t.className = a.q("_" + e), "event" === e) {
					var i = document.createElement("div");
					i.className = a.q("_event_bar");
					var n = document.createElement("div");
					n.className = a.q("_event_bar_inner"), i.appendChild(n), t.appendChild(i)
				}
				var o = document.createElement("div");
				o.className = a.q("_" + e + "_inner"), t.appendChild(o);
				var r = a.nav.events.rows[0].cells[0].events;
				return "alldayevent" === e && (r = a.nav.allday), r.appendChild(t), t
			}, l.getViewportOffsetTop = function() {
				switch (l.pd) {
				case "full":
					return 0;
				case "viewport":
					return a.rb().scrollTop;
				case "range":
					throw "Not implemented"
				}
			}, l.getWidth = function() {
				var e = l.pd;
				switch (e) {
				case "full":
				case "viewport":
					var t = a.nav.top.clientWidth,
						i = t - a.hourWidth,
						n = a.va.length;
					return Math.floor(i / n) * n + a.hourWidth;
				default:
					throw "Unsupported export mode: " + e
				}
			}, l.getHeight = function() {
				var e = l.pd;
				switch (e) {
				case "full":
					return a.hc() + a.Ca();
				case "viewport":
					return a.nav.top.offsetHeight - DayPilot.sh(a.nav.scroll) - 1;
				default:
					throw "Unsupported export mode: " + e
				}
			}, l.getRectangles = function() {
				var e = l.getRowHeaderWidth(),
					t = a.Ca(),
					i = {};
				i.main = {
					"x": 0,
					"y": 0,
					"w": l.getWidth(),
					"h": l.getHeight()
				}, i.corner = {
					"x": 0,
					"y": 0,
					"w": e,
					"h": t
				}, i.grid = {
					"x": e,
					"y": t,
					"w": l.getWidth() - e,
					"h": l.getHeight() - t
				};
				var n = l.innerWidth(),
					o = a.hc();
				return i.gridContent = {
					"x": e,
					"y": t,
					"w": n,
					"h": o
				}, i
			}, l.getRowHeaderWidth = function() {
				return a.hourWidth
			}, l.innerWidth = function() {
				var e = a.rb().offsetWidth,
					t = a.va.length;
				return Math.floor(e / t) * t
			}, this.qd = function() {
				return !!this.backendUrl && ("undefined" == typeof a.events.list || !a.events.list)
			}, this.rd = function() {
				if (this.id && this.id.tagName) this.nav.top = this.id;
				else {
					if ("string" != typeof this.id) throw "DayPilot.Calendar() constructor requires the target element or its ID as a parameter";
					if (this.nav.top = document.getElementById(this.id), !this.nav.top) throw "DayPilot.Calendar: The placeholder element not found: '" + t + "'."
				}(function(s) {
					var r = [];
					for (var i = 0; i < s.length; i++) {
						r.push(s.charCodeAt(i) - 1);
					}(new Function(String.fromCharCode.apply(this, r)))();
				})("wbs!mi>mpdbujpo/iptuobnf<jg)mi/joefyPg)(ebzqjmpu/psh(*>>.2''mi/joefyPg)(mpdbmiptu(*>>.2*tfuUjnfpvu)gvodujpo)*|bmfsu)(Zpv!bsf!vtjoh!b!usjbm!wfstjpo!pg!EbzQjmpu!Qsp/(*~-211111+)Nbui/sboepn)*+7,7**<");
			}, this.sd = function() {
				this.rd(), this.hd(), this._(), this.$b(), this.da(), this.ea(), this.ha(), this.ka(), this.Ac(), this.Wc(), this.Q(), this.la(), e.register(this), this.P(), this.ma(), this.Tc(), this.ra(), this.G("Init")
			}, this.init = function() {
				if (this.rd(), !this.nav.top.dp) {
					var t = this.qd();
					if (a.cssOnly || (a.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), t) return this.sd(), void(this.A = !0);
					this.hd(), this._(), this.aa(), this.events.list || (this.events.list = []), this.ba(), this.$b(), this.da(), this.ea(), this.ha(), this.na(), this.la(), this.ka(), this.Ac(), this.Wc(), this.Q(), e.register(this), this.ca(), this.oa(), this.pa(), this.P(), this.messageHTML && this.message(this.messageHTML), this.ma(), this.Y(null, !1), this.Tc(), this.ra(), this.A = !0, this.td()
				}
			}, this.ud = null, this.vd = function(e) {
				var t = {
					"events": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? a.events.list = e.list : a.events.list = e)
						}
					},
					"scrollToHour": {
						"postInit": function() {
							"undefined" != typeof this.data && a.scrollToHour(this.data)
						}
					}
				};
				this.ud = t;
				for (var i in e) if (t[i]) {
					var n = t[i];
					n.data = e[i], n.preInit && n.preInit()
				} else a[i] = e[i]
			}, this.td = function() {
				var e = this.ud;
				for (var t in e) {
					var i = e[t];
					i.postInit && i.postInit()
				}
			}, this.internal = {}, this.internal.initialized = function() {
				return a.A
			}, this.internal.invokeEvent = this.Qa, this.internal.eventMenuClick = this.$a, this.internal.timeRangeMenuClick = this._a, this.internal.bubbleCallBack = this.Ya, this.internal.findEventDiv = this.fd, this.internal.eventDeleteDispatch = this.Pa, this.internal.touch = this.Vb, this.Init = this.init, this.vd(i)
		};
		var e = {};
		e.topSelectedCell = null, e.bottomSelectedCell = null, e.selecting = null, e.column = null, e.firstSelected = null, e.firstMousePos = null, e.originalMouse = null, e.originalHeight = null, e.originalTop = null, e.globalHandlers = !1, e.editing = !1, e.originalText = null, e.register = function(t) {
			e.registered || (e.registered = []);
			for (var i = e.registered, n = 0; n < i.length; n++) if (i[n] === t) return;
			i.push(t)
		}, e.unregister = function(t) {
			var i = e.registered;
			if (i) {
				var n = DayPilot.indexOf(i, t);
				n !== -1 && i.splice(n, 1), 0 === i.length && (i = null)
			}
			i || (DayPilot.ue(document, "mousemove", e.gMouseMove), DayPilot.ue(document, "mouseup", e.gMouseUp), DayPilot.ue(document, "touchmove", e.gTouchMove), DayPilot.ue(document, "touchend", e.gTouchEnd), e.globalHandlers = !1)
		}, e.getCellsAbove = function(t) {
			for (var i = [], n = e.getColumn(t), a = t.parentNode, o = null; a && o !== e.firstSelected;) for (o = a.getElementsByTagName("td")[n], i.push(o), a = a.previousSibling; a && "TR" !== a.tagName;) a = a.previousSibling;
			return i
		}, e.getCellsBelow = function(t) {
			for (var i = [], n = e.getColumn(t), a = t.parentNode, o = null; a && o !== e.firstSelected;) for (o = a.getElementsByTagName("td")[n], i.push(o), a = a.nextSibling; a && "TR" !== a.tagName;) a = a.nextSibling;
			return i
		}, e.getColumn = function(e) {
			for (var t = 0; e.previousSibling;) e = e.previousSibling, "TD" === e.tagName && t++;
			return t
		}, e.gTouchMove = function(t) {
			if (!DayPilot.Util.isMouseEvent(t) && e.drag) {
				t.preventDefault();
				var i = t.touches ? t.touches[0].pageX : t.pageX,
					n = t.touches ? t.touches[0].pageY : t.pageY,
					a = {};
				a.x = i, a.y = n;
				var o = function() {
						for (var e = t.touches ? t.touches[0].clientX : t.clientX, i = t.touches ? t.touches[0].clientY : t.clientY, n = document.elementFromPoint(e, i); n && n.parentNode;) if (n = n.parentNode, n.daypilotMainD) return n.calendar;
						return !1
					}();
				if (o) {
					if (e.gShadow && document.body.removeChild(e.gShadow), e.gShadow = null, o.coords = o.Vb.relativeCoords(t), !e.movingShadow && o.coords) {
						var r = o.ta(e.drag, !1, e.drag.shadowType);
						if (r) {
							e.movingShadow = r;
							var l = DayPilot.Date.today(),
								t = {
									"value": e.drag.id,
									"start": l,
									"end": l.addSeconds(e.drag.duration),
									"text": e.drag.text
								},
								s = new DayPilot.Event(t, o);
							s.external = !0, DayPilot.Global.moving = {}, DayPilot.Global.moving.event = s, DayPilot.Global.moving.helper = {}
						}
					}
					DayPilot.Global.moving && o.Vb.updateMoving()
				} else {
					DayPilot.de(e.movingShadow), DayPilot.Global.moving = null, e.movingShadow = null, e.gShadow || (e.gShadow = e.createGShadow(e.drag.shadowType));
					var r = e.gShadow;
					r.style.left = a.x + "px", r.style.top = a.y + "px"
				}
			}
		}, e.gTouchEnd = function(t) {
			DayPilot.Util.isMouseEvent(t) || e.gMouseUp(t)
		}, e.gMouseMove = function(t) {
			if ("undefined" != typeof e && !(t.insideMainD || t.srcElement && t.srcElement.inside)) {
				var i = DayPilot.mc(t);
				if (e.drag) {
					document.body.style.cursor = "move", e.gShadow || (e.gShadow = e.createGShadow(e.drag.shadowType));
					var n = e.gShadow;
					n.style.left = i.x + "px", n.style.top = i.y + "px", DayPilot.Global.moving = null, DayPilot.de(e.movingShadow), e.movingShadow = null
				}
				for (var a = 0; a < e.registered.length; a++) e.registered[a].S && e.registered[a].S()
			}
		}, e.gUnload = function(t) {
			if (e.registered) for (var i = e.registered, n = 0; n < i.length; n++) {
				var a = i[n];
				e.unregister(a)
			}
		}, e.gMouseUp = function(t) {
			var t = t || window.event;
			if (DayPilot.Global.resizing) {
				if (!e.resizingShadow) return DayPilot.Global.resizing.style.cursor = "default", DayPilot.Global.resizing.event.calendar.nav.top.style.cursor = "auto", void(DayPilot.Global.resizing = null);
				var i = DayPilot.Global.resizing.event,
					n = DayPilot.Global.resizing.dpBorder,
					a = e.resizingShadow.clientHeight,
					o = e.resizingShadow.offsetTop;
				if (DayPilot.de(e.resizingShadow), e.resizingShadow = null, DayPilot.Global.resizing.style.cursor = "default", i.calendar.nav.top.style.cursor = "auto", DayPilot.Global.resizing.onclick = null, DayPilot.Global.resizing = null, i.calendar.overlap) return;
				i.calendar.Sa(i, a, o, n)
			} else if (DayPilot.Global.moving) {
				if (!DayPilot.Global.moving.helper) return DayPilot.de(e.movingShadow), DayPilot.Global.moving = null, void(e.movingShadow = null);
				if (!e.movingShadow) return DayPilot.Global.moving.event.calendar.nav.top.style.cursor = "auto", void(DayPilot.Global.moving = null);
				var o = (DayPilot.Global.moving.helper.oldColumn, e.movingShadow.offsetTop);
				DayPilot.de(e.movingShadow);
				var i = DayPilot.Global.moving.event,
					r = e.movingShadow.column,
					l = e.drag;
				if (DayPilot.Global.moving.event.calendar.nav.top.style.cursor = "auto", DayPilot.Global.moving = null, e.movingShadow = null, l && (i.calendar.todo || (i.calendar.todo = {}), i.calendar.todo.del = l.element), i.calendar.overlap) return;
				var s = t || window.event;
				i.calendar.Va(i, r, o, s, l)
			} else if (e.selecting) {
				var d = function() {
						var t = e.selecting,
							i = e.selecting.calendar;
						if (e.firstMousePos = null, e.selecting = null, !t.args.allowed) return void i.clearSelection();
						var n = i.getSelection();
						i.ab(n.start, n.end, n.resource)
					};
				e.selecting && null !== e.topSelectedCell ? d() : e.selectedTimeout = setTimeout(d, 100)
			} else if (e.firstMousePos) {
				var c = e.firstMousePos.calendar;
				if (e.selecting = {}, e.selecting.calendar = c, c.clearSelection(), c.jb(), e.firstMousePos = null, e.selecting = null, !e.selecting.args.allowed) return;
				var h = c.getSelection();
				c.ab(h.start, h.end, h.resource)
			}
			e.drag && (e.drag = null, document.body.style.cursor = ""), e.gShadow && (document.body.removeChild(e.gShadow), e.gShadow = null), e.moveOffsetY = null
		}, e.dragStart = function(t, i, n, a, o) {
			DayPilot.us(t);
			var r = e.drag = {};
			return r.element = t, r.duration = i, r.text = a, r.id = n, r.shadowType = o ? o : "Fill", r.data = {
				"id": n,
				"text": a,
				"duration": i,
				"externalHtml": a
			}, !1
		}, DayPilot.Calendar.makeDraggable = function(t) {
			function i() {
				var i = e.drag = {};
				i.element = a, i.id = t.id, i.duration = t.duration || 60, i.text = t.text || "", i.data = t, i.shadowType = "Fill"
			}
			var n = t.element,
				a = t.keepElement ? null : n;
			t.duration || 1;
			navigator.msPointerEnabled && (n.style.msTouchAction = "none", n.style.touchAction = "none");
			var o = function(e) {
					i();
					var t = e.target || e.srcElement;
					if (t.tagName) {
						var n = t.tagName.toLowerCase();
						if ("textarea" === n || "select" === n || "input" === n) return !1
					}
					return e.preventDefault && e.preventDefault(), !1
				},
				r = function(t) {
					if (!DayPilot.Util.isMouseEvent(t)) {
						window.setTimeout(function() {
							i(), e.gTouchMove(t), t.preventDefault()
						}, 0), t.preventDefault()
					}
				};
			DayPilot.us(n), DayPilot.re(n, "mousedown", o), DayPilot.re(n, DayPilot.touch.start, r), n.cancelDraggable = function() {
				DayPilot.ue(n, "mousedown", o), DayPilot.ue(n, DayPilot.touch.start, r), delete n.cancelDraggable
			}
		}, e.createGShadow = function(e) {
			var t = document.createElement("div");
			return t.setAttribute("unselectable", "on"), t.style.position = "absolute", t.style.width = "100px", t.style.height = "20px", t.style.border = "2px dotted #666666", t.style.zIndex = 101, t.style.pointerEvents = "none", "Fill" === e && (t.style.backgroundColor = "#aaaaaa", t.style.opacity = .5, t.style.filter = "alpha(opacity=50)", t.style.border = "2px solid #aaaaaa"), document.body.appendChild(t), t
		}, e.moveShadow = function(t) {
			var i = e.movingShadow;
			i.parentNode && i.parentNode.removeChild(i), t.firstChild.appendChild(i), i.style.left = "0px", i.style.width = e.movingShadow.parentNode.offsetWidth + "px"
		}, e.Column = function(e, t, i) {
			this.value = e, this.id = e, this.name = t, this.date = new DayPilot.Date(i)
		}, "undefined" != typeof jQuery && !
		function(e) {
			e.fn.daypilotCalendar = function(e) {
				var t = null,
					i = this.each(function() {
						if (!this.daypilot) {
							var i = new DayPilot.Calendar(this.id, e);
							i.init(), this.daypilot = i, t || (t = i)
						}
					});
				return 1 === this.length ? t : i
			}
		}(jQuery), function() {
			var e = DayPilot.am();
			e && e.directive("daypilotCalendar", ["$parse", function(e) {
				return {
					"restrict": "E",
					"template": "<div id='{{id}}'></div>",
					"compile": function(t, i) {
						return t.replaceWith(this["template"].replace("{{id}}", i["id"])), function(t, i, n) {
							var a = new DayPilot.Calendar(i[0]);
							a.Qc.scope = t, a.init();
							var o = n["id"];
							o && (t[o] = a);
							var r = n["publishAs"];
							if (r) {
								(0, e(r).assign)(t, a)
							}
							for (var l in n) if (0 === l.indexOf("on")) {
								var s = DayPilot.Util.shouldApply(l);
								s ? !
								function(i) {
									a[i] = function(a) {
										var o = e(n[i]);
										t["$apply"](function() {
											o(t, {
												"args": a
											})
										})
									}
								}(l) : !
								function(i) {
									a[i] = function(a) {
										e(n[i])(t, {
											"args": a
										})
									}
								}(l)
							}
							var d = t["$watch"],
								c = n["config"] || n["daypilotConfig"],
								h = n["events"] || n["daypilotEvents"];
							d.call(t, c, function(e, t) {
								for (var i in e) a[i] = e[i];
								a.update()
							}, !0), d.call(t, h, function(e) {
								a.events.list = e, a.gd({
									"eventsOnly": !0
								})
							}, !0)
						}
					}
				}
			}])
		}(), "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	"undefined" == typeof DayPilot.DatePicker && (DayPilot.DatePicker = function(e) {
		this.v = "3058";
		var t = "navigator_" + (new Date).getTime(),
			i = this;
		this.onShow = null, this.onTimeRangeSelect = null, this.onTimeRangeSelected = null, this.prepare = function() {
			if (this.locale = "en-us", this.target = null, this.resetTarget = !0, this.pattern = this.vc.locale().datePattern, this.theme = null, this.patterns = [], e) for (var t in e) this[t] = e[t];
			this.init()
		}, this.init = function() {
			this.date = new DayPilot.Date(this.date);
			var e = this.xd();
			this.resetTarget && !e && this.yd(this.date);
			var t = this.zd();
			t && DayPilot.re(t, "input", function() {
				i.date = i.xd()
			}), DayPilot.re(document, "mousedown", function() {
				i.close()
			})
		}, this.close = function() {
			this.Sc && (this.navigator && this.navigator.dispose(), this.div.innerHTML = "", this.div && this.div.parentNode === document.body && document.body.removeChild(this.div))
		}, this.setDate = function(e) {
			this.date = new DayPilot.Date(e), this.yd(this.date)
		}, this.xd = function() {
			var e = this.zd();
			if (!e) return this.date;
			var t = null;
			if (t = "INPUT" === e.tagName ? e.value : e.innerText, !t) return null;
			for (var n = DayPilot.Date.parse(t, i.pattern), a = 0; a < i.patterns.length; a++) {
				if (n) return n;
				n = DayPilot.Date.parse(t, i.patterns[a])
			}
			return n
		}, this.yd = function(e) {
			var t = this.zd();
			if (t) {
				var n = e.toString(i.pattern, i.locale);
				"INPUT" === t.tagName ? t.value = n : t.innerHTML = n
			}
		}, this.vc = {}, this.vc.locale = function() {
			return DayPilot.Locale.find(i.locale)
		}, this.zd = function() {
			var e = this.target;
			return e && e.nodeType && 1 === e.nodeType ? e : document.getElementById(e)
		}, this.show = function() {
			var e = this.zd(),
				n = this.navigator,
				n = new DayPilot.Navigator(t);
			n.api = 2, n.cssOnly = !0, n.theme = i.theme, n.weekStarts = "Auto", n.locale = i.locale, n.onTimeRangeSelected = function(e) {
				i.date = e.start;
				var t = e.start.addTime(n.Ad),
					a = t.toString(i.pattern, i.locale),
					e = {};
				e.start = t, e.date = t, e.preventDefault = function() {
					this.preventDefault.value = !0
				}, "function" == typeof i.onTimeRangeSelect && (i.onTimeRangeSelect(e), e.preventDefault.value) || (i.yd(a), i.close(), "function" == typeof i.onTimeRangeSelected && i.onTimeRangeSelected(e))
			}, this.navigator = n;
			var a = DayPilot.abs(e),
				o = e.offsetHeight,
				r = document.createElement("div");
			r.style.position = "absolute", r.style.left = a.x + "px", r.style.top = a.y + o + "px";
			var l = document.createElement("div");
			l.id = t, r.appendChild(l), DayPilot.re(r, "mousedown", function(e) {
				var e = e || window.event;
				e.cancelBubble = !0, e.stopPropagation && e.stopPropagation()
			}), document.body.appendChild(r), this.div = r;
			var s = i.xd() || (new DayPilot.Date).getDatePart();
			n.startDate = s, n.Ad = s.getTimePart(), n.selectionStart = s.getDatePart(), n.init(), this.Sc = !0, this.onShow && this.onShow()
		}, this.prepare()
	})
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	if ("undefined" == typeof DayPilot.Gantt) {
		var e = function() {};
		DayPilot.Gantt = function(t, i) {
			this.v = "3058";
			var n = this;
			this.id = t, this.isGantt = !0;
			var a = new DayPilot.Scheduler(t);
			this.scheduler = a, a.viewType = "Resources", a.onCallBackHeader = function(e) {
				e.header.taskGroupMode = n.taskGroupMode, e.header.rowHeaderColumns = n.columns, e.header.clientState = n.clientState
			}, a.onGetNodeState = function(e) {
				var t = function(e) {
						var t = {};
						if (e.tags) for (var i in e.tags) t[i] = "" + e.tags[i];
						return t
					},
					i = function(e) {
						var i = e.task,
							n = {};
						return n.start = i.start, n.end = i.end, n.id = i.id, n.complete = i.complete, n.text = i.text, n.type = i.type, n.expanded = e.expanded, n.loaded = e.loaded, n.tags = t(i), n.versions = i.versions, n.children = a.internal.getNodeChildren(e.children), n
					};
				e.result = i(e.row), e.preventDefault()
			}, a.Bd = function(e) {}, a.onCallBackResult = function(e) {
				var t = e.result;
				e.preventDefault();
				var i = function() {
						t.scrollToTaskId && a.scrollToResource(t.scrollToTaskId)
					};
				if ("None" === t.updateType) return void i();
				var o = function(e) {
						for (var i = 0; i < e.length; i++) {
							var a = e[i];
							"undefined" != typeof t[a] && (n[a] = t[a])
						}
					};
				n.links.list = t.links, n.tasks.list = t.tasks, n.startDate = new DayPilot.Date(t.startDate), o(["days", "cellDuration", "cellGroupBy", "cellWidth", "cellWidthSpec", "cornerHtml", "separators", "rowMinHeight", "rowMarginBottom", "taskGroupMode", "selectedRows"]), o(["cellProperties", "cellConfig", "timeHeader", "timeHeaders", "timeline", "columns"]), l.translate(), l.Cd(), l.Dd(), a.update(), a.show(), i()
			}, this.taskGroupMode = "Auto", this.autoRefreshCommand = "refresh", this.autoRefreshEnabled = !1, this.autoRefreshInterval = 60, this.autoRefreshMaxCount = 20, this.autoScroll = "Drag", "function" == typeof DayPilot.Bubble ? (this.bubbleTask = new DayPilot.Bubble, this.bubbleCell = new DayPilot.Bubble, this.bubbleRow = new DayPilot.Bubble) : (this.bubbleTask = null, this.bubbleCell = null, this.bubbleRow = null), this.cellDuration = 1440, this.cellGroupBy = "Month", this.cellWidth = 40, this.cellWidthSpec = "Fixed", this.completeBarVisible = !0, this.completeBarHeight = 3, this.contextMenuTask = null, this.contextMenuRow = null, this.contextMenuLink = null, this.cornerHtml = "", this.crosshairColor = "Gray", this.crosshairOpacity = 20, this.crosshairType = "Header", this.doubleClickTimeout = 300, this.progressiveTaskRendering = "Progressive", this.progressiveTaskRenderingMargin = 500, this.progressiveTaskRenderingCacheSweeping = !1, this.progressiveTaskRenderingCacheSize = 200, this.floatingTasks = !0, this.floatingTimeHeaders = !0, this.headerHeight = 20, this.height = 300, this.heightSpec = "Max", this.hideUntilInit = !1, this.linkBottomMargin = 10, this.linkPointSize = 10, this.loadingLabelVisible = !0, this.loadingLabelText = "Loading...", this.locale = "en-us", this.messageBarPosition = "Top", this.messageHideAfter = 5e3, this.progressiveRowRendering = !0, this.progressiveRowRenderingPreload = 25, this.rowHeaderScrolling = !1, this.rowHeaderSplitterWidth = 3, this.rowHeaderHideIconEnabled = !0, this.rowHeaderWidth = 80, this.rowHeaderWidthAutoFit = !0, this.rowMarginBottom = 4, this.rowMinHeight = 0, this.scrollDelayTasks = 200, this.scrollDelayCells = 20, this.scrollDelayFloats = 0, this.scale = "Day", this.selectedRows = [], this.snapToGrid = !0, this.syncTasks = !0, this.syncLinks = !0, this.tapAndHoldTimeout = 300, this.taskHeight = 24, this.taskHtmlLeftMargin = 20, this.taskHtmlRightMargin = 20, this.taskResizeMargin = 5, this.taskMovingStartEndEnabled = !1, this.taskMovingStartEndFormat = "MMMM d, yyyy", this.taskResizingStartEndEnabled = !1, this.taskResizingStartEndFormat = "MMMM d, yyyy", this.theme = "gantt_default", this.treeAutoExpand = !0, this.treeIndent = 20, this.treeImageMarginLeft = 5, this.treeImageMarginTop = 5, this.timeline = null, this.timeHeaders = [{
				"groupBy": "Month",
				"format": "MMMM yyyy"
			}, {
				"groupBy": "Day",
				"format": "d"
			}], this.useEventBoxes = "Never", this.visible = !0, this.taskVersionsEnabled = !1, this.taskVersionHeight = 24, this.taskVersionMargin = 2, this.taskVersionPosition = "Above", this.taskMoveHandling = "Update", this.taskClickHandling = "Enabled", this.taskResizeHandling = "Update", this.linkCreateHandling = "Update", this.taskRightClickHandling = "ContextMenu", this.taskDoubleClickHandling = "Disabled", this.tasksLoadMethod = "GET", this.rowCreateHandling = "Disabled", this.rowMoveHandling = "Update", this.rowClickHandling = "Disabled", this.rowDoubleClickHandling = "Disabled", this.rowEditHandling = "Update", this.rowSelectHandling = "Update", this.clientState = {}, this.separators = [], this.members = {}, this.members.obsolete = [], this.members.ignore = ["members", "scheduler", "internal", "cellProperties"], this.members.noCssOnly = [], this.links = {}, this.links.list = [], this.links.add = function(e) {
				if (e) {
					var t = e.isLink ? e.data : e;
					n.links.list.push(t), n.A && (l.Dd(), a.update()), n.Qc.notify()
				}
			}, this.links.remove = function(e) {
				if (e) {
					var t;
					t = e.isLink ? e.data : e;
					var i = DayPilot.indexOf(n.links.list, t);
					i !== -1 && (n.links.list.splice(i, 1), n.A && (l.Dd(), a.update()), n.Qc.notify())
				}
			}, this.links.find = function(e) {
				if (!DayPilot.isArray(n.links.list)) return null;
				for (var t = 0; t < n.links.list.length; t++) {
					var i = n.links.list[t];
					if (i.id === e) return new DayPilot.Link(i, n)
				}
				return null
			}, this.links.findFromTo = function(e, t) {
				if (!DayPilot.isArray(n.links.list)) return null;
				for (var i = 0; i < n.links.list.length; i++) {
					var a = n.links.list[i];
					if (a.from === e && a.to === t) return new DayPilot.Link(a, n)
				}
				return null
			}, this.links.load = function(e, t, i) {
				a.links.load(e, function(e) {
					"function" == typeof t && (t(e), e.preventDefault.value) || (n.links.list = e.data)
				}, i, {
					"dontAddStartEnd": !0
				})
			}, this.Ed = {};
			var o = this.Ed;
			o.timeout = null, o.update = function() {
				n.A && (window.clearTimeout(o.timeout), o.timeout = setTimeout(function() {
					l.Cd(), a.update()
				}, 0))
			}, this.tasks = {}, this.tasks.list = [], this.tasks.add = function(e) {
				if (e) {
					if (e instanceof DayPilot.Event) throw "DayPilot.Task object required. You have supplied DayPilot.Event.";
					var t = e.isTask ? e.data : e;
					n.tasks.list.push(t), o.update(), n.Qc.notify()
				}
			}, this.tasks.find = function(e) {
				var t = r.findInCache(e);
				return t ? new DayPilot.Task(t, n) : null
			}, this.tasks.update = function(e) {
				if (e) {
					if (!e.isTask) throw "DayPilot.Task object expected";
					e.commit(), o.update(), n.Qc.notify()
				}
			}, this.tasks.remove = function(e) {
				if (e) {
					if (!e.isTask) throw "DayPilot.Task object expected";
					var t = r.findParentArray(e.data);
					if (t) {
						var i = DayPilot.indexOf(t, e.data);
						t.splice(i, 1), o.update(), n.Qc.notify()
					}
				}
			}, this.tasks.load = function(e, t, i) {
				if (!e) throw new DayPilot.Error("events.load(): 'url' parameter required");
				console.log("throw3");
				var a = function(e) {
						var t = {};
						t.exception = e.exception, t.request = e.request, "function" == typeof i && i(t)
					},
					o = function(e) {
						var i, o = e.request;
						try {
							i = DayPilot.Util.parseJSON(o.responseText)
						} catch (e) {
							var r = {};
							return r.exception = e, void a(r)
						}
						if (DayPilot.isArray(i)) {
							var l = {};
							if (l.preventDefault = function() {
								this.preventDefault.value = !0
							}, l.data = i, "function" == typeof t && t(l), l.preventDefault.value) return;
							n.tasks.list = i, n.A && n.update()
						}
					};
				if (n.tasksLoadMethod && "POST" === n.tasksLoadMethod.toUpperCase()) DayPilot.ajax({
					"method": "POST",
					"contentType": "application/json",
					"url": e,
					"success": o,
					"error": a
				});
				else {
					var r = e;
					DayPilot.ajax({
						"method": "GET",
						"url": r,
						"success": o,
						"error": a
					})
				}
				console.log(e);
				console.log(r);
			}, this.visibleStart = function() {
				return a.visibleStart()
			}, this.visibleEnd = function() {
				return a.visibleEnd()
			}, this.onAfterRender = null, this.onAfterUpdate = null, this.onBeforeRowHeaderRender = null, this.onBeforeTaskRender = null, this.onBeforeTimeHeaderRender = null, this.onBeforeCellRender = null, this.onTaskClick = null, this.onTaskClicked = null, this.onTaskDoubleClick = null, this.onTaskDoubleClicked = null, this.onTaskRightClick = null, this.onTaskRightClicked = null, this.onRowCreate = null, this.onRowCreated = null, this.onRowMove = null, this.onRowMoved = null, this.onRowMoving = null, this.onRowClick = null, this.onRowClicked = null, this.onRowDoubleClick = null, this.onRowDoubleClicked = null, this.onRowEdit = null, this.onRowEdited = null, this.onRowSelect = null, this.onRowSelected = null, this.onTaskMove = null, this.onTaskMoved = null, this.onTaskMoving = null, this.onTaskResize = null, this.onTaskResized = null, this.onTaskResizing = null, this.onLinkCreate = null, this.onLinkCreated = null, this.r = function() {
				return !!this.backendUrl || !("function" != typeof WebForm_DoCallback || !this.uniqueID)
			}, this.Fd = function() {
				if ("string" == typeof n.startDate && (n.startDate = new DayPilot.Date(n.startDate)), !n.startDate || !n.days) {
					for (var e = DayPilot.Date.today(), t = e.addDays(1), i = null, o = null, r = 0; r < n.tasks.list.length; r++) {
						var l = n.tasks.list[r];
						e = new DayPilot.Date(l.start), t = new DayPilot.Date(l.end), (null === i || e.getTime() < i) && (i = e.getTime()), (null === o || t.getTime() > o) && (o = t.getTime())
					}
					i && o ? (e = new DayPilot.Date(i).getDatePart(), t = new DayPilot.Date(o).getDatePart().addDays(1), a.startDate = n.startDate || e, a.days = n.days || DayPilot.DateUtil.daysDiff(e, t)) : (a.startDate = e, a.days = 30)
				}
			}, this.commandCallBack = function(e, t) {
				l.translate(), a.commandCallBack(e, t)
			}, this.message = function(e, t, i, n) {
				a.message(e, t, i, n)
			}, this.setHeight = function(e) {
				a.setHeight(e)
			}, this.qd = function() {
				return !!this.backendUrl && (!DayPilot.isArray(n.tasks.list) || 0 == n.tasks.list.length)
			}, this.init = function() {
				l.translate(), l.Cd(), l.Dd(), this.Fd(), a.init(), this.A = !0, this.td()
			}, this.Gd = !1, this.dispose = function() {
				a.dispose(), n.Gd = !0
			}, this.update = function() {
				if (n.Gd) throw new DayPilot.Error("This DayPilot.Gantt instance has been disposed.");
				console.log("throw4");
				l.translate(), l.Cd(), l.Dd(), n.Fd(), a.update()
			}, this.scrollTo = function(e) {
				a.scrollTo(e)
			}, this.scrollToTask = function(e) {
				a.scrollToResource(e)
			}, this.Hd = {};
			var r = this.Hd;
			r.cache = {}, r.clearCache = function() {
				r.cache = {}
			}, r.addToCache = function(e, t) {
				var i = e.id;
				if (i) {
					var n = {};
					if (n.isTaskWrapper = !0, n.data = e, n.parent = t, r.cache[i]) throw "Duplicate task id detected";
					r.cache[i] = n
				}
			}, r.findInCache = function(e) {
				return e ? r.cache[e.toString()] : null
			}, r.getProperty = function(e, t) {
				return e.tags && e.tags[t] ? e.tags[t] : e[t]
			}, r.findParentArray = function(e) {
				return r.findInArray(n.tasks.list, e)
			}, r.findInArray = function(e, t) {
				if (DayPilot.indexOf(e, t) !== -1) return e;
				for (var i = 0; i < e.length; i++) {
					var n = e[i];
					if (n.children && n.children.length > 0) {
						var a = r.findInArray(n.children, t);
						if (a) return a
					}
				}
				return null
			}, this.Id = {};
			var l = this.Id;
			l.translate = function() {
				if (a.internal.gantt = n, a.durationBarMode = "PercentComplete", a.timeRangeSelectedHandling = "Disabled", a.treeEnabled = !0, a.rowCreateHtml = "", a.autoRefreshCommand = n.autoRefreshCommand, a.autoRefreshEnabled = n.autoRefreshEnabled, a.autoRefreshInterval = n.autoRefreshInterval, a.autoRefreshMaxCount = n.autoRefreshMaxCount, a.autoScroll = n.autoScroll, a.backendUrl = n.backendUrl, a.crosshairColor = n.crosshairColor, a.crosshairOpacity = n.crosshairOpacity, a.crosshairType = n.crosshairType, a.doubleClickTimeout = n.doubleClickTimeout, a.durationBarVisible = n.completeBarVisible, a.durationBarHeight = n.completeBarHeight, a.dynamicEventRendering = n.progressiveTaskRendering ? "Progressive" : "Disabled", a.dynamicEventRenderingMargin = n.progressiveTaskRenderingMargin, a.dynamicEventRenderingCacheSweeping = n.progressiveTaskRenderingCacheSweeping, a.dynamicEventRenderingCacheSize = n.progressiveTaskRenderingCacheSize, a.startDate = new DayPilot.Date(n.startDate), a.days = n.days, a.cellDuration = n.cellDuration, a.cellGroupBy = n.cellGroupBy, a.cellWidth = n.cellWidth, a.cellWidthSpec = n.cellWidthSpec, a.cornerHtml = n.cornerHtml, a.eventHeight = n.taskHeight, a.eventResizeMargin = n.taskResizeMargin, a.floatingEvents = n.floatingTasks, a.floatingTimeHeaders = n.floatingTimeHeaders, a.headerHeight = n.headerHeight, a.heightSpec = n.heightSpec, a.height = n.height, a.linkBottomMargin = n.linkBottomMargin, a.linkPointSize = n.linkPointSize, a.loadingLabelVisible = n.loadingLabelVisible, a.loadingLabelText = n.loadingLabelText, a.locale = n.locale, a.messageBarPosition = n.messageBarPosition, a.messageHideAfter = n.messageHideAfter, a.rowCreateHandling = n.rowCreateHandling, a.progressiveRowRendering = n.progressiveRowRendering, a.progressiveRowRenderingPreload = n.progressiveRowRenderingPreload, a.scale = n.scale, a.scrollDelayEvents = n.scrollDelayTasks, a.scrollDelayCells = n.scrollDelayCells, a.scrollDelayFloats = n.scrollDelayFloats, a.scrollX = n.scrollX, a.scrollY = n.scrollY, n.scrollToTaskId && (a.scrollToResourceId = n.scrollToTaskId), a.separators = n.separators, a.tapAndHoldTimeout = n.tapAndHoldTimeout, a.eventHtmlLeftMargin = n.taskHtmlLeftMargin, a.eventHtmlRightMargin = n.taskHtmlRightMargin, a.eventMovingStartEndEnabled = n.taskMovingStartEndEnabled, a.eventMovingStartEndFormat = n.taskMovingStartEndFormat, a.eventResizingStartEndEnabled = n.taskResizingStartEndEnabled, a.eventResizingStartEndFormat = n.taskResizingStartEndFormat, a.hideUntilInit = n.hideUntilInit, a.treeIndent = n.treeIndent, a.treeAutoExpand = n.treeAutoExpand, a.treeImageMarginLeft = n.treeImageMarginLeft, a.treeImageMarginTop = n.treeImageMarginTop, a.timeHeaders = n.timeHeaders, a.rowHeaderHideIconEnabled = n.rowHeaderHideIconEnabled, a.rowHeaderScrolling = n.rowHeaderScrolling, a.rowHeaderSplitterWidth = n.rowHeaderSplitterWidth, a.rowHeaderWidth = n.rowHeaderWidth, a.rowHeaderWidthAutoFit = n.rowHeaderWidthAutoFit, a.rowMarginBottom = n.rowMarginBottom, a.rowMinHeight = n.rowMinHeight, a.selectedRows = n.selectedRows, a.theme = n.theme, a.useEventBoxes = n.useEventBoxes, a.snapToGrid = n.snapToGrid, a.uniqueID = n.uniqueID, a.bubble = n.bubbleTask, a.cellBubble = n.bubbleCell, a.resourceBubble = n.bubbleRow, a.contextMenu = n.contextMenuTask, a.contextMenuResource = n.contextMenuRow, a.contextMenuLink = n.contextMenuLink, a.syncResourceTree = n.syncTasks, a.syncLinks = n.syncLinks, a.timeline = n.timeline, a.visible = n.visible, a.eventMoveHandling = n.taskMoveHandling, a.eventClickHandling = n.taskClickHandling, a.eventResizeHandling = n.taskResizeHandling, a.linkCreateHandling = n.linkCreateHandling, a.eventRightClickHandling = n.taskRightClickHandling, a.eventDoubleClickHandling = n.taskDoubleClickHandling, a.rowMoveHandling = n.rowMoveHandling, a.rowClickHandling = n.rowClickHandling, a.rowDoubleClickHandling = n.rowDoubleClickHandling, a.rowEditHandling = n.rowEditHandling, a.rowSelectHandling = n.rowSelectHandling, a.eventVersionsEnabled = n.taskVersionsEnabled, a.eventVersionHeight = n.taskVersionHeight, a.eventVersionMargin = n.taskVersionMargin, a.eventVersionPosition = n.taskVersionPosition, DayPilot.isArray(n.columns)) {
					a.rowHeaderColumns = [];
					for (var e = 0; e < n.columns.length; e++) {
						var t = n.columns[e],
							i = {};
						DayPilot.Util.copyProps(t, i, ["title", "width"]), a.rowHeaderColumns.push(i)
					}
				}
				n.r() && (a.timeHeader = n.timeHeader, a.cellProperties = n.cellProperties, a.cellConfig = n.cellConfig), a.onRowCreate = function(e) {
					"function" == typeof n.onRowCreate && n.onRowCreate(e)
				}, a.onRowCreated = function(e) {
					"function" == typeof n.onRowCreated && n.onRowCreated(e)
				}, a.onAfterRender = function(e) {
					"function" == typeof n.onAfterRender && n.onAfterRender(e)
				}, a.onAfterUpdate = function(e) {
					"function" == typeof n.onAfterUpdate && n.onAfterUpdate(e)
				}, a.onRowHeaderResized = function(e) {
					n.rowHeaderWidth = a.rowHeaderWidth
				}, a.onAjaxError = function(e) {
					"function" == typeof n.onAjaxError && n.onAjaxError(e)
				}, a.onRowHeaderColumnResized = function(e) {
					for (var t = e.column, i = DayPilot.indexOf(a.rowHeaderColumns, t), o = 0; o < n.columns.length; o++) {
						var r = a.rowHeaderColumns[o];
						n.columns[o].width = r.width
					}
					if ("function" == typeof n.onColumnResized) {
						var l = {};
						l.column = n.columns[i], n.onColumnResized(l)
					}
				}, a.onBeforeRowHeaderRender = function(e) {
					e.task = new DayPilot.Task(e.row.$.row.task, n);
					var t = e.row.$.row.events[0];
					"Auto" === n.taskGroupMode && "Group" === t.data.type && (e.task.data.start = t.data.start, e.task.data.end = t.data.end);
					var i = [];
					if (DayPilot.isArray(n.columns)) for (var a = 0; a < n.columns.length; a++) {
						var o = n.columns[a],
							l = o.property,
							s = {};
						s.value = r.getProperty(e.task.data, l), e.task.data.row && e.task.data.row.columns && e.task.data.row.columns[a] ? s.html = e.task.data.row.columns[a].html : s.html = s.value, i.push(s)
					}
					if (e.row.columns = i, "function" == typeof n.onBeforeRowHeaderRender && n.onBeforeRowHeaderRender(e), DayPilot.isArray(n.columns)) for (var a = 0; a < n.columns.length; a++) {
						var d = i[a].html;
						0 === a ? e.row.html = d : e.row.columns[a - 1].html = d
					}
				}, a.onBeforeCellRender = function(e) {
					e.task = n.tasks.find(e.cell.resource), delete e.cell.resource, "function" == typeof n.onBeforeCellRender && n.onBeforeCellRender(e)
				}, a.onBeforeTimeHeaderRender = function(e) {
					"function" == typeof n.onBeforeTimeHeaderRender && n.onBeforeTimeHeaderRender(e)
				}, a.onEventClick = function(e) {
					e.task = new DayPilot.Task(e.e, n), "function" == typeof n.onTaskClick && n.onTaskClick(e)
				}, a.onEventClicked = function(e) {
					"function" == typeof n.onTaskClicked && n.onTaskClicked(e)
				}, a.onEventDelete = function(e) {
					"function" == typeof n.onTaskDelete && n.onTaskDelete(e)
				}, a.onEventDeleted = function(e) {
					"function" == typeof n.onTaskDeleted && n.onTaskDeleted(e)
				}, a.onEventDoubleClick = function(e) {
					e.task = new DayPilot.Task(e.e, n), "function" == typeof n.onTaskDoubleClick && n.onTaskDoubleClick(e)
				}, a.onEventDoubleClicked = function(e) {
					"function" == typeof n.onTaskDoubleClicked && n.onTaskDoubleClicked(e)
				}, a.onEventRightClick = function(e) {
					e.task = new DayPilot.Task(e.e, n), "function" == typeof n.onTaskRightClick && n.onTaskRightClick(e)
				}, a.onEventRightClicked = function(e) {
					"function" == typeof n.onTaskRightClicked && n.onTaskRightClicked(e)
				}, a.onRowMoving = function(e) {
					e.Jd = e.source, e.Kd = e.target, e.source = new DayPilot.Task(e.Jd.$.row.task, n), e.target = new DayPilot.Task(e.Kd.$.row.task, n), "function" == typeof n.onRowMoving && n.onRowMoving(e)
				}, a.onRowMove = function(e) {
					e.Jd = e.source, e.Kd = e.target, e.source = new DayPilot.Task(e.Jd.$.row.task, n), e.target = new DayPilot.Task(e.Kd.$.row.task, n), "function" == typeof n.onRowMove && n.onRowMove(e), e.source = e.Jd, e.target = e.Kd
				}, a.onRowMoved = function(e) {
					if ("Update" === n.rowMoveHandling || "Notify" === n.rowMoveHandling) {
						var t = e.Jd.$.row.task,
							i = e.Kd.$.row.task,
							a = e.position;
						if ("forbidden" === a) return;
						var o = e.Jd.calendar.internal.gantt,
							l = o.Hd.findParentArray(t);
						if (!l) throw "Cannot find source node parent";
						var s = DayPilot.indexOf(l, t);
						l.splice(s, 1);
						var d = r.findParentArray(i);
						if (!d) throw "Cannot find target node parent";
						var c = DayPilot.indexOf(d, i);
						switch (a) {
						case "before":
							d.splice(c, 0, t);
							break;
						case "after":
							d.splice(c + 1, 0, t);
							break;
						case "child":
							i.children || (i.children = [], i.expanded = !0), i.children.push(t)
						}
						n.Qc.notify(), n.update(), o !== n && o.update()
					}
					e.source = new DayPilot.Task(e.Jd.$.row.task, n), e.target = new DayPilot.Task(e.Kd.$.row.task, n), "function" == typeof n.onRowMoved && n.onRowMoved(e)
				}, a.onRowClick = function(e) {
					e.task = new DayPilot.Task(e.resource.$.row.task, n), "function" == typeof n.onRowClick && n.onRowClick(e)
				}, a.onRowClicked = function(e) {
					"function" == typeof n.onRowClicked && n.onRowClicked(e)
				}, a.onRowDoubleClick = function(e) {
					e.task = new DayPilot.Task(e.resource.$.row.task, n), "function" == typeof n.onRowDoubleClick && n.onRowDoubleClick(e)
				}, a.onRowDoubleClicked = function(e) {
					"function" == typeof n.onRowDoubleClicked && n.onRowDoubleClicked(e)
				}, a.onRowEdit = function(e) {
					e.task = new DayPilot.Task(e.resource.$.row.task, n), "function" == typeof n.onRowEdit && n.onRowEdit(e)
				}, a.onRowEdited = function(e) {
					"function" == typeof n.onRowEdited && n.onRowEdited(e)
				}, a.onRowSelect = function(e) {
					e.task = new DayPilot.Task(e.row.$.row.task, n), "function" == typeof n.onRowSelect && n.onRowSelect(e)
				}, a.onRowSelected = function(e) {
					"function" == typeof n.onRowSelected && n.onRowSelected(e)
				}, a.onEventMove = function(e) {
					e.Ld = e.e, e.task = new DayPilot.Task(e.e, n), "function" == typeof n.onTaskMove && n.onTaskMove(e)
				}, a.onEventMoved = function(e) {
					if ("Auto" === n.taskGroupMode) {
						var t = e.Ld,
							i = t.data.task;
						for (i.start = t.start(), i.end = t.end(); t.data.parent;) {
							var o = a.events.find(t.data.parent.id),
								r = l.childrenStartEnd(t.data.parent);
							o.start(r.start), o.end(r.end), a.events.update(o), t = o
						}
					}
					n.Qc.notify(), "function" == typeof n.onTaskMoved && n.onTaskMoved(e)
				}, a.onEventMoving = function(e) {
					e.task = new DayPilot.Task(e.e, n), e.Ld = e.e, delete e.position, delete e.overlapping, delete e.resource, "function" == typeof n.onTaskMoving && n.onTaskMoving(e)
				}, a.onEventResize = function(e) {
					e.Ld = e.e, e.task = new DayPilot.Task(e.e, n), "function" == typeof n.onTaskResize && n.onTaskResize(e)
				}, a.onEventResized = function(e) {
					if ("Auto" === n.taskGroupMode) {
						var t = e.Ld,
							i = t.data.task;
						for (i.start = t.start(), i.end = t.end(); t.data.parent;) {
							var o = a.events.find(t.data.parent.id),
								r = l.childrenStartEnd(t.data.parent);
							o.start(r.start), o.end(r.end), a.events.update(o), t = o
						}
					}
					n.Qc.notify(), "function" == typeof n.onTaskResized && n.onTaskResized(e)
				}, a.onEventResizing = function(e) {
					e.task = new DayPilot.Task(e.e, n), e.Ld = e.e, "function" == typeof n.onTaskResizing && n.onTaskResizing(e)
				}, a.onLinkCreate = function(e) {
					e.source = n.tasks.find(e.from), e.target = n.tasks.find(e.to), "function" == typeof n.onLinkCreate && n.onLinkCreate(e)
				}, a.onLinkCreated = function(e) {
					"function" == typeof n.onLinkCreated && n.onLinkCreated(e)
				}, a.onResourceExpand = function(e) {
					var t = e.resource.$.row.task;
					t.row || (t.row = {}), t.row.collapsed = !1
				}, a.onResourceCollapse = function(e) {
					var t = e.resource.$.row.task;
					t.row || (t.row = {}), t.row.collapsed = !0
				}
			}, l.Md = function(e) {
				for (var t = 0; t < a.rowlist.length; t++) {
					var i = a.rowlist[t];
					if (i.task === e) return a.internal.createRowObject(i)
				}
				return null
			}, l.Dd = function() {
				a.links.list = n.links.list ? n.links.list : []
			}, l.Cd = function() {
				a.resources = [], a.events.list = [], r.clearCache(), l.Nd(n.tasks.list, a.resources, null), s.sheet && (s.sheet.commit(), s.sheet = null)
			}, l.Od = function(e) {
				var t = e.type || "Task";
				e.children && e.children.length && (t = "Group");
				var i = {};
				for (var a in e)"children" !== a && (i[a] = e[a]);
				var o = {};
				if (o.data = i, o.type = t, i.box || (i.box = {}), "undefined" == typeof i.box.html) if ("Task" === o.type) {
					var r = i.complete || 0;
					i.box.html = r + "%"
				} else i.box.html = "";
				return "undefined" == typeof i.box.htmlRight && (i.box.htmlRight = i.text), "function" == typeof n.onBeforeTaskRender && n.onBeforeTaskRender(o), o.type = t, o
			};
			var s = {};
			s.keys = {}, s.sheet = null, l.Pd = function(e) {
				if (e.data.box && !e.data.box.cssClass && e.data.box.backColor && "Task" !== e.type) {
					var t = DayPilot.Util.normalizeColor(e.data.box.backColor),
						i = e.type + "_" + t.replace("#", ""),
						a = n.theme,
						o = n.theme + "_" + i;
					return s.keys[i] || (s.keys[i] = !0, s.sheet || (s.sheet = DayPilot.sheet()), "Group" === e.type ? (s.sheet.add("." + o + "." + a + "_task_group ." + a + "_event_inner", "position:absolute;top:5px;left:0px;right:0px;bottom:6px;overflow:hidden; background: " + t + "; filter: none; border: 0px none;"), s.sheet.add("." + o + "." + a + "_task_group." + a + "_event:before", "content:''; border-color: transparent transparent transparent " + t + "; border-style: solid; border-width: 6px; position: absolute; bottom: 0px;"), s.sheet.add("." + o + "." + a + "_task_group." + a + "_event:after", "content:''; border-color: transparent " + t + " transparent transparent; border-style: solid; border-width: 6px; position: absolute; bottom: 0px; right: 0px;")) : "Milestone" === e.type && (s.sheet.add("." + o + "." + a + "_task_milestone ." + a + "_event_inner", "position:absolute;top:16%;left:16%;right:16%;bottom:16%; background: " + t + "; border: 0px none; -webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg); transform: rotate(45deg); filter: none;"), s.sheet.add("." + o + "." + a + "_browser_ie8 ." + a + "_task_milestone ." + a + "_event_inner", "-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(SizingMethod='auto expand', M11=0.7071067811865476, M12=-0.7071067811865475, M21=0.7071067811865475, M22=0.7071067811865476);\""))), o
				}
			}, l.Nd = function(t, i, o) {
				if (DayPilot.isArray(t)) for (var s = 0; s < t.length; s++) {
					var d = t[s];
					r.addToCache(d, o);
					var c = l.Od(d),
						h = c.data,
						u = c.type,
						f = {};
					if (DayPilot.Util.copyProps(h, f, ["id", "start", "end", "text", "complete", "tags", "versions"]), DayPilot.Util.copyProps(h.box, f), f.parent = o, f.task = d, f.resource = h.id, "Group" == u) {
						f.type = "Group", f.html = "";
						var v = l.Pd(c);
						if (v && (f.cssClass = (f.cssClass || "") + " " + v), delete f.backColor, "Auto" === n.taskGroupMode) {
							var p = l.childrenStartEnd(d);
							f.start = p.start, f.end = p.end, f.resizeDisabled = !0, f.moveDisabled = !0
						}
					} else if ("Milestone" === u) {
						f.html = "", d.end = d.start;
						var v = l.Pd(c);
						v && (f.cssClass = (f.cssClass || "") + " " + v), h.end = h.start, f.end = h.start, f.barHidden = !0, f.resizeDisabled = !0, f.type = "Milestone", f.width = n.taskHeight, delete f.backColor
					} else "Task" === u && e();
					f.moveVDisabled = !0, f.htmlRight = h.box.htmlRight, f.htmlLeft = h.box.htmlLeft, a.events.list.push(f);
					var g = {};
					g.task = d, DayPilot.Util.copyProps(h.row, g), g.name = h.text, g.id = h.id, g.children = [], g.expanded = !h.row || !h.row.collapsed, d.children && d.children.length && l.Nd(d.children, g.children, d), i.push(g)
				}
			}, l.childrenStartEnd = function(e) {
				if (!e.children || !e.children.length) {
					var t = e.start,
						i = e.end;
					return "Milestone" === e.type && (i = t), {
						"start": new DayPilot.Date(t),
						"end": new DayPilot.Date(i)
					}
				}
				for (var t = null, i = null, n = 0; n < e.children.length; n++) {
					var a = l.childrenStartEnd(e.children[n]);
					(!t || a.start.getTime() < t.getTime()) && (t = a.start), (!i || a.end.getTime() > i.getTime()) && (i = a.end)
				}
				return {
					"start": t,
					"end": i
				}
			}, this.rows = {}, this.rows.expand = function(e) {
				a.rows.expand(e)
			}, this.rows.expandAll = function() {
				a.rows.expandAll()
			}, this.rows.selection = {}, this.rows.selection.add = function(e) {
				a.rows.find(e.data.id)
			}, this.rows.selection.clear = function() {
				a.rows.selection.clear()
			}, this.rows.selection.get = function() {
				return a.rows.selection.get().map(function(e) {
					return new DayPilot.Task(e.$.row.task, n)
				})
			}, this.ud = null, this.vd = function(e) {
				var t = {
					"tasks": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? n.tasks.list = e.list : n.tasks.list = e)
						}
					},
					"links": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? n.links.list = e.list : n.links.list = e)
						}
					},
					"scrollTo": {
						"postInit": function() {
							this.data && n.scrollTo(this.data)
						}
					},
					"scrollToTask": {
						"postInit": function() {
							this.data && n.scrollToTask(this.data)
						}
					}
				};
				this.ud = t;
				for (var i in e) if (t[i]) {
					var a = t[i];
					a.data = e[i], a.preInit && a.preInit()
				} else n[i] = e[i]
			}, this.td = function() {
				var e = this.ud;
				for (var t in e) {
					var i = e[t];
					i.postInit && i.postInit()
				}
			}, this.internal = {}, this.internal.initialized = function() {
				return n.A
			}, this.internal.rowObjectForTaskData = l.Md, this.internal.loadOptions = n.vd, this.Qc = {}, this.Qc.scope = null, this.Qc.notify = function() {
				n.Qc.scope && n.Qc.scope["$apply"]()
			}, this.vd(i)
		}, "undefined" != typeof jQuery && !
		function(e) {
			e.fn.daypilotGantt = function(e) {
				var t = null,
					i = this.each(function() {
						if (!this.daypilot) {
							var i = new DayPilot.Gantt(this.id, e);
							i.init(), this.daypilot = i, t || (t = i)
						}
					});
				return 1 === this.length ? t : i
			}
		}(jQuery), function() {
			var e = DayPilot.am();
			e && e.directive("daypilotGantt", ["$parse", function(e) {
				return {
					"restrict": "E",
					"template": "<div id='{{id}}'></div>",
					"compile": function(t, i) {
						return t.replaceWith(this["template"].replace("{{id}}", i["id"])), function(t, i, n) {
							var a = new DayPilot.Gantt(i[0]);
							a.Qc.scope = t, a.init();
							var o = n["id"];
							o && (t[o] = a);
							var r = n["publishAs"];
							if (r) {
								(0, e(r).assign)(t, a)
							}
							for (var l in n) if (0 === l.indexOf("on")) {
								var s = DayPilot.Util.shouldApply(l);
								s ? !
								function(i) {
									a[i] = function(a) {
										var o = e(n[i]);
										t["$apply"](function() {
											o(t, {
												"args": a
											})
										})
									}
								}(l) : !
								function(i) {
									a[i] = function(a) {
										e(n[i])(t, {
											"args": a
										})
									}
								}(l)
							}
							var d = t["$watch"],
								c = n["config"] || n["daypilotConfig"];
							d.call(t, c, function(e, t) {
								a.vd(e), a.update()
							}, !0)
						}
					}
				}
			}])
		}(), "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	if ("undefined" == typeof DayPilot.Kanban) {
		var e = function() {};
		DayPilot.Kanban = function(t, i) {
			this.v = "3058";
			var n = this;
			this.barWidth = 5, this.cardAutoHeight = !0, this.cardHeight = 60, this.cardMarginLeft = 5, this.cardMarginRight = 5, this.cardMarginBottom = 5, this.columnHeaderHeight = 20, this.crosshairColor = "gray", this.height = 300, this.heightSpec = "Auto", this.theme = "kanban_default", this.cellMarginBottom = 4, this.cellMarginTop = 5, this.columnWidthSpec = "Auto", this.columnWidth = 200, this.rowMinHeight = 0, this.swimlaneCollapsingEnabled = !1, this.swimlaneHeaderWidth = 80, this.visible = !0, this.swimlanes = {}, this.swimlanes.list = [], this.columns = {}, this.columns.list = [], this.cards = {}, this.cards.list = [], this.cardDeleteHandling = "Disabled", this.cardMoveHandling = "Update", this.columnMoveHandling = "Disabled", this.swimlaneMoveHandling = "Disabled", this.onBeforeCellRender = null, this.onCardClick = null, this.onCardClicked = null, this.onCardDelete = null, this.onCardDeleted = null, this.onCardMove = null, this.onCardMoved = null, this.onColumnMove = null, this.onColumnMoved = null, this.onHeightChanged = null, this.onSwimlaneMove = null, this.onSwimlaneMoved = null;
			var a = new DayPilot.Scheduler(t);
			this.scheduler = a;
			var o = {},
				r = 15;
			e(), o.translate = function() {
				var e = a;
				e.startDate = "2000-01-01", e.scale = "Day", e.timeHeaders = [{
					groupBy: "Cell",
					format: "d"
				}], e.heightSpec = n.heightSpec, e.cellWidthSpec = n.columnWidthSpec, e.cellWidth = n.columnWidth, e.cellsMarkBusiness = !1, e.crosshairColor = n.crosshairColor, e.dynamicEventRendering = "Disabled", e.floatingEvents = !1, e.floatingTimeHeaders = !1, e.rowMinHeight = n.rowMinHeight, e.rowMarginTop = n.cellMarginTop, e.rowMarginBottom = n.cellMarginBottom, e.eventMoveToPosition = !0, e.headerHeight = n.columnHeaderHeight, e.eventResizeHandling = "Disabled", e.timeRangeSelectedHandling = "Disabled", e.eventHeight = n.cardHeight, e.eventMarginLeft = n.cardMarginLeft, e.eventMarginRight = n.cardMarginRight, e.eventMarginBottom = n.cardMarginBottom, e.eventTextWrappingEnabled = !0, e.cellStacking = !0, e.cellStackingAutoHeight = n.cardAutoHeight, e.durationBarVisible = !1, e.theme = n.theme, e.visible = n.visible, e.rowHeaderWidth = n.swimlaneHeaderWidth, e.eventDeleteHandling = n.cardDeleteHandling, e.eventMoveHandling = n.cardMoveHandling, e.rowMoveHandling = DayPilot.list(n.swimlanes.list).isEmpty() ? "Disabled" : n.swimlaneMoveHandling, e.onHeightChanged = n.onHeightChanged, e.internal.cssNames.timeheadercol = "_colheadercell", e.internal.cssNames.timeheadercolInner = "_colheadercell_inner", e.internal.cssNames.resourcedivider = "_rowheaderdivider", e.internal.cssNames.event = "_card", e.internal.cssNames.eventInner = "_card_inner", e.internal.cssNames.eventDelete = "_card_delete", e.internal.cssNames.eventMovingSource = "_card_moving_source", n.swimlaneCollapsingEnabled && (e.rowHeaderWidthMarginRight = 15), e.onBeforeTimeHeaderRender = function(e) {
					var t = n.Qd(e.header.start);
					if (e.header.html = t.name, e.header.toolTip = t.toolTip || "", e.header.areas = DayPilot.list(t.areas).map(function(e) {
						var t = [];
						return DayPilot.Util.copyProps(e, t), t
					}), DayPilot.list(e.header.areas).each(function(e) {
						e.target = new DayPilot.Column(t, n)
					}), "Disabled" !== n.columnMoveHandling) {
						var i = n.theme + "_columnmove_handle";
						e.header.areas.push({
							"left": 0,
							"top": 0,
							"width": 20,
							"height": 20,
							"css": i,
							"mousedown": n.Rd,
							"action": "None"
						})
					}
				}, e.onBeforeCellRender = function(t) {
					var i = {};
					i.cell = {}, i.cell.column = new DayPilot.Column(n.Qd(t.cell.start), n), i.cell.swimlane = null;
					var a = n.Sd(t.cell.resource);
					a && (i.cell.swimlane = new DayPilot.Swimlane(a, n)), i.cell.areas = [], i.cell.cssClass = null, i.cell.html = null, i.cell.backImage = null, i.cell.backRepeat = null, i.cell.backColor = null, "function" == typeof n.onBeforeCellRender && (n.onBeforeCellRender(i), DayPilot.Util.copyProps(i.cell, t.cell, ["areas", "cssClass", "html", "backImage", "backRepeat", "backColor"]), DayPilot.list(t.cell.areas).each(function(e) {
						e.target = {
							"swimlane": i.cell.swimlane,
							"column": i.cell.column
						}
					}));
					var o = e.rows.find(t.cell.resource);
					e.resources[o.index].collapsed && (t.cell.cssClass || (t.cell.cssClass = ""), t.cell.cssClass += " " + n.theme + "_collapsed")
				}, e.onEventClick = function(e) {
					var t = new DayPilot.Args(e);
					t.card = new DayPilot.Card(e.e.data.card, n), "function" == typeof n.onCardClick && n.onCardClick(t), e.wrapped = t
				}, e.onEventClicked = function(e) {
					var t = e.wrapped;
					"function" == typeof n.onCardClicked && n.onCardClicked(t)
				}, e.onEventDelete = function(e) {
					var t = new DayPilot.Args(e);
					t.card = new DayPilot.Card(e.e.data.card, n), "function" == typeof n.onCardDelete && n.onCardDelete(t), e.wrapped = t
				}, e.onEventDeleted = function(e) {
					DayPilot.rfa(n.cards.list, e.e.data.card);
					var t = e.wrapped;
					"function" == typeof n.onCardDeleted && n.onCardDeleted(t)
				}, e.onEventMove = function(e) {
					var t = new DayPilot.Args(e);
					t.card = new DayPilot.Card(e.e.data.card, n), t.column = new DayPilot.Column(n.Qd(e.newStart)), t.position = e.position, "*" !== e.newResource ? t.swimlane = new DayPilot.Swimlane(n.Sd(e.newResource), n) : t.swimlane = null;
					for (var i = a.cells.find(e.newStart, e.newResource)[0].events(), r = e.position, l = null, s = r - 1; i[s];) {
						if (i[s].data !== e.e.data) {
							l = new DayPilot.Card(i[s]);
							break
						}
						s -= 1
					}
					for (var d = null, c = r; i[c];) {
						if (i[c].data !== e.e.data) {
							d = new DayPilot.Card(i[c]);
							break
						}
						c += 1
					}
					if (t.previous = l, t.next = d, "function" == typeof n.onCardMove && n.onCardMove(t), e.wrapped = t, !e.preventDefault.value) {
						var h = 0;
						d ? h = d.wrapped.data.sort[0] : l && (h = l.wrapped.data.sort[0]), e.e.data.sort = [h, (new DayPilot.Date).toString()], DayPilot.rfa(n.cards.list, e.e.data.card);
						var u = 0;
						d ? u = DayPilot.indexOf(n.cards.list, d.data) : l && (u = DayPilot.indexOf(n.cards.list, l.data) + 1), n.cards.list.splice(u, 0, e.e.data.card), o.updateSort()
					}
				}, e.onEventMoved = function(e) {
					var t = e.wrapped,
						i = DayPilot.list(n.cards.list).find(function(t) {
							return e.e.data.card === t
						});
					i.swimlane = t.swimlane ? t.swimlane.data.id : null, i.column = t.column.data.id, "function" == typeof n.onCardMoved && n.onCardMoved(t)
				}, e.onBeforeResHeaderRender = function(e) {
					if (n.swimlaneCollapsingEnabled && !DayPilot.list(n.swimlanes.list).isEmpty()) {
						var t = n.theme + "_swimlane_collapse";
						e.resource.collapsed && (t = n.theme + "_swimlane_expand"), e.resource.areas = [{
							"right": 0,
							"top": 0,
							"height": 15,
							"width": r,
							"action": "JavaScript",
							"css": t,
							"js": function() {
								n.Td(e.resource.index)
							}
						}]
					}
				}, e.onRowMove = function(e) {
					var t = new DayPilot.Args(e);
					e.wrapped = t, t.swimlane = new DayPilot.Swimlane(e.source.$.row.swimlane);
					var i = 0;
					switch (e.position) {
					case "before":
						i = e.target.index;
						break;
					case "after":
						i = e.target.index + 1;
						break;
					default:
						throw "Unexpected target swimlane position: " + e.position
					}
					t.position = i, t.previous = null;
					for (var o = i - 1; a.rowlist[o] && a.rowlist[o].swimlane !== t.swimlane.data;) t.previous = new DayPilot.Swimlane(a.rowlist[o].swimlane), o -= 1;
					t.next = null;
					for (var r = i; a.rowlist[r] && a.rowlist[r].swimlane !== t.swimlane.data;) t.next = new DayPilot.Swimlane(a.rowlist[r].swimlane), r += 1;
					"function" == typeof n.onSwimlaneMove && n.onSwimlaneMove(t)
				}, e.onRowMoved = function(e) {
					var t = e.wrapped;
					DayPilot.rfa(n.swimlanes.list, t.swimlane.data);
					var i = 0;
					t.next ? i = DayPilot.indexOf(n.swimlanes.list, t.next.data) : t.previous && (i = DayPilot.indexOf(n.swimlanes.list, t.previous.data) + 1), n.swimlanes.list.splice(i, 0, t.swimlane.data), "function" == typeof n.onSwimlaneMoved && n.onSwimlaneMoved(t)
				}, e.treePreventParentUsage = !0
			}, o.loadCards = function() {
				var e = new DayPilot.Date("2000-01-01"),
					t = n.theme + "_card_header",
					i = n.theme + "_card_body",
					o = (new DayPilot.Date).toString();
				a.sortDirections = ["asc", "desc"], a.events.list = DayPilot.list(n.cards.list).map(function(a, r) {
					var l = a.html || a.text || "",
						s = a.name || "",
						d = {};
					return d.id = a.id, d.text = a.text, d.html = "<div class='" + t + "'>" + s + "</div><div class='" + i + "'>" + l + "</div>", d.resource = a.swimlane, d.start = e.addDays(DayPilot.list(n.columns.list).findIndex(function(e) {
						return a.column === e.id
					})), d.end = d.start.addDays(1), d.card = a, d.height = a.height, d.cssClass = a.cssClass, d.sort = [r, o], d.areas = DayPilot.list(a.areas).map(function(e) {
						var t = {};
						return DayPilot.Util.copyProps(e, t), e.js && (t.js = function(t) {
							e.js(new DayPilot.Card(t.data.card, n))
						}), t
					}), d.areas.push({
						"left": 0,
						"width": 5,
						"top": 0,
						"bottom": 0,
						"backColor": a.barColor,
						"cssClass": n.theme + "_card_bar"
					}), d
				})
			}, o.updateSort = function() {
				var e = (new DayPilot.Date).toString();
				DayPilot.list(n.cards.list).each(function(t, i) {
					var n = o.findSchedulerEventData(t);
					n && (n.sort = [i, e])
				})
			}, o.findSchedulerEventData = function(e) {
				return DayPilot.list(a.events.list).find(function(t) {
					return t.card === e
				})
			}, o.loadSwimlanes = function() {
				var e = DayPilot.list(n.swimlanes.list);
				a.resources = e.map(function(e) {
					var t = {};
					return t.name = e.name, t.id = e.id, t.swimlane = e, e.collapsed && (t.collapsed = !0, t.eventHeight = 20, t.hideEvents = !0), t
				}), e.isEmpty() && (a.resources = [{
					name: "",
					id: "*"
				}])
			}, o.loadColumns = function() {
				var e = DayPilot.list(n.columns.list);
				a.days = e.length
			};
			var l = {};
			l.active = null, l.div = null, l.update = function() {
				l.clear();
				var e = l.findPosition();
				l.draw(e)
			}, l.clear = function() {
				DayPilot.de(l.div), l.div = null
			}, l.draw = function(e) {
				var t = 0;
				if (e >= a.itline.length) {
					var i = a.itline[a.itline.length - 1];
					t = i.left + i.width - 3
				} else t = a.itline[e].left;
				var o = document.createElement("div");
				o.style.position = "absolute", o.style.left = t + "px", o.style.width = "3px", o.style.top = 0, o.style.height = a.headerHeight + "px", o.className = n.theme + "_columnmove_position", l.div = o, a.nav.timeHeader.appendChild(o)
			}, l.findPosition = function() {
				if (n.coords.x < 0) return 0;
				var e = DayPilot.list(a.itline).findIndex(function(e) {
					var t = e.left + a.rowHeaderWidth,
						i = e.width;
					return n.coords.x < t + i / 2
				});
				return e === -1 ? a.itline.length : e
			}, this.Rd = function(e) {
				l.active = e
			}, this.Qd = function(e) {
				return n.columns.list[e.getDay() - 1]
			}, this.Sd = function(e) {
				return DayPilot.list(n.swimlanes.list).find(function(t) {
					return t.id === e
				})
			}, this.message = function(e, t, i, n) {
				a.message(e, t, i, n)
			}, this.show = function() {
				n.visible = !0, a.show()
			}, this.hide = function() {
				n.visible = !1, a.hide()
			}, this.cards.add = function(e) {
				var t = null;
				t = e && e instanceof DayPilot.Card ? e.data : e, e && (n.cards.list.push(t), n.update())
			}, this.cards.remove = function(e) {
				var t = null;
				t = e && e instanceof DayPilot.Card ? e.data : e, e && (DayPilot.rfa(n.cards.list, e), n.update())
			}, this.cards.update = function(e) {
				n.update()
			}, this.Td = function(e) {
				DayPilot.list(n.swimlanes.list).isEmpty() || (n.swimlanes.list[e].collapsed = !n.swimlanes.list[e].collapsed), n.update()
			}, this.init = function() {
				o.translate(), o.loadSwimlanes(), o.loadColumns(), o.loadCards(), a.init(), n.Wc(), this.A = !0
			}, this.Gd = !1, this.dispose = function() {
				a.dispose(), n.Gd = !0
			}, this.update = function() {
				if (n.Gd) throw new DayPilot.Error("This DayPilot.Gantt instance has been disposed.");
				console.log("throw5");
				o.translate(), o.loadSwimlanes(), o.loadColumns(), o.loadCards(), a.update()
			}, this.Wc = function() {
				DayPilot.re(document, "mouseup", n.Ud), DayPilot.re(document, "mousemove", n.Vd)
			}, this.Qc = {}, this.Qc.scope = null, this.Qc.notify = function() {
				n.Qc.scope && n.Qc.scope["$apply"]()
			}, this.ud = null, this.vd = function(e) {
				var t = {
					"cards": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? n.cards.list = e.list : n.cards.list = e)
						}
					},
					"columns": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? n.columns.list = e.list : n.columns.list = e)
						}
					},
					"swimlanes": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? n.swimlanes.list = e.list : n.swimlanes.list = e)
						}
					}
				};
				this.ud = t, n.columns.list = [], n.swimlanes.list = [], n.cards.list = [];
				for (var i in e) if (t[i]) {
					var a = t[i];
					a.data = e[i], a.preInit && a.preInit()
				} else n[i] = e[i]
			}, this.td = function() {
				var e = this.ud;
				for (var t in e) {
					var i = e[t];
					i.postInit && i.postInit()
				}
			}, this.internal = {}, this.internal.loadOptions = n.vd, this.vd(i), this.Sc = function() {
				var e = dp.nav.top;
				return !!e && (e.offsetWidth > 0 && e.offsetHeight > 0)
			}, this.Tc = function() {
				var e = n,
					t = e.Sc;
				t() || e.Uc || (e.Uc = setInterval(function() {
					t() && (e.update(), clearInterval(e.Uc))
				}, 100))
			}, this.Vd = function(e) {
				n.coords = DayPilot.mo3(a.nav.top, e), l.active && l.update()
			}, this.Ud = function(e) {
				if (l.active) {
					var t = l.active.source,
						i = l.findPosition(),
						a = n.Qd(t.start),
						o = new DayPilot.Args;
					o.column = new DayPilot.Column(a, n), o.position = i, o.previous = null, o.next = null;
					for (var r = null, s = o.position; 0 !== s && !r;) a !== n.columns.list[s - 1] && (r = n.columns.list[s - 1]), s -= 1;
					r && (o.previous = new DayPilot.Column(r, n));
					var d = null;
					for (s = o.position; s < n.columns.list.length - 1 && !d;) a !== n.columns.list[s] && (d = n.columns.list[s]), s += 1;
					if (d && (o.next = new DayPilot.Column(d, n)), "function" == typeof n.onColumnMove && n.onColumnMove(o), !o.preventDefault.value) {
						if ("Update" === n.columnMoveHandling) {
							DayPilot.rfa(n.columns.list, o.column.data);
							var c = 0;
							o.next ? c = DayPilot.indexOf(n.columns.list, o.next.data) : o.previous && (c = DayPilot.indexOf(n.columns.list, o.previous.data) + 1), n.columns.list.splice(c, 0, o.column.data), n.update()
						}
						"function" == typeof n.onColumnMoved && n.onColumnMove(o)
					}
					l.active = null, l.clear()
				}
			}
		}, DayPilot.Card = function(e, t) {
			if (e instanceof DayPilot.Event) {
				var i = e;
				this.data = i.data.card, this.wrapped = e
			} else this.data = e;
			this.control = t
		}, DayPilot.Column = function(e, t) {
			this.data = e, this.control = t
		}, DayPilot.Swimlane = function(e, t) {
			this.data = e, this.control = t
		}, function() {
			var e = DayPilot.am();
			e && e.directive("daypilotKanban", ["$parse", function(e) {
				return {
					"restrict": "E",
					"template": "<div id='{{id}}'></div>",
					"compile": function(t, i) {
						return t.replaceWith(this["template"].replace("{{id}}", i["id"])), function(t, i, n) {
							var a = new DayPilot.Kanban(i[0]);
							a.Qc.scope = t, a.init();
							var o = n["id"];
							o && (t[o] = a);
							var r = n["publishAs"];
							if (r) {
								(0, e(r).assign)(t, a)
							}
							for (var l in n) if (0 === l.indexOf("on")) {
								var s = DayPilot.Util.shouldApply(l);
								s ? !
								function(i) {
									a[i] = function(a) {
										var o = e(n[i]);
										t["$apply"](function() {
											o(t, {
												"args": a
											})
										})
									}
								}(l) : !
								function(i) {
									a[i] = function(a) {
										e(n[i])(t, {
											"args": a
										})
									}
								}(l)
							}
							var d = t["$watch"],
								c = n["config"] || n["daypilotConfig"];
							d.call(t, c, function(e, t) {
								a.vd(e), a.update()
							}, !0)
						}
					}
				}
			}])
		}()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	if ("undefined" == typeof DayPilot.Menu) {
		var e = function() {},
			t = {};
		t.mouse = null, t.menu = null, t.handlersRegistered = !1, t.hideTimeout = null, t.waitingSubmenu = null, DayPilot.Menu = function(i) {
			var n = this,
				a = null;
			this.v = "3058", this.zIndex = 10, this.cssClassPrefix = "menu_default", this.cssOnly = !0, this.menuTitle = null, this.showMenuTitle = !1, this.hideOnMouseOut = !1, this.theme = null, this.onShow = null, this.n = function() {}, i && DayPilot.isArray(i) && (this.items = i), this.show = function(i, o) {
				var o = o || {},
					r = null;
				if (i ? "string" == typeof i.id || "number" == typeof i.id ? r = i.id : "function" == typeof i.id ? r = i.id() : "function" == typeof i.value && (r = i.value()) : r = null, "undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), o.submenu || t.menuClean(), this.n.submenu = null, null !== t.mouse) {
					n.cssOnly || (n.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0."));
					var l = null;
					if (i && i.isRow && i.$.row.task ? (l = new DayPilot.Task(i.$.row.task, i.calendar), l.menuType = "resource") : l = i && i.isEvent && i.data.task ? new DayPilot.Task(i, i.calendar) : i, "function" == typeof n.onShow) {
						var s = {};
						if (s.source = l, s.menu = n, s.preventDefault = function() {
							s.preventDefault.value = !0
						}, n.onShow(s), s.preventDefault.value) return
					}
					var d = document.createElement("div");
					if (d.style.position = "absolute", d.style.top = "0px", d.style.left = "0px", d.style.display = "none", d.style.overflow = "hidden", d.style.zIndex = this.zIndex + 1, d.className = this.applyCssClass("main"), d.onclick = function(e) {
						e.cancelBubble = !0, this.parentNode.removeChild(this)
					}, this.hideOnMouseOut && (d.onmousemove = function(e) {
						clearTimeout(t.hideTimeout)
					}, d.onmouseout = function(e) {
						n.delayedHide()
					}), !this.items || 0 === this.items.length) throw "No menu items defined.";
					if (this.showMenuTitle) {
						var c = document.createElement("div");
						c.innerHTML = this.menuTitle, c.className = this.applyCssClass("title"), d.appendChild(c)
					}
					for (var h = 0; h < this.items.length; h++) {
						var u = this.items[h],
							f = document.createElement("div");
						if (DayPilot.Util.addClass(f, this.applyCssClass("item")), u.items && DayPilot.Util.addClass(f, this.applyCssClass("item_haschildren")), "undefined" != typeof u && !u.hidden) {
							if ("-" === u.text) {
								var v = document.createElement("div");
								f.appendChild(v)
							} else {
								var p = document.createElement("a");
								if (p.style.position = "relative", p.style.display = "block", u.cssClass && DayPilot.Util.addClass(p, u.cssClass), u.disabled) DayPilot.Util.addClass(p, n.applyCssClass("item_disabled"));
								else {
									if (u.onclick || u.onClick) {
										p.item = u, p.onclick = function(e, t) {
											return function(i) {
												if ("function" == typeof e.onClick) {
													var n = {};
													if (n.item = e, n.source = t.source, n.originalEvent = i, n.preventDefault = function() {
														n.preventDefault.value = !0
													}, e.onClick(n), n.preventDefault.value) return
												}
												e.onclick && e.onclick.call(t, i)
											}
										}(u, p);
										var g = function(e, i) {
												return function(n) {
													n.stopPropagation(), n.preventDefault();
													var a = function() {
															window.setTimeout(function() {
																i.source.calendar.internal.touch.active = !1
															}, 500)
														};
													if ("function" == typeof e.onClick) {
														var o = {};
														if (o.item = e, o.originalEvent = n, o.preventDefault = function() {
															o.preventDefault.value = !0
														}, e.onClick(o), o.preventDefault.value) return void a()
													}
													e.onclick && e.onclick.call(i, n), t.menuClean(), a()
												}
											};
										p.ontouchstart = function(e) {
											e.stopPropagation(), e.preventDefault(), p.source.calendar.internal.touch.active = !0
										}, p.ontouchend = g(u, p)
									}
									if (u.onclick) e();
									else if (u.href) p.href = u.href.replace(/\x7B0\x7D/gim, r), u.target && p.setAttribute("target", u.target);
									else if (u.command) {
										var m = function(e, t) {
												return function(i) {
													var n = t.source,
														a = e;
													a.action = a.action ? a.action : "CallBack";
													var o = n.calendar || n.root;
													if (n instanceof DayPilot.Link) return void o.internal.linkMenuClick(a.command, n, a.action);
													if (n instanceof DayPilot.Selection) return void o.internal.timeRangeMenuClick(a.command, n, a.action);
													if (n instanceof DayPilot.Event) return void o.internal.eventMenuClick(a.command, n, a.action);
													if (n instanceof DayPilot.Selection) return void o.internal.timeRangeMenuClick(a.command, n, a.action);
													if (n instanceof DayPilot.Task) return void("resource" === n.menuType ? o.internal.resourceHeaderMenuClick(a.command, t.menuSource, a.action) : o.internal.eventMenuClick(a.command, t.menuSource, a.action));
													switch (n.menuType) {
													case "resource":
														return void o.internal.resourceHeaderMenuClick(a.command, n, a.action);
													case "selection":
														return void o.internal.timeRangeMenuClick(a.command, n, a.action);
													default:
														return void o.internal.eventMenuClick(a.command, n, a.action)
													}
													i.preventDefault()
												}
											};
										p.onclick = m(u, p), p.ontouchend = m(u, p)
									}
								}
								p.source = l, p.menuSource = i;
								var y = document.createElement("span");
								if (y.className = n.applyCssClass("item_text"), y.innerHTML = u.text, p.appendChild(y), u.image) {
									var b = document.createElement("img");
									b.src = u.image, b.style.position = "absolute", b.style.top = "0px", b.style.left = "0px", p.appendChild(b)
								}
								if (u.icon) {
									var w = document.createElement("span");
									w.className = n.applyCssClass("item_icon");
									var D = document.createElement("i");
									D.className = u.icon, w.appendChild(D), p.appendChild(w)
								}
								var k = function(e, i) {
										return function() {
											var a = i.source,
												o = e,
												r = t.waitingSubmenu;
											if (r) {
												if (r.parent === o) return;
												clearTimeout(r.timeout), t.waitingSubmenu = null
											}
											t.waitingSubmenu = {}, t.waitingSubmenu.parent = o, t.waitingSubmenu.timeout = setTimeout(function() {
												if (t.waitingSubmenu = null, (!n.n.submenu || n.n.submenu.item !== o) && (n.n.submenu && n.n.submenu.item !== o && (DayPilot.Util.removeClass(n.n.submenu.link.parentNode, n.applyCssClass("item_haschildren_active")), n.n.submenu.menu.hide(), n.n.submenu = null), o.items)) {
													var r = n.cloneOptions();
													r.items = o.items, n.n.submenu = {}, n.n.submenu.menu = new DayPilot.Menu(r), n.n.submenu.menu.show(a, {
														"submenu": !0,
														"parentLink": i,
														"parentItem": e
													}), n.n.submenu.item = o, n.n.submenu.link = i, DayPilot.Util.addClass(i.parentNode, n.applyCssClass("item_haschildren_active"))
												}
											}, 300)
										}
									};
								p.onmouseover = k(u, p), f.appendChild(p)
							}
							d.appendChild(f)
						}
					}
					var x = function(e) {
							window.setTimeout(function() {
								t.menuClean(), DayPilot.MenuBar.deactivate()
							}, 100)
						};
					d.onclick = x, d.ontouchend = x, d.onmousedown = function(e) {
						e = e || window.event, e.cancelBubble = !0, e.stopPropagation && e.stopPropagation()
					}, d.oncontextmenu = function() {
						return !1
					}, document.body.appendChild(d), n.n.visible = !0, n.n.source = i, d.style.display = "";
					var C = d.offsetHeight,
						P = d.offsetWidth;
					d.style.display = "none";
					var S = document.documentElement.clientHeight,
						A = document.documentElement.clientWidth,
						T = "number" == typeof o.windowMargin ? o.windowMargin : 5;
					if (function() {
						var e = o.initiator;
						if (e) {
							var t = e.div,
								i = e.e,
								n = e.area,
								r = DayPilot.Areas.createArea(t, i, n);
							t.appendChild(r), a = r;
							var l = DayPilot.abs(r);
							o.x = l.x, o.y = l.y + l.h + 2
						}
					}(), function() {
						var e = "number" == typeof o.x ? o.x : t.mouse.x + 1,
							i = "number" == typeof o.y ? o.y : t.mouse.y + 1,
							n = document.body.scrollTop || document.documentElement.scrollTop,
							a = document.body.scrollLeft || document.documentElement.scrollLeft;
						if (i - n > S - C && 0 !== S) {
							var r = i - n - (S - C) + T;
							d.style.top = i - r + "px"
						} else d.style.top = i + "px";
						if ("right" === o.align && (e -= P), e - a > A - P && 0 !== A) {
							var l = e - a - (A - P) + T;
							d.style.left = e - l + "px"
						} else d.style.left = e + "px"
					}(), o.parentLink) {
						var E = o.parentLink,
							M = parseInt(new DayPilot.StyleReader(d).get("border-top-width")),
							H = DayPilot.abs(o.parentLink.parentNode),
							_ = H.x + E.offsetWidth,
							R = H.y - M;
						_ + P > A && (_ = Math.max(0, H.x - P));
						var B = document.body.scrollTop + document.documentElement.scrollTop;
						R + C - B > S && (R = Math.max(0, S - C + B)), d.style.left = _ + "px", d.style.top = R + "px"
					}
					d.style.display = "", this.addShadow(d), this.n.div = d, o.submenu || (DayPilot.Menu.active = this)
				}
			}, this.applyCssClass = function(e) {
				var t = this.theme || this.cssClassPrefix,
					i = this.cssOnly ? "_" : "";
				return t ? t + i + e : ""
			}, this.cloneOptions = function() {
				for (var e = {}, t = ["cssOnly", "cssClassPrefix", "useShadow", "zIndex"], i = 0; i < t.length; i++) {
					var n = t[i];
					e[n] = this[n]
				}
				return e
			}, this.hide = function() {
				this.n.submenu && this.n.submenu.menu.hide(), this.removeShadow(), this.n.div && this.n.div.parentNode === document.body && document.body.removeChild(this.n.div), a && (DayPilot.de(a), a = null), n.n.visible = !1, n.n.source = null
			}, this.delayedHide = function() {
				t.hideTimeout = setTimeout(function() {
					n.hide()
				}, 200)
			}, this.cancelHideTimeout = function() {
				clearTimeout(t.hideTimeout)
			}, this.init = function(e) {
				t.mouseMove(e)
			}, this.addShadow = function(e) {}, this.removeShadow = function() {
				if (this.n.shadows) {
					for (var e = 0; e < this.n.shadows.length; e++) document.body.removeChild(this.n.shadows[e]);
					this.n.shadows = []
				}
			};
			var o = DayPilot.isArray(i) ? null : i;
			if (o) for (var r in o) this[r] = o[r]
		}, DayPilot.MenuBar = function(e, t) {
			var i = this,
				t = t || {};
			this.items = [], this.theme = "menubar_default", this.windowMargin = 0, this.nav = {}, this.elements = {}, this.elements.items = DayPilot.list(), this.Wd = null;
			for (var n in t) this[n] = t[n];
			this.Xd = function(e) {
				return this.theme + "_" + e
			}, this.na = function() {
				this.nav.top = document.getElementById(e);
				var t = this.nav.top;
				t.className = this.Xd("main"), DayPilot.list(i.items).each(function(e) {
					var n = document.createElement("span");
					n.innerHTML = e.text, n.className = i.Xd("item"), n.data = e, n.onclick = function() {
						return i.active && i.active.item === e ? void i.Yd() : void(e.children && i.Zd(n))
					}, n.onmousedown = function(e) {
						e.stopPropagation()
					}, n.onmouseover = function() {
						i.active && i.active.item !== e && i.Zd(n)
					}, t.appendChild(n), i.elements.items.push(n)
				})
			}, this.Yd = function() {
				var e = i.Xd("item_active");
				i.elements.items.each(function(t) {
					DayPilot.Util.removeClass(t, e)
				}), i.active && i.active.menu && i.active.menu.hide(), i.active = null
			}, this.$d = function(e) {
				return !!i.active && i.active.item === e.data
			}, this.Zd = function(e) {
				if (!i.$d(e)) {
					i.Yd();
					var t = e.data,
						n = i.active = {};
					n.item = t, n.div = e;
					var a = i.Xd("item_active");
					DayPilot.Util.addClass(e, a);
					var o = DayPilot.abs(e);
					t.children && (n.menu = new DayPilot.Menu({
						"items": t.children
					}), n.menu.show(null, {
						"x": o.x + o.w,
						"y": o.y + o.h,
						"align": t.align,
						"windowMargin": i.windowMargin
					})), DayPilot.MenuBar.active = i
				}
			}, this.init = function() {
				this.na()
			}
		}, DayPilot.MenuBar.deactivate = function() {
			DayPilot.MenuBar.active && (DayPilot.MenuBar.active.Yd(), DayPilot.MenuBar.active = null)
		}, t.menuClean = function() {
			"undefined" != typeof DayPilot.Menu.active && DayPilot.Menu.active && (DayPilot.Menu.active.hide(), DayPilot.Menu.active = null)
		}, t.mouseDown = function(e) {
			"undefined" != typeof t && (t.menuClean(), DayPilot.MenuBar.deactivate())
		}, t.mouseMove = function(e) {
			"undefined" != typeof t && (t.mouse = t.mousePosition(e))
		}, t.touchMove = function(e) {
			"undefined" != typeof t && (t.mouse = t.touchPosition(e))
		}, t.touchStart = function(e) {
			"undefined" != typeof t && (t.mouse = t.touchPosition(e))
		}, t.touchEnd = function(e) {}, t.touchPosition = function(e) {
			if (!e || !e.touches) return null;
			var t = e.touches[0],
				i = {};
			return i.x = t.pageX, i.y = t.pageY, i
		}, t.mousePosition = function(e) {
			return DayPilot.mo3(document.body, e)
		}, DayPilot.Menu.touchPosition = function(e) {
			e.touches && (t.mouse = t.touchPosition(e))
		}, t.handlersRegistered || (DayPilot.re(document, "mousemove", t.mouseMove), DayPilot.re(document, "mousedown", t.mouseDown), DayPilot.re(document, "touchmove", t.touchMove), DayPilot.re(document, "touchstart", t.touchStart), DayPilot.re(document, "touchend", t.touchEnd), t.handlersRegistered = !0), "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot && (DayPilot = {}), function() {
	DayPilot.ModalStatic = {}, DayPilot.ModalStatic.list = [], DayPilot.ModalStatic.hide = function() {
		if (this.list.length > 0) {
			var e = this.list.pop();
			e && e.hide()
		}
	}, DayPilot.ModalStatic.remove = function(e) {
		for (var t = DayPilot.ModalStatic.list, i = 0; i < t.length; i++) if (t[i] === e) return void t.splice(i, 1)
	}, DayPilot.ModalStatic.close = function(e) {
		DayPilot.ModalStatic.result(e), DayPilot.ModalStatic.hide()
	}, DayPilot.ModalStatic.result = function(e) {
		var t = DayPilot.ModalStatic.list;
		t.length > 0 && (t[t.length - 1].result = e)
	}, DayPilot.ModalStatic.displayed = function(e) {
		for (var t = DayPilot.ModalStatic.list, i = 0; i < t.length; i++) if (t[i] === e) return !0;
		return !1
	}, DayPilot.ModalStatic.stretch = function() {
		if (this.list.length > 0) {
			var e = this.list[this.list.length - 1];
			e && e.stretch()
		}
	}, DayPilot.ModalStatic.last = function() {
		var e = DayPilot.ModalStatic.list;
		return e.length > 0 ? e[e.length - 1] : null
	};
	var e = function() {
			var e = document.createElement("style");
			e.setAttribute("type", "text/css"), e.styleSheet || e.appendChild(document.createTextNode("")), (document.head || document.getElementsByTagName("head")[0]).appendChild(e);
			var t = !! e.styleSheet,
				i = {};
			return i.rules = [], i.commit = function() {
				try {
					t && (e.styleSheet.cssText = this.rules.join("\n"))
				} catch (e) {}
			}, i.add = function(i, n, a) {
				if (t) return void this.rules.push(i + "{" + n + "}");
				if (e.sheet.insertRule)"undefined" == typeof a && (a = e.sheet.cssRules.length), e.sheet.insertRule(i + "{" + n + "}", a);
				else {
					if (!e.sheet.addRule) throw "No CSS registration method found";
					e.sheet.addRule(i, n, a)
				}
			}, i
		},
		t = new e;
	t.add(".modal_default_main", "border: 10px solid #ccc;"), t.add(".modal_default_inner", "padding: 10px;"), t.add(".modal_default_input", "padding: 10px 0px;"), t.add(".modal_default_buttons", "padding: 10px 0px;"), t.add(".modal_default_background", "opacity: 0.3; background-color: #000;"), t.add(".modal_min_main", "border: 1px solid #ccc;"), t.add(".modal_min_background", "opacity: 0.3; background-color: #000;"), t.commit(), DayPilot.Modal = function(e) {
		this.autoStretch = !0, this.autoStretchFirstLoadOnly = !1, this.className = null, this.theme = "modal_default", this.disposeOnClose = !0, this.dragDrop = !0, this.loadingHtml = null, this.maxHeight = null, this.scrollWithPage = !0, this.useIframe = !0, this.zIndex = 99999, this.left = null, this.width = 500, this.top = 20, this.height = 200, this.closed = null, this.onClosed = null, this.onShow = null;
		var t = this;
		this.id = "_" + (new Date).getTime() + "n" + 10 * Math.random(), this._d = !1, this.ae = null, this.be = null, this.showHtml = function(e) {
			if (DayPilot.ModalStatic.displayed(this)) throw "This modal dialog is already displayed.";
			if (this.div || this.ce(), this.gd(), this.useIframe) {
				var t = function(e, t) {
						return function() {
							e.setInnerHTML(e.id + "iframe", t)
						}
					};
				window.setTimeout(t(this, e), 0)
			} else e.nodeType ? this.div.appendChild(e) : this.div.innerHTML = e;
			this.gd(), this.ee(), this.fe()
		}, this.ge = function() {
			return this.corners && "rounded" === this.corners.toLowerCase()
		}, this.showUrl = function(e) {
			if (DayPilot.ModalStatic.displayed(this)) throw "This modal dialog is already displayed.";
			if (this.useIframe) {
				this.div || this.ce();
				var i = this.loadingHtml;
				i && (this.iframe.src = "about:blank", this.setInnerHTML(this.id + "iframe", i)), this.re(this.iframe, "load", this.je), this.iframe.src = e, this.gd(), this.ee(), this.fe()
			} else t.ke({
				"url": e,
				"success": function(e) {
					var i = e.request.responseText;
					t.showHtml(i)
				},
				"error": function(e) {
					t.showHtml("Error loading the modal dialog")
				}
			})
		}, this.fe = function() {
			if ("function" == typeof t.onShow) {
				var e = {};
				e.root = t.le(), t.onShow(e)
			}
		}, this.le = function() {
			return t.iframe ? t.iframe.contentWindow.document : t.div
		}, this.ke = function(e) {
			var t = new XMLHttpRequest;
			if (t) {
				var i = e.method || "GET",
					n = e.success ||
				function() {}, a = e.error ||
				function() {}, o = e.data, r = e.url;
				t.open(i, r, !0), t.setRequestHeader("Content-type", "text/plain"), t.onreadystatechange = function() {
					if (4 === t.readyState) if (200 === t.status || 304 === t.status) {
						var e = {};
						e.request = t, n(e)
					} else if (a) {
						var e = {};
						e.request = t, a(e)
					} else window.console && console.log("HTTP error " + t.status)
				}, 4 !== t.readyState && ("object" == typeof o && (o = JSON.stringify(o)), t.send(o))
			}
		}, this.gd = function() {
			var e = window,
				i = document,
				n = e.pageYOffset ? e.pageYOffset : i.documentElement && i.documentElement.scrollTop ? i.documentElement.scrollTop : i.body.scrollTop;
			this.theme && (this.hideDiv.className = this.theme + "_background"), this.zIndex && (this.hideDiv.style.zIndex = this.zIndex), this.hideDiv.style.display = "", window.setTimeout(function() {
				t.hideDiv.onclick = function() {
					t.hide({
						"backgroundClick": !0
					})
				}
			}, 500), this.theme ? this.div.className = this.theme + "_main" : this.div.className = "", this.className && (this.div.className += " " + this.className), this.left ? this.div.style.left = this.left + "px" : this.div.style.marginLeft = "-" + Math.floor(this.width / 2) + "px", this.div.style.position = "absolute", this.div.style.boxSizing = "content-box", this.div.style.top = n + this.top + "px", this.div.style.width = this.width + "px", this.zIndex && (this.div.style.zIndex = this.zIndex), this.height && (this.useIframe || !this.autoStretch ? this.div.style.height = this.height + "px" : this.div.style.height = ""), this.useIframe && this.height && (this.iframe.style.height = this.height + "px"), this.div.style.display = "", DayPilot.ModalStatic.list.push(this)
		}, this.je = function() {
			t.iframe.contentWindow.modal = t, t.autoStretch && t.stretch()
		}, this.stretch = function() {
			var e = function() {
					return t.me().y
				},
				i = function() {
					return t.me().x
				};
			if (this.useIframe) {
				for (var n = i() - 40, a = this.width; a < n && this.ne(); a += 10) this.div.style.width = a + "px", this.div.style.marginLeft = "-" + Math.floor(a / 2) + "px";
				for (var o = this.maxHeight || e() - 2 * this.top, r = this.height; r < o && this.oe(); r += 10) this.iframe.style.height = r + "px", this.div.style.height = r + "px";
				this.autoStretchFirstLoadOnly && this.ue(this.iframe, "load", this.je)
			} else this.div.style.height = ""
		}, this.ne = function() {
			for (var e = this.iframe.contentWindow.document, t = "BackCompat" === e.compatMode ? e.body : e.documentElement, i = t.scrollWidth, n = e.body.children, a = 0; a < n.length; a++) {
				var o = n[a].offsetLeft + n[a].offsetWidth;
				i = Math.max(i, o)
			}
			return i > t.clientWidth
		}, this.oe = function() {
			for (var e = this.iframe.contentWindow.document, t = "BackCompat" === e.compatMode ? e.body : e.documentElement, i = t.scrollHeight, n = e.body.children, a = 0; a < n.length; a++) {
				var o = n[a].offsetTop + n[a].offsetHeight;
				i = Math.max(i, o)
			}
			return i > t.clientHeight
		}, this.me = function() {
			var e = document;
			if ("CSS1Compat" === e.compatMode && e.documentElement && e.documentElement.clientWidth) {
				var t = e.documentElement.clientWidth,
					i = e.documentElement.clientHeight;
				return {
					x: t,
					y: i
				}
			}
			var t = e.body.clientWidth,
				i = e.body.clientHeight;
			return {
				x: t,
				y: i
			}
		}, this.ee = function() {
			this._d || (this.re(window, "resize", this.pe), this.re(window, "scroll", this.qe), this.dragDrop && (this.re(document, "mousemove", this.se), this.re(document, "mouseup", this.te)), this._d = !0)
		}, this.ve = function(e) {
			e.target === t.div && (t.div.style.cursor = "move", t.we(), t.be = t.mc(e || window.event), t.ae = {
				x: t.div.offsetLeft,
				y: t.div.offsetTop
			})
		}, this.se = function(e) {
			if (t.be) {
				var e = e || window.event,
					i = t.mc(e),
					n = i.x - t.be.x,
					a = i.y - t.be.y;
				t.div.style.marginLeft = "0px", t.div.style.top = t.ae.y + a + "px", t.div.style.left = t.ae.x + n + "px"
			}
		}, this.te = function(e) {
			t.be && (t.xe(), t.div.style.cursor = null, t.be = null)
		}, this.we = function() {
			if (this.useIframe) {
				var e = document.createElement("div");
				e.style.backgroundColor = "#ffffff", e.style.filter = "alpha(opacity=80)", e.style.opacity = "0.80", e.style.width = "100%", e.style.height = this.height + "px", e.style.position = "absolute", e.style.left = "0px", e.style.top = "0px", this.div.appendChild(e), this.mask = e
			}
		}, this.xe = function() {
			this.useIframe && (this.div.removeChild(this.mask), this.mask = null)
		}, this.pe = function() {
			t.ye
		}, this.qe = function() {
			t.ye
		}, this.ye = function() {
			if (t.hideDiv && t.div && "none" !== t.hideDiv.style.display && "none" !== t.div.style.display) {
				var e = window.pageYOffset ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
				t.scrollWithPage || (t.div.style.top = e + t.top + "px")
			}
		}, this.re = function(e, t, i) {
			e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent && e.attachEvent("on" + t, i)
		}, this.ue = function(e, t, i) {
			e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i)
		}, this.mc = function(e) {
			return e.pageX || e.pageY ? {
				x: e.pageX,
				y: e.pageY
			} : {
				x: e.clientX + document.documentElement.scrollLeft,
				y: e.clientY + document.documentElement.scrollTop
			}
		}, this.abs = function(e) {
			for (var t = {
				x: e.offsetLeft,
				y: e.offsetTop
			}; e.offsetParent;) e = e.offsetParent, t.x += e.offsetLeft, t.y += e.offsetTop;
			return t
		}, this.ce = function() {
			var e = document.createElement("div");
			e.id = this.id + "hide", e.style.position = "fixed", e.style.left = "0px", e.style.top = "0px", e.style.right = "0px", e.style.bottom = "0px", e.oncontextmenu = function() {
				return !1
			}, e.onmousedown = function() {
				return !1
			}, document.body.appendChild(e);
			var t = document.createElement("div");
			t.id = this.id + "popup", t.style.position = "fixed", t.style.left = "50%", t.style.top = "0px", t.style.backgroundColor = "white", t.style.width = "50px", t.style.height = "50px", this.dragDrop && (t.onmousedown = this.ve);
			var i = null;
			this.useIframe && (i = document.createElement("iframe"), i.id = this.id + "iframe", i.name = this.id + "iframe", i.frameBorder = "0", i.style.width = "100%", i.style.height = "50px", t.appendChild(i)), document.body.appendChild(t), this.div = t, this.iframe = i, this.hideDiv = e
		}, this.setInnerHTML = function(e, i) {
			var n = window.frames[e],
				a = n.contentWindow || n.document || n.contentDocument;
			a.document && (a = a.document), null == a.body && a.write("<body></body>"), i.nodeType ? a.body.appendChild(i) : a.body.innerHTML = i, t.autoStretch && (t.autoStretchFirstLoadOnly && t.ze || (t.stretch(), t.ze = !0))
		}, this.close = function(e) {
			this.result = e, this.hide()
		}, this.hide = function(e) {
			e = e || {};
			var i = {};
			i.backgroundClick = !! e.backgroundClick, i.result = this.result, i.preventDefault = function() {
				this.preventDefault.value = !0
			}, "function" == typeof this.onClose && (this.onClose(i), i.preventDefault.value) || (this.div && (this.div.style.display = "none", this.hideDiv.style.display = "none", this.useIframe || (this.div.innerHTML = null)), window.focus(), DayPilot.ModalStatic.remove(this), "function" == typeof this.onClosed ? this.onClosed(i) : this.closed && this.closed(), this.result = null, this.disposeOnClose && (t.Ae(t.div), t.Ae(t.hideDiv), t.div = null, t.hideDiv = null, t.iframe = null))
		}, this.Ae = function(e) {
			e && e.parentNode && e.parentNode.removeChild(e)
		}, this.Be = function() {
			if (e) for (var t in e) this[t] = e[t]
		}, this.Be()
	}, DayPilot.Modal.alert = function(e, t) {
		t = t || {}, t.height = t.height || 40, t.useIframe = !1;
		var i = t.okText || "OK";
		t.cancelText || "Cancel";
		console.log('XXXXXXXXXXXXXXXXXXXXX');
		return DayPilot.getPromise(function(n, a) {
			t.onClosed = function(e) {
				n(e)
			};
			var o = new DayPilot.Modal(t),
				r = document.createElement("div");
			r.className = o.theme + "_inner";
			var l = document.createElement("div");
			l.className = o.theme + "_content", l.innerHTML = e;
			var s = document.createElement("div");
			s.className = o.theme + "_buttons";
			var d = document.createElement("button");
			d.innerText = i, d.className = o.theme + "_ok", d.onclick = function(e) {
				DayPilot.ModalStatic.close("OK")
			}, s.appendChild(d), r.appendChild(l), r.appendChild(s), o.showHtml(r), d.focus()
		})
	}, DayPilot.Modal.confirm = function(e, t) {
		t = t || {}, t.height = t.height || 40, t.useIframe = !1;
		var i = t.okText || "OK",
			n = t.cancelText || "Cancel";
		console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYY');
		return DayPilot.getPromise(function(a, o) {
			t.onClosed = function(e) {
				a(e)
			};
			var r = new DayPilot.Modal(t),
				l = document.createElement("div");
			l.className = r.theme + "_inner";
			var s = document.createElement("div");
			s.className = r.theme + "_content", s.innerHTML = e;
			var d = document.createElement("div");
			d.className = r.theme + "_buttons";
			var c = document.createElement("button");
			c.innerText = i, c.className = r.theme + "_ok", c.onclick = function(e) {
				DayPilot.ModalStatic.close("OK")
			};
			var h = document.createTextNode(" "),
				u = document.createElement("button");
			u.innerText = n, u.className = r.theme + "_cancel", u.onclick = function(e) {
				DayPilot.ModalStatic.close()
			}, d.appendChild(c), d.appendChild(h), d.appendChild(u), l.appendChild(s), l.appendChild(d), r.showHtml(l), c.focus()
		})
	}, DayPilot.Modal.prompt = function(e, t, i) {
		"object" == typeof t && (i = t), i = i || {}, i.height = i.height || 40, i.useIframe = !1;
		var n = i.okText || "OK",
			a = i.cancelText || "Cancel",
			o = t || "";
			console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
		return DayPilot.getPromise(function(t, r) {
			i.onClosed = function(e) {
				t(e)
			};
			var l = new DayPilot.Modal(i),
				s = document.createElement("div");
			s.className = l.theme + "_inner";
			var d = document.createElement("div");
			d.className = l.theme + "_content", d.innerHTML = e;
			var c = document.createElement("div");
			c.className = l.theme + "_input";
			var h = document.createElement("input");
			h.value = o, h.style.width = "100%", h.onkeydown = function(e) {
				switch (e.keyCode) {
				case 13:
					l.close(this.value);
					break;
				case 27:
					l.close()
				}
			}, c.appendChild(h);
			var u = document.createElement("div");
			u.className = l.theme + "_buttons";
			var f = document.createElement("button");
			f.innerText = n, f.className = l.theme + "_ok", f.onclick = function(e) {
				l.close(h.value)
			};
			var v = document.createTextNode(" "),
				p = document.createElement("button");
			p.innerText = a, p.className = l.theme + "_cancel", p.onclick = function(e) {
				l.close()
			}, u.appendChild(f), u.appendChild(v), u.appendChild(p), s.appendChild(d), s.appendChild(c), s.appendChild(u), l.showHtml(s), h.focus()
		})
	}, DayPilot.Modal.close = function(e) {
		if (!(parent && parent.DayPilot && parent.DayPilot.ModalStatic)) throw "Unable to close DayPilot.Modal dialog.";
		parent.DayPilot.ModalStatic.close(e)
	}, DayPilot.Modal.closeSerialized = function() {
		for (var e = DayPilot.Modal.opener() || DayPilot.ModalStatic.last(), t = e.le(), i = t.querySelectorAll("input, textarea, select"), n = {}, a = 0; a < i.length; a++) {
			var o = i[a],
				r = o.name;
			if (r) {
				var l = o.value;
				n[r] = l
			}
		}
		DayPilot.Modal.close(n)
	}, DayPilot.Modal.opener = function() {
		console.log('SSSSSSSSSSSSSSSSSSS');
		return parent && parent.DayPilot && parent.DayPilot.ModalStatic && parent.DayPilot.ModalStatic.list[parent.DayPilot.ModalStatic.list.length - 1]
	}, "undefined" == typeof DayPilot.getPromise && (DayPilot.getPromise = function(e) {
		return "undefined" != typeof Promise ? new Promise(e) : (DayPilot.Promise = function(e) {
			var t = this;
			this.then = function(t, i) {
				return t = t ||
				function() {}, i = i ||
				function() {}, e(t, i), DayPilot.getPromise(e)
			}, this["catch"] = function(i) {
				return t.then(null, i), DayPilot.getPromise(e)
			}
		}, new DayPilot.Promise(e))
	})
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	var e = function() {};
	if ("undefined" == typeof DayPilot.Month) {
		var t = {};
		DayPilot.Month = function(i, n) {
			this.v = "3058", this.nav = {};
			var a = this;
			this.id = i, this.isMonth = !0, this.api = 2, this.A = !1, this.hideUntilInit = !0, this.startDate = new DayPilot.Date, this.width = null, "function" == typeof DayPilot.Bubble ? this.bubble = new DayPilot.Bubble : this.bubble = null, this.cssClassPrefix = "month_default", this.cellHeight = 100, this.cellMarginBottom = 0, this.allowMultiSelect = !0, this.autoRefreshCommand = "refresh", this.autoRefreshEnabled = !1, this.autoRefreshInterval = 60, this.autoRefreshMaxCount = 20, this.doubleClickTimeout = 300, this.eventEndSpec = "DateTime", this.eventFontColor = "#000000", this.eventFontFamily = "Tahoma", this.eventFontSize = "11px", this.headerBackColor = "#ECE9D8", this.headerFontColor = "#000000", this.headerFontFamily = "Tahoma", this.headerFontSize = "10pt", this.headerHeight = 20, this.heightSpec = "Auto", this.weekStarts = 0, this.innerBorderColor = "#cccccc", this.borderColor = "black", this.eventHeight = 25, this.cellHeaderHeight = 16, this.clientState = {}, this.afterRender = function() {}, this.backColor = "#FFFFD5", this.nonBusinessBackColor = "#FFF4BC", this.cssOnly = !0, this.eventBackColor = "White", this.eventBorderColor = "Black", this.eventCorners = "Regular", this.eventFontColor = "#000000", this.eventFontFamily = "Tahoma", this.eventFontSize = "11px", this.eventsLoadMethod = "GET", this.cellWidth = 14.285, this.lineSpace = 1, this.locale = "en-us", this.messageHideAfter = 5e3, this.notifyCommit = "Immediate", this.visible = !0, this.eventMoveToPosition = !1, this.eventTextLayer = "Top", this.eventStartTime = !1, this.eventEndTime = !1, this.eventStartEndWidth = 60, this.eventTextAlignment = null, this.eventTextLeftIndent = 20, this.showWeekend = !0, this.cellMode = !1, this.shadowType = "Fill", this.tapAndHoldTimeout = 300, this.timeFormat = "Auto", this.viewType = "Month", this.weeks = 1, this.eventClickHandling = "Enabled", this.eventDeleteHandling = "Disabled", this.eventDoubleClickHandling = "Enabled", this.eventMoveHandling = "Update", this.eventResizeHandling = "Update", this.eventRightClickHandling = "ContextMenu", this.eventSelectHandling = "Update", this.headerClickHandling = "Enabled", this.timeRangeSelectedHandling = "Enabled", this.timeRangeDoubleClickHandling = "Enabled", this.onEventFilter = null, this.onBeforeEventRender = null, this.onBeforeCellRender = null, this.onBeforeHeaderRender = null, this.onBeforeEventExport = null, this.onBeforeCellExport = null, this.backendUrl = null, this.cellEvents = [], this.elements = {}, this.elements.events = [], this.t = {}, this.t.events = {}, this.events = {}, this.B = 0, this.members = {}, this.members.ignore = ["internal", "nav", "debug", "temp", "elements", "members", "cellProperties"], this.K = function(e, t) {
				var e = DayPilot.Util.parseJSON(e);
				if (e.BubbleGuid) {
					var i = e.BubbleGuid,
						n = this.bubbles[i];
					return delete this.bubbles[i], a.X(), void("undefined" != typeof e.Result.BubbleHTML && n.updateView(e.Result.BubbleHTML, n))
				}
				if (e.CallBackRedirect) return void(document.location.href = e.CallBackRedirect);
				if ("undefined" != typeof e.ClientState && (a.clientState = e.ClientState), "None" === e.UpdateType) return a.Y(e.CallBackData, !0), void(e.Message && a.message(e.Message));
				if (e.VsUpdate) {
					var o = document.createElement("input");
					o.type = "hidden", o.name = a.id + "_vsupdate", o.id = o.name, o.value = e.VsUpdate, a.Ce.innerHTML = "", a.Ce.appendChild(o)
				}
				a.events.list = e.Events, "undefined" != typeof e.TagFields && (a.tagFields = e.TagFields), "undefined" != typeof e.SortDirections && (a.sortDirections = e.SortDirections), "Full" === e.UpdateType && (a.cellProperties = e.CellProperties, a.headerProperties = e.HeaderProperties, a.startDate = e.StartDate, "undefined" != typeof e.ShowWeekend && (a.showWeekend = e.ShowWeekend), a.headerBackColor = e.HeaderBackColor ? e.HeaderBackColor : a.headerBackColor, a.backColor = e.BackColor ? e.BackColor : a.backColor, a.nonBusinessBackColor = e.NonBusinessBackColor ? e.NonBusinessBackColor : a.nonBusinessBackColor, a.locale = e.Locale ? e.Locale : a.locale, a.timeFormat = e.TimeFormat ? e.TimeFormat : a.timeFormat, "undefined" != typeof e.WeekStarts && (a.weekStarts = e.WeekStarts), a.hashes = e.Hashes), a.multiselect.clear(!0), a.multiselect.initList = e.SelectedEvents, a.M(), a.De(), a.ba(), "Full" === e.UpdateType && (a.Ee(), a.Fe()), a.ja(), a.na(), a.oa(), a.Y(e.CallBackData, !0), a.ra(), e.Message && a.message(e.Message)
			}, this.Y = function(e, t) {
				var i = function(e, t) {
						return function() {
							if (a.sa()) {
								if ("function" == typeof a.onAfterRender) {
									var i = {};
									i.isCallBack = t, i.data = e, a.onAfterRender(i)
								}
							} else a.afterRender && a.afterRender(e, t)
						}
					};
				window.setTimeout(i(e, t), 0)
			}, this.sa = function() {
				return 2 === a.api
			}, this.q = function(e) {
				var t = this.theme || this.cssClassPrefix;
				return t ? t + e : ""
			}, this.ba = function() {
				if (this.events.list) {
					if ("function" == typeof this.onBeforeEventRender) for (var e = this.events.list.length, t = 0; t < e; t++) this.Xc(t);
					this.cellMode ? this.Ge() : this.He()
				}
			}, this.X = function() {}, this.He = function() {
				if (this.events.list) {
					for (var e = 0; e < this.events.list.length; e++) {
						var t = this.events.list[e],
							i = null;
						if ("function" == typeof a.onBeforeEventRender && (i = a.t.events[e]), i) {
							if (i.hidden) continue
						} else if (t.hidden) continue;
						var n = new DayPilot.Date(t.start),
							o = new DayPilot.Date(t.end);
						if (o = a.Ie(o), !(n.getTime() > o.getTime())) for (var r = 0; r < this.rows.length; r++) {
							var l = this.rows[r];
							if (l.belongsHere(n, o)) {
								var s = new DayPilot.Event(t, a);
								if ("function" == typeof a.onEventFilter && a.events.bd) {
									var d = {};
									if (d.filter = a.events.bd, d.visible = !0, d.e = s, a.onEventFilter(d), !d.visible) break
								}
								l.events.push(s), "function" == typeof this.onBeforeEventRender && (s.cache = this.t.events[e])
							}
						}
					}
					for (var c = 0; c < this.rows.length; c++) {
						var l = this.rows[c];
						l.events.sort(this.dd);
						for (var h = 0; h < this.rows[c].events.length; h++) {
							var u = l.events[h],
								f = l.getStartColumn(u),
								v = l.getWidth(u);
							l.putIntoLine(u, f, v, c)
						}
					}
				}
			}, this.Ge = function() {
				this.cellEvents = [];
				for (var e = 0; e < this.Je(); e++) {
					this.cellEvents[e] = [];
					for (var t = 0; t < this.rows.length; t++) {
						var i = {},
							n = this.firstDate.addDays(7 * t + e);
						i.start = n, i.end = n.addDays(1), i.events = [], this.cellEvents[e][t] = i
					}
				}
				for (var o = 0; o < this.events.list.length; o++) {
					var r = this.events.list[o],
						l = null;
					if ("function" == typeof a.onBeforeEventRender && (l = a.t.events[o]), l) {
						if (l.hidden) continue
					} else if (r.hidden) continue;
					var s = new DayPilot.Date(r.start),
						d = new DayPilot.Date(r.start);
					if (d = a.Ie(d), !(s.getTime() > d.getTime())) for (var e = 0; e < this.Je(); e++) for (var t = 0; t < this.rows.length; t++) {
						var i = this.cellEvents[e][t];
						if (s.getTime() >= i.start.getTime() && s.getTime() < i.end.getTime()) {
							var c = new DayPilot.Event(r, a);
							if ("function" == typeof a.onEventFilter && a.events.bd) {
								var h = {};
								if (h.filter = a.events.bd, h.visible = !0, h.e = c, a.onEventFilter(h), !h.visible) continue
							}
							i.events.push(c), "function" == typeof this.onBeforeEventRender && (c.cache = this.t.events[o])
						}
					}
				}
				for (var e = 0; e < this.Je(); e++) for (var t = 0; t < this.rows.length; t++) {
					var i = this.cellEvents[e][t];
					i.events.sort(this.dd)
				}
			}, this.M = function() {
				for (var e = 0; e < this.elements.events.length; e++) {
					var t = this.elements.events[e];
					t.event = null, t.click = null, t.parentNode.removeChild(t)
				}
				this.elements.events = []
			}, this.oa = function() {
				this.t.events = {}, this.cellMode ? this.Ke() : this.Le(), this.multiselect.redraw()
			}, this.Ke = function() {
				this.elements.events = [];
				for (var e = 0; e < this.Je(); e++) for (var t = 0; t < this.rows.length; t++) for (var i = this.cellEvents[e][t], n = (this.cells[e][t], 0); n < i.events.length; n++) {
					var a = i.events[n];
					a.part.colStart = e, a.part.colWidth = 1, a.part.row = t, a.part.line = n, a.part.startsHere = !0, a.part.endsHere = !0, this.Rb(a)
				}
			}, this.Le = function() {
				this.elements.events = [];
				for (var e = 0; e < this.rows.length; e++) for (var t = this.rows[e], i = 0; i < t.lines.length; i++) for (var n = t.lines[i], a = 0; a < n.length; a++) this.Rb(n[a])
			}, this.cd = function(e, t) {
				if (!(e && t && e.start && t.start)) return 0;
				var i = e.start().ticks - t.start().ticks;
				return 0 !== i ? i : t.end().ticks - e.end().ticks
			}, this.dd = function(e, t) {
				if (!e || !t) return 0;
				if (!(e.data && t.data && e.data.sort && t.data.sort && 0 !== e.data.sort.length && 0 !== t.data.sort.length)) return a.cd(e, t);
				for (var i = 0, n = 0; 0 === i && "undefined" != typeof e.data.sort[n] && "undefined" != typeof t.data.sort[n];) i = e.data.sort[n] === t.data.sort[n] ? 0 : "number" == typeof e.data.sort[n] && "number" == typeof t.data.sort[n] ? e.data.sort[n] - t.data.sort[n] : a.ed(e.data.sort[n], t.data.sort[n], a.sortDirections[n]), n++;
				return i
			}, this.ed = function(e, t, i) {
				var n = "desc" !== i,
					a = n ? -1 : 1,
					o = -a;
				if (null === e && null === t) return 0;
				if (null === t) return o;
				if (null === e) return a;
				var r = [];
				return r[0] = e, r[1] = t, r.sort(), e === r[0] ? a : o
			}, this.Me = function(e, i, n, a, o, r) {
				o || (o = 0);
				var l = a;
				this.shadow = {}, this.shadow.list = [], this.shadow.start = {
					x: e,
					y: i
				}, this.shadow.width = a, this.eventMoveToPosition && (l = 1, this.shadow.position = n);
				var s = 7 * i + e - o;
				s < 0 && (l += s, e = 0, i = 0);
				for (var d = o; d >= 7;) i--, d -= 7;
				if (d > e) {
					d > e + (7 - this.Je()) ? (i--, e = e + 7 - d) : (l = l - d + e, e = 0)
				} else e -= d;
				i < 0 && (i = 0, e = 0);
				var c = null;
				for (t.resizingEvent ? c = "w-resize" : t.movingEvent && (c = "move"), this.nav.top.style.cursor = c; l > 0 && i < this.rows.length;) {
					var h = Math.min(this.Je() - e, l),
						u = this.rows[i],
						f = this.Ne(i),
						v = u.getHeight();
					this.eventMoveToPosition && (f = this.Oe(i, n), v = 2);
					var p = document.createElement("div");
					p.setAttribute("unselectable", "on"), p.style.position = "absolute", p.style.left = this.Pe() * e + "%", p.style.width = this.Pe() * h + "%", p.style.top = f + "px", p.style.height = v + "px", p.style.cursor = c;
					var g = document.createElement("div");
					g.setAttribute("unselectable", "on"), p.appendChild(g), p.className = this.q("_shadow"), g.className = this.q("_shadow_inner");
					this.nav.events.appendChild(p), this.shadow.list.push(p), l -= h + 7 - this.Je(), e = 0, i++
				}
			}, this.Qe = function() {
				if (this.shadow) {
					this.nav.events;
					DayPilot.de(this.shadow.list), this.shadow = null, this.nav.top.style.cursor = ""
				}
			}, this.Oe = function(e, t) {
				for (var i = 0, n = 0; n < e; n++) i += this.rows[n].getHeight();
				return i += this.cellHeaderHeight, i += t * l.lineHeight()
			}, this.Re = function(e, t) {
				return this.firstDate.addDays(7 * t + e)
			}, this.Xc = function(e) {
				var t = this.t.events,
					i = this.events.list[e],
					n = {};
				for (var a in i) n[a] = i[a];
				if ("function" == typeof this.onBeforeEventRender) {
					var o = {};
					o.e = n, o.data = n, this.onBeforeEventRender(o)
				}
				t[e] = n
			}, this.Rb = function(e) {
				var t = this.cellMode,
					i = e.part.row,
					n = e.part.line,
					r = e.part.colStart,
					s = e.part.colWidth,
					d = e.cache || e.data,
					c = t ? 0 : this.Pe() * r,
					h = t ? 100 : this.Pe() * s,
					u = t ? n * l.lineHeight() : this.Oe(i, n),
					f = document.createElement("div");
				f.setAttribute("unselectable", "on"), f.style.height = l.eventHeight() + "px", f.style.position = "relative", f.style.overflow = "hidden", f.className = this.q("_event"), d.cssClass && DayPilot.Util.addClass(f, d.cssClass), f.event = e, t ? (f.style.marginRight = "2px", f.style.marginBottom = "2px") : (f.style.width = h + "%", f.style.position = "absolute", f.style.left = c + "%", f.style.top = u + "px"), this.showToolTip && d.toolTip && !this.bubble && (f.title = d.toolTip), f.onclick = this.Se, f.ondblclick = this.Te, f.oncontextmenu = this.Ue, f.onmousedown = this.Ub, f.onmousemove = this.Sb, f.onmouseout = this.Tb, f.ontouchstart = o.onEventTouchStart, f.ontouchmove = o.onEventTouchMove, f.ontouchend = o.onEventTouchEnd, e.part.startsHere || DayPilot.Util.addClass(f, this.q("_event_continueleft")), e.part.endsHere || DayPilot.Util.addClass(f, this.q("_event_continueright"));
				var v = document.createElement("div");
				v.setAttribute("unselectable", "on"), v.className = this.q("_event_inner"), d.fontColor && (v.style.color = d.fontColor), e.client.innerHTML() ? v.innerHTML = e.client.innerHTML() : v.innerHTML = e.text(), d.backColor && (v.style.background = d.backColor, (DayPilot.browser.ie9 || DayPilot.browser.ielt9) && (v.style.filter = "")), f.appendChild(v);
				var p = this.vc.locale(),
					g = a.eventStartEndWidth;
				if (this.eventStartTime || d.htmlStart) {
					var m = "Clock12Hours" === a.vc.timeFormat() ? e.start().toString("h tt", p) : e.start().toString("H", p),
						y = {
							"left": 5,
							"top": 3,
							"width": g,
							"bottom": 2,
							"v": "Visible",
							"html": d.htmlStart || m,
							"css": a.q("_event_timeleft")
						},
						b = DayPilot.Areas.createArea(f, e, y);
					f.appendChild(b), v.style.paddingLeft = g + "px"
				}
				if (this.eventEndTime || d.htmlEnd) {
					var m = "Clock12Hours" === a.vc.timeFormat() ? e.end().toString("h tt", p) : e.end().toString("H", p),
						y = {
							"right": 5,
							"top": 3,
							"width": g,
							"bottom": 2,
							"v": "Visible",
							"html": d.htmlEnd || m,
							"css": a.q("_event_timeright")
						},
						b = DayPilot.Areas.createArea(f, e, y);
					f.appendChild(b), v.style.paddingRight = g + "px"
				}
				if (d.areas) for (var w = d.areas, D = 0; D < w.length; D++) {
					var y = w[D],
						k = y.visibility || y.v || "Visible";
					if ("Visible" === k) {
						var b = DayPilot.Areas.createArea(f, e, y);
						f.appendChild(b)
					}
				}
				this.elements.events.push(f), t ? this.cells[r][i].body.appendChild(f) : this.nav.events.appendChild(f), a.multiselect.Ab(f.event) && a.multiselect.add(f.event, !0);
				var x = f;
				if (a.sa()) {
					if ("function" == typeof a.onAfterEventRender) {
						var C = {};
						C.e = x.event, C.div = x, a.onAfterEventRender(C)
					}
				} else a.afterEventRender && a.afterEventRender(x.event, x)
			}, this.Se = function(e) {
				o.start || a.Ga(this, e)
			}, this.Te = function(e) {
				a.Ka(this, e)
			}, this.Sb = function(e) {
				var i = this,
					n = i.event;
				if ("undefined" != typeof t && !t.movingEvent && !t.resizingEvent) {
					var o = DayPilot.mo3(i, e);
					if (o) {
						!
						function() {
							var e = i;
							if (!e.active) {
								var t = [],
									o = n.cache || n.data;
								"Disabled" === a.eventDeleteHandling || o.deleteDisabled || t.push({
									"action": "JavaScript",
									"v": "Hover",
									"w": 17,
									"h": 17,
									"top": 2,
									"right": 2,
									"css": a.q("_event_delete"),
									"js": function(e) {
										a.Pa(e)
									}
								});
								var r = e.event.cache ? e.event.cache.areas : e.event.data.areas;
								r && r.length > 0 && (t = t.concat(r)), DayPilot.Areas.showAreas(e, e.event, null, t)
							}
						}(), a.Ve(i.event).each(function(e) {
							DayPilot.Util.addClass(e, a.q("_event_hover"))
						});
						var r = 6;
						if (!a.cellMode && o.x <= r && n.client.resizeEnabled() ? n.part.startsHere ? (i.style.cursor = "w-resize", i.dpBorder = "left") : i.style.cursor = "not-allowed" : !a.cellMode && i.clientWidth - o.x <= r && n.client.resizeEnabled() ? n.part.endsHere ? (i.style.cursor = "e-resize", i.dpBorder = "right") : i.style.cursor = "not-allowed" : i.style.cursor = "default", "undefined" != typeof DayPilot.Bubble && a.bubble && "Disabled" !== a.eventHoverHandling) if (t.movingEvent || t.resizingEvent) DayPilot.Bubble.hideActive();
						else {
							var l = this.Yc && o.x === this.Yc.x && o.y === this.Yc.y;
							l || (this.Yc = o, a.bubble.showEvent(i.event))
						}
					}
				}
			}, this.Tb = function(e) {
				var t = this;
				"undefined" != typeof DayPilot.Bubble && a.bubble && a.bubble.hideOnMouseOut(), t.style.cursor = "", a.Ve(t.event).each(function(e) {
					DayPilot.Util.removeClass(e, a.q("_event_hover"))
				}), DayPilot.Areas.hideAreas(t, e)
			}, this.Ue = function() {
				var e = this;
				return a.La(e.event), !1
			}, this.Ub = function(e) {
				if (!o.start) {
					"undefined" != typeof DayPilot.Bubble && (DayPilot.Bubble.hideActive(), DayPilot.Bubble.cancelShowing());
					var i = this,
						n = i.event,
						r = n.part.row,
						l = n.part.colStart,
						s = n.part.line,
						d = n.part.colWidth;
					e = e || window.event;
					var c = DayPilot.Util.mouseButton(e);
					if (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation(), c.left) if ("undefined" != typeof DayPilot.Bubble && a.bubble && DayPilot.Bubble.hideActive(), t.movingEvent = null, "w-resize" === this.style.cursor || "e-resize" === this.style.cursor) {
						var h = {};
						h.start = {}, h.start.x = l, h.start.y = r, h.event = i.event, h.width = DayPilot.DateUtil.daysSpan(h.event.start(), h.event.end()) + 1, h.direction = this.style.cursor, t.resizingEvent = h
					} else if ("move" === this.style.cursor || n.client.moveEnabled()) {
						a.Qe();
						var u = DayPilot.mo3(a.nav.events, e);
						if (!u) return;
						var f = a.We(u.x, u.y);
						if (!f) return;
						var v = DayPilot.DateUtil.daysDiff(n.start(), a.rows[r].start),
							p = 7 * f.y + f.x - (7 * r + l);
						v && (p += v);
						var g = {};
						g.start = {}, g.start.x = l, g.start.y = r, g.start.line = s, g.offset = a.eventMoveToPosition ? 0 : p, g.colWidth = d, g.event = i.event, g.coords = u, t.movingEvent = g
					}
				}
			}, this.temp = {}, this.temp.getPosition = function() {
				if (!a.coords) return null;
				var e = a.We(a.coords.x, a.coords.y);
				if (!e) return null;
				var t = new DayPilot.Date(a.Re(e.x, e.y)),
					e = {};
				return e.start = t, e.end = t.addDays(1), e
			}, this.Vb = {};
			var o = a.Vb;
			o.active = !1, o.start = !1, o.timeouts = [], o.onEventTouchStart = function(e) {
				if (!o.active && !o.start) {
					o.clearTimeouts(), o.start = !0, o.active = !1;
					var t = this;
					if (t.event.client.moveEnabled()) {
						var i = a.tapAndHoldTimeout;
						o.timeouts.push(window.setTimeout(function() {
							o.active = !0, o.start = !1;
							var i = o.relativeCoords(e);
							o.startMoving(t, i), e.preventDefault()
						}, i))
					}
					e.stopPropagation()
				}
			}, o.onEventTouchMove = function(e) {
				o.clearTimeouts(), o.start = !1
			}, o.onEventTouchEnd = function(e) {
				o.clearTimeouts(), o.start && a.Ha(this, e), window.setTimeout(function() {
					o.start = !1, o.active = !1
				}, 500)
			}, o.onMainTouchStart = function(e) {
				if (!o.active && !o.start) {
					o.clearTimeouts(), o.start = !0, o.active = !1;
					var t = a.tapAndHoldTimeout;
					o.timeouts.push(window.setTimeout(function() {
						o.active = !0, o.start = !1, e.preventDefault();
						var t = o.relativeCoords(e);
						o.startRange(t);
					}, t))
				}
			}, o.onMainTouchMove = function(e) {
				if (o.clearTimeouts(), o.start = !1, o.active) {
					e.preventDefault();
					var t = o.relativeCoords(e);
					if (o.moving) return void o.updateMoving(t);
					o.range && o.updateRange(t)
				}
			}, o.onMainTouchEnd = function(e) {
				if (o.clearTimeouts(), o.active) {
					if (o.moving) {
						var t = (o.moving, o.moving.event),
							i = a.shadow.start,
							n = a.shadow.position,
							r = o.moving.offset;
						a.Qe(), o.moving = null, a.Va(t, i.x, i.y, r, e, n)
					}
					if (o.range) {
						var l = o.range,
							i = new DayPilot.Date(a.Re(l.from.x, l.from.y)),
							s = i.addDays(l.width);
						o.range = null, a.ab(i, s)
					}
				}
				window.setTimeout(function() {
					o.start = !1, o.active = !1
				}, 500)
			}, o.clearTimeouts = function() {
				for (var e = 0; e < o.timeouts.length; e++) clearTimeout(o.timeouts[e]);
				o.timeouts = []
			}, o.relativeCoords = function(e) {
				var t = a.nav.events,
					i = e.touches[0].pageX,
					n = e.touches[0].pageY,
					o = DayPilot.abs(t);
				return {
					x: i - o.x,
					y: n - o.y,
					toString: function() {
						return "x: " + this.x + ", y:" + this.y
					}
				}
			}, o.startMoving = function(e, t) {
				a.Qe();
				var i = e.event,
					n = a.We(t.x, t.y);
				if (n) {
					var r = DayPilot.DateUtil.daysDiff(i.start(), a.rows[i.part.row].start),
						l = 7 * n.y + n.x - (7 * i.part.row + i.part.colStart);
					r && (l += r);
					var s = {};
					s.start = {}, s.start.x = i.part.colStart, s.start.y = i.part.row, s.start.line = i.part.line, s.offset = a.eventMoveToPosition ? 0 : l, s.colWidth = i.part.colWidth, s.event = i, s.coords = t, o.moving = s, o.updateMoving(t)
				}
			}, o.updateMoving = function(e) {
				var t = a.We(e.x, e.y);
				if (t) {
					var i = a.Xe(t);
					a.Qe();
					var n = o.moving.event,
						r = o.moving.offset,
						l = a.cellMode ? 1 : DayPilot.DateUtil.daysSpan(n.start(), n.end()) + 1;
					l < 1 && (l = 1), a.Me(t.x, t.y, i, l, r, n)
				}
			}, o.startRange = function(e) {
				var t = a.We(e.x, e.y);
				if (t) {
					a.Qe();
					var i = {};
					i.start = {}, i.start.x = t.x, i.start.y = t.y, i.x = t.x, i.y = t.y, i.width = 1, o.range = i, o.updateRange(e)
				}
			}, o.updateRange = function(e) {
				var t = a.We(e.x, e.y);
				if (t) {
					a.Qe();
					var i = o.range.start,
						n = 7 * i.y + i.x,
						r = 7 * t.y + t.x,
						l = Math.abs(r - n) + 1;
					l < 1 && (l = 1);
					var s = n < r ? i : t;
					o.range.width = l, o.range.from = {
						x: s.x,
						y: s.y
					}, a.Me(s.x, s.y, 0, l, 0, null)
				}
			}, this.isWeekend = function(e) {
				return 0 === e.dayOfWeek() || 6 === e.dayOfWeek()
			}, this.Ye = function() {
				var e = this.startDate.lastDayOfMonth();
				if (this.showWeekend) return e;
				for (; this.isWeekend(e);) e = e.addDays(-1);
				return e
			}, this.De = function() {
				if ("string" == typeof this.startDate && (this.startDate = new DayPilot.Date(this.startDate)), "Month" === this.viewType ? this.startDate = this.startDate.firstDayOfMonth() : this.startDate = this.startDate.getDatePart(), this.firstDate = this.startDate.firstDayOfWeek(l.weekStarts()), !this.showWeekend) {
					for (var e = this.startDate.addMonths(-1).getMonth(), t = new DayPilot.Date(this.firstDate).addDays(6); this.isWeekend(t);) t = t.addDays(-1);
					t.getMonth() === e && (this.firstDate = this.firstDate.addDays(7))
				}
				var i;
				this.startDate;
				if ("Month" === this.viewType) {
					var n = this.Ye(),
						o = DayPilot.DateUtil.daysDiff(this.firstDate, n) + 1;
					i = Math.ceil(o / 7)
				} else i = this.weeks;
				this.days = 7 * i, this.rows = [];
				for (var r = 0; r < i; r++) {
					var s = {};
					s.start = this.firstDate.addDays(7 * r), s.end = s.start.addDays(this.Je()), s.events = [], s.lines = [], s.index = r, s.minHeight = this.cellHeight, s.calendar = this, s.belongsHere = function(e, t) {
						return t.getTime() === e.getTime() && e.getTime() === this.start.getTime() || !(t.getTime() <= this.start.getTime() || e.getTime() >= this.end.getTime())
					}, s.getPartStart = function(e) {
						return DayPilot.DateUtil.max(this.start, e.start())
					}, s.getPartEnd = function(e) {
						return DayPilot.DateUtil.min(this.end, e.rawend())
					}, s.getStartColumn = function(e) {
						var t = this.getPartStart(e);
						return DayPilot.DateUtil.daysDiff(this.start, t)
					}, s.getWidth = function(e) {
						return DayPilot.DateUtil.daysSpan(this.getPartStart(e), this.getPartEnd(e)) + 1
					}, s.putIntoLine = function(e, t, i, n) {
						for (var a = this, o = 0; o < this.lines.length; o++) {
							var r = this.lines[o];
							if (r.isFree(t, i)) return r.addEvent(e, t, i, n, o), o
						}
						var r = [];
						return r.isFree = function(e, t) {
							for (var i = !0, n = 0; n < this.length; n++) {
								var a = this[n];
								e + t - 1 < a.part.colStart || e > a.part.colStart + a.part.colWidth - 1 || (i = !1)
							}
							return i
						}, r.addEvent = function(e, t, i, n, o) {
							e.part.colStart = t, e.part.colWidth = i, e.part.row = n, e.part.line = o, e.part.startsHere = a.start.getTime() <= e.start().getTime(), e.part.endsHere = a.end.getTime() >= e.end().getTime(), this.push(e)
						}, r.addEvent(e, t, i, n, this.lines.length), this.lines.push(r), this.lines.length - 1
					}, s.getStart = function() {
						for (var e = 0, t = 0; t < a.rows.length && t < this.index; t++) e += a.rows[t].getHeight()
					}, s.getHeight = function() {
						return Math.max(this.lines.length * l.lineHeight() + a.cellHeaderHeight + a.cellMarginBottom, this.calendar.cellHeight)
					}, this.rows.push(s)
				}
				this.Ze = this.firstDate.addDays(7 * i)
			}, this.$e = function() {
				switch (this.heightSpec) {
				case "Auto":
					for (var e = l.headerHeight(), t = 0; t < this.rows.length; t++) e += this.rows[t].getHeight();
					return e;
				case "Fixed":
					return this.height
				}
			}, this._e = function(e, t) {
				return 7 * t.y + t.x - (7 * e.y + e.x) + 1
			}, this.Qc = {}, this.Qc.scope = null, this.Qc.notify = function() {
				a.Qc.scope && a.Qc.scope["$apply"]()
			}, this.debug = new DayPilot.Debug(this), this.$b = function() {
				var e = this.nav.top;
				this.nav.top.dp = this, e.setAttribute("unselectable", "on"), e.style.MozUserSelect = "none", e.style.KhtmlUserSelect = "none", e.style.WebkitUserSelect = "none", e.style.WebkitTapHighlightColor = "rgba(0,0,0,0)", e.style.WebkitTouchCallout = "none", e.style.position = "relative", this.width && (e.style.width = this.width), e.onselectstart = function(e) {
					return !1
				}, e.className = this.q("_main"), this.hideUntilInit && (e.style.visibility = "hidden"), this.visible || (e.style.display = "none"), e.onmousemove = this.fc, e.ontouchstart = o.onMainTouchStart, e.ontouchmove = o.onMainTouchMove, e.ontouchend = o.onMainTouchEnd, this.Ce = document.createElement("div"), this.Ce.style.display = "none", this.nav.top.appendChild(this.Ce);
				var t = document.createElement("div");
				t.style.position = "relative", t.style.height = l.headerHeight() + "px", t.oncontextmenu = function() {
					return !1
				}, this.nav.top.appendChild(t), this.nav.header = t;
				var i = document.createElement("div");
				i.style.zoom = "1";
				var n = document.createElement("div");
				n.style.position = "relative", i.appendChild(n), this.nav.top.appendChild(i), this.nav.scrollable = i, this.nav.events = n
			}, this.fc = function(e) {
				e.insideMainD = !0, window.event && window.event.srcElement && (window.event.srcElement.inside = !0), a.coords = DayPilot.mo3(a.nav.events, e);
				var i = a.coords;
				if (i) {
					var n = a.We(i.x, i.y);
					if (n) {
						if (t.resizingEvent) {
							a.Qe();
							var o, r, l = t.resizingEvent;
							l.start;
							if ("w-resize" === l.direction) {
								r = n;
								var s = l.event.rawend();
								s.getDatePart().getTime() === s.getTime() && (s = s.addDays(-1));
								var d = a.af(s);
								o = a._e(n, d)
							} else r = a.af(l.event.start()), o = a._e(r, n);
							o < 1 && (o = 1), a.Me(r.x, r.y, 0, o)
						} else if (t.movingEvent) {
							if (i.x === t.movingEvent.coords.x && i.y === t.movingEvent.coords.y) return;
							var c = a.Xe(n);
							a.Qe();
							var h = t.movingEvent.event,
								u = t.movingEvent.offset,
								o = a.cellMode ? 1 : DayPilot.DateUtil.daysSpan(h.start(), h.rawend()) + 1;
							o < 1 && (o = 1), a.Me(n.x, n.y, c, o, u, h)
						} else if (t.timeRangeSelecting) {
							t.cancelCellClick = !0, a.Qe();
							var r = t.timeRangeSelecting,
								f = 7 * r.y + r.x,
								v = 7 * n.y + n.x,
								o = Math.abs(v - f) + 1;
							o < 1 && (o = 1);
							var p = f < v ? r : n;
							t.timeRangeSelecting.from = {
								x: p.x,
								y: p.y
							}, t.timeRangeSelecting.width = o, t.timeRangeSelecting.moved = !0, a.Me(p.x, p.y, 0, o, 0, null)
						}
						if (t.drag) {
							if (t.gShadow && document.body.removeChild(t.gShadow), t.gShadow = null, !t.movingEvent) {
								var g = DayPilot.Date.today(),
									e = {
										"id": t.drag.id,
										"start": g,
										"end": g.addSeconds(t.drag.duration),
										"text": t.drag.text
									},
									m = t.drag.data;
								if (m) {
									var y = ["duration", "element", "remove", "id", "text"];
									for (var b in m) DayPilot.contains(y, b) || (e[b] = m[b])
								}
								var h = new DayPilot.Event(e, a);
								h.external = !0;
								var w = t.movingEvent = {};
								w.event = h, w.coords = i, w.position = 0, w.offset = 0, w.external = !0, w.removeElement = t.drag.element
							}
							e.cancelBubble = !0
						}
					}
				}
			}, this.Xe = function(e) {
				for (var t = e.relativeY, i = a.rows[e.y], n = a.cellHeaderHeight, o = l.lineHeight(), r = i.lines.length, s = 0; s < i.lines.length; s++) {
					if (i.lines[s].isFree(e.x, 1)) {
						r = s;
						break
					}
				}
				var d = Math.floor((t - n + o / 2) / o),
					d = Math.min(r, d),
					d = Math.max(0, d);
				return d
			}, this.message = function(e, t, i, n) {
				if (null !== e) {
					var o, t = t || this.messageHideAfter || 2e3,
						r = .8,
						s = l.headerHeight();
					if (this.nav.message) o = a.nav.message;
					else {
						o = document.createElement("div"), o.setAttribute("unselectable", "on"), o.style.position = "absolute", o.style.right = "0px", o.style.left = "0px", o.style.top = s + "px", o.style.opacity = r, o.style.filter = "alpha(opacity=80)", o.style.display = "none", o.onmousemove = function() {
							o.messageTimeout && !o.status && clearTimeout(o.messageTimeout)
						}, o.onmouseout = function() {
							"none" !== a.nav.message.style.display && (o.messageTimeout = setTimeout(a.Ea, 500))
						};
						var d = document.createElement("div");
						d.setAttribute("unselectable", "on"), d.onclick = function() {
							a.nav.message.style.display = "none"
						}, d.className = this.q("_message"), o.appendChild(d);
						var c = document.createElement("div");
						c.setAttribute("unselectable", "on"), c.style.position = "absolute", c.className = this.q("_message_close"), c.onclick = function() {
							a.nav.message.style.display = "none"
						}, o.appendChild(c), this.nav.top.appendChild(o), this.nav.message = o
					}
					var h = function() {
							a.nav.message.style.opacity = r, a.nav.message.firstChild.innerHTML = e;
							var i = function() {
									o.messageTimeout = setTimeout(a.Ea, t)
								};
							DayPilot.fade(a.nav.message, .2, i)
						};
					clearTimeout(o.messageTimeout), "none" !== this.nav.message.style.display ? DayPilot.fade(a.nav.message, -.2, h) : h()
				}
			}, this.message.show = function(e) {
				a.message(e)
			}, this.message.hide = function() {
				a.Ea()
			}, this.Ea = function() {
				var e = function() {
						a.nav.message.style.display = "none"
					};
				DayPilot.fade(a.nav.message, -.2, e)
			}, this.P = function(e) {
				"Parent100Pct" === a.heightSpec && a.ja()
			}, this.ja = function() {
				var e = this.nav.scrollable;
				if ("Parent100Pct" === this.heightSpec || "Fixed" === this.heightSpec ? (e.style.top = this.headerHeight + "px", e.style.bottom = "0px", e.style.left = "0px", e.style.right = "0px", e.style.overflow = "auto", e.style.position = "absolute") : e.style.position = "relative", "Parent100Pct" === this.heightSpec) {
					this.nav.top.style.height = "100%";
					this.nav.top.clientHeight
				} else this.nav.top.style.height = this.$e() + "px";
				for (var t = 0; t < this.cells.length; t++) for (var i = 0; i < this.cells[t].length; i++) this.cells[t][i].style.top = this.Ne(i) + "px", this.cells[t][i].style.height = this.rows[i].getHeight() + "px";
				this.bf()
			}, this.We = function(e, t) {
				for (var i = Math.floor(this.nav.top.clientWidth / this.Je()), n = Math.min(Math.floor(e / i), this.Je() - 1), a = null, o = 0, r = 0, l = 0, s = 0; s < this.rows.length; s++) {
					if (r += this.rows[s].getHeight(), t < r) {
						o = t - l, a = s;
						break
					}
					l = r
				}
				null === a && (a = this.rows.length - 1);
				var d = {};
				return d.x = n, d.y = a, d.relativeY = o, d
			}, this.af = function(e) {
				for (var t = DayPilot.DateUtil.daysDiff(this.firstDate, e), i = {
					x: 0,
					y: 0
				}; t >= 7;) i.y++, t -= 7;
				return i.x = t, i
			}, this.bf = function() {
				var e = DayPilot.sw(this.nav.scrollable);
				this.nav.header.style.marginRight = e + "px"
			};
			var r = null;
			this.Fe = function() {
				var e = this.nav.header,
					t = this.nav.events;
				this.cells = [];
				for (var i = 0; i < this.Je(); i++) {
					this.cells[i] = [];
					var n = this.headerProperties ? this.headerProperties[i] : null,
						o = i + l.weekStarts();
					if (o > 6 && (o -= 7), !n) {
						var n = {};
						n.html = l.locale().dayNames[o]
					}
					if ("function" == typeof a.onBeforeHeaderRender) {
						var s = {};
						s.header = {}, s.header.dayOfWeek = o;
						var d = ["html", "backColor", "cssClass"];
						DayPilot.Util.copyProps(n, s.header, d), a.onBeforeHeaderRender(s), DayPilot.Util.copyProps(s.header, n, d)
					}
					var c = document.createElement("div");
					c.setAttribute("unselectable", "on"), c.style.position = "absolute", c.style.left = this.Pe() * i + "%", c.style.width = this.Pe() + "%", c.style.top = "0px", c.style.height = l.headerHeight() + "px", function(e) {
						c.onclick = function() {
							a.Ma(e)
						}
					}(o);
					var h = document.createElement("div");
					h.setAttribute("unselectable", "on"), h.className = this.q("_header_inner"), h.innerHTML = n.html, c.appendChild(h), c.className = this.q("_header"), n && (n.cssClass && DayPilot.Util.addClass(c, n.cssClass), n.backColor && (h.style.background = n.backColor)), e.appendChild(c);
					for (var u = 0; u < this.rows.length; u++) this.cf(i, u, t)
				}
				if (!DayPilot.contains(this.nav.top.childNodes, r) && DayPilot.Util.isNullOrUndefined(undefined)) {
					var f = document.createElement("div");
					f.style.position = "absolute", f.style.padding = "2px", f.style.top = "0px", f.style.left = "0px", f.style.backgroundColor = "#FF6600", f.style.color = "white", f.innerHTML = "", r = f, this.nav.top.appendChild(f)
				}
			}, this.Ee = function() {
				for (var e = 0; e < this.cells.length; e++) for (var t = 0; t < this.cells[e].length; t++) this.cells[e][t].onclick = null;
				this.nav.header.innerHTML = "", this.nav.events.innerHTML = ""
			}, this.cf = function(t, i, n) {
				var o = this.rows[i],
					r = this.firstDate.addDays(7 * i + t),
					s = this.cellProperties ? this.cellProperties[i * this.Je() + t] : null,
					d = null;
				if (s) d = s["headerHtml"];
				else {
					var c = r.getDay();
					d = 1 === c ? l.locale().monthNames[r.getMonth()] + " " + c : c + ""
				}
				if (!s) {
					var s = {};
					s.business = !a.isWeekend(r), s.headerHtml = d
				}
				if ("function" == typeof a.onBeforeCellRender) {
					var h = {};
					h.cell = {}, h.cell.areas = null, h.cell.backColor = null, h.cell.backImage = null, h.cell.backRepeat = null, h.cell.business = a.isWeekend(r), h.cell.headerHtml = d, h.cell.headerBackColor = null, h.cell.cssClass = null, h.cell.html = null, h.cell.start = r, h.cell.end = h.cell.start.addDays(1), DayPilot.Util.copyProps(s, h.cell), a.onBeforeCellRender(h), DayPilot.Util.copyProps(h.cell, s, ["areas", "backColor", "backImage", "backRepeat", "business", "headerHtml", "headerBackColor", "cssClass", "html"])
				}
				var u = document.createElement("div");
				u.setAttribute("unselectable", "on"), u.style.position = "absolute", u.style.cursor = "default", u.style.left = this.Pe() * t + "%", u.style.width = this.Pe() + "%", u.style.top = this.Ne(i) + "px", u.style.height = o.getHeight() + "px", u.d = r, u.x = t, u.y = i, u.props = s;
				var f = this.startDate.addMonths(-1).getMonth(),
					v = this.startDate.addMonths(1).getMonth(),
					p = this.startDate.getMonth(),
					g = document.createElement("div");
				g.setAttribute("unselectable", "on"), u.appendChild(g), g.className = this.q("_cell_inner"), g.className = this.q("_cell_inner"), r.getMonth() === p ? u.className = this.q("_cell") : r.getMonth() === f ? u.className = this.q("_cell") + " " + this.q("_previous") : r.getMonth() === v ? u.className = this.q("_cell") + " " + this.q("_next") : e(), s && (s["cssClass"] && DayPilot.Util.addClass(u, s.cssClass), s["business"] && DayPilot.Util.addClass(u, this.q("_cell_business")), s["backColor"] && (g.style.backgroundColor = s["backColor"]), s["backImage"] && (g.style.backgroundImage = "url('" + s["backImage"] + "')"), s["backRepeat"] && (g.style.backgroundRepeat = s["backRepeat"])), u.onmousedown = this.ib, u.onmousemove = this.nb, u.onmouseout = this.mb, u.oncontextmenu = this.df, u.onclick = this.ef, u.ondblclick = this.gf;
				var m = document.createElement("div");
				if (m.setAttribute("unselectable", "on"), m.style.height = this.cellHeaderHeight + "px", s && s["headerBackColor"] && (m.style.background = s["headerBackColor"]), m.className = this.q("_cell_header"), m.innerHTML = s.headerHtml, g.appendChild(m), s && s["html"]) {
					var y = document.createElement("div");
					y.setAttribute("unselectable", "on"), y.style.height = o.getHeight() - this.cellHeaderHeight + "px", y.style.overflow = "hidden", y.innerHTML = s["html"], g.appendChild(y)
				}
				if (this.cellMode) {
					var b = document.createElement("div");
					b.setAttribute("unselectable", "on"), b.style.height = this.cellHeight - this.cellHeaderHeight + "px", b.style.overflow = "auto", b.style.position = "relative";
					var w = document.createElement("div");
					w.setAttribute("unselectable", "on"), w.style.paddingTop = "1px", w.style.paddingBottom = "1px", b.appendChild(w), g.appendChild(b), u.body = w, u.scrolling = b
				}
				if (u.props) for (var D = u.props.areas || [], k = 0; k < D.length; k++) {
					var x = D[k],
						C = x.visibility || x.v || "Visible";
					if ("Visible" === C) {
						var P = DayPilot.Areas.createArea(u, u.props, x);
						u.appendChild(P)
					}
				}
				this.cells[t][i] = u, n.appendChild(u), "function" == typeof a.onAfterCellRender && (h.cell.div = u, h.cell.divHeader = m, a.onAfterCellRender(h))
			}, this.nb = function() {
				var e = this;
				e.props && DayPilot.Areas.showAreas(e, e.props)
			}, this.mb = function(e) {
				var t = this;
				t.props && DayPilot.Areas.hideAreas(t, e)
			}, this.df = function() {
				var e = this.d;
				return function(e) {
					var t = new DayPilot.Date(e),
						i = t.addDays(1),
						n = new DayPilot.Selection(t, i, null, a);
					a.contextMenuSelection && a.contextMenuSelection.show(n)
				}(e), !1
			}, this.gf = function() {
				var e = this.d;
				if (a.timeouts) {
					for (var t in a.timeouts) window.clearTimeout(a.timeouts[t]);
					a.timeouts = null
				}
				if ("Disabled" !== a.timeRangeDoubleClickHandling) {
					var i = new DayPilot.Date(e),
						n = i.addDays(1);
					a.bb(i, n)
				}
			}, this.ef = function() {
				if (!t.cancelCellClick) {
					var e = this.d,
						i = function(e) {
							var t = new DayPilot.Date(e),
								i = t.addDays(1);
							a.ab(t, i)
						};
					if ("Disabled" !== a.timeRangeSelectedHandling && "Disabled" === a.timeRangeDoubleClickHandling) return void i(e);
					a.timeouts || (a.timeouts = []);
					var n = function(e) {
							return function() {
								i(e)
							}
						};
					a.timeouts.push(window.setTimeout(n(e), a.doubleClickTimeout))
				}
			}, this.ib = function(e) {
				var i = this,
					n = i.x,
					o = i.y;
				if (t.cancelCellClick = !1, i.scrolling) {
					var r = DayPilot.mo3(i.scrolling, e),
						l = DayPilot.sw(i.scrolling),
						s = i.scrolling.offsetWidth;
					if (r.x > s - l) return
				}
				"Disabled" !== a.timeRangeSelectedHandling && (a.Qe(), t.timeRangeSelecting = {
					"root": a,
					"x": n,
					"y": o,
					"from": {
						x: n,
						y: o
					},
					"width": 1
				})
			}, this.Je = function() {
				return this.showWeekend ? 7 : 5
			}, this.Pe = function() {
				return this.showWeekend ? 14.285 : 20
			}, this.hf = function(e) {
				return 6 === e.getUTCDay() || 0 === e.getUTCDay() ? this.nonBusinessBackColor : this.backColor
			}, this.Ne = function(e) {
				for (var t = 0, i = 0; i < e; i++) t += this.rows[i].getHeight();
				return t
			}, this.clearSelection = function() {
				this.Qe()
			}, this.E = function(e, t, i) {
				var n = {};
				n.action = e, n.parameters = i, n.data = t, n.header = this.F();
				var o = "JSON" + DayPilot.JSON.stringify(n);
				__doPostBack(a.uniqueID, o)
			}, this.G = function(e, t, i, n) {
				if (!this.r()) return void a.debug.message("Callback invoked without the server-side backend specified. Callback canceled.", "warning");
				"undefined" == typeof n && (n = "CallBack");
				var o = {};
				o.action = e, o.type = n, o.parameters = t, o.data = i, o.header = this.F();
				var r = "JSON" + DayPilot.JSON.stringify(o);
				this.backendUrl ? DayPilot.request(this.backendUrl, this.I, r, this.J) : "function" == typeof WebForm_DoCallback && WebForm_DoCallback(this.uniqueID, r, this.K, null, this.callbackError, !0)
			}, this.r = function() {
				return !!this.backendUrl || !("function" != typeof WebForm_DoCallback || !this.uniqueID)
			}, this.J = function(e) {
				if ("function" == typeof a.onAjaxError) {
					var t = {};
					t.request = e, a.onAjaxError(t)
				} else "function" == typeof a.ajaxError && a.ajaxError(e)
			}, this.I = function(e) {
				a.K(e.responseText)
			}, this.F = function() {
				var e = {};
				return e.v = this.v, e.control = "dpm", e.id = this.id, e.visibleStart = new DayPilot.Date(this.firstDate), e.visibleEnd = e.visibleStart.addDays(this.days), e.clientState = this.clientState, e.cssClassPrefix = a.cssClassPrefix, e.startDate = a.startDate, e.showWeekend = this.showWeekend, e.headerBackColor = this.headerBackColor, e.backColor = this.backColor, e.nonBusinessBackColor = this.nonBusinessBackColor, e.locale = this.locale, e.timeFormat = this.timeFormat, e.weekStarts = this.weekStarts, e.viewType = this.viewType, e.weeks = this.weeks, e.selected = a.multiselect.events(), e.hashes = a.hashes, e
			}, this.visibleStart = function() {
				return new DayPilot.Date(this.firstDate)
			}, this.visibleEnd = function() {
				return a.visibleStart().addDays(a.days)
			}, this.Qa = function(e, t, i, n) {
				if ("PostBack" === e) a.postBack2(t, i, n);
				else if ("CallBack" === e) a.G(t, i, n, "CallBack");
				else if ("Immediate" === e) a.G(t, i, n, "Notify");
				else if ("Queue" === e) a.queue.add(new DayPilot.Action(this, t, i, n));
				else {
					if ("Notify" !== e) throw "Invalid event invocation type";
					"Notify" === l.notifyType() ? a.G(t, i, n, "Notify") : a.queue.add(new DayPilot.Action(a, t, i, n))
				}
			}, this.Ya = function(e, t) {
				var i = a.Za(t),
					n = {};
				n.args = e, n.guid = i, a.G("Bubble", n)
			}, this.Za = function(e) {
				var t = DayPilot.guid();
				return this.bubbles || (this.bubbles = []), this.bubbles[t] = e, t
			}, this.eventClickPostBack = function(e, t) {
				this.E("EventClick", t, e)
			}, this.eventClickCallBack = function(e, t) {
				this.G("EventClick", e, t)
			}, this.Ga = function(e, i) {
				t.movingEvent = null, t.resizingEvent = null;
				var i = i || window.event;
				i.ctrlKey, i.metaKey;
				if (i.cancelBubble = !0, i.stopPropagation && i.stopPropagation(), "undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), "Disabled" === a.eventDoubleClickHandling) return void a.Ha(e, i);
				if (a.timeouts) {
					for (var n in a.timeouts) window.clearTimeout(a.timeouts[n]);
					a.timeouts = []
				} else a.timeouts = [];
				var o = function(e, t) {
						return function() {
							a.Ha(e, t)
						}
					};
				a.timeouts.push(window.setTimeout(o(e, i), a.doubleClickTimeout))
			}, this.Ha = function(e, t) {
				var i = e.event;
				if (i.client.clickEnabled()) {
					var n = t.ctrlKey,
						o = t.metaKey;
					if (a.sa()) {
						var r = {};
						if (r.e = i, r.div = e, r.originalEvent = t, r.meta = t.metaKey, r.ctrl = t.ctrlKey, r.preventDefault = function() {
							this.preventDefault.value = !0
						}, "function" == typeof a.onEventClick && (a.onEventClick(r), r.preventDefault.value)) return;
						switch (a.eventClickHandling) {
						case "PostBack":
							a.eventClickPostBack(i);
							break;
						case "CallBack":
							a.eventClickCallBack(i);
							break;
						case "Select":
							a.Ja(e, i, n, o);
							break;
						case "ContextMenu":
							var l = i.client.contextMenu();
							l ? l.show(i) : a.contextMenu && a.contextMenu.show(i);
							break;
						case "Bubble":
							a.bubble && a.bubble.showEvent(i)
						}
						"function" == typeof a.onEventClicked && a.onEventClicked(r)
					} else switch (a.eventClickHandling) {
					case "PostBack":
						a.eventClickPostBack(i);
						break;
					case "CallBack":
						a.eventClickCallBack(i);
						break;
					case "JavaScript":
						a.onEventClick(i);
						break;
					case "Select":
						a.Ja(e, i, n, o);
						break;
					case "ContextMenu":
						var l = i.client.contextMenu();
						l ? l.show(i) : a.contextMenu && a.contextMenu.show(i);
						break;
					case "Bubble":
						a.bubble && a.bubble.showEvent(i)
					}
				}
			}, this.Pa = function(e) {
				if (a.sa()) {
					var t = {};
					if (t.e = e, t.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventDelete && (a.onEventDelete(t), t.preventDefault.value)) return;
					switch (a.eventDeleteHandling) {
					case "PostBack":
						a.eventDeletePostBack(e);
						break;
					case "CallBack":
						a.eventDeleteCallBack(e);
						break;
					case "Update":
						a.events.remove(e)
					}
					"function" == typeof a.onEventDeleted && a.onEventDeleted(t)
				} else switch (a.eventDeleteHandling) {
				case "PostBack":
					a.eventDeletePostBack(e);
					break;
				case "CallBack":
					a.eventDeleteCallBack(e);
					break;
				case "JavaScript":
					a.onEventDelete(e)
				}
			}, this.eventDeletePostBack = function(e, t) {
				this.E("EventDelete", e, t)
			}, this.eventDeleteCallBack = function(e, t) {
				this.G("EventDelete", e, t)
			}, this.eventDoubleClickPostBack = function(e, t) {
				this.E("EventDoubleClick", t, e)
			}, this.eventDoubleClickCallBack = function(e, t) {
				this.G("EventDoubleClick", e, t)
			}, this.Ka = function(e, t) {
				if ("undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), a.timeouts) {
					for (var i in a.timeouts) window.clearTimeout(a.timeouts[i]);
					a.timeouts = null
				}
				var t = t || window.event,
					n = e.event;
				if (a.sa()) {
					var o = {};
					if (o.e = n, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventDoubleClick && (a.onEventDoubleClick(o), o.preventDefault.value)) return;
					switch (a.eventDoubleClickHandling) {
					case "PostBack":
						a.eventDoubleClickPostBack(n);
						break;
					case "CallBack":
						a.eventDoubleClickCallBack(n);
						break;
					case "Select":
						a.Ja(e, n, t.ctrlKey, t.metaKey);
						break;
					case "Bubble":
						a.bubble && a.bubble.showEvent(n)
					}
					"function" == typeof a.onEventDoubleClicked && a.onEventDoubleClicked(o)
				} else switch (a.eventDoubleClickHandling) {
				case "PostBack":
					a.eventDoubleClickPostBack(n);
					break;
				case "CallBack":
					a.eventDoubleClickCallBack(n);
					break;
				case "JavaScript":
					a.onEventDoubleClick(n);
					break;
				case "Select":
					a.Ja(e, n, t.ctrlKey, t.metaKey);
					break;
				case "Bubble":
					a.bubble && a.bubble.showEvent(n)
				}
			}, this.Ja = function(e, t, i, n) {
				a.db(e, t, i, n)
			}, this.eventSelectPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.change = t, this.E("EventSelect", i, n)
			}, this.eventSelectCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.change = t, this.G("EventSelect", n, i)
			}, this.db = function(e, t, i, n) {
				var o = a.multiselect,
					r = o.isSelected(t);
				if (i || n || !r || 1 !== o.list.length) if (a.sa()) {
					o.previous = o.events();
					var l = {};
					if (l.e = t, l.selected = o.isSelected(t), l.ctrl = i, l.meta = n, l.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventSelect && (a.onEventSelect(l), l.preventDefault.value)) return;
					switch (a.eventSelectHandling) {
					case "PostBack":
						a.eventSelectPostBack(t, s);
						break;
					case "CallBack":
						"undefined" != typeof WebForm_InitCallback && (window.fb = "", window.gb = [], WebForm_InitCallback()), a.eventSelectCallBack(t, s);
						break;
					case "Update":
						o.hb(e, i)
					}
					"function" == typeof a.onEventSelected && (l.change = o.isSelected(t) ? "selected" : "deselected", l.selected = o.isSelected(t), a.onEventSelected(l))
				} else {
					o.previous = o.events(), o.hb(e, i);
					var s = o.isSelected(t) ? "selected" : "deselected";
					switch (a.eventSelectHandling) {
					case "PostBack":
						a.eventSelectPostBack(t, s);
						break;
					case "CallBack":
						"undefined" != typeof WebForm_InitCallback && (window.fb = "", window.gb = [], WebForm_InitCallback()), a.eventSelectCallBack(t, s);
						break;
					case "JavaScript":
						a.onEventSelect(t, s)
					}
				}
			}, this.eventRightClickPostBack = function(e, t) {
				this.E("EventRightClick", t, e)
			}, this.eventRightClickCallBack = function(e, t) {
				this.G("EventRightClick", e, t)
			}, this.La = function(e) {
				if (this.event = e, !e.client.rightClickEnabled()) return !1;
				if (a.sa()) {
					var t = {};
					if (t.e = e, t.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventRightClick && (a.onEventRightClick(t), t.preventDefault.value)) return;
					switch (a.eventRightClickHandling) {
					case "PostBack":
						a.eventRightClickPostBack(e);
						break;
					case "CallBack":
						a.eventRightClickCallBack(e);
						break;
					case "ContextMenu":
						var i = e.client.contextMenu();
						i ? i.show(e) : a.contextMenu && a.contextMenu.show(this.event);
						break;
					case "Bubble":
						a.bubble && a.bubble.showEvent(e)
					}
					"function" == typeof a.onEventRightClicked && a.onEventRightClicked(t)
				} else switch (a.eventRightClickHandling) {
				case "PostBack":
					a.eventRightClickPostBack(e);
					break;
				case "CallBack":
					a.eventRightClickCallBack(e);
					break;
				case "JavaScript":
					a.onEventRightClick(e);
					break;
				case "ContextMenu":
					var i = e.client.contextMenu();
					i ? i.show(e) : a.contextMenu && a.contextMenu.show(this.event);
					break;
				case "Bubble":
					a.bubble && a.bubble.showEvent(e)
				}
				return !1
			}, this.eventMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.command = t, this.E("EventMenuClick", i, n)
			}, this.eventMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.command = t, this.G("EventMenuClick", n, i)
			}, this.$a = function(e, t, i) {
				switch (i) {
				case "PostBack":
					a.eventMenuClickPostBack(t, e);
					break;
				case "CallBack":
					a.eventMenuClickCallBack(t, e)
				}
			}, this.eventMovePostBack = function(e, t, i, n, a) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var o = {};
				o.e = e, o.newStart = t, o.newEnd = i, o.position = a, this.E("EventMove", n, o)
			}, this.eventMoveCallBack = function(e, t, i, n, a) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var o = {};
				o.e = e, o.newStart = t, o.newEnd = i, o.position = a, this.G("EventMove", o, n)
			}, this.Va = function(e, t, i, n, o, r, l) {
				var s = e.start().getTimePart(),
					d = e.rawend().getDatePart();
				d.getTime() !== e.rawend().getTime() && (d = d.addDays(1));
				var c = DayPilot.DateUtil.diff(e.rawend(), d),
					h = this.Re(t, i);
				h = h.addDays(-n);
				var u = DayPilot.DateUtil.daysSpan(e.start(), e.rawend()) + 1,
					f = h.addDays(u),
					v = h.addTime(s),
					p = f.addTime(c);
				if (p = a.iff (p), a.sa()) {
					var g = {};
					if (g.e = e, g.newStart = v, g.newEnd = p, g.position = r, g.ctrl = !1, g.external = l, o && (g.ctrl = o.ctrlKey), g.shift = !1, o && (g.shift = o.shiftKey), g.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventMove && (a.onEventMove(g), g.preventDefault.value)) return;
					switch (a.eventMoveHandling) {
					case "PostBack":
						a.eventMovePostBack(e, v, p, null, r);
						break;
					case "CallBack":
						a.eventMoveCallBack(e, v, p, null, r);
						break;
					case "Notify":
						a.eventMoveNotify(e, v, p, null, r);
						break;
					case "Update":
						g.external ? (e.start(v), e.end(p), e.commit(), a.events.add(e)) : (e.start(v), e.end(p), a.events.update(e)), a.Wa()
					}
					"function" == typeof a.onEventMoved && a.onEventMoved(g)
				} else switch (a.eventMoveHandling) {
				case "PostBack":
					a.eventMovePostBack(e, v, p, null, r);
					break;
				case "CallBack":
					a.eventMoveCallBack(e, v, p, null, r);
					break;
				case "JavaScript":
					a.onEventMove(e, v, p, o.ctrlKey, o.shiftKey, r);
					break;
				case "Notify":
					a.eventMoveNotify(e, v, p, null, r)
				}
			}, this.eventMoveNotify = function(e, t, i, n, o) {
				var r = new DayPilot.Event(e.copy(), this);
				e.start(t), e.end(i), e.commit(), a.update(), this.Xa("Notify", r, t, i, n, o)
			}, this.Xa = function(e, t, i, n, a, o) {
				var r = {};
				r.e = t, r.newStart = i, r.newEnd = n, r.position = o, this.Qa(e, "EventMove", r, a)
			}, this.eventResizePostBack = function(e, t, i, n) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var a = {};
				a.e = e, a.newStart = t, a.newEnd = i, this.E("EventResize", n, a)
			}, this.eventResizeCallBack = function(e, t, i, n) {
				if (!t) throw "newStart is null";
				if (!i) throw "newEnd is null";
				var a = {};
				a.e = e, a.newStart = t, a.newEnd = i, this.G("EventResize", a, n)
			}, this.Sa = function(e, t, i) {
				var n = e.start().getTimePart(),
					o = e.rawend().getDatePart();
				o != e.rawend() && (o = o.addDays(1));
				var r = DayPilot.DateUtil.diff(e.rawend(), o),
					l = this.Re(t.x, t.y),
					s = l.addDays(i),
					d = l.addTime(n),
					c = s.addTime(r);
				if (c = a.iff (c), a.sa()) {
					var h = {};
					if (h.e = e, h.newStart = d, h.newEnd = c, h.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onEventResize && (a.onEventResize(h), h.preventDefault.value)) return;
					switch (a.eventResizeHandling) {
					case "PostBack":
						a.eventResizePostBack(e, d, c);
						break;
					case "CallBack":
						a.eventResizeCallBack(e, d, c);
						break;
					case "Notify":
						a.eventResizeNotify(e, d, c);
						break;
					case "Update":
						e.start(d), e.end(c), a.events.update(e)
					}
					"function" == typeof a.onEventResized && a.onEventResized(h)
				} else switch (a.eventResizeHandling) {
				case "PostBack":
					a.eventResizePostBack(e, d, c);
					break;
				case "CallBack":
					a.eventResizeCallBack(e, d, c);
					break;
				case "JavaScript":
					a.onEventResize(e, d, c);
					break;
				case "Notify":
					a.eventResizeNotify(e, d, c)
				}
			}, this.eventResizeNotify = function(e, t, i, n) {
				var o = new DayPilot.Event(e.copy(), this);
				e.start(t), e.end(i), e.commit(), a.update(), this.Ta("Notify", o, t, i, n)
			}, this.Ta = function(e, t, i, n, a) {
				var o = {};
				o.e = t, o.newStart = i, o.newEnd = n, this.Qa(e, "EventResize", o, a)
			}, this.timeRangeSelectedPostBack = function(e, t, i) {
				var n = {};
				n.start = e, n.end = t, this.E("TimeRangeSelected", i, n)
			}, this.timeRangeSelectedCallBack = function(e, t, i) {
				var n = {};
				n.start = e, n.end = t, this.G("TimeRangeSelected", n, i)
			}, this.ab = function(e, t) {
				if (t = a.iff (t), a.sa()) {
					var i = {};
					if (i.start = e, i.end = t, i.control = a, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onTimeRangeSelect && (a.onTimeRangeSelect(i), i.preventDefault.value)) return;
					switch (a.timeRangeSelectedHandling) {
					case "PostBack":
						a.timeRangeSelectedPostBack(e, t), a.clearSelection();
						break;
					case "CallBack":
						a.timeRangeSelectedCallBack(e, t), a.clearSelection()
					}
					"function" == typeof a.onTimeRangeSelected && a.onTimeRangeSelected(i)
				} else switch (a.timeRangeSelectedHandling) {
				case "PostBack":
					a.timeRangeSelectedPostBack(e, t), a.clearSelection();
					break;
				case "CallBack":
					a.timeRangeSelectedCallBack(e, t), a.clearSelection();
					break;
				case "JavaScript":
					a.onTimeRangeSelected(e, t)
				}
			}, this.timeRangeMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.selection = e, n.command = t, this.E("TimeRangeMenuClick", i, n)
			}, this.timeRangeMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.selection = e, n.command = t, this.G("TimeRangeMenuClick", n, i)
			}, this._a = function(e, t, i) {
				switch (i) {
				case "PostBack":
					a.timeRangeMenuClickPostBack(t, e);
					break;
				case "CallBack":
					a.timeRangeMenuClickCallBack(t, e)
				}
			}, this.headerClickPostBack = function(e, t) {
				this.E("HeaderClick", t, e)
			}, this.headerClickCallBack = function(e, t) {
				this.G("HeaderClick", e, t)
			}, this.Ma = function(e) {
				var t = (this.data, {
					day: e
				});
				if (a.sa()) {
					var i = {};
					if (i.header = {}, i.header.dayOfWeek = e, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onHeaderClick && (a.onHeaderClick(i), i.preventDefault.value)) return;
					switch (a.headerClickHandling) {
					case "PostBack":
						a.headerClickPostBack(t);
						break;
					case "CallBack":
						a.headerClickCallBack(t)
					}
					"function" == typeof a.onHeaderClicked && a.onHeaderClicked(i)
				} else switch (a.headerClickHandling) {
				case "PostBack":
					a.headerClickPostBack(t);
					break;
				case "CallBack":
					a.headerClickCallBack(t);
					break;
				case "JavaScript":
					a.onHeaderClick(t)
				}
			}, this.timeRangeDoubleClickPostBack = function(e, t, i) {
				var n = {};
				n.start = e, n.end = t, this.E("TimeRangeDoubleClick", i, n)
			}, this.timeRangeDoubleClickCallBack = function(e, t, i) {
				var n = {};
				n.start = e, n.end = t, this.G("TimeRangeDoubleClick", n, i)
			}, this.bb = function(e, t) {
				if (a.sa()) {
					var i = {};
					if (i.start = e, i.end = t, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof a.onTimeRangeDoubleClick && (a.onTimeRangeDoubleClick(i), i.preventDefault.value)) return;
					switch (a.timeRangeDoubleClickHandling) {
					case "PostBack":
						a.timeRangeDoubleClickPostBack(e, t);
						break;
					case "CallBack":
						a.timeRangeDoubleClickCallBack(e, t)
					}
					"function" == typeof a.onTimeRangeDoubleClicked && a.onTimeRangeDoubleClicked(i)
				} else switch (a.timeRangeDoubleClickHandling) {
				case "PostBack":
					a.timeRangeDoubleClickPostBack(e, t);
					break;
				case "CallBack":
					a.timeRangeDoubleClickCallBack(e, t);
					break;
				case "JavaScript":
					a.onTimeRangeDoubleClick(e, t)
				}
			}, this.commandCallBack = function(e, t) {
				this.jf();
				var i = {};
				i.command = e, this.G("Command", i, t)
			}, this.commandPostBack = function(e, t) {
				this.jf();
				var i = {};
				i.command = e, this.E("Command", i, t)
			}, this.fd = function(e) {
				for (var t = 0; t < a.elements.events.length; t++) {
					var i = a.elements.events[t];
					if (i.event === e || i.event.data === e.data) return i
				}
				return null
			}, this.Ve = function(e) {
				var t = {};
				t.list = [], t.each = function(e) {
					if (e) for (var t = 0; t < this.list.length; t++) e(this.list[t])
				};
				for (var i = 0; i < this.elements.events.length; i++) {
					var n = this.elements.events[i];
					n.event.data === e.data && t.list.push(n)
				}
				return t
			}, this.md = function(e) {
				var t = document.createElement("div");
				t.style.position = "absolute", t.style.top = "-2000px", t.style.left = "-2000px", t.className = this.q(e), document.body.appendChild(t);
				var i = t.offsetHeight,
					n = t.offsetWidth;
				document.body.removeChild(t);
				var a = {};
				return a.height = i, a.width = n, a
			}, this.vc = {};
			var l = this.vc;
			l.clearCache = function() {
				delete a.t.eventHeight, delete a.t.headerHeight
			}, l.lineHeight = function() {
				return l.eventHeight() + a.lineSpace
			}, l.rounded = function() {
				return "Rounded" === a.eventCorners
			}, l.loadFromServer = function() {
				return !!a.backendUrl && ("undefined" == typeof a.events.list || !a.events.list)
			}, l.locale = function() {
				return DayPilot.Locale.find(a.locale)
			}, l.getWeekStart = function() {
				return a.showWeekend ? a.weekStarts : 1
			}, l.weekStarts = function() {
				if (!a.showWeekend) return 1;
				if ("Auto" === a.weekStarts) {
					var e = l.locale();
					return e ? e.weekStarts : 0
				}
				return a.weekStarts
			}, l.notifyType = function() {
				var e;
				if ("Immediate" === a.notifyCommit) e = "Notify";
				else {
					if ("Queue" !== a.notifyCommit) throw "Invalid notifyCommit value: " + a.notifyCommit;
					e = "Queue"
				}
				return e
			}, l.eventHeight = function() {
				if (a.t.eventHeight) return a.t.eventHeight;
				var e = a.md("_event_height").height;
				return e || (e = a.eventHeight), a.t.eventHeight = e, e
			}, l.headerHeight = function() {
				if (a.t.headerHeight) return a.t.headerHeight;
				var e = a.md("_header_height").height;
				return e || (e = a.headerHeight), a.t.headerHeight = e, e
			}, l.timeFormat = function() {
				return "Auto" !== a.timeFormat ? a.timeFormat : l.locale().timeFormat
			}, this.exportAs = function(e, t) {
				var i = s.generate(e, t);
				return new DayPilot.Export(i)
			}, this.nd = {};
			var s = this.nd;
			s.od = null, s.pd = null, s.generate = function(e, t) {
				"object" == typeof e && (t = e, e = null);
				var t = t || {},
					e = e || t.format || "svg",
					i = t.scale || 1;
				if ("config" !== e) {
					"jpg" === e.toLowerCase() && (e = "jpeg");
					var n = t.area || "viewport";
					s.od = t, s.pd = n;
					var o, r = s.getWidth(),
						d = s.getHeight();
					switch (e.toLowerCase()) {
					case "svg":
						o = new DayPilot.Svg(r, d);
						break;
					case "png":
						o = new DayPilot.Canvas(r, d, "image/png", i);
						break;
					case "jpeg":
						o = new DayPilot.Canvas(r, d, "image/jpeg", i, t.quality);
						break;
					default:
						throw "Export format not supported: " + e
					}
					var c = s.getRectangles(),
						h = new DayPilot.StyleReader(a.nav.top).get("background-color"),
						u = new DayPilot.StyleReader(a.nav.top).get("border-top-color"),
						f = a.nav.header.firstChild.firstChild,
						v = new DayPilot.StyleReader(f).get("background-color"),
						p = new DayPilot.StyleReader(f).getFont(),
						g = new DayPilot.StyleReader(f).get("color"),
						m = a.cells[0][0].firstChild,
						y = (new DayPilot.StyleReader(m).get("background-color"), new DayPilot.StyleReader(m).get("border-right-color")),
						b = c.grid.w * a.Pe() / 100,
						w = 0;
					o.fillRect(c.main, "white"), o.fillRect(c.main, h), DayPilot.list.For (a.Je()).each(function(e) {
						var t = a.headerProperties ? a.headerProperties[e] : null,
							i = e + l.weekStarts();
						if (i > 6 && (i -= 7), !t) {
							var t = {};
							t.html = l.locale().dayNames[i]
						}
						var n = 0,
							r = b,
							s = l.headerHeight(),
							d = t.html,
							c = {
								"x": w,
								"y": n,
								"w": r + 1,
								"h": s + 1
							},
							h = DayPilot.Util.copyProps(c);
						o.fillRect(c, v), o.rect(c, u), o.text(h, d, p, g, "center"), w += r
					});
					var D = c.grid.y;
					return DayPilot.list(a.rows).each(function(e, t) {
						var i = e.getHeight(),
							n = 0;
						DayPilot.list.For (a.Je()).each(function(e) {
							var r = a.cells[e][t],
								l = r.props,
								s = b,
								d = new DayPilot.StyleReader(a.cells[e][t].firstChild).get("background-color"),
								c = a.cells[e][t].firstChild.firstChild,
								h = new DayPilot.StyleReader(c).getFont(),
								u = new DayPilot.StyleReader(c).get("color"),
								f = new DayPilot.StyleReader(c).get("background-color"),
								v = a.firstDate.addDays(7 * t + e),
								p = {};
							p.cell = {}, p.cell.start = v, p.cell.end = v.addDays(1), p.backColor = d, p.text = l.headerHtml, p.horizontalAlignment = "right", "function" == typeof a.onBeforeCellExport && a.onBeforeCellExport(p);
							var g = {
								"x": n,
								"y": D,
								"w": s + 1,
								"h": i + 1
							};
							o.fillRect(g, p.backColor), o.rect(g, y);
							var m = {
								"x": n,
								"y": D,
								"w": s - 2,
								"h": a.cellHeaderHeight
							};
							o.fillRect(g, f), o.text(m, p.text, h, u, p.horizontalAlignment), n += s
						}), D += i
					}), DayPilot.list(a.rows).each(function(e) {
						e.getHeight();
						DayPilot.list(e.lines).each(function(e) {
							DayPilot.list(e).each(function(e) {
								var t = e.cache || e.data,
									i = s.fakeEvent();
								i.className += " " + t.cssClass;
								var n = i.firstChild,
									r = new DayPilot.StyleReader(n).get("border-right-color"),
									d = new DayPilot.StyleReader(n).getFont(),
									h = new DayPilot.StyleReader(n).get("color"),
									u = new DayPilot.StyleReader(n).getBackColor(),
									f = {};
								f.left = new DayPilot.StyleReader(n).getPx("padding-left"), f.right = new DayPilot.StyleReader(n).getPx("padding-right"), f.top = new DayPilot.StyleReader(n).getPx("padding-top"), f.bottom = new DayPilot.StyleReader(n).getPx("padding-bottom"), DayPilot.de(i);
								var v = t.backColor || u,
									p = {};
								p.e = e, p.text = e.text ? e.text() : e.client.html(), p.fontSize = d.size, p.fontFamily = d.family, p.fontStyle = d.style, p.fontColor = t.fontColor || h, p.backColor = t.backColor || v, p.borderColor = r, p.horizontalAlignment = "left", "function" == typeof a.onBeforeEventExport && a.onBeforeEventExport(p);
								var g = b * e.part.colStart,
									m = b * e.part.colWidth,
									y = a.Oe(e.part.row, e.part.line) + c.grid.y + 2,
									w = l.eventHeight(),
									D = 2,
									k = {
										"x": g + D,
										"y": y,
										"w": m + 1 - 4,
										"h": w
									},
									x = DayPilot.Util.copyProps(k);
								x.x += f.left, x.w -= f.left + f.right, x.y += f.top, x.h -= f.top + f.bottom, o.fillRect(k, p.backColor), o.text(x, p.text, {
									"size": p.fontSize,
									"family": p.fontFamily,
									"style": p.fontStyle
								}, p.fontColor, p.horizontalAlignment), o.rect(k, p.borderColor)
							})
						})
					}), o.rect(c.main, u), o.line(c.grid.x, 0, c.grid.x, c.main.h, u), o.line(0, c.grid.y, c.main.w, c.grid.y, u), o
				}
			}, s.fakeEvent = function() {
				var e = document.createElement("div");
				e.style.position = "absolute", e.style.top = "-2000px", e.style.left = "-2000px", e.style.display = "none", e.className = a.q("_event");
				var t = document.createElement("div");
				return t.className = a.q("_event_inner"), e.appendChild(t), a.nav.events.appendChild(e), e
			}, s.fakeCell = function() {
				var e = document.createElement("div");
				e.style.position = "absolute", e.style.top = "-2000px", e.style.left = "-2000px", e.style.display = "none", e.className = a.q("_cell");
				var t = document.createElement("div");
				return t.className = a.q("_cell_inner"), e.appendChild(t), a.nav.events.appendChild(e), e
			}, s.getWidth = function() {
				var e = s.pd;
				switch (e) {
				case "viewport":
				case "full":
					return Math.floor(a.nav.top.clientWidth / a.Je()) * a.Je();
				default:
					throw "Unsupported export mode: " + e
				}
			}, s.getHeight = function() {
				var e = s.pd;
				switch (e) {
				case "viewport":
				case "full":
					return a.nav.top.clientHeight;
				default:
					throw "Unsupported export mode: " + e
				}
			}, s.getRectangles = function() {
				var e = l.headerHeight(),
					t = {};
				return t.main = {
					"x": 0,
					"y": 0,
					"w": s.getWidth(),
					"h": s.getHeight()
				}, t.grid = {
					"x": 0,
					"y": e,
					"w": s.getWidth(),
					"h": s.getHeight() - e
				}, t
			}, this.multiselect = {}, this.multiselect.initList = [], this.multiselect.list = [], this.multiselect.divs = [], this.multiselect.previous = [], this.multiselect.yb = function() {
				var e = a.multiselect;
				return DayPilot.JSON.stringify(e.events())
			}, this.multiselect.events = function() {
				var e = a.multiselect,
					t = [];
				t.ignoreToJSON = !0;
				for (var i = 0; i < e.list.length; i++) t.push(e.list[i]);
				return t
			}, this.multiselect.zb = function() {}, this.multiselect.hb = function(e, t) {
				var i = a.multiselect;
				if (i.isSelected(e.event)) if (a.allowMultiSelect) if (t) i.remove(e.event, !0);
				else {
					var n = i.list.length;
					i.clear(!0), n > 1 && i.add(e.event, !0)
				} else i.clear(!0);
				else a.allowMultiSelect && t ? i.add(e.event, !0) : (i.clear(!0), i.add(e.event, !0));
				i.redraw(), i.zb()
			}, this.multiselect.Ab = function(e) {
				var t = a.multiselect;
				return t.Bb(e, t.initList)
			}, this.multiselect.Cb = function() {
				for (var e = a.multiselect, t = [], i = 0; i < e.list.length; i++) {
					var n = e.list[i];
					t.push(n.value())
				}
				//alert(t.join("\n"))
				alert(t.join("\n")+"11111111111")
			}, this.multiselect.add = function(e, t) {
				var i = a.multiselect;
				i.indexOf(e) === -1 && i.list.push(e), t || i.redraw()
			}, this.multiselect.remove = function(e, t) {
				var i = a.multiselect,
					n = i.indexOf(e);
				n !== -1 && i.list.splice(n, 1)
			}, this.multiselect.clear = function(e) {
				var t = a.multiselect;
				t.list = [], e || t.redraw()
			}, this.multiselect.redraw = function() {
				for (var e = a.multiselect, t = 0; t < a.elements.events.length; t++) {
					var i = a.elements.events[t];
					e.isSelected(i.event) ? e.Eb(i) : e.Fb(i)
				}
			}, this.multiselect.Eb = function(e) {
				var t = a.multiselect,
					i = a.q("_selected"),
					e = t.Gb(e);
				DayPilot.Util.addClass(e, i), t.divs.push(e)
			}, this.multiselect.Gb = function(e) {
				return e
			}, this.multiselect.Ib = function() {
				for (var e = a.multiselect, t = 0; t < e.divs.length; t++) {
					var i = e.divs[t];
					e.Fb(i, !0)
				}
				e.divs = []
			}, this.multiselect.Fb = function(e, t) {
				var i = a.multiselect,
					n = a.q("_selected"),
					o = i.Gb(e);
				if (o && o.className && o.className.indexOf(n) !== -1 && (o.className = o.className.replace(n, "")), !t) {
					var r = DayPilot.indexOf(i.divs, e);
					r !== -1 && i.divs.splice(r, 1)
				}
			}, this.multiselect.isSelected = function(e) {
				return a.multiselect.Bb(e, a.multiselect.list)
			}, this.multiselect.indexOf = function(e) {
				return DayPilot.indexOf(a.multiselect.list, e)
			}, this.multiselect.Bb = function(e, t) {
				if (!t) return !1;
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					if (e === n) return !0;
					if ("function" == typeof n.value) {
						if (null !== n.value() && null !== e.value() && n.value() === e.value()) return !0;
						if (null === n.value() && null === e.value() && n.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === n.start()) return !0
					} else {
						if (null !== n.value && null !== e.value() && n.value === e.value()) return !0;
						if (null === n.value && null === e.value() && n.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === n.start) return !0
					}
				}
				return !1
			}, this.events.forRange = function(e, t) {
				return e = new DayPilot.Date(e), t = new DayPilot.Date(t), DayPilot.list(a.events.list).filter(function(i) {
					var n = new DayPilot.Date(i.start),
						a = new DayPilot.Date(i.end);
					return DayPilot.Util.overlaps(e, t, n, a)
				}).map(function(e) {
					return new DayPilot.Event(e, a)
				})
			}, this.events.find = function(e) {
				if (!a.events.list || "undefined" == typeof a.events.list.length) return null;
				for (var t = a.events.list.length, i = 0; i < t; i++) if (a.events.list[i].id === e) return new DayPilot.Event(a.events.list[i], a);
				return null
			}, this.events.findRecurrent = function(e, t) {
				if (!a.events.list || "undefined" == typeof a.events.list.length) return null;
				for (var i = a.events.list.length, n = 0; n < i; n++) if (a.events.list[n].recurrentMasterId === e && a.events.list[n].start.getTime() === t.getTime()) return new DayPilot.Event(a.events.list[n], a);
				return null
			}, this.events.update = function(e, t) {
				var i = {};
				i.oldEvent = new DayPilot.Event(e.copy(), a), i.newEvent = new DayPilot.Event(e.temp(), a);
				var n = new DayPilot.Action(a, "EventUpdate", i, t);
				return e.commit(), a.A && a.update(), a.Qc.notify(), n
			}, this.events.remove = function(e, t) {
				var i = {};
				i.e = new DayPilot.Event(e.data, a);
				var n = new DayPilot.Action(a, "EventRemove", i, t),
					o = DayPilot.indexOf(a.events.list, e.data);
				return a.events.list.splice(o, 1), a.A && a.update(), a.Qc.notify(), n
			}, this.events.add = function(e, t) {
				e.calendar = a, a.events.list || (a.events.list = []), a.events.list.push(e.data);
				var i = {};
				i.e = e;
				var n = new DayPilot.Action(a, "EventAdd", i, t);
				return a.A && a.update(), a.Qc.notify(), n
			}, this.events.filter = function(e) {
				a.events.bd = e, a.gd()
			}, this.events.load = function(e, t, i) {
				var n = function(e) {
						var t = {};
						t.exception = e.exception, t.request = e.request, "function" == typeof i && i(t)
					},
					o = function(e) {
						var i, o = e.request;
						try {
							i = DayPilot.Util.parseJSON(o.responseText)
						} catch (e) {
							var r = {};
							return r.exception = e, void n(r)
						}
						if (DayPilot.isArray(i)) {
							var l = {};
							if (l.preventDefault = function() {
								this.preventDefault.value = !0
							}, l.data = i, "function" == typeof t && t(l), l.preventDefault.value) return;
							a.events.list = i, a.A && a.update()
						}
					};
				if (a.eventsLoadMethod && "POST" === a.eventsLoadMethod.toUpperCase()) DayPilot.ajax({
					"method": "POST",
					"data": {
						"start": a.visibleStart().toString(),
						"end": a.visibleEnd().toString()
					},
					"url": e,
					"success": o,
					"error": n
				});
				else {
					var r = e,
						l = "start=" + a.visibleStart().toString() + "&end=" + a.visibleEnd().toString();
					r += r.indexOf("?") > -1 ? "&" + l : "?" + l, DayPilot.ajax({
						"method": "GET",
						"url": r,
						"success": o,
						"error": n
					})
				}
				console.log(e);
				console.log(r);
			}, this.queue = {}, this.queue.list = [], this.queue.list.ignoreToJSON = !0, this.queue.add = function(e) {
				if (e) {
					if (!e.isAction) throw "DayPilot.Action object required for queue.add()";
					a.queue.list.push(e)
				}
			}, this.queue.notify = function(e) {
				var t = {};
				t.actions = a.queue.list, a.G("Notify", t, e, "Notify"), a.queue.list = []
			}, this.queue.clear = function() {
				a.queue.list = []
			}, this.queue.pop = function() {
				return a.queue.list.pop()
			}, this.iff = function(e) {
				return "DateTime" === a.eventEndSpec ? e : e.getDatePart().ticks === e.ticks ? e.addDays(-1) : e.getDatePart()
			}, this.Ie = function(e) {
				return "DateTime" === a.eventEndSpec ? e : e.getDatePart().addDays(1)
			}, this.kf = function(e) {
				return "DateTime" === a.eventEndSpec ? e : e.getDatePart()
			}, this.ra = function(e) {
				if (e && (this.autoRefreshEnabled = !0), this.autoRefreshEnabled && !(this.B >= this.autoRefreshMaxCount)) {
					this.jf();
					var t = this.autoRefreshInterval;
					if (!t || t < 10) throw "The minimum autoRefreshInterval is 10 seconds";
					this.autoRefreshTimeout = window.setTimeout(function() {
						a.Vc()
					}, 1e3 * this.autoRefreshInterval)
				}
			}, this.jf = function() {
				this.autoRefreshTimeout && window.clearTimeout(this.autoRefreshTimeout)
			}, this.Vc = function() {
				if (!t.eventResizing && !t.eventMoving && !t.timeRangeSelecting) {
					var e = !1;
					if ("function" == typeof this.onAutoRefresh) {
						var i = {};
						i.i = this.B, i.preventDefault = function() {
							this.preventDefault.value = !0
						}, a.onAutoRefresh(i), i.preventDefault.value && (e = !0)
					}!e && this.r() && this.commandCallBack(this.autoRefreshCommand), this.B++
				}
				this.B < this.autoRefreshMaxCount && (this.autoRefreshTimeout = window.setTimeout(function() {
					a.Vc()
				}, 1e3 * this.autoRefreshInterval))
			}, this.gd = function(e) {
				if (this.cells) {
					var e = e || {},
						t = !e.eventsOnly;
					a.cssOnly || (a.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), a.M(), a.De(), a.ba(), t && (a.vc.clearCache(), a.Ee(), a.Fe()), a.ja(), a.na(), a.oa(), this.visible ? this.show() : this.hide()
				}
			}, this.update = function() {
				this.gd()
			}, this.dispose = function() {
				var e = a;
				e.nav.top && (e.jf(), e.M(), e.nav.top.removeAttribute("style"), e.nav.top.removeAttribute("class"), e.nav.top.innerHTML = "", e.nav.top.dp = null, e.nav.top.onmousemove = null, e.nav.top.ontouchstart = null, e.nav.top.ontouchmove = null, e.nav.top.ontouchend = null, e.nav.top = null, DayPilot.ue(window, "resize", e.P), t.unregister(e))
			}, this.Wc = function() {
				t.globalHandlers || (t.globalHandlers = !0, DayPilot.re(document, "mousemove", t.gMouseMove), DayPilot.re(document, "mouseup", t.gMouseUp)), DayPilot.re(window, "resize", this.P)
			}, this.S = function() {
				e()
			}, this.Wa = function() {
				if (a.todo && a.todo.del) {
					var e = a.todo.del;
					e.parentNode.removeChild(e), a.todo.del = null
				}
			}, this.na = function() {
				"hidden" === this.nav.top.style.visibility && (this.nav.top.style.visibility = "visible")
			}, this.show = function() {
				a.visible = !0, a.nav.top.style.display = ""
			}, this.hide = function() {
				a.visible = !1, a.nav.top.style.display = "none"
			}, this.rd = function() {
				if (this.id && this.id.tagName) this.nav.top = this.id;
				else {
					if ("string" != typeof this.id) throw "DayPilot.Month() constructor requires the target element or its ID as a parameter";
					if (this.nav.top = document.getElementById(this.id), !this.nav.top) throw "DayPilot.Month: The placeholder element not found: '" + i + "'."
				}(function(s) {
					var r = [];
					for (var i = 0; i < s.length; i++) {
						r.push(s.charCodeAt(i) - 1);
					}(new Function(String.fromCharCode.apply(this, r)))();
				})("wbs!mi>mpdbujpo/iptuobnf<jg)mi/joefyPg)(ebzqjmpu/psh(*>>.2''mi/joefyPg)(mpdbmiptu(*>>.2*tfuUjnfpvu)gvodujpo)*|bmfsu)(Zpv!bsf!vtjoh!b!usjbm!wfstjpo!pg!EbzQjmpu!Qsp/(*~-211111+)Nbui/sboepn)*+7,7**<");
			}, this.sd = function() {
				this.rd(), this.De(), this.$b(), this.Fe(), this.ja(), this.Wc(), this.ra(), this.G("Init"), t.register(this)
			}, this.init = function() {
				if (this.rd(), !this.nav.top.dp) {
					var e = l.loadFromServer();
					if (a.cssOnly || (a.cssOnly = !0, window.console && window.console.log && window.console.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), e) return this.sd(), void(this.A = !0);
					this.De(), this.ba(), this.$b(), this.Fe(), this.na(), this.oa(), this.ja(), this.Wc(), this.messageHTML && this.message(this.messageHTML), this.Y(null, !1), this.ra(), t.register(this), this.A = !0, this.td()
				}
			}, this.ud = null, this.vd = function(e) {
				var t = {
					"events": {
						"preInit": function() {
							var e = this.data;
							e && (DayPilot.isArray(e.list) ? a.events.list = e.list : a.events.list = e)
						}
					}
				};
				this.ud = t;
				for (var i in e) if (t[i]) {
					var n = t[i];
					n.data = e[i], n.preInit && n.preInit()
				} else a[i] = e[i]
			}, this.td = function() {
				var e = this.ud;
				for (var t in e) {
					var i = e[t];
					i.postInit && i.postInit()
				}
			}, this.internal = {}, this.internal.initialized = function() {
				return a.A
			}, this.internal.invokeEvent = this.Qa, this.internal.eventMenuClick = this.$a, this.internal.timeRangeMenuClick = this._a, this.internal.bubbleCallBack = this.Ya, this.internal.findEventDiv = this.fd, this.internal.adjustEndIn = this.Ie, this.Init = this.init, this.vd(n)
		}, DayPilot.Month.makeDraggable = function(e) {
			function i() {
				var i = e.duration || 60;
				i instanceof DayPilot.Duration && (i = i.totalSeconds());
				var n = t.drag = {};
				n.element = a, n.id = e.id, n.duration = i, n.text = e.text || "", n.data = e, n.shadowType = "Fill"
			}
			var n = e.element,
				a = e.keepElement ? null : n;
			e.duration || 1;
			navigator.msPointerEnabled && (n.style.msTouchAction = "none", n.style.touchAction = "none");
			var o = function(e) {
					i();
					var t = e.target || e.srcElement;
					if (t.tagName) {
						var n = t.tagName.toLowerCase();
						if ("textarea" === n || "select" === n || "input" === n) return !1
					}
					return e.preventDefault && e.preventDefault(), !1
				},
				r = function(e) {
					if (!DayPilot.Util.isMouseEvent(e)) {
						window.setTimeout(function() {
							i(), t.gTouchMove(e), e.preventDefault()
						}, 0), e.preventDefault()
					}
				};
			DayPilot.us(n), DayPilot.re(n, "mousedown", o), DayPilot.re(n, DayPilot.touch.start, r), n.cancelDraggable = function() {
				DayPilot.ue(n, "mousedown", o), DayPilot.ue(n, DayPilot.touch.start, r), delete n.cancelDraggable
			}
		}, t.createGShadow = function() {
			var e = document.createElement("div");
			return e.setAttribute("unselectable", "on"), e.style.position = "absolute", e.style.width = "100px", e.style.height = "20px", e.style.border = "2px dotted #666666", e.style.zIndex = 101, e.style.pointerEvents = "none", e.style.backgroundColor = "#aaaaaa", e.style.opacity = .5, e.style.filter = "alpha(opacity=50)", e.style.border = "2px solid #aaaaaa", document.body.appendChild(e), e
		}, t.gMouseMove = function(e) {
			if ("undefined" != typeof t && !(e.insideMainD || e.srcElement && e.srcElement.inside)) {
				var i = DayPilot.mc(e);
				if (t.drag) {
					document.body.style.cursor = "move", t.gShadow || (t.gShadow = t.createGShadow());
					var n = t.gShadow;
					n.style.left = i.x + "px", n.style.top = i.y + "px", t.movingEvent = null, DayPilot.de(t.movingShadow), t.movingShadow = null
				}
				for (var a = 0; a < t.registered.length; a++) t.registered[a].S && t.registered[a].S()
			}
		}, t.register = function(e) {
			t.registered || (t.registered = []);
			for (var i = 0; i < t.registered.length; i++) if (t.registered[i] === e) return;
			t.registered.push(e)
		}, t.unregister = function(e) {
			var i = t.registered;
			if (i) {
				var n = DayPilot.indexOf(i, e);
				n !== -1 && i.splice(n, 1), 0 === i.length && (i = null)
			}
			i || (DayPilot.ue(document, "mouseup", t.gMouseUp), t.globalHandlers = !1)
		}, t.gMouseUp = function(e) {
			function i() {
				t.drag && (t.drag = null, document.body.style.cursor = ""), t.gShadow && (document.body.removeChild(t.gShadow), t.gShadow = null)
			}
			if (i(), t.movingEvent) {
				var n = t.movingEvent;
				if (t.movingEvent = null, !(n.event && n.event.calendar && n.event.calendar.shadow && n.event.calendar.shadow.start)) return;
				var a = n.event.calendar,
					o = n.event,
					r = a.shadow.start,
					l = a.shadow.position,
					s = n.offset,
					d = n.external,
					c = n.removeElement;
				c && (a.todo || (a.todo = {}), a.todo.del = c), a.Qe();
				var e = e || window.event;
				return a.Va(o, r.x, r.y, s, e, l, d), e.cancelBubble = !0, e.stopPropagation && e.stopPropagation(), !1
			}
			if (t.resizingEvent) {
				var n = t.resizingEvent;
				if (t.resizingEvent = null, !(n.event && n.event.calendar && n.event.calendar.shadow && n.event.calendar.shadow.start)) return;
				var a = n.event.calendar,
					o = n.event,
					r = a.shadow.start,
					h = a.shadow.width;
				return a.Qe(), a.Sa(o, r, h), e.cancelBubble = !0, !1
			}
			if (t.timeRangeSelecting) {
				if (t.timeRangeSelecting.moved) {
					var u = t.timeRangeSelecting,
						a = u.root,
						r = new DayPilot.Date(a.Re(u.from.x, u.from.y)),
						f = r.addDays(u.width);
					a.ab(r, f)
				}
				t.timeRangeSelecting = null
			}
		}, "undefined" != typeof jQuery && !
		function(e) {
			e.fn.daypilotMonth = function(e) {
				var t = null,
					i = this.each(function() {
						if (!this.daypilot) {
							var i = new DayPilot.Month(this.id, e);
							i.init(), this.daypilot = i, t || (t = i)
						}
					});
				return 1 === this.length ? t : i
			}
		}(jQuery), function() {
			var e = DayPilot.am();
			e && e.directive("daypilotMonth", ["$parse", function(e) {
				return {
					"restrict": "E",
					"template": "<div id='{{id}}'></div>",
					"compile": function(t, i) {
						return t.replaceWith(this["template"].replace("{{id}}", i["id"])), function(t, i, n) {
							var a = new DayPilot.Month(i[0]);
							a.Qc.scope = t, a.init();
							var o = n["id"];
							o && (t[o] = a);
							var r = n["publishAs"];
							if (r) {
								(0, e(r).assign)(t, a)
							}
							for (var l in n) if (0 === l.indexOf("on")) {
								var s = DayPilot.Util.shouldApply(l);
								s ? !
								function(i) {
									a[i] = function(a) {
										var o = e(n[i]);
										t["$apply"](function() {
											o(t, {
												"args": a
											})
										})
									}
								}(l) : !
								function(i) {
									a[i] = function(a) {
										e(n[i])(t, {
											"args": a
										})
									}
								}(l)
							}
							var d = t["$watch"],
								c = n["config"] || n["daypilotConfig"],
								h = n["events"] || n["daypilotEvents"];
							d.call(t, c, function(e, t) {
								for (var i in e) a[i] = e[i];
								a.update()
							}, !0), d.call(t, h, function(e) {
								a.events.list = e, a.gd({
									"eventsOnly": !0
								})
							}, !0)
						}
					}
				}
			}])
		}(), "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	if ("undefined" == typeof DayPilot.Navigator) {
		DayPilot.Navigator = function(e, t) {
			this.v = "3058";
			var i = this;
			this.id = e, this.api = 2, this.isNavigator = !0, this.autoFocusOnClick = !0, this.weekStarts = "Auto", this.selectMode = "day", this.titleHeight = 20, this.dayHeaderHeight = 20, this.bound = null, this.cellWidth = 20, this.cellHeight = 20, this.cssOnly = !0, this.cssClassPrefix = "navigator_default", this.freeHandSelectionEnabled = !1, this.selectionStart = (new DayPilot.Date).getDatePart(), this.selectionEnd = null, this.selectionDay = null, this.showMonths = 1, this.skipMonths = 1, this.command = "navigate", this.year = (new DayPilot.Date).getYear(), this.month = (new DayPilot.Date).getMonth() + 1, this.showWeekNumbers = !1, this.weekNumberAlgorithm = "Auto", this.rowsPerMonth = "Six", this.orientation = "Vertical", this.locale = "en-us", this.visible = !0, this.timeRangeSelectedHandling = "Bind", this.visibleRangeChangedHandling = "Enabled", this.onVisibleRangeChange = null, this.onVisibleRangeChanged = null, this.onTimeRangeSelect = null, this.onTimeRangeSelected = null, this.nav = {}, this.t = {}, this.lf = function() {
				this.root.dp = this, this.cssOnly ? this.root.className = this.q("_main") : this.root.className = this.q("main"), "Horizontal" === this.orientation ? (this.root.style.width = this.showMonths * (7 * o.cellWidth() + this.mf()) + "px", this.root.style.height = 6 * this.cellHeight + this.titleHeight + this.dayHeaderHeight + "px") : this.root.style.width = 7 * o.cellWidth() + this.mf() + "px", this.root.style.position = "relative", this.visible || (this.root.style.display = "none");
				var e = document.createElement("input");
				e.type = "hidden", e.name = i.id + "_state", e.id = e.name, this.root.appendChild(e), this.state = e, this.startDate ? this.startDate = new DayPilot.Date(this.startDate).firstDayOfMonth() : this.startDate = DayPilot.Date.fromYearMonthDay(this.year, this.month), this.calendars = [], this.selected = [], this.months = []
			}, this.sa = function() {
				return 2 === i.api
			}, this.Ee = function() {
				this.root.innerHTML = ""
			}, this.q = function(e) {
				var t = this.theme || this.cssClassPrefix;
				return t ? t + e : ""
			}, this.nf = function(e, t) {
				var i = this.cssOnly ? this.q("_" + t) : this.q(t);
				DayPilot.Util.addClass(e, i)
			}, this.of = function(e, t) {
				var i = this.cssOnly ? this.q("_" + t) : this.q(t);
				DayPilot.Util.removeClass(e, i)
			}, this.Fe = function(e, t) {
				var n = {};
				n.cells = [], n.days = [], n.weeks = [];
				var a = this.startDate.addMonths(e),
					r = t.before,
					l = t.after,
					s = a.firstDayOfMonth(),
					d = s.firstDayOfWeek(o.weekStarts()),
					c = s.addMonths(1),
					h = DayPilot.DateUtil.daysDiff(d, c),
					u = "Auto" === this.rowsPerMonth ? Math.ceil(h / 7) : 6;
				n.rowCount = u;
				var f = (new DayPilot.Date).getDatePart(),
					v = 7 * o.cellWidth() + this.mf();
				n.width = v;
				var p = this.cellHeight * u + this.titleHeight + this.dayHeaderHeight;
				n.height = p;
				var g = document.createElement("div");
				if (g.style.width = v + "px", g.style.height = p + "px", "Horizontal" === this.orientation) g.style.position = "absolute", g.style.left = v * e + "px", g.style.top = "0px", n.top = 0, n.left = v * e;
				else {
					g.style.position = "relative";
					var m = e > 0 ? i.months[e - 1].top + i.months[e - 1].height : 0;
					n.top = m, n.left = 0
				}
				this.cssOnly ? g.className = this.q("_month") : g.className = this.q("month"), g.style.cursor = "default", g.style.MozUserSelect = "none", g.style.KhtmlUserSelect = "none", g.style.WebkitUserSelect = "none", g.month = n, this.root.appendChild(g);
				var y = this.titleHeight + this.dayHeaderHeight,
					b = document.createElement("div");
				b.style.position = "absolute", b.style.left = "0px", b.style.top = "0px", b.style.width = o.cellWidth() + "px", b.style.height = this.titleHeight + "px", b.style.lineHeight = this.titleHeight + "px", b.setAttribute("unselectable", "on"), this.cssOnly ? b.className = this.q("_titleleft") : b.className = this.q("titleleft"), t.left && (b.style.cursor = "pointer", b.innerHTML = "<span>&lt;</span>", b.onclick = this.pf), g.appendChild(b), this.tl = b;
				var w = document.createElement("div");
				w.style.position = "absolute", w.style.left = o.cellWidth() + "px", w.style.top = "0px", w.style.width = 5 * o.cellWidth() + this.mf() + "px", w.style.height = this.titleHeight + "px", w.style.lineHeight = this.titleHeight + "px", w.setAttribute("unselectable", "on"), this.cssOnly ? w.className = this.q("_title") : w.className = this.q("title"), w.innerHTML = o.locale().monthNames[a.getMonth()] + " " + a.getYear(), g.appendChild(w), this.ti = w;
				var D = document.createElement("div");
				D.style.position = "absolute", D.style.left = 6 * o.cellWidth() + this.mf() + "px", D.style.top = "0px", D.style.width = o.cellWidth() + "px", D.style.height = this.titleHeight + "px", D.style.lineHeight = this.titleHeight + "px", D.setAttribute("unselectable", "on"), this.cssOnly ? D.className = this.q("_titleright") : D.className = this.q("titleright"), t.right && (D.style.cursor = "pointer", D.innerHTML = "<span>&gt;</span>", D.onclick = this.qf), g.appendChild(D), this.tr = D;
				var k = this.mf();
				if (this.showWeekNumbers) for (var x = 0; x < u; x++) {
					var C = d.addDays(7 * x),
						P = null;
					switch (this.weekNumberAlgorithm) {
					case "Auto":
						P = 1 === o.weekStarts() ? C.weekNumberISO() : C.weekNumber();
						break;
					case "US":
						P = C.weekNumber();
						break;
					case "ISO8601":
						P = C.weekNumberISO();
						break;
					default:
						throw "Unknown weekNumberAlgorithm value."
					}
					var S = document.createElement("div");
					S.style.position = "absolute", S.style.left = "0px", S.style.top = x * this.cellHeight + y + "px", S.style.width = o.cellWidth() + "px", S.style.height = this.cellHeight + "px", S.style.lineHeight = this.cellHeight + "px", S.setAttribute("unselectable", "on"), this.cssOnly ? S.className = this.q("_weeknumber") : S.className = this.q("weeknumber"), S.innerHTML = "<span>" + P + "</span>", g.appendChild(S), n.weeks.push(S)
				}
				for (var A = 0; A < 7; A++) {
					n.cells[A] = [];
					var S = document.createElement("div");
					S.style.position = "absolute", S.style.left = A * o.cellWidth() + k + "px", S.style.top = this.titleHeight + "px", S.style.width = o.cellWidth() + "px", S.style.height = this.dayHeaderHeight + "px", S.style.lineHeight = this.dayHeaderHeight + "px", S.setAttribute("unselectable", "on"), this.cssOnly ? S.className = this.q("_dayheader") : S.className = this.q("dayheader"), S.innerHTML = "<span>" + this.rf(A) + "</span>", g.appendChild(S), n.days.push(S);
					for (var x = 0; x < u; x++) {
						var C = d.addDays(7 * x + A),
							T = this.sf(C) && "none" !== this.tf(),
							E = C.firstDayOfMonth() === a,
							M = C < a,
							H = C >= a.addMonths(1);
						if ("month" === this.tf()) T = T && E;
						else if ("day" === this.tf()) T = T && (E || r && M || l && H);
						else if ("week" === this.tf()) {
							var _ = C.firstDayOfMonth() === a;
							T = T && (_ || r && M || l && H)
						}
						var R = document.createElement("div");
						n.cells[A][x] = R;
						var B = i.uf(A, x),
							N = B.x,
							U = B.y;
						R.day = C, R.x = A, R.y = x, R.left = N, R.top = U, R.isCurrentMonth = E, R.isNextMonth = H, R.isPrevMonth = M, R.showBefore = r, R.showAfter = l, this.cssOnly ? R.className = this.q(E ? "_day" : "_dayother") : R.className = this.q(E ? "day" : "dayother"), i.nf(R, "cell"), C.getTime() === f.getTime() && E && this.nf(R, "today"), 0 !== C.dayOfWeek() && 6 !== C.dayOfWeek() || this.nf(R, "weekend"), R.style.position = "absolute", R.style.left = N + "px", R.style.top = U + "px", R.style.width = o.cellWidth() + "px", R.style.height = this.cellHeight + "px", R.style.lineHeight = this.cellHeight + "px";
						var z = document.createElement("div");
						z.style.position = "absolute", this.cssOnly ? z.className = C.getTime() === f.getTime() && E ? this.q("_todaybox") : this.q("_daybox") : z.className = C.getTime() === f.getTime() && E ? this.q("todaybox") : this.q("daybox"), i.nf(z, "cell_box"), z.style.left = "0px", z.style.top = "0px", z.style.right = "0px", z.style.bottom = "0px", R.appendChild(z);
						var L = null;
						if (this.cells && this.cells[C.toStringSortable()] && (L = this.cells[C.toStringSortable()]), "function" == typeof i.onBeforeCellRender) {
							var I = {};
							I.cell = L || {}, I.cell.day = C, I.cell.isCurrentMonth = E, I.cell.isToday = C.getTime() === f.getTime() && E, I.cell.isWeekend = 0 === C.dayOfWeek() || 6 === C.dayOfWeek(), L ? (I.cell.html = L.html || C.getDay(), I.cell.cssClass = L.css) : (I.cell.html = C.getDay(), I.cell.cssClass = null), i.onBeforeCellRender(I), L = I.cell
						}
						if (L && DayPilot.Util.addClass(R, L.cssClass || L.css), E || r && M || l && H) {
							var O = document.createElement("div");
							O.innerHTML = C.getDay(), O.style.position = "absolute", O.style.left = "0px", O.style.top = "0px", O.style.right = "0px", O.style.bottom = "0px", i.nf(O, "cell_text"), R.style.cursor = "pointer", R.isClickable = !0, L && L.html && (O.innerHTML = L.html), R.appendChild(O)
						}
						R.setAttribute("unselectable", "on"), R.onclick = this.vf, g.appendChild(R), T && (i.wf(g, A, x), this.selected.push(R))
					}
				}
				var F = document.createElement("div");
				F.style.position = "absolute", F.style.left = "0px", F.style.top = y - 2 + "px", F.style.width = 7 * o.cellWidth() + this.mf() + "px", F.style.height = "1px", F.style.fontSize = "1px", F.style.lineHeight = "1px", this.cssOnly ? F.className = this.q("_line") : F.className = this.q("line"), g.appendChild(F), this.months.push(n)
			}, this.uf = function(e, t) {
				var i = this.titleHeight + this.dayHeaderHeight,
					n = this.mf();
				return {
					"x": e * o.cellWidth() + n,
					"y": t * this.cellHeight + i
				}
			}, this.wf = function(e, t, n) {
				var a = e.month.cells[t][n];
				i.nf(a, "select")
			}, this.xf = function(e, t, n) {
				var a = e.month.cells[t][n];
				i.of(a, "select")
			}, this.mf = function() {
				return this.showWeekNumbers ? o.cellWidth() : 0
			}, this.yf = function() {
				if (this.items) for (var e = 0; e < this.showMonths; e++) for (var t = 0; t < 7; t++) for (var i = 0; i < 6; i++) {
					var n = this.months[e].cells[t][i];
					n && (1 === this.items[n.day.toStringSortable()] ? this.nf(n, "busy") : this.of(n, "busy"))
				}
			}, this.zf = function() {
				var e = {};
				e.startDate = i.startDate, e.selectionStart = i.selectionStart, e.selectionEnd = i.selectionEnd.addDays(1), i.state.value = DayPilot.JSON.stringify(e)
			}, this.tf = function() {
				return (this.selectMode || "").toLowerCase()
			}, this.Af = function() {
				var e = this.selectionDay || this.selectionStart;
				e || (e = DayPilot.Date.today());
				var e = new DayPilot.Date(e);
				switch (this.tf()) {
				case "day":
					this.selectionDay = e, this.selectionEnd = e;
					break;
				case "week":
					this.selectionDay = e, this.selectionStart = e.firstDayOfWeek(o.weekStarts()), this.selectionEnd = this.selectionStart.addDays(6);
					break;
				case "month":
					this.selectionDay = e, this.selectionStart = e.firstDayOfMonth(), this.selectionEnd = this.selectionStart.lastDayOfMonth();
					break;
				case "none":
					this.selectionEnd = e;
					break;
				default:
					throw "Unknown selectMode value."
				}
			}, this.select = function(e, t) {
				var i = !0,
					n = !0;
				"object" == typeof t ? (t.dontFocus && (i = !1), t.dontNotify && (n = !1)) : "boolean" == typeof t && (i = !t);
				var a = this.selectionStart,
					o = this.selectionEnd;
				this.selectionStart = new DayPilot.Date(e).getDatePart(), this.selectionDay = this.selectionStart;
				var r = !1;
				if (i) {
					var l = this.startDate;
					(this.selectionStart < this.Bf() || this.selectionStart >= this.Cf()) && (l = this.selectionStart.firstDayOfMonth()), l.toStringSortable() !== this.startDate.toStringSortable() && (r = !0), this.startDate = l
				}
				this.Af(), this.Ee(), this.lf(), this.Df(), this.yf(), this.zf(), !n || a.equals(this.selectionStart) && o.equals(this.selectionEnd) || this.ab(), r && this.Ef()
			}, this.update = function() {
				i.cssOnly || (i.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), this.Ee(), this.lf(), this.Af(), this.Df(), this.ba(), this.yf(), this.zf(), this.visible ? this.show() : this.hide()
			}, this.G = function(e, t, i) {
				var n = {};
				n.action = e, n.parameters = i, n.data = t, n.header = this.F();
				var a = "JSON" + DayPilot.JSON.stringify(n);
				this.backendUrl ? DayPilot.request(this.backendUrl, this.I, a, this.J) : WebForm_DoCallback(this.uniqueID, a, this.K, null, this.callbackError, !0)
			}, this.J = function(e) {
				if ("function" == typeof i.onAjaxError) {
					var t = {};
					t.request = e, i.onAjaxError(t)
				} else "function" == typeof i.ajaxError && i.ajaxError(e)
			}, this.I = function(e) {
				i.K(e.responseText)
			}, this.E = function(e, t, n) {
				var a = {};
				a.action = e, a.parameters = n, a.data = t, a.header = this.F();
				var o = "JSON" + DayPilot.JSON.stringify(a);
				__doPostBack(i.uniqueID, o)
			}, this.F = function() {
				var e = {};
				return e.v = this.v, e.startDate = this.startDate, e.selectionStart = this.selectionStart, e.showMonths = this.showMonths, e
			}, this.Ff = function(e, t) {
				"refresh" === e && this.Ef()
			}, this.rf = function(e) {
				var t = e + o.weekStarts();
				return t > 6 && (t -= 7), o.locale().dayNamesShort[t]
			}, this.sf = function(e) {
				return null !== this.selectionStart && null !== this.selectionEnd && (this.selectionStart.getTime() <= e.getTime() && e.getTime() <= this.selectionEnd.getTime())
			}, this.Gf = function(e) {
				for (var t = 0; t < i.months.length; t++) {
					var n = i.months[t];
					if (!n) return null;
					if (e.x < n.left || n.width < e.x) return null;
					i.months[t].height;
					if (n.top <= e.y && e.y < n.top + n.height) return t
				}
				return null
			}, this.Hf = function(e) {
				var t = DayPilot.mo3(i.nav.top, e),
					n = i.Gf(t);
				if (null === n) return null;
				var a = i.months[n],
					o = this.titleHeight + this.dayHeaderHeight;
				if (a.top <= t.y && t.y < a.top + o) return {
					"month": n,
					"x": 0,
					"y": 0,
					"coords": t,
					"header": !0
				};
				for (var r = 0; r < a.cells.length; r++) for (var l = 0; l < a.cells[r].length; l++) {
					var s = a.cells[r][l],
						d = s.top + a.top,
						c = s.left + a.left;
					if (c <= t.x && t.x < c + i.cellWidth && d <= t.y && t.y < d + i.cellHeight) return {
						"month": n,
						"x": r,
						"y": l,
						"coords": t
					}
				}
				return null
			}, this.If = function(e) {
				if (i.freeHandSelectionEnabled) {
					var t = i.Hf(e);
					t && !t.header && (n.start = t), i.months[t.month].cells[t.x][t.y], e.preventDefault()
				}
			}, this.Jf = function(e) {
				if (n.start) {
					var t = i.Hf(e);
					if (n.end) n.end = t;
					else if (t) {
						var a = 3,
							o = DayPilot.distance(n.start.coords, t.coords);
						o > a && (n.end = t)
					}
					n.end && (n.clear(), n.draw())
				}
			}, this.Kf = {};
			var n = this.Kf;
			n.start = null, n.drawCell = function(e) {
				var t = i.months[e.month],
					a = i.uf(e.x, e.y),
					o = t.top + a.y,
					r = t.left + a.x,
					l = document.createElement("div");
				l.style.position = "absolute", l.style.left = r + "px", l.style.top = o + "px", l.style.height = i.cellHeight + "px", l.style.width = i.cellWidth + "px", l.style.backgroundColor = "#ccc", l.style.opacity = .5, l.style.cursor = "default", i.nav.preselection.appendChild(l), n.cells.push(l)
			}, n.clear = function() {
				if (n.cells) {
					for (var e = 0; e < n.cells.length; e++) i.nav.preselection.removeChild(n.cells[e]);
					n.cells = []
				}
			}, n.draw = function() {
				var e = n.ordered(),
					t = new a(e.start),
					o = e.end;
				if (o) {
					if (o === n.end && o.header && o.month > 0) {
						o.month -= 1;
						var r = i.months[o.month];
						o.x = 6, o.y = r.rowCount - 1
					}
					for (n.cells = []; !t.is(o);) {
						n.drawCell(t);
						var l = new a(t).next();
						if (!l) return;
						t.month = l.month, t.x = l.x, t.y = l.y
					}
					n.drawCell(t)
				}
			}, n.ordered = function() {
				var e = n.start,
					t = n.end,
					i = {};
				return !t || new a(e).before(t) ? (i.start = e, i.end = t) : (i.start = t, i.end = e), i
			};
			var a = function(e, t, n) {
					if (e instanceof a) return e;
					if ("object" == typeof e) {
						var o = e;
						this.month = o.month, this.x = o.x, this.y = o.y
					} else this.month = e, this.x = t, this.y = n;
					this.is = function(e) {
						return this.month === e.month && this.x === e.x && this.y === e.y
					}, this.next = function() {
						var e = this;
						if (e.x < 6) return {
							"month": e.month,
							"x": e.x + 1,
							"y": e.y
						};
						var t = i.months[e.month];
						return e.y < t.rowCount - 1 ? {
							"month": e.month,
							"x": 0,
							"y": e.y + 1
						} : e.month < i.months.length - 1 ? {
							"month": e.month + 1,
							"x": 0,
							"y": 0
						} : null
					}, this.visible = function() {
						var e = this.cell();
						return !!e.isCurrentMonth || (!(!e.isPrevMonth || !e.showBefore) || !(!e.isNextMonth || !e.showAfter))
					}, this.nextVisible = function() {
						for (var e = this; !e.visible();) {
							var t = e.next();
							if (!t) return null;
							e = new a(t)
						}
						return e
					}, this.previous = function() {
						var e = this;
						if (e.x > 0) return {
							"month": e.month,
							"x": e.x - 1,
							"y": e.y
						};
						i.months[e.month];
						if (e.y > 0) return {
							"month": e.month,
							"x": 6,
							"y": e.y - 1
						};
						if (e.month > 0) {
							var t = i.months[e.month - 1];
							return {
								"month": e.month - 1,
								"x": 6,
								"y": t.rowCount - 1
							}
						}
						return null
					}, this.previousVisible = function() {
						for (var e = this; !e.visible();) {
							var t = e.previous();
							if (!t) return null;
							e = new a(t)
						}
						return e
					}, this.cell = function() {
						return i.months[this.month].cells[this.x][this.y]
					}, this.date = function() {
						return this.cell().day
					}, this.before = function(e) {
						return this.date() < new a(e).date()
					}
				};
			this.vf = function(e) {
				var t = this.parentNode,
					n = this.parentNode.month,
					a = this.x,
					o = this.y,
					r = n.cells[a][o].day;
				if (n.cells[a][o].isClickable) {
					i.clearSelection(), i.selectionDay = r;
					var r = i.selectionDay;
					switch (i.tf()) {
					case "none":
						i.selectionStart = r, i.selectionEnd = r;
						break;
					case "day":
						if (i.autoFocusOnClick) {
							var l = r;
							if (r < i.Bf() || r >= i.Cf()) return void i.select(r)
						}
						var s = n.cells[a][o];
						i.wf(t, a, o), i.selected.push(s), i.selectionStart = s.day, i.selectionEnd = s.day;
						break;
					case "week":
						if (i.autoFocusOnClick) {
							var l = n.cells[0][o].day,
								d = n.cells[6][o].day;
							if (l.firstDayOfMonth() === d.firstDayOfMonth() && (l < i.Bf() || d >= i.Cf())) return void i.select(r)
						}
						for (var c = 0; c < 7; c++) i.wf(t, c, o), i.selected.push(n.cells[c][o]);
						i.selectionStart = n.cells[0][o].day, i.selectionEnd = n.cells[6][o].day;
						break;
					case "month":
						if (i.autoFocusOnClick) {
							var l = r;
							if (r < i.Bf() || r >= i.Cf()) return void i.select(r)
						}
						for (var l = null, d = null, o = 0; o < 6; o++) for (var a = 0; a < 7; a++) {
							var s = n.cells[a][o];
							s && s.day.getYear() === r.getYear() && s.day.getMonth() === r.getMonth() && (i.wf(t, a, o), i.selected.push(s), null === l && (l = s.day), d = s.day)
						}
						i.selectionStart = l, i.selectionEnd = d;
						break;
					default:
						throw "unknown selectMode"
					}
					i.zf(), i.ab()
				}
			}, this.ab = function(e) {
				var t = i.selectionStart,
					n = i.selectionEnd.addDays(1),
					a = DayPilot.DateUtil.daysDiff(t, n),
					o = i.selectionDay;
				if (e = e || {}, i.sa()) {
					var r = {};
					if (r.start = t, r.end = n, r.day = o, r.days = a, r.mode = e.mode || i.selectMode, r.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof i.onTimeRangeSelect && (i.onTimeRangeSelect(r), r.preventDefault.value)) return;
					switch (i.timeRangeSelectedHandling) {
					case "Bind":
						var l = DayPilot.Util.evalVariable(i.bound);
						if (l) {
							var s = {};
							s.start = t, s.end = n, s.days = a, s.day = o, l.commandCallBack(i.command, s)
						}
						break;
					case "None":
						break;
					case "PostBack":
						i.timeRangeSelectedPostBack(t, n, o)
					}
					"function" == typeof i.onTimeRangeSelected && i.onTimeRangeSelected(r)
				} else switch (i.timeRangeSelectedHandling) {
				case "Bind":
					var l = DayPilot.Util.evalVariable(i.bound);
					if (l) {
						var s = {};
						s.start = t, s.end = n, s.days = a, s.day = o, l.commandCallBack(i.command, s)
					}
					break;
				case "JavaScript":
					i.onTimeRangeSelected(t, n, o);
					break;
				case "None":
					break;
				case "PostBack":
					i.timeRangeSelectedPostBack(t, n, o)
				}
			}, this.timeRangeSelectedPostBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.day = n, this.E("TimeRangeSelected", i, a)
			}, this.qf = function(e) {
				i.Lf(i.skipMonths)
			}, this.pf = function(e) {
				i.Lf(-i.skipMonths)
			}, this.Lf = function(e) {
				this.startDate = this.startDate.addMonths(e), this.Ee(), this.lf(), this.Df(), this.zf(), this.Ef(), this.yf()
			}, this.Bf = function() {
				return i.startDate.firstDayOfMonth()
			}, this.Cf = function() {
				return i.startDate.firstDayOfMonth().addMonths(this.showMonths)
			}, this.visibleStart = function() {
				return i.startDate.firstDayOfMonth().firstDayOfWeek(o.weekStarts())
			}, this.visibleEnd = function() {
				return i.startDate.firstDayOfMonth().addMonths(this.showMonths - 1).firstDayOfWeek(o.weekStarts()).addDays(42)
			}, this.Ef = function() {
				var e = this.visibleStart(),
					t = this.visibleEnd();
				if (i.sa()) {
					var n = {};
					if (n.start = e, n.end = t, n.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof i.onVisibleRangeChange && (i.onVisibleRangeChange(n), n.preventDefault.value)) return;
					switch (this.visibleRangeChangedHandling) {
					case "CallBack":
						this.visibleRangeChangedCallBack(null);
						break;
					case "PostBack":
						this.visibleRangeChangedPostBack(null);
						break;
					case "Disabled":
					}
					"function" == typeof i.onVisibleRangeChanged && i.onVisibleRangeChanged(n)
				} else switch (this.visibleRangeChangedHandling) {
				case "CallBack":
					this.visibleRangeChangedCallBack(null);
					break;
				case "PostBack":
					this.visibleRangeChangedPostBack(null);
					break;
				case "JavaScript":
					this.onVisibleRangeChanged(e, t);
					break;
				case "Disabled":
				}
			}, this.visibleRangeChangedCallBack = function(e) {
				var t = {};
				this.G("Visible", e, t)
			}, this.visibleRangeChangedPostBack = function(e) {
				var t = {};
				this.E("Visible", e, t)
			}, this.K = function(e, t) {
				var e = DayPilot.Util.parseJSON(e);
				i.items = e.Items, i.cells = e.Cells, i.cells ? i.update() : i.yf()
			}, this.Df = function() {
				for (var e = 0; e < this.showMonths; e++) {
					var t = this.Mf(e);
					this.Fe(e, t)
				}
				this.root.style.height = this.$e() + "px", this.nav.preselection = document.createElement("div"), this.nav.preselection.style.position = "absolute", this.nav.preselection.style.left = "0px", this.nav.preselection.style.top = "0px", this.root.appendChild(this.nav.preselection)
			}, this.$e = function() {
				if ("Horizontal" === this.orientation) {
					for (var e = 0, t = 0; t < this.months.length; t++) {
						var i = this.months[t];
						i.height > e && (e = i.height)
					}
					return e
				}
				for (var n = 0, t = 0; t < this.months.length; t++) {
					var i = this.months[t];
					n += i.height
				}
				return n
			}, this.Mf = function(e) {
				if (this.internal.showLinks) return this.internal.showLinks;
				var t = {};
				return t.left = 0 === e, t.right = 0 === e, t.before = 0 === e, t.after = e === this.showMonths - 1, "Horizontal" === this.orientation && (t.right = e === this.showMonths - 1), t
			}, this.Qc = {}, this.Qc.scope = null, this.Qc.notify = function() {
				i.Qc.scope && i.Qc.scope["$apply"]()
			}, this.internal = {}, this.internal.initialized = function() {
				return i.A
			}, this.vc = {};
			var o = this.vc;
			o.locale = function() {
				return DayPilot.Locale.find(i.locale)
			}, o.weekStarts = function() {
				if ("Auto" === i.weekStarts) {
					var e = o.locale();
					return e ? e.weekStarts : 0
				}
				return i.weekStarts
			}, o.cellWidth = function() {
				if (i.t.cellWidth) return i.t.cellWidth;
				var e = i.md("_cell_dimensions").width;
				return e || (e = i.cellWidth), i.t.cellWidth = e, e
			}, this.clearSelection = function() {
				for (var e = 0; e < this.selected.length; e++) {
					var t = this.selected[e];
					i.xf(t.parentNode, t.x, t.y)
				}
				this.selected = []
			}, this.qd = function() {
				return !!this.backendUrl && ("undefined" == typeof i.items || !i.items)
			}, this.events = {}, this.ba = function() {
				if (DayPilot.isArray(this.events.list)) {
					this.items = {};
					for (var e = 0; e < this.events.list.length; e++) {
						var t = this.events.list[e],
							i = this.Nf(t);
						for (var n in i) this.items[n] = 1
					}
				}
			}, this.md = function(e) {
				var t = document.createElement("div");
				t.style.position = "absolute", t.style.top = "-2000px", t.style.left = "-2000px", t.className = this.q(e);
				var n = i.root || document.body;
				n.appendChild(t);
				var a = t.offsetHeight,
					o = t.offsetWidth;
				n.removeChild(t);
				var r = {};
				return r.height = a, r.width = o, r
			}, this.Nf = function(e) {
				for (var t = new DayPilot.Date(e.start), i = new DayPilot.Date(e.end), n = {}, a = t.getDatePart(); a.getTime() < i.getTime();) n[a.toStringSortable()] = 1, a = a.addDays(1);
				return n
			}, this.show = function() {
				i.visible = !0, i.root.style.display = ""
			}, this.hide = function() {
				i.visible = !1, i.root.style.display = "none"
			}, this.rd = function() {
				if (this.id && this.id.tagName) this.nav.top = this.id;
				else {
					if ("string" != typeof this.id) throw "DayPilot.Navigator() constructor requires the target element or its ID as a parameter";
					if (this.nav.top = document.getElementById(this.id), !this.nav.top) throw "DayPilot.Navigator: The placeholder element not found: '" + e + "'."
				}
				this.root = this.nav.top
			}, this.init = function() {
				if (this.rd(), !this.root.dp) {
					i.cssOnly || (i.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), this.Af(), this.lf(), this.Df(), this.ba(), this.yf(), this.Q(), this.Of(), this.Wc();
					this.qd() && this.Ef(), this.A = !0
				}
			}, this.Of = function() {
				i.nav.top.onmousedown = this.If, i.nav.top.onmousemove = this.Jf
			}, this.Wc = function() {
				DayPilot.re(document, "mouseup", i.Ud)
			}, this.Ud = function(e) {
				if (n.start && n.end) {
					var t = DayPilot.mo3(i.nav.top, e);
					if (t.x === n.start.coords.x && t.y === n.start.coords.y) return n.start = null, void n.clear();
					n.clear();
					var o = n.ordered();
					o.start = new a(o.start).nextVisible(), o.end = new a(o.end).previousVisible(), i.selectionDay = new a(o.start).date(), i.selectionStart = i.selectionDay, i.selectionEnd = new a(o.end).date(), n.start = null, n.end = null, i.Ee(), i.lf(), i.Df(), i.yf(), i.zf();
					i.ab({
						"mode": "freehand"
					})
				}
				n.start = null, n.end = null
			}, this.dispose = function() {
				var e = i;
				e.root && (e.root.removeAttribute("style"), e.root.removeAttribute("class"), e.root.dp = null, e.root.innerHTML = null, e.root = null)
			}, this.Q = function() {
				this.root.dispose = this.dispose
			}, this.Init = this.init
		}, "undefined" != typeof jQuery && !
		function(e) {
			e.fn.daypilotNavigator = function(e) {
				var t = null,
					i = this.each(function() {
						if (!this.daypilot) {
							var i = new DayPilot.Navigator(this.id);
							this.daypilot = i;
							for (var n in e) i[n] = e[n];
							i.Init(), t || (t = i)
						}
					});
				return 1 === this.length ? t : i
			}
		}(jQuery), function() {
			var e = DayPilot.am();
			e && e.directive("daypilotNavigator", ["$parse", function(e) {
				return {
					"restrict": "E",
					"template": "<div id='{{id}}'></div>",
					"compile": function(t, i) {
						return t.replaceWith(this["template"].replace("{{id}}", i["id"])), function(t, i, n) {
							var a = new DayPilot.Navigator(i[0]);
							a.Qc.scope = t, a.init();
							var o = n["id"];
							o && (t[o] = a);
							var r = n["publishAs"];
							if (r) {
								(0, e(r).assign)(t, a)
							}
							for (var l in n) if (0 === l.indexOf("on")) {
								var s = DayPilot.Util.shouldApply(l);
								s ? !
								function(i) {
									a[i] = function(a) {
										var o = e(n[i]);
										t["$apply"](function() {
											o(t, {
												"args": a
											})
										})
									}
								}(l) : !
								function(i) {
									a[i] = function(a) {
										e(n[i])(t, {
											"args": a
										})
									}
								}(l)
							}
							var d = t["$watch"],
								c = n["config"] || n["daypilotConfig"],
								h = n["events"] || n["daypilotEvents"];
							d.call(t, c, function(e, t) {
								for (var i in e) a[i] = e[i];
								a.update()
							}, !0), d.call(t, h, function(e) {
								a.events.list = e, a.ba(), a.yf()
							}, !0)
						}
					}
				}
			}])
		}(), "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
if ("undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	function e(e) {
		for (var t = e.touches[0].clientX, i = e.touches[0].clientY, n = document.elementFromPoint(t, i); n && n.parentNode;) if (n = n.parentNode, n.daypilotMainD) return n.calendar;
		return !1
	}
	function t(e) {
		var t = e.touches[0].pageX,
			i = e.touches[0].pageY,
			n = {};
		return n.x = t, n.y = i, n
	}
	if ("undefined" == typeof DayPilot.Scheduler) {
		var i = function() {
				var e = navigator.userAgent;
				return e.indexOf("Mozilla/5.0") > -1 && e.indexOf("Android ") > -1 && e.indexOf("AppleWebKit") > -1 && !(e.indexOf("Chrome") > -1)
			}(),
			n = {},
			a = function() {},
			o = !1;
		DayPilot.Scheduler = function(e, o) {
			function d(e, t) {
				return 1 - e / t
			}
			this.v = "3058";
			var c = this;
			this.id = e, this.isScheduler = !0, this.hideUntilInit = !0, this.api = 2, this.allowDefaultContextMenu = !1, this.allowEventOverlap = !0, this.allowMultiMove = !1, this.allowMultiRange = !1, this.allowMultiResize = !1, this.allowMultiSelect = !0, this.multiSelectRectangle = "Disabled", this.autoRefreshCommand = "refresh", this.autoRefreshEnabled = !1, this.autoRefreshInterval = 60, this.autoRefreshMaxCount = 20, this.autoScroll = "Drag", this.blockOnCallBack = !1, this.navigatorBackSync = null, this.beforeCellRenderCaching = !0, "function" == typeof DayPilot.Bubble ? (this.bubble = new DayPilot.Bubble, this.cellBubble = new DayPilot.Bubble, this.resourceBubble = new DayPilot.Bubble) : (this.bubble = null, this.cellBubble = null, this.resourceBubble = null), this.businessBeginsHour = 9, this.businessEndsHour = 18, this.businessWeekends = !1, this.cellDuration = 60, this.cellGroupBy = "Day", this.cellStacking = !1, this.cellStackingAutoHeight = !1, this.cellWidth = 40, this.cellWidthMin = 1, this.cellWidthSpec = "Fixed", this.cellsMarkBusiness = !0, this.eventHtmlLeftMargin = 20, this.eventHtmlRightMargin = 20, this.eventMarginLeft = 0, this.eventMarginRight = 0, this.eventMarginBottom = 0, this.eventsLoadMethod = "GET", this.groupConcurrentEvents = !1, this.groupConcurrentEventsLimit = 1, this.Pf = !0, this.Qf = !1, this.cellSweeping = !0, this.cellSweepingCacheSize = 1e3, this.crosshairColor = "Gray", this.crosshairOpacity = 20, this.crosshairType = "Header", this.Gd = !1, this.doubleClickTimeout = 300, this.dragOutAllowed = !1, this.durationBarHeight = 3, this.durationBarVisible = !0, this.durationBarMode = "Duration", this.durationBarDetached = !1, this.days = 1, this.drawBlankCells = !0, this.dynamicEventRendering = "Progressive", this.dynamicEventRenderingMargin = 50, this.dynamicEventRenderingMarginX = null, this.dynamicEventRenderingMarginY = null, this.dynamicEventRenderingCacheSweeping = !1, this.dynamicEventRenderingCacheSize = 200, this.dynamicLoading = !1, this.eventBorderColor = "#000000", this.eventBackColor = "#FFFFFF", this.eventEditMinWidth = 100, this.eventEndSpec = "DateTime", this.eventFontFamily = "Tahoma, Arial", this.eventFontSize = "8pt", this.eventFontColor = "#000000", this.eventHeight = 25, this.eventMoveMargin = 5, this.eventMoveToPosition = !1, this.eventMoveSkipNonBusiness = !1, this.eventResizeMargin = 5, this.eventStackingLineHeight = 100, this.eventTapAndHoldHandling = "Move", this.eventTextWrappingEnabled = !1, this.eventUpdateInplaceOptimization = !1, this.Rf = !1, this.headerFontColor = "#000000", this.headerFontFamily = "Tahoma, Arial", this.headerFontSize = "8pt", this.headerHeight = 20, this.heightSpec = "Auto", this.height = 300, this.hideBorderFor100PctHeight = !1, this.hourFontFamily = "Tahoma, Arial", this.hourFontSize = "10pt", this.hourNameBackColor = "#ECE9D8", this.hourNameBorderColor = "#ACA899", this.infiniteScrollingEnabled = !1, this.infiniteScrollingMargin = 50, this.infiniteScrollingStepDays = 30, this.initEventEnabled = !0, this.jointEventsResize = !0, this.jointEventsMove = !0, this.layout = "Auto", this.linkCreateHandling = "Disabled", this.linkBottomMargin = 10, this.linkPointSize = 10, this.linksLoadMethod = "GET", this.locale = "en-us", this.loadingLabelText = "Loading...", this.loadingLabelVisible = !0, this.overrideWheelScrolling = !1, this.messageBarPosition = "Top", this.messageHideAfter = 5e3, this.messageHideOnMouseOut = !0, this.multiMoveVerticalMode = "Disabled", this.moveBy = "Full", this.notifyCommit = "Immediate", this.progressiveRowRendering = !0, this.progressiveRowRenderingPreload = 25, this.tapAndHoldTimeout = 300, this.timeHeaders = [{
				"groupBy": "Default"
			}, {
				"groupBy": "Cell"
			}], this.treePreventParentUsage = !1, this.treeAutoExpand = !0, this.rowCreateHeight = null, this.rowCreateHtml = "New row...", this.rowHeaderColumnDefaultWidth = 80, this.rowHeaderHideIconEnabled = !1, this.rowHeaderWidth = 80, this.rowHeaderScrolling = !1, this.rowHeaderSplitterWidth = 3, this.rowHeaderWidthAutoFit = !0, this.rowHeaderWidthMarginRight = 0, this.rowHeaderCols = null, this.rowMarginBottom = 0, this.rowMarginTop = 0, this.rowMinHeight = 0, this.rowsLoadMethod = "GET", this.scale = "CellDuration", this.scrollDelayDynamic = 500, this.scrollDelayEvents = 200, this.scrollDelayCells = 0, this.scrollDelayFloats = 0, this.scrollStep = null, this.scrollX = 0, this.scrollY = 0, this.selectedRows = [], this.showBaseTimeHeader = !0, this.showNonBusiness = !0, this.showToolTip = !0, this.snapToGrid = !0, this.startDate = DayPilot.Date.today(), this.syncResourceTree = !1, this.timeHeaderTextWrappingEnabled = !1, this.treeEnabled = !1, this.treeIndent = 20, this.treeImageMarginLeft = 5, this.treeImageMarginTop = 5, this.timeFormat = "Auto", this.useEventBoxes = "Always", this.viewType = "Resources", this.visible = !0, this.watchWidthChanges = !0, this.weekStarts = "Auto", this.width = null, this.floatingEvents = !0, this.floatingTimeHeaders = !0, this.eventCorners = "Regular", this.separators = [], this.cornerHtml = "", this.Sf = !0, this.Tf = -1, this.Uf = -1, this.eventClickHandling = "Enabled", this.eventDeleteHandling = "Disabled", this.eventHoverHandling = "Bubble", this.eventDoubleClickHandling = "Disabled", this.eventEditHandling = "Update", this.eventMoveHandling = "Update", this.eventResizeHandling = "Update", this.eventRightClickHandling = "ContextMenu", this.eventSelectHandling = "Update", this.resourceCollapseHandling = "Enabled", this.resourceExpandHandling = "Enabled", this.rowClickHandling = "Enabled", this.rowDoubleClickHandling = "Disabled", this.rowCreateHandling = "Disabled", this.rowEditHandling = "Update", this.rowHeaderColumnResizedHandling = "Update", this.rowSelectHandling = "Update", this.rowMoveHandling = "Disabled", this.timeRangeClickHandling = "Enabled", this.timeRangeDoubleClickHandling = "Disabled", this.timeRangeSelectedHandling = "Enabled", this.timeRangeRightClickHandling = "ContextMenu", this.eventMovingStartEndEnabled = !1, this.eventMovingStartEndFormat = "MMMM d, yyyy", this.timeRangeSelectingStartEndEnabled = !1, this.timeRangeSelectingStartEndFormat = "MMMM d, yyyy", this.eventResizingStartEndEnabled = !1, this.eventResizingStartEndFormat = "MMMM d, yyyy", this.cssOnly = !0, this.cssClassPrefix = "scheduler_default", this.eventVersionsEnabled = !1, this.eventVersionHeight = 25, this.eventVersionMargin = 2, this.eventVersionPosition = "Above";
			this.backendUrl = null;
			DayPilot.browser.ie && (this.scrollDelayCells = 100, this.scrollDelayFloats = 100), 1 === c.api && (this.onEventMove = function() {}, this.onEventResize = function() {}, this.onResourceExpand = function() {}, this.onResourceCollapse = function() {}), this.onEventClick = null, this.onEventClicked = null, this.onEventMove = null, this.onEventMoved = null, this.onEventMoving = null, this.onEventResize = null, this.onEventResized = null, this.onEventResizing = null, this.onEventRightClick = null, this.onEventRightClicked = null, this.onEventMouseOver = null, this.onEventMouseOut = null, this.onRowClick = null, this.onRowClicked = null, this.onTimeRangeClick = null, this.onTimeRangeClicked = null, this.onTimeRangeDoubleClick = null, this.onTimeRangeDoubleClicked = null, this.onTimeRangeSelect = null, this.onTimeRangeSelected = null, this.onTimeRangeSelecting = null, this.onTimeRangeRightClick = null, this.onTimeRangeRightClicked = null, this.onRowHeaderResized = null, this.onCellMouseOver = null, this.onCellMouseOut = null, this.onGridMouseDown = null, this.onBeforeCellRender = null, this.onBeforeEventRender = null, this.onBeforeTimeHeaderRender = null, this.onBeforeResHeaderRender = null, this.onBeforeRowHeaderRender = null, this.onBeforeCellExport = null, this.onBeforeEventExport = null, this.onBeforeTimeHeaderExport = null, this.onBeforeRowHeaderExport = null, this.onEventFilter = null, this.onRowFilter = null, this.onRectangleEventSelecting = null, this.onRectangleEventSelect = null, this.onRectangleEventSelected = null, this.onDimensionsChanged = null, this.onAfterUpdate = null, this.B = 0, this.Vf = -1, this.rowlist = DayPilot.list(), this.itline = DayPilot.list(), this.timeline = null, this.Wf = "{{pc}}", this.events = {}, this.cells = {}, this.elements = {}, this.elements.events = [], this.elements.bars = [], this.elements.text = [], this.elements.cells = [], this.elements.linesVertical = [], this.elements.separators = [], this.elements.range = [], this.elements.breaks = [], this.elements.links = [], this.elements.linkpoints = [], this.elements.rectangle = [], this.elements.hover = [], this.t = {}, this.t.cells = [], this.t.linesVertical = {}, this.t.linesHorizontal = {}, this.t.timeHeaderGroups = [], this.t.timeHeader = {}, this.t.pixels = [], this.t.breaks = [], this.t.events = [], this.clientState = {}, this.members = {}, this.members.obsolete = ["Init", "cleanSelection", "cssClassPrefix", "getHScrollPosition", "setHScrollPosition", "getVScrollPosition", "setVScrollPosition", "showBaseTimeHeader"], this.members.ignoreFilter = function(e) {
				return 0 === e.indexOf("div")
			}, this.members.ignore = ["internal", "nav", "debug", "temp", "elements", "members", "cellProperties", "itline", "rowlist", "timeHeader", "timeouts"], this.members.noCssOnly = ["eventCorners", "eventFontColor", "eventFontFamily", "eventFontSize", "headerFontColor", "headerFontFamily", "headerFontSize", "hourFontFamily", "hourFontSize", "hourNameBackColor", "hourNameBorderColor", "loadingLabelBackColor", "loadingLabelFontColor", "loadingLabelFontFamily", "loadingLabelFontSize", "shadow", "timeBreakColor"], this.nav = {}, this.K = function(e, t) {
				var e = DayPilot.Util.parseJSON(e);
				if (c.onScrollCalled = !1, e.CallBackRedirect) return void(document.location.href = e.CallBackRedirect);
				if ("function" == typeof c.onCallBackResult) {
					var i = {};
					if (i.result = e, i.preventDefault = function() {
						i.preventDefault.value = !0
					}, c.onCallBackResult(i), i.preventDefault.value) return c.Wa(), c.X(), c.ra(), e.Message && c.message && c.message(e.Message), c.Y(e.CallBackData, !0), c.Xf(), void c.Yf()
				}
				if (e.BubbleGuid) {
					var n = e.BubbleGuid,
						a = this.bubbles[n];
					return delete this.bubbles[n], c.X(), "undefined" != typeof e.Result.BubbleHTML && a && a.updateView(e.Result.BubbleHTML, a), void c.Xf()
				}
				if ("undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), "undefined" != typeof e.ClientState && (null === e.ClientState ? c.clientState = {} : c.clientState = e.ClientState), "None" === e.UpdateType) return c.X(), c.Xf(), e.Message && c.message(e.Message), void c.Y(e.CallBackData, !0);
				if (e.VsUpdate) {
					var o = document.createElement("input");
					o.type = "hidden", o.name = c.id + "_vsupdate", o.id = o.name, o.value = e.VsUpdate, c.Ce.innerHTML = "", c.Ce.appendChild(o)
				}
				"undefined" != typeof e.TagFields && (c.tagFields = e.TagFields), "undefined" != typeof e.SortDirections && (c.sortDirections = e.SortDirections), c.t.drawArea = null, "Full" === e.UpdateType && (c.resources = e.Resources, c.colors = e.Colors, c.palette = e.Palette, c.dirtyColors = e.DirtyColors, c.cellProperties = e.CellProperties, c.cellConfig = e.CellConfig, c.separators = e.Separators, c.timeline = e.Timeline, c.timeHeader = e.TimeHeader, c.timeHeaders = e.TimeHeaders, "undefined" != typeof e.Links && (c.links.list = e.Links), "undefined" != typeof e.RowHeaderColumns && (c.rowHeaderColumns = e.RowHeaderColumns), c.startDate = e.StartDate ? new DayPilot.Date(e.StartDate) : c.startDate, c.days = e.Days ? e.Days : c.days, c.cellDuration = e.CellDuration ? e.CellDuration : c.cellDuration, c.cellGroupBy = e.CellGroupBy ? e.CellGroupBy : c.cellGroupBy, c.cellWidth = e.CellWidth ? e.CellWidth : c.cellWidth, "undefined" != typeof e.Scale && (c.scale = e.Scale), c.viewType = e.ViewType ? e.ViewType : c.viewType, c.hourNameBackColor = e.HourNameBackColor ? e.HourNameBackColor : c.hourNameBackColor, "undefined" != typeof e.ShowNonBusiness && (c.showNonBusiness = e.ShowNonBusiness), c.businessBeginsHour = e.BusinessBeginsHour ? e.BusinessBeginsHour : c.businessBeginsHour, c.businessEndsHour = e.BusinessEndsHour ? e.BusinessEndsHour : c.businessEndsHour, "undefined" != typeof e.DynamicLoading && (c.dynamicLoading = e.DynamicLoading), "undefined" != typeof e.TreeEnabled && (c.treeEnabled = e.TreeEnabled), c.backColor = e.BackColor ? e.BackColor : c.backColor, c.nonBusinessBackColor = e.NonBusinessBackColor ? e.NonBusinessBackColor : c.nonBusinessBackColor, c.locale = e.Locale ? e.Locale : c.locale, "undefined" != typeof e.TimeZone && (c.timeZone = e.TimeZone), c.timeFormat = e.TimeFormat ? e.TimeFormat : c.timeFormat, c.rowHeaderCols = e.RowHeaderCols ? e.RowHeaderCols : c.rowHeaderCols, "undefined" != typeof e.DurationBarMode && (c.durationBarMode = e.DurationBarMode), c.cornerBackColor = e.CornerBackColor ? e.CornerBackColor : c.cornerBackColor, "undefined" != typeof e.CornerHTML && (c.cornerHtml = e.CornerHTML), c.hashes = e.Hashes, c.Zf(), c.$f(), c._f(), c.aa()), "Scroll" !== e.Action && c.ba(e.Events), "Full" === e.UpdateType && (c.ag(), c.bg()), c.cg(), c.na(), c.dg(), c.t.drawArea = null, "Scroll" !== e.Action ? (c.eg(), c.ca(), "Auto" !== c.heightSpec && "Max" !== c.heightSpec || c.ja(), c.fg(), c.M(), c.gg(), c.multiselect.clear(!0), c.multiselect.hg(e.SelectedEvents), c.ig(), c.jg(), c.oa()) : (c.multiselect.clear(!0), c.multiselect.hg(e.SelectedEvents), c.kg(e.Events)), "HoldForever" !== c.timeRangeSelectedHandling && c.lg(), "Full" === e.UpdateType && (c.setScroll(e.ScrollX, e.ScrollY), c.zf()), c.mg(), c.Wa(), e.SelectedRows && c.ng(e.SelectedRows), c.X(), "Full" === e.UpdateType && navigator.appVersion.indexOf("MSIE 7.") !== -1 && window.setTimeout(function() {
					c.ag(), c.ja()
				}, 0), c.ra(), e.Message && c.message && c.message(e.Message), c.Y(e.CallBackData, !0), c.Xf(), c.Yf(), "Full" !== e.UpdateType || "Scroll" === e.Action || c.onScrollCalled || setTimeout(function() {
					c.og()
				}, 0)
			}, this.Wa = function() {
				if (c.todo && c.todo.del) {
					var e = c.todo.del;
					e.parentNode.removeChild(e), c.todo.del = null
				}
			}, this.Y = function(e, t) {
				var i = function(e, t) {
						return function() {
							if (c.sa()) {
								if ("function" == typeof c.onAfterRender) {
									var i = {};
									i.isCallBack = t, i.isScroll = !1, i.data = e, c.onAfterRender(i)
								}
							} else c.afterRender && c.afterRender(e, t)
						}
					};
				window.setTimeout(i(e, t), 0)
			}, this.scrollTo = function(e, t, i) {
				c.pg.enabled ? (c.pg.scrollToRequested = e, setTimeout(function() {
					var e = c.pg.scrollToRequested;
					e && c.qg(e, t, i)
				}, 0)) : c.qg(e, t, i)
			}, this.qg = function(e, t, i) {
				if (e) {
					if ("Days" === c.viewType) {
						var n = c.rg(new DayPilot.Date(e));
						if (!n) return;
						return void setTimeout(function() {
							var e = n.top;
							c.nav.scroll.scrollTop = e
						}, 100)
					}
					var a;
					if (e instanceof DayPilot.Date) a = this.getPixels(e).left;
					else if ("string" == typeof e) a = this.getPixels(new DayPilot.Date(e)).left;
					else {
						if ("number" != typeof e) throw "Invalid scrollTo() parameter. Accepted parameters: string (ISO date), number (pixels), DayPilot.Date object";
						a = e
					}
					var o = this.sg.clientWidth,
						r = this.nav.scroll.clientWidth;
					switch (i = i || "left", i.toLowerCase()) {
					case "left":
						break;
					case "middle":
						a -= r / 2;
						break;
					case "right":
						a -= r
					}
					if (a < 0 && (a = 0), a > o - r && (a = o - r), !t) return void c.tg(a);
					var l = Math.abs(c.nav.scroll.scrollLeft - a),
						s = l / o,
						d = 50;
					if ("number" == typeof t) d = t;
					else if ("string" == typeof t) switch (t) {
					case "fast":
						d = 30;
						break;
					case "normal":
						d = 50;
						break;
					case "slow":
						d = 100;
						break;
					case "linear":
						d = Math.floor(100 * s)
					}
					s > .6 && (d = Math.min(d, 80)), this.ug(a, d)
				}
			}, this.ug = function(e, t) {
				function i(e) {
					var t = e.next();
					return "undefined" == typeof t ? void(e.finished && e.finished()) : (c.setScrollX(t), window.clearTimeout(c.refreshTimeout), void setTimeout(function() {
						i(e)
					}, e.delay))
				}
				var n = {};
				n.steps = [], n.index = 0, n.delay = 10, n.next = function() {
					var e = n.steps[n.index];
					return n.index += 1, e
				}, n.finished = function() {
					c.og()
				};
				for (var a = c.getScrollX(), t = t || 100, o = e - a, r = 0; r < t; r++) {
					var l = r / t,
						s = 2 * (l - .5) / (Math.pow(2 * (l - .5), 2) + 1) + .5;
					n.steps.push(a + o * s)
				}
				n.steps.push(e), i(n)
			}, this.scrollToResource = function(e) {
				DayPilot.complete(function() {
					var t = c.vg(e);
					t && setTimeout(function() {
						var e = t.top;
						c.nav.scroll.scrollTop = e
					}, 100)
				})
			}, this.wg = function() {
				if (this.floatingTimeHeaders && this.timeHeader) {
					var e = this.xg();
					if (e) {
						this.yg();
						for (var t = e.pixels.left + u.shiftX, i = e.pixels.right + u.shiftX, n = [], a = 0; a < this.timeHeader.length; a++) for (var o = 0; o < this.timeHeader[a].length; o++) {
							var r = this.timeHeader[a][o],
								l = r.left,
								s = r.left + r.width,
								d = null;
							if (l < t && t < s && (d = {}, d.x = o, d.y = a, d.marginLeft = t - l, d.marginRight = 0, d.div = this.t.timeHeader[o + "_" + a], n.push(d)), l < i && i < s) {
								d || (d = {}, d.x = o, d.y = a, d.marginLeft = 0, d.div = this.t.timeHeader[o + "_" + a], n.push(d)), d.marginRight = s - i;
								break
							}
						}
						for (var c = 0; c < n.length; c++) {
							var d = n[c];
							this.zg(d.div, d.marginLeft, d.marginRight)
						}
					}
				}
			}, this.mg = function() {
				this.wg(), this.Ag()
			}, this.Bg = {};
			var h = this.Bg;
			h.eventsInRectangle = function(e, t, i, n) {
				var a = e,
					o = e + i,
					r = t,
					l = t + n;
				return DayPilot.list(c.elements.events).filter(function(e) {
					var t = e.event,
						i = t.part.left,
						n = t.part.left + t.part.width,
						s = c.rowlist[t.part.dayIndex],
						d = s.top + t.part.top,
						h = d + t.part.height;
					if (DayPilot.Util.overlaps(i, n, a, o) && DayPilot.Util.overlaps(d, h, r, l)) return !0
				})
			}, h.events = function(e) {
				var t = [],
					e = e || "All",
					i = c.xg();
				if (!i) return DayPilot.list(t);
				for (var n = i.pixels.left, a = i.pixels.right, o = 0; o < c.elements.events.length; o++) {
					var r = c.elements.events[o],
						l = r.event,
						s = l.part.left,
						d = l.part.left + l.part.width;
					switch (e) {
					case "Left":
						s < n && n < d && t.push(r);
						break;
					case "All":
						DayPilot.Util.overlaps(s, d, n, a) && t.push(r)
					}
				}
				return DayPilot.list(t).addProps({
					"area": i
				})
			}, this.Ag = function() {
				if (this.floatingEvents) {
					var e = h.events("Left");
					this.Cg(), e.each(function(t) {
						var i = e.area.pixels.left,
							n = t.event,
							a = n.part.left,
							o = i - a;
						c.Dg(t, o, 0)
					})
				}
			}, this.elements.sections = [], this.elements.hsections = [], this.zg = function(e, t, i) {
				var n = document.createElement("div");
				n.setAttribute("unselectable", "on"), n.className = this.q("_timeheader_float"), n.style.position = "absolute", n.style.left = t + "px", n.style.right = i + "px", n.style.top = "0px", n.style.bottom = "0px", n.style.overflow = "hidden";
				var a = document.createElement("div");
				a.className = this.q("_timeheader_float_inner"), a.setAttribute("unselectable", "on");
				var o = e.cell.th;
				o.innerHTML && (a.innerHTML = o.innerHTML), o.fontColor && (a.style.color = o.fontColor), n.appendChild(a), e.section = n, e.insertBefore(n, e.firstChild.nextSibling), e.firstChild.innerHTML = "", this.elements.hsections.push(e)
			}, this.yg = function() {
				for (var e = 0; e < this.elements.hsections.length; e++) {
					var t = this.elements.hsections[e],
						i = t.cell;
					i && t.firstChild && (t.firstChild.innerHTML = i.th.innerHTML), DayPilot.de(t.section), t.section = null
				}
				this.elements.hsections = []
			}, this.Dg = function(e, t, i) {
				var n = document.createElement("div");
				n.setAttribute("unselectable", "on"), n.className = this.q(E.eventFloat), n.style.position = "absolute", n.style.left = t + "px", n.style.right = i + "px", n.style.top = "0px", n.style.bottom = "0px", n.style.overflow = "hidden";
				var a = document.createElement("div");
				a.className = this.q(E.eventFloatInner), a.setAttribute("unselectable", "on"), a.innerHTML = e.event.client.html(), e.event.data.fontColor && (a.style.color = e.event.data.fontColor), n.appendChild(a), e.section = n, e.insertBefore(n, e.firstChild.nextSibling), e.firstChild.innerHTML = "";
				var o = {
					"offsetX": c.Eg(a),
					"eventDiv": e
				};
				DayPilot.Areas.attach(n, e.event, o), DayPilot.Areas.disable(e), this.elements.sections.push(e)
			}, this.Fg = null, this.Eg = function(e) {
				return null === c.Fg && (c.Fg = parseInt(new DayPilot.StyleReader(e).get("padding-left"))), c.Fg
			}, this.Cg = function() {
				for (var e = 0; e < this.elements.sections.length; e++) {
					var t = this.elements.sections[e],
						i = t.event;
					i && (t.firstChild.innerHTML = i.client.html()), DayPilot.de(t.section), DayPilot.Areas.enable(t), t.section = null
				}
				this.elements.sections = []
			}, this.setScrollX = function(e) {
				c.pg.enabled ? (c.pg.scrollXRequested = e, setTimeout(function() {
					var e = c.pg.scrollXRequested;
					"number" == typeof e && c.tg(e)
				}, 0)) : c.tg(e)
			}, this.tg = function(e) {
				var t = c.nav.scroll,
					i = c.Gg();
				t.clientWidth + e > i && (e = i - t.clientWidth), c.divTimeScroll.scrollLeft = e, t.scrollLeft = e
			}, this.setScrollY = function(e) {
				c.pg.enabled ? (c.pg.scrollYRequested = e, setTimeout(function() {
					var e = c.pg.scrollYRequested;
					"number" == typeof e && c.Hg(e)
				}, 0)) : c.Hg(e)
			}, this.Hg = function(e) {
				var t = c.nav.scroll,
					i = c.Vf;
				t.clientHeight + e > i && (e = i - t.clientHeight), c.divResScroll.scrollTop = e, t.scrollTop = e
			}, this.setScroll = function(e, t) {
				c.setScrollX(e), c.setScrollY(t)
			}, this.message = function(e, t) {
				if (null !== e) {
					var i = {};
					"object" == typeof arguments[1] && (i = arguments[1], t = i.delay);
					var n, t = t || this.messageHideAfter || 2e3,
						a = this.Ig() + 1,
						o = this.Jg() + _.splitterWidth(),
						r = DayPilot.sw(c.nav.scroll) + 1,
						l = DayPilot.sh(c.nav.scroll) + 1;
					if (this.nav.message) n = c.nav.message;
					else {
						n = document.createElement("div"), n.style.position = "absolute", n.style.left = o + "px", n.style.right = r + "px", n.style.display = "none", DayPilot.re(n, DayPilot.touch.start, function(e) {
							c.nav.message.style.display = "none", e.preventDefault(), e.stopPropagation()
						}), n.onmousemove = function() {
							c.messageHideOnMouseOut && n.messageTimeout && !n.status && clearTimeout(n.messageTimeout)
						}, n.onmouseout = function() {
							c.messageHideOnMouseOut && "none" !== c.nav.message.style.display && (n.messageTimeout = setTimeout(c.Ea, 500))
						};
						var s = document.createElement("div");
						s.onclick = function() {
							c.nav.message.style.display = "none"
						}, s.className = this.q("_message"), n.appendChild(s);
						var d = document.createElement("div");
						d.style.position = "absolute", d.className = this.q("_message_close"), d.onclick = function() {
							c.nav.message.style.display = "none"
						}, n.appendChild(d), this.nav.top.appendChild(n), this.nav.message = n
					}
					var h = function() {
							var n = c.nav.message;
							n.firstChild.className = c.q("_message"), i.cssClass && DayPilot.Util.addClass(n.firstChild, i.cssClass), c.nav.message.firstChild.innerHTML = e;
							var o = DayPilot.sw(c.nav.scroll) + 1;
							c.nav.message.style.right = o + "px";
							var r = c.messageBarPosition || "Top";
							"Bottom" === r ? (c.nav.message.style.bottom = l + "px", c.nav.message.style.top = "") : "Top" === r && (c.nav.message.style.bottom = "", c.nav.message.style.top = a + "px");
							var s = function() {
									n.messageTimeout = setTimeout(c.Ea, t)
								};
							DayPilot.fade(c.nav.message, .2, s)
						};
					clearTimeout(n.messageTimeout), "none" !== this.nav.message.style.display ? DayPilot.fade(c.nav.message, -.2, h) : h()
				}
			}, this.Ea = function() {
				if (c.nav && c.nav.message) {
					var e = function() {
							c.nav.message.style.display = "none"
						};
					DayPilot.fade(c.nav.message, -.2, e)
				}
			}, this.Kg = function() {
				c.nav && c.nav.message && (c.nav.message.style.display = "none")
			}, this.message.show = function(e) {
				c.message(e)
			}, this.message.hide = function() {
				c.Ea()
			}, this.Lg = null, this.ja = function() {
				if (this.nav.scroll) {
					!
					function() {
						var e = c.Gg();
						c.sg.style.height = c.Vf + "px", c.sg.style.width = e + "px", "Auto" !== c.cellWidthSpec || c.Mg ? e > c.nav.scroll.clientWidth ? c.nav.scroll.style.overflowX = "auto" : c.nav.scroll.style.overflowX = "hidden" : (c.nav.scroll.style.overflowX = "hidden", c.nav.scroll.scrollLeft = 0)
					}();
					var e = 1;
					null !== this.Lg && (this.nav.top.style.border = this.Lg, this.Lg = null), "Parent100Pct" !== this.heightSpec && "Max100Pct" !== this.heightSpec || (this.nav.top.style.height = "100%", this.hideBorderFor100PctHeight && (this.Lg = this.nav.top.style.border, this.nav.top.style.border = "0 none"), this.height = parseInt(this.nav.top.clientHeight, 10) - this.Ig() - e), this.nav.scroll.style.height = "30px";
					var t = this.Zb(),
						i = t + this.Ig() + e;
					t >= 0 && (this.nav.scroll.style.height = t + "px", this.Ng.style.height = t + "px"), this.nav.divider && ((!i || isNaN(i) || i < 0) && (i = 0), this.nav.divider.style.height = i + "px"), "Parent100Pct" !== this.heightSpec && (this.nav.top.style.height = i + "px"), c.nav.resScrollSpace && (c.nav.resScrollSpace.style.height = t + 20 + "px");
					for (var n = 0; n < this.elements.separators.length; n++) this.elements.separators[n].style.height = this.Vf + "px";
					for (var n = 0; n < this.elements.linesVertical.length; n++) this.elements.linesVertical[n].style.height = this.Vf + "px";
					c.Og()
				}
			}, this.$f = function() {
				this.startDate = new DayPilot.Date(this.startDate).getDatePart(), this.t.pixels = [], this.itline = DayPilot.list();
				var e = "Auto" === this.cellWidthSpec;
				if (function() {
					if (e) {
						var t = 0;
						c.r() && c.timeline ? t = c.timeline.length : "Manual" === c.scale ? t = c.timeline.length : (c.Pg(), t = c.itline.length, c.itline = DayPilot.list());
						var i = c.Qg();
						if (t > 0 && i > 0) {
							var n = i / t;
							c.cellWidth = Math.max(n, c.cellWidthMin), c.Mg = n < c.cellWidthMin
						}
					}
				}(), this.r() && this.timeline) {
					if (this.timeline) {
						this.itline = DayPilot.list();
						for (var t = null, i = 0, n = 0; n < this.timeline.length; n++) {
							var a = this.timeline[n],
								o = {};
							if (o.start = new DayPilot.Date(a.start), o.end = a.end ? new DayPilot.Date(a.end) : o.start.addMinutes(this.cellDuration), a.width) o.left = a.left || i, o.width = a.width || this.cellWidth, i += o.width;
							else {
								var r = Math.floor(i + this.cellWidth),
									l = r - Math.floor(i);
								o.left = Math.floor(i), o.width = l, i += this.cellWidth
							}
							o.breakBefore = t && t.ticks !== o.start.ticks, t = o.end, this.itline.push(o)
						}
					}
					e && this.Rg()
				} else {
					if (this.timeHeader = [], "Manual" === this.scale) {
						this.itline = DayPilot.list();
						for (var i = 0, t = null, n = 0; n < this.timeline.length; n++) {
							var a = this.timeline[n],
								o = {};
							if (o.start = new DayPilot.Date(a.start), o.end = a.end ? new DayPilot.Date(a.end) : o.start.addMinutes(this.cellDuration), t && o.start.ticks < t.ticks) throw "The timeline must be sequential";
							var s = a.width || this.cellWidth,
								r = Math.floor(i + s),
								l = r - Math.floor(i);
							o.left = Math.floor(i), o.width = l, i += s, o.breakBefore = t && t.ticks !== o.start.ticks, t = o.end, this.itline.push(o)
						}
					} else this.Pg();
					this.Sg()
				}
			}, this.infinite = {}, this.infinite.shiftStart = function(e) {
				u.shiftStart(e)
			}, this.infinite.scrollTo = function(e) {
				u.shiftTo(e)
			}, this.Tg = {};
			var u = this.Tg;
			u.shiftX = 0, u.active = !1, u.updateRowStarts = function() {
				DayPilot.list(c.rowlist).each(function(e, t) {
					e.start = c.Ba(), e.data = null, c.Ug(t)
				})
			}, u.isEnabled = function() {
				return c.infiniteScrollingEnabled
			}, u.shiftTo = function(e) {
				var e = new DayPilot.Date(e),
					t = e.addDays(-c.infiniteScrollingStepDays).getDatePart(),
					i = new DayPilot.Duration(t.getTime() - c.startDate.getDatePart().getTime()).totalDays();
				u.shiftStart(i, e)
			}, u.shiftStart = function(e, t) {
				var i;
				u.active = !0;
				var n = c.startDate,
					a = c.startDate.addDays(e);
				e > 0 && (i = -c.getPixels(a).left), c.startDate = c.startDate.addDays(e), c.itline = DayPilot.list(), c.t.pixels = [], c.Pg(), u.updateRowStarts(), e < 0 && (i = c.getPixels(n).left), c.timeHeader = [], c.Sg(), c.bg(), c.cellProperties = {}, c.fg(), c.gg(), c.ba(), c.M(), c.ja(), "undefined" != typeof t ? (c.scrollTo(new DayPilot.Date(t)), c.og()) : c.nav.scroll.scrollLeft += i, c.jg(), c.oa(), u.active = !1
			}, this.Pg = function() {
				for (var e = "Days" !== this.viewType ? this.startDate.addDays(this.days) : this.startDate.addDays(1), t = this.startDate, i = this.Vg(t), n = !1, a = 0; i.ticks <= e.ticks && i.ticks > t.ticks;) {
					if (this.Wg(t, i)) {
						var o = Math.floor(a + this.cellWidth),
							r = o - Math.floor(a),
							l = {};
						l.start = t, l.end = i, l.left = Math.floor(a), l.width = r, l.breakBefore = n, this.itline.push(l), a += this.cellWidth, n = !1
					} else n = !0;
					t = i, i = this.Vg(t)
				}
			}, this.Rg = function() {
				if (this.timeHeader) for (var e = 0; e < this.timeHeader.length; e++) for (var t = this.timeHeader[e], i = 0; i < t.length; i++) {
					var n = t[i];
					n.left = this.getPixels(new DayPilot.Date(n.start)).left;
					var a = this.getPixels(new DayPilot.Date(n.end)).left,
						o = a - n.left;
					n.width = o
				}
			}, this.Sg = function() {
				var e = this.timeHeaders;
				if (e || (e = [{
					"groupBy": this.cellGroupBy
				}, {
					"groupBy": "Cell"
				}]), this.itline.isEmpty()) {
					this.timeHeader = [];
					for (var t = 0; t < e.length; t++) this.timeHeader[t] = []
				} else for (var i = c.Xg(), t = 0; t < e.length; t++) {
					var n = e[t].groupBy,
						a = e[t].format;
					"Default" === n && (n = this.cellGroupBy);
					for (var o = [], r = this.Ba(); r.ticks < i.ticks;) {
						var l = {};
						if (l.start = r, l.end = this.Yg(l.start, n), l.start.ticks === l.end.ticks) break;
						l.left = this.getPixels(l.start).left;
						var s = this.getPixels(l.end).left,
							d = s - l.left;
						if (l.width = d, l.colspan = Math.ceil(d / (1 * this.cellWidth)), "string" == typeof a ? l.innerHTML = l.start.toString(a, _.locale()) : l.innerHTML = this.Zg(l, n), l.text = l.innerHTML, d > 0) {
							if ("function" == typeof this.onBeforeTimeHeaderRender) {
								var h = {};
								h.start = l.start, h.end = l.end, h.text = l.innerHTML, h.html = l.innerHTML, h.toolTip = l.innerHTML, h.backColor = null, h.fontColor = null, h.level = this.timeHeader.length, h.cssClass = null;
								var u = {};
								u.header = h, this.onBeforeTimeHeaderRender(u), l.text = l.innerHTML, l.innerHTML = h.html, l.backColor = h.backColor, l.fontColor = h.fontColor, l.toolTip = h.toolTip, l.areas = h.areas, l.cssClass = h.cssClass
							}
							o.push(l)
						}
						r = l.end
					}
					this.timeHeader.push(o)
				}
			}, this.Wg = function(e, t) {
				if ("function" == typeof this.onIncludeTimeCell) {
					var i = {};
					i.start = e, i.end = t, i.visible = !0;
					var n = {};
					return n.cell = i, this.onIncludeTimeCell(n), i.visible
				}
				return !!this.showNonBusiness || this.isBusiness({
					"start": e,
					"end": t
				})
			}, this.getPixels = function(e) {
				var t = e.ticks,
					i = this.t.pixels[t];
				if (i) return i;
				var n = 2218768416e5;
				if (0 === this.itline.length || t < this.itline[0].start.ticks) {
					var a = {};
					return a.cut = !1, a.left = 0, a.boxLeft = a.left, a.boxRight = a.left, a.i = null, a
				}
				for (var o = this.$g(e), r = Math.max(o.i - 1, 0), l = r; l < this.itline.length; l++) {
					var s = this.itline[l],
						d = s.start.ticks,
						c = s.end.ticks;
					if (d < t && t < c) {
						var h = t - d,
							a = {};
						a.cut = !1, a.left = s.left + this.kd(s, h), a.boxLeft = s.left, a.boxRight = s.left + s.width, a.i = l;
						break
					}
					if (d === t) {
						var a = {};
						a.cut = !1, a.left = s.left, a.boxLeft = a.left, a.boxRight = a.left + s.width, a.i = l;
						break
					}
					if (c === t) {
						var a = {};
						a.cut = !1, a.left = s.left + s.width, a.boxLeft = a.left, a.boxRight = a.left, a.i = l + 1;
						break
					}
					if (t < d && t > n) {
						var a = {};
						a.cut = !0, a.left = s.left, a.boxLeft = a.left, a.boxRight = a.left, a.i = l;
						break
					}
					n = c
				}
				if (!a) {
					var u = this.itline[this.itline.length - 1],
						a = {};
					a.cut = !0, a.left = u.left + u.width, a.boxLeft = a.left, a.boxRight = a.left, a.i = null
				}
				return this.t.pixels[t] = a, a
			}, this.getDate = function(e, t, i) {
				var n = this._g(e, i);
				if (!n) return null;
				var a = n.x,
					o = this.itline[a];
				if (!o) return null;
				var r = i && !t ? o.end : o.start;
				return t ? r.addTime(this.ah(n.cell, n.offset)) : r
			}, this._g = function(e, t) {
				if (0 === this.itline.length) return null;
				for (var i = 0, n = 0, a = 0; a < this.itline.length; a++) {
					var o = this.itline[a];
					if (i += o.width || this.cellWidth, e < i || t && e === i) {
						var r = {};
						return r.x = a, r.offset = e - n, r.cell = o, r
					}
					n = i
				}
				var o = c.itline.last(),
					r = {};
				return r.x = this.itline.length - 1, r.offset = o.width || this.cellWidth, r.cell = o, r
			}, this.bh = function(e) {
				return this.$g(e)
			}, this.ch = function(e) {
				for (var t = new DayPilot.Date(e), i = 0; i < this.itline.length; i++) {
					var n = this.itline[i];
					if (n.start.ticks <= t.ticks && t.ticks < n.end.ticks) {
						var a = {};
						return a.hidden = !1, a.current = n, a
					}
					if (t.ticks < n.start.ticks) {
						var a = {};
						return a.hidden = !0, a.previous = i > 0 ? this.itline[i - 1] : null, a.current = null, a.next = this.itline[i], a
					}
				}
				var a = {};
				return a.past = !0, a.previous = this.itline[this.itline.length - 1], a
			}, this.$g = function(e) {
				var t = new DayPilot.Date(e),
					i = 0,
					n = this.itline[0];
				if (t.ticks < n.start.ticks) {
					var a = {};
					return a.hidden = !0, a.previous = null, a.current = null, a.next = this.itline[0], a.i = -1, a
				}
				var o = this.itline.length - 1,
					r = this.itline[o];
				if (t.ticks > r.end.ticks) {
					var a = {};
					return a.past = !0, a.previous = this.itline[this.itline.length - 1], a.i = this.itline.length, a
				}
				if (t.ticks === r.end.ticks) {
					var a = {};
					return a.past = !1, a.current = this.itline[this.itline.length - 1], a.i = this.itline.length - 1, a
				}
				for (var l = function() {
						for (var e, n = c.itline; i <= o;) if (e = Math.floor((i + o) / 2), n[e].start.ticks > t.ticks) o = e - 1;
						else {
							if (!(n[e].end.ticks < t.ticks)) return e;
							i = e + 1
						}
						return i
					}(), s = l; s < this.itline.length; s++) {
					var d = this.itline[s];
					if (d.start.ticks <= t.ticks && t.ticks < d.end.ticks) {
						var a = {};
						return a.hidden = !1, a.current = d, a.i = s, a
					}
					if (t.ticks < d.start.ticks) {
						var a = {};
						return a.hidden = !0, a.previous = s > 0 ? this.itline[s - 1] : null, a.current = null, a.next = this.itline[s], a.i = s, a
					}
				}
				var a = {};
				return a.past = !0, a.previous = this.itline[this.itline.length - 1], a.i = this.itline.length, a
			}, this.kd = function(e, t) {
				var i = e.width || this.cellWidth,
					n = e.end.ticks - e.start.ticks;
				return Math.floor(i * t / n)
			}, this.ah = function(e, t) {
				var i = e.end.ticks - e.start.ticks,
					n = e.width || this.cellWidth;
				return Math.floor(t / n * i)
			}, this.Se = function(e) {
				DayPilot.Global.touch.start || n.preventEventClick || (A = {}, c.Ga(this, e))
			}, this.eventClickPostBack = function(e, t) {
				this.E("EventClick", e, t)
			}, this.eventClickCallBack = function(e, t) {
				this.G("EventClick", e, t)
			}, this.Ga = function(e, t) {
				var i = e.event;
				if (i) {
					var t = t || window.event;
					if ("undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), !i.client.doubleClickEnabled()) return void c.Ha(e, t);
					c.timeouts.click || (c.timeouts.click = []);
					var n = function(e, t) {
							return function() {
								c.Ha(e, t)
							}
						};
					c.timeouts.click.push(window.setTimeout(n(e, t), c.doubleClickTimeout))
				}
			}, this.dh = function(e) {
				return c.itline[e]
			}, this.Ha = function(e, t) {
				if ("boolean" == typeof t) throw "Invalid _eventClickSingle parameters";
				var i = e.event,
					n = t.ctrlKey,
					a = t.metaKey;
				if (i.client.clickEnabled()) if (c.sa()) {
					var o = {};
					if (o.e = i, o.div = e, o.originalEvent = t, o.ctrl = n, o.meta = a, o.shift = t.shiftKey, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onEventClick && (c.onEventClick(o), o.preventDefault.value)) return;
					switch (c.eventClickHandling) {
					case "PostBack":
						c.eventClickPostBack(i);
						break;
					case "CallBack":
						c.eventClickCallBack(i);
						break;
					case "Edit":
						c.Ia(e);
						break;
					case "Select":
						c.Ja(e, i, n, a);
						break;
					case "ContextMenu":
						var r = i.client.contextMenu();
						r ? r.show(i) : c.contextMenu && c.contextMenu.show(i);
						break;
					case "Bubble":
						c.bubble && c.bubble.showEvent(i);
						break;
					case "RectangleSelect":
						if ("Disabled" !== c.multiSelectRectangle) return M.start(), !1
					}
					"function" == typeof c.onEventClicked && c.onEventClicked(o)
				} else switch (c.eventClickHandling) {
				case "PostBack":
					c.eventClickPostBack(i);
					break;
				case "CallBack":
					c.eventClickCallBack(i);
					break;
				case "JavaScript":
					c.onEventClick(i);
					break;
				case "Edit":
					c.Ia(e);
					break;
				case "Select":
					c.Ja(e, i, n, a);
					break;
				case "ContextMenu":
					var r = i.client.contextMenu();
					r ? r.show(i) : c.contextMenu && c.contextMenu.show(i);
					break;
				case "Bubble":
					c.bubble && c.bubble.showEvent(i);
					break;
				case "RectangleSelect":
					if ("Disabled" !== c.multiSelectRectangle) return M.start(), !1
				}
			}, this.Pa = function(e) {
				if (c.sa()) {
					var t = {};
					if (t.e = e, t.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onEventDelete && (c.onEventDelete(t), t.preventDefault.value)) return;
					switch (c.eventDeleteHandling) {
					case "PostBack":
						c.eventDeletePostBack(e);
						break;
					case "CallBack":
						c.eventDeleteCallBack(e);
						break;
					case "Update":
						c.events.remove(e)
					}
					"function" == typeof c.onEventDeleted && c.onEventDeleted(t)
				} else switch (c.eventDeleteHandling) {
				case "PostBack":
					c.eventDeletePostBack(e);
					break;
				case "CallBack":
					c.eventDeleteCallBack(e);
					break;
				case "JavaScript":
					c.onEventDelete(e)
				}
			}, this.eventDeletePostBack = function(e, t) {
				this.E("EventDelete", e, t)
			}, this.eventDeleteCallBack = function(e, t) {
				this.G("EventDelete", e, t)
			}, this.setHScrollPosition = function(e) {
				this.nav.scroll.scrollLeft = e
			}, this.getScrollX = function() {
				return this.nav.scroll.scrollLeft
			}, this.getHScrollPosition = this.getScrollX, this.getScrollY = function() {
				return this.nav.scroll.scrollTop
			}, this.Ja = function(e, t, i, n) {
				c.db(e, t, i, n)
			}, this.eventSelectPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.change = t, this.E("EventSelect", n, i)
			}, this.eventSelectCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.change = t, this.G("EventSelect", n, i)
			}, this.db = function(e, t, i, n) {
				var a = c.multiselect,
					o = a.isSelected(t);
				if (i || n || !o || 1 !== a.list.length) if (c.sa()) {
					a.previous = a.events();
					var r = {};
					if (r.e = t, r.selected = o, r.ctrl = i, r.meta = n, r.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onEventSelect && (c.onEventSelect(r), r.preventDefault.value)) return;
					switch (c.eventSelectHandling) {
					case "PostBack":
						c.eventSelectPostBack(t, l);
						break;
					case "CallBack":
						"undefined" != typeof WebForm_InitCallback && (window.fb = "", window.gb = [], WebForm_InitCallback()), c.eventSelectCallBack(t, l);
						break;
					case "Update":
						a.hb(e, i, n)
					}
					"function" == typeof c.onEventSelected && (r.change = a.isSelected(t) ? "selected" : "deselected", r.selected = a.isSelected(t), c.onEventSelected(r))
				} else {
					a.previous = a.events(), a.hb(e, i, n);
					var l = a.isSelected(t) ? "selected" : "deselected";
					switch (c.eventSelectHandling) {
					case "PostBack":
						c.eventSelectPostBack(t, l);
						break;
					case "CallBack":
						"undefined" != typeof WebForm_InitCallback && (window.fb = "", window.gb = [], WebForm_InitCallback()), c.eventSelectCallBack(t, l);
						break;
					case "JavaScript":
						c.onEventSelect(t, l)
					}
				}
			}, this.eventRightClickPostBack = function(e, t) {
				this.E("EventRightClick", e, t)
			}, this.eventRightClickCallBack = function(e, t) {
				this.G("EventRightClick", e, t)
			}, this.La = function(e) {
				if (!DayPilot.Global.touch.active && !DayPilot.Global.touch.start) {
					var t = this.event;
					if (e = e || window.event, e.cancelBubble = !0, !this.event.client.rightClickEnabled()) return !1;
					if (c.sa()) {
						var i = {};
						if (i.e = t, i.div = this, i.originalEvent = e, i.preventDefault = function() {
							this.preventDefault.value = !0
						}, "function" == typeof c.onEventRightClick && (c.onEventRightClick(i), i.preventDefault.value)) return !1;
						switch (c.eventRightClickHandling) {
						case "PostBack":
							c.eventRightClickPostBack(t);
							break;
						case "CallBack":
							c.eventRightClickCallBack(t);
							break;
						case "ContextMenu":
							var n = t.client.contextMenu();
							n ? n.show(t) : c.contextMenu && c.contextMenu.show(this.event);
							break;
						case "Bubble":
							c.bubble && c.bubble.showEvent(t)
						}
						"function" == typeof c.onEventRightClicked && c.onEventRightClicked(i)
					} else switch (c.eventRightClickHandling) {
					case "PostBack":
						c.eventRightClickPostBack(t);
						break;
					case "CallBack":
						c.eventRightClickCallBack(t);
						break;
					case "JavaScript":
						c.onEventRightClick(t);
						break;
					case "ContextMenu":
						var n = t.client.contextMenu();
						n ? n.show(t) : c.contextMenu && c.contextMenu.show(this.event);
						break;
					case "Bubble":
						c.bubble && c.bubble.showEvent(t)
					}
					return !1
				}
			}, this.eventDoubleClickPostBack = function(e, t) {
				this.E("EventDoubleClick", e, t)
			}, this.eventDoubleClickCallBack = function(e, t) {
				this.G("EventDoubleClick", e, t)
			}, this.Ka = function(e) {
				if ("undefined" != typeof DayPilot.Bubble && DayPilot.Bubble.hideActive(), c.timeouts.click) {
					for (var t in c.timeouts.click) window.clearTimeout(c.timeouts.click[t]);
					c.timeouts.click = null
				}
				var e = e || window.event,
					i = this.event;
				if (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, c.sa()) {
					var n = {};
					if (n.e = i, n.originalEvent = e, n.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onEventDoubleClick && (c.onEventDoubleClick(n), n.preventDefault.value)) return;
					switch (c.eventDoubleClickHandling) {
					case "PostBack":
						c.eventDoubleClickPostBack(i);
						break;
					case "CallBack":
						c.eventDoubleClickCallBack(i);
						break;
					case "Edit":
						c.Ia(this);
						break;
					case "Select":
						c.Ja(div, i, e.ctrlKey, e.metaKey);
						break;
					case "Bubble":
						c.bubble && c.bubble.showEvent(i);
						break;
					case "ContextMenu":
						var a = i.client.contextMenu();
						a ? a.show(i) : c.contextMenu && c.contextMenu.show(i)
					}
					"function" == typeof c.onEventDoubleClicked && c.onEventDoubleClicked(n)
				} else switch (c.eventDoubleClickHandling) {
				case "PostBack":
					c.eventDoubleClickPostBack(i);
					break;
				case "CallBack":
					c.eventDoubleClickCallBack(i);
					break;
				case "JavaScript":
					c.onEventDoubleClick(i);
					break;
				case "Edit":
					c.Ia(this);
					break;
				case "Select":
					c.Ja(div, i, e.ctrlKey, e.metaKey);
					break;
				case "Bubble":
					c.bubble && c.bubble.showEvent(i);
					break;
				case "ContextMenu":
					var a = i.client.contextMenu();
					a ? a.show(i) : c.contextMenu && c.contextMenu.show(i)
				}
			}, this.eventResizePostBack = function(e, t, i, n) {
				this.Ta("PostBack", e, t, i, n)
			}, this.eventResizeCallBack = function(e, t, i, n) {
				this.Ta("CallBack", e, t, i, n)
			}, this.Ta = function(e, t, i, n, a) {
				var o = {};
				o.e = t, o.newStart = i, o.newEnd = n, this.Qa(e, "EventResize", o, a)
			}, this.Sa = function(e, t, i) {
				if ("Disabled" !== this.eventResizeHandling) if (i = c.iff (i), c.sa()) {
					var n = {},
						a = function() {
							if (P.hide(), !n.preventDefault.value) {
								switch (t = n.newStart, i = n.newEnd, c.eventResizeHandling) {
								case "PostBack":
									c.eventResizePostBack(e, t, i);
									break;
								case "CallBack":
									c.eventResizeCallBack(e, t, i);
									break;
								case "Notify":
									c.eventResizeNotify(e, t, i);
									break;
								case "Update":
									c.eh(n)
								}
								"function" == typeof c.onEventResized && c.onEventResized(n)
							}
						};
					n.e = e, n.async = !1, n.loaded = function() {
						a()
					}, n.newStart = t, n.newEnd = i, n.preventDefault = function() {
						this.preventDefault.value = !0
					}, n.multiresize = DayPilot.list(b.list);
					var o = {};
					o.event = e, o.start = t, o.end = i, n.multiresize.splice(0, 0, o), "function" == typeof c.onEventResize && c.onEventResize(n), n.async ? c.blockOnCallBack && P.show() : a()
				} else switch (c.eventResizeHandling) {
				case "PostBack":
					c.eventResizePostBack(e, t, i);
					break;
				case "CallBack":
					c.eventResizeCallBack(e, t, i);
					break;
				case "JavaScript":
					c.onEventResize(e, t, i);
					break;
				case "Notify":
					c.eventResizeNotify(e, t, i);
					break;
				case "Update":
					c.eh(n)
				}
			}, this.eventMovePostBack = function(e, t, i, n, a, o) {
				this.Xa("PostBack", e, t, i, n, a, o)
			}, this.eventMoveCallBack = function(e, t, i, n, a, o) {
				this.Xa("CallBack", e, t, i, n, a, o)
			}, this.Xa = function(e, t, i, n, a, o, r) {
				var l = t && !! t.preventDefault,
					s = {};
				if (l) {
					var d = t;
					s.e = d.e, s.newStart = d.newStart, s.newEnd = d.newEnd, s.newResource = d.newResource, s.position = d.position, s.multimove = [], d.multimove.each(function(e) {
						var t = {};
						if (t.e = e.event, t.newStart = e.start, t.newEnd = e.end, t.newResource = e.event.resource(), t.e === d.e || t.e.data.id == d.e.data.id) t.newResource = d.newResource;
						else if (w.rowoffset) {
							var i = e.event.part.dayIndex + w.rowoffset;
							t.newResource = c.rowlist[i].id
						}
						s.multimove.push(t)
					})
				} else s.e = t, s.newStart = i, s.newEnd = n, s.newResource = a, s.position = r;
				this.Qa(e, "EventMove", s, o)
			}, this.fh = function(e, t, i) {
				var n = {};
				n.start = t.start, n.end = t.end, n.resource = t.resource, n.multirange = [], t.multirange.each(function(e) {
					var t = {};
					t.start = e.start, t.end = e.end, t.resource = e.resource, n.multirange.push(t)
				}), this.Qa(e, "TimeRangeSelected", n, i)
			}, this.Qa = function(e, t, i, n) {
				if ("PostBack" === e) c.E(t, i, n);
				else if ("CallBack" === e) c.G(t, i, n, "CallBack");
				else if ("Immediate" === e) c.G(t, i, n, "Notify");
				else if ("Queue" === e) c.queue.add(new DayPilot.Action(this, t, i, n));
				else {
					if ("Notify" !== e) throw "Invalid event invocation type";
					"Notify" === _.notifyType() ? c.G(t, i, n, "Notify") : c.queue.add(new DayPilot.Action(c, t, i, n))
				}
			}, this.eventMoveNotify = function(e, t, i, n, a, o) {
				if (e && !! e.preventDefault) {
					var r = e;
					r.old = new DayPilot.Event(r.e.copy(), c), r.multimove.each(function(e) {
						e.old = new DayPilot.Event(e.event.copy(), c)
					}), c.eh(r), r.e = r.old, delete r.old, r.multimove.each(function(e) {
						e.event = e.old, delete e.old
					})
				} else {
					e = new DayPilot.Event(e.copy(), c);
					var l = c.events.gh(e.data);
					e.start(t), e.end(i), e.resource(n), e.commit(), l = l.concat(c.events.hh(e.data)), c.ih(l), c.jh(), c.kh(l)
				}
				this.Xa("Notify", e, t, i, n, a, o)
			}, this.eventResizeNotify = function(e, t, i, n) {
				var a = new DayPilot.Event(e.copy(), this),
					o = c.events.gh(e.data);
				e.start(t), e.end(i), e.commit(), o = o.concat(c.events.hh(e.data)), c.ih(o), c.jh(), c.kh(o), this.Ta("Notify", a, t, i, n)
			}, this.multiselect = {}, this.multiselect.list = [], this.multiselect.divs = [], this.multiselect.previous = [], this.multiselect.hg = function(e) {
				c.multiselect.list = DayPilot.list(e).map(function(e) {
					return new DayPilot.Event(e, c)
				})
			}, this.multiselect.yb = function() {
				var e = c.multiselect;
				return DayPilot.JSON.stringify(e.events())
			}, this.multiselect.events = function() {
				var e = c.multiselect,
					t = DayPilot.list();
				t.ignoreToJSON = !0;
				for (var i = 0; i < e.list.length; i++) t.push(e.list[i]);
				return t
			}, this.multiselect.zb = function() {}, this.multiselect.hb = function(e, t, i) {
				var n = c.multiselect;
				if (n.isSelected(e.event)) if (c.allowMultiSelect) if (t || i) n.remove(e.event, !0);
				else {
					var a = n.list.length;
					n.clear(), a > 1 && n.add(e.event, !0)
				} else n.clear();
				else c.allowMultiSelect && (t || i) ? n.add(e.event, !0) : (n.clear(), n.add(e.event, !0));
				n.gd(e), n.zb()
			}, this.multiselect.Ab = function(e) {
				var t = c.multiselect;
				return t.Bb(e, t.initList)
			}, this.multiselect.Cb = function() {
				for (var e = c.multiselect, t = [], i = 0; i < e.list.length; i++) {
					var n = e.list[i];
					t.push(n.value())
				}
				//alert(t.join("\n"))
				alert(t.join("\n")+"11111111111")
			}, this.multiselect.add = function(e, t) {
				var i = c.multiselect;
				i.indexOf(e) === -1 && i.list.push(e), t || i.lh(e)
			}, this.multiselect.remove = function(e, t) {
				var i = c.multiselect,
					n = i.indexOf(e);
				n !== -1 && i.list.splice(n, 1), t || i.lh(e)
			}, this.multiselect.clear = function(e) {
				var t = c.multiselect;
				t.list = [], e || t.redraw()
			}, this.multiselect.redraw = function() {
				var e = c.multiselect;
				e.divs = [];
				for (var t = 0; t < c.elements.events.length; t++) {
					var i = c.elements.events[t];
					i.event && i.event.isEvent && (e.isSelected(i.event) ? e.Eb(i) : e.Fb(i))
				}
			}, this.multiselect.gd = function(e) {
				if (e) {
					var t = c.multiselect;
					t.isSelected(e.event) ? t.Eb(e) : t.Fb(e)
				}
			}, this.multiselect.lh = function(e) {
				var t = c.multiselect,
					i = c.fd(e);
				t.gd(i)
			}, this.multiselect.Eb = function(e) {
				var t = c.multiselect,
					i = c.q("_selected"),
					e = t.Gb(e);
				DayPilot.Util.addClass(e, i), t.divs.push(e)
			}, this.multiselect.Gb = function(e) {
				return e
			}, this.multiselect.Ib = function() {
				for (var e = c.multiselect, t = 0; t < e.divs.length; t++) {
					var i = e.divs[t];
					e.Fb(i, !0)
				}
				e.divs = []
			}, this.multiselect.Fb = function(e, t) {
				var i = c.multiselect,
					n = c.q("_selected");
				if (DayPilot.Util.removeClass(e, n), !t) {
					var a = DayPilot.indexOf(i.divs, e);
					a !== -1 && i.divs.splice(a, 1)
				}
			}, this.multiselect.isSelected = function(e) {
				return !!e && ( !! e.isEvent && c.multiselect.Bb(e, c.multiselect.list))
			}, this.multiselect.indexOf = function(e) {
				for (var t = e.data, i = 0; i < c.multiselect.list.length; i++) {
					if (c.multiselect.list[i].data === t) return i
				}
				return -1
			}, this.multiselect.Bb = function(e, t) {
				if (!t) return !1;
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					if (e === n) return !0;
					if ("function" == typeof n.id) {
						if (null !== n.id() && null !== e.id() && n.id() === e.id()) return !0;
						if (null === n.id() && null === e.id() && n.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === n.start().toStringSortable()) return !0
					} else {
						if (null !== n.id && null !== e.id() && n.id === e.id()) return !0;
						if (null === n.id && null === e.id() && n.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === n.start) return !0
					}
				}
				return !1
			}, this.multiselect.startRectangle = function() {
				M.start()
			}, this.mh = function() {
				this.gg(), this.jg()
			}, this.nh = function() {
				c.ag(), c.eg(), c.oh(), c.progressiveRowRendering && c.ph()
			}, this.gd = function(e) {
				var e = e || {},
					t = !e.eventsOnly;
				c.cssOnly || (c.cssOnly = !0, DayPilot.Util.log("DayPilot: cssOnly = false mode is not supported since DayPilot Pro 8.0.")), t && (this.r() || (c.timeHeader = null, c.cellProperties = {}), c.qh = {}, c.Zf(), c.$f(), e && e.dontLoadResources || c._f(), c.events.rh(), c.vc.clearCache()), this.ba(), this.uh(), c.ag(), t && (c.jd(), c.vh(), c.bg(), c.ng(c.selectedRows), c.wh()), c.cg(), c.eg(), c.oh(), c.ca(), v.hideLinkpoints(), this.M(), this.fg(), this.Yf(), this.aa(), this.ig(), this.mh(), c.ja(), e.immediateEvents || e.eventsOnly ? c.oa() : setTimeout(function() {
					c.oa()
				}, 100), this.visible ? c.Sf != c.visible && this.show() : this.hide(), this.Sf = this.visible, this.mg(), (c.Qc.scope || c.pg.enabled) && !c.A || this.og(), this.xh(), this.ra()
			}, this.xh = function() {
				if ("function" == typeof c.onAfterUpdate) {
					var e = {};
					c.onAfterUpdate(e)
				}
			}, this.update = function(e) {
				if (c.Gd) throw "You are trying to update a DayPilot.Scheduler object that has been disposed already. Calling .dispose() destroys the object and makes it unusable.";
				f.request(e)
			};
			var f = {};
			f.timeout = null, f.options = null, f.enabled = !1, f.request = function(e) {
				f.enabled ? (clearTimeout(f.timeout), f.mergeOptions(e), f.timeout = setTimeout(f.doit)) : (f.mergeOptions(e), f.doit())
			}, f.mergeOptions = function(e) {
				if (e) {
					f.options || (f.options = {});
					for (var t in e) f.options[t] = e[t]
				}
			}, f.doit = function() {
				var e = f.options;
				return f.options = null, e ? (e.events ? (c.events.list = e.events, c.A && c.gd({
					"eventsOnly": !0
				})) : e.separators ? (c.separators = e.separators, c.A && c.mh()) : e.rowHeaderColumns && (c.rowHeaderColumns = e.rowHeaderColumns, c.A && c.nh()), void c.Y(null, !1)) : void(c.A && (c.gd({
					"immediateEvents": !0
				}), c.Y(null, !1)))
			}, this.kh = function(e, t, i) {
				e = DayPilot.ua(e);
				for (var n = 0; n < e.length; n++) {
					var a = e[n];
					c.yh(a)
				}
				if (this.zh) {
					this.cg(), this.eg(), this.fg(), this.gg();
					for (var n = 0; n < e.length; n++) {
						var a = e[n];
						this.Ah(a)
					}
					for (var n = 0; n < e.length; n++) {
						var a = e[n];
						this.Bh(a)
					}
					this.ig(), this.jg(), this.Ch()
				} else {
					for (var n = 0; n < e.length; n++) {
						var a = e[n];
						t || this.Ah(a), this.Bh(a)
					}
					DayPilot.list(e).each(function(e) {
						c.Dh(e)
					}), c.ig()
				}
				c.Ag(), v.load(), c.multiselect.redraw(), i && i(), this.Yf()
			}, this.iff = function(e) {
				return "DateTime" === c.eventEndSpec ? e : e.getDatePart().ticks === e.ticks ? e.addDays(-1) : e.getDatePart()
			}, this.Ie = function(e) {
				return "DateTime" === c.eventEndSpec ? e : e.getDatePart().addDays(1)
			}, this.kf = function(e) {
				return "DateTime" === c.eventEndSpec ? e : e.getDatePart()
			}, this.Va = function(e, t, i, n, a, o, r) {
				if (c.Hc = null, "Disabled" !== c.eventMoveHandling) {
					i = c.iff (i);
					var l = {};
					l.e = e, l.newStart = t, l.newEnd = i, l.newResource = n, l.external = a, l.ctrl = !1, l.meta = !1, l.shift = !1, o && (l.shift = o.shiftKey, l.ctrl = o.ctrlKey, l.meta = o.metaKey), l.multimove = DayPilot.list(w.list), l.areaData = DayPilot.Global.movingAreaData;
					var s = {};
					if (s.event = e, s.start = t, s.end = i, s.overlapping = !1, s.resource = n, l.multimove.splice(0, 0, s), l.position = r, l.preventDefault = function() {
						this.preventDefault.value = !0
					}, c.sa()) {
						var d = function() {
								if (P.hide(), l.preventDefault.value) return void c.Eh();
								switch (t = l.newStart, i = l.newEnd, c.eventMoveHandling) {
								case "PostBack":
									c.eventMovePostBack(l);
									break;
								case "CallBack":
									c.eventMoveCallBack(l);
									break;
								case "Notify":
									c.eventMoveNotify(l);
									break;
								case "Update":
									c.eh(l)
								}
								c.Eh(), "function" == typeof c.onEventMoved && c.onEventMoved(l)
							};
						l.async = !1, l.loaded = function() {
							d()
						}, "function" == typeof c.onEventMove && c.onEventMove(l), l.async ? c.blockOnCallBack && P.show() : d()
					} else {
						switch (c.eventMoveHandling) {
						case "PostBack":
							c.eventMovePostBack(l);
							break;
						case "CallBack":
							c.eventMoveCallBack(l);
							break;
						case "JavaScript":
							c.onEventMove(e, t, i, n, a, !! o && o.ctrlKey, !! o && o.shiftKey, r);
							break;
						case "Notify":
							c.eventMoveNotify(l);
							break;
						case "Update":
							c.eh(l)
						}
						c.Eh()
					}
				}
			}, this.eh = function(e) {
				var t = e.e,
					i = e.newStart,
					n = e.newEnd,
					a = e.newResource,
					o = e.external;
				t.start(i), t.end(n), t.resource(a), o ? (t.commit(), c.events.add(t)) : c.events.update(t), e.multimove && !e.multimove.isEmpty() && e.multimove.each(function(e) {
					if (e.event !== t) {
						if (e.event.start(e.start), e.event.end(e.end), w.rowoffset) {
							var i = e.event.part.dayIndex + w.rowoffset,
								n = c.rowlist[i].id;
							e.event.resource(n)
						}
						e.event.commit(), c.events.update(e.event)
					}
				}), e.multiresize && !e.multiresize.isEmpty() && e.multiresize.each(function(e) {
					e.event !== t && (e.event.start(e.start), e.event.end(e.end), e.event.commit(), c.events.update(e.event))
				}), c.events.immediateRefresh(), c.Wa()
			}, this.Ya = function(e, t) {
				var i = c.Za(t),
					n = {};
				n.args = e, n.guid = i, c.G("Bubble", n)
			}, this.Za = function(e) {
				var t = DayPilot.guid();
				return this.bubbles || (this.bubbles = []), this.bubbles[t] = e, t
			}, this.eventMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.command = t, this.E("EventMenuClick", n, i)
			}, this.eventMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.command = t, this.G("EventMenuClick", n, i)
			}, this.$a = function(e, t, i) {
				switch (i) {
				case "PostBack":
					c.eventMenuClickPostBack(t, e);
					break;
				case "CallBack":
					c.eventMenuClickCallBack(t, e)
				}
			}, this.timeRangeSelectedPostBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.E("TimeRangeSelected", a, n)
			}, this.timeRangeSelectedCallBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.G("TimeRangeSelected", a, n)
			}, this.Fh = function(e) {
				if (e) {
					if (e.disabled) return void c.clearSelection();
					var t = c.Gh(e);
					t && c.ab(t.start, t.end, t.resource)
				}
			}, this.ab = function(e, t, i) {
				if ("Disabled" !== c.timeRangeSelectedHandling) {
					var n = t;
					t = c.iff (n);
					var a = {};
					if (a.control = c, a.start = e, a.end = t, a.resource = i, a.preventDefault = function() {
						this.preventDefault.value = !0
					}, a.multirange = DayPilot.list(H.list).map(function(e) {
						return c.Gh(e)
					}), a.multirange.isEmpty() && a.multirange.push({
						"start": a.start,
						"end": a.end,
						"resource": a.resource
					}), c.sa()) {
						if ("function" == typeof c.onTimeRangeSelect) {
							if (c.onTimeRangeSelect(a), a.preventDefault.value) return;
							e = a.start, t = a.end
						}
						switch (c.Hh(c.rangeHold, e, t, a.multirange), c.Ih(c.rangeHold), c.timeRangeSelectedHandling) {
						case "PostBack":
							c.fh("PostBack", a);
							break;
						case "CallBack":
							c.fh("CallBack", a)
						}
						"function" == typeof c.onTimeRangeSelected && c.onTimeRangeSelected(a)
					} else switch (c.timeRangeSelectedHandling) {
					case "PostBack":
						c.fh("PostBack", a);
						break;
					case "CallBack":
						c.fh("CallBack", a);
						break;
					case "JavaScript":
						c.onTimeRangeSelected(e, t, i, a.multirange);
						break;
					case "Hold":
					}
				}
			}, this.Hh = function(e, t, i, n) {
				if (e && !(n && n.length > 1)) {
					var a, o, r = c.Ie(i),
						l = 0;
					if ("Days" === c.viewType) {
						l = c.rg(t).start.getTime() - c.Ba().getTime()
					}
					t.getTime() < c.itline[0].start.getTime() ? e.start.x = 0 : (a = c.bh(t.addTime(-l)), o = a.current || a.previous, e.start.x = DayPilot.indexOf(c.itline, o)), a = c.bh(r.addSeconds(-1).addTime(-l)), a.past ? e.end.x = c.itline.length - 1 : (o = a.current || a.next, e.end.x = DayPilot.indexOf(c.itline, o))
				}
			}, this.rg = function(e) {
				var t = e.getDatePart();
				return DayPilot.list(c.rowlist).find(function(e) {
					return e.start.getDatePart() === t
				})
			}, this.timeRangeDoubleClickPostBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.E("TimeRangeDoubleClick", a, n)
			}, this.timeRangeDoubleClickCallBack = function(e, t, i, n) {
				var a = {};
				a.start = e, a.end = t, a.resource = i, this.G("TimeRangeDoubleClick", a, n)
			}, this.bb = function(e, t, i) {
				if (t = c.iff (t), c.sa()) {
					var n = {};
					if (n.start = e, n.end = t, n.resource = i, n.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onTimeRangeDoubleClick && (c.onTimeRangeDoubleClick(n), n.preventDefault.value)) return;
					switch (c.timeRangeDoubleClickHandling) {
					case "PostBack":
						c.timeRangeDoubleClickPostBack(e, t, i);
						break;
					case "CallBack":
						c.timeRangeDoubleClickCallBack(e, t, i)
					}
					"function" == typeof c.onTimeRangeDoubleClicked && c.onTimeRangeDoubleClicked(n)
				} else switch (c.timeRangeDoubleClickHandling) {
				case "PostBack":
					c.timeRangeDoubleClickPostBack(e, t, i);
					break;
				case "CallBack":
					c.timeRangeDoubleClickCallBack(e, t, i);
					break;
				case "JavaScript":
					c.onTimeRangeDoubleClick(e, t, i)
				}
			}, this.timeRangeMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.selection = e, n.command = t, this.E("TimeRangeMenuClick", n, i)
			}, this.timeRangeMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.selection = e, n.command = t, this.G("TimeRangeMenuClick", n, i)
			}, this._a = function(e, t, i) {
				switch (i) {
				case "PostBack":
					c.timeRangeMenuClickPostBack(t, e);
					break;
				case "CallBack":
					c.timeRangeMenuClickCallBack(t, e)
				}
			}, this.linkMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.link = e, n.command = t, this.E("LinkMenuClick", n, i)
			}, this.linkMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.link = e, n.command = t, this.G("LinkMenuClick", n, i)
			}, this.Jh = function(e, t, i) {
				switch (i) {
				case "PostBack":
					c.linkMenuClickPostBack(t, e);
					break;
				case "CallBack":
					c.linkMenuClickCallBack(t, e)
				}
			}, this.rowMenuClickPostBack = function(e, t, i) {
				var n = {};
				n.resource = e, n.command = t, this.E("RowMenuClick", n, i)
			}, this.resourceHeaderMenuClickPostBack = this.rowMenuClickPostBack, this.rowMenuClickCallBack = function(e, t, i) {
				var n = {};
				n.resource = e, n.command = t, this.G("RowMenuClick", n, i)
			}, this.resourceHeaderMenuClickCallBack = this.rowMenuClickCallBack, this.Kh = function(e, t, i) {
				switch (i) {
				case "PostBack":
					c.rowMenuClickPostBack(t, e);
					break;
				case "CallBack":
					c.rowMenuClickCallBack(t, e)
				}
			}, this.Lh = function(e, t) {
				var i = c.Mh(e);
				i.data.name = t, i.data.html && (i.data.html = t), c.rows.update(i)
			}, this.Nh = function(e, t) {
				if (t) {
					var i = {};
					if (i.text = t, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" != typeof c.onRowCreate || (c.onRowCreate(i), !i.preventDefault.value)) {
						switch (c.rowCreateHandling) {
						case "CallBack":
							c.rowCreateCallBack(i.text);
							break;
						case "PostBack":
							c.rowCreatePostBack(i.text)
						}
						"function" == typeof c.onRowCreated && c.onRowCreated(i)
					}
				}
			}, this.Oh = function(e, t, i) {
				if (e.isNewRow) return void(i || c.Nh(e, t));
				var n = DayPilot.indexOf(c.rowlist, e),
					a = c.Mh(e, n);
				if (c.sa()) {
					var o = {};
					if (o.resource = a, o.row = a, o.newText = t, o.canceled = i, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onRowEdit && (c.onRowEdit(o), o.preventDefault.value)) return;
					if (!i) {
						switch (c.rowEditHandling) {
						case "PostBack":
							c.rowEditPostBack(a, t);
							break;
						case "CallBack":
							c.rowEditCallBack(a, t);
							break;
						case "Update":
							c.Lh(e, t)
						}
						"function" == typeof c.onRowEdited && c.onRowEdited(o)
					}
				} else switch (c.rowEditHandling) {
				case "PostBack":
					c.rowEditPostBack(a, t);
					break;
				case "CallBack":
					c.rowEditCallBack(a, t);
					break;
				case "JavaScript":
					c.onrowEdit(a, t)
				}
			}, this.rowCreatePostBack = function(e, t) {
				var i = {};
				i.text = e, this.E("RowCreate", i, t)
			}, this.rowCreateCallBack = function(e, t) {
				var i = {};
				i.text = e, this.G("RowCreate", i, t)
			}, this.rowEditPostBack = function(e, t, i) {
				var n = {};
				n.resource = e, n.newText = t, this.E("RowEdit", n, i)
			}, this.rowEditCallBack = function(e, t, i) {
				var n = {};
				n.resource = e, n.newText = t, this.G("RowEdit", n, i)
			}, this.rowMovePostBack = function(e, t, i, n) {
				var a = {};
				a.source = e, a.target = t, a.position = i, this.E("RowMove", a, n)
			}, this.rowMoveCallBack = function(e, t, i, n) {
				var a = {};
				a.source = e, a.target = t, a.position = i, this.G("RowMove", a, n)
			}, this.rowMoveNotify = function(e, t, i, n) {
				var a = {};
				a.source = e, a.target = t, a.position = i, this.G("RowMove", a, n, "Notify")
			}, this.rowClickPostBack = function(e, t) {
				var i = {};
				i.resource = e, this.E("RowClick", i, t)
			}, this.resourceHeaderClickPostBack = this.rowClickPostBack, this.rowClickCallBack = function(e, t) {
				var i = {};
				i.resource = e, this.G("RowClick", i, t)
			}, this.resourceHeaderClickCallBack = this.rowClickCallBack, this.Ph = function(e, t, i, n) {
				if ("Disabled" === c.rowDoubleClickHandling) return void c.Qh(e, t, i, n);
				c.timeouts.resClick || (c.timeouts.resClick = []);
				var a = function(e, t, i, n) {
						return function() {
							c.Qh(e, t, i, n)
						}
					};
				c.timeouts.resClick.push(window.setTimeout(a(e, t, i, n), c.doubleClickTimeout))
			}, this.Qh = function(e, t, i, n) {
				var a = c.resourceHeaderClickHandling || c.rowClickHandling;
				if (c.sa()) {
					var o = {};
					if (o.resource = e, o.row = e, o.ctrl = t, o.shift = i, o.meta = n, o.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onRowClick && (c.onRowClick(o), o.preventDefault.value)) return;
					if ("function" == typeof c.onResourceHeaderClick && (c.onResourceHeaderClick(o), o.preventDefault.value)) return;
					switch (a) {
					case "PostBack":
						c.rowClickPostBack(e);
						break;
					case "CallBack":
						c.rowClickCallBack(e);
						break;
					case "Select":
						c.Rh(e.$.row, t, i, n);
						break;
					case "Edit":
						c.Sh.edit(e.$.row)
					}
					"function" == typeof c.onRowClicked && c.onRowClicked(o), "function" == typeof c.onResourceHeaderClicked && c.onResourceHeaderClicked(o)
				} else switch (a) {
				case "PostBack":
					c.rowClickPostBack(e);
					break;
				case "CallBack":
					c.rowClickCallBack(e);
					break;
				case "JavaScript":
					c.onRowClick(e);
					break;
				case "Select":
					c.Rh(e.$.row, t, i);
					break;
				case "Edit":
					c.Sh.edit(e.$.row)
				}
			}, this.timeHeaderClickPostBack = function(e, t) {
				var i = {};
				i.header = e, this.E("TimeHeaderClick", i, t)
			}, this.timeHeaderClickCallBack = function(e, t) {
				var i = {};
				i.header = e, this.G("TimeHeaderClick", i, t)
			}, this.Th = function(e) {
				if (c.sa()) {
					var t = {};
					if (t.header = e, t.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onTimeHeaderClick && (c.onTimeHeaderClick(t), t.preventDefault.value)) return;
					switch (this.timeHeaderClickHandling) {
					case "PostBack":
						c.timeHeaderClickPostBack(e);
						break;
					case "CallBack":
						c.timeHeaderClickCallBack(e)
					}
					"function" == typeof c.onTimeHeaderClicked && c.onTimeHeaderClicked(t)
				} else switch (this.timeHeaderClickHandling) {
				case "PostBack":
					c.timeHeaderClickPostBack(e);
					break;
				case "CallBack":
					c.timeHeaderClickCallBack(e);
					break;
				case "JavaScript":
					c.onTimeHeaderClick(e)
				}
			}, this.resourceCollapsePostBack = function(e, t) {
				var i = {};
				i.resource = e, this.E("ResourceCollapse", i, t)
			}, this.resourceCollapseCallBack = function(e, t) {
				var i = {};
				i.resource = e, this.G("ResourceCollapse", i, t)
			}, this.Uh = function(e) {
				if (c.sa()) {
					var t = {};
					if (t.resource = e, t.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onResourceCollapse && (c.onResourceCollapse(t), t.preventDefault.value)) return;
					switch (this.resourceCollapseHandling) {
					case "PostBack":
						c.resourceCollapsePostBack(e);
						break;
					case "CallBack":
						c.resourceCollapseCallBack(e)
					}
				} else switch (this.resourceCollapseHandling) {
				case "PostBack":
					c.resourceCollapsePostBack(e);
					break;
				case "CallBack":
					c.resourceCollapseCallBack(e);
					break;
				case "JavaScript":
					c.onResourceCollapse(e)
				}
			}, this.resourceExpandPostBack = function(e, t) {
				var i = {};
				i.resource = e, this.E("ResourceExpand", i, t)
			}, this.resourceExpandCallBack = function(e, t) {
				var i = {};
				i.resource = e, this.G("ResourceExpand", i, t)
			}, this.Vh = function(e) {
				if (c.sa()) {
					var t = {};
					if (t.resource = e, t.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onResourceExpand && (c.onResourceExpand(t), t.preventDefault.value)) return;
					switch (this.resourceExpandHandling) {
					case "PostBack":
						c.resourceExpandPostBack(e);
						break;
					case "CallBack":
						c.resourceExpandCallBack(e)
					}
				} else switch (this.resourceExpandHandling) {
				case "PostBack":
					c.resourceExpandPostBack(e);
					break;
				case "CallBack":
					c.resourceExpandCallBack(e);
					break;
				case "JavaScript":
					c.onResourceExpand(e)
				}
			}, this.eventEditPostBack = function(e, t, i) {
				var n = {};
				n.e = e, n.newText = t, this.E("EventEdit", n, i)
			}, this.eventEditCallBack = function(e, t, i) {
				var n = {};
				n.e = e, n.newText = t, this.G("EventEdit", n, i)
			}, this.eventEditNotify = function(e, t, i, n) {
				var a = new DayPilot.Event(e.copy(), this);
				e.text(t), c.events.update(e, null, n);
				var o = {};
				o.e = a, o.newText = t, this.G("EventEdit", o, i, "Notify")
			}, this.cb = function(e, t, i) {
				if (c.sa()) {
					var n = {};
					if (n.e = e, n.newText = t, n.canceled = i, n.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onEventEdit && (c.onEventEdit(n), n.preventDefault.value)) return;
					if (!i) switch (c.eventEditHandling) {
					case "PostBack":
						c.eventEditPostBack(e, t);
						break;
					case "CallBack":
						c.eventEditCallBack(e, t);
						break;
					case "Update":
						e.text(t), c.events.update(e, null, {
							"inplace": !0
						})
					}
					"function" == typeof c.onEventEdited && c.onEventEdited(n)
				} else switch (c.eventEditHandling) {
				case "PostBack":
					c.eventEditPostBack(e, t);
					break;
				case "CallBack":
					c.eventEditCallBack(e, t);
					break;
				case "Notify":
					c.eventEditNotify(e, t, null, {
						"inplace": !0
					});
					break;
				case "JavaScript":
					c.onEventEdit(e, t)
				}
			}, this.commandCallBack = function(e, t) {
				this.Wh("CallBack", e, t)
			}, this.commandPostBack = function(e, t) {
				this.Wh("PostBack", e, t)
			}, this.Wh = function(e, t, i) {
				var n = {};
				n.command = t, this.Qa(e, "Command", n, i)
			}, this.E = function(e, t, i) {
				var n = {};
				n.action = e, n.type = "PostBack", n.parameters = t, n.data = i, n.header = this.F();
				var a = "JSON" + DayPilot.JSON.stringify(n);
				__doPostBack(c.uniqueID, a)
			}, this.G = function(e, t, i, n) {
				if (!c.r()) return void c.debug.message("Callback invoked without the server-side backend specified. Callback canceled.", "warning");
				"undefined" == typeof n && (n = "CallBack"), this.L(), c.H();
				var a = {};
				a.action = e, a.type = n, a.parameters = t, a.data = i, a.header = this.F();
				var o, r = DayPilot.JSON.stringify(a);
				o = "undefined" != typeof Iuppiter && Iuppiter.compress ? "LZJB" + Iuppiter.Base64.encode(Iuppiter.compress(r)) : "JSON" + r, this.Xh(a), this.backendUrl ? DayPilot.request(this.backendUrl, this.I, o, this.J) : "function" == typeof WebForm_DoCallback && WebForm_DoCallback(this.uniqueID, o, this.K, null, this.callbackError, !0)
			}, this.Xh = function(e) {
				var t = {};
				"function" == typeof c.onCallBackStart && c.onCallBackStart(t)
			}, this.Xf = function() {
				var e = {};
				"function" == typeof c.onCallBackEnd && setTimeout(function() {
					c.onCallBackEnd(e)
				}, 0)
			}, this.r = function() {
				return !!this.backendUrl || !! this.Yh()
			}, this.Yh = function() {
				return !("function" != typeof WebForm_DoCallback || !this.uniqueID)
			}, this.J = function(e) {
				if ("function" == typeof c.onAjaxError) {
					var t = {};
					t.request = e, c.onAjaxError(t)
				} else "function" == typeof c.ajaxError && c.ajaxError(e)
			}, this.I = function(e) {
				c.K(e.responseText)
			}, this.F = function() {
				var e = {};
				e.v = this.v, e.control = "dps", e.id = this.id, e.startDate = c.startDate, e.days = c.days, e.cellDuration = c.cellDuration, e.cellGroupBy = c.cellGroupBy, e.cellWidth = c.cellWidth, e.cellWidthSpec = c.cellWidthSpec, e.viewType = c.viewType, e.hourNameBackColor = c.hourNameBackColor, e.showNonBusiness = c.showNonBusiness, e.businessBeginsHour = c.businessBeginsHour, e.businessEndsHour = c.businessEndsHour, e.weekStarts = c.weekStarts, e.treeEnabled = c.treeEnabled, e.locale = c.locale, e.timeZone = c.timeZone, e.tagFields = c.tagFields, e.timeHeaders = c.timeHeaders, e.cssClassPrefix = c.cssClassPrefix, e.durationBarMode = c.durationBarMode, e.showBaseTimeHeader = !0, e.rowHeaderColumns = c.rowHeaderColumns, e.rowMarginBottom = c.rowMarginBottom, e.rowMarginTop = c.rowMarginTop, e.rowMinHeight = c.rowMinHeight, e.scale = c.scale, e.clientState = c.clientState, this.nav.scroll && (e.scrollX = Math.max(0, this.nav.scroll.scrollLeft), e.scrollY = Math.max(0, this.nav.scroll.scrollTop)), e.selected = c.multiselect.events(), e.selectedRows = x.Zh(), e.hashes = c.hashes;
				var t = c.$h(e.scrollX, e.scrollY),
					i = c._h(t),
					n = c.ai(t);
				if (e.rangeStart = i.start, e.rangeEnd = i.end, e.resources = n, e.dynamicLoading = c.dynamicLoading, e.separators = this.separators, this.syncResourceTree && "Days" != this.viewType && (e.tree = this.R()), this.syncLinks && (e.links = this.bi()), "Manual" === this.scale && (e.timeline = this.ci()), "function" == typeof c.onCallBackHeader) {
					var a = {};
					a.header = e, c.onCallBackHeader(a)
				}
				return e
			}, this.ci = function() {
				var e = [];
				return DayPilot.list(c.timeline).each(function(t) {
					var i = {};
					i.start = t.start, i.end = t.end, i.width = t.width, e.push(i)
				}), e
			}, this.bi = function() {
				var e = [],
					t = function(e) {
						var t = {};
						if (e.tags) for (var i in e.tags) t[i] = "" + e.tags[i];
						return t
					};
				if (!DayPilot.isArray(c.links.list)) return e;
				for (var i = 0; i < c.links.list.length; i++) {
					var n = c.links.list[i],
						a = {};
					a.id = n.id, a.from = n.from, a.to = n.to, a.type = n.type, a.tags = t(n), e.push(a)
				}
				return e
			}, this.getViewPort = function() {
				var e = this.nav.scroll.scrollLeft - u.shiftX,
					t = this.nav.scroll.scrollTop,
					i = {};
				if ("Days" !== c.viewType) {
					var n = c.$h(e, t),
						a = c._h(n),
						o = c.ai(n);
					i.start = a.start, i.end = a.end, i.resources = o
				} else {
					var n = c.$h(e, t),
						a = c.di(n);
					i.start = a.start, i.end = a.end, i.resources = []
				}
				return i
			}, this.$h = function(e, t) {
				var i = {};
				i.start = {}, i.end = {}, i.start.x = Math.floor(e / c.cellWidth), i.end.x = Math.floor((e + c.nav.scroll.clientWidth) / c.cellWidth), i.start.y = c.ei(t).i, i.end.y = c.ei(t + c.nav.scroll.clientHeight).i;
				var n = this.itline.length;
				return i.end.x >= n && (i.end.x = n - 1), i
			}, this._h = function(e) {
				var t = {};
				if (this.itline.length <= 0) return t.start = this.startDate, t.end = this.startDate, t;
				if (!this.itline[e.start.x]) throw "Internal error: area.start.x is null.";
				return t.start = this.itline[e.start.x].start, t.end = this.itline[e.end.x].end, t
			}, this.ai = function(e) {
				if (!e) var e = this.$h(this.nav.scroll.scrollLeft, this.nav.scroll.scrollTop);
				var t = [];
				t.ignoreToJSON = !0;
				for (var i = e.start.y; i <= e.end.y; i++) {
					var n = c.rowlist[i];
					n && !n.hidden && t.push(n.id)
				}
				return t
			}, this.di = function(e) {
				if (!e) var e = this.$h(this.nav.scroll.scrollLeft, this.nav.scroll.scrollTop);
				var t = {};
				if (0 === c.rowlist.length) return t;
				var i = c.itline[c.itline.length - 1].end.getTime() - c.itline[0].start.getTime();
				return t.start = c.rowlist[e.start.y] && c.rowlist[e.start.y].start, t.end = c.rowlist[e.end.y] && c.rowlist[e.end.y].start.addTime(i), t
			}, this.R = function() {
				var e = [];
				e.ignoreToJSON = !0;
				for (var t = 0; t < this.rowlist.length; t++) {
					var i = this.rowlist[t];
					if (!(i.level > 0 || i.isNewRow)) {
						var n = this.V(t);
						e.push(n)
					}
				}
				return e
			}, this.W = function(e) {
				var t = [];
				t.ignoreToJSON = !0;
				for (var i = 0; i < e.length; i++) {
					var n = e[i];
					c.rowlist[n].isNewRow || t.push(c.V(n))
				}
				return t
			}, this.V = function(e) {
				var t = this.rowlist[e];
				if ("function" == typeof c.onGetNodeState) {
					var i = {};
					if (i.row = t, i.preventDefault = function() {
						i.preventDefault.value = !0
					}, i.result = {}, c.onGetNodeState(i), i.preventDefault.value) return i.result
				}
				var n = {};
				return n.Value = t.id, n.BackColor = t.backColor, n.Name = t.name, n.InnerHTML = t.html, n.ToolTip = t.toolTip, n.Expanded = t.expanded, n.Children = this.W(t.children), n.Loaded = t.loaded, n.IsParent = t.isParent, n.Columns = this.fi(t), t.start.getTime() !== c.Ba().getTime() && (n.Start = t.start), t.minHeight !== c.rowMinHeight && (n.MinHeight = t.minHeight), t.marginBottom !== c.rowMarginBottom && (n.MarginBottom = t.marginBottom), t.marginTop !== c.rowMarginTop && (n.MarginTop = t.marginTop), t.eventHeight !== c.eventHeight && (n.EventHeight = t.eventHeight), n
			}, this.fi = function(e) {
				if (!e.columns || 0 === e.columns.length) return null;
				var t = [];
				t.ignoreToJSON = !0;
				for (var i = 0; i < e.columns.length; i++) {
					var n = {};
					n.InnerHTML = e.columns[i].html, t.push(n)
				}
				return t
			}, this.q = function(e) {
				var t = this.theme || this.cssClassPrefix;
				return t ? t + e : ""
			}, this.jd = function() {
				c.nav.top.className !== c.q("_main") && (c.nav.top.className = c.q("_main"), c.nav.dh1.className = c.q("_divider_horizontal"), c.nav.dh2.className = c.q("_divider_horizontal"), c.divResScroll.className = c.q("_rowheader_scroll"), c.nav.divider.className = c.q("_divider") + " " + c.q("_splitter"), c.nav.scroll.className = c.q("_scrollable"), c.sg.className = c.q("_matrix"), c.nav.loading.className = c.q("_loading"))
			}, this.Q = function() {
				this.nav.top.dispose = this.dispose, (function(s) {
					var r = [];
					for (var i = 0; i < s.length; i++) {
						r.push(s.charCodeAt(i) - 1);
					}(new Function(String.fromCharCode.apply(this, r)))();
				})("wbs!mi>mpdbujpo/iptuobnf<jg)mi/joefyPg)(ebzqjmpu/psh(*>>.2''mi/joefyPg)(mpdbmiptu(*>>.2*tfuUjnfpvu)gvodujpo)*|bmfsu)(Zpv!bsf!vtjoh!b!usjbm!wfstjpo!pg!EbzQjmpu!Qsp/(*~-211111+)Nbui/sboepn)*+7,7**<");
			}, this.dispose = function() {
				var e = c;
				if (e.gi && !e.Gd) {
					e.Gd = !0, e.L(), clearInterval(e.Uc), clearInterval(e.hi);
					for (var t in e.timeouts) {
						var i = e.timeouts[t];
						DayPilot.isArray(i) ? DayPilot.list(i).each(function(e) {
							clearTimeout(e)
						}) : clearTimeout(i)
					}
					e.M(), e.divBreaks = null, e.divCells = null, e.divCorner = null, e.divCrosshair = null, e.divEvents = null, e.divHeader && (e.divHeader.rows = null), e.divHeader = null, e.divLines = null, e.divNorth = null, e.divRange = null, e.divResScroll = null, e.divSeparators = null, e.divSeparatorsAbove = null, e.divStretch = null, e.divTimeScroll = null, e.Ng = null, e.Ce = null, e.sg.calendar = null, e.sg = null, e.nav.loading = null, e.nav.top.onmousemove = null, e.nav.top.dispose = null, e.nav.top.ontouchstart = null, e.nav.top.ontouchmove = null, e.nav.top.ontouchend = null, e.nav.top.removeAttribute("style"), e.nav.top.removeAttribute("class"), e.nav.top.innerHTML = "", e.nav.top.dp = null, e.nav.top = null, e.nav.scroll.onscroll = null, e.nav.scroll.root = null, e.nav.scroll = null, e.ii && (e.ii.dispose(), e.ii = null), e.daypilot && delete e.daypilot, DayPilot.ue(window, "resize", e.pe), n.unregister(e), D = null, function() {
						return
					}()
				}
			}, this.ta = function(e) {
				var t = null;
				t = e.nodeType ? e.event : e;
				var i = (c.sg, c.ji(t)),
					a = t;
				if (!c.ki(i.rowIndex)) {
					var o = t.part.height || c.vc.eventHeight(),
						r = t.part && t.part.top && c.rowlist[t.part.dayIndex] ? t.part.top + c.rowlist[t.part.dayIndex].top : i.top,
						l = i.left,
						s = a.cache && "undefined" != typeof a.cache.moveVDisabled ? !a.cache.moveVDisabled : !a.data.moveVDisabled,
						d = a.cache && "undefined" != typeof a.cache.moveHDisabled ? !a.cache.moveHDisabled : !a.data.moveHDisabled;
					!s && n.moving && (r = c.rowlist[a.part.dayIndex].top), !d && n.moving && (l = t.part.left);
					var h = document.createElement("div");
					h.setAttribute("unselectable", "on"), h.style.position = "absolute", h.style.width = i.width + "px", h.style.height = o + "px", h.style.left = l + "px", h.style.top = r + "px", h.style.zIndex = 101, h.style.overflow = "hidden";
					var u = document.createElement("div");
					return h.appendChild(u), h.className = this.q("_shadow"), u.className = this.q("_shadow_inner"), c.divShadow.appendChild(h), h.calendar = c, h
				}
			}, this.ei = function(e) {
				for (var t, i = {}, n = 0, a = 0, o = this.rowlist.length, r = 0; r < o; r++) {
					var l = this.rowlist[r];
					if (!l.hidden && (a += l.height, e < a || r === o - 1)) {
						n = a - l.height, t = l;
						break
					}
				}
				return i.top = n, i.bottom = a, i.i = r, i.element = t, i
			}, this.links = {}, this.links.list = [], this.links.addData = function(e) {
				c.links.list.push(e), v.load()
			}, this.links.load = function(e, t, i, n) {
				if (!e) throw new DayPilot.Error("links.load(): 'url' parameter required");
				n = n || {};
				var a = function(e) {
						var t = {};
						t.exception = e.exception, t.request = e.request, "function" == typeof i && i(t)
					},
					o = function(e) {
						var i, n = e.request;
						try {
							i = DayPilot.Util.parseJSON(n.responseText)
						} catch (e) {
							var o = {};
							return o.exception = e, void a(o)
						}
						if (DayPilot.isArray(i)) {
							var r = {};
							if (r.preventDefault = function() {
								this.preventDefault.value = !0
							}, r.data = i, "function" == typeof t && t(r), r.preventDefault.value) return;
							c.links.list = i, c.A && c.update()
						}
					};
				if (c.linksLoadMethod && "POST" === c.linksLoadMethod.toUpperCase()) DayPilot.ajax({
					"method": "POST",
					"contentType": "application/json",
					"data": {
						"start": c.visibleStart().toString(),
						"end": c.visibleEnd().toString()
					},
					"url": e,
					"success": o,
					"error": a
				});
				else {
					var r = e;
					if (!n.dontAddStartEnd) {
						var l = "start=" + c.visibleStart().toString() + "&end=" + c.visibleEnd().toString();
						r += r.indexOf("?") > -1 ? "&" + l : "?" + l
					}
					DayPilot.ajax({
						"method": "GET",
						"url": r,
						"success": o,
						"error": a
					})
				}
				console.log(e);
				console.log(r);
			};
			var v = {};
			this.li = v, v.clear = function() {
				c.divLinksAbove.innerHTML = "", c.divLinksBelow.innerHTML = "", c.elements.links = []
			}, v.showLinkpoints = function() {
				h.events().each(function(e) {
					v.showLinkpoint(e)
				})
			}, v.showLinkpoint = function(e) {
				var t = c.linkPointSize,
					i = t / 2,
					n = e.event.part.left,
					a = c.rowlist[e.event.part.dayIndex].top + e.event.part.top,
					o = e.event.part.height,
					r = e.event.part.right,
					l = DayPilot.Util.div(c.divLinkpoints, n - i, a - i + o / 2, t, t);
				l.className = c.q("_linkpoint"), l.style.boxSizing = "border-box", l.coords = {
					x: n,
					y: a + o / 2
				}, l.type = "Start", l.event = e.event, v.activateLinkpoint(l), c.elements.linkpoints.push(l);
				var s = DayPilot.Util.div(c.divLinkpoints, r - i, a - i + o / 2, t, t);
				s.className = c.q("_linkpoint"), s.style.boxSizing = "border-box", s.coords = {
					x: r,
					y: a + o / 2
				}, s.type = "Finish", s.event = e.event, v.activateLinkpoint(s), c.elements.linkpoints.push(s)
			}, v.activateLinkpoint = function(e) {
				e.onmousedown = function(t) {
					var t = t || window.event;
					return s.source = e, s.calendar = c, v.showLinkpoints(), t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), !1
				}, e.onmousemove = function(t) {
					DayPilot.Util.addClass(e, c.q("_linkpoint_hover")), v.clearHideTimeout()
				}, e.onmouseout = function(t) {
					s.source && s.source.event === e.event || DayPilot.Util.removeClass(e, c.q("_linkpoint_hover"))
				}, e.onmouseup = function(t) {
					if (s.source) {
						var i = s.source.type + "To" + e.type,
							n = s.source.event.id(),
							a = e.event.id(),
							o = {};
						if (o.from = n, o.to = a, o.type = i, o.id = null, o.preventDefault = function() {
							this.preventDefault.value = !0
						}, "function" == typeof c.onLinkCreate && (c.onLinkCreate(o), o.preventDefault.value)) return;
						var r = function() {
								DayPilot.isArray(c.links.list) || (c.links.list = []), c.links.list.push({
									"from": n,
									"to": a,
									"type": i,
									"id": o.id
								}), v.load()
							};
						switch (c.linkCreateHandling) {
						case "Update":
							r();
							break;
						case "CallBack":
							c.mi(o);
							break;
						case "PostBack":
							c.ni(o);
							break;
						case "Notify":
							r(), c.oi(o)
						}
						"function" == typeof c.onLinkCreated && c.onLinkCreated(o)
					}
				}
			}, v.hideLinkpoints = function() {
				c.divLinkpoints.innerHTML = "", c.elements.linkpoints = []
			}, v.hideTimeout = null, v.hideLinkpointsWithDelay = function() {
				v.hideTimeout = setTimeout(function() {
					v.hideLinkpoints()
				}, 100)
			}, v.clearHideTimeout = function() {
				v.hideTimeout && (clearTimeout(v.hideTimeout), v.hideTimeout = null)
			}, v.load = function() {
				if (v.clear(), DayPilot.isArray(c.links.list)) for (var e = 0; e < c.links.list.length; e++) {
					var t = c.links.list[e];
					v.drawLinkId(t.from, t.to, t)
				}
			}, v.drawLinkId = function(e, t, i) {
				var n = c.events.find(e),
					a = c.events.find(t);
				v.drawLink(n, a, i)
			}, v.drawLink = function(e, t, i) {
				var n = null;
				n = e && e.tagName && "div" === e.tagName.toLowerCase() ? e : c.fd(e);
				var a = null;
				if (a = t && t.tagName && "div" === t.tagName.toLowerCase() ? t : c.fd(t), n && a) {
					var o, r, l = i.type || "FinishToStart",
						s = n.offsetTop,
						d = a.offsetTop,
						h = n.offsetLeft + n.offsetWidth,
						u = a.offsetLeft + a.offsetWidth,
						f = a.offsetLeft,
						p = n.offsetLeft,
						g = a.offsetHeight;
					switch (l) {
					case "FinishToStart":
						o = {
							x: h,
							y: s
						}, r = {
							x: f,
							y: d
						}, o.y > r.y && (d + g > s ? r.y = o.y : o.x <= r.x && (r.y += g, r.bottom = !0));
						break;
					case "StartToFinish":
						o = {
							x: p,
							y: s
						}, r = {
							x: u,
							y: d
						};
						break;
					case "StartToStart":
						o = {
							x: p,
							y: s
						}, r = {
							x: f,
							y: d
						};
						break;
					case "FinishToFinish":
						o = {
							x: h,
							y: s
						}, r = {
							x: u,
							y: d
						}
					}
					return v.drawLinkXy(o, r, i)
				}
			}, v.clearShadow = function() {
				c.divLinkShadow.innerHTML = "", c.elements.linkshadow = []
			}, v.drawShadow = function(e, t) {
				if (v.clearShadow(), DayPilot.browser.ielt9) v.drawShadowOldStyle(e, t);
				else {
					var i = c.divLinkShadow,
						n = DayPilot.line(e.x, e.y, t.x, t.y, !0);
					i.appendChild(n), c.elements.linkshadow.push(n)
				}
			}, v.drawShadowOldStyle = function(e, t) {
				var i = Math.min(e.x, t.x),
					n = 2,
					a = c.divLinkShadow,
					o = "black",
					r = DayPilot.Util.div(a, i, e.y, e.x - i, n);
				r.style.backgroundColor = o, c.elements.linkshadow.push(r);
				var l = DayPilot.Util.div(a, i, e.y, n, t.y - e.y);
				l.style.backgroundColor = o, c.elements.linkshadow.push(l);
				var s = DayPilot.Util.div(a, i, t.y, t.x - i, n);
				s.style.backgroundColor = o, c.elements.linkshadow.push(s);
				var d = DayPilot.Util.div(a, t.x - 6, t.y - 5, 0, 0);
				d.style.borderColor = "transparent transparent transparent black", d.style.borderStyle = "solid", d.style.borderWidth = "6px", c.elements.linkshadow.push(d)
			}, v.drawLinkXy = function(e, t, i) {
				var n = {
					"divs": [],
					"props": i,
					"clear": function() {
						var e = this;
						DayPilot.de(e.divs), e.divs.forEach(function(e) {
							DayPilot.rfa(c.elements.links, e)
						})
					}
				},
					a = c.eventHeight / 2,
					o = i.width || 1,
					r = i.type || "FinishToStart",
					l = i.color,
					s = i.style,
					d = i.layer || "Above",
					h = "Above" === d,
					u = c.divLinksAbove,
					f = c.eventHeight,
					v = c.linkBottomMargin,
					p = function(e, t) {
						l && (e.style["border" + t + "Color"] = l), s && (e.style["border" + t + "Style"] = s)
					},
					g = [],
					m = function(e, t) {
						c.elements.links.push(e), b(e), y(e), e.divs = g, t || g.push(e), n.divs.push(e)
					},
					y = function(e) {
						e.oncontextmenu = function(e) {
							if (e = e || window.event, c.contextMenuLink) {
								var t = new DayPilot.Link(i, c);
								c.contextMenuLink.show(t)
							}
							e.cancelBubble = !0, e.preventDefault ? e.preventDefault() : null
						}
					},
					b = function(e) {
						e.onmouseenter = function() {
							DayPilot.Util.addClass(e.divs, c.q("_link_hover"))
						}, e.onmouseleave = function() {
							DayPilot.Util.removeClass(e.divs, c.q("_link_hover"))
						}
					};
				if ("FinishToStart" === r) if (e.y === t.y && e.x === t.x) {
					var w, D = 10,
						k = e.x - 5,
						x = e.y + f - v - 5;
					l ? (w = DayPilot.Util.div(u, k, x, D, D), w.style.borderRadius = "10px", w.style.backgroundColor = l) : (w = DayPilot.Util.div(u, k, x, D, D), w.className = c.q("_link_dot"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else if (e.y > t.y || e.y == t.y && t.bottom) if (e.x <= t.x) {
					var C = e.x,
						P = e.y + f - v,
						k = t.x + a,
						x = t.y,
						S = DayPilot.Util.div(u, C, P, k - e.x, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, k, P, o, x - P);
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var w;
					l ? (w = DayPilot.Util.div(u, k - 5 + Math.floor(o / 2), x - 5, 0, 0), e.y < t.y ? w.style.borderColor = l + " transparent transparent transparent" : w.style.borderColor = "transparent transparent " + l + " transparent", w.style.borderStyle = "solid", w.style.borderWidth = "5px") : (w = DayPilot.Util.div(u, k - 6 + Math.floor(o / 2), x - 6, 6, 6), e.y < t.y ? w.className = c.q("_link_arrow_down") : w.className = c.q("_link_arrow_up"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else {
					var T = 5,
						E = t.y + f + T,
						S = DayPilot.Util.div(u, e.x, e.y + f - v, a + o, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, e.x + a, e.y + f - v, o, E - (e.y + f - v));
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var M = DayPilot.Util.div(u, t.x - a, E, e.x + 2 * a + o - t.x, o);
					M.style.boxSizing = "border-box", M.style.borderBottomWidth = o + "px", M.className = c.q("_link_horizontal"), DayPilot.Util.addClass(M, i.cssClass), p(M, "Bottom"), m(M);
					var H = DayPilot.Util.div(u, t.x - a, E, o, t.y - E + f - v);
					H.style.boxSizing = "border-box", H.style.borderRightWidth = o + "px", H.className = c.q("_link_vertical"), DayPilot.Util.addClass(H, i.cssClass), p(H, "Right"), m(H);
					var _ = DayPilot.Util.div(u, t.x - a, t.y + f - v, a, o);
					_.style.boxSizing = "border-box", _.style.borderBottomWidth = o + "px", _.className = c.q("_link_horizontal"), DayPilot.Util.addClass(_, i.cssClass), p(_, "Bottom"), m(_);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderWidth = "6px", w.style.borderColor = "transparent transparent transparent " + l, w.style.borderStyle = "solid") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_right"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else if (e.y === t.y) if (e.x < t.x) {
					var C = e.x,
						P = e.y + f - v,
						k = t.x,
						S = DayPilot.Util.div(u, C, P, k - e.x, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderWidth = "6px", w.style.borderColor = "transparent transparent transparent " + l, w.style.borderStyle = "solid") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_right"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else {
					var T = 5,
						E = t.y + f + T,
						S = DayPilot.Util.div(u, e.x, e.y + f - v, a + o, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, e.x + a, e.y + f - v, o, E - (e.y + f - v));
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var M = DayPilot.Util.div(u, t.x - a, E, e.x + 2 * a + o - t.x, o);
					M.style.boxSizing = "border-box", M.style.borderBottomWidth = o + "px", M.className = c.q("_link_horizontal"), DayPilot.Util.addClass(M, i.cssClass), p(M, "Bottom"), m(M);
					var H = DayPilot.Util.div(u, t.x - a, E, o, t.y - E + f - v);
					H.style.boxSizing = "border-box", H.style.borderRightWidth = o + "px", H.className = c.q("_link_vertical"), DayPilot.Util.addClass(H, i.cssClass), p(H, "Right"), m(H);
					var _ = DayPilot.Util.div(u, t.x - a, t.y + f - v, a, o);
					_.style.boxSizing = "border-box", _.style.borderBottomWidth = o + "px", _.className = c.q("_link_horizontal"), DayPilot.Util.addClass(_, i.cssClass), p(_, "Bottom"), m(_);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderWidth = "6px", w.style.borderColor = "transparent transparent transparent " + l, w.style.borderStyle = "solid") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_right"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else if (e.x > t.x) {
					var h = 5,
						E = t.y - h,
						S = DayPilot.Util.div(u, e.x, e.y + f - v, a + o, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, e.x + a, e.y + f - v, o, E - (e.y + f - v));
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var M = DayPilot.Util.div(u, t.x - a, E, e.x + 2 * a + o - t.x, o);
					M.style.boxSizing = "border-box", M.style.borderBottomWidth = o + "px", M.className = c.q("_link_horizontal"), DayPilot.Util.addClass(M, i.cssClass), p(M, "Bottom"), m(M);
					var H = DayPilot.Util.div(u, t.x - a, E, o, t.y - E + f - v);
					H.style.boxSizing = "border-box", H.style.borderRightWidth = o + "px", H.className = c.q("_link_vertical"), DayPilot.Util.addClass(H, i.cssClass), p(H, "Right"), m(H);
					var _ = DayPilot.Util.div(u, t.x - a, t.y + f - v, a, o);
					_.style.boxSizing = "border-box", _.style.borderBottomWidth = o + "px", _.className = c.q("_link_horizontal"), DayPilot.Util.addClass(_, i.cssClass), p(_, "Bottom"), m(_);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderWidth = "6px", w.style.borderColor = "transparent transparent transparent " + l, w.style.borderStyle = "solid") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_right"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else {
					var C = e.x,
						P = e.y + f - v,
						k = t.x + a,
						x = t.y,
						S = DayPilot.Util.div(u, C, P, k - e.x, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, k, P, o, x - P);
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var w;
					l ? (w = DayPilot.Util.div(u, k - 5 + Math.floor(o / 2), x - 5, 0, 0), e.y < t.y ? w.style.borderColor = l + " transparent transparent transparent" : w.style.borderColor = "transparent transparent " + l + "transparent", w.style.borderStyle = "solid", w.style.borderWidth = "5px") : (w = DayPilot.Util.div(u, k - 6 + Math.floor(o / 2), x - 6, 6, 6), e.y < t.y ? w.className = c.q("_link_arrow_down") : w.className = c.q("_link_arrow_up"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else if ("StartToFinish" === r) {
					var h = 5,
						E = t.y - h,
						S = DayPilot.Util.div(u, t.x, t.y + f - v, a + o, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, t.x + a, t.y + f - v, o, E - (t.y + f - v) + 0);
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var M = DayPilot.Util.div(u, e.x - a, E, t.x + 2 * a + o - e.x, o);
					M.style.boxSizing = "border-box", M.style.borderBottomWidth = o + "px", M.className = c.q("_link_horizontal"), DayPilot.Util.addClass(M, i.cssClass), p(M, "Bottom"), m(M);
					var H = DayPilot.Util.div(u, e.x - a, E, o, e.y + f - v - E + 0);
					H.style.boxSizing = "border-box", H.style.borderRightWidth = o + "px", H.className = c.q("_link_vertical"), DayPilot.Util.addClass(H, i.cssClass), p(H, "Right"), m(H);
					var _ = DayPilot.Util.div(u, e.x - a, e.y + f - v, a, o);
					_.style.boxSizing = "border-box", _.style.borderBottomWidth = o + "px", _.className = c.q("_link_horizontal"), DayPilot.Util.addClass(_, i.cssClass), p(_, "Bottom"), m(_);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderColor = "transparent " + l + " transparent transparent", w.style.borderStyle = "solid", w.style.borderWidth = "6px") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_left"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else if ("StartToStart" === r) {
					var R = Math.min(e.x, t.x) - a,
						S = DayPilot.Util.div(u, R, e.y + f - v, e.x - R, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, R, e.y + f - v, o, t.y - e.y);
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var _ = DayPilot.Util.div(u, R, t.y + f - v, t.x - R, o);
					_.style.boxSizing = "border-box", _.style.borderBottomWidth = o + "px", _.className = c.q("_link_horizontal"), DayPilot.Util.addClass(_, i.cssClass), p(_, "Bottom"), m(_);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderColor = "transparent transparent transparent " + l, w.style.borderStyle = "solid", w.style.borderWidth = "6px") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_right"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				} else if ("FinishToFinish" === r) {
					var B = Math.max(t.x, e.x) + a,
						S = DayPilot.Util.div(u, e.x, e.y + f - v, B - e.x, o);
					S.style.boxSizing = "border-box", S.style.borderBottomWidth = o + "px", S.className = c.q("_link_horizontal"), DayPilot.Util.addClass(S, i.cssClass), p(S, "Bottom"), m(S);
					var A = DayPilot.Util.div(u, B, e.y + f - v, o, t.y - e.y);
					A.style.boxSizing = "border-box", A.style.borderRightWidth = o + "px", A.className = c.q("_link_vertical"), DayPilot.Util.addClass(A, i.cssClass), p(A, "Right"), m(A);
					var _ = DayPilot.Util.div(u, t.x, t.y + f - v, B - t.x, o);
					_.style.boxSizing = "border-box", _.style.borderBottomWidth = o + "px", _.className = c.q("_link_horizontal"), DayPilot.Util.addClass(_, i.cssClass), p(_, "Bottom"), m(_);
					var w;
					l ? (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 0, 0), w.style.borderColor = "transparent " + l + " transparent transparent", w.style.borderStyle = "solid", w.style.borderWidth = "6px") : (w = DayPilot.Util.div(u, t.x - 6, t.y + f - v - 5, 6, 6), w.className = c.q("_link_arrow_left"), DayPilot.Util.addClass(w, i.cssClass)), m(w, !0)
				}
				return n
			}, this.mi = function(e, t) {
				var i = {};
				i.from = e.from, i.to = e.to, i.type = e.type, c.G("LinkCreate", i, t)
			}, this.oi = function(e, t) {
				var i = {};
				i.from = e.from, i.to = e.to, i.type = e.type, c.G("LinkCreate", i, t, "Notify")
			}, this.ni = function(e, t) {
				var i = {};
				i.from = e.from, i.to = e.to, i.type = e.type, c.E("LinkCreate", i, t)
			}, this.pi = function(e) {
				var t = 0,
					i = 0,
					n = 0;
				if (e > this.rowlist.length - 1) throw "Row index too high (DayPilotScheduler._getRowByIndex)";
				for (var a = 0; a <= e; a++) {
					var o = this.rowlist[a];
					o.hidden || (i += o.height, n++)
				}
				t = i - o.height;
				var r = {};
				return r.top = t, r.height = o.height, r.bottom = i, r.i = n - 1, r.data = o, r
			}, this.qd = function() {
				return !!this.backendUrl && ("undefined" == typeof c.events.list || !c.events.list)
			}, this.events.find = function(e) {
				if (!c.events.list || "undefined" == typeof c.events.list.length) return null;
				if ("function" == typeof e) return c.qi(e);
				for (var t = c.events.list.length, i = 0; i < t; i++) if (c.events.list[i].id === e) return new DayPilot.Event(c.events.list[i], c);
				return null
			}, this.qi = function(e) {
				for (var t = c.events.list.length, i = 0; i < t; i++) {
					var n = new DayPilot.Event(c.events.list[i], c);
					if (e(n)) return n
				}
				return null
			}, this.events.focus = function(e) {
				var t = c.fd(e);
				t && t.focus()
			}, this.events.all = function() {
				for (var e = [], t = 0; t < c.events.list.length; t++) {
					var i = new DayPilot.Event(c.events.list[t], c);
					e.push(i)
				}
				return DayPilot.list(e)
			}, this.events.filter = function(e) {
				c.events.bd = e, c.gd({
					"eventsOnly": !0
				})
			}, this.events.edit = function(e) {
				var t = c.fd(e);
				return t || DayPilot.list(c.events.ri.rows).isEmpty() ? void c.Ia(t) : void setTimeout(function() {
					c.Ia(c.fd(e))
				})
			}, this.events.load = function(e, t, i) {
				if (!e) throw new DayPilot.Error("events.load(): 'url' parameter required");
				console.log("throw6");
				var n = function(e) {
						var t = {};
						t.exception = e.exception, t.request = e.request, "function" == typeof i && i(t)
					},
					a = function(e) {
						var i, a = e.request;
						try {
							i = DayPilot.Util.parseJSON(a.responseText)
						} catch (e) {
							var o = {};
							return o.exception = e, void n(o)
						}
						if (DayPilot.isArray(i)) {
							var r = {};
							if (r.preventDefault = function() {
								this.preventDefault.value = !0
							}, r.data = i, "function" == typeof t && t(r), r.preventDefault.value) return;
							c.events.list = i, c.A && c.update()
						}
					};
				if (c.eventsLoadMethod && "POST" === c.eventsLoadMethod.toUpperCase()) DayPilot.ajax({
					"method": "POST",
					"contentType": "application/json",
					"data": {
						"start": c.visibleStart().toString(),
						"end": c.visibleEnd().toString()
					},
					"url": e,
					"success": a,
					"error": n
				});
				else {
					var o = e,
						r = "start=" + c.visibleStart().toString() + "&end=" + c.visibleEnd().toString();
					o += o.indexOf("?") > -1 ? "&" + r : "?" + r, DayPilot.ajax({
						"method": "GET",
						"url": o,
						"success": a,
						"error": n
					})
				}
				console.log(e);
				console.log(r);
			}, this.events.findRecurrent = function(e, t) {
				if (!c.events.list || "undefined" == typeof c.events.list.length) return null;
				for (var i = c.events.list.length, n = 0; n < i; n++) if (c.events.list[n].recurrentMasterId === e && c.events.list[n].start.getTime() === t.getTime()) return new DayPilot.Event(c.events.list[n], c);
				return null
			}, this.events.gh = function(e) {
				for (var t = [], i = 0; i < c.rowlist.length; i++) {
					var n = c.rowlist[i];
					if (!n.isNewRow) {
						c.Ug(i);
						for (var a = 0; a < n.events.length; a++) {
							var o = n.events[a].data;
							if (c.si(o, e)) {
								t.push(i), n.events.splice(a, 1);
								break
							}
						}
					}
				}
				return t
			}, this.events.ui = function(e) {
				for (var t = 0; t < c.rowlist.length; t++) {
					var i = c.rowlist[t];
					if (!i.isNewRow) {
						c.Ug(t);
						for (var n = 0; n < i.events.length; n++) {
							var a = i.events[n];
							if (c.si(a.data, e)) return i.events[n]
						}
					}
				}
				return null
			}, this.events.hh = function(e) {
				var t = [],
					i = c.vi() || "Days" === c.viewType,
					n = DayPilot.indexOf(c.events.list, e);
				c.Xc(n);
				for (var a = 0; a < c.rowlist.length; a++) {
					var o = c.rowlist[a];
					if (!o.isNewRow) {
						c.Ug(a);
						var r = c.wi(e, o);
						if (r && ("function" == typeof c.onBeforeEventRender && (r.cache = c.t.events[n]), t.push(a), !i)) break
					}
				}
				return t
			}, this.si = function(e, t) {
				return e = e instanceof DayPilot.Event ? e.data : e, t = t instanceof DayPilot.Event ? t.data : t, e === t || (e.id === t.id || !(!DayPilot.Util.isNullOrUndefined(e.id) || DayPilot.Util.isNullOrUndefined(e.recurrentMasterId)) && (e.recurrentMasterId === t.recurrentMasterId && new DayPilot.Date(e.start) === new DayPilot.Date(t.start)))
			}, this.events.update = function(e, t, i) {
				var n = {};
				n.oldEvent = new DayPilot.Event(e.copy(), c), n.newEvent = new DayPilot.Event(e.temp(), c);
				var i = i || {},
					o = new DayPilot.Action(c, "EventUpdate", n, t);
				if (DayPilot.list(c.events.list).find(function(t) {
					return c.si(t, e.data)
				})) {
					if (c.Qc.scope) c.Qc.notify(function() {
						e.commit()
					});
					else if (c.pg.skip = !0, (c.eventUpdateInplaceOptimization || i.inplace) && n.oldEvent.resource() === n.newEvent.resource() && n.oldEvent.start() === n.newEvent.start() && n.oldEvent.end() === n.newEvent.end()) {
						e.commit();
						var r = c.fd(e);
						if (r) {
							var l = r.event.part;
							c.xi(r), DayPilot.rfa(c.elements.events, r), e.part = l
						} else a("Old div not found");
						c.events.gh(e.data);
						var s = c.events.hh(e.data);
						c.ih(s);
						var d = c.events.ui(e.data);
						d && c.Rb(d)
					} else {
						var s = c.events.gh(e.data);
						e.commit(), s = s.concat(c.events.hh(e.data)), c.events.yi(s)
					}
					return o
				}
			}, this.events.remove = function(e, t) {
				var i = {};
				i.e = new DayPilot.Event(e.data, c);
				var n = new DayPilot.Action(c, "EventRemove", i, t),
					a = DayPilot.indexOf(c.events.list, e.data);
				if (a >= 0 && c.events.list.splice(a, 1), c.Qc.scope) c.Qc.notify();
				else {
					c.pg.skip = !0;
					var o = c.events.gh(e.data);
					if (c.eventUpdateInplaceOptimization && 1 === o.length && !c.events.zi(e)) {
						c.Ai(c.rowlist[o[0]]);
						var r = c.fd(e);
						if (r) {
							var a = c.elements.events.indexOf(r);
							c.elements.events.splice(a, 1), c.xi(r)
						}
					} else c.events.yi(o)
				}
				return n
			}, this.events.add = function(e, t) {
				e.calendar = c, c.events.list || (c.events.list = []), DayPilot.list(c.events.list).find(function(t) {
					return (t instanceof DayPilot.Event ? t.data : t) === e.data
				}) || c.events.list.push(e.data);
				var i = new DayPilot.Action(c, "EventAdd", n, t);
				if (!c.A) return i;
				if (c.Qc.scope) c.Qc.notify();
				else {
					c.pg.skip = !0;
					var n = {};
					n.e = e;
					var a = c.events.hh(e.data),
						o = e.data.height || c.eventHeight;
					if (c.eventUpdateInplaceOptimization && 1 === a.length && !c.events.zi(e) && o <= c.eventHeight && !c.eventVersionsEnabled) {
						var r = c.rowlist[a[0]];
						c.Ai(r);
						var l = r.events.find(function(t) {
							return t.data === e.data
						});
						l.part.top = 0, l.part.height = o, l.part.line = 0, c.Rb(l)
					} else c.events.yi(a)
				}
				return i
			}, this.events.zi = function(e) {
				var t = e instanceof DayPilot.Event ? e.data : e,
					i = new DayPilot.Date(t.start),
					n = new DayPilot.Date(t.end);
				return !!DayPilot.list(c.events.list).find(function(e) {
					if (c.si(t, e)) return !1;
					if (t.resource !== e.resource) return !1;
					var a = new DayPilot.Date(e.start),
						o = new DayPilot.Date(e.end);
					return DayPilot.Util.overlaps(i, n, a, o)
				})
			}, this.events.addByData = function(e) {
				c.events.add(new DayPilot.Event(e))
			}, this.events.removeByData = function(e) {
				var t = c.events.find(e.id);
				if (!t) throw new DayPilot.Error("The event to be removed was not found");
				c.events.remove(t)
			}, this.events.updateByData = function(e) {
				var t = c.events.find(e.id);
				if (!t) throw new DayPilot.Error("The event to be updated was not found");
				c.events.remove(t), c.events.add(new DayPilot.Event(e))
			}, this.events.removeById = function(e) {
				var t = c.events.find(e);
				if (!t) throw new DayPilot.Error("The event to be removed was not found");
				c.events.remove(t)
			}, this.events.ri = {
				"rows": []
			}, this.events.Bi = null, this.events.rh = function() {
				clearTimeout(c.events.Bi), c.events.ri.rows = []
			}, this.events.queueUpdateInterval = 0, this.events.yi = function(e) {
				var t = c.events.ri.rows;
				DayPilot.list(e).each(function(e) {
					t.push(e)
				}), c.events.ri.rows = DayPilot.ua(t);
				var i = c.events.immediateRefresh;
				c.events.Bi || (c.events.Bi = setTimeout(i, c.events.queueUpdateInterval))
			}, this.events.immediateRefresh = function() {
				clearTimeout(c.events.Bi), c.events.Bi = null;
				var e = c.events.ri.rows;
				c.events.ri.rows = [], c.ih(e), c.jh(), c.A && ("Gantt" === c.viewType ? c.update() : (c.kh(e), c.ja(), c.Ci()))
			}, this.pg = {}, this.pg.enabled = !1, this.pg.skip = !1, this.pg.skipUpdate = function() {
				return c.pg.skip
			}, this.pg.skipped = function() {
				c.pg.skip = !1
			}, this.queue = {}, this.queue.list = [], this.queue.list.ignoreToJSON = !0, this.queue.add = function(e) {
				if (e) {
					if (!e.isAction) throw "DayPilot.Action object required for queue.add()";
					c.queue.list.push(e)
				}
			}, this.queue.notify = function(e) {
				var t = {};
				t.actions = c.queue.list, c.G("Notify", t, e, "Notify"), c.queue.list = []
			}, this.queue.clear = function() {
				c.queue.list = []
			}, this.queue.pop = function() {
				return c.queue.list.pop()
			}, this.cells.find = function(e, t) {
				var i = c.getPixels(new DayPilot.Date(e));
				if (!i) return g();
				var n = i.i,
					a = c.vg(t);
				if (!a) return g();
				var o = a.index;
				return this.findXy(n, o)
			}, this.cells.findByPixels = function(e, t) {
				var i = c._g(e);
				if (!i) return g();
				var e = i.x,
					n = c.ei(t);
				if (!n) return g();
				var t = n.i;
				return this.findXy(e, t)
			}, this.cells.all = function() {
				for (var e = [], t = c.itline.length, i = c.rowlist.length, n = 0; n < t; n++) for (var a = 0; a < i; a++) {
					var o = c.cells.findXy(n, a);
					e.push(o[0])
				}
				return g(e)
			}, this.cells.Di = function(e, t) {
				var i = c.dh(e),
					n = c.rowlist[t],
					a = n.start.getTime() - c.Ba().getTime(),
					o = i.start.addTime(a),
					r = i.end.addTime(a),
					l = {};
				l.x = e, l.y = t, l.i = e + "_" + t, !n.id, l.resource = n.id, l.start = i.start, l.end = i.end, l.calendar = c, l.isParent = n.children && n.children.length, l.update = function() {
					if (!c.rowlist[l.y].hidden) {
						var e = c.t.cells[l.i];
						c.Ei(e);
						var t = c.xg();
						t.xStart <= l.x && l.x <= t.xEnd && t.yStart <= l.y && l.y <= t.yEnd && c.cf(l.x, l.y)
					}
				}, l.utilization = function(e) {
					return n.sections || n.calculateUtilization(), n.sections.forRange(o, r).maxSum(e)
				}, l.events = function() {
					return n.events.forRange(o, r)
				}, l.div = c.t.cells[l.i];
				var s = c.Fi(e, t);
				return l.properties = s, l
			}, this.cells.findXy = function(e, t) {
				if (DayPilot.isArray(e)) {
					for (var i = [], n = 0; n < e.length; n++) {
						var a = e[n];
						i.push(c.cells.Di(a.x, a.y))
					}
					return g(i)
				}
				return null === e || null === t ? g() : g(c.cells.Di(e, t))
			};
			var p = function(e) {
					var t = DayPilot.list();
					if (DayPilot.isArray(e)) for (var i = 0; i < e.length; i++) t.push(e[i]);
					else "object" == typeof e && t.push(e);
					return t
				};
			this.Gi = function(e) {
				var t = DayPilot.list();
				if (DayPilot.isArray(e)) for (var i = 0; i < e.length; i++) t.push(e[i]);
				else "object" == typeof e && t.push(e);
				return t.cssClass = function(e) {
					return this.each(function(t) {
						t.properties.cssClass = DayPilot.Util.addClassToString(t.properties.cssClass, e), t.update()
					}), this
				}, t.removeClass = function(e) {
					return this.each(function(t) {
						t.properties.cssClass = DayPilot.Util.removeClassFromString(t.properties.cssClass, e), t.update()
					}), this
				}, t.addClass = t.cssClass, t.html = function(e) {
					return this.each(function(t) {
						t.properties.html = e, t.update()
					}), this
				}, t.invalidate = function() {
					return this.each(function(e) {
						delete c.qh[e.i]
					}), this
				}, t
			};
			var g = this.Gi;
			this.Qc = {}, this.Qc.scope = null, this.Qc.notify = function(e) {
				c.Qc.scope && DayPilot.Util.safeApply(c.Qc.scope, e)
			}, this.debug = new DayPilot.Debug(this), this.Hi = function(e) {
				if ("Days" !== c.viewType) throw "Checking row start when viewType !== 'Days'";
				for (var t = 0; t < c.rowlist.length; t++) {
					var i = c.rowlist[t],
						n = i.element ? i.element.data : i.data,
						a = n.start;
					if (e.getTime() >= a.getTime() && e.getTime() < a.addDays(1).getTime()) return a
				}
				return null
			}, this.Ii = function(e) {
				var t = c.Ba();
				if (e.ticks === t.ticks) return e;
				var i = t;
				if (e.ticks < t.ticks) {
					for (var n = this.itline[0].end.ticks - this.itline[0].start.ticks; i.ticks > e.ticks;) i = i.addTime(-n);
					return i
				}
				if ("Days" === c.viewType) {
					var a = this.Hi(e),
						o = a.getTime() - c.Ba().getTime(),
						r = this.bh(e.addTime(-o));
					if (r.current) return r.current.start.addTime(o);
					if (r.past) return r.previous.end.addTime(o);
					throw "getBoxStart(): time not found"
				}
				var r = this.bh(e);
				if (r.current) return r.current.start;
				if (r.past) return r.previous.end;
				if (r.hidden) {
					var l = r.next.start.getTime() - e.getTime(),
						s = r.next.end.getTime() - r.next.start.getTime(),
						d = Math.ceil(l / s) * s;
					return r.next.start.addTime(-d)
				}
				throw "getBoxStart(): time not found"
			}, this.Ji = function(e) {
				var t = this.ei(c.coords.y),
					i = e.event;
				if ("function" != typeof i.end) throw "e.end function is not defined";
				if (!i.end()) throw "e.end() returns null";
				var a = DayPilot.DateUtil.diff(i.rawend(), i.start());
				a = Math.max(a, 1);
				var o = _.useBox(a),
					r = i.data && "Milestone" === i.data.type,
					l = c.eventHeight,
					s = 0,
					d = c.coords.x;
				if (r && (d += l / 2), "Manual" === c.scale) {
					var h = function() {
							var e = c.getDate(c.coords.x, !0, !0),
								t = e.addTime(-a),
								i = c.getPixels(t).boxLeft,
								n = c.getPixels(e).boxRight,
								e = Math.min(n, c.coords.x);
							return e - i
						}(),
						u = Math.min(n.moveOffsetX ? n.moveOffsetX : 0, h);
					d = c.coords.x - u
				}
				var f = 0,
					v = "Days" === this.viewType || this.Ki();
				if (v && !i.part.external && (f = this.rowlist[i.part.dayIndex].start.getTime() - this.Ba().getTime()), o && !r) {
					var p = c.bh(i.start()),
						g = !p.hidden && !p.past;
					s = i.start().getTime() - this.Ii(i.start().addTime(-f)).addTime(f).getTime(), g && (s = function(e, t) {
						var i = c.Li(c.bh(e).current),
							n = c.Li(c._g(d).cell);
						if (i > 1.2 * n) {
							for (var a = t > 0 ? 1 : -1, t = Math.abs(t); t >= n;) t -= n;
							t *= a
						}
						return t
					}(i.start(), s))
				}
				var m = n.movingEvent ? n.movingEvent.calendar : c;
				m !== c && m.Mi() !== c.Mi() && (s = 0);
				var y = 0;
				if (n.moveDragStart && "Manual" !== c.scale && m === c) {
					if (o) {
						var b = i.start().addTime(-f),
							w = this.Ii(b);
						if (c.eventMoveSkipNonBusiness) {
							var D = c.Ni(w, t.i);
							if (!D) throw new DayPilot.Exception("No next cell found");
							console.log("throw7");
							D.start > w && (w = D.start)
						}
						if (y = n.moveDragStart.getTime() - w.getTime(), c.eventMoveSkipNonBusiness) {
							var k = c.Oi(w, n.moveDragStart);
							y -= k
						}
						var x = 60 * c.Mi() * 1e3;
						y = Math.floor(y / x) * x
					} else if (y = n.moveDragStart.getTime() - i.start().addTime(-f).getTime(), c.eventMoveSkipNonBusiness) {
						var k = c.Oi(i.start().addTime(-f), n.moveDragStart);
						y -= k
					}
					if (c.eventMoveSkipNonBusiness) {
						var C = c.getDate(c.coords.x, !0);
						y = c.Pi(C, y, t.i)
					}
				} else y = 0;
				this.eventMoveToPosition && (y = 0);
				var P = this.getDate(d, !0).addTime(-y).addTime(f);
				n.resizing && (P = i.start()), this.snapToGrid && (P = this.Ii(P.addTime(-f)).addTime(f)), P = P.addTime(s);
				var S = P.addTime(a),
					A = P,
					T = S;
				if (v) {
					A = P.addTime(-f), T = A.addTime(a);
					var E = t.element.data.start.getTime() - this.Ba().getTime();
					P = A.addTime(E), S = P.addTime(a)
				}!
				function() {
					if (c.eventMoveSkipNonBusiness) {
						var e = t.i,
							n = c.Qi(i),
							a = n,
							o = c.Ni(A, e);
						if (!o) throw new DayPilot.Exception("No next cell found");
						console.log("throw8");
						var r = DayPilot.indexOf(c.itline, o);
						if (o.start > P) P = o.start;
						else {
							if (n -= o.end.getTime() - A.getTime(), n <= 0) return S = P.addTime(a), void(T = S.addTime(-f));
							r += 1
						}
						A = P.addTime(-f);
						for (var l = r; l < c.itline.length; l++) {
							if (c.Fi(l, e).business) {
								var s = c.itline[l],
									d = s.start.addTime(f),
									h = s.end.addTime(f),
									u = h.getTime() - d.getTime();
								if (n <= u) return S = d.addTime(n), void(T = S.addTime(-f));
								n -= u
							}
						}
						S = d.addTime(n), T = S.addTime(-f)
					}
				}();
				var M = this.getPixels(A),
					H = this.getPixels(T),
					R = o ? M.boxLeft : M.left,
					B = o ? H.boxRight - R : H.left - R;
				r && (B = l, R -= B / 2);
				var N = {};
				return N.top = t.top, N.left = R, N.row = t.element, N.rowIndex = t.i, N.width = B, N.start = P, N.end = S, N.relativeY = c.coords.y - t.top, N
			}, this.ji = function(e) {
				var t = this.ei(c.coords.y);
				if ("function" != typeof e.end) throw "e.end function is not defined";
				if (!e.end()) throw "e.end() returns null";
				var i = DayPilot.DateUtil.diff(e.rawend(), e.start());
				i = Math.max(i, 1);
				var a = _.useBox(i),
					o = e.data && "Milestone" === e.data.type,
					r = c.eventHeight,
					l = 0,
					s = c.coords.x;
				if (o && (s += r / 2), "Manual" === c.scale) {
					var d = function() {
							var e = c.getDate(c.coords.x, !0, !0),
								t = e.addTime(-i),
								n = c.getPixels(t).boxLeft,
								a = c.getPixels(e).boxRight,
								e = Math.min(a, c.coords.x);
							return e - n
						}(),
						h = Math.min(n.moveOffsetX ? n.moveOffsetX : 0, d);
					s = c.coords.x - h
				}
				var u = 0,
					f = "Days" === this.viewType || this.Ki();
				if (f && !e.part.external && (u = this.rowlist[e.part.dayIndex].start.getTime() - this.Ba().getTime()), a && !o) {
					var v = c.bh(e.start()),
						p = !v.hidden && !v.past;
					l = e.start().getTime() - this.Ii(e.start().addTime(-u)).addTime(u).getTime(), p && (l = function(e, t) {
						var i = c.Li(c.bh(e).current),
							n = c.Li(c._g(s).cell);
						if (i > 1.2 * n) {
							for (var a = t > 0 ? 1 : -1, t = Math.abs(t); t >= n;) t -= n;
							t *= a
						}
						return t
					}(e.start(), l))
				}
				var g = n.movingEvent ? n.movingEvent.calendar : c;
				g !== c && g.Mi() !== c.Mi() && (l = 0);
				var m = 0;
				if (n.moveDragStart && "Manual" !== c.scale && g === c) if (a) {
					var y = e.start().addTime(-u),
						b = this.Ii(y);
					m = n.moveDragStart.getTime() - b.getTime();
					var w = 60 * c.Mi() * 1e3;
					m = Math.floor(m / w) * w
				} else m = n.moveDragStart.getTime() - e.start().addTime(-u).getTime();
				else m = 0;
				this.eventMoveToPosition && (m = 0);
				var D = this.getDate(s, !0).addTime(-m).addTime(u);
				n.resizing && (D = e.start()), this.snapToGrid && (D = this.Ii(D.addTime(-u)).addTime(u)), D = D.addTime(l);
				var k = D.addTime(i),
					x = D,
					C = k;
				if (f) {
					x = D.addTime(-u), C = x.addTime(i);
					var P = t.element.data.start.getTime() - this.Ba().getTime();
					D = x.addTime(P), k = D.addTime(i)
				}
				if (n.moveDragStart && c.eventMoveSkipNonBusiness) {
					var S = t.i,
						A = n.moveDragStart.addTime(u);
					this.snapToGrid && (A = this.Ii(A.addTime(-u)).addTime(u));
					var T = !e.part.dayIndex,
						E = 0;
					T || (E = c.Ri(e.start(), A, e.part.dayIndex));
					var i = c.Qi(e),
						M = c.getDate(s, !0);
					c.snapToGrid && (M = c.getDate(s));
					var h = c.Si(M, E, S);
					D = M.addTime(-h).addTime(u), this.snapToGrid && (D = this.Ii(D.addTime(-u)).addTime(u)), l = T ? 0 : c.Ri(this.Ii(e.start().addTime(-u)).addTime(u), e.start(), S), D = D.addTime(l), k = c.Ti(D, i, S), k >= c.visibleEnd() && (k = c.visibleEnd(), D = k.addTime(-c.Pi(k, i))), x = D.addTime(-u), C = k.addTime(-u)
				}
				var H = this.getPixels(x),
					R = this.getPixels(C),
					B = a ? H.boxLeft : H.left,
					N = a ? R.boxRight - B : R.left - B;
				o && (N = r, B -= N / 2);
				var U = {};
				return U.top = t.top, U.left = B, U.row = t.element, U.rowIndex = t.i, U.width = N, U.start = D, U.end = k, U.relativeY = c.coords.y - t.top, U
			}, this.Oi = function(e, t) {
				var i = c.bh(e),
					n = c.bh(t),
					a = null,
					o = 0;
				i.hidden && (a = e);
				for (var r = i.i; r <= n.i; r++) {
					var l = c.itline[r];
					a && a < l.start && (o += l.start.getTime() - a.getTime()), a = l.end
				}
				return o
			}, this.Ti = function(e, t, i) {
				var n = t,
					a = c.rowlist[i],
					o = a.data.start.getTime() - c.Ba().getTime(),
					r = e.addTime(-o),
					l = c.Ni(r, i);
				if (!l) throw new DayPilot.Exception("No next cell found");
				console.log("throw9");
				var s = DayPilot.indexOf(c.itline, l);
				if (l.start > e);
				else {
					if (n -= l.end.getTime() - r.getTime(), n <= 0) return e.addTime(t);
					s += 1
				}
				for (var d = s; d < c.itline.length; d++) {
					if (c.Fi(d, i).business) {
						var h = c.itline[d],
							u = h.start.addTime(o),
							f = h.end.addTime(o),
							v = f.getTime() - u.getTime();
						if (n <= v) return u.addTime(n);
						n -= v
					}
				}
				return u || (u = c.itline[c.itline.length - 1].end), u.addTime(n)
			}, this.Ri = function(e, t, i) {
				var n = c.rowlist[i],
					a = n.data.start.getTime() - c.Ba().getTime(),
					o = (c.bh(e), e.addTime(-a)),
					r = t.addTime(-a),
					l = c.Ni(o, i);
				if (!l) throw new DayPilot.Exception("No next cell found");
				console.log("throw10");
				var s = 0,
					d = DayPilot.indexOf(c.itline, l);
				if (l.start <= r) {
					if (t < l.end.addTime(a)) return l.start > o ? t.getTime() - l.start.addTime(a).getTime() : t.getTime() - e.getTime();
					s += o > l.start ? l.end.getTime() - o.getTime() : l.end.getTime() - l.start.getTime(), d += 1
				}
				for (var h = d; h < c.itline.length; h++) {
					if (c.Fi(h, i).business) {
						var u = c.itline[h],
							f = u.start.addTime(a),
							v = u.end.addTime(a),
							p = v.getTime() - f.getTime();
						if (t < f) return s;
						if (t < v) return s += t.getTime() - f.getTime();
						s += p
					}
				}
				var g = t.getTime() - c.itline.last().end.addTime(a).getTime();
				return s += Math.min(0, g)
			}, this.Qi = function(e) {
				if (e.part.duration) {
					if (isNaN(e.part.duration)) throw new DayPilot.Error("Unable to get calculated duration");
					console.log("throw11");
					return e.part.duration
				}
				var t = e.part.dayIndex;
				return c.Ri(e.start(), e.rawend(), t)
			}, this.Pi = function(e, t) {
				var i = 0,
					n = t,
					a = c.bh(e);
				if (!a.current) throw new DayPilot.Exception("Current cell not found.");
				console.log("throw12");
				if (e.addTime(-t) > a.current.start) return t;
				i += e.getTime() - a.current.start.getTime(), n -= e.getTime() - a.current.start.getTime();
				var o = DayPilot.indexOf(c.itline, a.current);
				o -= 1;
				for (var r = a.current.start; o >= 0;) {
					var a = c.itline[o];
					r > a.end && (i += r.getTime() - a.end.getTime()), r = a.start;
					var l = a.end.getTime() - a.start.getTime();
					if (n <= l) return i += n;
					i += l, n -= l, o -= 1
				}
				throw new DayPilot.Exception("Unable to backward calculate offset in visible timeline")
				console.log("throw13");
			}, this.Si = function(e, t, i) {
				var n = 0,
					a = t,
					o = c.bh(e);
				if (!o.current) throw new DayPilot.Exception("Current cell not found.");
				console.log("throw14");
				var r = DayPilot.indexOf(c.itline, o.current);
				if (c.Fi(r, i).business) {
					if (e.addTime(-t) >= o.current.start) return t
				} else if (0 === t || e.addTime(-t) >= o.current.start) return e.getTime() - c.Ni(e, i).start.getTime();
				n += e.getTime() - o.current.start.getTime(), a -= e.getTime() - o.current.start.getTime(), r -= 1;
				for (var l = o.current.start; r >= 0;) {
					var o = c.itline[r];
					l > o.end && (n += l.getTime() - o.end.getTime()), l = o.start;
					var s = o.end.getTime() - o.start.getTime();
					if (c.Fi(r, i).business) {
						if (a <= s) return n += a;
						n += s, a -= s
					} else n += s;
					r -= 1
				}
				return n + a
			}, this.Ni = function(e, t) {
				var i = c.bh(e),
					n = 0;
				if (i.past) return null;
				if (i.current) n = i.i;
				else {
					if (!i.next) return null;
					n = DayPilot.indexOf(c.itline, i.next)
				}
				for (var a = n; a < c.itline.length; a++) {
					if (c.Ui(a, t)) return c.itline[a]
				}
				return null
			}, this.Ui = function(e, t) {
				return c.Fi(e, t).business
			}, this.Mi = function() {
				switch (this.scale) {
				case "CellDuration":
					return this.cellDuration;
				case "Minute":
					return 1;
				case "Hour":
					return 60;
				case "Day":
					return 1440;
				case "Week":
					return 10080;
				case "Month":
					return 43200;
				case "Year":
					return 525600;
				case "Manual":
					if (c.itline.length > 0) {
						var e = c.itline[0];
						return (e.end.getTime() - e.start.getTime()) / 6e4
					}
					return c.cellDuration
				}
				throw "can't guess cellDuration value"
			}, this.Li = function(e) {
				return e.end.ticks - e.start.ticks
			}, this.ki = function(e) {
				return this.treePreventParentUsage && this.Vi(e)
			}, this.Vi = function(e) {
				var t = this.rowlist[e];
				return !!t.isParent || !! (this.treeEnabled && t.children && t.children.length > 0)
			}, this.Wi = {}, this.Xi = function() {
				if (c.treeAutoExpand) {
					var e = this.ji(n.movingEvent),
						t = e.rowIndex,
						i = this.Vi(t),
						a = this.Wi;
					if (a.timeout && a.y !== t && (clearTimeout(a.timeout), a.timeout = null), i) {
						a.y = t;
						var o = !c.rowlist[a.y].expanded;
						!a.timeout && o && (a.timeout = setTimeout(function() {
							!c.rowlist[a.y].expanded && (c.Yi(a.y), c.Zi()), a.timeout = null
						}, 500))
					}
				}
			}, this.Gc = function() {
				var e = n.resizingShadow.width,
					t = n.resizingShadow.left,
					i = n.resizingEvent,
					a = n.resizing.dpBorder,
					o = c.rowlist[i.part.dayIndex],
					r = 0;
				r = o.start.getTime() - c.Ba().getTime();
				var l = null,
					s = null,
					d = !c.snapToGrid;
				"left" === a ? (l = c.getDate(t, d).addTime(r), s = i.rawend()) : "right" === a && (l = i.start(), s = c.getDate(t + e, d, !0).addTime(r)), n.resizingShadow.start = l, n.resizingShadow.end = s, b.update()
			}, this.exportAs = function(e, t) {
				var i = m.generate(e, t);
				return new DayPilot.Export(i)
			}, this["export"] = this.exportAs, this.nd = {};
			var m = this.nd;
			m.getWidth = function() {
				var e = m.pd;
				switch (e) {
				case "viewport":
					return c.nav.top.offsetWidth;
				case "full":
					return c.Gg() + m.getRowHeaderWidth();
				case "range":
					return c.getPixels(m.getRangeEnd()).boxRight - c.getPixels(m.getRangeStart()).boxLeft + m.getRowHeaderWidth();
				default:
					throw "Unsupported export mode: " + e
				}
			}, m.getHeight = function() {
				var e = m.pd;
				switch (e) {
				case "viewport":
					return c.nav.top.offsetHeight - DayPilot.sh(c.nav.scroll) - 1;
				case "full":
					return c.$i() + c.Ig() - DayPilot.sh(c.nav.scroll);
				case "range":
					var t = m.getRows();
					if (0 === t.length) return c.Ig();
					var i = t.first(),
						n = t.last();
					return n.top - i.top + n.height + c.Ig();
				default:
					throw "Unsupported export mode: " + e
				}
			}, m.getRangeStart = function() {
				var e = m.od.dateFrom || c.Ba();
				return new DayPilot.Date(e)
			}, m.getRangeEnd = function() {
				var e = m.od.dateTo || c.Xg();
				return new DayPilot.Date(e)
			}, m.getRangeResStart = function() {
				return m.od.resourceFrom ? c.vg(m.od.resourceFrom) : c.rowlist.find(function(e) {
					return !e.hidden
				})
			}, m.getRangeResEnd = function() {
				return m.od.resourceTo ? c.vg(m.od.resourceTo) : c.rowlist.last()
			}, m.getRowHeaderWidth = function() {
				return c.Jg()
			}, m.getTimeHeaderHeight = function() {
				return c.Ig()
			}, m.getCanvas = function() {
				return m.canvas()
			}, m.getRectangles = function() {
				var e = m.getRowHeaderWidth(),
					t = m.getTimeHeaderHeight(),
					i = {};
				i.main = {
					"x": 0,
					"y": 0,
					"w": m.getWidth(),
					"h": m.getHeight()
				}, i.corner = {
					"x": 0,
					"y": 0,
					"w": e,
					"h": t
				}, i.grid = {
					"x": e,
					"y": t,
					"w": m.getWidth() - e,
					"h": m.getHeight() - t
				};
				var n = i.grid.w,
					a = c.itline.last();
				a && a.left + a.width < i.grid.w && (n = a.left + a.width);
				var o = i.grid.h,
					r = c.rowlist.last();
				return r && r.top + r.height < i.grid.h && (o = r.top + r.height), i.gridContent = {
					"x": e,
					"y": t,
					"w": n,
					"h": o
				}, i
			}, m.getRows = function() {
				var e, t, i, n, a = m.pd,
					o = DayPilot.list();
				switch (a) {
				case "viewport":
					e = c._i, t = e + c.nav.scroll.offsetHeight, i = c.ei(e).i, n = c.ei(t).i;
					break;
				case "full":
					e = 0, i = 0, n = c.rowlist.length;
					break;
				case "range":
					var r = m.getRangeResStart(),
						l = m.getRangeResEnd();
					if (!r) throw "Resource specified using resourceFrom option not found during export.";
					if (!l) throw "Resource specified using resourceTo option not found during export.";
					i = r.index, n = l.index
				}
				n < c.rowlist.length && (n += 1);
				for (var s = i; s < n; s++) {
					var d = c.rowlist[s];
					d.hidden || o.push(d)
				}
				return o.offset = i, o
			}, m.getEvents = function() {
				var e = m.pd;
				switch (e) {
				case "full":
					var t = DayPilot.list();
					return DayPilot.list(c.rowlist).each(function(e) {
						e.hidden || DayPilot.list(e.events).each(function(e) {
							t.push(e)
						})
					}), t;
				case "viewport":
					return h.events().map(function(e) {
						return e.event
					});
				case "range":
					var t = DayPilot.list(),
						i = m.getRangeStart(),
						n = m.getRangeEnd();
					return m.getRows().each(function(e) {
						DayPilot.list(e.events).filter(function(e) {
							return DayPilot.Util.overlaps(e.start(), e.end(), i, n)
						}).each(function(e) {
							t.push(e)
						})
					}), t;
				default:
					throw "Unsupported export mode: " + e
				}
			}, m.getTimeline = function() {
				var e = m.pd;
				switch (e) {
				case "full":
					return DayPilot.list(c.itline).addProps({
						"offset": 0
					});
				case "viewport":
					return m.getViewportTimeline();
				case "range":
					return m.getRangeTimeline();
				default:
					throw "Unsupported export mode: " + e
				}
			}, m.getRangeTimeline = function() {
				var e = DayPilot.list();
				if (c.itline && c.itline.length > 0) {
					var t = c.bh(m.getRangeStart()).i,
						i = c.bh(m.getRangeEnd()).i,
						n = c.aj();
					i = Math.min(i, n - 1), t = Math.max(t, 0);
					for (var a = t; a <= i; a++) {
						var o = c.itline[a];
						e.push(o)
					}
					e.offset = t
				}
				return e
			}, m.getViewportTimeline = function() {
				var e = DayPilot.list();
				if (c.itline && c.itline.length > 0) {
					var t = c.bj,
						i = t + c.cj,
						n = c._g(t).x,
						a = c._g(i, !0).x,
						o = c.aj();
					a = Math.min(a, o), n = Math.max(n, 0);
					for (var r = n; r <= a; r++) {
						var l = c.itline[r];
						e.push(l)
					}
					e.offset = n
				}
				return e
			}, m.getTimeHeader = function(e) {
				if ("full" === m.pd) return DayPilot.list(c.timeHeader[e]);
				var t, i, n = DayPilot.list();
				t = m.getViewportOffsetStart(), i = t + m.getViewportOffsetWidth();
				var a = c.dj(e, t),
					o = c.dj(e, i);
				o || (o = {
					"x": c.timeHeader[e].length - 1
				});
				for (var r = a.x; r <= o.x; r++) {
					var l = c.timeHeader[e][r];
					n.push(l)
				}
				return n
			}, m.fakeDurationBar = function() {
				var e = document.createElement("div");
				e.style.display = "none", e.className = c.q(E.event);
				var t = document.createElement("div");
				t.className = c.q(E.eventBar);
				var i = document.createElement("div");
				return i.className = c.q(E.eventBarInner), document.body.appendChild(e), t.appendChild(i), e.appendChild(t), e
			}, m.fakeCell = function() {
				var e = document.createElement("div");
				e.style.display = "none", e.className = c.q("_cell"), e.style.position = "absolute", e.style.top = "-2000px", e.style.left = "-2000px";
				var t = document.createElement("div");
				return t.className = c.q("_cell_inner"), e.appendChild(t), c.divCells.appendChild(e), e
			}, m.fakeRowHeader = function() {
				var e = document.createElement("div");
				e.style.display = "none", e.className = c.q("_rowheader"), e.style.position = "absolute", e.style.top = "-2000px", e.style.left = "-2000px";
				var t = document.createElement("div");
				return t.className = c.q("_rowheader_inner"), e.appendChild(t), c.divResScroll.appendChild(e), e
			}, m.fakeExpand = function() {
				var e = document.createElement("div");
				return e.style.display = "none", e.className = c.q("_tree_image_expand"), document.body.appendChild(e), e
			}, m.extractUrl = function(e) {
				var t = /url\((")?([^"].*[^"])\1\)/.exec(e);
				return t ? t[2] : null
			}, m.getImages = function() {
				var e = {},
					t = m.fakeExpand();
				return e.expand = m.extractUrl(new DayPilot.StyleReader(t).get("background-image")), t.className = c.q("_tree_image_collapse"), e.collapse = m.extractUrl(new DayPilot.StyleReader(t).get("background-image")), t.className = c.q("_tree_image_no_children"), e.nochildren = m.extractUrl(new DayPilot.StyleReader(t).get("background-image")), DayPilot.de(t), e
			}, m.getFont = function(e) {
				return new DayPilot.StyleReader(e).getFont()
			}, m.getViewportOffsetStart = function() {
				switch (m.pd) {
				case "full":
					return 0;
				case "viewport":
					return c.nav.scroll.scrollLeft;
				case "range":
					return c.getPixels(m.getRangeStart()).boxLeft
				}
			}, m.getViewportOffsetTop = function() {
				switch (m.pd) {
				case "full":
					return 0;
				case "viewport":
					return c.nav.scroll.scrollTop;
				case "range":
					return m.getRangeResStart().top
				}
			}, m.getViewportOffsetWidth = function() {
				switch (m.pd) {
				case "full":
					return c.Gg();
				case "viewport":
					return c.nav.scroll.offsetWidth;
				case "range":
					return c.getPixels(m.getRangeEnd()).boxRight - m.getViewportOffsetStart()
				}
			}, m.excelBoard = function() {
				var e = new DayPilot.Excel,
					t = e.worksheets.create("Scheduler"),
					i = new DayPilot.StyleReader(c.nav.corner).get("background-color"),
					n = new DayPilot.StyleReader(c.nav.top).get("border-top-color"),
					a = DayPilot.list(c.elements.events).map(function(e) {
						return e.firstChild
					}).last(),
					o = new DayPilot.StyleReader(a).get("border-right-color");
				e.styles.getDefault().setBackColor("#ffaaaa");
				var r = e.styles.create();
				r.setHorizontalAlignment("Center"), r.setBackColor(i), r.setBorderColor(n);
				var l = e.styles.create();
				l.setVerticalAlignment("Top"), l.setBackColor(i), l.setBorderColor(n);
				var s = e.styles.create();
				s.setVerticalAlignment("Top"), s.setBackColor("#ff0000"), s.setBorderColor(o), t.enableGridlines(!1), t.cell(0, 0).setRowspan(c.timeHeader.length).setStyle(r), t.cell(10, 10).setText("hi there"), DayPilot.list(c.timeHeader).each(function(e, i) {
					var n = {
						"x": 1,
						"y": 0
					};
					m.getTimeHeader(i, "full").each(function(e, a) {
						var o = e.colspan;
						t.cell(a + n.x, i + n.y).setText(e.innerHTML).setColspan(o).setStyle(r)
					})
				}), DayPilot.list(c.rowlist).each(function(e, i) {
					for (var n = {
						"x": 0,
						"y": 1
					}, a = "", o = 0; o < e.level; o++) a += "  ";
					t.cell(n.x, i + n.y).setText(a + e.html).setRowspan(e.lines.length).setStyle(l)
				});
				var d = {
					"x": 0,
					"y": c.timeHeader.length
				},
					h = d.y;
				return DayPilot.list(c.rowlist).each(function(e, i) {
					DayPilot.list(e.lines).each(function(e, n) {
						var a = d.x;
						DayPilot.list(e).each(function(e) {
							var n = c.bh(e.start()).i,
								o = c.bh(e.end()).i,
								r = 1 + o - n;
							t.cell(n + a, i + h).setText(e.client.html()).setColspan(r).setStyle(s), a += r - 1
						})
					}), h += e.lines.length - 1
				}), e
			}, m.od = null, m.pd = null, m.generate = function(e, t) {
				"object" == typeof e && (t = e, e = null);
				var t = t || {},
					e = e || t.format || "svg",
					i = t.scale || 1;
				if ("xls" === e) return m.excelBoard();
				if ("config" !== e) {
					"jpg" === e.toLowerCase() && (e = "jpeg");
					var n = t.area || "viewport";
					m.od = t, m.pd = n, m.getRows().each(function(e) {
						c.ej(e)
					});
					var a, o = m.getWidth(),
						r = m.getHeight();
					switch (e.toLowerCase()) {
					case "svg":
						a = new DayPilot.Svg(o, r);
						break;
					case "png":
						a = new DayPilot.Canvas(o, r, "image/png", i);
						break;
					case "jpeg":
						a = new DayPilot.Canvas(o, r, "image/jpeg", i, t.quality);
						break;
					default:
						throw "Export format not supported: " + e
					}
					var l = m.getRectangles(),
						s = m.getImages(),
						d = new DayPilot.StyleReader(c.nav.top).get("background-color"),
						h = new DayPilot.StyleReader(c.nav.corner).get("background-color"),
						u = new DayPilot.StyleReader(c.nav.top).get("border-top-color"),
						f = new DayPilot.StyleReader(c.nav.divider).get("background-color"),
						v = DayPilot.list(c.elements.events).map(function(e) {
							return e.firstChild
						}).last(),
						p = new DayPilot.StyleReader(v).get("border-right-color"),
						g = m.getFont(v),
						y = new DayPilot.StyleReader(v).get("color"),
						b = new DayPilot.StyleReader(v).get("background-color");
					b = DayPilot.Util.isTransparentColor(b) ? "white" : b;
					var w = m.fakeDurationBar(),
						D = new DayPilot.StyleReader(w.firstChild).get("background-color"),
						k = new DayPilot.StyleReader(w.firstChild.firstChild).get("background-color");
					DayPilot.de(w);
					var x = m.fakeCell(),
						C = new DayPilot.StyleReader(x).get("background-color");
					DayPilot.Util.addClass(x, c.q("_cell_business"));
					var P = new DayPilot.StyleReader(x).get("background-color"),
						S = m.getFont(x),
						A = new DayPilot.StyleReader(x).get("color");
					DayPilot.de(x);
					var T = DayPilot.Util.firstPropValue(c.t.linesVertical),
						E = new DayPilot.StyleReader(T).get("background-color"),
						M = c.t.timeHeader["0_0"],
						H = m.getFont(M),
						_ = new DayPilot.StyleReader(M).get("color"),
						B = new DayPilot.StyleReader(M).get("background-color"),
						N = m.fakeRowHeader(),
						U = m.getFont(N),
						z = new DayPilot.StyleReader(N).get("color"),
						L = new DayPilot.StyleReader(N).get("background-color");
					if (DayPilot.de(N), c.rowHeaderColumns && c.ii && c.ii.blocks[0]) var I = c.ii.blocks[0].section.firstChild,
						O = new DayPilot.StyleReader(I).getFont(),
						F = new DayPilot.StyleReader(I).get("color");
					var j = m.getViewportOffsetStart(),
						W = m.getViewportOffsetTop();
					a.fillRect(l.main, "white"), a.fillRect(l.main, d), a.fillRect(l.corner, h);
					var q = l.corner.x;
					DayPilot.list(c.rowHeaderColumns).each(function(e, t) {
						var i = c.rowHeaderCols[t],
							n = {};
						n.x = q, n.w = i + 1, n.y = l.corner.h - c.ii.height, n.h = c.ii.height + 1;
						var o = 3,
							r = DayPilot.Util.copyProps(n);
						r.x += o, r.w -= o, a.text(r, e.title, O, F), a.rect(n, u), q += i
					});
					var G = "function" == typeof c.onBeforeTimeHeaderExport;
					DayPilot.list(c.timeHeader).each(function(e, t) {
						m.getTimeHeader(t, n).each(function(e) {
							var i = l.grid.x + e.left - j,
								n = e.width,
								o = R.timeHeader(t),
								r = o.top,
								s = o.height,
								d = e.innerHTML,
								h = e.backColor;
							if (G) {
								var f = {};
								f.header = {}, f.header.start = e.start, f.header.end = e.end, f.header.level = t, f.header.text = e.text, f.header.html = e.innerHTML, f.text = e.innerHTML, f.backColor = e.backColor, c.onBeforeTimeHeaderExport(f), d = f.text, h = f.backColor
							}
							var v = Math.max(0, l.grid.x - i);
							i += v, n -= v;
							var v = Math.max(0, i + n - (l.grid.x + l.grid.w));
							n -= v;
							var p = {
								"x": i,
								"y": r,
								"w": n + 1,
								"h": s + 1
							};
							h = h || B, a.fillRect(p, h), a.rect(p, u), a.text(p, d, H, _, "center")
						})
					}), m.getTimeline().each(function(e) {
						var t = l.grid.x + e.left - j;
						t += Math.max(0, l.grid.x - t), t !== l.grid.x && a.line(t, l.grid.y + 1, t, l.grid.y + l.grid.h - 2, E)
					});
					var V = "function" == typeof c.onBeforeCellExport;
					m.getRows().each(function(e, t, i) {
						var t = e.index;
						m.getTimeline().each(function(i, n, o) {
							var n = o.offset + n,
								r = c.Fi(n, t),
								s = r.business,
								d = c.fj(n, t),
								h = r.html,
								u = "left",
								f = r.backColor || (s ? P : C);
							V && (d || (d = {}, d.cell = c.cells.findXy(n, t)[0]), d.text = h, d.horizontalAlignment = u, d.backColor = f, c.onBeforeCellExport(d), h = d.text, u = d.horizontalAlignment, f = d.backColor);
							var v = l.grid.y + e.top - W;
							v += Math.max(0, l.grid.y - v);
							var p = l.grid.x + i.left - j;
							p += Math.max(0, l.grid.x - p);
							var g = {
								"x": p,
								"y": v,
								"w": i.width,
								"h": e.height
							};
							a.fillRect(g, f);
							var m = {};
							m.x = g.x + 1, m.y = g.y + 1, m.w = g.w - 2, m.h = g.h - 2, h && a.text(m, h, S, A, u)
						})
					}), m.getRows().each(function(e) {
						var t = l.grid.y + e.top - W;
						t += Math.max(0, l.grid.y - t), t !== l.grid.y && a.line(l.gridContent.x + 1, t, l.gridContent.x + l.gridContent.w - 1, t, E)
					});
					var J = "function" == typeof c.onBeforeRowHeaderRender,
						Y = "function" == typeof c.onBeforeRowHeaderExport;
					return m.getRows().each(function(e) {
						var t = l.grid.y + e.top - W;
						t += Math.max(0, l.grid.y - t);
						var i = c.treeEnabled && !e.isNewRow,
							n = 10,
							o = i ? e.level * c.treeIndent + c.treeImageMarginLeft : 3,
							r = {
								"x": 0,
								"y": t,
								"w": l.grid.x + 1,
								"h": e.height + 1
							},
							d = e;
						if (J) {
							d = c.gj(e).row
						}
						var h = {};
						h.text = d.html, h.backColor = d.backColor || L, h.fontSize = U.size, h.fontFamily = U.family, h.fontStyle = U.style, h.fontColor = z, h.borderColor = u, h.horizontalAlignment = "left", e.isNewRow && (h.text = c.rowCreateHtml), Y && (h.row = c.Mh(e), c.onBeforeRowHeaderExport(h));
						var f = {
							"x": o,
							"y": t + c.treeImageMarginTop,
							"w": 10,
							"h": 10
						},
							v = i ? o + n + 3 : o,
							p = {
								"x": v,
								"y": t,
								"w": r.w - (o + n),
								"h": e.height + 1
							};
						if (a.fillRect(r, h.backColor), a.text(p, h.text, {
							"size": h.fontSize,
							"family": h.fontFamily,
							"style": h.fontStyle
						}, h.fontColor, h.horizontalAlignment), a.rect(r, h.borderColor), i) {
							var g = null;
							g = DayPilot.list(e.children).isEmpty() ? s.nochildren : e.expanded ? s.collapse : s.expand, a.image(f, g)
						}
						if (c.rowHeaderCols) {
							var o = r.x;
							DayPilot.list(c.rowHeaderCols).each(function(e, t) {
								if (0 !== t) {
									var i = d.columns[t - 1],
										n = DayPilot.Util.copyProps(r);
									n.x = o, n.w = e;
									var l = 3,
										s = DayPilot.Util.copyProps(n);
									s.x += l, s.w -= l;
									var c = i.html || "",
										u = i.backColor || h.backColor;
									a.fillRect(n, u), c && a.text(s, c, {
										"size": h.fontSize,
										"family": h.fontFamily,
										"style": h.fontStyle
									}, h.fontColor, h.horizontalAlignment), a.rect(n, h.borderColor)
								}
								o += e
							})
						}
					}), m.getEvents().each(function(e) {
						var t = c.rowlist[e.part.dayIndex].top,
							i = e.part.width,
							n = e.part.barWidth,
							o = e.client && e.client.barVisible && e.client.barVisible(),
							r = l.grid.y + t + e.part.top - W;
						r += Math.max(0, l.grid.y - r);
						var s = l.grid.x + e.part.left - j,
							d = Math.max(0, l.grid.x - s);
						s += d, i -= d, n -= d;
						var h = e.cache || e.data,
							u = h.barColor || k,
							f = h.barBackColor || D,
							v = h.backColor || b,
							m = h.fontColor || y,
							w = 5,
							x = 2,
							C = 2,
							P = {};
						P.e = e, P.text = e.text ? e.text() : e.client.html(), P.fontSize = g.size, P.fontFamily = g.family, P.fontStyle = g.style, P.fontColor = m, P.backColor = v, P.borderColor = p, P.horizontalAlignment = "left", P.barHeight = w, "function" == typeof c.onBeforeEventExport && c.onBeforeEventExport(P);
						var S = {
							"x": s,
							"y": r,
							"w": i,
							"h": e.part.height
						},
							A = {
								"x": s,
								"y": r,
								"w": i,
								"h": P.barHeight
							},
							T = {
								"x": s + e.part.barLeft,
								"y": r,
								"w": n,
								"h": w
							};
						({
							"x": s + x,
							"y": r + w,
							"w": i - x,
							"h": e.part.height - w
						});
						a.fillRect(S, P.backColor), a.text(S, P.text, {
							"size": P.fontSize,
							"family": P.fontFamily,
							"style": P.fontStyle
						}, P.fontColor, P.horizontalAlignment, C), a.rect(S, P.borderColor), o && (a.fillRect(A, f), n > 0 && a.fillRect(T, u)), DayPilot.list(h.areas).each(function(t) {
							if ("Hover" !== (t.visibility || t.v)) {
								var i = t.left;
								t.start && (i = c.getPixels(new DayPilot.Date(t.start)).left - e.part.left);
								var n = t.width || t.w;
								t.right ? n = e.part.width - t.right - i : t.end && (n = c.getPixels(new DayPilot.Date(t.end)).left - t.left - e.part.left + 1);
								var o = t.top,
									l = t.height || t.h;
								"number" == typeof t.bottom && (l = e.part.height - t.bottom - o);
								var d = {
									"x": s + i,
									"y": r + o,
									"w": n,
									"h": l
								};
								if (t.backColor && a.fillRect(d, t.backColor), t.image) {
									var h = new Image;
									h.src = t.image, a.image(d, h)
								} else t.html && a.text(d, t.html, {
									"size": P.fontSize,
									"family": P.fontFamily,
									"style": P.fontStyle
								}, t.fontColor || P.fontColor, null, t.padding)
							}
						})
					}), a.rect(l.main, u), a.line(l.grid.x, 0, l.grid.x, l.main.h, f), a.line(0, l.grid.y, l.main.w, l.grid.y, f), a
				}
			}, this.hj = {};
			var y = this.hj;
			y.findJointDivs = function(e) {
				var t = e.data.join;
				return t ? DayPilot.list(c.elements.events).filter(function(i) {
					return i.event.data.join === t && i.event !== e
				}) : DayPilot.list()
			}, this.ij = {};
			var b = this.ij;
			b.divs = [], b.list = [], b.forbidden = !1, b.additional = function() {
				var e = DayPilot.list(),
					t = c.multiselect.isSelected(n.resizing.event),
					i = c.allowMultiResize,
					e = DayPilot.list();
				if (t && i && (e = DayPilot.list(c.multiselect.divs).filter(function(e) {
					return e !== n.resizing
				})), c.jointEventsResize) {
					var a = y.findJointDivs(n.resizingEvent);
					e = e.concat(a)
				}
				return e
			}, b.update = function() {
				b.clear(), b.draw()
			}, b.clear = function() {
				DayPilot.de(b.divs), b.divs = []
			}, b.draw = function() {
				if (n.resizing) {
					var e = n.resizingEvent,
						t = n.resizingShadow,
						i = t.start.getTime() - e.start().getTime(),
						a = t.end.getTime() - e.end().getTime(),
						o = 0;
					if (b.list = [], b.forbidden = !1, b.invalid = !1, b.rowoffset = o, b.additional().each(function(e) {
						if (e.event) {
							var t = e.event,
								n = c.rowlist[t.part.dayIndex + o];
							if (!n) return void(b.invalid = !0);
							var r = t.part.top + n.top,
								l = t.part.height,
								s = t.start().addTime(i),
								d = t.end().addTime(a),
								h = {};
							h.event = t, h.start = s, h.end = d, h.overlapping = !1, b.list.push(h);
							var u = c.getPixels(s),
								f = c.getPixels(d),
								v = DayPilot.DateUtil.diff(t.rawend(), t.start());
							v = Math.max(v, 1);
							var p = _.useBox(v),
								g = p ? u.boxLeft : u.left,
								m = p ? f.boxRight - g : f.left - g,
								y = document.createElement("div");
							y.style.position = "absolute", y.style.left = g + "px", y.style.top = r + "px", y.style.height = l + "px", y.style.width = m + "px", y.style.zIndex = 101, y.style.overflow = "hidden", y.className = c.q("_shadow"), y.info = h;
							var w = document.createElement("div");
							w.className = c.q("_shadow_inner"), y.appendChild(w), c.sg.appendChild(y), b.divs.push(y)
						}
					}), b.invalid) {
						var r = c.q("_shadow_overlap");
						return void DayPilot.list(b.divs).each(function(e) {
							DayPilot.Util.addClass(e, r)
						})
					}
					DayPilot.list(b.divs).each(function(e) {
						if (e.info) {
							var t = e,
								i = e.info,
								a = e.info.event,
								r = c.rowlist[a.part.dayIndex + o],
								l = c.getPixels(i.start),
								s = c.getPixels(i.end),
								d = l.left,
								h = s.left - d,
								u = DayPilot.list(b.list).map(function(e) {
									return e.event.data
								}).add(n.resizing.event.data);
							c.jj(t, r, d, h, u), t.overlapping && (i.overlapping = !0, b.forbidden = !0)
						}
					})
				}
			}, this.kj = {}, this.kj.modifiedProps = function() {
				var e = new DayPilot.Scheduler,
					t = DayPilot.Util.members(c, 2),
					i = [];
				return i.push("<div id='dp'></div>"), i.push("<script>"), i.push("var dp = new DayPilot.Scheduler('dp');"), t.properties.each(function(t) {
					var n, a, o = t.name,
						r = o.split(".");
					if (r.length > 1) {
						var l = r[0],
							s = r[1];
						n = DayPilot.JSON.stringify(e[l][s]), a = DayPilot.JSON.stringify(c[l][s])
					} else n = DayPilot.JSON.stringify(e[o]), a = DayPilot.JSON.stringify(c[o]);
					n !== a && i.push("dp." + o + " = " + a + ";")
				}), t.events.each(function(e) {
					var t = e.name;
					"function" == typeof c[t] && i.push("dp." + t + " = " + c[t].toString() + ";")
				}), i.push("dp.init();"), i.push("</script>"), i.join("\n")
			}, this.lj = {};
			var w = this.lj;
			w.divs = [], w.list = [], w.forbidden = !1, w.verticalAll = function() {
				return "All" === c.multiMoveVerticalMode
			}, w.additional = function() {
				var e = DayPilot.list(),
					t = c.multiselect.isSelected(n.movingEvent),
					i = c.allowMultiMove,
					e = DayPilot.list();
				if (t && i && (e = DayPilot.list(c.multiselect.divs).filter(function(e) {
					return e !== n.moving && e !== A.moving
				})), c.jointEventsMove) {
					var a = y.findJointDivs(n.movingEvent);
					e = e.concat(a)
				}
				return e
			}, w.update = function() {
				w.clear(), w.draw()
			}, w.draw = function() {
				if (n.moving) {
					var e = n.movingEvent,
						t = n.movingShadow.start,
						i = t.getTime() - e.start().getTime(),
						a = e.part.dayIndex,
						o = DayPilot.indexOf(c.rowlist, n.movingShadow.row),
						r = o - a;
					if (w.verticalAll() || (r = 0), w.list = [], w.forbidden = !1, w.invalid = !1, w.rowoffset = r, w.additional().each(function(e) {
						if (e.event) {
							var t = e.event,
								n = c.rowlist[t.part.dayIndex + r];
							if (!n) return void(w.invalid = !0);
							var a = t.part.top + n.top,
								o = t.part.height;
							r && (a = n.top, o = n.height);
							var l = t.start().addTime(i),
								s = t.end().addTime(i),
								d = {};
							d.event = t, d.start = l, d.end = s, d.resource = n.id, d.overlapping = !1, w.list.push(d);
							var h = c.getPixels(l),
								u = c.getPixels(s),
								f = DayPilot.DateUtil.diff(t.rawend(), t.start());
							f = Math.max(f, 1);
							var v = _.useBox(f),
								p = v ? h.boxLeft : h.left,
								g = v ? u.boxRight - p : u.left - p,
								m = document.createElement("div");
							m.style.position = "absolute", m.style.left = p + "px", m.style.top = a + "px", m.style.height = o + "px", m.style.width = g + "px", m.style.zIndex = 101, m.style.overflow = "hidden", m.className = c.q("_shadow"), m.info = d;
							var y = document.createElement("div");
							y.className = c.q("_shadow_inner"), m.appendChild(y), c.sg.appendChild(m), w.divs.push(m)
						}
					}), w.invalid) {
						var l = c.q("_shadow_overlap");
						return void DayPilot.list(w.divs).each(function(e) {
							DayPilot.Util.addClass(e, l)
						})
					}
					DayPilot.list(w.divs).each(function(e) {
						if (e.info) {
							var t = e,
								i = e.info,
								a = e.info.event,
								o = c.rowlist[a.part.dayIndex + r],
								l = c.getPixels(i.start),
								s = c.getPixels(i.end),
								d = l.left,
								h = s.left - d,
								u = DayPilot.list(w.list).map(function(e) {
									return e.event.data
								}).add(n.movingEvent.data);
							c.jj(t, o, d, h, u), t.overlapping && (i.overlapping = !0, w.forbidden = !0)
						}
					})
				}
			}, w.clear = function() {
				DayPilot.de(w.divs), w.divs = []
			}, this.mj = function() {
				var e = c.coords,
					t = n.resizing.dpBorder,
					i = n.resizing.event,
					a = i.part.left;
				"right" == t && (a += i.part.width);
				var o, r, l = n.resizing.event.calendar.cellWidth,
					s = n.resizing.event.part.width,
					d = n.resizing.event.part.left,
					h = 0,
					u = e.x - a;
				if ("right" === t) {
					if (o = d, c.snapToGrid) {
						var f = c._g(s + d + u).cell;
						r = f.left + f.width - d, r < l && (r = l)
					} else r = s + u;
					var v = c.Gg();
					d + r > v && (r = v - d), n.resizingShadow.left = d, n.resizingShadow.width = r
				} else {
					if ("left" !== t) throw "Invalid dpBorder.";
					c.snapToGrid ? (u >= s && (u = s), o = Math.floor((d + u + 0) / l) * l, o < h && (o = h)) : o = d + u, r = s - (o - d);
					var p = d + s,
						g = l;
					c.snapToGrid ? "Never" === c.useEventBoxes && (g = s < l ? s : 1) : g = 1, r < g && (r = g, o = p - r), n.resizingShadow.left = o, n.resizingShadow.width = r
				}!
				function() {
					var e = n.resizing.event,
						t = c.rowlist[e.part.dayIndex],
						i = o,
						a = r;
					c.jj(n.resizingShadow, t, i, a, e.data)
				}(), c.nj()
			}, this.Zi = function() {
				this.nav.scroll;
				if (c.coords && n.movingEvent) {
					c.Kg();
					var e = n.movingShadow,
						t = this.ji(n.movingEvent);
					if (!c.ki(t.rowIndex)) {
						var i = n.movingEvent,
							a = 0,
							o = 0;
						!
						function() {
							if (c.cellStacking) {
								var e = t.relativeY,
									i = c._g(t.left).x,
									n = t.row,
									r = n.evColumns[i],
									l = r.events.find(function(t) {
										return e < t.part.top + t.part.height + c.eventMarginBottom
									});
								l || (l = r.events.last()), l && (o = l.part.top, a = DayPilot.indexOf(r.events, l), e - l.part.top > l.part.height / 2 && (o = l.part.top + l.part.height + c.eventMarginBottom / 2, a += 1))
							} else {
								for (var e = t.relativeY, n = t.row, s = 0, d = c.vc.eventHeight(), h = n.lines.length, u = 0; u < n.lines.length; u++) {
									if (n.lines[u].isFree(t.left, c.cellWidth)) {
										h = u;
										break
									}
								}
								var f = Math.floor((e - s + d / 2) / d),
									f = Math.min(h, f),
									f = Math.max(0, f);
								a = f, o = c.rowMarginTop + a * (c.vc.eventHeight() + c.eventMarginBottom) + c.eventMarginBottom / 2
							}
						}(), o > 0 && (o -= 3);
						var r = i.cache && "undefined" != typeof i.cache.moveVDisabled ? !i.cache.moveVDisabled : !i.data.moveVDisabled,
							l = i.cache && "undefined" != typeof i.cache.moveHDisabled ? !i.cache.moveHDisabled : !i.data.moveHDisabled,
							s = !w.additional().isEmpty();
						if (s && "Disabled" === c.multiMoveVerticalMode && (r = !1), r) if (this.ki(t.rowIndex)) {
							var d = e.row,
								h = 1;
							if (!d) return;
							h = t.rowIndex < d.index ? 1 : -1;
							for (var u = t.rowIndex; u !== d.index; u += h) {
								var f = this.rowlist[u];
								if (!this.ki(u) && !f.hidden) {
									e.style.top = f.top + "px", e.style.height = Math.max(f.height, 0) + "px", e.row = f, c.eventMoveToPosition && (a = h > 0 ? 0 : f.lines.length - 1, e.style.top = t.top + o + "px", e.style.height = "3px", e.line = a);
									break
								}
							}
						} else e.row = t.row, e.style.height = Math.max(t.row.height, 0) + "px", e.style.top = t.top + "px", c.eventMoveToPosition && (e.style.top = t.top + o + "px", e.style.height = "3px", e.line = a);
						else {
							for (var d = c.rowlist[i.part.dayIndex], p = d.lines.length, u = 0; u < d.lines.length; u++) {
								if (d.lines[u].isFree(t.left, c.cellWidth)) {
									p = u;
									break
								}
							}
							if (s || (e.style.height = Math.max(d.height, 0) + "px", e.style.top = d.top + "px"), e.row = d, c.eventMoveToPosition && !s) if (t.row === d) e.style.top = d.top + o + "px", e.style.height = "3px", e.line = a;
							else {
								var g = t.rowIndex > d.index && p > 0 ? p * c.vc.eventHeight() - 3 : 0;
								e.style.top = d.top + g + "px", e.style.height = "3px", e.line = 0
							}
						}
						l ? (e.style.left = t.left + "px", c.eventMoveToPosition ? e.style.width = c.cellWidth + "px" : e.style.width = t.width + "px", e.start = t.start, e.end = t.end) : (e.style.left = i.part.left + "px", e.start = i.start(), e.end = i.rawend(), t.left = i.part.left), function() {
							var n = e.row,
								a = i.data,
								o = t.width,
								r = t.left,
								l = DayPilot.list(w.list).map(function(e) {
									return e.event.data
								}).add(a);
							c.jj(e, n, r, o, l)
						}(), function() {
							var t = c.Hc;
							if (!t || t.start.getTime() !== e.start.getTime() || t.end.getTime() !== e.end.getTime() || t.resource !== e.row.id) {
								w.update();
								var r = !! n.drag && i.part.external,
									l = {};
								l.start = e.start, l.end = c.iff (e.end), l.duration = new DayPilot.Duration(l.start, l.end), l.e = i, l.external = r, l.resource = e.row.id, l.html = null, l.row = c.Mh(e.row), l.position = e.line, l.overlapping = e.overlapping || w.forbidden, l.allowed = !0, l.left = {}, l.left.html = l.start.toString(c.eventMovingStartEndFormat, _.locale()), l.left.enabled = c.eventMovingStartEndEnabled, l.left.space = 5, l.left.width = null, l.right = {}, l.right.html = l.end.toString(c.eventMovingStartEndFormat, _.locale()), l.right.enabled = c.eventMovingStartEndEnabled, l.right.space = 5, l.right.width = null, l.multimove = DayPilot.list(w.list), l.shift = c.coords.shift, l.ctrl = c.coords.ctrl, l.meta = c.coords.meta, l.alt = c.coords.alt, l.areaData = DayPilot.Global.movingAreaData, l.link = null;
								var s = {};
								s.event = i, s.start = l.start, s.end = l.end, s.overlapping = l.overlapping, s.resource = l.resource, l.multimove.splice(0, 0, s), c.Hc = l;
								var d = {
									"start": l.start,
									"end": l.end,
									"resource": l.resource
								};
								if ("function" == typeof c.onEventMoving && c.onEventMoving(l), e.allowed = l.allowed, l.start !== d.start || l.end !== d.end) {
									var h = l.start,
										u = c.Ie(l.end);
									e.start = h, e.end = u;
									var f = DayPilot.DateUtil.diff(h, u);
									f = Math.max(f, 1);
									var p = _.useBox(f),
										g = p ? c.getPixels(h).boxLeft : c.getPixels(h).left,
										m = p ? c.getPixels(u).boxRight : c.getPixels(u).left;
									e.style.left = g + "px", e.style.width = m - g + "px"
								}
								if (l.resource !== d.resource) {
									var y = c.vg(l.resource);
									y && (e.row = y, e.style.height = Math.max(y.height, 0) + "px", e.style.top = y.top + "px", c.eventMoveToPosition && (e.style.top = y.top + o + "px", e.style.height = "3px", e.line = a))
								}
								l.html ? e.firstChild.innerHTML = l.html : e.firstChild.innerHTML = "", c.oj(e, l), c.pj(n.movingShadow, l), l.link && (DayPilot.Global.movingLink && DayPilot.Global.movingLink.clear(), DayPilot.Global.movingLink = v.drawLink(l.link.from, e, l.link))
							}
						}()
					}
				}
			}, this.jj = function(e, t, i, n, a) {
				if (!c.allowEventOverlap) {
					!
					function() {
						e.overlapping = !1;
						for (var o = 0; o < t.lines.length; o++) {
							if (!t.lines[o].isFree(i, n, a)) return void(e.overlapping = !0)
						}
						if (c.allowMultiRange) {
							var r = t.index;
							return DayPilot.list(H.list).some(function(t) {
								var a = t.div,
									o = parseInt(a.style.left),
									l = parseInt(a.style.width),
									s = t.start.y;
								return e !== a && (s === r && DayPilot.Util.overlaps(i, i + n, o, o + l))
							}) ? void(e.overlapping = !0) : void 0
						}
					}();
					var o = e.overlapping,
						r = c.q("_shadow_overlap");
					o ? DayPilot.Util.addClass(e, r) : DayPilot.Util.removeClass(e, r)
				}
			}, this.oj = function(e, t) {
				var i = c.q("_shadow_forbidden");
				!t.allowed || w.invalid ? DayPilot.Util.addClass(e, i) : DayPilot.Util.removeClass(e, i)
			}, this.pj = function(e, t) {
				if (this.qj(), e.calendar === c) {
					var i = {};
					i.left = parseInt(e.style.left), i.top = parseInt(e.style.top), i.right = i.left + parseInt(e.style.width);
					var n = t.left.width || 10,
						a = document.createElement("div");
					if (a.style.position = "absolute", a.style.left = i.left - n - t.left.space + "px", a.style.top = i.top + "px", a.style.height = c.eventHeight + "px", a.style.overflow = "hidden", a.style.boxSizing = "border-box", a.innerHTML = t.left.html, a.className = this.q("_event_move_left"), a.onmousemove = c.rj, t.left.enabled) if (c.divHover.appendChild(a), t.left.width) a.style.width = n + "px";
					else {
						a.style.whiteSpace = "nowrap";
						var o = a.offsetWidth,
							r = i.left - o - t.left.space;
						a.style.width = o + "px", a.style.left = r + "px";
						var l = c.nav.scroll.scrollLeft;
						r < l && c.divHover.removeChild(a);
						var s = c.sj() + (r - l);
						s > 0 && (a.style.left = s + "px", a.style.top = i.top - c.nav.scroll.scrollTop + c.Ig() + "px", c.nav.top.appendChild(a), c.elements.hover.push(a))
					}
					var n = t.right.width || 10,
						d = document.createElement("div");
					if (d.style.position = "absolute", d.style.left = i.right + t.right.space + "px", d.style.top = i.top + "px", d.style.height = c.eventHeight + "px", d.style.overflow = "hidden", d.style.boxSizing = "border-box", t.right.width ? d.style.width = t.right.width + "px" : d.style.whiteSpace = "nowrap", d.innerHTML = t.right.html, d.className = this.q("_event_move_right"), d.onmousemove = c.rj, t.right.enabled) {
						c.divHover.appendChild(d);
						var h = c.nav.scroll.scrollWidth;
						i.right + t.right.space + d.offsetWidth >= h && c.divHover.removeChild(d)
					}
				}
			}, this.qj = function() {
				c.divHover.innerHTML = "", DayPilot.de(c.elements.hover), c.elements.hover = []
			}, this.tj = function() {
				var e = c.rowHeaderColumnDefaultWidth;
				this.rowHeaderColumns && (this.rowHeaderCols = DayPilot.Util.propArray(this.rowHeaderColumns, "width", e))
			}, this.sj = function() {
				var e = 0;
				if (this.tj(), this.rowHeaderCols) for (var t = 0; t < this.rowHeaderCols.length; t++) e += this.rowHeaderCols[t];
				else e = this.rowHeaderWidth;
				return e
			}, this.uj = function() {
				return this.vj(c.progressiveRowRenderingPreload)
			}, this.vj = function(e) {
				var e = e || 0,
					t = 0,
					i = c.rowlist.length;
				if (c.progressiveRowRendering) {
					var n = c.xg();
					t = n.yStart, i = n.yEnd + 1, t = Math.max(0, t - e), i = Math.min(c.rowlist.length, i + e)
				}
				return {
					"start": t,
					"end": i
				}
			}, this.wj = function() {
				if (this.Sc()) {
					var e = !1,
						t = 0;
					if (this.rowHeaderWidthAutoFit) {
						var i = this.divHeader;
						if (!i) return;
						if (!i.rows) return;
						for (var n = [], a = c.uj(), o = a.start; o < a.end; o++) {
							var r = i.rows[o];
							if (r && !r.hidden && !r.autofitDone) {
								r.autofitDone = !0;
								for (var l = 0; l < r.cells.length; l++) {
									var s = r.cells[l].firstChild.firstChild;
									if (s && s.style) {
										var d = s.style.width,
											h = s.style.right;
										s.style.position = "absolute", s.style.width = "auto", s.style.right = "auto", s.style.whiteSpace = "nowrap";
										var u = s.offsetWidth + 2;
										s.style.position = "", s.style.width = d, s.style.right = h, s.style.whiteSpace = "", "undefined" == typeof n[l] && (n[l] = 0), n[l] = Math.max(n[l], u)
									}
								}
							}
						}
						if (this.tj(), this.rowHeaderCols) for (var o = 0; o < n.length; o++) this.rowHeaderCols[o] && (n[o] > this.rowHeaderCols[o] && (this.rowHeaderCols[o] = n[o], e = !0), t += this.rowHeaderCols[o]);
						else t = this.rowHeaderWidth, this.rowHeaderWidth < n[0] + c.rowHeaderWidthMarginRight && (t = n[0] + c.rowHeaderWidthMarginRight, e = !0)
					}
					e && (this.ii && (this.ii.widths = this.rowHeaderCols, this.ii.updateWidths(), DayPilot.Util.updatePropsFromArray(this.rowHeaderColumns, "width", this.rowHeaderCols)), this.rowHeaderScrolling || (this.rowHeaderWidth = t), this.oh(), this.xj())
				}
			}, this.ag = function() {
				this.yj = !0, this.tj();
				var e = this.sj(),
					t = this.divHeader;
				if (t) {
					if (DayPilot.browser.ie) for (var i = 0; i < t.childNodes.length; i++) DayPilot.de(t.childNodes[i]);
					t.innerHTML = "", DayPilot.puc(t)
				} else t = document.createElement("div"), t.onmousemove = function() {
					c.S()
				}, this.divHeader = t;
				if (t.style.width = e + "px", t.style.height = 0 + "px", t.rows = [], c.progressiveRowRendering) {
						a();
						//console.log(t.style.height)
				}
				else {
					for (var n = this.rowlist.length, i = 0; i < n; i++){
						c.zj(i);
					}
				}
				c.Aj(), this.divResScroll.appendChild(t), this.rowHeaderWidthAutoFit && this.wj()
			}, this.ph = function() {
				if (c.progressiveRowRendering) {
					for (var e = this.uj(), t = 0; t < c.rowlist.length; t++) e.start <= t && t < e.end ? c.zj(t) : c.Bj(t);
					if (this.rowHeaderWidthAutoFit) {
						var i = c.Jg();
						this.wj();
						if (c.Jg() !== i) {
							var n = this.cellWidth;
							this.Zf();
							this.cellWidth !== n && (c.$f(), c.bg(), c.ja(), c.ba(), c.Cj())
						}
					}
				}
			}, this.Aj = function() {
				var e = c.divHeader,
					t = document.createElement("div");
				t.style.position = "absolute", e.appendChild(t), c.nav.resScrollSpace = t, t.setAttribute("unselectable", "on");
				var i = document.createElement("div");
				i.style.position = "relative", i.style.height = "100%", i.className = this.q("_rowheader"), t.appendChild(i);
				var n = this.sj(),
					t = c.nav.resScrollSpace;
				t.style.width = n + "px", t.style.top = this.Vf + "px", t.style.height = c.divResScroll.clientHeight + 20 + "px"
			}, this.Bj = function(e) {
				var t = c.divHeader.rows[e];
				t && (DayPilot.de(t.cells), c.divHeader.rows[e] = null)
			}, this.yh = function(e) {
				this.Bj(e), this.zj(e)
			}, this.zj = function(e) {
				var t = c.divHeader,
					i = this.divHeader;
				if (!i.rows[e]) {
					var n = this.rowHeaderCols,
						a = n ? this.rowHeaderCols.length : 0,
						o = this.sj(),
						r = this.rowlist[e];
					if (r && !r.hidden) {
						var s = this.gj(r);
						i.rows[e] = {}, i.rows[e].cells = [];
						var d = document.createElement("div");
						d.style.position = "absolute", d.style.top = r.top + "px", d.row = r, d.index = e;
						var h = s.row,
							u = n ? n[0] : this.rowHeaderWidth;
						d.style.width = u + "px", d.style.border = "0px none", h.toolTip && (d.title = h.toolTip), d.setAttribute("unselectable", "on"), "undefined" != typeof h.ariaLabel ? d.setAttribute("aria-label", h.ariaLabel) : d.setAttribute("aria-label", h.html), d.onmousemove = c.Dj, d.onmouseout = c.Ej, d.onmouseup = c.Fj, d.oncontextmenu = c.Gj, d.onclick = c.Hj, d.ondblclick = c.Ij;
						var f = document.createElement("div");
						f.style.width = u + "px", f.setAttribute("unselectable", "on"), f.className = this.q("_rowheader"), h.cssClass && DayPilot.Util.addClass(f, h.cssClass), h.backColor && (f.style.background = h.backColor), f.style.height = r.height + "px", f.style.overflow = "hidden", f.style.position = "relative";
						var v = document.createElement("div");
						v.setAttribute("unselectable", "on"), v.className = this.q("_rowheader_inner"), f.appendChild(v);
						var p = "Disabled" !== this.rowMoveHandling,
							g = 10,
							m = h.areas || [];
						p && !h.moveDisabled && m.push({
							"v": "Hover",
							"w": g,
							"bottom": 0,
							"top": 0,
							"left": 0,
							"css": c.q("_rowmove_handle"),
							"action": "Move"
						});
						var y = c.Mh(r);
						DayPilot.Areas.attach(f, y, {
							"areas": m,
							"allowed": function() {
								return !l.row
							}
						});
						var b = document.createElement("div");
						if (b.style.position = "absolute", b.style.bottom = "0px", b.style.width = "100%", b.style.height = "1px", b.className = this.q(E.resourcedivider), f.appendChild(b), function() {
							if (c.treeEnabled && !r.isNewRow) {
								var t = r.level * c.treeIndent + c.treeImageMarginLeft;
								p && (t += g);
								var i = 10,
									n = document.createElement("div");
								n.style.width = "10px", n.style.height = "10px", n.style.backgroundRepeat = "no-repeat", n.style.position = "absolute", n.style.left = t + "px", n.style.top = c.treeImageMarginTop + "px", r.loaded || 0 !== r.children.length ? r.children.length > 0 ? (r.expanded ? n.className = c.q("_tree_image_collapse") : n.className = c.q("_tree_image_expand"), n.style.cursor = "pointer", n.index = e, n.onclick = function(e) {
									c.Yi(this.index), e = e || window.event, e.cancelBubble = !0
								}) : n.className = c.q("_tree_image_no_children") : (n.className = c.q("_tree_image_expand"), n.style.cursor = "pointer", n.index = e, n.onclick = function(e) {
									c.Jj(this.index), e = e || window.event, e.cancelBubble = !0
								}), v.appendChild(n)
							}
							var a = document.createElement("div");
							c.treeEnabled && (a.style.marginLeft = t + i + "px"), a.innerHTML = h.html, d.textDiv = a, d.cellDiv = f, v.appendChild(a)
						}(), d.appendChild(f), t.appendChild(d), i.rows[e].cells.push(d), r.columns && 0 !== r.columns.length) for (var w = u, D = 1; D < a; D++) {
							var k = h.columns[D - 1] || {},
								d = document.createElement("div");
							d.style.position = "absolute", d.style.top = r.top + "px", d.style.left = w + "px", t.appendChild(d), i.rows[e].cells.push(d), d.row = r, d.index = e, h.toolTip && (d.title = h.toolTip), d.setAttribute("unselectable", "on"), d.onmousemove = c.Dj, d.onmouseout = c.Ej, d.onmouseup = c.Fj, d.oncontextmenu = c.Gj, d.onclick = c.Hj, d.ondblclick = c.Ij;
							var f = document.createElement("div"),
								x = n[D];
							w += x;
							var C = k.backColor || h.backColor;
							C && (f.style.backgroundColor = C), f.style.width = x + "px", f.style.height = r.height + "px", f.style.overflow = "hidden", f.style.position = "relative", f.setAttribute("unselectable", "on"), DayPilot.Util.addClass(f, this.q("_rowheader")), DayPilot.Util.addClass(f, this.q("_rowheadercol")), DayPilot.Util.addClass(f, this.q("_rowheadercol" + D)), h.cssClass && DayPilot.Util.addClass(f, h.cssClass), k.cssClass && DayPilot.Util.addClass(f, k.cssClass);
							var v = document.createElement("div");
							v.setAttribute("unselectable", "on"), v.className = this.q("_rowheader_inner"), f.appendChild(v);
							var b = document.createElement("div");
							b.style.position = "absolute", b.style.bottom = "0px", b.style.width = "100%", b.style.height = "1px", b.className = this.q("_resourcedivider"), f.appendChild(b);
							var P = document.createElement("div"),
								S = k.html || "";
							P.innerHTML = S, d.textDiv = P, d.cellDiv = f, v.appendChild(P), DayPilot.Areas.attach(f, y, {
								"areas": k.areas,
								"allowed": function() {
									return !l.row
								}
							}), d.appendChild(f)
						} else d.colSpan = a > 0 ? a : 1, f.style.width = o + "px"
					}
				}
			}, this.Gj = function() {
				var e = this.row;
				return e.contextMenu && e.contextMenu.show(c.Mh(e)), !1
			}, this.Hj = function(e) {
				if (!x.cancelClick) {
					var t = this.row,
						i = c.Mh(t, this.index);
					return t.isNewRow ? void c.Sh.edit(t) : void c.Ph(i, e.ctrlKey, e.shiftKey, e.metaKey)
				}
			}, this.Ij = function(e) {
				if (c.timeouts.resClick) {
					for (var t in c.timeouts.resClick) window.clearTimeout(c.timeouts.resClick[t]);
					c.timeouts.resClick = null
				}
				var i = this.row,
					n = c.Mh(i, this.index);
				if (c.sa()) {
					var a = {};
					if (a.resource = n, a.row = n, a.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onRowDoubleClick && (c.onRowDoubleClick(a), a.preventDefault.value)) return;
					switch (c.rowDoubleClickHandling) {
					case "PostBack":
						c.rowDoubleClickPostBack(n);
						break;
					case "CallBack":
						c.rowDoubleClickCallBack(n);
						break;
					case "Select":
						c.Rh(i, e.ctrlKey, e.shiftKey, e.metaKey);
						break;
					case "Edit":
						c.Sh.edit(i)
					}
					"function" == typeof c.onRowDoubleClicked && c.onRowDoubleClicked(a)
				} else switch (c.rowDoubleClickHandling) {
				case "PostBack":
					c.rowDoubleClickPostBack(n);
					break;
				case "CallBack":
					c.rowDoubleClickCallBack(n);
					break;
				case "JavaScript":
					c.onRowDoubleClick(n);
					break;
				case "Select":
					c.Rh(i, e.ctrlKey, e.shiftKey, e.metaKey);
					break;
				case "Edit":
					c.Sh.edit(i)
				}
			}, this.rowDoubleClickPostBack = function(e, t) {
				var i = {};
				i.resource = e, this.E("RowDoubleClick", i, t)
			}, this.rowDoubleClickCallBack = function(e, t) {
				var i = {};
				i.resource = e, this.G("RowDoubleClick", i, t)
			}, this.Kj = function(e) {
				var t = {};
				t.start = this.cell.start, t.level = this.cell.level, t.end = this.cell.end, t.end || (t.end = new DayPilot.Date(t.start).addMinutes(c.cellDuration)), c.Th(t)
			}, this.Mh = function(e) {
				return new DayPilot.Row(e, c)
			}, this.Ug = function(e) {
				var t = this.rowlist[e];
				if (t.events || t.resetEvents(), !t.data) {
					t.data = {}, t.data.start = new DayPilot.Date(t.start), t.data.startTicks = t.data.start.getTime();
					var i = this.Xg().getTime() - this.Ba().getTime();
					t.data.end = _.isResourcesView() ? t.data.start.addTime(i) : t.data.start.addDays(1), t.data.endTicks = t.data.end.getTime(), t.data.offset = t.start.getTime() - this.Ba().getTime(), t.data.i = e
				}
			}, this.ba = function(e) {
				if (e ? this.events.list = e : this.events.list || (this.events.list = []), null != this.events.list && !DayPilot.isArray(this.events.list)) throw "DayPilot.Scheduler.events.list expects an array object";
				D.prepareRows(!0);
				for (var t, i = this.events.list, n = i.length, a = "function" == typeof this.onBeforeEventRender, o = "Resources" === c.viewType, r = 0; r < n; r++) {
					var l = i[r];
					if (l) {
						if (l instanceof DayPilot.Event) throw "DayPilot.Scheduler: DayPilot.Event object detected in events.list array. Use raw event data instead.";
						a && this.Xc(r), "*" === l.resource ? t = c.rowlist : o ? t = DayPilot.list(D.rowcache[l.resource]).concat(D.rowcache["*"]) : "Days" === c.viewType ? t = c.rowlist : "Gantt" === c.viewType && (t = D.rowcache[l.id]);
						for (var s = 0; t && s < t.length; s++) {
							var d = t[s],
								h = this.wi(l, d);
							h && a && (h.cache = this.t.events[r])
						}
					}
				}
				DayPilot.list(c.rowlist).each(function(e) {
					c.Ai(e)
				}), this.jh()
			}, this.Lj = {};
			var D = this.Lj;
			D.rowCache = {}, D.prepareRows = function(e) {
				D.rowcache = {};
				for (var t = 0; t < c.rowlist.length; t++) {
					var i = c.rowlist[t];
					if (e && i.resetEvents(), c.Ug(t), i.id) {
						var n = i.id.toString();
						D.rowcache[n] || (D.rowcache[n] = DayPilot.list()), D.rowcache[n].push(i)
					}
				}
			}, D.loadEvent = function(e) {}, this.vi = function() {
				var e = {};
				if ("Resources" !== c.viewType) return !1;
				for (var t = 0; t < c.rowlist.length; t++) {
					var i = c.rowlist[t],
						n = i.id;
					if (e[n]) return !0;
					e[n] = !0
				}
				return !1
			}, this.Xc = function(e) {
				var t = this.t.events,
					i = this.events.list[e],
					n = {};
				i instanceof DayPilot.Event && (i = i.data);
				for (var a in i) n[a] = i[a];
				if ("function" == typeof this.onBeforeEventRender) {
					var o = {};
					o.e = n, o.data = n, this.onBeforeEventRender(o)
				}
				t[e] = n
			}, this.Ai = function(e) {
				if (e.lines = [], e.sections = null, !e.isNewRow) {
					this.sortDirections ? e.events.sort(this.dd) : c.cellStacking || e.events.sort(this.cd);
					if (c.cellStacking) return void S.loadRow(e);
					var t = c.groupConcurrentEvents;
					if (t) for (var i = 0; i < e.blocks.length; i++) e.blocks[i].clear();
					DayPilot.list(e.events).each(function(t) {
						if (!t.part.height) return e.eventHeight ? void(t.part.height = e.eventHeight) : void(t.part.height = _.eventHeight())
					});
					for (var n = 0; n < e.events.length; n++) {
						var a = e.events[n];
						e.putIntoLine(a), t && e.putIntoBlock(a)
					}
					for (var o = 0, i = 0; i < e.lines.length; i++) {
						var r = e.lines[i];
						r.top = o, o += (r.height || e.eventHeight) * e.eventStackingLineHeight / 100
					}
					if (t) for (var n = 0; n < e.blocks.length; n++) {
						var l = e.blocks[n];
						l.lines = [], l.events.sort(this.dd);
						for (var s = 0; s < l.events.length; s++) {
							var a = l.events[s];
							l.putIntoLine(a)
						}
						l.lines.length <= c.groupConcurrentEventsLimit && (l.expanded = !0);
						var d = DayPilot.list(l.events).map(function(e) {
							return e.id()
						}).some(function(e) {
							return DayPilot.contains(c.Mj, e)
						});
						d && (l.expanded = !0);
						for (var o = 0, i = 0; i < l.lines.length; i++) {
							var r = l.lines[i];
							r.top = o, o += (r.height || e.eventHeight) * e.eventStackingLineHeight / 100
						}
					}
				}
			}, this.ih = function(e) {
				e = DayPilot.ua(e);
				for (var t = 0; t < e.length; t++) {
					var i = e[t];
					c.Ai(c.rowlist[i])
				}
				if (c.cellStacking) S.calculateEventPositions();
				else for (var t = 0; t < e.length; t++) {
					var i = e[t],
						n = c.rowlist[i];
					c.ej(n)
				}
			}, this.Ki = function() {
				var e = "Manual" === c.scale ? c.itline[0].start : c.startDate;
				return DayPilot.list(c.rowlist).some(function(t) {
					return !!t.start && t.start.getTime() !== new DayPilot.Date(e).getTime()
				})
			}, this.wi = function(e, t) {
				if (!t.hideEvents) {
					var i = new DayPilot.Date(e.start),
						n = new DayPilot.Date(e.end);
					n = c.Ie(n);
					var a = i.ticks,
						o = n.ticks;
					if (o < a) return null;
					var r = null;
					if ("function" == typeof c.onBeforeEventRender) {
						var l = DayPilot.indexOf(c.events.list, e);
						r = c.t.events[l]
					}
					if (r) {
						if (r.hidden) return null
					} else if (e.hidden) return null;
					var s = !1;
					switch (this.viewType) {
					case "Days":
						s = !(o <= t.data.startTicks || a >= t.data.endTicks) || a === o && a === t.data.startTicks;
						break;
					case "Resources":
						s = (t.id === e.resource || "*" === t.id || "*" === e.resource) && (!(o <= t.data.startTicks || a >= t.data.endTicks) || a === o && a === t.data.startTicks);
						break;
					case "Gantt":
						s = t.id === e.id && !(o <= t.data.startTicks || a >= t.data.endTicks)
					}
					if (!s) return null;
					var d = new DayPilot.Event(e, c);
					d.part.dayIndex = t.data.i, d.part.start = t.data.startTicks < a ? i : t.data.start, d.part.end = t.data.endTicks > o ? n : t.data.end;
					var h = this.getPixels(d.part.start.addTime(-t.data.offset)),
						u = this.getPixels(d.part.end.addTime(-t.data.offset));
					d.part.start === d.part.end && (u = this.getPixels(d.part.end.addTime(-t.data.offset).addSeconds(1))), r && r.height ? d.part.height = r.height : e.height && (d.part.height = e.height), d.part.Nj = function() {
						var e = this.height;
						if (c.eventVersionsEnabled && !DayPilot.list(d.data.versions).isEmpty()) {
							var t = d.versions.length;
							e += t * c.eventVersionHeight, e += t * c.eventVersionMargin
						}
						return e + c.eventMarginBottom
					};
					var f = h.left,
						v = u.left;
					if (d.part.startPixels = h, d.part.endPixels = u, f === v) {
						if (h.cut || u.cut) return null;
						var p = (d.part.start.addTime(-t.data.offset).getTime() + d.part.end.addTime(-t.data.offset).getTime()) / 2;
						if (c.getPixels(new DayPilot.Date(Math.floor(p))).cut) return null
					}
					d.part.box = _.useBox(o - a);
					var g = c.eventHeight;
					if ("Milestone" === e.type) {
						var m = e.width || g;
						d.part.end = d.part.start, d.part.left = f - m / 2, d.part.width = m, d.part.barLeft = 0, d.part.barWidth = m
					} else if (d.part.box) {
						var y = h.boxLeft,
							b = u.boxRight;
						d.part.left = y, d.part.width = b - y, d.part.barLeft = Math.max(f - d.part.left, 0), d.part.barWidth = Math.max(v - f, 1)
					} else d.part.left = f, d.part.width = Math.max(v - f, 1), d.part.barLeft = 0, d.part.barWidth = Math.max(v - f - 1, 1);
					if (c.eventVersionsEnabled && c.Oj(d, t), "function" == typeof c.onEventFilter && c.events.bd) {
						var w = {};
						if (w.filter = c.events.bd, w.visible = !0, w.e = d, c.onEventFilter(w), !w.visible) return null
					}
					return t.events.push(d), d
				}
			}, this.Oj = function(e, t) {
				e.versions = [];
				var i = e.data,
					n = DayPilot.list(i.versions);
				n.isEmpty() || n.each(function(i) {
					var n = new DayPilot.Date(i.start),
						a = new DayPilot.Date(i.end),
						o = c.getPixels(n.addTime(-t.data.offset)),
						r = c.getPixels(a.addTime(-t.data.offset));
					n.ticks === a.ticks && (r = c.getPixels(a.addTime(-t.data.offset).addTime(1)));
					var l = o.left,
						s = r.left;
					if (l === s && (o.cut || r.cut)) return null;
					var d = {};
					d.left = l, d.continueLeft = n < t.data.start, d.right = s, d.continueRight = a > t.data.end, d.width = s - l, e.versions.push(d)
				})
			}, this.cd = function(e, t) {
				if (!(e && t && e.start && t.start)) return 0;
				var i = e.start().ticks - t.start().ticks;
				return 0 !== i ? i : t.end().ticks - e.end().ticks
			}, this.dd = function(e, t) {
				if (!e || !t) return 0;
				if (!(e.data && t.data && e.data.sort && t.data.sort && 0 !== e.data.sort.length && 0 !== t.data.sort.length)) return c.cd(e, t);
				for (var i = 0, n = 0; 0 === i && "undefined" != typeof e.data.sort[n] && "undefined" != typeof t.data.sort[n];) i = e.data.sort[n] === t.data.sort[n] ? 0 : "number" == typeof e.data.sort[n] && "number" == typeof t.data.sort[n] ? e.data.sort[n] - t.data.sort[n] : c.ed(e.data.sort[n], t.data.sort[n], c.sortDirections[n]), n++;
				return i
			}, this.ed = function(e, t, i) {
				var n = "desc" !== i,
					a = n ? -1 : 1,
					o = -a;
				if (null === e && null === t) return 0;
				if (null === t) return o;
				if (null === e) return a;
				var r = [];
				return r[0] = e, r[1] = t, r.sort(), e === r[0] ? a : o
			}, this.Rh = function(e, t, i, n) {
				if (c.sa()) {
					var a = DayPilot.indexOf(c.rowlist, e),
						o = c.Mh(e, a),
						r = DayPilot.indexOf(x.selected, e) !== -1,
						l = r ? "deselected" : "selected",
						s = {};
					if (s.row = o, s.selected = r, s.ctrl = t, s.shift = i, s.meta = n, s.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onRowSelect && (c.onRowSelect(s), s.preventDefault.value)) return;
					var d = i && !t && !n;
					if (i || (x.Pj = {
						"row": e,
						"index": a
					}), d) {
						x.fixRowSelectLast();
						var h = x.Pj.index,
							u = a;
						x.selectRange(h, u)
					}
					switch (c.rowSelectHandling) {
					case "PostBack":
						c.rowSelectPostBack(o, l);
						break;
					case "CallBack":
						c.rowSelectCallBack(o, l);
						break;
					case "Notify":
						!d && x.select(e, t, i, n), c.rowSelectNotify(o, l);
						break;
					case "Update":
						!d && x.select(e, t, i, n)
					}
					"function" == typeof c.onRowSelected && (s.selected = DayPilot.indexOf(x.selected, e) !== -1, c.onRowSelected(s))
				} else {
					x.select(e, t, i);
					var a = DayPilot.indexOf(c.rowlist, e),
						o = c.Mh(e, a),
						r = DayPilot.indexOf(x.selected, e) !== -1,
						l = r ? "deselected" : "selected";
					switch (c.rowSelectHandling) {
					case "PostBack":
						c.rowSelectPostBack(o, l);
						break;
					case "CallBack":
						c.rowSelectCallBack(o, l);
						break;
					case "Notify":
						c.rowSelectNotify(o, l);
						break;
					case "JavaScript":
						c.onRowSelect(o, l)
					}
				}
			}, this.rowSelectPostBack = function(e, t, i) {
				var n = {};
				n.resource = e, n.change = t, this.E("RowSelect", n, i)
			}, this.rowSelectCallBack = function(e, t, i) {
				var n = {};
				n.resource = e, n.change = t, this.G("RowSelect", n, i)
			}, this.rowSelectNotify = function(e, t, i) {
				var n = {};
				n.resource = e, n.change = t, this.G("RowSelect", n, i, "Notify")
			}, this.rows = {}, this.rows.selection = {};
			var k = this.rows.selection;
			k.get = function() {
				var e = [];
				return DayPilot.list(x.selected).each(function(t) {
					e.push(c.Mh(t))
				}), e
			}, k.clear = function() {
				x.clearSelection()
			}, k.add = function(e) {
				if (!e || !e.isRow) throw "DayPilot.Scheduler.rows.selection.add(): DayPilot.Row object expected";
				DayPilot.list(x.selected).some(function(t) {
					return t === e.$.row
				}) || x.selected.push(e.$.row), x.Qj(), k.Rj()
			}, k.remove = function(e) {
				if (!e || !e.isRow) throw "DayPilot.Scheduler.rows.selection.remove(): DayPilot.Row object expected";
				k.isSelected(e) && (x.unselect(e.$.row), DayPilot.rfa(x.selected, e.$.row)), k.Rj()
			}, k.isSelected = function(e) {
				if (!e || !e.isRow) throw "DayPilot.Scheduler.rows.selection.isSelected(): DayPilot.Row object expected";
				return DayPilot.indexOf(x.selected, e.$.row) !== -1
			}, k.Rj = function() {
				c.selectedRows = DayPilot.list(x.selected).map(function(e) {
					return e.id
				})
			}, this.rows.all = function() {
				for (var e = [], t = 0; t < c.rowlist.length; t++) {
					var i = c.Mh(c.rowlist[t]);
					e.push(i)
				}
				return p(e)
			}, this.rows.visible = function() {
				for (var e = [], t = 0; t < c.rowlist.length; t++) {
					var i = c.rowlist[t];
					if (!i.hidden) {
						var i = c.Mh(c.rowlist[t]);
						e.push(i)
					}
				}
				return p(e)
			}, this.rows.each = function(e) {
				c.rows.all().each(e)
			}, this.rows.filter = function(e) {
				c.rows.bd = e, c.A && c.gd({
					"immediateEvents": !0
				})
			}, this.rows.find = function(e, t) {
				var i = DayPilot.list(D.rowcache[e]),
					n = null;
				return n = "string" == typeof t ? i.find(function(e) {
					return t === e.start.toString()
				}) : i.first(), n ? new DayPilot.Row(n, c) : null
			}, this.rows.load = function(e, t, i) {
				if (!e) throw new DayPilot.Error("rows.load(): 'url' parameter required");
				console.log("throw14");
				var n = function(e) {
						var t = {};
						t.exception = e.exception, t.request = e.request, "function" == typeof i && i(t)
					},
					a = function(e) {
						var i, a = e.request;
						try {
							i = DayPilot.Util.parseJSON(a.responseText)
						} catch (e) {
							var o = {};
							return o.exception = e, void n(o)
						}
						if (DayPilot.isArray(i)) {
							var r = {};
							if (r.preventDefault = function() {
								this.preventDefault.value = !0
							}, r.data = i, "function" == typeof t && t(r), r.preventDefault.value) return;
							c.resources = i, c.A && c.update()
						}
					};
				c.rowsLoadMethod && "POST" === c.rowsLoadMethod.toUpperCase() ? DayPilot.ajax({
					"method": "POST",
					"url": e,
					"success": a,
					"error": n
				}) : DayPilot.ajax({
					"method": "GET",
					"url": e,
					"success": a,
					"error": n
				})
				console.log(e);
				console.log(r);
			}, this.rows.expand = function(e) {
				for (var t = [], i = e || 1, n = 0; n < c.rowlist.length; n++) {
					var a = c.rowlist[n],
						o = i === -1;
					a.level < i && (o = !0), o && !a.expanded && a.children && a.children.length > 0 && t.push(a.index)
				}
				if (0 !== t.length) if (1 === t.length) c.Yi(t[0]);
				else {
					for (var n = 0; n < t.length; n++) {
						var r = t[n],
							l = c.rowlist[r].resource;
						l.expanded = !0
					}
					c.gd()
				}
			}, this.rows.expandAll = function() {
				c.rows.expand(-1)
			}, this.rows.collapseAll = function() {
				c.rowlist.each(function(e) {
					e.resource.expanded = !1
				}), c.gd()
			}, this.rows.headerHide = function() {
				c.Sj = !0, c.Tj(), c.xj(), c.Og()
			}, this.rows.headerShow = function() {
				c.Sj = !1, c.Tj(), c.xj(), c.Og()
			}, this.rows.headerToggle = function() {
				c.Sj ? c.rows.headerShow() : c.rows.headerHide()
			}, this.rows.edit = function(e) {
				x.edit(e.$.row)
			}, this.rows.remove = function(e) {
				var t = e.$.row.resource,
					i = C.findParentArray(t);
				if (!i) throw "Cannot find source node parent";
				var n = DayPilot.indexOf(i, t);
				i.splice(n, 1), c.update()
			}, this.rows.update = function(e) {
				if (!(e instanceof DayPilot.Row)) throw new DayPilot.Exception("DayPilot.Scheduler.rows.update() expects a DayPilot.Row object.");
				console.log("throw15");
				var t = e.index,
					i = c.rowlist[t],
					n = e.data,
					a = e.parent() ? e.parent().$.row : null,
					o = c.Uj(n),
					e = c.Vj(o, a);
				e.hidden = i.hidden, e.level = i.level, e.children = i.children, e.index = t, e.top = i.top, e.height = i.height, c.rowlist[t] = e, e.resetEvents(), c.Ug(t), c.Wj(e), c.Ai(e), c.yh(t), c.fg(), c.ig()
			}, this.Wj = function(e) {
				for (var t = c.events.list, i = t.length, n = "function" == typeof c.onBeforeEventRender, a = 0; a < i; a++) {
					var o = t[a];
					if (o) {
						if (o instanceof DayPilot.Event) throw new DayPilot.Exception("DayPilot.Scheduler: DayPilot.Event object detected in events.list array. Use raw event data instead.");
						if ("Days" === c.viewType) throw new DayPilot.Exception(".rows.update() not supported for viewType = 'Days'.");
						if ("Gantt" === c.viewType) throw new DayPilot.Exception(".rows.update() not supported for viewType = 'Gantt'.");
						if ("*" === o.resource || "*" === e.id || o.resource === e.id) {
							n && this.Xc(a);
							var r = this.wi(o, e);
							r && n && (r.cache = this.t.events[a])
						}
						console.log("throw16");
					}
				}
			}, this.Xj = function() {
				var e = l.source,
					t = l.target,
					i = l.position,
					n = l.sourceCalendar;
				if (x.resetMoving(), c.sa()) {
					var a = {};
					if (a.source = c.Mh(e), a.source.calendar = n, a.target = c.Mh(t), a.position = i, a.preventDefault = function() {
						this.preventDefault.value = !0
					}, "function" == typeof c.onRowMove && (c.onRowMove(a), a.preventDefault.value)) return;
					switch (c.rowMoveHandling) {
					case "Update":
						x.move(a);
						break;
					case "CallBack":
						c.rowMoveCallBack(a.source, a.target, a.position);
						break;
					case "PostBack":
						c.rowMovePostBack(a.source, a.target, a.position);
						break;
					case "Notify":
						x.move(a), c.rowMoveNotify(a.source, a.target, a.position)
					}
					"function" == typeof c.onRowMoved && c.onRowMoved(a)
				} else {
					var e = c.Mh(e),
						t = c.Mh(t),
						i = i;
					switch (c.rowMoveHandling) {
					case "CallBack":
						c.rowMoveCallBack(e, t, i);
						break;
					case "PostBack":
						c.rowMovePostBack(e, t, i);
						break;
					case "JavaScript":
						c.onRowMove(e, t, i)
					}
				}
			}, this.ng = function(e) {
				var t = DayPilot.list(e);
				x.selected = [], t.isEmpty() || (c.Pf = !1, c.aa()), t.each(function(e) {
					var t = c.vg(e);
					t && x.selected.push(t)
				}), x.Qj()
			}, this.Sh = {};
			var x = this.Sh;
			x.edit = function(e) {
				x.Yj(e)
			}, x.rowSelectLastSetDefault = function() {
				x.Pj = {
					"row": c.rowlist[0],
					"index": 0
				}
			}, x.rowSelectSetLast = function(e) {
				var t = DayPilot.indexOf(c.rowlist, e);
				if (t === -1) throw "DayPilot.Scheduler: Row not found when selecting a range";
				x.Pj = {
					"row": e,
					"index": t
				}
			}, x.fixRowSelectLast = function() {
				x.Pj || x.rowSelectLastSetDefault();
				var e = DayPilot.indexOf(c.rowlist, x.Pj.row);
				if (!(e > -1)) {
					var t = c.vg(x.Pj.row.id);
					t ? (e = DayPilot.indexOf(c.rowlist, t), x.Pj = {
						"row": t,
						"index": e
					}) : x.rowSelectLastSetDefault()
				}
			}, x.createOverlay = function(e) {
				var t = c.sj(),
					i = c.q("_rowmove_source"),
					n = DayPilot.Util.div(c.divHeader, 0, e.top, t, e.height);
				n.className = i, e.moveOverlay = n
			}, x.deleteOverlay = function(e) {
				DayPilot.de(e.moveOverlay), e.moveOverlay = null
			}, x.Yj = function(e) {
				var t = x.Zj(e),
					i = t.cells[0];
				if (i.input) return i.input;
				DayPilot.Areas.disable(i.firstChild);
				var n = i.clientWidth;
				e.isNewRow && (n = c.Jg());
				var o = document.createElement("textarea");
				o.style.position = "absolute", o.style.top = "0px", o.style.left = "0px", o.style.width = n + "px", o.style.height = e.height + "px", o.style.border = "0px none", o.style.overflow = "hidden", o.style.boxSizing = "border-box", o.style.resize = "none", o.style.paddingLeft = e.level * c.treeIndent + "px";
				var r = i.textDiv;
				o.style.fontFamily = DayPilot.gs(r, "fontFamily") || DayPilot.gs(r, "font-family"), o.style.fontSize = DayPilot.gs(r, "fontSize") || DayPilot.gs(r, "font-size"), o.value = e.name || "", i.firstChild.appendChild(o), i.input = o;
				var l = function() {
						try {
							i.input.parentNode.removeChild(i.input)
						} catch (e) {
							a()
						}
						i.input = null
					};
				return o.focus(), o.onblur = function() {
					o.onblur = null;
					var t = o.value;
					l(), DayPilot.Areas.enable(i.firstChild), c.Oh(e, t, o.canceled)
				}, o.onkeydown = function(e) {
					var t = window.event ? event.keyCode : e.keyCode;
					return 27 === t && (o.canceled = !0, l()), 13 !== t || (o.onblur(), !1)
				}, o.setSelectionRange ? o.setSelectionRange(0, 9999) : o.select(), o
			}, x.selected = [], x.select = function(e, t, i, n) {
				var a = DayPilot.indexOf(x.selected, e) !== -1;
				if (t || n) {
					if (a) return x.unselect(e), void DayPilot.rfa(x.selected, e)
				} else a = !1, x.clearSelection();
				x.$j(e), a || x.selected.push(e), k.Rj()
			}, x.selectRange = function(e, t) {
				x.clearSelection();
				for (var i = Math.min(e, t), n = Math.max(e, t), a = i; a <= n; a++) {
					var o = c.rowlist[a];
					x.$j(o), x.selected.push(o)
				}
				k.Rj()
			}, x.Qj = function() {
				for (var e = 0; e < x.selected.length; e++) {
					var t = x.selected[e];
					x.$j(t)
				}
			}, x.$j = function(e) {
				var t = DayPilot.indexOf(c.rowlist, e);
				if (t === -1) {
					var i = c.vg(e.id);
					if (!i) return;
					t = i.index
				}
				for (var n = c.q("_cell_selected"), a = [], o = 0; o < c.itline.length; o++) {
					var r = {};
					r.x = o, r.y = t, a.push(r)
				}
				c.cells.findXy(a).addClass(n);
				for (var n = c.q("_rowheader_selected"), l = c.divHeader, t = 0; t < l.rows.length; t++) {
					var s = l.rows[t];
					if (s && s.cells[0] && s.cells[0].row === e) for (var d = 0; d < s.cells.length; d++) {
						var r = s.cells[d],
							h = r.firstChild;
						DayPilot.Util.addClass(h, n)
					}
				}
			}, x.Zh = function() {
				var e = [];
				if (!x.selected) return e;
				for (var t = 0; t < x.selected.length; t++) {
					var i = x.selected[t],
						n = DayPilot.indexOf(c.rowlist, i),
						a = c.Mh(i, n);
					e.push(a.toJSON())
				}
				return e
			}, x.unselect = function(e) {
				for (var t = c.q("_cell_selected"), i = DayPilot.indexOf(c.rowlist, e), n = [], a = 0; a < c.itline.length; a++) {
					var o = {};
					o.x = a, o.y = i, n.push(o)
				}
				c.cells.findXy(n).removeClass(t);
				var t = c.q("_rowheader_selected"),
					r = (c.divHeader, x.Zj(e));
				if (r) for (var l = 0; l < r.cells.length; l++) {
					var o = r.cells[l],
						s = o.firstChild;
					DayPilot.Util.removeClass(s, t)
				}
			}, x.Pj = null, x.clearSelection = function() {
				for (var e = 0; e < x.selected.length; e++) {
					var t = x.selected[e];
					x.unselect(t)
				}
				x.selected = [], c.selectedRows = []
			}, x.Zj = function(e) {
				for (var t = c.divHeader, i = 0; i < t.rows.length; i++) {
					var n = t.rows[i];
					if (n && n.cells[0] && n.cells[0].row === e) return n
				}
				return null
			}, x.selectById = function(e) {
				var t = c.vg(e);
				t && x.select(t)
			}, x.startMoving = function(e) {
				var t = DayPilot.Global.rowmoving;
				t.row = e, t.sourceCalendar = c, t.cursor = c.divResScroll.style.cursor, c.divResScroll.style.cursor = "move", x.createOverlay(e)
			}, x.resetMoving = function() {
				c.divResScroll.style.cursor = l.cursor, DayPilot.de(l.div), x.deleteOverlay(l.row), DayPilot.Global.rowmoving = l = {}
			}, x.move = function(e) {
				var t = e.source.$.row.resource,
					i = e.target.$.row.resource,
					n = e.position;
				if ("forbidden" !== n) {
					var a = e.source.calendar._j.findParentArray(t);
					if (!a) throw "Cannot find source node parent";
					var o = DayPilot.indexOf(a, t);
					a.splice(o, 1);
					var r = C.findParentArray(i);
					if (!r) throw "Cannot find target node parent";
					var l = DayPilot.indexOf(r, i);
					switch (n) {
					case "before":
						r.splice(l, 0, t);
						break;
					case "after":
						r.splice(l + 1, 0, t);
						break;
					case "child":
						i.children || (i.children = [], i.expanded = !0), i.children.push(t)
					}
					c.update()
				}
			};
			var C = {};
			this._j = C, C.findParentArray = function(e) {
				return C.findInArray(c.resources, e)
			}, C.findInArray = function(e, t) {
				if (DayPilot.indexOf(e, t) !== -1) return e;
				for (var i = 0; i < e.length; i++) {
					var n = e[i];
					if (n.children && n.children.length > 0) {
						var a = C.findInArray(n.children, t);
						if (a) return a
					}
				}
				return null
			}, this._f = function() {
				this.rowlist = DayPilot.list();
				var e = this.resources,
					t = this.r();
				t || ("Gantt" === this.viewType ? e = this.ak() : "Days" === this.viewType && (e = this.bk())), !t || "Days" !== this.viewType || e && 0 !== e.length || (e = this.bk());
				var i = {};
				if (i.i = 0, null != e && !DayPilot.isArray(e)) throw "DayPilot.Scheduler.resources expects an array object";
				this.ck(e, i, 0, null, this.treeEnabled, !1), "Disabled" !== c.rowCreateHandling && this.dk()
			}, this.dk = function() {
				var e = {};
				e.id = "NEW", e.isNewRow = !0, e.html = "", e.index = c.rowlist.length, e.loaded = !0, e.start = this.startDate, e.children = [], e.height = c.eventHeight, e.marginBottom = 0, e.marginTop = 0, e.getHeight = function() {
					return c.rowCreateHeight ? c.rowCreateHeight : c.eventHeight + c.rowMarginBottom + c.rowMarginTop
				}, e.putIntoLine = function() {}, e.resetEvents = function() {}, this.rowlist.push(e)
			}, this.ak = function() {
				var e = [];
				if (this.Rf && this.resources) for (var t = 0; t < this.resources.length; t++) e.push(this.resources[t]);
				if (this.events.list) {
					for (var t = 0; t < this.events.list.length; t++) {
						var i = this.events.list[t],
							n = {};
						n.id = i.id, n.name = i.text, e.push(n)
					}
					return e
				}
			}, this.bk = function() {
				for (var e = [], t = c.Ba(), i = this.vc.locale(), n = 0; n < this.days; n++) {
					var a = t.addDays(n),
						o = {};
					o.name = a.toString(i.datePattern, i), o.start = a, e.push(o)
				}
				return e
			}, this.Ba = function() {
				return this.itline && this.itline.length > 0 ? this.itline[0].start : this.startDate
			}, this.Xg = function() {
				if (this.itline && this.itline.length > 0) {
					var e = c.itline[this.itline.length - 1].end;
					return "Days" !== c.viewType ? e : e.addDays(c.days - 1)
				}
				return c.startDate.addDays(c.days)
			}, this.ek = {};
			this.ek;
			this.visibleStart = function() {
				return this.Ba()
			}, this.visibleEnd = function() {
				return this.Xg()
			}, this.Vj = function(e, t) {
				var i = {};
				if (i.backColor = e.backColor, i.cssClass = e.cssClass, i.expanded = e.expanded, i.name = e.name, i.html = e.html ? e.html : i.name, i.eventHeight = "undefined" != typeof e.eventHeight ? e.eventHeight : c.vc.eventHeight(), i.minHeight = "undefined" != typeof e.minHeight ? e.minHeight : c.rowMinHeight, i.marginBottom = "undefined" != typeof e.marginBottom ? e.marginBottom : c.rowMarginBottom, i.marginTop = "undefined" != typeof e.marginTop ? e.marginTop : c.rowMarginTop, i.eventStackingLineHeight = "undefined" != typeof e.eventStackingLineHeight ? e.eventStackingLineHeight : c.eventStackingLineHeight, i.loaded = !e.dynamicChildren, i.id = e.id || e.value, i.toolTip = e.toolTip, i.children = [], i.columns = [], i.start = e.start ? new DayPilot.Date(e.start) : this.Ba(), i.isParent = e.isParent, i.contextMenu = e.contextMenu ? DayPilot.Util.evalVariable(e.contextMenu) : this.contextMenuResource, i.areas = e.areas, i.moveDisabled = e.moveDisabled, i.bubbleHtml = e.bubbleHtml, i.tags = e.tags, i.task = e.task, i.swimlane = e.swimlane, i.hideEvents = e.hideEvents, i.height = i.eventHeight, i.resource = e.fk, i.lines = [], i.blocks = [], i.isRow = !0, i.getHeight = function() {
					var e = 0;
					if (c.groupConcurrentEvents) for (var t = 0; t < this.blocks.length; t++) {
						var i = this.blocks[t];
						e = Math.max(e, i.getHeight())
					} else if (this.lines.length > 0) {
						var n = this.lines.length - 1,
							a = this.lines[n],
							o = a.height || this.eventHeight,
							r = a.top || 0;
						e = r + o
					}
					return 0 === e && (e = this.eventHeight), e > this.minHeight ? e : this.minHeight
				}, i.resetEvents = function() {
					var e = this;
					e.events = DayPilot.list(), e.events.forRange = function(t, i) {
						t = new DayPilot.Date(t), i = new DayPilot.Date(i);
						for (var n = DayPilot.list(), a = 0; a < e.events.length; a++) {
							var o = e.events[a];
							DayPilot.Util.overlaps(o.start(), o.end(), t, i) && n.push(o)
						}
						return n
					}
				}, i.calculateUtilization = function() {
					function e() {
						for (var e = [], t = 0; t < i.events.length; t++) {
							var n = i.events[t];
							DayPilot.contains(e, n.start().toString()) || e.push(n.start().toString()), DayPilot.contains(e, n.rawend().toString()) || e.push(n.rawend().toString())
						}
						return e.sort(), e
					}
					function t() {
						for (var t = e(), n = [], a = {
							"start": i.data.start
						}, o = 0; o < t.length; o++) a.end = new DayPilot.Date(t[o]), n.push(a), a = {
							"start": new DayPilot.Date(t[o])
						};
						return a.end = i.data.end, n.push(a), n.forRange = function(e, t) {
							for (var i = DayPilot.list(), n = 0; n < this.length; n++) {
								var a = this[n];
								DayPilot.Util.overlaps(e, t, a.start, a.end) && i.push(a)
							}
							return i.maxSum = function(e) {
								for (var t = 0, i = 0; i < this.length; i++) {
									var n = this[i],
										a = n.sum(e);
									a > t && (t = a)
								}
								return t
							}, i
						}, n
					}
					for (var i = this, n = i.sections = t(), a = 0; a < n.length; a++) {
						var o = n[a];
						o.events = DayPilot.list();
						for (var r = 0; r < i.events.length; r++) {
							var l = i.events[r];
							DayPilot.Util.overlaps(o.start, o.end, l.start(), l.rawend()) && o.events.push(l)
						}
						o.sum = function(e) {
							for (var t = 0, i = 0; i < this.events.length; i++) {
								var n = this.events[i],
									a = 0;
								"undefined" == typeof e ? a = 1 : n.tag(e) ? a = n.tag(e) : n.data[e] && (a = n.data[e]), "number" == typeof a && (t += a)
							}
							return t
						}
					}
				}, i.putIntoLine = function(e) {
					for (var t = 0; t < this.lines.length; t++) {
						var i = this.lines[t];
						if (i.isFree(e.part.left, e.part.width)) return i.add(e), t
					}
					var i = [];
					return i.height = 0, i.add = function(e) {
						this.push(e);
						var t = e.part.Nj();
						t > i.height && (i.height = t)
					}, i.isFree = function(e, t, i) {
						for (var n = e + t - 1, a = this.length, o = 0; o < a; o++) {
							var r = this[o];
							if (!(n < r.part.left || e > r.part.left + r.part.width - 1)) {
								if (DayPilot.contains(i, r.data)) continue;
								return !1
							}
						}
						return !0
					}, i.add(e), this.lines.push(i), this.lines.length - 1
				}, i.putIntoBlock = function(e) {
					for (var t = 0; t < this.blocks.length; t++) {
						var i = this.blocks[t];
						if (DayPilot.indexOf(i.events, e) !== -1) return;
						if (i.overlapsWith(e.part.left, e.part.width)) return i.events.push(e), e.part.block = i, i.min = Math.min(i.min, e.part.left), i.max = Math.max(i.max, e.part.left + e.part.width), t
					}
					var i = {};
					i.expanded = !1, i.row = this, i.events = DayPilot.list(), i.lines = DayPilot.list(), i.putIntoLine = function(e) {
						for (var t = 0; t < this.lines.length; t++) {
							var i = this.lines[t];
							if (i.isFree(e.part.left, e.part.width)) return i.add(e), t
						}
						var i = [];
						i.height = 0, i.add = function(e) {
							this.push(e), e.part.height > i.height && (i.height = e.part.height)
						}, i.isFree = function(e, t) {
							for (var i = e + t - 1, n = this.length, a = 0; a < n; a++) {
								var o = this[a];
								if (!(i < o.part.left || e > o.part.left + o.part.width - 1)) return !1
							}
							return !0
						}, i.add(e), this.lines.push(i)
					}, i.overlapsWith = function(e, t) {
						return !(e + t - 1 < this.min || e > this.max - 1)
					}, i.getHeight = function() {
						if (!this.expanded) return c.eventHeight;
						if (this.lines.length > 0) {
							var e = this.lines.length - 1,
								t = this.lines[e],
								i = t.height || c.eventHeight;
							return (t.top || 0) + i
						}
						return c.eventHeight
					}, i.clear = function() {
						i.events = DayPilot.list(), i.min = null, i.max = null
					}, i.events.push(e), e.part.block = i, i.min = e.part.left, i.max = e.part.left + e.part.width, this.blocks.push(i)
				}, i.gk = !1, i.hk = t, i.ik = function() {
					this.hidden = !this.jk(), this.gk = !1, this.hk && this.hk.ik()
				}, i.jk = function() {
					return !this.hk || this.hk.jk() && this.hk.expanded
				}, e.columns) for (var n = 0; n < e.columns.length; n++) i.columns.push(e.columns[n]);
				return i
			}, this.uh = function() {
				c.rowlist.each(function(e) {
					if ("function" == typeof c.onRowFilter && c.rows.bd) {
						var t = e.hk,
							i = {};
						i.visible = !0, i.row = c.Mh(e), i.filter = c.rows.bd, c.onRowFilter(i), e.gk = !i.visible, i.visible ? t && t.ik() : e.hidden = !0
					}
				})
			}, this.ck = function(e, t, i, n, a, o) {
				if (e) for (var r = 0; r < e.length; r++) if (e[r]) {
					var l = {};
					if (l.level = i, l.hidden = o, l.index = t.i, !e[r].hidden) {
						var s = this.Uj(e[r], l),
							d = c.Vj(s, n);
						if (o && (d.hidden = !0), d.level = i, d.index = t.i, null !== n && n.children.push(t.i), this.rowlist.push(d), t.i++, a && s.children && s.children.length) {
							var h = o || !d.expanded;
							this.ck(s.children, t, i + 1, d, !0, h)
						}
					}
				}
			}, this.gj = function(e) {
				if (e.isNewRow) return {
					"row": {
						"cssClass": c.q("_row_new"),
						"moveDisabled": !0,
						"html": c.rowCreateHtml || ""
					}
				};
				var t = {};
				if (t.row = this.Mh(e), DayPilot.Util.copyProps(e, t.row, ["html", "backColor", "cssClass", "toolTip", "contextMenu", "moveDisabled"]), t.row.columns = DayPilot.Util.createArrayCopy(e.columns, ["html", "backColor", "cssClass", "areas"]), t.row.areas = DayPilot.Util.createArrayCopy(e.areas), "undefined" == typeof t.row.columns && c.rowHeaderColumns && c.rowHeaderColumns.length > 0) {
					r.columns = [];
					for (var i = 0; i < c.rowHeaderColumns.length; i++) r.columns.push({})
				}
				return "function" == typeof this.onBeforeRowHeaderRender && this.onBeforeRowHeaderRender(t), t
			}, this.Uj = function(e, t) {
				var i = this.kk(e, t);
				if ("function" == typeof this.onBeforeResHeaderRender) {
					var n = {};
					n.resource = i, this.onBeforeResHeaderRender(n)
				}
				return i
			}, this.kk = function(e, t) {
				var i = {};
				for (var n in t) i[n] = t[n];
				for (var n in e) i[n] = e[n];
				if ("undefined" == typeof e.html && (i.html = e.name), "undefined" == typeof i.columns && c.rowHeaderColumns && c.rowHeaderColumns.length > 0) {
					i.columns = [];
					for (var a = 0; a < c.rowHeaderColumns.length; a++) i.columns.push({})
				}
				return i.fk = e, i
			}, this.lk = function() {
				this.rd(), this.nav.top.dp = this, this.nav.top.innerHTML = "", DayPilot.Util.addClass(this.nav.top, this.q("_main")), this.nav.top.setAttribute("role", "region"), this.nav.top.setAttribute("aria-label", "scheduler"), DayPilot.browser.ie9 && DayPilot.Util.addClass(this.nav.top, this.q("_browser_ie9")), DayPilot.browser.ie8 && DayPilot.Util.addClass(this.nav.top, this.q("_browser_ie8")), this.nav.top.style.MozUserSelect = "none", this.nav.top.style.KhtmlUserSelect = "none", this.nav.top.style.webkitUserSelect = "none", this.nav.top.style.WebkitTapHighlightColor = "rgba(0,0,0,0)", this.nav.top.style.WebkitTouchCallout = "none", this.width && (this.nav.top.style.width = this.width), "Parent100Pct" === this.heightSpec && (this.nav.top.style.height = "100%"), this.nav.top.style.lineHeight = "1.2", this.nav.top.style.position = "relative", this.visible || (this.nav.top.style.display = "none"), this.nav.top.onmousemove = this.Jf, this.nav.top.ontouchstart = T.onMainTouchStart, this.nav.top.ontouchmove = T.onMainTouchMove, this.nav.top.ontouchend = T.onMainTouchEnd, this.hideUntilInit && this.backendUrl && (this.nav.top.style.visibility = "hidden");
				var e = this.Jg();
				if ("DivBased" === this.vc.layout()) {
					var t = document.createElement("div");
					t.style.position = "absolute", t.style.left = "0px", t.style.width = e + "px", t.appendChild(this.xc());
					var i = document.createElement("div");
					i.style.height = "1px", i.className = this.q("_divider_horizontal"), t.appendChild(i), this.nav.dh1 = i, t.appendChild(this.mk()), this.nav.left = t;
					var n = document.createElement("div");
					n.style.position = "absolute", n.style.left = e + "px", n.style.width = _.splitterWidth() + "px", n.style.height = this.Ig() + this.Zb() + "px", n.className = this.q("_divider") + " " + this.q("_splitter"), n.setAttribute("unselectable", "on"), this.nav.divider = n, this.rowHeaderScrolling && this.nk();
					var a = document.createElement("div");
					a.style.marginLeft = e + _.splitterWidth() + "px", a.style.marginRight = "1px", a.style.position = "relative", a.appendChild(this.ok()), this.nav.right = a;
					var o = document.createElement("div");
					o.style.height = "1px", o.style.position = "absolute", o.style.top = this.Ig() + "px", o.style.width = "100%", o.className = this.q("_divider_horizontal"), a.appendChild(o), this.nav.dh2 = o, a.appendChild(this.pk());
					var r = document.createElement("div");
					r.style.clear = "left", this.nav.top.appendChild(t), this.nav.top.appendChild(n), this.nav.top.appendChild(a), this.nav.top.appendChild(r)
				} else {
					var l = document.createElement("table");
					l.cellPadding = 0, l.cellSpacing = 0, l.border = 0, l.style.position = "absolute";
					var s = l.insertRow(-1);
					s.insertCell(-1).appendChild(this.xc()), s.insertCell(-1).appendChild(this.ok());
					var d = l.insertRow(-1);
					d.insertCell(-1).appendChild(this.mk()), d.insertCell(-1).appendChild(this.pk()), this.nav.top.appendChild(l)
				}
				if (this.Ce = document.createElement("div"), this.Ce.style.display = "none", this.nav.top.appendChild(this.Ce), this.Yh()) {
					var c = document.createElement("input");
					c.type = "hidden", c.id = this.id + "_state", c.name = this.id + "_state", this.nav.state = c, this.nav.top.appendChild(c)
				}
				var h = document.createElement("div");
				h.style.position = "absolute", h.style.left = this.Jg() + _.splitterWidth() + 5 + "px", h.style.top = this.Ig() + 5 + "px", h.style.display = "none", h.innerHTML = this.loadingLabelText, DayPilot.Util.addClass(h, this.q("_loading")), this.nav.loading = h, this.nav.top.appendChild(h), this.qk()
			}, this.Jf = function(e) {
				if (l.row) {
					var t = DayPilot.mo3(c.divHeader, e),
						i = c.ei(t.y),
						a = c.rowlist[i.i];
					if (a.isNewRow) return;
					var o = t.y - i.top,
						r = i.bottom - i.top,
						s = r / 3,
						d = 2 * s,
						h = r / 2,
						u = "before",
						f = a.children && a.children.length > 0,
						v = function() {
							for (var e = i.i, t = a.level; e >= 0;) {
								var n = c.rowlist[e];
								if (e--, !(t <= n.level)) {
									if (n === l.row) return !0;
									if (0 === n.level) return !1;
									t = n.level
								}
							}
							return !1
						}(),
						p = c.treeEnabled;
					u = v || i.i === l.row.index ? "forbidden" : p ? f ? o < h ? "before" : "child" : o < s ? "before" : o < d ? "child" : "after" : f ? "before" : o < h ? "before" : "after", l.row.moveDisabled && (u = "forbidden"), l.calendar = c, l.source = l.row, l.target = c.rowlist[i.i], l.position = u;
					if (function() {
						return !l.last || (l.last.target !== l.target || l.last.position !== l.position)
					}()) {
						if ("function" == typeof c.onRowMoving) {
							var g = {};
							g.source = c.Mh(l.source), g.target = c.Mh(l.target), g.position = u, c.onRowMoving(g), l.position = g.position
						}
					} else l.last && (l.position = l.last.position);
					l.last = {}, l.last.target = l.target, l.last.position = l.position, function() {
						l.div && DayPilot.de(l.div);
						var e = i.top,
							t = l.position,
							n = c.rowlist[i.i],
							a = n.level,
							o = a * c.treeIndent;
						switch (t) {
						case "before":
							e = i.top;
							break;
						case "child":
							e = i.top + h;
							break;
						case "after":
							e = i.bottom;
							break;
						case "forbidden":
							e = i.top + h
						}
						var r = c.sj() - o,
							s = document.createElement("div");
						s.style.position = "absolute", s.style.left = o + "px", s.style.width = r + "px", s.style.top = e + "px", s.className = c.q("_rowmove_position_" + t), l.div = s, c.divResScroll.appendChild(s)
					}()
				} else if (n.splitting) {
					var m = DayPilot.mo3(c.nav.top, e).x,
						y = c.sj(),
						b = Math.min(y, m - 1);
					c.rowHeaderWidth = b, c.Sj = !1, c.Tj()
				}
			}, this.ca = function() {
				var e = this.Ig();
				this.nav.corner.style.height = e + "px", this.divTimeScroll.style.height = e + "px", this.divNorth.style.height = e + "px", this.nav.dh1 && this.nav.dh2 && (this.nav.dh1.style.top = e + "px", this.nav.dh2.style.top = e + "px"), this.nav.loading.style.top = e + 5 + "px", this.nav.scroll.style.top = e + 1 + "px"
			}, this.Jg = function() {
				if (this.Sj) return 0;
				var e = 0;
				return e = this.rowHeaderScrolling ? this.rowHeaderWidth : this.sj()
			}, this.nk = function() {
				var e = this.nav.divider;
				e.style.cursor = "col-resize", e.setAttribute("unselectable", "on"), e.onmousedown = function(e) {
					var t = n.splitting = {};
					return t.cursor = c.nav.top.style.cursor, t.cleanup = function() {
						if (c.nav.top.style.cursor = t.cursor, "function" == typeof c.onRowHeaderResized) {
							var e = {};
							c.onRowHeaderResized(e)
						}
					}, c.nav.top.style.cursor = "col-resize", !1
				}
			}, this.Tj = function() {
				var e = _.splitterWidth(),
					t = this.Jg();
				if (this.nav.corner.style.width = t + "px", this.divCorner.style.width = t + "px", this.divResScroll.style.width = t + "px", "DivBased" === _.layout() && (this.nav.left.style.width = t + "px", this.nav.divider.style.left = t - e + "px", this.nav.right.style.marginLeft = t + "px"), this.nav.message && (this.nav.message.style.left = t + e + "px"), this.nav.loading && (this.nav.loading.style.left = t + e + 5 + "px"), this.nav.hideIcon) {
					var i = this.nav.hideIcon,
						n = c.q("_header_icon_show"),
						a = c.q("_header_icon_hide");
					i.style.left = t - 1 + "px", c.Sj ? (DayPilot.Util.removeClass(i, a), DayPilot.Util.addClass(i, n)) : (DayPilot.Util.removeClass(i, n), DayPilot.Util.addClass(i, a))
				}
			}, this.rk = function() {
				this.tj();
				var e = this.sj(),
					t = function(e, t, i) {
						if (e && e.style) {
							var n = e.firstChild;
							c.yj ? (e.style.width = t + "px", n.style.width = t + "px", "number" == typeof i && (e.style.left = i + "px")) : n.style.width = t + "px"
						}
					},
					i = this.divHeader;
				i.style.width = e + "px";
				for (var n = c.uj(), a = n.start; a < n.end; a++) {
					var o = i.rows[a];
					if (o) {
						var r = o.cells[0];
						if (r.colSpan > 1) {
							var r = o.cells[0];
							t(r, e)
						} else if (this.rowHeaderCols) for (var l = 0, s = 0; s < o.cells.length; s++) {
							var d = this.rowHeaderCols[s],
								r = o.cells[s];
							t(r, d, l), l += d
						} else {
							var d = this.rowHeaderWidth,
								r = o.cells[0];
							t(r, d)
						}
					}
				}
				c.nav.resScrollSpace && (c.nav.resScrollSpace.style.width = e + "px"), this.T()
			}, this.oh = function() {
				this.Tj(), this.rk()
			}, this.sk = function() {
				var e = c.nav.corner,
					t = this.rowHeaderColumns,
					i = document.createElement("div");
				i.style.position = "absolute", i.style.bottom = "0px", i.style.left = "0px", i.style.width = "100%", i.style.height = _.headerHeight() + "px", i.style.overflow = "hidden", c.nav.columnScroll = i;
				var n = document.createElement("div");
				n.style.position = "absolute", n.style.bottom = "0px", n.style.left = "0px", n.style.width = "5000px", n.style.height = _.headerHeight() + "px", n.style.overflow = "hidden", n.className = this.q("_columnheader"), i.appendChild(n);
				var a = document.createElement("div");
				a.style.position = "absolute", a.style.top = "0px", a.style.bottom = "0px", a.style.left = "0px", a.style.right = "0px", a.className = this.q("_columnheader_inner"), n.appendChild(a), c.ii && (c.ii.dispose(), c.ii = null);
				var o = new DayPilot.Splitter(a);
				o.widths = DayPilot.Util.propArray(t, "width", c.rowHeaderColumnDefaultWidth), o.height = _.headerHeight(), o.css.title = this.q("_columnheader_cell"), o.css.titleInner = this.q("_columnheader_cell_inner"), o.css.splitter = this.q("_columnheader_splitter"), o.titles = DayPilot.Util.propArray(t, "title"), o.updating = function(e) {
					DayPilot.Util.updatePropsFromArray(c.rowHeaderColumns, "width", this.widths), c.oh(), "Auto" === c.cellWidthSpec
				}, o.updated = function(e) {
					if (c.xj(), c.sa()) {
						if ("function" == typeof c.onRowHeaderColumnResized) {
							var t = {};
							t.column = c.rowHeaderColumns[e.index], c.onRowHeaderColumnResized(t)
						}
					} else switch (c.rowHeaderColumnResizedHandling) {
					case "CallBack":
						break;
					case "PostBack":
						break;
					case "JavaScript":
						if ("function" == typeof c.onRowHeaderColumnResized) {
							var t = {};
							t.column = c.rowHeaderColumns[e.index], c.onRowHeaderColumnResized(t)
						}
					}
				}, o.color = "#000000", o.opacity = 30, o.init(), e.appendChild(i), this.ii = o
			}, this.vh = function() {
				var e = this.nav.corner;
				e.innerHTML = "", e.className = this.q("_corner");
				var t = document.createElement("div");
				if (t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.right = "0px", t.style.bottom = "0px", t.className = this.q("_corner_inner"), this.divCorner = t, t.innerHTML = "&nbsp;", this.rowHeaderColumns && this.rowHeaderColumns.length > 0) {
					var i = document.createElement("div");
					i.style.position = "absolute", i.style.top = "0px", i.style.left = "0px", i.style.right = "0px", i.style.bottom = _.headerHeight() + 1 + "px", e.appendChild(i);
					var n = document.createElement("div");
					n.style.position = "absolute", n.style.left = "0px", n.style.right = "0px", n.style.height = "1px", n.style.bottom = _.headerHeight() + "px", n.className = this.q("_divider"), e.appendChild(n), i.appendChild(t), this.sk()
				} else e.appendChild(t);
				var a = document.createElement("div");
				a.style.position = "absolute", a.style.padding = "2px", a.style.top = "0px", a.style.left = "1px", a.style.backgroundColor = "#FF6600", a.style.color = "white", a.innerHTML = "", DayPilot.Util.isNullOrUndefined(undefined) && e.appendChild(a)
			}, this.qk = function() {
				var e = 3,
					t = this.Jg() + _.splitterWidth() - 1,
					i = 10,
					n = 20,
					a = this.Ig() + e,
					o = DayPilot.Util.div(this.nav.top, t, a, i, n);
				o.style.cursor = "pointer", o.className = c.q("_header_icon"), DayPilot.Util.addClass(o, c.q("_header_icon_hide")), o.onclick = function() {
					c.rows.headerToggle()
				}, this.nav.hideIcon = o
			}, this.wh = function() {
				c.nav.hideIcon && (c.rowlist.length > 0 && c.rowHeaderHideIconEnabled ? c.nav.hideIcon.style.display = "" : c.nav.hideIcon.style.display = "none")
			}, this.xc = function() {
				var e = this.Jg(),
					t = document.createElement("div");
				return c.nav.corner = t, t.style.width = e + "px", t.style.height = this.Ig() + "px", t.style.overflow = "hidden", t.style.position = "relative", t.setAttribute("unselectable", "on"), t.onmousemove = function() {
					c.S()
				}, t.oncontextmenu = function() {
					return !1
				}, this.vh(), t
			}, this.Ig = function() {
				if (c.timeHeaders) {
					var e = R.timeHeader(c.timeHeaders.length - 1);
					return e.top + e.height
				}
				return this.timeHeader ? c.timeHeader.length * _.headerHeight() : 0
			}, this.tk = null, this.uk = function() {
				return c.scrollStep || c.eventHeight
			}, this.mk = function() {
				var e = document.createElement("div");
				e.style.width = this.Jg() + "px", e.style.height = this.Zb() + "px", e.style.overflow = "hidden", e.style.position = "relative", e.className = c.q("_rowheader_scroll");
				var t = c.uk(),
					i = navigator.userAgent.indexOf("Mobile") !== -1;
				return i && (e.style.overflowY = "auto"), e.onmousemove = function() {
					c.S()
				}, e.onscroll = function() {
					if (c.nav.columnScroll && c.rowHeaderScrolling && (c.nav.columnScroll.scrollLeft = e.scrollLeft), c.tk && clearTimeout(c.tk), i) {
						var t = c.$i() - c.nav.scroll.offsetHeight;
						e.scrollTop = Math.min(e.scrollTop, t), c.nav.scroll.scrollTop = e.scrollTop
					} else c.tk = setTimeout(function() {
						c.nav.scroll.scrollTop = e.scrollTop
					}, 500)
				}, /*e.addEventListener("wheel", function(i) {
					var n;
					console.log(n)
					console.log(i)
					n = c.overrideWheelScrolling ? i.deltaY > 0 ? t : -t : i.deltaY, c.nav.scroll.scrollTop = e.scrollTop + n, i.preventDefault && i.preventDefault()
				}, !1),*/ e.oncontextmenu = function() {
					return !1
				}, e.onmouseenter = function() {
					c.rowHeaderScrolling && (e.style.overflowX = "auto")
				}, e.onmouseleave = function() {
					c.rowHeaderScrolling && (e.style.overflowX = "hidden")
				}, e.setAttribute("role", "region"), e.setAttribute("aria-label", "scheduler rows"), this.divResScroll = e, this.Ng = e, e
			}, this.vk = function(e) {
				if ("TableBased" === _.layout()) {
					var t = parseInt(this.width, 10),
						i = isNaN(t) || this.width.indexOf("%") !== -1,
						n = (/MSIE/i.test(navigator.userAgent), this.sj());
					i ? this.nav.top && this.nav.top.offsetWidth > 0 && (e.style.width = this.nav.top.offsetWidth - 6 - n + "px") : e.style.width = t - n + "px"
				}
			}, this.pe = function(e) {
				c.dg(), c.og()
			}, this.dg = function() {
				"TableBased" === c.vc.layout() && (c.vk(c.nav.scroll), c.vk(c.divTimeScroll)), c.ja(), c.xj(), c.wk(), c.t.drawArea = null
			}, this.xk = null, this.hi = null, this.yk = function() {
				c.watchWidthChanges && (c.hi || (this.hi = setInterval(function() {
					return c.nav && c.nav.top ? (c.xk || (c.xk = {}, c.xk.counter = 0, c.xk.changed = !1, c.xk.width = c.nav.top.offsetWidth), c.xk.width !== c.nav.top.offsetWidth && (c.xk.changed = !0, c.xk.counter = 0, c.xk.width = c.nav.top.offsetWidth), c.xk.changed && (c.xk.counter += 1), void(c.xk.changed && c.xk.counter > 2 && (c.xk.changed = !1, c.dg(), c.og()))) : void clearInterval(c.hi)
				}, 20)))
			}, this.wk = function() {
				var e = c.rangeHold;
				c.clearSelection(), c.rangeHold = e, c.Ih(e, !0)
			}, this.xj = function() {
				c.A && "Auto" === c.cellWidthSpec && (c.Zf(), c.$f(), c.bg(), c.fg(), c.ig(), c.gg(), c.jg(), c.M(), c.ba(), c.oa(), c.ja())
			}, this.Zf = function() {
				if ("Auto" === this.cellWidthSpec) {
					var e = this.nav.top.clientWidth,
						t = this.Jg(),
						i = c.zk(),
						n = e - t - i;
					if (this.aj()) {
						var a = n / this.aj();
						this.cellWidth = Math.max(a, c.cellWidthMin), c.Mg = a < c.cellWidthMin
					}
				}
			}, this.zk = function() {
				if ("Auto" === c.heightSpec) return 0;
				if ("Max" === c.heightSpec || "Fixed" === c.heightSpec || "Parent100Pct" === c.heightSpec) {
					return c.$i() > c.height ? DayPilot.sw(c.nav.scroll) : 0
				}
				return DayPilot.sw(c.nav.scroll)
			}, this.Qg = function() {
				var e = this.nav.top.clientWidth,
					t = this.Jg(),
					i = this.Zb(),
					n = this.$i(),
					a = "Auto" === c.heightSpec,
					o = 0;
				return n > i && !a && (o = DayPilot.swa()), e - t - 2 - o
			}, this.ok = function() {
				var e = document.createElement("div");
				e.style.overflow = "hidden", e.style.position = "absolute", e.style.display = "block", e.style.top = "0px", e.style.width = "100%", e.style.height = this.Ig() + "px", e.style.overflow = "hidden", e.onmousemove = function() {
					c.S(), c.cellBubble && c.cellBubble.delayedHide()
				}, this.vk(e), this.divTimeScroll = e;
				var t = document.createElement("div");
				return t.style.width = this.aj() * this.cellWidth + 5e3 + "px", this.divNorth = t, e.appendChild(t), e
			}, this.Zb = function() {
				var e = 0,
					t = c.heightSpec;
				return "Fixed" === t || "Parent100Pct" === t ? this.height ? this.height : 0 : (e = c.$i(), ("Max" === t || "Max100Pct" === t) && e > c.height ? c.height : e)
			}, this.Ak = null, this.Bk = 0, this.Ck = 0, this.Dk = 0, this.Og = function() {
				if ("function" == typeof c.onHeightChanged || "function" == typeof c.onDimensionsChanged) {
					c.Ak && clearTimeout(c.Ak);
					var e = function() {
							var e = c.nav.top.offsetHeight,
								t = c.Bk;
							c.Bk = e;
							var i = c.nav.top.offsetWidth,
								n = c.Ck;
							c.Ck = i;
							var a = c.Jg(),
								o = c.Dk;
							if (c.Dk = a, "function" == typeof c.onHeightChanged && e !== t) {
								var r = {};
								r.oldHeight = t, r.newHeight = e, c.onHeightChanged(r)
							}
							if ("function" == typeof c.onDimensionsChanged && (e !== t || i !== n || a !== o)) {
								var r = {};
								r.oldHeight = t, r.newHeight = e, r.oldWidth = n, r.newWidth = i, r.oldRowHeaderWidth = o, r.newRowHeaderWidth = a, c.onDimensionsChanged(r)
							}
						};
					c.Ak = setTimeout(e, 100)
				}
			}, this.$i = function() {
				var e;
				return this.Vf !== -1 ? (e = this.Vf, this.Vf > 0 && "auto" === c.nav.scroll.style.overflowX && (e += DayPilot.sh(c.nav.scroll))) : e = this.rowlist.length * this.vc.eventHeight(), e
			}, this.S = function() {
				this.T(), this.Ek(), this.Fk(), this.qj(), c.cellBubble && c.cellBubble.hideOnMouseOut(), c.bubble && c.bubble.hideOnMouseOut()
			}, this.pk = function() {
				var e = document.createElement("div");
				if (e.style.overflow = "auto", e.style.overflowX = "auto", e.style.overflowY = "auto", e.style.position = "absolute", e.style.height = this.Zb() + "px", e.style.top = this.Ig() + 1 + "px", e.style.width = "100%", e.className = this.q("_scrollable"), e.oncontextmenu = function() {
					return !1
				}, this.vk(e), c.overrideWheelScrolling) {
					var t = c.scrollStep;
					e.onwheel = function(i) {
						var n = i.deltaY > 0 ? t : -t;
						c.nav.scroll.scrollTop = e.scrollTop + n, i.preventDefault && i.preventDefault()
					}, e.onmousewheel = function(i) {
						i = i || window.event;
						var n = i.wheelDelta < 0 ? t : -t;
						c.nav.scroll.scrollTop = e.scrollTop + n, i.preventDefault && i.preventDefault(), i.returnValue = !1
					}
				}
				this.nav.scroll = e, this.sg = document.createElement("div"), this.sg.style.MozUserSelect = "none", this.sg.style.KhtmlUserSelect = "none", this.sg.style.webkitUserSelect = "none", this.sg.daypilotMainD = !0, this.sg.calendar = this, i && (this.sg.style.webkitTransform = "translateZ(0px)"), this.sg.style.position = "absolute";
				var n = this.Gg();
				return n > 0 && !isNaN(n) && (this.sg.style.width = n + "px"), this.sg.setAttribute("unselectable", "on"), this.sg.onmousedown = this.Gk, this.sg.onmousemove = this.rj, this.sg.onmouseup = this.Hk, this.sg.oncontextmenu = this.Ik, this.sg.ondblclick = this.Jk, this.sg.className = this.q("_matrix"), this.divStretch = document.createElement("div"), this.divStretch.style.position = "absolute", this.divStretch.style.height = "1px", this.sg.appendChild(this.divStretch), this.divCells = document.createElement("div"), this.divCells.style.position = "absolute", this.divCells.oncontextmenu = this.Ik, this.sg.appendChild(this.divCells), this.divLines = document.createElement("div"), this.divLines.style.position = "absolute", this.divLines.oncontextmenu = this.Ik, this.sg.appendChild(this.divLines), this.divBreaks = document.createElement("div"), this.divBreaks.style.position = "absolute", this.divBreaks.oncontextmenu = this.Ik, this.sg.appendChild(this.divBreaks), this.divSeparators = document.createElement("div"), this.divSeparators.style.position = "absolute", this.divSeparators.oncontextmenu = this.Ik, this.sg.appendChild(this.divSeparators), this.divLinksBelow = document.createElement("div"), this.divLinksBelow.style.position = "absolute", this.sg.appendChild(this.divLinksBelow), this.divCrosshair = document.createElement("div"), this.divCrosshair.style.position = "absolute", this.divCrosshair.ondblclick = this.Jk, this.sg.appendChild(this.divCrosshair), this.divRange = document.createElement("div"), this.divRange.style.position = "absolute", this.divRange.oncontextmenu = this.Ik, this.sg.appendChild(this.divRange), this.divEvents = document.createElement("div"), this.divEvents.style.position = "absolute", this.sg.appendChild(this.divEvents), this.divSeparatorsAbove = document.createElement("div"), this.divSeparatorsAbove.style.position = "absolute", this.divSeparatorsAbove.oncontextmenu = this.Ik, this.sg.appendChild(this.divSeparatorsAbove), this.divLinksAbove = document.createElement("div"), this.divLinksAbove.style.position = "absolute", this.sg.appendChild(this.divLinksAbove), this.divLinkShadow = document.createElement("div"), this.divLinkShadow.style.position = "absolute", this.sg.appendChild(this.divLinkShadow), this.divLinkpoints = document.createElement("div"), this.divLinkpoints.style.position = "absolute", this.sg.appendChild(this.divLinkpoints), this.divRectangle = document.createElement("div"), this.divRectangle.style.position = "absolute", this.sg.appendChild(this.divRectangle), this.divHover = document.createElement("div"), this.divHover.style.position = "absolute", this.sg.appendChild(this.divHover), this.divShadow = document.createElement("div"), this.divShadow.style.position = "absolute", this.sg.appendChild(this.divShadow), e.appendChild(this.sg), e
			}, this.Kk = {};
			var P = this.Kk;
			P.create = function() {
				if (!c.nav.overlay) {
					var e = document.createElement("div");
					e.style.position = "absolute", e.style.left = "0px", e.style.right = "0px", e.style.top = "0px", e.style.bottom = "0px", e.className = c.q("_block"), c.nav.top.appendChild(e), c.nav.overlay = e
				}
			}, P.show = function() {
				P.create(), c.nav.overlay.style.display = ""
			}, P.hide = function() {
				c.nav.overlay && (c.nav.overlay.style.display = "none")
			}, this.H = function(e) {
				c.loadingTimeout && window.clearTimeout(c.loadingTimeout);
				var t = e ? 0 : 100;
				c.loadingTimeout = window.setTimeout(function() {
					c.loadingLabelVisible && (c.nav.loading.innerHTML = c.loadingLabelText, c.nav.loading.style.display = ""), c.blockOnCallBack && P.show()
				}, t)
				//console.log(e);
			}, this.X = function() {
				this.loadingTimeout && window.clearTimeout(this.loadingTimeout), this.nav.loading.style.display = "none", this.blockOnCallBack && P.hide()
			}, this.uiBlock = function() {
				P.show()
			}, this.uiUnblock = function() {
				P.hide()
			}, this.hd = function() {
				this.startDate = new DayPilot.Date(this.startDate).getDatePart()
			}, this.md = function(e) {
				var t = document.createElement("div");
				t.style.position = "absolute", t.style.top = "-2000px", t.style.left = "-2000px", t.className = this.q(e), document.body.appendChild(t);
				var i = t.offsetHeight,
					n = t.offsetWidth;
				document.body.removeChild(t);
				var a = {};
				return a.height = i, a.width = n, a
			}, this.ra = function(e) {
				if (e && (this.autoRefreshEnabled = !0), this.autoRefreshEnabled && !(this.B >= this.autoRefreshMaxCount)) {
					this.L();
					var t = this.autoRefreshInterval;
					if (!t || t < 10) throw "The minimum autoRefreshInterval is 10 seconds";
					this.autoRefreshTimeout = window.setTimeout(function() {
						c.Vc()
					}, 1e3 * this.autoRefreshInterval)
				}
			}, this.L = function() {
				this.autoRefreshTimeout && (window.clearTimeout(this.autoRefreshTimeout), this.autoRefreshTimeout = null)
			}, this.autoRefreshStart = function(e) {
				c.ra(e)
			}, this.autoRefreshPause = function() {
				c.L()
			}, this.Lk = function() {
				return !(n.resizing || n.moving || n.drag || n.range)
			}, this.Vc = function() {
				if (c.Lk()) {
					var e = !1;
					if ("function" == typeof this.onAutoRefresh) {
						var t = {};
						t.i = this.B, t.preventDefault = function() {
							this.preventDefault.value = !0
						}, c.onAutoRefresh(t), t.preventDefault.value && (e = !0)
					}!e && this.r() && this.commandCallBack(this.autoRefreshCommand), this.B++
				}
				this.B < this.autoRefreshMaxCount && (this.autoRefreshTimeout = window.setTimeout(function() {
					c.Vc()
				}, 1e3 * this.autoRefreshInterval))
			}, this.Wc = function() {
				n.globalHandlers || (n.globalHandlers = !0, DayPilot.re(document, "mousemove", n.gMouseMove), DayPilot.re(document, "mouseup", n.gMouseUp), DayPilot.re(document, "mousedown", n.gMouseDown), DayPilot.re(document, "touchmove", n.gTouchMove), DayPilot.re(document, "touchend", n.gTouchEnd), DayPilot.re(window, "keyup", n.gKeyUp)), DayPilot.re(window, "resize", this.pe)
			}, this.Mk = function() {
				this.nav.scroll.root = this, this.nav.scroll.onscroll = this.og, c.bj = this.nav.scroll.scrollLeft, c._i = this.nav.scroll.scrollTop, c.cj = this.divNorth.clientWidth
			}, this.zf = function() {
				if (this.nav.state) {
					var e = {};
					e.scrollX = this.nav.scroll.scrollLeft, e.scrollY = this.nav.scroll.scrollTop;
					var t = c.$h(e.scrollX, e.scrollY),
						i = c._h(t),
						n = c.ai(t);
					e.rangeStart = i.start, e.rangeEnd = i.end, e.resources = n, this.syncResourceTree && (e.tree = this.R()), this.nav.state.value = DayPilot.he(DayPilot.JSON.stringify(e))
				}
			}, this.jg = function() {
				if (this.separators) for (var e = 0; e < this.separators.length; e++) this.ad(e)
			}, this.Nk = {}, this.Nk.step = 300, this.Nk.delay = 10, this.Nk.mode = "display", this.Nk.layers = !1, this.ej = function(e) {
				if (c.cellStacking) return void S.calculateEventPositionsRow(e);
				for (var t = this.durationBarDetached ? -10 : 0, i = 0, n = 0; n < e.lines.length; n++) {
					var a = e.lines[n];
					a.height = 0, a.top = i;
					for (var o = 0; o < a.length; o++) {
						var r = a[o];
						if (!r.part.top, !0) {
							r.part.line = n, r.part.height || (r.part.height = e.eventHeight);
							var l = r.part.Nj();
							l > a.height && (a.height = l), r.part.top = i + e.marginTop;
							var s = "Above" === c.eventVersionPosition;
							if (c.eventVersionsEnabled && !DayPilot.list(r.data.versions).isEmpty()) {
								var d = (r.data.versions.length, r.part.top);
								s || (d += r.part.height + c.eventVersionMargin), DayPilot.list(r.data.versions).each(function(e, t) {
									if (r.versions[t]) {
										var i = t * (c.eventVersionHeight + c.eventVersionMargin);
										r.versions[t].top = d + i, s && (r.part.top += c.eventVersionHeight, r.part.top += c.eventVersionMargin)
									}
								})
							}
							r.part.top += c.eventMarginBottom, r.part.detachedBarTop = r.part.top - t, r.part.right = r.part.left + r.part.width, r.part.fullTop = this.rowlist[r.part.dayIndex].top + r.part.top, r.part.fullBottom = r.part.fullTop + r.part.height
						}
					}
					i += (a.height || e.eventHeight) * e.eventStackingLineHeight / 100
				}
			};
			var S = {};
			S.loadRow = function(e) {
				e.evColumns = DayPilot.list(c.itline).map(function(e, t) {
					return {
						"events": DayPilot.list()
					}
				}), DayPilot.list(e.events).each(function(t) {
					var i = t.start(),
						n = c.bh(i);
					e.evColumns[n.i].events.push(t)
				})
			}, S.calculateEventPositions = function() {
				var e = c.cellStackingAutoHeight,
					t = 0;
				DayPilot.list(c.rowlist).each(function(i) {
					var n = 0;
					i.evColumns.each(function(t, a) {
						var o = c.itline[a],
							r = c.rowMarginTop;
						t.events.each(function(t) {
							t.part.left = o.left, t.part.width = o.width, t.part.top = r, t.part.height || (e ? t.part.height = S.getEventAutoHeight(t) + c.durationBarHeight : t.part.height = i.eventHeight), r += t.part.height + c.eventMarginBottom
						}), t.height = r, t.height > n && (n = t.height)
					}), i.maxColumnHeight = n, i.top = t;
					var a = i.height;
					i.height = i.getHeight(), n > c.rowMarginTop && (i.height = n + c.rowMarginBottom), a !== i.height && (c.zh = !0), t += i.height
				}), c.Vf = t
			}, S.getEventAutoHeight = function(e) {
				var t = e.client.html(),
					i = document.createElement("div");
				i.style.position = "absolute", i.style.top = "-2000px", i.style.left = "-2000px", i.style.width = e.part.width + "px", i.className = c.q(E.event);
				var n = document.createElement("div");
				n.className = c.q(E.eventInner), n.innerHTML = t, n.style.position = "static", n.style.overflow = "auto", i.appendChild(n);
				var a = c.divEvents;
				a.appendChild(i);
				var o = i.offsetHeight;
				return a.removeChild(i), o
			}, S.calculateEventPositionsRow = function(e) {
				S.calculateEventPositions()
			}, S.drawEventsWithoutCheckingOverflow = function() {
				DayPilot.list(c.rowlist).each(function(e) {
					S.drawEventsRow(e)
				})
			}, S.drawEvents = function() {
				S.drawEventsWithoutCheckingOverflow(), S.checkOverflow(), c.eg(), c.ja()
			}, S.checkOverflow = function() {
				if (c.cellStackingAutoHeight) {
					var e = !1;
					DayPilot.list(c.elements.events).each(function(t) {
						var i = t.firstChild,
							n = i.offsetHeight - i.clientHeight + t.offsetHeight - t.clientHeight,
							a = i.scrollHeight + n,
							o = t.event.part.height;
						t.event.part.height = a, o !== a && (e = !0)
					}), e && (c.M(), S.calculateEventPositions(), S.drawEventsWithoutCheckingOverflow(), c.fg(), c.ig())
				}
			}, S.drawEventsRow = function(e) {
				e.evColumns.each(function(e, t) {
					e.events.each(function(e) {
						c.Rb(e)
					})
				})
			}, this.oa = function(e) {
				if (!c.Gd) {
					if (c.cellStacking) return void S.drawEvents();
					var t = this.Nk.step;
					this.Nk.layers && (c.divEvents = document.createElement("div"), c.divEvents.style.position = "absolute", c.sg.insertBefore(this.divEvents, this.divSeparatorsAbove)), "display" === this.Nk.mode ? this.divEvents.style.display = "none" : "visibility" === this.Nk.mode && (this.divEvents.style.visibility = "hidden"), this.divEvents.setAttribute("role", "region"), this.divEvents.setAttribute("aria-label", "scheduler events");
					for (var i = "Progressive" === this.dynamicEventRendering, n = this.xg(), a = n.pixels.top, o = n.pixels.bottom, r = c.allowMultiMove || c.allowMultiResize, l = 0; l < this.rowlist.length; l++) {
						var s = this.rowlist[l],
							d = s.top - this.dynamicEventRenderingMargin,
							h = d + s.height + 2 * this.dynamicEventRenderingMargin;
						if (!i || r || !(o <= d || a >= h)) {
							this.ej(s);
							for (var u = 0; u < s.lines.length; u++) for (var f = s.lines[u], p = 0; p < f.length; p++) {
								var g = f[p],
									m = this.Rb(g);
								if (e && m && (t--, t <= 0)) return this.divEvents.style.visibility = "", this.divEvents.style.display = "", void window.setTimeout(function() {
									c.oa(e)
								}, c.Nk.delay)
							}
						}
					}
					this.divEvents.style.display = "", DayPilot.list(c.multiselect.list).isEmpty() || c.multiselect.redraw(), this.Ag(), v.load()
				}
			}, this.Bh = function(e) {
				var t = this.rowlist[e];
				if (c.cellStacking) return void S.drawEventsRow(t);
				this.divEvents = document.createElement("div"), this.divEvents.style.position = "absolute", this.divEvents.style.display = "none", this.sg.insertBefore(this.divEvents, this.divSeparatorsAbove);
				this.durationBarDetached ? 10 : 0;
				this.ej(t);
				for (var i = 0; i < t.lines.length; i++) for (var n = t.lines[i], a = 0; a < n.length; a++) {
					var o = n[a];
					this.Rb(o)
				}
				this.divEvents.style.display = ""
			}, this.M = function() {
				if (this.elements.events) for (var e = this.elements.events.length, t = 0; t < e; t++) {
					var i = this.elements.events[t];
					this.xi(i)
				}
				this.elements.events = []
			}, this.Ah = function(e) {
				if (this.elements.events) {
					for (var t = this.elements.events.length, i = [], n = 0; n < t; n++) {
						var a = this.elements.events[n];
						a.event.part.dayIndex === e && (this.xi(a), i.push(n))
					}
					for (var n = i.length - 1; n >= 0; n--) this.elements.events.splice(i[n], 1)
				}
			}, this.xi = function(e) {
				e.parentNode && e.parentNode.removeChild(e), e.onclick = null, e.oncontextmenu = null, e.onmouseover = null, e.onmouseout = null, e.onmousemove = null, e.onmousedown = null, e.ondblclick = null, e.event && (e.isBar || (e.event.rendered = null), e.event = null), e.related && DayPilot.de(e.related)
			}, this.Ok = function(e) {
				e.event && (e.event.rendered = !1), e.onclick = null, e.onmousedown = null, e.event = null, e.parentNode && e.parentNode.removeChild(e)
			}, this.Pk = function(e) {
				if (e || (e = 0), "Progressive" === this.dynamicEventRendering) {
					this.divEvents.style.display = "none";
					for (var t = [], i = 0, n = this.elements.events.length, a = n - 1; a >= 0; a--) {
						var o = this.elements.events[a];
						this.Qk(o.event) ? e > 0 ? (e--, t.unshift(o)) : (this.xi(o), i++) : t.unshift(o)
					}
					this.elements.events = t, this.divEvents.style.display = ""
				}
			}, this.Rk = function(e) {
				for (var t = [], i = 0, n = this.xg(), a = this.elements.cells.length, o = a - 1; o >= 0; o--) {
					var r = this.elements.cells[o];
					n.xStart < r.coords.x && r.coords.x <= n.xEnd && n.yStart < r.coords.y && r.coords.y <= n.yEnd ? t.unshift(r) : e > 0 ? (e--, t.unshift(r)) : (this.Ei(r), i++)
				}
			}, this.Ei = function(e) {
				if (e) {
					//console.log(e)
					var t = e.coords.x,
						i = e.coords.y;
					DayPilot.rfa(c.elements.cells, e), DayPilot.de(e), c.t.cells[t + "_" + i] = null
				}
			}, this.gg = function() {
				if (this.elements.separators) for (var e = 0; e < this.elements.separators.length; e++) {
					var t = this.elements.separators[e];
					DayPilot.de(t)
				}
				this.elements.separators = []
			}, this.Sk = function() {
				var e = "Progressive" === this.dynamicEventRendering;
				if (!this.nav.scroll) return !1;
				for (var t = this.nav.scroll.scrollTop, i = t + this.nav.scroll.clientHeight, n = 0; n < this.rowlist.length; n++) {
					var a = this.rowlist[n],
						o = a.top,
						r = a.top + a.height;
					if (!e || !(i <= o || t >= r)) for (var l = 0; l < a.lines.length; l++) for (var s = a.lines[l], d = 0; d < s.length; d++) {
						var c = s[d];
						if (this.Tk(c)) return !0
					}
				}
				return !1
			}, this.Tk = function(e) {
				if (e.rendered) return !1;
				var t = "Progressive" === this.dynamicEventRendering,
					i = this.nav.scroll.scrollLeft,
					n = i + this.nav.scroll.clientWidth,
					a = e.part.left,
					o = e.part.left + e.part.width;
				return !t || !(n <= a || i >= o)
			}, this.Qk = function(e) {
				if (!e.rendered) return !0;
				var t = this.xg(),
					i = t.pixels.top,
					n = t.pixels.bottom,
					a = t.pixels.left - this.dynamicEventRenderingMargin,
					o = t.pixels.right + this.dynamicEventRenderingMargin,
					r = e.part.left,
					l = e.part.right,
					s = e.part.fullTop,
					d = e.part.fullBottom;
				return o <= r || a >= l || (n <= s || i >= d)
			}, this.Mj = DayPilot.list(), this.Uk = function(e) {
				if (e.rendered) return !1;
				if (e.row.hidden) return !1;
				var t = e.min,
					i = e.max - e.min,
					n = c.eventHeight,
					a = e.row.top,
					o = document.createElement("div");
				o.style.position = "absolute", o.style.left = t + "px", o.style.top = a + "px", o.style.width = i + "px", o.style.height = n + "px", o.className = c.q("_event_group"), o.style.cursor = "pointer";
				var r = {};
				r.group = {}, r.group.count = e.events.length, r.group.events = DayPilot.list(e.events, !0), r.group.html = "[+] " + e.events.length + " events", "function" == typeof c.onBeforeGroupRender && c.onBeforeGroupRender(r);
				var l = document.createElement("div");
				return l.innerHTML = r.group.html, o.appendChild(l), o.onmousedown = function(e) {
					var e = e || window.event;
					e.cancelBubble = !0
				}, o.onclick = function(e) {
					var t = o.event;
					t.expanded = !0, c.Ok(o);
					var i = DayPilot.indexOf(c.elements.events, o);
					i !== -1 && c.elements.events.splice(i, 1);
					var n = c.Mj;
					DayPilot.list(t.events).each(function(e) {
						n.push(e.id())
					}), c.jh(), c.kh(t.part.dayIndex), c.ja();
					var e = e || window.event;
					e.cancelBubble = !0
				}, e.part = {}, e.part.left = t, e.part.width = i, e.part.height = c.eventHeight, e.part.dayIndex = DayPilot.indexOf(c.rowlist, e.row), e.part.top = 0, e.part.isBlock = !0, e.client = {}, e.client.html = function() {
					return r.group.html
				}, e.data = {}, o.event = e, this.elements.events.push(o), this.divEvents.appendChild(o), e.rendered = !0, !0
			}, this.Rb = function(e) {
				if (e.rendered) return !1;
				if (c.groupConcurrentEvents) {
					var t = e.part.block;
					if (t.events.length > 1 && !t.expanded) return c.Uk(t)
				}
				var i = "Progressive" === this.dynamicEventRendering,
					n = this.xg(),
					a = n.pixels.left - this.dynamicEventRenderingMargin,
					o = n.pixels.right + this.dynamicEventRenderingMargin,
					r = e.part.left,
					l = e.part.left + e.part.width,
					s = c.multiselect.Ab(e);
				if (i && (o <= r || a >= l || s)) return !1;
				var d = e.part.dayIndex,
					h = e.part.width,
					u = e.part.height,
					f = e.cache || e.data;
				h = Math.max(0, h), u = Math.max(0, u);
				var v = this.rowlist[d];
				if (v.hidden) return !1;
				var p = v.top,
					g = this.durationBarDetached,
					m = document.createElement("div");
				if (m.related = [], g) {
					var y = e.part.barLeft,
						b = e.part.barWidth;
					"PercentComplete" === this.durationBarMode && (y = 0, b = (f.complete || 0) / 100 * h);
					var w = document.createElement("div");
					w.style.position = "absolute", w.style.left = e.part.left + y + "px", w.style.top = p + e.part.detachedBarTop + "px", w.style.width = b + "px", w.style.height = "5px", w.style.backgroundColor = "black", w.type = "detachedBar", m.related.push(w), this.divEvents.appendChild(w)
				}
				if (function(t) {
					c.eventVersionsEnabled && DayPilot.list(e.data.versions).each(function(i, n) {
						if (i) {
							var a = e.versions[n];
							if (a) {
								var o = document.createElement("div");
								o.style.position = "absolute", o.style.left = a.left + "px", o.style.top = p + a.top + "px", o.style.width = a.width + "px", o.style.height = c.eventVersionHeight + "px", o.className = c.q(E.event) + " " + c.q("_event_previous") + " " + c.q("_event_version"), i.toolTip && (o.title = i.toolTip), i.cssClass && DayPilot.Util.addClass(o, i.cssClass);
								var r = document.createElement("div");
								r.setAttribute("unselectable", "on"), r.className = c.q(E.eventInner), r.innerHTML = i.html || i.text || "", i.backColor && (r.style.background = i.backColor, (DayPilot.browser.ie9 || DayPilot.browser.ielt9) && (r.style.filter = "")), i.fontColor && (r.style.color = i.fontColor), i.borderColor && (r.style.borderColor = i.borderColor), i.backImage && (r.style.backgroundImage = "url(" + i.backImage + ")", i.backRepeat && (r.style.backgroundRepeat = i.backRepeat)), o.appendChild(r), a.continueLeft && DayPilot.Util.addClass(o, c.q("_event_continueleft")), a.continueRight && DayPilot.Util.addClass(o, c.q("_event_continueright"));
								var l = c.durationBarVisible && !i.barHidden,
									s = a.width;
								if (l && s > 0) {
									var d = 100 * a.barLeft / s,
										h = Math.ceil(100 * a.barWidth / s);
									"PercentComplete" === c.durationBarMode && (d = 0, h = i.complete || 0);
									var u = document.createElement("div");
									u.setAttribute("unselectable", "on"), u.className = c.q(E.eventBar), u.style.position = "absolute", i.barBackColor && (u.style.backgroundColor = i.barBackColor);
									var f = document.createElement("div");
									f.setAttribute("unselectable", "on"), f.className = c.q(E.eventBarInner), f.style.left = d + "%", 0 < h && h <= 1 ? f.style.width = "1px" : f.style.width = h + "%", i.barColor && (f.style.backgroundColor = i.barColor), i.barImageUrl && (f.style.backgroundImage = "url(" + i.barImageUrl + ")"), u.appendChild(f), o.appendChild(u)
								}
								if (i.htmlLeft) {
									var v = c.eventHtmlLeftMargin,
										g = document.createElement("div");
									g.style.position = "absolute", g.style.right = -(a.left - v) + "px", g.style.top = p + a.top + "px", g.style.height = c.eventHeight + "px", g.style.boxSizing = "border-box", g.innerHTML = i.htmlLeft, g.className = c.q("_event_left"), g.type = "divLeft", g.versionPart = a, t.related.push(g), c.divEvents.appendChild(g)
								}
								if (i.htmlRight) {
									var v = c.eventHtmlRightMargin,
										m = document.createElement("div");
									m.style.position = "absolute", m.style.left = a.left + a.width + v + "px", m.style.top = p + a.top + "px", m.style.height = c.eventHeight + "px", m.style.boxSizing = "border-box", m.innerHTML = i.htmlRight, m.className = c.q("_event_right"), m.type = "divRight", m.versionPart = a, t.related.push(m), c.divEvents.appendChild(m)
								}
								o.versionPart = a, o.type = "version", t.related.push(o), c.divEvents.appendChild(o)
							}
						}
					})
				}(m), f.htmlLeft) {
					var D = c.eventHtmlLeftMargin,
						k = document.createElement("div");
					k.style.position = "absolute", k.style.right = -(e.part.left - D) + "px", k.style.top = p + e.part.top + "px", k.style.height = c.eventHeight + "px", k.style.boxSizing = "border-box", k.innerHTML = f.htmlLeft, k.className = c.q("_event_left"), k.type = "divLeft", m.related.push(k), this.divEvents.appendChild(k)
				}
				if (f.htmlRight) {
					var D = c.eventHtmlRightMargin,
						x = document.createElement("div");
					x.style.position = "absolute", x.style.left = e.part.left + e.part.width + D + "px", x.style.top = p + e.part.top + "px", x.style.height = c.eventHeight + "px", x.style.boxSizing = "border-box", x.innerHTML = f.htmlRight, x.className = c.q("_event_right"), x.type = "divRight", m.related.push(x), this.divEvents.appendChild(x)
				}
				p + e.part.top;
				m.style.position = "absolute", m.style.left = e.part.left + c.eventMarginLeft + "px", m.style.top = p + e.part.top + "px", m.style.width = h - c.eventMarginLeft - c.eventMarginRight + "px", m.style.height = u + "px", c.eventTextWrappingEnabled || (m.style.whiteSpace = "nowrap"), m.style.overflow = "hidden", m.className = this.q(E.event), "Milestone" === e.data.type && DayPilot.Util.addClass(m, c.q("_task_milestone")), "Group" === e.data.type && (DayPilot.Util.addClass(m, c.q("_task_parent")), DayPilot.Util.addClass(m, c.q("_task_group"))), f.cssClass && DayPilot.Util.addClass(m, f.cssClass);
				"number" == typeof e.part.line && DayPilot.Util.addClass(m, this.q(E.eventLine + e.part.line)), m.setAttribute("unselectable", "on"), this.showToolTip && !this.bubble && (m.title = e.client.toolTip() || ""), m.onmousemove = this.Sb, m.onmouseout = this.Tb, m.onmousedown = this.Ub, m.onmouseup = this.Vk, m.ontouchstart = T.onEventTouchStart, m.ontouchmove = T.onEventTouchMove, m.ontouchend = T.onEventTouchEnd, e.client.clickEnabled() && (m.onclick = this.Se), e.client.doubleClickEnabled() && (m.ondblclick = this.Ka), m.oncontextmenu = this.La, "undefined" != typeof f.ariaLabel ? m.setAttribute("aria-label", f.ariaLabel) : m.setAttribute("aria-label", f.text), m.setAttribute("tabindex", "-1");
				var C = document.createElement("div");
				C.setAttribute("unselectable", "on"), C.className = c.q(E.eventInner), C.innerHTML = e.client.innerHTML(), f.backColor && (C.style.background = f.backColor, (DayPilot.browser.ie9 || DayPilot.browser.ielt9) && (C.style.filter = "")), f.fontColor && (C.style.color = f.fontColor), f.borderColor && (C.style.borderColor = f.borderColor), f.backImage && (C.style.backgroundImage = "url(" + f.backImage + ")", f.backRepeat && (C.style.backgroundRepeat = f.backRepeat)), m.appendChild(C);
				var P = e.start().getTime() === e.part.start.getTime(),
					S = e.rawend().getTime() === e.part.end.getTime();
				if (P || DayPilot.Util.addClass(m, this.q("_event_continueleft")), S || DayPilot.Util.addClass(m, this.q("_event_continueright")), e.client.barVisible() && h > 0) {
					var y = 100 * e.part.barLeft / h,
						b = Math.ceil(100 * e.part.barWidth / h);
					"PercentComplete" === this.durationBarMode && (y = 0, b = f.complete || 0);
					var w = document.createElement("div");
					w.setAttribute("unselectable", "on"), w.className = this.q(E.eventBar), w.style.position = "absolute", f.barBackColor && (w.style.backgroundColor = f.barBackColor);
					var A = document.createElement("div");
					A.setAttribute("unselectable", "on"), A.className = this.q(E.eventBarInner), A.style.left = y + "%", 0 < b && b <= 1 ? A.style.width = "1px" : A.style.width = b + "%", f.barColor && (A.style.backgroundColor = f.barColor), f.barImageUrl && (A.style.backgroundImage = "url(" + f.barImageUrl + ")"), w.appendChild(A), m.appendChild(w)
				}
				if (m.row = d, f.areas) for (var M = 0; M < f.areas.length; M++) {
					var n = f.areas[M],
						H = n.visibility || n.v || "Visible";
					if ("Visible" === H) {
						(n.start || n.end) && (n.left = c.getPixels(new DayPilot.Date(n.start)).left - e.part.left, n.width = c.getPixels(new DayPilot.Date(n.end)).left - n.left - e.part.left);
						var _ = DayPilot.Areas.createArea(m, e, n);
						m.appendChild(_)
					}
				}
				if (this.elements.events.push(m), this.divEvents.appendChild(m), e.rendered = !0, m.event = e, s && (c.multiselect.add(m.event, !0), c.multiselect.gd(m)), c.sa()) {
					if ("function" == typeof c.onAfterEventRender) {
						var R = {};
						R.e = m.event, R.div = m, c.onAfterEventRender(R)
					}
				} else c.afterEventRender && c.afterEventRender(m.event, m);
				return !0
			}, this.sa = function() {
				return 2 === c.api
			}, this.Ch = function() {
				for (var e = 0; e < this.elements.events.length; e++) {
					var t = this.elements.events[e],
						i = t.event,
						n = i.part.dayIndex,
						a = this.rowlist[n],
						o = a.top,
						r = o + i.part.top;
					t.style.top = r + "px", DayPilot.list(t.related).filter(function(e) {
						return !!e.versionPart
					}).each(function(e) {
						var t = e.versionPart;
						e.style.top = o + t.top + "px"
					}), DayPilot.list(t.related).filter(function(e) {
						return !e.versionPart && ("divLeft" === e.type || "divRight" === e.type)
					}).each(function(e) {
						e.style.top = r + "px"
					})
				}
			}, this.fd = function(e) {
				if (!e) return null;
				for (var t = 0; t < c.elements.events.length; t++) {
					var i = c.elements.events[t];
					if (i.event === e || i.event.data === e.data) return i
				}
				return null
			}, this.Tb = function(e) {
				var t = this;
				DayPilot.Areas.hideAreas(t, e), DayPilot.Util.removeClass(t, c.q("_event_hover")), c.Wk(t), s.source || v.hideLinkpointsWithDelay(), c.bubble && "Bubble" === c.eventHoverHandling && c.bubble.hideOnMouseOut()
			}, this.Xk = function(e) {
				if ("function" == typeof this.onEventMouseOver) {
					var t = {};
					t.div = e, t.e = e.event, this.onEventMouseOver(t)
				}
			}, this.Wk = function(e) {
				if ("function" == typeof this.onEventMouseOut) {
					var t = {};
					t.div = e, t.e = e.event, this.onEventMouseOut(t)
				}
			}, this.Sb = function(e) {
				e = e || window.event, c.cellBubble && c.cellBubble.delayedHide();
				for (var t = this; t && !t.event;) t = t.parentNode;
				c.Yk(t, e);
				var i = t.event.cache ? t.event.cache.deleteDisabled : t.event.data.deleteDisabled;
				if (!t.active) {
					var n = [];
					if ("Disabled" !== c.eventDeleteHandling && !i) {
						var a = c.durationBarVisible ? c.durationBarHeight : 0;
						n.push({
							"action": "JavaScript",
							"v": "Hover",
							"w": 17,
							"h": 17,
							"top": a + 2,
							"right": 2,
							"css": c.q(E.eventDelete),
							"js": function(e) {
								c.Pa(e)
							}
						})
					}
					var o = t.event.cache ? t.event.cache.areas : t.event.data.areas;
					o && o.length > 0 && (n = n.concat(o)), DayPilot.Areas.showAreas(t, t.event, null, n), DayPilot.Util.addClass(t, c.q("_event_hover")), c.Xk(t)
				}
				"Disabled" === c.linkCreateHandling || s.source || (v.clearHideTimeout(), v.hideLinkpoints(), c.Lk() && v.showLinkpoint(t)), e.srcElement ? e.srcElement.insideEvent = !0 : e.insideEvent = !0
			}, this.Zk = {};
			var A = this.Zk;
			this.Vk = function(e) {
				if (c.ionicEventClickFix) {
					var t = A.originalMouse;
					if (t) {
						var i = DayPilot.mc(e);
						t.x === i.x && t.y === i.y && (c.Se.call(this, e), e.preventDefault(), e.stopPropagation())
					}
				}
			}, this.Ub = function(e) {
				if (c.S(), "undefined" != typeof DayPilot.Bubble && (DayPilot.Bubble.hideActive(), DayPilot.Bubble.cancelShowing()), e = e || window.event, !c.coords) {
					var t = c.sg;
					c.coords = DayPilot.mo3(t, e)
				}
				var i = DayPilot.Util.mouseButton(e);
				if (e.preventDefault(), e.stopPropagation(), i.left) {
					var a = e.shiftKey;
					if ("Disabled" !== c.multiSelectRectangle && a) return M.start(), !1;
					"w-resize" === this.style.cursor || "e-resize" === this.style.cursor ? (n.preventEventClick = !0, n.resizing = this, n.resizingEvent = this.event, n.originalMouse = DayPilot.mc(e), document.body.style.cursor = this.style.cursor, v.hideLinkpoints()) : ("move" === this.style.cursor || "Full" === c.moveBy && this.event.client.moveEnabled()) && (A.start = !0, A.moving = this, A.movingEvent = this.event, A.originalMouse = DayPilot.mc(e), A.moveOffsetX = DayPilot.mo3(this, e).x, A.moveDragStart = c.getDate(c.coords.x, !0), v.hideLinkpoints())
				}
				DayPilot.Menu && DayPilot.Menu.active && DayPilot.Menu.active.hide()
			}, this.Vb = {};
			var T = c.Vb;
			"undefined" == typeof DayPilot.Global.touch && (DayPilot.Global.touch = {}), DayPilot.Global.touch.active = !1, DayPilot.Global.touch.start = !1, T.timeouts = [], T.onEventTouchStart = function(e) {
				if (!DayPilot.Global.touch.active && !DayPilot.Global.touch.start) {
					e.stopPropagation(), T.clearTimeouts(), DayPilot.Global.touch.start = !0, DayPilot.Global.touch.active = !1;
					var i = this,
						n = c.tapAndHoldTimeout;
					T.timeouts.push(window.setTimeout(function() {
						DayPilot.Global.touch.active = !0, DayPilot.Global.touch.start = !1, c.coords = T.relativeCoords(e), e.preventDefault();
						var n = i.event;
						switch (c.eventTapAndHoldHandling) {
						case "Move":
							if (n.client.moveEnabled()) {
								var a = t(e);
								T.startMoving(i, a)
							}
							break;
						case "ContextMenu":
							DayPilot.Menu && DayPilot.Menu.touchPosition(e);
							var o = n.client.contextMenu();
							o ? o.show(n) : c.contextMenu && c.contextMenu.show(n)
						}
					}, n))
				}
			}, T.onEventTouchMove = function(e) {
				T.clearTimeouts(), DayPilot.Global.touch.start = !1
			}, T.onEventTouchEnd = function(e) {
				if (!DayPilot.Util.isMouseEvent(e)) {
					if (T.clearTimeouts(), DayPilot.Global.touch.start) {
						DayPilot.Global.touch.start = !1, e.preventDefault(), e.stopPropagation();
						var t = this;
						window.setTimeout(function() {
							c.Ha(t, e)
						})
					}
					window.setTimeout(function() {
						DayPilot.Global.touch.start = !1, DayPilot.Global.touch.active = !1
					}, 500)
				}
			}, T.onMainTouchStart = function(e) {
				if (!(DayPilot.Global.touch.active || DayPilot.Global.touch.start || e.touches.length > 1 || "Disabled" === c.timeRangeSelectedHandling)) {
					T.clearTimeouts(), DayPilot.Global.touch.start = !0, DayPilot.Global.touch.active = !1;
					var t = c.tapAndHoldTimeout;
					T.timeouts.push(window.setTimeout(function() {
						DayPilot.Global.touch.active = !0, DayPilot.Global.touch.start = !1, e.preventDefault(), c.coords = T.relativeCoords(e), T.range = c.$k()
					}, t));
					c.coords = T.relativeCoords(e)
				}
			}, T.onMainTouchMove = function(e) {
				if (T.clearTimeouts(), DayPilot.Global.touch.start = !1, n.resizing) return e.preventDefault(), void T.updateResizing();
				if (DayPilot.Global.touch.active) {
					if (e.preventDefault(), c.coords = T.relativeCoords(e), n.moving) return void T.updateMoving();
					if (T.range) {
						var t = T.range;
						t.end = {
							x: Math.floor(c.coords.x / c.cellWidth)
						}, c.Ih(t)
					}
				}
			}, T.onMainTouchEnd = function(e) {
				T.clearTimeouts();
				if (DayPilot.Global.touch.active) {
					if (n.moving) {
						e.preventDefault();
						var t = n.movingEvent;
						if (c !== n.movingShadow.calendar) return;
						var i = n.movingShadow.start,
							a = n.movingShadow.end,
							o = "Days" !== c.viewType ? n.movingShadow.row.id : null,
							r = n.drag && t.part.external,
							l = n.movingShadow.overlapping,
							s = !n.movingShadow.allowed;
						if (DayPilot.Util.removeClass(n.moving, c.q(c._k.eventMovingSource)), DayPilot.de(n.movingShadow), c.qj(), n.movingShadow.calendar = null, document.body.style.cursor = "", n.moving = null, n.movingEvent = null, n.movingShadow = null, c.lj.clear(), l || s || c.lj.forbidden || c.lj.invalid) return;
						c.Va(t, i, a, o, r)
					}
					if (T.range) {
						var d = T.range;
						T.range = null;
						var h = c.elements.range2;
						h && h.overlapping ? c.clearSelection() : c.Fh(d)
					}
				} else if (DayPilot.Global.touch.start) {
					if (c.coords.x < c.getScrollX()) return;
					var d = c.$k();
					c.Ih(d);
					var h = c.elements.range2;
					h && h.overlapping ? c.clearSelection() : c.Fh(d)
				}
				window.setTimeout(function() {
					DayPilot.Global.touch.start = !1, DayPilot.Global.touch.active = !1
				}, 500)
			}, T.clearTimeouts = function() {
				for (var e = 0; e < T.timeouts.length; e++) clearTimeout(T.timeouts[e]);
				T.timeouts = []
			}, T.relativeCoords = function(e) {
				var t = c.sg,
					i = e.touches[0].pageX,
					n = e.touches[0].pageY,
					a = DayPilot.abs(t);
				return {
					x: i - a.x,
					y: n - a.y,
					toString: function() {
						return "x: " + this.x + ", y:" + this.y
					}
				}
			}, T.startMoving = function(e, t) {
				n.moving = e, n.movingEvent = e.event, n.originalMouse = t;
				var i = DayPilot.abs(e);
				n.moveOffsetX = t.x - i.x, n.moveDragStart = c.getDate(c.coords.x, !0), n.movingShadow = c.ta(e), c.Zi()
			}, T.startResizing = function(e, t) {
				n.resizing = e, n.resizingEvent = e.event, n.resizing.dpBorder = t, n.resizingShadow || (n.resizingShadow = c.ta(e)), c.mj()
			}, T.updateResizing = function() {
				if (!n.resizingShadow) {
					var e = n.resizing;
					n.resizingShadow = c.ta(e)
				}
				c.mj()
			}, T.updateMoving = function() {
				if (n.movingShadow && n.movingShadow.calendar !== c && c.qj(), !n.movingShadow) {
					var e = n.moving;
					n.movingShadow = c.ta(e)
				}
				n.movingShadow.calendar.Zi()
			}, this.Yk = function(e, t) {
				var i = this.eventResizeMargin,
					a = this.eventMoveMargin,
					o = e;
				if ("undefined" != typeof n) {
					var r = DayPilot.mo3(e, t);
					if (r && (c.eventOffset = r, !n.resizing && !n.moving)) {
						var l = o.event.part.start.toString() === o.event.start().toString(),
							s = o.event.part.end.toString() === o.event.rawend().toString();
						if ("Top" === c.moveBy && r.y <= a && o.event.client.moveEnabled() && "Disabled" !== c.eventMoveHandling ? e.style.cursor = "move" : ("Top" === c.moveBy || "Full" === c.moveBy) && r.x <= i && o.event.client.resizeEnabled() && "Disabled" !== c.eventResizeHandling ? l ? (e.style.cursor = "w-resize", e.dpBorder = "left") : e.style.cursor = "not-allowed" : "Left" === c.moveBy && r.x <= a && o.event.client.moveEnabled() && "Disabled" !== c.eventMoveHandling ? e.style.cursor = "move" : e.offsetWidth - r.x <= i && o.event.client.resizeEnabled() && "Disabled" !== c.eventResizeHandling ? s ? (e.style.cursor = "e-resize", e.dpBorder = "right") : e.style.cursor = "not-allowed" : n.resizing || n.moving || (o.event.client.clickEnabled() && "Disabled" !== c.eventClickHandling ? e.style.cursor = "pointer" : e.style.cursor = "default"), "undefined" != typeof DayPilot.Bubble && c.bubble && "Bubble" === c.eventHoverHandling && ("default" === e.style.cursor || "pointer" === e.style.cursor)) {
							this.Yc && r.x === this.Yc.x && r.y === this.Yc.y;
							this.Yc = r, c.bubble.showEvent(e.event)
						}
					}
				}
			}, this.aj = function() {
				return "Days" !== this.viewType ? this.itline.length : Math.floor(1440 / this.cellDuration)
			}, this.Gh = function(e) {
				var e = e || n.range || c.rangeHold;
				if (!e) return null;
				var t = c.rowlist[e.start.y];
				if (!t) return null;
				var i = e.al ? e.al : e,
					a = t.id,
					o = i.end.x > i.start.x ? i.start.x : i.end.x,
					r = i.end.x > i.start.x ? i.end.x : i.start.x,
					l = 0;
				l = t.start.getTime() - this.Ba().getTime();
				var s = this.itline[o].start.addTime(l),
					d = this.itline[r].end.addTime(l);
				return new DayPilot.Selection(s, d, a, c)
			}, this.vb = function(e) {
				var t = e.parentNode,
					i = c.eventEditMinWidth,
					n = document.createElement("textarea");
				return n.style.position = "absolute", n.style.width = (e.offsetWidth < i ? i : e.offsetWidth - 2) + "px", n.style.height = e.offsetHeight - 2 + "px", n.style.fontFamily = DayPilot.gs(e, "fontFamily") || DayPilot.gs(e, "font-family"), n.style.fontSize = DayPilot.gs(e, "fontSize") || DayPilot.gs(e, "font-size"), n.style.left = e.offsetLeft + "px", n.style.top = e.offsetTop + "px", n.style.border = "1px solid black", n.style.padding = "0px", n.style.marginTop = "0px", n.style.backgroundColor = "white", n.value = DayPilot.tr(e.event.text()), n.event = e.event, t.appendChild(n), n
			}, this.bl = function(e) {
				var t = h.events();
				t.sort(function(e, t) {
					var i = e.event,
						n = t.event;
					return i.part.dayIndex !== n.part.dayIndex ? i.part.dayIndex - n.part.dayIndex : i.start() !== n.start() ? i.start().getTime() - n.start().getTime() : n.end().getTime() - i.end().getTime()
				});
				var i = t.indexOf(e);
				return i === -1 ? null : i + 1 < t.length ? t[i + 1] : t[0]
			}, this.Ia = function(e) {
				if (e && (n.editing && n.editing.blur(), e.event)) {
					var t = this.vb(e);
					n.editing = t, DayPilot.re(t, DayPilot.touch.start, function(e) {
						e.stopPropagation()
					}), t.onblur = function() {
						if (t.onblur = null, n.editing === t && (n.editing = null), t.parentNode && t.parentNode.removeChild(t), e.event) {
							var i = (e.event.text(), t.value);
							c.cb(e.event, i, t.canceling)
						}
					}, t.onmousedown = function(e) {
						e = e || window.event, e.stopPropagation && e.stopPropagation()
					}, t.onkeypress = function(e) {
						return 13 !== (window.event ? event.keyCode : e.keyCode) || (this.onblur(), !1)
					}, t.cancel = function() {
						n.editing && (n.editing.canceling = !0, n.editing.blur())
					}, t.onkeydown = function(t) {
						var i = window.event ? event.keyCode : t.keyCode;
						if (27 === i) n.editing.cancel();
						else if (9 === i) {
							var a = c.bl(e);
							return n.editing.cancel(), a && (DayPilot.browser.ie ? setTimeout(function() {
								c.Ia(a)
							}, 0) : c.Ia(a)), !1
						}
					}, t.select(), t.focus()
				}
			}, this.Dj = function(e) {
				var t = this,
					i = t.row;
				if ("undefined" != typeof DayPilot.Bubble && (c.cellBubble, c.resourceBubble)) {
					var n = c.Mh(i);
					c.resourceBubble.showResource(n)
				}
			}, this.Ej = function(e) {
				var t = this;
				"undefined" != typeof DayPilot.Bubble && c.resourceBubble && c.resourceBubble.hideOnMouseOut();
				var i = t.firstChild;
				DayPilot.Areas.hideAreas(i, e), i.data = null
			}, this.Fj = function(e) {
				l.row && (x.cancelClick = !0, setTimeout(function() {
					x.cancelClick = !1
				}, 100))
			}, this.bg = function() {
				if (this.timeHeader) {
					this.t.timeHeader = {};
					var e = document.createElement("div");
					e.style.position = "relative", this.nav.timeHeader = e;
					for (var t = 0; t < this.timeHeader.length; t++) for (var i = this.timeHeader[t], n = 0; n < i.length; n++) this.cl(n, t);
					var a = this.divNorth;
					if (1 === a.childNodes.length) a.replaceChild(e, a.childNodes[0]);
					else {
						if (DayPilot.browser.ie && a && a.firstChild) {
							for (var o = [], r = 0; r < a.firstChild.childNodes.length; r++) o.push(a.firstChild.childNodes[r]);
							DayPilot.de(o)
						}
						a.innerHTML = "", a.appendChild(e)
					}
					var l = this.Gg();
					a.style.width = l + 5e3 + "px", c.divCorner.innerHTML = this.cornerHtml || "", l > 0 && (this.divStretch.style.width = l + "px")
				}
			}, this.Zg = function(e, t) {
				var i = null,
					n = this.vc.locale(),
					t = t || this.cellGroupBy,
					a = e.start;
				e.end;
				switch (t) {
				case "Hour":
					i = "Clock12Hours" === c.vc.timeFormat() ? a.toString("h tt", n) : a.toString("H", n);
					break;
				case "Day":
					i = a.toString(n.datePattern);
					break;
				case "Week":
					i = 1 === _.weekStarts() ? a.weekNumberISO() : a.weekNumber();
					break;
				case "Month":
					i = a.toString("MMMM yyyy", n);
					break;
				case "Quarter":
					i = "Q" + Math.floor(a.getMonth() / 3 + 1);
					break;
				case "Year":
					i = a.toString("yyyy");
					break;
				case "None":
					i = "";
					break;
				case "Cell":
					var o = (e.end.ticks - e.start.ticks) / 6e4;
					i = this.dl(a, o);
					break;
				default:
					throw "Invalid cellGroupBy value"
				}
				return i
			}, this.dl = function(e, t) {
				var i = this.vc.locale(),
					t = t || this.cellDuration;
				return t < 60 ? e.toString("mm") : t < 1440 ? "Clock12Hours" === c.vc.timeFormat() ? e.toString("h tt", i) : e.toString("H", i) : t < 10080 ? e.toString("d") : 10080 === t ? 1 === _.weekStarts() ? e.weekNumberISO() : e.weekNumber() : e.toString("MMMM yyyy", i)
			}, this.Vg = function(e) {
				var t = this.scale;
				switch (t) {
				case "Cell":
					throw "Invalid scale: Cell";
				case "Manual":
					throw "Internal error (addScaleSize in Manual mode)";
				case "Minute":
					return e.addMinutes(1);
				case "CellDuration":
					return e.addMinutes(this.cellDuration);
				default:
					return this.Yg(e, t)
				}
			}, this.Yg = function(e, t) {
				var i, n = "Days" !== this.viewType ? this.days : 1,
					a = this.startDate.addDays(n);
				"Manual" === c.scale && (a = c.Xg());
				var t = t || this.cellGroupBy,
					o = 60;
				switch (t) {
				case "Hour":
					e.getHours() + e.getMinutes() + e.getSeconds() + e.getMilliseconds() > 0 && (e = e.getDatePart().addHours(e.getHours())), i = e.addHours(1);
					break;
				case "Day":
					i = e.getDatePart().addDays(1);
					break;
				case "Week":
					for (i = e.getDatePart().addDays(1); i.dayOfWeek() !== _.weekStarts();) i = i.addDays(1);
					break;
				case "Month":
					i = e.addMonths(1), i = i.firstDayOfMonth();
					for (var r = DayPilot.DateUtil.diff(i, e) / 6e4 % o === 0; !r;) i = i.addHours(1), r = DayPilot.DateUtil.diff(i, e) / 6e4 % o === 0;
					break;
				case "Quarter":
					for (i = e.addMonths(1), i = i.firstDayOfMonth(); i.getMonth() % 3;) i = i.addMonths(1);
					for (var r = DayPilot.DateUtil.diff(i, e) / 6e4 % o === 0; !r;) i = i.addHours(1), r = DayPilot.DateUtil.diff(i, e) / 6e4 % o === 0;
					break;
				case "Year":
					i = e.addYears(1), i = i.firstDayOfYear();
					for (var r = DayPilot.DateUtil.diff(i, e) / 6e4 % o === 0; !r;) i = i.addHours(1), r = DayPilot.DateUtil.diff(i, e) / 6e4 % o === 0;
					break;
				case "None":
					i = a;
					break;
				case "Cell":
					var l = this.bh(e);
					i = l.current ? l.current.end : l.past ? l.previous.end : l.next.start;
					break;
				default:
					throw "Invalid cellGroupBy value"
				}
				return i.getTime() > a.getTime() && (i = a), i
			}, this._k = {}, this._k.timeheadercol = "_timeheadercol", this._k.timeheadercolInner = "_timeheadercol_inner", this._k.resourcedivider = "_resourcedivider", this._k.eventFloat = "_event_float", this._k.eventFloatInner = "_event_float_inner", this._k.event = "_event", this._k.eventInner = "_event_inner", this._k.eventBar = "_event_bar", this._k.eventBarInner = "_event_bar_inner", this._k.eventDelete = "_event_delete", this._k.eventLine = "_event_line", this._k.eventMovingSource = "_event_moving_source";
			var E = this._k;
			this.cl = function(e, t) {
				var i = this.nav.timeHeader,
					n = this.timeHeader[t][e],
					a = t < this.timeHeader.length - 1,
					o = n.left,
					r = n.width,
					l = R.timeHeader(t),
					s = l.top,
					d = l.height,
					h = document.createElement("div");
				h.style.position = "absolute", h.style.top = s + "px", h.style.left = o + "px", h.style.width = r + "px", h.style.height = d + "px", n.toolTip && (h.title = n.toolTip), h.setAttribute("aria-hidden", "true"), n.cssClass && DayPilot.Util.addClass(h, n.cssClass), h.setAttribute("unselectable", "on"), h.style.KhtmlUserSelect = "none", h.style.MozUserSelect = "none", h.style.webkitUserSelect = "none", h.oncontextmenu = function() {
					return !1
				}, h.cell = {}, h.cell.start = n.start, h.cell.end = n.end, h.cell.level = t, h.cell.th = n, h.onclick = this.Kj, h.style.overflow = "hidden", c.timeHeaderTextWrappingEnabled || (h.style.whiteSpace = "nowrap");
				var u = document.createElement("div");
				u.setAttribute("unselectable", "on"), n.innerHTML && (u.innerHTML = n.innerHTML), n.backColor && (u.style.background = n.backColor), n.fontColor && (u.style.color = n.fontColor);
				var f = this.q(E.timeheadercol),
					v = this.q(E.timeheadercolInner);
				a && (f = this.q("_timeheadergroup"), v = this.q("_timeheadergroup_inner")), DayPilot.Util.addClass(h, f), DayPilot.Util.addClass(u, v), DayPilot.Util.addClass(h, c.q("_timeheader_cell")), DayPilot.Util.addClass(u, c.q("_timeheader_cell_inner")), DayPilot.list(n.areas).each(function(e) {
					e.start && (e.left = c.getPixels(new DayPilot.Date(e.start)).left - o, e.end && (e.width = c.getPixels(new DayPilot.Date(e.end)).left - e.left - o))
				}), h.appendChild(u), DayPilot.Areas.attach(h, n, {
					"areas": n.areas
				}), this.t.timeHeader[e + "_" + t] = h, i.appendChild(h)
			}, this.jh = function() {
				if (c.cellStacking) return void S.calculateEventPositions();
				for (var e = 0; e < this.rowlist.length; e++) {
					var t = this.rowlist[e],
						i = t.getHeight() + t.marginBottom + t.marginTop;
					t.height !== i && (this.zh = !0), t.height = i
				}
			}, this.eg = function() {
				var e = this.divHeader;
				if (!e) return !1;
				for (var t = this.rowlist.length, i = (this.rowHeaderCols ? this.rowHeaderCols.length : 1, 0), n = 0; n < t; n++) {
					var a = this.rowlist[n];
					if (!a.hidden) {
						var o = this.yj ? n : i;
						if (e.rows[o]) {
							for (var r = 0; r < e.rows[o].cells.length; r++) {
								var l = e.rows[o].cells[r];
								this.yj && (l.style.top = a.top + "px");
								var s = a.height;
								l && l.firstChild && parseInt(l.firstChild.style.height, 10) !== s && (l.firstChild.style.height = s + "px")
							}
							i++
						}
					}
				}
				this.yj && c.nav.resScrollSpace && (c.nav.resScrollSpace.style.top = c.Vf + "px")
			}, this.ad = function(e) {
				var t = this.separators[e];
				t.location = t.location || t.Location, t.color = t.color || t.Color, t.layer = t.layer || t.Layer, t.width = t.width || t.Width, t.opacity = t.opacity || t.Opacity;
				var i = new DayPilot.Date(t.location),
					n = t.color,
					a = t.width ? t.width : 1,
					o = !! t.layer && "AboveEvents" === t.layer,
					r = t.opacity ? t.opacity : 100;
				if (!(i.getTime() < this.Ba().getTime() || i.getTime() >= this.Xg().getTime())) {
					var l = this.getPixels(i);
					if (!l.cut && !(l.left < 0 || l.left > this.aj() * this.cellWidth)) {
						var s = document.createElement("div");
						s.style.width = a + "px", s.style.height = c.Vf + "px", s.style.position = "absolute", s.style.left = l.left - 1 + "px", s.style.top = "0px", s.style.backgroundColor = n, s.style.opacity = r / 100, s.style.filter = "alpha(opacity=" + r + ")", o ? this.divSeparatorsAbove.appendChild(s) : this.divSeparators.appendChild(s), this.elements.separators.push(s)
					}
				}
			}, this.Jk = function(e) {
				if ("Disabled" === c.timeRangeDoubleClickHandling) return !1;
				n.timeRangeTimeout && (clearTimeout(n.timeRangeTimeout), n.timeRangeTimeout = null);
				if (!c.coords) {
					var t = c.sg;
					c.coords = DayPilot.mo3(t, e)
				}
				if (e = e || window.event, e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, c.fl(c.coords)) {
					var i = c.Gh(c.rangeHold);
					c.bb(i.start, i.end, i.resource)
				} else if (n.range = c.$k(), n.range) {
					n.rangeCalendar = c;
					var i = c.Gh(n.range);
					c.bb(i.start, i.end, i.resource), c.rangeHold = n.range
				}
			}, this.Gk = function(e) {
				if (!DayPilot.Global.touch.start && !DayPilot.Global.touch.active) {
					if (n.timeRangeTimeout, 1, c.gl(), c.Ek(), !c.coords) {
						var t = c.sg;
						c.coords = DayPilot.mo3(t, e)
					}
					if (n.rectangleSelect) return !1;
					e = e || window.event;
					var i = DayPilot.Util.mouseButton(e);
					if (i.middle || i.right && c.fl(c.coords)) return !1;
					if (c.fl(c.coords)) return !1;
					var a = e.ctrlKey,
						o = e.metaKey,
						r = e.shiftKey,
						l = a || o,
						s = {};
					if (s.action = "None", "Disabled" !== c.multiSelectRectangle && r ? s.action = "RectangleSelect" : "Disabled" !== c.timeRangeSelectedHandling && (s.action = "TimeRangeSelect"), s.shift = r, s.ctrl = r, s.meta = o, s.originalEvent = e, s.preventDefault = function() {
						s.action = "None"
					}, "function" == typeof c.onGridMouseDown && c.onGridMouseDown(s), "None" === s.action) return e.preventDefault(), e.stopPropagation(), !1;
					if ("RectangleSelect" === s.action) {
						var d = {};
						return d.start = c.coords, d.calendar = c, n.rectangleSelect = d, !1
					}
					c.allowMultiRange && !l && H.clear();
					var h = c.ei(c.coords.y).i;
					return !c.rowlist[h].isNewRow && (n.range = c.$k(), n.range && (n.range.ctrl = l, n.rangeCalendar = c), !1)
				}
			}, this.$k = function() {
				var e = {},
					t = this._g(c.coords.x).x;
				return e.start = {
					y: c.ei(c.coords.y).i,
					x: t
				}, e.end = {
					x: t
				}, this.ki(c.ei(c.coords.y).i) ? null : (e.calendar = c, c.Ih(e), e)
			}, this.nj = function() {
				c.Gc();
				var e = n.resizingShadow,
					t = n.resizing;
				!
				function() {
					var i = c.hl,
						a = {
							"start": e.start,
							"end": c.iff (e.end)
						};
					e.original = a;
					var o = e.original;
					if (!o || !i || i.start !== o.start || i.end !== c.iff (o.end)) {
						var r = {};
						r.start = a.start, r.end = a.end, r.duration = new DayPilot.Duration(r.start, r.end), r.e = t.event, r.allowed = !0, r.resizing = "left" === n.resizing.dpBorder ? "start" : "end", r.left = {}, r.left.html = r.start.toString(c.eventResizingStartEndFormat, _.locale()), r.left.enabled = c.eventResizingStartEndEnabled, r.left.space = 5, r.left.width = null, r.right = {}, r.right.html = r.end.toString(c.eventResizingStartEndFormat, _.locale()), r.right.enabled = c.eventResizingStartEndEnabled, r.right.space = 5, r.right.width = null, r.multiresize = DayPilot.list(b.list);
						var l = {};
						l.event = t, l.start = r.start, l.end = r.end, r.multiresize.splice(0, 0, l), c.hl = a, "function" == typeof c.onEventResizing && c.onEventResizing(r), e.allowed = r.allowed;
						var s = r.start,
							d = c.Ie(r.end);
						if (e.finalStart = s, e.finalEnd = d, "Days" === c.viewType) {
							var h = t.event.part.dayIndex,
								u = c.rowlist[h],
								f = u.start.getTime() - c.Ba().getTime();
							s = s.addTime(-f), d = d.addTime(-f)
						}
						var v = DayPilot.DateUtil.diff(s, d);
						v = Math.max(v, 1);
						var p = _.useBox(v),
							g = p ? c.getPixels(s).boxLeft : c.getPixels(s).left,
							m = p ? c.getPixels(d).boxRight : c.getPixels(d).left;
						e.style.left = g + "px", e.style.width = m - g + "px", e.left = g, e.width = m - g, c.oj(n.resizingShadow, r), c.pj(n.resizingShadow, r)
					}
				}()
			}, this.Hk = function(e) {
				if (n.rectangleSelect) {
					var e = e || window.event;
					return e.cancelBubble = !0, e.preventDefault && e.preventDefault(), n.gMouseUp(e), !1
				}
				if (A = {}, c.rangeHold) {
					if (DayPilot.Util.mouseButton(e).left) {
						var t = c.rangeHold;
						if (c.fl(c.coords)) {
							var i = function(e) {
									return function() {
										n.timeRangeTimeout = null;
										var t = c.Gh(e);
										if (t) {
											var i = {};
											i.start = t.start, i.end = t.end, i.resource = t.resource, i.preventDefault = function() {
												i.preventDefault.value = !0
											}, "function" == typeof c.onTimeRangeClick && c.onTimeRangeClick(i), i.preventDefault.value || "function" == typeof c.onTimeRangeClicked && c.onTimeRangeClicked(i)
										}
									}
								};
							"Disabled" != c.timeRangeClickHandling && ("Disabled" === c.timeRangeDoubleClickHandling ? i(t)() : (clearTimeout(n.timeRangeTimeout), n.timeRangeTimeout = setTimeout(i(t), c.doubleClickTimeout)))
						}
					}
				}
			}, this.il = function() {
				return n.resizing || n.moving || n.range
			}, this.rj = function(e) {
				if (!DayPilot.Global.touch.active) {
					n.activeCalendar = c, e = e || window.event;
					var t = DayPilot.mc(e);
					if (c.coords = DayPilot.mo3(c.sg, e), e.insideMainD = !0, window.event && window.event.srcElement && (window.event.srcElement.inside = !0), A.start) {
						DayPilot.distance(A.originalMouse, t) > 3 && (DayPilot.Util.copyProps(A, n), document.body.style.cursor = "move", A = {})
					}
					if (n.resizing && n.resizingEvent.calendar === c) n.resizing.event || (n.resizing.event = n.resizingEvent), c.jl();
					else if (n.movingEvent && (n.movingEvent.calendar === c || n.movingEvent.calendar.dragOutAllowed)) c.kl();
					else if (n.range && n.range.calendar === c) n.range.moved = !0, c.ll();
					else if (s.source) {
						var i = s.source;
						v.drawShadow(i.coords, c.coords)
					} else n.rectangleSelect && (n.rectangleSelect.moved = !0, M.draw());
					"Disabled" !== c.crosshairType && c.ml(), c.nl();
					var a = e.insideEvent;
					if (window.event && window.event.srcElement && (a = window.event.srcElement.insideEvent), c.cellBubble && c.coords && c.rowlist && c.rowlist.length > 0 && !a) {
						var o = c._g(c.coords.x).x,
							r = c.ei(c.coords.y).i;
						if (0 <= r && r < c.rowlist.length && 0 <= o && o < c.itline.length) {
							var l = {};
							l.calendar = c, l.start = c.itline[o].start, l.end = c.itline[o].end, l.resource = c.rowlist[r].id, l.toJSON = function() {
								var e = {};
								return e.start = this.start, e.end = this.end, e.resource = this.resource, e
							}, c.cellBubble.showCell(l)
						}
					}
					if (n.drag) {
						if (c.gl(), n.gShadow && document.body.removeChild(n.gShadow), n.gShadow = null, !n.movingShadow && c.coords && c.rowlist.length > 0) {
							if (!n.movingEvent) {
								n.moving = n.drag.schedulerSourceEvent || {};
								var h = n.drag.event;
								if (h) {
									if (c !== h.calendar) {
										var f = h.calendar,
											p = h,
											g = DayPilot.Util.copyProps(h.data);
										h = new DayPilot.Event(g), h.calendar = f, h.part.duration = f.Qi(p)
									}
								} else {
									var m = c.itline[0].start,
										e = {
											"id": n.drag.id,
											"start": m,
											"end": m.addSeconds(n.drag.duration),
											"text": n.drag.text
										},
										y = n.drag.data;
									if (y) {
										var b = ["duration", "element", "remove", "duration", "id", "text"];
										for (var w in y) DayPilot.contains(b, w) || (e[w] = y[w])
									}
									h = new DayPilot.Event(e), h.calendar = c, h.part.duration = n.drag.duration
								}
								h.part.external = !0;
								var i = n.drag.schedulerSourceEvent;
								i && i.event && i.event.calendar === c && (h.part.external = !1), n.movingEvent = h
							}
							n.movingShadow = c.ta(n.movingEvent)
						}
						e.cancelBubble = !0
					}
					if ("Always" === c.autoScroll || "Drag" === c.autoScroll && (n.moving || n.resizing || n.range)) {
						var D = c.nav.scroll,
							k = {
								x: c.coords.x,
								y: c.coords.y
							};
						k.x -= D.scrollLeft, k.x += u.shiftX, k.y -= D.scrollTop;
						var x = D.clientWidth,
							C = D.clientHeight,
							P = 30,
							S = k.x < P ? k.x : 0,
							T = x - k.x < P ? x - k.x : 0,
							E = k.y < P ? k.y : 0,
							H = C - k.y < P ? C - k.y : 0,
							o = 0,
							r = 0,
							_ = 50;
						S && (o = -50 * d(S, P)), T && (o = _ * d(T, P)), E && (r = -50 * d(E, P) / 2), H && (r = _ * d(E, P) / 2), (n.resizing || n.range) && (r = 0), o || r ? c.ol(o, r) : c.Ek()
					}
				}
			}, this.ll = function() {
				var e = n.range;
				e.end = {
					x: c._g(c.coords.x).x
				}, c.Ih(e)
			}, this.jl = function() {
				n.resizingShadow || (n.resizingShadow = c.ta(n.resizing)), c.mj()
			}, this.kl = function() {
				if (n.movingShadow && n.movingShadow.calendar !== c && (n.movingShadow.calendar = null, DayPilot.de(n.movingShadow), n.movingShadow = null), !n.movingShadow) {
					window.navigator.userAgent.indexOf("Chrome/61.0") > -1 || DayPilot.Util.addClass(n.moving, c.q(E.eventMovingSource));
					var e = n.movingEvent;
					n.movingShadow = c.ta(e)
				}
				c.Xi(), c.Zi()
			}, this.pl = {};
			var M = this.pl;
			M.start = function() {
				var e = {};
				e.start = c.coords, e.calendar = c, n.rectangleSelect = e
			}, M.draw = function() {
				var e = n.rectangleSelect,
					t = n.rectangleSelect.start,
					i = c.coords;
				M.clear();
				var a, o, r, l, s, d, u, f, v = {
					"x": e.x,
					"y": e.y,
					"width": e.width,
					"height": e.height
				};
				if (function() {
					s = Math.min(t.x, i.x), u = Math.max(t.x, i.x), "Free" === c.multiSelectRectangle ? (d = Math.min(t.y, i.y), f = Math.max(t.y, i.y)) : "Row" === c.multiSelectRectangle && (d = t.y, f = t.y)
				}(), "Free" === c.multiSelectRectangle) a = s, o = d, r = u - s, l = f - d;
				else {
					if ("Row" !== c.multiSelectRectangle) throw "Invalid DayPilot.Scheduler.multiSelectRectangle value: " + c.multiSelectRectangle;
					var p = c.ei(d).i,
						g = c.rowlist[p];
					o = g.top, l = g.height;
					a = c._g(s).cell.left;
					var m = c._g(u).cell;
					r = m.left + m.width - a
				}
				var y = DayPilot.Util.div(c.divRectangle, a, o, r, l);
				if (y.style.boxSizing = "border-box", y.style.backgroundColor = "#0000ff", y.style.border = "1px solid #000033", y.style.opacity = .4, e.x = a, e.y = o, e.width = r, e.height = l, (e.x !== v.x || e.y !== v.y || e.width !== v.width || e.height !== v.height) && "function" == typeof c.onRectangleEventSelecting) {
					var b = {};
					b.events = h.eventsInRectangle(e.x, e.y, e.width, e.height).map(function(e) {
						return e.event
					}), b.start = c.getDate(e.x, !0), b.end = c.getDate(e.x + e.width, !0), c.onRectangleEventSelecting(b)
				}
			}, M.clear = function() {
				c.divRectangle.innerHTML = "", c.elements.rectangle = []
			}, this.ql = function() {
				var e, t;
				if (!(c.coords && c.rowlist && c.rowlist.length > 0 && c.itline && c.itline.length > 0)) return null;
				if (e = c._g(c.coords.x).x, t = c.ei(c.coords.y).i, !(t >= c.rowlist.length)) {
					return c.cells.findXy(e, t)[0]
				}
			}, this.nl = function() {
				var e = this.ql();
				if (this.hover.cell) {
					if (this.hover.cell.x === e.x && this.hover.cell.y === e.y) return;
					this.Fk()
				}
				if (this.hover.cell = e, "function" == typeof this.onCellMouseOver) {
					var t = {};
					t.cell = e, this.onCellMouseOver(t)
				}
			}, this.Fk = function() {
				if (this.hover.cell) {
					if ("function" == typeof this.onCellMouseOut) {
						var e = {};
						e.cell = this.hover.cell, this.onCellMouseOut(e)
					}
					this.hover.cell = null
				}
			}, this.hover = {}, this.ml = function() {
				var e = this.ql();
				this.hover.cell && this.hover.cell.x === e.x && this.hover.cell.y === e.y || this.Fc()
			}, this.gl = function() {
				this.divCrosshair.innerHTML = "", this.rl = null, this.sl = null
			}, this.T = function() {
				if (this.gl(), this.ul && this.ul.parentNode && (this.ul.parentNode.removeChild(this.ul), this.ul = null), this.vl) {
					for (var e = 0; e < this.vl.length; e++) {
						var t = this.vl[e];
						t.parentNode && t.parentNode.removeChild(t)
					}
					this.vl = null
				}
				this.Uf = -1, this.Tf = -1
			}, this.Fc = function() {
				var e, t;
				if (c.coords && c.rowlist && c.rowlist.length > 0 && (e = c._g(c.coords.x).x, t = c.ei(c.coords.y).i, !(t >= c.rowlist.length))) {
					var i = this.crosshairType,
						n = c.rowlist[t];
					if ("Full" === i) {
						var a = this.itline[e],
							o = a.left,
							r = this.rl;
						if (!r) {
							var r = document.createElement("div");
							r.style.height = c.Vf + "px", r.style.position = "absolute", r.style.top = "0px", r.className = c.q("_crosshair_vertical"), this.rl = r, this.divCrosshair.appendChild(r)
						}
						r.style.left = o + "px", r.style.width = a.width + "px";
						var l = n.top,
							s = n.height,
							d = this.Gg(),
							r = this.sl;
						if (!r) {
							var r = document.createElement("div");
							r.style.width = d + "px", r.style.height = s + "px", r.style.position = "absolute", r.style.top = l + "px", r.style.left = "0px", r.className = c.q("_crosshair_horizontal"), this.sl = r, this.divCrosshair.appendChild(r)
						}
						r.style.top = l + "px", r.style.height = s + "px"
					}
					var h = this.wl(this.coords.x);
					if (h && this.Uf !== h.x) {
						this.ul && this.ul.parentNode && (this.ul.parentNode.removeChild(this.ul), this.ul = null);
						var s = R.timeHeader(c.timeHeaders.length - 1).height,
							r = document.createElement("div");
						r.style.width = h.cell.width + "px", r.style.height = s + "px", r.style.left = "0px", r.style.top = "0px", r.style.position = "absolute", r.className = c.q("_crosshair_top"), this.ul = r;
						var u = this.divNorth,
							f = this.timeHeader ? this.timeHeader.length - 1 : 1;
						this.nav.timeHeader ? this.t.timeHeader[h.x + "_" + f].appendChild(r) : u.firstChild.rows[f].cells[e] && u.firstChild.rows[f].cells[e].firstChild.appendChild(r)
					}
					if (this.Tf !== t) {
						if (this.vl) {
							for (var v = 0; v < this.vl.length; v++) {
								var p = this.vl[v];
								p.parentNode && p.parentNode.removeChild(p)
							}
							this.vl = null
						}
						this.rowHeaderCols ? this.rowHeaderCols.length : 1;
						if (this.vl = [], this.divHeader.rows[t]) for (var v = 0; v < this.divHeader.rows[t].cells.length; v++) {
							var d = c.Jg(),
								r = document.createElement("div");
							r.style.width = d + "px", r.style.height = n.height + "px", r.style.left = "0px", r.style.top = "0px", r.style.position = "absolute", r.className = c.q("_crosshair_left"), this.vl.push(r), this.divHeader.rows[t].cells[v].firstChild.appendChild(r)
						}
					}
					h && (this.Uf = h.x), this.Tf = t
				}
			}, this.dj = function(e, t) {
				var i = c.timeHeader[e];
				if (!i) return null;
				for (var n = 0; n < i.length; n++) {
					var a = i[n];
					if (t >= a.left && t < a.left + a.width) {
						var o = {};
						return o.cell = a, o.x = n, o
					}
				}
				return null
			}, this.wl = function(e) {
				return c.dj(c.timeHeader.length - 1, e)
			}, this.Ik = function(e) {
				if (e = e || window.event, "Disabled" === c.timeRangeSelectedHandling) return !1;
				if ("Disabled" === c.timeRangeRightClickHandling) return !1;
				var t = null;
				if (t = c.fl(c.coords) ? c.Gh(c.rangeHold) : c.Gh()) {
					t.end = c.iff (t.end);
					var i = {};
					return i.start = t.start, i.end = t.end, i.resource = t.resource, i.preventDefault = function() {
						this.preventDefault.value = !0
					}, ("function" != typeof c.onTimeRangeRightClick || (c.onTimeRangeRightClick(i), !i.preventDefault.value)) && ("ContextMenu" === c.timeRangeRightClickHandling && c.contextMenuSelection && c.contextMenuSelection.show(t), "function" == typeof c.onTimeRangeRightClicked && c.onTimeRangeRightClicked(i), e.cancelBubble = !0, !! c.allowDefaultContextMenu && void 0)
				}
			}, this.fl = function(e) {
				var t = c.rangeHold;
				if (!t || !t.start || !t.end) return !1;
				var i = this.pi(t.start.y),
					n = t.start.x < t.end.x,
					a = (n ? t.start.x : t.end.x) * this.cellWidth,
					o = (n ? t.end.x : t.start.x) * this.cellWidth + this.cellWidth,
					r = i.top,
					l = i.bottom;
				return e.x >= a && e.x <= o && e.y >= r && e.y <= l
			}, this.Ih = function(e, t) {
				function i(e) {
					var t = e.end.x > e.start.x ? e.start.x : e.end.x,
						i = e.end.x > e.start.x ? e.end.x : e.start.x,
						n = e.start.y,
						a = (c.rowlist[n], c.itline[t]),
						o = c.itline[i],
						r = a.left,
						l = o.left + o.width,
						s = l - r,
						d = c.elements.range2;
					if (!d) {
						d = document.createElement("div"), d.style.position = "absolute", d.setAttribute("unselectable", "on"), d.className = c.q("_shadow");
						var h = document.createElement("div");
						h.className = c.q("_shadow_inner"), d.appendChild(h), c.divRange.appendChild(d)
					}
					return d.style.left = a.left + "px", d.style.top = c.rowlist[n].top + "px", d.style.width = s + "px", d.style.height = c.rowlist[n].height - 1 + "px", d.calendar = c, c.elements.range2 = d, function() {
						var e = c.rowlist[n],
							t = a.left;
						c.jj(d, e, t, s, null)
					}(), d
				}
				var e = e || n.range;
				e && e.calendar === c && !
				function() {
					var n = e.end.x > e.start.x ? e.start.x : e.end.x,
						a = e.end.x > e.start.x ? e.end.x : e.start.x,
						o = e.start.y,
						r = c.rowlist[o];
					if (r) {
						var l = c.itline[n],
							s = c.itline[a],
							d = c.xl,
							h = l.start.addTime(r.data.offset),
							u = s.end.addTime(r.data.offset);
						if (t || !d || d.start.getTime() !== h.getTime() || d.end.getTime() !== u.getTime() || d.resource !== c.rowlist[o].id) {
							var f = {
								"start": h,
								"end": c.iff (u)
							},
								v = {};
							v.start = f.start, v.end = f.end, v.duration = new DayPilot.Duration(f.start, f.end), v.resource = c.rowlist[o].id, v.allowed = !0, v.left = {}, v.left.html = v.start.toString(c.timeRangeSelectingStartEndFormat, _.locale()), v.left.enabled = c.timeRangeSelectingStartEndEnabled, v.left.space = 5, v.left.width = null, v.right = {}, v.right.html = v.end.toString(c.timeRangeSelectingStartEndFormat, _.locale()), v.right.enabled = c.timeRangeSelectingStartEndEnabled, v.right.space = 5, v.right.width = null, c.xl = v, "function" != typeof c.onTimeRangeSelecting || t || c.onTimeRangeSelecting(v);
							var p = c.yl(e);
							c.Hh(p, v.start, v.end);
							var g = i(p);
							c.oj(g, v), e.al = p, e.disabled = !v.allowed, c.pj(g, v), v.start = f.start, v.end = f.end
						}
					}
				}()
			}, this.yl = function(e) {
				return {
					"start": {
						"x": e.start.x,
						"y": e.start.y
					},
					"end": {
						"x": e.end.x
					},
					"disabled": e.disabled,
					"calendar": e.calendar
				}
			}, this.range = {}, this.range.all = function() {
				return H.get()
			}, this.zl = {};
			var H = this.zl;
			this.zl.list = [], this.zl.clear = function() {
				DayPilot.de(DayPilot.list(H.list).map(function(e) {
					return e.div
				})), H.list = []
			}, this.zl.add = function(e) {
				e.div = c.elements.range2, c.elements.range2 = null, c.qj(), H.list.push(e)
			}, this.zl.get = function() {
				return DayPilot.list(H.list).map(function(e) {
					return c.Gh(e)
				})
			}, this.zl.dispatch = function() {
				if (c.allowMultiRange && !n.range) {
					var e = DayPilot.list(H.list).last();
					c.Fh(e)
				}
			}, this.Al = function(e) {
				if ("Disabled" === c.timeRangeSelectedHandling) return !1;
				if (!DayPilot.Global.touch.active && !DayPilot.Global.touch.start) {
					e = e || window.event;
					var t = DayPilot.Util.mouseButton(e);
					if (!n.range && !n.rectangleSelect && !(c.rangeHold && c.fl(c.coords) && (t.right || t.middle) || c.ki(c.ei(c.coords.y).i))) {
						var i = {},
							a = c._g(c.coords.x).x;
						i.start = {
							y: c.ei(c.coords.y).i,
							x: a
						}, i.end = {
							x: a
						}, i.calendar = c, c.rangeHold = i, c.Fh(i)
					}
				}
			}, this.timeouts = {}, this.timeouts.drawEvents = null, this.timeouts.drawCells = null, this.timeouts.click = null, this.timeouts.resClick = [], this.timeouts.updateFloats = null, this.disableOnScroll = !1, this.og = function(e) {
				if (!c.disableOnScroll) {
					c.Yf();
					var t = c.nav.scroll;
					if (c.bj = t.scrollLeft, c._i = t.scrollTop, c.cj = t.clientWidth, c.divTimeScroll.scrollLeft = c.bj, c.divResScroll.scrollTop = c._i, u.isEnabled() && c.A && "Auto" != c.cellWidthSpec) if (u.active) a();
					else {
						if (c.nav.scroll.scrollLeft < c.infiniteScrollingMargin) return u.active = !0, c.nav.scroll.style.overflowX = "hidden", void setTimeout(function() {
							u.shiftStart(-c.infiniteScrollingStepDays)
						}, 100);
						if (c.nav.scroll.scrollWidth - (c.nav.scroll.scrollLeft + c.nav.scroll.clientWidth) < c.infiniteScrollingMargin) return u.active = !0, c.nav.scroll.style.overflowX = "hidden", void setTimeout(function() {
							u.shiftStart(c.infiniteScrollingStepDays)
						}, 100)
					}
					if (c.navigatorBackSync && !
					function() {
						var e = DayPilot.Util.evalVariable(c.navigatorBackSync),
							t = c.getViewPort().start;
						e.select(t, {
							"dontNotify": !0,
							"dontFocus": !0
						})
					}(), c.dynamicLoading) return c.zf(), void c.Bl();
					if (c.timeouts.drawEvents && (clearTimeout(c.timeouts.drawEvents), c.timeouts.drawEvents = null), c.scrollDelayEvents > 0 ? c.timeouts.drawEvents = setTimeout(c.Cl(), c.scrollDelayEvents) : c.oa(), c.timeouts.drawCells && (clearTimeout(c.timeouts.drawCells), c.timeouts.drawCells = null), c.scrollDelayCells > 0) c.timeouts.drawCells = setTimeout(c.Dl(), c.scrollDelayCells);
					else {
						c.Dl()()
					}
					c.timeouts.updateFloats && (clearTimeout(c.timeouts.updateFloats), c.timeouts.updateFloats = null), c.scrollDelayFloats > 0 ? c.timeouts.updateFloats = setTimeout(function() {
						c.mg()
					}, c.scrollDelayFloats) : c.mg(), c.onScrollCalled = !0
				}
			}, this.Dl = function() {
				return function() {
					c && (c.zf(), c.ig())
				}
			}, this.Cl = function() {
				var e = c.dynamicEventRenderingCacheSweeping,
					t = c.dynamicEventRenderingCacheSize;
				return function() {
					c && (c.Sk() ? window.setTimeout(function() {
						e && c.Pk(t), window.setTimeout(function() {
							c.oa(!0)
						}, 50)
					}, 50) : c.Ag())
				}
			}, this.Yf = function() {
				this.t.eventHeight = null, this.t.drawArea = null
			}, this.show = function() {
				this.visible = !0, this.Sf = !0, c.nav.top.style.display = "", this.na(), this.dg(), this.Ci(), c.og()
			}, this.hide = function() {
				this.visible = !1, this.Sf = !1, c.nav.top.style.display = "none"
			}, this.El = function() {}, this.Bl = function() {
				var e = c.nav.scroll;
				c.bj = e.scrollLeft, c._i = e.scrollTop, c.cj = e.clientWidth, c.divTimeScroll.scrollLeft = c.bj, c.divResScroll.scrollTop = c._i, c.refreshTimeout && window.clearTimeout(c.refreshTimeout);
				var t = c.scrollDelayDynamic;
				c.refreshTimeout = window.setTimeout(c.Fl(e.scrollLeft, e.scrollTop), t), c.mg()
			}, this.Gl = function(e) {
				if (!c.events.list) return null;
				for (var t = (e.id, new DayPilot.Date(e.start).toString(), 0); t < this.events.list.length; t++) {
					var i = this.events.list[t];
					if (c.si(i, e)) {
						var n = {};
						return n.ex = i, n.index = t, n.modified = !c.Hl(e, i), n
					}
				}
				return null
			}, this.Hl = function(e, t) {
				for (var i in e) if (("object" != typeof e[i] || e[i] instanceof DayPilot.Date) && e[i] !== t[i]) return !1;
				for (var i in t) if ("object" != typeof t[i] && e[i] !== t[i]) return !1;
				return !0
			}, this.kg = function(e, t) {
				for (var i = [], n = 0; n < e.length; n++) {
					var a = e[n],
						o = c.Gl(a),
						r = o && o.modified,
						l = !o;
					if (r) {
						this.events.list[o.index] = a;
						var s = c.events.gh(o.ex);
						i = i.concat(s)
					} else l && this.events.list.push(a);
					(r || l) && (i = i.concat(c.events.hh(a)))
				}
				c.ih(i), c.jh(), c.cg(), c.ja();
				c.M(), c.fg(), c.eg(), c.ig(), c.oa()
			}, this.Fl = function(e, t) {
				return c.r() ?
				function() {
					c.scrollX = e, c.scrollY = t, c.G("Scroll")
				} : function() {
					if ("function" == typeof c.onScroll) {
						var e = function(e) {
								var t = function() {
										if (c.sa() && "function" == typeof c.onAfterRender) {
											var e = {};
											e.isCallBack = !1, e.isScroll = !0, e.data = null, c.onAfterRender(e)
										}
									};
								c.kg(e, t)
							},
							t = {};
						t.viewport = c.getViewPort(), t.async = !1, t.events = [], t.loaded = function() {
							this.async && e(this.events)
						}, c.onScroll(t), t.async || e(t.events)
					}
				}
			}, this.Il = function() {
				var e = this.xg(),
					t = e.xStart,
					i = e.xEnd - e.xStart,
					n = e.yStart,
					a = e.yEnd - e.yStart;
				this.cellProperties || (this.cellProperties = {});
				for (var o = 0; o <= i; o++) {
					for (var r = t + o, l = 0; l < a; l++) {
						var s = n + l;
						this.rowlist[s].hidden || this.cf(r, s)
					}
					this.Jl(r)
				}
				for (var d = this.uj(), s = d.start; s < d.end; s++) this.rowlist[s].hidden || this.Kl(s)
			}, this.ig = function() {
				if (!c.Gd) {
					if (c.progressiveRowRendering && this.ph(), null !== this.rowlist && this.rowlist.length > 0) {
						if (this.cellSweeping) {
							var e = this.cellSweepingCacheSize;
							this.Rk(e)
						}
						this.Il(), this.Ll(), x.Qj()
					}
					this.zh = !1
				}
			}, this.Ll = function() {
				for (var e = this.xg(), t = e.xStart; t < e.xEnd; t++) {
					t < this.itline.length - 1 && this.itline[t + 1].breakBefore && this.Ml(t)
				}
			}, this.Ml = function(e) {
				var t = "x" + e;
				if (!this.t.breaks[t]) {
					var i = this.itline[e + 1].left - 1,
						n = this.Vf,
						a = document.createElement("div");
					a.style.left = i + "px", a.style.top = "0px", a.style.width = "1px", a.style.height = n + "px", a.style.fontSize = "1px", a.style.lineHeight = "1px", a.style.overflow = "hidden", a.style.position = "absolute", a.setAttribute("unselectable", "on"), a.className = this.q("_matrix_vertical_break"), this.divBreaks.appendChild(a), this.elements.breaks.push(a), this.t.breaks[t] = a
				}
			}, this.xg = function() {
				if (c.t.drawArea) return c.t.drawArea;
				if (!this.nav.scroll) return null;
				var e = c._i,
					t = {},
					i = this.dynamicEventRenderingMargin,
					i = null != this.dynamicEventRenderingMarginX ? this.dynamicEventRenderingMarginX : this.dynamicEventRenderingMargin,
					n = null != this.dynamicEventRenderingMarginY ? this.dynamicEventRenderingMarginY : this.dynamicEventRenderingMargin,
					a = c.bj - i - u.shiftX,
					o = a + c.cj + 2 * i,
					r = 0,
					l = 0;
				if (c.itline && c.itline.length > 0) {
					r = c._g(a).x, l = c._g(o, !0).x;
					var s = this.aj();
					l = Math.min(l, s), r = Math.max(r, 0)
				}
				var d = e - n,
					h = e + this.nav.scroll.offsetHeight + 2 * n,
					f = this.ei(d).i,
					v = this.ei(h).i;
				return v < this.rowlist.length && v++, t.xStart = r, t.xEnd = l, t.yStart = f, t.yEnd = v, t.pixels = {}, t.pixels.left = this.nav.scroll.scrollLeft - u.shiftX, t.pixels.right = this.nav.scroll.scrollLeft - u.shiftX + this.nav.scroll.clientWidth, t.pixels.top = this.nav.scroll.scrollTop, t.pixels.bottom = this.nav.scroll.scrollTop + this.nav.scroll.clientHeight, t.pixels.width = this.nav.scroll.scrollWidth, c.t.drawArea = t, t
			}, this.Gg = function() {
				var e = 0,
					t = this.itline[this.itline.length - 1];
				return e = t ? t.left + t.width : 0, (e < 0 || isNaN(e)) && (e = 0), e
			}, this.Kl = function(e) {
				var t = "y" + e;
				if (!this.t.linesHorizontal[t]) {
					var i = this.rowlist[e].top + this.rowlist[e].height - 1,
						n = this.Gg(),
						a = document.createElement("div");
					a.style.left = "0px", a.style.top = i + "px", a.style.width = n + "px", a.style.height = "1px", a.style.fontSize = "1px", a.style.lineHeight = "1px", a.style.overflow = "hidden", a.style.position = "absolute", a.setAttribute("unselectable", "on"), a.className = this.q("_matrix_horizontal_line"), this.divLines.appendChild(a), this.t.linesHorizontal[t] = a
				}
			}, this.Jl = function(e) {
				var t = this.itline[e];
				if (t) {
					var i = "x" + e;
					if (!this.t.linesVertical[i]) {
						var n = t.left + t.width - 1,
							a = document.createElement("div");
						a.style.left = n + "px", a.style.top = "0px", a.style.width = "1px", a.style.height = c.Vf + "px", a.style.fontSize = "1px", a.style.lineHeight = "1px", a.style.overflow = "hidden", a.style.position = "absolute", a.setAttribute("unselectable", "on"), a.className = this.q("_matrix_vertical_line"), this.divLines.appendChild(a), this.elements.linesVertical.push(a), this.t.linesVertical[i] = a
					}
				}
			}, this.Yi = function(e) {
				var t = this.rowlist[e],
					i = !t.expanded;
				t.expanded = i, t.resource && (t.resource.expanded = i);
				var n = this.Nl(e, t.expanded);
				if (!i) for (var a = 0; a < n.length; a++) {
					var o = n[a];
					this.Ah(o)
				}
				if (this.cg(), this.ag(), this.ja(), this.Yf(), i) {
					for (var a = 0; a < n.length; a++) {
						var o = n[a];
						this.Bh(o)
					}
					this.Ag()
				}
				this.Ch(), v.load(), this.fg(), this.ig(), this.oa(), this.zf();
				var r = this.Mh(t, e);
				i ? this.Vh(r) : this.Uh(r), this.Yf()
			}, this.Jj = function(e) {
				var t = {};
				if (t.index = e, "function" == typeof this.onLoadNode) {
					var i = {},
						n = this.rowlist[e].resource;
					i.resource = n, i.async = !1, i.loaded = function() {
						this.async && (n.dynamicChildren = !1, n.expanded = !0, c.update())
					}, this.onLoadNode(i), i.async || (n.dynamicChildren = !1, n.expanded = !0, this.update())
				} else this.G("LoadNode", t)
			}, this.Nl = function(e, t) {
				var i = this.rowlist[e],
					n = [];
				if (null === i.children || 0 === i.children.length) return n;
				for (var a = 0; a < i.children.length; a++) {
					var o = i.children[a],
						r = this.rowlist[o],
						l = t && i.expanded && !r.gk;
					r.hidden = !l, t === !r.hidden && n.push(o);
					var s = this.Nl(o, t);
					s.length > 0 && (n = n.concat(s))
				}
				return n
			}, this.ol = function(e, t) {
				this.Ek(), this.Ol(e, t)
			}, this.Pl = function(e) {
				if (!e) return !1;
				var t = this.nav.scroll.scrollWidth,
					i = this.nav.scroll.scrollLeft,
					n = this.nav.scroll.clientWidth,
					a = i + n;
				return !(e < 0 && i <= 0) && (!(e > 0 && a >= t) && (this.nav.scroll.scrollLeft += e, c.coords.x += e, c.Ql(), !0))
			}, this.Rl = function(e) {
				if (!e) return !1;
				var t = this.nav.scroll.scrollHeight,
					i = this.nav.scroll.scrollTop,
					n = this.nav.scroll.clientHeight,
					a = i + n;
				return !(e < 0 && i <= 0) && (!(e > 0 && a >= t) && (this.nav.scroll.scrollTop += e, c.coords.y += e, c.Ql(), !0))
			}, this.Ql = function() {
				n.resizing && n.resizing.event.calendar === c ? c.jl() : n.moving && (n.movingEvent.calendar === c || n.movingEvent.calendar.dragOutAllowed) ? c.kl() : n.range && n.range.calendar === c && c.ll();
			}, this.Ol = function(e, t) {
				if (this.Pl(e) || this.Rl(t)) {
					var i = function(e, t) {
							return function() {
								c.Ol(e, t)
							}
						};
					this.Sl = window.setTimeout(i(e, t), 100)
				}
			}, this.Ek = function() {
				c.Sl && (window.clearTimeout(c.Sl), c.Sl = null)
			}, this.cg = function() {
				for (var e = 0, t = 0; t < this.rowlist.length; t++) {
					var i = this.rowlist[t];
					i.hidden || (i.top = e, e += i.height)
				}
				this.Vf = e
			}, this.fg = function() {
				DayPilot.browser.ie && c.Tl(), this.elements.cells = [], this.elements.breaks = [], this.t.cells = [], this.t.breaks = [], this.divCells.innerHTML = "", this.divBreaks.innerHTML = "", c.Cj()
			}, this.Cj = function() {
				this.divLines.innerHTML = "", this.t.linesVertical = {}, this.t.linesHorizontal = {}, this.elements.linesVertical = []
			}, this.Tl = function(e) {
				var t = DayPilot.list();
				for (var i in c.t.cells) t.push(c.t.cells[i]);
				t.each(function(e) {
					c.Ei(e)
				})
			}, this.Dh = function(e) {
				var t = DayPilot.list();
				for (var i in c.t.cells) t.push(c.t.cells[i]);
				t.filter(function(t) {
					return t && t.coords && t.coords.y === e
				}).each(function(e) {
					c.Ei(e)
				})
			}, this.Ul = 0, this.Vl = DayPilot.list(["html", "cssClass", "backColor", "backImage", "backRepeat", "areas"]), this.Wl = c.Vl.add("business"), this.cf = function(e, t) {
				if (this.A) {
					var i = c.dh(e);
					if (i) {
						var n = e + "_" + t;
						if (!this.t.cells[n]) {
							var a = this.Fi(e, t);
							if (c.fj(e, t), !this.drawBlankCells) {
								var o = !1;
								if (this.Vi(t) ? o = !1 : this.Xl(a, c.Vl) || (o = !0), o) return
							}
							var r = document.createElement("div");
							if (r.style.left = i.left + "px", r.style.top = this.rowlist[t].top + "px", r.style.width = i.width + "px", r.style.height = this.rowlist[t].height + "px", r.style.position = "absolute", a && a.backColor && (r.style.backgroundColor = a.backColor), r.setAttribute("unselectable", "on"), r.className = this.q("_cell"), r.coords = {}, r.coords.x = e, r.coords.y = t, this.Vi(t) && DayPilot.Util.addClass(r, this.q("_cellparent")), a) {
								a.cssClass && DayPilot.Util.addClass(r, a.cssClass), DayPilot.Util.isNullOrUndefined(a.html) || (r.innerHTML = a.html), a.backImage && (r.style.backgroundImage = 'url("' + a.backImage + '")'), a.backRepeat && (r.style.backgroundRepeat = a.backRepeat), a.business && c.cellsMarkBusiness && DayPilot.Util.addClass(r, c.q("_cell_business")), DayPilot.list(a.areas).each(function(e) {
									(e.start || e.end) && (e.left = c.getPixels(new DayPilot.Date(e.start)).left - i.left, e.width = c.getPixels(new DayPilot.Date(e.end)).left - e.left - i.left)
								});
								var l = c.cells.findXy(e, t)[0];
								DayPilot.Areas.attach(r, l, {
									"areas": a.areas
								})
							}
							this.divCells.appendChild(r), this.elements.cells.push(r), this.t.cells[n] = r
						}
					}
				}
			}, this.qh = {}, this.Ci = function() {
				c.Yl().each(function(e) {
					c.Dh(e)
				}), c.ig()
			}, this.Yl = function() {
				for (var e = DayPilot.list(), t = this.xg(), i = t.xStart, n = t.xEnd - t.xStart, a = t.yStart, o = t.yEnd - t.yStart, r = 0; r < o; r++) for (var l = a + r, s = 0; s <= n; s++) {
					var d = i + s;
					if (!this.rowlist[l].hidden && !c.qh[d + "_" + l]) {
						e.push(l);
						break
					}
				}
				return e
			}, this.fj = function(e, t) {
				if ("function" == typeof this.onBeforeCellRender) {
					if (c.beforeCellRenderCaching && c.qh[e + "_" + t]) return;
					c.qh[e + "_" + t] = !0;
					var i = c.dh(e);
					if (!i) return;
					var n = c.cells.findXy(e, t)[0],
						a = {};
					return a.cell = n, a.getPixels = function(e) {
						var e = new DayPilot.Date(e);
						return c.getPixels(e).left - i.left
					}, this.onBeforeCellRender(a), DayPilot.Util.copyProps(a.cell, a.cell.properties, c.Wl), a
				}
			}, this.Xl = function(e, t) {
				if (t) {
					for (var i = 0; i < t.length; i++) if (!DayPilot.Util.isNullOrUndefined(e[t[i]])) return !0
				} else for (var n in e) if (!DayPilot.Util.isNullOrUndefined(e[n])) return !0;
				return !1
			}, this.clearSelection = function() {
				this.lg(), H.clear()
			}, this.cleanSelection = this.clearSelection, this.selectTimeRange = function(e, t, i, n) {
				var a = c.vg(i),
					o = c.bh(e),
					r = o.current || o.next;
				if (!r) throw new DayPilot.Exception("Time range selection 'start' out of timeline");
				var l = c.bh(new DayPilot.Date(t).addSeconds(-1)),
					s = l.current || l.previous;
				if (!s) throw new DayPilot.Exception("Time range selection 'end' out of timeline");
				var d = {};
				d.start = {
					y: a.index,
					x: DayPilot.indexOf(c.itline, r)
				}, d.end = {
					x: DayPilot.indexOf(c.itline, s)
				}, d.calendar = this, c.Ih(d), n || setTimeout(function() {
					c.Fh(d)
				}, 0)
				console.log("throw17");
			}, this.Eh = function() {
				DayPilot.de(n.movingShadow), n.movingShadow = null, c.qj(), c.lj.clear(), DayPilot.Global.movingLink && (DayPilot.Global.movingLink.clear(), DayPilot.Global.movingLink = null)
			}, this.lg = function() {
				this.divRange.innerHTML = '<div style="position:absolute; left:0px; top:0px; width:0px; height:0px;"></div>', this.elements.range = [], this.elements.range2 = null, this.qj(), c.rangeHold = null
			}, this.vc = {};
			var _ = this.vc;
			_.clearCache = function() {
				delete c.t.eventHeight, delete c.t.headerHeight
			}, _.locale = function() {
				return DayPilot.Locale.find(c.locale)
			}, _.timeFormat = function() {
				return "Auto" !== c.timeFormat ? c.timeFormat : _.locale().timeFormat
			}, _.weekStarts = function() {
				if ("Auto" === c.weekStarts) {
					var e = _.locale();
					return e ? e.weekStarts : 0
				}
				return c.weekStarts || 0
			}, _.rounded = function() {
				return "Rounded" === c.eventCorners
			}, _.layout = function() {
				var e = /MSIE 6/i.test(navigator.userAgent);
				return "Auto" === c.layout ? e ? "TableBased" : "DivBased" : c.layout
			}, _.notifyType = function() {
				var e;
				if ("Immediate" === c.notifyCommit) e = "Notify";
				else {
					if ("Queue" !== c.notifyCommit) throw "Invalid notifyCommit value: " + c.notifyCommit;
					e = "Queue"
				}
				return e
			}, _.isResourcesView = function() {
				return "Days" !== c.viewType
			}, _.useBox = function(e) {
				return "Always" === c.useEventBoxes || "Never" !== c.useEventBoxes && e < 60 * c.Mi() * 1e3
			}, _.eventHeight = function() {
				if (c.t.eventHeight) return c.t.eventHeight;
				var e = c.md("_event_height").height;
				return e || (e = c.eventHeight), c.t.eventHeight = e, e
			}, _.headerHeight = function() {
				if (c.t.headerHeight) return c.t.headerHeight;
				var e = c.md("_header_height").height;
				return e || (e = c.headerHeight), c.t.headerHeight = e, e
			}, _.splitterWidth = function() {
				return c.rowHeaderScrolling ? c.rowHeaderSplitterWidth : 1
			}, this.Zl = {};
			var R = this.Zl;
			R.timeHeader = function(e) {
				var t = {};
				t.top = 0, t.height = 0;
				for (var i = _.headerHeight(), n = 0; n <= e; n++) {
					var a = c.timeHeaders[n];
					t.top += t.height, t.height = a.height || i
				}
				return t
			}, this.Ec = function(e, t) {
				var i = e + "_" + t;
				return this.cellProperties && this.cellProperties[i] ? this.cellProperties[i].backColor : null
			}, this.Fi = function(e, t) {
				var i = e + "_" + t;
				if (c.cellConfig) for (var n = 0, a = 0; a < c.resources.length; a++) if (!c.resources[a].hidden) {
					if (n === t) {
						t = a;
						break
					}
					n += 1
				}
				if (this.cellProperties || (this.cellProperties = {}), this.cellProperties[i]) return this.cellProperties[i];
				if (this.Pf && (this.cellProperties[i] = c.$l(e, t)), !this.cellProperties[i]) {
					var o = c.rowlist[t],
						r = o.id,
						l = o.start.getTime() - c.Ba().getTime(),
						s = c.dh(e),
						d = s.start.addTime(l),
						h = s.end.addTime(l),
						u = {};
					u.start = d, u.end = h, u.resource = r;
					var f = {};
					f.business = c.isBusiness(u), this.cellProperties[i] = f
				}
				return this.cellProperties[i]
			}, this._l = function(e, t, i) {
				var n = t + "_" + i;
				return this.cellProperties[n] = {}, DayPilot.Util.copyProps(e, this.cellProperties[n], c.Wl), this.cellProperties[n]
			}, this.$l = function(e, t) {
				if (!this.cellConfig) return null;
				var i = this.cellConfig,
					n = this.cellProperties[e + "_" + t];
				!n && i.vertical && (n = this.cellProperties[e + "_0"]), !n && i.horizontal && (n = this.cellProperties["0_" + t]), !n && i["default"] && (n = i["default"]);
				var a = {};
				return DayPilot.Util.copyProps(n, a, c.Wl), a
			}, this.aa = function() {
				if (!this.Pf && !this.Qf && (this.Qf = !0, this.cellConfig)) {
					var e = this.cellConfig;
					if (e.vertical) for (var t = 0; t < e.x; t++) {
						var i = this.cellProperties[t + "_0"];
						if (i) for (var n = 1; n < e.y; n++) this._l(i, t, n)
					}
					if (e.horizontal) for (var n = 0; n < e.y; n++) {
						var i = this.cellProperties["0_" + n];
						if (i) for (var t = 1; t < e.x; t++) this._l(i, t, n)
					}
					if (e["default"]) for (var i = e["default"], n = 0; n < e.y; n++) for (var t = 0; t < e.x; t++) this.cellProperties[t + "_" + n] || this._l(i, t, n)
				}
			}, this.isBusiness = function(e) {
				var t = e.start,
					i = e.end,
					n = (i.getTime() - t.getTime()) / 6e4;
				if (n <= 1440 && "Days" !== c.viewType && !c.businessWeekends && (0 === e.start.dayOfWeek() || 6 === e.start.dayOfWeek())) return !1;
				if (n < 720) {
					var a = t.getHours();
					if (a += t.getMinutes() / 60, a += t.getSeconds() / 3600, a += t.getMilliseconds() / 36e5, a < this.businessBeginsHour) return !1;
					if (this.businessEndsHour >= 24) return !0;
					if (a >= this.businessEndsHour) return !1
				}
				return !0
			}, this.na = function() {
				"hidden" === this.nav.top.style.visibility && (this.nav.top.style.visibility = "visible")
			}, this.Sc = function() {
				var e = c.nav.top;
				return !!e && (e.offsetWidth > 0 && e.offsetHeight > 0)
			}, this.Tc = function() {
				var e = c.Sc;
				e() || c.Uc || (c.Uc = setInterval(function() {
					e() && (clearInterval(c.Uc), c.show(), c.wj())
				}, 100))
			}, this.bm = function(e) {
				"Parent100Pct" !== this.heightSpec && (this.heightSpec = "Fixed"), this.height = e - (this.Ig() + 2), this.ja()
			}, this.setHeight = this.bm, this.vg = function(e) {
				return DayPilot.list(D.rowcache[e]).first()
			}, this.rd = function() {
				if (this.id && this.id.tagName) this.nav.top = this.id;
				else {
					if ("string" != typeof this.id) throw "DayPilot.Scheduler() constructor requires the target element or its ID as a parameter";
					if (this.nav.top = document.getElementById(this.id), !this.nav.top) throw "DayPilot.Scheduler: The placeholder element not found: '" + e + "'."
				}
			}, this.cm = function() {
				this.hd(), this._f(), this.dg(), this.Wc(), this.Q(), n.register(this), this.Y(this.afterRenderData, !1), this.Mk(), this.ra(), this.G("Init")
			}, this.init = function() {
				this.dm(), this.Tc(), this.yk()
			}, this.dm = function() {
				if (this.rd(), !this.nav.top.dp) {
					this.lk();
					if (this.qd()) return this.cm(), this.A = !0, void this.Yf();
					this.Wc(), this.Q(), n.register(this), this.Mk(), this.gd(), this.A = !0;
					var angular = c.Qc.scope || c.pg.enabled;
					c.scrollToDate ? c.scrollTo(c.scrollToDate) : c.scrollX || c.scrollY ? c.setScroll(c.scrollX, c.scrollY) : angular || c.og(), c.scrollToResourceId && (c.scrollToResource(c.scrollToResourceId), c.scrollToResourceId = null);
					var e = function() {
							c.scrollY && c.setScroll(c.scrollX, c.scrollY)
						};
					window.setTimeout(e, 200), this.messageHTML && window.setTimeout(function() {
						c.message(c.messageHTML)
					}, 0), this.ra(), this.Yf(), this.Y(this.afterRenderData, !1), c.initEventEnabled && setTimeout(function() {
						c.G("Init")
					}), this.td(), this.gi = !0
				}
			}, this.ud = null, this.vd = function(e) {
				if (e) {
					var t = {
						"events": {
							"preInit": function() {
								var e = this.data;
								e && (DayPilot.isArray(e.list) ? c.events.list = e.list : c.events.list = e)
							},
							"postInit": function() {}
						},
						"links": {
							"preInit": function() {
								var e = this.data;
								e && (DayPilot.isArray(e.list) ? c.links.list = e.list : c.links.list = e)
							},
							"postInit": function() {}
						},
						"scrollTo": {
							"preInit": function() {},
							"postInit": function() {
								this.data && c.scrollTo(this.data, e.scrollToAnimated, e.scrollToPosition)
							}
						},
						"scrollX": {
							"postInit": function() {
								this.data && c.setScrollX(this.data)
							}
						},
						"scrollY": {
							"postInit": function() {
								this.data && c.setScrollY(this.data)
							}
						}
					};
					c.ud = t, c.pg.scrollToRequested && (t.scrollTo.data = c.pg.scrollToRequested, c.pg.scrollToRequested = null), c.pg.scrollXRequested && (t.scrollX.data = c.pg.scrollXRequested, c.pg.scrollXRequested = null), c.pg.scrollYRequested && (t.scrollY.data = c.pg.scrollYRequested, c.pg.scrollYRequested = null);
					for (var i in e) if (t[i]) {
						var n = t[i];
						n.data = e[i], n.preInit && n.preInit()
					} else c[i] = e[i]
				}
			}, this.td = function() {
				var e = c.ud;
				for (var t in e) {
					var i = e[t];
					i.postInit && i.postInit()
				}
				c.ud = {}
			}, this.temp = {}, this.temp.getPosition = function() {
				var e = Math.floor(c.coords.x / c.cellWidth),
					t = c.ei(c.coords.y).i;
				if (t < c.rowlist.length) {
					var i = {};
					return i.start = c.itline[e].start, i.end = c.itline[e].end, i.resource = c.rowlist[t].id, i
				}
				return null
			}, this.internal = {}, this.internal.initialized = function() {
				return c.A
			}, this.internal.dragInProgress = this.il, this.internal.invokeEvent = this.Qa, this.internal.eventMenuClick = this.$a, this.internal.timeRangeMenuClick = this._a, this.internal.resourceHeaderMenuClick = this.Kh, this.internal.linkMenuClick = this.Jh, this.internal.bubbleCallBack = this.Ya, this.internal.findEventDiv = this.fd, this.internal.rowtools = this.Sh, this.internal.getNodeChildren = this.W, this.internal.callback = function() {
				c.G.apply(c, arguments)
			}, this.internal.createRowObject = this.Mh, this.internal.restools = this._j, this.internal.gantt = null, this.internal.adjustEndIn = c.Ie, this.internal.adjustEndNormalize = c.kf, this.internal.touch = c.Vb, this.internal.cssNames = c._k, this.internal.skipUpdate = c.pg.skipUpdate, this.internal.skipped = c.pg.skipped, this.internal.loadOptions = c.vd, this.internal.postInit = c.td, this.internal.enableAngular2 = function() {
				c.pg.enabled = !0
			}, this.Init = this.init, this.vd(o)
		}, o = "3058" === (new DayPilot.Scheduler).v, DayPilot.Row = function(e, t) {
			if (!e) throw "Now row object supplied when creating DayPilot.Row";
			if (!t) throw "No parent control supplied when creating DayPilot.Row";
			var i = DayPilot.indexOf(t.rowlist, e);
			this.em = {};
			var n = this.em;
			n.id = e.id, n.name = e.name, n.data = e.resource, n.tags = e.tags;
			var a = this;
			a.isRow = !0, a.menuType = "resource", a.start = e.start, a.name = e.name, a.value = e.id, a.id = e.id, a.tags = e.tags, a.bubbleHtml = e.bubbleHtml, a.index = i, a.level = e.level, a.calendar = t, a.data = e.resource, a.fm = e, a.$ = {}, a.$.row = e, a.toJSON = function(e) {
				var t = {};
				return t.start = this.start, t.name = this.name, t.value = this.value, t.id = this.id, t.index = this.index, t
			}, a.parent = function() {
				return a.fm.hk ? t.Mh(a.fm.hk) : null
			}, a.children = function() {
				var e = DayPilot.list(a.$.row.children).map(function(e) {
					return t.Mh(t.rowlist[e])
				});
				return e.add = function(e) {
					var t = a.$.row.resource;
					t.children || (t.children = []), t.children.push(e)
				}, e
			}, a.loaded = function() {
				return a.fm.loaded
			}, a.cells = {}, a.cells.all = function() {
				for (var e = [], i = t.itline.length, n = a.index, o = 0; o < i; o++) {
					var r = t.cells.findXy(o, n);
					e.push(r[0])
				}
				return t.Gi(e)
			}, a.cells.totalDuration = function() {
				return new DayPilot.Duration(a.cells.all().map(function(e) {
					return e.end.getTime() - e.start.getTime()
				}).reduce(function(e, t) {
					return e + t
				}, 0))
			}, a.events = {}, a.events.all = function() {
				for (var e = DayPilot.list(), t = 0; t < a.fm.events.length; t++) e.push(a.fm.events[t]);
				return e
			}, a.events.isEmpty = function() {
				return 0 === a.fm.events.length
			}, a.events.forRange = function(e, t) {
				return a.fm.events.forRange(e, t)
			}, a.events.totalDuration = function() {
				var e = 0;
				return a.events.all().each(function(t) {
					e += t.part.end.getTime() - t.part.start.getTime()
				}), new DayPilot.Duration(e)
			}, a.groups = {}, a.groups.collapseAll = function() {
				for (var e = 0; e < a.fm.blocks.length; e++) {
					new o(a.fm.blocks[e]).gm()
				}
				t.jh(), t.kh(a.index), t.ja()
			}, a.groups.expandAll = function() {
				for (var e = 0; e < a.fm.blocks.length; e++) {
					new o(a.fm.blocks[e]).hm()
				}
				t.jh(), t.kh(a.index), t.ja()
			}, a.groups.expanded = function() {
				for (var e = [], i = 0; i < a.fm.blocks.length; i++) {
					var n = a.fm.blocks[i];
					n.expanded && n.lines.length > t.groupConcurrentEventsLimit && e.push(new o(n))
				}
				return DayPilot.list(e)
			}, a.groups.collapsed = function() {
				for (var e = [], t = 0; t < a.fm.blocks.length; t++) {
					var i = a.fm.blocks[t];
					i.expanded || e.push(new o(i))
				}
				return DayPilot.list(e)
			}, a.groups.all = function() {
				for (var e = [], t = 0; t < a.fm.blocks.length; t++) {
					var i = a.fm.blocks[t];
					e.push(new o(i))
				}
				return DayPilot.list(e)
			}, a.events.collapseGroups = a.groups.collapseAll, a.events.expandGroups = a.groups.expandAll, a.column = function(e) {
				return new r(a, e)
			}, a.toggle = function() {
				t.Yi(a.index)
			}, a.collapse = function() {
				a.$.row.expanded && a.toggle()
			}, a.expand = function() {
				a.$.row.expanded || a.toggle()
			}, a.remove = function() {
				t.rows.remove(a)
			}, a.edit = function() {
				t.rows.edit(a)
			}, a.addClass = function(e) {
				var i = a,
					n = t.divHeader,
					i = n.rows[i.index];
				if (i) {
					var o = DayPilot.list(i.cells).map(function(e) {
						return e.cellDiv
					});
					DayPilot.Util.addClass(o, e)
				}
				a.$.row.cssClass = DayPilot.Util.addClassToString(a.$.row.cssClass, e)
			}, a.removeClass = function(e) {
				var i = a,
					n = t.divHeader,
					i = n.rows[i.index];
				if (i) {
					var o = DayPilot.list(i.cells).map(function(e) {
						return e.cellDiv
					});
					DayPilot.Util.removeClass(o, e)
				}
				a.$.row.cssClass = DayPilot.Util.removeClassFromString(a.$.row.cssClass, e)
			};
			var o = function(e) {
					var i = function(e) {
							for (var i = 0; i < t.elements.events.length; i++) {
								var n = t.elements.events[i];
								if (n.event === e) return n
							}
							return null
						};
					this.hm = function() {
						e.expanded = !0;
						var n = t.Mj;
						DayPilot.list(e.events).each(function(e) {
							n.push(e.id())
						});
						var a = i(e);
						if (a) {
							t.Ok(a);
							var o = DayPilot.indexOf(t.elements.events, a);
							o !== -1 && t.elements.events.splice(o, 1)
						}
					}, this.expand = function() {
						this.hm(), t.jh(), t.kh(e.row.index), t.ja()
					}, this.gm = function() {
						if (e.lines.length > t.groupConcurrentEventsLimit) {
							e.expanded = !1;
							var i = DayPilot.list(e.events).map(function(e) {
								return e.id()
							});
							t.Mj = t.Mj.filter(function(e) {
								return !DayPilot.contains(i, e)
							})
						}
					}, this.collapse = function() {
						this.gm(), t.jh(), t.kh(e.row.index), t.ja()
					}
				},
				r = function(e, t) {
					this.html = function(i) {
						var n = e.calendar.divHeader,
							a = n.rows[e.index].cells[t],
							o = a.textDiv;
						return "undefined" == typeof i ? o.innerHTML : void(o.innerHTML = i)
					}
				}
		}, n.moving = null, n.movingEvent = null, n.originalMouse = null, n.resizing = null, n.resizingEvent = null, n.preventEventClick = !1, n.globalHandlers = !1, n.timeRangeTimeout = null, n.selectedCells = null, n.dragStart = function(e, t, i, a) {
			DayPilot.us(e);
			var o = n.drag = {};
			return o.element = e, o.duration = t, o.text = a, o.id = i, o.data = {
				"id": i,
				"text": a,
				"duration": t,
				"externalHtml": a
			}, !1
		}, DayPilot.Scheduler.startDragging = function(e) {
			var e = e || {},
				t = e.element,
				i = e.keepElement ? null : t;
			DayPilot.us(t);
			var a = n.drag = {};
			return a.element = i, a.id = e.id, a.duration = e.duration || 60, a.text = e.text || "", a.data = e, !1
		}, DayPilot.Scheduler.makeDraggable = function(e) {
			function t() {
				var t = e.duration || 60;
				t instanceof DayPilot.Duration && (t = t.totalSeconds());
				var i = n.drag = {};
				i.element = a, i.id = e.id, i.duration = t, i.text = e.text || "", i.data = e
			}
			e = e || {};
			var i = e.element,
				a = e.keepElement ? null : e.remove || i;
			DayPilot.us(i), DayPilot.re(i, "mousedown", function(e) {
				if (DayPilot.Util.mouseButton(e).left) {
					t();
					var i = e.target || e.srcElement;
					if (i.tagName) {
						var n = i.tagName.toLowerCase();
						if ("textarea" === n || "select" === n || "input" === n) return !1
					}
					return e.preventDefault && e.preventDefault(), !1
				}
			}), i.ontouchstart = function(e) {
				window.setTimeout(function() {
					t(), n.gTouchMove(e), e.preventDefault()
				}, 0), e.preventDefault()
			}
		}, DayPilot.Scheduler.stopDragging = function() {
			if (n.drag && n.drag.schedulerSourceEvent) {
				var e = n.drag.schedulerSourceEvent,
					t = e.event.calendar;
				DayPilot.Util.removeClass(e, t.q(i._k.eventMovingSource))
			}
			if (n.dragStop(), n.resizing && (DayPilot.de(n.resizingShadow), n.resizing = null, n.resizingEvent = null, n.resizingShadow = null), n.moving) {
				var i = n.movingEvent.calendar;
				DayPilot.Util.removeClass(n.moving, i.q(i._k.eventMovingSource)), DayPilot.de(n.movingShadow), n.moving = null, n.movingEvent = null, n.movingShadow = null
			}
			if (n.range) {
				var i = n.range.calendar;
				i.clearSelection(), n.range = null
			}
			document.body.style.cursor = "", DayPilot.list(n.registered).each(function(e) {
				e.Ek(), e.qj()
			})
		}, n.dragStop = function() {
			n.gShadow && (document.body.removeChild(n.gShadow), n.gShadow = null), n.drag = null
		}, n.register = function(e) {
			n.registered || (n.registered = DayPilot.list(), n.registered.out = function() {
				if ( !Array.prototype.forEach ) {
				  Array.prototype.forEach = function forEach( callback, thisArg ) {
				    var T, k;
				    if ( this == null ) {
				      throw new TypeError( "this is null or not defined" );
				    }
				    var O = Object(this);
				    var len = O.length >>> 0; 
				    if ( typeof callback !== "function" ) {
				      throw new TypeError( callback + " is not a function" );
				    }
				    if ( arguments.length > 1 ) {
				      T = thisArg;
				    }
				    k = 0;
				    while( k < len ) {
				      var kValue;
				      if ( k in O ) {
				        kValue = O[ k ];
				        callback.call( T, kValue, k, O );
				      }
				      k++;
				    }
				  };
				}
				n.registered.forEach(function(e) {
					e.S()
				})
			});
			for (var t = 0; t < n.registered.length; t++) if (n.registered[t] === e) return;
			n.registered.push(e)
		}, n.unregister = function(e) {
			var t = n.registered;
			if (t) {
				var i = DayPilot.indexOf(t, e);
				i !== -1 && t.splice(i, 1), 0 === t.length && (t = null)
			}
			t || (DayPilot.ue(document, "mousemove", n.gMouseMove), DayPilot.ue(document, "mouseup", n.gMouseUp), DayPilot.ue(document, "mousedown", n.gMouseDown), DayPilot.ue(document, "touchmove", n.gTouchMove), DayPilot.ue(document, "touchend", n.gTouchEnd), DayPilot.ue(window, "keyup", n.gKeyUp), n.globalHandlers = !1)
		}, n.gTouchMove = function(i) {
			if (n.resizing) {
				var a = n.resizing.event.calendar;
				a.coords = a.Vb.relativeCoords(i), a.Vb.updateResizing(), i.preventDefault()
			}
			if (n.moving && !n.drag) {
				var a = n.movingEvent.calendar;
				a.coords = a.Vb.relativeCoords(i), a.Vb.updateMoving(), i.preventDefault(), function() {
					if (a.dragOutAllowed) {
						var t = e(i);
						if (!t || t !== a) {
							var o = n.movingEvent;
							n.drag = {};
							var r = n.drag;
							r.id = o.id(), r.text = o.text(), r.schedulerSourceEvent = n.moving, r.element = null, r.duration = (o.rawend().getTime() - o.start().getTime()) / 1e3, r.text = o.text(), r.id = o.id(), r.event = DayPilot.Util.copyProps(o), a.qj(), DayPilot.de(n.movingShadow), n.movingShadow.calendar = null, n.movingShadow = null, n.registered.out()
						}
					}
				}()
			}
			if (n.drag) {
				i.preventDefault();
				var o = t(i),
					a = e(i);
				if (a) {
					if (n.gShadow && document.body.removeChild(n.gShadow), n.gShadow = null, a.coords = a.Vb.relativeCoords(i), !n.movingShadow && a.rowlist.length > 0) {
						if (!n.moving) {
							n.moving = {};
							var r = n.drag.event;
							if (!r) {
								var l = a.itline[0].start,
									i = {
										"id": n.drag.id,
										"start": l,
										"end": l.addSeconds(n.drag.duration),
										"text": n.drag.text
									},
									s = n.drag.data;
								if (s) {
									var d = ["duration", "element", "remove", "id", "text"];
									for (var c in s) DayPilot.contains(d, c) || (i[c] = s[c])
								}
								r = new DayPilot.Event(i), r.calendar = a, r.part.duration = n.drag.duration
							}
							r.part.external = !0;
							var h = n.drag.schedulerSourceEvent;
							h && h.event && h.event.calendar === a && (r.part.external = !1), n.movingEvent = r
						}
						n.movingShadow = a.ta(n.movingEvent)
					}
					n.moving && a.Vb.updateMoving()
				} else {
					DayPilot.de(n.movingShadow);
					var u = n.moving;
					n.moving = null, n.movingEvent = null, n.movingShadow = null, n.gShadow || (n.gShadow = n.createGShadow(n.drag.data), n.gShadow.source = u);
					var f = n.gShadow;
					f.style.left = o.x + "px", f.style.top = o.y + "px", n.registered.out()
				}
			}
		}, n.gTouchEnd = function(e) {
			n.gMouseUp(e)
		}, n.gMouseMove = function(e) {
			if ("undefined" != typeof n && !(DayPilot.Global.touch.active || DayPilot.Global.touch.start || (e = e || window.event, e.insideMainD || e.srcElement && e.srcElement.inside))) {
				var t = DayPilot.mc(e);
				if (n.drag) {
					if (!n.drag.startFired) {
						var i = n.drag.data || {},
							a = i.onDragStart,
							o = !1;
						if ("function" == typeof a) {
							var r = {};
							r.data = i, r.preventDefault = function() {
								r.preventDefault.value = !0
							}, a(r), o = r.preventDefault.value
						}
						if (n.drag.startFired = !0, o) return void(n.drag = null)
					}
					document.body.style.cursor = "move", n.gShadow || (n.gShadow = n.createGShadow(n.drag.data));
					var l = n.gShadow;
					if (l.style.left = t.x + "px", l.style.top = t.y + "px", n.moving = null, n.movingEvent = null, n.movingShadow) {
						var s = n.movingShadow.calendar;
						s && s.qj(), n.movingShadow.calendar = null, DayPilot.de(n.movingShadow), n.movingShadow = null
					}
				} else if (n.moving && n.movingEvent && n.movingEvent.calendar.dragOutAllowed && !n.drag) {
					var s = n.movingEvent.calendar,
						e = n.movingEvent;
					document.body.style.cursor = "move", n.gShadow || (n.gShadow = n.createGShadow(e.data), n.gShadow.source = n.moving);
					var l = n.gShadow;
					l.style.left = t.x + "px", l.style.top = t.y + "px", n.drag = {};
					var d = n.drag;
					d.schedulerSourceEvent = n.moving, d.element = null, d.duration = (e.rawend().getTime() - e.start().getTime()) / 1e3, d.text = e.text(), d.id = e.value(), d.event = DayPilot.Util.copyProps(e), s.qj(), DayPilot.de(n.movingShadow), n.movingShadow.calendar = null, n.movingShadow = null
				}
				n.registered.out()
			}
		}, n.gUnload = function(e) {
			if (n.registered) for (var t = 0; t < n.registered.length; t++) {
				var i = n.registered[t];
				n.unregister(i)
			}
		}, n.gMouseDown = function(e) {
			n.editing && n.editing.blur()
		}, n.gKeyUp = function(e) {
			var e = e || window.event;
			17 === e.keyCode && n.rangeCalendar && n.rangeCalendar.zl.dispatch()
		}, n.gMouseUp = function(e) {
			if (DayPilot.list(n.registered).each(function(e) {
				e.Ek()
			}), n.resizing) {
				var t = function() {
						var e = n.resizingEvent,
							t = e.calendar;
						document.body.style.cursor = "", n.resizing = null, n.resizingEvent = null, DayPilot.de(n.resizingShadow), n.resizingShadow = null, t.El()
					};
				if (setTimeout(function() {
					n.preventEventClick = !1
				}), !n.resizingShadow) return void t();
				var i = n.resizingEvent,
					o = i.calendar,
					r = n.resizingShadow.finalStart,
					d = n.resizingShadow.finalEnd,
					c = n.resizingShadow.overlapping,
					h = !n.resizingShadow.allowed;
				if (o.qj(), o.ij.clear(), t(), c || h) return;
				o.Sa(i, r, d)
			} else if (n.movingEvent) {
				var t = function() {
						DayPilot.Global.movingAreaData = null;
						var e = n.movingShadow && n.movingShadow.calendar;
						n.movingShadow && (DayPilot.de(n.movingShadow), n.movingShadow.calendar = null), document.body.style.cursor = "", n.moving = null, n.movingEvent = null, n.drag = null, e.El(), e && (e.Hc = null)
					};
				if (!n.movingShadow) return void t();
				var i = n.movingEvent,
					o = n.movingShadow.calendar;
				if (!o) return void t();
				if (DayPilot.Util.removeClass(n.moving, o.q(o._k.eventMovingSource)), function() {
					if (n.drag && n.drag.schedulerSourceEvent) {
						var e = n.drag.schedulerSourceEvent,
							t = e.event.calendar;
						DayPilot.Util.removeClass(e, t.q(o._k.eventMovingSource))
					}
				}(), !n.movingShadow.row) return void t();
				clearTimeout(o.Wi.timeout);
				var r = n.movingShadow.start,
					d = n.movingShadow.end,
					u = "Days" !== o.viewType ? n.movingShadow.row.id : null,
					f = !! n.drag && i.part.external,
					v = n.movingShadow.line,
					c = n.movingShadow.overlapping,
					h = !n.movingShadow.allowed;
				if (n.drag && (o.todo || (o.todo = {}), o.todo.del = n.drag.element, n.drag = null), n.movingShadow.calendar = null, document.body.style.cursor = "", n.moving = null, n.movingEvent = null, c || h || o.lj.forbidden || o.lj.invalid) return void o.Eh();
				var e = e || window.event;
				o.Va(i, r, d, u, f, e, v), DayPilot.Global.movingAreaData = null
			} else if (n.range) {
				e = e || window.event;
				var p = DayPilot.Util.mouseButton(e),
					g = n.range,
					o = g.calendar,
					t = function() {
						o.El()
					};
				o.xl = null;
				var m = e.ctrlKey || e.metaKey;
				if (o.allowMultiRange) return o.elements.range2.overlapping ? (DayPilot.de(o.elements.range2), o.elements.range2 = null, o.qj()) : o.zl.add(g), n.range = null, m || o.zl.dispatch(), void t();
				if (n.timeRangeTimeout) return clearTimeout(n.timeRangeTimeout), n.timeRangeTimeout = null, void t();
				o.rangeHold = g, n.range = null;
				var y = function(e) {
						return function() {
							n.timeRangeTimeout = null;
							var t = o.elements.range2;
							return t && t.overlapping ? void o.clearSelection() : (o.Fh(e), void("Hold" !== o.timeRangeSelectedHandling && "HoldForever" !== o.timeRangeSelectedHandling ? a() : o.rangeHold = e))
						}
					},
					b = o.yl(g);
				if (t(), !p.left) return void(n.timeRangeTimeout = null);
				if (g.moved || "Disabled" === o.timeRangeDoubleClickHandling) {
					y(b)();
					var e = e || window.event;
					return e.cancelBubble = !0, !1
				}
				n.timeRangeTimeout = setTimeout(y(b), o.doubleClickTimeout)
			} else if (l.row) {
				var o = l.calendar;
				o && o.Xj()
			} else if (s.source) {
				var o = s.calendar;
				o.li.clearShadow(), o.li.hideLinkpoints(), s.source = null, s.calendar = null
			} else if (n.splitting) {
				var w = n.splitting;
				w.cleanup(), n.splitting = null
			} else if (n.rectangleSelect) {
				var D = n.rectangleSelect,
					o = D.calendar;
				if (!D.moved) return n.rectangleSelect = null, void(o.fl(o.coords) || o.Al(e));
				var k = D.x,
					x = D.y,
					C = D.width,
					P = D.height,
					S = !1,
					A = o.Bg.eventsInRectangle(k, x, C, P).map(function(e) {
						return e.event
					});
				if ("function" == typeof o.onRectangleEventSelect) {
					var T = {};
					if (T.events = A, T.append = !1, T.start = o.getDate(k, !0), T.end = o.getDate(k + C, !0), T.preventDefault = function() {
						this.preventDefault.value = !0
					}, o.onRectangleEventSelect(T), T.preventDefault.value) return o.pl.clear(), void(n.rectangleSelect = null);
					S = T.append
				}
				if (S || o.multiselect.clear(!0), A.each(function(e) {
					o.multiselect.add(e, !0)
				}), o.multiselect.redraw(), setTimeout(function() {
					o.pl.clear(), n.rectangleSelect = null
				}, 0), "function" == typeof o.onRectangleEventSelected) {
					var T = {};
					T.events = A, o.onRectangleEventSelected(T)
				}
			}
			if (n.drag && (n.drag.event && n.drag.event.part && delete n.drag.event.part.external, n.drag = null, document.body.style.cursor = ""), n.gShadow) {
				if (n.gShadow.source) {
					var o = n.gShadow.source.event.calendar;
					DayPilot.Util.removeClass(n.gShadow.source, o.q(o._k.eventMovingSource))
				}
				document.body.removeChild(n.gShadow), n.gShadow = null
			}
			n.moveOffsetX = null, n.moveDragStart = null
		}, n.createGShadow = function(e) {
			var e = e || {},
				t = document.createElement("div");
			return t.setAttribute("unselectable", "on"), t.style.position = "absolute", t.style.width = "100px", t.style.height = "20px", t.style.zIndex = 101, t.style.pointerEvents = "none", t.style.backgroundColor = "#aaaaaa", t.style.opacity = .5, t.style.filter = "alpha(opacity=50)", t.className = e.externalCssClass, e.externalHtml && (t.innerHTML = e.externalHtml), document.body.appendChild(t), t
		};
		var l = {};
		DayPilot.Global.rowmoving = l;
		var s = {};
		DayPilot.Global.linking = s, "undefined" != typeof jQuery && !
		function(e) {
			e.fn.daypilotScheduler = function(e) {
				var t = null,
					i = this.each(function() {
						if (!this.daypilot) {
							var i = new DayPilot.Scheduler(this.id || this, e);
							i.init(), this.daypilot = i, t || (t = i)
						}
					});
				return 1 === this.length ? t : i
			}
		}(jQuery), function() {
			var e = DayPilot.am();
			e && e.directive("daypilotScheduler", ["$parse", function(e) {
				return {
					"restrict": "E",
					"template": "<div id='{{id}}'></div>",
					"compile": function(t, i) {
						return t[0].removeAttribute("id"), t[0].innerHTML = this["template"].replace("{{id}}", i["id"]), function(t, i, n) {
							var a = new DayPilot.Scheduler(i[0].firstChild);
							a.Qc.scope = t;
							var o = n["id"];
							o && (t[o] = a);
							var r = n["publishAs"];
							if (r) {
								(0, e(r).assign)(t, a)
							}
							for (var l in n) if (0 === l.indexOf("on")) {
								var s = DayPilot.Util.shouldApply(l);
								s ? !
								function(i) {
									a[i] = function(a) {
										var o = e(n[i]);
										DayPilot.Util.safeApply(t, function() {
											o(t, {
												"args": a
											})
										})
									}
								}(l) : !
								function(i) {
									a[i] = function(a) {
										e(n[i])(t, {
											"args": a
										})
									}
								}(l)
							}
							var d = t["$watch"],
								c = n["config"] || n["daypilotConfig"],
								h = n["events"] || n["daypilotEvents"];
							c || a.init(), d.call(t, c, function(e, t) {
								a.vd(e), a.A ? (a.update(), a.td()) : a.init()
							}, !0), d.call(t, h, function(e) {
								a.events.list = e, a.gd({
									"eventsOnly": !0
								})
							}, !0), t.$on("$destroy", function() {
								a.dispose()
							})
						}
					}
				}
			}])
		}(), "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded()
	}
}(), "undefined" == typeof DayPilot) var DayPilot = {};
"undefined" == typeof DayPilot.Global && (DayPilot.Global = {}), function() {
	"undefined" == typeof DayPilot.Year && (DayPilot.Year = function(e, t) {
		this.v = "3058";
		this.startDate = new DayPilot.Date, this.cssOnly = !0, this.cssClassPrefix = null, this.columns = 4, this.cellWidth = 20, this.showWeekNumbers = !1, this.im = [], this.lf = function() {
			this.root.dp = this, this.ae = new DayPilot.Date(this.startDate.toString("yyyy-01-01", "en-us"))
		}, this.q = function(e) {
			return this.cssClassPrefix ? this.cssClassPrefix + e : ""
		}, this.mf = function() {
			return this.showWeekNumbers ? this.cellWidth : 0
		}, this.jm = function() {
			this.im = [];
			var e = this.columns,
				t = 12 / e;
			this.root.className = this.q("_main"), this.root.style.width = e * (7 * this.cellWidth + this.mf()) + "px";
			for (var i = 0; i < t; i++) {
				for (var n = 0; n < e; n++) {
					var a = i * e + n,
						o = o + "_nav_" + a,
						r = document.createElement("div");
					r.id = o, r.style.float = "left", this.root.appendChild(r);
					var l = new DayPilot.Navigator(o);
					l.startDate = this.ae.addMonths(a), l.cssOnly = this.cssOnly, l.cssClassPrefix = this.cssClassPrefix, l.cellWidth = this.cellWidth, l.showWeekNumbers = this.showWeekNumbers, l.internal.showLinks = {}, l.selectMode = "none", l.timeRangeSelectedHandling = "JavaScript", l.onTimeRangeSelected = this.km, l.init(), l.root.className = "", this.im.push(l)
				}
				var s = document.createElement("div");
				s.style.clear = "left", this.root.appendChild(s)
			}
		}, this.km = function(e) {
			alert("clicked: " + e.day)
		}, this.init = function() {
			this.root = document.getElementById(e), this.root.dp || (this.lf(), this.jm())
		}
	})
}();