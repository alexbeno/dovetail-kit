/*!
 * Dovetail for plain HTML: the few behaviours CSS cannot do alone.
 * No dependency, event delegation only (works on markup added later).
 *
 *   Theme     <button data-theme-toggle>            paper <-> blueprint
 *   Tabs      <div data-tabs> .tabs-trigger[data-tab="a"] + .tabs-content[data-tab-panel="a"]
 *   Dialog    <button data-dialog-open="id">  …  <dialog id="id" class="dialog"> <button data-dialog-close>
 *   Dropdown  <details class="dropdown">          closes on outside click, Escape, item click
 *   Toggles   <div class="toggle-group" data-toggle-group> <button class="toggle-group-item">
 *   Dismiss   <button data-dismiss>                closes the nearest .banner or .note
 *   Split     <div class="split"> .split-pane + .split-handle + .split-pane   drag or arrow keys
 *   Stamp     Dovetail.stamp("Approved", { tone: "success" })
 *   Note      Dovetail.notify({ title: "Saved", description: "…", tone: "success" })
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dovetail-theme";
  var root = document.documentElement;

  function readStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      if (theme === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch {
      /* Storage can be blocked (private window, sandboxed frame): the theme still applies. */
    }
  }

  function systemTheme() {
    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "blueprint" : "paper";
  }

  function applyTheme(theme) {
    var resolved = theme === "system" ? systemTheme() : theme;
    root.classList.toggle("dark", resolved === "blueprint");
    root.setAttribute("data-theme", resolved);
    return resolved;
  }

  function getTheme() {
    return root.classList.contains("dark") ||
      root.getAttribute("data-theme") === "blueprint"
      ? "blueprint"
      : "paper";
  }

  function setTheme(theme) {
    storeTheme(theme);
    return applyTheme(theme);
  }

  function toggleTheme() {
    return setTheme(getTheme() === "blueprint" ? "paper" : "blueprint");
  }

  /* A theme written in the markup wins; otherwise the stored choice, then the system. */
  function initTheme() {
    var isExplicit =
      root.classList.contains("dark") || root.hasAttribute("data-theme");
    if (isExplicit) {
      return;
    }
    applyTheme(readStoredTheme() || "system");
  }

  function selectTab(tabs, id) {
    var triggers = tabs.querySelectorAll("[data-tab]");
    var panels = tabs.querySelectorAll("[data-tab-panel]");
    triggers.forEach(function (trigger) {
      if (trigger.closest("[data-tabs]") !== tabs) {
        return;
      }
      var isActive = trigger.getAttribute("data-tab") === id;
      trigger.setAttribute("role", "tab");
      trigger.setAttribute("aria-selected", String(isActive));
      trigger.setAttribute("tabindex", isActive ? "0" : "-1");
    });
    panels.forEach(function (panel) {
      if (panel.closest("[data-tabs]") !== tabs) {
        return;
      }
      panel.setAttribute("role", "tabpanel");
      panel.hidden = panel.getAttribute("data-tab-panel") !== id;
    });
  }

  function initTabs(scope) {
    scope.querySelectorAll("[data-tabs]").forEach(function (tabs) {
      var selected =
        tabs.querySelector('[data-tab][aria-selected="true"]') ||
        tabs.querySelector("[data-tab]");
      if (selected) {
        selectTab(tabs, selected.getAttribute("data-tab"));
      }
    });
  }

  function closeDropdowns(except) {
    document
      .querySelectorAll("details.dropdown[open]")
      .forEach(function (dropdown) {
        if (dropdown !== except) {
          dropdown.open = false;
        }
      });
  }

  function handleToggleGroup(item) {
    var group = item.closest("[data-toggle-group]");
    if (!group) {
      return;
    }
    if (group.getAttribute("data-toggle-group") === "multiple") {
      item.setAttribute(
        "aria-pressed",
        String(item.getAttribute("aria-pressed") !== "true"),
      );
      return;
    }
    group.querySelectorAll(".toggle-group-item").forEach(function (other) {
      other.setAttribute("aria-pressed", String(other === item));
    });
  }

  function handleClick(event) {
    var target = event.target instanceof Element ? event.target : null;
    if (!target) {
      return;
    }

    if (target.closest("[data-theme-toggle]")) {
      toggleTheme();
      return;
    }

    var dismiss = target.closest("[data-dismiss]");
    if (dismiss) {
      var dismissed = dismiss.closest(".banner, .note");
      if (dismissed) {
        dismissed.remove();
      }
      return;
    }

    var tab = target.closest("[data-tab]");
    if (tab) {
      selectTab(tab.closest("[data-tabs]"), tab.getAttribute("data-tab"));
      return;
    }

    var opener = target.closest("[data-dialog-open]");
    if (opener) {
      var dialog = document.getElementById(
        opener.getAttribute("data-dialog-open"),
      );
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
      return;
    }

    var closer = target.closest("[data-dialog-close]");
    if (closer) {
      var parent = closer.closest("dialog");
      if (parent) {
        parent.close();
      }
      return;
    }

    /* A click on the backdrop lands on the <dialog> element itself. */
    if (target instanceof HTMLDialogElement && target.open) {
      var box = target.getBoundingClientRect();
      var isOutside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;
      if (isOutside) {
        target.close();
      }
      return;
    }

    var toggle = target.closest(".toggle-group-item");
    if (toggle) {
      handleToggleGroup(toggle);
    }

    var dropdown = target.closest("details.dropdown");
    var isMenuItem = target.closest(".menu-item") !== null;
    closeDropdowns(isMenuItem ? null : dropdown);
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeDropdowns(null);
      return;
    }
    var handle =
      event.target instanceof Element
        ? event.target.closest(".split-handle")
        : null;
    if (handle) {
      handleSplitKey(event, handle);
      return;
    }
    var isArrow = event.key === "ArrowRight" || event.key === "ArrowLeft";
    var tab =
      event.target instanceof Element
        ? event.target.closest("[data-tab]")
        : null;
    if (!isArrow || !tab) {
      return;
    }
    var tabs = tab.closest("[data-tabs]");
    var triggers = Array.prototype.filter.call(
      tabs.querySelectorAll("[data-tab]"),
      function (trigger) {
        return trigger.closest("[data-tabs]") === tabs && !trigger.disabled;
      },
    );
    var step = event.key === "ArrowRight" ? 1 : -1;
    var next =
      triggers[
        (triggers.indexOf(tab) + step + triggers.length) % triggers.length
      ];
    selectTab(tabs, next.getAttribute("data-tab"));
    next.focus();
    event.preventDefault();
  }

  /* Split: the first pane's size is a percentage of the container, kept between 15 and 85. */
  var activeSplit = null;

  function isVerticalSplit(container) {
    return container.getAttribute("data-direction") === "vertical";
  }

  function setSplitSize(handle, size) {
    var pane = handle.previousElementSibling;
    if (!pane) {
      return;
    }
    var clamped = Math.min(85, Math.max(15, size));
    pane.style.flex = "0 0 " + clamped + "%";
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  }

  function getSplitSize(handle) {
    var current = Number(handle.getAttribute("aria-valuenow"));
    return current > 0 ? current : 40;
  }

  function handleSplitKey(event, handle) {
    var isVertical = isVerticalSplit(handle.parentElement);
    var step = event.shiftKey ? 10 : 2;
    var current = getSplitSize(handle);
    if (event.key === (isVertical ? "ArrowUp" : "ArrowLeft")) {
      setSplitSize(handle, current - step);
    } else if (event.key === (isVertical ? "ArrowDown" : "ArrowRight")) {
      setSplitSize(handle, current + step);
    } else if (event.key === "Home") {
      setSplitSize(handle, 15);
    } else if (event.key === "End") {
      setSplitSize(handle, 85);
    } else {
      return;
    }
    event.preventDefault();
  }

  function handlePointerDown(event) {
    var handle =
      event.target instanceof Element
        ? event.target.closest(".split-handle")
        : null;
    if (!handle) {
      return;
    }
    activeSplit = handle;
    handle.setAttribute("data-dragging", "");
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function handlePointerMove(event) {
    if (!activeSplit) {
      return;
    }
    var container = activeSplit.parentElement;
    var box = container.getBoundingClientRect();
    var ratio = isVerticalSplit(container)
      ? (event.clientY - box.top) / box.height
      : (event.clientX - box.left) / box.width;
    setSplitSize(activeSplit, ratio * 100);
  }

  function handlePointerUp() {
    if (activeSplit) {
      activeSplit.removeAttribute("data-dragging");
      activeSplit = null;
    }
  }

  function initSplits(scope) {
    scope.querySelectorAll(".split-handle").forEach(function (handle) {
      handle.setAttribute("role", "separator");
      handle.setAttribute("tabindex", "0");
      handle.setAttribute("aria-valuemin", "15");
      handle.setAttribute("aria-valuemax", "85");
      if (!handle.hasAttribute("aria-label")) {
        handle.setAttribute("aria-label", "Resize panes");
      }
      setSplitSize(handle, getSplitSize(handle));
    });
  }

  function getLayer(className, label) {
    var layer = document.querySelector("." + className);
    if (!layer) {
      layer = document.createElement("div");
      layer.className = className;
      layer.setAttribute("aria-live", "polite");
      if (label) {
        layer.setAttribute("role", "region");
        layer.setAttribute("aria-label", label);
      }
      document.body.appendChild(layer);
    }
    return layer;
  }

  /* Note: the toast with a body. Text only (no HTML is interpreted). Returns a dismiss function. */
  function notify(options) {
    var settings = options || {};
    var element = document.createElement("div");
    element.className =
      "note" + (settings.tone ? " note-" + settings.tone : "");
    element.setAttribute("role", "status");

    var title = document.createElement("div");
    title.className = "note-title";
    title.textContent = settings.title || "";
    element.appendChild(title);

    var close = document.createElement("button");
    close.type = "button";
    close.className = "note-close";
    close.setAttribute("aria-label", "Dismiss");
    close.setAttribute("data-dismiss", "");
    close.textContent = "×";
    element.appendChild(close);

    if (settings.description) {
      var description = document.createElement("div");
      description.className = "note-description";
      description.textContent = settings.description;
      element.appendChild(description);
    }

    getLayer("note-layer", "Notifications").appendChild(element);
    function dismiss() {
      element.remove();
    }
    var duration = settings.duration === undefined ? 5000 : settings.duration;
    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
    return dismiss;
  }

  /* Rubber stamp: Dovetail's toast. Says one word, then leaves. */
  function stamp(text, options) {
    var settings = options || {};
    var layer = getLayer("stamp-layer");
    var element = document.createElement("div");
    element.className =
      "stamp stamp-animate" + (settings.tone ? " stamp-" + settings.tone : "");
    element.textContent = text;
    layer.appendChild(element);
    setTimeout(function () {
      element.remove();
    }, settings.duration || 2400);
    return element;
  }

  function init(scope) {
    initTabs(scope || document);
    initSplits(scope || document);
  }

  initTheme();
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("pointerdown", handlePointerDown);
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
  document.addEventListener("pointercancel", handlePointerUp);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init(document);
    });
  } else {
    init(document);
  }

  window.Dovetail = {
    init: init,
    getTheme: getTheme,
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    stamp: stamp,
    notify: notify,
  };
})();
