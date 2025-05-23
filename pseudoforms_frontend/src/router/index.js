import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../views/LandingPage.vue';
import AllForms from '../views/AllForms.vue';
import AddForm from '../views/AddForm.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ManageAccount from '../views/ManageAccount.vue';
import FillForm from '../views/FillForm.vue';
import MyForms from '../views/MyForms.vue';
import FormDetails from '../views/FormDetails.vue'; 

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/all-forms', name: 'AllForms', component: AllForms },
  { path: '/add-form', name: 'AddForm', component: AddForm },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/manage-account', name: 'ManageAccount', component: ManageAccount },
  { path: '/fill-form/:formId', name: 'FillForm', component: FillForm },
  { path: '/form-details/:formId', name: 'FormDetails', component: FormDetails },
  { path: '/my-forms', name: 'MyForms', component: MyForms }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



