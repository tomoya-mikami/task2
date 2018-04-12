// マウスの座標を管理するモジュール

export default function push_pos_arr(x, y, arr) {
    if (x != '' && y!= '')
    {
        arr.push([x, y]);
    }
    return arr;
}

