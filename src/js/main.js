import { loadHeaderFooter } from './utils.mjs';
import Alert from './Alert';
import darkModeToggle from './darkModeToggle.mjs';

loadHeaderFooter();

// Create alerts
const myAlert = new Alert('../public/json/alerts.json');
myAlert.init();

// Dark Mode Toggle
darkModeToggle();
