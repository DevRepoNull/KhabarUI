<div align="center">

  <img src="assets/images/favicon.png" alt="KhabarUI Logo" width="96" height="96" />

  # KhabarUI - Modern Persian News Template

  **قالب مدرن، واکنش‌گرا و راست‌چین خبرگزاری و پورتال اطلاع‌رسانی فارسی**  
  *طراحی‌شده با معماری تمیز HTML5، Tailwind CSS و Vanilla JavaScript*

  <p align="center">
    <a href="https://github.com/DevRepoNull/KhabarUI/stargazers"><img src="https://img.shields.io/github/stars/DevRepoNull/KhabarUI?style=for-the-badge&color=blue" alt="Stars Badge"/></a>
    <a href="https://github.com/DevRepoNull/KhabarUI/network/members"><img src="https://img.shields.io/github/forks/DevRepoNull/KhabarUI?style=for-the-badge&color=indigo" alt="Forks Badge"/></a>
    <a href="https://github.com/DevRepoNull/KhabarUI/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License"/></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/RTL-100%25-success?style=for-the-badge" alt="RTL" />
    <img src="https://img.shields.io/badge/Calendar-Jalali_Shamsi-ff69b4?style=for-the-badge" alt="Jalali Calendar" />
  </p>

</div>

---

## 🎯 هدف و چشم‌انداز پروژه (Project Purpose & Vision)

**KhabarUI** یک قالب فرانت‌اند پریمیوم، استاندارد و آماده تولید (Production-Ready) است که به‌صورت اختصاصی برای وب‌سایت‌های خبری، مجلات اینترنتی و رسانه‌های دیجیتال فارسی‌زبان مهندسی شده است. این پروژه با رویکرد آموزشی و حرفه‌ای، بر پایه استانداردهای مدرن فرانت‌اند، بدون وابستگی به فریم‌ورک‌های سنگین JS پیاده‌سازی شده تا بالاترین سرعت لود و بیشترین انعطاف‌پذیری را ارائه دهد.

### 🌟 محورهای کلیدی معماری:
- **معماری ماژولار و مقیاس‌پذیر**: سازمان‌دهی تفکیک‌شده بخش کاربری (Frontend) و بخش مدیریت (Admin Panel) برای اتصال آسان به هر نوع بک‌اند (Node.js, Laravel, Django, ASP.NET).
- **دسترس‌پذیری و ارگونومی دیداری**: مقیاس‌گذاری فونت‌ها بر مبنای `rem`، تایپوگرافی بهینه‌شده فونت Vazirmatn، تضاد رنگی دقیق در هر دو حالت تاریک و روشن.
- **بومی‌سازی اصیل (Localization)**: چیدمان کاملاً راست‌چین (RTL) همراه با پشتیبانی داخلی از تاریخ و تقویم خورشیدی (Jalali).

---

## ✨ ویژگی‌های کلیدی (Key Features)

- 📱 **طراحی صد در صد واکنش‌گرا (100% Responsive)**: سازگاری بی‌نقص در نمایشگرهای موبایل، تبلت، لپ‌تاپ و صفحات عریض دسکتاپ.
- 🌓 **پشتیبانی پیشرفته از حالت تاریک و روشن (Dark / Light Mode)**: همراه با ذخیره خودکار ترجیحات در `localStorage` و جلوگیری از پرش تصویر هنگام لود اولیه (FOUC).
- 🧭 **مگامنو و ناوبری چندستونه (Mega Menu)**: دسترسی سریع به دسته‌بندی‌های گوناگون خبری به همراه جستجوی لحظه‌ای و منوی ریسپانسیو موبایل.
- 🛠️ **پنل مدیریت اختصاصی و یکپارچه (Admin CMS UI)**: شامل صفحات پیشخوان آماری، مدیریت نوشته‌ها، نگارش خبر جدید، مدیریت دسته‌بندی‌ها، نظرات، کاربران و کنترل سطح دسترسی.
- ⚡ **اعتبارسنجی سبک و مدرن با Vanilla JS**: اعتبارسنجی کامل فرم‌ها توسط کتابخانه سبک `Just-Validate` با پیام‌های خطای فارسی بدون وابستگی به جی‌کوئری.
- 📅 **انتخاب‌گر تاریخ شمسی (Jalali Datepicker)**: بهره‌گیری از تقویم خورشیدی در بخش جستجو، بایگانی و فرم‌های ویرایش ادمین.
- 🎨 **سیستم استایل‌دهی نوین Tailwind CSS**: استفاده از بیلد لوکال Node.js و PostCSS با خروجی بهینه‌سازی و Minify شده برای بالاترین بازدهی.
- 📰 **مجموعه صفحات جامع پورتال خبری**:
  - صفحه اصلی پورتال (Home News Feed) با چیدمان اسلایدر، اخبار فوری و خبر ویژه
  - صفحه تک خبر (Single Post Layout) همراه با نظرات و اشتراک‌گذاری اجتماعی
  - آرشیو موضوعی و جستجوی پیشرفته (Archive & Advanced Search)
  - صفحه پروفایل نویسنده و خبرنگار (Author Page)
  - هاب و گالری چندرسانه‌ای و ویدیوها (Video Hub)
  - صفحات وضعیت و خطاهای استاندارد سرور (401, 403, 404, 500, 503)

---

## 🚀 نصب و راه‌اندازی (Getting Started)

برای راه‌اندازی و اجرای بیلد لوکال استایل‌های پروژه بر روی سیستم خود، مراحل زیر را دنبال کنید:

