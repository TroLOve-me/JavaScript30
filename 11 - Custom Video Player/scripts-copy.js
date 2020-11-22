/**get Our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const rangers = player.querySelectorAll('.player__slider');


/**build our fuction */
function togglePlay() {
    // const method = video.paused ? 'play' : 'pause';
    video[video.paused ? 'play' : 'pause']();
}

function changeBotton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.innerHTML = icon;
}

function skip() {
    let skipTime = this.dataset.skip;
    //console.log(skipTime);
    video.currentTime += parseFloat(skipTime);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.value);
    // console.log(this.name);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
/**hook up the event listeners */
// video.addEventListener('click', () => {
//     togglePlay();
// });
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', changeBotton);
video.addEventListener('pause', changeBotton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => { button.addEventListener('click', skip) });
document.body.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        togglePlay();
    }
})

rangers.forEach(range => range.addEventListener('change', handleRangeUpdate));
rangers.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('mousedown', () => {
    mousedown = true;
});
progress.addEventListener('mouseup', () => {
    mousedown = false;
});

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));