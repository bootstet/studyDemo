/// <reference path="utils.dev.js" />

/// 菜单动画效果
utils.dom.ready(function () {
    var content = document.querySelector("div.content")||document.querySelector("body");
    var pages = document.querySelectorAll("div.page").length > 0 ? document.querySelectorAll("div.page") : document.querySelectorAll(".mask");
    var btn = document.getElementById("menuBtn");

    function show(event) {
        event.stopPropagation();
        content.classList.toggle("sidemenu");
        utils.event.once(pages, 'tap', function (evt) {
            content.classList.toggle("sidemenu");
            utils.event.once(btn, "tap", show);
        });
    }
    utils.event.once(btn, "tap", show);
});

/// 菜单中折叠效果
utils.dom.ready(function () {
    var $sideMenuList = document.getElementById("sideMenuList");
    if (!$sideMenuList) return;
    var dts = $sideMenuList.getElementsByTagName("dt");
    $sideMenuList.addEventListener("tap", function (event) {
        if (!utils.equalTagName(event.target, 'A')) event.preventDefault();
        //if (event.target.tagName !== "A") event.preventDefault();
        var dom = null;
        if (event.target.tagName === "DT") {
            dom = event.target;
        } else if (event.target.parentElement.tagName === "DT") {
            dom = event.target.parentElement;
        }
        if (dom) {
            dom.parentElement.classList.toggle("active");
            Array.prototype.map.call(dom.parentElement.parentElement.children, function (ele) {
                if (ele.tagName === "DL" && ele !== dom.parentElement) {
                    ele.classList.remove("active");
                }
            });
            dom.nextElementSibling.style.display = dom.nextElementSibling.style.display === 'block' ? 'none' : 'block';
            Array.prototype.map.call(dts, function (item) {
                if (item === dom) return;
                item.nextElementSibling.style.display = "none";
            });
        }
    });
});
utils.layoutBackHandle = function (event) {
    event.preventDefault();
    if (/lxwebapp/i.test(navigator.userAgent)) {
        var url = LXWEBAPP.getRouteParent(LXWEBAPP.routes);
        if (url) {
            utils.locationReplace(url);
        } else {
            history.back();
        }
    } else {
        var href = $(event.target).attr('data-href');
        if(href) {
            utils.locationReplace(href);
        } else {
            history.back();
        }
    }
}
/// 左上角 返回 按钮 #back-btn
utils.dom.ready(function () {
    if (!window['isNotAddLayoutBackHandle']) {
        var btn = document.getElementById("layoutBack");
        btn && btn.addEventListener("click", utils.layoutBackHandle);
    }
    $("a[data-noback]").click(function (evt) {
        var dd = $(evt.currentTarget).attr("href");
        if (dd && dd.indexOf("javascript") <= -1) {
            utils.locationReplace(dd);
        }
    });

    /// 如果是webAPP，则给页面中的a标签添加去缓存参数
    /lxwebapp/i.test(navigator.userAgent) && LXWEBAPP.preventAtag();
});

/// 刷新余额
utils.dom.ready(function () {
    window.refreshBalance = function (ev) {
        ev && ev.preventDefault && ev.preventDefault();
        if (refreshBalance.isLoading) return;
        refreshBalance.isLoading = true;
        var dom = document.querySelectorAll("[tag=BalancePlaceholder]");
        var temp = dom[0].textContent.trim();
        if (temp === "") return;
        each(dom, function (item) {
            item.textContent = "（刷新中...）";
        });
        $.ajax({
            url: "/AccountInfo/GetAccount",
            cache: false,
            success: function (json) {
                each(dom, function (item) {
                    if (json.CreditBalance) item.textContent = json.CreditBalance;
                    else item.textContent = temp;
                });
            },
            error: function () {
                each(dom, function (item) {
                    item.textContent = temp;
                });
            },
            complete: function () {
                refreshBalance.isLoading = false;
            }
        });
    }
    window.refreshBalance.isLoading = false;

    function each(doms, callback) {
        Array.prototype.map.call(doms, callback);
    }

    (!window.core || window['needRefreshHandle'])&& (each(document.querySelectorAll("[tag=RefreshBalanceBtn]"), function (item) {
        item.addEventListener("tap", refreshBalance);
    }));
});

