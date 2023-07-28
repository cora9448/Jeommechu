from flask import Flask, jsonify, request
import random
import datetime

app = Flask(__name__)

# 문자열 형태로 메뉴 데이터를 저장한 배열
menu_list = [
    "짜장면",
    "짬뽕",
    "라떼",
    "콜라",
    "사이다",
    "밀크티",
    # ... 추가적인 메뉴들을 넣을 수 있습니다.
]

weekly_popular_menu = {}

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/get_random_menu')
def get_random_menu():
    num_choices = random.randint(2, 3)
    selected_menus = random.sample(menu_list, num_choices)
    return jsonify(selected_menus)

@app.route('/vote/<menu>', methods=['POST'])
def vote_for_menu(menu):
    if menu in weekly_popular_menu:
        weekly_popular_menu[menu] += 1
    else:
        weekly_popular_menu[menu] = 1
    return jsonify({"message": "success"})

@app.route('/get_weekly_popular_menu')
def get_weekly_popular_menu():
    return jsonify(weekly_popular_menu)

def reset_weekly_popular_menu():
    global weekly_popular_menu
    weekly_popular_menu = {}

# 예를 들어, 매주 월요일 오전 0시에 주간 인기 메뉴 초기화
def schedule_reset():
    now = datetime.datetime.now()
    if now.weekday() == 0 and now.hour == 0 and now.minute == 0:
        reset_weekly_popular_menu()

if __name__ == '__main__':
    # 매주 월요일 00:00 마다 주간 인기 메뉴 초기화를 위해 스케줄링
    schedule_reset()
    app.run()
