# 🧁 A Witch’s Whisk

🌐 **Live Site:** https://awitchswhisk.com

A Witch’s Whisk is a full-stack e-commerce platform built to transform a small, in-person cookie business into a streamlined online ordering experience.

Originally, the business relied entirely on **convention sales and Instagram DMs**, which created friction:

* Customers didn’t know what was in stock
* Orders were handled manually through messages
* The process was slow, inconsistent, and hard to scale

This application solves that by providing a **centralized storefront**, allowing customers to browse inventory, build orders, and checkout seamlessly.

---

## 🚀 Core Impact

* Eliminated manual Instagram-based ordering
* Made inventory visible in real-time
* Reduced friction from inquiry → purchase
* Enabled the business to scale beyond in-person events

---

## 🛍️ Customer Experience

* Browse available cookie flavors with real-time stock visibility
* Build a **custom 12-pack box**

  * Exactly **4 flavors (3 cookies each)** for a consistent product experience
* Add/remove selections dynamically with clear UI feedback
* Secure checkout using Stripe
* Receive order confirmation and updates via email
* View order history through a user profile

---

## 🔐 Authentication & User Flow

* Custom authentication system using Supabase
* Email confirmation and password reset flows
* Protected routes for user-specific data (cart, orders, profile)
* Automatic user record creation after email verification

---

## 💳 Payments & Order Processing

* Stripe Checkout integration for secure payments
* Orders are **only created after successful payment via webhook**

  * Prevents invalid or unpaid orders
* Order data includes:

  * Customer snapshot (name, email, address)
  * Order items (flavors and quantities)
  * Status tracking

---

## 📦 Order Management System

### Customer Side

* View detailed order receipts
* Track order status

### Admin Dashboard

* View all incoming orders
* Inspect full order details (flavors, quantities, customer info)
* Manage fulfillment lifecycle:

  * `Processing → Paid → Shipped → Delivered`
* Update order status with controlled transitions
* Trigger automated email updates when status changes

---

## 📧 Email System

* Transactional emails powered by Resend:

  * Order confirmation
  * Shipping updates
  * Delivery notifications
* Branded HTML email templates aligned with the business identity

---

## 🔐 Security & Data Integrity

* Row Level Security (RLS) enforced in Supabase
* Admin-only actions protected at both:

  * API level
  * Database level
* Stripe webhook signature verification ensures trusted events
* Server-side validation prevents invalid order states

---

## 🧠 Key Technical Decisions

* **Webhook-driven order creation**
  Guarantees that only successful payments generate orders

* **Snapshot-based order storage**
  Preserves order details even if product data changes later

* **Simplified product model (4 flavors × 3 cookies)**
  Reduces complexity while maintaining flexibility

* **Server-first architecture**
  Uses Next.js Server Components and API routes to handle critical logic securely

---

## 🧱 Tech Stack

**Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS

**Backend**

* Supabase (PostgreSQL, Auth, RLS)

**Payments**

* Stripe (Checkout + Webhooks)

**Email**

* Resend API

---

## 🎯 What This Project Demonstrates

* Designing systems around real business constraints
* Building secure payment workflows using Stripe
* Implementing role-based access control with RLS
* Structuring scalable order and fulfillment systems
* Bridging UX and backend logic to reduce user friction

---

## 💬 Summary

A Witch’s Whisk is more than a storefront — it’s a system designed to **replace manual, message-based ordering with a reliable, scalable solution**.

It reflects a full-stack approach to solving a real-world problem, balancing:

* user experience
* backend integrity
* and operational efficiency

---
