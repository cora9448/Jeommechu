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
    resultElement.textContent = selectedMenus.join(", ");

    // 선택된 메뉴를 화면에 표시
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // 기존에 표시된 메뉴들 초기화

    for (const menu of selectedMenus) {
        const menuElement = document.createElement("div");
        menuElement.textContent = menu;
        menuElement.classList.add("menu-item");
        menuElement.addEventListener("click", () => voteForMenu(menu));
        menuContainer.appendChild(menuElement);
    }
}

// 투표 함수
function voteForMenu(menu) {
    // 실제 서버가 없으므로 클라이언트에서 투표 결과를 저장하는 로직을 추가
    storeVoteResult(menu);
    alert(`${menu} 투표가 완료되었습니다!`);
}

// 투표 결과 저장 함수
function storeVoteResult(menu) {
    // 투표 결과를 저장하는 로직을 추가
    // 이 함수를 통해 주간 인기 메뉴 리스트를 업데이트하고 초기화할 수 있습니다.
    // 예를 들어, localStorage를 사용하여 투표 결과를 저장하고 주간 인기 메뉴를 계산하는 등의 작업을 수행할 수 있습니다.
}

// 메뉴 리스트를 반환하는 함수
function getMenuList() {
    const menuList = [
        "짜장면",
        "짬뽕",
        "라떼",
        "콜라",
        "사이다",
        "밀크티",
        // ... 추가적인 메뉴들을 넣을 수 있습니다.
    ];
    return menuList;
}

// 월요일 자정마다 주간 인기 메뉴 초기화
function resetWeeklyPopularMenu() {
    // 주간 인기 메뉴 초기화 작업을 수행하는 함수 호출
    initializeWeeklyPopularMenu();
}

// 주간 인기 메뉴 초기화 함수
function initializeWeeklyPopularMenu() {
    const popularMenuList = calculatePopularMenu();
    const popularMenuContainer = document.getElementById("popular-menu-list");

    popularMenuContainer.innerHTML = ""; // 기존에 표시된 인기 메뉴 초기화

    for (const menu of popularMenuList) {
        const menuElement = document.createElement("li");
        menuElement.textContent = menu;
        popularMenuContainer.appendChild(menuElement);
    }
}

// 주간 인기 메뉴 계산 함수
function calculatePopularMenu() {
    const menuVoteCounts = {}; // 각 메뉴의 투표 개수를 저장할 객체
    const menuList = getMenuList(); // 메뉴 리스트를 가져옴

    // 메뉴 리스트를 순회하며 각 메뉴의 투표 개수를 계산
    for (const menu of menuList) {
        const voteCount = getVoteCountForMenu(menu); // 해당 메뉴의 투표 개수를 가져옴
        menuVoteCounts[menu] = voteCount;
    }

    // 투표 개수에 따라 내림차순으로 정렬하여 상위 3개 메뉴를 반환
    const popularMenuList = Object.keys(menuVoteCounts)
        .sort((menuA, menuB) => menuVoteCounts[menuB] - menuVoteCounts[menuA])
        .slice(0, 3);

    return popularMenuList;
}

// 메뉴별 투표 개수를 가져오는 함수 (가정: 로컬 스토리지 사용)
function getVoteCountForMenu(menu) {
    const voteCount = localStorage.getItem(menu) || 0; // 로컬 스토리지에서 투표 개수 가져오기
    return parseInt(voteCount);
}

// 초기화 작업 수행
resetWeeklyPopularMenu();