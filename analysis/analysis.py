import os
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt

enviroment_id = 1

# 正解数を一時的に保存する変数
collect_num = 0

# マウスの動きを保存しておく配列
move_x = []
move_y = []

def collect_check(answer_str):
    flag = False
    answer_str = answer_str.strip(',')
    answer_arr = answer_str.split(':')
    if answer_arr[1] == answer_arr[2]:
        flag = True
    return flag

# 環境のセットアップ
enviroment_set = ["develop/develop", "develop/staging", "production"]
path = "./data/" + enviroment_set[enviroment_id]
image_path = "./image/" + enviroment_set[enviroment_id]
files = os.listdir(path)

# ファイルを読み込む

for _file in files:
    input_book = pd.ExcelFile(path + "/" + _file)
    input_sheet_name = input_book.sheet_names
    input_sheet_df = input_book.parse(input_sheet_name[0])

input_book = pd.ExcelFile(path + "/" + files[0])
input_sheet_name = input_book.sheet_names
input_sheet_df = input_book.parse(input_sheet_name[0])
for index, row in input_sheet_df.iterrows():
        if (collect_check(row['question_answer'])):
            collect_num += 1
        tmp_mouce_pairs = row['position'].split(',')
        tmp_mouce_pairs = list(filter(lambda str:str != '', tmp_mouce_pairs))
        for i in range(len(tmp_mouce_pairs)):
            now_tmp_mouce_move = tmp_mouce_pairs[i].split(':')
            before_tmp_mouce_move = tmp_mouce_pairs[i-1].split(':')
            move_x.append(int(now_tmp_mouce_move[0]) - int(before_tmp_mouce_move[0]))
            move_y.append(int(now_tmp_mouce_move[1]) - int(before_tmp_mouce_move[1]))

"""
for _file in files:
    input_book = pd.ExcelFile(path + "/" + _file)
    input_sheet_name = input_book.sheet_names
    input_sheet_df = input_book.parse(input_sheet_name[0])
    for index, row in input_sheet_df.iterrows():
        if (collect_check(row['question_answer'])):
            collect_num += 1
    print('user_')
    print(input_sheet_df.iat[0, 1])
    print(' : ')
    print((collect_num/len(input_sheet_df.index)) * 100)
"""