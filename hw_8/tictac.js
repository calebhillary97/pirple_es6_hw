var boxes = document.querySelectorAll('.box');

var reset = function () {
    for (var box of boxes) {
        box.innerHTML = '&nbsp;';
    }
    for (var box of boxes) {
        box.addEventListener('click', onBoxClick);
    }
};

var getBoxIndex = function (inpBox) {
    var i = 0;
    for (var box of boxes) {
        if (box === inpBox) {
            return i;
        }
        i++;
    }
    return -1;
};

var getPlayerText = function () {
    if (this.player === 1) {
        this.player = 2;
        return 'X';
    } else if (this.player === 2) {
        this.player = 1;
        return 'O';
    }
    this.player = 2;
    return 'X';
};

var checkBox = function (sets, player) {
    for (var set of sets) {
        if (boxes[set[0]].innerHTML === boxes[set[1]].innerHTML && boxes[set[0]].innerHTML === player) {
            return true;
        }
    }
};

var checkWin = function (currentBox) {
    var player = currentBox.innerText;
    var index = getBoxIndex(currentBox);
    var win;
    switch (index) {
        case 0:
            return checkBox(
                [
                    [1, 2],
                    [3, 6],
                    [4, 8]
                ],
                player
            );
        case 1:
            return checkBox(
                [
                    [0, 2],
                    [4, 7]
                ],
                player
            );
        case 2:
            return checkBox(
                [
                    [0, 1],
                    [4, 6],
                    [5, 8]
                ],
                player
            );

        case 3:
            return checkBox(
                [
                    [0, 6],
                    [4, 5]
                ],
                player
            );
        case 4:
            return checkBox(
                [
                    [0, 8],
                    [1, 7],
                    [2, 6],
                    [3, 5]
                ],
                player
            );
        case 5:
            return checkBox(
                [
                    [2, 8],
                    [3, 4]
                ],
                player
            );

        case 6:
            return checkBox(
                [
                    [0, 3],
                    [2, 4],
                    [7, 8]
                ],
                player
            );
        case 7:
            return checkBox(
                [
                    [1, 4],
                    [6, 8]
                ],
                player
            );
        case 8:
            return checkBox(
                [
                    [0, 4],
                    [2, 5],
                    [6, 7]
                ],
                player
            );
    }
};

var isDraw = function () {
    for (var box of boxes) {
        if (box.innerHTML === '&nbsp;') {
            return false;
        }
    }
    return true;
};

var onBoxClick = function () {
    var player = getPlayerText();
    this.innerText = player;
    this.style.marginTop = '-1px';
    this.removeEventListener('click', onBoxClick);
    var that = this;
    setTimeout(function () {
        var win = checkWin(that);
        if (win) {
            window.alert(player + ' has won!');
            reset();
        } else if (isDraw()) {
            window.alert('Cats game!');
            reset();
        }
    }, 10);
};

reset();