/// 退出登录
utils.dom.ready(function () {
    Array.prototype.map.call(document.querySelectorAll("[tag=logout]"), function (item) {
        item.addEventListener("tap", function () {
            utils.confirm("您确定要退出登录吗？", function () {
                utils.storage.localStorage.setItem("donotAutoLogin", 1);
                if (window.top !== window) {
                    window.top.location.replace('/Home/UserLogout');
                } else {
                    utils.locationReplace("/Home/UserLogout");
                }
            });
        });
    });
});
utils.dom.ready(function () {
    //点击提现前, 调用接口, 判断是否可以提款
    $(document).on('click', '#jGetMoney, [data-money="jGetMoney"]', function (evt) {
        evt.preventDefault();
        var url = '/Withdrawal/Encashment';
        //$.ajax({
        //    url: url,
        //    cache: false,
        //    dataType: 'text',
        //    success: function (res) {
        //        if (/^<script>/i.test(res)) {
        //            //alert(res); // utils.js中$(document).ajaxSuccess方法会统一处理script标签
        //        } else {
        //           window.location.href = url;
    //            }
    //        },
    //        error: function () {
    //            alert('跳转失败');
    //        }
    //    });
        window.location.href = url;
        return false;
    });
});
/// help-tips
utils.dom.ready(function () {
    var tips = $("body").attr("data-tips");
    if (!tips) {
        if ($("[data-tips]").length > 0) {
            tips = $("[data-tips]").attr("data-tips");
        }
    }
    if (tips) {
        var tipsArr = tips.split("|");
        var storeKey = tipsArr[0];
        var defaultDsiplay = tipsArr.length < 2;
        function displayTips() {
            utils.storage.localStorage.getItem(storeKey) ? $("#JHelpTipRoot").removeClass("help-tips") : $("#JHelpTipRoot").addClass("help-tips");
            //utils.localStore(storeKey) ? $("#JHelpTipRoot").removeClass("help-tips") : $("#JHelpTipRoot").addClass("help-tips");
        }
        document.getElementById("JHelpTipsClose").addEventListener("touchstart", function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $("#JHelpTipRoot").removeClass("help-tips");
            //utils.localStore(storeKey, "true");
            utils.storage.localStorage.setItem(storeKey, "true");
        });
        defaultDsiplay ? displayTips() : (window.displayHelpTips = displayTips);
    }
});

///后台返回字符串错误提示处理 <script>alert('您输入的数据存在有误参数!');window.history.go(-1);</script>
utils.ajaxText = function (json) {
    if (typeof json === 'string' && json.indexOf('<script>') !== -1) {
        return json.split('(\'')[1].split('\')')[0];
    } else {
        return false;
    }
}


