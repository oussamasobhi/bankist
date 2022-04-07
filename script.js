'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displaymovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/////////////////////////////////////////////////
/*/
const arr1=[3,5,2,12,7];
const arr2=[4,1,15,8,3];


const checkdogs=function(ar1,ar2){
  ar1.splice(0,1);  // splice : change the org array != slice
  ar1.splice(-2);
  const dogs=ar1.concat(ar2);
  
  console.log(dogs);
  //const array=[...ar1,...ar2];
  dogs.forEach(function (dog,i){
    if(dog>=3)
    console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`)
    else
    console.log(`Dog number ${i+1} is still a puppy`);
  })
};
/*/

const eurotousd = 1.1;

const movementseuro = movements.map(function (m) {
  return m / 2;
});
//console.log(movementseuro);

const createusername = function (accs) {
  accs.forEach(function (acc) {
    acc.usrname = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createusername(accounts);

let currentaccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentaccount = accounts.find(
    acc => acc.usrname === inputLoginUsername.value
  );
  console.log(inputLoginUsername);
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome, ${currentaccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateui(currentaccount);
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

const updateui = function (account) {
  displaymovements(account.movements);
  calcprintbalance(account);
  calculsummary(account);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.usrname === inputTransferTo.value);
  console.log(receiver);
  console.log(currentaccount);
  if (
    amount > 0 &&
    receiver &&
    currentaccount.balance >= amount &&
    receiver.usrname !== currentaccount.usrname
  ) {
    currentaccount.movements.push(-amount);
    receiver.movements.push(amount);
    updateui(currentaccount);
  }
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentaccount.usrname === inputCloseUsername.value &&
    currentaccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.usrname === currentaccount.usrname
    );
    //delete account

    accounts.splice(index, 1);
    console.log(accounts);
    // hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentaccount.movements.some(mov => mov >= amount * 0.1)) {
    currentaccount.movements.push(amount);
    updateui(currentaccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displaymovements(currentaccount.movements, !sorted);
  sorted = !sorted;
});
/*/
const balance =movements.reduce(function (acc,cur,i,arr){
  return acc+=cur;
},0);
console.log(balance);
/*/

const calcprintbalance = function (acco) {
  acco.balance = acco.movements.reduce(function (acc, cur) {
    return (acc += cur);
  }, 0);
  labelBalance.textContent = `${acco.balance}€`;
};

/*/
const maxi=movements.reduce(function(max,cur){
  return (max<cur)? cur : max;
},movements[0])
console.log(maxi);
/*/

const array1 = [5, 2, 4, 1, 15, 8, 3];
/*/
const calchumanage=function(array){
const humanage=array.map(cur=>
  (cur<=2 ? cur*2 : 16+cur*4));

  const adults=humanage.filter(cur=> cur>=18);
  const average=adults.reduce((avg,cur)=> avg+ cur,0 )/adults.length;

  return average;
}

console.log(calchumanage(array1));

const adultdogs=humanage.filter(function(dog){
     if(dog>=18)
     return dog;
});

const averageage=adultdogs.reduce(function(avg,cur){
   return avg+cur/avg

},0)/*/

const calculsummary = function (acco) {
  const income = acco.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${income}€`;
  const out = acco.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interst = acco.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acco.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = interst;
};

console.log(movements);
movements.sort((a, b) => {
  // console.log(a, b);
  if (a > b) return 1;
  if (b > a) return -1;
});
//console.log(movements);
