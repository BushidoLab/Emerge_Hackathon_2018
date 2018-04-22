var kairosJsonResponse = {
    id: "ffba23j6j34l6m7kj6ksdlfkgjroig34634",
    name: "Emerge",
    people: {
        "personID": [
            {
                "timestamp": 1524382007222,
                "glasses": "No",
                "age_group": "Young Adult",
                "gender": "Male",
                "distance": 109.005,
                "emotions": {
                    "anger": 2,
                    "disgust": 0.068,
                    "fear": 2,
                    "joy": 1.006,
                    "sadness": 62.145,
                    "surprise": 2
                },
                "pose": {
                    "pitch": 0.900874,
                    "roll": -2.14441,
                    "yaw": -11.3128
                },
                "tracking": {
                    "attention": 100,
                    "blink": "Yes",
                    "dwell": 0.004,
                    "glances": 1
                }
            }
            ,
            {
                "timestamp": 1524382007279,
                "glasses": "No",
                "age_group": "Young Adult",
                "gender": "Male",
                "distance": 109.005,
                "emotions": {
                    "anger": 2,
                    "disgust": 0.068,
                    "fear": 2,
                    "joy": 1.006,
                    "sadness": 62.145,
                    "surprise": 2
                },
                "pose": {
                    "pitch": 0.900874,
                    "roll": -2.14441,
                    "yaw": -11.3128
                },
                "tracking": {
                    "attention": 100,
                    "blink": "Yes",
                    "dwell": 0.004,
                    "glances": 1
                }
            },
            {
                "timestamp": 1524382007279,
                "glasses": "No",
                "age_group": "Young Adult",
                "gender": "Male",
                "distance": 109.005,
                "emotions": {
                    "anger": 2,
                    "disgust": 0.068,
                    "fear": 2,
                    "joy": 1.006,
                    "sadness": 62.145,
                    "surprise": 2
                },
                "pose": {
                    "pitch": 0.900874,
                    "roll": -2.14441,
                    "yaw": -11.3128
                },
                "tracking": {
                    "attention": 100,
                    "blink": "Yes",
                    "dwell": 0.004,
                    "glances": 1
                }
            }
        ]
    }
}


var radarKairos = {
  labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise'],
  datasets: [{
    label: "ultra2017",
    data: [0.5, 0.3, 1.6, 3, 1, 3]
  },{
    label: "ultra2018",
    fillColor : "rgba(48, 164, 255, 0.2)",
    strokeColor : "rgba(48, 164, 255, 0.8)",
    pointColor : "rgba(48, 164, 255, 1)",
    pointStrokeColor : "#fff",
    pointHighlightFill : "#fff",
    pointHighlightStroke : "rgba(48, 164, 255, 1)",
    data: [0.1, 1, 2, 2, 0.5, 2]
  }
]
}
var radarData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor : "rgba(48, 164, 255, 0.2)",
            strokeColor : "rgba(48, 164, 255, 0.8)",
            pointColor : "rgba(48, 164, 255, 1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(48, 164, 255, 1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};
