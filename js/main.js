document.addEventListener("DOMContentLoaded", async () => {
  const postContainer = document.getElementById("post-container");

  try {
    if (!window.postFiles || window.postFiles.length === 0) {
      postContainer.textContent = "등록된 글이 없습니다.";
      return;
    }

    const posts = await Promise.all(
      window.postFiles.map(async (file) => {
        const [year] = file.split("-");
        const res = await fetch(`posts/${file}`);
        
        if (!res.ok) throw new Error(`${file} 파일을 불러올 수 없습니다.`);

        const text = await res.text();
        const title = text.split("\n")[0].replace(/^#\s/, "") || "제목 없음";

        return {
          year: parseInt(year),
          file,
          title
        };
      })
    );

    // ✅ 최신 연도 순으로 정렬 (연도 최신 > 오래된)
    posts.sort((a, b) => b.year - a.year);

    // ✅ 연도별로 그룹화 (그룹 내부도 최신순으로 정렬)
    const groupedPosts = posts.reduce((acc, post) => {
      const key = `${post.year}년`;
      acc[key] = acc[key] || [];
      acc[key].push(post);
      return acc;
    }, {});

    // ✅ 각 그룹 내부도 최신순으로 정렬
    for (const year in groupedPosts) {
      groupedPosts[year].sort((a, b) => b.file.localeCompare(a.file));
    }

    // ✅ 최신순으로 렌더링
    postContainer.innerHTML = Object.keys(groupedPosts)
      .sort((a, b) => parseInt(b) - parseInt(a)) // 최신 연도 순
      .map(
        (year) => `
          <h2>${year}</h2>
          <ul>
            ${groupedPosts[year]
              .map(
                (post) =>
                  `<li><a href="post.html?file=${post.file}">${post.title}</a></li>`
              )
              .join("")}
          </ul>`
      )
      .join("");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    postContainer.textContent = "글 목록을 불러오는 중 오류가 발생했습니다.";
  }
});