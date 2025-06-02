document.addEventListener('DOMContentLoaded', () => {
    const tier1Dropdown = document.getElementById('tier1');
    const tier2Dropdown = document.getElementById('tier2');
    const tier1Details = document.getElementById('tier1-details');
    const tier2Details = document.getElementById('tier2-details');
    const tier1Image = document.getElementById('tier1-image').querySelector('img');
    const tier2Image = document.getElementById('tier2-image').querySelector('img');

    function getTierTemplate(tier) {
        const template = document.getElementById(`tier-${tier}`);
        return template ? template.innerHTML : "";
    }

    function renderTierDetails(tier, container) {
        const content = getTierTemplate(tier);
        if (content) {
            container.innerHTML = content;
        }
    }

    const tierImages = {
        basic: "../Images/graphics/basic.png",
        standard: "../Images/graphics/standard.png",
        premium: "../Images/graphics/premium.png",
        premiumplus: "../Images/graphics/premium-plus.png",
    };

    // Function to update images
    function updateImage(dropdown, imageElement) {
        const selectedValue = dropdown.value; // Get the currently selected value
        if (tierImages[selectedValue]) {
            imageElement.src = tierImages[selectedValue]; // Update the image path
        }
    }

    // Set default dropdown values
    tier1Dropdown.value = "basic"; // Default for Tier 1
    tier2Dropdown.value = "standard"; // Default for Tier 2
    updateImage(tier1Dropdown, tier1Image);
    updateImage(tier2Dropdown, tier2Image);

    // Bind events to update content and images
    tier1Dropdown.addEventListener("change", () => {
        renderTierDetails(tier1Dropdown.value, tier1Details);
        updateImage(tier1Dropdown, tier1Image); // Update the image
    });

    tier2Dropdown.addEventListener("change", () => {
        renderTierDetails(tier2Dropdown.value, tier2Details);
        updateImage(tier2Dropdown, tier2Image); // Update the image
    });

   // Initial rendering
    renderTierDetails(tier1Dropdown.value, tier1Details);
    renderTierDetails(tier2Dropdown.value, tier2Details);
});

  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => { // showing button when scolled 1000px
      if (window.scrollY > 1000) { 
          backToTopButton.classList.add('show');
      } else {
          backToTopButton.classList.remove('show');
      }
  });
  
  backToTopButton.addEventListener('click', () => { // smooth scroll back to the top of page
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
