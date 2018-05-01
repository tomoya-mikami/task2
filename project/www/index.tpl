Schema:

    Seed(
    id int : auto_increment;
    )key(id);

    Answer(
        id int;
        answer text;
        time text;
    );

    !Task(
        _open_fact_id int;
        tid int;
    );

Rules:

    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();
    Seed();


    Seed() <- Answer(id, answer, time);

    Answer(id:seed_id, answer, time)/open <- Seed(id:seed_id);

    !Task(_open_fact_id, tid)<-?Answer(_fact_id:_open_fact_id, id:tid);

Views:

    !Task(_open_fact_id, tid) {
        <div class="container">
            <div id="workspace">
                <form name="workform" fact=Answer(id:tid, answer, time, _open_fact_id) move=!Thanks()></form>
            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    }

    !Thanks(){
        <div class="container">
            <div>
                <p style="font-size:1.5rem">"ご協力ありがとうございました"</p>
                <p style="font-size:1.5rem">"yahoo クラウドソーシングに戻って以下のコードを入力してください"</p>
                <p style="font-size:1.5rem">"ねこ大好き"</p>
            </div>
        </div>
    }