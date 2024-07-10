document.addEventListener('DOMContentLoaded', () => {
    // DOM is fully loaded
    console.log('DOM fully loaded and parsed');

    // Example of event listener for a button click
    const button = document.querySelector('#myButton');
    button.addEventListener('click', () => {
        alert('Button was clicked!');
    });

    // Example of DOM manipulation
    const changeText = document.querySelector('#changeText');
    changeText.addEventListener('click', () => {
        const text = document.querySelector('#textToChange');
        text.textContent = 'Text has been changed!';
    });

    // Simple animation example
    const animateDiv = document.querySelector('#animateDiv');
    animateDiv.addEventListener('click', () => {
        animateDiv.style.transition = 'transform 0.5s ease';
        animateDiv.style.transform = 'translateX(100px)';
    });
});