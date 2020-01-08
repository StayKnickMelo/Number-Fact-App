
class NumberFact {
  constructor(num, sortBy) {
    this.num = num
    this.sortBy = sortBy;
  }

  async getFact() {
    const response = await fetch(`http://numbersapi.com/${this.num}/${this.sortBy}`, {
      headers: {
        'Content-type': 'application/json'
      }
    });

    const resData = await response.json();

    return resData;

  }

  async getDateFact(month) {
    const response = await fetch(`http://numbersapi.com/${month}/${this.num}/${this.sortBy}`, {
      headers: {
        'Content-type': 'application/json'
      }
    });

    const resData = await response.json();


    return resData;


  }

}


const main = document.querySelector('#main');

const submitBtn = document.querySelector('#btn');

const monthInput = document.querySelector('#month');

monthInput.style.display = 'none';

const checkbox = document.querySelectorAll('input[name="sortby"]');

let sortBy = document.querySelector('input[name="sortby"]:checked').value;

checkbox.forEach(select => {
  select.addEventListener('click', (e) => {
    monthInput.style.display = 'none';
    document.querySelector('#num').placeholder = "Enter A Number";
    if (e.target.value === 'date') {
      monthInput.style.display = 'block';
      document.querySelector('#num').placeholder = "Enter A Date";

    }
    sortBy = e.target.value;
  });
})


document.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    initFact();
  }
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  initFact();

  
});


function displayFact(data) {

  if (document.getElementById('fact')) {
    document.getElementById('fact').remove();
  }

  const div = document.createElement('div');

  div.id = 'fact';

  const p = document.createElement('p');

  p.innerText = data.text;

  div.appendChild(p);

  main.appendChild(div);
}


function initFact() {
  const num = document.querySelector('#num').value;

  const month = monthInput.value;

  const numFact = new NumberFact(num, sortBy);

  console.log(sortBy);

  if (sortBy === 'date') {

    console.log(month);

    numFact.getDateFact(month)
      .then(data => {

        displayFact(data);

      });


  } else {
    numFact.getFact()
      .then(data => {

        displayFact(data);


      });

  }

  document.querySelector('#num').value = '';
  monthInput.value = '';


}