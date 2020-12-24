Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 2: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 3: Defining and load required resources */
    var task_github = "https://zz112duke.github.io/At_Lr_Qualtrics/";

    var requiredResources = [
        task_github + "js/jspsych-6.1.0/jspsych.js",
        task_github + "js/jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js",
        task_github + "js/jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js",
        task_github + "js/jspsych-6.1.0/plugins/jspsych-external-html.js",
        task_github + "js/jspsych-6.1.0/plugins/jspsych-fullscreen.js",
        task_github + "js/jspsych-6.1.0/plugins/jspsych-survey-multi-choice.js",
        task_github + "exp_script.js",
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
       });
    };

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    /* Change 4: Appending the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    // experimental session-defining variables
    var task_name = "at_lr_online";
    var sbj_id = "${e://Field/workerId}";

    //you must put your save_data php url here.
    var save_url = "https://users.rcc.uchicago.edu/~zz112/exp_data/save_data.php";
    var data_dir = task_name;

    //my preference is to include the task and sbj_id in the file name
    var file_name = task_name + '_' + sbj_id;

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


    /* Change 5: Wrapping jsPsych.init() in a function */
    function initExp() {

        jsPsych.init({
            timeline: timeline,
            display_element: 'display_stage',

            /* Change 6: Adding the clean up and continue functions.*/
            on_finish: function (data) {

                // save to qualtrics embedded data
                //Qualtrics.SurveyEngine.setEmbeddedData("correct", correct);
                //Qualtrics.SurveyEngine.setEmbeddedData("rt", rt);
                //Qualtrics.SurveyEngine.setEmbeddedData("sd", sd);
                //Qualtrics.SurveyEngine.setEmbeddedData("at_TraillingMean", at_TraillingMean);
                //Qualtrics.SurveyEngine.setEmbeddedData("at_RunningMean", at_RunningMean);


                // include the participant ID in the data
                // this must be done before saving
                jsPsych.data.get().addToLast({ participant: sbj_id });
                save_data_csv();

                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                qthis.clickNextButton();
            }
        });
      }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});