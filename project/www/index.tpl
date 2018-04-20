Schema:

    Seed(
    id int : auto_increment;
    )key(id);

    Answer(
        id int;
        answer text;
        mouce text;
        time text;
    );

    !Task(
        _open_fact_id int;
        tid int;
    );

Rules:

    Seed();
    Seed();

    Seed() <- Answer(id, answer, mouce, time);

    Answer(id:seed_id, answer, mouce, time)/open <- Seed(id:seed_id);

    !Task(_open_fact_id, tid)<-?Answer(_fact_id:_open_fact_id, id:tid);

Views:

    !Task(_open_fact_id, tid) {
        <div id="workspace">
            <form name="workform" fact=Answer(id:tid, answer, mouce, time, _open_fact_id) move=!Task()></form>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    }