<script setup lang='ts'>
type args = { gridNum: number }
class Game {
    gridNum: number;
    gridSum: number;
    randomShowI: number;
    arr: never[];
    trim: number | undefined;
    isKeyUp: boolean;
    isStop: boolean;
    keyCode: number;
    V: number;
    addV: number;
    isStrict: boolean;
    constructor({ gridNum }: args) {
        this.gridNum = gridNum;
        this.gridSum = gridNum * gridNum;
        this.randomShowI = Math.round(Math.random() * this.gridSum);
        this.arr = [];
        this.trim = undefined;
        this.isKeyUp = false;
        this.isStop = false;
        this.keyCode = 37 + Math.floor(Math.random() * 4);
        this.V = 500;
        this.addV = 1 / 2;
        this.isStrict = false;
        this.init()
    }
    init() {
        console.log('init');
        let body = document.querySelector('#snakes');
        let ul = document.createElement('ul');
        let num = this.gridSum;
        let trim2 = undefined;
        ul.id = 'ul';
        while (num-- > 0) { ul.append(document.createElement('li')) }
        body.innerHTML = ' <h2 id="h2">长度: <span>1</span> ,速度: <i>1</i></h2>';
        body.append(ul);
        ul.style.width = 20 * this.gridNum + 20 + 'px';
        document.addEventListener('keydown', (e) => {
            if (!this.isKeyUp) return;
            let k = e.keyCode;
            if (k >= 37 && k <= 40) {
                clearInterval(this.trim)
                clearTimeout(trim2)
                e.preventDefault();
                this.keyCode = e.keyCode;
                this.move();
                trim2 = setTimeout(() => {
                    this.autoMove();
                }, this.V / 5);

            }
            if (k == 32) {
                this.isStop = this.isStop ? false : true;
                this.isStop ? clearInterval(this.trim) : this.autoMove()
            }
        })
        this.start();
    }
    start() {
        this.arr.forEach(i => this.removeClass(i))
        this.arr = [];
        this.first = Math.round(Math.random() * this.gridSum);
        this.first_X = this.first % this.gridNum + 1;
        this.first_Y = Math.floor(this.first / this.gridNum) + 1;
        this.V = 500;
        this.arr.push(this.first)
        this.addClass(this.first, 'on fadeIn');
        this.removeClass(this.randomShowI, 'randomShow')
        this.randomShow();
        document.querySelector('#h2 span').innerHTML = this.arr.length;
        document.querySelector('#h2 i').innerHTML = 1;
        setTimeout(() => {
            this.removeClass(this.first, 'fadeIn')
            this.isKeyUp = true;
            this.autoMove();
        }, 3000);
    }
    move() {
        switch (this.keyCode) {
            case 37:
                this.first -= 1;
                this.first_X -= 1;
                break;
            case 38:
                this.first -= this.gridNum;
                this.first_Y -= 1;
                break;
            case 39:
                this.first += 1;
                this.first_X += 1;
                break;
            case 40:
                this.first += this.gridNum;
                this.first_Y += 1;
                break;
            default:
                break;
        }
        if (this.isOut()) return;
        if (this.first === this.randomShowI) {
            this.addClass(this.first)
            this.arr.unshift(this.first);
            this.removeClass(this.randomShowI, 'randomShow')
            this.randomShow();
            if (!(this.arr.length % 5)) {
                clearInterval(this.trim)
                this.V = this.V * this.addV;
                document.querySelector('#h2 i').innerHTML = document.querySelector('#h2 i').innerHTML * 1 + 1;
                this.autoMove()
            }
            document.querySelector('#h2 span').innerHTML = this.arr.length;
            this.move();
            return
        } else {
            this.removeClass(this.arr.pop())
            this.addClass(this.first);
            this.arr.unshift(this.first);
        }
        console.log('move', this.first, this.first_X, this.first_Y);
    }
    autoMove() {
        this.trim = setInterval(() => {
            console.log('-----------------');
            this.move();
        }, this.V);
    }
    isOut() {
        let x = this.first_X;
        let y = this.first_Y;
        let k = x > this.gridNum || x < 1 || y > this.gridNum || y < 1 || (this.isStrict ? this.arr.includes(this.first) : false);
        if (k) {
            console.log('isOut---', true);
            alert('GG');
            clearInterval(this.trim);
            this.isKeyUp = false;
            this.start()
            console.log(this);
            return true
        }
        console.log('isOut---', false);
        return false
    }
    randomShow() {
        let flag = true;
        while (flag) {
            let i = Math.round(Math.random() * this.gridSum);
            if (!this.arr.includes(i) && i !== this.randomShowI) {
                this.randomShowI = i;
                this.addClass(i, 'randomShow')
                flag = false;
            }
            console.log('randomShow', i);
        };

    }
    addClass(i: number, c = 'on') {
        let d = document.querySelectorAll('#ul>li');
        c.trim().split(/\s+/).forEach((m) => { d[i].classList.add(m) })
    }
    removeClass(i: number | undefined, c = 'on') {
        document.querySelectorAll('#ul>li')[i].classList.remove(c)
    }

}

onMounted(() => {
    let d = new Game({
        gridNum: 30
    });
    console.log(d);
})



</script>

<template>
    <div id="snakes"></div>
</template>


<style lang='less'>
#snakes {
    width: 100vw;
    height: 100vh;
}

#ul {
    display: flex;
    flex-wrap: wrap;
    border: 10px solid #333;
    margin: 50px auto;
}

#ul li {
    width: 20px;
    height: 20px;
    border: 1px solid #999;
    list-style: none;
}

#ul li.on {
    background: rgb(255, 0, 0);
}

/* #ul li.on.first {
            border-radius: 0;
        } */

#ul li.randomShow {
    background: rgb(86, 95, 228);
}

#ul li.on.fadeIn {
    animation: fadeIn 0.5s 6 linear;
}

@keyframes fadeIn {
    50% {
        background: rgb(255, 0, 0);
    }

    51% {
        background: none;
    }
}

#h2 {
    font-size: 30px;
    color: #333;
    text-align: center;
    margin: 50px 0;
}
</style>