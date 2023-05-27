function padelCollision () {
    if (padel2.y < 6) {
        padel2.y = 5
    } else if (padel2.y > scene.screenHeight()) {
        padel2.y = scene.screenHeight()
    }
    if (padel1.y < 6) {
        padel1.y = 5
    } else if (padel1.y > scene.screenHeight()) {
        padel1.y = scene.screenHeight()
    }
    if (ballColTimeout <= 0) {
        if (padel1.overlapsWith(ball)) {
            ball.vx += ball.vx * -2
            ballColTimeout = 10
        }
        if (padel2.overlapsWith(ball)) {
            ball.vx += ball.vx * -2
            ballColTimeout = 10
        }
    } else {
        ballColTimeout += -1
    }
}
function reset () {
    ball.setVelocity(randomVel(), randomVel())
    ball.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    padel1.setPosition(10, 56)
    padel2.setPosition(150, 56)
}
function randomVel () {
    if (randint(0, 1) == 0) {
        return 50
    } else {
        return -50
    }
}
let ballColTimeout = 0
let ball: Sprite = null
let padel2: Sprite = null
let padel1: Sprite = null
padel1 = sprites.create(assets.image`myImage`, SpriteKind.Player)
padel2 = sprites.create(assets.image`myImage`, SpriteKind.Player)
padel1.setPosition(10, 56)
padel2.setPosition(150, 56)
ball = sprites.create(assets.image`myImage0`, SpriteKind.Player)
ball.setVelocity(randomVel(), randomVel())
forever(function () {
    if (ball.y <= 0) {
        ball.vy += ball.vy * -2
    }
    if (ball.y >= scene.screenHeight()) {
        ball.vy += ball.vy * -2
    }
    if (ball.x <= 0) {
        reset()
        console.log("Hit left side")
        info.player1.changeScoreBy(1)
    }
    if (ball.x >= scene.screenWidth()) {
        reset()
        console.log("Hit right side")
        info.player2.changeScoreBy(1)
    }
    if (controller.A.isPressed()) {
        padel2.y += -5
    }
    if (controller.B.isPressed()) {
        padel2.y += 5
    }
    if (controller.up.isPressed()) {
        padel1.y += -5
    }
    if (controller.down.isPressed()) {
        padel1.y += 5
    }
    padelCollision()
})
