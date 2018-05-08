import os
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import math
import numpy as np
import copy
from scipy import stats

enviroment_id = 2
data_arrange = 4

# 正解数を一時的に保存する変数
collect_num = 0

# 実際に使用したデータの数を保存する
can_use_data_num = 0

# 低品質ワーカーのidを保存する(gold set)
low_quality_worker = []

# 回答のデータフレームを作成するためのリスト
data_list = []

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
data_arrange_set = ["no_arrange", "normalization", "scala", "scala_normalized", "no_arrange_no_0"]
path = "./data/" + enviroment_set[enviroment_id]
image_path = "./image/" + enviroment_set[enviroment_id]
files = os.listdir(path)
files_tmp = copy.deepcopy(files)
col_file = []

# 書き出し先の設定
answer_csv = './result/' + enviroment_set[enviroment_id] + '/'
mouce_img = './image/' + enviroment_set[enviroment_id] + '/' + data_arrange_set[data_arrange] + '/'


# ファイルを読み込む
anova = []
anova_tmp = []

for _file in files:
    input_book = pd.ExcelFile(path + "/" + _file)
    input_sheet_name = input_book.sheet_names
    input_sheet_df = input_book.parse(input_sheet_name[0])
    move_x = []
    move_y = []
    move_x_tmp = []
    move_y_tmp = []
    anova_tmp = []
    if len(input_sheet_df) > 49:
        print('user_' + str(input_sheet_df.iat[0, 1]) + ' t test start')
        col_file.append(_file)
        for index, row in input_sheet_df.iterrows():
            if isinstance(row['position'], str):
                        tmp_mouce_pairs = row['position'].split(',')
                        tmp_mouce_pairs = list(filter(lambda str:str != '', tmp_mouce_pairs))
                        for i in range(1, len(tmp_mouce_pairs)):
                            now_tmp_mouce_move = tmp_mouce_pairs[i].split(':')
                            before_tmp_mouce_move = tmp_mouce_pairs[i-1].split(':')
                            x = int(now_tmp_mouce_move[0]) - int(before_tmp_mouce_move[0])
                            y = int(now_tmp_mouce_move[1]) - int(before_tmp_mouce_move[1])
                            size = math.sqrt(x*x + y*y)
                            #if x != 0 and y != 0:
                            move_x.append(abs(x))
                            move_y.append(abs(y))
        for _file_tmp in files_tmp:
            if files[0] != _file_tmp:
                input_book_tmp = pd.ExcelFile(path + "/" + _file_tmp)
                input_sheet_name_tmp = input_book_tmp.sheet_names
                input_sheet_df_tmp = input_book_tmp.parse(input_sheet_name[0])
                move_x_tmp = []
                move_y_tmp = []
                if len(input_sheet_df_tmp) > 49:
                    l = 0
                    flag = 0
                    for index, row in input_sheet_df_tmp.iterrows():
                        if isinstance(row['position'], str):
                                tmp_mouce_pairs_tmp = row['position'].split(',')
                                tmp_mouce_pairs_tmp = list(filter(lambda str:str != '', tmp_mouce_pairs_tmp))
                                for i in range(1, len(tmp_mouce_pairs_tmp)):
                                    now_tmp_mouce_move_tmp = tmp_mouce_pairs_tmp[i].split(':')
                                    before_tmp_mouce_move_tmp = tmp_mouce_pairs_tmp[i-1].split(':')
                                    x = int(now_tmp_mouce_move_tmp[0]) - int(before_tmp_mouce_move_tmp[0])
                                    y = int(now_tmp_mouce_move_tmp[1]) - int(before_tmp_mouce_move_tmp[1])
                                    size = math.sqrt(x*x + y*y)
                                    #if x != 0 and y !=0:
                                    move_x_tmp.append(abs(x))
                                    move_y_tmp.append(abs(y))
                    anova_tmp.append(_file + ' : ' + _file_tmp + ' x : ' + str(stats.ttest_ind(move_x, move_x_tmp, equal_var = False)) + ' y : ' + str(stats.ttest_ind(move_y, move_y_tmp, equal_var = False)))
            else:
                anova_tmp.append(0)
        anova.append(anova_tmp)
        print('user_' + str(input_sheet_df.iat[0, 1]) + ' size t test finish')

df = pd.DataFrame(anova, index = col_file, columns = col_file)
df.to_csv('./result/' + enviroment_set[enviroment_id] + '/result_no_0_abs_t_test.csv')

