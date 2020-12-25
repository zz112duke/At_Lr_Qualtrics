var task_name = "at_lr_online";
var sbj_id = "test01";

//you must put your save_data php url here.
var save_url = "https://users.rcc.uchicago.edu/~zz112/exp_data/save_data.php";
var data_dir = task_name;

//my preference is to include the task and sbj_id in the file name
var file_name = task_name + '_' + sbj_id; 

var repo_site = "https://zz112duke.github.io/At_Lr_Qualtrics/";

//Functions
// replace b with g and create the corresponding at_fix stimuli
function rep(str) {
    str = setCharAt(str, 64, 'g');
    return str
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

var timeline = [];


var enter_full = {
  type: 'fullscreen',
  fullscreen_mode: true
};
timeline.push(enter_full);


// Give consent
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  }
  return false;
};

var consent = {
  type: 'external-html',
  url: repo_site + "content/consent.html",
  cont_fn: check_consent,
  cont_btn: 'start',
};
timeline.push(consent);


//var page_1_options = ["G", "F", "H", "C", "X"];
//var page_2_options = ["C and X", "C and H", "X and H", "F and G"];

//var multi_choice_block = {
//    type: 'survey-multi-choice',
//    questions: [
//        { prompt: "What was the key response for shapes with gray background?", name: 'P_Inclusion_1', options: page_1_options, required: true },
//        { prompt: "What were the two possible key responses for shapes with green or blue background?", name: 'P_Inclusion_2', options: page_2_options, required: false }
//    ],
//};
//timeline.push(multi_choice_block);


var instr_1 = {
  type: 'external-html',
  url: repo_site + "content/instr_1.html",
  cont_btn: 'next',
};
timeline.push(instr_1);

var iti_200 = {
  type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 200,
}

var iti_1000 = {
  type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/fixation_b.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
}

// Attention practice stim
var stim_names_freq = ["img/Stim/at_stim000_b.png", "img/Stim/at_stim001_b.png",
    "img/Stim/at_stim002_b.png", "img/Stim/at_stim003_b.png", "img/Stim/at_stim010_b.png",
    "img/Stim/at_stim011_b.png", "img/Stim/at_stim012_b.png", "img/Stim/at_stim013_b.png",
    "img/Stim/at_stim020_b.png", "img/Stim/at_stim021_b.png", "img/Stim/at_stim022_b.png",
    "img/Stim/at_stim023_b.png", "img/Stim/at_stim030_b.png", "img/Stim/at_stim031_b.png",
    "img/Stim/at_stim032_b.png", "img/Stim/at_stim033_b.png"]
var stim_names_infreq = ["img/Stim/at_stim100_b.png", "img/Stim/at_stim101_b.png",
    "img/Stim/at_stim102_b.png", "img/Stim/at_stim103_b.png", "img/Stim/at_stim110_b.png",
    "img/Stim/at_stim111_b.png", "img/Stim/at_stim112_b.png", "img/Stim/at_stim113_b.png",
    "img/Stim/at_stim120_b.png", "img/Stim/at_stim121_b.png", "img/Stim/at_stim122_b.png",
    "img/Stim/at_stim123_b.png", "img/Stim/at_stim130_b.png", "img/Stim/at_stim131_b.png",
    "img/Stim/at_stim132_b.png", "img/Stim/at_stim133_b.png"]

/* define attention trials */

var at_stimuli = []
var prac_stimuli = []
var repetition = []
var preload_list= []
for (i = 0; i < 720; i++) {
    //var stimuli = new Object();
    stimuli_freq = stim_names_freq[Math.floor((Math.random()) * stim_names_freq.length)];
    repetition.push(String(stimuli_freq.charAt(16)) + String(stimuli_freq.charAt(17)) + String(stimuli_freq.charAt(18)));


    if (i != 0) {

        while (repetition[i] == repetition[i - 1]) {
            stimuli_freq = stim_names_freq[Math.floor((Math.random()) * stim_names_freq.length)];
            repetition[i] = (String(stimuli_freq.charAt(16)) + String(stimuli_freq.charAt(17)) + String(stimuli_freq.charAt(18)));
            if (repetition[i] != repetition[i - 1]) { break };
        }
    }

}

