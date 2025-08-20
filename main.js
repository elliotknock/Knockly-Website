// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.98)";
  } else {
    navbar.style.background = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
  }
});

// Billing toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const billingToggle = document.getElementById("billingToggle");
  const toggleOptions = document.querySelectorAll(".toggle-option");
  const priceElements = document.querySelectorAll(".plan-price");
  const periodElements = document.querySelectorAll(".plan-period");

  // Set initial state (Annual = unchecked = false, slider on left)
  billingToggle.checked = false;
  updatePricing(true);
  updateToggleState(true);

  // Handle toggle button clicks - only respond to inactive buttons
  toggleOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Only switch if clicking on the inactive option
      if (!this.classList.contains("active")) {
        const isAnnual = this.getAttribute("data-value") === "annually";
        // Set checkbox opposite to what we want visually
        billingToggle.checked = !isAnnual;
        updatePricing(isAnnual);
        updateToggleState(isAnnual);
      }
    });
  });

  // Handle checkbox change (for keyboard accessibility)
  billingToggle.addEventListener("change", function () {
    // Reverse the logic - unchecked means annual
    const isAnnual = !this.checked;
    updatePricing(isAnnual);
    updateToggleState(isAnnual);
  });

  function updatePricing(isAnnual) {
    priceElements.forEach((priceEl, index) => {
      const monthlyPrice = priceEl.getAttribute("data-monthly");
      const annualPrice = priceEl.getAttribute("data-annual");

      if (isAnnual) {
        priceEl.textContent = annualPrice;
      } else {
        priceEl.textContent = monthlyPrice;
      }
    });

    // Update period text
    periodElements.forEach((periodEl, index) => {
      if (index === 0 || index === 1 || index === 2) {
        periodEl.textContent = isAnnual ? "billed annually" : "per month";
      }
    });
  }

  function updateToggleState(isAnnual) {
    toggleOptions.forEach((option) => {
      const optionValue = option.getAttribute("data-value");
      if ((isAnnual && optionValue === "annually") || (!isAnnual && optionValue === "monthly")) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }
});

// Form submission handler
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! We'll get back to you within 24 hours.");
});

// Active navigation tracking
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navHeight = document.querySelector(".navbar").offsetHeight;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navHeight - 50; // 50px offset for better UX
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  // Special case for home section when at the very top
  if (window.scrollY < 100) {
    currentSection = "home";
  }

  // Update nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Throttle function for better performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add scroll event listener with throttling
window.addEventListener("scroll", throttle(updateActiveNavigation, 100));

// Update on page load
document.addEventListener("DOMContentLoaded", updateActiveNavigation);

// Update when clicking nav links (to handle manual navigation)
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active from all links
    document.querySelectorAll(".navbar-nav .nav-link").forEach((l) => l.classList.remove("active"));
    // Add active to clicked link
    this.classList.add("active");
  });
});
