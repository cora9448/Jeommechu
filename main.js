// 랜덤 메뉴 호출 함수
function getRandomMenu() {
    const menuList = getMenuList(); // menuDatabase.js에서 정의한 함수를 호출하여 메뉴 리스트를 가져옴

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
    resultElement.textContent = "오늘 먹고 싶은 메뉴: " + selectedMenus.join(", ");
}