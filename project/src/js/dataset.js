var data_url = "http://www.robots.ox.ac.uk/~vgg/data/pets/data/images/"

var dataset = {
    1 : "Abyssinian",
    2 : "Bengal",
    3 : "Birman",
    4 : "Bombay",
    5 : "British_Shorthair",
    6 : "Egyptian_Mau",
    7 : "Maine_Coon",
    8 : "Persian",
    9 : "Ragdoll",
    10 : "Russian_Blue",
    11 : "Siamese",
    12 : "Sphynx"
}

var error_dataset = {
    1 : 2,
    2 : 197,
    3 : 166,
    4 : 220,
    5 : 204,
    6 : 104,
    7 : 219,
    8 : 202,
    9 : 202,
    10 : 212,
    11 : 208,
    12 : 142
}

function range_random(min, max) {
    return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}

function image_link_set (num, image_num) {
    return `${data_url}${dataset[num]}_${image_num}.jpg`;
}

function get_img_tag(i) {
    return `<img src="${image_link_set(i, range_random(1, 100))}" onerror="this.src='${image_link_set(i, error_dataset[i])}';" style="max-height:240px;max-width:300px">`;
}

function get_answer_set(collect_id) {
    var tmp = collect_id;
    var array = [];
    array.push(collect_id);
    for (var i = 0; i<3; i++) {
        while(array.indexOf(tmp) >= 0) {
            tmp = range_random(1, 12);
        }
        array.push(tmp);
        tmp = collect_id;
    }
    return arr_shuffle(array);
}

function arr_shuffle(array) {
    var n = array.length, t, i;
  
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function neko_test(){
    var node = document.getElementById("neko");
    for (var i=1; i<13; i++) {
        node.innerHTML += get_img_tag(i);
    }
}