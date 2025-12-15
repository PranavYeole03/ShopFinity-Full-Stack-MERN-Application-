import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;
  console.log("Received:", message);

  const msg = message?.toLowerCase() || "";
  let reply = "Sorry, I can only answer about project-related questions.";

  if (msg.includes("project")) {
    reply =
      "Our project is a full-stack MERN e-commerce application with admin, user, and chatbot modules.";
  } else if (msg.includes("frontend")) {
    reply =
      "The frontend is built using React, Vite, and Tailwind CSS for a responsive and fast user experience.";
  } else if (msg.includes("backend")) {
    reply = "The backend is developed using Node.js, Express.js, and MongoDB.";
  } else if (msg.includes("database")) {
    reply = "We use MongoDB Atlas to securely store all customer and product data.";
  } else if (msg.includes("hello") || msg.includes("hi") ||msg.includes("hello buddy") ) {
    reply =
      "👋 Hello! I'm your project assistant chatbot. Ask me about our system, technologies used, or how to order a product!";
  } else if (msg.includes("how to order") || msg.includes("order product")) {
    reply = `
Here’s how you can order a product step-by-step 🛒:
1️⃣ Browse products from the shop page.  
2️⃣ Click on the product you like.  
3️⃣ Select quantity and click **Add to Cart**.  
4️⃣ Go to your **Cart** and click **Proceed to Checkout**.  
5️⃣ Choose your **Delivery Address**.  
6️⃣ Select **Payment Method** – Cash on Delivery (COD) or Online Payment.  
7️⃣ Review your order and click **Place Order**.  
8️⃣ You’ll receive a confirmation message — ✅ Order placed successfully!  
📦 Delivery is *free* for more than 1000 rupees product! 🚚
    `;
  } else if (msg.includes("cod") || msg.includes("cash on delivery")) {
    reply =
      "Yes! We support Cash on Delivery (COD) 💵. You can also pay online using UPI, debit/credit cards, or net banking.";
  } else if (msg.includes("payment") || msg.includes("online payment")) {
    reply =
      "You can pay using UPI, Credit/Debit Card, or Net Banking. COD is also available for convenience.";
  }

  res.json({ reply });
});

export default router;