var repetition_1 = []
for (i = 0; i < 80; i++) {

    stimuli_infreq = stim_names_infreq[Math.floor((Math.random()) * stim_names_infreq.length)];
    repetition_1.push(String(stimuli_infreq.charAt(16)) + String(stimuli_infreq.charAt(17)) + String(stimuli_infreq.charAt(18)));
    //console.log(repetition_1[i])


    if (i != 0) {

        while (repetition_1[i] == repetition_1[i - 1]) {
            stimuli_infreq = stim_names_infreq[Math.floor((Math.random()) * stim_names_infreq.length)];
            repetition_1[i] = (String(stimuli_infreq.charAt(16)) + String(stimuli_infreq.charAt(17)) + String(stimuli_infreq.charAt(18)));
            //console.log(repetition_1[1])
            if (repetition_1[i] != repetition_1[i - 1]) { break };
        }
    }

}

for (i = 0; i < repetition_1.length; i++) {
    repetition.splice(Math.floor((Math.random() * repetition.length)), 0, repetition_1[i]);
};

var repetition_1_prac = repetition_1.slice(0, 2);
var repetition_prac = repetition.slice(0, 18);
for (i = 0; i < repetition_1_prac.length; i++) {
    repetition_prac.splice(Math.floor((Math.random() * repetition_prac.length)), 0, repetition_1_prac[i]);
}

for (j = 0; j < repetition.length; j++) {
    var stimuli = new Object();
    stimuli.at_stimulus = repo_site + 'img/Stim/at_stim' + repetition[j] + '_b.png';
    preload_list.push(repo_site + 'img/Stim/at_stim' + repetition[j] + '_b.png');

    stimuli.data = new Object();


    if (stimuli.at_stimulus.charAt(60) == 0) {
        stimuli.data.at_TrialType = 'frequent';
        stimuli.data.correct_response = 'h'
    } else {
        stimuli.data.at_TrialType = 'infrequent';
        stimuli.data.correct_response = ''
    }
    stimuli.at_fix = rep(stimuli.at_stimulus);
    preload_list.push(rep(stimuli.at_stimulus));

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'at';

    at_stimuli.push(stimuli);

}

for (j = 0; j < repetition_prac.length; j++) {
    var stimuli_prac = new Object();
    stimuli_prac.at_stimulus_prac = repo_site + 'img/Stim/at_stim' + repetition_prac[j] + '_b.png';
    preload_list.push(repo_site + 'img/Stim/at_stim' + repetition_prac[j] + '_b.png');

    stimuli_prac.data = new Object();


    if (stimuli_prac.at_stimulus_prac.charAt(60) == 0) {
        stimuli_prac.data.at_TrialType = 'frequent';
        stimuli_prac.data.correct_response = 'h'
    } else {
        stimuli_prac.data.at_TrialType = 'infrequent';
        stimuli_prac.data.correct_response = ''
    }
    stimuli_prac.at_fix = rep(stimuli_prac.at_stimulus_prac);
    preload_list.push(rep(stimuli_prac.at_stimulus_prac));

    stimuli_prac.data.test_part = 'prac';
    stimuli_prac.data.TaskType = 'prac';
    prac_stimuli.push(stimuli_prac);
}
preload_list.push(repo_site + "img/Stim/fixation_b.png");
preload_list.push(repo_site + "img/Stim/gray_bdot.png");


var prac = {
    timeline: [
        {
            type: "image-keyboard-response",
            stimulus:jsPsych.timelineVariable('at_stimulus_prac'),
            choices: ['h'],
            data: jsPsych.timelineVariable('data'),
            trial_duration: 800,
            on_finish: function (data) {
                data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
            }
        },

        {
            type: "image-keyboard-response",
            stimulus: jsPsych.timelineVariable('at_fix'),
            choices: jsPsych.NO_KEYS,
            response_ends_trial: false,
            trial_duration:function(data) {
                    if (jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).select('rt').values[0] == null) {
                        var fix_duration = 0
                    } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).select('rt').values[0]); };
                    return fix_duration
                }
        }],
};

