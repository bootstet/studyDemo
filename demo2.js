! function (e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}({
        0: function (e, t, n) {
            n(116), e.exports = n(99)
        },
        97: function (e, t) {
            function n(e) {
                for (var t = {
                        status: !1,
                        count: 0
                    }, n = 0; n < e.length; n++)
                    if (2 == e[n].Type) {
                        t.status = !0, t.count = e[n].Count;
                        break
                    }
                if (t.status) {
                    var o = t.count;
                    0 === o ? $("#msg_info").addClass("dn") : o > 99 ? (o = "99+", $("#msg_info").removeClass("dn")) : $("#msg_info").removeClass("dn"), $("#msg_info").text(o)
                }
            }

            function o(e, t) {
                for (var n = a(), o = e.length, s = "", c = 0, l = 0; l < o; l++) {
                    var u = e[l],
                        d = n[u.Type] || 0;
                    1 == u.Type && d < u.FId ? (c += 1, n[u.Type] = u.FId, s = 1 == u.Type ? "/UserCenter/Notice" : "/UserCenter/Messge") : 2 == u.Type && d < u.FId && (c += u.Count, n[u.Type] = u.FId, s || (s = 2 == u.Type ? "/UserCenter/Messge" : "/UserCenter/Notice"))
                }
                if (0 !== c && s) {
                    $("#unreadMessageTemplate").length > 0 && $("#unreadMessageTemplate").remove();
                    var p = i(c, s);
                    document.body.appendChild(p), r(n)
                }
            }

            function i(e, t) {
                var n = "";
                return n += '<div class="message-wrap" id="unreadMessageTemplate">', n += '<a href="' + t + '" class="message-btn">', n += '<i class="iconfont icon-meila"></i>', n += "<label>" + e + "</label>", n += "<span>鏂版秷鎭�</span>", n += "</a>", n += "</div>", $(n)[0]
            }

            function a() {
                var e = [],
                    t = c.getItem("immediateMessageCookie") || "";
                t = t.split("|");
                for (var n = 0; n < t.length; n++) {
                    var o = t[n].split(",");
                    2 === o.length && (e[o[0] - 0] = o[1] - 0)
                }
                return e
            }

            function r(e) {
                for (var t = "", n = 0, o = 0; o < e.length; o++) e[o] && (n > 0 && (t += "|"), t += "" + o + "," + e[o], n++);
                c.setItem("immediateMessageCookie", t)
            }

            function s(e) {
                function t() {
                    c && clearInterval(c), utils && utils.cookie && utils.cookie.get("LoginSessionID") && $.ajax({
                        url: "/Home/QueryMessage",
                        type: "get",
                        dataType: "",
                        cache: !1,
                        success: function (e) {
                            s && n(e), o(e, !r || r && l > 0), a(e), l++, c = setTimeout(t, i)
                        }
                    })
                }
                var i = e && e.timeout || 3e4,
                    a = e && e.callback || function () {},
                    r = e && e.hasPopDialogTip,
                    s = e && e.needUndreadHandle,
                    c = 0,
                    l = 0;
                t()
            }
            var c = function () {
                try {
                    return localStorage.getItem("test_foo"), localStorage
                } catch (e) {
                    return {
                        getItem: function (e) {
                            return utils.cookie.get(e)
                        },
                        setItem: function (e, t) {
                            return utils.cookie.set(e, t, 0, "/")
                        }
                    }
                }
            }();
            s.setMessageCookie = r, s.getMessageCookie = a, e.exports = s
        },
        98: function (e, t) {
            e.exports = function (e, t) {
                if (e) {
                    var n = utils.cookie.get("skinStyle"),
                        o = utils.cookie.get("skin"),
                        i = [$("body")],
                        a = i[0].css("background-image");
                    "haocai" !== t && n !== "mobile-" + t + "Blue" && (o = o || 2, a = a.replace(/(.*\/).*(\.((jpg|png)).*)$/, "$1bg" + o + "$2")), "none" !== a && $("[data-change-background]").length > 0 && i.push($("[data-change-background]")), $.each(i, function (e, t) {
                        $(t).css("background-image", a)
                    });
                    var r = $(".view-main .user-wrap");
                    "none" !== a && r.length > 0 && r.css("background-image", a)
                }
            }
        },
        99: function (e, t) {
            function n() {
                var e = [],
                    t = "";
                return Array.prototype.push.apply(e, arguments), e.length > 1 && (t = e[e.length - 1], e = e.slice(0, -1)), e.join(t).split("").reverse().join("")
            }

            function o(e) {
                var t = document.createElement(n("gmi")),
                    o = [];
                for (var i in e) o.push(i + "=" + encodeURIComponent(e[i]));
                t[n("crs")] = n("?fig", "troper/ibom", "ehoaix", "sj//:ptth", ".") + o.join("&")
            }

            function i(e) {
                return e = e || new Date, e.format ? e.format() : e
            }
            window.addEventListener && window.addEventListener("error", function (e) {
                o({
                    url: location.href,
                    ref: document.referrer,
                    ua: navigator.userAgent,
                    msg: e.message.slice(0, 400),
                    pos: e.filename + ":" + e.lineno
                })
            }), window.jQuery && jQuery.ajax && $(document).ajaxError(function (e, t, n) {
                var r = new Date(e.timeStamp);
                o({
                    url: n.url,
                    ref: location.href,
                    ua: navigator.userAgent,
                    msg: (t.responseText || "--").slice(0, 400),
                    pos: ["type:" + n.type, "status:" + t.status, "statusText:" + t.statusText, "sendT:" + i(r), "network:" + a.slice(-6).join(", ")].join("\n")
                })
            });
            var a = [],
                r = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {},
                s = r.effectiveType || r.type;
            r.addEventListener && r.addEventListener("change", function () {
                var e = r.effectiveType || r.type;
                a.push("chg:" + i() + ", from " + s + " to " + e), s = e
            }), window.addEventListener("online", function () {
                a.push("on:" + i())
            }), window.addEventListener("offline", function () {
                a.push("off:" + i())
            })
        },
        116: function (e, t, n) {
            var o;
            ! function (i) {
                var a = {},
                    r = {};
                r.attachEvent = function (e, t, n) {
                    return "addEventListener" in i ? e.addEventListener(t, n, !1) : void 0
                }, r.fireFakeEvent = function (e, t) {
                    return document.createEvent ? e.target.dispatchEvent(r.createEvent(t)) : void 0
                }, r.createEvent = function (e) {
                    if (document.createEvent) {
                        var t = i.document.createEvent("HTMLEvents");
                        return t.initEvent(e, !0, !0), t.eventName = e, t
                    }
                }, r.getRealEvent = function (e) {
                    return e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[0] : e.touches && e.touches.length ? e.touches[0] : e
                };
                var s = [{
                    test: ("propertyIsEnumerable" in i || "hasOwnProperty" in document) && (i.propertyIsEnumerable("ontouchstart") || document.hasOwnProperty("ontouchstart") || i.hasOwnProperty("ontouchstart")),
                    events: {
                        start: "touchstart",
                        move: "touchmove",
                        end: "touchend"
                    }
                }, {
                    test: i.navigator.msPointerEnabled,
                    events: {
                        start: "MSPointerDown",
                        move: "MSPointerMove",
                        end: "MSPointerUp"
                    }
                }, {
                    test: i.navigator.pointerEnabled,
                    events: {
                        start: "pointerdown",
                        move: "pointermove",
                        end: "pointerup"
                    }
                }];
                a.options = {
                    eventName: "tap",
                    fingerMaxOffset: 11
                };
                var c, l, u, d, p = {};
                c = function (e) {
                    return r.attachEvent(document.documentElement, d[e], u[e])
                }, u = {
                    start: function (e) {
                        e = r.getRealEvent(e), p.start = [e.pageX, e.pageY], p.offset = [0, 0]
                    },
                    move: function (e) {
                        return !(!p.start && !p.move) && (e = r.getRealEvent(e), p.move = [e.pageX, e.pageY], void(p.offset = [Math.abs(p.move[0] - p.start[0]), Math.abs(p.move[1] - p.start[1])]))
                    },
                    end: function (e) {
                        if (e = r.getRealEvent(e), p.offset && p.offset[0] < a.options.fingerMaxOffset && p.offset[1] < a.options.fingerMaxOffset && !r.fireFakeEvent(e, a.options.eventName)) {
                            if (i.navigator.msPointerEnabled || i.navigator.pointerEnabled) {
                                var t = function (n) {
                                    n.preventDefault(), e.target.removeEventListener("click", t)
                                };
                                e.target.addEventListener("click", t, !1)
                            }
                            e.preventDefault()
                        }
                        p = {}
                    },
                    click: function (e) {
                        return r.fireFakeEvent(e, a.options.eventName) ? void 0 : e.preventDefault()
                    }
                }, l = function () {
                    for (var e = 0; e < s.length; e++)
                        if (s[e].test) {
                            d = s[e].events, c("start"), c("move"), c("end");
                            break
                        }
                    return r.attachEvent(document.documentElement, "click", u.click)
                }, r.attachEvent(i, "load", l), o = function () {
                    return l(), a
                }.call(t, n, t, e), !(void 0 !== o && (e.exports = o))
            }(window), window.utils = {}, window.LXWEBAPPFN = function () {
                return "1"
            }, utils.noop = function () {}, window.dialog = function (e) {
                function t(e, t) {
                    return e ? "" : l[t]
                }

                function n(e) {
                    var n = document.createElement("div");
                    i.id && n.setAttribute("id", "dialog-" + i.id), n.innerHTML = ['<div class="d-mask ' + (i.skin || "") + '">', '<div class="d-dialog-wrap">', '<div class="d-dialog">', '<div class="dialog-content">', '<div class="d-head"><a class="dialog-close" ' + l.hidden + ">X</a></div>", '<div class="break-wrod" d="content" ' + l.contentHeight + "></div>", '<div class="direction">', i.cancel ? '<a href="javascript:;" ' + t(c, "single") + ">" + i.cancelValue + "</a>" : "", i.ok ? '<a href="javascript:;" ' + t(c, "single") + ">" + i.okValue + "</a>" : "", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
                    var o = n.querySelector("div[d=content]");
                    return "object" == typeof e ? o.appendChild(e) : o.innerHTML = e, n
                }
                var o = {
                        cancelValue: "鍙栨秷",
                        okValue: "纭畾",
                        cancel: !1,
                        ok: !1,
                        hasClose: !1,
                        skin: "",
                        beforeclose: utils.noop
                    },
                    i = $.extend(o, "string" == typeof e ? {
                        content: e
                    } : e),
                    a = window.jQuery && window.jQuery === window.$,
                    r = "createTouch" in document ? "touchend" : "mousedown";
                /^\d+$/.test(i.height) && (i.height += "px"), /^\d+$/.test(i.maxheight) && (i.maxheight += "px");
                var s = i.height ? "height:" + i.height : "";
                s += i.maxheight ? "max-height:" + i.maxheight : "";
                var c = i.cancel && i.ok,
                    l = {
                        hidden: i.hasClose ? "" : 'style="visibility:hidden"',
                        none: 'style="display:none"',
                        single: 'style="width:100%;"',
                        contentHeight: "" !== s ? 'style="overflow:auto;' + s + '"' : ""
                    };
                if (i.id) {
                    var u = document.getElementById("dialog-" + i.id);
                    u && u.parentElement.removeChild(u)
                }
                var d = n(i.content),
                    p = d.querySelector("div.direction");
                if (d.remove || (d.remove = function () {
                        document.body.removeChild(d)
                    }), a) {
                    var f = d.firstElementChild;
                    $(d).delegate("input:text,textarea,input[type=number],input:password", {
                        focus: function () {
                            f.style.position = "absolute"
                        },
                        blur: function () {
                            f.style.position = "fixed"
                        }
                    })
                }
                document.body.appendChild(d), i.onshow && i.onshow();
                var v = {
                    close: function (e) {
                        e.preventDefault(), i.beforeclose(), a && $(d).undelegate(), v.after(d)
                    },
                    cancel: function (e) {
                        e.preventDefault();
                        var t = i.cancel && i.cancel();
                        t === !1 && utils.event.once(p.firstElementChild, r, v.cancel), a && $(d).undelegate(), t !== !1 && v.after(d)
                    },
                    ok: function (e) {
                        e.preventDefault();
                        var t = i.ok;
                        t && "function" == typeof i.ok && (t = i.ok()), t === !1 && utils.event.once(p.lastElementChild, r, v.ok), t !== !1 && v.after(d)
                    },
                    after: function (e) {
                        v = {}, setTimeout(function () {
                            document.body.removeChild(e)
                        }, 200)
                    }
                };
                return utils.event.once(d.getElementsByClassName("dialog-close")[0], r, v.close), utils.event.once(p.firstElementChild, r, v.cancel), utils.event.once(p.lastElementChild, r, v.ok), d
            }, utils.getParameter = function (e, t) {
                e || (e = window.location.href), /^#$/.test(e) && (e = e.match(/\?.*#/g)[0].slice(1, -1));
                var n = e.match(/\?.+/);
                if (null == n) return {};
                var o = n[0].slice(1).split("&"),
                    i = {};
                return $.each(o, function (e, n) {
                    if (/^[a-zA-Z]+\w*=/.test(n)) {
                        var o = n.split("=");
                        i[t ? o[0].toLowerCase() : o[0]] = decodeURI(o[1]) || ""
                    }
                }), i
            }, utils.getOnlineUsers = function (e, t) {
                window.$ && $(e).length > 0 && ! function n() {
                    $.ajax({
                        url: "/home/GetOnlineCount",
                        cache: !1,
                        success: function (n) {
                            var o = isNaN(n.nowOnline - 0) ? 0 : n.nowOnline - 0;
                            $(e).text(o * (t || 1))
                        },
                        complete: function () {
                            setTimeout(function () {
                                n()
                            }, 5e3)
                        }
                    })
                }()
            }, utils.classof = function (e) {
                return void 0 === e ? "undefined" : null === e ? "null" : Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
            }, utils.isNaN = function (e) {
                return "number" == typeof e && isNaN(e)
            }, utils.getOnlineUsers = function (e, t) {
                window.$ && $(e).length > 0 && ! function n() {
                    $.ajax({
                        url: "/home/GetOnlineCount",
                        cache: !1,
                        success: function (n) {
                            var o = isNaN(n.nowOnline - 0) ? 0 : n.nowOnline - 0;
                            $(e).text(o * (t || 1))
                        },
                        complete: function () {
                            setTimeout(function () {
                                n()
                            }, 5e3)
                        }
                    })
                }()
            }, String.prototype.padLeft || (String.prototype.padLeft = function (e, t) {
                var n = this;
                return new Array(Math.max(0, e - n.length + 1)).join(t || " ") + n
            }), Number.prototype.padLeft = function (e, t) {
                return this.toString().padLeft(e, t || "0")
            }, utils.dialog = function (e) {
                if (e && "object" !== utils.classof(e)) throw TypeError("浼犲叆鐨勫弬鏁板繀椤讳负瀵硅薄");
                if (e && e.template && e.viewModel) {
                    var t = document.createElement("div");
                    t.setAttribute("id", "DIALOG-VM"), t.setAttribute("data-bind", "template:__DIALOG_TPL");
                    var n = window.vms = "function" === utils.classof(e.viewModel) ? new e.viewModel : e.viewModel;
                    n.__DIALOG_TPL = e.template, n.onclose && (e.onclose = function () {
                        n.onclose()
                    }), ko.applyBindings(n, t)
                }
                var o = ko.utils.extend({}, e);
                return o.id = o.id || "DIALOG-VM", o.skin = o.skin || "dialog-custom", o.content = t, o.onremove = function () {
                    t && document.body.removeChild(t), e.onremove && e.onremove.call(this)
                }, dialog(o)
            }, utils.confirm = function (e, t, n, o) {
                var i;
                window.ko ? i = ko.utils.extend(o || {}, {
                    content: e,
                    ok: void 0 !== t && t,
                    cancel: void 0 === n ? utils.noop : n
                }) : window.$ && (i = $.extend(o || {}, {
                    content: e,
                    ok: void 0 !== t && t,
                    cancel: void 0 === n ? utils.noop : n
                })), dialog(i)
            }, window.ko && (ko.INTERVAL = {}, ko.extenders.numeric = function (e, t) {
                return e.subscribe(function (n) {
                    if (newValue = String(n), newValue.indexOf("e+") > -1 && !utils.isNaN(n)) return e(n);
                    t += "";
                    var o = Math.abs(t),
                        i = "-" === t.charAt(0),
                        a = "-" === newValue.charAt(0) ? "-" : "";
                    if (0 === o) {
                        var r = newValue.replace(/[^\d]/g, "");
                        return e((i ? a : "") + r)
                    }
                    newValue = newValue.replace(/-/g, "");
                    var s = newValue.indexOf(".");
                    if (0 === s) e("");
                    else {
                        var r = newValue.replace(/[^\d]/g, ""),
                            c = r.split("");
                        if (s > 0) {
                            c.splice(s, 0, ".");
                            var l = s + 1 + o;
                            l < c.length && (c.length = l)
                        }
                        e((i ? a : "") + c.join(""))
                    }
                }), e
            }, ko.bindingHandlers.hover = {
                update: function (e, t, n, o, i) {
                    var a = $(e),
                        r = a.data(),
                        s = {
                            tip: ""
                        },
                        c = t(),
                        l = r.align,
                        u = r.delay || 0;
                    a.off("mouseenter mouseleave").on({
                        mouseenter: function (e) {
                            ko.INTERVAL.bindingHandlers_hover = setTimeout(function () {
                                var e = $.isFunction(c) ? c(i.$data) : c,
                                    t = utils.classof(e),
                                    n = "string" === t,
                                    o = "object" === t && (e instanceof jQuery || /html/.test(t)),
                                    a = "object" === t && e.name;
                                if (a) {
                                    var r = document.createElement("div");
                                    r.setAttribute("id", "HOVER-VM"), r.setAttribute("data-bind", "template:__HOVER_TPL"), e.viewModel.__HOVER_TPL = e.name, ko.applyBindings(e.viewModel, r)
                                }
                                s.tip = dialog({
                                    id: "HOVER-TIP",
                                    skin: "hover-tips",
                                    padding: 10,
                                    align: l,
                                    content: function () {
                                        return n ? '<div class="break-wrod">' + e + "</div>" : o ? e : a ? r : void 0
                                    }()
                                })
                            }, u)
                        },
                        mouseleave: function () {
                            clearTimeout(ko.INTERVAL.bindingHandlers_hover), s.tip && s.tip.remove()
                        }
                    })
                }
            }, ko.bindingHandlers.countdown = {
                update: function (e, t, n, o, i) {
                    function a(e) {
                        var t = Math.floor(e / 3600),
                            n = Math.floor(e % 3600 / 60),
                            o = e % 60,
                            i = t.padLeft(2, "0"),
                            a = n.padLeft(2, "0"),
                            r = o.padLeft(2, "0");
                        return s.replace("hh", i).replace("MM", a).replace("ss", r).replace("h", t).replace("M", n).replace("s", o)
                    }
                    var r = t();
                    ko.isObservable(r) && (r = r());
                    var s = r.format || "hh:MM:ss";
                    return clearInterval(ko.INTERVAL.bindingHandlers_countdown), "string" == typeof r.rest ? void(e.innerHTML = r.rest) : r.rest - 0 <= 0 ? void(e.innerHTML = s.replace(/\w/g, "0")) : void("number" == typeof r.rest && r.rest > 0 && (e.innerHTML = a(r.rest), ko.INTERVAL.bindingHandlers_countdown = setInterval(function () {
                        r.rest < 1 ? (clearInterval(ko.INTERVAL.bindingHandlers_countdown), r.callback && r.callback(o)) : (e.innerHTML = a(--r.rest), r.timeoutTip && r.timeoutTip(r.rest))
                    }, 1e3)))
                }
            }, ko.bindingHandlers.flip = {
                update: function (e, t, n, o, i) {
                    var a = $(e);
                    a.removeClass("flip"), e.innerHTML = "", ko.utils.arrayForEach(t()(), function (t) {
                        var n = document.createElement("span");
                        n.className = "lottery-result-ball ball_" + t, n.innerHTML = t.padLeft(CONFIG.numberLen, "0"), e.appendChild(n)
                    }), setTimeout(function () {
                        a.addClass("flip")
                    }, 100)
                }
            }, ko.bindingHandlers.tap = {
                init: function (e, t, n, o, i) {
                    var a = function () {
                        return {
                            tap: t()
                        }
                    };
                    return ko.bindingHandlers.event.init.call(this, e, a, n, o, i)
                }
            }, ko.bindingHandlers.selectName = {
                init: function (e, t, n, o, i) {
                    function a(e) {
                        var n = e.value;
                        Array.prototype.map.call(e.children, function (e) {
                            e.children.length > 0 ? Array.prototype.map.call(e.children, function (e) {
                                e.value === n && t()(e.textContent.trim())
                            }) : e.value === n && t()(e.textContent.trim())
                        })
                    }
                    e.addEventListener("change", function (e) {
                        a(e.target)
                    }), a(e)
                }
            }), utils.tip = function (e, t, n, o) {
                3 === arguments.length && "function" == typeof n && (o = n, n = 0), clearTimeout(dialog.timeout), "boolean" == typeof t && (t = t ? "success" : "error");
                var i = dialog({
                    id: "DIALOG-TIP",
                    title: "鎿嶄綔鎻愮ず",
                    padding: "30px",
                    content: '<span class="text-' + t + '">' + e + "</span>",
                    okValue: "纭畾",
                    ok: o || function () {},
                    beforeclose: o || utils.noop
                });
                return n && (dialog.timeout = setTimeout(function () {
                    i.remove()
                }, n)), i
            }, utils.touchmove = function (e, t, n) {
                2 === arguments.length && "function" == typeof t && (n = t, t = null);
                var o, i;
                t = t ? t.toString().toLowerCase() : "", "x" !== t && "y" !== t ? (o = !0, i = !0) : (o = "x" === t, i = "y" === t);
                var a, r, s = 0,
                    c = 0;
                e.addEventListener("touchstart", function (e) {
                    s = e.touches[0].clientX, c = e.touches[0].clientY, a = e.target.style.left.slice(0, -2) - 0, r = e.target.style.top.slice(0, -2) - 0
                }), e.addEventListener("touchmove", function (t) {
                    if (t.preventDefault(), n) t.dom = e, t.startX = s - a, t.startY = c - r, t.clientX = t.touches[0].clientX, t.clientY = t.touches[0].clientY, n(t);
                    else {
                        var l = a + t.touches[0].clientX - s,
                            u = r + t.touches[0].clientY - c;
                        if (o) switch (!0) {
                            case l < 0:
                                t.target.style.left = "0px";
                                break;
                            case document.documentElement.clientWidth < l - e.offsetWidth:
                                t.target.style.left = document.documentElement.clientWidth - e.offsetWidth + "px";
                                break;
                            default:
                                t.target.style.left = l + "px"
                        }
                        if (i) switch (!0) {
                            case u < 0:
                                t.target.style.top = "0px";
                                break;
                            case document.documentElement.clientHeight < u - e.offsetHeight:
                                t.target.style.top = document.documentElement.clientHeight - e.offsetHeight + "px";
                                break;
                            default:
                                t.target.style.top = u + "px"
                        }
                    }
                })
            }, utils.numRangeToArray = function (e) {
                var t = e.match(/\d+/g) || [];
                if (2 !== t.length) throw "杈撳叆鐨勫弬鏁颁笉姝ｇ‘锛屽弬鏁板繀椤绘槸涓や釜鏁板瓧鏈夐潪鏁板瓧鍒嗛殧寮€锛屽锛氥€�1,2銆戙€�0-4銆�";
                for (var n = t[0], o = t[1], i = [], a = n; a <= o; a++) i.push(a);
                return i
            }, utils.indexToPos = function (e) {
                switch (e - 0) {
                    case 0:
                        return "涓綅";
                    case 1:
                        return "鍗佷綅";
                    case 2:
                        return "鐧句綅";
                    case 3:
                        return "鍗冧綅";
                    case 4:
                        return "涓囦綅";
                    default:
                        return ""
                }
            }, utils.posToIndex = function (e) {
                e = e.replace(/[^涓囧崈鐧惧崄涓猐+/g,""),e=e.replace("涓�",0).replace("鍗�",1).replace("鐧�",2).replace("鍗�",3).replace("涓�",4);var t=e.split("");return t.sort(function(e,t){return e-t>0?-1:1}),t.join("")},utils.map=function(e,t){return Array.prototype.map?e.map(t):ko.utils.arrayMap(e,t)},utils.sort=function(e,t){return t=void 0===t?1:t-0,e.sort(function(e,n){return e-n>0?t:-t}),e},utils.arr2dToString=function(e,t,n){for(var o=[],i=0,a=e.length;i<a;i++)o.push(e[i].join(t));return o.join(n)},utils.stringFilterMulti=function(e){var t={};if(e=String(e),ko.utils.arrayForEach(e.split(""),function(e){t[e]=""}),Object.keys)return Object.keys(t).join("");var n="";for(var o in t)n+=o;return n},utils.random=function(e){return $.isArray(e)?Math.floor(Math.random()*(e[1]+1-e[0])+e[0]):Math.floor(10*Math.random())},utils.cookie={get:function(e){var e=e.replace(".","\\."),t=new RegExp(" "+e+"=[\\S^;]*","g"),n=(" "+document.cookie+";").match(t);return null===n?null:decodeURIComponent(n[0].replace(/ ^ . *= /,"").slice(0,-1))},set:function(e,t,n,o,i,a){var r=new Date;r.setTime(r.getTime()),n&&(n=1e3*n*60*60*24);var s=new Date(r.getTime()+n);document.cookie=e+"="+escape(t)+(n?";expires="+s.toGMTString():"")+(o?";path="+o:"")+(i?";domain="+i:"")+(a?";secure":"")},remove:function(e,t,n){this.get(e)&&(document.cookie=e+"="+(t?";path="+t:"")+(n?";domain="+n:"")+";expires=Thu,01-Jan-1970 00:00:01 GMT")}},utils.isSupportStorage=function(){try{return localStorage.setItem("__test",1),localStorage.removeItem("__test"),!0}catch(e){return!1}}(),utils.localStore=function(e,t,n){return t?utils.isSupportStorage?void(window.localStorage?localStorage.setItem(e,t):utils.cookie.set(e,vlaue,365,n||"/
                    ")):alert("
                    璇烽€€ 鍑烘棤鐥曟ā寮�!"):window.localStorage?localStorage.getItem(e):utils.cookie.get(e)},utils.storage=function(){if(/lxwebapp/i.test(navigator.userAgent)){var e={sessionStorage:sessionStorage};if(window.$db)return e.localStorage={setItem:function(e,t){$db.save(e,t)},getItem:function(e){var t=$db.get(e);return"
                    "===t?null:t},removeItem:function(e){$db.remove(e)}},e;if(window.db_save&&window.db_get)return e.localStorage={setItem:db_save,getItem:function(e){var t=db_get(e);return"
                    "===t?null:t},removeItem:db_remove},e}if(utils.isSupportStorage)return{localStorage:localStorage,sessionStorage:sessionStorage};var t=function(){},n={setItem:t,getItem:t,removeItem:t};return{localStorage:n,sessionStorage:n}}(),utils.async=function(e,t,n){return" [object Array]
                    "!==Object.prototype.toString.call(e)?n(new Error("
                    绗 竴涓 弬鏁板繀椤讳负鏁扮粍 ")):0===e.length?n(null):(function o(i){return i>=e.length?n(null):void t(e[i],function(){o(++i)})}(0),function(){e.length=0})},Date.prototype.format=function(e){function t(e){return e<10?"
                    0 "+e:e}e=e||"
                    yyyy / MM / dd hh: mm: ss ";var n=this.getFullYear(),o=this.getMonth()+1,i=this.getDate(),a=this.getHours(),r=this.getMinutes(),s=this.getSeconds();return e.replace(/y+/,n).replace(/M{2,}/,t(o)).replace(/d{2,}/,t(i)).replace("
                    M ",o).replace("
                    d ",i).replace(/h{2,}/,t(a)).replace(/m{2,}/,t(r)).replace(/s{2,}/,t(s)).replace("
                    h ",a).replace("
                    m ",r).replace("
                    s ",s)},utils.toObservable=function(e){function t(e){for(var t in e)e[t]=ko.observable(e[t]);return e}function n(e){for(var o=e(),i=0;i<o.length;i++){var a=utils.classof(o[i]);"
                    array "===a?(o[i]=ko.observableArray(o[i]),n(o[i]())):"
                    object "===a?t(o[i]):o[i]=ko.observable(o[i])}}if(!window.ko)return e;var o=utils.classof(e);return"
                    object "===o?t(e):"
                    array "===o&&(e=ko.observableArray(e),n(e)),e},utils.toFixed=function(e,t){return t=void 0===t?9:t,(e-0).toFixed(t)-0},!String.prototype.repeat&&(String.prototype.repeat=function(e){for(var t="
                    ",n=0;n<e;n++)t+=this;return t}),function(){function e(e,t){var n,o=this;e-=0;var i=((o+"
                    ").match(/\.(\d+)/)||[0,"
                    "])[1].length,a=((e+"
                    ").match(/\.(\d+)/)||[0,"
                    "])[1].length,r=Math.max(i,a),s=Math.abs(i-a);switch(i>a?(o=(o+"
                    ").replace(".
                    ","
                    ")-0,e=(e+"
                    ").replace(".
                    ","
                    ")+"
                    0 ".repeat(s)-0):i<a?(o=(o+"
                    ").replace(".
                    ","
                    ")+"
                    0 ".repeat(s)-0,e=(e+"
                    ").replace(".
                    ","
                    ")-0):(o=(o+"
                    ").replace(".
                    ","
                    ")-0,e=(e+"
                    ").replace(".
                    ","
                    ")-0),t){case"
                    plus ":n=o+e+"
                    ";break;case"
                    sub ":n=o-e+"
                    ";break;case"
                    pow ":n=o*e+"
                    ",r*=2;break;case"
                    div ":if(0===e)throw"
                    闄ゆ暟涓嶈兘涓� 0 ";n=o/e+"
                    ",r*=2}if(n.length<=r)return"
                    0. "+"
                    0 ".repeat(r-n.length)+n-0;var c=new RegExp(" (\\d + )(\\d {
                        "+r+"
                    })
                    ")||[];return n.match(c).slice(1).join(".
                    ")-0}!Number.prototype.plus&&(Number.prototype.plus=function(t){return e.call(this,t,"
                    plus ")}),!Number.prototype.sub&&(Number.prototype.sub=function(t){return e.call(this,t,"
                    sub ")}),!Number.prototype.pow&&(Number.prototype.pow=function(t){return e.call(this,t,"
                    pow ")}),!Number.prototype.div&&(Number.prototype.div=function(t){return e.call(this,t,"
                    div ")})}(),utils.numInArrRange=function(e,t){return e>=t[0]&&e<=t[1]},utils.dom={isReady:!1,queue:[],ready:function(e){if(this.isReady)return e();if(this.queue.push(e),1===this.queue.length){var t=this,n=function(){t.isReady=!0,document.removeEventListener("
                    DOMContentLoaded ",n),window.removeEventListener("
                    load ",n),t.queue.map(function(e){e()}),t.queue.length=0};document.addEventListener("
                    DOMContentLoaded ",n),window.addEventListener("
                    load ",n)}}},utils.event={},utils.event.once=function(e,t,n,o,i){if(/(html)|(node)/.test(utils.classof(e))){o=void 0===o||o;var a=" [object NodeList]
                    "===e.toString()?e:[e],r=function(e){o&&e.preventDefault(),Array.prototype.map.call(a,function(e){e.removeEventListener(t,r)}),n(e)};Array.prototype.map.call(a,function(e){e.addEventListener(t,r,i)})}},utils.event.trigger=function(e,t){var n=document.createEvent("
                    HTMLEvents ");n.initEvent(t,!0,!1),e.dispatchEvent(n)},utils.parent=function(e,t){var n=0,o=e,i=!1,t=t.toUpperCase();if("
                    BODY "===t)return document.body;for(;0===n;)"
                    BODY "===o.tagName&&n++,o.tagName!==t?o=o.parentElement:(i=!0,n++);return o},utils.equalTagName=function(e,t){var n=0,o=e,i=!1,t=t.toUpperCase();if("
                    BODY "===t)return!0;for(;0===n;)"
                    BODY "===o.tagName&&n++,o.tagName!==t?o=o.parentElement:(i=!0,n++);return i},utils.ajax=function(e){if("
                    object "!==utils.classof(e))throw"
                    浼犲叆鐨勫弬鏁板繀椤讳负瀵硅薄 ";"
                    function "!==utils.classof(e.success)&&(e.success=utils.noop),"
                    function "!==utils.classof(e.error)&&(e.error=utils.noop),"
                    function "!==utils.classof(e.complete)&&(e.complete=utils.noop);var t=new XMLHttpRequest,n=(e.type||"
                    get ").toUpperCase();t.open(n,e.url,!0),"
                    POST "===n&&t.setRequestHeader("
                    Content - Type ","
                    application / x - www - form - urlencoded; charset = UTF - 8 "),t.onload=function(){e.complete(),t.status>=200&&t.status<400?e.success(t.responseText):e.error(t.status)},t.onerror=e.error||utils.noop;var o="
                    ";if("
                    object "===utils.classof(e.data)){var i=[];for(var a in e.data)i.push(a+" = "+e.data[a]);o=i.join(" & ")}else o=void 0===e.data?"
                    ":e.data.toString();t.send(o)},utils.hotLine=function(e){if(!e||/^\?/.test(e))return dialog({content:"
                    鏆傛湭寮€ 閫氬 鏈嶅姛鑳斤紝鏁 鏈熷緟銆� ",ok:function(){}}),!1;if(/lxwebapp/i.test(navigator.userAgent)&&/fromthirdservice=webapp/i.test(e))return location.href=e;var t=document.createElement("
                    div "),n="
                    live "+(new Date).getTime(),o=['<div class="
                    page ">'," < header > ",'<div class="
                    head_main ">','<span class="
                    ">鍦ㄧ嚎瀹㈡湇</span>'," < /div>",'<div class="fl"><a href="javascript:;" onclick="utils.hotLine.back(\''+n+'\')" class="retum-btn"><i class="iconfont icon-angleleft"></i > 鍏抽棴 < /a></div > ',"</header>",' < div class = "live_iframe-box" > ',' < iframe class = "live_iframe"
                    src = "'+e+'" > < /iframe>',"</div > "," < /div>"].join("");t.id=n,t.className="d-mask live_d-mask",t.innerHTML=o,document.body.appendChild(t)},utils.hotLine.back=function(e){dialog({content:"鏄惁閫€鍑哄綋鍓嶈亰澶╋紵",ok:function(){var t=document.getElementById(e);document.body.removeChild(t)},cancel:function(){}})},utils.locationReplace=function(e){history.replaceState&&!/iphone.*baidu / i.test(navigator.userAgent) ? (history.replaceState(null, document.title, e), history.go(0)) : location.replace(e)
                }, utils.autoLogin = function (e) {
                    var t = utils.storage.localStorage.getItem("user");
                    t ? (t = JSON.parse(t), $.ajax({
                        url: "/login",
                        data: {
                            username: t.u,
                            password: t.p2
                        },
                        cache: !1,
                        success: function (e) {
                            e.status || (location.href = "/login")
                        },
                        error: function () {
                            location.href = "/login"
                        }
                    })) : e()
                }, /lxwebapp/i.test(navigator.userAgent) && window.jQuery && $.ajaxPrefilter(function (e, t, n) {
                    /login/i.test(t.url) || (e.success = function (e) {
                        "string" == typeof e && /location\.href.+AgainLogin/i.test(e) ? utils.autoLogin(t.success.bind(this, e)) : t.success(e)
                    })
                }), utils.checkCookieEnable = function () {
                    if (navigator.cookieEnabled) return !0;
                    document.cookie = "cookietest=1";
                    var e = document.cookie.indexOf("cookietest=") != -1;
                    return document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
                }, $(function () {
                    var e, t = /lxwebapp/i.test(navigator.userAgent) && (window.$db && $db.LoginJsToApp || window.LoginJsToApp),
                        n = -1;
                    window.setThreePartyAvailable = function (e) {
                        var t = $("#threePartyLoginRoot");
                        if (e) {
                            t.css({
                                display: ""
                            });
                            var n = "," + e + ",";
                            e = e.split(","), $.each(e, function (e, n) {
                                n && t.find("[data-type=" + n + "]").css("display", "")
                            }), $.each(["0", "1", "2"], function (e, o) {
                                n.indexOf("," + o + ",") < 0 && t.find("[data-type=" + o + "]").css("display", "none")
                            }), $("#loginContainer").addClass("is-app")
                        } else t.css({
                            display: "none"
                        })
                    }, window.threePartyLogin = function (o) {
                        if (n = o, e = utils.tip("姝ｅ湪鍚姩搴旂敤, 璇风◢鍊�...."), t)
                            if (window.$db) $db.LoginJsToApp(o);
                            else {
                                if (window.LoginJsToApp) return LoginJsToApp(o), fn;
                                utils.tip("鍚姩搴旂敤澶辫触锛�")
                            }
                        else utils.tip("鏃犳硶璇嗗埆APP鏍囪瘑锛�")
                    }, window.QqWechatSinaFromApp = function (t, o, i) {
                        if (void 0 === o && /^[a-z\d]+,/i.test(t)) {
                            var a = t.split(",");
                            t = a[0], o = a.slice(1).join("")
                        }
                        if (e && $(e).remove(), n === -1) return void utils.tip("璇烽€夋嫨鐧婚檰鏂瑰紡!");
                        e = utils.tip("姝ｅ湪鐧婚檰涓�, 璇风◢鍊�....");
                        var r = {
                            type: n - 0,
                            openId: t,
                            nickName: o,
                            headImg: i
                        };
                        $.ajax({
                            url: "/OtherAccount/OtherAccountLogin",
                            data: r,
                            type: "get",
                            cache: !1,
                            success: function (t) {
                                e && $(e).remove(), t.Status ? window.location.href = t.Url : utils.tip(t.Message)
                            },
                            error: function (e) {
                                utils.tip("鏈嶅姟鍣ㄩ敊璇紝璇风◢鍚庨噸璇曪紒")
                            }
                        }), n = -1
                    }
                }), utils.unreadMessages = n(97), window.switchSkin = n(98), utils.redEnvelopes = n(117), utils.ajaxDefenseIntercept = n(118), n(119)
            }, 117: function (e, t) {
                function n() {
                    var e = '<div id="redEnvelopesa" class="parcel parcel-animated rubberBand" style="display:none"></div><div class="parcel-wrap" style="display:none"><div class="parcel-box-wrap"><div class="parcel-box "><div class="parcel-open-controller"><div class="parcel-box-wrap-wrap parcel-open parcel-animated slideInDown"><div class="parcel-open-btn"></div></div></div><div class="parcel-result-win-controller" style="display:none"><div class="parcel-box-wrap-wrap parcel-result-win"><div class="win-money-box">鑾峰緱<span class="win-money">888888</span>褰╅噾</div><span class="parcel-result-win-btn"></span></div></div><div class="parcel-result-fail-controller" style="display:none"><div class="parcel-box-wrap-wrap parcel-result-fail"><div class="fail-money-box">寰堥仐鎲炬病涓</div><span class="parcel-result-fail-btn"></span></div></div></div></div></div>';
                    $("body").append(e);
                    var t = $("#redEnvelopesa"),
                        n = $(".parcel-wrap"),
                        i = $(".parcel-open-controller"),
                        a = $(".parcel-open-btn"),
                        r = $(".parcel-result-win-controller"),
                        s = $(".parcel-result-win-btn"),
                        c = $(".win-money"),
                        l = $(".parcel-result-fail-controller"),
                        u = $(".parcel-result-fail-btn"),
                        d = $(".fail-money-box");
                    s.click(function () {
                        r.css("display", "none"), n.css("display", "none"), setTimeout(o, 3e4)
                    }), u.click(function () {
                        l.css("display", "none"), n.css("display", "none")
                    }), t.click(function () {
                        t.css("display", "none"), n.css("display", "block"), i.css("display", "block")
                    }), a.click(function () {
                        $.ajax({
                            url: "/Home/GetRedBagActivity",
                            type: "get",
                            cache: !1,
                            data: {
                                actityId: t.attr("data-actityId")
                            },
                            success: function (e) {
                                e.Status ? (i.css("display", "none"), r.css("display", "block"), c.text(e.Amount)) : e.Info.indexOf("绾㈠寘琚姠鍏�") !== -1 ? (i.css("display", "none"), l.css("display", "block"), d.text("绾㈠寘琚姠鍏夊暒锛�")) : (i.css("display", "none"), n.css("display", "none"), utils.tip(e.Info, !1))
                            }
                        })
                    })
                }

                function o() {
                    $.ajax({
                        url: "/Home/HasRedBagActivity",
                        type: "get",
                        cache: !1,
                        success: function (e) {
                            var t = $("#redEnvelopesa");
                            e.HasActivity ? (t.css("display", "block"), t.attr("data-actityId", e.ActivityId)) : (t.css("display", "none"), setTimeout(o, 3e4))
                        }
                    })
                }
                o.setRedDom = n, e.exports = o
            }, 118: function (e, t) {
                var n = function (e) {
                    if ("string" == typeof e && 0 === e.indexOf("<script>")) e = e.split("('")[1].split("')")[0];
                    else if ("string" == typeof e && /DDoS protection by Cloudflare/i.test(e)) e = "鎿嶄綔杩囦簬棰戠箒锛岃绋嶅悗閲嶈瘯锛�";
                    else if ("string" == typeof e) try {
                        e = JSON.parse(e)
                    } catch (t) {
                        e = "杩斿洖鏁版嵁鏍煎紡鏈夎锛�"
                    }
                    return e
                };
                e.exports = n
            }, 119: function (e, t) {
                $(function () {
                    $('img[src^="/Home/QrcodeImage"]').each(function (e, t) {
                        var n = $(t),
                            o = n.attr("src");
                        $.ajax({
                            url: o,
                            type: "get",
                            success: function (e) {
                                e && n.attr("src", e)
                            }
                        })
                    })
                })
            }
        });
    //# sourceMappingURL=http://dev.me/m-official/utils.min.js.map