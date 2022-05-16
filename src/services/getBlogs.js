export const get_posts = function () {
  const url =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dubleuysal";
  fetch(url, {
    method: "GET",
  }).then((res) => {
    const rs = res.body;
    const rs2 = rs.getReader();
    rs2.addEventListener()
    console.log(rs, rs2);
  });
};
