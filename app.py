import gspread
from oauth2client.service_account import ServiceAccountCredentials

# API 키와 스프레드시트 주소 설정
api_key = "50a3cdac9378cea1fef71ffc25e30601bb963198"
spreadsheet_url = "https://docs.google.com/spreadsheets/d/1Uqd20bNmpZZ4THx2qgtPkagYYPUknuaKL4E4H_qozQA/edit#gid=0"

# 구글 API 인증 설정
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(credentials)

# 스프레드시트 열기
spreadsheet = client.open_by_url(spreadsheet_url)

# 시트 선택
sheet = spreadsheet.worksheet("Sheet1")

# 메뉴 데이터 가져오기
menu_data = sheet.col_values(1)