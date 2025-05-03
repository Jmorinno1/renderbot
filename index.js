import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf";
const HUGGINGFACE_API_KEY = process.env.HF_API_KEY; // Pon tu API key en Render

app.post("/llama", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar el modelo Llama" });
  }
});

app.get("/", (req, res) => {
  res.send("¡Servidor LLM Proxy activo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
