const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filePath = path.join("/tmp", `badanie-${timestamp}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Dane zapisane pomyślnie." }),
    };
  } catch (err) {
    console.error("❌ Błąd zapisu:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Błąd serwera." }),
    };
  }
};
