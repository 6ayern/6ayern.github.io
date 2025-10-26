document.addEventListener('DOMContentLoaded', function() {
    const basePrices = {
        basic: 150,
        premium: 300,
        custom: 500
    };

    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('options-group');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('property-group');
    const propertyCheckboxes = document.querySelectorAll('input[name="property"]');
    const totalPriceElement = document.getElementById('totalPrice');

    function updateOptionsVisibility() {
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        
        optionsSelect.selectedIndex = 0;
        propertyCheckboxes.forEach(checkbox => checkbox.checked = false);
        
        switch(selectedServiceType) {
            case 'basic':
                optionsGroup.style.display = 'none';
                propertyGroup.style.display = 'none';
                break;
            case 'premium':
                optionsGroup.style.display = 'block';
                propertyGroup.style.display = 'none';
                break;
            case 'custom':
                optionsGroup.style.display = 'none';
                propertyGroup.style.display = 'block';
                break;
        }
        
        calculateTotalPrice();
    }

    function calculateTotalPrice() {
        const quantity = parseInt(quantityInput.value) || 1;
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        
        let totalPrice = basePrices[selectedServiceType];
        
        if (selectedServiceType === 'premium') {
            const selectedOption = parseInt(optionsSelect.value) || 0;
            totalPrice += selectedOption;
        }
        
        if (selectedServiceType === 'custom') {
            propertyCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    totalPrice += parseInt(checkbox.value);
                }
            });
        }
        
        totalPrice *= quantity;
        
        totalPriceElement.textContent = totalPrice;
    }

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateOptionsVisibility);
    });
    
    quantityInput.addEventListener('input', calculateTotalPrice);
    optionsSelect.addEventListener('change', calculateTotalPrice);
    
    propertyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalPrice);
    });

    updateOptionsVisibility();
});
