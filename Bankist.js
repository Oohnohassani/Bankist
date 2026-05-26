'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Abdirahman Hassani',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-04-23T07:42:02.383Z',
    '2020-06-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
    '2023-07-01T17:01:17.194Z',
    '2023-07-10T10:51:36.790Z',
    '2023-07-11T11:36:17.929Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2020-11-30T09:48:16.867Z',
    '2020-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2023-07-10T18:49:59.371Z',
    '2023-07-11T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// BANKIST APP

// 1. USERNAME

// a) Add Username property to accounts

const Username = function (accounts) {
  accounts.forEach(function (account) {
    account.Username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    return account.Username;
  });
};
Username(accounts); // ---> Call this function with the accounts as argument
// console.log(accounts);

// Function to format and calculate the dates
const formatDates = function (locale, dates) {
  // i. format the days
  // const year = dates.getFullYear();
  // const month = `${dates.getMonth() + 1}`.padStart(2, 0);
  // const day = `${dates.getDate()}`.padStart(2, 0); // convert it to a string and add 0 at the start. Using `` convert to string!

  //ii. Calculating Days Passed
  const calDays = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))); // Absolute and Rounded Value

  const daysPassed = calDays(new Date(), dates); // Returns days i.e: 10
  // console.log(daysPassed); // Number od days passed since each movement

  // Setting conditions
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed >= 7 && daysPassed <= 14) return '1 Week ago';
  // else return `${day}/${month}/${year} `; // 12/07/2020

  // DATE FORMAT API ---> This replaces the above "else return" code
  return new Intl.DateTimeFormat(locale).format(dates);
};

// Currency Format function
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// 2. DISPLAY MOVEMENTS
const displayMovements = function (account, sort = false) {
  // Clearing the container
  containerMovements.innerHTML = '';

  // 1. Sorting the movements
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  // 2. Lopping over the movements
  movs.forEach(function (mov, i) {
    // Type of movement
    const Type = mov > 0 ? 'deposit' : 'withdrawal';

    // i. Looping over the movementDates

    // const dates = account.movementsDates[i]; --> This is a trick to loop over two arrays at once! They MUST have the same length.

    const movementDates = new Date(account.movementsDates[i]); // Converts EACH of them into dates
    // console.log(dates);

    // ii. Display the dates
    const displayDates = formatDates(account.locale, movementDates); // The formatdates() function above, formats and calculates the dates! --> 12/07/2023

    // iii. Movements Currency format
    const formatMovements = formatCurrency(
      mov,
      account.locale,
      account.currency,
    );

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${Type}">${i + 1} ${Type}</div>
    <div class="movements__date">${displayDates}</div>
    <div class="movements__value">${formatMovements}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1);

// 3. CALCULATE BALANCE
const displayBalance = function (account) {
  // Adding all the movements
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${account.balance.toFixed(2)} €`; // The OLD way
  labelBalance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency,
  );
};
displayBalance(account1);

// 4. CALCULATE SUMMARIES AND INTEREST
const summary = function (account) {
  // i. IN
  const In = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${In.toFixed(2)}€`; // The OLD way
  labelSumIn.textContent = formatCurrency(In, account.locale, account.currency);

  // ii. OUT
  const Out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(Out).toFixed(2)}€`; // The OLD way
  labelSumOut.textContent = formatCurrency(
    Math.abs(Out),
    account.locale,
    account.currency,
  );

  // iii. Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`; // The OLD way
  labelSumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency,
  );
};
summary(account1);

//////////////////////////////
// GENERAL FUNCTION THAT STORES OTHER FUNCTIONS
const displayUI = function (account) {
  // i. Display movements
  displayMovements(account);
  // ii. Display balance
  displayBalance(account);
  // iii. Display summary
  summary(account);
};
/////////////////////////////
// TIMER FUNCTION - logoutTimer
const logoutTimer = function () {
  // 1. Set time to 5 minutes
  let time = 300;

  const tick = function () {
    const minute = `${Math.floor(time / 60)}`.padStart(2, 0);
    const seconds = `${time % 60}`.padStart(2, 0);

    // 3. Print the remaining time on the UI
    labelTimer.textContent = `${minute}:${seconds}`;

    // 4. when timer gets to 0s, logout the user (hide UI)
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // 2. Call the timer every 1s

  tick(); // The callback() function is called here so that it immediately starts counting without any delay

  const timer = setInterval(tick, 1000); // The callback() function is passed without any parenthesis (). its called "refrencing"

  return timer;
};

// console.log(logoutTimer()); // 1

/////////////////////////////

// Global Variable for accounts
let currentAccount, countDown;

// 5. LOGING IN
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // alert('HELLOOOOOOOOOOOO');

  // i. Check the username
  currentAccount = accounts.find(
    account => account.Username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  // ii. Check the pin
  if (currentAccount?.pin === +inputLoginPin.value) {
    // console.log('SUCCESS! ' + currentAccount.pin);

    // 1. Diplay UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // 2. Clear the input fields and remove focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // 3. Clear timer
    if (countDown) clearInterval(countDown);
    // console.log(countDown); // undefined

    // 4. Display the logout timer
    countDown = logoutTimer();

    // 5. Display UI
    displayUI(currentAccount);

    // 5. Adding Dates

    // DATE FORMAT API * RESEARCH NEEDED! ⛳
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      month: 'long', // long, numeric, 2-digit
      year: 'numeric', // numeric, 2-digit
      day: 'numeric', // numeric, 2-digit
      weekday: 'long', // long, short
    };

    // Locale
    const locale = navigator.language; // Automatically gets the user locale from his/her computer
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale, // "en-US"
      options, // Sets day, month, year, hour, minute from the API
    ).format(now); // Takes the date and formats it according to the locale

    // NOTE: The new Intl.DateTimeFormat() function takes two parameters, a) The locale i.e: "en-GB" b) API Object i.e: options. The format() function takes ONLY the date i.e: now and formats it.

    // ====== INITIAL CODE HERE 👇 ======

    // const now = new Date();
    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const day = `${now.getDate()}`.padStart(2, 0); // convert it to a string and add 0 at the start. Using `` converts to string!
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;
  }
});

