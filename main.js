// 메뉴 호출 함수
function getRandomMenu() {
    const menuList = getMenuList();

    // 랜덤하게 2~3개의 메뉴 선택
    const numChoices = Math.floor(Math.random() * 2) + 2;
    const selectedMenus = [];
    const usedIndices = [];

    while (selectedMenus.length < numChoices) {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        if (!usedIndices.includes(randomIndex)) {
            selectedMenus.push(menuList[randomIndex]);
            usedIndices.push(randomIndex);
        }
    }

    // 결과를 웹 페이지에 표시
    const resultElement = document.getElementById("result");
    resultElement.textContent = "" + selectedMenus.join(", ");

    // 선택된 메뉴를 화면에 표시
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // 기존에 표시된 메뉴들 초기화

    for (const menu of selectedMenus) {
        const menuElement = document.createElement("div");
        menuElement.textContent = menu;
        menuElement.classList.add("menu-item");
        menuElement.addEventListener("click", () => voteForMenu(menu)); // 음식 클릭 시 투표 함수 호출
        menuContainer.appendChild(menuElement);
    }
}

// 투표 함수
function voteForMenu(menu) {
    fetch(`/vote/${menu}`, { method: "POST" }) // 서버에 POST 요청으로 음식 투표 전송
        .then((response) => response.json())
        .then((data) => {
            alert(`${menu} 투표가 완료되었습니다!`);
        })
        .catch((error) => {
            console.error("투표 오류:", error);
            alert("투표 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
}