var prac_feedback = {
    type: 'html-keyboard-response',
    stimulus: function () {
        var last_trial_correct = jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).values()[0].correct;
        if (last_trial_correct) {
            return '<p style="color:black"> Correct!</p>'
        } else {
            return '<p style="color:black"> Incorrect.</p>'
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};

var prac_block = {
    timeline: [prac, prac_feedback, iti_200],
    timeline_variables: prac_stimuli,
    randomize_order: false,
    repetitions: 1
}
timeline.push(prac_block)

var debrief = {
    type: "html-keyboard-response",
    stimulus: function () {

        var trials = jsPsych.data.get().filter({ test_part: 'prac' });
        var correct_trials = trials.filter({ correct: true });
        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
            "<p>Remember that you should respond as accurately as possible. Press any key to move on.</p>";

    }
};
timeline.push(debrief);

var instr_2 = {
    type: 'external-html',
    url: repo_site + "content/instr_2.html",
    cont_btn: 'next',
};
timeline.push(instr_2);

//var lr_prac = [
//    { lr_stimulus: repo_site + "img/Stim/TS030.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'm' } },
//    { lr_stimulus: repo_site + "img/Stim/TS031.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x' } },
//    { lr_stimulus: repo_site + "img/Stim/TS032.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'm' } },
//    { lr_stimulus: repo_site + "img/Stim/TS033.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x' } },
//    { lr_stimulus: repo_site + "img/Stim/TS112.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'm' } },
//    { lr_stimulus: repo_site + "img/Stim/TS113.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x' } },
//    { lr_stimulus: repo_site + "img/Stim/TS120.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x' } },
//    { lr_stimulus: repo_site + "img/Stim/TS113.png", data: { test_part: 'prac_lr', TaskType: 'prac_lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'm' } },
//];

//var prac_lr = {
//    type: "image-keyboard-response",
//    stimulus: jsPsych.timelineVariable('lr_stimulus'),
//    choices: ['x', 'm'],
//    data: jsPsych.timelineVariable('data'),
//    on_finish: function (data) {
//        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
//    }
//};

//var prac_lr_feedback = {
//    type: 'html-keyboard-response',
//    stimulus: function () {
//        var last_trial_correct = jsPsych.data.get().filter({ TaskType: 'prac_lr' }).last(1).values()[0].correct;
//        if (last_trial_correct) {
//            return '<p style="color:black"> Correct!</p>'
//        } else {
//            return '<p style="color:black"> Wrong.</p>'
//        }
//    },
//    choices: jsPsych.NO_KEYS,
//    trial_duration: 1000,
//};

//var prac_block2 = {
//    timeline: [prac_lr, prac_lr_feedback, iti_1000],
//    timeline_variables: lr_prac,
//    randomize_order: false,
//    repetitions: 1
//};
//timeline.push(prac_block2);

//var debrief_2 = {
//    type: "html-keyboard-response",
//    stimulus: function () {

//        var trials = jsPsych.data.get().filter({ test_part: 'prac_lr' });
//        var correct_trials = trials.filter({ correct: true });
//        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);

//        return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
//            "<p>Remember that you should respond as accurately as possible. Press any key to move on.</p>";

//    }
//};
//timeline.push(debrief_2);

var instr_3 = {
    type: 'external-html',
    url: repo_site + "content/instr_3.html",
    cont_btn: 'next',
};
timeline.push(instr_3);


/* define learning trials */
var lr_stimuli_TS1 = [//TS1 based on frequency; high a low l
    { lr_stimulus: repo_site + "img/Stim/TS000.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS001.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS002.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS003.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS010.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS011.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS012.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS013.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS020.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS021.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS022.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS023.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS030.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS031.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS032.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS033.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS1', Color: 'green', correct_response: 'c'}},
];
var lr_stimuli_TS2 = [//TS2 based on orientation; right a left l
    { lr_stimulus: repo_site + "img/Stim/TS100.png", data: { test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS101.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS102.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS103.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS110.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS111.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS112.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS113.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS120.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS121.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS122.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS123.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS130.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS131.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'x'}},
    { lr_stimulus: repo_site + "img/Stim/TS132.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
    { lr_stimulus: repo_site + "img/Stim/TS133.png", data: {test_part: 'test', TaskType: 'lr', lr_TaskSet: 'TS2', Color: 'blue', correct_response: 'c'}},
];

var learning = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('lr_stimulus'),
  choices: ['x', 'c'],
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
  }
}

var lr_test_TS1 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_TS1,
  sample: {
  type: 'with-replacement',
  size: 1,
},
  randomize_order: true,
  repetitions: 1
}

