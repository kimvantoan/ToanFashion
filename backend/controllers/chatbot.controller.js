import { GoogleGenerativeAI } from "@google/generative-ai";
import productModel from "../models/product.model.js";
import stringSimilarity from "string-similarity";

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const products = await productModel.find({});

    const prompt = `
Khách hàng vừa gửi: "${message}"

Nếu nội dung liên quan tới sản phẩm, hãy trả lời NGẮN GỌN và THÂN THIỆN, giới thiệu tối đa 2 sản phẩm bên dưới, không cần chèn HTML.

Nếu không liên quan đến sản phẩm, chỉ trả lời lịch sự, ngắn gọn, không đề cập đến sản phẩm. Lưu ý: Trả lời tối đa 3 câu, không quá 50 từ.

Dưới đây là danh sách sản phẩm có thể gợi ý:

${products
  .map(
    (p, i) =>
      `${i + 1}. ${p.name} – Giá: ${p.price.toLocaleString("vi-VN")} VNĐ `
  )
  .join("\n")}
    `;

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const normalize = (str) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();

        const normalizedText = normalize(text);

        const matches = products
          .map((p) => {
            const score = stringSimilarity.compareTwoStrings(
              normalize(p.name),
              normalizedText
            );
            return { product: p, score };
          })
          .filter((item) => item.score > 0.3)
          .sort((a, b) => b.score - a.score)
          .slice(0, 2);

        const mentionedProducts = matches.map((m) => ({
          name: m.product.name,
          slug: m.product.slug,
          _id: m.product._id,
          image: m.product.images?.[0]?.url,
          price: m.product.price,
        }));
        return res.json({
          reply: text,
          mentionedProducts,
        });
      } catch (err) {
        if (err.status === 429 && err.errorDetails) {
          const retryInfo = err.errorDetails.find((d) =>
            d["@type"]?.includes("RetryInfo")
          );
          if (retryInfo && retryInfo.retryDelay) {
            const seconds =
              parseInt(
                retryInfo.retryDelay.replace("s", "").replace("S", "")
              ) || 5;
            console.warn(`🌐 429 Quota reached. Retrying in ${seconds}s...`);
            await wait(seconds * 1000);
            retryCount++;
            continue;
          }
        }
        throw err;
      }
    }

    res
      .status(429)
      .json({ error: "Quota limit reached. Please try again later." });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Không thể kết nối Gemini API." });
  }
};
