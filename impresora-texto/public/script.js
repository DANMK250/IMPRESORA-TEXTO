document.getElementById('printButton').addEventListener('click', function() {
    const textInput = document.getElementById('textInput').value;

    if (textInput) {
        fetch('/print', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textInput })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Por favor, escribe algo para imprimir.');
    }
});