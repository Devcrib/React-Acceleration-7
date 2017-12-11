new Promise ((resolve, reject) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "http://localhost/task3/students_and_scores.json", true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                resolve( JSON.parse(allText))
            }
        }
    }
    rawFile.send();
}).then((response)=>{
    var sortedresult = response.sort(function(a, b){return a.score - b.score});
    var studentScores = [];
    var totalNumberOfStudent = response.length;

    for (let i = 0; i < sortedresult.length; i++) {
        studentScores.push(sortedresult[i].score);
    }

    
    var checkGrade = (score) => {
        if (score < 40) {
            return 'F';
        }else if (score>= 40 && score < 45 ) {
            return 'E';
        }else if (score>= 45 && score < 50 ) {
            return 'D';
        }else if (score>= 50 && score < 60 ) {
            return 'C';
        }else if (score>= 60 && score < 70 ) {
            return 'B';
        }else {
            return 'A';
        }
    }
    
    var assignGrade = (respons) => {
        for (let i = 0; i < respons.length; i++) {
            var grade = checkGrade(respons[i].score);
            console.log( "Name: " + respons[i].name + " Score: " + respons[i].score + " Grade: " + grade );
        }
    }

    var checkQuartile = (x) => {
        var result = Math.round((x / 4) * (totalNumberOfStudent + 1));
        return sortedresult[result].score;
    }

    var checkPredominantGrade = (arr, count = 2) => {
        let temp = arr;
        let noticed = [];
        let newArr = [];
        let initNoticer = 0;
    
        for(let i = 0; i< arr.length; i++){
            for(let y = 0; y< arr.length; y++){
                if(arr[i] === arr[y]){
                    initNoticer++;
                }
            };
        };
    
        if( initNoticer / arr.length === arr.length) return arr[0];

        for(let i =0; i< temp.length; i++){

            for(let y = 0; y< temp.length; y++){
                if(temp[i] === temp[y]){
                    noticed.push(true);
                }  
            }

            if(noticed.length >= count){
                newArr.push(temp[i]);
            }
                noticed = [];
        }
        count = count + 1;
        return checkPredominantGrade(newArr, count);
    }


    
    assignGrade(response);

    var quartile = checkQuartile(3);
    console.log("The checked quartile is " + quartile);

    var predominantGrade = checkPredominantGrade(studentScores);
    console.log("The predominant grade is " +predominantGrade);
})

