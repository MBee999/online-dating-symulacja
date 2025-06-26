const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch("https://script.google.com/macros/s/AKfycbwUgUAnzWGZQ-AU5o60QHeWQmZoC7_VuHsyb2ZzghFzD-4K8rvxDT4J0X7qmtSfKmXM/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Dane przesłane do Google Sheet", response: text })
    };
  } catch (error) {
    console.error("❌ Błąd proxy do Google Sheet:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Błąd proxy do Google Sheet" })
    };
  }
};
