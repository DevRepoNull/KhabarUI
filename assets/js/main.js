'use strict';

/**
 * Main application logic for the Persian News Agency frontend.
 */
(() => {
    const getComponents = () => window.NewsComponents || null;

    /**
     * Update disclosure trigger and panel visibility safely even without NewsComponents.
     * @param {HTMLElement | null} triggerEl
     * @param {HTMLElement | null} panelEl
     * @param {boolean} isOpen
     */
    function setDisclosureState(triggerEl, panelEl, isOpen) {
        const ui = getComponents();
        if (ui && typeof ui.setDisclosureState === 'function') {
            ui.setDisclosureState(triggerEl, panelEl, isOpen);
            return;
        }
        if (triggerEl) {
            triggerEl.setAttribute('aria-expanded', String(isOpen));
        }
        if (panelEl) {
            panelEl.classList.toggle('hidden', !isOpen);
            panelEl.setAttribute('aria-hidden', String(!isOpen));
        }
    }

    /**
     * Register a global Escape-key handler safely even without NewsComponents.
     * @param {() => void} onEscape
     * @returns {() => void}
     */
    function bindEscapeKey(onEscape) {
        if (typeof onEscape !== 'function') return () => {};
        const ui = getComponents();
        if (ui && typeof ui.bindEscapeKey === 'function') {
            return ui.bindEscapeKey(onEscape);
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
     * Initialize accessible ARIA tabs safely even without NewsComponents.
     * @param {HTMLElement | null} containerEl
     * @param {(tabName: string) => void} [onTabChange]
     * @returns {{ activateTab: (tabName: string) => void }}
     */
    function initTabs(containerEl, onTabChange) {
        const ui = getComponents();
        if (ui && typeof ui.initTabs === 'function') {
            return ui.initTabs(containerEl, onTabChange);
        }
        return { activateTab: () => {} };
    }

    /**
     * Initialize desktop mega menu dropdowns safely even without NewsComponents.
     * @param {HTMLElement | null} navEl
     */
    function initMegaMenu(navEl) {
        const ui = getComponents();
        if (ui && typeof ui.initMegaMenu === 'function') {
            ui.initMegaMenu(navEl);
        }
    }

    const currentScriptEl = document.currentScript;
    const scriptSrcAttr = currentScriptEl ? (currentScriptEl.getAttribute('src') || '') : '';
    const assetPrefixMatch = scriptSrcAttr.match(/^(.*)assets\/js\//);
    const PROJECT_ROOT = assetPrefixMatch ? assetPrefixMatch[1] : '';
    const ASSET_ROOT = `${PROJECT_ROOT}assets/`;
    const normalizedPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();
    const isAdminDir = /(?:^|\/)admin\/[^/]*$/.test(normalizedPath);
    const isFrontendDir = /(?:^|\/)frontend\/[^/]*$/.test(normalizedPath);
    const FRONTEND_BASE = isFrontendDir ? '' : `${PROJECT_ROOT}frontend/`;
    const ADMIN_BASE = isAdminDir ? '' : `${PROJECT_ROOT}admin/`;

    const resolveAsset = (relativePath) => `${ASSET_ROOT}${String(relativePath || '').replace(/^\/+/, '')}`;
    const resolveFrontendUrl = (page) => `${FRONTEND_BASE}${String(page || '').replace(/^\/+/, '')}`;
    const resolveAdminUrl = (page) => `${ADMIN_BASE}${String(page || '').replace(/^\/+/, '')}`;

    const THEME_STORAGE_KEY = 'news-agency-theme';
    const POLL_STORAGE_KEY = 'news-agency-daily-poll-vote';
    const FONT_STEP_STORAGE_KEY = 'news-agency-article-font-step';
    const BOOKMARKS_STORAGE_KEY = 'news-agency-bookmarked-articles';
    const PROFILE_STORAGE_KEY = 'news-agency-user-profile';

    const ARTICLE_CATALOG = {
        'digital-corridor-roadmap': {
            id: 'digital-corridor-roadmap',
            title: 'سند تحول زیرساخت‌های دیجیتال و اتصال کریدورهای صادراتی تصویب شد',
            category: 'اقتصاد و فناوری',
            excerpt: 'جزئیات سرمایه‌گذاری پنج‌ساله در مراکز داده، شبکه فیبر نوری و هوشمندسازی پایانه‌های تجاری و گمرکی تشریح گردید.',
            image: resolveAsset('images/hero-banner.jpg'),
            date: 'چهارشنبه ۲۰ آبان ۱۴۰۵',
            href: resolveFrontendUrl('single.html'),
        },
        'ai-chips-launch': {
            id: 'ai-chips-launch',
            title: 'نسل جدید تراشه‌های کم‌مصرف با شتاب‌دهنده بومی هوش مصنوعی وارد بازار شد',
            category: 'فناوری',
            excerpt: 'این پردازنده‌ها امکان اجرای مدل‌های زبانی سبک‌وزن را بدون نیاز به اتصال دائم اینترنت فراهم می‌کنند.',
            image: resolveAsset('images/news-1.jpg'),
            date: 'چهارشنبه ۲۰ آبان ۱۴۰۵',
            href: resolveFrontendUrl('single.html'),
        },
        'post-quantum-cloud': {
            id: 'post-quantum-cloud',
            title: 'استانداردهای تازه رمزنگاری پساکوانتومی در زیرساخت‌های ابری معرفی شد',
            category: 'امنیت سایبری',
            excerpt: 'راهکارهای مهاجرت تدریجی سامانه‌های بانکی و مخابراتی به الگوریتم‌های مقاوم بررسی شد.',
            image: resolveAsset('images/news-2.jpg'),
            date: 'چهارشنبه ۲۰ آبان ۱۴۰۵',
            href: resolveFrontendUrl('single.html'),
        },
        'silicon-carbon-battery': {
            id: 'silicon-carbon-battery',
            title: 'نگاهی به فناوری باتری‌های سیلیکون-کربن و آینده شارژ سریع موبایل',
            category: 'موبایل و گجت',
            excerpt: 'چگالی انرژی بالاتر در ابعاد باریک‌تر موجب شارژدهی دوروزه در گوشی‌های هوشمند جدید شده است.',
            image: resolveAsset('images/news-3.jpg'),
            date: 'سه‌شنبه ۱۹ آبان ۱۴۰۵',
            href: resolveFrontendUrl('single.html'),
        },
    };

    const AVATAR_POOL = {
        male: [
            resolveAsset('images/avatar-7.jpg'),
            resolveAsset('images/avatar-4.jpg'),
            resolveAsset('images/avatar-3.jpg'),
            resolveAsset('images/avatar-8.jpg'),
        ],
        female: [
            resolveAsset('images/avatar-2.jpg'),
            resolveAsset('images/avatar-5.jpg'),
            resolveAsset('images/avatar-6.jpg'),
        ],
        editorial: {
            'مهراد کاظمی': resolveAsset('images/avatar.jpg'),
            'نسرین محمدی': resolveAsset('images/avatar-2.jpg'),
            'امیرحسین نادری': resolveAsset('images/avatar-3.jpg'),
            'پویا رضایی': resolveAsset('images/avatar-4.jpg'),
            'سارا فرهادی': resolveAsset('images/avatar-5.jpg'),
            'سارا محمدی': resolveAsset('images/avatar-6.jpg'),
        },
    };

    const FEMALE_NAME_HINTS = [
        'سارا', 'مریم', 'نسرین', 'نیلوفر', 'شیرین', 'نازنین', 'نگین', 'زهرا', 'فاطمه',
        'لیلا', 'الهام', 'آزاده', 'مهسا', 'هستی', 'سپیده', 'مینا', 'پریسا', 'شیما',
    ];

    /**
     * Pick a face-framed portrait URL matching the editorial user or commenter name.
     * @param {string} name
     * @param {string} [explicitUrl]
     * @returns {string}
     */
    function pickAvatarUrl(name, explicitUrl = '') {
        if (explicitUrl && explicitUrl !== 'auto') {
            return explicitUrl;
        }
        const cleanName = String(name || '').trim();
        if (cleanName && AVATAR_POOL.editorial[cleanName]) {
            return AVATAR_POOL.editorial[cleanName];
        }
        const firstToken = cleanName.split(/\s+/)[0] || '';
        const pool = FEMALE_NAME_HINTS.includes(firstToken) ? AVATAR_POOL.female : AVATAR_POOL.male;
        let hash = 0;
        for (let i = 0; i < cleanName.length; i += 1) {
            hash = (hash * 31 + cleanName.charCodeAt(i)) >>> 0;
        }
        return pool[hash % pool.length];
    }

    /**
     * Build a crisp local SVG monogram data-URI used if an external avatar image fails to load.
     * @param {string} label
     * @returns {string}
     */
    function buildInitialsAvatarDataUri(label) {
        const clean = String(label || '')
            .replace(/^(تصویر|نمایه)\s+/u, '')
            .split('-')[0]
            .trim();
        const initial = (clean[0] || 'ر').toUpperCase();
        const palette = ['#8B0000', '#1E3A8A', '#0F766E', '#6D28D9', '#B45309'];
        let code = 0;
        for (let i = 0; i < clean.length; i += 1) {
            code += clean.charCodeAt(i);
        }
        const bg = palette[code % palette.length];
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="${initial}"><rect width="96" height="96" rx="48" fill="${bg}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-family="Vazirmatn,Tahoma,sans-serif" font-size="38" font-weight="700">${initial}</text></svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    /**
     * Ensure an avatar <img> degrades cleanly to an initials monogram if offline or blocked.
     * @param {HTMLImageElement | null} imgEl
     * @param {string} [label]
     */
    function attachAvatarFallback(imgEl, label = '') {
        if (!imgEl || imgEl.dataset.fallbackBound === '1') return;
        imgEl.dataset.fallbackBound = '1';
        const fallbackLabel = label || imgEl.alt || 'کاربر';
        const applyFallback = () => {
            if (imgEl.dataset.fallbackApplied === '1') return;
            imgEl.dataset.fallbackApplied = '1';
            imgEl.src = buildInitialsAvatarDataUri(fallbackLabel);
        };
        imgEl.addEventListener('error', applyFallback);
        if (imgEl.complete && imgEl.naturalWidth === 0) {
            applyFallback();
        }
    }

    /**
     * Attach offline/error monogram fallbacks to all user/author profile avatars on the page.
     */
    function initAvatarFallbacks() {
        document
            .querySelectorAll('img.rounded-full, img[alt^="تصویر "], img[alt^="نمایه "]')
            .forEach((imgEl) => {
                if (imgEl instanceof HTMLImageElement) {
                    attachAvatarFallback(imgEl, imgEl.alt);
                }
            });
    }

    const STATUS_CLASSES = {
        error: [
            'bg-red-50',
            'text-red-800',
            'border-red-200',
            'dark:bg-red-950/60',
            'dark:text-red-200',
            'dark:border-red-900',
        ],
        success: [
            'bg-emerald-50',
            'text-emerald-800',
            'border-emerald-200',
            'dark:bg-emerald-950/60',
            'dark:text-emerald-200',
            'dark:border-emerald-900',
        ],
    };

    /**
     * Display or clear a styled status banner message.
     * @param {HTMLElement | null} bannerEl
     * @param {string} message
     * @param {boolean} isError
     */
    function setStatusBanner(bannerEl, message, isError = false) {
        if (!bannerEl) return;
        const allStatusClasses = [...STATUS_CLASSES.error, ...STATUS_CLASSES.success];
        bannerEl.classList.remove(...allStatusClasses);

        if (!message) {
            bannerEl.textContent = '';
            bannerEl.classList.add('hidden');
            return;
        }

        bannerEl.textContent = message;
        bannerEl.classList.remove('hidden');
        bannerEl.classList.add(...(isError ? STATUS_CLASSES.error : STATUS_CLASSES.success));
    }

    /**
     * Format and render today's Persian (Jalali) date into the Top Bar.
     */
    function initPersianDate() {
        const dateEl = document.getElementById('persian-date');
        if (!dateEl) return;

        const now = new Date();
        dateEl.setAttribute('datetime', now.toISOString().split('T')[0]);

        try {
            const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            const parts = formatter.formatToParts(now);
            const getPart = (type) => parts.find((part) => part.type === type)?.value || '';
            const weekday = getPart('weekday');
            const day = getPart('day');
            const month = getPart('month');
            const year = getPart('year');

            dateEl.textContent =
                weekday && day && month && year
                    ? `${weekday}، ${day} ${month} ${year}`
                    : formatter.format(now);
        } catch (_err) {
            dateEl.textContent = now.toLocaleDateString('fa-IR');
        }
    }

    /**
     * Resolve, apply, and persist Dark/Light theme state in localStorage.
     */
    function initThemeManager() {
        const toggleBtn = document.getElementById('theme-toggle-btn');

        const getPreferredTheme = () => {
            try {
                const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
                if (stored === 'dark' || stored === 'light') {
                    return stored;
                }
            } catch (_err) {
                // Ignore storage restrictions
            }
            const prefersDark =
                typeof window.matchMedia === 'function' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        };

        const applyTheme = (theme, persist) => {
            const isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDark);
            document.documentElement.classList.toggle('light', !isDark);

            if (toggleBtn) {
                toggleBtn.setAttribute('aria-checked', String(isDark));
                toggleBtn.setAttribute(
                    'aria-label',
                    isDark ? 'فعال‌سازی حالت روشن' : 'فعال‌سازی حالت تاریک'
                );
            }

            if (persist) {
                try {
                    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
                } catch (_err) {
                    // Ignore storage restrictions
                }
            }
        };

        applyTheme(getPreferredTheme(), false);

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const nextTheme = document.documentElement.classList.contains('dark')
                    ? 'light'
                    : 'dark';
                applyTheme(nextTheme, true);
            });
        }
    }

    /**
     * Initialize Auth Modal open/close handlers, Login/Register tabs, and form feedback.
     */
    function initAuthModal() {
        const modal = document.getElementById('auth-modal');
        const backdrop = document.getElementById('auth-modal-backdrop');
        const closeBtn = document.getElementById('auth-modal-close-btn');
        const openTriggers = Array.from(document.querySelectorAll('[data-auth-open]'));
        const feedbackEl = document.getElementById('auth-feedback');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (!modal || !openTriggers.length) return;

        let lastTriggerEl = null;

        const showFeedback = (message, isError) => setStatusBanner(feedbackEl, message, isError);
        const clearFeedback = () => setStatusBanner(feedbackEl, '', false);

        const tabController = initTabs(modal, () => {
            clearFeedback();
            if (window.RasadUI && typeof window.RasadUI.resetPasswordVisibility === 'function') {
                window.RasadUI.resetPasswordVisibility(modal);
            }
        });

        const openModal = (triggerEl, initialTab = 'login') => {
            lastTriggerEl = triggerEl || openTriggers[0];
            clearFeedback();
            if (window.RasadUI && typeof window.RasadUI.resetPasswordVisibility === 'function') {
                window.RasadUI.resetPasswordVisibility(modal);
            }
            tabController.activateTab(initialTab);

            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            openTriggers.forEach((btn) => btn.setAttribute('aria-expanded', 'true'));

            const activeInput = modal.querySelector(
                `[data-tab-panel="${initialTab}"] input:not([type="checkbox"])`
            );
            if (activeInput) {
                window.requestAnimationFrame(() => activeInput.focus());
            }
        };

        const closeModal = () => {
            if (modal.classList.contains('hidden')) return;

            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            openTriggers.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));

            if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
                lastTriggerEl.focus();
            }
        };

        openTriggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                openModal(trigger, trigger.dataset.authOpen || 'login');
            });
        });

        window.RasadUI = window.RasadUI || {};
        window.RasadUI.closeAuthModal = closeModal;

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }

        bindEscapeKey(closeModal);

        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                if (loginForm.dataset.justValidate === 'true') return;
                const emailInput = document.getElementById('login-email');
                const passwordInput = document.getElementById('login-password');
                const email = emailInput ? emailInput.value.trim() : '';
                const password = passwordInput ? passwordInput.value : '';

                if (!email || !password) {
                    showFeedback('لطفاً ایمیل و رمز عبور خود را وارد کنید.', true);
                    return;
                }

                showFeedback(`ورود با ایمیل ${email} با موفقیت انجام شد.`, false);
                loginForm.reset();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                if (registerForm.dataset.justValidate === 'true') return;
                const nameInput = document.getElementById('register-name');
                const emailInput = document.getElementById('register-email');
                const passwordInput = document.getElementById('register-password');
                const confirmInput = document.getElementById('register-confirm-password');

                const fullName = nameInput ? nameInput.value.trim() : '';
                const email = emailInput ? emailInput.value.trim() : '';
                const password = passwordInput ? passwordInput.value : '';
                const confirmPassword = confirmInput ? confirmInput.value : '';

                if (!fullName || !email || !password || !confirmPassword) {
                    showFeedback('لطفاً تمامی فیلدهای ثبت‌نام را تکمیل کنید.', true);
                    return;
                }

                if (password !== confirmPassword) {
                    showFeedback('رمز عبور و تکرار آن مطابقت ندارند.', true);
                    if (confirmInput) confirmInput.focus();
                    return;
                }

                showFeedback(`حساب کاربری برای ${fullName} با موفقیت ایجاد شد.`, false);
                registerForm.reset();
            });
        }
    }

    /**
     * Initialize desktop Mega Menu and mobile navigation drawer.
     */
    function initNavigation() {
        const primaryNav = document.getElementById('primary-nav');
        if (primaryNav) {
            initMegaMenu(primaryNav);
        }

        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const iconOpen = document.getElementById('mobile-icon-open');
        const iconClose = document.getElementById('mobile-icon-close');

        if (!mobileBtn || !mobileMenu) return;

        const accordions = Array.from(mobileMenu.querySelectorAll('[data-mobile-accordion]'));

        const setAccordionState = (accordionEl, isOpen) => {
            const trigger = accordionEl.querySelector('[data-accordion-trigger]');
            const panel = accordionEl.querySelector('[data-accordion-panel]');
            const icon = accordionEl.querySelector('[data-accordion-icon]');
            if (!trigger || !panel) return;

            trigger.setAttribute('aria-expanded', String(isOpen));
            panel.setAttribute('aria-hidden', String(!isOpen));
            panel.classList.toggle('grid-rows-[1fr]', isOpen);
            panel.classList.toggle('opacity-100', isOpen);
            panel.classList.toggle('mt-1', isOpen);
            panel.classList.toggle('grid-rows-[0fr]', !isOpen);
            panel.classList.toggle('opacity-0', !isOpen);
            if (icon) {
                icon.classList.toggle('rotate-180', isOpen);
            }
        };

        const closeAllAccordions = (exceptEl = null) => {
            accordions.forEach((accordionEl) => {
                if (accordionEl !== exceptEl) {
                    setAccordionState(accordionEl, false);
                }
            });
        };

        accordions.forEach((accordionEl) => {
            const trigger = accordionEl.querySelector('[data-accordion-trigger]');
            if (!trigger) return;

            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                closeAllAccordions(accordionEl);
                setAccordionState(accordionEl, !isExpanded);
            });
        });

        const setMobileMenuOpen = (isOpen) => {
            setDisclosureState(mobileBtn, mobileMenu, isOpen);
            mobileBtn.setAttribute('aria-label', isOpen ? 'بستن منو' : 'باز کردن منو');
            if (iconOpen) iconOpen.classList.toggle('hidden', isOpen);
            if (iconClose) iconClose.classList.toggle('hidden', !isOpen);
            if (!isOpen) {
                closeAllAccordions();
            }
        };

        mobileBtn.addEventListener('click', () => {
            const shouldOpen = mobileMenu.classList.contains('hidden');
            setMobileMenuOpen(shouldOpen);
        });

        mobileMenu.querySelectorAll('[data-mobile-close]').forEach((el) => {
            el.addEventListener('click', () => setMobileMenuOpen(false));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        });

        bindEscapeKey(() => setMobileMenuOpen(false));
    }

    /**
     * Initialize sidebar tabbed news widget and daily poll interactions.
     */
    function initSidebarWidgets() {
        const sidebarTabsEl = document.getElementById('sidebar-tabs-widget');
        if (sidebarTabsEl) {
            initTabs(sidebarTabsEl);
        }

        const pollForm = document.getElementById('daily-poll-form');
        const pollFeedbackEl = document.getElementById('poll-feedback');
        const pollResultsEl = document.getElementById('poll-results');
        const pollTotalEl = document.getElementById('poll-total-votes');
        const pollSubmitBtn = document.getElementById('poll-submit-btn');

        if (!pollForm || !pollResultsEl) return;

        const baseVotes = {
            ai: 142,
            video: 86,
            analysis: 94,
            mobile: 48,
        };

        const renderPollResults = (selectedKey) => {
            const counts = { ...baseVotes };
            if (selectedKey && Object.prototype.hasOwnProperty.call(counts, selectedKey)) {
                counts[selectedKey] += 1;
            }

            const total = Object.values(counts).reduce((sum, val) => sum + val, 0);

            Object.entries(counts).forEach(([key, count]) => {
                const rowEl = pollResultsEl.querySelector(`[data-poll-result="${key}"]`);
                if (!rowEl) return;
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                const percentEl = rowEl.querySelector('[data-poll-percent]');
                const progressEl = rowEl.querySelector('progress');

                if (percentEl) {
                    percentEl.textContent = `${percent.toLocaleString('fa-IR')}٪`;
                }
                if (progressEl) {
                    progressEl.value = percent;
                }
            });

            if (pollTotalEl) {
                pollTotalEl.textContent = `مجموع آرا: ${total.toLocaleString('fa-IR')} رأی`;
            }

            pollResultsEl.classList.remove('hidden');
            pollResultsEl.setAttribute('aria-hidden', 'false');
        };

        const lockVotedForm = (choiceKey) => {
            const matchedRadio = pollForm.querySelector(
                `input[name="daily-poll"][value="${choiceKey}"]`
            );
            if (matchedRadio) {
                matchedRadio.checked = true;
            }
            pollForm.querySelectorAll('input[name="daily-poll"]').forEach((input) => {
                input.disabled = true;
            });
            if (pollSubmitBtn) {
                pollSubmitBtn.disabled = true;
                pollSubmitBtn.textContent = 'رأی شما ثبت شد';
                pollSubmitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            }
        };

        try {
            const savedChoice = window.localStorage.getItem(POLL_STORAGE_KEY);
            if (savedChoice && Object.prototype.hasOwnProperty.call(baseVotes, savedChoice)) {
                lockVotedForm(savedChoice);
                renderPollResults(savedChoice);
                setStatusBanner(pollFeedbackEl, 'رأی پیشین شما در این نظرسنجی ثبت شده است.', false);
            }
        } catch (_err) {
            // Ignore storage restrictions
        }

        pollForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const checkedRadio = pollForm.querySelector('input[name="daily-poll"]:checked');

            if (!checkedRadio) {
                setStatusBanner(pollFeedbackEl, 'لطفاً یکی از گزینه‌ها را انتخاب کنید.', true);
                return;
            }

            const choice = checkedRadio.value;
            try {
                window.localStorage.setItem(POLL_STORAGE_KEY, choice);
            } catch (_err) {
                // Ignore storage restrictions
            }

            lockVotedForm(choice);
            renderPollResults(choice);
            setStatusBanner(pollFeedbackEl, 'رأی شما با موفقیت ثبت شد.', false);
        });
    }

    const SVG_NS = 'http://www.w3.org/2000/svg';

    const TOAST_ICON_PATHS = {
        success: 'M5 13l4 4L19 7',
        error: 'M6 18L18 6M6 6l12 12',
        info: 'M13 16h-1v-4h-1m1-4h.01M12 21a9 9 0 110-18 9 9 0 010 18z',
    };

    /**
     * Build an accessible SVG icon matching the toast notification variant.
     * @param {'success' | 'error' | 'info'} type
     * @returns {SVGSVGElement}
     */
    function createToastIcon(type) {
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('class', 'w-4 h-4');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2.2');
        svg.setAttribute('aria-hidden', 'true');

        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('d', TOAST_ICON_PATHS[type] || TOAST_ICON_PATHS.info);

        svg.appendChild(path);
        return svg;
    }

    /**
     * Dynamically create and display a floating toast popup at the bottom-left corner.
     * Slides in via CSS transition, stays visible for 3 seconds, slides out, and removes itself.
     * @param {string} message
     * @param {'success' | 'error' | 'info'} [type='info']
     */
    function showToast(message, type = 'info') {
        if (!message || !document.body) return;

        const safeType = Object.prototype.hasOwnProperty.call(TOAST_ICON_PATHS, type)
            ? type
            : 'info';

        let stackEl = document.getElementById('toast-stack');
        if (!stackEl) {
            stackEl = document.createElement('div');
            stackEl.id = 'toast-stack';
            stackEl.className = 'toast-stack';
            stackEl.setAttribute('aria-live', 'polite');
            stackEl.setAttribute('aria-label', 'اعلان‌های وضعیت');
            document.body.appendChild(stackEl);
        }

        const toastEl = document.createElement('div');
        toastEl.className = `toast-item toast-item--${safeType}`;
        toastEl.setAttribute('role', safeType === 'error' ? 'alert' : 'status');

        const iconWrap = document.createElement('span');
        iconWrap.className = 'toast-item__icon';
        iconWrap.setAttribute('aria-hidden', 'true');
        iconWrap.appendChild(createToastIcon(safeType));

        const messageEl = document.createElement('span');
        messageEl.className = 'toast-item__message';
        messageEl.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'toast-item__close';
        closeBtn.setAttribute('aria-label', 'بستن اعلان');
        closeBtn.appendChild(createToastIcon('error'));

        toastEl.append(iconWrap, messageEl, closeBtn);
        stackEl.appendChild(toastEl);

        // Trigger CSS slide-in transition on the next frame
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                toastEl.classList.add('is-visible');
            });
        });

        let isDismissed = false;
        let autoDismissTimer = null;
        let removeFallbackTimer = null;

        const cleanupNode = () => {
            if (removeFallbackTimer !== null) {
                window.clearTimeout(removeFallbackTimer);
                removeFallbackTimer = null;
            }
            if (toastEl.parentNode) {
                toastEl.parentNode.removeChild(toastEl);
            }
            if (stackEl && stackEl.childElementCount === 0 && stackEl.parentNode) {
                stackEl.parentNode.removeChild(stackEl);
            }
        };

        const dismissToast = () => {
            if (isDismissed) return;
            isDismissed = true;

            if (autoDismissTimer !== null) {
                window.clearTimeout(autoDismissTimer);
                autoDismissTimer = null;
            }

            toastEl.classList.remove('is-visible');
            toastEl.addEventListener(
                'transitionend',
                (event) => {
                    if (event.target === toastEl) cleanupNode();
                },
                { once: true }
            );
            // Fallback ensures DOM removal when reduced-motion disables CSS transitions
            removeFallbackTimer = window.setTimeout(cleanupNode, 360);
        };

        closeBtn.addEventListener('click', dismissToast);
        autoDismissTimer = window.setTimeout(dismissToast, 3000);
    }

    window.showToast = showToast;

    /**
     * Update the top fixed reading progress bar based on window scroll percentage.
     */
    function initReadingProgress() {
        const progressBar = document.getElementById('reading-progress-bar');
        if (!progressBar) return;

        let ticking = false;

        const updateProgress = () => {
            ticking = false;
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const percent =
                scrollableHeight > 0
                    ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
                    : 0;

            progressBar.style.setProperty('--scroll-progress', `${percent.toFixed(2)}%`);
            progressBar.setAttribute('aria-valuenow', String(Math.round(percent)));
        };

        const requestUpdate = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(updateProgress);
            }
        };

        updateProgress();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });
    }

    /**
     * Initialize article text resizer (A+/A-), bookmark toggle, and share controls.
     */
    function initArticleAccessibility() {
        const bodyElements = Array.from(document.querySelectorAll('.article-body-text'));
        const increaseBtn = document.getElementById('font-increase-btn');
        const decreaseBtn = document.getElementById('font-decrease-btn');
        const sizeLabelEl = document.getElementById('font-size-label');

        if (bodyElements.length && increaseBtn && decreaseBtn) {
            const fontScale = [
                { className: 'text-sm', label: '۸۵٪' },
                { className: 'text-base', label: '۹۵٪' },
                { className: 'text-lg', label: '۱۰۰٪' },
                { className: 'text-xl', label: '۱۱۵٪' },
                { className: 'text-2xl', label: '۱۳۰٪' },
            ];
            let currentStep = 2;

            try {
                const savedStep = Number.parseInt(
                    window.localStorage.getItem(FONT_STEP_STORAGE_KEY) || '',
                    10
                );
                if (!Number.isNaN(savedStep) && savedStep >= 0 && savedStep < fontScale.length) {
                    currentStep = savedStep;
                }
            } catch (_err) {
                // Ignore storage restrictions
            }

            const applyFontStep = (persist) => {
                const allClasses = fontScale.map((item) => item.className);
                const active = fontScale[currentStep];

                bodyElements.forEach((el) => {
                    el.classList.remove(...allClasses);
                    el.classList.add(active.className);
                });

                if (sizeLabelEl) {
                    sizeLabelEl.textContent = active.label;
                }

                const atMin = currentStep === 0;
                const atMax = currentStep === fontScale.length - 1;
                decreaseBtn.disabled = atMin;
                increaseBtn.disabled = atMax;
                decreaseBtn.classList.toggle('opacity-40', atMin);
                decreaseBtn.classList.toggle('cursor-not-allowed', atMin);
                increaseBtn.classList.toggle('opacity-40', atMax);
                increaseBtn.classList.toggle('cursor-not-allowed', atMax);

                if (persist) {
                    try {
                        window.localStorage.setItem(FONT_STEP_STORAGE_KEY, String(currentStep));
                    } catch (_err) {
                        // Ignore storage restrictions
                    }
                }
            };

            applyFontStep(false);

            increaseBtn.addEventListener('click', () => {
                if (currentStep < fontScale.length - 1) {
                    currentStep += 1;
                    applyFontStep(true);
                }
            });

            decreaseBtn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep -= 1;
                    applyFontStep(true);
                }
            });
        }

        // Bookmark button with localStorage persistence + Toast notification
        const bookmarkBtn = document.getElementById('bookmark-btn');
        const bookmarkIcon = document.getElementById('bookmark-icon');
        const bookmarkLabel = document.getElementById('bookmark-label');

        if (bookmarkBtn) {
            const articleId = bookmarkBtn.dataset.articleId || window.location.pathname;

            const readBookmarks = () => {
                try {
                    const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
                    const parsed = raw ? JSON.parse(raw) : [];
                    return Array.isArray(parsed) ? parsed : [];
                } catch (_err) {
                    return [];
                }
            };

            const syncBookmarkUi = (isSaved) => {
                bookmarkBtn.setAttribute('aria-pressed', String(isSaved));
                bookmarkBtn.classList.toggle('bg-primary-50', isSaved);
                bookmarkBtn.classList.toggle('dark:bg-primary-950/60', isSaved);
                bookmarkBtn.classList.toggle('text-primary', isSaved);
                bookmarkBtn.classList.toggle('dark:text-red-400', isSaved);
                bookmarkBtn.classList.toggle('border-primary/40', isSaved);

                if (bookmarkIcon) {
                    bookmarkIcon.setAttribute('fill', isSaved ? 'currentColor' : 'none');
                }
                if (bookmarkLabel) {
                    bookmarkLabel.textContent = isSaved ? 'ذخیره شد' : 'ذخیره خبر';
                }
            };

            syncBookmarkUi(readBookmarks().includes(articleId));

            bookmarkBtn.addEventListener('click', () => {
                const bookmarks = readBookmarks();
                const exists = bookmarks.includes(articleId);
                const nextBookmarks = exists
                    ? bookmarks.filter((id) => id !== articleId)
                    : [...bookmarks, articleId];

                try {
                    window.localStorage.setItem(
                        BOOKMARKS_STORAGE_KEY,
                        JSON.stringify(nextBookmarks)
                    );
                } catch (_err) {
                    // Ignore storage restrictions
                }

                syncBookmarkUi(!exists);
                showToast(
                    !exists
                        ? 'خبر با موفقیت در فهرست علاقه‌مندی‌ها ذخیره شد.'
                        : 'خبر از فهرست علاقه‌مندی‌ها حذف شد.',
                    !exists ? 'success' : 'info'
                );
            });
        }

        // Share URLs & Copy Link button
        const shareTwitter = document.getElementById('share-twitter');
        const shareTelegram = document.getElementById('share-telegram');
        const copyLinkBtn = document.getElementById('copy-link-btn');
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        if (shareTwitter) {
            shareTwitter.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
        }
        if (shareTelegram) {
            shareTelegram.href = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`;
        }

        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                copyCurrentUrlWithToast('لینک خبر در حافظه کپی شد.');
            });
        }
    }

    /**
     * Copy the current page URL to the clipboard with a fallback and toast notification.
     * @param {string} successMessage
     */
    async function copyCurrentUrlWithToast(successMessage) {
        const url = window.location.href;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
            } else {
                const tempInput = document.createElement('textarea');
                tempInput.value = url;
                tempInput.setAttribute('readonly', '');
                tempInput.className = 'sr-only';
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
            showToast(successMessage, 'success');
        } catch (_err) {
            showToast('امکان کپی خودکار لینک در این مرورگر وجود ندارد.', 'error');
        }
    }

    /**
     * Build a safe DOM comment element using textContent (no raw HTML interpolation).
     * @param {string} authorName
     * @param {string} commentBody
     * @param {boolean} isReply
     * @returns {HTMLElement}
     */
    function createCommentElement(authorName, commentBody, isReply) {
        const article = document.createElement('article');
        article.className = isReply
            ? 'mt-4 mr-3 sm:mr-10 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80'
            : 'p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800';

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-start gap-3.5';

        const avatar = document.createElement('img');
        avatar.src = pickAvatarUrl(authorName);
        avatar.alt = `تصویر ${authorName}`;
        avatar.className = 'w-10 h-10 rounded-full object-cover object-top border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 shrink-0';
        attachAvatarFallback(avatar, authorName);

        const content = document.createElement('div');
        content.className = 'flex-1 min-w-0';

        const header = document.createElement('div');
        header.className = 'flex flex-wrap items-center justify-between gap-2 mb-1.5';

        const nameEl = document.createElement('span');
        nameEl.className = 'text-sm font-bold text-slate-900 dark:text-white';
        nameEl.textContent = authorName;

        const timeEl = document.createElement('time');
        timeEl.className = 'text-xs text-slate-500 dark:text-slate-400';
        timeEl.textContent = 'هم‌اکنون';

        header.append(nameEl, timeEl);

        const bodyEl = document.createElement('p');
        bodyEl.className = 'text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-7 break-words';
        bodyEl.textContent = commentBody;

        content.append(header, bodyEl);
        wrapper.append(avatar, content);
        article.appendChild(wrapper);
        return article;
    }

    /**
     * Initialize article comment submission and reply threading.
     */
    function initArticleComments() {
        const form = document.getElementById('comment-form');
        const authorInput = document.getElementById('comment-author');
        const textInput = document.getElementById('comment-text');
        const feedbackEl = document.getElementById('comment-feedback');
        const listEl = document.getElementById('comments-list');
        const countEl = document.getElementById('comments-count');
        const replyIndicator = document.getElementById('reply-indicator');
        const replyTargetNameEl = document.getElementById('reply-target-name');
        const replyCancelBtn = document.getElementById('reply-cancel-btn');

        if (!form || !textInput || !listEl) return;

        let activeReplyTarget = null;
        let totalComments = listEl.querySelectorAll('article').length;

        const syncCommentCount = () => {
            if (countEl) {
                countEl.textContent = `${totalComments.toLocaleString('fa-IR')} دیدگاه`;
            }
        };

        const clearReplyState = () => {
            activeReplyTarget = null;
            if (replyIndicator) {
                replyIndicator.classList.add('hidden');
            }
        };

        syncCommentCount();

        listEl.addEventListener('click', (event) => {
            const replyBtn = event.target.closest('[data-reply-btn]');
            if (!replyBtn) return;

            const parentArticle = replyBtn.closest('article[data-comment-id]');
            const targetAuthor = replyBtn.dataset.replyAuthor || 'کاربر';
            if (!parentArticle) return;

            activeReplyTarget = parentArticle;
            if (replyTargetNameEl) {
                replyTargetNameEl.textContent = targetAuthor;
            }
            if (replyIndicator) {
                replyIndicator.classList.remove('hidden');
            }
            textInput.focus();
        });

        if (replyCancelBtn) {
            replyCancelBtn.addEventListener('click', clearReplyState);
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const author = authorInput && authorInput.value.trim() ? authorInput.value.trim() : 'کاربر مهمان';
            const body = textInput.value.trim();

            if (!body) {
                setStatusBanner(feedbackEl, 'لطفاً متن دیدگاه خود را وارد کنید.', true);
                textInput.focus();
                return;
            }

            const newComment = createCommentElement(author, body, Boolean(activeReplyTarget));

            if (activeReplyTarget) {
                activeReplyTarget.appendChild(newComment);
            } else {
                listEl.prepend(newComment);
            }

            totalComments += 1;
            syncCommentCount();
            clearReplyState();
            form.reset();
            setStatusBanner(feedbackEl, 'دیدگاه شما با موفقیت ثبت شد.', false);
        });
    }

    /**
     * Initialize the shared footer newsletter subscription form.
     */
    function initFooterNewsletter() {
        const form = document.getElementById('footer-newsletter-form');
        const emailInput = document.getElementById('footer-newsletter-email');
        const feedbackEl = document.getElementById('footer-newsletter-feedback');

        if (!form || !emailInput) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = emailInput.value.trim();

            if (!email || !email.includes('@')) {
                setStatusBanner(feedbackEl, 'لطفاً یک نشانی ایمیل معتبر وارد کنید.', true);
                emailInput.focus();
                return;
            }

            setStatusBanner(feedbackEl, `ایمیل ${email} در خبرنامه روزانه ثبت شد.`, false);
            form.reset();
        });
    }

    /**
     * Filter and sort an article list DOM container in-place.
     * @param {Object} options
     * @param {HTMLElement} options.listEl
     * @param {HTMLElement[]} options.items
    /**
     * Normalize Persian/Arabic digits to Latin ASCII numerals for reliable string comparison.
     * @param {string} value
     * @returns {string}
     */
    function normalizeDigitsToLatin(value) {
        return String(value || '')
            .replace(/[۰-۹]/g, (char) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(char)))
            .replace(/[٠-٩]/g, (char) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(char)));
    }

    /**
     * Shared utility to filter by category, date range, and query, then sort article items in place.
     * @param {Object} options
     * @param {HTMLElement} options.listEl
     * @param {HTMLElement[]} options.items
     * @param {'newest' | 'most-viewed'} options.sortMode
     * @param {string} [options.categoryFilter='all']
     * @param {'all' | 'today' | 'week' | 'month'} [options.dateFilter='all']
     * @param {string} [options.query='']
     * @returns {number} Count of matching visible articles
     */
    function sortAndFilterArticles({
        listEl,
        items,
        sortMode,
        categoryFilter = 'all',
        dateFilter = 'all',
        query = '',
    }) {
        const normalizedQuery = query.trim().toLowerCase();
        const maxTimestamp = items.reduce((maxVal, item) => {
            const ts = Number(item.dataset.timestamp || 0);
            return Number.isFinite(ts) && ts > maxVal ? ts : maxVal;
        }, 0);
        const daySeconds = 86400;

        const sortedItems = [...items].sort((a, b) => {
            if (sortMode === 'most-viewed') {
                return Number(b.dataset.views || 0) - Number(a.dataset.views || 0);
            }
            return Number(b.dataset.timestamp || 0) - Number(a.dataset.timestamp || 0);
        });

        let visibleCount = 0;

        sortedItems.forEach((item) => {
            const itemCat = item.dataset.category || '';
            const itemTs = Number(item.dataset.timestamp || 0);
            const matchesCategory = categoryFilter === 'all' || itemCat === categoryFilter;
            const ageSeconds = maxTimestamp > 0 && itemTs > 0 ? maxTimestamp - itemTs : 0;

            let matchesDate = true;
            if (dateFilter === 'today') {
                matchesDate = ageSeconds <= daySeconds;
            } else if (dateFilter === 'week') {
                matchesDate = ageSeconds <= daySeconds * 7;
            } else if (dateFilter === 'month') {
                matchesDate = ageSeconds <= daySeconds * 30;
            }

            const matchesQuery =
                !normalizedQuery ||
                (item.textContent || '').toLowerCase().includes(normalizedQuery);

            const isVisible = matchesCategory && matchesDate && matchesQuery;
            item.classList.toggle('hidden', !isVisible);
            if (isVisible) {
                visibleCount += 1;
            }
            listEl.appendChild(item);
        });

        return visibleCount;
    }

    /**
     * Initialize interactive page selection on a Tailwind pagination nav.
     * @param {HTMLElement | null} paginationEl
     */
    function initPaginationControl(paginationEl) {
        if (!paginationEl) return;

        const pageButtons = Array.from(paginationEl.querySelectorAll('[data-page-num]'));
        const prevBtn = paginationEl.querySelector('[data-page-prev]');
        const nextBtn = paginationEl.querySelector('[data-page-next]');
        if (!pageButtons.length) return;

        let currentPage = 1;
        const maxPage = pageButtons.length;

        const syncPagination = () => {
            pageButtons.forEach((btn) => {
                const pageNum = Number(btn.dataset.pageNum);
                const isActive = pageNum === currentPage;
                btn.setAttribute('aria-current', isActive ? 'page' : 'false');
                btn.classList.toggle('bg-primary', isActive);
                btn.classList.toggle('text-white', isActive);
                btn.classList.toggle('border-primary', isActive);
                btn.classList.toggle('bg-white', !isActive);
                btn.classList.toggle('dark:bg-slate-800', !isActive);
                btn.classList.toggle('text-slate-700', !isActive);
                btn.classList.toggle('dark:text-slate-200', !isActive);
                btn.classList.toggle('border-slate-200', !isActive);
                btn.classList.toggle('dark:border-slate-700', !isActive);
            });

            if (prevBtn) {
                prevBtn.disabled = currentPage <= 1;
                prevBtn.classList.toggle('opacity-40', currentPage <= 1);
                prevBtn.classList.toggle('cursor-not-allowed', currentPage <= 1);
            }
            if (nextBtn) {
                nextBtn.disabled = currentPage >= maxPage;
                nextBtn.classList.toggle('opacity-40', currentPage >= maxPage);
                nextBtn.classList.toggle('cursor-not-allowed', currentPage >= maxPage);
            }
        };

        pageButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                currentPage = Number(btn.dataset.pageNum) || 1;
                syncPagination();
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage -= 1;
                    syncPagination();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < maxPage) {
                    currentPage += 1;
                    syncPagination();
                }
            });
        }

        syncPagination();
    }

    /**
     * Initialize category archive filtering, sorting, and pagination.
     */
    function initArchivePage() {
        const listEl = document.getElementById('archive-articles-list');
        if (!listEl) return;

        const items = Array.from(listEl.querySelectorAll('[data-article-item]'));
        const sortSelect = document.getElementById('archive-sort-select');
        const topicFilter = document.getElementById('archive-topic-filter');
        const dateFilter = document.getElementById('archive-date-filter');
        const countEl = document.getElementById('archive-count');
        const titleEl = document.getElementById('archive-category-title');
        const descEl = document.getElementById('archive-category-desc');
        const crumbEl = document.getElementById('archive-breadcrumb-current');
        const paginationEl = document.getElementById('archive-pagination');

        const categoryMeta = {
            technology: {
                title: 'اخبار فناوری و نوآوری',
                desc: 'تازه‌ترین گزارش‌ها، تحلیل‌های تخصصی و رویدادهای حوزه هوش مصنوعی، امنیت سایبری، گجت‌ها و اقتصاد دیجیتال.',
            },
            politics: {
                title: 'اخبار سیاست و دیپلماسی',
                desc: 'پوشش لحظه‌ای رویدادهای مجلس، دولت، سیاست خارجی و تحلیل‌های راهبردی روز.',
            },
            economy: {
                title: 'اخبار اقتصاد و بازارها',
                desc: 'گزارش‌های تحلیلی بورس، بازار ارز و طلا، تجارت منطقه‌ای و سیاست‌های پولی و بانکی.',
            },
            culture: {
                title: 'اخبار فرهنگ، هنر و رسانه',
                desc: 'پوشش تازه‌ترین رویدادهای سینما، کتاب، موسیقی، هنرهای تجسمی و جریان‌های فرهنگی.',
            },
            sports: {
                title: 'اخبار ورزش ایران و جهان',
                desc: 'گزارش‌های زنده رقابت‌های فوتبال، ورزش‌های توپی، لیگ‌های معتبر و تحلیل فنی مسابقات.',
            },
            world: {
                title: 'اخبار بین‌الملل و جهان',
                desc: 'تازه‌ترین تحولات ژئوپلیتیکی، دیپلماسی منطقه‌ای، اجلاس‌های جهانی و گزارش‌های برون‌مرزی.',
            },
        };

        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('cat');
        if (catParam && categoryMeta[catParam]) {
            if (titleEl) titleEl.textContent = categoryMeta[catParam].title;
            if (descEl) descEl.textContent = categoryMeta[catParam].desc;
            if (crumbEl) crumbEl.textContent = categoryMeta[catParam].title;

            const activeDeskClasses = [
                'text-primary',
                'dark:text-red-400',
                'font-bold',
                'border-b-2',
                'border-primary',
                'dark:border-red-400',
            ];
            const inactiveDeskClasses = ['text-slate-700', 'dark:text-slate-300'];
            document
                .querySelectorAll('#primary-nav > div > ul > li > a')
                .forEach((link) => {
                    const isMatch = (link.getAttribute('href') || '') === `archive.html?cat=${catParam}`;
                    link.classList.remove(...(isMatch ? inactiveDeskClasses : activeDeskClasses));
                    link.classList.add(...(isMatch ? activeDeskClasses : inactiveDeskClasses));
                    if (isMatch) {
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });

            document.querySelectorAll('#mobile-menu a[href^="archive.html?cat="]').forEach((link) => {
                const isMatch = (link.getAttribute('href') || '') === `archive.html?cat=${catParam}`;
                const accordion = link.closest('[data-mobile-accordion]');
                const targetEl = accordion ? accordion.querySelector('[data-accordion-trigger]') : link;
                if (targetEl) {
                    targetEl.classList.toggle('bg-primary-50', isMatch);
                    targetEl.classList.toggle('dark:bg-primary-950/50', isMatch);
                    targetEl.classList.toggle('text-primary', isMatch);
                    targetEl.classList.toggle('dark:text-red-400', isMatch);
                    targetEl.classList.toggle('font-bold', isMatch);
                    targetEl.classList.toggle('text-slate-700', !isMatch);
                    targetEl.classList.toggle('dark:text-slate-200', !isMatch);
                }
                if (isMatch) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        const updateArchive = () => {
            const visibleCount = sortAndFilterArticles({
                listEl,
                items,
                sortMode: sortSelect ? sortSelect.value : 'newest',
                categoryFilter: topicFilter ? topicFilter.value : 'all',
                dateFilter: dateFilter ? dateFilter.value : 'all',
            });

            if (countEl) {
                countEl.textContent = `${visibleCount.toLocaleString('fa-IR')} خبر`;
            }
        };

        if (sortSelect) sortSelect.addEventListener('change', updateArchive);
        if (topicFilter) topicFilter.addEventListener('change', updateArchive);
        if (dateFilter) dateFilter.addEventListener('change', updateArchive);

        updateArchive();
        initPaginationControl(paginationEl);
    }

    /**
     * Initialize search results page filtering, sorting, empty state, and query handling.
     */
    function initSearchPage() {
        const listEl = document.getElementById('search-articles-list');
        if (!listEl) return;

        const items = Array.from(listEl.querySelectorAll('[data-article-item]'));
        const queryDisplayEl = document.getElementById('search-query-display');
        const countEl = document.getElementById('search-count');
        const resultsContainer = document.getElementById('search-results-container');
        const emptyStateEl = document.getElementById('search-empty-state');
        const paginationEl = document.getElementById('search-pagination');
        const sortSelect = document.getElementById('search-sort-select');
        const categoryFilter = document.getElementById('search-category-filter');
        const dateFilter = document.getElementById('search-date-filter');
        const pageSearchForm = document.getElementById('page-search-form');
        const pageSearchInput = document.getElementById('page-search-input');
        const emptySearchForm = document.getElementById('empty-search-form');
        const emptySearchInput = document.getElementById('empty-search-input');
        const resetBtn = document.getElementById('search-reset-btn');

        const params = new URLSearchParams(window.location.search);
        let currentQuery = params.has('q') ? (params.get('q') || '').trim() : 'هوش مصنوعی';

        const applySearch = (nextQuery) => {
            currentQuery = nextQuery.trim();
            if (queryDisplayEl) {
                queryDisplayEl.textContent = currentQuery || 'همه اخبار';
            }
            if (pageSearchInput) {
                pageSearchInput.value = currentQuery;
            }
            if (emptySearchInput && currentQuery) {
                emptySearchInput.value = '';
            }

            const visibleCount = sortAndFilterArticles({
                listEl,
                items,
                sortMode: sortSelect ? sortSelect.value : 'newest',
                categoryFilter: categoryFilter ? categoryFilter.value : 'all',
                dateFilter: dateFilter ? dateFilter.value : 'all',
                query: currentQuery,
            });

            if (countEl) {
                countEl.textContent = `${visibleCount.toLocaleString('fa-IR')} نتیجه`;
            }

            const hasResults = visibleCount > 0;
            if (resultsContainer) {
                resultsContainer.classList.toggle('hidden', !hasResults);
            }
            if (paginationEl) {
                paginationEl.classList.toggle('hidden', !hasResults);
            }
            if (emptyStateEl) {
                emptyStateEl.classList.toggle('hidden', hasResults);
                emptyStateEl.setAttribute('aria-hidden', String(hasResults));
            }

            try {
                const updatedUrl = new URL(window.location.href);
                if (currentQuery) {
                    updatedUrl.searchParams.set('q', currentQuery);
                } else {
                    updatedUrl.searchParams.delete('q');
                }
                window.history.replaceState({}, '', updatedUrl.toString());
            } catch (_err) {
                // Ignore history restrictions on file:// if any
            }
        };

        const bindSearchSubmit = (formEl, inputEl) => {
            if (!formEl || !inputEl) return;
            formEl.addEventListener('submit', (event) => {
                event.preventDefault();
                applySearch(inputEl.value);
            });
        };

        bindSearchSubmit(pageSearchForm, pageSearchInput);
        bindSearchSubmit(emptySearchForm, emptySearchInput);

        if (sortSelect) sortSelect.addEventListener('change', () => applySearch(currentQuery));
        if (categoryFilter) categoryFilter.addEventListener('change', () => applySearch(currentQuery));
        if (dateFilter) dateFilter.addEventListener('change', () => applySearch(currentQuery));

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (categoryFilter) categoryFilter.value = 'all';
                if (dateFilter) dateFilter.value = 'all';
                applySearch('');
            });
        }

        applySearch(currentQuery);
        initPaginationControl(paginationEl);
    }

    /**
     * Build a saved article card DOM node safely using textContent.
     * @param {{ id: string, title: string, category: string, excerpt: string, image: string, date: string, href: string }} article
     * @param {(id: string) => void} onRemove
     * @returns {HTMLElement}
     */
    function createSavedArticleCard(article, onRemove) {
        const card = document.createElement('article');
        card.className =
            'group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm hover:border-primary/40 transition-all';

        const mediaLink = document.createElement('a');
        mediaLink.href = article.href;
        mediaLink.className = 'relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800 block';

        const img = document.createElement('img');
        img.src = article.image;
        img.alt = article.title;
        img.className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300';

        const badge = document.createElement('span');
        badge.className =
            'absolute top-3 right-3 px-2.5 py-1 rounded-md bg-primary/90 text-white text-[0.6875rem] font-bold shadow-sm';
        badge.textContent = article.category;

        mediaLink.append(img, badge);

        const body = document.createElement('div');
        body.className = 'p-4 sm:p-5 flex-1 flex flex-col justify-between';

        const textWrap = document.createElement('div');
        const titleEl = document.createElement('h3');
        titleEl.className =
            'text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-7 line-clamp-2 mb-2 group-hover:text-primary dark:group-hover:text-red-400 transition-colors';

        const titleLink = document.createElement('a');
        titleLink.href = article.href;
        titleLink.textContent = article.title;
        titleEl.appendChild(titleLink);

        const excerptEl = document.createElement('p');
        excerptEl.className = 'text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-6 mb-4';
        excerptEl.textContent = article.excerpt;

        textWrap.append(titleEl, excerptEl);

        const footer = document.createElement('div');
        footer.className =
            'flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/70 text-xs';

        const timeEl = document.createElement('time');
        timeEl.className = 'text-slate-500 dark:text-slate-400';
        timeEl.textContent = article.date;

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'font-semibold text-rose-600 dark:text-rose-400 hover:underline';
        removeBtn.textContent = 'حذف از ذخیره';
        removeBtn.setAttribute('aria-label', `حذف ${article.title} از مطالب ذخیره‌شده`);
        removeBtn.addEventListener('click', () => onRemove(article.id));

        footer.append(timeEl, removeBtn);
        body.append(textWrap, footer);
        card.append(mediaLink, body);
        return card;
    }

    /**
     * Initialize user dashboard tabs, saved articles from localStorage, profile editing, and logout.
     */
    function initDashboardPage() {
        const containerEl = document.getElementById('dashboard-container');
        const savedGridEl = document.getElementById('saved-articles-grid');
        if (!containerEl || !savedGridEl) return;

        initTabs(containerEl);

        const countEl = document.getElementById('saved-articles-count');
        const demoNoteEl = document.getElementById('saved-demo-note');
        const profileForm = document.getElementById('dashboard-profile-form');
        const profileNameInput = document.getElementById('profile-name-input');
        const profileEmailInput = document.getElementById('profile-email-input');
        const profileBioInput = document.getElementById('profile-bio-input');
        const profileFeedbackEl = document.getElementById('dashboard-profile-feedback');
        const sidebarUserNameEl = document.getElementById('dashboard-user-name');
        const sidebarUserEmailEl = document.getElementById('dashboard-user-email');
        const logoutBtn = document.getElementById('dashboard-logout-btn');

        const defaultSavedIds = [
            'digital-corridor-roadmap',
            'ai-chips-launch',
            'post-quantum-cloud',
        ];

        const readSavedIds = () => {
            try {
                const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
                if (!raw) return { ids: [...defaultSavedIds], isSimulated: true };
                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed) || parsed.length === 0) {
                    return { ids: [...defaultSavedIds], isSimulated: true };
                }
                const validIds = parsed.filter((id) =>
                    Object.prototype.hasOwnProperty.call(ARTICLE_CATALOG, id)
                );
                return validIds.length
                    ? { ids: validIds, isSimulated: false }
                    : { ids: [...defaultSavedIds], isSimulated: true };
            } catch (_err) {
                return { ids: [...defaultSavedIds], isSimulated: true };
            }
        };

        let savedState = readSavedIds();

        const renderSavedGrid = () => {
            savedGridEl.textContent = '';

            savedState.ids.forEach((id) => {
                const article = ARTICLE_CATALOG[id];
                if (!article) return;

                const card = createSavedArticleCard(article, (removeId) => {
                    savedState = {
                        ids: savedState.ids.filter((itemId) => itemId !== removeId),
                        isSimulated: false,
                    };
                    try {
                        window.localStorage.setItem(
                            BOOKMARKS_STORAGE_KEY,
                            JSON.stringify(savedState.ids)
                        );
                    } catch (_err) {
                        // Ignore storage restrictions
                    }
                    if (savedState.ids.length === 0) {
                        savedState = { ids: [...defaultSavedIds], isSimulated: true };
                        showToast('فهرست خالی شد؛ مطالب نمونه بارگذاری گردید.', 'info');
                    } else {
                        showToast('خبر از فهرست ذخیره‌شده‌ها حذف شد.', 'info');
                    }
                    renderSavedGrid();
                });

                savedGridEl.appendChild(card);
            });

            if (countEl) {
                countEl.textContent = `${savedState.ids.length.toLocaleString('fa-IR')} مطلب`;
            }

            if (demoNoteEl) {
                demoNoteEl.classList.toggle('hidden', !savedState.isSimulated);
            }
        };

        renderSavedGrid();

        if (profileForm && profileNameInput && profileEmailInput) {
            try {
                const savedProfileRaw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
                if (savedProfileRaw) {
                    const profile = JSON.parse(savedProfileRaw);
                    if (profile.name) {
                        profileNameInput.value = profile.name;
                        if (sidebarUserNameEl) sidebarUserNameEl.textContent = profile.name;
                    }
                    if (profile.email) {
                        profileEmailInput.value = profile.email;
                        if (sidebarUserEmailEl) sidebarUserEmailEl.textContent = profile.email;
                    }
                    if (profileBioInput && profile.bio) {
                        profileBioInput.value = profile.bio;
                    }
                }
            } catch (_err) {
                // Ignore storage restrictions
            }

            profileForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = profileNameInput.value.trim();
                const email = profileEmailInput.value.trim();
                const bio = profileBioInput ? profileBioInput.value.trim() : '';

                if (!name || !email) {
                    setStatusBanner(profileFeedbackEl, 'نام و ایمیل نمی‌توانند خالی باشند.', true);
                    return;
                }

                if (sidebarUserNameEl) sidebarUserNameEl.textContent = name;
                if (sidebarUserEmailEl) sidebarUserEmailEl.textContent = email;

                try {
                    window.localStorage.setItem(
                        PROFILE_STORAGE_KEY,
                        JSON.stringify({ name, email, bio })
                    );
                } catch (_err) {
                    // Ignore storage restrictions
                }

                setStatusBanner(profileFeedbackEl, 'اطلاعات پروفایل با موفقیت به‌روزرسانی شد.', false);
                showToast('تغییرات پروفایل ذخیره شد.', 'success');
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                showToast('شما با موفقیت از حساب کاربری خارج شدید.', 'info');
                window.setTimeout(() => {
                    window.location.href = resolveFrontendUrl('index.html');
                }, 900);
            });
        }
    }

    /**
     * Initialize journalist/author profile sorting and pagination.
     */
    function initAuthorPage() {
        const listEl = document.getElementById('author-articles-list');
        if (!listEl) return;

        const items = Array.from(listEl.querySelectorAll('[data-article-item]'));
        const sortSelect = document.getElementById('author-sort-select');
        const paginationEl = document.getElementById('author-pagination');

        const updateAuthorArticles = () => {
            sortAndFilterArticles({
                listEl,
                items,
                sortMode: sortSelect ? sortSelect.value : 'newest',
            });
        };

        if (sortSelect) {
            sortSelect.addEventListener('change', updateAuthorArticles);
        }

        updateAuthorArticles();
        initPaginationControl(paginationEl);
    }

    /**
     * Initialize multimedia video theater selection, category filtering, like toggle, and share button.
     */
    function initVideoHubPage() {
        const playerEl = document.getElementById('featured-video-player');
        const gridEl = document.getElementById('video-hub-grid');
        if (!playerEl || !gridEl) return;

        const theaterEl = document.getElementById('video-theater-section');
        const titleEl = document.getElementById('featured-video-title');
        const categoryEl = document.getElementById('featured-video-category');
        const durationEl = document.getElementById('featured-video-duration');
        const viewsEl = document.getElementById('featured-video-views');
        const dateEl = document.getElementById('featured-video-date');
        const descEl = document.getElementById('featured-video-desc');
        const gridCountEl = document.getElementById('video-grid-count');
        const filterBarEl = document.getElementById('video-filter-bar');
        const likeBtn = document.getElementById('video-like-btn');
        const likeCountEl = document.getElementById('video-like-count');
        const shareBtn = document.getElementById('video-share-btn');

        const allCards = Array.from(document.querySelectorAll('[data-video-card]'));
        const gridCards = Array.from(gridEl.querySelectorAll('[data-video-card]'));

        const setActiveVideo = (cardEl, shouldScroll) => {
            const videoId = cardEl.dataset.videoId || '';
            const title = cardEl.dataset.title || '';
            const categoryLabel = cardEl.dataset.categoryLabel || '';
            const poster = cardEl.dataset.poster || '';
            const duration = cardEl.dataset.duration || '';
            const views = cardEl.dataset.views || '';
            const date = cardEl.dataset.date || '';
            const desc = cardEl.dataset.desc || '';

            if (poster) {
                playerEl.setAttribute('poster', poster);
                playerEl.load();
            }
            if (titleEl && title) titleEl.textContent = title;
            if (categoryEl && categoryLabel) categoryEl.textContent = categoryLabel;
            if (durationEl && duration) durationEl.textContent = duration;
            if (viewsEl && views) viewsEl.textContent = views;
            if (dateEl && date) dateEl.textContent = date;
            if (descEl && desc) descEl.textContent = desc;

            allCards.forEach((item) => {
                const isSelected = item.dataset.videoId === videoId;
                item.classList.toggle('ring-2', isSelected);
                item.classList.toggle('ring-primary', isSelected);
                item.setAttribute('aria-current', isSelected ? 'true' : 'false');
            });

            if (shouldScroll && theaterEl) {
                theaterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        allCards.forEach((cardEl) => {
            cardEl.addEventListener('click', () => {
                setActiveVideo(cardEl, true);
                if (cardEl.dataset.title) {
                    showToast(
                        `ویدیوی «${cardEl.dataset.title}» در پخش‌کننده اصلی بارگذاری شد.`,
                        'info'
                    );
                }
            });
        });

        if (filterBarEl) {
            const filterBtns = Array.from(filterBarEl.querySelectorAll('[data-video-filter]'));
            filterBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const selectedCat = btn.dataset.videoFilter || 'all';

                    filterBtns.forEach((otherBtn) => {
                        const isActive = otherBtn === btn;
                        otherBtn.setAttribute('aria-pressed', String(isActive));
                        otherBtn.classList.toggle('bg-primary', isActive);
                        otherBtn.classList.toggle('text-white', isActive);
                        otherBtn.classList.toggle('bg-slate-100', !isActive);
                        otherBtn.classList.toggle('dark:bg-slate-800', !isActive);
                        otherBtn.classList.toggle('text-slate-700', !isActive);
                        otherBtn.classList.toggle('dark:text-slate-300', !isActive);
                    });

                    let visibleCount = 0;
                    gridCards.forEach((cardEl) => {
                        const matches =
                            selectedCat === 'all' || cardEl.dataset.category === selectedCat;
                        cardEl.classList.toggle('hidden', !matches);
                        if (matches) visibleCount += 1;
                    });

                    if (gridCountEl) {
                        gridCountEl.textContent = `${visibleCount.toLocaleString('fa-IR')} ویدیو`;
                    }
                });
            });
        }

        if (likeBtn && likeCountEl) {
            let liked = false;
            let baseCount = 428;
            likeBtn.addEventListener('click', () => {
                liked = !liked;
                baseCount += liked ? 1 : -1;
                likeBtn.setAttribute('aria-pressed', String(liked));
                likeBtn.classList.toggle('bg-primary-50', liked);
                likeBtn.classList.toggle('dark:bg-primary/20', liked);
                likeBtn.classList.toggle('border-primary', liked);
                likeBtn.classList.toggle('text-primary', liked);
                likeBtn.classList.toggle('dark:text-red-300', liked);
                likeBtn.classList.toggle('bg-white', !liked);
                likeBtn.classList.toggle('dark:bg-slate-900', !liked);
                likeBtn.classList.toggle('border-slate-200', !liked);
                likeBtn.classList.toggle('dark:border-slate-700', !liked);
                likeBtn.classList.toggle('text-slate-700', !liked);
                likeBtn.classList.toggle('dark:text-slate-200', !liked);
                likeCountEl.textContent = baseCount.toLocaleString('fa-IR');
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                copyCurrentUrlWithToast('پیوند صفحه ویدیو در حافظه کپی شد.');
            });
        }
    }

    /**
     * Initialize contact page message submission, validation, and status banner.
     */
    function initContactPage() {
        const form = document.getElementById('contact-form');
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        const feedbackEl = document.getElementById('contact-feedback');

        if (!form || !nameInput || !emailInput || !subjectInput || !messageInput) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const fullName = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            if (!fullName || !email || !subject || !message) {
                setStatusBanner(feedbackEl, 'لطفاً تمامی فیلدهای فرم تماس را تکمیل کنید.', true);
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setStatusBanner(feedbackEl, 'نشانی ایمیل واردشده معتبر نیست.', true);
                emailInput.focus();
                return;
            }

            form.reset();
            setStatusBanner(
                feedbackEl,
                'پیام شما با موفقیت ثبت شد. تحریریه و روابط عمومی در کوتاه‌ترین زمان پاسخ خواهند داد.',
                false
            );
            showToast('پیام شما به تحریریه خبرگزاری رصد ارسال شد.', 'success');
        });
    }

    /**
     * Initialize skeleton loading state toggle and toast demonstration buttons.
     */
    function initLoadingDemoPage() {
        const skeletonGrid = document.getElementById('skeleton-demo-grid');
        const loadedGrid = document.getElementById('loaded-demo-grid');
        const toggleBtn = document.getElementById('skeleton-toggle-btn');
        const stateBadgeEl = document.getElementById('loading-state-badge');
        const toastDemoBtns = Array.from(document.querySelectorAll('[data-toast-demo]'));
        const replayLoaderBtn = document.getElementById('replay-page-loader-btn');

        if (replayLoaderBtn) {
            replayLoaderBtn.addEventListener('click', () => {
                replayLoaderPreview();
            });
        }

        toastDemoBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.toastType || 'info';
                const message = btn.dataset.toastMessage || 'اعلان آزمایشی سامانه خبرگزاری رصد';
                showToast(message, type);
            });
        });

        if (!skeletonGrid || !loadedGrid || !toggleBtn) return;

        let showingSkeleton = true;

        const syncLoadingPreview = () => {
            skeletonGrid.classList.toggle('hidden', !showingSkeleton);
            skeletonGrid.setAttribute('aria-hidden', String(!showingSkeleton));
            loadedGrid.classList.toggle('hidden', showingSkeleton);
            loadedGrid.setAttribute('aria-hidden', String(showingSkeleton));

            toggleBtn.setAttribute('aria-pressed', String(!showingSkeleton));
            toggleBtn.textContent = showingSkeleton
                ? 'نمایش محتوای بارگذاری‌شده'
                : 'بازگشت به حالت اسکلت (Skeleton)';

            if (stateBadgeEl) {
                stateBadgeEl.textContent = showingSkeleton
                    ? 'وضعیت فعلی: در حال بارگذاری (Skeleton)'
                    : 'وضعیت فعلی: بارگذاری کامل شد';
            }
        };

        toggleBtn.addEventListener('click', () => {
            showingSkeleton = !showingSkeleton;
            syncLoadingPreview();
            showToast(
                showingSkeleton
                    ? 'حالت پیش‌نمایش اسکلت بارگذاری فعال شد.'
                    : 'کارت‌های خبری با موفقیت بارگذاری شدند.',
                showingSkeleton ? 'info' : 'success'
            );
        });

        syncLoadingPreview();
    }

    /**
     * Initialize mobile drawer toggle for the fixed left CMS admin sidebar.
     */
    function initAdminSidebar() {
        const sidebarEl = document.getElementById('admin-sidebar');
        const toggleBtn = document.getElementById('admin-sidebar-toggle');
        const closeBtn = document.getElementById('admin-sidebar-close');
        const backdropEl = document.getElementById('admin-sidebar-backdrop');
        if (!sidebarEl) return;

        const setOpen = (isOpen) => {
            sidebarEl.classList.toggle('-translate-x-full', !isOpen);
            sidebarEl.classList.toggle('translate-x-0', isOpen);
            if (backdropEl) {
                backdropEl.classList.toggle('hidden', !isOpen);
                backdropEl.setAttribute('aria-hidden', String(!isOpen));
            }
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-expanded', String(isOpen));
            }
        };

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentlyClosed = sidebarEl.classList.contains('-translate-x-full');
                setOpen(currentlyClosed);
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
        if (backdropEl) backdropEl.addEventListener('click', () => setOpen(false));
        bindEscapeKey(() => {
            if (sidebarEl.classList.contains('translate-x-0')) {
                setOpen(false);
            }
        });
    }

    /**
     * Initialize CMS dashboard table status filtering and row delete actions.
     */
    function initAdminDashboardPage() {
        const tableEl = document.getElementById('admin-articles-table');
        if (!tableEl) return;

        const tbodyEl = tableEl.querySelector('tbody');
        const countEl = document.getElementById('admin-posts-count');
        const emptyRowEl = document.getElementById('admin-empty-row');
        const filterBtns = Array.from(document.querySelectorAll('[data-admin-status-filter]'));
        let activeFilter = 'all';

        const syncTable = () => {
            if (!tbodyEl) return;
            const rows = Array.from(tbodyEl.querySelectorAll('[data-admin-article-row]'));
            let visibleCount = 0;

            rows.forEach((rowEl) => {
                const matches =
                    activeFilter === 'all' || rowEl.dataset.status === activeFilter;
                rowEl.classList.toggle('hidden', !matches);
                if (matches) visibleCount += 1;
            });

            if (countEl) {
                countEl.textContent = `${visibleCount.toLocaleString('fa-IR')} مطلب`;
            }
            if (emptyRowEl) {
                emptyRowEl.classList.toggle('hidden', visibleCount > 0);
            }
        };

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                activeFilter = btn.dataset.adminStatusFilter || 'all';
                filterBtns.forEach((otherBtn) => {
                    const isActive = otherBtn === btn;
                    otherBtn.setAttribute('aria-pressed', String(isActive));
                    otherBtn.classList.toggle('bg-primary', isActive);
                    otherBtn.classList.toggle('text-white', isActive);
                    otherBtn.classList.toggle('bg-slate-100', !isActive);
                    otherBtn.classList.toggle('dark:bg-slate-700', !isActive);
                    otherBtn.classList.toggle('text-slate-700', !isActive);
                    otherBtn.classList.toggle('dark:text-slate-200', !isActive);
                });
                syncTable();
            });
        });

        tableEl.addEventListener('click', (event) => {
            const deleteBtn = event.target.closest('[data-admin-delete]');
            if (!deleteBtn) return;

            const rowEl = deleteBtn.closest('[data-admin-article-row]');
            if (!rowEl) return;

            const titleText = deleteBtn.dataset.articleTitle || 'مطلب';
            rowEl.remove();
            syncTable();
            showToast(`«${titleText}» از فهرست مطالب حذف شد.`, 'info');
        });

        syncTable();
    }

    /**
     * Build a removable tag pill DOM node safely using textContent.
     * @param {string} label
     * @returns {HTMLElement}
     */
    function createTagBadgeElement(label) {
        const chip = document.createElement('span');
        chip.dataset.tagValue = label;
        chip.className =
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary dark:text-red-300 border border-primary/20 text-xs font-semibold';

        const textSpan = document.createElement('span');
        textSpan.textContent = label;

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.dataset.removeTag = 'true';
        removeBtn.className = 'text-primary/70 hover:text-primary dark:text-red-300 dark:hover:text-white font-bold leading-none';
        removeBtn.setAttribute('aria-label', `حذف برچسب ${label}`);
        removeBtn.textContent = '×';

        chip.append(textSpan, removeBtn);
        return chip;
    }

    /**
     * Convert a Persian/English title or label into a clean URL slug.
     */
    function slugifyText(value) {
        return String(value || '')
            .trim()
            .replace(/\u200c/g, '-')
            .replace(/[^a-zA-Z0-9\u0600-\u06FF\s_-]+/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .toLowerCase();
    }

    /**
     * Phase 10 & 12: Initialize CMS article editor (slug, status, tags, WYSIWYG toolbar, SEO counters, image dropzone, and publish actions).
     */
    function initAdminWritePage() {
        const formEl = document.getElementById('admin-write-form');
        if (!formEl) return;

        const titleInput = document.getElementById('article-title-input');
        const slugInput = document.getElementById('article-slug-input');
        const generateSlugBtn = document.getElementById('generate-slug-btn');
        const permalinkPreviewEl = document.getElementById('article-permalink-preview');
        const editorBody = document.getElementById('article-editor-body');
        const statusBadgeEl = document.getElementById('article-status-badge');
        const statusSelectEl = document.getElementById('article-status-select');
        const saveDraftBtn = document.getElementById('save-draft-btn');

        // 0. Permalink / Slug editor & Status dropdown sync
        let isSlugManuallyEdited = false;
        const updatePermalinkPreview = (slugValue) => {
            if (!permalinkPreviewEl) return;
            const cleanSlug = slugifyText(slugValue) || 'new-article-slug';
            permalinkPreviewEl.textContent = `https://rasadnews.ir/news/${cleanSlug}`;
        };

        if (slugInput) {
            slugInput.addEventListener('input', () => {
                isSlugManuallyEdited = slugInput.value.trim().length > 0;
                updatePermalinkPreview(slugInput.value);
            });
            updatePermalinkPreview(slugInput.value);
        }

        if (titleInput && slugInput) {
            titleInput.addEventListener('input', () => {
                if (isSlugManuallyEdited) return;
                const autoSlug = slugifyText(titleInput.value);
                slugInput.value = autoSlug;
                updatePermalinkPreview(autoSlug);
            });
        }

        if (generateSlugBtn && slugInput) {
            generateSlugBtn.addEventListener('click', () => {
                const sourceText = (titleInput && titleInput.value.trim()) || slugInput.value || 'breaking-news';
                const generated = slugifyText(sourceText) || 'breaking-news';
                slugInput.value = generated;
                isSlugManuallyEdited = false;
                updatePermalinkPreview(generated);
                showToast('نامک یکتای خبر از عنوان بروزرسانی شد.', 'info');
            });
        }

        const statusLabels = {
            draft: 'پیش‌نویس',
            pending: 'در انتظار بازبینی',
            scheduled: 'زمان‌بندی‌شده',
            published: 'منتشرشده'
        };

        const syncStatusBadge = (statusKey) => {
            if (!statusBadgeEl) return;
            statusBadgeEl.textContent = statusLabels[statusKey] || 'پیش‌نویس';
        };

        if (statusSelectEl) {
            statusSelectEl.addEventListener('change', () => {
                syncStatusBadge(statusSelectEl.value);
            });
            syncStatusBadge(statusSelectEl.value);
        }

        // Phase 21: Initialize Vanilla JS Jalali Date & Time Picker
        const publishDateInput = document.getElementById('publish-date');
        const publishDateTrigger = document.getElementById('publish-date-trigger');
        const jalaliPicker = window.jalaliDatepicker;

        if (publishDateInput && jalaliPicker && typeof jalaliPicker.startWatch === 'function') {
            jalaliPicker.startWatch({
                selector: '#publish-date',
                date: true,
                time: true,
                hasSecond: false,
                separatorChars: {
                    date: '/',
                    between: ' ',
                    time: ':'
                },
                position: 'left',
                autoShow: true,
                autoHide: true,
                hideAfterChange: true,
                hideAfterChangeWithTime: false,
                showTodayBtn: true,
                showEmptyBtn: true,
                showCloseBtn: true,
                persianDigits: false,
                zIndex: 1000
            });

            if (publishDateTrigger) {
                publishDateTrigger.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (jalaliPicker.isShow && jalaliPicker.input === publishDateInput) {
                        jalaliPicker.hide();
                        return;
                    }
                    publishDateInput.focus({ preventScroll: true });
                    jalaliPicker.show(publishDateInput);
                });
            }

            publishDateInput.addEventListener('click', () => {
                if (!jalaliPicker.isShow || jalaliPicker.input !== publishDateInput) {
                    jalaliPicker.show(publishDateInput);
                }
            });

            const syncScheduledStatus = () => {
                const hasSchedule = publishDateInput.value.trim().length > 0;
                if (!statusSelectEl) return;

                if (hasSchedule && statusSelectEl.value !== 'scheduled') {
                    statusSelectEl.value = 'scheduled';
                    syncStatusBadge('scheduled');
                } else if (!hasSchedule && statusSelectEl.value === 'scheduled') {
                    statusSelectEl.value = 'draft';
                    syncStatusBadge('draft');
                }
            };

            publishDateInput.addEventListener('jdp:change', syncScheduledStatus);
            publishDateInput.addEventListener('change', syncScheduledStatus);

            const adminMainEl = document.getElementById('main-content');
            if (adminMainEl) {
                adminMainEl.addEventListener(
                    'scroll',
                    () => {
                        if (jalaliPicker.isShow) {
                            jalaliPicker.hide();
                        }
                    },
                    { passive: true }
                );
            }
        }

        // 1. Tag badge input simulation
        const tagInput = document.getElementById('article-tag-input');
        const addTagBtn = document.getElementById('add-tag-btn');
        const tagsListEl = document.getElementById('article-tags-list');

        const addTag = () => {
            if (!tagInput || !tagsListEl) return;
            const rawTag = tagInput.value.trim().replace(/[،,]/g, '');
            if (!rawTag) return;

            const existing = Array.from(tagsListEl.querySelectorAll('[data-tag-value]')).some(
                (chip) => chip.dataset.tagValue === rawTag
            );
            if (existing) {
                showToast('این برچسب قبلاً اضافه شده است.', 'info');
                tagInput.value = '';
                return;
            }

            tagsListEl.appendChild(createTagBadgeElement(rawTag));
            tagInput.value = '';
            tagInput.focus();
        };

        if (addTagBtn) addTagBtn.addEventListener('click', addTag);
        if (tagInput) {
            tagInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ',') {
                    event.preventDefault();
                    addTag();
                }
            });
        }
        if (tagsListEl) {
            tagsListEl.addEventListener('click', (event) => {
                const removeBtn = event.target.closest('[data-remove-tag]');
                if (!removeBtn) return;
                const chip = removeBtn.closest('[data-tag-value]');
                if (chip) chip.remove();
            });
        }

        // 2. WYSIWYG toolbar simulation
        const toolbarBtns = Array.from(document.querySelectorAll('[data-editor-cmd]'));
        const alignBtns = Array.from(document.querySelectorAll('[data-editor-align]'));

        toolbarBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (!editorBody) return;
                const cmd = btn.dataset.editorCmd;
                editorBody.focus();

                if (cmd === 'createLink') {
                    const linkUrl = 'https://rasadnews.ir/news/featured';
                    try {
                        if (typeof document.execCommand === 'function') {
                            document.execCommand('createLink', false, linkUrl);
                        }
                    } catch (_err) {
                        // Ignore execCommand restrictions
                    }
                    showToast('پیوند به متن انتخاب‌شده یا مکان مکان‌نما افزوده شد.', 'info');
                    return;
                }

                try {
                    if (typeof document.execCommand === 'function') {
                        document.execCommand(cmd, false, null);
                    }
                } catch (_err) {
                    // Ignore execCommand restrictions
                }
            });
        });

        alignBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (!editorBody) return;
                const align = btn.dataset.editorAlign || 'right';
                editorBody.classList.remove('text-right', 'text-center', 'text-left');
                editorBody.classList.add(`text-${align}`);

                alignBtns.forEach((otherBtn) => {
                    const isActive = otherBtn === btn;
                    otherBtn.setAttribute('aria-pressed', String(isActive));
                    otherBtn.classList.toggle('bg-primary', isActive);
                    otherBtn.classList.toggle('text-white', isActive);
                });
            });
        });

        // 3. SEO live character counters
        const bindSeoCounter = (inputEl, counterEl, maxLen) => {
            if (!inputEl || !counterEl) return;
            const update = () => {
                const len = inputEl.value.length;
                counterEl.textContent = `${len.toLocaleString('fa-IR')} / ${maxLen.toLocaleString('fa-IR')} کاراکتر`;
            };
            inputEl.addEventListener('input', update);
            update();
        };
        bindSeoCounter(
            document.getElementById('seo-meta-title'),
            document.getElementById('seo-title-counter'),
            60
        );
        bindSeoCounter(
            document.getElementById('seo-meta-desc'),
            document.getElementById('seo-desc-counter'),
            160
        );

        // 4. Featured image drag-and-drop zone
        const dropzoneEl = document.getElementById('featured-image-dropzone');
        const fileInputEl = document.getElementById('featured-image-input');
        const triggerBtn = document.getElementById('featured-image-trigger');
        const previewWrap = document.getElementById('featured-image-preview-wrap');
        const previewImg = document.getElementById('featured-image-preview');
        const fileNameEl = document.getElementById('featured-image-filename');
        const removeImgBtn = document.getElementById('featured-image-remove-btn');
        let activeObjectUrl = null;

        const handleSelectedFile = (file) => {
            if (!file) return;
            if (!file.type || !file.type.startsWith('image/')) {
                showToast('لطفاً فقط یک فایل تصویری معتبر انتخاب کنید.', 'error');
                return;
            }
            if (activeObjectUrl) {
                URL.revokeObjectURL(activeObjectUrl);
                activeObjectUrl = null;
            }
            activeObjectUrl = URL.createObjectURL(file);
            if (previewImg) {
                previewImg.src = activeObjectUrl;
            }
            if (fileNameEl) {
                fileNameEl.textContent = file.name;
            }
            if (previewWrap) {
                previewWrap.classList.remove('hidden');
            }
            showToast('تصویر شاخص با موفقیت بارگذاری شد.', 'success');
        };

        if (triggerBtn && fileInputEl) {
            triggerBtn.addEventListener('click', () => fileInputEl.click());
        }
        if (fileInputEl) {
            fileInputEl.addEventListener('change', () => {
                if (fileInputEl.files && fileInputEl.files[0]) {
                    handleSelectedFile(fileInputEl.files[0]);
                }
            });
        }
        if (dropzoneEl) {
            ['dragenter', 'dragover'].forEach((evName) => {
                dropzoneEl.addEventListener(evName, (event) => {
                    event.preventDefault();
                    dropzoneEl.classList.add('border-primary', 'bg-primary-50/50', 'dark:bg-primary-950/30');
                });
            });
            ['dragleave', 'drop'].forEach((evName) => {
                dropzoneEl.addEventListener(evName, (event) => {
                    event.preventDefault();
                    dropzoneEl.classList.remove('border-primary', 'bg-primary-50/50', 'dark:bg-primary-950/30');
                });
            });
            dropzoneEl.addEventListener('drop', (event) => {
                const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
                if (file) handleSelectedFile(file);
            });
        }
        if (removeImgBtn) {
            removeImgBtn.addEventListener('click', () => {
                if (activeObjectUrl) {
                    URL.revokeObjectURL(activeObjectUrl);
                    activeObjectUrl = null;
                }
                if (fileInputEl) fileInputEl.value = '';
                if (previewImg) previewImg.src = resolveAsset('images/hero-banner.jpg');
                if (previewWrap) previewWrap.classList.add('hidden');
                showToast('تصویر شاخص حذف شد.', 'info');
            });
        }

        // 5. Draft & Publish buttons
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => {
                if (statusSelectEl) {
                    statusSelectEl.value = 'draft';
                }
                if (statusBadgeEl) {
                    statusBadgeEl.textContent = 'پیش‌نویس ذخیره‌شده';
                }
                showToast('پیش‌نویس خبر با موفقیت ذخیره شد.', 'info');
            });
        }

        formEl.addEventListener('submit', (event) => {
            event.preventDefault();
            if (formEl.dataset.justValidate === 'true') return;
            const title = titleInput ? titleInput.value.trim() : '';
            const bodyText = editorBody ? editorBody.textContent.trim() : '';

            if (!title) {
                showToast('لطفاً عنوان خبر را وارد کنید.', 'error');
                if (titleInput) titleInput.focus();
                return;
            }
            if (!bodyText) {
                showToast('متن خبر نمی‌تواند خالی باشد.', 'error');
                if (editorBody) editorBody.focus();
                return;
            }

            if (statusSelectEl) {
                statusSelectEl.value = 'published';
            }
            if (statusBadgeEl) {
                statusBadgeEl.textContent = 'منتشرشده';
            }
            showToast(`خبر «${title}» با موفقیت منتشر شد.`, 'success');
        });
    }

    /**
     * Phase 11: Initialize the RTL Admin shell (right-side drawer, topbar search, notifications & profile menus).
     */
    function initRtlAdminShell() {
        const sidebar = document.getElementById('rtl-admin-sidebar');
        if (!sidebar) return;

        if (document.body.classList.contains('h-screen')) {
            const resetOuterScroll = () => {
                if (window.scrollX !== 0 || window.scrollY !== 0) {
                    window.scrollTo(0, 0);
                }
                if (document.documentElement.scrollTop !== 0) {
                    document.documentElement.scrollTop = 0;
                }
                if (document.body.scrollTop !== 0) {
                    document.body.scrollTop = 0;
                }
            };
            resetOuterScroll();
            window.addEventListener('scroll', resetOuterScroll, { passive: true });
        }

        const openBtn = document.getElementById('rtl-admin-sidebar-toggle');
        const closeBtn = document.getElementById('rtl-admin-sidebar-close');
        const backdrop = document.getElementById('rtl-admin-sidebar-backdrop');

        const setDrawerOpen = (isOpen) => {
            sidebar.classList.toggle('translate-x-full', !isOpen);
            sidebar.classList.toggle('translate-x-0', isOpen);
            if (backdrop) {
                backdrop.classList.toggle('hidden', !isOpen);
            }
            if (openBtn) {
                openBtn.setAttribute('aria-expanded', String(isOpen));
            }
        };

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                setDrawerOpen(sidebar.classList.contains('translate-x-full'));
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => setDrawerOpen(false));
        }
        if (backdrop) {
            backdrop.addEventListener('click', () => setDrawerOpen(false));
        }

        const dropdownPairs = [
            {
                trigger: document.getElementById('admin-notif-btn'),
                panel: document.getElementById('admin-notif-menu')
            },
            {
                trigger: document.getElementById('admin-profile-btn'),
                panel: document.getElementById('admin-profile-menu')
            }
        ].filter((item) => item.trigger && item.panel);

        const closeAllDropdowns = (exceptPanel = null) => {
            dropdownPairs.forEach(({ trigger, panel }) => {
                if (panel !== exceptPanel) {
                    setDisclosureState(trigger, panel, false);
                }
            });
        };

        dropdownPairs.forEach(({ trigger, panel }) => {
            trigger.addEventListener('click', (event) => {
                event.stopPropagation();
                const shouldOpen = panel.classList.contains('hidden');
                closeAllDropdowns(panel);
                setDisclosureState(trigger, panel, shouldOpen);
            });
        });

        document.addEventListener('click', (event) => {
            if (!(event.target instanceof Node)) {
                closeAllDropdowns();
                return;
            }
            const insideAny = dropdownPairs.some(
                ({ trigger, panel }) => trigger.contains(event.target) || panel.contains(event.target)
            );
            if (!insideAny) {
                closeAllDropdowns();
            }
        });

        bindEscapeKey(() => {
            setDrawerOpen(false);
            closeAllDropdowns();
        });

        const markReadBtn = document.getElementById('admin-notif-mark-read');
        const notifDot = document.getElementById('admin-notif-badge');
        if (markReadBtn) {
            markReadBtn.addEventListener('click', () => {
                if (notifDot) {
                    notifDot.classList.add('hidden');
                }
                closeAllDropdowns();
                showToast('تمامی اعلان‌ها به‌عنوان خوانده‌شده ثبت شد.', 'success');
            });
        }

        const searchForm = document.getElementById('admin-topbar-search-form');
        const searchInput = document.getElementById('admin-topbar-search-input');
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const query = searchInput.value.trim();
                if (!query) {
                    showToast('لطفاً عبارتی برای جستجو در پنل مدیریت وارد کنید.', 'error');
                    return;
                }
                showToast(`جستجو برای «${query}» در آرشیو اخبار انجام شد.`, 'info');
            });
        }
    }

    /**
     * Phase 11: Handle Quick Draft creation on the Overview dashboard (prepends timeline activity).
     */
    function initOverviewQuickDraft() {
        const form = document.getElementById('quick-draft-form');
        if (!form) return;

        const titleInput = document.getElementById('quick-draft-title');
        const categorySelect = document.getElementById('quick-draft-category');
        const contentInput = document.getElementById('quick-draft-content');
        const timelineList = document.getElementById('recent-activity-list');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = titleInput ? titleInput.value.trim() : '';
            const content = contentInput ? contentInput.value.trim() : '';
            const category = categorySelect ? categorySelect.value : 'سیاسی';

            if (!title || !content) {
                showToast('لطفاً عنوان و خلاصه پیش‌نویس سریع را تکمیل کنید.', 'error');
                return;
            }

            if (timelineList) {
                const li = document.createElement('li');
                li.className = 'relative pr-7 pb-6 border-r-2 border-gray-200 dark:border-slate-700 last:pb-0';

                const dot = document.createElement('span');
                dot.className = 'absolute -right-[0.4375rem] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-white dark:ring-slate-800';

                const row = document.createElement('div');
                row.className = 'flex flex-wrap items-center justify-between gap-2 mb-1';

                const heading = document.createElement('p');
                heading.className = 'text-sm font-bold text-gray-900 dark:text-white';
                heading.textContent = `پیش‌نویس جدید: ${title}`;

                const timeSpan = document.createElement('span');
                timeSpan.className = 'text-xs font-medium text-emerald-600 dark:text-emerald-400';
                timeSpan.textContent = 'هم‌اکنون';

                const meta = document.createElement('p');
                meta.className = 'text-xs text-gray-500 dark:text-gray-400 leading-relaxed';
                meta.textContent = `دسته ${category} — ${content}`;

                row.append(heading, timeSpan);
                li.append(dot, row, meta);
                timelineList.prepend(li);
            }

            form.reset();
            showToast(`پیش‌نویس «${title}» با موفقیت ذخیره و به فهرست فعالیت‌ها اضافه شد.`, 'success');
        });
    }

    /**
     * Phase 11: Manage articles table filtering, bulk checkbox selection, deletion, and pagination.
     */
    function initAdminPostsPage() {
        const table = document.getElementById('posts-manage-table');
        if (!table) return;

        const searchInput = document.getElementById('posts-search-input');
        const categoryFilter = document.getElementById('posts-category-filter');
        const statusFilter = document.getElementById('posts-status-filter');
        const dateFilterInput = document.getElementById('posts-date-filter');
        const dateTriggerBtn = document.getElementById('posts-date-trigger');
        const dateClearBtn = document.getElementById('posts-date-clear');
        const selectAllCheckbox = document.getElementById('posts-select-all');
        const emptyRow = document.getElementById('posts-empty-row');
        const totalCountEl = document.getElementById('posts-total-count');

        const jalaliPicker = window.jalaliDatepicker;
        if (dateFilterInput && jalaliPicker && typeof jalaliPicker.startWatch === 'function') {
            jalaliPicker.startWatch({
                selector: '#posts-date-filter',
                date: true,
                time: false,
                separatorChars: {
                    date: '/',
                },
                position: 'left',
                autoShow: true,
                autoHide: true,
                hideAfterChange: true,
                showTodayBtn: true,
                showEmptyBtn: true,
                showCloseBtn: true,
                persianDigits: false,
                zIndex: 1000,
            });

            if (dateTriggerBtn) {
                dateTriggerBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (jalaliPicker.isShow && jalaliPicker.input === dateFilterInput) {
                        jalaliPicker.hide();
                        return;
                    }
                    dateFilterInput.focus({ preventScroll: true });
                    jalaliPicker.show(dateFilterInput);
                });
            }

            dateFilterInput.addEventListener('click', () => {
                if (!jalaliPicker.isShow || jalaliPicker.input !== dateFilterInput) {
                    jalaliPicker.show(dateFilterInput);
                }
            });

            const adminMainEl = document.getElementById('main-content');
            if (adminMainEl) {
                adminMainEl.addEventListener(
                    'scroll',
                    () => {
                        if (jalaliPicker.isShow) {
                            jalaliPicker.hide();
                        }
                    },
                    { passive: true }
                );
            }
        }

        const getDataRows = () => Array.from(table.querySelectorAll('[data-post-row]'));

        const syncSelectAllState = () => {
            if (!selectAllCheckbox) return;
            const visibleCheckboxes = getDataRows()
                .filter((row) => !row.classList.contains('hidden'))
                .map((row) => row.querySelector('[data-post-checkbox]'))
                .filter(Boolean);
            selectAllCheckbox.checked =
                visibleCheckboxes.length > 0 && visibleCheckboxes.every((box) => box.checked);
        };

        const applyFilters = () => {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            const category = categoryFilter ? categoryFilter.value : 'all';
            const status = statusFilter ? statusFilter.value : 'all';
            const selectedDate = dateFilterInput
                ? normalizeDigitsToLatin(dateFilterInput.value).trim()
                : '';

            if (dateClearBtn) {
                dateClearBtn.classList.toggle('hidden', !selectedDate);
            }

            let visibleCount = 0;
            getDataRows().forEach((row) => {
                const rowTitle = (row.dataset.title || row.textContent || '').toLowerCase();
                const rowCategory = row.dataset.category || '';
                const rowStatus = row.dataset.status || '';
                const rowDate = normalizeDigitsToLatin(row.dataset.date || '').trim();

                const matchesQuery = !query || rowTitle.includes(query);
                const matchesCategory = category === 'all' || rowCategory === category;
                const matchesStatus = status === 'all' || rowStatus === status;
                const matchesDate = !selectedDate || rowDate === selectedDate;
                const isVisible = matchesQuery && matchesCategory && matchesStatus && matchesDate;

                row.classList.toggle('hidden', !isVisible);
                if (isVisible) {
                    visibleCount += 1;
                }
            });

            if (emptyRow) {
                emptyRow.classList.toggle('hidden', visibleCount > 0);
            }
            if (totalCountEl) {
                totalCountEl.textContent = visibleCount.toLocaleString('fa-IR');
            }
            syncSelectAllState();
        };

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        if (categoryFilter) {
            categoryFilter.addEventListener('change', applyFilters);
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', applyFilters);
        }
        if (dateFilterInput) {
            dateFilterInput.addEventListener('input', applyFilters);
            dateFilterInput.addEventListener('change', applyFilters);
            dateFilterInput.addEventListener('jdp:change', applyFilters);
        }
        if (dateClearBtn && dateFilterInput) {
            dateClearBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                dateFilterInput.value = '';
                if (jalaliPicker && jalaliPicker.isShow) {
                    jalaliPicker.hide();
                }
                applyFilters();
            });
        }

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', () => {
                const checked = selectAllCheckbox.checked;
                getDataRows().forEach((row) => {
                    if (row.classList.contains('hidden')) return;
                    const box = row.querySelector('[data-post-checkbox]');
                    if (box) {
                        box.checked = checked;
                    }
                });
            });
        }

        table.addEventListener('change', (event) => {
            if (event.target.matches('[data-post-checkbox]')) {
                syncSelectAllState();
            }
        });

        table.addEventListener('click', (event) => {
            const deleteBtn = event.target.closest('[data-post-delete]');
            if (!deleteBtn) return;

            const row = deleteBtn.closest('[data-post-row]');
            if (!row) return;
            const title = row.dataset.title || 'نوشته انتخاب‌شده';
            row.remove();
            applyFilters();
            showToast(`نوشته «${title}» حذف و به زباله‌دان منتقل شد.`, 'info');
        });

        applyFilters();
        initPaginationControl(document.getElementById('admin-posts-pagination'));
    }

    /**
     * Phase 12: Manage news categories (create new category with slug, filter table, bulk select & delete).
     */
    function initAdminCategoriesPage() {
        const form = document.getElementById('create-category-form');
        const table = document.getElementById('categories-table');
        if (!form || !table) return;

        const nameInput = document.getElementById('category-name-input');
        const slugInput = document.getElementById('category-slug-input');
        const parentSelect = document.getElementById('category-parent-select');
        const descInput = document.getElementById('category-desc-input');
        const searchInput = document.getElementById('categories-search-input');
        const selectAllCheckbox = document.getElementById('categories-select-all');
        const tbody = document.getElementById('categories-tbody');
        const emptyRow = document.getElementById('categories-empty-row');
        const totalCountEl = document.getElementById('categories-total-count');

        let isSlugManuallyEdited = false;

        if (slugInput) {
            slugInput.addEventListener('input', () => {
                isSlugManuallyEdited = slugInput.value.trim().length > 0;
            });
        }

        if (nameInput && slugInput) {
            nameInput.addEventListener('input', () => {
                if (isSlugManuallyEdited) return;
                slugInput.value = slugifyText(nameInput.value);
            });
        }

        const getCategoryRows = () => Array.from(table.querySelectorAll('[data-category-row]'));

        const syncCategoryFilters = () => {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let visibleCount = 0;

            getCategoryRows().forEach((row) => {
                const hay = (row.dataset.categorySearch || row.textContent || '').toLowerCase();
                const matches = !query || hay.includes(query);
                row.classList.toggle('hidden', !matches);
                if (matches) visibleCount += 1;
            });

            if (emptyRow) {
                emptyRow.classList.toggle('hidden', visibleCount > 0);
            }
            if (totalCountEl) {
                totalCountEl.textContent = getCategoryRows().length.toLocaleString('fa-IR');
            }
            if (selectAllCheckbox) {
                const visibleBoxes = getCategoryRows()
                    .filter((row) => !row.classList.contains('hidden'))
                    .map((row) => row.querySelector('[data-category-checkbox]'))
                    .filter(Boolean);
                selectAllCheckbox.checked = visibleBoxes.length > 0 && visibleBoxes.every((box) => box.checked);
            }
        };

        const buildCategoryRowElement = ({ name, slug, parentLabel, description }) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-category-row', '');
            tr.dataset.categoryName = name;
            tr.dataset.categorySearch = `${name} ${slug} ${parentLabel} ${description}`;
            tr.className = 'hover:bg-gray-50/80 dark:hover:bg-slate-700/30 transition-colors';

            const tdCheck = document.createElement('td');
            tdCheck.className = 'py-4 pr-5 pl-3';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('data-category-checkbox', '');
            checkbox.setAttribute('aria-label', `انتخاب دسته‌بندی ${name}`);
            checkbox.className = 'w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary cursor-pointer';
            tdCheck.appendChild(checkbox);

            const tdName = document.createElement('td');
            tdName.className = 'py-4 px-4';
            const titleEl = document.createElement('p');
            titleEl.className = 'font-bold text-gray-900 dark:text-white';
            titleEl.textContent = parentLabel !== '—' ? `— ${name}` : name;
            const subEl = document.createElement('p');
            subEl.className = 'text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1';
            subEl.textContent = description || 'دسته‌بندی تخصصی اخبار و گزارش‌ها';
            tdName.append(titleEl, subEl);

            const tdSlug = document.createElement('td');
            tdSlug.className = 'py-4 px-4 whitespace-nowrap';
            const slugCode = document.createElement('code');
            slugCode.dir = 'ltr';
            slugCode.className = 'inline-block px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-900 text-xs font-mono text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700';
            slugCode.textContent = slug;
            tdSlug.appendChild(slugCode);

            const tdParent = document.createElement('td');
            tdParent.className = 'py-4 px-4 whitespace-nowrap text-xs text-gray-600 dark:text-slate-300';
            tdParent.textContent = parentLabel;

            const tdCount = document.createElement('td');
            tdCount.className = 'py-4 px-4 whitespace-nowrap';
            const countBadge = document.createElement('a');
            countBadge.href = resolveAdminUrl('admin-posts.html');
            countBadge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/60 text-primary dark:text-red-300 hover:underline';
            countBadge.textContent = '۰ مطلب';
            tdCount.appendChild(countBadge);

            const tdActions = document.createElement('td');
            tdActions.className = 'py-4 px-5 text-left whitespace-nowrap';
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.setAttribute('data-category-delete', '');
            deleteBtn.setAttribute('aria-label', `حذف دسته‌بندی ${name}`);
            deleteBtn.className = 'p-2 rounded-lg text-gray-500 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 transition-colors text-xs font-bold';
            deleteBtn.textContent = 'حذف';
            tdActions.appendChild(deleteBtn);

            tr.append(tdCheck, tdName, tdSlug, tdParent, tdCount, tdActions);
            return tr;
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = nameInput ? nameInput.value.trim() : '';
            const rawSlug = slugInput ? slugInput.value.trim() : '';
            const slug = slugifyText(rawSlug || name);
            const description = descInput ? descInput.value.trim() : '';
            const parentValue = parentSelect ? parentSelect.value : 'none';
            const parentLabel =
                parentSelect && parentValue !== 'none'
                    ? parentSelect.options[parentSelect.selectedIndex].textContent.trim()
                    : '—';

            if (!name || !slug) {
                showToast('لطفاً نام و نامک (Slug) دسته‌بندی را وارد کنید.', 'error');
                if (nameInput) nameInput.focus();
                return;
            }

            if (tbody) {
                const newRow = buildCategoryRowElement({ name, slug, parentLabel, description });
                tbody.prepend(newRow);
            }

            if (parentSelect && parentValue === 'none') {
                const option = document.createElement('option');
                option.value = slug;
                option.textContent = name;
                parentSelect.appendChild(option);
            }

            form.reset();
            isSlugManuallyEdited = false;
            syncCategoryFilters();
            showToast(`دسته‌بندی «${name}» با موفقیت ایجاد شد.`, 'success');
        });

        if (searchInput) {
            searchInput.addEventListener('input', syncCategoryFilters);
        }

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', () => {
                const checked = selectAllCheckbox.checked;
                getCategoryRows().forEach((row) => {
                    if (row.classList.contains('hidden')) return;
                    const box = row.querySelector('[data-category-checkbox]');
                    if (box) box.checked = checked;
                });
            });
        }

        table.addEventListener('change', (event) => {
            if (event.target.matches('[data-category-checkbox]')) {
                syncCategoryFilters();
            }
        });

        table.addEventListener('click', (event) => {
            const deleteBtn = event.target.closest('[data-category-delete]');
            if (!deleteBtn) return;
            const row = deleteBtn.closest('[data-category-row]');
            if (!row) return;
            const catName = row.dataset.categoryName || 'دسته‌بندی';
            row.remove();
            syncCategoryFilters();
            showToast(`دسته‌بندی «${catName}» حذف شد.`, 'info');
        });

        syncCategoryFilters();
    }

    /**
     * Phase 13: Comments moderation table (status filter, search, Approve/Reply/Spam/Trash actions).
     */
    function initAdminCommentsPage() {
        const table = document.getElementById('comments-table');
        if (!table) return;

        const searchInput = document.getElementById('comments-search-input');
        const selectAllCheckbox = document.getElementById('comments-select-all');
        const filterBtns = Array.from(document.querySelectorAll('[data-comment-filter]'));
        const emptyRow = document.getElementById('comments-empty-row');
        const totalCountEl = document.getElementById('comments-total-count');

        let activeFilter = 'all';

        const statusMap = {
            approved: {
                label: 'تاییدشده',
                classes: ['bg-emerald-100', 'dark:bg-emerald-950/60', 'text-emerald-700', 'dark:text-emerald-300'],
                toast: 'دیدگاه تایید و در صفحه خبر منتشر شد.',
                toastType: 'success'
            },
            pending: {
                label: 'در انتظار تایید',
                classes: ['bg-sky-100', 'dark:bg-sky-950/60', 'text-sky-700', 'dark:text-sky-300'],
                toast: 'وضعیت دیدگاه به در انتظار بررسی تغییر یافت.',
                toastType: 'info'
            },
            spam: {
                label: 'هرزنامه',
                classes: ['bg-amber-100', 'dark:bg-amber-950/60', 'text-amber-700', 'dark:text-amber-300'],
                toast: 'دیدگاه به‌عنوان هرزنامه (Spam) علامت‌گذاری شد.',
                toastType: 'info'
            }
        };
        const allBadgeClasses = Object.values(statusMap).flatMap((cfg) => cfg.classes);

        const getRows = () => Array.from(table.querySelectorAll('[data-comment-row]'));

        const applyCommentFilters = () => {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let visibleCount = 0;

            getRows().forEach((row) => {
                const status = row.dataset.commentStatus || 'pending';
                const hay = (row.dataset.commentSearch || row.textContent || '').toLowerCase();
                const matchesFilter = activeFilter === 'all' || status === activeFilter;
                const matchesQuery = !query || hay.includes(query);
                const visible = matchesFilter && matchesQuery;

                row.classList.toggle('hidden', !visible);
                if (visible) visibleCount += 1;
            });

            if (emptyRow) {
                emptyRow.classList.toggle('hidden', visibleCount > 0);
            }
            if (totalCountEl) {
                totalCountEl.textContent = visibleCount.toLocaleString('fa-IR');
            }
            if (selectAllCheckbox) {
                const visibleBoxes = getRows()
                    .filter((row) => !row.classList.contains('hidden'))
                    .map((row) => row.querySelector('[data-comment-checkbox]'))
                    .filter(Boolean);
                selectAllCheckbox.checked = visibleBoxes.length > 0 && visibleBoxes.every((box) => box.checked);
            }
        };

        const setRowStatus = (row, nextStatus, silent = false) => {
            const cfg = statusMap[nextStatus];
            if (!cfg) return;
            row.dataset.commentStatus = nextStatus;

            const badge = row.querySelector('[data-comment-status-badge]');
            if (badge) {
                badge.classList.remove(...allBadgeClasses);
                badge.classList.add(...cfg.classes);
                badge.textContent = cfg.label;
            }
            if (!silent) {
                showToast(cfg.toast, cfg.toastType);
            }
            applyCommentFilters();
        };

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                activeFilter = btn.dataset.commentFilter || 'all';
                filterBtns.forEach((other) => {
                    const selected = other === btn;
                    other.setAttribute('aria-pressed', String(selected));
                    other.classList.toggle('bg-primary', selected);
                    other.classList.toggle('text-white', selected);
                    other.classList.toggle('bg-white', !selected);
                    other.classList.toggle('dark:bg-slate-800', !selected);
                    other.classList.toggle('text-gray-700', !selected);
                    other.classList.toggle('dark:text-slate-300', !selected);
                });
                applyCommentFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', applyCommentFilters);
        }

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', () => {
                const checked = selectAllCheckbox.checked;
                getRows().forEach((row) => {
                    if (row.classList.contains('hidden')) return;
                    const box = row.querySelector('[data-comment-checkbox]');
                    if (box) box.checked = checked;
                });
            });
        }

        table.addEventListener('change', (event) => {
            if (event.target.matches('[data-comment-checkbox]')) {
                applyCommentFilters();
            }
        });

        table.addEventListener('click', (event) => {
            const actionBtn = event.target.closest('[data-comment-action]');
            if (actionBtn) {
                const row = actionBtn.closest('[data-comment-row]');
                if (!row) return;
                const action = actionBtn.dataset.commentAction;

                if (action === 'approve' || action === 'spam') {
                    setRowStatus(row, action === 'approve' ? 'approved' : 'spam');
                } else if (action === 'trash') {
                    row.remove();
                    applyCommentFilters();
                    showToast('دیدگاه به زباله‌دان منتقل شد.', 'info');
                } else if (action === 'reply') {
                    const replyBox = row.querySelector('[data-comment-reply-box]');
                    if (replyBox) {
                        const isHidden = replyBox.classList.toggle('hidden');
                        if (!isHidden) {
                            const textarea = replyBox.querySelector('textarea');
                            if (textarea) textarea.focus();
                        }
                    }
                }
                return;
            }

            const sendReplyBtn = event.target.closest('[data-comment-reply-submit]');
            if (sendReplyBtn) {
                const row = sendReplyBtn.closest('[data-comment-row]');
                const replyBox = sendReplyBtn.closest('[data-comment-reply-box]');
                const textarea = replyBox ? replyBox.querySelector('textarea') : null;
                const replyText = textarea ? textarea.value.trim() : '';

                if (!replyText) {
                    showToast('لطفاً متن پاسخ خود را بنویسید.', 'error');
                    if (textarea) textarea.focus();
                    return;
                }

                const note = document.createElement('p');
                note.className = 'mt-2 px-3 py-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200';
                note.textContent = `پاسخ تحریریه: ${replyText}`;

                if (replyBox) {
                    replyBox.insertAdjacentElement('beforebegin', note);
                    replyBox.classList.add('hidden');
                    if (textarea) textarea.value = '';
                }
                if (row) {
                    setRowStatus(row, 'approved', true);
                }
                showToast('پاسخ شما ثبت و دیدگاه تایید شد.', 'success');
            }
        });

        applyCommentFilters();
        initPaginationControl(document.getElementById('admin-comments-pagination'));
    }

    /**
     * Phase 13: Team & users management page (search, role filter, Add New User modal, row deletion).
     */
    function initAdminUsersPage() {
        const table = document.getElementById('users-table');
        if (!table) return;

        const searchInput = document.getElementById('users-search-input');
        const roleFilter = document.getElementById('users-role-filter');
        const tbody = document.getElementById('users-tbody');
        const emptyRow = document.getElementById('users-empty-row');
        const totalCountEl = document.getElementById('users-total-count');

        const addUserBtn = document.getElementById('add-user-btn');
        const modal = document.getElementById('add-user-modal');
        const modalBackdrop = document.getElementById('add-user-backdrop');
        const closeBtn = document.getElementById('add-user-close-btn');
        const cancelBtn = document.getElementById('add-user-cancel-btn');
        const addForm = document.getElementById('add-user-form');

        const roleConfig = {
            admin: {
                label: 'مدیر کل (Admin)',
                badgeClass: 'bg-primary-50 dark:bg-primary-950/60 text-primary dark:text-red-300 border border-primary/20'
            },
            editor: {
                label: 'دبیر سرویس (Editor)',
                badgeClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
            },
            contributor: {
                label: 'خبرنگار (Contributor)',
                badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            }
        };

        const getUserRows = () => Array.from(table.querySelectorAll('[data-user-row]'));

        const applyUserFilters = () => {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            const role = roleFilter ? roleFilter.value : 'all';
            let visibleCount = 0;

            getUserRows().forEach((row) => {
                const rowRole = row.dataset.userRole || '';
                const hay = (row.dataset.userSearch || row.textContent || '').toLowerCase();
                const visible = (role === 'all' || rowRole === role) && (!query || hay.includes(query));
                row.classList.toggle('hidden', !visible);
                if (visible) visibleCount += 1;
            });

            if (emptyRow) {
                emptyRow.classList.toggle('hidden', visibleCount > 0);
            }
            if (totalCountEl) {
                totalCountEl.textContent = visibleCount.toLocaleString('fa-IR');
            }
        };

        const setModalOpen = (isOpen) => {
            if (!modal) return;
            setDisclosureState(addUserBtn, modal, isOpen);
            if (isOpen) {
                const nameInput = document.getElementById('new-user-name');
                if (nameInput) nameInput.focus();
            }
        };

        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => setModalOpen(true));
        }
        [closeBtn, cancelBtn, modalBackdrop].forEach((el) => {
            if (el) el.addEventListener('click', () => setModalOpen(false));
        });
        bindEscapeKey(() => setModalOpen(false));

        const buildUserRow = ({ name, email, roleKey, title, avatarUrl }) => {
            const cfg = roleConfig[roleKey] || roleConfig.contributor;
            const tr = document.createElement('tr');
            tr.setAttribute('data-user-row', '');
            tr.dataset.userRole = roleKey;
            tr.dataset.userName = name;
            tr.dataset.userSearch = `${name} ${email} ${title}`;
            tr.className = 'hover:bg-gray-50/80 dark:hover:bg-slate-700/30 transition-colors';

            const tdProfile = document.createElement('td');
            tdProfile.className = 'py-4 px-5';
            const profileWrap = document.createElement('div');
            profileWrap.className = 'flex items-center gap-3';
            const img = document.createElement('img');
            img.src = pickAvatarUrl(name, avatarUrl);
            img.alt = `تصویر ${name}`;
            img.className = 'w-10 h-10 rounded-full object-cover object-top border border-gray-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 shrink-0';
            attachAvatarFallback(img, name);
            const nameBox = document.createElement('div');
            const nameP = document.createElement('p');
            nameP.className = 'font-bold text-gray-900 dark:text-white';
            nameP.textContent = name;
            const titleSpan = document.createElement('span');
            titleSpan.className = 'block text-xs text-gray-400';
            titleSpan.textContent = title || 'عضو جدید تحریریه';
            nameBox.append(nameP, titleSpan);
            profileWrap.append(img, nameBox);
            tdProfile.appendChild(profileWrap);

            const tdEmail = document.createElement('td');
            tdEmail.dir = 'ltr';
            tdEmail.className = 'py-4 px-4 whitespace-nowrap text-xs font-mono text-gray-600 dark:text-slate-300 text-right';
            tdEmail.textContent = email;

            const tdRole = document.createElement('td');
            tdRole.className = 'py-4 px-4 whitespace-nowrap';
            const roleSpan = document.createElement('span');
            roleSpan.className = `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${cfg.badgeClass}`;
            roleSpan.textContent = cfg.label;
            tdRole.appendChild(roleSpan);

            const tdPosts = document.createElement('td');
            tdPosts.className = 'py-4 px-4 whitespace-nowrap text-xs font-bold text-gray-700 dark:text-slate-200';
            tdPosts.textContent = '۰ مطلب';

            const tdActions = document.createElement('td');
            tdActions.className = 'py-4 px-5 text-left whitespace-nowrap';
            const actionWrap = document.createElement('div');
            actionWrap.className = 'flex items-center justify-end gap-2';
            const profileLink = document.createElement('a');
            profileLink.href = resolveFrontendUrl('author.html');
            profileLink.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors';
            profileLink.textContent = 'نمایه';
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.setAttribute('data-user-delete', '');
            deleteBtn.setAttribute('aria-label', `حذف کاربر ${name}`);
            deleteBtn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors';
            deleteBtn.textContent = 'حذف';
            actionWrap.append(profileLink, deleteBtn);
            tdActions.appendChild(actionWrap);

            tr.append(tdProfile, tdEmail, tdRole, tdPosts, tdActions);
            return tr;
        };

        if (addForm) {
            addForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const nameInput = document.getElementById('new-user-name');
                const emailInput = document.getElementById('new-user-email');
                const roleInput = document.getElementById('new-user-role');
                const titleInput = document.getElementById('new-user-title');
                const avatarInput = document.getElementById('new-user-avatar');

                const name = nameInput ? nameInput.value.trim() : '';
                const email = emailInput ? emailInput.value.trim() : '';
                const roleKey = roleInput ? roleInput.value : 'contributor';
                const title = titleInput ? titleInput.value.trim() : '';
                const avatarUrl = avatarInput ? avatarInput.value : 'auto';

                if (!name || !email) {
                    showToast('لطفاً نام کامل و ایمیل عضو تحریریه را وارد کنید.', 'error');
                    return;
                }

                if (tbody) {
                    tbody.prepend(buildUserRow({ name, email, roleKey, title, avatarUrl }));
                }
                addForm.reset();
                setModalOpen(false);
                applyUserFilters();
                showToast(`حساب کاربری «${name}» با موفقیت ایجاد شد.`, 'success');
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', applyUserFilters);
        }
        if (roleFilter) {
            roleFilter.addEventListener('change', applyUserFilters);
        }

        table.addEventListener('click', (event) => {
            const deleteBtn = event.target.closest('[data-user-delete]');
            if (!deleteBtn) return;
            const row = deleteBtn.closest('[data-user-row]');
            if (!row) return;
            const name = row.dataset.userName || 'کاربر';
            row.remove();
            applyUserFilters();
            showToast(`دسترسی «${name}» از تیم تحریریه حذف شد.`, 'info');
        });

        applyUserFilters();
    }

    /**
     * Phase 13: Global configuration page (vertical ARIA tabs, site logo upload preview, save changes toast).
     */
    function initAdminSettingsPage() {
        const tabsContainer = document.getElementById('admin-settings-tabs');
        const form = document.getElementById('admin-settings-form');
        if (!tabsContainer || !form) return;

        initTabs(tabsContainer);

        const logoInput = document.getElementById('setting-logo-input');
        const logoTrigger = document.getElementById('setting-logo-trigger');
        const logoPreview = document.getElementById('setting-logo-preview');
        const logoFilename = document.getElementById('setting-logo-filename');
        let logoObjectUrl = null;

        if (logoTrigger && logoInput) {
            logoTrigger.addEventListener('click', () => logoInput.click());
        }

        if (logoInput) {
            logoInput.addEventListener('change', () => {
                const file = logoInput.files && logoInput.files[0];
                if (!file) return;
                if (!file.type || !file.type.startsWith('image/')) {
                    showToast('لطفاً یک فایل تصویری معتبر برای نشان رسانه انتخاب کنید.', 'error');
                    return;
                }
                if (logoObjectUrl) {
                    URL.revokeObjectURL(logoObjectUrl);
                }
                logoObjectUrl = URL.createObjectURL(file);
                if (logoPreview) {
                    logoPreview.src = logoObjectUrl;
                }
                if (logoFilename) {
                    logoFilename.textContent = file.name;
                }
                showToast('تصویر لوگوی جدید آماده ذخیره است.', 'info');
            });
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const siteTitleEl = document.getElementById('setting-site-title');
            const adminEmailEl = document.getElementById('setting-admin-email');

            const siteTitle = siteTitleEl ? siteTitleEl.value.trim() : '';
            const adminEmail = adminEmailEl ? adminEmailEl.value.trim() : '';

            if (!siteTitle || !adminEmail) {
                showToast('عنوان رسانه و ایمیل مدیر کل نمی‌توانند خالی باشند.', 'error');
                return;
            }

            showToast(`تنظیمات «${siteTitle}» با موفقیت در پیکربندی سامانه ذخیره شد.`, 'success');
        });
    }

    /**
     * Hide the full-screen brand preloader cleanly.
     * @param {boolean} [immediate=false]
     */
    function hidePageLoader(immediate = false) {
        const loader = document.getElementById('rasad-page-loader');
        if (!loader) return;

        loader.classList.remove('is-force-visible');
        if (immediate) {
            loader.classList.add('is-hidden');
            loader.setAttribute('aria-hidden', 'true');
            return;
        }

        window.setTimeout(() => {
            loader.classList.add('is-hidden');
            loader.setAttribute('aria-hidden', 'true');
        }, 240);
    }

    /**
     * Display the brand preloader overlay with optional status message.
     * @param {string} [statusText]
     */
    function showPageLoader(statusText = 'در حال بازنمایی لودر صفحه...') {
        const loader = document.getElementById('rasad-page-loader');
        if (!loader) return;

        const statusEl = loader.querySelector('.rasad-loader-status');
        if (statusEl && statusText) {
            statusEl.textContent = statusText;
        }

        loader.classList.remove('is-hidden');
        loader.classList.add('is-force-visible');
        loader.setAttribute('aria-hidden', 'false');
    }

    /**
     * Replay the modern page loader briefly for interactive preview on loading-demo.html.
     */
    function replayLoaderPreview() {
        showPageLoader('در حال بازنمایی لودر صفحه...');
        window.setTimeout(() => {
            hidePageLoader(true);
            showToast('نمایش لودر مدرن صفحه با موفقیت اجرا شد.', 'success');
        }, 1150);
    }

    /**
     * Phase 22: Initialize global page preloader lifecycle and expose RasadUI controls.
     */
    function initPageLoader() {
        const loader = document.getElementById('rasad-page-loader');
        if (!loader) return;

        window.RasadUI = window.RasadUI || {};
        window.RasadUI.showPageLoader = showPageLoader;
        window.RasadUI.hidePageLoader = hidePageLoader;

        if (document.readyState === 'complete') {
            hidePageLoader();
        } else {
            window.addEventListener('load', () => hidePageLoader(), { once: true });
            window.setTimeout(() => hidePageLoader(), 650);
        }
    }

    /**
     * Initialize accessible eye toggles on password fields and reset masking on form reset.
     */
    function initPasswordToggles() {
        const toggles = Array.from(document.querySelectorAll('[data-password-toggle]'));
        if (!toggles.length) return;

        const syncToggleVisual = (btn, isVisible) => {
            const openIcon = btn.querySelector('[data-eye-open]');
            const closedIcon = btn.querySelector('[data-eye-closed]');
            const label = isVisible ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور';

            btn.setAttribute('aria-pressed', String(isVisible));
            btn.setAttribute('aria-label', label);
            btn.setAttribute('title', label);

            if (openIcon) openIcon.classList.toggle('hidden', isVisible);
            if (closedIcon) closedIcon.classList.toggle('hidden', !isVisible);
        };

        const resetScope = (scopeEl = document) => {
            const root = scopeEl && typeof scopeEl.querySelectorAll === 'function' ? scopeEl : document;
            root.querySelectorAll('[data-password-toggle]').forEach((btn) => {
                const inputId = btn.getAttribute('data-password-toggle');
                const input = inputId ? document.getElementById(inputId) : null;
                if (input) {
                    input.type = 'password';
                }
                syncToggleVisual(btn, false);
            });
        };

        const trackedForms = new Set();

        toggles.forEach((btn) => {
            const inputId = btn.getAttribute('data-password-toggle');
            const input = inputId ? document.getElementById(inputId) : null;
            if (!input) return;

            syncToggleVisual(btn, input.type === 'text');

            btn.addEventListener('click', () => {
                const showPassword = input.type === 'password';
                input.type = showPassword ? 'text' : 'password';
                syncToggleVisual(btn, showPassword);
                input.focus({ preventScroll: true });
            });

            if (input.form && !trackedForms.has(input.form)) {
                trackedForms.add(input.form);
                input.form.addEventListener('reset', () => {
                    window.requestAnimationFrame(() => resetScope(input.form));
                });
            }
        });

        window.RasadUI = window.RasadUI || {};
        window.RasadUI.resetPasswordVisibility = resetScope;
    }

    /**
     * Initialize interactive retry and permission-request actions on status/error pages.
     */
    function initErrorPages() {
        const retryButtons = Array.from(document.querySelectorAll('[data-error-retry]'));
        retryButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                btn.disabled = true;
                showToast('در حال بررسی مجدد وضعیت سرور و بارگذاری صفحه...', 'info');
                window.setTimeout(() => {
                    window.location.reload();
                }, 650);
            });
        });

        const permissionButtons = Array.from(document.querySelectorAll('[data-permission-request]'));
        permissionButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                btn.disabled = true;
                btn.setAttribute('aria-disabled', 'true');
                const labelEl = btn.querySelector('[data-request-label]') || btn;
                labelEl.textContent = 'درخواست دسترسی ثبت شد ✓';
                btn.classList.add('opacity-75', 'cursor-not-allowed');

                const feedbackEl = document.getElementById('permission-request-feedback');
                if (feedbackEl) {
                    setStatusBanner(
                        feedbackEl,
                        'درخواست ارتقای مجوز شما با شناسه پیگیری #PERM-1405 ثبت و برای مدیر کل تحریریه ارسال گردید.',
                        false
                    );
                }

                showToast('درخواست مجوز دسترسی با موفقیت برای مدیر سیستم ارسال شد.', 'success');
            });
        });
    }

    /**
     * Bootstrap all application modules once the DOM is ready.
     */
    function initApp() {
        initPageLoader();
        initPersianDate();
        initThemeManager();
        initAvatarFallbacks();
        initNavigation();
        initPasswordToggles();
        initAuthModal();
        initErrorPages();
        initSidebarWidgets();
        initReadingProgress();
        initArticleAccessibility();
        initArticleComments();
        initArchivePage();
        initSearchPage();
        initDashboardPage();
        initAuthorPage();
        initVideoHubPage();
        initContactPage();
        initLoadingDemoPage();
        initAdminSidebar();
        initAdminDashboardPage();
        initAdminWritePage();
        initRtlAdminShell();
        initOverviewQuickDraft();
        initAdminPostsPage();
        initAdminCategoriesPage();
        initAdminCommentsPage();
        initAdminUsersPage();
        initAdminSettingsPage();
        initFooterNewsletter();
    }

    let isAppInitialized = false;

    function startApp() {
        if (isAppInitialized) return;
        isAppInitialized = true;
        initApp();
    }

    if (document.readyState === 'complete') {
        startApp();
    } else {
        document.addEventListener('DOMContentLoaded', startApp);
    }
})();
