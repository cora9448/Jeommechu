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
}

// 각 페이지를 보여주는 함수
function showPage(pageNumber) {
    // 여기서 각 페이지에 대한 로직을 구현합니다.
    // 이 예시에서는 단순히 페이지 번호만 출력합니다.
    const resultElement = document.getElementById("result");
    resultElement.textContent = "현재 보고 있는 페이지: " + pageNumber;
}