### ۱. پیش‌نیازها
مطمئن شوید که [Node.js](https://nodejs.org/) (نسخه 16 یا بالاتر) و `npm` روی سیستم شما نصب باشد:
```bash
node -v
npm -v
```

### ۲. کلون مخزن گیت
```bash
git clone https://github.com/DevRepoNull/KhabarUI.git
cd KhabarUI
```

### ۳. نصب وابستگی‌ها
پکیج‌های مورد نیاز Tailwind CSS و افزونه‌های مربوطه را نصب کنید:
```bash
npm install
```

### ۴. اجرای بیلد و نظارت خودکار (Tailwind Watcher)
برای کامپایل کدهای CSS و گوش دادن به تغییرات فایل‌های HTML و JS دستور زیر را اجرا کنید:
```bash
npm run watch
```

> **نکته:** جهت بیلد نهایی و فشرده‌سازی خروجی فایل‌های استایل برای استقرار در هاست تولید، از دستور زیر استفاده نمایید:
> ```bash
> npm run build
> ```

---

## 📂 ساختار پروژه (Project Structure)

```text
KhabarUI/
├── admin/                     # صفحات و چیدمان‌های پنل مدیریت محتوا (CMS)
│   ├── index.html             # هدایت‌گر اولیه پنل ادمین
│   ├── admin-dashboard.html   # داشبورد مدیریت و آمارهای کلیدی
│   ├── admin-posts.html       # لیست و مدیریت نوشته‌های ارسالی
│   ├── admin-write.html       # محیط ارسال و نگارش خبر جدید
│   ├── admin-categories.html  # مدیریت و تعریف دسته‌بندی‌ها
│   ├── admin-comments.html    # مدیریت و بازبینی دیدگاه‌های کاربران
│   ├── admin-users.html       # مدیریت اعضا و همکاران تحریریه
│   ├── admin-permission.html  # تعیین نقش‌ها و سطوح دسترسی
│   └── admin-settings.html    # تنظیمات عمومی وب‌سایت
├── assets/                    # دارایی‌های استاتیک و خروجی‌های کامپایل‌شده
│   ├── css/
│   │   ├── style.css          # استایل نهایی کامپایل‌شده توسط Tailwind
│   │   └── jalali-datepicker.min.css # استایل تقویم شمسی
│   ├── fonts/                 # بسته‌های قلم استاندارد وزیرمتن (Vazirmatn)
│   ├── images/                # آیکون‌ها، بنرها و تصاویر نمونه مقالات
│   └── js/
│       ├── main.js            # منطق اصلی رابط کاربری، تم دارک و منوها
│       ├── validation.js      # اعتبارسنجی فرم‌ها با Just-Validate
│       ├── components.js      # ماژول‌های پویا و تعاملی
│       └── libs/              # کتابخانه‌های خارجی کلاینت
├── frontend/                  # صفحات بخش عمومی و پورتال خبری
│   ├── index.html             # صفحه نخست خبرگزاری
│   ├── single.html            # صفحه تکی خبر و مطالعه کامل مقاله
│   ├── archive.html           # صفحه آرشیو اخبار و دسته‌ها
│   ├── search.html            # نتایج جستجو و فیلترهای خبری
│   ├── author.html            # رزومه و مقالات نویسنده / خبرنگار
│   ├── video-hub.html         # پایگاه چندرسانه‌ای و گزارش‌های ویدیویی
│   ├── contact.html           # تماس با ما و ارسال سوژه خبری
│   └── 404.html               # صفحات مدیریت خطا (401, 403, 404, 500, 503)
├── src/                       # فایل‌های سورس فرانت‌اند
│   └── input.css              # ورودی لایه‌های کامپوننت و دایرکتیوهای Tailwind
├── index.html                 # صفحه فرود و معرفی پروژه
├── tailwind.config.js         # کانفیگ تم، رنگ‌ها، پالت تیره و مسیر فایل‌ها
├── postcss.config.js          # پیکربندی پردازنده‌های PostCSS و Autoprefixer
├── package.json               # اطلاعات مخزن، اسکریپت‌ها و وابستگی‌ها
└── README.md                  # راهنمای جامع پروژه
```

---

## 🛠️ پشته فنی و ابزارها (Tech Stack)

| تکنولوژی / ابزار | کاربرد |
| :--- | :--- |
| **HTML5 (Semantic)** | معماری سمنتیک و دسترس‌پذیر محتوای خبری |
| **Tailwind CSS v3** | سیستم طراحی ماژولار Utility-First و حالت تاریک |
| **Vanilla JavaScript (ES6+)** | رفتارها و رفت‌وبرگشت‌های رابط بدون سنگینی فریم‌ورک |
| **Vazirmatn Font** | تایپوگرافی فارسی استاندارد، روان و خوانا |
| **Just-Validate** | اعتبارسنجی دقیق فرم‌ها در سمت کاربر |
| **Jalali Datepicker** | رابط انتخاب تاریخ تقویم هجری خورشیدی |
| **PostCSS & Autoprefixer** | بهینه‌سازی و پشتیبانی از مرورگرهای مختلف |

---

## 📄 لایسنس (License)

این پروژه تحت مجوز [MIT](LICENSE) منتشر شده است و استفاده از آن برای اهداف تجاری و آموزشی بلامانع می‌باشد.

---

## 👨‍💻 سازنده و توسعه‌دهنده (Credits)

Developed with ❤️ by [DevRepoNull](https://github.com/DevRepoNull)
