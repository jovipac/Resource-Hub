﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function() {
  function z(a) {
    return a && a.domId && a.getInputElement().$
      ? a.getInputElement()
      : a && a.$
      ? a
      : !1;
  }
  function I(a) {
    if (!a)
      throw "Languages-by-groups list are required for construct selectbox";
    var c = [],
      e = "",
      d;
    for (d in a)
      for (var f in a[d]) {
        var h = a[d][f];
        "en_US" == h ? (e = h) : c.push(h);
      }
    c.sort();
    e && c.unshift(e);
    return {
      getCurrentLangGroup: function(c) {
        a: {
          for (var d in a)
            for (var e in a[d])
              if (e.toUpperCase() === c.toUpperCase()) {
                c = d;
                break a;
              }
          c = "";
        }
        return c;
      },
      setLangList: (function() {
        var c = {},
          d;
        for (d in a) for (var e in a[d]) c[a[d][e]] = e;
        return c;
      })()
    };
  }
  var g = (function() {
      var a = function(a, b, d) {
        d = d || {};
        var f = d.expires;
        if ("number" == typeof f && f) {
          var h = new Date();
          h.setTime(h.getTime() + 1e3 * f);
          f = d.expires = h;
        }
        f && f.toUTCString && (d.expires = f.toUTCString());
        b = encodeURIComponent(b);
        a = a + "\x3d" + b;
        for (var k in d)
          (b = d[k]), (a += "; " + k), !0 !== b && (a += "\x3d" + b);
        document.cookie = a;
      };
      return {
        postMessage: {
          init: function(a) {
            window.addEventListener
              ? window.addEventListener("message", a, !1)
              : window.attachEvent("onmessage", a);
          },
          send: function(a) {
            var b = Object.prototype.toString,
              d = a.fn || null,
              f = a.id || "",
              h = a.target || window,
              k = a.message || { id: f };
            a.message &&
              "[object Object]" == b.call(a.message) &&
              (a.message.id ? a.message.id : (a.message.id = f),
              (k = a.message));
            a = window.JSON.stringify(k, d);
            h.postMessage(a, "*");
          },
          unbindHandler: function(a) {
            window.removeEventListener
              ? window.removeEventListener("message", a, !1)
              : window.detachEvent("onmessage", a);
          }
        },
        hash: { create: function() {}, parse: function() {} },
        cookie: {
          set: a,
          get: function(a) {
            return (a = document.cookie.match(
              new RegExp(
                "(?:^|; )" +
                  a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                  "\x3d([^;]*)"
              )
            ))
              ? decodeURIComponent(a[1])
              : void 0;
          },
          remove: function(c) {
            a(c, "", { expires: -1 });
          }
        },
        misc: {
          findFocusable: function(a) {
            var b = null;
            a &&
              (b = a.find(
                "a[href], area[href], input, select, textarea, button, *[tabindex], *[contenteditable]"
              ));
            return b;
          },
          isVisible: function(a) {
            var b;
            (b = 0 === a.offsetWidth || 0 == a.offsetHeight) ||
              (b =
                "none" ===
                (document.defaultView && document.defaultView.getComputedStyle
                  ? document.defaultView.getComputedStyle(a, null).display
                  : a.currentStyle
                  ? a.currentStyle.display
                  : a.style.display));
            return !b;
          },
          hasClass: function(a, b) {
            return !(
              !a.className ||
              !a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
            );
          }
        }
      };
    })(),
    a = a || {};
  a.TextAreaNumber = null;
  a.load = !0;
  a.cmd = { SpellTab: "spell", Thesaurus: "thes", GrammTab: "grammar" };
  a.dialog = null;
  a.optionNode = null;
  a.selectNode = null;
  a.grammerSuggest = null;
  a.textNode = {};
  a.iframeMain = null;
  a.dataTemp = "";
  a.div_overlay = null;
  a.textNodeInfo = {};
  a.selectNode = {};
  a.selectNodeResponce = {};
  a.langList = null;
  a.langSelectbox = null;
  a.banner = "";
  a.show_grammar = null;
  a.div_overlay_no_check = null;
  a.targetFromFrame = {};
  a.onLoadOverlay = null;
  a.LocalizationComing = {};
  a.OverlayPlace = null;
  a.sessionid = "";
  a.LocalizationButton = {
    ChangeTo_button: {
      instance: null,
      text: "Change to",
      localizationID: "ChangeTo"
    },
    ChangeAll: { instance: null, text: "Change All" },
    IgnoreWord: { instance: null, text: "Ignore word" },
    IgnoreAllWords: { instance: null, text: "Ignore all words" },
    Options: {
      instance: null,
      text: "Options",
      optionsDialog: { instance: null }
    },
    AddWord: { instance: null, text: "Add word" },
    FinishChecking_button: {
      instance: null,
      text: "Finish Checking",
      localizationID: "FinishChecking"
    },
    FinishChecking_button_block: {
      instance: null,
      text: "Finish Checking",
      localizationID: "FinishChecking"
    }
  };
  a.LocalizationLabel = {
    ChangeTo_label: {
      instance: null,
      text: "Change to",
      localizationID: "ChangeTo"
    },
    Suggestions: { instance: null, text: "Suggestions" },
    Categories: { instance: null, text: "Categories" },
    Synonyms: { instance: null, text: "Synonyms" }
  };
  var J = function(b) {
      var c, e, d;
      for (d in b)
        (c = (c = a.dialog.getContentElement(a.dialog._.currentTabId, d))
          ? c.getElement()
          : b[d].instance.getElement().getFirst() ||
            b[d].instance.getElement()),
          (e = b[d].localizationID || d),
          c.setText(a.LocalizationComing[e]);
    },
    K = function(b) {
      var c, e, d;
      for (d in b)
        (c = a.dialog.getContentElement(a.dialog._.currentTabId, d)),
          c || (c = b[d].instance),
          c.setLabel &&
            ((e = b[d].localizationID || d),
            c.setLabel(a.LocalizationComing[e] + ":"));
    },
    r,
    A;
  a.framesetHtml = function(b) {
    return (
      "\x3ciframe id\x3d" +
      a.iframeNumber +
      "_" +
      b +
      ' frameborder\x3d"0" allowtransparency\x3d"1" style\x3d"width:100%;border: 1px solid #AEB3B9;overflow: auto;background:#fff; border-radius: 3px;"\x3e\x3c/iframe\x3e'
    );
  };
  a.setIframe = function(b, c) {
    var e;
    e = a.framesetHtml(c);
    var d = a.iframeNumber + "_" + c;
    b.getElement().setHtml(e);
    e = document.getElementById(d);
    e = e.contentWindow
      ? e.contentWindow
      : e.contentDocument.document
      ? e.contentDocument.document
      : e.contentDocument;
    e.document.open();
    e.document.write(
      '\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3cmeta charset\x3d"UTF-8"\x3e\x3ctitle\x3eiframe\x3c/title\x3e\x3cstyle\x3ehtml,body{margin: 0;height: 100%;font: 13px/1.555 "Trebuchet MS", sans-serif;}a{color: #888;font-weight: bold;text-decoration: none;border-bottom: 1px solid #888;}.main-box {color:#252525;padding: 3px 5px;text-align: justify;}.main-box p{margin: 0 0 14px;}.main-box .cerr{color: #f00000;border-bottom-color: #f00000;}\x3c/style\x3e\x3c/head\x3e\x3cbody\x3e\x3cdiv id\x3d"content" class\x3d"main-box"\x3e\x3c/div\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"spelltext" name\x3d"spelltext" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"loadsuggestfirst" name\x3d"loadsuggestfirst" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"loadspellsuggestall" name\x3d"loadspellsuggestall" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"loadOptionsForm" name\x3d"loadOptionsForm" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3cscript\x3e(function(window) {var ManagerPostMessage \x3d function() {var _init \x3d function(handler) {if (document.addEventListener) {window.addEventListener("message", handler, false);} else {window.attachEvent("onmessage", handler);};};var _sendCmd \x3d function(o) {var str,type \x3d Object.prototype.toString,fn \x3d o.fn || null,id \x3d o.id || "",target \x3d o.target || window,message \x3d o.message || { "id": id };if (o.message \x26\x26 type.call(o.message) \x3d\x3d "[object Object]") {(o.message["id"]) ? o.message["id"] : o.message["id"] \x3d id;message \x3d o.message;};str \x3d JSON.stringify(message, fn);target.postMessage(str, "*");};return {init: _init,send: _sendCmd};};var manageMessageTmp \x3d new ManagerPostMessage;var appString \x3d (function(){var spell \x3d parent.CKEDITOR.config.wsc.DefaultParams.scriptPath;var serverUrl \x3d parent.CKEDITOR.config.wsc.DefaultParams.serviceHost;return serverUrl + spell;})();function loadScript(src, callback) {var scriptTag \x3d document.createElement("script");scriptTag.type \x3d "text/javascript";callback ? callback : callback \x3d function() {};if(scriptTag.readyState) {scriptTag.onreadystatechange \x3d function() {if (scriptTag.readyState \x3d\x3d "loaded" ||scriptTag.readyState \x3d\x3d "complete") {scriptTag.onreadystatechange \x3d null;setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);callback();}};}else{scriptTag.onload \x3d function() {setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);callback();};};scriptTag.src \x3d src;document.getElementsByTagName("head")[0].appendChild(scriptTag);};window.onload \x3d function(){loadScript(appString, function(){manageMessageTmp.send({"id": "iframeOnload","target": window.parent});});}})(this);\x3c/script\x3e\x3c/body\x3e\x3c/html\x3e'
    );
    e.document.close();
  };
  a.setCurrentIframe = function(b) {
    a.setIframe(a.dialog._.contents[b].Content, b);
  };
  a.setHeightBannerFrame = function() {
    var b = a.dialog.getContentElement("SpellTab", "banner").getElement(),
      c = a.dialog.getContentElement("GrammTab", "banner").getElement(),
      e = a.dialog.getContentElement("Thesaurus", "banner").getElement();
    b.setStyle("height", "90px");
    c.setStyle("height", "90px");
    e.setStyle("height", "90px");
  };
  a.setHeightFrame = function() {
    document.getElementById(
      a.iframeNumber + "_" + a.dialog._.currentTabId
    ).style.height = "240px";
  };
  a.sendData = function(b) {
    var c = b._.currentTabId,
      e = b._.contents[c].Content,
      d,
      f;
    a.previousTab = c;
    a.setIframe(e, c);
    var h = function(h) {
      c = b._.currentTabId;
      h = h || window.event;
      h.data.getTarget().is("a") &&
        c !== a.previousTab &&
        ((a.previousTab = c),
        (e = b._.contents[c].Content),
        (d = a.iframeNumber + "_" + c),
        a.div_overlay.setEnable(),
        e.getElement().getChildCount()
          ? E(a.targetFromFrame[d], a.cmd[c])
          : (a.setIframe(e, c),
            (f = document.getElementById(d)),
            (a.targetFromFrame[d] = f.contentWindow)));
    };
    b.parts.tabs.removeListener("click", h);
    b.parts.tabs.on("click", h);
  };
  a.buildSelectLang = function(a) {
    var c = new CKEDITOR.dom.element("div"),
      e = new CKEDITOR.dom.element("select");
    a = "wscLang" + a;
    c.addClass("cke_dialog_ui_input_select");
    c.setAttribute("role", "presentation");
    c.setStyles({
      height: "auto",
      position: "absolute",
      right: "0",
      top: "-1px",
      width: "160px",
      "white-space": "normal"
    });
    e.setAttribute("id", a);
    e.addClass("cke_dialog_ui_input_select");
    e.setStyles({ width: "160px" });
    c.append(e);
    return c;
  };
  a.buildOptionLang = function(b, c) {
    var e = document.getElementById("wscLang" + c),
      d = document.createDocumentFragment(),
      f,
      h,
      k = [];
    if (0 === e.options.length) {
      for (f in b) k.push([f, b[f]]);
      k.sort();
      for (var p = 0; p < k.length; p++)
        (f = document.createElement("option")),
          f.setAttribute("value", k[p][1]),
          (h = document.createTextNode(k[p][0])),
          f.appendChild(h),
          d.appendChild(f);
      e.appendChild(d);
    }
    for (d = 0; d < e.options.length; d++)
      e.options[d].value == a.selectingLang &&
        (e.options[d].selected = "selected");
  };
  a.buildOptionSynonyms = function(b) {
    b = a.selectNodeResponce[b];
    var c = z(a.selectNode.Synonyms);
    a.selectNode.Synonyms.clear();
    for (var e = 0; e < b.length; e++) {
      var d = document.createElement("option");
      d.text = b[e];
      d.value = b[e];
      c.$.add(d, e);
    }
    a.selectNode.Synonyms.getInputElement().$.firstChild.selected = !0;
    a.textNode.Thesaurus.setValue(
      a.selectNode.Synonyms.getInputElement().getValue()
    );
  };
  var B = function(a) {
      var c = document,
        e = a.target || c.body,
        d = a.id || "overlayBlock",
        f = a.opacity || "0.9";
      a = a.background || "#f1f1f1";
      var h = c.getElementById(d),
        k = h || c.createElement("div");
      k.style.cssText =
        "position: absolute;top:30px;bottom:41px;left:1px;right:1px;z-index: 10020;padding:0;margin:0;background:" +
        a +
        ";opacity: " +
        f +
        ";filter: alpha(opacity\x3d" +
        100 * f +
        ");display: none;";
      k.id = d;
      h || e.appendChild(k);
      return {
        setDisable: function() {
          k.style.display = "none";
        },
        setEnable: function() {
          k.style.display = "block";
        }
      };
    },
    L = function(b, c, e) {
      var d = new CKEDITOR.dom.element("div"),
        f = new CKEDITOR.dom.element("input"),
        h = new CKEDITOR.dom.element("label"),
        k = "wscGrammerSuggest" + b + "_" + c;
      d.addClass("cke_dialog_ui_input_radio");
      d.setAttribute("role", "presentation");
      d.setStyles({ width: "97%", padding: "5px", "white-space": "normal" });
      f.setAttributes({
        type: "radio",
        value: c,
        name: "wscGrammerSuggest",
        id: k
      });
      f.setStyles({ float: "left" });
      f.on("click", function(b) {
        a.textNode.GrammTab.setValue(b.sender.getValue());
      });
      e ? f.setAttribute("checked", !0) : !1;
      f.addClass("cke_dialog_ui_radio_input");
      h.appendText(b);
      h.setAttribute("for", k);
      h.setStyles({
        display: "block",
        "line-height": "16px",
        "margin-left": "18px",
        "white-space": "normal"
      });
      d.append(f);
      d.append(h);
      return d;
    },
    F = function(a) {
      a = a || "true";
      null !== a && "false" == a && t();
    },
    w = function(b) {
      var c = new I(b);
      b = "wscLang" + a.dialog.getParentEditor().name;
      b = document.getElementById(b);
      var e = a.iframeNumber + "_" + a.dialog._.currentTabId;
      a.buildOptionLang(c.setLangList, a.dialog.getParentEditor().name);
      u[c.getCurrentLangGroup(a.selectingLang)].onShow();
      F(a.show_grammar);
      b.onchange = function(b) {
        b = c.getCurrentLangGroup(this.value);
        var f = a.dialog._.currentTabId;
        u[b].onShow();
        F(a.show_grammar);
        a.div_overlay.setEnable();
        a.selectingLang = this.value;
        f = a.cmd[f];
        (b && u[b] && u[b].allowedTabCommands[f]) ||
          (f = u[b].defaultTabCommand);
        for (var h in a.cmd)
          if (a.cmd[h] == f) {
            a.previousTab = h;
            break;
          }
        g.postMessage.send({
          message: { changeLang: a.selectingLang, text: a.dataTemp, cmd: f },
          target: a.targetFromFrame[e],
          id: "selectionLang_outer__page"
        });
      };
    },
    M = function(b) {
      var c,
        e = function(b) {
          b =
            a.dialog.getContentElement(a.dialog._.currentTabId, b) ||
            a.LocalizationButton[b].instance;
          b.getElement().hasClass("cke_disabled")
            ? b.getElement().setStyle("color", "#a0a0a0")
            : b.disable();
        };
      c = function(b) {
        b =
          a.dialog.getContentElement(a.dialog._.currentTabId, b) ||
          a.LocalizationButton[b].instance;
        b.enable();
        b.getElement().setStyle("color", "#333");
      };
      "no_any_suggestions" == b
        ? ((b = "No suggestions"),
          (c =
            a.dialog.getContentElement(
              a.dialog._.currentTabId,
              "ChangeTo_button"
            ) || a.LocalizationButton.ChangeTo_button.instance),
          c.disable(),
          (c =
            a.dialog.getContentElement(a.dialog._.currentTabId, "ChangeAll") ||
            a.LocalizationButton.ChangeAll.instance),
          c.disable(),
          e("ChangeTo_button"),
          e("ChangeAll"))
        : (c("ChangeTo_button"), c("ChangeAll"));
      return b;
    },
    O = {
      iframeOnload: function(b) {
        a.div_overlay.setEnable();
        b = a.dialog._.currentTabId;
        E(a.targetFromFrame[a.iframeNumber + "_" + b], a.cmd[b]);
      },
      suggestlist: function(b) {
        delete b.id;
        a.div_overlay_no_check.setDisable();
        C();
        w(a.langList);
        var c = M(b.word),
          e = "";
        c instanceof Array && (c = b.word[0]);
        e = c = c.split(",");
        a.textNode.SpellTab.setValue(e[0]);
        b = z(A);
        A.clear();
        for (c = 0; c < e.length; c++) {
          var d = document.createElement("option");
          d.text = e[c];
          d.value = e[c];
          b.$.add(d, c);
        }
        v();
        a.div_overlay.setDisable();
      },
      grammerSuggest: function(b) {
        delete b.id;
        delete b.mocklangs;
        C();
        w(a.langList);
        var c = b.grammSuggest[0];
        a.grammerSuggest.getElement().setHtml("");
        a.textNode.GrammTab.reset();
        a.textNode.GrammTab.setValue(c);
        a.textNodeInfo.GrammTab.getElement().setHtml("");
        a.textNodeInfo.GrammTab.getElement().setText(b.info);
        b = b.grammSuggest;
        for (var c = b.length, e = !0, d = 0; d < c; d++)
          a.grammerSuggest.getElement().append(L(b[d], b[d], e)), (e = !1);
        v();
        a.div_overlay.setDisable();
      },
      thesaurusSuggest: function(b) {
        delete b.id;
        delete b.mocklangs;
        C();
        w(a.langList);
        a.selectNodeResponce = b;
        a.textNode.Thesaurus.reset();
        var c = z(a.selectNode.Categories),
          e = 0;
        a.selectNode.Categories.clear();
        for (var d in b)
          (b = document.createElement("option")),
            (b.text = d),
            (b.value = d),
            c.$.add(b, e),
            e++;
        c = a.selectNode.Categories.getInputElement().getChildren().$[0].value;
        a.selectNode.Categories.getInputElement().getChildren().$[0].selected = !0;
        a.buildOptionSynonyms(c);
        v();
        a.div_overlay.setDisable();
      },
      finish: function(b) {
        delete b.id;
        N();
        b = a.dialog
          .getContentElement(a.dialog._.currentTabId, "BlockFinishChecking")
          .getElement();
        b.removeStyle("display");
        b.removeStyle("position");
        b.removeStyle("left");
        b.show();
        a.div_overlay.setDisable();
      },
      settext: function(b) {
        delete b.id;
        a.dialog.getParentEditor().getCommand("checkspell");
        var c = a.dialog.getParentEditor();
        if (c.scayt && c.wsc.isSsrvSame) {
          var e = c.wsc.udn;
          e
            ? c.wsc.DataStorage.setData("scayt_user_dictionary_name", e)
            : c.wsc.DataStorage.setData("scayt_user_dictionary_name", "");
        }
        try {
          c.focus();
        } catch (d) {}
        c.setData(b.text, function() {
          a.dataTemp = "";
          c.unlockSelection();
          c.fire("saveSnapshot");
          a.dialog.hide();
        });
      },
      ReplaceText: function(b) {
        delete b.id;
        a.div_overlay.setEnable();
        a.dataTemp = b.text;
        a.selectingLang = b.currentLang;
        (b.cmd = "0" !== b.len && b.len)
          ? a.div_overlay.setDisable()
          : window.setTimeout(function() {
              try {
                a.div_overlay.setDisable();
              } catch (b) {}
            }, 500);
        J(a.LocalizationButton);
        K(a.LocalizationLabel);
      },
      options_checkbox_send: function(b) {
        delete b.id;
        b = {
          osp: g.cookie.get("osp"),
          udn: g.cookie.get("udn"),
          cust_dic_ids: a.cust_dic_ids
        };
        g.postMessage.send({
          message: b,
          target:
            a.targetFromFrame[a.iframeNumber + "_" + a.dialog._.currentTabId],
          id: "options_outer__page"
        });
      },
      getOptions: function(b) {
        var c = b.DefOptions.udn;
        a.LocalizationComing = b.DefOptions.localizationButtonsAndText;
        a.show_grammar = b.show_grammar;
        a.langList = b.lang;
        a.bnr = b.bannerId;
        a.sessionid = b.sessionid;
        if (b.bannerId) {
          a.setHeightBannerFrame();
          var e = b.banner;
          a.dialog
            .getContentElement(a.dialog._.currentTabId, "banner")
            .getElement()
            .setHtml(e);
        } else a.setHeightFrame();
        "undefined" == c &&
          (a.userDictionaryName
            ? ((c = a.userDictionaryName),
              (e = {
                osp: g.cookie.get("osp"),
                udn: a.userDictionaryName,
                cust_dic_ids: a.cust_dic_ids,
                id: "options_dic_send",
                udnCmd: "create"
              }),
              g.postMessage.send({
                message: e,
                target: a.targetFromFrame[void 0]
              }))
            : (c = ""));
        g.cookie.set("osp", b.DefOptions.osp);
        g.cookie.set("udn", c);
        g.cookie.set("cust_dic_ids", b.DefOptions.cust_dic_ids);
        g.postMessage.send({ id: "giveOptions" });
      },
      options_dic_send: function(b) {
        b = {
          osp: g.cookie.get("osp"),
          udn: g.cookie.get("udn"),
          cust_dic_ids: a.cust_dic_ids,
          id: "options_dic_send",
          udnCmd: g.cookie.get("udnCmd")
        };
        g.postMessage.send({
          message: b,
          target:
            a.targetFromFrame[a.iframeNumber + "_" + a.dialog._.currentTabId]
        });
      },
      data: function(a) {
        delete a.id;
      },
      giveOptions: function() {},
      setOptionsConfirmF: function() {},
      setOptionsConfirmT: function() {
        r.setValue("");
      },
      clickBusy: function() {
        a.div_overlay.setEnable();
      },
      suggestAllCame: function() {
        a.div_overlay.setDisable();
        a.div_overlay_no_check.setDisable();
      },
      TextCorrect: function() {
        w(a.langList);
      }
    },
    G = function(a) {
      a = a || window.event;
      if ((a = window.JSON.parse(a.data)) && a.id) O[a.id](a);
    },
    E = function(b, c, e, d) {
      c = c || CKEDITOR.config.wsc_cmd;
      e = e || a.dataTemp;
      g.postMessage.send({
        message: {
          customerId: a.wsc_customerId,
          text: e,
          txt_ctrl: a.TextAreaNumber,
          cmd: c,
          cust_dic_ids: a.cust_dic_ids,
          udn: a.userDictionaryName,
          slang: a.selectingLang,
          reset_suggest: d || !1,
          sessionid: a.sessionid
        },
        target: b,
        id: "data_outer__page"
      });
      a.div_overlay.setEnable();
    },
    u = {
      superset: {
        onShow: function() {
          a.dialog.showPage("Thesaurus");
          a.dialog.showPage("GrammTab");
          l();
        },
        allowedTabCommands: { spell: !0, grammar: !0, thes: !0 },
        defaultTabCommand: "spell"
      },
      usual: {
        onShow: function() {
          x();
          t();
          l();
        },
        allowedTabCommands: { spell: !0 },
        defaultTabCommand: "spell"
      },
      rtl: {
        onShow: function() {
          x();
          t();
          l();
        },
        allowedTabCommands: { spell: !0 },
        defaultTabCommand: "spell"
      },
      spellgrammar: {
        onShow: function() {
          x();
          a.dialog.showPage("GrammTab");
          l();
        },
        allowedTabCommands: { spell: !0, grammar: !0 },
        defaultTabCommand: "spell"
      },
      spellthes: {
        onShow: function() {
          a.dialog.showPage("Thesaurus");
          t();
          l();
        },
        allowedTabCommands: { spell: !0, thes: !0 },
        defaultTabCommand: "spell"
      }
    },
    H = function(b) {
      var c = new (function(a) {
        var b = {};
        return {
          getCmdByTab: function(c) {
            for (var h in a) b[a[h]] = h;
            return b[c];
          }
        };
      })(a.cmd).getCmdByTab(CKEDITOR.config.wsc_cmd);
      b.selectPage(c);
      a.sendData(b);
    },
    x = function() {
      a.dialog.hidePage("Thesaurus");
    },
    t = function() {
      a.dialog.hidePage("GrammTab");
    },
    l = function() {
      a.dialog.showPage("SpellTab");
    },
    v = function() {
      var b = a.dialog
        .getContentElement(a.dialog._.currentTabId, "bottomGroup")
        .getElement();
      b.removeStyle("display");
      b.removeStyle("position");
      b.removeStyle("left");
      b.show();
    },
    N = function() {
      var b = a.dialog
          .getContentElement(a.dialog._.currentTabId, "bottomGroup")
          .getElement(),
        c = document.activeElement,
        e;
      b.setStyles({ display: "block", position: "absolute", left: "-9999px" });
      setTimeout(function() {
        b.removeStyle("display");
        b.removeStyle("position");
        b.removeStyle("left");
        b.hide();
        a.dialog._.editor.focusManager.currentActive.focusNext();
        e = g.misc.findFocusable(a.dialog.parts.contents);
        if (
          g.misc.hasClass(c, "cke_dialog_tab") ||
          g.misc.hasClass(c, "cke_dialog_contents_body") ||
          !g.misc.isVisible(c)
        )
          for (var d = 0, f; d < e.count(); d++) {
            if (((f = e.getItem(d)), g.misc.isVisible(f.$))) {
              try {
                f.$.focus();
              } catch (h) {}
              break;
            }
          }
        else
          try {
            c.focus();
          } catch (k) {}
      }, 0);
    },
    C = function() {
      var b = a.dialog
          .getContentElement(a.dialog._.currentTabId, "BlockFinishChecking")
          .getElement(),
        c = document.activeElement,
        e;
      b.setStyles({ display: "block", position: "absolute", left: "-9999px" });
      setTimeout(function() {
        b.removeStyle("display");
        b.removeStyle("position");
        b.removeStyle("left");
        b.hide();
        a.dialog._.editor.focusManager.currentActive.focusNext();
        e = g.misc.findFocusable(a.dialog.parts.contents);
        if (
          g.misc.hasClass(c, "cke_dialog_tab") ||
          g.misc.hasClass(c, "cke_dialog_contents_body") ||
          !g.misc.isVisible(c)
        )
          for (var d = 0, f; d < e.count(); d++) {
            if (((f = e.getItem(d)), g.misc.isVisible(f.$))) {
              try {
                f.$.focus();
              } catch (h) {}
              break;
            }
          }
        else
          try {
            c.focus();
          } catch (k) {}
      }, 0);
    };
  CKEDITOR.dialog.add("checkspell", function(b) {
    function c(a) {
      var c = parseInt(b.config.wsc_left, 10),
        d = parseInt(b.config.wsc_top, 10),
        e = parseInt(b.config.wsc_width, 10),
        g = parseInt(b.config.wsc_height, 10),
        m = CKEDITOR.document.getWindow().getViewPaneSize();
      a.getPosition();
      var n = a.getSize(),
        q = 0;
      if (!a._.resized) {
        var q =
            n.height -
            a.parts.contents.getSize(
              "height",
              !(
                CKEDITOR.env.gecko ||
                CKEDITOR.env.opera ||
                (CKEDITOR.env.ie && CKEDITOR.env.quirks)
              )
            ),
          D = n.width - a.parts.contents.getSize("width", 1);
        if (e < f.minWidth || isNaN(e)) e = f.minWidth;
        e > m.width - D && (e = m.width - D);
        if (g < f.minHeight || isNaN(g)) g = f.minHeight;
        g > m.height - q && (g = m.height - q);
        n.width = e + D;
        n.height = g + q;
        a._.fromResizeEvent = !1;
        a.resize(e, g);
        setTimeout(function() {
          a._.fromResizeEvent = !1;
          CKEDITOR.dialog.fire("resize", { dialog: a, width: e, height: g }, b);
        }, 300);
      }
      a._.moved ||
        ((q = isNaN(c) && isNaN(d) ? 0 : 1),
        isNaN(c) && (c = (m.width - n.width) / 2),
        0 > c && (c = 0),
        c > m.width - n.width && (c = m.width - n.width),
        isNaN(d) && (d = (m.height - n.height) / 2),
        0 > d && (d = 0),
        d > m.height - n.height && (d = m.height - n.height),
        a.move(c, d, q));
    }
    function e() {
      b.wsc = {};
      (function(a) {
        var b = {
            separator: "\x3c$\x3e",
            getDataType: function(a) {
              return "undefined" === typeof a
                ? "undefined"
                : null === a
                ? "null"
                : Object.prototype.toString.call(a).slice(8, -1);
            },
            convertDataToString: function(a) {
              return this.getDataType(a).toLowerCase() + this.separator + a;
            },
            restoreDataFromString: function(a) {
              var b = a,
                c;
              a = this.backCompatibility(a);
              if ("string" === typeof a)
                switch (
                  ((b = a.indexOf(this.separator)),
                  (c = a.substring(0, b)),
                  (b = a.substring(b + this.separator.length)),
                  c)
                ) {
                  case "boolean":
                    b = "true" === b;
                    break;
                  case "number":
                    b = parseFloat(b);
                    break;
                  case "array":
                    b = "" === b ? [] : b.split(",");
                    break;
                  case "null":
                    b = null;
                    break;
                  case "undefined":
                    b = void 0;
                }
              return b;
            },
            backCompatibility: function(a) {
              var b = a,
                c;
              "string" === typeof a &&
                ((c = a.indexOf(this.separator)),
                0 > c &&
                  ((b = parseFloat(a)),
                  isNaN(b) &&
                    ("[" === a[0] && "]" === a[a.length - 1]
                      ? ((a = a.replace("[", "")),
                        (a = a.replace("]", "")),
                        (b = "" === a ? [] : a.split(",")))
                      : (b = "true" === a || "false" === a ? "true" === a : a)),
                  (b = this.convertDataToString(b))));
              return b;
            }
          },
          c = {
            get: function(a) {
              return b.restoreDataFromString(window.localStorage.getItem(a));
            },
            set: function(a, c) {
              var d = b.convertDataToString(c);
              window.localStorage.setItem(a, d);
            },
            del: function(a) {
              window.localStorage.removeItem(a);
            },
            clear: function() {
              window.localStorage.clear();
            }
          },
          d = {
            expiration: 31622400,
            get: function(a) {
              return b.restoreDataFromString(this.getCookie(a));
            },
            set: function(a, c) {
              var d = b.convertDataToString(c);
              this.setCookie(a, d, { expires: this.expiration });
            },
            del: function(a) {
              this.deleteCookie(a);
            },
            getCookie: function(a) {
              return (a = document.cookie.match(
                new RegExp(
                  "(?:^|; )" +
                    a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                    "\x3d([^;]*)"
                )
              ))
                ? decodeURIComponent(a[1])
                : void 0;
            },
            setCookie: function(a, b, c) {
              c = c || {};
              var d = c.expires;
              if ("number" === typeof d && d) {
                var e = new Date();
                e.setTime(e.getTime() + 1e3 * d);
                d = c.expires = e;
              }
              d && d.toUTCString && (c.expires = d.toUTCString());
              b = encodeURIComponent(b);
              a = a + "\x3d" + b;
              for (var h in c)
                (b = c[h]), (a += "; " + h), !0 !== b && (a += "\x3d" + b);
              document.cookie = a;
            },
            deleteCookie: function(a) {
              this.setCookie(a, null, { expires: -1 });
            },
            clear: function() {
              for (
                var a = document.cookie.split(";"), b = 0;
                b < a.length;
                b++
              ) {
                var c = a[b],
                  d = c.indexOf("\x3d"),
                  c = -1 < d ? c.substr(0, d) : c;
                this.deleteCookie(c);
              }
            }
          },
          e = window.localStorage ? c : d;
        a.DataStorage = {
          getData: function(a) {
            return e.get(a);
          },
          setData: function(a, b) {
            e.set(a, b);
          },
          deleteData: function(a) {
            e.del(a);
          },
          clear: function() {
            e.clear();
          }
        };
      })(b.wsc);
      b.wsc.operationWithUDN = function(b, c) {
        g.postMessage.send({
          message: { udn: c, id: "operationWithUDN", udnCmd: b },
          target:
            a.targetFromFrame[a.iframeNumber + "_" + a.dialog._.currentTabId]
        });
      };
      b.wsc.getLocalStorageUDN = function() {
        var a = b.wsc.DataStorage.getData("scayt_user_dictionary_name");
        if (a) return a;
      };
      b.wsc.getLocalStorageUD = function() {
        var a = b.wsc.DataStorage.getData("scayt_user_dictionary");
        if (a) return a;
      };
      b.wsc.addWords = function(a, c) {
        var d =
            b.config.wsc.DefaultParams.serviceHost +
            b.config.wsc.DefaultParams.ssrvHost +
            "?cmd\x3ddictionary\x26format\x3djson\x26customerid\x3d1%3AncttD3-fIoSf2-huzwE4-Y5muI2-mD0Tt-kG9Wz-UEDFC-tYu243-1Uq474-d9Z2l3\x26action\x3daddword\x26word\x3d" +
            a +
            "\x26callback\x3dtoString\x26synchronization\x3dtrue",
          e = document.createElement("script");
        e.type = "text/javascript";
        e.src = d;
        document.getElementsByTagName("head")[0].appendChild(e);
        e.onload = c;
        e.onreadystatechange = function() {
          "loaded" === this.readyState && c();
        };
      };
      b.wsc.cgiOrigin = function() {
        var a = b.config.wsc.DefaultParams.serviceHost.split("/");
        return a[0] + "//" + a[2];
      };
      b.wsc.isSsrvSame = !1;
    }
    var d = function(c) {
        this.getElement().focus();
        a.div_overlay.setEnable();
        c = a.dialog._.currentTabId;
        var d = a.iframeNumber + "_" + c,
          e = a.textNode[c].getValue(),
          f = this.getElement().getAttribute("title-cmd");
        g.postMessage.send({
          message: { cmd: f, tabId: c, new_word: e },
          target: a.targetFromFrame[d],
          id: "cmd_outer__page"
        });
        ("ChangeTo" != f && "ChangeAll" != f) || b.fire("saveSnapshot");
        "FinishChecking" == f &&
          b.config.wsc_onFinish.call(CKEDITOR.document.getWindow().getFrame());
      },
      f = { minWidth: 560, minHeight: 444 };
    return {
      title: b.config.wsc_dialogTitle || b.lang.wsc.title,
      minWidth: f.minWidth,
      minHeight: f.minHeight,
      buttons: [CKEDITOR.dialog.cancelButton],
      onLoad: function() {
        a.dialog = this;
        x();
        t();
        l();
        b.plugins.scayt && e();
      },
      onShow: function() {
        a.dialog = this;
        b.lockSelection(b.getSelection());
        a.TextAreaNumber = "cke_textarea_" + b.name;
        g.postMessage.init(G);
        a.dataTemp = b.getData();
        a.OverlayPlace = a.dialog.parts.tabs.getParent().$;
        if (CKEDITOR && CKEDITOR.config) {
          a.wsc_customerId = b.config.wsc_customerId;
          a.cust_dic_ids = b.config.wsc_customDictionaryIds;
          a.userDictionaryName = b.config.wsc_userDictionaryName;
          a.defaultLanguage = CKEDITOR.config.defaultLanguage;
          var d =
              "file:" == document.location.protocol
                ? "http:"
                : document.location.protocol,
            d =
              b.config.wsc_customLoaderScript ||
              d +
                "//loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin\x3dfck2\x26customerid\x3d" +
                a.wsc_customerId +
                "\x26cmd\x3dscript\x26doc\x3dwsc\x26schema\x3d22";
          c(this);
          CKEDITOR.scriptLoader.load(d, function(c) {
            CKEDITOR.config &&
            CKEDITOR.config.wsc &&
            CKEDITOR.config.wsc.DefaultParams
              ? ((a.serverLocationHash =
                  CKEDITOR.config.wsc.DefaultParams.serviceHost),
                (a.logotype = CKEDITOR.config.wsc.DefaultParams.logoPath),
                (a.loadIcon = CKEDITOR.config.wsc.DefaultParams.iconPath),
                (a.loadIconEmptyEditor =
                  CKEDITOR.config.wsc.DefaultParams.iconPathEmptyEditor),
                (a.LangComparer = new CKEDITOR.config.wsc.DefaultParams._SP_FCK_LangCompare()))
              : ((a.serverLocationHash = DefaultParams.serviceHost),
                (a.logotype = DefaultParams.logoPath),
                (a.loadIcon = DefaultParams.iconPath),
                (a.loadIconEmptyEditor = DefaultParams.iconPathEmptyEditor),
                (a.LangComparer = new _SP_FCK_LangCompare()));
            a.pluginPath = CKEDITOR.getUrl(b.plugins.wsc.path);
            a.iframeNumber = a.TextAreaNumber;
            a.templatePath = a.pluginPath + "dialogs/tmp.html";
            a.LangComparer.setDefaulLangCode(a.defaultLanguage);
            a.currentLang =
              b.config.wsc_lang ||
              a.LangComparer.getSPLangCode(b.langCode) ||
              "en_US";
            a.selectingLang = a.currentLang;
            a.div_overlay = new B({
              opacity: "1",
              background: "#fff url(" + a.loadIcon + ") no-repeat 50% 50%",
              target: a.OverlayPlace
            });
            var d = a.dialog.parts.tabs.getId(),
              d = CKEDITOR.document.getById(d);
            d.setStyle("width", "97%");
            d.getElementsByTag("DIV").count() ||
              d.append(a.buildSelectLang(a.dialog.getParentEditor().name));
            a.div_overlay_no_check = new B({
              opacity: "1",
              id: "no_check_over",
              background:
                "#fff url(" + a.loadIconEmptyEditor + ") no-repeat 50% 50%",
              target: a.OverlayPlace
            });
            c && (H(a.dialog), a.dialog.setupContent(a.dialog));
            b.plugins.scayt &&
              (b.wsc.isSsrvSame = (function() {
                var a = CKEDITOR.config.wsc.DefaultParams.serviceHost
                    .replace("lf/22/js/../../../", "")
                    .split("//")[1],
                  c = CKEDITOR.config.wsc.DefaultParams.ssrvHost,
                  d = b.config.scayt_srcUrl,
                  e,
                  h,
                  f,
                  g,
                  p;
                window.SCAYT &&
                  window.SCAYT.CKSCAYT &&
                  ((f = SCAYT.CKSCAYT.prototype.basePath),
                  f.split("//"),
                  (g = f.split("//")[1].split("/")[0]),
                  (p =
                    f.split(g + "/")[1].replace("/lf/scayt3/ckscayt/", "") +
                    "/script/ssrv.cgi"));
                !d ||
                  f ||
                  b.config.scayt_servicePath ||
                  (d.split("//"),
                  (e = d.split("//")[1].split("/")[0]),
                  (h =
                    d
                      .split(e + "/")[1]
                      .replace("/lf/scayt3/ckscayt/ckscayt.js", "") +
                    "/script/ssrv.cgi"));
                return (
                  "//" + a + c ===
                  "//" +
                    (b.config.scayt_serviceHost || g || e) +
                    "/" +
                    (b.config.scayt_servicePath || p || h)
                );
              })());
            if (window.SCAYT && b.wsc && b.wsc.isSsrvSame) {
              var e = b.wsc.cgiOrigin();
              b.wsc.syncIsDone = !1;
              c = function(a) {
                a.origin === e &&
                  ((a = JSON.parse(a.data)),
                  a.ud && "undefined" !== a.ud
                    ? (b.wsc.ud = a.ud)
                    : "undefined" === a.ud && (b.wsc.ud = void 0),
                  a.udn && "undefined" !== a.udn
                    ? (b.wsc.udn = a.udn)
                    : "undefined" === a.udn && (b.wsc.udn = void 0),
                  b.wsc.syncIsDone || (h(b.wsc.ud), (b.wsc.syncIsDone = !0)));
              };
              var h = function(c) {
                c = b.wsc.getLocalStorageUD();
                var d;
                c instanceof Array && (d = c.toString());
                void 0 !== d &&
                  "" !== d &&
                  setTimeout(function() {
                    b.wsc.addWords(d, function() {
                      H(a.dialog);
                      a.dialog.setupContent(a.dialog);
                    });
                  }, 400);
              };
              window.addEventListener
                ? addEventListener("message", c, !1)
                : window.attachEvent("onmessage", c);
              setTimeout(function() {
                var a = b.wsc.getLocalStorageUDN();
                void 0 !== a && b.wsc.operationWithUDN("restore", a);
              }, 500);
            }
          });
        } else a.dialog.hide();
      },
      onHide: function() {
        var c = CKEDITOR.plugins.scayt,
          d = b.scayt;
        b.unlockSelection();
        c && d && c.state[b.name] && d.setMarkupPaused(!1);
        a.dataTemp = "";
        a.sessionid = "";
        g.postMessage.unbindHandler(G);
        if (b.plugins.scayt && b.wsc && b.wsc.isSsrvSame) {
          var c = b.wsc.udn,
            e = b.wsc.ud,
            f,
            l;
          b.scayt
            ? (c
                ? (b.wsc.DataStorage.setData("scayt_user_dictionary_name", c),
                  b.scayt.restoreUserDictionary(c))
                : (b.wsc.DataStorage.setData("scayt_user_dictionary_name", ""),
                  b.scayt.removeUserDictionary()),
              e &&
                setTimeout(function() {
                  f = e.split(",");
                  for (l = 0; l < f.length; l += 1)
                    b.scayt.addWordToUserDictionary(f[l]);
                }, 200),
              e || b.wsc.DataStorage.setData("scayt_user_dictionary", []))
            : (c
                ? b.wsc.DataStorage.setData("scayt_user_dictionary_name", c)
                : b.wsc.DataStorage.setData("scayt_user_dictionary_name", ""),
              e &&
                ((f = e.split(",")),
                b.wsc.DataStorage.setData("scayt_user_dictionary", f)));
        }
      },
      contents: [
        {
          id: "SpellTab",
          label: "SpellChecker",
          accessKey: "S",
          elements: [
            {
              type: "html",
              id: "banner",
              label: "banner",
              style: "",
              html: "\x3cdiv\x3e\x3c/div\x3e"
            },
            {
              type: "html",
              id: "Content",
              label: "spellContent",
              html: "",
              setup: function(b) {
                b = a.iframeNumber + "_" + b._.currentTabId;
                var c = document.getElementById(b);
                a.targetFromFrame[b] = c.contentWindow;
              }
            },
            {
              type: "hbox",
              id: "bottomGroup",
              style: "width:560px; margin: 0 auto;",
              widths: ["50%", "50%"],
              children: [
                {
                  type: "hbox",
                  id: "leftCol",
                  align: "left",
                  width: "50%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol1",
                      widths: ["50%", "50%"],
                      children: [
                        {
                          type: "text",
                          id: "ChangeTo_label",
                          label: a.LocalizationLabel.ChangeTo_label.text + ":",
                          labelLayout: "horizontal",
                          labelStyle: "font: 12px/25px arial, sans-serif;",
                          width: "140px",
                          default: "",
                          onShow: function() {
                            a.textNode.SpellTab = this;
                            a.LocalizationLabel.ChangeTo_label.instance = this;
                          },
                          onHide: function() {
                            this.reset();
                          }
                        },
                        {
                          type: "hbox",
                          id: "rightCol",
                          align: "right",
                          width: "30%",
                          children: [
                            {
                              type: "vbox",
                              id: "rightCol_col__left",
                              children: [
                                {
                                  type: "text",
                                  id: "labelSuggestions",
                                  label:
                                    a.LocalizationLabel.Suggestions.text + ":",
                                  onShow: function() {
                                    a.LocalizationLabel.Suggestions.instance = this;
                                    this.getInputElement().setStyles({
                                      display: "none"
                                    });
                                  }
                                },
                                {
                                  type: "html",
                                  id: "logo",
                                  html:
                                    '\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',
                                  setup: function(b) {
                                    this.getElement().$.src = a.logotype;
                                    this.getElement()
                                      .getParent()
                                      .setStyles({ "text-align": "left" });
                                  }
                                }
                              ]
                            },
                            {
                              type: "select",
                              id: "list_of_suggestions",
                              labelStyle: "font: 12px/25px arial, sans-serif;",
                              size: "6",
                              inputStyle: "width: 140px; height: auto;",
                              items: [["loading..."]],
                              onShow: function() {
                                A = this;
                              },
                              onChange: function() {
                                a.textNode.SpellTab.setValue(this.getValue());
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "hbox",
                  id: "rightCol",
                  align: "right",
                  width: "50%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol_col__left",
                      widths: ["50%", "50%", "50%", "50%"],
                      children: [
                        {
                          type: "button",
                          id: "ChangeTo_button",
                          label: a.LocalizationButton.ChangeTo_button.text,
                          title: "Change to",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "ChangeTo"
                            );
                            a.LocalizationButton.ChangeTo_button.instance = this;
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "ChangeAll",
                          label: a.LocalizationButton.ChangeAll.text,
                          title: "Change All",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                            a.LocalizationButton.ChangeAll.instance = this;
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "AddWord",
                          label: a.LocalizationButton.AddWord.text,
                          title: "Add word",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                            a.LocalizationButton.AddWord.instance = this;
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "FinishChecking_button",
                          label:
                            a.LocalizationButton.FinishChecking_button.text,
                          title: "Finish Checking",
                          style: "width: 100%;margin-top: 9px;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "FinishChecking"
                            );
                            a.LocalizationButton.FinishChecking_button.instance = this;
                          },
                          onClick: d
                        }
                      ]
                    },
                    {
                      type: "vbox",
                      id: "rightCol_col__right",
                      widths: ["50%", "50%", "50%"],
                      children: [
                        {
                          type: "button",
                          id: "IgnoreWord",
                          label: a.LocalizationButton.IgnoreWord.text,
                          title: "Ignore word",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                            a.LocalizationButton.IgnoreWord.instance = this;
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "IgnoreAllWords",
                          label: a.LocalizationButton.IgnoreAllWords.text,
                          title: "Ignore all words",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                            a.LocalizationButton.IgnoreAllWords.instance = this;
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "Options",
                          label: a.LocalizationButton.Options.text,
                          title: "Option",
                          style: "width: 100%;",
                          onLoad: function() {
                            a.LocalizationButton.Options.instance = this;
                            "file:" == document.location.protocol &&
                              this.disable();
                          },
                          onClick: function() {
                            this.getElement().focus();
                            "file:" == document.location.protocol
                              ? alert(
                                  "WSC: Options functionality is disabled when runing from file system"
                                )
                              : ((y = document.activeElement),
                                b.openDialog("options"));
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: "hbox",
              id: "BlockFinishChecking",
              style: "width:560px; margin: 0 auto;",
              widths: ["70%", "30%"],
              onShow: function() {
                this.getElement().setStyles({
                  display: "block",
                  position: "absolute",
                  left: "-9999px"
                });
              },
              onHide: v,
              children: [
                {
                  type: "hbox",
                  id: "leftCol",
                  align: "left",
                  width: "70%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol1",
                      setup: function() {
                        this.getChild()[0].getElement().$.src = a.logotype;
                        this.getChild()[0]
                          .getElement()
                          .getParent()
                          .setStyles({ "text-align": "center" });
                      },
                      children: [
                        {
                          type: "html",
                          id: "logo",
                          html:
                            '\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "hbox",
                  id: "rightCol",
                  align: "right",
                  width: "30%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol_col__left",
                      children: [
                        {
                          type: "button",
                          id: "Option_button",
                          label: a.LocalizationButton.Options.text,
                          title: "Option",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                            "file:" == document.location.protocol &&
                              this.disable();
                          },
                          onClick: function() {
                            this.getElement().focus();
                            "file:" == document.location.protocol
                              ? alert(
                                  "WSC: Options functionality is disabled when runing from file system"
                                )
                              : ((y = document.activeElement),
                                b.openDialog("options"));
                          }
                        },
                        {
                          type: "button",
                          id: "FinishChecking_button_block",
                          label:
                            a.LocalizationButton.FinishChecking_button_block
                              .text,
                          title: "Finish Checking",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "FinishChecking"
                            );
                          },
                          onClick: d
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "GrammTab",
          label: "Grammar",
          accessKey: "G",
          elements: [
            {
              type: "html",
              id: "banner",
              label: "banner",
              style: "",
              html: "\x3cdiv\x3e\x3c/div\x3e"
            },
            {
              type: "html",
              id: "Content",
              label: "GrammarContent",
              html: "",
              setup: function() {
                var b = a.iframeNumber + "_" + a.dialog._.currentTabId,
                  c = document.getElementById(b);
                a.targetFromFrame[b] = c.contentWindow;
              }
            },
            {
              type: "vbox",
              id: "bottomGroup",
              style: "width:560px; margin: 0 auto;",
              children: [
                {
                  type: "hbox",
                  id: "leftCol",
                  widths: ["66%", "34%"],
                  children: [
                    {
                      type: "vbox",
                      children: [
                        {
                          type: "text",
                          id: "text",
                          label: "Change to:",
                          labelLayout: "horizontal",
                          labelStyle: "font: 12px/25px arial, sans-serif;",
                          inputStyle: "float: right; width: 200px;",
                          default: "",
                          onShow: function() {
                            a.textNode.GrammTab = this;
                          },
                          onHide: function() {
                            this.reset();
                          }
                        },
                        {
                          type: "html",
                          id: "html_text",
                          html:
                            "\x3cdiv style\x3d'min-height: 17px; line-height: 17px; padding: 5px; text-align: left;background: #F1F1F1;color: #595959; white-space: normal!important;'\x3e\x3c/div\x3e",
                          onShow: function(b) {
                            a.textNodeInfo.GrammTab = this;
                          }
                        },
                        {
                          type: "html",
                          id: "radio",
                          html: "",
                          onShow: function() {
                            a.grammerSuggest = this;
                          }
                        }
                      ]
                    },
                    {
                      type: "vbox",
                      children: [
                        {
                          type: "button",
                          id: "ChangeTo_button",
                          label: "Change to",
                          title: "Change to",
                          style: "width: 133px; float: right;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "ChangeTo"
                            );
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "IgnoreWord",
                          label: "Ignore word",
                          title: "Ignore word",
                          style: "width: 133px; float: right;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "IgnoreAllWords",
                          label: "Ignore Problem",
                          title: "Ignore Problem",
                          style: "width: 133px; float: right;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              this.id
                            );
                          },
                          onClick: d
                        },
                        {
                          type: "button",
                          id: "FinishChecking_button",
                          label:
                            a.LocalizationButton.FinishChecking_button.text,
                          title: "Finish Checking",
                          style: "width: 133px; float: right; margin-top: 9px;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "FinishChecking"
                            );
                          },
                          onClick: d
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: "hbox",
              id: "BlockFinishChecking",
              style: "width:560px; margin: 0 auto;",
              widths: ["70%", "30%"],
              onShow: function() {
                this.getElement().setStyles({
                  display: "block",
                  position: "absolute",
                  left: "-9999px"
                });
              },
              onHide: v,
              children: [
                {
                  type: "hbox",
                  id: "leftCol",
                  align: "left",
                  width: "70%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol1",
                      children: [
                        {
                          type: "html",
                          id: "logo",
                          html:
                            '\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',
                          setup: function() {
                            this.getElement().$.src = a.logotype;
                            this.getElement()
                              .getParent()
                              .setStyles({ "text-align": "center" });
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "hbox",
                  id: "rightCol",
                  align: "right",
                  width: "30%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol_col__left",
                      children: [
                        {
                          type: "button",
                          id: "FinishChecking_button_block",
                          label:
                            a.LocalizationButton.FinishChecking_button_block
                              .text,
                          title: "Finish Checking",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "FinishChecking"
                            );
                          },
                          onClick: d
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "Thesaurus",
          label: "Thesaurus",
          accessKey: "T",
          elements: [
            {
              type: "html",
              id: "banner",
              label: "banner",
              style: "",
              html: "\x3cdiv\x3e\x3c/div\x3e"
            },
            {
              type: "html",
              id: "Content",
              label: "spellContent",
              html: "",
              setup: function() {
                var b = a.iframeNumber + "_" + a.dialog._.currentTabId,
                  c = document.getElementById(b);
                a.targetFromFrame[b] = c.contentWindow;
              }
            },
            {
              type: "vbox",
              id: "bottomGroup",
              style: "width:560px; margin: -10px auto; overflow: hidden;",
              children: [
                {
                  type: "hbox",
                  widths: ["75%", "25%"],
                  children: [
                    {
                      type: "vbox",
                      children: [
                        {
                          type: "hbox",
                          widths: ["65%", "35%"],
                          children: [
                            {
                              type: "text",
                              id: "ChangeTo_label",
                              label:
                                a.LocalizationLabel.ChangeTo_label.text + ":",
                              labelLayout: "horizontal",
                              inputStyle: "width: 160px;",
                              labelStyle: "font: 12px/25px arial, sans-serif;",
                              default: "",
                              onShow: function(b) {
                                a.textNode.Thesaurus = this;
                                a.LocalizationLabel.ChangeTo_label.instance = this;
                              },
                              onHide: function() {
                                this.reset();
                              }
                            },
                            {
                              type: "button",
                              id: "ChangeTo_button",
                              label: a.LocalizationButton.ChangeTo_button.text,
                              title: "Change to",
                              style: "width: 121px; margin-top: 1px;",
                              onLoad: function() {
                                this.getElement().setAttribute(
                                  "title-cmd",
                                  "ChangeTo"
                                );
                                a.LocalizationButton.ChangeTo_button.instance = this;
                              },
                              onClick: d
                            }
                          ]
                        },
                        {
                          type: "hbox",
                          children: [
                            {
                              type: "select",
                              id: "Categories",
                              label: a.LocalizationLabel.Categories.text + ":",
                              labelStyle: "font: 12px/25px arial, sans-serif;",
                              size: "5",
                              inputStyle: "width: 180px; height: auto;",
                              items: [],
                              onShow: function() {
                                a.selectNode.Categories = this;
                                a.LocalizationLabel.Categories.instance = this;
                              },
                              onChange: function() {
                                a.buildOptionSynonyms(this.getValue());
                              }
                            },
                            {
                              type: "select",
                              id: "Synonyms",
                              label: a.LocalizationLabel.Synonyms.text + ":",
                              labelStyle: "font: 12px/25px arial, sans-serif;",
                              size: "5",
                              inputStyle: "width: 180px; height: auto;",
                              items: [],
                              onShow: function() {
                                a.selectNode.Synonyms = this;
                                a.textNode.Thesaurus.setValue(this.getValue());
                                a.LocalizationLabel.Synonyms.instance = this;
                              },
                              onChange: function(b) {
                                a.textNode.Thesaurus.setValue(this.getValue());
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "vbox",
                      width: "120px",
                      style: "margin-top:46px;",
                      children: [
                        {
                          type: "html",
                          id: "logotype",
                          label: "WebSpellChecker.net",
                          html:
                            '\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',
                          setup: function() {
                            this.getElement().$.src = a.logotype;
                            this.getElement()
                              .getParent()
                              .setStyles({ "text-align": "center" });
                          }
                        },
                        {
                          type: "button",
                          id: "FinishChecking_button",
                          label:
                            a.LocalizationButton.FinishChecking_button.text,
                          title: "Finish Checking",
                          style: "width: 100%; float: right; margin-top: 9px;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "FinishChecking"
                            );
                          },
                          onClick: d
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: "hbox",
              id: "BlockFinishChecking",
              style: "width:560px; margin: 0 auto;",
              widths: ["70%", "30%"],
              onShow: function() {
                this.getElement().setStyles({
                  display: "block",
                  position: "absolute",
                  left: "-9999px"
                });
              },
              children: [
                {
                  type: "hbox",
                  id: "leftCol",
                  align: "left",
                  width: "70%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol1",
                      children: [
                        {
                          type: "html",
                          id: "logo",
                          html:
                            '\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',
                          setup: function() {
                            this.getElement().$.src = a.logotype;
                            this.getElement()
                              .getParent()
                              .setStyles({ "text-align": "center" });
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "hbox",
                  id: "rightCol",
                  align: "right",
                  width: "30%",
                  children: [
                    {
                      type: "vbox",
                      id: "rightCol_col__left",
                      children: [
                        {
                          type: "button",
                          id: "FinishChecking_button_block",
                          label:
                            a.LocalizationButton.FinishChecking_button_block
                              .text,
                          title: "Finish Checking",
                          style: "width: 100%;",
                          onLoad: function() {
                            this.getElement().setAttribute(
                              "title-cmd",
                              "FinishChecking"
                            );
                          },
                          onClick: d
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  });
  var y = null;
  CKEDITOR.dialog.add("options", function(b) {
    var c = null,
      e = {},
      d = {},
      f = null,
      h = null;
    g.cookie.get("udn");
    g.cookie.get("osp");
    b = function(a) {
      h = this.getElement().getAttribute("title-cmd");
      a = [];
      a[0] = d.IgnoreAllCapsWords;
      a[1] = d.IgnoreWordsNumbers;
      a[2] = d.IgnoreMixedCaseWords;
      a[3] = d.IgnoreDomainNames;
      a = a.toString().replace(/,/g, "");
      g.cookie.set("osp", a);
      g.cookie.set("udnCmd", h ? h : "ignore");
      "delete" != h &&
        ((a = ""),
        "" !== r.getValue() && (a = r.getValue()),
        g.cookie.set("udn", a));
      g.postMessage.send({ id: "options_dic_send" });
    };
    var k = function() {
      f.getElement().setHtml(a.LocalizationComing.error);
      f.getElement().show();
    };
    return {
      title: a.LocalizationComing.Options,
      minWidth: 430,
      minHeight: 130,
      resizable: CKEDITOR.DIALOG_RESIZE_NONE,
      contents: [
        {
          id: "OptionsTab",
          label: "Options",
          accessKey: "O",
          elements: [
            {
              type: "hbox",
              id: "options_error",
              children: [
                {
                  type: "html",
                  style:
                    "display: block;text-align: center;white-space: normal!important; font-size: 12px;color:red",
                  html: "\x3cdiv\x3e\x3c/div\x3e",
                  onShow: function() {
                    f = this;
                  }
                }
              ]
            },
            {
              type: "vbox",
              id: "Options_content",
              children: [
                {
                  type: "hbox",
                  id: "Options_manager",
                  widths: ["52%", "48%"],
                  children: [
                    {
                      type: "fieldset",
                      label: "Spell Checking Options",
                      style:
                        "border: none;margin-top: 13px;padding: 10px 0 10px 10px",
                      onShow: function() {
                        this.getInputElement().$.children[0].innerHTML =
                          a.LocalizationComing.SpellCheckingOptions;
                      },
                      children: [
                        {
                          type: "vbox",
                          id: "Options_checkbox",
                          children: [
                            {
                              type: "checkbox",
                              id: "IgnoreAllCapsWords",
                              label: "Ignore All-Caps Words",
                              labelStyle:
                                "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                              style: "float:left; min-height: 16px;",
                              default: "",
                              onClick: function() {
                                d[this.id] = this.getValue() ? 1 : 0;
                              }
                            },
                            {
                              type: "checkbox",
                              id: "IgnoreWordsNumbers",
                              label: "Ignore Words with Numbers",
                              labelStyle:
                                "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                              style: "float:left; min-height: 16px;",
                              default: "",
                              onClick: function() {
                                d[this.id] = this.getValue() ? 1 : 0;
                              }
                            },
                            {
                              type: "checkbox",
                              id: "IgnoreMixedCaseWords",
                              label: "Ignore Mixed-Case Words",
                              labelStyle:
                                "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                              style: "float:left; min-height: 16px;",
                              default: "",
                              onClick: function() {
                                d[this.id] = this.getValue() ? 1 : 0;
                              }
                            },
                            {
                              type: "checkbox",
                              id: "IgnoreDomainNames",
                              label: "Ignore Domain Names",
                              labelStyle:
                                "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                              style: "float:left; min-height: 16px;",
                              default: "",
                              onClick: function() {
                                d[this.id] = this.getValue() ? 1 : 0;
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "vbox",
                      id: "Options_DictionaryName",
                      children: [
                        {
                          type: "text",
                          id: "DictionaryName",
                          style: "margin-bottom: 10px",
                          label: "Dictionary Name:",
                          labelLayout: "vertical",
                          labelStyle: "font: 12px/25px arial, sans-serif;",
                          default: "",
                          onLoad: function() {
                            r = this;
                            var b = a.userDictionaryName
                              ? a.userDictionaryName
                              : (g.cookie.get("udn"), this.getValue());
                            this.setValue(b);
                          },
                          onShow: function() {
                            r = this;
                            var b = g.cookie.get("udn")
                              ? g.cookie.get("udn")
                              : this.getValue();
                            this.setValue(b);
                            this.setLabel(a.LocalizationComing.DictionaryName);
                          },
                          onHide: function() {
                            this.reset();
                          }
                        },
                        {
                          type: "hbox",
                          id: "Options_buttons",
                          children: [
                            {
                              type: "vbox",
                              id: "Options_leftCol_col",
                              widths: ["50%", "50%"],
                              children: [
                                {
                                  type: "button",
                                  id: "create",
                                  label: "Create",
                                  title: "Create",
                                  style: "width: 100%;",
                                  onLoad: function() {
                                    this.getElement().setAttribute(
                                      "title-cmd",
                                      this.id
                                    );
                                  },
                                  onShow: function() {
                                    (
                                      this.getElement().getFirst() ||
                                      this.getElement()
                                    ).setText(a.LocalizationComing.Create);
                                  },
                                  onClick: b
                                },
                                {
                                  type: "button",
                                  id: "restore",
                                  label: "Restore",
                                  title: "Restore",
                                  style: "width: 100%;",
                                  onLoad: function() {
                                    this.getElement().setAttribute(
                                      "title-cmd",
                                      this.id
                                    );
                                  },
                                  onShow: function() {
                                    (
                                      this.getElement().getFirst() ||
                                      this.getElement()
                                    ).setText(a.LocalizationComing.Restore);
                                  },
                                  onClick: b
                                }
                              ]
                            },
                            {
                              type: "vbox",
                              id: "Options_rightCol_col",
                              widths: ["50%", "50%"],
                              children: [
                                {
                                  type: "button",
                                  id: "rename",
                                  label: "Rename",
                                  title: "Rename",
                                  style: "width: 100%;",
                                  onLoad: function() {
                                    this.getElement().setAttribute(
                                      "title-cmd",
                                      this.id
                                    );
                                  },
                                  onShow: function() {
                                    (
                                      this.getElement().getFirst() ||
                                      this.getElement()
                                    ).setText(a.LocalizationComing.Rename);
                                  },
                                  onClick: b
                                },
                                {
                                  type: "button",
                                  id: "delete",
                                  label: "Remove",
                                  title: "Remove",
                                  style: "width: 100%;",
                                  onLoad: function() {
                                    this.getElement().setAttribute(
                                      "title-cmd",
                                      this.id
                                    );
                                  },
                                  onShow: function() {
                                    (
                                      this.getElement().getFirst() ||
                                      this.getElement()
                                    ).setText(a.LocalizationComing.Remove);
                                  },
                                  onClick: b
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "hbox",
                  id: "Options_text",
                  children: [
                    {
                      type: "html",
                      style:
                        "text-align: justify;margin-top: 15px;white-space: normal!important; font-size: 12px;color:#777;",
                      html:
                        "\x3cdiv\x3e" +
                        a.LocalizationComing.OptionsTextIntro +
                        "\x3c/div\x3e",
                      onShow: function() {
                        this.getElement().setText(
                          a.LocalizationComing.OptionsTextIntro
                        );
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton],
      onOk: function() {
        var a = [];
        a[0] = d.IgnoreAllCapsWords;
        a[1] = d.IgnoreWordsNumbers;
        a[2] = d.IgnoreMixedCaseWords;
        a[3] = d.IgnoreDomainNames;
        a = a.toString().replace(/,/g, "");
        g.cookie.set("osp", a);
        g.postMessage.send({ id: "options_checkbox_send" });
        f.getElement().hide();
        f.getElement().setHtml(" ");
      },
      onLoad: function() {
        c = this;
        e.IgnoreAllCapsWords = c.getContentElement(
          "OptionsTab",
          "IgnoreAllCapsWords"
        );
        e.IgnoreWordsNumbers = c.getContentElement(
          "OptionsTab",
          "IgnoreWordsNumbers"
        );
        e.IgnoreMixedCaseWords = c.getContentElement(
          "OptionsTab",
          "IgnoreMixedCaseWords"
        );
        e.IgnoreDomainNames = c.getContentElement(
          "OptionsTab",
          "IgnoreDomainNames"
        );
      },
      onShow: function() {
        g.postMessage.init(k);
        var b = g.cookie.get("osp").split("");
        d.IgnoreAllCapsWords = b[0];
        d.IgnoreWordsNumbers = b[1];
        d.IgnoreMixedCaseWords = b[2];
        d.IgnoreDomainNames = b[3];
        parseInt(d.IgnoreAllCapsWords, 10)
          ? e.IgnoreAllCapsWords.setValue("checked", !1)
          : e.IgnoreAllCapsWords.setValue("", !1);
        parseInt(d.IgnoreWordsNumbers, 10)
          ? e.IgnoreWordsNumbers.setValue("checked", !1)
          : e.IgnoreWordsNumbers.setValue("", !1);
        parseInt(d.IgnoreMixedCaseWords, 10)
          ? e.IgnoreMixedCaseWords.setValue("checked", !1)
          : e.IgnoreMixedCaseWords.setValue("", !1);
        parseInt(d.IgnoreDomainNames, 10)
          ? e.IgnoreDomainNames.setValue("checked", !1)
          : e.IgnoreDomainNames.setValue("", !1);
        d.IgnoreAllCapsWords = e.IgnoreAllCapsWords.getValue() ? 1 : 0;
        d.IgnoreWordsNumbers = e.IgnoreWordsNumbers.getValue() ? 1 : 0;
        d.IgnoreMixedCaseWords = e.IgnoreMixedCaseWords.getValue() ? 1 : 0;
        d.IgnoreDomainNames = e.IgnoreDomainNames.getValue() ? 1 : 0;
        e.IgnoreAllCapsWords.getElement().$.lastChild.innerHTML =
          a.LocalizationComing.IgnoreAllCapsWords;
        e.IgnoreWordsNumbers.getElement().$.lastChild.innerHTML =
          a.LocalizationComing.IgnoreWordsWithNumbers;
        e.IgnoreMixedCaseWords.getElement().$.lastChild.innerHTML =
          a.LocalizationComing.IgnoreMixedCaseWords;
        e.IgnoreDomainNames.getElement().$.lastChild.innerHTML =
          a.LocalizationComing.IgnoreDomainNames;
      },
      onHide: function() {
        g.postMessage.unbindHandler(k);
        if (y)
          try {
            y.focus();
          } catch (a) {}
      }
    };
  });
  CKEDITOR.dialog.on("resize", function(b) {
    b = b.data;
    var c = b.dialog,
      e = CKEDITOR.document.getById(a.iframeNumber + "_" + c._.currentTabId);
    "checkspell" == c._.name &&
      (a.bnr
        ? e && e.setSize("height", b.height - 310)
        : e && e.setSize("height", b.height - 220),
      c._.fromResizeEvent && !c._.resized && (c._.resized = !0),
      (c._.fromResizeEvent = !0));
  });
  CKEDITOR.on("dialogDefinition", function(b) {
    if ("checkspell" === b.data.name) {
      var c = b.data.definition;
      a.onLoadOverlay = new B({
        opacity: "1",
        background: "#fff",
        target: c.dialog.parts.tabs.getParent().$
      });
      a.onLoadOverlay.setEnable();
      c.dialog.on(
        "cancel",
        function(b) {
          c.dialog
            .getParentEditor()
            .config.wsc_onClose.call(this.document.getWindow().getFrame());
          a.div_overlay.setDisable();
          a.onLoadOverlay.setDisable();
          return !1;
        },
        this,
        null,
        -1
      );
    }
  });
})();
