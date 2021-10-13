var _width = window.screen.availWidth;
var unit = 750 / _width;
var gameWidth = window.innerWidth > 750 ? 750 : window.innerWidth;
var gameHeight = window.innerHeight;
var gameScale = gameWidth / 750;
var MyGame = {};
var gameconfig = {};
var num11 = {};
var num1 = {};
var dj = 1;
MyGame.Boot = function (game) { };
MyGame.Boot.prototype = {
    init: function () {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();
        this.scale.setGameSize(gameWidth * 2, gameHeight * 2);
    },
    preload: function () { },
    create: function () {
        this.state.start('Preloader');
    }
};
var that;
MyGame.Preloader = function (game) { };
MyGame.Preloader.prototype = {
    create: function () {
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
        this.text = this.add.text(this.world.width / 2, this.world.height / 2 - 50, '', {
            fill: '#fff'
        });
        this.text.anchor.set(0.5);
        this.start();
    },
    start: function () {
        game.load.crossOrigin = 'anonymous'; // 设置跨域
        game.load.image('gameBg', 'images/game_bg_20181128.jpg');
        game.load.image('timebg', 'images/time_bg.png');
        game.load.spritesheet('logo1', 'images/logo1.png', 120, 126, 3);
        game.load.spritesheet('logo2', 'images/logo2.png', 120, 126, 3);
        game.load.spritesheet('logo3', 'images/logo3.png', 120, 126, 3);
        game.load.spritesheet('logo4', 'images/logo4.png', 120, 126, 3);
        game.load.spritesheet('logo5', 'images/logo5.png', 120, 126, 3);
        game.load.bitmapFont('font', 'images/font.png', 'images/font.xml');
        game.load.image('line', 'images/line.jpg');
        game.load.image('ycb', 'images/ycb.png');
        this.load.start();
    },
    fileComplete: function (progress) {
        // this.text.setText( + progress + "%");
    },
    loadComplete: function () {
        game.state.start('Game');
        gameImgOk = true;
    }
};

MyGame.Game = function (game) {
    // 游戏时间
    game.playerTimer = this.gameconfig.counttime;
};

var score = 0;
var timescore = 0;
var material1 = 0,
    material2 = 0,
    material3 = 0;
var updateTime = true;
var sumScore = 0;
var ishavaTicket = 1; //正常
var updateTime = true;
var isGameStart = false;
var windowNum = false;
var lanziJudeg;
var lanziDeg = 0;
var zdtime;
var gtween;
var house;
var light;
var gamemidu;
var timenum;

var timer = 0;
var total = 0;

