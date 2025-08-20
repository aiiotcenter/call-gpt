const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function getFacultyPeople() {
  const url = "https://aif.neu.edu.tr/people/";
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const people = [];

    $(".staff-card").each((_, el) => {
      const name = $(el).find(".name").text().trim();
      const title = $(el).find(".title").text().trim();
      const email = $(el).find(".email").text().trim();
      const phone = $(el).find(".phone").text().trim();
      const image = $(el).find("img").attr("src");

      people.push({ name, title, email, phone, image });
    });

    return { people };
  } catch (error) {
    console.error("❌ Error scraping faculty page:", error.message);
    return { error: "Failed to fetch faculty information." };
  }
};
