'use strict';

/**
 * Reusable UI component primitives for the Persian News Agency frontend.
 * Exposed on window.NewsComponents so scripts work over both http(s):// and file://.
 */
window.NewsComponents = (() => {
    /**
     * Update ARIA expanded/hidden attributes and hidden class on a disclosure panel.
     * @param {HTMLElement | null} triggerEl
     * @param {HTMLElement | null} panelEl
     * @param {boolean} isOpen
     */
    function setDisclosureState(triggerEl, panelEl, isOpen) {
        if (triggerEl) {
            triggerEl.setAttribute('aria-expanded', String(isOpen));
        }
        if (panelEl) {
            panelEl.classList.toggle('hidden', !isOpen);
            panelEl.setAttribute('aria-hidden', String(!isOpen));
        }
    }

    /**
     * Register a global Escape-key handler that invokes the provided callback.
     * @param {() => void} onEscape
     * @returns {() => void} Cleanup function
     */
    function bindEscapeKey(onEscape) {
        if (typeof onEscape !== 'function') {
            return () => {};
        }

        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                onEscape();
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }

    /**
     * Initialize accessible ARIA tab switching within a container.
     * @param {HTMLElement | null} containerEl
     * @param {(tabName: string) => void} [onTabChange]
     * @returns {{ activateTab: (tabName: string) => void }}
     */
    function initTabs(containerEl, onTabChange) {
        if (!containerEl) {
            return { activateTab: () => {} };
        }

        const tabButtons = Array.from(containerEl.querySelectorAll('[role="tab"]'));
        const tabPanels = Array.from(containerEl.querySelectorAll('[role="tabpanel"]'));

        const activateTab = (tabName) => {
            tabButtons.forEach((btn) => {
                const isSelected = btn.dataset.tabTarget === tabName;
                btn.setAttribute('aria-selected', String(isSelected));
                btn.classList.toggle('bg-white', isSelected);
                btn.classList.toggle('dark:bg-slate-800', isSelected);
                btn.classList.toggle('text-primary', isSelected);
                btn.classList.toggle('dark:text-red-400', isSelected);
                btn.classList.toggle('shadow-sm', isSelected);
                btn.classList.toggle('text-slate-600', !isSelected);
                btn.classList.toggle('dark:text-slate-400', !isSelected);
            });

            tabPanels.forEach((panel) => {
                const isMatch = panel.dataset.tabPanel === tabName;
                panel.classList.toggle('hidden', !isMatch);
                panel.setAttribute('aria-hidden', String(!isMatch));
            });

            if (typeof onTabChange === 'function') {
                onTabChange(tabName);
            }
        };

        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (btn.dataset.tabTarget) {
                    activateTab(btn.dataset.tabTarget);
                }
            });

            btn.addEventListener('keydown', (event) => {
                const isRtl = document.documentElement.dir === 'rtl';
                const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
                const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
                let targetIndex = null;

                if (event.key === nextKey) {
                    targetIndex = (index + 1) % tabButtons.length;
                } else if (event.key === prevKey) {
                    targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                } else if (event.key === 'Home') {
                    targetIndex = 0;
                } else if (event.key === 'End') {
                    targetIndex = tabButtons.length - 1;
                }

                if (targetIndex !== null) {
                    event.preventDefault();
                    const nextBtn = tabButtons[targetIndex];
                    if (nextBtn && nextBtn.dataset.tabTarget) {
                        activateTab(nextBtn.dataset.tabTarget);
                        nextBtn.focus();
                    }
                }
            });
        });

        return { activateTab };
    }

    /**
     * Initialize hover and keyboard-accessible full-width mega menu dropdowns.
     * @param {HTMLElement | null} navEl
     */
    function initMegaMenu(navEl) {
        if (!navEl) return;

        const triggers = Array.from(navEl.querySelectorAll('[data-mega-trigger]'));
        const panels = Array.from(navEl.querySelectorAll('[data-mega-panel]'));
        if (!triggers.length || !panels.length) return;

        let activeKey = null;
        let closeTimerId = null;

        const clearCloseTimer = () => {
            if (closeTimerId !== null) {
                window.clearTimeout(closeTimerId);
                closeTimerId = null;
            }
        };

        const setPanelState = (key, isOpen) => {
            const trigger = triggers.find((el) => el.dataset.megaTrigger === key);
            const panel = panels.find((el) => el.dataset.megaPanel === key);
            if (trigger) {
                trigger.setAttribute('aria-expanded', String(isOpen));
            }
            if (panel) {
                panel.classList.toggle('is-open', isOpen);
                panel.setAttribute('aria-hidden', String(!isOpen));
            }
        };

        const closeAll = () => {
            clearCloseTimer();
            if (activeKey) {
                setPanelState(activeKey, false);
                activeKey = null;
            }
        };

        const openMenu = (key) => {
            clearCloseTimer();
            if (activeKey && activeKey !== key) {
                setPanelState(activeKey, false);
            }
            activeKey = key;
            setPanelState(key, true);
        };

        const scheduleClose = () => {
            clearCloseTimer();
            closeTimerId = window.setTimeout(closeAll, 140);
        };

        triggers.forEach((trigger) => {
            const key = trigger.dataset.megaTrigger;
            const wrapper = trigger.closest('[data-mega-item]') || trigger;

            wrapper.addEventListener('mouseenter', () => openMenu(key));
            wrapper.addEventListener('mouseleave', scheduleClose);

            trigger.addEventListener('focus', () => openMenu(key));
            trigger.addEventListener('click', (event) => {
                // Allow direct click to toggle on touch/keyboard without abrupt navigation
                event.preventDefault();
                if (activeKey === key) {
                    closeAll();
                } else {
                    openMenu(key);
                }
            });
        });

        panels.forEach((panel) => {
            const key = panel.dataset.megaPanel;
            panel.addEventListener('mouseenter', () => openMenu(key));
            panel.addEventListener('mouseleave', scheduleClose);
        });

        document.addEventListener('click', (event) => {
            if (event.target instanceof Node && !navEl.contains(event.target)) {
                closeAll();
            }
        });

        bindEscapeKey(closeAll);
    }

    return {
        setDisclosureState,
        bindEscapeKey,
        initTabs,
        initMegaMenu,
    };
})();
