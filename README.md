# 🏦 Bankist

A minimalist fintech web app simulating core banking features — built with vanilla HTML, CSS, and JavaScript.

---

## 🚀 Demo Accounts

You can log in with the following test credentials:

| User | Username | PIN |
|------|----------|-----|
| Account 1 | `ah` | `1111` |
| Account 2 | `jd` | `2222` |

> **Note:** Each session lasts **5 minutes**. After that, you'll be automatically logged out for security.

---

## ✨ Features

Once logged in, you can:

- 📊 **View your account** — See your current balance and full transaction history
- 💸 **Send money** — Transfer funds to another Bankist user
- 🏦 **Request a loan** — Ask the bank for a loan (approved if you meet the criteria)
- 🔃 **Sort transactions** — Toggle your transaction history in ascending or descending order
- ❌ **Close account** — Permanently delete your account

---

## ⏱️ Session Timer

Each login session is limited to **5 minutes**. A countdown timer is displayed during your session. Any activity (transfer, loan request) resets the timer. When the timer hits zero, you're logged out automatically.

---

## 🎯 Purpose & Learning Goals

This app was built **purely for learning purposes** as part of a JavaScript course/practice project. It is **not** a real banking application.

The main goal was to practice and solidify core **JavaScript array methods** in a practical, real-world-like context, including:

- `map()` — transforming transaction data for display
- `filter()` — separating deposits from withdrawals
- `reduce()` — calculating the total balance
- `find()` & `findIndex()` — locating accounts and transactions
- `some()` & `every()` — validating loan eligibility conditions
- `sort()` — sorting transactions by date or amount
- `flat()` & `flatMap()` — working with nested data structures

If you're learning JavaScript, this is a great project to study how array methods can power a real-feeling UI.

---

## ⚠️ Known Limitations

This is a learning project, so it comes with a few intentional shortcomings:

- 📵 **Not responsive** — designed for desktop only; it will not display correctly on mobile or tablet screens
- 🔐 **No real security** — credentials are stored in plain JavaScript objects, not a real backend
- 💾 **No persistence** — data resets on every page refresh; there is no database
- 🌐 **No backend** — everything runs client-side in the browser

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/bankist.git

# Navigate into the folder
cd bankist

# Open in your browser
open index.html
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
