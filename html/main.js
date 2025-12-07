
var rgbStart = [139,195,74]
var rgbEnd = [183,28,28]

$(function(){
	window.addEventListener('message', function(event) {
		const data = event.data;
        if (data.hunger !== undefined) {
            setProgressFood(data.hunger,'.progress-hunger');
        }

        if (data.thirst !== undefined) {
            setProgressFood(data.thirst,'.progress-water');
        }

		if (event.data.action == "setValue"){
			if (event.data.key == "job"){
				setJobIcon(event.data.icon)
			}
			setValue(event.data.key, event.data.value)
		}else if (event.data.action == "setValue2"){
			if (event.data.key == "job2"){
				setJob2Icon(event.data.icon2)
			}
			setValue(event.data.key, event.data.value)
		}else if (event.data.action == "updateStatus"){
			updateStatus(event.data.status);
		}else if (event.data.action == "setTalking"){
			setTalking(event.data.value)
		}else if (event.data.action == "setProximity"){
			setProximity(event.data.value)
		}else if (event.data.action == "toggle"){
			if (event.data.show){
				$('#ui').show();
			} else{
				$('#ui').hide();
			}
		}
		else if (data.action === "updateHealth") { 
            setProgressFood(data.health, '.progress-health'); 
        }
        else if (data.action === "updateArmor") { 
            setProgressFood(data.armor, '.progress-armor'); 
        }
	});

});

function updateWeight(weight){


	var bgcolor = colourGradient(weight/100, rgbEnd, rgbStart)
	$('#weight .bg').css('height', weight+'%')
	$('#weight .bg').css('background-color', 'rgb(' + bgcolor[0] +','+ bgcolor[1] +','+ bgcolor[2] +')')
}

function updateCarStatus(status){
	var gas = status[0]
	$('#gas .bg').css('height', gas.percent+'%')
	var bgcolor = colourGradient(gas.percent/100, rgbStart, rgbEnd)
	$('#gas .bg').css('background-color', 'rgb(' + bgcolor[0] +','+ bgcolor[1] +','+ bgcolor[2] +')')
}

function setProgressFood(percent, element) {
    var circle = document.querySelector(element);
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    var html = $(element).parent().parent().find('span');

    let maxPercent = 100;
    let adjustedPercent = (percent / 100) * maxPercent;

    let halfCircumference = circumference / 2;
    circle.style.strokeDasharray = `${halfCircumference} ${circumference}`;

    const offset = halfCircumference - (adjustedPercent / 100) * halfCircumference;
    circle.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
    circle.style.strokeDashoffset = offset;

    html.text(Math.round(percent));
}




const updateBar = (selector, value) => {
    $(selector).css("width", `${value}%`);
};

const handleSetValue = (key, value, icon = null) => {
    if (key === "job" && icon) {
        setJobIcon(icon);
    }
    setValue(key, value);
};

const setValue = (key, value) => {
    $(`#${key} span`).html(value);
};

function setJobIcon(value){
	$('#job img').attr('src', 'img/jobs/'+value+'.png')
}

function setJob2Icon(value){
	$('#job2 img').attr('src', 'img/jobs/'+value+'.png')
}


function setTalking(value){
	if (value){
		$('#voice').css('border', '4px solid #0066ff')
	}else{
		$('#voice').css('border', '4px solid rgb(197, 197, 197)')
	}
}

function colourGradient(p, rgb_beginning, rgb_end){
    var w = p * 2 - 1;

    var w1 = (w + 1) / 2.0;
    var w2 = 1 - w1;

    var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
        parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
            parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
    return rgb;
};





document.addEventListener('DOMContentLoaded', () => {
    const hud = document.querySelector('.playerStats');
    let isDragging = false;
    let isDragModeEnabled = false;
    let startX, startY, initialX, initialY;

    const savedPosition = JSON.parse(localStorage.getItem('hudPosition'));
    if (savedPosition) {
        hud.style.top = savedPosition.top;
        hud.style.left = savedPosition.left;
        hud.style.position = 'absolute';
    }

    hud.addEventListener('mousedown', (e) => {
        if (isDragModeEnabled) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = hud.offsetLeft;
            initialY = hud.offsetTop;
            e.preventDefault(); 
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            hud.style.top = `${initialY + dy}px`;
            hud.style.left = `${initialX + dx}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            localStorage.setItem('hudPosition', JSON.stringify({
                top: hud.style.top,
                left: hud.style.left,
            }));
        }
    });

    window.addEventListener('message', (event) => {
        const data = event.data;

        if (data.action === 'enableDrag') {
            isDragModeEnabled = true;
            document.body.style.cursor = 'move'; 
        } else if (data.action === 'disableDrag') {
            isDragModeEnabled = false;
            document.body.style.cursor = 'default'; 
        } else if (data.action === 'resetHUD') {
			hud.style.top = 'unset'; 
			hud.style.left = '17.5%'; 
			hud.style.right = 'unset'; 
			hud.style.bottom = '1.3%'; 

			localStorage.removeItem('hudPosition');
		}
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && isDragModeEnabled) {
            isDragModeEnabled = false; 
            document.body.style.cursor = 'default';

            fetch(`https://${GetParentResourceName()}/closeUI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({})
            }).then(resp => {
                window.postMessage({ action: 'disableDrag' }, '*');
            }).catch(err => {
            });
        }
    });
});



window.addEventListener("message", function(event) {
    if (event.data.action === "updateProgressBar") {
        const progressValue = event.data.progress;
        updateProgress(progressValue);
    }
});

const updateProgress = (progressValue) => {
    const progressCircle = $('#id .progress-voice');
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (progressValue / 100) * circumference; 

    progressCircle.css({
        'stroke-dasharray': circumference,
        'stroke-dashoffset': offset,
        'transition': 'stroke-dashoffset 0.5s ease-in-out',
    });
};

$(document).ready(function() {
    updateProgress(50);
});

const toggleUI = (show) => {
    if (show) {
        $('#ui').fadeIn();
    } else {
        $('#ui').fadeOut();
    }
};