let zIndex = 1;

function openWindow(type) {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'window';
    windowDiv.style.zIndex = zIndex++;
    windowDiv.style.display = 'block'; // 显示窗口
    windowDiv.innerHTML = `
        <div class="window-header">
            ${type === 'note' ? '笔记本' : '文件管理器'}
            <span class="close-btn" onclick="closeWindow(this)">X</span>
        </div>
        <div class="content">
            ${type === 'note' ? '<textarea rows="5" cols="30" placeholder="在这里写笔记..."></textarea>' : '<p>这是文件管理器的内容。</p>'}
        </div>
    `;
    
    document.getElementById('windows').appendChild(windowDiv);

    makeDraggable(windowDiv);
}

// 关闭窗口
function closeWindow(element) {
    const windowDiv = element.parentElement.parentElement;
    windowDiv.remove();
}

// 使窗口可拖动
function makeDraggable(windowDiv) {
    const header = windowDiv.querySelector('.window-header');
    header.onmousedown = function (event) {
        const shiftX = event.clientX - windowDiv.getBoundingClientRect().left;
        const shiftY = event.clientY - windowDiv.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            windowDiv.style.left = pageX - shiftX + 'px';
            windowDiv.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        header.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            header.onmouseup = null;
        };
    };

    header.ondragstart = function() {
        return false; // 防止默认拖动行为
    };
}