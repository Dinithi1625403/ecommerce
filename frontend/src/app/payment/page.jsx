"use client";
import React from "react";
export default function PaymentPage() {
    return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>💳 Payment</h1>

      <div style={{ marginTop: "20px" }}>
        <label>Card Holder Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          style={inputStyle}
        />

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          style={inputStyle}
        />

        <label>Expiry Date</label>
        <input
          type="text"
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
          placeholder="MM/YY"
          style={inputStyle}
        />

        <label>CVV</label>
        <input
          type="password"
          name="cvv"
          value={form.cvv}
          onChange={handleChange}
          placeholder="123"
          style={inputStyle}
        />
      </div>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#4CAF50",
          border: "none",
          color: "white",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Pay Now 💰
      </button>
    </div>
  );
}


const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};
import PaymentForm from "@/components/PaymentForm"