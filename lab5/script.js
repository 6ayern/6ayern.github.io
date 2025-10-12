        document.getElementById('calculate').addEventListener('click', function() {
            const productSelect = document.getElementById('product');
            const quantityInput = document.getElementById('quantity');
            const resultDiv = document.getElementById('result');
            
            const price = parseFloat(productSelect.value);
            const quantity = parseInt(quantityInput.value);
            
            if (isNaN(quantity) || quantity < 1) {
                resultDiv.textContent = 'Пожалуйста, введите корректное количество';
                return;
            }
            
            const total = price * quantity;
            resultDiv.textContent = `Стоимость заказа: ${total} руб.`;
        });