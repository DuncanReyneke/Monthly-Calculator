const form = document.getElementById("mortgage-form");
const resultElement = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  function formatInput(input) {
    const f = parseFloat(input);
    console.log("F", f);
    if (isNaN(f)) {
      return parseFloat(0).toLocaleString(undefined, {
        minimumFractionDigits: 0,
      });
    }
    return f.toLocaleString(undefined, { minimumFractionDigits: 0 });
  }

  // Get input values
  const housePriceInput = document.getElementById("house-price");
  const housePrice = parseFloat(housePriceInput.value.replace(/,/g, ""));
  const interestRate =
    parseFloat(document.getElementById("interest-rate").value) / 100 / 12; // Convert to monthly rate
  const loanTerm = parseFloat(document.getElementById("loan-term").value) * 12; // Convert to months
  const paymentFrequency = document.getElementById("payment-frequency").value;

  // Calculate mortgage payment
  const principal = housePrice;
  const monthlyInterestRate = interestRate;
  const numberOfPayments = loanTerm;

  let monthlyPayment;

  if (paymentFrequency === "monthly") {
    monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  } else {
    const monthlyRate = Math.pow(1 + monthlyInterestRate, 1 / 12) - 1;
    monthlyPayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -(numberOfPayments / 12)));
  }

  // Format and display result
  const formattedPayment = monthlyPayment.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  resultElement.innerText = `Your monthly mortgage payment is ${formattedPayment}.`;
});

const hPrice = document.getElementById("house-price");

function formatInput(input) {
  const f = parseFloat(input);
  console.log("F", f);
  if (isNaN(f)) {
    return parseFloat(0).toLocaleString(undefined, {
      minimumFractionDigits: 0,
    });
  }
  return f.toLocaleString(undefined, { minimumFractionDigits: 0 });
}

const allInputs = [hPrice];

allInputs.forEach((input) => {
  input.addEventListener("click", (ev) => {
    // select all content
    ev.target.select();
  });

  input.addEventListener("keyup", (ev) => {
    const parts = ev.target.value.split(".");
    const val = parts[0].replace(/\D/g, "");
    const dec = parts[1];
    console.log(val, dec);
    const num = val + (dec != null ? "." + dec : "");

    console.log(ev.target, num, formatInput(val));

    ev.target.value = formatInput(val) + (dec != null ? "." + dec : "");
  });
});

const interestRateInput = document.getElementById("interest-rate");

interestRateInput.addEventListener("input", () => {
  if (interestRateInput.value > 10) {
    interestRateInput.value = 10;
  }
});
