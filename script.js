// API 키와 스프레드시트 주소 설정
const api_key = "50a3cdac9378cea1fef71ffc25e30601bb963198"; 
const spreadsheetId = "1Uqd20bNmpZZ4THx2qgtPkagYYPUknuaKL4E4H_qozQA";

function getRandomMenu() {
    // 스프레드시트 데이터 가져오기
    fetch(`https://docs.google.com/spreadsheets/d/1Uqd20bNmpZZ4THx2qgtPkagYYPUknuaKL4E4H_qozQA/edit#gid=0`)
        .then((response) => response.json())
        .then((data) => {
            if (data.values && data.values.length > 1) {
                const menuData = data.values.slice(1).filter((menu) => menu[0].trim() !== '');
                const menuList = document.getElementById("menuList");
                menuList.innerHTML = "";

                const randomMenus = getRandomElements(menuData, Math.floor(Math.random() * 2) + 2);

                randomMenus.forEach((menu) => {
                    const menuElement = document.createElement("div");
                    menuElement.textContent = menu[0];
                    menuList.appendChild(menuElement);
                });
            } else {
                console.error("No menu data available in the spreadsheet.");
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

function getRandomElements(array, count) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, count);
}