window.LXWEBAPP = {};
LXWEBAPP.fromBetToReport = [/^\/OffcialOtherGame\/Index/i, /^\/OtherGame\/Index/i, /^\/Six\/Index/i];
/// app控制返回用的路由
/// isReferrer  如果document.referrer包含在isReferrer中，则跳转到document.referrer
LXWEBAPP.routes = [
    { path: "/Member/Index" },
    { path: "/Activity" },
    { path: "/OffcialOtherGame/Index/" },
    { path: "/OtherGame/index/" },
    { pthat: "/Six/Index" },
    { path: "/OnlineRecharge/Index/3" },
    { path: "/CompanyReceipts/Remittance" },
    {
        path: "/Withdrawal/AuditData",
        children: [
            { path: "/Withdrawal/Encashment" },
        ]
    },
    {
        path: "/Report/Bet",
        querystring: true,
        children: [
            { path: "/Report/BetDetails" }
        ],
        isReferrer: LXWEBAPP.fromBetToReport
    },
    {
        path: "/Report/Track",
        querystring: true,
        children: [
            { path: "/Report/TrackDetails" }
        ],
        isReferrer: LXWEBAPP.fromBetToReport
    },
    { path: "/Report/IndividualReport" },
    {
        path: "/Report/teamindex",
        children: [
            { path: "/Report/TeamReport" },
        ]
    },
    { path: /\/Report\/AccountChange\/?$/i },
    { path: "/UserCenter/UserJoinActivity" },
    { path: "/UserCenter/UserInfo" },
    { path: "/UserCenter/EditPwd" },
    { path: "/UserCenter/SecretQuestion" },
    {
        path: "/UserCenter/CardsList",
        children: [
            {
                path: "/UserCenter/AddCard"
            }
        ]
    },
    { path: "/UserCenter/Emails" },
    { path: "/UserCenter/GameInformation" },
    { path: "/UserCenter/GameLimits" },
    { path: /\/UserCenter\/TeamInfo\/?$/i },
    {
        path: "/AccountManager/UserList",
        children: [
            { path: /\/UserCenter\/SubUserDetail\?accountID=\d+&gameID=\d+/i },
            { path: /\/UserCenter\/TeamInfo\?accountID=\d+/i },
            { path: /\/Report\/AccountChange\?accountID=\d+/i }
        ]
    },
    { path: "/AccountManager/RegisterManage" },
    { path: "/UserCenter/AdRegister" },
    { path: "/UserCenter/Messge" },
    { path: "/UserCenter/Notice" }
];

/// 通过url获取它的父级url，如果没找到则默认返回 根目录
LXWEBAPP.getRouteParent = function (arr, url, parentPath) {
    if (!arr) return;

    /// 处理在会员中心打开后的链接
    if (url && /\/Member\/Index/i.test(document.referrer)) {
        return LXWEBAPP.nocache(document.referrer);
    }

    if (parentPath && parentPath.isReferrer) {
        var referrerUrl = document.referrer.replace(/^https?:\/\/[^\/]+/i, "");
        var referrer = parentPath.isReferrer.filter(function (el) {
            return el.test(referrerUrl)
        });
        if (referrer.length > 0) {
            return document.referrer;
        }
    }

    url = url || (location.pathname + location.search);
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        var _url = item.children ? LXWEBAPP.getRouteParent(item.children, url, item) : null;
        if (_url) return _url;

        switch (true) {
            case typeof item.path === "string" && url.toLowerCase().indexOf(item.path.toLowerCase()) > -1:
            case /RegExp/i.test(Object.prototype.toString.call(item.path)) && item.path.test(url):
                var newUrl;
                if (parentPath && parentPath.querystring) {
                    var ref = document.referrer.replace(/^.+(\?.+)$/, "$1");
                    newUrl = parentPath.path + (document.referrer === ref ? "" : ref);
                } else {
                    newUrl = parentPath ? parentPath.path : "/";
                }
                return LXWEBAPP.nocache(newUrl);
        }
    }
}

/// 在url中添加时间戳去缓存，如果存在时间戳则替换
LXWEBAPP.nocache = function (url) {
    if (!url) return url;
    if (url.indexOf("?") > -1) {
        url = url.replace(/_=\d+&?/, "").replace("?", "?_=" + Date.now() + "&");
    } else {
        url += "?_=" + Date.now();
    }
    return url;
}

LXWEBAPP.preventAtag = function () {
    Array.prototype.forEach.call(document.querySelectorAll("a"), function (item) {
        var href = item.getAttribute("href") || "";
        if (/^javascript/i.test(href) || /^#+/.test(href) || href !== href.trim() || href.indexOf(location.origin) === -1) return;
        item.setAttribute("href", LXWEBAPP.nocache(href));
    });
}