var lr_test_TS2 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_TS2,
  sample: {
  type: 'with-replacement',
  size: 1,
},
  randomize_order: true,
  repetitions: 1
}
var lr_task_list = [lr_test_TS1, lr_test_TS2];
var lr_task = lr_task_list[Math.floor((Math.random()) * lr_task_list.length)]

var lr_feedback = {
type: 'html-keyboard-response',
stimulus: function(){
  var last_trial_correct = jsPsych.data.get().filter({TaskType: 'lr'}).last(1).values()[0].correct;
  if(last_trial_correct){
    return '<p style="color:black"> Correct!</p>'
  } else {
    return '<p style="color:black"> Incorrect.</p>'
  }
},
choices: jsPsych.NO_KEYS,
trial_duration: 1000,
}

/* Combine learning trials */
var lr_node = false;
var attention = {
  timeline:[
  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_stimulus'),
  choices: ['h'],
  data: jsPsych.timelineVariable('data'),
  trial_duration: 800,
  on_finish: function(data){

    var at_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('rt').values.length
    var lr_counter = jsPsych.data.get().filter({TaskType: 'lr'}).select('rt').values.length //CHECK!!!
    //console.log('starts here')

    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var rt_mean = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 71}).select('rt').mean();
    var rt_sd = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 71}).select('rt').sd();
    data.at_counter = at_counter
    console.log(at_counter)
    data.lr_counter = lr_counter
    data.at_RunningMean = rt_mean
    data.sd = rt_sd
    data.slow = rt_mean+0.1*rt_sd
    data.fast = Math.abs(rt_mean-0.1*rt_sd)


    if (at_counter > 3) {
        //see if the last trial was an infrequent trial
        var last_infreq = jsPsych.data.get().filter({TaskType: 'at'}).last(3).select('at_TrialType').values;
        if (last_infreq.includes('infrequent') == true) {
        console.log('there is an infreq')}

        //see if there was an error in the last 3 trials
        var last_correct = jsPsych.data.get().filter({ TaskType: 'at' }).last(3).select('correct').values;
        console.log(last_correct)
        if (last_correct.includes(false) == true){
        console.log('there is an error')}

        var last_rt = jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').values;
        //console.log(last_rt);
        for (var i = 0; i<3; i++){
         if (last_rt[i] <100) {
           last_rt[i] = true
            }
        };
        if (last_rt.includes(true)) {
         console.log('too fast')};

        var last_lr = jsPsych.data.get().filter({ test_part: 'test' }).last(3).select('TaskType').values;
        console.log(last_lr)

        //calculate trailing RT after the third trial
        var rt_three = jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').mean();
        data.at_TrailingMean = rt_three

  };

     





    if (at_counter < 10 || last_infreq.includes('infrequent') || last_correct.includes(false) || last_rt.includes(true) || last_lr.includes('lr')){
        lr_node = 0
    }
    else {   

      if(rt_three >= rt_mean+0.1*rt_sd){
            lr_node = true;
            data.diff = 'slow'
          } else if (rt_three < Math.abs(rt_mean-0.1*rt_sd)){
                lr_node = false;
                data.diff = 'fast'
            }
            else {lr_node = 0}
      }
    }
  },

{type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0]); };
        return fix_duration
    }
}],
}

var if_node_1= {
  timeline: [iti_200,lr_test_TS1,lr_feedback,iti_1000],
  conditional_function: function(data){
    if (lr_node === false){
      return true;
    } else if (lr_node === true){
      return false;
    } else {return false;}
  }
}

var if_node_2= {
  timeline: [iti_200,lr_test_TS2,lr_feedback,iti_1000],
  conditional_function: function(data){
    if (lr_node === true){
      return true;
    }else if (lr_node === false){
      return false;
    } else{return false;}
  }
}



var at_test_procedure = {
  timeline: [attention,if_node_1,if_node_2,iti_200],
  timeline_variables: at_stimuli,
  randomize_order: false,
  repetitions: 1
}
timeline.push(at_test_procedure);

function save_data_csv() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv', // the file type should be added
            exp_data: jsPsych.data.get().csv()
        }
    });
}


jsPsych.init({
    timeline: timeline,
    display_element: 'display_stage',
    preload_images: preload_list,
    on_finish: function () {
        save_data_csv();
    }
});
