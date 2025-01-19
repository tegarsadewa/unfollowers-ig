const fs = require("fs");

// Fungsi untuk membaca file JSON
function readJSON(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Fungsi utama untuk membandingkan followers dan following
async function compareFollowersFollowing() {
  try {
    // Baca file following.json dan followers.json
    const followingData = await readJSON("following.json");
    const followersData = await readJSON("followers.json");

    // Ekstrak username dari following
    const followingUsernames = followingData.relationships_following.map(
      (f) => f.string_list_data[0].href
    );

    // Ekstrak username dari followers
    const followerUsernames = followersData.map(
      (f) => f.string_list_data[0].href
    );

    // Cari siapa yang kamu follow tetapi tidak follow kamu balik
    const notFollowingBack = followingUsernames.filter(
      (username) => !followerUsernames.includes(username)
    );

    console.log("Orang yang tidak follow kamu balik:", notFollowingBack);
  } catch (error) {
    console.error("Error membaca file:", error);
  }
}

// Panggil fungsi utama
compareFollowersFollowing();
