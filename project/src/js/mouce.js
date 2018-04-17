var g_pos = '';
var tmp_x_pos = '';
var tmp_y_pos = '';

// ms
var sample = 100;
var clear_sample = 50000;

document.onmousemove = function(e){
    tmp_x_pos = e.pageX;
    tmp_y_pos = e.pageY;
}

//実際に記録している関数
function push_pos_arr(){
    if(tmp_x_pos != '' && tmp_y_pos != ''){
        g_pos += tmp_x_pos + ':' + tmp_y_pos + ',';
    }
}

// clear_sampleごとに初期化
function clear_pos() {
    g_pos = '';
}