//! Components

//? Home Page
import HomePage from "../pages/home_page/HomePage.jsx";
import Hero from "../components/home/Hero.jsx";
import WhyUs from "../components/home/WhyUs.jsx";
import WhatIsMedihub from "../components/home/WhatIsMedihub.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
// import OurContributors from "../components/Home/OurContributors.jsx";


//? All Doctors
import AllDoctorsPage from "../pages/all_doctors_page/AllDoctorsPage.jsx";
import DoctorsCard from "../components/alldoctors/DoctorsCard.jsx";
import DoctorSearchPage from "../components/alldoctors/DoctorSearchPage.jsx";
import FollowedDoctorsPage from "../components/alldoctors/FollowedDoctorsPage.jsx";


//? Top Specialities
import SpecialitiesPage from "../pages/top_specialities_page/SpecialitiesPage.jsx";
import SpecialitiesCard from "../components/topspecialities/SpecialitiesCard.jsx";


//? Medicines
import MedicinesPage from "../pages/medicines_page/MedicinesPage.jsx";
import SearchMedicines from "../components/medicines/search_medicines/SearchMedicines.jsx";
import ShopByCategory from "../components/medicines/shop_by_category/ShopByCategory.jsx";
import ShopByBrand from "../components/medicines/shop_by_brand/ShopByBrand.jsx";
import HotSellers from "../components/medicines/hot_sellers/HotSellers.jsx";
import ShopByDiscount from "../components/medicines/shopy_by_discount/ShopByDiscount.jsx";
import ProductsByCategory from "../pages/medicines_page/products_by_category_page/ProductsByCategory.jsx";
import PharmacyStorePage from "../components/medicines/PharmacyStorePage.jsx";
import CartPage from "../pages/CartPage.jsx";

//? Login & Signup
import LoginPage from "../pages/login_signup_page/LoginPage.jsx";
import SignupPage from "../pages/login_signup_page/SignupPage.jsx";


//? Error
import ErrorPage from "../pages/error_page/ErrorPage.jsx";
//? Faqs
import FaqsPage from "../pages/faqs_page/FaqsPage.jsx";
import FaqsCard from "../components/FaqsCard.jsx";
//? About Us
import AboutUsPage from "../pages/about_us_page/AboutUsPage.jsx";
//? Terms and Conditions
import TermsAndConditionsPage from "../pages/terms_&_conditions_page/TermsAndConditionsPage.jsx";
//? Privacy Policy
import PrivacyPolicyPage from "../pages/privacy_policy_page/PrivacyPolicyPage.jsx";


//? Patient's Dashboard

//? Doctos's Dashboard

//? Admin's Dashboard



//? Order History
import ProductCard from "../components/ProductCard.jsx";
import MyPurchasesPage from "../pages/order_history_page/OrderHistoryPage.jsx";


//TODO:  Constant components
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SkeletonLoading from "../components/SkeltonLoading.jsx";
import Bot from "../components/bot/Bot.jsx";
import GoToTop from "../components/GoToTop.jsx";
import Pagination from "../components/Pagination.jsx";
import ProfilePage from "../components/profile/ProfilePage.jsx";

import AppointmentLocation from "../components/AppointmentLocation.jsx";
// import OrderedProduct from "../components/CartPage.jsx";
import Appointment from "../pages/Appointment.jsx";

import PatientAppointmentsPage from "../components/appointment.jsx";



//! Axios instance



//! Cusotm hooks
import useLoading from "../../hooks/useLoading.js";

// message 
import ChatPage from "../components/message.jsx";

export {
 Navbar, Footer, SkeletonLoading, ErrorPage, HomePage, Hero, WhyUs, Testimonials, AllDoctorsPage, DoctorsCard, SpecialitiesPage, SpecialitiesCard, MedicinesPage, SearchMedicines, ShopByCategory, ShopByBrand, HotSellers, ShopByDiscount, ProductsByCategory, LoginPage, SignupPage, AboutUsPage, TermsAndConditionsPage, PrivacyPolicyPage, ProductCard, MyPurchasesPage, Appointment, FaqsPage, FaqsCard,
  AppointmentLocation, GoToTop, Pagination,
  Bot, useLoading, WhatIsMedihub,ProfilePage,PatientAppointmentsPage,DoctorSearchPage,FollowedDoctorsPage,ChatPage,PharmacyStorePage,CartPage
};


