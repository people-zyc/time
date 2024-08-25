(function(Scratch) {
    'use strict';
  
    class TimerExtension {
      constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.intervalId = null;
      }
  
      getInfo() {
        return {
          id: 'timerExtension',
          name: '计时器扩展',
          blocks: [
            {
              opcode: 'startTimer',
              blockType: Scratch.BlockType.COMMAND,
              text: '开始计时'
            },
            {
              opcode: 'pauseTimer',
              blockType: Scratch.BlockType.COMMAND,
              text: '暂停计时'
            },
            {
              opcode: 'resetTimer',
              blockType: Scratch.BlockType.COMMAND,
              text: '归零计时'
            },
            {
              opcode: 'getElapsedTime',
              blockType: Scratch.BlockType.REPORTER,
              text: '已用时间'
            }
          ]
        };
      }
  
      startTimer() {
        if (!this.isRunning) {
          this.isRunning = true;
          if (this.startTime === null) {
            this.startTime = Date.now();
          } else {
            this.startTime = Date.now() - this.elapsedTime;
          }
          this.intervalId = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
          }, 100);
        }
      }
  
      pauseTimer() {
        if (this.isRunning) {
          this.isRunning = false;
          clearInterval(this.intervalId);
        }
      }
  
      resetTimer() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.startTime = null;
        this.elapsedTime = 0;
      }
  
      getElapsedTime() {
        return this.elapsedTime;
      }
    }
  
    Scratch.extensions.register(new TimerExtension());
  })(Scratch);
  