"""
for _file in files:
    input_book = pd.ExcelFile(path + "/" + _file)
    input_sheet_name = input_book.sheet_names
    input_sheet_df = input_book.parse(input_sheet_name[0])
    move_x = []
    move_y = []
    collect_num = 0
    if len(input_sheet_df) > 49:
        print('user_' + str(input_sheet_df.iat[0, 1]) + ' image create')
        l = 0
        flag = 0
        for index, row in input_sheet_df.iterrows():
            l += 1
            if (collect_check(row['question_answer'])):
                collect_num += 1
            elif l == 10:
                low_quality_worker.append(str(input_sheet_df.iat[0, 1]))
                flag = 1
            if isinstance(row['position'], str):
                tmp_mouce_pairs = row['position'].split(',')
                tmp_mouce_pairs = list(filter(lambda str:str != '', tmp_mouce_pairs))
                for i in range(1, len(tmp_mouce_pairs)):
                    now_tmp_mouce_move = tmp_mouce_pairs[i].split(':')
                    before_tmp_mouce_move = tmp_mouce_pairs[i-1].split(':')
                    if data_arrange == 0:
                        move_x.append(int(now_tmp_mouce_move[0]) - int(before_tmp_mouce_move[0]))
                        move_y.append(int(now_tmp_mouce_move[1]) - int(before_tmp_mouce_move[1]))
                    elif data_arrange == 1:
                        x = int(now_tmp_mouce_move[0]) - int(before_tmp_mouce_move[0])
                        y = int(now_tmp_mouce_move[1]) - int(before_tmp_mouce_move[1])
                        size = math.sqrt(x*x + y*y)
                        if size == 0:
                            size = 1
                        move_x.append(x / size)
                        move_y.append(y / size)
                    elif data_arrange == 2:
                        move_x.append(int(now_tmp_mouce_move[0]))
                        move_y.append(int(now_tmp_mouce_move[1]))
                    elif data_arrange == 3:
                        x = int(now_tmp_mouce_move[0])
                        y = int(now_tmp_mouce_move[1])
                        size = math.sqrt(x*x + y*y)
                        if size == 0:
                            size = 1
                        move_x.append(x / size)
                        move_y.append(y / size)
                    elif data_arrange == 4:
                        x = int(now_tmp_mouce_move[0]) - int(before_tmp_mouce_move[0])
                        y = int(now_tmp_mouce_move[1]) - int(before_tmp_mouce_move[1])
                        if x != 0 and y != 0:
                            move_x.append(x)
                            move_y.append(y)
        data_list.append([str(input_sheet_df.iat[0, 1]), str((collect_num/len(input_sheet_df.index)) * 100), flag, str(np.corrcoef(move_x, move_y)[0, 1])])
        plt.rcParams['font.family'] = 'IPAPGothic'
        plt.rcParams["font.size"] = 24
        plt.figure(figsize=(8, 8))
        plt.xlabel("0.1秒ごとのX軸方向の動き(px)")
        plt.ylabel("0.1秒ごとのy軸方向の動き(px)")
        plt.tight_layout()
        plt.xlim([-300,300])
        plt.ylim([-300,300])
        #plt.xticks( [0, 500, 1000] )
        #plt.yticks( [0, 500, 1000] )
        plt.scatter(move_x, move_y)
        #plt.hist([move_x, move_y], stacked=True)
        plt.savefig(mouce_img + 'mouce_user_' + str(input_sheet_df.iat[0, 1]) + '.png')
        plt.close()
        print('user_' + str(input_sheet_df.iat[0, 1]) + ' image finish')
"""

"""
for _file in files:
    input_book = pd.ExcelFile(path + "/" + _file)
    input_sheet_name = input_book.sheet_names
    input_sheet_df = input_book.parse(input_sheet_name[0])
    if len(input_sheet_df) >= 49:
        can_use_data_num += 1
        i = 0
        flag = 0
        for index, row in input_sheet_df.iterrows():
            i += 1
            if (collect_check(row['question_answer'])):
                collect_num += 1
            elif i == 10 or i == 30:
                low_quality_worker.append(str(input_sheet_df.iat[0, 1]))
                flag = 1
        data_list.append([str(input_sheet_df.iat[0, 1]), str((collect_num/len(input_sheet_df.index)) * 100), flag])
        # print('user_' + str(input_sheet_df.iat[0, 1]) + ' : ' + str((collect_num/len(input_sheet_df.index)) * 100))
        collect_num = 0
"""


# 以下は正答率などの書き出し
df = pd.DataFrame(data_list, columns=['user_id', 'answer', 'low_worker_flag', 'Correlation' ])
#df.to_csv('./result/' + enviroment_set[enviroment_id] + '/' + data_arrange_set[data_arrange] + '/' + 'result_10.csv')