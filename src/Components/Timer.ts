export default class Timer {
  recordingTimer = '00:00:00';
  timerInterval:any;
  timerRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateRecordingTime() {
      this.recordingTimer =
          (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" +
          (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" +
          (this.seconds > 9 ? this.seconds : "0" + this.seconds);
  }

  startTimer() {
      if (!this.timerRunning) {
          this.timerInterval = setInterval(() => {
              this.seconds++;

              if (this.seconds >= 60) {
                  this.seconds = 0;
                  this.minutes++;

                  if (this.minutes >= 60) {
                      this.minutes = 0;
                      this.hours++;
                  }
              }

              this.updateRecordingTime();
              document.getElementById("recordingTime")!.textContent = this.recordingTimer;
          }, 1000);

          this.timerRunning = true;
      }
  }

  pauseTimer() {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
  }

  stopTimer() {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.updateRecordingTime();
      document.getElementById("recordingTime")!.textContent = this.recordingTimer;
  }
}

const timer = new Timer();

const startRecordingButton = document.getElementById("startRecordingButton");
const pauseRecordingButton = document.getElementById("pauseRecordingButton");
const stopRecordingButton = document.getElementById("stopRecordingButton");

if (startRecordingButton) {
  startRecordingButton.addEventListener("click", () => {
    timer.startTimer();
  });
}

if (pauseRecordingButton) {
  pauseRecordingButton.addEventListener("click", () => {
    timer.pauseTimer();
  });
}

if (stopRecordingButton) {
  stopRecordingButton.addEventListener("click", () => {
    timer.stopTimer();
  });
}