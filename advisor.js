// Payment plans data
const plans = {
  "Free Sync": {
    name: "Free Sync",
    price: "₱0",
    period: "/month",
    students: "Up to 50 students"
  },
  "True Sync": {
    name: "True Sync",
    price: "₱15,000",
    period: "/month",
    students: "Up to 200 students"
  },
  "Pro Sync": {
    name: "Pro Sync",
    price: "₱35,000",
    period: "/month",
    students: "Unlimited students"
  }
};

// Select plan function - opens checkout
function selectPlan(planName) {
  // Remove selected class from all boxes
  document.querySelectorAll('.plan-box').forEach(box => {
    box.classList.remove('selected');
  });
  
  // Add selected class to clicked box
  const selectedBox = event.target.closest('.plan-box');
  selectedBox.classList.add('selected');
  
  // Get plan details
  const plan = plans[planName];
  
  // Save selected plan temporarily
  sessionStorage.setItem('selectedPlan', planName);
  
  // Show checkout modal
  showCheckout(planName, plan);
}

// Show checkout modal
function showCheckout(planName, plan) {
  const modal = document.getElementById('checkoutModal');
  modal.style.display = 'flex';
  modal.classList.add('show');
  
  // Update plan details
  document.getElementById('planName').textContent = plan.name;
  document.getElementById('planPrice').textContent = plan.price.replace('₱', '');
  
  // Reset to card payment
  selectPayment('card');
}

// Close checkout modal
function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  modal.style.display = 'none';
  modal.classList.remove('show');
}

// Select payment method
function selectPayment(method) {
  // Remove active class from all options
  document.querySelectorAll('.payment-method-card').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Add active class to selected option
  document.querySelector(`[onclick="selectPayment('${method}')"]`).classList.add('selected');
  
  // Hide all forms
  document.querySelectorAll('.checkout-form').forEach(form => {
    form.style.display = 'none';
  });
  
  // Hide proceed button initially
  document.getElementById('proceedSection').style.display = 'none';
  
  // Show selected form
  document.getElementById(method + 'Form').style.display = 'block';
  
  // Add event listeners to form inputs to check when all fields are filled
  const form = document.getElementById(method + 'Form');
  const inputs = form.querySelectorAll('input');
  
  inputs.forEach(input => {
    input.addEventListener('input', checkFormCompletion);
  });
}

// Check if all form fields are filled
function checkFormCompletion() {
  const activeMethod = document.querySelector('.payment-method-card.selected');
  if (!activeMethod) return;
  
  const method = activeMethod.getAttribute('onclick').match(/'([^']+)'/)[1];
  const form = document.getElementById(method + 'Form');
  const inputs = form.querySelectorAll('input');
  
  let allFilled = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      allFilled = false;
    }
  });
  
  // Show proceed button only when all fields are filled
  if (allFilled) {
    document.getElementById('proceedSection').style.display = 'block';
  } else {
    document.getElementById('proceedSection').style.display = 'none';
  }
}

// Process payment
function processPayment() {
  const selectedPlan = sessionStorage.getItem('selectedPlan');
  const plan = plans[selectedPlan];
  
  // Get active payment method
  const activeMethod = document.querySelector('.payment-option.active');
  const method = activeMethod.getAttribute('onclick').match(/'([^']+)'/)[1];
  
  let formData = {};
  let isValid = true;
  
  // Get form data based on payment method
  if (method === 'card') {
    formData = {
      cardNumber: document.getElementById('cardNumber').value,
      cardName: document.getElementById('cardName').value,
      expiry: document.getElementById('expiry').value,
      cvv: document.getElementById('cvv').value,
      email: document.getElementById('email').value
    };
    isValid = formData.cardNumber && formData.cardName && formData.expiry && formData.cvv && formData.email;
  } else if (method === 'paypal') {
    formData = {
      paypalEmail: document.getElementById('paypalEmail').value,
      paypalName: document.getElementById('paypalName').value,
      paypalContact: document.getElementById('paypalContact').value
    };
    isValid = formData.paypalEmail && formData.paypalName && formData.paypalContact;
  } else if (method === 'gcash') {
    formData = {
      gcashNumber: document.getElementById('gcashNumber').value,
      gcashName: document.getElementById('gcashName').value,
      gcashEmail: document.getElementById('gcashEmail').value
    };
    isValid = formData.gcashNumber && formData.gcashName && formData.gcashEmail;
  } else if (method === 'bank') {
    formData = {
      bankName: document.getElementById('bankName').value,
      bankAccount: document.getElementById('bankAccount').value,
      bankAccountName: document.getElementById('bankAccountName').value,
      bankEmail: document.getElementById('bankEmail').value
    };
    isValid = formData.bankName && formData.bankAccount && formData.bankAccountName && formData.bankEmail;
  }
  
  if (!isValid) {
    alert('Please fill in all fields');
    return;
  }
  
  // Show loading
  const payBtn = document.querySelector('.btn-submit');
  payBtn.textContent = 'Processing...';
  payBtn.disabled = true;
  
  // Simulate payment
  setTimeout(() => {
    const methodNames = {
      card: 'Credit/Debit Card',
      paypal: 'PayPal',
      gcash: 'GCash',
      bank: 'Bank Transfer'
    };
    
    alert(`✅ Payment Successful!\n\nPlan: ${plan.name}\nPrice: ${plan.price}/month\nMethod: ${methodNames[method]}\n\nWelcome to SyncED!`);
    
    // Close modal
    closeCheckout();
    
    // Reset all forms
    document.querySelectorAll('input, select').forEach(input => {
      input.value = '';
    });
    
    // Reset button
    payBtn.textContent = 'Complete Purchase';
    payBtn.disabled = false;
  }, 2000);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('checkoutModal');
  if (event.target === modal) {
    closeCheckout();
  }
}

