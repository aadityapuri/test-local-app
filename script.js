const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

// Fetch the counter value from the server
async function fetchCounter() {
    try {
        const response = await fetch('http://localhost:3000/counter');
        const data = await response.json();
        console.log(data);
        counterElement.textContent = data.value;
    } catch (error) {
        console.error('Error fetching counter:', error);
    }
}

// Update the counter value on the server
async function updateCounter(newValue) {
    try {
        await fetch('http://localhost:3000/counter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: newValue }),
        });
    } catch (error) {
        console.error('Error updating counter:', error);
    }
}

// Fetch the initial counter value on page load
fetchCounter();

// Event listeners for increment and decrement buttons
incrementButton.addEventListener('click', async () => {
    const currentValue = parseInt(counterElement.textContent, 10);
    const newValue = currentValue + 1;
    counterElement.textContent = newValue;
    await updateCounter(newValue);
});

decrementButton.addEventListener('click', async () => {
    const currentValue = parseInt(counterElement.textContent, 10);
    const newValue = currentValue - 1;
    counterElement.textContent = newValue;
    await updateCounter(newValue);
});
