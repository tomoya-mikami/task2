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
            <form name="workform" fact=Answer(id:tid, answer, mouce, time, _open_fact_id)>
                <h3>aaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbb</h3>
            </form>
        </div>
    }