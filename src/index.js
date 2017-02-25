const target = 125;
const progressValue = 56;
let progressPercentage = (progressValue * 100)/target;
let missingAmount = target - progressValue;

const statusBar =
     {
       target,
       missingAmount,
       progressValue,
       progressPercentage:`${progressPercentage}%`
     };
setTimeout(()=>{
  document.querySelector('#myStatusBar').setAttribute('status-bar',JSON.stringify(statusBar));
},100);
