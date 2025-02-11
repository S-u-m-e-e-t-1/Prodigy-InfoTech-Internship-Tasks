function convertTemperature() {
    const temperature = document.getElementById('temperature').value;
    const unit = document.getElementById('unit').value;
    
    // If input is empty, show dashes
    if (temperature === '') {
        document.getElementById('celsius').textContent = '-';
        document.getElementById('fahrenheit').textContent = '-';
        document.getElementById('kelvin').textContent = '-';
        return;
    }

    // Convert string to number
    const temp = parseFloat(temperature);
    
    if (isNaN(temp)) {
        return;
    }

    let celsius, fahrenheit, kelvin;

    switch (unit) {
        case 'celsius':
            celsius = temp;
            fahrenheit = (temp * 9/5) + 32;
            kelvin = temp + 273.15;
            break;
        case 'fahrenheit':
            celsius = (temp - 32) * 5/9;
            fahrenheit = temp;
            kelvin = (temp - 32) * 5/9 + 273.15;
            break;
        case 'kelvin':
            celsius = temp - 273.15;
            fahrenheit = (temp - 273.15) * 9/5 + 32;
            kelvin = temp;
            break;
    }

    document.getElementById('celsius').textContent = celsius.toFixed(2) + ' °C';
    document.getElementById('fahrenheit').textContent = fahrenheit.toFixed(2) + ' °F';
    document.getElementById('kelvin').textContent = kelvin.toFixed(2) + ' K';
}