MyGame.Game.prototype = {

    gameconfig: {
        counttime: 30,//时间
        density: 350,//密度
    },
    create: function () {
        that = this;
        // 背景
        game.bg = game.add.image(0, 0, 'gameBg');
        game.bg.width = gameWidth * 2;
        game.bg.height = gameWidth * 2/5*11;
        game.bg.fixedToCamera = true;
        game.camera.y = game.world.height;
        // 倒计时背景
        game.timeBg = game.add.sprite(game.world.width * 0.055, 0, 'timebg');
        
        game.addPokeTime = game.time.create(false);
        // 倒计时
        game.timerText = game.add.bitmapText(game.world.width * 0.055 + 80, 68, 'font', game.playerTimer, 54);
        game.timerText.anchor.set(0.5, 0);


        game.GameTimer = game.time.create(false);

        game.pokeGroup = game.add.group();
        //改变掉下来物品的层次
        game.pokeBox = game.add.sprite(0, 0);
        game.pokeBox.addChild(game.pokeGroup);

        game.world.setChildIndex(game.pokeBox, 3); 
    },
    // 点击红包后
    hitted: function (sprite) {

        sprite.inputEnabled = false;
        dj = 0;
        HitteMainFunk(sprite);

    },
    // 单击后的逻辑end
    // 倒计时
    gamejishi: function () {
        if (game.playerTimer <= 0) {
            that.gameover()
        } else {
            game.playerTimer--;
            game.timerText.setText(game.playerTimer);
        }
        zdtime = game.playerTimer;
    },
    // 开始游戏
    gamestart: function (config) {
        $.extend(this.gameconfig, config);
        //game.cover.visible = false;
        isGameStart = true;
        windowNum = true;
        // this.scoretime = 0;

        game.GameTimer.loop(1000, this.gamejishi, this);

        game.addPokeTime.loop(this.gameconfig.density, this.addPoke, this); //掉落物品密度控制
        game.addPokeTime.start();


        game.GameTimer.start();
        that.releaseMummy();
    },
    // 游戏结束
    gameover: function () {
        updateTime = false;
        isGameStart = false;
        game.addPokeTime.stop();
        game.GameTimer.stop();
        setTimeout(function () {
            popPrizeDiv();
        }, 1500)
       
    },
    // 重置游戏
    gameclear: function () {
        updateTime = true;
        isGameStart = false;
        game.playerTimer = this.gameconfig.counttime;
        game.timerText.setText(game.playerTimer);
    },
    // logo出现
    addPoke: function () {
        var logoid = "";
        if (zdtime % 5 == 0) {
            logoid = "logo1";
        } else if (zdtime % 5 == 1) {
            logoid = "logo2";
        }
        else if (zdtime % 5 == 2) {
            logoid = "logo3";
        }
        else if (zdtime % 5 == 3) {
            logoid = "logo4";
        }
        else if (zdtime % 5 == 4) {
            logoid = "logo5";
        }
        game.poke = new Poke(game, game.rnd.between(70, game.world.width - 70), 240 * (game.world.width / 750), logoid);
        game.add.existing(game.poke);
        game.pokeGroup.add(game.poke);
        game.poke.inputEnabled = true;
        game.poke.events.onInputDown.add(that.hitted, this);
    },
    // 创建线和易车币装饰
    releaseMummy: function () {
        var radio = _width / 375;
        function rfuc(n) {
            return n * radio;
        }
        var ycb_x = game.world.randomX + game.rnd.between(50, 1000);
        var line_x = game.world.randomX + game.rnd.between(50, 1000);
        var ycb = game.add.sprite(ycb_x, -100, 'ycb');
        var line = game.add.sprite(line_x, -100, 'line');
        // 随机缩放
        var ram = Math.random();
        ram = ram < 0.5 ? ram += 0.5 : ram;
        ycb.scale.setTo(rfuc(ram));
        line.scale.setTo(rfuc(ram));
        // 随机旋转一个角度
        ycb.angle = game.rnd.angle();
        line.angle = 30;

        game.add.tween(ycb).to({ x: ycb_x - 1000, y: 3500 }, game.rnd.between(2500, 3000), Phaser.Easing.Linear.None, true);
        game.add.tween(line).to({ x: line_x - 1000, y: 3500 }, game.rnd.between(2500, 3000), Phaser.Easing.Linear.None, true);
      
        timer = game.time.now + 800;
    },
    update: function () {
        game.physics.arcade.overlap(game.pokeGroup, game.player, null, function (player, poke) { //碰撞检测
            //调用线和易车币装饰
            if (total < 200 && game.time.now > timer) {
                that.releaseMummy();
            }
        }, this);

    }
};

Poke = function (game, x, y, logoid) {
    if (prizeRand(1)) {
        // 调用logo红包
        Phaser.Sprite.call(this, game, game.rnd.between(200, 1200), -100, logoid);
    }

    game.physics.enable(this, Phaser.Physics.ARCADE);
    // 红包下落速度控制
    this.body.gravity.y = game.rnd.between(500, 700);
    if (this.body.gravity.y > 650) {
        this.body.gravity.y = 2000;
        this.body.gravity.x = -1000;
    } else {
        this.body.gravity.x = -250;
    }
    this.anchor.set(0.5);//锚点
};

Poke.prototype = Object.create(Phaser.Sprite.prototype);
Poke.prototype.constructor = Poke;
Poke.prototype.update = function () {
    if (this.y >= game.world.height) {
        this.destroy()
    }
}
function prizeRand(gailv) {
    var nowNum = gailv * 100;
    var num = parseInt(Math.random() * 100) + 1; //1-100
    if (num <= nowNum) {
        return true;
    } else {
        return false;
    }
}

//游戏结束
var game = new Phaser.Game(750, 1225, Phaser.CANVAS, 'game');
game.state.add('Boot', MyGame.Boot);
game.state.add('Preloader', MyGame.Preloader);
game.state.add('MainMenu', MyGame.MainMenu);
game.state.add('Game', MyGame.Game);
game.state.add('Result', MyGame.Result);
game.state.start('Boot');


