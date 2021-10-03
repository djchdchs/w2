window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
});

function calculate() {
  let firstProduct = Number(document.getElementById("firstProduct").value);
  let firstLot = Number(document.getElementById("firstLot").value);
  let secondProduct = Number(document.getElementById("secondProduct").value);
  let secondLot = Number(document.getElementById("secondLot").value);


  let re = new RegExp(/^[0-9]+$/i);
  if (
    !(
      re.test(firstProduct) &&
      re.test(firstLot) &&
      re.test(secondProduct) &&
      re.test(secondLot)
    )
  ) {
    alert("Нужно писать число!");
  } else if (firstProduct == "") {
    alert("вы не указали цену 1 товару");
  } else if (firstLot == "") {
    alert("вы не указали кол-во 1 товара");
  } else if (secondProduct == "") {
    alert("вы не указали цену 2 товару");
  } else if (secondLot == "") {
    alert("вы не указали кол-во 2 товара");
  } else {
    const cost = firstProduct * firstLot + secondProduct * secondLot;
    document.getElementById("cost").innerHTML =
      "Стоимость равна: " + cost + " Руб.";
  }
}

function updatePrice() {
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }
  let quantity = Number(document.getElementById('quantity').value);
  let checkboxes = document.querySelectorAll('#checkboxes input');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });
  let radios = document.getElementsByName('radio');
  radios.forEach(function (radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });
  let s = document.getElementsByName('type');
  s[0].addEventListener('change', function (event) {
    let select = event.target;
    let radios = document.getElementById('radios');
    let checkboxes = document.getElementById('checkboxes');
    if (select.value == '1') {
      radios.style.display = 'none';
      checkboxes.style.display = 'none';
      hiddenR();
      hiddenC();
      document.getElementById('price').innerHTML =
        'Стоимость равна: ' + prices.prodTypes[0] + ' Руб.';
    } else if (select.value == '2') {
      hiddenC();
      radios.style.display = 'block';
      checkboxes.style.display = 'none';
      document.getElementById('price').innerHTML =
        'Стоимость равна: ' + prices.prodTypes[1] + ' Руб.';
    } else if (select.value == '3') {
      radios.style.display = 'none';
      checkboxes.style.display = 'block';
      hiddenR();
      document.getElementById('price').innerHTML =
        'Стоимость равна: ' + prices.prodTypes[2] + ' Руб.';
    } else {
    }
  });
  let startPrice = document.getElementById('price');
  startPrice.innerHTML = 'Стоимость равна: ' + price * quantity + ' Руб.';
}
function getPrices() {
  return {
    prodTypes: [100, 200, 300],
    prodOptions: {
      option1: 0,
      option2: 14,
      option3: 88,
    },
    prodProperties: {
      prop1: 133,
      prop2: 7,
    },
  };
}
let elm = document.getElementById('hiddenR');
let elen = document.getElementById('check');
elm.style.display = 'none';
function hiddenR() {
  elm.checked = !elm.checked;
}
function hiddenC() {
  document.getElementById('check1').checked = false;
  document.getElementById('check2').checked = false;
}
window.addEventListener('DOMContentLoaded', function (event) {
  let radioDiv = document.getElementById('radios');
  radioDiv.style.display = 'none';
  let checkboxesDiv = document.getElementById('checkboxes');
  checkboxesDiv.style.display = 'none';
  let s = document.getElementsByName('type');
  let select = s[0];
  select.addEventListener('change', function (event) {
    let target = event.target;
    updatePrice();
  });
  let radios = document.getElementsByName('radio');
  radios.forEach(function (radio) {
    radio.addEventListener('change', function (event) {
      let r = event.target;
      updatePrice();
    });
  });
  let checkboxes = document.querySelectorAll('#checkboxes input');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (event) {
      let c = event.target;
      updatePrice();
    });
  });
  updatePrice();
});


