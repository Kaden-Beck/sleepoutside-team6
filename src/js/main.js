import { loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';
import darkModeToggle from './darkModeToggle.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);
productList.init();

const myAlert = new Alert('../public/json/alerts.json');
myAlert.init();

darkModeToggle();

//Newsletter form functionality
const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (newsletterEntry) => {
        newsletterEntry.preventDefault();

        const emailInput = document.getElementById('newsletter-email').value;
        const email = emailInput.trim();

        if (email !== '') {
            localStorage.setItem('newsletterEmail', email);
            window.location.href = '../thankyou.html';
        } else {
            alert('Please enter a valid email address.');
        }


    });

}

//Display form data on thankyou.html page
const thankYouEmail = document.getElementById('thank-you-email');
if (thankYouEmail) {
    const emailInput = localStorage.getItem('newsletterEmail');
    if (emailInput) {
        thankYouEmail.innerHTML = `
            <h2>Thank You!</h2>
            <p>Your email has been successfully submitted.</p>
            <p>We appreciate your interest in our products and will keep you updated with the latest news and offers.</p>
            <p>Your email: ${emailInput}</p>
        `;
    }
}