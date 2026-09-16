# Reusable Doctor Portfolio & Appointment Booking Website Template

A modern, minimal, premium, and highly responsive **Doctor Portfolio and Online Appointment Booking Website Template** developed using pure **HTML5, CSS3, and Vanilla JavaScript**.

Designed specifically for clinical credibility, patient trust, rapid loading, and maximum appointment conversion.

---

## Key Features

- **100% Pure Vanilla Tech Stack:** Zero dependencies, no React, Vue, Bootstrap, or Tailwind.
- **Fast & Lightweight:** Loads instantly on any browser, desktop, or mobile device.
- **Concise 11-Section Structure:** Designed so a patient can learn who the doctor is, check fees/hours, and book an appointment within 1–2 minutes.
- **Interactive Chamber Tabs:** Support for multiple chambers/hospitals with visiting days, hours, fees, Google Maps link, WhatsApp button, and click-to-call serial.
- **Client-Side Appointment Form:** Clean form validation with instant success toast feedback.
- **Mobile Sticky Action Bar:** On screens `< 768px`, a persistent bottom bar provides one-tap `[ 📞 Call Now ]` and `[ 📅 Book Serial ]`.
- **Easy Reusability:** Every section in `index.html` is marked with `<!-- CUSTOMIZE: ... -->` comments so any doctor's details can be configured in 5 minutes.

---

## File Structure

```text
Prof_Shakil_Portfolio/
├── index.html            # Main semantic HTML5 template with Schema.org JSON-LD
├── css/
│   └── style.css         # Modern medical design system (CSS variables, typography, responsive)
├── js/
│   └── main.js           # Navigation spy, mobile drawer, chamber tabs, FAQ accordion, form
├── assets/
│   ├── images/
│   │   └── profile.jpg   # Doctor's professional portrait photo
│   └── documents/
└── README.md             # Customization guide
```

---

## Quick Customization Guide (Reuse for Any Doctor)

Open `index.html` and search for `CUSTOMIZE:` to update any doctor's information:

### 1. Doctor Name & Credentials
- Search for `hero-name` and update the title (e.g., `Dr. Jane Doe`).
- Search for `hero-degrees` to update degrees (e.g., `MBBS, FCPS, MD`).
- Update the 2-line intro in `hero-intro`.

### 2. Portrait Photo
- Place the doctor's portrait photograph in `assets/images/profile.jpg`.

### 3. Quick Info Bar
- In `<section id="quick-info">`, update:
  - Specialization
  - Years of Experience
  - Primary Chamber
  - Consultation Fee

### 4. Services / Treatments
- In `<section id="services">`, customize up to 6 service cards with treatment names and 1-line descriptions.

### 5. Chamber & Schedule
- In `<section id="chamber">`:
  - Update Chamber 1 & Chamber 2 names, addresses, and consultation fees.
  - Update visiting days and hours.
  - Update the phone numbers in `tel:` links.
  - Update the WhatsApp number and pre-filled message in `https://wa.me/...` links.

### 6. Colors & Theme Customization
Open `css/style.css` and adjust the variables in `:root`:
```css
:root {
  --primary: #0E7490;       /* Change to your desired brand medical color */
  --primary-hover: #155E75;
  --secondary: #0284C7;     /* Trust blue */
  --bg-body: #FFFFFF;
}
```

---

## Verification & Browser Testing

Open `index.html` directly in any web browser (`file:///...` or any web server).
Perform a hard refresh (`Ctrl + F5`) to view the clean, high-conversion template.
