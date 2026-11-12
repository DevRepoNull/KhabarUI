'use strict';

/**
 * Enterprise-grade Vanilla JS form validation using localized JustValidate.
 * Covers Auth Modal (#login-form, #register-form) and Admin Write (#admin-write-form).
 */
(() => {
    const ERROR_FIELD_CLASSES = [
        'border-red-500',
        '!border-red-500',
        'focus:!border-red-500',
        'focus:!ring-red-500/20',
    ];

    const ERROR_LABEL_CLASSES = [
        'mt-1.5',
        'text-xs',
        'font-semibold',
        'text-red-500',
        'dark:text-red-400',
        'leading-5',
    ];

    /**
     * Trigger global floating Toast Notification when available.
     * @param {string} message
     * @param {'success' | 'error' | 'info'} [type='info']
     */
    function notifyToast(message, type = 'info') {
        if (!message) return;

        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
            return;
        }

        if (window.RasadUI && typeof window.RasadUI.showToast === 'function') {
            window.RasadUI.showToast(message, type);
        }
    }

    /**
     * Build consistent JustValidate options styled with Tailwind utility classes.
     * @param {Record<string, unknown>} [overrides]
     * @returns {Record<string, unknown>}
     */
    function createValidatorConfig(overrides = {}) {
        return {
            errorFieldStyle: {},
            errorLabelStyle: {},
            errorFieldCssClass: ERROR_FIELD_CLASSES,
            errorLabelCssClass: ERROR_LABEL_CLASSES,
            focusInvalidField: true,
            lockForm: false,
            submitFormAutomatically: false,
            validateBeforeSubmitting: false,
            ...overrides,
        };
    }

    /**
     * Toggle visual red error border on custom non-input wrapper elements.
     * @param {HTMLElement | null} targetEl
     * @param {boolean} isInvalid
     */
    function setCustomErrorBorder(targetEl, isInvalid) {
        if (!targetEl) return;
        ERROR_FIELD_CLASSES.forEach((cls) => {
            targetEl.classList.toggle(cls, isInvalid);
        });
    }

    /**
     * Clear any existing status feedback banner in the Auth Modal before showing field errors.
     * @param {HTMLElement | null} feedbackEl
     */
    function clearAuthFeedbackBanner(feedbackEl) {
        if (!feedbackEl) return;
        feedbackEl.classList.add('hidden');
        feedbackEl.textContent = '';
    }

    /**
     * Configure JustValidate rules on the Login and Register forms inside Auth Modal.
     * @param {typeof window.JustValidate} JustValidateCtor
     */
    function initAuthValidation(JustValidateCtor) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const feedbackEl = document.getElementById('auth-feedback');
        const validators = [];

        if (loginForm) {
            loginForm.dataset.justValidate = 'true';
            const loginValidator = new JustValidateCtor(loginForm, createValidatorConfig());

            loginValidator
                .addField('#login-email', [
                    {
                        rule: 'required',
                        errorMessage: 'لطفاً نشانی ایمیل خود را وارد کنید.',
                    },
                    {
                        rule: 'email',
                        errorMessage: 'فرمت ایمیل واردشده معتبر نیست (مثال: name@example.com).',
                    },
                ])
                .addField(
                    '#login-password',
                    [
                        {
                            rule: 'required',
                            errorMessage: 'لطفاً رمز عبور خود را وارد کنید.',
                        },
                        {
                            rule: 'minLength',
                            value: 8,
                            errorMessage: 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
                        },
                        {
                            rule: 'password',
                            errorMessage: 'رمز عبور باید شامل حداقل یک حرف انگلیسی و یک عدد باشد.',
                        },
                    ],
                    document.getElementById('login-password-error')
                        ? { errorsContainer: '#login-password-error' }
                        : undefined
                )
                .onFail(() => {
                    clearAuthFeedbackBanner(feedbackEl);
                })
                .onSuccess((event) => {
                    if (event) event.preventDefault();
                    const emailInput = document.getElementById('login-email');
                    const email = emailInput ? emailInput.value.trim() : '';

                    clearAuthFeedbackBanner(feedbackEl);
                    loginForm.reset();
                    loginValidator.refresh();

                    if (window.RasadUI && typeof window.RasadUI.closeAuthModal === 'function') {
                        window.RasadUI.closeAuthModal();
                    }

                    notifyToast(`ورود با ایمیل ${email} با موفقیت انجام شد.`, 'success');
                });

            validators.push(loginValidator);
        }

        if (registerForm) {
            registerForm.dataset.justValidate = 'true';
            const registerValidator = new JustValidateCtor(registerForm, createValidatorConfig());

            registerValidator
                .addField('#register-name', [
                    {
                        rule: 'required',
                        errorMessage: 'لطفاً نام و نام خانوادگی را وارد کنید.',
                    },
                    {
                        rule: 'minLength',
                        value: 3,
                        errorMessage: 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.',
                    },
                ])
                .addField('#register-email', [
                    {
                        rule: 'required',
                        errorMessage: 'لطفاً نشانی ایمیل خود را وارد کنید.',
                    },
                    {
                        rule: 'email',
                        errorMessage: 'فرمت ایمیل واردشده معتبر نیست (مثال: name@example.com).',
                    },
                ])
                .addField(
                    '#register-password',
                    [
                        {
                            rule: 'required',
                            errorMessage: 'لطفاً رمز عبور خود را وارد کنید.',
                        },
                        {
                            rule: 'minLength',
                            value: 8,
                            errorMessage: 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
                        },
                        {
                            rule: 'password',
                            errorMessage: 'رمز عبور باید شامل حداقل یک حرف انگلیسی و یک عدد باشد.',
                        },
                    ],
                    document.getElementById('register-password-error')
                        ? { errorsContainer: '#register-password-error' }
                        : undefined
                )
                .addField(
                    '#register-confirm-password',
                    [
                        {
                            rule: 'required',
                            errorMessage: 'لطفاً تکرار رمز عبور را وارد کنید.',
                        },
                        {
                            validator: (value) => {
                                const passwordInput = document.getElementById('register-password');
                                return Boolean(passwordInput && value === passwordInput.value);
                            },
                            errorMessage: 'تکرار رمز عبور با رمز عبور اصلی مطابقت ندارد.',
                        },
                    ],
                    document.getElementById('register-confirm-password-error')
                        ? { errorsContainer: '#register-confirm-password-error' }
                        : undefined
                )
                .onFail(() => {
                    clearAuthFeedbackBanner(feedbackEl);
                })
                .onSuccess((event) => {
                    if (event) event.preventDefault();
                    const nameInput = document.getElementById('register-name');
                    const fullName = nameInput ? nameInput.value.trim() : 'کاربر جدید';

                    clearAuthFeedbackBanner(feedbackEl);
                    registerForm.reset();
                    registerValidator.refresh();

                    if (window.RasadUI && typeof window.RasadUI.closeAuthModal === 'function') {
                        window.RasadUI.closeAuthModal();
                    }

                    notifyToast(`حساب کاربری برای «${fullName}» با موفقیت ایجاد شد.`, 'success');
                });

            const regPasswordInput = document.getElementById('register-password');
            if (regPasswordInput) {
                regPasswordInput.addEventListener('input', () => {
                    if (registerValidator.isSubmitted) {
                        registerValidator.revalidateField('#register-confirm-password');
                    }
                });
            }

            validators.push(registerValidator);
        }

        if (validators.length) {
            const authModal = document.getElementById('auth-modal');
            const tabButtons = authModal ? Array.from(authModal.querySelectorAll('[data-tab-target]')) : [];
            const openTriggers = Array.from(document.querySelectorAll('[data-auth-open]'));

            const clearAllAuthErrors = () => {
                validators.forEach((validator) => validator.clearErrors());
            };

            tabButtons.forEach((btn) => btn.addEventListener('click', clearAllAuthErrors));
            openTriggers.forEach((trigger) => trigger.addEventListener('click', clearAllAuthErrors));
        }
    }

    /**
     * Configure JustValidate rules on the Admin Article Creation/Edit form.
     * @param {typeof window.JustValidate} JustValidateCtor
     */
    function initAdminWriteValidation(JustValidateCtor) {
        const writeForm = document.getElementById('admin-write-form');
        if (!writeForm) return;

        const titleInput = document.getElementById('article-title-input');
        const editorBody = document.getElementById('article-editor-body');
        const contentInput = document.getElementById('article-content-input');
        const categoriesSection = document.getElementById('article-categories-section');
        const categoriesGroup = document.getElementById('article-categories-group');
        const statusSelectEl = document.getElementById('article-status-select');
        const statusBadgeEl = document.getElementById('article-status-badge');

        const syncEditorToTextarea = () => {
            if (!editorBody || !contentInput) return;
            contentInput.value = editorBody.textContent.trim();
        };

        syncEditorToTextarea();
        writeForm.dataset.justValidate = 'true';

        const writeValidator = new JustValidateCtor(
            writeForm,
            createValidatorConfig({ focusInvalidField: false })
        );

        writeValidator.addField('#article-title-input', [
            {
                rule: 'required',
                errorMessage: 'لطفاً تیتر و عنوان خبر را وارد کنید.',
            },
            {
                validator: (value) => typeof value === 'string' && value.trim().length >= 10,
                errorMessage: 'عنوان خبر باید حداقل ۱۰ کاراکتر مفید داشته باشد.',
            },
        ]);

        if (categoriesGroup) {
            writeValidator.addRequiredGroup(
                '#article-categories-group',
                'انتخاب حداقل یک دسته‌بندی برای خبر الزامی است.',
                {
                    errorsContainer: '#article-categories-error',
                }
            );
        }

        if (contentInput) {
            writeValidator.addField(
                '#article-content-input',
                [
                    {
                        validator: (value) => typeof value === 'string' && value.trim().length > 0,
                        errorMessage: 'متن کامل خبر نمی‌تواند خالی باشد.',
                    },
                ],
                {
                    errorsContainer: '#article-content-error',
                }
            );
        }

        const syncCustomFieldBorders = ({ isSubmitted, fields, groups }) => {
            if (!isSubmitted) return;

            if (contentInput && editorBody) {
                const contentField = Object.values(fields).find((item) => item.elem === contentInput);
                if (contentField) {
                    setCustomErrorBorder(editorBody, contentField.isValid === false);
                }
            }

            if (categoriesGroup && categoriesSection) {
                const categoryState = Object.values(groups).find((item) => item.groupElem === categoriesGroup);
                if (categoryState) {
                    setCustomErrorBorder(categoriesSection, categoryState.isValid === false);
                }
            }
        };

        writeValidator
            .onValidate(syncCustomFieldBorders)
            .onFail((fields, groups) => {
                syncEditorToTextarea();
                syncCustomFieldBorders({ isSubmitted: true, fields, groups });

                const contentField = contentInput
                    ? Object.values(fields).find((item) => item.elem === contentInput)
                    : null;
                const titleField = titleInput
                    ? Object.values(fields).find((item) => item.elem === titleInput)
                    : null;
                const categoryState = categoriesGroup
                    ? Object.values(groups).find((item) => item.groupElem === categoriesGroup)
                    : null;

                const mainContainer = document.getElementById('main-content');
                const focusTargetInAdminShell = (targetEl) => {
                    if (!targetEl) return;
                    if (mainContainer) {
                        const targetRect = targetEl.getBoundingClientRect();
                        const mainRect = mainContainer.getBoundingClientRect();
                        if (targetRect.top < mainRect.top + 16 || targetRect.bottom > mainRect.bottom - 16) {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                    try {
                        targetEl.focus({ preventScroll: true });
                    } catch (_err) {
                        targetEl.focus();
                    }
                    if (document.body.scrollTop !== 0) document.body.scrollTop = 0;
                    if (document.documentElement.scrollTop !== 0) document.documentElement.scrollTop = 0;
                };

                if (titleField && titleField.isValid === false && titleInput) {
                    focusTargetInAdminShell(titleInput);
                } else if (categoryState && categoryState.isValid === false && categoriesGroup) {
                    const firstCheckbox = categoriesGroup.querySelector('input[type="checkbox"]');
                    focusTargetInAdminShell(firstCheckbox || categoriesSection);
                } else if (contentField && contentField.isValid === false && editorBody) {
                    focusTargetInAdminShell(editorBody);
                }

                notifyToast('لطفاً خطاهای مشخص‌شده در فرم خبر را برطرف کنید.', 'error');
            })
            .onSuccess((event) => {
                if (event) event.preventDefault();

                syncEditorToTextarea();
                setCustomErrorBorder(editorBody, false);
                setCustomErrorBorder(categoriesSection, false);

                const publishDateInput = writeForm.querySelector('#publish-date');
                const scheduledAt = publishDateInput ? publishDateInput.value.trim() : '';
                const isScheduled = scheduledAt.length > 0;

                if (statusSelectEl) {
                    statusSelectEl.value = isScheduled ? 'scheduled' : 'published';
                }
                if (statusBadgeEl) {
                    statusBadgeEl.textContent = isScheduled ? 'زمان‌بندی‌شده' : 'منتشرشده';
                }

                const articleTitle = titleInput ? titleInput.value.trim() : 'خبر جدید';
                if (isScheduled) {
                    notifyToast(`خبر «${articleTitle}» برای تاریخ ${scheduledAt} زمان‌بندی و ثبت شد.`, 'success');
                } else {
                    notifyToast(`خبر «${articleTitle}» با موفقیت اعتبارسنجی و منتشر شد.`, 'success');
                }
            });

        if (editorBody && contentInput) {
            const handleEditorChange = () => {
                syncEditorToTextarea();
                if (writeValidator.isSubmitted) {
                    writeValidator.revalidateField('#article-content-input').then((valid) => {
                        setCustomErrorBorder(editorBody, !valid);
                    });
                }
            };

            editorBody.addEventListener('input', handleEditorChange);
            editorBody.addEventListener('blur', handleEditorChange);

            const toolbarBtns = Array.from(writeForm.querySelectorAll('[data-editor-cmd]'));
            toolbarBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    window.requestAnimationFrame(handleEditorChange);
                });
            });
        }
    }

    /**
     * Initialize form validation once JustValidate and DOM are ready.
     */
    function initValidation() {
        const JustValidateCtor = window.JustValidate;
        if (typeof JustValidateCtor !== 'function') {
            return;
        }

        initAuthValidation(JustValidateCtor);
        initAdminWriteValidation(JustValidateCtor);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initValidation);
    } else {
        initValidation();
    }
})();