// ==========================================
// ==========================================
// AUTOMATIC FAKE LOGIN

// currentAccount = account1;
// displayUI(account1);
// containerApp.style.opacity = 100;

// // 1. Adding Dates
// const now = new Date();
// const year = now.getFullYear();
// const month = now.getMonth() + 1;
// const day = `${now.getDate()}`.padStart(2, 0); // convert it to a string and add 0 at the start. Using `` convert to string!
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${
//   month < 10 ? '0' + month : month
// }/${year} ${hour}:${min}`;

// Day/Month/Year

// ==========================================
// ==========================================

// 6. TRANSFERS
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  // 1. Get the amount and the account to transfer it to
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    account => account.Username === inputTransferTo.value,
  );
  console.log(amount, receiverAccount);

  // The amount CAN NOT be > the balance or be -ve (below zero). Also you CAN NOT send money to yourself, The receiver Account MUST exist!
  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    currentAccount.Username !== receiverAccount?.Username
  ) {
    // console.log('YEEEEEES');

    // 1. Add the amount to the movements of the sender and receiver
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // 2. New Dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // 3. Reset timer
    clearInterval(countDown);
    countDown = logoutTimer();

    // 4. Display the UI
    displayUI(currentAccount);

    // 5. Clear the inputs of the transfer
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferTo.blur();

    // `${day}/${month < 10 ? '0' + month : month}/${year} `
  }
});

// 7. CLOSING THE CURRENT ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // 1. Check or verify if the username and pin are the same as current account.
  if (
    inputCloseUsername.value === currentAccount.Username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // alert('NICE 😊');

    // 1. Find the current account

    const indexOfCurrentAccount = accounts.findIndex(
      account => account.username === currentAccount.username,
    );

    // 2. Delete the account

    accounts.splice(indexOfCurrentAccount, indexOfCurrentAccount + 1);

    // 3. Hide UI
    containerApp.style.opacity = 0;

    // 4. Reset the welcome label
    labelWelcome.textContent = 'Log in to get started';
  }
});

// 8. REQUESTING A LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // 1. Get the amount and convert it to Number
  // const amount = +inputLoanAmount.value;
  const amount = Math.floor(inputLoanAmount.value); // We don't want any decimals so using Math.floor() does that and it also converts it to a number

  // If the requested amount is > 0 and there's an amount in our movements which is >= (requested amount * 10/100)

  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement >= amount * 0.1)
  ) {
    setTimeout(function () {
      // 2. Add the movement
      currentAccount.movements.push(amount);

      // 3. New Dates
      currentAccount.movementsDates.push(new Date().toISOString());

      // 4. Reset timer
      clearInterval(countDown);
      countDown = logoutTimer();

      // 5. Update UI
      displayUI(currentAccount);
    }, 3000);
  }

  // Clear the input fields
  inputLoanAmount.value = '';
});

// 10. SORT THE MOVEMENTS

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  // 1. Sorting in an Ascending order
  displayMovements(currentAccount, !sorted); // The oposite of sorted which is true

  console.log(sorted); // Sorted here is false

  // 2. Reset the state variable
  sorted = !sorted;

  //console.log(sorted); // Sorted here is true
});

/////////////////////////////////////////////////////////////////////////////

// EXAMPLE

// labelBalance.addEventListener('click', () => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) row.style.backgroundColor = 'pink';
//     if (i % 3 === 0) row.style.backgroundColor = 'purple';
//   });
// });

/////////////////////////////////////////////////////////////////////////////
